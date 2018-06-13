/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./background/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./background/index.js":
/*!*****************************!*\
  !*** ./background/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/keys */ "./common/keys.js");


const whitelist = ["storage.googleapis.com"];

const ports = {};

function getUserToken() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(["_diff_userToken_"], (result = "") => {
      resolve(Object.keys(result).length === 0 ? "" : result);
    });
  });
}

const registerPort = port => {
  const id = port.sender.tab.id;

  if (id in ports) {
    console.warn("Overwriting tab id", id);
  }
  ports[id] = port;
  return port.sender.tab.id;
};

const messageListener = tabId => msg => {};

const removeListener = tabId => () => {
  if (tabId in ports) {
    delete ports[tabId];
  }
};

const portForId = tabId => {
  return ports[tabId];
};

const portMessageForTab = (tabId, message) => {
  const port = portForId(tabId);
  if (!port) {
    console.error("Unable to post message");
    return;
  }
  port.postMessage(
    Object.assign(
      {},
      {
        source: _common_keys__WEBPACK_IMPORTED_MODULE_0__["BACKGROUND_SCRIPT_PORT_NAME"]
      },
      message
    )
  );
};

chrome.runtime.onConnect.addListener(port => {
  if (port.name === _common_keys__WEBPACK_IMPORTED_MODULE_0__["CONTENT_SCRIPT_PORT_NAME"]) {
    // add me to the ports list
    const id = registerPort(port);
    port.onMessage.addListener(messageListener(id));
    port.onDisconnect.addListener(removeListener(id));
  }
});

/**
 * Handles messages from our content scripts
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.source === "diff") {
    switch (request.type) {
      case "GET_DOMAIN_LIST":
        sendResponse(whitelist);
        break;
      case "GET_AUTH_TOKEN":
        getUserToken()
          .then(sendResponse)
          .catch(_ => sendResponse("error"));
        break;
      default:
        sendResponse({ err: "No action found for request", request });
    }
  }
  return true;
});

/**
 * Create a context menu items to allow encode/decode
 */
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: "log-selection",
    title: "Inspect with diff",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log("clickster");
  try {
    const token = await getUserToken();
    if (!token) {
      portMessageForTab(tab.id, { type: "@diff/AUTHENTICATION_REQUEST" });
    } else {
      console.log("logged in");
    }
  } catch (err) {}

  return true;
});


/***/ }),

/***/ "./common/keys.js":
/*!************************!*\
  !*** ./common/keys.js ***!
  \************************/
/*! exports provided: CONTENT_SCRIPT_PORT_NAME, CONTENT_SCRIPT_SOURCE_NAME, BACKGROUND_SCRIPT_PORT_NAME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTENT_SCRIPT_PORT_NAME", function() { return CONTENT_SCRIPT_PORT_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTENT_SCRIPT_SOURCE_NAME", function() { return CONTENT_SCRIPT_SOURCE_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BACKGROUND_SCRIPT_PORT_NAME", function() { return BACKGROUND_SCRIPT_PORT_NAME; });
const CONTENT_SCRIPT_PORT_NAME = "@diff/portname/contentScript";
const CONTENT_SCRIPT_SOURCE_NAME = "@diff/content";
const BACKGROUND_SCRIPT_PORT_NAME = "@diff/background";


/***/ })

/******/ });
//# sourceMappingURL=background.js.map