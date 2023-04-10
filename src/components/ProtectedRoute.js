import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export function ProtectedRoute({ element: Component, ...props }) {
  const { pathname } = useLocation()
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to="/login" state={{ returnUrl: pathname }} replace />
  )
}
