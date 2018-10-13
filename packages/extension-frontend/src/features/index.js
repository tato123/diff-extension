import { combineEpics } from 'redux-observable';
import App from './app';
import { reducers as inspectReducer } from './inspector';
import { epics as annotationEpics } from './annotations';


export const reducers = {
  inspector: inspectReducer
};

export const epics = combineEpics(annotationEpics);

export default App;
