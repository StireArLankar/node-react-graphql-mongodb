import React, { useState, Fragment } from 'react'
import Modal from '../Modal'

import classes from './events.module.css'

const Events = () => {
  const [isCreating, setIsCreating] = useState(false)

  const startCreateEventHandler = () => setIsCreating(true)

  const modalConfirmHandler = () => setIsCreating(false)

  const modalCancelHandler = () => setIsCreating(false)

  return (
    <Fragment>
      {isCreating && (
        <Modal
          title='Add Event'
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={modalConfirmHandler}
        >
          <p>Modal Content</p>
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

export default Events
