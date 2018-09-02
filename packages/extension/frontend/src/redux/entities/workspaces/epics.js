import { combineEpics, ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, switchMap, map } from "rxjs/operators";
import types from "./types";
import actions from "./actions";

console.warn("[workspace epics] - no workspace selected, faking type");
const faker = "faker";

const getInvitesEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(faker),
    switchMap(action =>
      api.invites.invitesForWorkspace(action.payload.workspaceId).pipe(
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
      api.workspace.workspaceForId(action.payload.workspaceId).pipe(
        map(response => {
          if (response.type === "added" || response.type === "modified") {
            return actions.getWorkspaceByIdSuccess(response.data);
          }
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
