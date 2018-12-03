import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import scrollToElement from 'scroll-to-element';
import TextEditorForm from './TextEditor';
import CommentList from './CommentList';
import { actions, selectors } from '../../redux';
import HoverInspect from '../../../inspector/components/highlight/hoverinspect';

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

  componentDidMount() {
    const { match } = this.props;
    const id = decodeURIComponent(match.params.id);
    const elm = document.querySelector(id);
    scrollToElement(elm, { duration: 250 });
    this.hoverInspect = new HoverInspect(elm, { mode: 'target' });
    this.hoverInspect.activate();
  }

  componentWillUnmount() {
    this.hoverInspect.deactivate();
  }

  onSubmit = (comment, files = []) => {
    const {
      props: { match, addComment }
    } = this;
    const id = decodeURIComponent(match.params.id);

    addComment(comment, id, [...files]);
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
  const id = decodeURIComponent(props.match.params.id);

  const commentsSelector = selectors.makeAllCommentsSelector(id);

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
