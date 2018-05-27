const DIFF_MESSAGES = "diff:messages";

const filter = cb => evt => {
  //  console.log("evt", evt);
  cb(evt.data);
};

export const subscribe = cb => {
  window.addEventListener("message", filter(cb), false);
};

export const publish = msg => {
  window.postMessage(msg, "*");
};
