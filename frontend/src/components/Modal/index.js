import React, { Fragment } from 'react'

import classes from './modal.module.css'

const Modal = (props) => (
  <Fragment>
    <div className={classes.backdrop} />
    <div className={classes.wrapper}>
      <header className={classes.header}>
        <h1>{props.title}</h1>
      </header>
      <section className={classes.content}>{props.children}</section>
      <div className={classes.actions}>
        {props.canCancel && (
          <button className='button' onClick={props.onCancel}>
            Cancel
          </button>
        )}
        {props.canConfirm && (
          <button className='button' onClick={props.onConfirm}>
            Confirm
          </button>
        )}
      </div>
    </div>
  </Fragment>
)

export default Modal
