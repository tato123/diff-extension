import { combineEpics } from "redux-observable";

// import postMessageEpic from "./postmessage";
import authenticationEpic from "./authentication";

export default combineEpics(authenticationEpic);
