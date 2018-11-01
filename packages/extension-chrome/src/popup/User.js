import React from 'react';
import PropTypes from 'prop-types';
import { Space, Progress } from '@diff/shared-components';
import styled from 'styled-components';
import browser from '@diff/common/dist/browser';
import normalizeUrl from 'normalize-url';
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
    isSiteAdded: false,
    loading: true
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const activeTab = await browser.tabs.query({
      active: true,
      currentWindow: true
    });
    chrome.runtime.sendMessage(
      { type: 'get_profile', source: 'popup', tab: activeTab },
      response => {
        if (response.type === 'get_profile_success') {
          // check the profile
          const { sites } = response.profile;
          const { hostname } = new URL(normalizeUrl(activeTab.url));

          this.setState({
            isSiteAdded: sites.includes(hostname),
            loading: false
          });
        }
      }
    );
  }

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
          isSiteAdded: true
        });
      }
    );
  };

  render() {
    const {
      props: { onLogout, user },
      state: { isSiteAdded, loading }
    } = this;

    return (
      <Container>
        <Menu user={user} onClick={onLogout} actionText="Logout" />

        <Row label="Website">
          {loading && <Progress style={{ margin: '0 auto' }} />}
          {!loading &&
            !isSiteAdded && (
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
          {!loading &&
            isSiteAdded && <P>Diff is currently running for this site</P>}
        </Row>
      </Container>
    );
  }
}
