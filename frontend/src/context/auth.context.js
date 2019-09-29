import { createContext } from 'react'

const AuthContext = createContext({
  token: '',
  userId: '',
  login: ({ token, userId }) => {},
  logout: () => {}
})

export default AuthContext
