import React from 'react';
import TextEditor from './TextEditor';
import CommentList from './CommentList';

export default class Comments extends React.Component {
  render() {
    return (
      <div>
        <TextEditor />
        <CommentList />
      </div>
    );
  }
}
