import { connect } from 'react-redux';

import Launcher from './Launcher';

const mapStateToProps = () => ({
  count: 0
});

export default connect(mapStateToProps)(Launcher);
