export const appendElementOfType = (type, properties = {}) => {
  const elm = document.createElement(type);
  Object.assign(elm, properties);
  document.body.appendChild(elm);
  return elm;
};

export const render = appendElementOfType;
