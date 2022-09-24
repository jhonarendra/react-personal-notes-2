import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import LocaleContext from '../contexts/LocaleContext'

function AuthMiddleware({ children }) {
  const { auth } = useContext(LocaleContext)
  const location = useLocation()

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

AuthMiddleware.propTypes = {
  children: PropTypes.element.isRequired
}

export default AuthMiddleware
