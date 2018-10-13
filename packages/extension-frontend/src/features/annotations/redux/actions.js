import types from './types';

const addAnnotation = element => ({
  type: types.ADD_ANNOTATION,
  payload: {
    element
  }
});

const addAnnotationSuccess = rule => ({
  type: types.ADD_ANNOTATION_SUCCESS,
  payload: {
    rule
  }
});

export default {
  addAnnotation,
  addAnnotationSuccess
};
