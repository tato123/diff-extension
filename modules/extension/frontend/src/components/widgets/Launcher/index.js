export default {
  components: [],
  name: "launcher",
  permissions: ({ Security }) => Security.RequireAuthentication,
  async load() {
    const launcher = await import(/* webpackChunkName: "launcher" */ "./view");

    const div = document.createElement("h1");
    div.innerText = "hello world";
    document.body.appendChild(div);
  }
};
