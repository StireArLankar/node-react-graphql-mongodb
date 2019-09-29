import React, { useContext } from 'react'
import classes from './events.module.css'
import EventItem from './EventItem'
import AuthContext from '../../context/auth.context'

const EventsList = (props) => {
  const authCtx = useContext(AuthContext)

  const renderList = () => {
    return props.events.map((event) => {
      return (
        <EventItem
          key={event._id}
          {...event}
          userId={authCtx.userId}
          onClick={props.onItemClick}
        />
      )
    })
  }

  if (props.events.length === 0) return null

  return <ul className={classes.list}>{renderList()}</ul>
}

export default EventsList
