import { AnyAction } from "redux";
import types from "./types";

export interface ShowAction extends AnyAction {
  payload: {
    name: string;
    context: Object;
  };
}

export interface HideAction extends AnyAction {
  payload: {
    name: string;
  };
}

export interface CloseAllAction extends AnyAction {
  payload: {
    name: string;
  };
}

const show = (name: string, context = {}): ShowAction => ({
  type: types.SHOW,
  payload: {
    name,
    context
  }
});

const hide = (name: string): HideAction => ({
  type: types.HIDE,
  payload: {
    name
  }
});

const closeAll = (name: string): CloseAllAction => ({
  type: types.CLOSE_ALL,
  payload: {
    name
  }
});

export default {
  show,
  hide,
  closeAll
};
