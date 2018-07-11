import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const mapStateToProps = (state, props) => {
  return {
    shown: state.widgets.filter(x => x.name === props.name).length > 0
  };
};

const mapDispatchToProps = dispatch => ({});

class UserView extends React.Component {
  static propTypes = {
    children: PropTypes.func,
    shown: PropTypes.bool
  };

  static defaultProps = {
    shown: false
  };

  render() {
    const {
      props: { shown }
    } = this;

    if (shown) {
      return this.props.children();
    }

    return null;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserView);
