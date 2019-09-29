import React from 'react'
import classes from './event.module.css'

const EventItem = (props) => {
  const onDetailClick = (evt) => {
    evt.preventDefault()
    props.onClick(props._id)
  }

  return (
    <li key={props._id} className={classes.item}>
      <div>
        <h1>{props.title}</h1>
        <h2>
          ${props.price} - {new Date(props.date).toLocaleDateString()}
        </h2>
      </div>
      <div>
        {props.userId === props.createdBy._id ? (
          <p>You are the owner of this event.</p>
        ) : (
          <button className='button' onClick={onDetailClick}>
            View Details
          </button>
        )}
      </div>
    </li>
  )
}

export default EventItem
