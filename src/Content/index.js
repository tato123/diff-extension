import { render } from "./browser";
import React from "react";
import ReactDOM from "react-dom";
import Shadow from "./Components/Shadow";

const element = render("div");

// ReactDOM.render(<Shadow />, element);

const script = document.createElement("script");
script.src = chrome.runtime.getURL("watcher.js");
document.body.appendChild(script);
