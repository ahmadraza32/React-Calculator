import React, { useReducer } from 'react'
import './App.css'
import AddDigit from './AddDigit'
import AddOperation from './AddOperation'

export const ACTION = {
  ADD_DIGIT: 'addDigit',
  CLEAR: 'clear',
  CHOOSE_OPERATION: 'chooseOperation',
  DELETE_DIGIT: 'deleteDigit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }){
  switch(type){
    case ACTION.ADD_DIGIT:
      if(state.overWrite) {
        return {
          ...state, overWrite: false, currentOperand: `${payload.digit}`
        }
      }
      if(payload.digit === '.' && state.currentOperand.includes('.')) return state
      if(payload.digit === '0' && state.currentOperand === '0') return state
      return { ...state, currentOperand: `${state.currentOperand || ''}${payload.digit}` }

    case ACTION.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null) return state
      if(state.previousOperand == null){
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
      if(state.currentOperand == null){
        return {
          ...state,
          operation: payload.operation
        }
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }
      // if(state.currentOperand !== null && state.previousOperand !== null){
      // }
    
    case ACTION.EVALUATE:
      if(state.currentOperand == null || state.previousOperand == null || state.operation == null)  return state
      return {
        ...state,
        overWrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state)
      }

    case ACTION.CLEAR:
      return {}

    case ACTION.DELETE_DIGIT:
      if(state.overWrite){
        return {
          ...state, overWrite: false, currentOperand: null
        }
      }
      if(state.currentOperand.length === 1){
        return { ...state, currentOperand: null }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.toString().slice(0, -1)
      }


    default:
      return state
  }
}

function evaluate({currentOperand, previousOperand, operation}){
  let current = parseFloat(currentOperand)
  let prev = parseFloat(previousOperand)
  if(isNaN(current) && isNaN(prev)) return

  let result = ''
  switch(operation){
    case '+':
      result = current + prev
      break;

    case '-':
      result = current - prev
      break

    case '*':
      result = current * prev
      break

    case '/':
      result = current / prev
      break

    default:
      return
  }

  return result.toString()
}

const App = () => {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})
  console.log(operation, previousOperand, currentOperand);

  return (
    <div className='calculator-grid'>
      <div className="output">
        <div className="previous-operand"> {previousOperand} {operation} </div>
        <div className="current-operand"> {currentOperand} </div>
      </div>

      <button onClick={() => dispatch({ type: ACTION.CLEAR})} className='span-two'>AC</button>
      <button onClick={() => dispatch({ type: ACTION.DELETE_DIGIT })}>DEL</button>
      <AddDigit digit='1' dispatch={dispatch} />
      <AddDigit digit='2' dispatch={dispatch} />
      <AddDigit digit='3' dispatch={dispatch} />
      <AddOperation operation="+" dispatch={dispatch} />
      <AddDigit digit='4' dispatch={dispatch} />
      <AddDigit digit='6' dispatch={dispatch} />
      <AddDigit digit='5' dispatch={dispatch} />
      <AddOperation operation="-" dispatch={dispatch} />
      <AddDigit digit='7' dispatch={dispatch} />
      <AddDigit digit='8' dispatch={dispatch} />
      <AddDigit digit='9' dispatch={dispatch} />
      <AddOperation operation="*" dispatch={dispatch} />
      <AddDigit digit='.' dispatch={dispatch} />
      <AddDigit digit='0' dispatch={dispatch} />
      <AddOperation operation="/" dispatch={dispatch} />
      <button onClick={() => dispatch({ type: ACTION.EVALUATE })} className='span-two'>=</button>
    </div>
  )
}

export default App
