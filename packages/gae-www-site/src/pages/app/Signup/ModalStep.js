import React from 'react'
import PropTypes from 'prop-types'
import { Header } from '@diff/shared-components'

const ModalStep = ({ header, children }) => (
  <div>
    <div className="form">
      <Header as="h3">{header}</Header>
      {children}
    </div>
  </div>
)

ModalStep.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.any,
}

export default ModalStep
