import mutations from "./mutations";
import actions from "./actions";
import PostMessagePlugin from "./plugins/postmessage";

export default {
  state: {
    widgets: {}
  },
  mutations,
  actions,
  plugins: [PostMessagePlugin()]
};
