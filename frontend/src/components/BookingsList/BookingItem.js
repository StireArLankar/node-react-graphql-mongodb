import React from 'react'

import classes from './bookings.module.css'

const BookingItem = (props) => {
  const { _id, event, createdAt, onDelete } = props
  const onDeleteClick = (evt) => {
    evt.preventDefault()
    onDelete(_id)
  }

  return (
    <li className={classes.item}>
      <div className={classes.data}>
        {event.title} - {new Date(createdAt).toLocaleDateString()}
      </div>
      <div className={classes.actions}>
        <button className='button' onClick={onDeleteClick}>
          Cancel
        </button>
      </div>
    </li>
  )
}

export default BookingItem
