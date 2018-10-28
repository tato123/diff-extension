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

  state = {
    active: false
  };

  handleClick = () => {
    this.setState(state => ({
      active: !state.active
    }));
  };

  render() {
    const { isInspecting } = this.props;
    const { active } = this.state;

    return (
      <div>
        {active ? <ControlPanel active={active && !isInspecting} /> : false}

        <Button active={active} onClick={this.handleClick} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  count: selectors.countSelector,
  isInspecting: selectors.isInspectingSelector
});

export default connect(mapStateToProps)(Launcher);
