import React from 'react';
import { ReactMultiEmail } from 'react-multi-email';
import styled from 'styled-components';

const MultiEmailContainer = styled.div`
  height: 120px;

  .react-multi-email {
    margin: 0;
    max-width: 100%;
    -webkit-box-flex: 1;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    outline: 0;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    text-align: left;
    line-height: 1.21428571em;
    padding: 0.4em 0.5em;
    background: #fff;
    border: 1px solid rgba(34, 36, 38, 0.15);
    color: rgba(0, 0, 0, 0.87);
    border-radius: 0.28571429rem;
    -webkit-transition: box-shadow 0.1s ease, border-color 0.1s ease;
    transition: box-shadow 0.1s ease, border-color 0.1s ease;
    font-size: 12px;
    height: inherit;
  }

  .react-multi-email.focused {
    border-color: #85b7d9;
    background: #fff;
    box-shadow: 0 0 0px 4px #43cad9;
  }

  .react-multi-email > input {
    width: auto !important;
    outline: none !important;
    border: 0 none !important;
    display: inline-block !important;
    line-height: 1;
    vertical-align: baseline !important;
    padding: 0.4em 0.1em !important;
  }

  .react-multi-email [data-tag] {
    display: inline-block;
    line-height: 1;
    vertical-align: baseline;
    margin: 0 0.14285714em;
    background-color: #f3f3f3;
    background-image: none;
    padding: 0.5833em 0.833em;
    color: rgba(0, 0, 0, 0.6);
    text-transform: none;
    font-weight: 600;
    border: 0 solid transparent;
    border-radius: 0.28571429rem;
    -webkit-transition: background 0.1s ease;
    -o-transition: background 0.1s ease;
    transition: background 0.1s ease;
    font-size: 0.8rem;

    span {
      display: inline;
    }
  }
  .react-multi-email [data-tag]:first-child {
    margin-left: 0;
  }
  .react-multi-email [data-tag] [data-tag-handle] {
    margin-left: 0.833em;
    cursor: pointer;
  }

  input {
    box-shadow: none !important;
  }
`;

export default class MultiEmail extends React.Component {
  handleChange = emails => {
    this.props.onChange(this.props.name, emails);
  };

  render() {
    return (
      <MultiEmailContainer>
        <ReactMultiEmail
          {...this.props}
          onChange={this.handleChange}
          getLabel={(email, index, removeEmail) => (
            <div data-tag key={index}>
              {email}
              <span data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          )}
        />
      </MultiEmailContainer>
    );
  }
}