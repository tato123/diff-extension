import { ACTIONS } from "@diff/common/keys";
import { asyncActionCreate } from "./helpers";

export default {
  ...asyncActionCreate("fetchCache", ACTIONS.FETCH_CACHE_TOKEN),
  ...asyncActionCreate("login", ACTIONS.LOGIN)
};
