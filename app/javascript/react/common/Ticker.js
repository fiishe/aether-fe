import React from 'react'

const Ticker = props => {
  return (
    <div className="ticker">
      <h6>{props.name}</h6>
      <h3>{props.value}</h3>
      <div className="v-bar">
        <button onClick={props.increment}>+</button>
        <button onClick={props.decrement}>-</button>
      </div>
    </div>
  )
}

export default Ticker
