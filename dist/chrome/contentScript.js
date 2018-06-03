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

/***/ "./content/index.js":
/*!**************************!*\
  !*** ./content/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
    script.onload = () => {
      resolve();
    };
    script.onerror = reject;
    script.id = scriptId;
    document.body.appendChild(script);
    document.body.insertAdjacentHTML("beforeend", `<df-app />`);
  });
};

/**
 * Configure our messaging
 */
window.addEventListener(
  "message",
  evt => {
    const data = evt.data;
    if (data.source && data.source === "@diff") {
      console.log(data);
    }
  },
  false
);

/**
 *
 */
const loadScripts = async () => {
  await addScriptToPage("frontend.js", "df-bridge-0123");
};

const getDomainsList = async () => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { type: "GET_DOMAIN_LIST", source: "diff" },
      response => {
        resolve(response);
      }
    );
  });
};

const getUserToken = async () => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { type: "GET_AUTH_TOKEN", source: "diff" },
      response => {
        resolve(response);
      }
    );
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
    // check if we are still authenticated
    const userToken = await getUserToken();

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