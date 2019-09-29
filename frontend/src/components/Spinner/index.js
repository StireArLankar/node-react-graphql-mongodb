import React from 'react'
import classes from './spinner.module.css'

const Spinner = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.spinner} />
    </div>
  )
}

export default Spinner
