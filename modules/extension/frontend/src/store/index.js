import mutations from "./mutations";
import actions from "./actions";
import PostMessagePlugin from "./plugins/postmessage";
import WidgetPlugin from "./plugins/widgets";

export default {
  state: {
    widgets: [],
    isAuthenticated: false
  },
  mutations,
  actions,
  plugins: [PostMessagePlugin(), WidgetPlugin()]
};
