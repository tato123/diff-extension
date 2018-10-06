import { connect } from 'react-redux';
import { actions } from 'entities/session';
import UserSession from './UserSession';

const getFirebaseToken = actions.getFirebaseToken;

const mapDispatchToProps = {
  getFirebaseToken
};

export default connect(
  null,
  mapDispatchToProps
)(UserSession);
