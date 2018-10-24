import React from 'react'
import PropTypes from 'prop-types'
import ModalStep from './ModalStep'

const MakeComment = ({ api, onCommentAdded }) => {
  api.onCommentAddedToCurrentPage((data, err) => {
    if (err) {
      return console.error(err)
    }
    onCommentAdded(data)
  })

  return (
    <ModalStep header="Add your first comment">
      <p>
        The extension is installed and the launcher has been added to the the
        page. While the launcher is open, you simply hover then click on any
        element you would liket to add a comment.
      </p>
      <p>Give it a try by adding a comment to the purple 'Test button'</p>
    </ModalStep>
  )
}

MakeComment.propTypes = {
  api: PropTypes.object.isRequired,
  onCommentAdded: PropTypes.func,
}

MakeComment.defaultProps = {
  onCommentAdded: () => {},
}

export default MakeComment
