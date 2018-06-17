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
  const postDestContentScript = postMessageToTabWithDestination(
    _diff_common_keys__WEBPACK_IMPORTED_MODULE_0__["CONTENT_SCRIPT_SOURCE_NAME"]
  );
  const postDestFrontend = postMessageToTabWithDestination(
    _diff_common_keys__WEBPACK_IMPORTED_MODULE_0__["MESSAGES_FRONTEND_SOURCE"]
  );

  if (msg.source === _diff_common_keys__WEBPACK_IMPORTED_MODULE_0__["CONTENT_SCRIPT_SOURCE_NAME"] && msg.type in _handlers__WEBPACK_IMPORTED_MODULE_1__["default"]) {
    _handlers__WEBPACK_IMPORTED_MODULE_1__["default"][msg.type](tabId, postDestContentScript, msg);
  } else if (msg.source === _diff_common_keys__WEBPACK_IMPORTED_MODULE_0__["MESSAGES_FRONTEND_SOURCE"] && msg.type in _handlers__WEBPACK_IMPORTED_MODULE_1__["default"]) {
    _handlers__WEBPACK_IMPORTED_MODULE_1__["default"][msg.type](tabId, postDestFrontend, msg);
  } else {
    postDestContentScript(tabId, {
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
  postMessageToTabWithDestination(_diff_common_keys__WEBPACK_IMPORTED_MODULE_0__["CONTENT_SCRIPT_SOURCE_NAME"])(tabId, message);
};

/**
 * Allows us to message a particular Tab
 * @param {*} tabId
 * @param {*} message
 */
const postMessageToTabWithDestination = destination => (tabId, message) => {
  const port = portForId(tabId);
  if (!port) {
    console.error("Unable to post message");
    return;
  }
  port.postMessage(
    Object(_diff_common_actions__WEBPACK_IMPORTED_MODULE_2__["composeRemoteAction"])(message, _diff_common_keys__WEBPACK_IMPORTED_MODULE_0__["BACKGROUND_SCRIPT_PORT_NAME"], destination)
  );
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
/*! exports provided: composeRemoteAction, runRequest, fetchUserPreferences, fetchUserPreferencesSuccess, fetchUserPreferencesFailed, storeUserPreferencesSuccess, storeUserPreferencesFailed, cacheTokenFailed, cacheTokenSuccess, fetchCacheToken, fetchCacheTokenFailed, fetchCacheTokenSuccess, validateCanRunRequest */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCacheToken", function() { return fetchCacheToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCacheTokenFailed", function() { return fetchCacheTokenFailed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCacheTokenSuccess", function() { return fetchCacheTokenSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateCanRunRequest", function() { return validateCanRunRequest; });
/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keys */ "./common/keys.js");


const composeRemoteAction = (action, source, dest) =>
  Object.assign(
    {},
    {
      source,
      dest
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

const fetchCacheToken = () => ({
  type: _keys__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].FETCH_CACHE_TOKEN.REQUEST
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYmFja2dyb3VuZC9oYW5kbGVycy5qcyIsIndlYnBhY2s6Ly8vLi9iYWNrZ3JvdW5kL2luZGV4LmpzIiwid2VicGFjazovLy8uL2JhY2tncm91bmQvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9jb21tb24vYWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9jb21tb24va2V5cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGa0I7QUFDbEI7QUFDaUQ7O0FBRWpEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLFdBQVcsY0FBYztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OytEQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REM7QUFDRDtBQUMwQzs7QUFFMUM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLFdBQVcsRUFBRTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYixXQUFXLEVBQUU7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JHRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQmtCOztBQUVsQjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlGRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwwQ0FBMEMsS0FBSzs7QUFFL0M7QUFDQSwrQkFBK0IsV0FBVztBQUMxQywrQkFBK0IsV0FBVztBQUMxQyw4QkFBOEIsV0FBVztBQUN6QyxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJiYWNrZ3JvdW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9iYWNrZ3JvdW5kL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHsgQUNUSU9OUyB9IGZyb20gXCJAZGlmZi9jb21tb24va2V5c1wiO1xuaW1wb3J0ICogYXMgYWN0aW9uQ3JlYXRvciBmcm9tIFwiQGRpZmYvY29tbW9uL2FjdGlvbnNcIjtcbmltcG9ydCB7IGdldCwgc2V0LCBzdG9yZVVzZXJUb2tlbiwgZ2V0VXNlclRva2VuIH0gZnJvbSBcIi4vc3RvcmFnZVwiO1xuXG5jb25zdCBQUkVGRVJFTkNFUyA9IFwiX0RJRkZfUFJFRkVSRU5DRVNcIjtcblxuY29uc3QgaGFuZGxlRmV0Y2hVc2VyUHJlZmVyZW5jZXMgPSAodGFiSWQsIHBvc3RNZXNzYWdlVG9UYWIpID0+IHtcbiAgZ2V0KFBSRUZFUkVOQ0VTKVxuICAgIC50aGVuKHByZWZlcmVuY2VzID0+XG4gICAgICBwb3N0TWVzc2FnZVRvVGFiKFxuICAgICAgICB0YWJJZCxcbiAgICAgICAgYWN0aW9uQ3JlYXRvci5mZXRjaFVzZXJQcmVmZXJlbmNlc1N1Y2Nlc3MocHJlZmVyZW5jZXMpXG4gICAgICApXG4gICAgKVxuICAgIC5jYXRjaChlcnIgPT5cbiAgICAgIHBvc3RNZXNzYWdlVG9UYWIoXG4gICAgICAgIHRhYklkLFxuICAgICAgICBhY3Rpb25DcmVhdG9yLmZldGNoVXNlclByZWZlcmVuY2VzRmFpbGVkKGVyci5tZXNzYWdlKVxuICAgICAgKVxuICAgICk7XG59O1xuXG5jb25zdCBoYW5kbFN0b3JlVXNlclByZWZlcmVuY2VzID0gKFxuICB0YWJJZCxcbiAgcG9zdE1lc3NhZ2VUb1RhYixcbiAgeyBwYXlsb2FkOiB7IHByZWZlcmVuY2VzIH0gfVxuKSA9PiB7XG4gIHNldChQUkVGRVJFTkNFUywgcHJlZmVyZW5jZXMpXG4gICAgLnRoZW4oKCkgPT5cbiAgICAgIHBvc3RNZXNzYWdlVG9UYWIodGFiSWQsIGFjdGlvbkNyZWF0b3Iuc3RvcmVVc2VyUHJlZmVyZW5jZXNTdWNjZXNzKCkpXG4gICAgKVxuICAgIC5jYXRjaChlcnIgPT5cbiAgICAgIHBvc3RNZXNzYWdlVG9UYWIoXG4gICAgICAgIHRhYklkLFxuICAgICAgICBhY3Rpb25DcmVhdG9yLnN0b3JlVXNlclByZWZlcmVuY2VzRmFpbGVkKGVyci5tZXNzYWdlKVxuICAgICAgKVxuICAgICk7XG59O1xuXG5jb25zdCBoYW5kbGVDYWNoZVRva2VuUmVxdWVzdCA9ICh0YWJJZCwgcG9zdE1lc3NhZ2VUb1RhYiwgYWN0aW9uKSA9PiB7XG4gIHN0b3JlVXNlclRva2VuKGFjdGlvbi5wYXlsb2FkLnRva2VuKVxuICAgIC50aGVuKCgpID0+IHBvc3RNZXNzYWdlVG9UYWIodGFiSWQsIGFjdGlvbkNyZWF0b3IuY2FjaGVUb2tlblN1Y2Nlc3MoKSkpXG4gICAgLmNhdGNoKCgpID0+XG4gICAgICBwb3N0TWVzc2FnZVRvVGFiKFxuICAgICAgICB0YWJJZCxcbiAgICAgICAgYWN0aW9uQ3JlYXRvci5jYWNoZVRva2VuRmFpbGVkKFwiTm90IGFibGUgdG8gc2F2ZVwiKVxuICAgICAgKVxuICAgICk7XG59O1xuXG5jb25zdCBoYW5kbGVGZXRjaENhY2hlVG9rZW5SZXF1ZXN0ID0gKHRhYklkLCBwb3N0TWVzc2FnZVRvVGFiLCBhY3Rpb24pID0+IHtcbiAgZ2V0VXNlclRva2VuKClcbiAgICAudGhlbigoKSA9PiBwb3N0TWVzc2FnZVRvVGFiKHRhYklkLCBhY3Rpb25DcmVhdG9yLmZldGNoQ2FjaGVUb2tlbkZhaWxlZCgpKSlcbiAgICAuY2F0Y2goKCkgPT5cbiAgICAgIHBvc3RNZXNzYWdlVG9UYWIoXG4gICAgICAgIHRhYklkLFxuICAgICAgICBhY3Rpb25DcmVhdG9yLmZldGNoQ2FjaGVUb2tlblN1Y2Nlc3MoXCJObyB0b2tlbiBhdmFpbGFibGVcIilcbiAgICAgIClcbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBbQUNUSU9OUy5GRVRDSF9VU0VSX1BSRUZFUkVOQ0VTLlJFUVVFU1RdOiBoYW5kbGVGZXRjaFVzZXJQcmVmZXJlbmNlcyxcbiAgW0FDVElPTlMuU1RPUkVfVVNFUl9QUkVGRVJFTkNFUy5SRVFVRVNUXTogaGFuZGxTdG9yZVVzZXJQcmVmZXJlbmNlcyxcbiAgW0FDVElPTlMuQ0FDSEVfVE9LRU4uUkVRVUVTVF06IGhhbmRsZUNhY2hlVG9rZW5SZXF1ZXN0LFxuICBbQUNUSU9OUy5GRVRDSF9DQUNIRV9UT0tFTi5SRVFVRVNUXTogaGFuZGxlRmV0Y2hDYWNoZVRva2VuUmVxdWVzdFxufTtcbiIsImltcG9ydCB7XG4gIENPTlRFTlRfU0NSSVBUX1BPUlRfTkFNRSxcbiAgQ09OVEVOVF9TQ1JJUFRfU09VUkNFX05BTUUsXG4gIEJBQ0tHUk9VTkRfU0NSSVBUX1BPUlRfTkFNRSxcbiAgTUVTU0FHRVNfRlJPTlRFTkRfU09VUkNFXG59IGZyb20gXCJAZGlmZi9jb21tb24va2V5c1wiO1xuaW1wb3J0IGhhbmRsZXJzIGZyb20gXCIuL2hhbmRsZXJzXCI7XG5pbXBvcnQgeyBydW5SZXF1ZXN0LCBjb21wb3NlUmVtb3RlQWN0aW9uIH0gZnJvbSBcIkBkaWZmL2NvbW1vbi9hY3Rpb25zXCI7XG5cbmNvbnN0IHBvcnRzID0ge307XG5cbmNvbnN0IHJlZ2lzdGVyUG9ydCA9IHBvcnQgPT4ge1xuICBjb25zdCBpZCA9IHBvcnQuc2VuZGVyLnRhYi5pZDtcblxuICBpZiAoaWQgaW4gcG9ydHMpIHtcbiAgICBjb25zb2xlLndhcm4oXCJPdmVyd3JpdGluZyB0YWIgaWRcIiwgaWQpO1xuICB9XG4gIHBvcnRzW2lkXSA9IHBvcnQ7XG4gIHJldHVybiBwb3J0LnNlbmRlci50YWIuaWQ7XG59O1xuXG5jb25zdCBtZXNzYWdlTGlzdGVuZXIgPSB0YWJJZCA9PiBtc2cgPT4ge1xuICBjb25zdCBwb3N0RGVzdENvbnRlbnRTY3JpcHQgPSBwb3N0TWVzc2FnZVRvVGFiV2l0aERlc3RpbmF0aW9uKFxuICAgIENPTlRFTlRfU0NSSVBUX1NPVVJDRV9OQU1FXG4gICk7XG4gIGNvbnN0IHBvc3REZXN0RnJvbnRlbmQgPSBwb3N0TWVzc2FnZVRvVGFiV2l0aERlc3RpbmF0aW9uKFxuICAgIE1FU1NBR0VTX0ZST05URU5EX1NPVVJDRVxuICApO1xuXG4gIGlmIChtc2cuc291cmNlID09PSBDT05URU5UX1NDUklQVF9TT1VSQ0VfTkFNRSAmJiBtc2cudHlwZSBpbiBoYW5kbGVycykge1xuICAgIGhhbmRsZXJzW21zZy50eXBlXSh0YWJJZCwgcG9zdERlc3RDb250ZW50U2NyaXB0LCBtc2cpO1xuICB9IGVsc2UgaWYgKG1zZy5zb3VyY2UgPT09IE1FU1NBR0VTX0ZST05URU5EX1NPVVJDRSAmJiBtc2cudHlwZSBpbiBoYW5kbGVycykge1xuICAgIGhhbmRsZXJzW21zZy50eXBlXSh0YWJJZCwgcG9zdERlc3RGcm9udGVuZCwgbXNnKTtcbiAgfSBlbHNlIHtcbiAgICBwb3N0RGVzdENvbnRlbnRTY3JpcHQodGFiSWQsIHtcbiAgICAgIGVycjogXCJObyBhY3Rpb24gZm91bmQgZm9yIHJlcXVlc3RcIlxuICAgIH0pO1xuICB9XG59O1xuXG5jb25zdCByZW1vdmVMaXN0ZW5lciA9IHRhYklkID0+ICgpID0+IHtcbiAgaWYgKHRhYklkIGluIHBvcnRzKSB7XG4gICAgZGVsZXRlIHBvcnRzW3RhYklkXTtcbiAgfVxufTtcblxuY29uc3QgcG9ydEZvcklkID0gdGFiSWQgPT4ge1xuICByZXR1cm4gcG9ydHNbdGFiSWRdO1xufTtcblxuLyoqXG4gKiBBbGxvd3MgdXMgdG8gbWVzc2FnZSBhIHBhcnRpY3VsYXIgVGFiXG4gKiBAcGFyYW0geyp9IHRhYklkXG4gKiBAcGFyYW0geyp9IG1lc3NhZ2VcbiAqL1xuY29uc3QgcG9zdE1lc3NhZ2VUb1RhYiA9ICh0YWJJZCwgbWVzc2FnZSkgPT4ge1xuICBwb3N0TWVzc2FnZVRvVGFiV2l0aERlc3RpbmF0aW9uKENPTlRFTlRfU0NSSVBUX1NPVVJDRV9OQU1FKSh0YWJJZCwgbWVzc2FnZSk7XG59O1xuXG4vKipcbiAqIEFsbG93cyB1cyB0byBtZXNzYWdlIGEgcGFydGljdWxhciBUYWJcbiAqIEBwYXJhbSB7Kn0gdGFiSWRcbiAqIEBwYXJhbSB7Kn0gbWVzc2FnZVxuICovXG5jb25zdCBwb3N0TWVzc2FnZVRvVGFiV2l0aERlc3RpbmF0aW9uID0gZGVzdGluYXRpb24gPT4gKHRhYklkLCBtZXNzYWdlKSA9PiB7XG4gIGNvbnN0IHBvcnQgPSBwb3J0Rm9ySWQodGFiSWQpO1xuICBpZiAoIXBvcnQpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIHBvc3QgbWVzc2FnZVwiKTtcbiAgICByZXR1cm47XG4gIH1cbiAgcG9ydC5wb3N0TWVzc2FnZShcbiAgICBjb21wb3NlUmVtb3RlQWN0aW9uKG1lc3NhZ2UsIEJBQ0tHUk9VTkRfU0NSSVBUX1BPUlRfTkFNRSwgZGVzdGluYXRpb24pXG4gICk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSBvdXIgaW5pdGlhbCBjb25uZWN0aW9uIGZyb20gY29udGVudCBzY3JpcHRzXG4gKi9cbmNocm9tZS5ydW50aW1lLm9uQ29ubmVjdC5hZGRMaXN0ZW5lcihwb3J0ID0+IHtcbiAgaWYgKHBvcnQubmFtZSA9PT0gQ09OVEVOVF9TQ1JJUFRfUE9SVF9OQU1FKSB7XG4gICAgLy8gYWRkIG1lIHRvIHRoZSBwb3J0cyBsaXN0XG4gICAgY29uc3QgaWQgPSByZWdpc3RlclBvcnQocG9ydCk7XG4gICAgcG9ydC5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIobWVzc2FnZUxpc3RlbmVyKGlkKSk7XG4gICAgcG9ydC5vbkRpc2Nvbm5lY3QuYWRkTGlzdGVuZXIocmVtb3ZlTGlzdGVuZXIoaWQpKTtcbiAgfVxufSk7XG5cbi8qKlxuICogQ3JlYXRlIGEgY29udGV4dCBtZW51IGl0ZW1zIHRvIGFsbG93IGVuY29kZS9kZWNvZGVcbiAqL1xuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoKCkgPT4ge1xuICBjaHJvbWUuY29udGV4dE1lbnVzLmNyZWF0ZSh7XG4gICAgaWQ6IFwibG9nLXNlbGVjdGlvblwiLFxuICAgIHRpdGxlOiBcIkluc3BlY3Qgd2l0aCBkaWZmXCIsXG4gICAgY29udGV4dHM6IFtcImFsbFwiXVxuICB9KTtcbn0pO1xuXG5jaHJvbWUuY29udGV4dE1lbnVzLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihhc3luYyAoaW5mbywgdGFiKSA9PiB7XG4gIHBvc3RNZXNzYWdlVG9UYWIodGFiLmlkLCBydW5SZXF1ZXN0KCkpO1xuICByZXR1cm4gdHJ1ZTtcbn0pO1xuIiwiZXhwb3J0IGNvbnN0IFVTRVJfVE9LRU5fS0VZID0gXCJ0b2tlblwiO1xuZXhwb3J0IGNvbnN0IGdldFVzZXJUb2tlbiA9ICgpID0+IGdldChVU0VSX1RPS0VOX0tFWSk7XG5leHBvcnQgY29uc3Qgc3RvcmVVc2VyVG9rZW4gPSB0b2tlbiA9PiBzZXQoVVNFUl9UT0tFTl9LRVksIHRva2VuKTtcblxuZXhwb3J0IGNvbnN0IGdldCA9IGtleSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtrZXldLCByZXN1bHQgPT4ge1xuICAgICAgcmVzb2x2ZShPYmplY3Qua2V5cyhyZXN1bHQpLmxlbmd0aCA9PT0gMCA/IG51bGwgOiByZXN1bHQpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXQgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICBjb25zdCByZWNvcmQgPSB7IFtrZXldOiB2YWx1ZSB9O1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChyZWNvcmQsICgpID0+IHtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuIiwiaW1wb3J0IHsgQUNUSU9OUyB9IGZyb20gXCIuL2tleXNcIjtcblxuZXhwb3J0IGNvbnN0IGNvbXBvc2VSZW1vdGVBY3Rpb24gPSAoYWN0aW9uLCBzb3VyY2UsIGRlc3QpID0+XG4gIE9iamVjdC5hc3NpZ24oXG4gICAge30sXG4gICAge1xuICAgICAgc291cmNlLFxuICAgICAgZGVzdFxuICAgIH0sXG4gICAgYWN0aW9uXG4gICk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFVzZXIgYWN0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgY29uc3QgcnVuUmVxdWVzdCA9ICgpID0+ICh7XG4gIHR5cGU6IEFDVElPTlMuUlVOX1JFUVVFU1QuUkVRVUVTVFxufSk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFVzZXIgYWN0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgY29uc3QgZmV0Y2hVc2VyUHJlZmVyZW5jZXMgPSAoKSA9PiAoe1xuICB0eXBlOiBBQ1RJT05TLkZFVENIX1VTRVJfUFJFRkVSRU5DRVMuUkVRVUVTVFxufSk7XG5cbmV4cG9ydCBjb25zdCBmZXRjaFVzZXJQcmVmZXJlbmNlc1N1Y2Nlc3MgPSBwcmVmZXJlbmNlcyA9PiAoe1xuICB0eXBlOiBBQ1RJT05TLkZFVENIX1VTRVJfUFJFRkVSRU5DRVMuU1VDQ0VTUyxcbiAgcGF5bG9hZDoge1xuICAgIHByZWZlcmVuY2VzOiB7XG4gICAgICAuLi5wcmVmZXJlbmNlc1xuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCBjb25zdCBmZXRjaFVzZXJQcmVmZXJlbmNlc0ZhaWxlZCA9IGVyciA9PiAoe1xuICB0eXBlOiBBQ1RJT05TLkZFVENIX1VTRVJfUFJFRkVSRU5DRVMuRkFJTEVELFxuICBtZXRhOiB7XG4gICAgZXJyXG4gIH1cbn0pO1xuXG5leHBvcnQgY29uc3Qgc3RvcmVVc2VyUHJlZmVyZW5jZXNTdWNjZXNzID0gKCkgPT4gKHtcbiAgdHlwZTogQUNUSU9OUy5TVE9SRV9VU0VSX1BSRUZFUkVOQ0VTLlNVQ0NFU1MsXG4gIHBheWxvYWQ6IHt9XG59KTtcblxuZXhwb3J0IGNvbnN0IHN0b3JlVXNlclByZWZlcmVuY2VzRmFpbGVkID0gZXJyID0+ICh7XG4gIHR5cGU6IEFDVElPTlMuU1RPUkVfVVNFUl9QUkVGRVJFTkNFUy5GQUlMRUQsXG4gIG1ldGE6IHtcbiAgICBlcnJcbiAgfVxufSk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFRva2VuIGFjdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGNvbnN0IGNhY2hlVG9rZW5GYWlsZWQgPSBlcnIgPT4gKHtcbiAgdHlwZTogQUNUSU9OUy5DQUNIRV9UT0tFTi5GQUlMRUQsXG4gIG1ldGE6IHtcbiAgICBlcnJcbiAgfVxufSk7XG5cbmV4cG9ydCBjb25zdCBjYWNoZVRva2VuU3VjY2VzcyA9ICgpID0+ICh7XG4gIHR5cGU6IEFDVElPTlMuQ0FDSEVfVE9LRU4uU1VDQ0VTU1xufSk7XG5cbmV4cG9ydCBjb25zdCBmZXRjaENhY2hlVG9rZW4gPSAoKSA9PiAoe1xuICB0eXBlOiBBQ1RJT05TLkZFVENIX0NBQ0hFX1RPS0VOLlJFUVVFU1Rcbn0pO1xuXG5leHBvcnQgY29uc3QgZmV0Y2hDYWNoZVRva2VuRmFpbGVkID0gZXJyID0+ICh7XG4gIHR5cGU6IEFDVElPTlMuRkVUQ0hfQ0FDSEVfVE9LRU4uRkFJTEVELFxuICBtZXRhOiB7XG4gICAgZXJyXG4gIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgZmV0Y2hDYWNoZVRva2VuU3VjY2VzcyA9IHRva2VuID0+ICh7XG4gIHR5cGU6IEFDVElPTlMuRkVUQ0hfQ0FDSEVfVE9LRU4uU1VDQ0VTUyxcbiAgcGF5bG9hZDoge1xuICAgIHRva2VuXG4gIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVDYW5SdW5SZXF1ZXN0ID0gZG9tYWluID0+ICh7XG4gIHR5cGU6IEFDVElPTlMuVkFMSURBVEVfQ0FOX1JVTi5SRVFVRVNULFxuICBwYXlsb2FkOiB7XG4gICAgZG9tYWluOiB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWVcbiAgfVxufSk7XG4iLCJleHBvcnQgY29uc3QgQ09OVEVOVF9TQ1JJUFRfUE9SVF9OQU1FID0gXCJAZGlmZi9wb3J0bmFtZS9jb250ZW50U2NyaXB0XCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9TQ1JJUFRfU09VUkNFX05BTUUgPSBcIkBkaWZmL2NvbnRlbnRcIjtcbmV4cG9ydCBjb25zdCBCQUNLR1JPVU5EX1NDUklQVF9QT1JUX05BTUUgPSBcIkBkaWZmL2JhY2tncm91bmRcIjtcblxuZXhwb3J0IGNvbnN0IE1FU1NBR0VTX0ZST05URU5EX1NPVVJDRSA9IFwiQGRpZmYvZnJvbnRlbmRcIjtcbmV4cG9ydCBjb25zdCBNRVNTQUdFU19CQUNLR1JPVU5EX1NPVVJDRSA9IFwiQGRpZmYvYmFja2dyb3VuZFwiO1xuXG5jb25zdCBuYW1lc3BhY2VkQWN0aW9uID0gbmFtZSA9PiBgQGRpZmYvJHtuYW1lfWA7XG5cbmNvbnN0IGFzeW5jQWN0aW9uID0gYWN0aW9uVHlwZSA9PiAoe1xuICBSRVFVRVNUOiBuYW1lc3BhY2VkQWN0aW9uKGAke2FjdGlvblR5cGV9L3JlcXVlc3RgKSxcbiAgU1VDQ0VTUzogbmFtZXNwYWNlZEFjdGlvbihgJHthY3Rpb25UeXBlfS9zdWNjZXNzYCksXG4gIEZBSUxFRDogbmFtZXNwYWNlZEFjdGlvbihgJHthY3Rpb25UeXBlfS9mYWlsZWRgKVxufSk7XG5cbmV4cG9ydCBjb25zdCBBQ1RJT05TID0ge1xuICBBVVRIRU5USUNBVElPTjogYXN5bmNBY3Rpb24oXCJhdXRoZW50aWNhdGlvblwiKSxcbiAgRkVUQ0hfVVNFUl9QUkVGRVJFTkNFUzogYXN5bmNBY3Rpb24oXCJGRVRDSF9VU0VSX1BSRUZFUkVOQ0VTXCIpLFxuICBTVE9SRV9VU0VSX1BSRUZFUkVOQ0VTOiBhc3luY0FjdGlvbihcIlNUT1JFX1VTRVJfUFJFRkVSRU5DRVNcIiksXG4gIFJVTl9SRVFVRVNUOiBhc3luY0FjdGlvbihcIlJVTl9SRVFVRVNUXCIpLFxuICBMT0dJTjogYXN5bmNBY3Rpb24oXCJMT0dJTlwiKSxcbiAgQ0FDSEVfVE9LRU46IGFzeW5jQWN0aW9uKFwiQ0FDSEVfVE9LRU5cIiksXG4gIEZFVENIX0NBQ0hFX1RPS0VOOiBhc3luY0FjdGlvbihcIkNBQ0hFX1RPS0VOXCIpXG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==