import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import EventsPage from './pages/EventsPage'
import BookingsPage from './pages/BookingsPage'

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Redirect from='/' to='/auth' exact />
        <Route path='/auth' component={AuthPage} />
        <Route path='/events' component={EventsPage} />
        <Route path='/bookings' component={BookingsPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
