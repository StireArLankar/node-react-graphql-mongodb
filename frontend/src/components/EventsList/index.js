import React from 'react'
import classes from './events.module.css'

const EventsList = (props) => {
  const renderList = () => {
    return props.events.map((event) => {
      return (
        <li key={event._id} className={classes.item}>
          {event.title}
        </li>
      )
    })
  }

  if (props.events.length === 0) return null

  return <ul className={classes.list}>{renderList()}</ul>
}

export default EventsList
