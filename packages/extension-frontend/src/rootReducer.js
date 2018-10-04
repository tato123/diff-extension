import { combineReducers } from 'redux';
import { reducers as featureReducers } from './features';

export default combineReducers({
  ...featureReducers
});
