import React from 'react'
import PropTypes from 'prop-types'
import ModalStep from './ModalStep'

import { Anchor } from '@diff/shared-components'

const MakeWorkspace = ({ onWorkspaceAdded, onWorkspaceSkip }) => (
  <ModalStep header="Create a workspace">
    <p>Create your first workspace with diff</p>
    <Anchor onClick={onWorkspaceSkip}>Skip creating a workspace</Anchor>
  </ModalStep>
)

MakeWorkspace.propTypes = {
  onWorkspaceAdded: PropTypes.func,
  onWorkspaceSkip: PropTypes.func,
}

MakeWorkspace.defaultProps = {
  onWorkspaceAdded: () => {},
  onWorkspaceSkip: () => {},
}

export default MakeWorkspace
