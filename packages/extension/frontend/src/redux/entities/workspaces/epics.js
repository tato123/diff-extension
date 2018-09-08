import { combineEpics, ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, switchMap, map } from "rxjs/operators";
import types from "./types";
import actions from "./actions";
import { types as userTypes } from "redux/user";

const getInvitesEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(userTypes.SELECT_WORKSPACE),
    switchMap(action =>
      api.invites.invitesForWorkspace$(action.payload.workspaceId).pipe(
        map(response => {
          if (response.type === "added" || response.type === "modified") {
            return actions.addInviteUser(response.data.email);
          }
        }),
        catchError(err => of(actions.addInviteUserFailed(err.message)))
      )
    )
  );

const getWorkspaceByIdEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(types.GET_WORKSPACE_BY_ID),
    switchMap(action =>
      api.workspace.workspaceForId$(action.payload.id).pipe(
        map(response => {
          console.warn("[frontend] [workspace epic] unknown response type");
          return actions.getWorkspaceByIdSuccess(response.data, response.id);
        }),
        catchError(err =>
          of(
            actions.getWorkspaceByIdFailed(
              err.message,
              action.payload.workspaceId
            )
          )
        )
      )
    )
  );

export default combineEpics(getWorkspaceByIdEpic, getInvitesEpic);
