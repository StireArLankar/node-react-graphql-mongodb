import React, { useContext } from 'react'
import Modal from '../Modal'
import AuthContext from '../../context/auth.context'

const EventDetails = (props) => {
  const authCtx = useContext(AuthContext)
  return (
    <Modal
      title={props.title}
      canCancel
      canConfirm={authCtx.token}
      onCancel={props.onEventDetailsClose}
      onConfirm={props.onBookEvent}
      confirmText='Book'
    >
      <h2>
        ${props.price} - {new Date(props.date).toLocaleDateString()}
      </h2>
      <p>{props.description}</p>
    </Modal>
  )
}

export default EventDetails
