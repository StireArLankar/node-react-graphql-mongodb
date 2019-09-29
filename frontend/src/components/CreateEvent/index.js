import React, { useState, Fragment, useContext } from 'react'
import Modal from '../Modal'

import classes from './event.module.css'
import AddEventForm from '../AddEventForm'
import AuthContext from '../../context/auth.context'

const CreateEvent = (props) => {
  const [isCreating, setIsCreating] = useState(false)
  const [state, setState] = useState({
    title: '',
    description: '',
    date: '',
    price: ''
  })

  const authCtx = useContext(AuthContext)

  const onEventSubmit = () => {
    setIsCreating(false)
    const { title, description, date } = state
    const price = +state.price

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return
    }

    const requestBody = {
      query: `
          mutation {
            createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}}) {
              _id
              title
              description
              date
              price
            }
          }
        `
    }

    const token = authCtx.token

    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!')
        }
        return res.json()
      })
      .then((resData) => props.onEventCreation())
      .catch((err) => console.log(err))
  }

  const onValueChange = (name) => (evt) => {
    const value = evt.target.value
    setState((state) => ({ ...state, [name]: value }))
  }

  const startCreateEventHandler = () => setIsCreating(true)

  const onModalCancel = () => setIsCreating(false)

  return (
    <Fragment>
      {isCreating && (
        <Modal
          title='Add Event'
          canCancel
          canConfirm
          onCancel={onModalCancel}
          onConfirm={onEventSubmit}
        >
          <AddEventForm {...state} onChange={onValueChange} />
        </Modal>
      )}
      <div className={classes.control}>
        <p>Share your own Events!</p>
        <button className='button' onClick={startCreateEventHandler}>
          Create Event
        </button>
      </div>
    </Fragment>
  )
}

export default CreateEvent
