import { fetchCacheToken, composeRemoteAction } from "@diff/common/actions";
import { MESSAGES_FRONTEND_SOURCE } from "@diff/common/keys";

export default {
  addWidget(context, widgetName) {
    context.commit("addWidget", widgetName);
  },
  removeWidget(context, widgetName) {},
  getToken(context) {
    window.postMessage(
      composeRemoteAction(fetchCacheToken(), MESSAGES_FRONTEND_SOURCE),
      "*"
    );
  }
};
