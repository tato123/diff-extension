import React from 'react'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default PrivateRoute
