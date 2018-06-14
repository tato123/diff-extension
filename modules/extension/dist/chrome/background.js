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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./token */ "./background/token.js");



const ports = {};

const registerPort = port => {
  const id = port.sender.tab.id;

  if (id in ports) {
    console.warn("Overwriting tab id", id);
  }
  ports[id] = port;
  return port.sender.tab.id;
};

const messageListener = tabId => msg => {
  if (msg.source === _common_keys__WEBPACK_IMPORTED_MODULE_0__["CONTENT_SCRIPT_SOURCE_NAME"]) {
    switch (msg.type) {
      case _common_keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].VALIDATE_CAN_RUN.REQUEST:
        Object(_token__WEBPACK_IMPORTED_MODULE_1__["getUserToken"])()
          .then(user => {
            if (user == null) {
              throw new Error("No user token available");
            }
            return user;
          })
          .then(user => {
            // do something
            postMessageToTab(tabId, {
              type: _common_keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].VALIDATE_CAN_RUN.SUCCESS,
              payload: user
            });
          })
          .catch(err =>
            postMessageToTab(tabId, {
              type: _common_keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].VALIDATE_CAN_RUN.FAILED,
              payload: {
                err: err.message
              }
            })
          );
        break;
      case _common_keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].CACHE_TOKEN.REQUEST:
        Object(_token__WEBPACK_IMPORTED_MODULE_1__["storeUserToken"])(msg.payload.token)
          .then(() =>
            postMessageToTab(tabId, {
              type: _common_keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].CACHE_TOKEN.SUCCESS
            })
          )
          .catch(() =>
            postMessageToTab(tabId, {
              type: _common_keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].CACHE_TOKEN.FAILED,
              payload: {
                err: "Not able to save"
              }
            })
          );
        break;
      default:
        postMessageToTab(tabId, {
          err: "No action found for request",
          msg
        });
    }
  }
};

const removeListener = tabId => () => {
  if (tabId in ports) {
    delete ports[tabId];
  }
};

const portForId = tabId => {
  return ports[tabId];
};

/**
 * Allows us to message a particular Tab
 * @param {*} tabId
 * @param {*} message
 */
const postMessageToTab = (tabId, message) => {
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

/**
 * Handle our initial connection from content scripts
 */
chrome.runtime.onConnect.addListener(port => {
  if (port.name === _common_keys__WEBPACK_IMPORTED_MODULE_0__["CONTENT_SCRIPT_PORT_NAME"]) {
    // add me to the ports list
    const id = registerPort(port);
    port.onMessage.addListener(messageListener(id));
    port.onDisconnect.addListener(removeListener(id));
  }
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
  const token = await Object(_token__WEBPACK_IMPORTED_MODULE_1__["getUserToken"])();

  postMessageToTab(tab.id, {
    type: _common_keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].RUN_REQUEST.REQUEST,
    payload: {
      context: {
        token
      }
    }
  });

  return true;
});


/***/ }),

/***/ "./background/token.js":
/*!*****************************!*\
  !*** ./background/token.js ***!
  \*****************************/
/*! exports provided: getUserToken, storeUserToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserToken", function() { return getUserToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeUserToken", function() { return storeUserToken; });
const USER_TOKEN_KEY = "token";
const getUserToken = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([USER_TOKEN_KEY], result => {
      resolve(Object.keys(result).length === 0 ? null : result);
    });
  });
};

const storeUserToken = token => {
  const record = { [USER_TOKEN_KEY]: token };
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(record, () => {
      resolve();
    });
  });
};


/***/ }),

/***/ "./common/keys.js":
/*!************************!*\
  !*** ./common/keys.js ***!
  \************************/
/*! exports provided: CONTENT_SCRIPT_PORT_NAME, CONTENT_SCRIPT_SOURCE_NAME, BACKGROUND_SCRIPT_PORT_NAME, MESSAGES_FRONTEND_SOURCE, MESSAGES_BACKGROUND_SOURCE, ACTIONS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTENT_SCRIPT_PORT_NAME", function() { return CONTENT_SCRIPT_PORT_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTENT_SCRIPT_SOURCE_NAME", function() { return CONTENT_SCRIPT_SOURCE_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BACKGROUND_SCRIPT_PORT_NAME", function() { return BACKGROUND_SCRIPT_PORT_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MESSAGES_FRONTEND_SOURCE", function() { return MESSAGES_FRONTEND_SOURCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MESSAGES_BACKGROUND_SOURCE", function() { return MESSAGES_BACKGROUND_SOURCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTIONS", function() { return ACTIONS; });
const CONTENT_SCRIPT_PORT_NAME = "@diff/portname/contentScript";
const CONTENT_SCRIPT_SOURCE_NAME = "@diff/content";
const BACKGROUND_SCRIPT_PORT_NAME = "@diff/background";

const MESSAGES_FRONTEND_SOURCE = "@diff/frontend";
const MESSAGES_BACKGROUND_SOURCE = "@diff/background";

const namespacedAction = name => `@diff/${name}`;

const asyncAction = actionType => ({
  REQUEST: namespacedAction(`${actionType}/request`),
  SUCCESS: namespacedAction(`${actionType}/success`),
  FAILED: namespacedAction(`${actionType}/failed`)
});

const ACTIONS = {
  AUTHENTICATION: asyncAction("authentication"),
  VALIDATE_CAN_RUN: asyncAction("VALIDATE_CAN_RUN"),
  RUN_REQUEST: asyncAction("RUN_REQUEST"),
  LOGIN: asyncAction("LOGIN"),
  CACHE_TOKEN: asyncAction("CACHE_TOKEN")
};


/***/ })

/******/ });
//# sourceMappingURL=background.js.map