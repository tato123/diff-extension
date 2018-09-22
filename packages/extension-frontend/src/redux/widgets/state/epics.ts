import { combineEpics, ofType } from "redux-observable";
import { Observable } from "rxjs";
import { flatMap } from "rxjs/operators";

import types from "./types";
import actions, { CloseAllAction } from "./actions";
import { actions as selectorActions } from "../selectors";

const closeAllEpic = (action$: Observable<CloseAllAction>, state$: any) =>
  action$.pipe(
    ofType(types.CLOSE_ALL),
    flatMap(() => {
      const widgets: Array<any> = state$.value.widgets.state;
      const actionQueue = [selectorActions.cancelInspect()];
      widgets.forEach(widget => {
        if (!widget.static) {
          actionQueue.push(actions.hide(widget.name));
        }
      });
      return actionQueue;
    })
  );

export default combineEpics(closeAllEpic);
