import { init } from "@rematch/core";
// contains all our store logic
import models from "./models";

// additional functionality
import postMessagePlugin from "./plugins/postmessage";
import firebasePlugin from "./plugins/firebase";
import async from "./plugins/async";
import selectPlugin from "@rematch/select";

const store = init({
  plugins: [postMessagePlugin, firebasePlugin, async, selectPlugin()],
  models
});

export default store;
