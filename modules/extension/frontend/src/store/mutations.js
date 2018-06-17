import { ACTIONS } from "@diff/common/keys";

export default {
  [ACTIONS.FETCH_CACHE_TOKEN.FAILED]: state => {
    console.log("faield to get token");
  },
  addWidget(state, widgetName) {
    console.log("we want to add a widget name", widgetName);
  }
};
