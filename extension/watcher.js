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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
/******/ })
/************************************************************************/
/******/ ({

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _cssbeautify = __webpack_require__(44);

var _cssbeautify2 = _interopRequireDefault(_cssbeautify);

var _cssrules = __webpack_require__(45);

var _test = __webpack_require__(46);

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getJson() {
  // const imgURL = chrome.runtime.getURL("test.json");
  // return fetch(imgURL).then(response => {
  //   console.log(response);
  //   return response.json();
  // });
  return Promise.resolve(_test2.default);
}

const queryRules = async origin => {
  const allRules = await getJson();
  const rulesForOrigin = allRules[origin];
  rulesForOrigin.forEach(({ selector, type }) => {
    select(selector, type);
  });
};

function annotation(element) {
  element.style.background = "blue";
}

function border(element) {
  element.style.border = "3px dashed black";
}

function addNotes(element, text) {
  const note = `
        <div>   
            ${text}
        </div>
    `;
  element.insertAdjacentHTML("afterend", note);
}

const Components = {
  annotation,
  border
};

function select(selector, type) {
  const element = document.querySelector(selector);
  console.log("selecting", selector, element);
  const styles = (0, _cssrules.readStyles)([element])[0].map(rule => `<div><pre><code class="css">${rule.cssText}</code></pre></div>`).join("");
  if (element) {
    Components[type](element);
    addNotes(element, (0, _cssbeautify2.default)(styles, {
      indent: "  ",
      openbrace: "separate-line",
      autosemicolon: true
    }));
  }
}

queryRules(window.location.origin);

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cssbeautify;
function cssbeautify(style, opt) {
  var options,
      index = 0,
      length = style.length,
      blocks,
      formatted = "",
      ch,
      ch2,
      str,
      state,
      State,
      depth,
      quote,
      comment,
      openbracesuffix = true,
      autosemicolon = false,
      trimRight;

  options = arguments.length > 1 ? opt : {};
  if (typeof options.indent === "undefined") {
    options.indent = "    ";
  }
  if (typeof options.openbrace === "string") {
    openbracesuffix = options.openbrace === "end-of-line";
  }
  if (typeof options.autosemicolon === "boolean") {
    autosemicolon = options.autosemicolon;
  }

  function isWhitespace(c) {
    return c === " " || c === "\n" || c === "\t" || c === "\r" || c === "\f";
  }

  function isQuote(c) {
    return c === "'" || c === '"';
  }

  // FIXME: handle Unicode characters
  function isName(c) {
    return ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z" || ch >= "0" && ch <= "9" || "-_*.:#[]".indexOf(c) >= 0;
  }

  function appendIndent() {
    var i;
    for (i = depth; i > 0; i -= 1) {
      formatted += options.indent;
    }
  }

  function openBlock() {
    formatted = trimRight(formatted);
    if (openbracesuffix) {
      formatted += " {";
    } else {
      formatted += "\n";
      appendIndent();
      formatted += "{";
    }
    if (ch2 !== "\n") {
      formatted += "\n";
    }
    depth += 1;
  }

  function closeBlock() {
    var last;
    depth -= 1;
    formatted = trimRight(formatted);

    if (formatted.length > 0 && autosemicolon) {
      last = formatted.charAt(formatted.length - 1);
      if (last !== ";" && last !== "{") {
        formatted += ";";
      }
    }

    formatted += "\n";
    appendIndent();
    formatted += "}";
    blocks.push(formatted);
    formatted = "";
  }

  if (String.prototype.trimRight) {
    trimRight = function (s) {
      return s.trimRight();
    };
  } else {
    // old Internet Explorer
    trimRight = function (s) {
      return s.replace(/\s+$/, "");
    };
  }

  State = {
    Start: 0,
    AtRule: 1,
    Block: 2,
    Selector: 3,
    Ruleset: 4,
    Property: 5,
    Separator: 6,
    Expression: 7,
    URL: 8
  };

  depth = 0;
  state = State.Start;
  comment = false;
  blocks = [];

  // We want to deal with LF (\n) only
  style = style.replace(/\r\n/g, "\n");

  while (index < length) {
    ch = style.charAt(index);
    ch2 = style.charAt(index + 1);
    index += 1;

    // Inside a string literal?
    if (isQuote(quote)) {
      formatted += ch;
      if (ch === quote) {
        quote = null;
      }
      if (ch === "\\" && ch2 === quote) {
        // Don't treat escaped character as the closing quote
        formatted += ch2;
        index += 1;
      }
      continue;
    }

    // Starting a string literal?
    if (isQuote(ch)) {
      formatted += ch;
      quote = ch;
      continue;
    }

    // Comment
    if (comment) {
      formatted += ch;
      if (ch === "*" && ch2 === "/") {
        comment = false;
        formatted += ch2;
        index += 1;
      }
      continue;
    }
    if (ch === "/" && ch2 === "*") {
      comment = true;
      formatted += ch;
      formatted += ch2;
      index += 1;
      continue;
    }

    if (state === State.Start) {
      if (blocks.length === 0) {
        if (isWhitespace(ch) && formatted.length === 0) {
          continue;
        }
      }

      // Copy white spaces and control characters
      if (ch <= " " || ch.charCodeAt(0) >= 128) {
        state = State.Start;
        formatted += ch;
        continue;
      }

      // Selector or at-rule
      if (isName(ch) || ch === "@") {
        // Clear trailing whitespaces and linefeeds.
        str = trimRight(formatted);

        if (str.length === 0) {
          // If we have empty string after removing all the trailing
          // spaces, that means we are right after a block.
          // Ensure a blank line as the separator.
          if (blocks.length > 0) {
            formatted = "\n\n";
          }
        } else {
          // After finishing a ruleset or directive statement,
          // there should be one blank line.
          if (str.charAt(str.length - 1) === "}" || str.charAt(str.length - 1) === ";") {
            formatted = str + "\n\n";
          } else {
            // After block comment, keep all the linefeeds but
            // start from the first column (remove whitespaces prefix).
            while (true) {
              ch2 = formatted.charAt(formatted.length - 1);
              if (ch2 !== " " && ch2.charCodeAt(0) !== 9) {
                break;
              }
              formatted = formatted.substr(0, formatted.length - 1);
            }
          }
        }
        formatted += ch;
        state = ch === "@" ? State.AtRule : State.Selector;
        continue;
      }
    }

    if (state === State.AtRule) {
      // ';' terminates a statement.
      if (ch === ";") {
        formatted += ch;
        state = State.Start;
        continue;
      }

      // '{' starts a block
      if (ch === "{") {
        str = trimRight(formatted);
        openBlock();
        state = str === "@font-face" ? State.Ruleset : State.Block;
        continue;
      }

      formatted += ch;
      continue;
    }

    if (state === State.Block) {
      // Selector
      if (isName(ch)) {
        // Clear trailing whitespaces and linefeeds.
        str = trimRight(formatted);

        if (str.length === 0) {
          // If we have empty string after removing all the trailing
          // spaces, that means we are right after a block.
          // Ensure a blank line as the separator.
          if (blocks.length > 0) {
            formatted = "\n\n";
          }
        } else {
          // Insert blank line if necessary.
          if (str.charAt(str.length - 1) === "}") {
            formatted = str + "\n\n";
          } else {
            // After block comment, keep all the linefeeds but
            // start from the first column (remove whitespaces prefix).
            while (true) {
              ch2 = formatted.charAt(formatted.length - 1);
              if (ch2 !== " " && ch2.charCodeAt(0) !== 9) {
                break;
              }
              formatted = formatted.substr(0, formatted.length - 1);
            }
          }
        }

        appendIndent();
        formatted += ch;
        state = State.Selector;
        continue;
      }

      // '}' resets the state.
      if (ch === "}") {
        closeBlock();
        state = State.Start;
        continue;
      }

      formatted += ch;
      continue;
    }

    if (state === State.Selector) {
      // '{' starts the ruleset.
      if (ch === "{") {
        openBlock();
        state = State.Ruleset;
        continue;
      }

      // '}' resets the state.
      if (ch === "}") {
        closeBlock();
        state = State.Start;
        continue;
      }

      formatted += ch;
      continue;
    }

    if (state === State.Ruleset) {
      // '}' finishes the ruleset.
      if (ch === "}") {
        closeBlock();
        state = State.Start;
        if (depth > 0) {
          state = State.Block;
        }
        continue;
      }

      // Make sure there is no blank line or trailing spaces inbetween
      if (ch === "\n") {
        formatted = trimRight(formatted);
        formatted += "\n";
        continue;
      }

      // property name
      if (!isWhitespace(ch)) {
        formatted = trimRight(formatted);
        formatted += "\n";
        appendIndent();
        formatted += ch;
        state = State.Property;
        continue;
      }
      formatted += ch;
      continue;
    }

    if (state === State.Property) {
      // ':' concludes the property.
      if (ch === ":") {
        formatted = trimRight(formatted);
        formatted += ": ";
        state = State.Expression;
        if (isWhitespace(ch2)) {
          state = State.Separator;
        }
        continue;
      }

      // '}' finishes the ruleset.
      if (ch === "}") {
        closeBlock();
        state = State.Start;
        if (depth > 0) {
          state = State.Block;
        }
        continue;
      }

      formatted += ch;
      continue;
    }

    if (state === State.Separator) {
      // Non-whitespace starts the expression.
      if (!isWhitespace(ch)) {
        formatted += ch;
        state = State.Expression;
        continue;
      }

      // Anticipate string literal.
      if (isQuote(ch2)) {
        state = State.Expression;
      }

      continue;
    }

    if (state === State.Expression) {
      // '}' finishes the ruleset.
      if (ch === "}") {
        closeBlock();
        state = State.Start;
        if (depth > 0) {
          state = State.Block;
        }
        continue;
      }

      // ';' completes the declaration.
      if (ch === ";") {
        formatted = trimRight(formatted);
        formatted += ";\n";
        state = State.Ruleset;
        continue;
      }

      formatted += ch;

      if (ch === "(") {
        if (formatted.charAt(formatted.length - 2) === "l" && formatted.charAt(formatted.length - 3) === "r" && formatted.charAt(formatted.length - 4) === "u") {
          // URL starts with '(' and closes with ')'.
          state = State.URL;
          continue;
        }
      }

      continue;
    }

    if (state === State.URL) {
      // ')' finishes the URL (only if it is not escaped).
      if (ch === ")" && formatted.charAt(formatted.length - 1 !== "\\")) {
        formatted += ch;
        state = State.Expression;
        continue;
      }
    }

    // The default action is to copy the character (to prevent
    // infinite loop).
    formatted += ch;
  }

  formatted = blocks.join("") + formatted;

  return formatted;
}

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// helper function for transforming
// node.children to Array
var toArray = exports.toArray = function (obj, ignoreFalsy) {
  var arr = [],
      i;
  for (i = 0; i < obj.length; i++) {
    if (!ignoreFalsy || obj[i]) {
      arr[i] = obj[i];
    }
  }
  return arr;
};

// looping through the styles and matching
var getRules = exports.getRules = function (el) {
  var sheets = document.styleSheets,
      result = [];
  el.matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector;
  for (var i in sheets) {
    try {
      var rules = sheets[i].rules || sheets[i].cssRules;
      for (var r in rules) {
        if (el.matches(rules[r].selectorText)) {
          result.push(rules[r]);
        }
      }
    } catch (e) {
      // skip
    }
  }
  return result;
};

// looping through the element's children
var readStyles = exports.readStyles = function (els) {
  return els.reduce(function (styles, el) {
    styles.push(getRules(el));
    styles = styles.concat(readStyles(toArray(el.children)));
    return styles;
  }, []);
};

/***/ }),

/***/ 46:
/***/ (function(module, exports) {

module.exports = {"https://www.forage.ai":[{"selector":"h1","type":"border"}]}

/***/ })

/******/ });
//# sourceMappingURL=watcher.js.map