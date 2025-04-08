/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'

const TokenContext = createContext()
const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useToken = () => useContext(TokenContext)

const TokenContextProvider = ({children}) => {

  const [token, setToken] = useState(sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '')
  
  useEffect(() => {
    sessionStorage.setItem('token', token)
  }, [token])

  const value = {
    token,
    setToken,
    backendUrl
  }

  return (
    <TokenContext.Provider value={value}>
      {children}
    </TokenContext.Provider>
  )
}

export default TokenContextProvider