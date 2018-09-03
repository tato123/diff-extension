import { AnyAction } from "redux";

export interface RemoteAction {
  source: string;
  dest: string;
  action: AnyAction;
}

export interface Token {
  access_token: string;
  refresh_token: string;
}
