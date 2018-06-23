import { init } from "@rematch/core";
// contains all our store logic
import models from "./models";

// additional functionality
import postMessagePlugin from "./plugins/postmessage";
import firebasePlugin from "./plugins/firebase";
import async from "./plugins/async";

const store = init({
  plugins: [postMessagePlugin, firebasePlugin, async],
  models
});

export default store;
