import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/auth.context'
import Spinner from '../components/Spinner'

const BookingsPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [bookings, setBookings] = useState([])

  const authCtx = useContext(AuthContext)

  useEffect(
    () => {
      setIsLoading(true)
      const requestBody = {
        query: `
          query {
            bookings {
              _id
             createdAt
             event {
               _id
               title
               date
             }
            }
          }
        `
      }

      fetch('http://localhost:3001/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authCtx.token
        }
      })
        .then((res) => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed!')
          }
          return res.json()
        })
        .then((resData) => {
          const bookings = resData.data.bookings
          setBookings(bookings)
        })
        .catch((err) => console.log(err))
        .then(() => setIsLoading(false))
    },
    [authCtx.token]
  )

  const renderBookings = () => (
    <ul>
      {bookings.map((booking) => (
        <li key={booking._id}>
          {booking.event.title} -{' '}
          {new Date(booking.createdAt).toLocaleDateString()}
        </li>
      ))}
    </ul>
  )

  return (
    <React.Fragment>
      {isLoading ? <Spinner /> : renderBookings()}
    </React.Fragment>
  )
}

export default BookingsPage
