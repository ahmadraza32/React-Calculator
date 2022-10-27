import React from 'react'
import { ACTION } from './App'

const AddDigit = ({digit, dispatch}) => {
  return (
    <button onClick={() => dispatch({ type: ACTION.ADD_DIGIT, payload: {digit} })}> {digit} </button>
  )
}

export default AddDigit
