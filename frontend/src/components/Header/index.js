import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './header.module.css'
import AuthContext from '../../context/auth.context'

const Header = () => {
  const authCtx = useContext(AuthContext)

  const renderAuthLink = () => (
    <li className={classes.item} key='/auth'>
      <NavLink to='/auth' className={classes.link}>
        Authenticate
      </NavLink>
    </li>
  )

  const renderEventsLink = () => (
    <li className={classes.item} key='/events'>
      <NavLink to='/events' className={classes.link}>
        Events
      </NavLink>
    </li>
  )

  const renderBookingsLink = () => (
    <li className={classes.item} key='/bookings'>
      <NavLink to='/bookings' className={classes.link}>
        Bookings
      </NavLink>
    </li>
  )

  const renderLogoutButton = () => (
    <li className={classes.item} key='logout'>
      <button onClick={authCtx.logout} className={classes.link}>
        Logout
      </button>
    </li>
  )

  return (
    <header className={classes.wrapper}>
      <div>
        <h1 className={classes.logo}>EasyEvent</h1>
      </div>
      <nav>
        <ul className={classes.list}>
          {!authCtx.token && renderAuthLink()}
          {renderEventsLink()}
          {authCtx.token && renderBookingsLink()}
          {authCtx.token && renderLogoutButton()}
        </ul>
      </nav>
    </header>
  )
}

export default Header
