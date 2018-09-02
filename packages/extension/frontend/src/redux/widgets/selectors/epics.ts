import { AnyAction } from "redux";
import { combineEpics, ofType } from "redux-observable";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import types from "./types";
import { actions as widgetActions } from "../state";
import { actions as selectorEntityActions } from "../../entities/selectors";

interface ShowDiffAction extends AnyAction {
  readonly payload: {
    readonly selector: string;
  };
}

interface CreateNewSelector extends AnyAction {
  readonly payload: {
    readonly selector: string;
  };
}

const showDiffEpic = (action$: Observable<ShowDiffAction>) =>
  action$.pipe(
    ofType(types.SHOW_DIFF),
    map(action =>
      widgetActions.show("diff", { selector: action.payload.selector })
    )
  );

const createNewSelectorEpic = (action$: Observable<CreateNewSelector>) =>
  action$.pipe(
    ofType(types.CREATE_NEW_SELECTOR),
    map(action => selectorEntityActions.addNewSelector(action.payload.selector))
  );

export default combineEpics(showDiffEpic, createNewSelectorEpic);
