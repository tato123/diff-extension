import { combineReducers } from 'redux';
import { reducers as featureReducers } from './features';
import entities from './entities';

export default combineReducers({
  entities,
  ...featureReducers
});
