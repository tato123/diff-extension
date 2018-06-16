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

/***/ "./background/handlers.js":
/*!********************************!*\
  !*** ./background/handlers.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _diff_common_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @diff/common/keys */ "./common/keys.js");
/* harmony import */ var _diff_common_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @diff/common/actions */ "./common/actions.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./background/storage.js");




const PREFERENCES = "_DIFF_PREFERENCES";

const handleFetchUserPreferences = (tabId, postMessageToTab) => {
  Object(_storage__WEBPACK_IMPORTED_MODULE_2__["get"])(PREFERENCES)
    .then(preferences =>
      postMessageToTab(
        tabId,
        _diff_common_actions__WEBPACK_IMPORTED_MODULE_1__["fetchUserPreferencesSuccess"](preferences)
      )
    )
    .catch(err =>
      postMessageToTab(
        tabId,
        _diff_common_actions__WEBPACK_IMPORTED_MODULE_1__["fetchUserPreferencesFailed"](err.message)
      )
    );
};

const handlStoreUserPreferences = (
  tabId,
  postMessageToTab,
  { payload: { preferences } }
) => {
  Object(_storage__WEBPACK_IMPORTED_MODULE_2__["set"])(PREFERENCES, preferences)
    .then(() =>
      postMessageToTab(tabId, _diff_common_actions__WEBPACK_IMPORTED_MODULE_1__["storeUserPreferencesSuccess"]())
    )
    .catch(err =>
      postMessageToTab(
        tabId,
        _diff_common_actions__WEBPACK_IMPORTED_MODULE_1__["storeUserPreferencesFailed"](err.message)
      )
    );
};

const handleCacheTokenRequest = (tabId, postMessageToTab, action) => {
  Object(_storage__WEBPACK_IMPORTED_MODULE_2__["storeUserToken"])(action.payload.token)
    .then(() => postMessageToTab(tabId, _diff_common_actions__WEBPACK_IMPORTED_MODULE_1__["cacheTokenSuccess"]()))
    .catch(() =>
      postMessageToTab(
        tabId,
        _diff_common_actions__WEBPACK_IMPORTED_MODULE_1__["cacheTokenFailed"]("Not able to save")
      )
    );
};

const handleFetchCacheTokenRequest = (tabId, postMessageToTab, action) => {
  Object(_storage__WEBPACK_IMPORTED_MODULE_2__["getUserToken"])()
    .then(() => postMessageToTab(tabId, _diff_common_actions__WEBPACK_IMPORTED_MODULE_1__["fetchCacheTokenFailed"]()))
    .catch(() =>
      postMessageToTab(
        tabId,
        _diff_common_actions__WEBPACK_IMPORTED_MODULE_1__["fetchCacheTokenSuccess"]("No token available")
      )
    );
};

/* harmony default export */ __webpack_exports__["default"] = ({
  [_diff_common_keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].FETCH_USER_PREFERENCES.REQUEST]: handleFetchUserPreferences,
  [_diff_common_keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].STORE_USER_PREFERENCES.REQUEST]: handlStoreUserPreferences,
  [_diff_common_keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].CACHE_TOKEN.REQUEST]: handleCacheTokenRequest,
  [_diff_common_keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].FETCH_CACHE_TOKEN.REQUEST]: handleFetchCacheTokenRequest
});


/***/ }),

/***/ "./background/index.js":
/*!*****************************!*\
  !*** ./background/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _diff_common_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @diff/common/keys */ "./common/keys.js");
/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlers */ "./background/handlers.js");
/* harmony import */ var _diff_common_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @diff/common/actions */ "./common/actions.js");




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
  if (msg.source === _diff_common_keys__WEBPACK_IMPORTED_MODULE_0__["CONTENT_SCRIPT_SOURCE_NAME"] && msg.type in _handlers__WEBPACK_IMPORTED_MODULE_1__["default"]) {
    _handlers__WEBPACK_IMPORTED_MODULE_1__["default"][msg.type](tabId, postMessageToTab, msg);
  } else {
    postMessageToTab(tabId, {
      err: "No action found for request"
    });
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
  port.postMessage(Object(_diff_common_actions__WEBPACK_IMPORTED_MODULE_2__["composeRemoteAction"])(message, _diff_common_keys__WEBPACK_IMPORTED_MODULE_0__["BACKGROUND_SCRIPT_PORT_NAME"]));
};

/**
 * Handle our initial connection from content scripts
 */
chrome.runtime.onConnect.addListener(port => {
  if (port.name === _diff_common_keys__WEBPACK_IMPORTED_MODULE_0__["CONTENT_SCRIPT_PORT_NAME"]) {
    // add me to the ports list
    const id = registerPort(port);
    port.onMessage.addListener(messageListener(id));
    port.onDisconnect.addListener(removeListener(id));
  }
});

