import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import EventsPage from './pages/EventsPage'
import BookingsPage from './pages/BookingsPage'
import Header from './components/Header'
import AuthContext from './context/auth.context'

const initialState = {
  token: '',
  userId: ''
}

const App = () => {
  const [state, setState] = useState({ ...initialState })

  const login = ({ token, userId }) => setState({ token, userId })
  const logout = () => setState({ ...initialState })

  const { token, userId } = state

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AuthContext.Provider value={{ token, userId, login, logout }}>
        <Header />
        <main>
          <Switch>
            {!state.token && <Route path='/auth' component={AuthPage} />}
            <Route path='/events' component={EventsPage} />
            {state.token && <Route path='/bookings' component={BookingsPage} />}
            {state.token && <Redirect from='/' to='/events' exact />}
            {state.token && <Redirect from='/auth' to='/events' exact />}
            {!state.token && <Redirect to='/auth' />}
          </Switch>
        </main>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App
