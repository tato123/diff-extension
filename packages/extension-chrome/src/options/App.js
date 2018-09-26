import React from 'react';
import { browser } from '@diff/common';

export default class App extends React.Component {
  state = {
    value: true
  };

  componentDidMount() {
    browser.storage.getFlag('version').then(val => {
      this.setState({ value: val });
    });
  }

  handleChange = key => event => {
    browser.storage.setFlag(key, event.target.value);
    this.setState({ value: event.target.value });
  };

  render() {
    const {
      state: { value }
    } = this;

    return (
      <div>
        <span className="title">Feature flags</span>
        <form>
          <div className="form-control">
            <label htmlFor="version">Version 2</label>
            <select
              name="version"
              value={value}
              onChange={this.handleChange('version')}
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
