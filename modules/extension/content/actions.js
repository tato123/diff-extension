import { ACTIONS } from "../common/keys";

export const validateCanRunRequest = domain => ({
  type: ACTIONS.VALIDATE_CAN_RUN.REQUEST,
  payload: {
    domain: window.location.hostname
  }
});
