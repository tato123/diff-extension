import { connect } from 'react-redux';
import { selectors } from 'entities/selectors';
import View from './TaggedElements';

const mapStateToProps = (state, props) => ({
  tagged: selectors.allCSSSelectors()(state)
});

export default connect(mapStateToProps)(View);
