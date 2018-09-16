import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

const EXTENSION_ID = process.env.EXTENSION_ID

export default class ExtensionListener extends React.Component {
  static propTypes = {
    shouldPoll: PropTypes.bool,
    pollTime: PropTypes.number,
    extensionId: PropTypes.string,

    onInstalled: PropTypes.func,
    onMessage: PropTypes.func,
    render: PropTypes.func.isRequired,
  }

  static defaultProps = {
    shouldPoll: true,
    pollTime: 1000,
    extensionId: EXTENSION_ID,

    onInstalled: () => {},
    onMessage: () => {},
  }

  state = {
    intervalId: null,
  }

  componentDidMount() {
    window.addEventListener('message', this.onMessage)
    this.invokeCheck()
    this.timerId = setInterval(() => {
      this.invokeCheck()
      clearInterval(this.timerId)
    }, 1000)
  }

  invokeCheck = () => {
    const {
      props: { extensionId, onInstalled },
    } = this

    // The ID of the extension we want to talk to.
    const action = {
      type: 'VERIFY_INSTALLED',
    }
    chrome.runtime.sendMessage(extensionId, action, response => {
      if (response) {
        onInstalled(response)
      }
    })
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
    window.removeEventListener('message', this.onMessage)
  }

  onMessage = evt => {
    if (evt.data && evt.data.source === '@diff/contentScript') {
      const message = evt.data
      this.props.onMessage(message)
    }
  }

  render() {
    const {
      props: { render },
    } = this

    return <React.Fragment>{render()}</React.Fragment>
  }
}
