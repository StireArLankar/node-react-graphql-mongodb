import React, { useEffect, useState, useContext } from 'react'
import CreateEvent from '../components/CreateEvent'
import EventsList from '../components/EventsList'
import AuthContext from '../context/auth.context'
import Spinner from '../components/Spinner'
import EventDetails from '../components/EventDetails'

const EventsPage = () => {
  const [events, setEvents] = useState([])
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const authCtx = useContext(AuthContext)

  useEffect(
    () => {
      setIsLoading(true)
      const requestBody = {
        query: `
          query {
            events {
              _id
              title
              description
              date
              price
              createdBy {
                _id
                email
              }
            }
          }
        `
      }

      fetch('http://localhost:3001/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed!')
          }
          return res.json()
        })
        .then((resData) => {
          const events = resData.data.events
          setEvents(events)
        })
        .catch((err) => {
          console.log(err)
        })
        .then(() => setIsLoading(false))
    },
    [count]
  )

  const onEventCreation = () => setCount((state) => state + 1)

  const onItemClick = (eventId) => setSelectedEvent(eventId)

  const onEventDetailsClose = () => setSelectedEvent(null)

  const onBookEvent = () => setSelectedEvent(null)

  const selectedEventProps = events.find((ev) => ev._id === selectedEvent)

  return (
    <div className='content'>
      {authCtx.token && <CreateEvent onEventCreation={onEventCreation} />}
      {selectedEvent && (
        <EventDetails
          {...selectedEventProps}
          onBookEvent={onBookEvent}
          onEventDetailsClose={onEventDetailsClose}
        />
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <EventsList events={events} onItemClick={onItemClick} />
      )}
    </div>
  )
}

export default EventsPage
