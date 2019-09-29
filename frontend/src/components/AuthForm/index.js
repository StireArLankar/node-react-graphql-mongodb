import React, { useState, useContext } from 'react'
import classes from './auth.module.css'
import AuthContext from '../../context/auth.context'

const initialState = {
  email: '',
  password: ''
}

const getSignUpBody = ({ email, password }) => ({
  query: `
    mutation {
      createUser(userInput: {email: "${email}", password: "${password}"}) {
        _id
        email
        password
      }
    }
  `
})

const getLoginBody = ({ email, password }) => ({
  query: `
    query {
      login(email: "${email}", password: "${password}") {
        _id
        token
        tokenExpiration
      }
    }
  `
})

const AuthForm = () => {
  const [state, setState] = useState({ ...initialState })
  const [isLogin, setIsLogin] = useState(true)

  const authCtx = useContext(AuthContext)

  const onInputChange = (name) => (evt) => {
    const value = evt.target.value
    setState((state) => ({ ...state, [name]: value }))
  }

  const onModeChange = (evt) => {
    evt.preventDefault()
    setIsLogin((state) => !state)
  }

  const onSubmit = (evt) => {
    evt.preventDefault()
    const { email, password } = state
    if (email.trim().length === 0 || password.trim().length === 0) return

    const requestBody = isLogin ? getLoginBody(state) : getSignUpBody(state)

    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!')
        }
        return res.json()
      })
      .then((body) => {
        if (isLogin) {
          const { token, _id: userId } = body.data.login
          authCtx.login({ token, userId })
        }
        console.log(body)
      })
      .catch((err) => console.log(err))

    setState((state) => ({ ...state, password: '' }))
  }

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={classes.control}>
        <label htmlFor='email' className={classes.label}>
          E-mail
        </label>
        <input
          type='email'
          id='email'
          className={classes.input}
          value={state.email}
          onChange={onInputChange('email')}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor='password' className={classes.label}>
          Password
        </label>
        <input
          type='password'
          id='password'
          className={classes.input}
          value={state.password}
          onChange={onInputChange('password')}
        />
      </div>
      <div className={classes.actions}>
        <button type='submit' className={classes.button} onClick={onSubmit}>
          Submit
        </button>
        <button type='button' className={classes.button} onClick={onModeChange}>
          Switch to {isLogin ? `Signup` : `Login`}
        </button>
      </div>
    </form>
  )
}

export default AuthForm
