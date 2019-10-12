import React from 'react'

import classes from './bookings.module.css'
import BookingItem from './BookingItem'

const bookingList = (props) => {
  const { bookings, onDelete } = props

  const renderItems = () =>
    bookings.map((item) => (
      <BookingItem key={item._id} onDelete={onDelete} {...item} />
    ))

  return <ul className={classes.list}>{renderItems()}</ul>
}

export default bookingList
