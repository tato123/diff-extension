import React from 'react';
import PropTypes from 'prop-types';
import { Space } from '@diff/shared-components';
import styled from 'styled-components';
import browser from '@diff/common/dist/browser';
import Menu from './Menu';
import RoundButton from './RoundButton';
import Row from './Row';

const Container = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const P = styled.p`
  margin: 0;
`;

export default class User extends React.PureComponent {
  static propTypes = {
    onLogout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  state = {
    addSite: false
  };

  handleAddSite = async () => {
    const activeTab = await browser.tabs.query({
      active: true,
      currentWindow: true
    });
    chrome.runtime.sendMessage(
      { type: 'run_request', source: 'popup', tab: activeTab },
      response => {
        console.log(response);
        this.setState({
          addSite: true
        });
      }
    );
  };

  render() {
    const {
      props: { onLogout, user },
      state: { addSite }
    } = this;

    return (
      <Container>
        <Menu user={user} onClick={onLogout} actionText="Logout" />

        <Row label="Website">
          {!addSite && (
            <React.Fragment>
              <P>
                It appears diff isn't set to run for this page, would you like
                to add it?
              </P>

              <Space top={4}>
                <RoundButton
                  style={{ width: '100%' }}
                  onClick={this.handleAddSite}
                >
                  Run diff for this page
                </RoundButton>
              </Space>
            </React.Fragment>
          )}
          {addSite && <P>Diff added to project</P>}
        </Row>
      </Container>
    );
  }
}
