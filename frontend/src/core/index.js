export const component = (name, clazz) => {
  console.log("registering component", name);
  window.customElements.define(name, clazz);
};