/**
 * Create a context menu items to allow encode/decode
 */
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "log-selection",
    title: "Inspect with diff",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  postMessageToTab(tab.id, Object(_diff_common_actions__WEBPACK_IMPORTED_MODULE_2__["runRequest"])());
  return true;
});


/***/ }),

/***/ "./background/storage.js":
/*!*******************************!*\
  !*** ./background/storage.js ***!
  \*******************************/
/*! exports provided: USER_TOKEN_KEY, getUserToken, storeUserToken, get, set */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USER_TOKEN_KEY", function() { return USER_TOKEN_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserToken", function() { return getUserToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeUserToken", function() { return storeUserToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
const USER_TOKEN_KEY = "token";
const getUserToken = () => get(USER_TOKEN_KEY);
const storeUserToken = token => set(USER_TOKEN_KEY, token);

const get = key => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], result => {
      resolve(Object.keys(result).length === 0 ? null : result);
    });
  });
};

const set = (key, value) => {
  const record = { [key]: value };
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(record, () => {
      resolve();
    });
  });
};


/***/ }),

/***/ "./common/actions.js":
/*!***************************!*\
  !*** ./common/actions.js ***!
  \***************************/
/*! exports provided: composeRemoteAction, runRequest, fetchUserPreferences, fetchUserPreferencesSuccess, fetchUserPreferencesFailed, storeUserPreferencesSuccess, storeUserPreferencesFailed, cacheTokenFailed, cacheTokenSuccess, fetchCacheTokenFailed, fetchCacheTokenSuccess, validateCanRunRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "composeRemoteAction", function() { return composeRemoteAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runRequest", function() { return runRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUserPreferences", function() { return fetchUserPreferences; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUserPreferencesSuccess", function() { return fetchUserPreferencesSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUserPreferencesFailed", function() { return fetchUserPreferencesFailed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeUserPreferencesSuccess", function() { return storeUserPreferencesSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeUserPreferencesFailed", function() { return storeUserPreferencesFailed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cacheTokenFailed", function() { return cacheTokenFailed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cacheTokenSuccess", function() { return cacheTokenSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCacheTokenFailed", function() { return fetchCacheTokenFailed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCacheTokenSuccess", function() { return fetchCacheTokenSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateCanRunRequest", function() { return validateCanRunRequest; });
/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keys */ "./common/keys.js");


const composeRemoteAction = (action, source) =>
  Object.assign(
    {},
    {
      source
    },
    action
  );

// -------------------------------------------------------
// User actions
// -------------------------------------------------------

const runRequest = () => ({
  type: _keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].RUN_REQUEST.REQUEST
});

// -------------------------------------------------------
// User actions
// -------------------------------------------------------

const fetchUserPreferences = () => ({
  type: _keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].FETCH_USER_PREFERENCES.REQUEST
});

const fetchUserPreferencesSuccess = preferences => ({
  type: _keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].FETCH_USER_PREFERENCES.SUCCESS,
  payload: {
    preferences: {
      ...preferences
    }
  }
});

const fetchUserPreferencesFailed = err => ({
  type: _keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].FETCH_USER_PREFERENCES.FAILED,
  meta: {
    err
  }
});

const storeUserPreferencesSuccess = () => ({
  type: _keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].STORE_USER_PREFERENCES.SUCCESS,
  payload: {}
});

const storeUserPreferencesFailed = err => ({
  type: _keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].STORE_USER_PREFERENCES.FAILED,
  meta: {
    err
  }
});

// -------------------------------------------------------
// Token actions
// -------------------------------------------------------

const cacheTokenFailed = err => ({
  type: _keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].CACHE_TOKEN.FAILED,
  meta: {
    err
  }
});

const cacheTokenSuccess = () => ({
  type: _keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].CACHE_TOKEN.SUCCESS
});

const fetchCacheTokenFailed = err => ({
  type: _keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].FETCH_CACHE_TOKEN.FAILED,
  meta: {
    err
  }
});

const fetchCacheTokenSuccess = token => ({
  type: _keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].FETCH_CACHE_TOKEN.SUCCESS,
  payload: {
    token
  }
});

const validateCanRunRequest = domain => ({
  type: _keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].VALIDATE_CAN_RUN.REQUEST,
  payload: {
    domain: window.location.hostname
  }
});


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
  FETCH_USER_PREFERENCES: asyncAction("FETCH_USER_PREFERENCES"),
  STORE_USER_PREFERENCES: asyncAction("STORE_USER_PREFERENCES"),
  RUN_REQUEST: asyncAction("RUN_REQUEST"),
  LOGIN: asyncAction("LOGIN"),
  CACHE_TOKEN: asyncAction("CACHE_TOKEN"),
  FETCH_CACHE_TOKEN: asyncAction("CACHE_TOKEN")
};


/***/ })

/******/ });
//# sourceMappingURL=background.js.map