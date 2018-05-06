// helper function for transforming
// node.children to Array
export var toArray = function(obj, ignoreFalsy) {
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
export var getRules = function(el) {
  var sheets = document.styleSheets,
    result = [];
  el.matches =
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector ||
    el.oMatchesSelector;
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
export var readStyles = function(els) {
  return els.reduce(function(styles, el) {
    styles.push(getRules(el));
    styles = styles.concat(readStyles(toArray(el.children)));
    return styles;
  }, []);
};
