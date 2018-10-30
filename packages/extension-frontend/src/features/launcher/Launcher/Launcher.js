import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Button from './Button';
import ControlPanel from '../ControlPanel';
import selectors from '../redux/selectors';
import actions from '../../inspector/redux/actions';

class Launcher extends React.Component {
  static propTypes = {
    isInspecting: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
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
    active: false,
    mode: 'initial'
  };

  handleClick = () => {
    const { active, mode } = this.state;
    const { history, dispatch } = this.props;

    if (mode === 'inspecting' && active) {
      // when we are inspecting and
      // we cancel, just return to the control panel
      dispatch(actions.setActive(false));
      this.setState({
        mode: 'controlpanel',
        active: true
      });
    } else {
      // we are going to close the window, reset
      // it to the main screen
      if (active) {
        history.push('/annotations');
      }

      // toggle the state like normal
      this.setState(state => ({
        active: !state.active
      }));
    }
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
