import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import TextEditorForm from './TextEditor';
import CommentList from './CommentList';
import { actions, selectors } from '../../redux';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 auto;
  height: inherit;
`;

class Comments extends React.Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    addComment: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    }).isRequired
  };

  onSubmit = (comment, files) => {
    const {
      props: { match, addComment }
    } = this;

    addComment(comment, match.params.id, files);
  };

  render() {
    const {
      onSubmit,
      props: { comments }
    } = this;

    return (
      <Container>
        <TextEditorForm onSubmit={onSubmit} />
        <CommentList comments={comments} />
      </Container>
    );
  }
}

const makeMapStateToProps = (state, props) => {
  const commentsSelector = selectors.makeAllCommentsSelector(
    props.match.params.id
  );

  return createStructuredSelector({
    comments: commentsSelector
  });
};

const mapDispatchToProps = {
  addComment: actions.addComment
};

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Comments);
