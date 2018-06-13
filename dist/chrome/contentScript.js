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
/******/ 	return __webpack_require__(__webpack_require__.s = "./content/index.js");
/******/ })
/************************************************************************/
/******/ ({

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


/***/ }),

/***/ "./content/index.js":
/*!**************************!*\
  !*** ./content/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/keys */ "./common/keys.js");


/**
 * @param {*} scriptName
 * @param {*} scriptId
 */
const addScriptToPage = async (scriptName, scriptId) => {
  return new Promise((resolve, reject) => {
    // only add the scripts if they aren't already on the page
    const elm = document.querySelector(`#${scriptId}`);
    if (elm) {
      return resolve();
    }

    // Add our page bridge
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL(scriptName);
    script.onload = resolve;
    script.onerror = reject;
    script.id = scriptId;
    document.body.appendChild(script);
  });
};

const port = chrome.runtime.connect({ name: _common_keys__WEBPACK_IMPORTED_MODULE_0__["CONTENT_SCRIPT_PORT_NAME"] });

port.onMessage.addListener(async msg => {
  if (msg.source === _common_keys__WEBPACK_IMPORTED_MODULE_0__["BACKGROUND_SCRIPT_PORT_NAME"]) {
    await addScriptToPage("frontend.js", "df-bridge-0123");
    const element = document.createElement("df-login");
    document.body.appendChild(element);
  }
});

function sendMessage(message, cb) {
  port.postMessage(message, cb);
}

const handleUnknownmessageSource = evt => {
  if (true) {
    // console.warn("Unknown message source", evt);
  }
};

const handleMessageFromBackend = evt => {
  console.log("message received from backend", evt);
};

const handleMessageFromFrontend = (evt, sendResponse) => {
  const { data } = evt;
  switch (data.type) {
    case "@diff/user/get/request":
      sendMessage({ type: "GET_AUTH_TOKEN", source: "diff" }, response => {
        sendResponse({
          payload: response,
          type: `@diff/user/get/${response === "" ? "success" : "failed"}`
        });
      });
      break;
    default:
      if (true) {
        console.warn("Unhandled message type from frontend", data.type);
      }
  }
};

const respondToSource = source => data => {
  const modifiedData = {
    ...data,
    source
  };
  window.postMessage(modifiedData, "*");
};

const handleMessagesReceived = evt => {
  const { data } = evt;

  if (data.source) {
    switch (data.source) {
      case "@diff/frontend":
        handleMessageFromFrontend(
          evt,
          respondToSource(_common_keys__WEBPACK_IMPORTED_MODULE_0__["CONTENT_SCRIPT_SOURCE_NAME"])
        );
        break;
      case "@diff/backend":
        handleMessageFromBackend(
          evt,
          respondToSource(_common_keys__WEBPACK_IMPORTED_MODULE_0__["CONTENT_SCRIPT_SOURCE_NAME"])
        );
        break;
      default:
        handleUnknownmessageSource(evt);
    }
  }
};

/**
 * Configure our messaging
 */
window.addEventListener("message", handleMessagesReceived, false);

/**
 *
 */
const loadScripts = async () => {
  await addScriptToPage("frontend.js", "df-bridge-0123");
};

const getDomainsList = async () => {
  return new Promise((resolve, reject) => {
    sendMessage({ type: "GET_DOMAIN_LIST", source: "diff" }, response => {
      console.log("whitelist response", response);
      resolve(response);
    });
  });
};

const isWhitelistedDomain = domains => {
  return !!domains.find(x => x === window.location.hostname);
};

/**
 * Configure our script to startup
 */
const startup = async () => {
  try {
    // check if we can run on this domain
    const domains = await getDomainsList();

    // domain type
    if (isWhitelistedDomain(domains)) {
      loadScripts();
    }
  } catch (err) {
    console.log(err);
  }
};

// start our applicaiton
startup();


/***/ })

/******/ });
//# sourceMappingURL=contentScript.js.map