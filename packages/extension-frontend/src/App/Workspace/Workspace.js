import React from "react";
import PropTypes from "prop-types";
import Modal from "./components/Modal";
import CreateWorkspace from "./components/Create";
import ShowWorkspace from "./components/Show";
import { isNil } from "lodash";

export default class Workspace extends React.PureComponent {
  static propTypes = {
    workspaceId: PropTypes.string,
    onClose: PropTypes.func
  };

  static defaultProps = {
    onClose: () => {}
  };

  render() {
    const {
      props: { workspaceId, onClose }
    } = this;
    return (
      <Modal>
        <Modal.Content>
          {isNil(workspaceId) && (
            <CreateWorkspace
              onClose={onClose}
              onCreate={this.onCreateWorkspace}
            />
          )}
          {workspaceId && <ShowWorkspace onClose={onClose} />}
        </Modal.Content>
      </Modal>
    );
  }
}
