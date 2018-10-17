import { combineEpics } from 'redux-observable';
import App from './app';
import { reducers as inspectReducer } from './inspector';
import { epics as annotationEpics } from './annotations';
import {
  epics as workspaceEpics,
  reducers as workspaceReducers
} from './workspace';

export const reducers = {
  inspector: inspectReducer,
  workspace: workspaceReducers
};

export const epics = combineEpics(annotationEpics, workspaceEpics);

export default App;
