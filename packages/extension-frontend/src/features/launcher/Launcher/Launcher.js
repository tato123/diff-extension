import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Button from './Button';
import ControlPanel from '../ControlPanel';
import selectors from '../redux/selectors';

class Launcher extends React.Component {
  static propTypes = {
    isInspecting: PropTypes.bool.isRequired
  };

  static getDerivedStateFromProps(props, state) {
    const { isInspecting } = props;
    const { active } = state;

    let mode = '';
    if (isInspecting) {
      mode = 'inspecting';
    } else {
      mode = active ? 'controlpanel' : 'initial';
    }
    return {
      ...state,
      mode
    };
  }

  state = {
    active: false
  };

  handleClick = () => {
    console.log('called');
    this.setState(state => ({
      active: !state.active
    }));
  };

  render() {
    const { mode } = this.state;

    return (
      <div>
        <ControlPanel active={mode === 'controlpanel'} />
        <Button mode={mode} onClick={this.handleClick} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  count: selectors.countSelector,
  isInspecting: selectors.isInspectingSelector
});

export default connect(mapStateToProps)(Launcher);
