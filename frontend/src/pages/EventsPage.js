import React, { useEffect, useState, useContext } from 'react'
import CreateEvent from '../components/CreateEvent'
import EventsList from '../components/EventsList'
import AuthContext from '../context/auth.context'

const EventsPage = () => {
  const [events, setEvents] = useState([])
  const [count, setCount] = useState(0)

  const authCtx = useContext(AuthContext)

  useEffect(
    () => {
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
            console.log(res.json())
            throw new Error('Failed!')
          }
          return res.json()
        })
        .then((resData) => {
          console.log(resData)
          const events = resData.data.events
          setEvents(events)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    [count]
  )

  const onEventCreation = () => setCount((state) => state + 1)

  return (
    <div>
      {authCtx.token && <CreateEvent onEventCreation={onEventCreation} />}
      <EventsList events={events} />
    </div>
  )
}

export default EventsPage
