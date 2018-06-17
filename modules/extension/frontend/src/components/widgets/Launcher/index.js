export default {
  components: [],
  name: "launcher",
  permissions: ({ Security }) => Security.RequireAuthentication,
  load() {
    return import(/* webpackChunkName: "launcher" */ "./Launcher").then(
      ({ default: launcher }) => {
        return ["df-launcher", launcher];
      }
    );
  }
};
