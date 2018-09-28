import React from 'react';
import PropTypes from 'prop-types';
import { browser } from '@diff/common';

export default class App extends React.Component {
  static propTypes = {
    featureFlagKey: PropTypes.string
  };

  static defaultProps = {
    featureFlagKey: 'featureFlags'
  };

  state = {
    featureFlags: {
      version2: false
    }
  };

  componentDidMount() {
    const {
      props: { featureFlagKey }
    } = this;

    browser.storage.getFlag(featureFlagKey).then((val = {}) => {
      this.setState({ featureFlags: val });
    });
  }

  handleChange = key => event => {
    const {
      props: { featureFlagKey },
      state: { featureFlags }
    } = this;
    const newValue = {
      ...featureFlags,
      [key]: event.target.value
    };

    browser.storage.setFlag(featureFlagKey, newValue);
    this.setState({ featureFlags: newValue });
  };

  render() {
    const {
      state: { featureFlags }
    } = this;

    return (
      <div>
        <span className="title">Feature flags</span>
        <form>
          <div className="form-control">
            <span htmlFor="version">Version 2</span>
            <select
              name="version"
              value={featureFlags.version2}
              onChange={this.handleChange('version2')}
            >
              <option value="true">Enable</option>
              <option value="false">Disable</option>
            </select>
          </div>
        </form>
      </div>
    );
  }
}
