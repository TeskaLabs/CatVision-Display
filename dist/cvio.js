(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
  * Bowser - a browser detector
  * https://github.com/ded/bowser
  * MIT License | (c) Dustin Diaz 2014
  */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports['browser'] = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else this[name] = definition()
}('bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , result

    if (/opera|opr/i.test(ua)) {
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/windows phone/i.test(ua)) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    }
    else if (/chrome.+? edge/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (/sailfish/i.test(ua)) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (/silk/i.test(ua)) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
      , version: versionIdentifier
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/(web|hpw)os/i.test(ua)) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (/tizen/i.test(ua)) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/safari/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      , version: versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      result.name = result.name || "Webkit"
      result.webkit = t
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.msedge && (android || result.silk)) {
      result.android = t
    } else if (iosdevice) {
      result[iosdevice] = t
      result.ios = t
    }

    // OS version extraction
    var osVersion = '';
    if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (tablet || iosdevice == 'ipad' || (android && (osMajorVersion == 3 || (osMajorVersion == 4 && !mobile))) || result.silk) {
      result.tablet = t
    } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.chrome && result.version >= 20) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});

},{}],2:[function(require,module,exports){
(function (process){
/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window && typeof window.process !== 'undefined' && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document && 'WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window && window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

}).call(this,require("pBGvAp"))
},{"./debug":3,"pBGvAp":16}],3:[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":4}],4:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000
var m = s * 60
var h = m * 60
var d = h * 24
var y = d * 365.25

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {}
  var type = typeof val
  if (type === 'string' && val.length > 0) {
    return parse(val)
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ?
			fmtLong(val) :
			fmtShort(val)
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
}

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str)
  if (str.length > 10000) {
    return
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
  if (!match) {
    return
  }
  var n = parseFloat(match[1])
  var type = (match[2] || 'ms').toLowerCase()
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y
    case 'days':
    case 'day':
    case 'd':
      return n * d
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n
    default:
      return undefined
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd'
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h'
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm'
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's'
  }
  return ms + 'ms'
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms'
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name
  }
  return Math.ceil(ms / n) + ' ' + name + 's'
}

},{}],5:[function(require,module,exports){
/**
 * Dependencies.
 */
var Util = require('./lib/util');
var Keys = require('./lib/keys');
var KbdUtil = require('./lib/kbdutil');
var Input = require('./lib/input');
var Websock = require('./lib/websock');
var Base64 = require('./lib/base64');
var DES = require('./lib/des');
var TINF = require('./lib/tinf');
var Display = require('./lib/display');
var RFB = require('./lib/rfb');



var noVNC = {
	Util: Util,
	Keys: Keys,
	KbdUtil: KbdUtil,
	Input: Input,
	Websock: Websock,
	Base64: Base64,
	DES: DES,
	TINF: TINF,
	Display: Display,
	RFB: RFB
};


module.exports = noVNC;

},{"./lib/base64":6,"./lib/des":7,"./lib/display":8,"./lib/input":9,"./lib/kbdutil":10,"./lib/keys":11,"./lib/rfb":12,"./lib/tinf":13,"./lib/util":14,"./lib/websock":15}],6:[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Dependencies.
 */
var debugerror = require('debug')('noVNC:ERROR:Base64');
debugerror.log = console.warn.bind(console);


/**
 * Local variables.
 */
var toBase64Table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split('');
var base64Pad = '=';
var toBinaryTable = [
	-1,-1,-1,-1, -1,-1,-1,-1, -1,-1,-1,-1, -1,-1,-1,-1,
	-1,-1,-1,-1, -1,-1,-1,-1, -1,-1,-1,-1, -1,-1,-1,-1,
	-1,-1,-1,-1, -1,-1,-1,-1, -1,-1,-1,62, -1,-1,-1,63,
	52,53,54,55, 56,57,58,59, 60,61,-1,-1, -1, 0,-1,-1,
	-1, 0, 1, 2,  3, 4, 5, 6,  7, 8, 9,10, 11,12,13,14,
	15,16,17,18, 19,20,21,22, 23,24,25,-1, -1,-1,-1,-1,
	-1,26,27,28, 29,30,31,32, 33,34,35,36, 37,38,39,40,
	41,42,43,44, 45,46,47,48, 49,50,51,-1, -1,-1,-1,-1
];


/**
 * Expose the Base64 Object.
 */
module.exports = {
	encode: function (data) {
		var result = '';
		var length = data.length;
		var lengthpad = (length % 3);

		// Convert every three bytes to 4 ascii characters.
		for (var i = 0; i < (length - 2); i += 3) {
			result += toBase64Table[data[i] >> 2];
			result += toBase64Table[((data[i] & 0x03) << 4) + (data[i + 1] >> 4)];
			result += toBase64Table[((data[i + 1] & 0x0f) << 2) + (data[i + 2] >> 6)];
			result += toBase64Table[data[i + 2] & 0x3f];
		}

		// Convert the remaining 1 or 2 bytes, pad out to 4 characters.
		var j = 0;
		if (lengthpad === 2) {
			j = length - lengthpad;
			result += toBase64Table[data[j] >> 2];
			result += toBase64Table[((data[j] & 0x03) << 4) + (data[j + 1] >> 4)];
			result += toBase64Table[(data[j + 1] & 0x0f) << 2];
			result += toBase64Table[64];
		} else if (lengthpad === 1) {
			j = length - lengthpad;
			result += toBase64Table[data[j] >> 2];
			result += toBase64Table[(data[j] & 0x03) << 4];
			result += toBase64Table[64];
			result += toBase64Table[64];
		}

		return result;
	},

	decode: function (data, offset) {
		offset = typeof(offset) !== 'undefined' ? offset : 0;
		var result, result_length;
		var leftbits = 0; // number of bits decoded, but yet to be appended
		var leftdata = 0; // bits decoded, but yet to be appended
		var data_length = data.indexOf('=') - offset;

		if (data_length < 0) { data_length = data.length - offset; }

		/* Every four characters is 3 resulting numbers */
		result_length = (data_length >> 2) * 3 + Math.floor((data_length % 4) / 1.5);
		result = new Array(result_length);

		// Convert one by one.
		for (var idx = 0, i = offset; i < data.length; i++) {
			var c = toBinaryTable[data.charCodeAt(i) & 0x7f];
			var padding = (data.charAt(i) === base64Pad);
			// Skip illegal characters and whitespace
			if (c === -1) {
				debugerror('decode() | illegal character code ' + data.charCodeAt(i) + ' at position ' + i);
				continue;
			}

			// Collect data into leftdata, update bitcount
			leftdata = (leftdata << 6) | c;
			leftbits += 6;

			// If we have 8 or more bits, append 8 bits to the result
			if (leftbits >= 8) {
				leftbits -= 8;
				// Append if not padding.
				if (!padding) {
					result[idx++] = (leftdata >> leftbits) & 0xff;
				}
				leftdata &= (1 << leftbits) - 1;
			}
		}

		// If there are any bits left, the base64 string was corrupted
		if (leftbits) {
			debugerror('decode() | corrupted Base64 string');
			var err = new Error('Corrupted Base64 string');
			err.name = 'Base64-Error';
			throw err;
		}

		return result;
	}
};

},{"debug":2}],7:[function(require,module,exports){
/*
 * Ported from Flashlight VNC ActionScript implementation:
 *     http://www.wizhelp.com/flashlight-vnc/
 *
 * Full attribution follows:
 *
 * -------------------------------------------------------------------------
 *
 * This DES class has been extracted from package Acme.Crypto for use in VNC.
 * The unnecessary odd parity code has been removed.
 *
 * These changes are:
 *  Copyright (C) 1999 AT&T Laboratories Cambridge.  All Rights Reserved.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *

 * DesCipher - the DES encryption method
 *
 * The meat of this code is by Dave Zimmerman <dzimm@widget.com>, and is:
 *
 * Copyright (c) 1996 Widget Workshop, Inc. All Rights Reserved.
 *
 * Permission to use, copy, modify, and distribute this software
 * and its documentation for NON-COMMERCIAL or COMMERCIAL purposes and
 * without fee is hereby granted, provided that this copyright notice is kept
 * intact.
 *
 * WIDGET WORKSHOP MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT THE SUITABILITY
 * OF THE SOFTWARE, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WIDGET WORKSHOP SHALL NOT BE LIABLE
 * FOR ANY DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING OR
 * DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 *
 * THIS SOFTWARE IS NOT DESIGNED OR INTENDED FOR USE OR RESALE AS ON-LINE
 * CONTROL EQUIPMENT IN HAZARDOUS ENVIRONMENTS REQUIRING FAIL-SAFE
 * PERFORMANCE, SUCH AS IN THE OPERATION OF NUCLEAR FACILITIES, AIRCRAFT
 * NAVIGATION OR COMMUNICATION SYSTEMS, AIR TRAFFIC CONTROL, DIRECT LIFE
 * SUPPORT MACHINES, OR WEAPONS SYSTEMS, IN WHICH THE FAILURE OF THE
 * SOFTWARE COULD LEAD DIRECTLY TO DEATH, PERSONAL INJURY, OR SEVERE
 * PHYSICAL OR ENVIRONMENTAL DAMAGE ("HIGH RISK ACTIVITIES").  WIDGET WORKSHOP
 * SPECIFICALLY DISCLAIMS ANY EXPRESS OR IMPLIED WARRANTY OF FITNESS FOR
 * HIGH RISK ACTIVITIES.
 *
 *
 * The rest is:
 *
 * Copyright (C) 1996 by Jef Poskanzer <jef@acme.com>.  All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
 * OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 *
 * Visit the ACME Labs Java page for up-to-date versions of this and other
 * fine Java utilities: http://www.acme.com/java/
 */


// Tables, permutations, S-boxes, etc.
var PC2 = [13,16,10,23, 0, 4, 2,27,14, 5,20, 9,22,18,11, 3,
		   25, 7,15, 6,26,19,12, 1,40,51,30,36,46,54,29,39,
		   50,44,32,47,43,48,38,55,33,52,45,41,49,35,28,31 ],
	totrot = [ 1, 2, 4, 6, 8,10,12,14,15,17,19,21,23,25,27,28],
	z = 0x0, a,b,c,d,e,f, SP1,SP2,SP3,SP4,SP5,SP6,SP7,SP8,
	keys = [];

a=1<<16; b=1<<24; c=a|b; d=1<<2; e=1<<10; f=d|e;
SP1 = [c|e,z|z,a|z,c|f,c|d,a|f,z|d,a|z,z|e,c|e,c|f,z|e,b|f,c|d,b|z,z|d,
	   z|f,b|e,b|e,a|e,a|e,c|z,c|z,b|f,a|d,b|d,b|d,a|d,z|z,z|f,a|f,b|z,
	   a|z,c|f,z|d,c|z,c|e,b|z,b|z,z|e,c|d,a|z,a|e,b|d,z|e,z|d,b|f,a|f,
	   c|f,a|d,c|z,b|f,b|d,z|f,a|f,c|e,z|f,b|e,b|e,z|z,a|d,a|e,z|z,c|d];

a=1<<20; b=1<<31; c=a|b; d=1<<5; e=1<<15; f=d|e;
SP2 = [c|f,b|e,z|e,a|f,a|z,z|d,c|d,b|f,b|d,c|f,c|e,b|z,b|e,a|z,z|d,c|d,
	   a|e,a|d,b|f,z|z,b|z,z|e,a|f,c|z,a|d,b|d,z|z,a|e,z|f,c|e,c|z,z|f,
	   z|z,a|f,c|d,a|z,b|f,c|z,c|e,z|e,c|z,b|e,z|d,c|f,a|f,z|d,z|e,b|z,
	   z|f,c|e,a|z,b|d,a|d,b|f,b|d,a|d,a|e,z|z,b|e,z|f,b|z,c|d,c|f,a|e];

a=1<<17; b=1<<27; c=a|b; d=1<<3; e=1<<9; f=d|e;
SP3 = [z|f,c|e,z|z,c|d,b|e,z|z,a|f,b|e,a|d,b|d,b|d,a|z,c|f,a|d,c|z,z|f,
	   b|z,z|d,c|e,z|e,a|e,c|z,c|d,a|f,b|f,a|e,a|z,b|f,z|d,c|f,z|e,b|z,
	   c|e,b|z,a|d,z|f,a|z,c|e,b|e,z|z,z|e,a|d,c|f,b|e,b|d,z|e,z|z,c|d,
	   b|f,a|z,b|z,c|f,z|d,a|f,a|e,b|d,c|z,b|f,z|f,c|z,a|f,z|d,c|d,a|e];

a=1<<13; b=1<<23; c=a|b; d=1<<0; e=1<<7; f=d|e;
SP4 = [c|d,a|f,a|f,z|e,c|e,b|f,b|d,a|d,z|z,c|z,c|z,c|f,z|f,z|z,b|e,b|d,
	   z|d,a|z,b|z,c|d,z|e,b|z,a|d,a|e,b|f,z|d,a|e,b|e,a|z,c|e,c|f,z|f,
	   b|e,b|d,c|z,c|f,z|f,z|z,z|z,c|z,a|e,b|e,b|f,z|d,c|d,a|f,a|f,z|e,
	   c|f,z|f,z|d,a|z,b|d,a|d,c|e,b|f,a|d,a|e,b|z,c|d,z|e,b|z,a|z,c|e];

a=1<<25; b=1<<30; c=a|b; d=1<<8; e=1<<19; f=d|e;
SP5 = [z|d,a|f,a|e,c|d,z|e,z|d,b|z,a|e,b|f,z|e,a|d,b|f,c|d,c|e,z|f,b|z,
	   a|z,b|e,b|e,z|z,b|d,c|f,c|f,a|d,c|e,b|d,z|z,c|z,a|f,a|z,c|z,z|f,
	   z|e,c|d,z|d,a|z,b|z,a|e,c|d,b|f,a|d,b|z,c|e,a|f,b|f,z|d,a|z,c|e,
	   c|f,z|f,c|z,c|f,a|e,z|z,b|e,c|z,z|f,a|d,b|d,z|e,z|z,b|e,a|f,b|d];

a=1<<22; b=1<<29; c=a|b; d=1<<4; e=1<<14; f=d|e;
SP6 = [b|d,c|z,z|e,c|f,c|z,z|d,c|f,a|z,b|e,a|f,a|z,b|d,a|d,b|e,b|z,z|f,
	   z|z,a|d,b|f,z|e,a|e,b|f,z|d,c|d,c|d,z|z,a|f,c|e,z|f,a|e,c|e,b|z,
	   b|e,z|d,c|d,a|e,c|f,a|z,z|f,b|d,a|z,b|e,b|z,z|f,b|d,c|f,a|e,c|z,
	   a|f,c|e,z|z,c|d,z|d,z|e,c|z,a|f,z|e,a|d,b|f,z|z,c|e,b|z,a|d,b|f];

a=1<<21; b=1<<26; c=a|b; d=1<<1; e=1<<11; f=d|e;
SP7 = [a|z,c|d,b|f,z|z,z|e,b|f,a|f,c|e,c|f,a|z,z|z,b|d,z|d,b|z,c|d,z|f,
	   b|e,a|f,a|d,b|e,b|d,c|z,c|e,a|d,c|z,z|e,z|f,c|f,a|e,z|d,b|z,a|e,
	   b|z,a|e,a|z,b|f,b|f,c|d,c|d,z|d,a|d,b|z,b|e,a|z,c|e,z|f,a|f,c|e,
	   z|f,b|d,c|f,c|z,a|e,z|z,z|d,c|f,z|z,a|f,c|z,z|e,b|d,b|e,z|e,a|d];

a=1<<18; b=1<<28; c=a|b; d=1<<6; e=1<<12; f=d|e;
SP8 = [b|f,z|e,a|z,c|f,b|z,b|f,z|d,b|z,a|d,c|z,c|f,a|e,c|e,a|f,z|e,z|d,
	   c|z,b|d,b|e,z|f,a|e,a|d,c|d,c|e,z|f,z|z,z|z,c|d,b|d,b|e,a|f,a|z,
	   a|f,a|z,c|e,z|e,z|d,c|d,z|e,a|f,b|e,z|d,b|d,c|z,c|d,b|z,a|z,b|f,
	   z|z,c|f,a|d,b|d,c|z,b|e,b|f,z|z,c|f,a|e,a|e,z|f,z|f,a|d,b|z,c|e];


/**
 * Expose the DES function.
 */
module.exports = function (passwd) {
	setKeys(passwd);             // Setup keys
	return {'encrypt': encrypt}; // Public interface
};


/**
 * Private API.
 */


// Set the key.
function setKeys(keyBlock) {
	var i, j, l, m, n, o, pc1m = [], pcr = [], kn = [],
		raw0, raw1, rawi, KnLi;

	for (j = 0, l = 56; j < 56; ++j, l -= 8) {
		l += l < -5 ? 65 : l < -3 ? 31 : l < -1 ? 63 : l === 27 ? 35 : 0; // PC1
		m = l & 0x7;
		pc1m[j] = ((keyBlock[l >>> 3] & (1<<m)) !== 0) ? 1: 0;
	}

	for (i = 0; i < 16; ++i) {
		m = i << 1;
		n = m + 1;
		kn[m] = kn[n] = 0;
		for (o = 28; o < 59; o += 28) {
			for (j = o - 28; j < o; ++j) {
				l = j + totrot[i];
				if (l < o) {
					pcr[j] = pc1m[l];
				} else {
					pcr[j] = pc1m[l - 28];
				}
			}
		}
		for (j = 0; j < 24; ++j) {
			if (pcr[PC2[j]] !== 0) {
				kn[m] |= 1 << (23 - j);
			}
			if (pcr[PC2[j + 24]] !== 0) {
				kn[n] |= 1 << (23 - j);
			}
		}
	}

	// cookey
	for (i = 0, rawi = 0, KnLi = 0; i < 16; ++i) {
		raw0 = kn[rawi++];
		raw1 = kn[rawi++];
		keys[KnLi] = (raw0 & 0x00fc0000) << 6;
		keys[KnLi] |= (raw0 & 0x00000fc0) << 10;
		keys[KnLi] |= (raw1 & 0x00fc0000) >>> 10;
		keys[KnLi] |= (raw1 & 0x00000fc0) >>> 6;
		++KnLi;
		keys[KnLi] = (raw0 & 0x0003f000) << 12;
		keys[KnLi] |= (raw0 & 0x0000003f) << 16;
		keys[KnLi] |= (raw1 & 0x0003f000) >>> 4;
		keys[KnLi] |= (raw1 & 0x0000003f);
		++KnLi;
	}
}


// Encrypt 8 bytes of text
function enc8(text) {
	var i = 0, b = text.slice(), fval, keysi = 0,
		l, r, x; // left, right, accumulator

	// Squash 8 bytes to 2 ints
	l = b[i++]<<24 | b[i++]<<16 | b[i++]<<8 | b[i++];
	r = b[i++]<<24 | b[i++]<<16 | b[i++]<<8 | b[i++];

	x = ((l >>> 4) ^ r) & 0x0f0f0f0f;
	r ^= x;
	l ^= (x << 4);
	x = ((l >>> 16) ^ r) & 0x0000ffff;
	r ^= x;
	l ^= (x << 16);
	x = ((r >>> 2) ^ l) & 0x33333333;
	l ^= x;
	r ^= (x << 2);
	x = ((r >>> 8) ^ l) & 0x00ff00ff;
	l ^= x;
	r ^= (x << 8);
	r = (r << 1) | ((r >>> 31) & 1);
	x = (l ^ r) & 0xaaaaaaaa;
	l ^= x;
	r ^= x;
	l = (l << 1) | ((l >>> 31) & 1);

	for (i = 0; i < 8; ++i) {
		x = (r << 28) | (r >>> 4);
		x ^= keys[keysi++];
		fval =  SP7[x & 0x3f];
		fval |= SP5[(x >>> 8) & 0x3f];
		fval |= SP3[(x >>> 16) & 0x3f];
		fval |= SP1[(x >>> 24) & 0x3f];
		x = r ^ keys[keysi++];
		fval |= SP8[x & 0x3f];
		fval |= SP6[(x >>> 8) & 0x3f];
		fval |= SP4[(x >>> 16) & 0x3f];
		fval |= SP2[(x >>> 24) & 0x3f];
		l ^= fval;
		x = (l << 28) | (l >>> 4);
		x ^= keys[keysi++];
		fval =  SP7[x & 0x3f];
		fval |= SP5[(x >>> 8) & 0x3f];
		fval |= SP3[(x >>> 16) & 0x3f];
		fval |= SP1[(x >>> 24) & 0x3f];
		x = l ^ keys[keysi++];
		fval |= SP8[x & 0x0000003f];
		fval |= SP6[(x >>> 8) & 0x3f];
		fval |= SP4[(x >>> 16) & 0x3f];
		fval |= SP2[(x >>> 24) & 0x3f];
		r ^= fval;
	}

	r = (r << 31) | (r >>> 1);
	x = (l ^ r) & 0xaaaaaaaa;
	l ^= x;
	r ^= x;
	l = (l << 31) | (l >>> 1);
	x = ((l >>> 8) ^ r) & 0x00ff00ff;
	r ^= x;
	l ^= (x << 8);
	x = ((l >>> 2) ^ r) & 0x33333333;
	r ^= x;
	l ^= (x << 2);
	x = ((r >>> 16) ^ l) & 0x0000ffff;
	l ^= x;
	r ^= (x << 16);
	x = ((r >>> 4) ^ l) & 0x0f0f0f0f;
	l ^= x;
	r ^= (x << 4);

	// Spread ints to bytes
	x = [r, l];
	for (i = 0; i < 8; i++) {
		b[i] = (x[i>>>2] >>> (8 * (3 - (i % 4)))) % 256;
		if (b[i] < 0) { b[i] += 256; } // unsigned
	}
	return b;
}


// Encrypt 16 bytes of text using passwd as key
function encrypt(t) {
	return enc8(t.slice(0, 8)).concat(enc8(t.slice(8, 16)));
}

},{}],8:[function(require,module,exports){
/*
 * noVNC: HTML5 VNC client
 * Copyright (C) 2012 Joel Martin
 * Copyright (C) 2015 Samuel Mannehed for Cendio AB
 * Licensed under MPL 2.0 (see LICENSE.txt)
 */


/**
 * Expose the Display class.
 */
module.exports = Display;


/**
 * Dependencies.
 */
var debug = require('debug')('noVNC:Display');
var debugerror = require('debug')('noVNC:ERROR:Display');
debugerror.log = console.warn.bind(console);
var browser = require('bowser').browser;
var Util = require('./util');
var Base64 = require('./base64');


function Display (defaults) {
	debug('new()');

	this._drawCtx = null;
	this._c_forceCanvas = false;

	this._renderQ = [];  // queue drawing actions for in-oder rendering

	// the full frame buffer (logical canvas) size
	this._fb_width = 0;
	this._fb_height = 0;

	// the size limit of the viewport (start disabled)
	this._maxWidth = 0;
	this._maxHeight = 0;

	// the visible 'physical canvas' viewport
	this._viewportLoc = { 'x': 0, 'y': 0, 'w': 0, 'h': 0 };
	this._cleanRect = { 'x1': 0, 'y1': 0, 'x2': -1, 'y2': -1 };

	this._prevDrawStyle = '';
	this._tile = null;
	this._tile16x16 = null;
	this._tile_x = 0;
	this._tile_y = 0;

	Util.set_defaults(this, defaults, {
		'true_color': true,
		'colourMap': [],
		'scale': 1.0,
		'viewport': false,
		'render_mode': ''
	});

	if (!this._target) {
		throw new Error('Target must be set');
	}

	if (typeof this._target === 'string') {
		throw new Error('target must be a DOM element');
	}

	if (!this._target.getContext) {
		throw new Error('no getContext method');
	}

	if (!this._drawCtx) {
		this._drawCtx = this._target.getContext('2d');
	}

	this.clear();

	// Check canvas features
	if ('createImageData' in this._drawCtx) {
		this._render_mode = 'canvas rendering';
	} else {
		throw new Error('Canvas does not support createImageData');
	}

	if (this._prefer_js === null) {
		this._prefer_js = true;
	}

	// Determine browser support for setting the cursor via data URI scheme
	if (this._cursor_uri || this._cursor_uri === null ||
	  this._cursor_uri === undefined) {
	  this._cursor_uri = Util.browserSupportsCursorURIs();
	}
}


Display.prototype = {
	// Public methods
	viewportChangePos: function (deltaX, deltaY) {
		var vp = this._viewportLoc;

		if (!this._viewport) {
			deltaX = -vp.w;  // clamped later of out of bounds
			deltaY = -vp.h;
		}

		var vx2 = vp.x + vp.w - 1;
		var vy2 = vp.y + vp.h - 1;

		// Position change

		if (deltaX < 0 && vp.x + deltaX < 0) {
			deltaX = -vp.x;
		}
		if (vx2 + deltaX >= this._fb_width) {
			deltaX -= vx2 + deltaX - this._fb_width + 1;
		}

		if (vp.y + deltaY < 0) {
			deltaY = -vp.y;
		}
		if (vy2 + deltaY >= this._fb_height) {
			deltaY -= (vy2 + deltaY - this._fb_height + 1);
		}

		if (deltaX === 0 && deltaY === 0) {
			return;
		}
		debug('viewportChangePos() | deltaX: ' + deltaX + ', deltaY: ' + deltaY);

		vp.x += deltaX;
		vx2 += deltaX;
		vp.y += deltaY;
		vy2 += deltaY;

		// Update the clean rectangle
		var cr = this._cleanRect;
		if (vp.x > cr.x1) {
			cr.x1 = vp.x;
		}
		if (vx2 < cr.x2) {
			cr.x2 = vx2;
		}
		if (vp.y > cr.y1) {
			cr.y1 = vp.y;
		}
		if (vy2 < cr.y2) {
			cr.y2 = vy2;
		}

		var x1, w;
		if (deltaX < 0) {
			// Shift viewport left, redraw left section
			x1 = 0;
			w = -deltaX;
		} else {
			// Shift viewport right, redraw right section
			x1 = vp.w - deltaX;
			w = deltaX;
		}

		var y1, h;
		if (deltaY < 0) {
			// Shift viewport up, redraw top section
			y1 = 0;
			h = -deltaY;
		} else {
			// Shift viewport down, redraw bottom section
			y1 = vp.h - deltaY;
			h = deltaY;
		}

		// Copy the valid part of the viewport to the shifted location
		var saveStyle = this._drawCtx.fillStyle;
		var canvas = this._target;
		this._drawCtx.fillStyle = 'rgb(255,255,255)';
		if (deltaX !== 0) {
			this._drawCtx.drawImage(canvas, 0, 0, vp.w, vp.h, -deltaX, 0, vp.w, vp.h);
			this._drawCtx.fillRect(x1, 0, w, vp.h);
		}
		if (deltaY !== 0) {
			this._drawCtx.drawImage(canvas, 0, 0, vp.w, vp.h, 0, -deltaY, vp.w, vp.h);
			this._drawCtx.fillRect(0, y1, vp.w, h);
		}
		this._drawCtx.fillStyle = saveStyle;
	},

	viewportChangeSize: function(width, height) {
		if (typeof(width) === 'undefined' || typeof(height) === 'undefined') {
			debug('viewportChangeSize() | setting viewport to full display region');
			width = this._fb_width;
			height = this._fb_height;
		}

		var vp = this._viewportLoc;

		if (vp.w !== width || vp.h !== height) {
			if (this._viewport) {
				if (this._maxWidth !== 0 && width > this._maxWidth) {
					width = this._maxWidth;
				}
				if (this._maxHeight !== 0 && height > this._maxHeight) {
					height = this._maxHeight;
				}
			}

			var cr = this._cleanRect;

			if (width < vp.w &&  cr.x2 > vp.x + width - 1) {
				cr.x2 = vp.x + width - 1;
			}

			if (height < vp.h &&  cr.y2 > vp.y + height - 1) {
				cr.y2 = vp.y + height - 1;
			}

			vp.w = width;
			vp.h = height;

			var canvas = this._target;

			if (canvas.width !== width || canvas.height !== height) {
				// We have to save the canvas data since changing the size will clear it
				var saveImg = null;

				if (vp.w > 0 && vp.h > 0 && canvas.width > 0 && canvas.height > 0) {
					var img_width = canvas.width < vp.w ? canvas.width : vp.w;
					var img_height = canvas.height < vp.h ? canvas.height : vp.h;
					saveImg = this._drawCtx.getImageData(0, 0, img_width, img_height);
				}

				if (canvas.width !== width) {
					canvas.width = width;
					canvas.style.width = width + 'px';
				}
				if (canvas.height !== height) {
					canvas.height = height;
					canvas.style.height = height + 'px';
				}

				if (saveImg) {
					this._drawCtx.putImageData(saveImg, 0, 0);
				}
			}
		}
	},

	// Return a map of clean and dirty areas of the viewport and reset the
	// tracking of clean and dirty areas
	//
	// Returns: { 'cleanBox': { 'x': x, 'y': y, 'w': w, 'h': h},
	//            'dirtyBoxes': [{ 'x': x, 'y': y, 'w': w, 'h': h }, ...] }
	getCleanDirtyReset: function () {
		var vp = this._viewportLoc;
		var cr = this._cleanRect;

		var cleanBox = { 'x': cr.x1, 'y': cr.y1,
						 'w': cr.x2 - cr.x1 + 1, 'h': cr.y2 - cr.y1 + 1 };

		var dirtyBoxes = [];
		if (cr.x1 >= cr.x2 || cr.y1 >= cr.y2) {
			// Whole viewport is dirty
			dirtyBoxes.push({ 'x': vp.x, 'y': vp.y, 'w': vp.w, 'h': vp.h });
		} else {
			// Redraw dirty regions
			var vx2 = vp.x + vp.w - 1;
			var vy2 = vp.y + vp.h - 1;

			if (vp.x < cr.x1) {
				// left side dirty region
				dirtyBoxes.push({'x': vp.x, 'y': vp.y,
								 'w': cr.x1 - vp.x + 1, 'h': vp.h});
			}
			if (vx2 > cr.x2) {
				// right side dirty region
				dirtyBoxes.push({'x': cr.x2 + 1, 'y': vp.y,
								 'w': vx2 - cr.x2, 'h': vp.h});
			}
			if(vp.y < cr.y1) {
				// top/middle dirty region
				dirtyBoxes.push({'x': cr.x1, 'y': vp.y,
								 'w': cr.x2 - cr.x1 + 1, 'h': cr.y1 - vp.y});
			}
			if (vy2 > cr.y2) {
				// bottom/middle dirty region
				dirtyBoxes.push({'x': cr.x1, 'y': cr.y2 + 1,
								 'w': cr.x2 - cr.x1 + 1, 'h': vy2 - cr.y2});
			}
		}

		this._cleanRect = {'x1': vp.x, 'y1': vp.y,
							 'x2': vp.x + vp.w - 1, 'y2': vp.y + vp.h - 1};

		return {'cleanBox': cleanBox, 'dirtyBoxes': dirtyBoxes};
	},

	absX: function (x) {
		return x + this._viewportLoc.x;
	},

	absY: function (y) {
		return y + this._viewportLoc.y;
	},

	resize: function (width, height) {
		this._prevDrawStyle = '';

		this._fb_width = width;
		this._fb_height = height;

		this._rescale(this._scale);

		this.viewportChangeSize();
	},

	clear: function () {
		if (this._logo) {
			this.resize(this._logo.width, this._logo.height);
			this.blitStringImage(this._logo.data, 0, 0);
		} else {
			if (browser.msie && parseInt(browser.version) === 10) {
				// NB(directxman12): there's a bug in IE10 where we can fail to actually
				//                   clear the canvas here because of the resize.
				//                   Clearing the current viewport first fixes the issue
				this._drawCtx.clearRect(0, 0, this._viewportLoc.w, this._viewportLoc.h);
			}
			this.resize(240, 20);
			this._drawCtx.clearRect(0, 0, this._viewportLoc.w, this._viewportLoc.h);
		}

		this._renderQ = [];
	},

	fillRect: function (x, y, width, height, color) {
		this._setFillColor(color);
		this._drawCtx.fillRect(x - this._viewportLoc.x, y - this._viewportLoc.y, width, height);
	},

	copyImage: function (old_x, old_y, new_x, new_y, w, h) {
		var x1 = old_x - this._viewportLoc.x;
		var y1 = old_y - this._viewportLoc.y;
		var x2 = new_x - this._viewportLoc.x;
		var y2 = new_y - this._viewportLoc.y;

		this._drawCtx.drawImage(this._target, x1, y1, w, h, x2, y2, w, h);
	},

	// start updating a tile
	startTile: function (x, y, width, height, color) {
		this._tile_x = x;
		this._tile_y = y;
		if (width === 16 && height === 16) {
			this._tile = this._tile16x16;
		} else {
			this._tile = this._drawCtx.createImageData(width, height);
		}

		if (this._prefer_js) {
			var bgr;
			if (this._true_color) {
				bgr = color;
			} else {
				bgr = this._colourMap[color[0]];
			}
			var red = bgr[2];
			var green = bgr[1];
			var blue = bgr[0];

			var data = this._tile.data;
			for (var i = 0; i < width * height * 4; i += 4) {
				data[i] = red;
				data[i + 1] = green;
				data[i + 2] = blue;
				data[i + 3] = 255;
			}
		} else {
			this.fillRect(x, y, width, height, color);
		}
	},

	// update sub-rectangle of the current tile
	subTile: function (x, y, w, h, color) {
		if (this._prefer_js) {
			var bgr;
			if (this._true_color) {
				bgr = color;
			} else {
				bgr = this._colourMap[color[0]];
			}
			var red = bgr[2];
			var green = bgr[1];
			var blue = bgr[0];
			var xend = x + w;
			var yend = y + h;

			var data = this._tile.data;
			var width = this._tile.width;
			for (var j = y; j < yend; j++) {
				for (var i = x; i < xend; i++) {
					var p = (i + (j * width)) * 4;
					data[p] = red;
					data[p + 1] = green;
					data[p + 2] = blue;
					data[p + 3] = 255;
				}
			}
		} else {
			this.fillRect(this._tile_x + x, this._tile_y + y, w, h, color);
		}
	},

	// draw the current tile to the screen
	finishTile: function () {
		if (this._prefer_js) {
			this._drawCtx.putImageData(this._tile, this._tile_x - this._viewportLoc.x,
										 this._tile_y - this._viewportLoc.y);
		}
		// else: No-op -- already done by setSubTile
	},

	blitImage: function (x, y, width, height, arr, offset) {
		if (this._true_color) {
			this._bgrxImageData(x, y, this._viewportLoc.x, this._viewportLoc.y, width, height, arr, offset);
		} else {
			this._cmapImageData(x, y, this._viewportLoc.x, this._viewportLoc.y, width, height, arr, offset);
		}
	},

	blitRgbImage: function (x, y , width, height, arr, offset) {
		if (this._true_color) {
			this._rgbImageData(x, y, this._viewportLoc.x, this._viewportLoc.y, width, height, arr, offset);
		} else {
			// probably wrong?
			this._cmapImageData(x, y, this._viewportLoc.x, this._viewportLoc.y, width, height, arr, offset);
		}
	},

	blitStringImage: function (str, x, y) {
		var img = new Image();
		img.onload = function () {
			this._drawCtx.drawImage(img, x - this._viewportLoc.x, y - this._viewportLoc.y);
		}.bind(this);
		img.src = str;
		return img; // for debugging purposes
	},

	// wrap ctx.drawImage but relative to viewport
	drawImage: function (img, x, y) {
		this._drawCtx.drawImage(img, x - this._viewportLoc.x, y - this._viewportLoc.y);
	},

	renderQ_push: function (action) {
		this._renderQ.push(action);
		if (this._renderQ.length === 1) {
			// If this can be rendered immediately it will be, otherwise
			// the scanner will start polling the queue (every
			// requestAnimationFrame interval)
			this._scan_renderQ();
		}
	},

	changeCursor: function (pixels, mask, hotx, hoty, w, h) {
		if (this._cursor_uri === false) {
			debugerror('changeCursor() | called but no cursor data URI support');
			return;
		}

		if (this._true_color) {
			Display.changeCursor(this._target, pixels, mask, hotx, hoty, w, h);
		} else {
			Display.changeCursor(this._target, pixels, mask, hotx, hoty, w, h, this._colourMap);
		}
	},

	defaultCursor: function () {
		this._target.style.cursor = 'default';
	},

	disableLocalCursor: function () {
		this._target.style.cursor = 'none';
	},

	clippingDisplay: function () {
		var vp = this._viewportLoc;

		var fbClip = this._fb_width > vp.w || this._fb_height > vp.h;
		var limitedVp = this._maxWidth !== 0 && this._maxHeight !== 0;
		var clipping = false;

		if (limitedVp) {
			clipping = vp.w > this._maxWidth || vp.h > this._maxHeight;
		}

		return fbClip || (limitedVp && clipping);
	},

	// Overridden getters/setters
	get_context: function () {
		return this._drawCtx;
	},

	set_scale: function (scale) {
		this._rescale(scale);
	},

	set_width: function (w) {
		this._fb_width = w;
	},

	get_width: function () {
		return this._fb_width;
	},

	set_height: function (h) {
		this._fb_height =  h;
	},

	get_height: function () {
		return this._fb_height;
	},

	autoscale: function (containerWidth, containerHeight, downscaleOnly) {
		var targetAspectRatio = containerWidth / containerHeight;
		var fbAspectRatio = this._fb_width / this._fb_height;

		var scaleRatio;
		if (fbAspectRatio >= targetAspectRatio) {
				scaleRatio = containerWidth / this._fb_width;
		} else {
				scaleRatio = containerHeight / this._fb_height;
		}

		var targetW, targetH;
		if (scaleRatio > 1.0 && downscaleOnly) {
				targetW = this._fb_width;
				targetH = this._fb_height;
				scaleRatio = 1.0;
		} else if (fbAspectRatio >= targetAspectRatio) {
				targetW = containerWidth;
				targetH = Math.round(containerWidth / fbAspectRatio);
		} else {
				targetW = Math.round(containerHeight * fbAspectRatio);
				targetH = containerHeight;
		}

		// NB(directxman12): If you set the width directly, or set the
		//                   style width to a number, the canvas is cleared.
		//                   However, if you set the style width to a string
		//                   ('NNNpx'), the canvas is scaled without clearing.
		this._target.style.width = targetW + 'px';
		this._target.style.height = targetH + 'px';

		this._scale = scaleRatio;

		return scaleRatio;  // so that the mouse, etc scale can be set
	},

	// Private Methods

	_rescale: function (factor) {
		this._scale = factor;

		var w;
		var h;

		if (this._viewport &&
			this._maxWidth !== 0 && this._maxHeight !== 0) {
			w = Math.min(this._fb_width, this._maxWidth);
			h = Math.min(this._fb_height, this._maxHeight);
		} else {
			w = this._fb_width;
			h = this._fb_height;
		}

		this._target.style.width = Math.round(factor * w) + 'px';
		this._target.style.height = Math.round(factor * h) + 'px';
	},

	_setFillColor: function (color) {
		var bgr;
		if (this._true_color) {
			bgr = color;
		} else {
			bgr = this._colourMap[color[0]];
		}

		var newStyle = 'rgb(' + bgr[2] + ',' + bgr[1] + ',' + bgr[0] + ')';
		if (newStyle !== this._prevDrawStyle) {
			this._drawCtx.fillStyle = newStyle;
			this._prevDrawStyle = newStyle;
		}
	},

	_rgbImageData: function (x, y, vx, vy, width, height, arr, offset) {
		var img = this._drawCtx.createImageData(width, height);
		var data = img.data;

		for (var i = 0, j = offset; i < width * height * 4; i += 4, j += 3) {
			data[i]     = arr[j];
			data[i + 1] = arr[j + 1];
			data[i + 2] = arr[j + 2];
			data[i + 3] = 255;  // Alpha
		}
		this._drawCtx.putImageData(img, x - vx, y - vy);
	},

	_bgrxImageData: function (x, y, vx, vy, width, height, arr, offset) {
		var img = this._drawCtx.createImageData(width, height);
		var data = img.data;
		for (var i = 0, j = offset; i < width * height * 4; i += 4, j += 4) {
			data[i]     = arr[j + 2];
			data[i + 1] = arr[j + 1];
			data[i + 2] = arr[j];
			data[i + 3] = 255;  // Alpha
		}
		this._drawCtx.putImageData(img, x - vx, y - vy);
	},

	_cmapImageData: function (x, y, vx, vy, width, height, arr, offset) {
		var img = this._drawCtx.createImageData(width, height);
		var data = img.data;
		var cmap = this._colourMap;
		for (var i = 0, j = offset; i < width * height * 4; i += 4, j++) {
			var bgr = cmap[arr[j]];
			data[i]     = bgr[2];
			data[i + 1] = bgr[1];
			data[i + 2] = bgr[0];
			data[i + 3] = 255;  // Alpha
		}
		this._drawCtx.putImageData(img, x - vx, y - vy);
	},

	_scan_renderQ: function () {
		var ready = true;
		while (ready && this._renderQ.length > 0) {
			var a = this._renderQ[0];
			switch (a.type) {
				case 'copy':
					this.copyImage(a.old_x, a.old_y, a.x, a.y, a.width, a.height);
					break;
				case 'fill':
					this.fillRect(a.x, a.y, a.width, a.height, a.color);
					break;
				case 'blit':
					this.blitImage(a.x, a.y, a.width, a.height, a.data, 0);
					break;
				case 'blitRgb':
					this.blitRgbImage(a.x, a.y, a.width, a.height, a.data, 0);
					break;
				case 'img':
					if (a.img.complete) {
						this.drawImage(a.img, a.x, a.y);
					} else {
						// We need to wait for this image to 'load'
						// to keep things in-order
						ready = false;
					}
					break;
			}

			if (ready) {
				this._renderQ.shift();
			}
		}

		if (this._renderQ.length > 0) {
			Util.requestAnimationFrame(this._scan_renderQ.bind(this));
		}
	},
};


Util.make_properties(Display, [
	['target', 'wo', 'dom'],       // Canvas element for rendering
	['context', 'ro', 'raw'],      // Canvas 2D context for rendering (read-only)
	['logo', 'rw', 'raw'],         // Logo to display when cleared: {'width': w, 'height': h, 'data': data}
	['true_color', 'rw', 'bool'],  // Use true-color pixel data
	['colourMap', 'rw', 'arr'],    // Colour map array (when not true-color)
	['scale', 'rw', 'float'],      // Display area scale factor 0.0 - 1.0
	['viewport', 'rw', 'bool'],    // Use viewport clipping
	['width', 'rw', 'int'],        // Display area width
	['height', 'rw', 'int'],       // Display area height
	['maxWidth', 'rw', 'int'],     // Viewport max width (0 if disabled)
	['maxHeight', 'rw', 'int'],    // Viewport max height (0 if disabled)

	['render_mode', 'ro', 'str'],  // Canvas rendering mode (read-only)

	['prefer_js', 'rw', 'str'],    // Prefer Javascript over canvas methods
	['cursor_uri', 'rw', 'raw']    // Can we render cursor using data URI
]);


// Class Methods
Display.changeCursor = function (target, pixels, mask, hotx, hoty, w0, h0, cmap) {
	var w = w0;
	var h = h0;
	if (h < w) {
		h = w;  // increase h to make it square
	} else {
		w = h;  // increase w to make it square
	}

	var cur = [];

	// Push multi-byte little-endian values
	cur.push16le = function (num) {
		this.push(num & 0xFF, (num >> 8) & 0xFF);
	};
	cur.push32le = function (num) {
		this.push(num & 0xFF,
					(num >> 8) & 0xFF,
					(num >> 16) & 0xFF,
					(num >> 24) & 0xFF);
	};

	var IHDRsz = 40;
	var RGBsz = w * h * 4;
	var XORsz = Math.ceil((w * h) / 8.0);
	var ANDsz = Math.ceil((w * h) / 8.0);

	cur.push16le(0);        // 0: Reserved
	cur.push16le(2);        // 2: .CUR type
	cur.push16le(1);        // 4: Number of images, 1 for non-animated ico

	// Cursor #1 header (ICONDIRENTRY)
	cur.push(w);            // 6: width
	cur.push(h);            // 7: height
	cur.push(0);            // 8: colors, 0 -> true-color
	cur.push(0);            // 9: reserved
	cur.push16le(hotx);     // 10: hotspot x coordinate
	cur.push16le(hoty);     // 12: hotspot y coordinate
	cur.push32le(IHDRsz + RGBsz + XORsz + ANDsz);
							// 14: cursor data byte size
	cur.push32le(22);       // 18: offset of cursor data in the file

	// Cursor #1 InfoHeader (ICONIMAGE/BITMAPINFO)
	cur.push32le(IHDRsz);   // 22: InfoHeader size
	cur.push32le(w);        // 26: Cursor width
	cur.push32le(h * 2);    // 30: XOR+AND height
	cur.push16le(1);        // 34: number of planes
	cur.push16le(32);       // 36: bits per pixel
	cur.push32le(0);        // 38: Type of compression

	cur.push32le(XORsz + ANDsz);
							// 42: Size of Image
	cur.push32le(0);        // 46: reserved
	cur.push32le(0);        // 50: reserved
	cur.push32le(0);        // 54: reserved
	cur.push32le(0);        // 58: reserved

	// 62: color data (RGBQUAD icColors[])
	var y, x;
	for (y = h - 1; y >= 0; y--) {
		for (x = 0; x < w; x++) {
			if (x >= w0 || y >= h0) {
				cur.push(0);  // blue
				cur.push(0);  // green
				cur.push(0);  // red
				cur.push(0);  // alpha
			} else {
				var idx = y * Math.ceil(w0 / 8) + Math.floor(x / 8);
				var alpha = (mask[idx] << (x % 8)) & 0x80 ? 255 : 0;
				if (cmap) {
					idx = (w0 * y) + x;
					var rgb = cmap[pixels[idx]];
					cur.push(rgb[2]);  // blue
					cur.push(rgb[1]);  // green
					cur.push(rgb[0]);  // red
					cur.push(alpha);   // alpha
				} else {
					idx = ((w0 * y) + x) * 4;
					cur.push(pixels[idx + 2]); // blue
					cur.push(pixels[idx + 1]); // green
					cur.push(pixels[idx]);     // red
					cur.push(alpha);           // alpha
				}
			}
		}
	}

	// XOR/bitmask data (BYTE icXOR[])
	// (ignored, just needs to be the right size)
	for (y = 0; y < h; y++) {
		for (x = 0; x < Math.ceil(w / 8); x++) {
			cur.push(0);
		}
	}

	// AND/bitmask data (BYTE icAND[])
	// (ignored, just needs to be the right size)
	for (y = 0; y < h; y++) {
		for (x = 0; x < Math.ceil(w / 8); x++) {
			cur.push(0);
		}
	}

	var url = 'data:image/x-icon;base64,' + Base64.encode(cur);
	target.style.cursor = 'url(' + url + ')' + hotx + ' ' + hoty + ', default';
};

},{"./base64":6,"./util":14,"bowser":1,"debug":2}],9:[function(require,module,exports){
(function (global){
/*
 * noVNC: HTML5 VNC client
 * Copyright (C) 2012 Joel Martin
 * Copyright (C) 2013 Samuel Mannehed for Cendio AB
 * Licensed under MPL 2.0 or any later version (see LICENSE.txt)
 */


/**
 * Expose the Input Object.
 */
var Input = module.exports = {};


/**
 * Dependencies.
 */
var debugkeyboard = require('debug')('noVNC:Input:Keybord');
var debugmouse = require('debug')('noVNC:Input:Mouse');
var browser = require('bowser').browser;
var Util = require('./util');
var kbdUtil = require('./kbdutil');


function Keyboard (defaults) {
	this._keyDownList = [];  // List of depressed keys
									         // (even if they are happy)

	Util.set_defaults(this, defaults, {
		'target': document,
		'focused': true
	});

	// create the keyboard handler
	this._handler = new kbdUtil.KeyEventDecoder(kbdUtil.ModifierSync(),
		kbdUtil.VerifyCharModifier(
			kbdUtil.TrackKeyState(
				kbdUtil.EscapeModifiers(this._handleRfbEvent.bind(this))
			)
		)
	); /* jshint newcap: true */

	// keep these here so we can refer to them later
	this._eventHandlers = {
		'keyup': this._handleKeyUp.bind(this),
		'keydown': this._handleKeyDown.bind(this),
		'keypress': this._handleKeyPress.bind(this),
		'blur': this._allKeysUp.bind(this)
	};
}


Keyboard.prototype = {
	_handleRfbEvent: function (e) {
		if (this._onKeyPress) {
			debugkeyboard('onKeyPress: ' + (e.type === 'keydown' ? 'down' : 'up') +
					   ', keysym: ' + e.keysym.keysym + '(' + e.keysym.keyname + ')');
			this._onKeyPress(e.keysym.keysym, e.type === 'keydown');
		}
	},

	_handleKeyDown: function (e) {
		if (!this._focused) { return true; }

		if (this._handler.keydown(e)) {
			// Suppress bubbling/default actions
			Util.stopEvent(e);
			return false;
		} else {
			// Allow the event to bubble and become a keyPress event which
			// will have the character code translated
			return true;
		}
	},

	_handleKeyPress: function (e) {
		if (!this._focused) { return true; }

		if (this._handler.keypress(e)) {
			// Suppress bubbling/default actions
			Util.stopEvent(e);
			return false;
		} else {
			// Allow the event to bubble and become a keyPress event which
			// will have the character code translated
			return true;
		}
	},

	_handleKeyUp: function (e) {
		if (!this._focused) { return true; }

		if (this._handler.keyup(e)) {
			// Suppress bubbling/default actions
			Util.stopEvent(e);
			return false;
		} else {
			// Allow the event to bubble and become a keyUp event which
			// will have the character code translated
			return true;
		}
	},

	_allKeysUp: function () {
		debugkeyboard('allKeysUp');
		this._handler.releaseAll();
	},

	// Public methods

	grab: function () {
		debugkeyboard('grab()');

		var c = this._target;

		Util.addEvent(c, 'keydown', this._eventHandlers.keydown);
		Util.addEvent(c, 'keyup', this._eventHandlers.keyup);
		Util.addEvent(c, 'keypress', this._eventHandlers.keypress);

		// Release (key up) if global loses focus
		Util.addEvent(global, 'blur', this._eventHandlers.blur);
	},

	ungrab: function () {
		debugkeyboard('ungrab()');

		var c = this._target;

		Util.removeEvent(c, 'keydown', this._eventHandlers.keydown);
		Util.removeEvent(c, 'keyup', this._eventHandlers.keyup);
		Util.removeEvent(c, 'keypress', this._eventHandlers.keypress);
		Util.removeEvent(global, 'blur', this._eventHandlers.blur);

		// Release (key up) all keys that are in a down state
		this._allKeysUp();
	},

	sync: function (e) {
		this._handler.syncModifiers(e);
	}
};


Util.make_properties(Keyboard, [
	['target',     'wo', 'dom'],  // DOM element that captures keyboard input
	['focused',    'rw', 'bool'], // Capture and send key events
	['onKeyPress', 'rw', 'func'] // Handler for key press/release
]);


function Mouse (defaults) {
	this._mouseCaptured  = false;

	this._doubleClickTimer = null;
	this._lastTouchPos = null;

	// Configuration attributes
	Util.set_defaults(this, defaults, {
		'target': document,
		'focused': true,
		'scale': 1.0,
		'zoom': 1.0,
		'touchButton': 1
	});

	this._eventHandlers = {
		'mousedown': this._handleMouseDown.bind(this),
		'mouseup': this._handleMouseUp.bind(this),
		'mousemove': this._handleMouseMove.bind(this),
		'mousewheel': this._handleMouseWheel.bind(this),
		'mousedisable': this._handleMouseDisable.bind(this)
	};
}


Mouse.prototype = {
	_captureMouse: function () {
		// capturing the mouse ensures we get the mouseup event
		if (this._target.setCapture) {
			this._target.setCapture();
		}

		// some browsers give us mouseup events regardless,
		// so if we never captured the mouse, we can disregard the event
		this._mouseCaptured = true;
	},

	_releaseMouse: function () {
		if (this._target.releaseCapture) {
			this._target.releaseCapture();
		}
		this._mouseCaptured = false;
	},

	_resetDoubleClickTimer: function () {
		this._doubleClickTimer = null;
	},

	_handleMouseButton: function (e, down) {
		if (!this._focused) { return true; }

		if (this._notify) {
			this._notify(e);
		}

		var evt = (e ? e : global.event);
		var pos = Util.getEventPosition(e, this._target, this._scale, this._zoom);

		var bmask;
		if (e.touches || e.changedTouches) {
			// Touch device

			// When two touches occur within 500 ms of each other and are
			// closer than 20 pixels together a double click is triggered.
			if (down === 1) {
				if (this._doubleClickTimer === null) {
					this._lastTouchPos = pos;
				} else {
					clearTimeout(this._doubleClickTimer);

					// When the distance between the two touches is small enough
					// force the position of the latter touch to the position of
					// the first.

					var xs = this._lastTouchPos.x - pos.x;
					var ys = this._lastTouchPos.y - pos.y;
					var d = Math.sqrt((xs * xs) + (ys * ys));

					// The goal is to trigger on a certain physical width, the
					// devicePixelRatio brings us a bit closer but is not optimal.
					if (d < 20 * global.devicePixelRatio) {
						pos = this._lastTouchPos;
					}
				}
				this._doubleClickTimer = setTimeout(this._resetDoubleClickTimer.bind(this), 500);
			}
			bmask = this._touchButton;
			// If bmask is set
		} else if (evt.which) {
			/* everything except IE */
			bmask = 1 << evt.button;
		} else {
			/* IE including 9 */
			bmask = (evt.button & 0x1) +      // Left
					(evt.button & 0x2) * 2 +  // Right
					(evt.button & 0x4) / 2;   // Middle
		}

		if (this._onMouseButton) {
			debugmouse('onMouseButton: ' + (down ? 'down' : 'up') +
					   ', x: ' + pos.x + ', y: ' + pos.y + ', bmask: ' + bmask);
			this._onMouseButton(pos.x, pos.y, down, bmask);
		}

		Util.stopEvent(e);
		return false;
	},

	_handleMouseDown: function (e) {
		this._captureMouse();
		this._handleMouseButton(e, 1);
	},

	_handleMouseUp: function (e) {
		if (!this._mouseCaptured) { return; }

		this._handleMouseButton(e, 0);
		this._releaseMouse();
	},

	_handleMouseWheel: function (e) {
		if (!this._focused) { return true; }

		if (this._notify) {
			this._notify(e);
		}

		var evt = (e ? e : global.event);
		var pos = Util.getEventPosition(e, this._target, this._scale, this._zoom);
		var wheelData = evt.detail ? evt.detail * -1 : evt.wheelDelta / 40;
		var bmask;
		if (wheelData > 0) {
			bmask = 1 << 3;
		} else {
			bmask = 1 << 4;
		}

		if (this._onMouseButton) {
			this._onMouseButton(pos.x, pos.y, 1, bmask);
			this._onMouseButton(pos.x, pos.y, 0, bmask);
		}

		Util.stopEvent(e);
		return false;
	},

	_handleMouseMove: function (e) {
		if (!this._focused) { return true; }

		if (this._notify) {
			this._notify(e);
		}

		var pos = Util.getEventPosition(e, this._target, this._scale, this._zoom);
		if (this._onMouseMove) {
			this._onMouseMove(pos.x, pos.y);
		}

		Util.stopEvent(e);
		return false;
	},

	_handleMouseDisable: function (e) {
		if (!this._focused) { return true; }

		var pos = Util.getEventPosition(e, this._target, this._scale, this._zoom);

		/* Stop propagation if inside canvas area */
		if ((pos.realx >= 0) && (pos.realy >= 0) &&
			(pos.realx < this._target.offsetWidth) &&
			(pos.realy < this._target.offsetHeight)) {

			Util.stopEvent(e);
			return false;
		}

		return true;
	},

	// Public methods

	grab: function () {
		debugmouse('grab()');

		var c = this._target;
		var isTouch = 'ontouchstart' in document.documentElement;

		if (isTouch) {
			Util.addEvent(c, 'touchstart', this._eventHandlers.mousedown);
			Util.addEvent(global, 'touchend', this._eventHandlers.mouseup);
			Util.addEvent(c, 'touchend', this._eventHandlers.mouseup);
			Util.addEvent(c, 'touchmove', this._eventHandlers.mousemove);
		}

		if (!isTouch || this._enableMouseAndTouch) {
			Util.addEvent(c, 'mousedown', this._eventHandlers.mousedown);
			Util.addEvent(global, 'mouseup', this._eventHandlers.mouseup);
			Util.addEvent(c, 'mouseup', this._eventHandlers.mouseup);
			Util.addEvent(c, 'mousemove', this._eventHandlers.mousemove);
			Util.addEvent(c, (browser.gecko) ? 'DOMMouseScroll' : 'mousewheel',
						  this._eventHandlers.mousewheel);
		}

		/* Work around right and middle click browser behaviors */
		Util.addEvent(document, 'click', this._eventHandlers.mousedisable);
		Util.addEvent(document.body, 'contextmenu', this._eventHandlers.mousedisable);
	},

	ungrab: function () {
		debugmouse('ungrab()');

		var c = this._target;
		var isTouch = 'ontouchstart' in document.documentElement;

		if (isTouch) {
			Util.removeEvent(c, 'touchstart', this._eventHandlers.mousedown);
			Util.removeEvent(global, 'touchend', this._eventHandlers.mouseup);
			Util.removeEvent(c, 'touchend', this._eventHandlers.mouseup);
			Util.removeEvent(c, 'touchmove', this._eventHandlers.mousemove);
		}

		if (!isTouch || this._enableMouseAndTouch) {
			Util.removeEvent(c, 'mousedown', this._eventHandlers.mousedown);
			Util.removeEvent(global, 'mouseup', this._eventHandlers.mouseup);
			Util.removeEvent(c, 'mouseup', this._eventHandlers.mouseup);
			Util.removeEvent(c, 'mousemove', this._eventHandlers.mousemove);
			Util.removeEvent(c, (browser.gecko) ? 'DOMMouseScroll' : 'mousewheel',
							 this._eventHandlers.mousewheel);
		}

		/* Work around right and middle click browser behaviors */
		Util.removeEvent(document, 'click', this._eventHandlers.mousedisable);
		Util.removeEvent(document.body, 'contextmenu', this._eventHandlers.mousedisable);

	}
};


Util.make_properties(Mouse, [
	['target',         'ro', 'dom'],   // DOM element that captures mouse input
	['notify',         'ro', 'func'],  // Function to call to notify whenever a mouse event is received
	['focused',        'rw', 'bool'],  // Capture and send mouse clicks/movement
	['scale',          'rw', 'float'], // Viewport scale factor 0.0 - 1.0
	['zoom',           'rw', 'float'], // CSS zoom applied to the DOM element that captures mouse input
	['enableMouseAndTouch', 'rw', 'bool'],  // Whether also enable mouse events when touch screen is detected

	['onMouseButton',  'rw', 'func'],  // Handler for mouse button click/release
	['onMouseMove',    'rw', 'func'],  // Handler for mouse movement
	['touchButton',    'rw', 'int']    // Button mask (1, 2, 4) for touch devices (0 means ignore clicks)
]);


/**
 * Add Keyboard and Mouse in the exposed Object.
 */
Input.Keyboard = Keyboard;
Input.Mouse = Mouse;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./kbdutil":10,"./util":14,"bowser":1,"debug":2}],10:[function(require,module,exports){
/**
 * Dependencies.
 */
var debugerror = require('debug')('noVNC:ERROR:KbdUtil');
debugerror.log = console.warn.bind(console);
var Keys = require('./keys');


var KbdUtil = module.exports = {
	/**
	 * Return true if a modifier which is not the specified char modifier (and
	 * is not shift) is down.
	 */
	hasShortcutModifier: function (charModifier, currentModifiers) {
		var mods = {};
		for (var key in currentModifiers) {
			if (parseInt(key) !== Keys.XK_Shift_L) {
				mods[key] = currentModifiers[key];
			}
		}

		var sum = 0;
		for (var k in currentModifiers) {
			if (mods[k]) {
				++sum;
			}
		}

		if (KbdUtil.hasCharModifier(charModifier, mods)) {
			return sum > charModifier.length;
		}
		else {
			return sum > 0;
		}
	},

	/**
	 * Return true if the specified char modifier is currently down.
	 */
	hasCharModifier: function (charModifier, currentModifiers) {
		if (charModifier.length === 0) { return false; }

		for (var i = 0; i < charModifier.length; ++i) {
			if (!currentModifiers[charModifier[i]]) {
				return false;
			}
		}
		return true;
	},

	/**
	 * Helper object tracking modifier key state and generates fake key events
	 * to compensate if it gets out of sync.
	 */
	ModifierSync: function (charModifier) {
		if (!charModifier) {
			if (isMac()) {
				// on Mac, Option (AKA Alt) is used as a char modifier
				charModifier = [Keys.XK_Alt_L];
			}
			else if (isWindows()) {
				// on Windows, Ctrl+Alt is used as a char modifier
				charModifier = [Keys.XK_Alt_L, Keys.XK_Control_L];
			}
			else if (isLinux()) {
				// on Linux, ISO Level 3 Shift (AltGr) is used as a char modifier
				charModifier = [Keys.XK_ISO_Level3_Shift];
			}
			else {
				charModifier = [];
			}
		}

		var state = {};

		state[Keys.XK_Control_L] = false;
		state[Keys.XK_Alt_L] = false;
		state[Keys.XK_ISO_Level3_Shift] = false;
		state[Keys.XK_Shift_L] = false;
		state[Keys.XK_Meta_L] = false;

		function sync(evt, keysym) {
			var result = [];

			function syncKey(keysym) {
				return {keysym: Keys.lookup(keysym), type: state[keysym] ? 'keydown' : 'keyup'};
			}

			if (evt.ctrlKey !== undefined &&
				evt.ctrlKey !== state[Keys.XK_Control_L] && keysym !== Keys.XK_Control_L) {
				state[Keys.XK_Control_L] = evt.ctrlKey;
				result.push(syncKey(Keys.XK_Control_L));
			}
			if (evt.altKey !== undefined &&
				evt.altKey !== state[Keys.XK_Alt_L] && keysym !== Keys.XK_Alt_L) {
				state[Keys.XK_Alt_L] = evt.altKey;
				result.push(syncKey(Keys.XK_Alt_L));
			}
			if (evt.altGraphKey !== undefined &&
				evt.altGraphKey !== state[Keys.XK_ISO_Level3_Shift] && keysym !== Keys.XK_ISO_Level3_Shift) {
				state[Keys.XK_ISO_Level3_Shift] = evt.altGraphKey;
				result.push(syncKey(Keys.XK_ISO_Level3_Shift));
			}
			if (evt.shiftKey !== undefined &&
				evt.shiftKey !== state[Keys.XK_Shift_L] && keysym !== Keys.XK_Shift_L) {
				state[Keys.XK_Shift_L] = evt.shiftKey;
				result.push(syncKey(Keys.XK_Shift_L));
			}
			if (evt.metaKey !== undefined &&
				evt.metaKey !== state[Keys.XK_Meta_L] && keysym !== Keys.XK_Meta_L) {
				state[Keys.XK_Meta_L] = evt.metaKey;
				result.push(syncKey(Keys.XK_Meta_L));
			}
			return result;
		}

		function syncKeyEvent(evt, down) {
			var obj = KbdUtil.getKeysym(evt);
			var keysym = obj ? obj.keysym : null;

			// first, apply the event itself, if relevant
			if (keysym !== null && state[keysym] !== undefined) {
				state[keysym] = down;
			}
			return sync(evt, keysym);
		}

		return {
			// sync on the appropriate keyboard event
			keydown: function(evt) { return syncKeyEvent(evt, true); },
			keyup: function(evt) { return syncKeyEvent(evt, false); },
			// Call this with a non-keyboard event (such as mouse events) to use its modifier state to synchronize anyway
			syncAny: function(evt) { return sync(evt); },

			// is a shortcut modifier down?
			hasShortcutModifier: function() {
				return KbdUtil.hasShortcutModifier(charModifier, state);
			},
			// if a char modifier is down, return the keys it consists of, otherwise return null
			activeCharModifier: function() {
				return KbdUtil.hasCharModifier(charModifier, state) ? charModifier : null;
			}
		};
	},

	/**
	 * Get a key ID from a keyboard event.
	 * May be a string or an integer depending on the available properties.
	 */
	getKey: function (evt) {
		if ('keyCode' in evt && 'key' in evt) {
			return evt.key + ':' + evt.keyCode;
		}
		else if ('keyCode' in evt) {
			return evt.keyCode;
		}
		else {
			return evt.key;
		}
	},

	/**
	 * Get the most reliable keysym value we can get from a key event.
	 * If char/charCode is available, prefer those, otherwise fall back to
	 * key/keyCode/which.
	 */
	getKeysym: function (evt) {
		var codepoint;

		if (evt.char && evt.char.length === 1) {
			codepoint = evt.char.charCodeAt();
		}
		else if (evt.charCode) {
			codepoint = evt.charCode;
		}
		else if (evt.keyCode && evt.type === 'keypress') {
			// IE10 stores the char code as keyCode, and has no other useful properties
			codepoint = evt.keyCode;
		}

		if (codepoint) {
			var res = Keys.fromUnicode(KbdUtil.substituteCodepoint(codepoint));
			if (res) {
				return res;
			}
		}

		// we could check evt.key here.
		// Legal values are defined in http://www.w3.org/TR/DOM-Level-3-Events/#key-values-list,
		// so we "just" need to map them to keysym, but AFAIK this is only available in IE10,
		// which also provides evt.key so we don't *need* it yet.
		if (evt.keyCode) {
			return Keys.lookup(KbdUtil.keysymFromKeyCode(evt.keyCode, evt.shiftKey));
		}
		if (evt.which) {
			return Keys.lookup(KbdUtil.keysymFromKeyCode(evt.which, evt.shiftKey));
		}
		return null;
	},

	/**
	 * Given a keycode, try to predict which keysym it might be.
	 * If the keycode is unknown, null is returned.
	 */
	keysymFromKeyCode: function (keycode, shiftPressed) {
		if (typeof(keycode) !== 'number') {
			return null;
		}
		// won't be accurate for azerty
		if (keycode >= 0x30 && keycode <= 0x39) {
			return keycode; // digit
		}
		if (keycode >= 0x41 && keycode <= 0x5a) {
			// remap to lowercase unless shift is down
			return shiftPressed ? keycode : keycode + 32; // A-Z
		}
		if (keycode >= 0x60 && keycode <= 0x69) {
			return Keys.XK_KP_0 + (keycode - 0x60); // numpad 0-9
		}

		switch(keycode) {
			case 0x20: return Keys.XK_space;
			case 0x6a: return Keys.XK_KP_Multiply;
			case 0x6b: return Keys.XK_KP_Add;
			case 0x6c: return Keys.XK_KP_Separator;
			case 0x6d: return Keys.XK_KP_Subtract;
			case 0x6e: return Keys.XK_KP_Decimal;
			case 0x6f: return Keys.XK_KP_Divide;
			case 0xbb: return Keys.XK_plus;
			case 0xbc: return Keys.XK_comma;
			case 0xbd: return Keys.XK_minus;
			case 0xbe: return Keys.XK_period;
		}

		return KbdUtil.nonCharacterKey({keyCode: keycode});
	},

	/**
	 * If the key is a known non-character key (any key which doesn't generate
	 * character data) return its keysym value. Otherwise return null.
	 */
	nonCharacterKey: function (evt) {
		// evt.key not implemented yet
		if (!evt.keyCode) { return null; }

		var keycode = evt.keyCode;

		if (keycode >= 0x70 && keycode <= 0x87) {
			return Keys.XK_F1 + keycode - 0x70; // F1-F24
		}

		switch (keycode) {
			case 8 : return Keys.XK_BackSpace;
			case 13 : return Keys.XK_Return;

			case 9 : return Keys.XK_Tab;

			case 27 : return Keys.XK_Escape;
			case 46 : return Keys.XK_Delete;

			case 36 : return Keys.XK_Home;
			case 35 : return Keys.XK_End;
			case 33 : return Keys.XK_Page_Up;
			case 34 : return Keys.XK_Page_Down;
			case 45 : return Keys.XK_Insert;

			case 37 : return Keys.XK_Left;
			case 38 : return Keys.XK_Up;
			case 39 : return Keys.XK_Right;
			case 40 : return Keys.XK_Down;

			case 16 : return Keys.XK_Shift_L;
			case 17 : return Keys.XK_Control_L;
			case 18 : return Keys.XK_Alt_L; // also: Option-key on Mac

			case 224 : return Keys.XK_Meta_L;
			case 225 : return Keys.XK_ISO_Level3_Shift; // AltGr
			case 91 : return Keys.XK_Super_L; // also: Windows-key
			case 92 : return Keys.XK_Super_R; // also: Windows-key
			case 93 : return Keys.XK_Menu; // also: Windows-Menu, Command on Mac

			default: return null;
		}
	},

	substituteCodepoint: function(cp) {
		// Any Unicode code points which do not have corresponding keysym entries
		// can be swapped out for another code point by adding them to this table.
		var substitutions = {
			// {S,s} with comma below -> {S,s} with cedilla
			0x218 : 0x15e,
			0x219 : 0x15f,
			// {T,t} with comma below -> {T,t} with cedilla
			0x21a : 0x162,
			0x21b : 0x163
		};

		var sub = substitutions[cp];
		return sub ? sub : cp;
	},

	/**
	 * Takes a DOM keyboard event and:
	 * - determines which keysym it represents.
	 * - determines a keyId  identifying the key that was pressed (corresponding
	 *   to the key/keyCode properties on the DOM event).
	 * - synthesizes events to synchronize modifier key state between which
	 *   modifiers are actually down, and which we thought were down.
	 * - marks each event with an 'escape' property if a modifier was down which
	 *   should be "escaped".
	 * - generates a "stall" event in cases where it might be necessary to wait
	 *   and see if a keypress event follows a keydown.
	 *
	 * This information is collected into an object which is passed to the next()
	 * function (one call per event).
	 */
	KeyEventDecoder: function (modifierState, next) {
		function sendAll(evts) {
			for (var i = 0; i < evts.length; ++i) {
				next(evts[i]);
			}
		}

		function process(evt, type) {
			var result = {type: type};
			var keyId = KbdUtil.getKey(evt);

			if (keyId) {
				result.keyId = keyId;
			}

			var keysym = KbdUtil.getKeysym(evt);

			var hasModifier = modifierState.hasShortcutModifier() || !!modifierState.activeCharModifier();

			// Is this a case where we have to decide on the keysym right away, rather than waiting for the keypress?
			// "special" keys like enter, tab or backspace don't send keypress events,
			// and some browsers don't send keypresses at all if a modifier is down
			if (keysym && (type !== 'keydown' || KbdUtil.nonCharacterKey(evt) || hasModifier)) {
				result.keysym = keysym;
			}

			var isShift = evt.keyCode === 0x10 || evt.key === 'Shift';

			// Should we prevent the browser from handling the event?
			// Doing so on a keydown (in most browsers) prevents keypress from being generated
			// so only do that if we have to.
			var suppress = !isShift && (type !== 'keydown' || modifierState.hasShortcutModifier() || !!KbdUtil.nonCharacterKey(evt));

			// If a char modifier is down on a keydown, we need to insert a stall,
			// so VerifyCharModifier knows to wait and see if a keypress is comnig
			var stall = type === 'keydown' && modifierState.activeCharModifier() && !KbdUtil.nonCharacterKey(evt);

			// if a char modifier is pressed, get the keys it consists of (on Windows, AltGr is equivalent to Ctrl+Alt)
			var active = modifierState.activeCharModifier();

			// If we have a char modifier down, and we're able to determine a keysym reliably
			// then (a) we know to treat the modifier as a char modifier,
			// and (b) we'll have to "escape" the modifier to undo the modifier when sending the char.
			if (active && keysym) {
				var isCharModifier = false;
				for (var i  = 0; i < active.length; ++i) {
					if (active[i] === keysym.keysym) {
						isCharModifier = true;
					}
				}
				if (type === 'keypress' && !isCharModifier) {
					result.escape = modifierState.activeCharModifier();
				}
			}

			if (stall) {
				// insert a fake "stall" event
				next({type: 'stall'});
			}
			next(result);

			return suppress;
		}

		return {
			keydown: function(evt) {
				sendAll(modifierState.keydown(evt));
				return process(evt, 'keydown');
			},
			keypress: function(evt) {
				return process(evt, 'keypress');
			},
			keyup: function(evt) {
				sendAll(modifierState.keyup(evt));
				return process(evt, 'keyup');
			},
			syncModifiers: function(evt) {
				sendAll(modifierState.syncAny(evt));
			},
			releaseAll: function() { next({type: 'releaseall'}); }
		};
	},

	/**
	 * Combines keydown and keypress events where necessary to handle char modifiers.
	 * On some OS'es, a char modifier is sometimes used as a shortcut modifier.
	 * For example, on Windows, AltGr is synonymous with Ctrl-Alt. On a Danish keyboard
	 * layout, AltGr-2 yields a @, but Ctrl-Alt-D does nothing so when used with the
	 * '2' key, Ctrl-Alt counts as a char modifier (and should be escaped), but when
	 * used with 'D', it does not.
	 * The only way we can distinguish these cases is to wait and see if a keypress
	 * event arrives. When we receive a "stall" event, wait a few ms before processing
	 * the next keydown. If a keypress has also arrived, merge the two.
	 */
	VerifyCharModifier: function (next) {
		var queue = [];
		var timer = null;

		function process() {
			if (timer) {
				return;
			}

			function delayProcess () {
				clearTimeout(timer);
				timer = null;
				process();
			}

			while (queue.length !== 0) {
				var cur = queue[0];
				queue = queue.splice(1);

				switch (cur.type) {
					case 'stall':
						// insert a delay before processing available events.
						/* jshint loopfunc: true */
						timer = setTimeout(delayProcess, 5);
						/* jshint loopfunc: false */
						return;
					case 'keydown':
						// is the next element a keypress? Then we should merge the two
						if (queue.length !== 0 && queue[0].type === 'keypress') {
							// Firefox sends keypress even when no char is generated.
							// so, if keypress keysym is the same as we'd have guessed from keydown,
							// the modifier didn't have any effect, and should not be escaped
							if (queue[0].escape && (!cur.keysym || cur.keysym.keysym !== queue[0].keysym.keysym)) {
								cur.escape = queue[0].escape;
							}
							cur.keysym = queue[0].keysym;
							queue = queue.splice(1);
						}
						break;
				}

				// swallow stall events, and pass all others to the next stage
				if (cur.type !== 'stall') {
					next(cur);
				}
			}
		}

		return function(evt) {
			queue.push(evt);
			process();
		};
	},

	/**
	 * Keeps track of which keys we (and the server) believe are down.
	 * When a keyup is received, match it against this list, to determine the
	 * corresponding keysym(s) in some cases, a single key may produce multiple
	 * keysyms, so the corresponding keyup event must release all of these chars
	 * key repeat events should be merged into a single entry.
	 * Because we can't always identify which entry a keydown or keyup event
	 * corresponds to, we sometimes have to guess.
	 */
	TrackKeyState: function (next) {
		var state = [];

		return function (evt) {
			var last = state.length !== 0 ? state[state.length-1] : null;

			switch (evt.type) {
				case 'keydown':
					// insert a new entry if last seen key was different.
					if (!last || !evt.keyId || last.keyId !== evt.keyId) {
						last = {keyId: evt.keyId, keysyms: {}};
						state.push(last);
					}
					if (evt.keysym) {
						// make sure last event contains this keysym (a single "logical" keyevent
						// can cause multiple key events to be sent to the VNC server)
						last.keysyms[evt.keysym.keysym] = evt.keysym;
						last.ignoreKeyPress = true;
						next(evt);
					}
					break;
				case 'keypress':
					if (!last) {
						last = {keyId: evt.keyId, keysyms: {}};
						state.push(last);
					}
					if (!evt.keysym) {
						debugerror('TrackKeyState() | keypress with no keysym:', evt);
					}

					// If we didn't expect a keypress, and already sent a keydown to the VNC server
					// based on the keydown, make sure to skip this event.
					if (evt.keysym && !last.ignoreKeyPress) {
						last.keysyms[evt.keysym.keysym] = evt.keysym;
						evt.type = 'keydown';
						next(evt);
					}
					break;
				case 'keyup':
					if (state.length === 0) {
						return;
					}
					var idx = null;
					// do we have a matching key tracked as being down?
					for (var i = 0; i !== state.length; ++i) {
						if (state[i].keyId === evt.keyId) {
							idx = i;
							break;
						}
					}
					// if we couldn't find a match (it happens), assume it was the last key pressed
					if (idx === null) {
						idx = state.length - 1;
					}

					var item = state.splice(idx, 1)[0];
					// for each keysym tracked by this key entry, clone the current event and override the keysym
					var clone = (function(){
						function Clone(){}
						return function (obj) { Clone.prototype=obj; return new Clone(); };
					}());
					for (var key in item.keysyms) {
						var out = clone(evt);
						out.keysym = item.keysyms[key];
						next(out);
					}
					break;
				case 'releaseall':
					/* jshint shadow: true */
					for (var i = 0; i < state.length; ++i) {
						for (var key in state[i].keysyms) {
							var keysym = state[i].keysyms[key];
							next({keyId: 0, keysym: keysym, type: 'keyup'});
						}
					}
					/* jshint shadow: false */
					state = [];
					break;
			}
		};
	},

	/**
	 * Handles "escaping" of modifiers: if a char modifier is used to produce a
	 * keysym (such as AltGr-2 to generate an @), then the modifier must be
	 * "undone" before sending the @, and "redone" afterwards.
	 */
	EscapeModifiers: function (next) {
		return function(evt) {
			var i;

			if (evt.type !== 'keydown' || evt.escape === undefined) {
				next(evt);
				return;
			}

			// undo modifiers
			for (i = 0; i < evt.escape.length; ++i) {
				next({type: 'keyup', keyId: 0, keysym: Keys.lookup(evt.escape[i])});
			}

			// send the character event
			next(evt);

			// redo modifiers
			for (i = 0; i < evt.escape.length; ++i) {
				next({type: 'keydown', keyId: 0, keysym: Keys.lookup(evt.escape[i])});
			}
		};
	}
};


/**
 * Private API.
 */


function isMac() {
	return navigator && !!(/mac/i).exec(navigator.platform);
}

function isWindows() {
	return navigator && !!(/win/i).exec(navigator.platform);
}

function isLinux() {
	return navigator && !!(/linux/i).exec(navigator.platform);
}

},{"./keys":11,"debug":2}],11:[function(require,module,exports){
/**
 * The Object to be exposed.
 */
var Keys = {
	XK_VoidSymbol:                  0xffffff, /* Void symbol */

	XK_BackSpace:                   0xff08, /* Back space, back char */
	XK_Tab:                         0xff09,
	XK_Linefeed:                    0xff0a, /* Linefeed, LF */
	XK_Clear:                       0xff0b,
	XK_Return:                      0xff0d, /* Return, enter */
	XK_Pause:                       0xff13, /* Pause, hold */
	XK_Scroll_Lock:                 0xff14,
	XK_Sys_Req:                     0xff15,
	XK_Escape:                      0xff1b,
	XK_Delete:                      0xffff, /* Delete, rubout */

	/* Cursor control & motion */

	XK_Home:                        0xff50,
	XK_Left:                        0xff51, /* Move left, left arrow */
	XK_Up:                          0xff52, /* Move up, up arrow */
	XK_Right:                       0xff53, /* Move right, right arrow */
	XK_Down:                        0xff54, /* Move down, down arrow */
	XK_Prior:                       0xff55, /* Prior, previous */
	XK_Page_Up:                     0xff55,
	XK_Next:                        0xff56, /* Next */
	XK_Page_Down:                   0xff56,
	XK_End:                         0xff57, /* EOL */
	XK_Begin:                       0xff58, /* BOL */

	/* Misc functions */

	XK_Select:                      0xff60, /* Select, mark */
	XK_Print:                       0xff61,
	XK_Execute:                     0xff62, /* Execute, run, do */
	XK_Insert:                      0xff63, /* Insert, insert here */
	XK_Undo:                        0xff65,
	XK_Redo:                        0xff66, /* Redo, again */
	XK_Menu:                        0xff67,
	XK_Find:                        0xff68, /* Find, search */
	XK_Cancel:                      0xff69, /* Cancel, stop, abort, exit */
	XK_Help:                        0xff6a, /* Help */
	XK_Break:                       0xff6b,
	XK_Mode_switch:                 0xff7e, /* Character set switch */
	XK_script_switch:               0xff7e, /* Alias for mode_switch */
	XK_Num_Lock:                    0xff7f,

	/* Keypad functions, keypad numbers cleverly chosen to map to ASCII */

	XK_KP_Space:                    0xff80, /* Space */
	XK_KP_Tab:                      0xff89,
	XK_KP_Enter:                    0xff8d, /* Enter */
	XK_KP_F1:                       0xff91, /* PF1, KP_A, ... */
	XK_KP_F2:                       0xff92,
	XK_KP_F3:                       0xff93,
	XK_KP_F4:                       0xff94,
	XK_KP_Home:                     0xff95,
	XK_KP_Left:                     0xff96,
	XK_KP_Up:                       0xff97,
	XK_KP_Right:                    0xff98,
	XK_KP_Down:                     0xff99,
	XK_KP_Prior:                    0xff9a,
	XK_KP_Page_Up:                  0xff9a,  // NOTE: ibc fix (comma was missing)
	XK_KP_Next:                     0xff9b,
	XK_KP_Page_Down:                0xff9b,
	XK_KP_End:                      0xff9c,
	XK_KP_Begin:                    0xff9d,
	XK_KP_Insert:                   0xff9e,
	XK_KP_Delete:                   0xff9f,
	XK_KP_Equal:                    0xffbd, /* Equals */
	XK_KP_Multiply:                 0xffaa,
	XK_KP_Add:                      0xffab,
	XK_KP_Separator:                0xffac, /* Separator, often comma */
	XK_KP_Subtract:                 0xffad,
	XK_KP_Decimal:                  0xffae,
	XK_KP_Divide:                   0xffaf,

	XK_KP_0:                        0xffb0,
	XK_KP_1:                        0xffb1,
	XK_KP_2:                        0xffb2,
	XK_KP_3:                        0xffb3,
	XK_KP_4:                        0xffb4,
	XK_KP_5:                        0xffb5,
	XK_KP_6:                        0xffb6,
	XK_KP_7:                        0xffb7,
	XK_KP_8:                        0xffb8,
	XK_KP_9:                        0xffb9,

	/*
	 * Auxiliary functions; note the duplicate definitions for left and right
	 * function keys;  Sun keyboards and a few other manufacturers have such
	 * function key groups on the left and/or right sides of the keyboard.
	 * We've not found a keyboard with more than 35 function keys total.
	 */

	XK_F1:                          0xffbe,
	XK_F2:                          0xffbf,
	XK_F3:                          0xffc0,
	XK_F4:                          0xffc1,
	XK_F5:                          0xffc2,
	XK_F6:                          0xffc3,
	XK_F7:                          0xffc4,
	XK_F8:                          0xffc5,
	XK_F9:                          0xffc6,
	XK_F10:                         0xffc7,
	XK_F11:                         0xffc8,
	XK_L1:                          0xffc8,
	XK_F12:                         0xffc9,
	XK_L2:                          0xffc9,
	XK_F13:                         0xffca,
	XK_L3:                          0xffca,
	XK_F14:                         0xffcb,
	XK_L4:                          0xffcb,
	XK_F15:                         0xffcc,
	XK_L5:                          0xffcc,
	XK_F16:                         0xffcd,
	XK_L6:                          0xffcd,
	XK_F17:                         0xffce,
	XK_L7:                          0xffce,
	XK_F18:                         0xffcf,
	XK_L8:                          0xffcf,
	XK_F19:                         0xffd0,
	XK_L9:                          0xffd0,
	XK_F20:                         0xffd1,
	XK_L10:                         0xffd1,
	XK_F21:                         0xffd2,
	XK_R1:                          0xffd2,
	XK_F22:                         0xffd3,
	XK_R2:                          0xffd3,
	XK_F23:                         0xffd4,
	XK_R3:                          0xffd4,
	XK_F24:                         0xffd5,
	XK_R4:                          0xffd5,
	XK_F25:                         0xffd6,
	XK_R5:                          0xffd6,
	XK_F26:                         0xffd7,
	XK_R6:                          0xffd7,
	XK_F27:                         0xffd8,
	XK_R7:                          0xffd8,
	XK_F28:                         0xffd9,
	XK_R8:                          0xffd9,
	XK_F29:                         0xffda,
	XK_R9:                          0xffda,
	XK_F30:                         0xffdb,
	XK_R10:                         0xffdb,
	XK_F31:                         0xffdc,
	XK_R11:                         0xffdc,
	XK_F32:                         0xffdd,
	XK_R12:                         0xffdd,
	XK_F33:                         0xffde,
	XK_R13:                         0xffde,
	XK_F34:                         0xffdf,
	XK_R14:                         0xffdf,
	XK_F35:                         0xffe0,
	XK_R15:                         0xffe0,

	/* Modifiers */

	XK_Shift_L:                     0xffe1, /* Left shift */
	XK_Shift_R:                     0xffe2, /* Right shift */
	XK_Control_L:                   0xffe3, /* Left control */
	XK_Control_R:                   0xffe4, /* Right control */
	XK_Caps_Lock:                   0xffe5, /* Caps lock */
	XK_Shift_Lock:                  0xffe6, /* Shift lock */

	XK_Meta_L:                      0xffe7, /* Left meta */
	XK_Meta_R:                      0xffe8, /* Right meta */
	XK_Alt_L:                       0xffe9, /* Left alt */
	XK_Alt_R:                       0xffea, /* Right alt */
	XK_Super_L:                     0xffeb, /* Left super */
	XK_Super_R:                     0xffec, /* Right super */
	XK_Hyper_L:                     0xffed, /* Left hyper */
	XK_Hyper_R:                     0xffee, /* Right hyper */

	XK_ISO_Level3_Shift:            0xfe03, /* AltGr */

	/*
	 * Latin 1
	 * (ISO/IEC 8859-1: Unicode U+0020..U+00FF)
	 * Byte 3 = 0
	 */

	XK_space:                       0x0020, /* U+0020 SPACE */
	XK_exclam:                      0x0021, /* U+0021 EXCLAMATION MARK */
	XK_quotedbl:                    0x0022, /* U+0022 QUOTATION MARK */
	XK_numbersign:                  0x0023, /* U+0023 NUMBER SIGN */
	XK_dollar:                      0x0024, /* U+0024 DOLLAR SIGN */
	XK_percent:                     0x0025, /* U+0025 PERCENT SIGN */
	XK_ampersand:                   0x0026, /* U+0026 AMPERSAND */
	XK_apostrophe:                  0x0027, /* U+0027 APOSTROPHE */
	XK_quoteright:                  0x0027, /* deprecated */
	XK_parenleft:                   0x0028, /* U+0028 LEFT PARENTHESIS */
	XK_parenright:                  0x0029, /* U+0029 RIGHT PARENTHESIS */
	XK_asterisk:                    0x002a, /* U+002A ASTERISK */
	XK_plus:                        0x002b, /* U+002B PLUS SIGN */
	XK_comma:                       0x002c, /* U+002C COMMA */
	XK_minus:                       0x002d, /* U+002D HYPHEN-MINUS */
	XK_period:                      0x002e, /* U+002E FULL STOP */
	XK_slash:                       0x002f, /* U+002F SOLIDUS */
	XK_0:                           0x0030, /* U+0030 DIGIT ZERO */
	XK_1:                           0x0031, /* U+0031 DIGIT ONE */
	XK_2:                           0x0032, /* U+0032 DIGIT TWO */
	XK_3:                           0x0033, /* U+0033 DIGIT THREE */
	XK_4:                           0x0034, /* U+0034 DIGIT FOUR */
	XK_5:                           0x0035, /* U+0035 DIGIT FIVE */
	XK_6:                           0x0036, /* U+0036 DIGIT SIX */
	XK_7:                           0x0037, /* U+0037 DIGIT SEVEN */
	XK_8:                           0x0038, /* U+0038 DIGIT EIGHT */
	XK_9:                           0x0039, /* U+0039 DIGIT NINE */
	XK_colon:                       0x003a, /* U+003A COLON */
	XK_semicolon:                   0x003b, /* U+003B SEMICOLON */
	XK_less:                        0x003c, /* U+003C LESS-THAN SIGN */
	XK_equal:                       0x003d, /* U+003D EQUALS SIGN */
	XK_greater:                     0x003e, /* U+003E GREATER-THAN SIGN */
	XK_question:                    0x003f, /* U+003F QUESTION MARK */
	XK_at:                          0x0040, /* U+0040 COMMERCIAL AT */
	XK_A:                           0x0041, /* U+0041 LATIN CAPITAL LETTER A */
	XK_B:                           0x0042, /* U+0042 LATIN CAPITAL LETTER B */
	XK_C:                           0x0043, /* U+0043 LATIN CAPITAL LETTER C */
	XK_D:                           0x0044, /* U+0044 LATIN CAPITAL LETTER D */
	XK_E:                           0x0045, /* U+0045 LATIN CAPITAL LETTER E */
	XK_F:                           0x0046, /* U+0046 LATIN CAPITAL LETTER F */
	XK_G:                           0x0047, /* U+0047 LATIN CAPITAL LETTER G */
	XK_H:                           0x0048, /* U+0048 LATIN CAPITAL LETTER H */
	XK_I:                           0x0049, /* U+0049 LATIN CAPITAL LETTER I */
	XK_J:                           0x004a, /* U+004A LATIN CAPITAL LETTER J */
	XK_K:                           0x004b, /* U+004B LATIN CAPITAL LETTER K */
	XK_L:                           0x004c, /* U+004C LATIN CAPITAL LETTER L */
	XK_M:                           0x004d, /* U+004D LATIN CAPITAL LETTER M */
	XK_N:                           0x004e, /* U+004E LATIN CAPITAL LETTER N */
	XK_O:                           0x004f, /* U+004F LATIN CAPITAL LETTER O */
	XK_P:                           0x0050, /* U+0050 LATIN CAPITAL LETTER P */
	XK_Q:                           0x0051, /* U+0051 LATIN CAPITAL LETTER Q */
	XK_R:                           0x0052, /* U+0052 LATIN CAPITAL LETTER R */
	XK_S:                           0x0053, /* U+0053 LATIN CAPITAL LETTER S */
	XK_T:                           0x0054, /* U+0054 LATIN CAPITAL LETTER T */
	XK_U:                           0x0055, /* U+0055 LATIN CAPITAL LETTER U */
	XK_V:                           0x0056, /* U+0056 LATIN CAPITAL LETTER V */
	XK_W:                           0x0057, /* U+0057 LATIN CAPITAL LETTER W */
	XK_X:                           0x0058, /* U+0058 LATIN CAPITAL LETTER X */
	XK_Y:                           0x0059, /* U+0059 LATIN CAPITAL LETTER Y */
	XK_Z:                           0x005a, /* U+005A LATIN CAPITAL LETTER Z */
	XK_bracketleft:                 0x005b, /* U+005B LEFT SQUARE BRACKET */
	XK_backslash:                   0x005c, /* U+005C REVERSE SOLIDUS */
	XK_bracketright:                0x005d, /* U+005D RIGHT SQUARE BRACKET */
	XK_asciicircum:                 0x005e, /* U+005E CIRCUMFLEX ACCENT */
	XK_underscore:                  0x005f, /* U+005F LOW LINE */
	XK_grave:                       0x0060, /* U+0060 GRAVE ACCENT */
	XK_quoteleft:                   0x0060, /* deprecated */
	XK_a:                           0x0061, /* U+0061 LATIN SMALL LETTER A */
	XK_b:                           0x0062, /* U+0062 LATIN SMALL LETTER B */
	XK_c:                           0x0063, /* U+0063 LATIN SMALL LETTER C */
	XK_d:                           0x0064, /* U+0064 LATIN SMALL LETTER D */
	XK_e:                           0x0065, /* U+0065 LATIN SMALL LETTER E */
	XK_f:                           0x0066, /* U+0066 LATIN SMALL LETTER F */
	XK_g:                           0x0067, /* U+0067 LATIN SMALL LETTER G */
	XK_h:                           0x0068, /* U+0068 LATIN SMALL LETTER H */
	XK_i:                           0x0069, /* U+0069 LATIN SMALL LETTER I */
	XK_j:                           0x006a, /* U+006A LATIN SMALL LETTER J */
	XK_k:                           0x006b, /* U+006B LATIN SMALL LETTER K */
	XK_l:                           0x006c, /* U+006C LATIN SMALL LETTER L */
	XK_m:                           0x006d, /* U+006D LATIN SMALL LETTER M */
	XK_n:                           0x006e, /* U+006E LATIN SMALL LETTER N */
	XK_o:                           0x006f, /* U+006F LATIN SMALL LETTER O */
	XK_p:                           0x0070, /* U+0070 LATIN SMALL LETTER P */
	XK_q:                           0x0071, /* U+0071 LATIN SMALL LETTER Q */
	XK_r:                           0x0072, /* U+0072 LATIN SMALL LETTER R */
	XK_s:                           0x0073, /* U+0073 LATIN SMALL LETTER S */
	XK_t:                           0x0074, /* U+0074 LATIN SMALL LETTER T */
	XK_u:                           0x0075, /* U+0075 LATIN SMALL LETTER U */
	XK_v:                           0x0076, /* U+0076 LATIN SMALL LETTER V */
	XK_w:                           0x0077, /* U+0077 LATIN SMALL LETTER W */
	XK_x:                           0x0078, /* U+0078 LATIN SMALL LETTER X */
	XK_y:                           0x0079, /* U+0079 LATIN SMALL LETTER Y */
	XK_z:                           0x007a, /* U+007A LATIN SMALL LETTER Z */
	XK_braceleft:                   0x007b, /* U+007B LEFT CURLY BRACKET */
	XK_bar:                         0x007c, /* U+007C VERTICAL LINE */
	XK_braceright:                  0x007d, /* U+007D RIGHT CURLY BRACKET */
	XK_asciitilde:                  0x007e, /* U+007E TILDE */

	XK_nobreakspace:                0x00a0, /* U+00A0 NO-BREAK SPACE */
	XK_exclamdown:                  0x00a1, /* U+00A1 INVERTED EXCLAMATION MARK */
	XK_cent:                        0x00a2, /* U+00A2 CENT SIGN */
	XK_sterling:                    0x00a3, /* U+00A3 POUND SIGN */
	XK_currency:                    0x00a4, /* U+00A4 CURRENCY SIGN */
	XK_yen:                         0x00a5, /* U+00A5 YEN SIGN */
	XK_brokenbar:                   0x00a6, /* U+00A6 BROKEN BAR */
	XK_section:                     0x00a7, /* U+00A7 SECTION SIGN */
	XK_diaeresis:                   0x00a8, /* U+00A8 DIAERESIS */
	XK_copyright:                   0x00a9, /* U+00A9 COPYRIGHT SIGN */
	XK_ordfeminine:                 0x00aa, /* U+00AA FEMININE ORDINAL INDICATOR */
	XK_guillemotleft:               0x00ab, /* U+00AB LEFT-POINTING DOUBLE ANGLE QUOTATION MARK */
	XK_notsign:                     0x00ac, /* U+00AC NOT SIGN */
	XK_hyphen:                      0x00ad, /* U+00AD SOFT HYPHEN */
	XK_registered:                  0x00ae, /* U+00AE REGISTERED SIGN */
	XK_macron:                      0x00af, /* U+00AF MACRON */
	XK_degree:                      0x00b0, /* U+00B0 DEGREE SIGN */
	XK_plusminus:                   0x00b1, /* U+00B1 PLUS-MINUS SIGN */
	XK_twosuperior:                 0x00b2, /* U+00B2 SUPERSCRIPT TWO */
	XK_threesuperior:               0x00b3, /* U+00B3 SUPERSCRIPT THREE */
	XK_acute:                       0x00b4, /* U+00B4 ACUTE ACCENT */
	XK_mu:                          0x00b5, /* U+00B5 MICRO SIGN */
	XK_paragraph:                   0x00b6, /* U+00B6 PILCROW SIGN */
	XK_periodcentered:              0x00b7, /* U+00B7 MIDDLE DOT */
	XK_cedilla:                     0x00b8, /* U+00B8 CEDILLA */
	XK_onesuperior:                 0x00b9, /* U+00B9 SUPERSCRIPT ONE */
	XK_masculine:                   0x00ba, /* U+00BA MASCULINE ORDINAL INDICATOR */
	XK_guillemotright:              0x00bb, /* U+00BB RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK */
	XK_onequarter:                  0x00bc, /* U+00BC VULGAR FRACTION ONE QUARTER */
	XK_onehalf:                     0x00bd, /* U+00BD VULGAR FRACTION ONE HALF */
	XK_threequarters:               0x00be, /* U+00BE VULGAR FRACTION THREE QUARTERS */
	XK_questiondown:                0x00bf, /* U+00BF INVERTED QUESTION MARK */
	XK_Agrave:                      0x00c0, /* U+00C0 LATIN CAPITAL LETTER A WITH GRAVE */
	XK_Aacute:                      0x00c1, /* U+00C1 LATIN CAPITAL LETTER A WITH ACUTE */
	XK_Acircumflex:                 0x00c2, /* U+00C2 LATIN CAPITAL LETTER A WITH CIRCUMFLEX */
	XK_Atilde:                      0x00c3, /* U+00C3 LATIN CAPITAL LETTER A WITH TILDE */
	XK_Adiaeresis:                  0x00c4, /* U+00C4 LATIN CAPITAL LETTER A WITH DIAERESIS */
	XK_Aring:                       0x00c5, /* U+00C5 LATIN CAPITAL LETTER A WITH RING ABOVE */
	XK_AE:                          0x00c6, /* U+00C6 LATIN CAPITAL LETTER AE */
	XK_Ccedilla:                    0x00c7, /* U+00C7 LATIN CAPITAL LETTER C WITH CEDILLA */
	XK_Egrave:                      0x00c8, /* U+00C8 LATIN CAPITAL LETTER E WITH GRAVE */
	XK_Eacute:                      0x00c9, /* U+00C9 LATIN CAPITAL LETTER E WITH ACUTE */
	XK_Ecircumflex:                 0x00ca, /* U+00CA LATIN CAPITAL LETTER E WITH CIRCUMFLEX */
	XK_Ediaeresis:                  0x00cb, /* U+00CB LATIN CAPITAL LETTER E WITH DIAERESIS */
	XK_Igrave:                      0x00cc, /* U+00CC LATIN CAPITAL LETTER I WITH GRAVE */
	XK_Iacute:                      0x00cd, /* U+00CD LATIN CAPITAL LETTER I WITH ACUTE */
	XK_Icircumflex:                 0x00ce, /* U+00CE LATIN CAPITAL LETTER I WITH CIRCUMFLEX */
	XK_Idiaeresis:                  0x00cf, /* U+00CF LATIN CAPITAL LETTER I WITH DIAERESIS */
	XK_ETH:                         0x00d0, /* U+00D0 LATIN CAPITAL LETTER ETH */
	XK_Eth:                         0x00d0, /* deprecated */
	XK_Ntilde:                      0x00d1, /* U+00D1 LATIN CAPITAL LETTER N WITH TILDE */
	XK_Ograve:                      0x00d2, /* U+00D2 LATIN CAPITAL LETTER O WITH GRAVE */
	XK_Oacute:                      0x00d3, /* U+00D3 LATIN CAPITAL LETTER O WITH ACUTE */
	XK_Ocircumflex:                 0x00d4, /* U+00D4 LATIN CAPITAL LETTER O WITH CIRCUMFLEX */
	XK_Otilde:                      0x00d5, /* U+00D5 LATIN CAPITAL LETTER O WITH TILDE */
	XK_Odiaeresis:                  0x00d6, /* U+00D6 LATIN CAPITAL LETTER O WITH DIAERESIS */
	XK_multiply:                    0x00d7, /* U+00D7 MULTIPLICATION SIGN */
	XK_Oslash:                      0x00d8, /* U+00D8 LATIN CAPITAL LETTER O WITH STROKE */
	XK_Ooblique:                    0x00d8, /* U+00D8 LATIN CAPITAL LETTER O WITH STROKE */
	XK_Ugrave:                      0x00d9, /* U+00D9 LATIN CAPITAL LETTER U WITH GRAVE */
	XK_Uacute:                      0x00da, /* U+00DA LATIN CAPITAL LETTER U WITH ACUTE */
	XK_Ucircumflex:                 0x00db, /* U+00DB LATIN CAPITAL LETTER U WITH CIRCUMFLEX */
	XK_Udiaeresis:                  0x00dc, /* U+00DC LATIN CAPITAL LETTER U WITH DIAERESIS */
	XK_Yacute:                      0x00dd, /* U+00DD LATIN CAPITAL LETTER Y WITH ACUTE */
	XK_THORN:                       0x00de, /* U+00DE LATIN CAPITAL LETTER THORN */
	XK_Thorn:                       0x00de, /* deprecated */
	XK_ssharp:                      0x00df, /* U+00DF LATIN SMALL LETTER SHARP S */
	XK_agrave:                      0x00e0, /* U+00E0 LATIN SMALL LETTER A WITH GRAVE */
	XK_aacute:                      0x00e1, /* U+00E1 LATIN SMALL LETTER A WITH ACUTE */
	XK_acircumflex:                 0x00e2, /* U+00E2 LATIN SMALL LETTER A WITH CIRCUMFLEX */
	XK_atilde:                      0x00e3, /* U+00E3 LATIN SMALL LETTER A WITH TILDE */
	XK_adiaeresis:                  0x00e4, /* U+00E4 LATIN SMALL LETTER A WITH DIAERESIS */
	XK_aring:                       0x00e5, /* U+00E5 LATIN SMALL LETTER A WITH RING ABOVE */
	XK_ae:                          0x00e6, /* U+00E6 LATIN SMALL LETTER AE */
	XK_ccedilla:                    0x00e7, /* U+00E7 LATIN SMALL LETTER C WITH CEDILLA */
	XK_egrave:                      0x00e8, /* U+00E8 LATIN SMALL LETTER E WITH GRAVE */
	XK_eacute:                      0x00e9, /* U+00E9 LATIN SMALL LETTER E WITH ACUTE */
	XK_ecircumflex:                 0x00ea, /* U+00EA LATIN SMALL LETTER E WITH CIRCUMFLEX */
	XK_ediaeresis:                  0x00eb, /* U+00EB LATIN SMALL LETTER E WITH DIAERESIS */
	XK_igrave:                      0x00ec, /* U+00EC LATIN SMALL LETTER I WITH GRAVE */
	XK_iacute:                      0x00ed, /* U+00ED LATIN SMALL LETTER I WITH ACUTE */
	XK_icircumflex:                 0x00ee, /* U+00EE LATIN SMALL LETTER I WITH CIRCUMFLEX */
	XK_idiaeresis:                  0x00ef, /* U+00EF LATIN SMALL LETTER I WITH DIAERESIS */
	XK_eth:                         0x00f0, /* U+00F0 LATIN SMALL LETTER ETH */
	XK_ntilde:                      0x00f1, /* U+00F1 LATIN SMALL LETTER N WITH TILDE */
	XK_ograve:                      0x00f2, /* U+00F2 LATIN SMALL LETTER O WITH GRAVE */
	XK_oacute:                      0x00f3, /* U+00F3 LATIN SMALL LETTER O WITH ACUTE */
	XK_ocircumflex:                 0x00f4, /* U+00F4 LATIN SMALL LETTER O WITH CIRCUMFLEX */
	XK_otilde:                      0x00f5, /* U+00F5 LATIN SMALL LETTER O WITH TILDE */
	XK_odiaeresis:                  0x00f6, /* U+00F6 LATIN SMALL LETTER O WITH DIAERESIS */
	XK_division:                    0x00f7, /* U+00F7 DIVISION SIGN */
	XK_oslash:                      0x00f8, /* U+00F8 LATIN SMALL LETTER O WITH STROKE */
	XK_ooblique:                    0x00f8, /* U+00F8 LATIN SMALL LETTER O WITH STROKE */
	XK_ugrave:                      0x00f9, /* U+00F9 LATIN SMALL LETTER U WITH GRAVE */
	XK_uacute:                      0x00fa, /* U+00FA LATIN SMALL LETTER U WITH ACUTE */
	XK_ucircumflex:                 0x00fb, /* U+00FB LATIN SMALL LETTER U WITH CIRCUMFLEX */
	XK_udiaeresis:                  0x00fc, /* U+00FC LATIN SMALL LETTER U WITH DIAERESIS */
	XK_yacute:                      0x00fd, /* U+00FD LATIN SMALL LETTER Y WITH ACUTE */
	XK_thorn:                       0x00fe, /* U+00FE LATIN SMALL LETTER THORN */
	XK_ydiaeresis:                  0x00ff  /* U+00FF LATIN SMALL LETTER Y WITH DIAERESIS */
};


/**
 * Mappings from Unicode codepoints to the keysym values (and optionally, key
 * names) expected by the RFB protocol.
 */
var keynames = null;
var codepoints = {'32':32,'33':33,'34':34,'35':35,'36':36,'37':37,'38':38,'39':39,'40':40,'41':41,'42':42,'43':43,'44':44,'45':45,'46':46,'47':47,'48':48,'49':49,'50':50,'51':51,'52':52,'53':53,'54':54,'55':55,'56':56,'57':57,'58':58,'59':59,'60':60,'61':61,'62':62,'63':63,'64':64,'65':65,'66':66,'67':67,'68':68,'69':69,'70':70,'71':71,'72':72,'73':73,'74':74,'75':75,'76':76,'77':77,'78':78,'79':79,'80':80,'81':81,'82':82,'83':83,'84':84,'85':85,'86':86,'87':87,'88':88,'89':89,'90':90,'91':91,'92':92,'93':93,'94':94,'95':95,'96':96,'97':97,'98':98,'99':99,'100':100,'101':101,'102':102,'103':103,'104':104,'105':105,'106':106,'107':107,'108':108,'109':109,'110':110,'111':111,'112':112,'113':113,'114':114,'115':115,'116':116,'117':117,'118':118,'119':119,'120':120,'121':121,'122':122,'123':123,'124':124,'125':125,'126':126,'160':160,'161':161,'162':162,'163':163,'164':164,'165':165,'166':166,'167':167,'168':168,'169':169,'170':170,'171':171,'172':172,'173':173,'174':174,'175':175,'176':176,'177':177,'178':178,'179':179,'180':180,'181':181,'182':182,'183':183,'184':184,'185':185,'186':186,'187':187,'188':188,'189':189,'190':190,'191':191,'192':192,'193':193,'194':194,'195':195,'196':196,'197':197,'198':198,'199':199,'200':200,'201':201,'202':202,'203':203,'204':204,'205':205,'206':206,'207':207,'208':208,'209':209,'210':210,'211':211,'212':212,'213':213,'214':214,'215':215,'216':216,'217':217,'218':218,'219':219,'220':220,'221':221,'222':222,'223':223,'224':224,'225':225,'226':226,'227':227,'228':228,'229':229,'230':230,'231':231,'232':232,'233':233,'234':234,'235':235,'236':236,'237':237,'238':238,'239':239,'240':240,'241':241,'242':242,'243':243,'244':244,'245':245,'246':246,'247':247,'248':248,'249':249,'250':250,'251':251,'252':252,'253':253,'254':254,'255':255,'256':960,'257':992,'258':451,'259':483,'260':417,'261':433,'262':454,'263':486,'264':710,'265':742,'266':709,'267':741,'268':456,'269':488,'270':463,'271':495,'272':464,'273':496,'274':938,'275':954,'278':972,'279':1004,'280':458,'281':490,'282':460,'283':492,'284':728,'285':760,'286':683,'287':699,'288':725,'289':757,'290':939,'291':955,'292':678,'293':694,'294':673,'295':689,'296':933,'297':949,'298':975,'299':1007,'300':16777516,'301':16777517,'302':967,'303':999,'304':681,'305':697,'308':684,'309':700,'310':979,'311':1011,'312':930,'313':453,'314':485,'315':934,'316':950,'317':421,'318':437,'321':419,'322':435,'323':465,'324':497,'325':977,'326':1009,'327':466,'328':498,'330':957,'331':959,'332':978,'333':1010,'336':469,'337':501,'338':5052,'339':5053,'340':448,'341':480,'342':931,'343':947,'344':472,'345':504,'346':422,'347':438,'348':734,'349':766,'350':426,'351':442,'352':425,'353':441,'354':478,'355':510,'356':427,'357':443,'358':940,'359':956,'360':989,'361':1021,'362':990,'363':1022,'364':733,'365':765,'366':473,'367':505,'368':475,'369':507,'370':985,'371':1017,'372':16777588,'373':16777589,'374':16777590,'375':16777591,'376':5054,'377':428,'378':444,'379':431,'380':447,'381':430,'382':446,'399':16777615,'402':2294,'415':16777631,'416':16777632,'417':16777633,'431':16777647,'432':16777648,'437':16777653,'438':16777654,'439':16777655,'466':16777681,'486':16777702,'487':16777703,'601':16777817,'629':16777845,'658':16777874,'711':439,'728':418,'729':511,'731':434,'733':445,'901':1966,'902':1953,'904':1954,'905':1955,'906':1956,'908':1959,'910':1960,'911':1963,'912':1974,'913':1985,'914':1986,'915':1987,'916':1988,'917':1989,'918':1990,'919':1991,'920':1992,'921':1993,'922':1994,'923':1995,'924':1996,'925':1997,'926':1998,'927':1999,'928':2000,'929':2001,'931':2002,'932':2004,'933':2005,'934':2006,'935':2007,'936':2008,'937':2009,'938':1957,'939':1961,'940':1969,'941':1970,'942':1971,'943':1972,'944':1978,'945':2017,'946':2018,'947':2019,'948':2020,'949':2021,'950':2022,'951':2023,'952':2024,'953':2025,'954':2026,'955':2027,'956':2028,'957':2029,'958':2030,'959':2031,'960':2032,'961':2033,'962':2035,'963':2034,'964':2036,'965':2037,'966':2038,'967':2039,'968':2040,'969':2041,'970':1973,'971':1977,'972':1975,'973':1976,'974':1979,'1025':1715,'1026':1713,'1027':1714,'1028':1716,'1029':1717,'1030':1718,'1031':1719,'1032':1720,'1033':1721,'1034':1722,'1035':1723,'1036':1724,'1038':1726,'1039':1727,'1040':1761,'1041':1762,'1042':1783,'1043':1767,'1044':1764,'1045':1765,'1046':1782,'1047':1786,'1048':1769,'1049':1770,'1050':1771,'1051':1772,'1052':1773,'1053':1774,'1054':1775,'1055':1776,'1056':1778,'1057':1779,'1058':1780,'1059':1781,'1060':1766,'1061':1768,'1062':1763,'1063':1790,'1064':1787,'1065':1789,'1066':1791,'1067':1785,'1068':1784,'1069':1788,'1070':1760,'1071':1777,'1072':1729,'1073':1730,'1074':1751,'1075':1735,'1076':1732,'1077':1733,'1078':1750,'1079':1754,'1080':1737,'1081':1738,'1082':1739,'1083':1740,'1084':1741,'1085':1742,'1086':1743,'1087':1744,'1088':1746,'1089':1747,'1090':1748,'1091':1749,'1092':1734,'1093':1736,'1094':1731,'1095':1758,'1096':1755,'1097':1757,'1098':1759,'1099':1753,'1100':1752,'1101':1756,'1102':1728,'1103':1745,'1105':1699,'1106':1697,'1107':1698,'1108':1700,'1109':1701,'1110':1702,'1111':1703,'1112':1704,'1113':1705,'1114':1706,'1115':1707,'1116':1708,'1118':1710,'1119':1711,'1168':1725,'1169':1709,'1170':16778386,'1171':16778387,'1174':16778390,'1175':16778391,'1178':16778394,'1179':16778395,'1180':16778396,'1181':16778397,'1186':16778402,'1187':16778403,'1198':16778414,'1199':16778415,'1200':16778416,'1201':16778417,'1202':16778418,'1203':16778419,'1206':16778422,'1207':16778423,'1208':16778424,'1209':16778425,'1210':16778426,'1211':16778427,'1240':16778456,'1241':16778457,'1250':16778466,'1251':16778467,'1256':16778472,'1257':16778473,'1262':16778478,'1263':16778479,'1329':16778545,'1330':16778546,'1331':16778547,'1332':16778548,'1333':16778549,'1334':16778550,'1335':16778551,'1336':16778552,'1337':16778553,'1338':16778554,'1339':16778555,'1340':16778556,'1341':16778557,'1342':16778558,'1343':16778559,'1344':16778560,'1345':16778561,'1346':16778562,'1347':16778563,'1348':16778564,'1349':16778565,'1350':16778566,'1351':16778567,'1352':16778568,'1353':16778569,'1354':16778570,'1355':16778571,'1356':16778572,'1357':16778573,'1358':16778574,'1359':16778575,'1360':16778576,'1361':16778577,'1362':16778578,'1363':16778579,'1364':16778580,'1365':16778581,'1366':16778582,'1370':16778586,'1371':16778587,'1372':16778588,'1373':16778589,'1374':16778590,'1377':16778593,'1378':16778594,'1379':16778595,'1380':16778596,'1381':16778597,'1382':16778598,'1383':16778599,'1384':16778600,'1385':16778601,'1386':16778602,'1387':16778603,'1388':16778604,'1389':16778605,'1390':16778606,'1391':16778607,'1392':16778608,'1393':16778609,'1394':16778610,'1395':16778611,'1396':16778612,'1397':16778613,'1398':16778614,'1399':16778615,'1400':16778616,'1401':16778617,'1402':16778618,'1403':16778619,'1404':16778620,'1405':16778621,'1406':16778622,'1407':16778623,'1408':16778624,'1409':16778625,'1410':16778626,'1411':16778627,'1412':16778628,'1413':16778629,'1414':16778630,'1415':16778631,'1417':16778633,'1418':16778634,'1488':3296,'1489':3297,'1490':3298,'1491':3299,'1492':3300,'1493':3301,'1494':3302,'1495':3303,'1496':3304,'1497':3305,'1498':3306,'1499':3307,'1500':3308,'1501':3309,'1502':3310,'1503':3311,'1504':3312,'1505':3313,'1506':3314,'1507':3315,'1508':3316,'1509':3317,'1510':3318,'1511':3319,'1512':3320,'1513':3321,'1514':3322,'1548':1452,'1563':1467,'1567':1471,'1569':1473,'1570':1474,'1571':1475,'1572':1476,'1573':1477,'1574':1478,'1575':1479,'1576':1480,'1577':1481,'1578':1482,'1579':1483,'1580':1484,'1581':1485,'1582':1486,'1583':1487,'1584':1488,'1585':1489,'1586':1490,'1587':1491,'1588':1492,'1589':1493,'1590':1494,'1591':1495,'1592':1496,'1593':1497,'1594':1498,'1600':1504,'1601':1505,'1602':1506,'1603':1507,'1604':1508,'1605':1509,'1606':1510,'1607':1511,'1608':1512,'1609':1513,'1610':1514,'1611':1515,'1612':1516,'1613':1517,'1614':1518,'1615':1519,'1616':1520,'1617':1521,'1618':1522,'1619':16778835,'1620':16778836,'1621':16778837,'1632':16778848,'1633':16778849,'1634':16778850,'1635':16778851,'1636':16778852,'1637':16778853,'1638':16778854,'1639':16778855,'1640':16778856,'1641':16778857,'1642':16778858,'1648':16778864,'1657':16778873,'1662':16778878,'1670':16778886,'1672':16778888,'1681':16778897,'1688':16778904,'1700':16778916,'1705':16778921,'1711':16778927,'1722':16778938,'1726':16778942,'1729':16778945,'1740':16778956,'1746':16778962,'1748':16778964,'1776':16778992,'1777':16778993,'1778':16778994,'1779':16778995,'1780':16778996,'1781':16778997,'1782':16778998,'1783':16778999,'1784':16779000,'1785':16779001,'3458':16780674,'3459':16780675,'3461':16780677,'3462':16780678,'3463':16780679,'3464':16780680,'3465':16780681,'3466':16780682,'3467':16780683,'3468':16780684,'3469':16780685,'3470':16780686,'3471':16780687,'3472':16780688,'3473':16780689,'3474':16780690,'3475':16780691,'3476':16780692,'3477':16780693,'3478':16780694,'3482':16780698,'3483':16780699,'3484':16780700,'3485':16780701,'3486':16780702,'3487':16780703,'3488':16780704,'3489':16780705,'3490':16780706,'3491':16780707,'3492':16780708,'3493':16780709,'3494':16780710,'3495':16780711,'3496':16780712,'3497':16780713,'3498':16780714,'3499':16780715,'3500':16780716,'3501':16780717,'3502':16780718,'3503':16780719,'3504':16780720,'3505':16780721,'3507':16780723,'3508':16780724,'3509':16780725,'3510':16780726,'3511':16780727,'3512':16780728,'3513':16780729,'3514':16780730,'3515':16780731,'3517':16780733,'3520':16780736,'3521':16780737,'3522':16780738,'3523':16780739,'3524':16780740,'3525':16780741,'3526':16780742,'3530':16780746,'3535':16780751,'3536':16780752,'3537':16780753,'3538':16780754,'3539':16780755,'3540':16780756,'3542':16780758,'3544':16780760,'3545':16780761,'3546':16780762,'3547':16780763,'3548':16780764,'3549':16780765,'3550':16780766,'3551':16780767,'3570':16780786,'3571':16780787,'3572':16780788,'3585':3489,'3586':3490,'3587':3491,'3588':3492,'3589':3493,'3590':3494,'3591':3495,'3592':3496,'3593':3497,'3594':3498,'3595':3499,'3596':3500,'3597':3501,'3598':3502,'3599':3503,'3600':3504,'3601':3505,'3602':3506,'3603':3507,'3604':3508,'3605':3509,'3606':3510,'3607':3511,'3608':3512,'3609':3513,'3610':3514,'3611':3515,'3612':3516,'3613':3517,'3614':3518,'3615':3519,'3616':3520,'3617':3521,'3618':3522,'3619':3523,'3620':3524,'3621':3525,'3622':3526,'3623':3527,'3624':3528,'3625':3529,'3626':3530,'3627':3531,'3628':3532,'3629':3533,'3630':3534,'3631':3535,'3632':3536,'3633':3537,'3634':3538,'3635':3539,'3636':3540,'3637':3541,'3638':3542,'3639':3543,'3640':3544,'3641':3545,'3642':3546,'3647':3551,'3648':3552,'3649':3553,'3650':3554,'3651':3555,'3652':3556,'3653':3557,'3654':3558,'3655':3559,'3656':3560,'3657':3561,'3658':3562,'3659':3563,'3660':3564,'3661':3565,'3664':3568,'3665':3569,'3666':3570,'3667':3571,'3668':3572,'3669':3573,'3670':3574,'3671':3575,'3672':3576,'3673':3577,'4304':16781520,'4305':16781521,'4306':16781522,'4307':16781523,'4308':16781524,'4309':16781525,'4310':16781526,'4311':16781527,'4312':16781528,'4313':16781529,'4314':16781530,'4315':16781531,'4316':16781532,'4317':16781533,'4318':16781534,'4319':16781535,'4320':16781536,'4321':16781537,'4322':16781538,'4323':16781539,'4324':16781540,'4325':16781541,'4326':16781542,'4327':16781543,'4328':16781544,'4329':16781545,'4330':16781546,'4331':16781547,'4332':16781548,'4333':16781549,'4334':16781550,'4335':16781551,'4336':16781552,'4337':16781553,'4338':16781554,'4339':16781555,'4340':16781556,'4341':16781557,'4342':16781558,'7682':16784898,'7683':16784899,'7690':16784906,'7691':16784907,'7710':16784926,'7711':16784927,'7734':16784950,'7735':16784951,'7744':16784960,'7745':16784961,'7766':16784982,'7767':16784983,'7776':16784992,'7777':16784993,'7786':16785002,'7787':16785003,'7808':16785024,'7809':16785025,'7810':16785026,'7811':16785027,'7812':16785028,'7813':16785029,'7818':16785034,'7819':16785035,'7840':16785056,'7841':16785057,'7842':16785058,'7843':16785059,'7844':16785060,'7845':16785061,'7846':16785062,'7847':16785063,'7848':16785064,'7849':16785065,'7850':16785066,'7851':16785067,'7852':16785068,'7853':16785069,'7854':16785070,'7855':16785071,'7856':16785072,'7857':16785073,'7858':16785074,'7859':16785075,'7860':16785076,'7861':16785077,'7862':16785078,'7863':16785079,'7864':16785080,'7865':16785081,'7866':16785082,'7867':16785083,'7868':16785084,'7869':16785085,'7870':16785086,'7871':16785087,'7872':16785088,'7873':16785089,'7874':16785090,'7875':16785091,'7876':16785092,'7877':16785093,'7878':16785094,'7879':16785095,'7880':16785096,'7881':16785097,'7882':16785098,'7883':16785099,'7884':16785100,'7885':16785101,'7886':16785102,'7887':16785103,'7888':16785104,'7889':16785105,'7890':16785106,'7891':16785107,'7892':16785108,'7893':16785109,'7894':16785110,'7895':16785111,'7896':16785112,'7897':16785113,'7898':16785114,'7899':16785115,'7900':16785116,'7901':16785117,'7902':16785118,'7903':16785119,'7904':16785120,'7905':16785121,'7906':16785122,'7907':16785123,'7908':16785124,'7909':16785125,'7910':16785126,'7911':16785127,'7912':16785128,'7913':16785129,'7914':16785130,'7915':16785131,'7916':16785132,'7917':16785133,'7918':16785134,'7919':16785135,'7920':16785136,'7921':16785137,'7922':16785138,'7923':16785139,'7924':16785140,'7925':16785141,'7926':16785142,'7927':16785143,'7928':16785144,'7929':16785145,'8194':2722,'8195':2721,'8196':2723,'8197':2724,'8199':2725,'8200':2726,'8201':2727,'8202':2728,'8210':2747,'8211':2730,'8212':2729,'8213':1967,'8215':3295,'8216':2768,'8217':2769,'8218':2813,'8220':2770,'8221':2771,'8222':2814,'8224':2801,'8225':2802,'8226':2790,'8229':2735,'8230':2734,'8240':2773,'8242':2774,'8243':2775,'8248':2812,'8254':1150,'8304':16785520,'8308':16785524,'8309':16785525,'8310':16785526,'8311':16785527,'8312':16785528,'8313':16785529,'8320':16785536,'8321':16785537,'8322':16785538,'8323':16785539,'8324':16785540,'8325':16785541,'8326':16785542,'8327':16785543,'8328':16785544,'8329':16785545,'8352':16785568,'8353':16785569,'8354':16785570,'8355':16785571,'8356':16785572,'8357':16785573,'8358':16785574,'8359':16785575,'8360':16785576,'8361':3839,'8362':16785578,'8363':16785579,'8364':8364,'8453':2744,'8470':1712,'8471':2811,'8478':2772,'8482':2761,'8531':2736,'8532':2737,'8533':2738,'8534':2739,'8535':2740,'8536':2741,'8537':2742,'8538':2743,'8539':2755,'8540':2756,'8541':2757,'8542':2758,'8592':2299,'8593':2300,'8594':2301,'8595':2302,'8658':2254,'8660':2253,'8706':2287,'8709':16785925,'8711':2245,'8712':16785928,'8713':16785929,'8715':16785931,'8728':3018,'8730':2262,'8731':16785947,'8732':16785948,'8733':2241,'8734':2242,'8743':2270,'8744':2271,'8745':2268,'8746':2269,'8747':2239,'8748':16785964,'8749':16785965,'8756':2240,'8757':16785973,'8764':2248,'8771':2249,'8773':16785992,'8775':16785991,'8800':2237,'8801':2255,'8802':16786018,'8803':16786019,'8804':2236,'8805':2238,'8834':2266,'8835':2267,'8866':3068,'8867':3036,'8868':3010,'8869':3022,'8968':3027,'8970':3012,'8981':2810,'8992':2212,'8993':2213,'9109':3020,'9115':2219,'9117':2220,'9118':2221,'9120':2222,'9121':2215,'9123':2216,'9124':2217,'9126':2218,'9128':2223,'9132':2224,'9143':2209,'9146':2543,'9147':2544,'9148':2546,'9149':2547,'9225':2530,'9226':2533,'9227':2537,'9228':2531,'9229':2532,'9251':2732,'9252':2536,'9472':2211,'9474':2214,'9484':2210,'9488':2539,'9492':2541,'9496':2538,'9500':2548,'9508':2549,'9516':2551,'9524':2550,'9532':2542,'9618':2529,'9642':2791,'9643':2785,'9644':2779,'9645':2786,'9646':2783,'9647':2767,'9650':2792,'9651':2787,'9654':2781,'9655':2765,'9660':2793,'9661':2788,'9664':2780,'9665':2764,'9670':2528,'9675':2766,'9679':2782,'9702':2784,'9734':2789,'9742':2809,'9747':2762,'9756':2794,'9758':2795,'9792':2808,'9794':2807,'9827':2796,'9829':2798,'9830':2797,'9837':2806,'9839':2805,'10003':2803,'10007':2804,'10013':2777,'10016':2800,'10216':2748,'10217':2750,'10240':16787456,'10241':16787457,'10242':16787458,'10243':16787459,'10244':16787460,'10245':16787461,'10246':16787462,'10247':16787463,'10248':16787464,'10249':16787465,'10250':16787466,'10251':16787467,'10252':16787468,'10253':16787469,'10254':16787470,'10255':16787471,'10256':16787472,'10257':16787473,'10258':16787474,'10259':16787475,'10260':16787476,'10261':16787477,'10262':16787478,'10263':16787479,'10264':16787480,'10265':16787481,'10266':16787482,'10267':16787483,'10268':16787484,'10269':16787485,'10270':16787486,'10271':16787487,'10272':16787488,'10273':16787489,'10274':16787490,'10275':16787491,'10276':16787492,'10277':16787493,'10278':16787494,'10279':16787495,'10280':16787496,'10281':16787497,'10282':16787498,'10283':16787499,'10284':16787500,'10285':16787501,'10286':16787502,'10287':16787503,'10288':16787504,'10289':16787505,'10290':16787506,'10291':16787507,'10292':16787508,'10293':16787509,'10294':16787510,'10295':16787511,'10296':16787512,'10297':16787513,'10298':16787514,'10299':16787515,'10300':16787516,'10301':16787517,'10302':16787518,'10303':16787519,'10304':16787520,'10305':16787521,'10306':16787522,'10307':16787523,'10308':16787524,'10309':16787525,'10310':16787526,'10311':16787527,'10312':16787528,'10313':16787529,'10314':16787530,'10315':16787531,'10316':16787532,'10317':16787533,'10318':16787534,'10319':16787535,'10320':16787536,'10321':16787537,'10322':16787538,'10323':16787539,'10324':16787540,'10325':16787541,'10326':16787542,'10327':16787543,'10328':16787544,'10329':16787545,'10330':16787546,'10331':16787547,'10332':16787548,'10333':16787549,'10334':16787550,'10335':16787551,'10336':16787552,'10337':16787553,'10338':16787554,'10339':16787555,'10340':16787556,'10341':16787557,'10342':16787558,'10343':16787559,'10344':16787560,'10345':16787561,'10346':16787562,'10347':16787563,'10348':16787564,'10349':16787565,'10350':16787566,'10351':16787567,'10352':16787568,'10353':16787569,'10354':16787570,'10355':16787571,'10356':16787572,'10357':16787573,'10358':16787574,'10359':16787575,'10360':16787576,'10361':16787577,'10362':16787578,'10363':16787579,'10364':16787580,'10365':16787581,'10366':16787582,'10367':16787583,'10368':16787584,'10369':16787585,'10370':16787586,'10371':16787587,'10372':16787588,'10373':16787589,'10374':16787590,'10375':16787591,'10376':16787592,'10377':16787593,'10378':16787594,'10379':16787595,'10380':16787596,'10381':16787597,'10382':16787598,'10383':16787599,'10384':16787600,'10385':16787601,'10386':16787602,'10387':16787603,'10388':16787604,'10389':16787605,'10390':16787606,'10391':16787607,'10392':16787608,'10393':16787609,'10394':16787610,'10395':16787611,'10396':16787612,'10397':16787613,'10398':16787614,'10399':16787615,'10400':16787616,'10401':16787617,'10402':16787618,'10403':16787619,'10404':16787620,'10405':16787621,'10406':16787622,'10407':16787623,'10408':16787624,'10409':16787625,'10410':16787626,'10411':16787627,'10412':16787628,'10413':16787629,'10414':16787630,'10415':16787631,'10416':16787632,'10417':16787633,'10418':16787634,'10419':16787635,'10420':16787636,'10421':16787637,'10422':16787638,'10423':16787639,'10424':16787640,'10425':16787641,'10426':16787642,'10427':16787643,'10428':16787644,'10429':16787645,'10430':16787646,'10431':16787647,'10432':16787648,'10433':16787649,'10434':16787650,'10435':16787651,'10436':16787652,'10437':16787653,'10438':16787654,'10439':16787655,'10440':16787656,'10441':16787657,'10442':16787658,'10443':16787659,'10444':16787660,'10445':16787661,'10446':16787662,'10447':16787663,'10448':16787664,'10449':16787665,'10450':16787666,'10451':16787667,'10452':16787668,'10453':16787669,'10454':16787670,'10455':16787671,'10456':16787672,'10457':16787673,'10458':16787674,'10459':16787675,'10460':16787676,'10461':16787677,'10462':16787678,'10463':16787679,'10464':16787680,'10465':16787681,'10466':16787682,'10467':16787683,'10468':16787684,'10469':16787685,'10470':16787686,'10471':16787687,'10472':16787688,'10473':16787689,'10474':16787690,'10475':16787691,'10476':16787692,'10477':16787693,'10478':16787694,'10479':16787695,'10480':16787696,'10481':16787697,'10482':16787698,'10483':16787699,'10484':16787700,'10485':16787701,'10486':16787702,'10487':16787703,'10488':16787704,'10489':16787705,'10490':16787706,'10491':16787707,'10492':16787708,'10493':16787709,'10494':16787710,'10495':16787711,'12289':1188,'12290':1185,'12300':1186,'12301':1187,'12443':1246,'12444':1247,'12449':1191,'12450':1201,'12451':1192,'12452':1202,'12453':1193,'12454':1203,'12455':1194,'12456':1204,'12457':1195,'12458':1205,'12459':1206,'12461':1207,'12463':1208,'12465':1209,'12467':1210,'12469':1211,'12471':1212,'12473':1213,'12475':1214,'12477':1215,'12479':1216,'12481':1217,'12483':1199,'12484':1218,'12486':1219,'12488':1220,'12490':1221,'12491':1222,'12492':1223,'12493':1224,'12494':1225,'12495':1226,'12498':1227,'12501':1228,'12504':1229,'12507':1230,'12510':1231,'12511':1232,'12512':1233,'12513':1234,'12514':1235,'12515':1196,'12516':1236,'12517':1197,'12518':1237,'12519':1198,'12520':1238,'12521':1239,'12522':1240,'12523':1241,'12524':1242,'12525':1243,'12527':1244,'12530':1190,'12531':1245,'12539':1189,'12540':1200};


function lookup(k) {
	return k ? {keysym: k, keyname: keynames ? keynames[k] : k} : undefined;
}


function fromUnicode(u) {
	return lookup(codepoints[u]);
}


/**
 * Expose lookup() and fromUnicode() functions.
 */
Keys.lookup = lookup;
Keys.fromUnicode = fromUnicode;


/**
 * Expose Keys Object.
 */
module.exports = Keys;

},{}],12:[function(require,module,exports){
/*
 * noVNC: HTML5 VNC client
 * Copyright (C) 2012 Joel Martin
 * Copyright (C) 2013 Samuel Mannehed for Cendio AB
 * Licensed under MPL 2.0 (see LICENSE.txt)
 *
 * TIGHT decoder portion:
 * (c) 2012 Michael Tinglof, Joe Balaz, Les Piech (Mercuri.ca)
 */


/**
 * Expose the RFB class.
 */
module.exports = RFB;


/**
 * Dependencies.
 */
var debug = require('debug')('noVNC:RFB');
var debugerror = require('debug')('noVNC:ERROR:RFB');
debugerror.log = console.warn.bind(console);
var Util = require('./util');
var Websock = require('./websock');
var Keys = require('./keys');
var Input = require('./input');
var Keyboard = Input.Keyboard;
var Mouse = Input.Mouse;
var Display = require('./display');
var Base64 = require('./base64');
var DES = require('./des');
var TINF = require('./tinf');


function RFB (defaults) {
	debug('new()');

	defaults = defaults || {};

	this._rfb_url = null;
	this._rfb_password = '';

	this._rfb_state = 'disconnected';
	this._rfb_version = 0;
	this._rfb_max_version = 3.8;
	this._rfb_auth_scheme = '';

	this._rfb_tightvnc = false;
	this._rfb_xvp_ver = 0;

	// In preference order
	this._encodings = [
		['COPYRECT',         0x01 ],
		['TIGHT',            0x07 ],
		['TIGHT_PNG',        -260 ],
		['HEXTILE',          0x05 ],
		['RRE',              0x02 ],
		['RAW',              0x00 ],
		['DesktopSize',      -223 ],
		['Cursor',           -239 ],

		// Psuedo-encoding settings
		//['JPEG_quality_lo',    -32 ],
		['JPEG_quality_med',     -26 ],
		//['JPEG_quality_hi',    -23 ],
		//['compress_lo',       -255 ],
		['compress_hi',         -247 ],
		['last_rect',           -224 ],
		['xvp',                 -309 ],
		['ExtendedDesktopSize', -308 ]
	];

	this._encHandlers = {};
	this._encNames = {};
	this._encStats = {};

	this._sock = null;              // Websock object
	this._display = null;           // Display object
	this._keyboard = null;          // Keyboard input handler object
	this._mouse = null;             // Mouse input handler object
	this._sendTimer = null;         // Send Queue check timer
	this._disconnTimer = null;      // disconnection timer
	this._msgTimer = null;          // queued handle_msg timer

	// Frame buffer update state
	this._FBU = {
		rects: 0,
		subrects: 0,            // RRE
		lines: 0,               // RAW
		tiles: 0,               // HEXTILE
		bytes: 0,
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		encoding: 0,
		subencoding: -1,
		background: null,
		zlib: []                // TIGHT zlib streams
	};

	this._fb_Bpp = 4;
	this._fb_depth = 3;
	this._fb_width = 0;
	this._fb_height = 0;
	this._fb_name = '';

	this._rre_chunk_sz = 100;

	this._timing = {
		last_fbu: 0,
		fbu_total: 0,
		fbu_total_cnt: 0,
		full_fbu_total: 0,
		full_fbu_cnt: 0,

		fbu_rt_start: 0,
		fbu_rt_total: 0,
		fbu_rt_cnt: 0,
		pixels: 0
	};

	this._supportsSetDesktopSize = false;
	this._screen_id = 0;
	this._screen_flags = 0;

	// Mouse state
	this._mouse_buttonMask = 0;
	this._mouse_arr = [];
	this._viewportDragging = false;
	this._viewportDragPos = {};

	// set the default value on user-facing properties
	Util.set_defaults(this, defaults, {
		'target': 'null',                       // VNC display rendering Canvas object
		'focusContainer': document,             // DOM element that captures keyboard input
		'encrypt': false,                       // Use TLS/SSL/wss encryption
		'true_color': true,                     // Request true color pixel data
		'local_cursor': false,                  // Request locally rendered cursor
		'shared': true,                         // Request shared mode
		'view_only': false,                     // Disable client mouse/keyboard
		'xvp_password_sep': '@',                // Separator for XVP password fields
		'disconnectTimeout': 3,                 // Time (s) to wait for disconnection
		'wsProtocols': ['binary', 'base64'],    // Protocols to use in the WebSocket connection
		'repeaterID': '',                       // [UltraVNC] RepeaterID to connect to
		'viewportDrag': false,                  // Move the viewport on mouse drags
		'forceAuthScheme': 0,                   // Force auth scheme (0 means no)
		'enableMouseAndTouch': false,           // Whether also enable mouse events when touch screen is detected

		// Callback functions
		'onUpdateState': function () { },       // onUpdateState(rfb, state, oldstate, statusMsg): state update/change
		'onPasswordRequired': function () { },  // onPasswordRequired(rfb): VNC password is required
		'onClipboard': function () { },         // onClipboard(rfb, text): RFB clipboard contents received
		'onBell': function () { },              // onBell(rfb): RFB Bell message received
		'onFBUReceive': function () { },        // onFBUReceive(rfb, fbu): RFB FBU received but not yet processed
		'onFBUComplete': function () { },       // onFBUComplete(rfb, fbu): RFB FBU received and processed
		'onFBResize': function () { },          // onFBResize(rfb, width, height): frame buffer resized
		'onDesktopName': function () { },       // onDesktopName(rfb, name): desktop name received
		'onXvpInit': function () { },           // onXvpInit(version): XVP extensions active for this connection
		'onUnknownMessageType': null            // Handler for unknown VNC message types. If
												                    // null failure is emitted and the RFB closed.
	});

	// populate encHandlers with bound versions
	Object.keys(RFB.encodingHandlers).forEach(function (encName) {
		this._encHandlers[encName] = RFB.encodingHandlers[encName].bind(this);
	}.bind(this));

	// Create lookup tables based on encoding number
	for (var i = 0; i < this._encodings.length; i++) {
		this._encHandlers[this._encodings[i][1]] = this._encHandlers[this._encodings[i][0]];
		this._encNames[this._encodings[i][1]] = this._encodings[i][0];
		this._encStats[this._encodings[i][1]] = [0, 0];
	}

	try {
		this._display = new Display({target: this._target});
	} catch(error) {
		debugerror('Display exception: ' + error);
		// Don't continue. Avoid ugly errors in "fatal" state.
		throw(error);
	}

	this._keyboard = new Keyboard({
		target: this._focusContainer,
		onKeyPress: this._handleKeyPress.bind(this)
	});

	this._mouse = new Mouse({
		target: this._target,
		onMouseButton: this._handleMouseButton.bind(this),
		onMouseMove: this._handleMouseMove.bind(this),
		notify: this._keyboard.sync.bind(this._keyboard),
		enableMouseAndTouch: this._enableMouseAndTouch
	});

	this._sock = new Websock();

	this._sock.on('message', this._handle_message.bind(this));

	this._sock.on('open', function () {
		if (this._rfb_state === 'connect') {
			this._updateState('ProtocolVersion', 'Starting VNC handshake');
		} else {
			this._fail('Got unexpected WebSocket connection');
		}
	}.bind(this));

	this._sock.on('close', function (e) {
		debug('WebSocket closed');

		var msg = '';
		if (e.code) {
			msg = ' (code: ' + e.code;
			if (e.reason) {
				msg += ', reason: ' + e.reason;
			}
			msg += ')';
		}
		if (this._rfb_state === 'disconnect') {
			this._updateState('disconnected', 'VNC disconnected' + msg);
		} else if (this._rfb_state === 'ProtocolVersion') {
			this._fail('Failed to connect to server' + msg);
		} else if (this._rfb_state in {'failed': 1, 'disconnected': 1}) {
			debug('Received onclose while disconnected' + msg);
		} else {
			this._fail('Server disconnected' + msg);
		}
		this._sock.off('close');
	}.bind(this));

	this._sock.on('error', function () {
		debugerror('WebSocket error');
	});

	this._init_vars();

	var rmode = this._display.get_render_mode();

	this._updateState('loaded', 'noVNC ready: ' + rmode);
}


RFB.prototype = {
	// Public methods
	connect: function (url, password) {
		this._rfb_url = url;
		this._rfb_password = (password !== undefined) ? password : '';

		this._updateState('connect', 'Connecting');
	},

	disconnect: function () {
		this._updateState('disconnect', 'Disconnecting');
		this._sock.off('error');
		this._sock.off('message');
		this._sock.off('open');
	},

	sendPassword: function (passwd) {
		this._rfb_password = passwd;
		this._rfb_state = 'Authentication';
		setTimeout(this._init_msg.bind(this), 1);
	},

	sendCtrlAltDel: function () {
		if (this._rfb_state !== 'normal' || this._view_only) { return false; }

		var arr = [];
		arr = arr.concat(RFB.messages.keyEvent(Keys.XK_Control_L, 1));
		arr = arr.concat(RFB.messages.keyEvent(Keys.XK_Alt_L, 1));
		arr = arr.concat(RFB.messages.keyEvent(Keys.XK_Delete, 1));
		arr = arr.concat(RFB.messages.keyEvent(Keys.XK_Delete, 0));
		arr = arr.concat(RFB.messages.keyEvent(Keys.XK_Alt_L, 0));
		arr = arr.concat(RFB.messages.keyEvent(Keys.XK_Control_L, 0));
		this._sock.send(arr);
	},

	xvpOp: function (ver, op) {
		if (this._rfb_xvp_ver < ver) { return false; }
		debug('xvpOp() | sending XVP operation ' + op + ' (version ' + ver + ')');
		this._sock.send_string('\xFA\x00' + String.fromCharCode(ver) + String.fromCharCode(op));
		return true;
	},

	xvpShutdown: function () {
		return this.xvpOp(1, 2);
	},

	xvpReboot: function () {
		return this.xvpOp(1, 3);
	},

	xvpReset: function () {
		return this.xvpOp(1, 4);
	},

	// Send a key press. If 'down' is not specified then send a down key
	// followed by an up key.
	sendKey: function (code, down) {
		if (this._rfb_state !== 'normal' || this._view_only) { return false; }
		var arr = [];
		if (typeof down !== 'undefined') {
			debug('sendKey() | sending key code (' + (down ? 'down' : 'up') + '): ' + code);
			arr = arr.concat(RFB.messages.keyEvent(code, down ? 1 : 0));
		} else {
			debug('sendKey() | sending key code (down + up): ' + code);
			arr = arr.concat(RFB.messages.keyEvent(code, 1));
			arr = arr.concat(RFB.messages.keyEvent(code, 0));
		}
		this._sock.send(arr);
	},

	clipboardPasteFrom: function (text) {
		if (this._rfb_state !== 'normal') { return; }
		this._sock.send(RFB.messages.clientCutText(text));
	},

	setDesktopSize: function (width, height) {
		if (this._rfb_state !== 'normal') { return; }

		if (this._supportsSetDesktopSize) {

			var arr = [251];    // msg-type
			Util.push8(arr, 0);       // padding
			Util.push16(arr, width);  // width
			Util.push16(arr, height); // height

			Util.push8(arr, 1);       // number-of-screens
			Util.push8(arr, 0);       // padding

			// screen array
			Util.push32(arr, this._screen_id);    // id
			Util.push16(arr, 0);                  // x-position
			Util.push16(arr, 0);                  // y-position
			Util.push16(arr, width);              // width
			Util.push16(arr, height);             // height
			Util.push32(arr, this._screen_flags); // flags

			this._sock.send(arr);
		}
	},

	// Private methods
	_connect: function () {
		debug('_connect() | connecting to ' + this._rfb_url);
		this._sock.open(this._rfb_url, this._wsProtocols);
	},

	_init_vars: function () {
		// reset state
		this._sock.init();

		this._FBU.rects        = 0;
		this._FBU.subrects     = 0;  // RRE and HEXTILE
		this._FBU.lines        = 0;  // RAW
		this._FBU.tiles        = 0;  // HEXTILE
		this._FBU.zlibs        = []; // TIGHT zlib encoders
		this._mouse_buttonMask = 0;
		this._mouse_arr        = [];
		this._rfb_tightvnc     = false;

		// Clear the per connection encoding stats
		var i;
		for (i = 0; i < this._encodings.length; i++) {
			this._encStats[this._encodings[i][1]][0] = 0;
		}

		for (i = 0; i < 4; i++) {
			this._FBU.zlibs[i] = new TINF();
			this._FBU.zlibs[i].init();
		}
	},

	_print_stats: function () {
		debug('_print_stats() | encoding stats for this connection:');

		var i, s;
		for (i = 0; i < this._encodings.length; i++) {
			s = this._encStats[this._encodings[i][1]];
			if (s[0] + s[1] > 0) {
				debug('_print_stats() | ' + this._encodings[i][0] + ': ' + s[0] + ' rects');
			}
		}

		debug('_print_stats() | encoding stats since page load:');

		for (i = 0; i < this._encodings.length; i++) {
			s = this._encStats[this._encodings[i][1]];
			debug('_print_stats() | ' + this._encodings[i][0] + ': ' + s[1] + ' rects');
		}
	},

	_cleanupSocket: function (state) {
		if (this._sendTimer) {
			clearInterval(this._sendTimer);
			this._sendTimer = null;
		}
		if (this._msgTimer) {
			clearInterval(this._msgTimer);
			this._msgTimer = null;
		}
		if (this._display && this._display.get_context()) {
			this._keyboard.ungrab();
			this._mouse.ungrab();
			if (state !== 'connect' && state !== 'loaded') {
				this._display.defaultCursor();
			}
			this._display.clear();
		}

		this._sock.close();
	},


	/*
	 * Page states:
	 *   loaded       - page load, equivalent to disconnected
	 *   disconnected - idle state
	 *   connect      - starting to connect (to ProtocolVersion)
	 *   normal       - connected
	 *   disconnect   - starting to disconnect
	 *   failed       - abnormal disconnect
	 *   fatal        - failed to load page, or fatal error
	 *
	 * RFB protocol initialization states:
	 *   ProtocolVersion
	 *   Security
	 *   Authentication
	 *   password     - waiting for password, not part of RFB
	 *   SecurityResult
	 *   ClientInitialization - not triggered by server message
	 *   ServerInitialization (to normal)
	 */
	_updateState: function (state, statusMsg) {
		debug('_updateState() | [state:%s, msg:"%s"]', state, statusMsg);

		var oldstate = this._rfb_state;

		if (state === oldstate) {
			// Already here, ignore
			debug('_updateState() | already in state "' + state + '", ignoring');
			return;
		}

		/*
		 * These are disconnected states. A previous connect may
		 * asynchronously cause a connection so make sure we are closed.
		 */
		if (state in {'disconnected': 1, 'loaded': 1, 'connect': 1,
			'disconnect': 1, 'failed': 1, 'fatal': 1}) {
			this._cleanupSocket(state);
		}

		if (oldstate === 'fatal') {
			debugerror('_updateState() | fatal error, cannot continue');
		}

		if (statusMsg && (state === 'failed' || state === 'fatal')) {
			debugerror('_updateState() | %s: %s', state, statusMsg);
		}

		if (oldstate === 'failed' && state === 'disconnected') {
			// do disconnect action, but stay in failed state
			this._rfb_state = 'failed';
		} else {
			this._rfb_state = state;
		}

		if (this._disconnTimer && this._rfb_state !== 'disconnect') {
			debug('_updateState() | clearing disconnect timer');
			clearTimeout(this._disconnTimer);
			this._disconnTimer = null;
			this._sock.off('close');  // make sure we don't get a double event
		}

		switch (state) {
			case 'normal':
				if (oldstate === 'disconnected' || oldstate === 'failed') {
					debugerror('_updateState() | invalid transition from "disconnected" or "failed" to "normal"');
				}
				break;

			case 'connect':
				this._init_vars();
				this._connect();
				// WebSocket.onopen transitions to 'ProtocolVersion'
				break;

			case 'disconnect':
				this._disconnTimer = setTimeout(function () {
					this._fail('Disconnect timeout');
				}.bind(this), this._disconnectTimeout * 1000);

				this._print_stats();

				// WebSocket.onclose transitions to 'disconnected'
				break;

			case 'failed':
				if (oldstate === 'disconnected') {
					debugerror('_updateState() | invalid transition from "disconnected" to "failed"');
				} else if (oldstate === 'normal') {
					debugerror('_updateState() | error while connected');
				} else if (oldstate === 'init') {
					debugerror('_updateState() | error while initializing');
				}

				// Make sure we transition to disconnected
				setTimeout(function () {
					this._updateState('disconnected');
				}.bind(this), 50);

				break;

			default:
				// No state change action to take
		}

		if (oldstate === 'failed' && state === 'disconnected') {
			this._onUpdateState(this, state, oldstate);
		} else {
			this._onUpdateState(this, state, oldstate, statusMsg);
		}
	},

	_fail: function (msg) {
		this._updateState('failed', msg);
		return false;
	},

	_handle_message: function () {
		if (this._sock.rQlen() === 0) {
			debugerror('_handle_message() | called on an empty receive queue');
			return;
		}

		switch (this._rfb_state) {
			case 'disconnected':
			case 'failed':
				debugerror('_handle_message() | got data while disconnected');
				break;
			case 'normal':
				if (this._normal_msg() && this._sock.rQlen() > 0) {
					// true means we can continue processing
					// Give other events a chance to run
					if (this._msgTimer === null) {
						debug('_handle_message() | more data to process, creating timer');
						this._msgTimer = setTimeout(function () {
							this._msgTimer = null;
							this._handle_message();
						}.bind(this), 10);
					} else {
						debug('_handle_message() | more data to process, existing timer');
					}
				}
				break;
			default:
				this._init_msg();
				break;
		}
	},

	_checkEvents: function () {
		if (this._rfb_state === 'normal' && !this._viewportDragging && this._mouse_arr.length > 0) {
			this._sock.send(this._mouse_arr);
			this._mouse_arr = [];
		}
	},

	_handleKeyPress: function (keysym, down) {
		if (this._view_only) { return; } // View only, skip keyboard, events
		this._sock.send(RFB.messages.keyEvent(keysym, down));
	},

	_handleMouseButton: function (x, y, down, bmask) {
		if (down) {
			this._mouse_buttonMask |= bmask;
		} else {
			this._mouse_buttonMask ^= bmask;
		}

		if (this._viewportDrag) {
			if (down && !this._viewportDragging) {
				this._viewportDragging = true;
				this._viewportDragPos = {'x': x, 'y': y};

				// Skip sending mouse events
				return;
			} else {
				this._viewportDragging = false;
			}
		}

		if (this._view_only) { return; } // View only, skip mouse events

		this._mouse_arr = this._mouse_arr.concat(
				RFB.messages.pointerEvent(this._display.absX(x), this._display.absY(y), this._mouse_buttonMask));
		this._sock.send(this._mouse_arr);
		this._mouse_arr = [];
	},

	_handleMouseMove: function (x, y) {
		if (this._viewportDragging) {
			var deltaX = this._viewportDragPos.x - x;
			var deltaY = this._viewportDragPos.y - y;
			this._viewportDragPos = {'x': x, 'y': y};

			this._display.viewportChangePos(deltaX, deltaY);

			// Skip sending mouse events
			return;
		}

		if (this._view_only) { return; } // View only, skip mouse events

		this._mouse_arr = this._mouse_arr.concat(
				RFB.messages.pointerEvent(this._display.absX(x), this._display.absY(y), this._mouse_buttonMask));

		this._checkEvents();
	},

	// Message Handlers

	_negotiate_protocol_version: function () {
		if (this._sock.rQlen() < 12) {
			return this._fail('Incomplete protocol version');
		}

		var sversion = this._sock.rQshiftStr(12).substr(4, 7);
		debug('_negotiate_protocol_version() | server ProtocolVersion: ' + sversion);
		var is_repeater = 0;

		switch (sversion) {
			case '000.000':  // UltraVNC repeater
				is_repeater = 1;
				break;
			case '003.003':
			case '003.006':  // UltraVNC
			case '003.889':  // Apple Remote Desktop
				this._rfb_version = 3.3;
				break;
			case '003.007':
				this._rfb_version = 3.7;
				break;
			case '003.008':
			case '004.000':  // Intel AMT KVM
			case '004.001':  // RealVNC 4.6
				this._rfb_version = 3.8;
				break;
			default:
				return this._fail('Invalid server version ' + sversion);
		}

		if (is_repeater) {
			var repeaterID = this._repeaterID;
			while (repeaterID.length < 250) {
				repeaterID += '\0';
			}
			this._sock.send_string(repeaterID);
			return true;
		}

		if (this._rfb_version > this._rfb_max_version) {
			this._rfb_version = this._rfb_max_version;
		}

		// Send updates either at a rate of 1 update per 50ms, or
		// whatever slower rate the network can handle
		this._sendTimer = setInterval(this._sock.flush.bind(this._sock), 50);

		var cversion = '00' + parseInt(this._rfb_version, 10) +
						 '.00' + ((this._rfb_version * 10) % 10);
		this._sock.send_string('RFB ' + cversion + '\n');
		this._updateState('Security', 'Sent ProtocolVersion: ' + cversion);
	},

	_negotiate_security: function () {
		if (this._rfb_version >= 3.7) {
			// Server sends supported list, client decides
			var num_types = this._sock.rQshift8();
			if (this._sock.rQwait('security type', num_types, 1)) { return false; }

			if (num_types === 0) {
				var strlen = this._sock.rQshift32();
				var reason = this._sock.rQshiftStr(strlen);
				return this._fail('Security failure: ' + reason);
			}

			this._rfb_auth_scheme = 0;
			var types = this._sock.rQshiftBytes(num_types);
			debug('_negotiate_security() | server security types: ' + types);

			if (! this._forceAuthScheme) {
				for (var i = 0; i < types.length; i++) {
					if (types[i] > this._rfb_auth_scheme && (types[i] <= 16 || types[i] === 22)) {
						this._rfb_auth_scheme = types[i];
					}
				}
			}
			else {
				this._rfb_auth_scheme = this._forceAuthScheme;
			}

			if (this._rfb_auth_scheme === 0) {
				return this._fail('Unsupported security types: ' + types);
			}

			this._sock.send([this._rfb_auth_scheme]);
		} else {
			// Server decides
			if (this._sock.rQwait('security scheme', 4)) { return false; }
			this._rfb_auth_scheme = this._sock.rQshift32();
		}

		this._updateState('Authentication', 'Authenticating using scheme: ' + this._rfb_auth_scheme);
		return this._init_msg(); // jump to authentication
	},

	// authentication
	_negotiate_xvp_auth: function () {
		var xvp_sep = this._xvp_password_sep;
		var xvp_auth = this._rfb_password.split(xvp_sep);
		if (xvp_auth.length < 3) {
			this._updateState('password', 'XVP credentials required (user' + xvp_sep +
								'target' + xvp_sep + 'password) -- got only ' + this._rfb_password);
			this._onPasswordRequired(this);
			return false;
		}

		var xvp_auth_str = String.fromCharCode(xvp_auth[0].length) +
							 String.fromCharCode(xvp_auth[1].length) +
							 xvp_auth[0] +
							 xvp_auth[1];
		this._sock.send_string(xvp_auth_str);
		this._rfb_password = xvp_auth.slice(2).join(xvp_sep);
		this._rfb_auth_scheme = 2;
		return this._negotiate_authentication();
	},

	_negotiate_std_vnc_auth: function () {
		if (this._rfb_password.length === 0) {
			// Notify via both callbacks since it's kind of
			// an RFB state change and a UI interface issue
			this._updateState('password', 'Password Required');
			this._onPasswordRequired(this);
		}

		if (this._sock.rQwait('auth challenge', 16)) { return false; }

		var challenge = this._sock.rQshiftBytes(16);
		var response = RFB.genDES(this._rfb_password, challenge);
		this._sock.send(response);
		this._updateState('SecurityResult');
		return true;
	},

	_negotiate_tight_tunnels: function (numTunnels) {
		var clientSupportedTunnelTypes = {
			0: { vendor: 'TGHT', signature: 'NOTUNNEL' }
		};
		var serverSupportedTunnelTypes = {};
		// receive tunnel capabilities
		for (var i = 0; i < numTunnels; i++) {
			var cap_code = this._sock.rQshift32();
			var cap_vendor = this._sock.rQshiftStr(4);
			var cap_signature = this._sock.rQshiftStr(8);
			serverSupportedTunnelTypes[cap_code] = { vendor: cap_vendor, signature: cap_signature };
		}

		// choose the notunnel type
		if (serverSupportedTunnelTypes[0]) {
			if (serverSupportedTunnelTypes[0].vendor !== clientSupportedTunnelTypes[0].vendor ||
				serverSupportedTunnelTypes[0].signature !== clientSupportedTunnelTypes[0].signature) {
				return this._fail('Client\'s tunnel type had the incorrect vendor or signature');
			}
			this._sock.send([0, 0, 0, 0]);  // use NOTUNNEL
			return false; // wait until we receive the sub auth count to continue
		} else {
			return this._fail('Server wanted tunnels, but doesn\'t support the notunnel type');
		}
	},

	_negotiate_tight_auth: function () {
		if (!this._rfb_tightvnc) {  // first pass, do the tunnel negotiation
			if (this._sock.rQwait('num tunnels', 4)) { return false; }
			var numTunnels = this._sock.rQshift32();
			if (numTunnels > 0 && this._sock.rQwait('tunnel capabilities', 16 * numTunnels, 4)) { return false; }

			this._rfb_tightvnc = true;

			if (numTunnels > 0) {
				this._negotiate_tight_tunnels(numTunnels);
				return false;  // wait until we receive the sub auth to continue
			}
		}

		// second pass, do the sub-auth negotiation
		if (this._sock.rQwait('sub auth count', 4)) { return false; }
		var subAuthCount = this._sock.rQshift32();
		if (this._sock.rQwait('sub auth capabilities', 16 * subAuthCount, 4)) { return false; }

		var clientSupportedTypes = {
			'STDVNOAUTH__': 1,
			'STDVVNCAUTH_': 2
		};

		var serverSupportedTypes = [];

		for (var i = 0; i < subAuthCount; i++) {
			var capabilities = this._sock.rQshiftStr(12);
			serverSupportedTypes.push(capabilities);
		}

		debug('_negotiate_tight_auth() | clientSupportedTypes: %o', clientSupportedTypes);
		debug('_negotiate_tight_auth() | serverSupportedTypes: %o', serverSupportedTypes);

		for (var authType in clientSupportedTypes) {
			if (serverSupportedTypes.indexOf(authType) !== -1) {
				this._sock.send([0, 0, 0, clientSupportedTypes[authType]]);

				switch (authType) {
					case 'STDVNOAUTH__':  // no auth
						this._updateState('SecurityResult');
						return true;
					case 'STDVVNCAUTH_': // VNC auth
						this._rfb_auth_scheme = 2;
						return this._init_msg();
					default:
						return this._fail('Unsupported tiny auth scheme: ' + authType);
				}
			}
		}

		this._fail('No supported sub-auth types!');
	},

	_negotiate_authentication: function () {
		switch (this._rfb_auth_scheme) {
			case 0:  // connection failed
				if (this._sock.rQwait('auth reason', 4)) { return false; }
				var strlen = this._sock.rQshift32();
				var reason = this._sock.rQshiftStr(strlen);
				return this._fail('Auth failure: ' + reason);

			case 1:  // no auth
				if (this._rfb_version >= 3.8) {
					this._updateState('SecurityResult');
					return true;
				}
				this._updateState('ClientInitialisation', 'No auth required');
				return this._init_msg();

			case 22:  // XVP auth
				return this._negotiate_xvp_auth();

			case 2:  // VNC authentication
				return this._negotiate_std_vnc_auth();

			case 16:  // TightVNC Security Type
				return this._negotiate_tight_auth();

			default:
				return this._fail('Unsupported auth scheme: ' + this._rfb_auth_scheme);
		}
	},

	_handle_security_result: function () {
		if (this._sock.rQwait('VNC auth response ', 4)) { return false; }
		switch (this._sock.rQshift32()) {
			case 0:  // OK
				this._updateState('ClientInitialisation', 'Authentication OK');
				return this._init_msg();
			case 1:  // failed
				if (this._rfb_version >= 3.8) {
					var length = this._sock.rQshift32();
					if (this._sock.rQwait('SecurityResult reason', length, 8)) { return false; }
					var reason = this._sock.rQshiftStr(length);
					return this._fail(reason);
				} else {
					return this._fail('Authentication failure');
				}
				return false;
			case 2:
				return this._fail('Too many auth attempts');
		}
	},

	_negotiate_server_init: function () {
		if (this._sock.rQwait('server initialization', 24)) { return false; }

		/* Screen size */
		this._fb_width  = this._sock.rQshift16();
		this._fb_height = this._sock.rQshift16();

		/* PIXEL_FORMAT */
		var bpp         = this._sock.rQshift8();
		var depth       = this._sock.rQshift8();
		var big_endian  = this._sock.rQshift8();
		var true_color  = this._sock.rQshift8();

		var red_max     = this._sock.rQshift16();
		var green_max   = this._sock.rQshift16();
		var blue_max    = this._sock.rQshift16();
		var red_shift   = this._sock.rQshift8();
		var green_shift = this._sock.rQshift8();
		var blue_shift  = this._sock.rQshift8();
		this._sock.rQskipBytes(3);  // padding

		// NB(directxman12): we don't want to call any callbacks or print messages until
		//                   *after* we're past the point where we could backtrack

		/* Connection name/title */
		var name_length = this._sock.rQshift32();
		if (this._sock.rQwait('server init name', name_length, 24)) { return false; }
		this._fb_name = Util.decodeUTF8(this._sock.rQshiftStr(name_length));

		if (this._rfb_tightvnc) {
			if (this._sock.rQwait('TightVNC extended server init header', 8, 24 + name_length)) { return false; }
			// In TightVNC mode, ServerInit message is extended
			var numServerMessages = this._sock.rQshift16();
			var numClientMessages = this._sock.rQshift16();
			var numEncodings = this._sock.rQshift16();
			this._sock.rQskipBytes(2);  // padding

			var totalMessagesLength = (numServerMessages + numClientMessages + numEncodings) * 16;
			if (this._sock.rQwait('TightVNC extended server init header', totalMessagesLength, 32 + name_length)) {
				return false;
			}

			var i;
			for (i = 0; i < numServerMessages; i++) {
				// TODO: https://github.com/kanaka/noVNC/issues/440
				this._sock.rQshiftStr(16);
			}

			for (i = 0; i < numClientMessages; i++) {
				this._sock.rQshiftStr(16);
			}

			for (i = 0; i < numEncodings; i++) {
				this._sock.rQshiftStr(16);
			}
		}

		// NB(directxman12): these are down here so that we don't run them multiple times
		//                   if we backtrack
		debug('_negotiate_server_init() | screen: ' + this._fb_width + 'x' + this._fb_height +
					', bpp: ' + bpp + ', depth: ' + depth +
					', big_endian: ' + big_endian +
					', true_color: ' + true_color +
					', red_max: ' + red_max +
					', green_max: ' + green_max +
					', blue_max: ' + blue_max +
					', red_shift: ' + red_shift +
					', green_shift: ' + green_shift +
					', blue_shift: ' + blue_shift);

		if (big_endian !== 0) {
			debugerror('_negotiate_server_init() | server native endian is not little endian');
		}

		if (red_shift !== 16) {
			debugerror('_negotiate_server_init() | server native red-shift is not 16');
		}

		if (blue_shift !== 0) {
			debugerror('_negotiate_server_init() | server native blue-shift is not 0');
		}

		// we're past the point where we could backtrack, so it's safe to call this
		this._onDesktopName(this, this._fb_name);

		if (this._true_color && this._fb_name === 'Intel(r) AMT KVM') {
			debugerror('_negotiate_server_init() | Intel AMT KVM only supports 8/16 bit depths, disabling true color');
			this._true_color = false;
		}

		this._display.set_true_color(this._true_color);
		this._display.resize(this._fb_width, this._fb_height);
		this._onFBResize(this, this._fb_width, this._fb_height);
		this._keyboard.grab();
		this._mouse.grab();

		if (this._true_color) {
			this._fb_Bpp = 4;
			this._fb_depth = 3;
		} else {
			this._fb_Bpp = 1;
			this._fb_depth = 1;
		}

		var response = RFB.messages.pixelFormat(this._fb_Bpp, this._fb_depth, this._true_color);
		response = response.concat(
						RFB.messages.clientEncodings(this._encodings, this._local_cursor, this._true_color));
		response = response.concat(
						RFB.messages.fbUpdateRequests(this._display.getCleanDirtyReset(),
														this._fb_width, this._fb_height));

		this._timing.fbu_rt_start = (new Date()).getTime();
		this._timing.pixels = 0;
		this._sock.send(response);

		this._checkEvents();

		this._updateState('normal', 'Connected to: ' + this._fb_name);
	},

	_init_msg: function () {
		switch (this._rfb_state) {
			case 'ProtocolVersion':
				return this._negotiate_protocol_version();

			case 'Security':
				return this._negotiate_security();

			case 'Authentication':
				return this._negotiate_authentication();

			case 'SecurityResult':
				return this._handle_security_result();

			case 'ClientInitialisation':
				this._sock.send([this._shared ? 1 : 0]); // ClientInitialisation
				this._updateState('ServerInitialisation', 'Authentication OK');
				return true;

			case 'ServerInitialisation':
				return this._negotiate_server_init();
		}
	},

	_handle_set_colour_map_msg: function () {
		debug('_handle_set_colour_map_msg()');

		this._sock.rQskip8();  // Padding

		var first_colour = this._sock.rQshift16();
		var num_colours = this._sock.rQshift16();
		if (this._sock.rQwait('SetColorMapEntries', num_colours * 6, 6)) { return false; }

		for (var c = 0; c < num_colours; c++) {
			var red = parseInt(this._sock.rQshift16() / 256, 10);
			var green = parseInt(this._sock.rQshift16() / 256, 10);
			var blue = parseInt(this._sock.rQshift16() / 256, 10);
			this._display.set_colourMap([blue, green, red], first_colour + c);
		}
		debug('_handle_set_colour_map_msg() | colourMap: ' + this._display.get_colourMap());
		debug('_handle_set_colour_map_msg() | registered ' + num_colours + ' colourMap entries');

		return true;
	},

	_handle_server_cut_text: function () {
		debug('_handle_server_cut_text()');

		if (this._sock.rQwait('ServerCutText header', 7, 1)) { return false; }
		this._sock.rQskipBytes(3);  // Padding
		var length = this._sock.rQshift32();
		if (this._sock.rQwait('ServerCutText', length, 8)) { return false; }

		var text = this._sock.rQshiftStr(length);
		this._onClipboard(this, text);

		return true;
	},

	_handle_xvp_msg: function () {
		if (this._sock.rQwait('XVP version and message', 3, 1)) { return false; }
		this._sock.rQskip8();  // Padding
		var xvp_ver = this._sock.rQshift8();
		var xvp_msg = this._sock.rQshift8();

		switch (xvp_msg) {
			case 0:  // XVP_FAIL
				this._updateState(this._rfb_state, 'Operation Failed');
				break;
			case 1:  // XVP_INIT
				this._rfb_xvp_ver = xvp_ver;
				debug('_handle_xvp_msg() | XVP extensions enabled (version ' + this._rfb_xvp_ver + ')');
				this._onXvpInit(this._rfb_xvp_ver);
				break;
			default:
				this._fail('Disconnected: illegal server XVP message ' + xvp_msg);
				break;
		}

		return true;
	},

	_normal_msg: function () {
		var msg_type;

		if (this._FBU.rects > 0) {
			msg_type = 0;
		} else {
			msg_type = this._sock.rQshift8();
		}

		switch (msg_type) {
			case 0:  // FramebufferUpdate
				var ret = this._framebufferUpdate();
				if (ret) {
					this._sock.send(RFB.messages.fbUpdateRequests(
						this._display.getCleanDirtyReset(),
						this._fb_width,
						this._fb_height
					));
				}
				return ret;

			case 1:  // SetColorMapEntries
				return this._handle_set_colour_map_msg();

			case 2:  // Bell
				debug('_normal_msg() | bell');
				this._onBell(this);
				return true;

			case 3:  // ServerCutText
				return this._handle_server_cut_text();

			case 250:  // XVP
				return this._handle_xvp_msg();

			default:
				// If onUnknownMessageType is not set then just fail.
				if (! this._onUnknownMessageType) {
					this._fail('Disconnected: illegal server message type ' + msg_type);
					debugerror('_normal_msg() | sock.rQslice(0, 30): ' + this._sock.rQslice(0, 30));
					return true;
				}
				// If onUnknownMessageType is set then call it. If the app does not accept
				// the unknown message type it must throw an error.
				// The listener must return false if more bytes are needed,
				// true otherwise.
				else {
					debug('_normal_msg() | passing unknown message type ' + msg_type + ' to the onUnknownMessageType listener');
					try {
						return this._onUnknownMessageType(msg_type, this._sock);
					}
					catch(error) {
						debugerror('_normal_msg() | error catched during onUnknownMessageType: %o', error);
						this._fail('Disconnected: invalid custom server message type ' + msg_type);
						debugerror('_normal_msg() | sock.rQslice(0, 30): ' + this._sock.rQslice(0, 30));
						return true;
					}
				}
		}
	},

	_framebufferUpdate: function () {
		var ret = true;
		var now;

		if (this._FBU.rects === 0) {
			if (this._sock.rQwait('FBU header', 3, 1)) { return false; }
			this._sock.rQskip8();  // Padding
			this._FBU.rects = this._sock.rQshift16();
			this._FBU.bytes = 0;
			this._timing.cur_fbu = 0;
			if (this._timing.fbu_rt_start > 0) {
				now = (new Date()).getTime();
				debug('_framebufferUpdate() | first FBU latency: ' + (now - this._timing.fbu_rt_start));
			}
		}

		while (this._FBU.rects > 0) {
			if (this._rfb_state !== 'normal') { return false; }

			if (this._sock.rQwait('FBU', this._FBU.bytes)) { return false; }
			if (this._FBU.bytes === 0) {
				if (this._sock.rQwait('rect header', 12)) { return false; }
				/* New FramebufferUpdate */

				var hdr = this._sock.rQshiftBytes(12);
				this._FBU.x        = (hdr[0] << 8) + hdr[1];
				this._FBU.y        = (hdr[2] << 8) + hdr[3];
				this._FBU.width    = (hdr[4] << 8) + hdr[5];
				this._FBU.height   = (hdr[6] << 8) + hdr[7];
				this._FBU.encoding = parseInt((hdr[8] << 24) + (hdr[9] << 16) +
												(hdr[10] << 8) + hdr[11], 10);

				this._onFBUReceive(this,
					{'x': this._FBU.x, 'y': this._FBU.y,
					 'width': this._FBU.width, 'height': this._FBU.height,
					 'encoding': this._FBU.encoding,
					 'encodingName': this._encNames[this._FBU.encoding]});

				if (!this._encNames[this._FBU.encoding]) {
					this._fail('Disconnected: unsupported encoding ' +
								 this._FBU.encoding);
					return false;
				}
			}

			this._timing.last_fbu = (new Date()).getTime();

			ret = this._encHandlers[this._FBU.encoding]();

			now = (new Date()).getTime();
			this._timing.cur_fbu += (now - this._timing.last_fbu);

			if (ret) {
				this._encStats[this._FBU.encoding][0]++;
				this._encStats[this._FBU.encoding][1]++;
				this._timing.pixels += this._FBU.width * this._FBU.height;
			}

			if (this._timing.pixels >= (this._fb_width * this._fb_height)) {
				if ((this._FBU.width === this._fb_width && this._FBU.height === this._fb_height) ||
					this._timing.fbu_rt_start > 0) {
					this._timing.full_fbu_total += this._timing.cur_fbu;
					this._timing.full_fbu_cnt++;
					debug('_framebufferUpdate() | timing of full FBU, curr: ' +
								this._timing.cur_fbu + ', total: ' +
								this._timing.full_fbu_total + ', cnt: ' +
								this._timing.full_fbu_cnt + ', avg: ' +
								(this._timing.full_fbu_total / this._timing.full_fbu_cnt));
				}

				if (this._timing.fbu_rt_start > 0) {
					var fbu_rt_diff = now - this._timing.fbu_rt_start;
					this._timing.fbu_rt_total += fbu_rt_diff;
					this._timing.fbu_rt_cnt++;
					debug('_framebufferUpdate() | full FBU round-trip, cur: ' +
						 fbu_rt_diff + ', total: ' +
						 this._timing.fbu_rt_total + ', cnt: ' +
						 this._timing.fbu_rt_cnt + ', avg: ' +
						 (this._timing.fbu_rt_total / this._timing.fbu_rt_cnt));
					this._timing.fbu_rt_start = 0;
				}
			}

			if (!ret) { return ret; }  // need more data
		}

		this._onFBUComplete(this,
				{'x': this._FBU.x, 'y': this._FBU.y,
				 'width': this._FBU.width, 'height': this._FBU.height,
				 'encoding': this._FBU.encoding,
				 'encodingName': this._encNames[this._FBU.encoding]});

		return true;  // We finished this FBU
	},
};


Util.make_properties(RFB, [
	['target', 'wo', 'dom'],                // VNC display rendering Canvas object
	['focusContainer', 'wo', 'dom'],        // DOM element that captures keyboard input
	['encrypt', 'rw', 'bool'],              // Use TLS/SSL/wss encryption
	['true_color', 'rw', 'bool'],           // Request true color pixel data
	['local_cursor', 'rw', 'bool'],         // Request locally rendered cursor
	['shared', 'rw', 'bool'],               // Request shared mode
	['view_only', 'rw', 'bool'],            // Disable client mouse/keyboard
	['xvp_password_sep', 'rw', 'str'],      // Separator for XVP password fields
	['disconnectTimeout', 'rw', 'int'],     // Time (s) to wait for disconnection
	['wsProtocols', 'rw', 'arr'],           // Protocols to use in the WebSocket connection
	['repeaterID', 'rw', 'str'],            // [UltraVNC] RepeaterID to connect to
	['viewportDrag', 'rw', 'bool'],         // Move the viewport on mouse drags
	['forceAuthScheme', 'rw', 'int'],       // Force auth scheme (0 means no)
	['enableMouseAndTouch', 'rw', 'bool'],  // Whether also enable mouse events when touch screen is detected

	// Callback functions
	['onUpdateState', 'rw', 'func'],        // onUpdateState(rfb, state, oldstate, statusMsg): RFB state update/change
	['onPasswordRequired', 'rw', 'func'],   // onPasswordRequired(rfb): VNC password is required
	['onClipboard', 'rw', 'func'],          // onClipboard(rfb, text): RFB clipboard contents received
	['onBell', 'rw', 'func'],               // onBell(rfb): RFB Bell message received
	['onFBUReceive', 'rw', 'func'],         // onFBUReceive(rfb, fbu): RFB FBU received but not yet processed
	['onFBUComplete', 'rw', 'func'],        // onFBUComplete(rfb, fbu): RFB FBU received and processed
	['onFBResize', 'rw', 'func'],           // onFBResize(rfb, width, height): frame buffer resized
	['onDesktopName', 'rw', 'func'],        // onDesktopName(rfb, name): desktop name received
	['onXvpInit', 'rw', 'func'],            // onXvpInit(version): XVP extensions active for this connection
	['onUnknownMessageType', 'rw', 'func']  // Handler for unknown VNC message types. If
											                    // null failure is emitted and the RFB closed.
]);


RFB.prototype.set_local_cursor = function (cursor) {
	if (!cursor || (cursor in {'0': 1, 'no': 1, 'false': 1})) {
		this._local_cursor = false;
		this._display.disableLocalCursor(); // Only show server-side cursor
	} else {
		if (this._display.get_cursor_uri()) {
			this._local_cursor = true;
		} else {
			debug('browser does not support local cursor');
			this._display.disableLocalCursor();
		}
	}
};

RFB.prototype.get_display = function () { return this._display; };
RFB.prototype.get_keyboard = function () { return this._keyboard; };
RFB.prototype.get_mouse = function () { return this._mouse; };


// Class Methods
RFB.messages = {
	keyEvent: function (keysym, down) {
		var arr = [4];
		Util.push8(arr, down);
		Util.push16(arr, 0);
		Util.push32(arr, keysym);
		return arr;
	},

	pointerEvent: function (x, y, mask) {
		var arr = [5];  // msg-type
		Util.push8(arr, mask);
		Util.push16(arr, x);
		Util.push16(arr, y);
		return arr;
	},

	// TODO(directxman12): make this unicode compatible?
	clientCutText: function (text) {
		var arr = [6];  // msg-type
		Util.push8(arr, 0);   // padding
		Util.push8(arr, 0);   // padding
		Util.push8(arr, 0);   // padding
		Util.push32(arr, text.length);
		var n = text.length;
		for (var i = 0; i < n; i++) {
			arr.push(text.charCodeAt(i));
		}

		return arr;
	},

	pixelFormat: function (bpp, depth, true_color) {
		var arr = [0]; // msg-type
		Util.push8(arr, 0);  // padding
		Util.push8(arr, 0);  // padding
		Util.push8(arr, 0);  // padding

		Util.push8(arr, bpp * 8); // bits-per-pixel
		Util.push8(arr, depth * 8); // depth
		Util.push8(arr, 0);  // little-endian
		Util.push8(arr, true_color ? 1 : 0);  // true-color

		Util.push16(arr, 255);  // red-max
		Util.push16(arr, 255);  // green-max
		Util.push16(arr, 255);  // blue-max
		Util.push8(arr, 16);    // red-shift
		Util.push8(arr, 8);     // green-shift
		Util.push8(arr, 0);     // blue-shift

		Util.push8(arr, 0);     // padding
		Util.push8(arr, 0);     // padding
		Util.push8(arr, 0);     // padding
		return arr;
	},

	clientEncodings: function (encodings, local_cursor, true_color) {
		var i, encList = [];

		for (i = 0; i < encodings.length; i++) {
			if (encodings[i][0] === 'Cursor' && !local_cursor) {
				debug('clientEncodings() | skipping Cursor pseudo-encoding');
			} else if (encodings[i][0] === 'TIGHT' && !true_color) {
				// TODO: remove this when we have tight+non-true-color
				debug('clientEncodings() | skipping tight as it is only supported with true color');
			} else {
				encList.push(encodings[i][1]);
			}
		}

		var arr = [2];  // msg-type
		Util.push8(arr, 0);   // padding

		Util.push16(arr, encList.length);  // encoding count
		for (i = 0; i < encList.length; i++) {
			Util.push32(arr, encList[i]);
		}

		return arr;
	},

	fbUpdateRequests: function (cleanDirty, fb_width, fb_height) {
		var arr = [];

		var cb = cleanDirty.cleanBox;
		var w, h;
		if (cb.w > 0 && cb.h > 0) {
			w = typeof cb.w === 'undefined' ? fb_width : cb.w;
			h = typeof cb.h === 'undefined' ? fb_height : cb.h;
			// Request incremental for clean box
			arr = arr.concat(RFB.messages.fbUpdateRequest(1, cb.x, cb.y, w, h));
		}

		for (var i = 0; i < cleanDirty.dirtyBoxes.length; i++) {
			var db = cleanDirty.dirtyBoxes[i];
			// Force all (non-incremental) for dirty box
			w = typeof db.w === 'undefined' ? fb_width : db.w;
			h = typeof db.h === 'undefined' ? fb_height : db.h;
			arr = arr.concat(RFB.messages.fbUpdateRequest(0, db.x, db.y, w, h));
		}

		return arr;
	},

	fbUpdateRequest: function (incremental, x, y, w, h) {
		if (typeof(x) === 'undefined') { x = 0; }
		if (typeof(y) === 'undefined') { y = 0; }

		var arr = [3];  // msg-type
		Util.push8(arr, incremental);
		Util.push16(arr, x);
		Util.push16(arr, y);
		Util.push16(arr, w);
		Util.push16(arr, h);

		return arr;
	}
};

RFB.genDES = function (password, challenge) {
	var passwd = [];
	for (var i = 0; i < password.length; i++) {
		passwd.push(password.charCodeAt(i));
	}
	return (new DES(passwd)).encrypt(challenge);
};

RFB.encodingHandlers = {
	RAW: function () {
		if (this._FBU.lines === 0) {
			this._FBU.lines = this._FBU.height;
		}

		this._FBU.bytes = this._FBU.width * this._fb_Bpp;  // at least a line
		if (this._sock.rQwait('RAW', this._FBU.bytes)) { return false; }
		var cur_y = this._FBU.y + (this._FBU.height - this._FBU.lines);
		var curr_height = Math.min(this._FBU.lines,
									 Math.floor(this._sock.rQlen() / (this._FBU.width * this._fb_Bpp)));
		this._display.blitImage(this._FBU.x, cur_y, this._FBU.width,
								curr_height, this._sock.get_rQ(),
								this._sock.get_rQi());
		this._sock.rQskipBytes(this._FBU.width * curr_height * this._fb_Bpp);
		this._FBU.lines -= curr_height;

		if (this._FBU.lines > 0) {
			this._FBU.bytes = this._FBU.width * this._fb_Bpp;  // At least another line
		} else {
			this._FBU.rects--;
			this._FBU.bytes = 0;
		}

		return true;
	},

	COPYRECT: function () {
		this._FBU.bytes = 4;
		if (this._sock.rQwait('COPYRECT', 4)) { return false; }
		this._display.renderQ_push({
			'type': 'copy',
			'old_x': this._sock.rQshift16(),
			'old_y': this._sock.rQshift16(),
			'x': this._FBU.x,
			'y': this._FBU.y,
			'width': this._FBU.width,
			'height': this._FBU.height
		});
		this._FBU.rects--;
		this._FBU.bytes = 0;
		return true;
	},

	RRE: function () {
		var color;
		if (this._FBU.subrects === 0) {
			this._FBU.bytes = 4 + this._fb_Bpp;
			if (this._sock.rQwait('RRE', 4 + this._fb_Bpp)) { return false; }
			this._FBU.subrects = this._sock.rQshift32();
			color = this._sock.rQshiftBytes(this._fb_Bpp);  // Background
			this._display.fillRect(this._FBU.x, this._FBU.y, this._FBU.width, this._FBU.height, color);
		}

		while (this._FBU.subrects > 0 && this._sock.rQlen() >= (this._fb_Bpp + 8)) {
			color = this._sock.rQshiftBytes(this._fb_Bpp);
			var x = this._sock.rQshift16();
			var y = this._sock.rQshift16();
			var width = this._sock.rQshift16();
			var height = this._sock.rQshift16();
			this._display.fillRect(this._FBU.x + x, this._FBU.y + y, width, height, color);
			this._FBU.subrects--;
		}

		if (this._FBU.subrects > 0) {
			var chunk = Math.min(this._rre_chunk_sz, this._FBU.subrects);
			this._FBU.bytes = (this._fb_Bpp + 8) * chunk;
		} else {
			this._FBU.rects--;
			this._FBU.bytes = 0;
		}

		return true;
	},

	HEXTILE: function () {
		var rQ = this._sock.get_rQ();
		var rQi = this._sock.get_rQi();

		if (this._FBU.tiles === 0) {
			this._FBU.tiles_x = Math.ceil(this._FBU.width / 16);
			this._FBU.tiles_y = Math.ceil(this._FBU.height / 16);
			this._FBU.total_tiles = this._FBU.tiles_x * this._FBU.tiles_y;
			this._FBU.tiles = this._FBU.total_tiles;
		}

		while (this._FBU.tiles > 0) {
			this._FBU.bytes = 1;
			if (this._sock.rQwait('HEXTILE subencoding', this._FBU.bytes)) { return false; }
			var subencoding = rQ[rQi];  // Peek
			if (subencoding > 30) {  // Raw
				this._fail('Disconnected: illegal hextile subencoding ' + subencoding);
				return false;
			}

			var subrects = 0;
			var curr_tile = this._FBU.total_tiles - this._FBU.tiles;
			var tile_x = curr_tile % this._FBU.tiles_x;
			var tile_y = Math.floor(curr_tile / this._FBU.tiles_x);
			var x = this._FBU.x + tile_x * 16;
			var y = this._FBU.y + tile_y * 16;
			var w = Math.min(16, (this._FBU.x + this._FBU.width) - x);
			var h = Math.min(16, (this._FBU.y + this._FBU.height) - y);

			// Figure out how much we are expecting
			if (subencoding & 0x01) {  // Raw
				this._FBU.bytes += w * h * this._fb_Bpp;
			} else {
				if (subencoding & 0x02) {  // Background
					this._FBU.bytes += this._fb_Bpp;
				}
				if (subencoding & 0x04) {  // Foreground
					this._FBU.bytes += this._fb_Bpp;
				}
				if (subencoding & 0x08) {  // AnySubrects
					this._FBU.bytes++;  // Since we aren't shifting it off
					if (this._sock.rQwait('hextile subrects header', this._FBU.bytes)) { return false; }
					subrects = rQ[rQi + this._FBU.bytes - 1];  // Peek
					if (subencoding & 0x10) {  // SubrectsColoured
						this._FBU.bytes += subrects * (this._fb_Bpp + 2);
					} else {
						this._FBU.bytes += subrects * 2;
					}
				}
			}

			if (this._sock.rQwait('hextile', this._FBU.bytes)) { return false; }

			// We know the encoding and have a whole tile
			this._FBU.subencoding = rQ[rQi];
			rQi++;
			if (this._FBU.subencoding === 0) {
				if (this._FBU.lastsubencoding & 0x01) {
					// Weird: ignore blanks are RAW
					debug('HEXTILE() | ignoring blank after RAW');
				} else {
					this._display.fillRect(x, y, w, h, this._FBU.background);
				}
			} else if (this._FBU.subencoding & 0x01) {  // Raw
				this._display.blitImage(x, y, w, h, rQ, rQi);
				rQi += this._FBU.bytes - 1;
			} else {
				if (this._FBU.subencoding & 0x02) {  // Background
					this._FBU.background = rQ.slice(rQi, rQi + this._fb_Bpp);
					rQi += this._fb_Bpp;
				}
				if (this._FBU.subencoding & 0x04) {  // Foreground
					this._FBU.foreground = rQ.slice(rQi, rQi + this._fb_Bpp);
					rQi += this._fb_Bpp;
				}

				this._display.startTile(x, y, w, h, this._FBU.background);
				if (this._FBU.subencoding & 0x08) {  // AnySubrects
					subrects = rQ[rQi];
					rQi++;

					for (var s = 0; s < subrects; s++) {
						var color;
						if (this._FBU.subencoding & 0x10) {  // SubrectsColoured
							color = rQ.slice(rQi, rQi + this._fb_Bpp);
							rQi += this._fb_Bpp;
						} else {
							color = this._FBU.foreground;
						}
						var xy = rQ[rQi];
						rQi++;
						var sx = (xy >> 4);
						var sy = (xy & 0x0f);

						var wh = rQ[rQi];
						rQi++;
						var sw = (wh >> 4) + 1;
						var sh = (wh & 0x0f) + 1;

						this._display.subTile(sx, sy, sw, sh, color);
					}
				}
				this._display.finishTile();
			}
			this._sock.set_rQi(rQi);
			this._FBU.lastsubencoding = this._FBU.subencoding;
			this._FBU.bytes = 0;
			this._FBU.tiles--;
		}

		if (this._FBU.tiles === 0) {
			this._FBU.rects--;
		}

		return true;
	},

	getTightCLength: function (arr) {
		var header = 1, data = 0;
		data += arr[0] & 0x7f;
		if (arr[0] & 0x80) {
			header++;
			data += (arr[1] & 0x7f) << 7;
			if (arr[1] & 0x80) {
				header++;
				data += arr[2] << 14;
			}
		}
		return [header, data];
	},

	display_tight: function (isTightPNG) {
		if (this._fb_depth === 1) {
			this._fail('Tight protocol handler only implements true color mode');
		}

		this._FBU.bytes = 1;  // compression-control byte
		if (this._sock.rQwait('TIGHT compression-control', this._FBU.bytes)) { return false; }

		// var checksum = function (data) {
		// 	var sum = 0;
		// 	for (var i = 0; i < data.length; i++) {
		// 		sum += data[i];
		// 		if (sum > 65536) { sum -= 65536; }
		// 	}
		// 	return sum;
		// };

		var resetStreams = 0;
		var streamId = -1;
		var decompress = function (data) {
			for (var i = 0; i < 4; i++) {
				if ((resetStreams >> i) & 1) {
					this._FBU.zlibs[i].reset();
					debug('display_tight() | reset zlib stream ' + i);
				}
			}

			var uncompressed = this._FBU.zlibs[streamId].uncompress(data, 0);
			if (uncompressed.status !== 0) {
				debugerror('display_tight() | invalid data in zlib stream');
			}

			return uncompressed.data;
		}.bind(this);

		var indexedToRGB = function (data, numColors, palette, width, height) {
			// Convert indexed (palette based) image data to RGB
			// TODO: reduce number of calculations inside loop
			var dest = [];
			var x, y, dp, sp;
			if (numColors === 2) {
				var w = Math.floor((width + 7) / 8);
				var w1 = Math.floor(width / 8);

				for (y = 0; y < height; y++) {
					var b;
					for (x = 0; x < w1; x++) {
						for (b = 7; b >= 0; b--) {
							dp = (y * width + x * 8 + 7 - b) * 3;
							sp = (data[y * w + x] >> b & 1) * 3;
							dest[dp] = palette[sp];
							dest[dp + 1] = palette[sp + 1];
							dest[dp + 2] = palette[sp + 2];
						}
					}

					for (b = 7; b >= 8 - width % 8; b--) {
						dp = (y * width + x * 8 + 7 - b) * 3;
						sp = (data[y * w + x] >> b & 1) * 3;
						dest[dp] = palette[sp];
						dest[dp + 1] = palette[sp + 1];
						dest[dp + 2] = palette[sp + 2];
					}
				}
			} else {
				for (y = 0; y < height; y++) {
					for (x = 0; x < width; x++) {
						dp = (y * width + x) * 3;
						sp = data[y * width + x] * 3;
						dest[dp] = palette[sp];
						dest[dp + 1] = palette[sp + 1];
						dest[dp + 2] = palette[sp + 2];
					}
				}
			}

			return dest;
		}.bind(this);

		var rQ = this._sock.get_rQ();
		var rQi = this._sock.get_rQi();
		var cmode, clength, data;

		var handlePalette = function () {
			var numColors = rQ[rQi + 2] + 1;
			var paletteSize = numColors * this._fb_depth;
			this._FBU.bytes += paletteSize;
			if (this._sock.rQwait('TIGHT palette ' + cmode, this._FBU.bytes)) { return false; }

			var bpp = (numColors <= 2) ? 1 : 8;
			var rowSize = Math.floor((this._FBU.width * bpp + 7) / 8);
			var raw = false;
			if (rowSize * this._FBU.height < 12) {
				raw = true;
				clength = [0, rowSize * this._FBU.height];
			} else {
				clength = RFB.encodingHandlers.getTightCLength(
					this._sock.rQslice(3 + paletteSize, 3 + paletteSize + 3
				));
			}

			this._FBU.bytes += clength[0] + clength[1];
			if (this._sock.rQwait('TIGHT ' + cmode, this._FBU.bytes)) { return false; }

			// Shift ctl, filter id, num colors, palette entries, and clength off
			this._sock.rQskipBytes(3);
			var palette = this._sock.rQshiftBytes(paletteSize);
			this._sock.rQskipBytes(clength[0]);

			if (raw) {
				data = this._sock.rQshiftBytes(clength[1]);
			} else {
				data = decompress(this._sock.rQshiftBytes(clength[1]));
			}

			// Convert indexed (palette based) image data to RGB
			var rgb = indexedToRGB(data, numColors, palette, this._FBU.width, this._FBU.height);

			this._display.renderQ_push({
				'type': 'blitRgb',
				'data': rgb,
				'x': this._FBU.x,
				'y': this._FBU.y,
				'width': this._FBU.width,
				'height': this._FBU.height
			});

			return true;
		}.bind(this);

		var handleCopy = function () {
			var raw = false;
			var uncompressedSize = this._FBU.width * this._FBU.height * this._fb_depth;
			if (uncompressedSize < 12) {
				raw = true;
				clength = [0, uncompressedSize];
			} else {
				clength = RFB.encodingHandlers.getTightCLength(this._sock.rQslice(1, 4));
			}
			this._FBU.bytes = 1 + clength[0] + clength[1];
			if (this._sock.rQwait('TIGHT ' + cmode, this._FBU.bytes)) { return false; }

			// Shift ctl, clength off
			this._sock.rQshiftBytes(1 + clength[0]);

			if (raw) {
				data = this._sock.rQshiftBytes(clength[1]);
			} else {
				data = decompress(this._sock.rQshiftBytes(clength[1]));
			}

			this._display.renderQ_push({
				'type': 'blitRgb',
				'data': data,
				'x': this._FBU.x,
				'y': this._FBU.y,
				'width': this._FBU.width,
				'height': this._FBU.height
			});

			return true;
		}.bind(this);

		var ctl = this._sock.rQpeek8();

		// Keep tight reset bits
		resetStreams = ctl & 0xF;

		// Figure out filter
		ctl = ctl >> 4;
		streamId = ctl & 0x3;

		if (ctl === 0x08)      { cmode = 'fill'; }
		else if (ctl === 0x09) { cmode = 'jpeg'; }
		else if (ctl === 0x0A) { cmode = 'png'; }
		else if (ctl & 0x04)   { cmode = 'filter'; }
		else if (ctl < 0x04)   { cmode = 'copy'; }
		else {
			return this._fail('Illegal tight compression received, ctl: ' + ctl);
		}

		if (isTightPNG && (cmode === 'filter' || cmode === 'copy')) {
			return this._fail('filter/copy received in tightPNG mode');
		}

		switch (cmode) {
			// fill use fb_depth because TPIXELs drop the padding byte
			case 'fill':  // TPIXEL
				this._FBU.bytes += this._fb_depth;
				break;
			case 'jpeg':  // max clength
				this._FBU.bytes += 3;
				break;
			case 'png':  // max clength
				this._FBU.bytes += 3;
				break;
			case 'filter':  // filter id + num colors if palette
				this._FBU.bytes += 2;
				break;
			case 'copy':
				break;
		}

		if (this._sock.rQwait('TIGHT ' + cmode, this._FBU.bytes)) { return false; }

		// Determine FBU.bytes
		switch (cmode) {
			case 'fill':
				this._sock.rQskip8();  // shift off ctl
				var color = this._sock.rQshiftBytes(this._fb_depth);
				this._display.renderQ_push({
					'type': 'fill',
					'x': this._FBU.x,
					'y': this._FBU.y,
					'width': this._FBU.width,
					'height': this._FBU.height,
					'color': [color[2], color[1], color[0]]
				});
				break;
			case 'png':
			case 'jpeg':
				clength = RFB.encodingHandlers.getTightCLength(this._sock.rQslice(1, 4));
				this._FBU.bytes = 1 + clength[0] + clength[1];  // ctl + clength size + jpeg-data
				if (this._sock.rQwait('TIGHT ' + cmode, this._FBU.bytes)) { return false; }

				// We have everything, render it
				this._sock.rQskipBytes(1 + clength[0]);  // shift off clt + compact length
				var img = new Image();
				img.src = 'data: image/' + cmode +
					extract_data_uri(this._sock.rQshiftBytes(clength[1]));
				this._display.renderQ_push({
					'type': 'img',
					'img': img,
					'x': this._FBU.x,
					'y': this._FBU.y
				});
				img = null;
				break;
			case 'filter':
				var filterId = rQ[rQi + 1];
				if (filterId === 1) {
					if (!handlePalette()) { return false; }
				} else {
					// Filter 0, Copy could be valid here, but servers don't send it as an explicit filter
					// Filter 2, Gradient is valid but not use if jpeg is enabled
					// TODO(directxman12): why aren't we just calling '_fail' here
					throw new Error('Unsupported tight subencoding received, filter: ' + filterId);
				}
				break;
			case 'copy':
				if (!handleCopy()) { return false; }
				break;
		}


		this._FBU.bytes = 0;
		this._FBU.rects--;

		return true;
	},

	TIGHT: function () { return this._encHandlers.display_tight(false); },
	TIGHT_PNG: function () { return this._encHandlers.display_tight(true); },

	last_rect: function () {
		this._FBU.rects = 0;
		return true;
	},

	handle_FB_resize: function () {
		this._fb_width = this._FBU.width;
		this._fb_height = this._FBU.height;
		this._display.resize(this._fb_width, this._fb_height);
		this._onFBResize(this, this._fb_width, this._fb_height);
		this._timing.fbu_rt_start = (new Date()).getTime();

		this._FBU.bytes = 0;
		this._FBU.rects -= 1;
		return true;
	},

	ExtendedDesktopSize: function () {
		this._FBU.bytes = 1;
		if (this._sock.rQwait('ExtendedDesktopSize', this._FBU.bytes)) { return false; }

		this._supportsSetDesktopSize = true;
		var number_of_screens = this._sock.rQpeek8();

		this._FBU.bytes = 4 + (number_of_screens * 16);
		if (this._sock.rQwait('ExtendedDesktopSize', this._FBU.bytes)) { return false; }

		this._sock.rQskipBytes(1);  // number-of-screens
		this._sock.rQskipBytes(3);  // padding

		for (var i=0; i<number_of_screens; i += 1) {
			// Save the id and flags of the first screen
			if (i === 0) {
				this._screen_id = this._sock.rQshiftBytes(4);    // id
				this._sock.rQskipBytes(2);                       // x-position
				this._sock.rQskipBytes(2);                       // y-position
				this._sock.rQskipBytes(2);                       // width
				this._sock.rQskipBytes(2);                       // height
				this._screen_flags = this._sock.rQshiftBytes(4); // flags
			} else {
				this._sock.rQskipBytes(16);
			}
		}

		/*
		 * The x-position indicates the reason for the change:
		 *
		 *  0 - server resized on its own
		 *  1 - this client requested the resize
		 *  2 - another client requested the resize
		 */

		// We need to handle errors when we requested the resize.
		if (this._FBU.x === 1 && this._FBU.y !== 0) {
			var msg = '';
			// The y-position indicates the status code from the server
			switch (this._FBU.y) {
			case 1:
					msg = 'resize is administratively prohibited';
					break;
			case 2:
					msg = 'out of resources';
					break;
			case 3:
					msg = 'invalid screen layout';
					break;
			default:
					msg = 'unknown reason';
					break;
			}
			debug('ExtendedDesktopSize() | server did not accept the resize request: %s', msg);
			return true;
		}

		this._encHandlers.handle_FB_resize();
		return true;
	},

	DesktopSize: function () {
		debug('DesktopSize()');

		this._encHandlers.handle_FB_resize();
		return true;
	},

	Cursor: function () {
		debug('Cursor()');

		var x = this._FBU.x;  // hotspot-x
		var y = this._FBU.y;  // hotspot-y
		var w = this._FBU.width;
		var h = this._FBU.height;

		var pixelslength = w * h * this._fb_Bpp;
		var masklength = Math.floor((w + 7) / 8) * h;

		this._FBU.bytes = pixelslength + masklength;
		if (this._sock.rQwait('cursor encoding', this._FBU.bytes)) { return false; }

		this._display.changeCursor(this._sock.rQshiftBytes(pixelslength),
									 this._sock.rQshiftBytes(masklength),
									 x, y, w, h);

		this._FBU.bytes = 0;
		this._FBU.rects--;

		return true;
	},

	JPEG_quality_lo: function () {
		debugerror('JPEG_quality_lo() | server sent jpeg_quality pseudo-encoding');
	},

	compress_lo: function () {
		debugerror('compress_lo() | server sent compress level pseudo-encoding');
	}
};


/**
 * Private API.
 */


function extract_data_uri (arr) {
	return ';base64,' + Base64.encode(arr);
}

},{"./base64":6,"./des":7,"./display":8,"./input":9,"./keys":11,"./tinf":13,"./util":14,"./websock":15,"debug":2}],13:[function(require,module,exports){
/*
 * tinflate  -  tiny inflate
 *
 * Copyright (c) 2003 by Joergen Ibsen / Jibz
 * All Rights Reserved
 *
 * http://www.ibsensoftware.com/
 *
 * This software is provided 'as-is', without any express
 * or implied warranty.  In no event will the authors be
 * held liable for any damages arising from the use of
 * this software.
 *
 * Permission is granted to anyone to use this software
 * for any purpose, including commercial applications,
 * and to alter it and redistribute it freely, subject to
 * the following restrictions:
 *
 * 1. The origin of this software must not be
 *    misrepresented; you must not claim that you
 *    wrote the original software. If you use this
 *    software in a product, an acknowledgment in
 *    the product documentation would be appreciated
 *    but is not required.
 *
 * 2. Altered source versions must be plainly marked
 *    as such, and must not be misrepresented as
 *    being the original software.
 *
 * 3. This notice may not be removed or altered from
 *    any source distribution.
 */

/*
 * tinflate javascript port by Erik Moller in May 2011.
 * emoller@opera.com
 *
 * read_bits() patched by mike@imidio.com to allow
 * reading more then 8 bits (needed in some zlib streams)
 */


/**
 * Expose the TINF class.
 */
module.exports = TINF;


function TINF() {
	this.OK = 0;
	this.DATA_ERROR = (-3);
	this.WINDOW_SIZE = 32768;

	/* ------------------------------ *
	 * -- internal data structures -- *
	 * ------------------------------ */

	this.TREE = function() {
		this.table = new Array(16);  /* table of code length counts */
		this.trans = new Array(288); /* code -> symbol translation table */
	};

	this.DATA = function(that) {
		this.source = '';
		this.sourceIndex = 0;
		this.tag = 0;
		this.bitcount = 0;

		this.dest = [];

		this.history = [];

		this.ltree = new that.TREE(); /* dynamic length/symbol tree */
		this.dtree = new that.TREE(); /* dynamic distance tree */
	};

	/* --------------------------------------------------- *
	 * -- uninitialized global data (static structures) -- *
	 * --------------------------------------------------- */

	this.sltree = new this.TREE(); /* fixed length/symbol tree */
	this.sdtree = new this.TREE(); /* fixed distance tree */

	/* extra bits and base tables for length codes */
	this.length_bits = new Array(30);
	this.length_base = new Array(30);

	/* extra bits and base tables for distance codes */
	this.dist_bits = new Array(30);
	this.dist_base = new Array(30);

	/* special ordering of code length codes */
	this.clcidx = [
		16, 17, 18, 0, 8, 7, 9, 6,
		10, 5, 11, 4, 12, 3, 13, 2,
		14, 1, 15
	];

	/* ----------------------- *
	 * -- utility functions -- *
	 * ----------------------- */

	/* build extra bits and base tables */
	this.build_bits_base = function(bits, base, delta, first) {
		var i, sum;

		/* build bits table */
		for (i = 0; i < delta; ++i) {
			bits[i] = 0;
		}
		for (i = 0; i < 30 - delta; ++i) {
			bits[i + delta] = Math.floor(i / delta);
		}

		/* build base table */
		for (sum = first, i = 0; i < 30; ++i) {
			base[i] = sum;
			sum += 1 << bits[i];
		}
	};

	/* build the fixed huffman trees */
	this.build_fixed_trees = function(lt, dt) {
		var i;

		/* build fixed length tree */
		for (i = 0; i < 7; ++i) { lt.table[i] = 0; }

		lt.table[7] = 24;
		lt.table[8] = 152;
		lt.table[9] = 112;

		for (i = 0; i < 24; ++i) { lt.trans[i] = 256 + i; }
		for (i = 0; i < 144; ++i) { lt.trans[24 + i] = i; }
		for (i = 0; i < 8; ++i) { lt.trans[24 + 144 + i] = 280 + i; }
		for (i = 0; i < 112; ++i) { lt.trans[24 + 144 + 8 + i] = 144 + i; }

		/* build fixed distance tree */
		for (i = 0; i < 5; ++i) { dt.table[i] = 0; }

		dt.table[5] = 32;

		for (i = 0; i < 32; ++i) { dt.trans[i] = i; }
	};

	/* given an array of code lengths, build a tree */
	this.build_tree = function(t, lengths, loffset, num) {
		var offs = new Array(16);
		var i, sum;

		/* clear code length count table */
		for (i = 0; i < 16; ++i) { t.table[i] = 0; }

		/* scan symbol lengths, and sum code length counts */
		for (i = 0; i < num; ++i) {
			t.table[lengths[loffset + i]]++;
		}

		t.table[0] = 0;

		/* compute offset table for distribution sort */
		for (sum = 0, i = 0; i < 16; ++i) {
			offs[i] = sum;
			sum += t.table[i];
		}

		/* create code->symbol translation table (symbols sorted by code) */
		for (i = 0; i < num; ++i) {
			if (lengths[loffset + i]) {
				t.trans[offs[lengths[loffset + i]]++] = i;
			}
		}
	};

	/* ---------------------- *
	 * -- decode functions -- *
	 * ---------------------- */

	/* get one bit from source stream */
	this.getbit = function(d) {
		var bit;

		/* check if tag is empty */
		if (!(d.bitcount--)) {
			/* load next tag */
			d.tag = d.source[d.sourceIndex++] & 0xff;
			d.bitcount = 7;
		}

		/* shift bit out of tag */
		bit = d.tag & 0x01;
		d.tag >>= 1;

		return bit;
	};

	this.read_bits = function(d, num, base) {
		if (!num) {
			return base;
		}

		var ret = read_bits_direct(d.source, d.bitcount, d.tag, d.sourceIndex, num);
		d.bitcount = ret[0];
		d.tag = ret[1];
		d.sourceIndex = ret[2];
		return ret[3] + base;
	};

	/* given a data stream and a tree, decode a symbol */
	this.decode_symbol = function(d, t) {
		while (d.bitcount < 16) {
			d.tag = d.tag | (d.source[d.sourceIndex++] & 0xff) << d.bitcount;
			d.bitcount += 8;
		}

		var sum = 0, cur = 0, len = 0;
		do {
			cur = 2 * cur + ((d.tag & (1 << len)) >> len);

			++len;

			sum += t.table[len];
			cur -= t.table[len];
		} while (cur >= 0);

		d.tag >>= len;
		d.bitcount -= len;

		return t.trans[sum + cur];
	};

	/* given a data stream, decode dynamic trees from it */
	this.decode_trees = function(d, lt, dt) {
		var code_tree = new this.TREE();
		var lengths = new Array(288+32);
		var hlit, hdist, hclen;
		var i, num, length;

		/* get 5 bits HLIT (257-286) */
		hlit = this.read_bits(d, 5, 257);

		/* get 5 bits HDIST (1-32) */
		hdist = this.read_bits(d, 5, 1);

		/* get 4 bits HCLEN (4-19) */
		hclen = this.read_bits(d, 4, 4);

		for (i = 0; i < 19; ++i) { lengths[i] = 0; }

		/* read code lengths for code length alphabet */
		for (i = 0; i < hclen; ++i) {
			/* get 3 bits code length (0-7) */
			var clen = this.read_bits(d, 3, 0);

			lengths[this.clcidx[i]] = clen;
		}

		/* build code length tree */
		this.build_tree(code_tree, lengths, 0, 19);

		/* decode code lengths for the dynamic trees */
		for (num = 0; num < hlit + hdist;) {
			var sym = this.decode_symbol(d, code_tree);

			switch (sym) {
			case 16:
				/* copy previous code length 3-6 times (read 2 bits) */
				{
					var prev = lengths[num - 1];
					for (length = this.read_bits(d, 2, 3); length; --length) {
						lengths[num++] = prev;
					}
				}
				break;
			case 17:
				/* repeat code length 0 for 3-10 times (read 3 bits) */
				for (length = this.read_bits(d, 3, 3); length; --length) {
					lengths[num++] = 0;
				}
				break;
			case 18:
				/* repeat code length 0 for 11-138 times (read 7 bits) */
				for (length = this.read_bits(d, 7, 11); length; --length) {
					lengths[num++] = 0;
				}
				break;
			default:
				/* values 0-15 represent the actual code lengths */
				lengths[num++] = sym;
				break;
			}
		}

		/* build dynamic trees */
		this.build_tree(lt, lengths, 0, hlit);
		this.build_tree(dt, lengths, hlit, hdist);
	};

	/* ----------------------------- *
	 * -- block inflate functions -- *
	 * ----------------------------- */

	/* given a stream and two trees, inflate a block of data */
	this.inflate_block_data = function(d, lt, dt) {
		// js optimization.
		var ddest = d.dest;
		var ddestlength = ddest.length;

		while (1) {
			var sym = this.decode_symbol(d, lt);

			/* check for end of block */
			if (sym === 256) {
				return this.OK;
			}

			if (sym < 256) {
				ddest[ddestlength++] = sym; // ? String.fromCharCode(sym);
				d.history.push(sym);
			} else {
				var length, dist, offs;
				var i;

				sym -= 257;

				/* possibly get more bits from length code */
				length = this.read_bits(d, this.length_bits[sym], this.length_base[sym]);

				dist = this.decode_symbol(d, dt);

				/* possibly get more bits from distance code */
				offs = d.history.length - this.read_bits(d, this.dist_bits[dist], this.dist_base[dist]);

				if (offs < 0) {
					throw new Error('Invalid zlib offset ' + offs);
				}

				/* copy match */
				for (i = offs; i < offs + length; ++i) {
					//ddest[ddestlength++] = ddest[i];
					ddest[ddestlength++] = d.history[i];
					d.history.push(d.history[i]);
				}
			}
		}
	};

	/* inflate an uncompressed block of data */
	this.inflate_uncompressed_block = function(d) {
		var length, invlength;
		var i;

		if (d.bitcount > 7) {
			 var overflow = Math.floor(d.bitcount / 8);
			 d.sourceIndex -= overflow;
			 d.bitcount = 0;
			 d.tag = 0;
		}

		/* get length */
		length = d.source[d.sourceIndex+1];
		length = 256*length + d.source[d.sourceIndex];

		/* get one's complement of length */
		invlength = d.source[d.sourceIndex+3];
		invlength = 256*invlength + d.source[d.sourceIndex+2];

		/* check length */
		if (length !== (~invlength & 0x0000ffff)) {
			return this.DATA_ERROR;
		}

		d.sourceIndex += 4;

		/* copy block */
		for (i = length; i; --i) {
			 d.history.push(d.source[d.sourceIndex]);
			 d.dest[d.dest.length] = d.source[d.sourceIndex++];
		}

		/* make sure we start next block on a byte boundary */
		d.bitcount = 0;

		return this.OK;
	};

	/* inflate a block of data compressed with fixed huffman trees */
	this.inflate_fixed_block = function(d) {
		/* decode block using fixed trees */
		return this.inflate_block_data(d, this.sltree, this.sdtree);
	};

	/* inflate a block of data compressed with dynamic huffman trees */
	this.inflate_dynamic_block = function(d) {
		/* decode trees from stream */
		this.decode_trees(d, d.ltree, d.dtree);

		/* decode block using decoded trees */
		return this.inflate_block_data(d, d.ltree, d.dtree);
	};

	/* ---------------------- *
	 * -- public functions -- *
	 * ---------------------- */

	/* initialize global (static) data */
	this.init = function() {
		/* build fixed huffman trees */
		this.build_fixed_trees(this.sltree, this.sdtree);

		/* build extra bits and base tables */
		this.build_bits_base(this.length_bits, this.length_base, 4, 3);
		this.build_bits_base(this.dist_bits, this.dist_base, 2, 1);

		/* fix a special case */
		this.length_bits[28] = 0;
		this.length_base[28] = 258;

		this.reset();
	};

	this.reset = function() {
		this.d = new this.DATA(this);
		delete this.header;
	};

	/* inflate stream from source to dest */
	this.uncompress = function(source, offset) {
		var d = this.d;
		var bfinal;

		/* initialise data */
		d.source = source;
		d.sourceIndex = offset;
		d.bitcount = 0;

		d.dest = [];

		// Skip zlib header at start of stream
		if (typeof this.header === 'undefined') {
			this.header = this.read_bits(d, 16, 0);
			/* byte 0: 0x78, 7 = 32k window size, 8 = deflate */
			/* byte 1: check bits for header and other flags */
		}

		var blocks = 0;

		do {
			var btype;
			var res;

			/* read final block flag */
			bfinal = this.getbit(d);

			/* read block type (2 bits) */
			btype = this.read_bits(d, 2, 0);

			/* decompress block */
			switch (btype) {
			case 0:
				/* decompress uncompressed block */
				res = this.inflate_uncompressed_block(d);
				break;
			case 1:
				/* decompress block with fixed huffman trees */
				res = this.inflate_fixed_block(d);
				break;
			case 2:
				/* decompress block with dynamic huffman trees */
				res = this.inflate_dynamic_block(d);
				break;
			default:
				return { 'status' : this.DATA_ERROR };
			}

			if (res !== this.OK) {
				return { 'status' : this.DATA_ERROR };
			}
			blocks++;

		} while (!bfinal && d.sourceIndex < d.source.length);

		d.history = d.history.slice(-this.WINDOW_SIZE);

		return { 'status' : this.OK, 'data' : d.dest };
	};
}


/**
 * Private API.
 */


/* read a num bit value from a stream and add base */
function read_bits_direct(source, bitcount, tag, idx, num) {
	var val = 0;

	while (bitcount < 24) {
		tag = tag | (source[idx++] & 0xff) << bitcount;
		bitcount += 8;
	}

	val = tag & (0xffff >> (16 - num));
	tag >>= num;
	bitcount -= num;
	return [bitcount, tag, idx, val];
}

},{}],14:[function(require,module,exports){
(function (global){
/*
 * noVNC: HTML5 VNC client
 * Copyright (C) 2012 Joel Martin
 * Licensed under MPL 2.0 (see LICENSE.txt)
 */


/**
 * Dependencies.
 */
var debug = require('debug')('noVNC:Util');
var debugerror = require('debug')('noVNC:ERROR:Util');
debugerror.log = console.warn.bind(console);


/**
 * Local variables.
 */
var cursor_uris_supported = null;


var Util = module.exports = {
	push8: function (array, num) {
		array.push(num & 0xFF);
	},

	push16: function (array, num) {
		array.push((num >> 8) & 0xFF,
						num & 0xFF);
	},

	push32: function (array, num) {
		array.push((num >> 24) & 0xFF,
					 (num >> 16) & 0xFF,
					 (num >> 8) & 0xFF,
					 num & 0xFF);
	},

	requestAnimationFrame: (function () {
		if (global.requestAnimationFrame) {
			return global.requestAnimationFrame.bind(global);
		}
		else if (global.webkitRequestAnimationFrame) {
			return global.webkitRequestAnimationFrame.bind(global);
		}
		else if (global.mozRequestAnimationFrame) {
			return global.mozRequestAnimationFrame.bind(global);
		}
		else if (global.oRequestAnimationFrame) {
			return global.oRequestAnimationFrame.bind(global);
		}
		else if (global.msRequestAnimationFrame) {
			return global.msRequestAnimationFrame.bind(global);
		}
		else {
			return function(callback) {
				setTimeout(callback, 1000 / 60);
			};
		}
	})(),

	make_properties: function (constructor, arr) {
		for (var i = 0; i < arr.length; i++) {
			make_property(constructor.prototype, arr[i][0], arr[i][1], arr[i][2]);
		}
	},

	set_defaults: function (obj, conf, defaults) {
		var defaults_keys = Object.keys(defaults);
		var conf_keys = Object.keys(conf);
		var keys_obj = {};
		var i;

		for (i = 0; i < defaults_keys.length; i++) { keys_obj[defaults_keys[i]] = 1; }
		for (i = 0; i < conf_keys.length; i++) { keys_obj[conf_keys[i]] = 1; }

		var keys = Object.keys(keys_obj);

		for (i = 0; i < keys.length; i++) {
			var setter = obj['_raw_set_' + keys[i]];

			if (!setter) {
				debugerror('invalid property: %s', keys[i]);
				continue;
			}

			if (keys[i] in conf) {
				setter.call(obj, conf[keys[i]]);
			} else {
				setter.call(obj, defaults[keys[i]]);
			}
		}
	},

	decodeUTF8: function (utf8string) {
		return decodeURIComponent(escape(utf8string));
	},

	/**
	 * Get DOM element position on page.
	 */
	getPosition: function (obj) {
		// NB(sross): the Mozilla developer reference seems to indicate that
		// getBoundingClientRect includes border and padding, so the canvas
		// style should NOT include either.
		var objPosition = obj.getBoundingClientRect();

		return {'x': objPosition.left + window.pageXOffset, 'y': objPosition.top + window.pageYOffset,
						'width': objPosition.width, 'height': objPosition.height};
	},

	/**
	 * Get mouse event position in DOM element
	 */
	getEventPosition: function (e, obj, scale, zoom) {
		var evt, docX, docY, pos;

		if (typeof zoom === 'undefined') {
			zoom = 1.0;
		}
		evt = (e ? e : global.event);
		evt = (evt.changedTouches ? evt.changedTouches[0] : evt.touches ? evt.touches[0] : evt);
		if (evt.pageX || evt.pageY) {
			docX = evt.pageX;
			docY = evt.pageY;
			docX = evt.pageX/zoom;
			docY = evt.pageY/zoom;
		} else if (evt.clientX || evt.clientY) {
			docX = evt.clientX + document.body.scrollLeft +
				document.documentElement.scrollLeft;
			docY = evt.clientY + document.body.scrollTop +
				document.documentElement.scrollTop;
		}
		pos = Util.getPosition(obj);
		if (typeof scale === 'undefined') {
			scale = 1;
		}

		var realx = docX - pos.x;
		var realy = docY - pos.y;
		var x = Math.max(Math.min(realx, pos.width - 1), 0);
		var y = Math.max(Math.min(realy, pos.height - 1), 0);

		return {'x': x / scale, 'y': y / scale, 'realx': realx / scale, 'realy': realy / scale};
	},

	addEvent: function (obj, evType, fn) {
		if (obj.attachEvent) {
			var r = obj.attachEvent('on' + evType, fn);
			return r;
		} else if (obj.addEventListener) {
			obj.addEventListener(evType, fn, false);
			return true;
		} else {
			throw new Error('handler could not be attached');
		}
	},

	removeEvent: function (obj, evType, fn) {
		if (obj.detachEvent) {
			var r = obj.detachEvent('on' + evType, fn);
			return r;
		} else if (obj.removeEventListener) {
			obj.removeEventListener(evType, fn, false);
			return true;
		} else {
			throw new Error('handler could not be removed');
		}
	},

	stopEvent: function (e) {
		if (e.stopPropagation) { e.stopPropagation(); }
		else                   { e.cancelBubble = true; }

		if (e.preventDefault)  { e.preventDefault(); }
		else                   { e.returnValue = false; }
	},

	browserSupportsCursorURIs: function () {
		if (cursor_uris_supported === null) {
			try {
				var target = document.createElement('canvas');

				target.style.cursor = 'url("data:image/x-icon;base64,AAACAAEACAgAAAIAAgA4AQAAFgAAACgAAAAIAAAAEAAAAAEAIAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAA==") 2 2, default';

				if (target.style.cursor) {
					debug('data URI scheme cursor supported');
					cursor_uris_supported = true;
				} else {
					debugerror('data URI scheme cursor not supported');
					cursor_uris_supported = false;
				}
			} catch (exc) {
				debugerror('data URI scheme cursor test exception: ' + exc);
				cursor_uris_supported = false;
			}
		}

		return cursor_uris_supported;
	}
};


/**
 * Private API.
 */


function make_property (proto, name, mode, type) {
	var getter;

	if (type === 'arr') {
		getter = function (idx) {
			if (typeof idx !== 'undefined') {
				return this['_' + name][idx];
			} else {
				return this['_' + name];
			}
		};
	} else {
		getter = function() {
			return this['_' + name];
		};
	}

	function make_setter (process_val) {
		if (process_val) {
			return function (val, idx) {
				if (typeof idx !== 'undefined') {
					this['_' + name][idx] = process_val(val);
				} else {
					this['_' + name] = process_val(val);
				}
			};
		} else {
			return function (val, idx) {
				if (typeof idx !== 'undefined') {
					this['_' + name][idx] = val;
				} else {
					this['_' + name] = val;
				}
			};
		}
	}

	var setter;

	if (type === 'bool') {
		setter = make_setter(function (val) {
			if (!val || (val in {'0': 1, 'no': 1, 'false': 1})) {
				return false;
			} else {
				return true;
			}
		});
	} else if (type === 'int') {
		setter = make_setter(function (val) { return parseInt(val, 10); });
	} else if (type === 'float') {
		setter = make_setter(parseFloat);
	} else if (type === 'str') {
		setter = make_setter(String);
	} else if (type === 'func') {
		setter = make_setter(function (val) {
			if (!val) {
				return function () {};
			} else {
				return val;
			}
		});
	} else if (type === 'arr' || type === 'dom' || type === 'raw') {
		setter = make_setter();
	} else {
		throw new Error('unknown property type ' + type);  // some sanity checking
	}

	// set the getter
	if (typeof proto['get_' + name] === 'undefined') {
		proto['get_' + name] = getter;
	}

	// set the setter if needed
	if (typeof proto['set_' + name] === 'undefined') {
		if (mode === 'rw') {
			proto['set_' + name] = setter;
		} else if (mode === 'wo') {
			proto['set_' + name] = function (val, idx) {
				if (typeof this['_' + name] !== 'undefined') {
					throw new Error(name + ' can only be set once');
				}
				setter.call(this, val, idx);
			};
		}
	}

	// make a special setter that we can use in set defaults
	proto['_raw_set_' + name] = function (val, idx) {
		setter.call(this, val, idx);
		//delete this['_init_set_' + name];  // remove it after use
	};
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"debug":2}],15:[function(require,module,exports){
(function (global){
/*
 * Websock: high-performance binary WebSockets
 * Copyright (C) 2012 Joel Martin
 * Licensed under MPL 2.0 (see LICENSE.txt)
 *
 * Websock is similar to the standard WebSocket object but Websock
 * enables communication with raw TCP sockets (i.e. the binary stream)
 * via websockify. This is accomplished by base64 encoding the data
 * stream between Websock and websockify.
 *
 * Websock has built-in receive queue buffering; the message event
 * does not contain actual data but is simply a notification that
 * there is new data available. Several rQ* methods are available to
 * read binary data off of the receive queue.
 */


/**
 * Dependencies.
 */
var debug = require('debug')('noVNC:Websock');
var debugerror = require('debug')('noVNC:ERROR:Websock');
debugerror.log = console.warn.bind(console);
var browser = require('bowser').browser;
var Base64 = require('./base64');


/**
 * Expose Websock class.
 */
module.exports = Websock;


function Websock() {
	this._websocket = null;  // WebSocket object
	this._rQ = [];           // Receive queue
	this._rQi = 0;           // Receive queue index
	this._rQmax = 10000;     // Max receive queue size before compacting
	this._sQ = [];           // Send queue

	this._mode = 'base64';    // Current WebSocket mode: 'binary', 'base64'
	this.maxBufferedAmount = 200;

	this._eventHandlers = {
		'message': function () {},
		'open': function () {},
		'close': function () {},
		'error': function () {}
	};
}


Websock.prototype = {
	// Getters and Setters
	get_sQ: function () {
		return this._sQ;
	},

	get_rQ: function () {
		return this._rQ;
	},

	get_rQi: function () {
		return this._rQi;
	},

	set_rQi: function (val) {
		this._rQi = val;
	},

	// Receive Queue
	rQlen: function () {
		return this._rQ.length - this._rQi;
	},

	rQpeek8: function () {
		return this._rQ[this._rQi];
	},

	rQshift8: function () {
		return this._rQ[this._rQi++];
	},

	rQskip8: function () {
		this._rQi++;
	},

	rQskipBytes: function (num) {
		this._rQi += num;
	},

	rQunshift8: function (num) {
		if (this._rQi === 0) {
			this._rQ.unshift(num);
		} else {
			this._rQi--;
			this._rQ[this._rQi] = num;
		}
	},

	rQshift16: function () {
		return (this._rQ[this._rQi++] << 8) +
			   this._rQ[this._rQi++];
	},

	rQshift32: function () {
		return (this._rQ[this._rQi++] << 24) +
			   (this._rQ[this._rQi++] << 16) +
			   (this._rQ[this._rQi++] << 8) +
			   this._rQ[this._rQi++];
	},

	rQshiftStr: function (len) {
		if (typeof(len) === 'undefined') { len = this.rQlen(); }
		var arr = this._rQ.slice(this._rQi, this._rQi + len);
		this._rQi += len;
		return String.fromCharCode.apply(null, arr);
	},

	rQshiftBytes: function (len) {
		if (typeof(len) === 'undefined') { len = this.rQlen(); }
		this._rQi += len;
		return this._rQ.slice(this._rQi - len, this._rQi);
	},

	rQslice: function (start, end) {
		if (end) {
			return this._rQ.slice(this._rQi + start, this._rQi + end);
		} else {
			return this._rQ.slice(this._rQi + start);
		}
	},

	// Check to see if we must wait for 'num' bytes (default to FBU.bytes)
	// to be available in the receive queue. Return true if we need to
	// wait (and possibly print a debug message), otherwise false.
	rQwait: function (msg, num, goback) {
		var rQlen = this._rQ.length - this._rQi; // Skip rQlen() function call
		if (rQlen < num) {
			if (goback) {
				if (this._rQi < goback) {
					throw new Error('rQwait cannot backup ' + goback + ' bytes');
				}
				this._rQi -= goback;
			}
			return true; // true means need more data
		}
		return false;
	},

	// Send Queue

	flush: function () {
		if (this._websocket.bufferedAmount !== 0) {
			debug('flush() | bufferedAmount: %d', this._websocket.bufferedAmount);
		}

		if (this._websocket.bufferedAmount < this.maxBufferedAmount) {
			if (this._sQ.length > 0) {
				this._websocket.send(this._encode_message());
				this._sQ = [];
			}

			return true;
		} else {
			debug('flush() | delaying send');
			return false;
		}
	},

	send: function (arr) {
	   this._sQ = this._sQ.concat(arr);
	   return this.flush();
	},

	send_string: function (str) {
		this.send(str.split('').map(function (chr) {
			return chr.charCodeAt(0);
		}));
	},

	// Event Handlers
	on: function (evt, handler) {
		this._eventHandlers[evt] = handler;
	},

	off: function (evt) {
		this._eventHandlers[evt] = function() {};
	},

	init: function (protocols) {
		this._rQ = [];
		this._rQi = 0;
		this._sQ = [];
		this._websocket = null;

		// Check for full typed array support
		var bt = false;
		if (('Uint8Array' in global) && ('set' in Uint8Array.prototype)) {
			bt = true;
		}

		var wsbt = false;
		if (global.WebSocket) {
			// Safari < 7 does not support binary WS.
			if (browser.safari && Number(browser.version) > 0 && Number(browser.version) < 7) {
				debug('init() | Safari %d does not support binary WebSocket', Number(browser.version));
			}
			else {
				wsbt = true;
			}
		}

		// Default protocols if not specified
		if (typeof(protocols) === 'undefined') {
			if (wsbt) {
				protocols = ['binary', 'base64'];
			} else {
				protocols = 'base64';
			}
		}

		if (!wsbt) {
			if (protocols === 'binary') {
				throw new Error('WebSocket binary sub-protocol requested but not supported');
			}

			if (typeof(protocols) === 'object') {
				var new_protocols = [];

				for (var i = 0; i < protocols.length; i++) {
					if (protocols[i] === 'binary') {
						debugerror('init() | skipping unsupported WebSocket binary sub-protocol');
					} else {
						new_protocols.push(protocols[i]);
					}
				}

				if (new_protocols.length > 0) {
					protocols = new_protocols;
				} else {
					throw new Error('only WebSocket binary sub-protocol was requested and is not supported');
				}
			}
		}

		return protocols;
	},

	open: function (uri, protocols) {
		var self = this;

		protocols = this.init(protocols);

		// this._websocket = new WebSocket(uri, protocols);
		// TODO: Add API or settings for passing the W3C WebSocket class.
		if (global.NativeWebSocket) {
			debug('open() | using NativeWebSocket');
			this._websocket = new global.NativeWebSocket(uri, protocols);
		} else {
			debug('open() | not using NativeWebSocket');
			this._websocket = new WebSocket(uri, protocols);
		}

		if (protocols.indexOf('binary') >= 0) {
			this._websocket.binaryType = 'arraybuffer';
		}

		this._websocket.onmessage = function (e) {
			self._recv_message(e);
		};

		this._websocket.onopen = function() {
			if (self._websocket.protocol) {
				debug('onopen: server choose "%s" sub-protocol', self._websocket.protocol);
				self._mode = self._websocket.protocol;
				self._eventHandlers.open();
			}
			else {
				debugerror('onopen: server choose no sub-protocol, using "base64"');
				self._mode = 'base64';
				self._eventHandlers.open();
			}
		};

		this._websocket.onclose = function (e) {
			debug('onclose: %o', e);
			self._eventHandlers.close(e);
		};

		this._websocket.onerror = function (e) {
			debugerror('onerror: %o', e);
			self._eventHandlers.error(e);
		};
	},

	close: function () {
		if (this._websocket) {
			if ((this._websocket.readyState === this._websocket.OPEN) ||
					(this._websocket.readyState === this._websocket.CONNECTING)) {
				debug('close()');
				this._websocket.close();
			}

			this._websocket.onmessage = function () { return; };
		}
	},

	// private methods

	_encode_message: function () {
		if (this._mode === 'binary') {
			// Put in a binary arraybuffer
			return (new Uint8Array(this._sQ)).buffer;
		} else {
			// base64 encode
			return Base64.encode(this._sQ);
		}
	},

	_decode_message: function (data) {
		if (this._mode === 'binary') {
			// push arraybuffer values onto the end
			var u8 = new Uint8Array(data);
			for (var i = 0; i < u8.length; i++) {
				this._rQ.push(u8[i]);
			}
		} else {
			// base64 decode and concat to end
			this._rQ = this._rQ.concat(Base64.decode(data, 0));
		}
	},

	_recv_message: function (e) {
		try {
			this._decode_message(e.data);
			if (this.rQlen() > 0) {
				this._eventHandlers.message();
				// Compact the receive queue
				if (this._rQ.length > this._rQmax) {
					this._rQ = this._rQ.slice(this._rQi);
					this._rQi = 0;
				}
			} else {
				debug('_recv_message() | ignoring empty message');
			}
		} catch (error) {
			debugerror('_recv_message() | error: %o', error);

			if (typeof error.name !== 'undefined') {
				this._eventHandlers.error(error.name + ': ' + error.message);
			} else {
				this._eventHandlers.error(error);
			}
		}
	}
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./base64":6,"bowser":1,"debug":2}],16:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],17:[function(require,module,exports){
var noVNC = require('novnc-node');
var Reactor = require('./reactor');


/**
 * Simplified version of the jQuery $.extend
 */
function extend(){
  for(var i=1; i<arguments.length; i++)
    for(var key in arguments[i])
      if(arguments[i].hasOwnProperty(key))
        arguments[0][key] = arguments[i][key];
  return arguments[0];
}


(function (window) {

  var CVIO = {};
  var CVIODisplay = null;

  // CVIO reactor events
  CVIO.EV_SET_AUTH_TOKEN  ='setAuthToken';
  CVIO.EV_FETCH_AUTH_TOKEN='fetchAuthToken';
  CVIO.EV_FETCH_AUTH_TOKEN_ERROR='fetchAuthTokenError';
  CVIO.EV_RA_ATTRS_LOAD   ='raAttrsLoad';
  CVIO.EV_INIT_ERROR      ='initError';
  CVIO.EV_RA_ATTRS_ERROR  ='raAttrsError';


  /**
   * Initializes CVIO
   *
   * This function must be call prior creating a new CVIODisplay
   *
   * @param {Object} settings - CVIO settings
   */
  CVIO.init = function(settings) {
    // CVIO Settings
    CVIO.settings = extend({
      authorizationToken: null,                  //CatVision.io auth token in plain text
      authorizationTokenURL: null,               // URL with a CatVision.io auth token
      onAuthTokenRequest: null,         // Custom CatVision.io auth token setter
      url: 'https://app.catvision.io'   // CatVision.io or any SeaCat panel URL
    }, settings);

    CVIO.authTokenRequested = false;
    CVIO.reactor = new Reactor();

    // if (CVIO.settings.authorizationToken == null && CVIO.settings.authorizationTokenURL != null)
    //   CVIO.fetchAuthToken();
    // else if (CVIO.settings.authorizationToken == null && CVIO.settings.authorizationTokenURL == null)
    //   throw 'SeaCat Panel Auth Token not specified.';
  }



  /**
   * Sets the auth token, unlocks authToken requests
   * and fires 'authTokenSet' event.
   *
   * @param {String} authToken - auth token
   */
  CVIO.setAuthToken = function(authToken) {
    CVIO.settings.authorizationToken = authToken;
    CVIO.reactor.dispatchEvent(CVIO.EV_SET_AUTH_TOKEN);

    // Delay is applied to flush late requests
    setTimeout(function() {
      CVIO.settings.authorizationTokenRequested = false;
    }, 200);
  }



  /**
   * Requests new token to be obtained and locks further requests until setAuthToken is called.
   *
   * User can define a CVIO.settings.onAuthTokenRequest callback function
   * where he is obliged to call setAuthToken manually.
   *
   * If user callback is not present, this method attempts
   * to fetch the token from the url set in CVIO.settings.authorizationTokenURL
   * 
   */
  CVIO.requestAuthToken = function()
  {
    // Only request once
    if (CVIO.authTokenRequested)
      return;
    CVIO.authTokenRequested = true;

    if (CVIO.settings.onAuthTokenRequest != null) {
      CVIO.settings.onAuthTokenRequest();
    }

    else if (CVIO.settings.authorizationTokenURL) {
      CVIO.fetchAuthToken(function onSuccess(token) {
        CVIO.setAuthToken(token);
      }, function onError() {
        CVIO.authTokenRequested = false;
        CVIO.reactor.dispatchEvent(CVIO.EV_FETCH_AUTH_TOKEN_ERROR);
      })
    }

    else {
      throw 'Auth token requested but couln\'t be fetched by any means.';
    }
  }



  /**
   * Opens and sends a XMLHttpRequest to the configured authTokenURL
   *
   * If CVIO.authTokenURL doesn't exist or the request didn't succeed
   */
  CVIO.fetchAuthToken = function(onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', CVIO.settings.authorizationTokenURL, true);

    if (onError != undefined)
      xhr.onerror = onError;

    xhr.onload = function() {
      if (xhr.status == 200)
        onSuccess(xhr.response)
      else onError();
    };
    xhr.send('load');
  }



  /**
   * Constructs the CVIO Screen
   *
   * @param {Object} settings - CVIODisplay settings
   */
  CVIODisplay = function(settings) {
    this.rfb = null;
    this.raAttrs = null;
    this.connecting = false;

    // CVIO Screen Settings
    this.settings = extend({
      target :              null, // Target canvas element
      clientHandle :        null, // Device identification
      clientHandleKey:      't',  // Device handle
      raAttrsTimeout:       5000, // Timeout for fetching RA attributes
      retryDelay:           2000, // Delay to retry connection if client is not connected to a gateway
      password:             '',   // Password for the VNC server
      connectOnInit:        true  // Whether or not attempt remote access connection after initialization
    }, settings);

    // RFB Settings
    this.RFBSettings = {
      'target':             this.settings.target,
      'encrypt':            window.location.protocol === "https:",
      'repeaterID':         '',
      'true_color':         true,
      'local_cursor':       true,
      'shared':             true,
      'view_only':          false,
      'onPasswordRequired': function() {
                              return this.settings.password;
                            }.bind(this),
      'onUpdateState':      function(rfb, state, oldstate) {
                              this.onRFBUpdateState(rfb, state, oldstate);
                            }.bind(this),
    }

    // Assert mandatory settings
    if (this.settings.target == null) 
      throw 'CVIO Screen target element does not exist.';
    if (this.settings.clientHandle == null) 
      throw 'Device ID is missing.';

    // Register callbacks
    this.reactor = new Reactor();

    // Register CVIO event listeners
    CVIO.reactor.addEventListener(CVIO.EV_SET_AUTH_TOKEN, function() {
      // Continue with connecting
      if (this.connecting)
        this.connect();
    }, this);

  };



  // Events
  CVIODisplay.EV_UPDATE_STATE  = 'raUpdateState';
  CVIODisplay.EV_CONNECT       = 'connect';
  CVIODisplay.EV_DISCONNECT    = 'disconnect';
  CVIODisplay.EV_CONNECT_ERROR = 'connectError';
  CVIODisplay.EV_ERROR         = 'error';



  /**
   * Enable registering event callbacks
   * @param {String} eventName - event name
   * @param {Function} callback - the callback function
   * @param {Object} callbackSelf - the this for the callback function
   */
  CVIODisplay.prototype.on = function (eventName, callback, callbackSelf) {
    this.reactor.addEventListener(eventName, callback, callbackSelf);
  }


  /**
   * Fetches RA attributes from the SeaCat Panel
   * Fires 'raAttrsLoad' event when attributes are loaded
   * Fires 'raAttrsError' event when attributes couldn't be loaded
   *
   */
  CVIODisplay.prototype.raFetchAttrs = function (onSuccess, onAccessDenied, onError)
  {
    var url = ''
    url += CVIO.settings.url+'/api/ra/endpoint';
    url += '?'+this.settings.clientHandleKey+'='+this.settings.clientHandle

    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.setRequestHeader('X-SC-AuthToken', CVIO.settings.authorizationToken);

    if (onError != undefined)
      xhr.onerror = onError;

    xhr.onload = function() {
      if (xhr.status == 200)
        onSuccess(JSON.parse(xhr.response));
      else if (xhr.status == 403)
        onAccessDenied();
      else
        onError();
    };
    xhr.send('load');
  }


  /**
   * Requests RA attributes
   *
   * If RA attributes are not present attempts to fetch them.
   * If RA attributes can't be downloaded due to missing or invalid auth token, requests auth token from CVIO
   *
   */
  CVIODisplay.prototype.requestRaAttrs = function(onTimeout)
  {
    // Request auth token if needed
    if (CVIO.settings.authorizationToken == null) {
      CVIO.requestAuthToken();
      return;
    }

    var self = this;
    this.requestedRaAttrs = true;
    this.raFetchAttrs(
      function success(raAttrs) {
        self.raAttrs = raAttrs;
        self.requestedRaAttrs = false;

        // Continue with connecting
        if (self.connecting)
          self.connect();
      },
      function accessDenied() {
        CVIO.requestAuthToken();
      },
      function error() {
        throw 'Can\'t fetch RA attributes.'
      });

    // fetch RA Attrs takes too long:
    setTimeout(function() {
      if (self.requestedRaAttrs)
        onTimeout();
      self.requestedRaAttrs = false;
    }, this.settings.raAttrsTimeout);
  }


  /**
   * Connects to the websocket proxy
   *
   */
  CVIODisplay.prototype.connect = function () {
    // This variable determines whether connect() should be reattempted
    // when fresh attributes are set. Other methods must call connect()
    // only when this.connecting is set to true!
    // TODO: can this be determined by validating 'this' to be a CVIODisplay object?
    this.connecting = true;

    // Request RA attributes if not present
    if (this.raAttrs == null) {
      this.requestRaAttrs(function onTimeout(){
        // Couldn't fetch RA attributes before timeout
        this.connecting = false;
        this.reactor.dispatchEvent(CVIODisplay.EV_CONNECT_ERROR, 'raAttrsTimeout')
      }.bind(this));
      return;
    }

    // Could get RA attributes but the client is not established
    else if (!this.raAttrs.established) {
      // Reset raAttrs so that they are re-requested on the next connect() call
      this.raAttrs = null;
      this.connecting = false;
      this.reactor.dispatchEvent(CVIODisplay.EV_CONNECT_ERROR, 'clientNotEstablished')
      return;
    }

    // Try to initialize RFB
    try {
      this.rfb = new noVNC.RFB(this.RFBSettings);
    } catch (e) {
      this.reactor.dispatchEvent(CVIODisplay.EV_CONNECT_ERROR, e);
      return;
    }

    var protocol = 'ws://';
    if (window.location.protocol == 'https:' || this.raAttrs.link.ssl_only === true)
      protocol = 'wss://';

    var url = '';
    url += protocol;
    url += this.raAttrs.link.ws_host + ':' + this.raAttrs.link.ws_port;
    url += '/'+this.raAttrs.link.client_id+'/'+this.raAttrs.link.gw_ip;
    url += '?cvio_nonce='+this.raAttrs.link.nonce;

    // Whether or not the connect was successful is further determined by RFB state changes
    // see CVIODisplay.prototype.onRFBUpdateState
    this.rfb.connect(url, '');
    this.connecting = false;
  }


  /**
   * Disconnects from RA
   */
  CVIODisplay.prototype.disconnect = function () {
    this.connecting = false;
    this.rfb.disconnect();
  }


  /**
   * Handles RFB onUpdateState
   */
  CVIODisplay.prototype.onRFBUpdateState = function(rfb, state, oldstate) {
    // Update state 
    this.reactor.dispatchEvent(CVIODisplay.EV_UPDATE_STATE, state, oldstate);

    // Spcific states
    // 
    if (state == 'normal' && oldstate == 'ServerInitialisation') {
      // Successfully connected
      this.reactor.dispatchEvent(CVIODisplay.EV_CONNECT);
    }
    else if (state == 'disconnected' && oldstate == 'disconnect') {
      // Successfully disconnected
      this.reactor.dispatchEvent(CVIODisplay.EV_DISCONNECT);
    }
    else if (state == 'disconnect' && oldstate == 'connecting') {
      // Dropped by websockify or gateway.
      // Some possible reasons:
      // - invalid nonce,
      // - SOCKS extension on gateway not available
      // - client not established (according to the gateway)
      this.reactor.dispatchEvent(CVIODisplay.EV_CONNECT_ERROR, 'clientUnavailable');
    }
    else if (state == 'failed' && oldstate == 'ProtocolVersion') {
      // Connection failure on in protocol version phase
      this.reactor.dispatchEvent(CVIODisplay.EV_CONNECT_ERROR, 'protocolVersion');
    }
    else if (state == 'failed' && oldstate == 'normal') {
      // Connection interrupt
      this.reactor.dispatchEvent(CVIODisplay.EV_ERROR, 'interrupt');
    }
  }



  window.CVIO = CVIO;
  window.CVIODisplay = CVIODisplay;

})(window, undefined);

},{"./reactor":18,"novnc-node":5}],18:[function(require,module,exports){
/* Copyright 2017 Miloslav Pavelka
Licensed under BSD-3-Clause
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


/**
 * Callback class
 * @param {Function} callback - the callback function
 * @param {Object} defaultSelf - the default this for the callback function
 */
var Callback = function(callback, callbackSelf) {
  this.callback = callback;
  this.self = callbackSelf;

  if (this.self == undefined)
    this.self = null;
}

/**
 * Calls the callback
 * This method's rguments are passed to the callback
 */
Callback.prototype.execute = function() {
  this.callback.apply(this.self, arguments);
}

/**
 * Event class
 * @param {String} name - event name
 */
var Event = function(name) {
  this.name = name;
  this.callbacks = []
}

/**
 * Removes all callbacks
 */
Event.prototype.reset = function() {
  this.callbacks = []
}

/**
 * Reactor class
 */
var Reactor = function() {
  this.events = {};
}

/**
 * Register a callback for an event
 * @param {String} eventName - event name
 * @param {Function} callback - the callback function
 * @param {Object} callbackSelf - the this for the callback function
 */
Reactor.prototype.addEventListener = function(eventName, callback, callbackSelf) {
  // Push event name if not exists yet
  if (this.events[eventName] == undefined)
    this.events[eventName] = new Event(eventName)

  // Register callback
  this.events[eventName].callbacks.push(new Callback(callback, callbackSelf));
}

/**
 * Asynchronously executes all callbacks of an event
 * @param {String} eventName - event name
 */
Reactor.prototype.dispatchEvent = function(eventName) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  
  if (this.events[eventName] == undefined) {
    //throw "No callbacks for event "+eventName;
    return;
  }

  for (x in this.events[eventName].callbacks) {
    setTimeout(function(){
      self.events[eventName].callbacks[x].execute.apply(self.events[eventName].callbacks[x], args);
    }, 0);
  }
}

/**
 * Resets callbacks array for an event
 * @param {String} eventName - event name
 */
Reactor.prototype.resetEvent = function(eventName) {
  if (this.events[eventName])
    this.events[eventName].reset();
}

module.exports = Reactor;

},{}]},{},[17])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tcGF2ZWxrYS9Xb3Jrc3BhY2UvVGVza2FMYWJzL0dpdEh1Yi9DYXRWaXNpb24tRGlzcGxheS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL21wYXZlbGthL1dvcmtzcGFjZS9UZXNrYUxhYnMvR2l0SHViL0NhdFZpc2lvbi1EaXNwbGF5L25vZGVfbW9kdWxlcy9ib3dzZXIvYm93c2VyLmpzIiwiL1VzZXJzL21wYXZlbGthL1dvcmtzcGFjZS9UZXNrYUxhYnMvR2l0SHViL0NhdFZpc2lvbi1EaXNwbGF5L25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsIi9Vc2Vycy9tcGF2ZWxrYS9Xb3Jrc3BhY2UvVGVza2FMYWJzL0dpdEh1Yi9DYXRWaXNpb24tRGlzcGxheS9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2RlYnVnLmpzIiwiL1VzZXJzL21wYXZlbGthL1dvcmtzcGFjZS9UZXNrYUxhYnMvR2l0SHViL0NhdFZpc2lvbi1EaXNwbGF5L25vZGVfbW9kdWxlcy9tcy9pbmRleC5qcyIsIi9Vc2Vycy9tcGF2ZWxrYS9Xb3Jrc3BhY2UvVGVza2FMYWJzL0dpdEh1Yi9DYXRWaXNpb24tRGlzcGxheS9ub2RlX21vZHVsZXMvbm92bmMtbm9kZS9pbmRleC5qcyIsIi9Vc2Vycy9tcGF2ZWxrYS9Xb3Jrc3BhY2UvVGVza2FMYWJzL0dpdEh1Yi9DYXRWaXNpb24tRGlzcGxheS9ub2RlX21vZHVsZXMvbm92bmMtbm9kZS9saWIvYmFzZTY0LmpzIiwiL1VzZXJzL21wYXZlbGthL1dvcmtzcGFjZS9UZXNrYUxhYnMvR2l0SHViL0NhdFZpc2lvbi1EaXNwbGF5L25vZGVfbW9kdWxlcy9ub3ZuYy1ub2RlL2xpYi9kZXMuanMiLCIvVXNlcnMvbXBhdmVsa2EvV29ya3NwYWNlL1Rlc2thTGFicy9HaXRIdWIvQ2F0VmlzaW9uLURpc3BsYXkvbm9kZV9tb2R1bGVzL25vdm5jLW5vZGUvbGliL2Rpc3BsYXkuanMiLCIvVXNlcnMvbXBhdmVsa2EvV29ya3NwYWNlL1Rlc2thTGFicy9HaXRIdWIvQ2F0VmlzaW9uLURpc3BsYXkvbm9kZV9tb2R1bGVzL25vdm5jLW5vZGUvbGliL2lucHV0LmpzIiwiL1VzZXJzL21wYXZlbGthL1dvcmtzcGFjZS9UZXNrYUxhYnMvR2l0SHViL0NhdFZpc2lvbi1EaXNwbGF5L25vZGVfbW9kdWxlcy9ub3ZuYy1ub2RlL2xpYi9rYmR1dGlsLmpzIiwiL1VzZXJzL21wYXZlbGthL1dvcmtzcGFjZS9UZXNrYUxhYnMvR2l0SHViL0NhdFZpc2lvbi1EaXNwbGF5L25vZGVfbW9kdWxlcy9ub3ZuYy1ub2RlL2xpYi9rZXlzLmpzIiwiL1VzZXJzL21wYXZlbGthL1dvcmtzcGFjZS9UZXNrYUxhYnMvR2l0SHViL0NhdFZpc2lvbi1EaXNwbGF5L25vZGVfbW9kdWxlcy9ub3ZuYy1ub2RlL2xpYi9yZmIuanMiLCIvVXNlcnMvbXBhdmVsa2EvV29ya3NwYWNlL1Rlc2thTGFicy9HaXRIdWIvQ2F0VmlzaW9uLURpc3BsYXkvbm9kZV9tb2R1bGVzL25vdm5jLW5vZGUvbGliL3RpbmYuanMiLCIvVXNlcnMvbXBhdmVsa2EvV29ya3NwYWNlL1Rlc2thTGFicy9HaXRIdWIvQ2F0VmlzaW9uLURpc3BsYXkvbm9kZV9tb2R1bGVzL25vdm5jLW5vZGUvbGliL3V0aWwuanMiLCIvVXNlcnMvbXBhdmVsa2EvV29ya3NwYWNlL1Rlc2thTGFicy9HaXRIdWIvQ2F0VmlzaW9uLURpc3BsYXkvbm9kZV9tb2R1bGVzL25vdm5jLW5vZGUvbGliL3dlYnNvY2suanMiLCIvVXNlcnMvbXBhdmVsa2EvV29ya3NwYWNlL1Rlc2thTGFicy9HaXRIdWIvQ2F0VmlzaW9uLURpc3BsYXkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIi9Vc2Vycy9tcGF2ZWxrYS9Xb3Jrc3BhY2UvVGVza2FMYWJzL0dpdEh1Yi9DYXRWaXNpb24tRGlzcGxheS9zcmMvZmFrZV8zNjQwZmZkNS5qcyIsIi9Vc2Vycy9tcGF2ZWxrYS9Xb3Jrc3BhY2UvVGVza2FMYWJzL0dpdEh1Yi9DYXRWaXNpb24tRGlzcGxheS9zcmMvcmVhY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaFNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3paQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMWxCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4K0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNWZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiFcbiAgKiBCb3dzZXIgLSBhIGJyb3dzZXIgZGV0ZWN0b3JcbiAgKiBodHRwczovL2dpdGh1Yi5jb20vZGVkL2Jvd3NlclxuICAqIE1JVCBMaWNlbnNlIHwgKGMpIER1c3RpbiBEaWF6IDIwMTRcbiAgKi9cblxuIWZ1bmN0aW9uIChuYW1lLCBkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSBtb2R1bGUuZXhwb3J0c1snYnJvd3NlciddID0gZGVmaW5pdGlvbigpXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSBkZWZpbmUoZGVmaW5pdGlvbilcbiAgZWxzZSB0aGlzW25hbWVdID0gZGVmaW5pdGlvbigpXG59KCdib3dzZXInLCBmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgICogU2VlIHVzZXJhZ2VudHMuanMgZm9yIGV4YW1wbGVzIG9mIG5hdmlnYXRvci51c2VyQWdlbnRcbiAgICAqL1xuXG4gIHZhciB0ID0gdHJ1ZVxuXG4gIGZ1bmN0aW9uIGRldGVjdCh1YSkge1xuXG4gICAgZnVuY3Rpb24gZ2V0Rmlyc3RNYXRjaChyZWdleCkge1xuICAgICAgdmFyIG1hdGNoID0gdWEubWF0Y2gocmVnZXgpO1xuICAgICAgcmV0dXJuIChtYXRjaCAmJiBtYXRjaC5sZW5ndGggPiAxICYmIG1hdGNoWzFdKSB8fCAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZWNvbmRNYXRjaChyZWdleCkge1xuICAgICAgdmFyIG1hdGNoID0gdWEubWF0Y2gocmVnZXgpO1xuICAgICAgcmV0dXJuIChtYXRjaCAmJiBtYXRjaC5sZW5ndGggPiAxICYmIG1hdGNoWzJdKSB8fCAnJztcbiAgICB9XG5cbiAgICB2YXIgaW9zZGV2aWNlID0gZ2V0Rmlyc3RNYXRjaCgvKGlwb2R8aXBob25lfGlwYWQpL2kpLnRvTG93ZXJDYXNlKClcbiAgICAgICwgbGlrZUFuZHJvaWQgPSAvbGlrZSBhbmRyb2lkL2kudGVzdCh1YSlcbiAgICAgICwgYW5kcm9pZCA9ICFsaWtlQW5kcm9pZCAmJiAvYW5kcm9pZC9pLnRlc3QodWEpXG4gICAgICAsIGVkZ2VWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvZWRnZVxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgICwgdmVyc2lvbklkZW50aWZpZXIgPSBnZXRGaXJzdE1hdGNoKC92ZXJzaW9uXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgLCB0YWJsZXQgPSAvdGFibGV0L2kudGVzdCh1YSlcbiAgICAgICwgbW9iaWxlID0gIXRhYmxldCAmJiAvW14tXW1vYmkvaS50ZXN0KHVhKVxuICAgICAgLCByZXN1bHRcblxuICAgIGlmICgvb3BlcmF8b3ByL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ09wZXJhJ1xuICAgICAgLCBvcGVyYTogdFxuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllciB8fCBnZXRGaXJzdE1hdGNoKC8oPzpvcGVyYXxvcHIpW1xcc1xcL10oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC93aW5kb3dzIHBob25lL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1dpbmRvd3MgUGhvbmUnXG4gICAgICAsIHdpbmRvd3NwaG9uZTogdFxuICAgICAgfVxuICAgICAgaWYgKGVkZ2VWZXJzaW9uKSB7XG4gICAgICAgIHJlc3VsdC5tc2VkZ2UgPSB0XG4gICAgICAgIHJlc3VsdC52ZXJzaW9uID0gZWRnZVZlcnNpb25cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXN1bHQubXNpZSA9IHRcbiAgICAgICAgcmVzdWx0LnZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9pZW1vYmlsZVxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL21zaWV8dHJpZGVudC9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdJbnRlcm5ldCBFeHBsb3JlcidcbiAgICAgICwgbXNpZTogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC8oPzptc2llIHxydjopKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvY2hyb21lLis/IGVkZ2UvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnTWljcm9zb2Z0IEVkZ2UnXG4gICAgICAsIG1zZWRnZTogdFxuICAgICAgLCB2ZXJzaW9uOiBlZGdlVmVyc2lvblxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvY2hyb21lfGNyaW9zfGNybW8vaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnQ2hyb21lJ1xuICAgICAgLCBjaHJvbWU6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86Y2hyb21lfGNyaW9zfGNybW8pXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpb3NkZXZpY2UpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZSA6IGlvc2RldmljZSA9PSAnaXBob25lJyA/ICdpUGhvbmUnIDogaW9zZGV2aWNlID09ICdpcGFkJyA/ICdpUGFkJyA6ICdpUG9kJ1xuICAgICAgfVxuICAgICAgLy8gV1RGOiB2ZXJzaW9uIGlzIG5vdCBwYXJ0IG9mIHVzZXIgYWdlbnQgaW4gd2ViIGFwcHNcbiAgICAgIGlmICh2ZXJzaW9uSWRlbnRpZmllcikge1xuICAgICAgICByZXN1bHQudmVyc2lvbiA9IHZlcnNpb25JZGVudGlmaWVyXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9zYWlsZmlzaC9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdTYWlsZmlzaCdcbiAgICAgICwgc2FpbGZpc2g6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvc2FpbGZpc2hcXHM/YnJvd3NlclxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL3NlYW1vbmtleVxcLy9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdTZWFNb25rZXknXG4gICAgICAsIHNlYW1vbmtleTogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC9zZWFtb25rZXlcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9maXJlZm94fGljZXdlYXNlbC9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdGaXJlZm94J1xuICAgICAgLCBmaXJlZm94OiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goLyg/OmZpcmVmb3h8aWNld2Vhc2VsKVsgXFwvXShcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICAgIGlmICgvXFwoKG1vYmlsZXx0YWJsZXQpO1teXFwpXSpydjpbXFxkXFwuXStcXCkvaS50ZXN0KHVhKSkge1xuICAgICAgICByZXN1bHQuZmlyZWZveG9zID0gdFxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvc2lsay9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSAge1xuICAgICAgICBuYW1lOiAnQW1hem9uIFNpbGsnXG4gICAgICAsIHNpbGs6IHRcbiAgICAgICwgdmVyc2lvbiA6IGdldEZpcnN0TWF0Y2goL3NpbGtcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGFuZHJvaWQpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0FuZHJvaWQnXG4gICAgICAsIHZlcnNpb246IHZlcnNpb25JZGVudGlmaWVyXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9waGFudG9tL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1BoYW50b21KUydcbiAgICAgICwgcGhhbnRvbTogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC9waGFudG9tanNcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9ibGFja2JlcnJ5fFxcYmJiXFxkKy9pLnRlc3QodWEpIHx8IC9yaW1cXHN0YWJsZXQvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnQmxhY2tCZXJyeSdcbiAgICAgICwgYmxhY2tiZXJyeTogdFxuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllciB8fCBnZXRGaXJzdE1hdGNoKC9ibGFja2JlcnJ5W1xcZF0rXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvKHdlYnxocHcpb3MvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnV2ViT1MnXG4gICAgICAsIHdlYm9zOiB0XG4gICAgICAsIHZlcnNpb246IHZlcnNpb25JZGVudGlmaWVyIHx8IGdldEZpcnN0TWF0Y2goL3coPzplYik/b3Nicm93c2VyXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfTtcbiAgICAgIC90b3VjaHBhZFxcLy9pLnRlc3QodWEpICYmIChyZXN1bHQudG91Y2hwYWQgPSB0KVxuICAgIH1cbiAgICBlbHNlIGlmICgvYmFkYS9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdCYWRhJ1xuICAgICAgLCBiYWRhOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goL2RvbGZpblxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKC90aXplbi9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdUaXplbidcbiAgICAgICwgdGl6ZW46IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86dGl6ZW5cXHM/KT9icm93c2VyXFwvKFxcZCsoXFwuXFxkKyk/KS9pKSB8fCB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSBpZiAoL3NhZmFyaS9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdTYWZhcmknXG4gICAgICAsIHNhZmFyaTogdFxuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogZ2V0Rmlyc3RNYXRjaCgvXiguKilcXC8oLiopIC8pLFxuICAgICAgICB2ZXJzaW9uOiBnZXRTZWNvbmRNYXRjaCgvXiguKilcXC8oLiopIC8pXG4gICAgIH07XG4gICB9XG5cbiAgICAvLyBzZXQgd2Via2l0IG9yIGdlY2tvIGZsYWcgZm9yIGJyb3dzZXJzIGJhc2VkIG9uIHRoZXNlIGVuZ2luZXNcbiAgICBpZiAoIXJlc3VsdC5tc2VkZ2UgJiYgLyhhcHBsZSk/d2Via2l0L2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdC5uYW1lID0gcmVzdWx0Lm5hbWUgfHwgXCJXZWJraXRcIlxuICAgICAgcmVzdWx0LndlYmtpdCA9IHRcbiAgICAgIGlmICghcmVzdWx0LnZlcnNpb24gJiYgdmVyc2lvbklkZW50aWZpZXIpIHtcbiAgICAgICAgcmVzdWx0LnZlcnNpb24gPSB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXJlc3VsdC5vcGVyYSAmJiAvZ2Vja29cXC8vaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0Lm5hbWUgPSByZXN1bHQubmFtZSB8fCBcIkdlY2tvXCJcbiAgICAgIHJlc3VsdC5nZWNrbyA9IHRcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gcmVzdWx0LnZlcnNpb24gfHwgZ2V0Rmlyc3RNYXRjaCgvZ2Vja29cXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgfVxuXG4gICAgLy8gc2V0IE9TIGZsYWdzIGZvciBwbGF0Zm9ybXMgdGhhdCBoYXZlIG11bHRpcGxlIGJyb3dzZXJzXG4gICAgaWYgKCFyZXN1bHQubXNlZGdlICYmIChhbmRyb2lkIHx8IHJlc3VsdC5zaWxrKSkge1xuICAgICAgcmVzdWx0LmFuZHJvaWQgPSB0XG4gICAgfSBlbHNlIGlmIChpb3NkZXZpY2UpIHtcbiAgICAgIHJlc3VsdFtpb3NkZXZpY2VdID0gdFxuICAgICAgcmVzdWx0LmlvcyA9IHRcbiAgICB9XG5cbiAgICAvLyBPUyB2ZXJzaW9uIGV4dHJhY3Rpb25cbiAgICB2YXIgb3NWZXJzaW9uID0gJyc7XG4gICAgaWYgKHJlc3VsdC53aW5kb3dzcGhvbmUpIHtcbiAgICAgIG9zVmVyc2lvbiA9IGdldEZpcnN0TWF0Y2goL3dpbmRvd3MgcGhvbmUgKD86b3MpP1xccz8oXFxkKyhcXC5cXGQrKSopL2kpO1xuICAgIH0gZWxzZSBpZiAoaW9zZGV2aWNlKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9vcyAoXFxkKyhbX1xcc11cXGQrKSopIGxpa2UgbWFjIG9zIHgvaSk7XG4gICAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb24ucmVwbGFjZSgvW19cXHNdL2csICcuJyk7XG4gICAgfSBlbHNlIGlmIChhbmRyb2lkKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9hbmRyb2lkWyBcXC8tXShcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQud2Vib3MpIHtcbiAgICAgIG9zVmVyc2lvbiA9IGdldEZpcnN0TWF0Y2goLyg/OndlYnxocHcpb3NcXC8oXFxkKyhcXC5cXGQrKSopL2kpO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0LmJsYWNrYmVycnkpIHtcbiAgICAgIG9zVmVyc2lvbiA9IGdldEZpcnN0TWF0Y2goL3JpbVxcc3RhYmxldFxcc29zXFxzKFxcZCsoXFwuXFxkKykqKS9pKTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC5iYWRhKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9iYWRhXFwvKFxcZCsoXFwuXFxkKykqKS9pKTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC50aXplbikge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvdGl6ZW5bXFwvXFxzXShcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfVxuICAgIGlmIChvc1ZlcnNpb24pIHtcbiAgICAgIHJlc3VsdC5vc3ZlcnNpb24gPSBvc1ZlcnNpb247XG4gICAgfVxuXG4gICAgLy8gZGV2aWNlIHR5cGUgZXh0cmFjdGlvblxuICAgIHZhciBvc01ham9yVmVyc2lvbiA9IG9zVmVyc2lvbi5zcGxpdCgnLicpWzBdO1xuICAgIGlmICh0YWJsZXQgfHwgaW9zZGV2aWNlID09ICdpcGFkJyB8fCAoYW5kcm9pZCAmJiAob3NNYWpvclZlcnNpb24gPT0gMyB8fCAob3NNYWpvclZlcnNpb24gPT0gNCAmJiAhbW9iaWxlKSkpIHx8IHJlc3VsdC5zaWxrKSB7XG4gICAgICByZXN1bHQudGFibGV0ID0gdFxuICAgIH0gZWxzZSBpZiAobW9iaWxlIHx8IGlvc2RldmljZSA9PSAnaXBob25lJyB8fCBpb3NkZXZpY2UgPT0gJ2lwb2QnIHx8IGFuZHJvaWQgfHwgcmVzdWx0LmJsYWNrYmVycnkgfHwgcmVzdWx0LndlYm9zIHx8IHJlc3VsdC5iYWRhKSB7XG4gICAgICByZXN1bHQubW9iaWxlID0gdFxuICAgIH1cblxuICAgIC8vIEdyYWRlZCBCcm93c2VyIFN1cHBvcnRcbiAgICAvLyBodHRwOi8vZGV2ZWxvcGVyLnlhaG9vLmNvbS95dWkvYXJ0aWNsZXMvZ2JzXG4gICAgaWYgKHJlc3VsdC5tc2VkZ2UgfHxcbiAgICAgICAgKHJlc3VsdC5tc2llICYmIHJlc3VsdC52ZXJzaW9uID49IDEwKSB8fFxuICAgICAgICAocmVzdWx0LmNocm9tZSAmJiByZXN1bHQudmVyc2lvbiA+PSAyMCkgfHxcbiAgICAgICAgKHJlc3VsdC5maXJlZm94ICYmIHJlc3VsdC52ZXJzaW9uID49IDIwLjApIHx8XG4gICAgICAgIChyZXN1bHQuc2FmYXJpICYmIHJlc3VsdC52ZXJzaW9uID49IDYpIHx8XG4gICAgICAgIChyZXN1bHQub3BlcmEgJiYgcmVzdWx0LnZlcnNpb24gPj0gMTAuMCkgfHxcbiAgICAgICAgKHJlc3VsdC5pb3MgJiYgcmVzdWx0Lm9zdmVyc2lvbiAmJiByZXN1bHQub3N2ZXJzaW9uLnNwbGl0KFwiLlwiKVswXSA+PSA2KSB8fFxuICAgICAgICAocmVzdWx0LmJsYWNrYmVycnkgJiYgcmVzdWx0LnZlcnNpb24gPj0gMTAuMSlcbiAgICAgICAgKSB7XG4gICAgICByZXN1bHQuYSA9IHQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKChyZXN1bHQubXNpZSAmJiByZXN1bHQudmVyc2lvbiA8IDEwKSB8fFxuICAgICAgICAocmVzdWx0LmNocm9tZSAmJiByZXN1bHQudmVyc2lvbiA8IDIwKSB8fFxuICAgICAgICAocmVzdWx0LmZpcmVmb3ggJiYgcmVzdWx0LnZlcnNpb24gPCAyMC4wKSB8fFxuICAgICAgICAocmVzdWx0LnNhZmFyaSAmJiByZXN1bHQudmVyc2lvbiA8IDYpIHx8XG4gICAgICAgIChyZXN1bHQub3BlcmEgJiYgcmVzdWx0LnZlcnNpb24gPCAxMC4wKSB8fFxuICAgICAgICAocmVzdWx0LmlvcyAmJiByZXN1bHQub3N2ZXJzaW9uICYmIHJlc3VsdC5vc3ZlcnNpb24uc3BsaXQoXCIuXCIpWzBdIDwgNilcbiAgICAgICAgKSB7XG4gICAgICByZXN1bHQuYyA9IHRcbiAgICB9IGVsc2UgcmVzdWx0LnggPSB0XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICB2YXIgYm93c2VyID0gZGV0ZWN0KHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnID8gbmF2aWdhdG9yLnVzZXJBZ2VudCA6ICcnKVxuXG4gIGJvd3Nlci50ZXN0ID0gZnVuY3Rpb24gKGJyb3dzZXJMaXN0KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBicm93c2VyTGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGJyb3dzZXJJdGVtID0gYnJvd3Nlckxpc3RbaV07XG4gICAgICBpZiAodHlwZW9mIGJyb3dzZXJJdGVtPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmIChicm93c2VySXRlbSBpbiBib3dzZXIpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKlxuICAgKiBTZXQgb3VyIGRldGVjdCBtZXRob2QgdG8gdGhlIG1haW4gYm93c2VyIG9iamVjdCBzbyB3ZSBjYW5cbiAgICogcmV1c2UgaXQgdG8gdGVzdCBvdGhlciB1c2VyIGFnZW50cy5cbiAgICogVGhpcyBpcyBuZWVkZWQgdG8gaW1wbGVtZW50IGZ1dHVyZSB0ZXN0cy5cbiAgICovXG4gIGJvd3Nlci5fZGV0ZWN0ID0gZGV0ZWN0O1xuXG4gIHJldHVybiBib3dzZXJcbn0pO1xuIiwiKGZ1bmN0aW9uIChwcm9jZXNzKXtcbi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2RlYnVnJyk7XG5leHBvcnRzLmxvZyA9IGxvZztcbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5zdG9yYWdlID0gJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZVxuICAgICAgICAgICAgICAgJiYgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZS5zdG9yYWdlXG4gICAgICAgICAgICAgICAgICA/IGNocm9tZS5zdG9yYWdlLmxvY2FsXG4gICAgICAgICAgICAgICAgICA6IGxvY2Fsc3RvcmFnZSgpO1xuXG4vKipcbiAqIENvbG9ycy5cbiAqL1xuXG5leHBvcnRzLmNvbG9ycyA9IFtcbiAgJ2xpZ2h0c2VhZ3JlZW4nLFxuICAnZm9yZXN0Z3JlZW4nLFxuICAnZ29sZGVucm9kJyxcbiAgJ2RvZGdlcmJsdWUnLFxuICAnZGFya29yY2hpZCcsXG4gICdjcmltc29uJ1xuXTtcblxuLyoqXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXG4gKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXG4gKlxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcbiAqL1xuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG4gIC8vIE5COiBJbiBhbiBFbGVjdHJvbiBwcmVsb2FkIHNjcmlwdCwgZG9jdW1lbnQgd2lsbCBiZSBkZWZpbmVkIGJ1dCBub3QgZnVsbHlcbiAgLy8gaW5pdGlhbGl6ZWQuIFNpbmNlIHdlIGtub3cgd2UncmUgaW4gQ2hyb21lLCB3ZSdsbCBqdXN0IGRldGVjdCB0aGlzIGNhc2VcbiAgLy8gZXhwbGljaXRseVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93ICYmIHR5cGVvZiB3aW5kb3cucHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gaXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcbiAgLy8gZG9jdW1lbnQgaXMgdW5kZWZpbmVkIGluIHJlYWN0LW5hdGl2ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9wdWxsLzE2MzJcbiAgcmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50ICYmICdXZWJraXRBcHBlYXJhbmNlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUpIHx8XG4gICAgLy8gaXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cgJiYgd2luZG93LmNvbnNvbGUgJiYgKGNvbnNvbGUuZmlyZWJ1ZyB8fCAoY29uc29sZS5leGNlcHRpb24gJiYgY29uc29sZS50YWJsZSkpKSB8fFxuICAgIC8vIGlzIGZpcmVmb3ggPj0gdjMxP1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2ZpcmVmb3hcXC8oXFxkKykvKSAmJiBwYXJzZUludChSZWdFeHAuJDEsIDEwKSA+PSAzMSkgfHxcbiAgICAvLyBkb3VibGUgY2hlY2sgd2Via2l0IGluIHVzZXJBZ2VudCBqdXN0IGluIGNhc2Ugd2UgYXJlIGluIGEgd29ya2VyXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvYXBwbGV3ZWJraXRcXC8oXFxkKykvKSk7XG59XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24odikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuICdbVW5leHBlY3RlZEpTT05QYXJzZUVycm9yXTogJyArIGVyci5tZXNzYWdlO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG4gIHZhciB1c2VDb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcblxuICBhcmdzWzBdID0gKHVzZUNvbG9ycyA/ICclYycgOiAnJylcbiAgICArIHRoaXMubmFtZXNwYWNlXG4gICAgKyAodXNlQ29sb3JzID8gJyAlYycgOiAnICcpXG4gICAgKyBhcmdzWzBdXG4gICAgKyAodXNlQ29sb3JzID8gJyVjICcgOiAnICcpXG4gICAgKyAnKycgKyBleHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7XG5cbiAgaWYgKCF1c2VDb2xvcnMpIHJldHVybjtcblxuICB2YXIgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG4gIGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpXG5cbiAgLy8gdGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcbiAgLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuICAvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxhc3RDID0gMDtcbiAgYXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgaWYgKCclJScgPT09IG1hdGNoKSByZXR1cm47XG4gICAgaW5kZXgrKztcbiAgICBpZiAoJyVjJyA9PT0gbWF0Y2gpIHtcbiAgICAgIC8vIHdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuICAgICAgLy8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcbiAgICAgIGxhc3RDID0gaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5sb2coKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmxvZ2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbG9nKCkge1xuICAvLyB0aGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOC85LCB3aGVyZVxuICAvLyB0aGUgYGNvbnNvbGUubG9nYCBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgJ2FwcGx5J1xuICByZXR1cm4gJ29iamVjdCcgPT09IHR5cGVvZiBjb25zb2xlXG4gICAgJiYgY29uc29sZS5sb2dcbiAgICAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSwgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG4gIHRyeSB7XG4gICAgaWYgKG51bGwgPT0gbmFtZXNwYWNlcykge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZyA9IG5hbWVzcGFjZXM7XG4gICAgfVxuICB9IGNhdGNoKGUpIHt9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9hZCgpIHtcbiAgdmFyIHI7XG4gIHRyeSB7XG4gICAgciA9IGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZztcbiAgfSBjYXRjaChlKSB7fVxuXG4gIC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcbiAgaWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG4gICAgciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuICB9XG5cbiAgcmV0dXJuIHI7XG59XG5cbi8qKlxuICogRW5hYmxlIG5hbWVzcGFjZXMgbGlzdGVkIGluIGBsb2NhbFN0b3JhZ2UuZGVidWdgIGluaXRpYWxseS5cbiAqL1xuXG5leHBvcnRzLmVuYWJsZShsb2FkKCkpO1xuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgfSBjYXRjaCAoZSkge31cbn1cblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJwQkd2QXBcIikpIiwiXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvbW1vbiBsb2dpYyBmb3IgYm90aCB0aGUgTm9kZS5qcyBhbmQgd2ViIGJyb3dzZXJcbiAqIGltcGxlbWVudGF0aW9ucyBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZURlYnVnLmRlYnVnID0gY3JlYXRlRGVidWdbJ2RlZmF1bHQnXSA9IGNyZWF0ZURlYnVnO1xuZXhwb3J0cy5jb2VyY2UgPSBjb2VyY2U7XG5leHBvcnRzLmRpc2FibGUgPSBkaXNhYmxlO1xuZXhwb3J0cy5lbmFibGUgPSBlbmFibGU7XG5leHBvcnRzLmVuYWJsZWQgPSBlbmFibGVkO1xuZXhwb3J0cy5odW1hbml6ZSA9IHJlcXVpcmUoJ21zJyk7XG5cbi8qKlxuICogVGhlIGN1cnJlbnRseSBhY3RpdmUgZGVidWcgbW9kZSBuYW1lcywgYW5kIG5hbWVzIHRvIHNraXAuXG4gKi9cblxuZXhwb3J0cy5uYW1lcyA9IFtdO1xuZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4vKipcbiAqIE1hcCBvZiBzcGVjaWFsIFwiJW5cIiBoYW5kbGluZyBmdW5jdGlvbnMsIGZvciB0aGUgZGVidWcgXCJmb3JtYXRcIiBhcmd1bWVudC5cbiAqXG4gKiBWYWxpZCBrZXkgbmFtZXMgYXJlIGEgc2luZ2xlLCBsb3dlciBvciB1cHBlci1jYXNlIGxldHRlciwgaS5lLiBcIm5cIiBhbmQgXCJOXCIuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzID0ge307XG5cbi8qKlxuICogUHJldmlvdXMgbG9nIHRpbWVzdGFtcC5cbiAqL1xuXG52YXIgcHJldlRpbWU7XG5cbi8qKlxuICogU2VsZWN0IGEgY29sb3IuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzZWxlY3RDb2xvcihuYW1lc3BhY2UpIHtcbiAgdmFyIGhhc2ggPSAwLCBpO1xuXG4gIGZvciAoaSBpbiBuYW1lc3BhY2UpIHtcbiAgICBoYXNoICA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgbmFtZXNwYWNlLmNoYXJDb2RlQXQoaSk7XG4gICAgaGFzaCB8PSAwOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcbiAgfVxuXG4gIHJldHVybiBleHBvcnRzLmNvbG9yc1tNYXRoLmFicyhoYXNoKSAlIGV4cG9ydHMuY29sb3JzLmxlbmd0aF07XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZGVidWdnZXIgd2l0aCB0aGUgZ2l2ZW4gYG5hbWVzcGFjZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZURlYnVnKG5hbWVzcGFjZSkge1xuXG4gIGZ1bmN0aW9uIGRlYnVnKCkge1xuICAgIC8vIGRpc2FibGVkP1xuICAgIGlmICghZGVidWcuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgdmFyIHNlbGYgPSBkZWJ1ZztcblxuICAgIC8vIHNldCBgZGlmZmAgdGltZXN0YW1wXG4gICAgdmFyIGN1cnIgPSArbmV3IERhdGUoKTtcbiAgICB2YXIgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuICAgIHNlbGYuZGlmZiA9IG1zO1xuICAgIHNlbGYucHJldiA9IHByZXZUaW1lO1xuICAgIHNlbGYuY3VyciA9IGN1cnI7XG4gICAgcHJldlRpbWUgPSBjdXJyO1xuXG4gICAgLy8gdHVybiB0aGUgYGFyZ3VtZW50c2AgaW50byBhIHByb3BlciBBcnJheVxuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICBhcmdzWzBdID0gZXhwb3J0cy5jb2VyY2UoYXJnc1swXSk7XG5cbiAgICBpZiAoJ3N0cmluZycgIT09IHR5cGVvZiBhcmdzWzBdKSB7XG4gICAgICAvLyBhbnl0aGluZyBlbHNlIGxldCdzIGluc3BlY3Qgd2l0aCAlT1xuICAgICAgYXJncy51bnNoaWZ0KCclTycpO1xuICAgIH1cblxuICAgIC8vIGFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBhcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXpBLVolXSkvZywgZnVuY3Rpb24obWF0Y2gsIGZvcm1hdCkge1xuICAgICAgLy8gaWYgd2UgZW5jb3VudGVyIGFuIGVzY2FwZWQgJSB0aGVuIGRvbid0IGluY3JlYXNlIHRoZSBhcnJheSBpbmRleFxuICAgICAgaWYgKG1hdGNoID09PSAnJSUnKSByZXR1cm4gbWF0Y2g7XG4gICAgICBpbmRleCsrO1xuICAgICAgdmFyIGZvcm1hdHRlciA9IGV4cG9ydHMuZm9ybWF0dGVyc1tmb3JtYXRdO1xuICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBmb3JtYXR0ZXIpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFyZ3NbaW5kZXhdO1xuICAgICAgICBtYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsIHZhbCk7XG5cbiAgICAgICAgLy8gbm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuICAgICAgICBhcmdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGluZGV4LS07XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG5cbiAgICAvLyBhcHBseSBlbnYtc3BlY2lmaWMgZm9ybWF0dGluZyAoY29sb3JzLCBldGMuKVxuICAgIGV4cG9ydHMuZm9ybWF0QXJncy5jYWxsKHNlbGYsIGFyZ3MpO1xuXG4gICAgdmFyIGxvZ0ZuID0gZGVidWcubG9nIHx8IGV4cG9ydHMubG9nIHx8IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4gICAgbG9nRm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gIH1cblxuICBkZWJ1Zy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gIGRlYnVnLmVuYWJsZWQgPSBleHBvcnRzLmVuYWJsZWQobmFtZXNwYWNlKTtcbiAgZGVidWcudXNlQ29sb3JzID0gZXhwb3J0cy51c2VDb2xvcnMoKTtcbiAgZGVidWcuY29sb3IgPSBzZWxlY3RDb2xvcihuYW1lc3BhY2UpO1xuXG4gIC8vIGVudi1zcGVjaWZpYyBpbml0aWFsaXphdGlvbiBsb2dpYyBmb3IgZGVidWcgaW5zdGFuY2VzXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZXhwb3J0cy5pbml0KSB7XG4gICAgZXhwb3J0cy5pbml0KGRlYnVnKTtcbiAgfVxuXG4gIHJldHVybiBkZWJ1Zztcbn1cblxuLyoqXG4gKiBFbmFibGVzIGEgZGVidWcgbW9kZSBieSBuYW1lc3BhY2VzLiBUaGlzIGNhbiBpbmNsdWRlIG1vZGVzXG4gKiBzZXBhcmF0ZWQgYnkgYSBjb2xvbiBhbmQgd2lsZGNhcmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKSB7XG4gIGV4cG9ydHMuc2F2ZShuYW1lc3BhY2VzKTtcblxuICBleHBvcnRzLm5hbWVzID0gW107XG4gIGV4cG9ydHMuc2tpcHMgPSBbXTtcblxuICB2YXIgc3BsaXQgPSAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnID8gbmFtZXNwYWNlcyA6ICcnKS5zcGxpdCgvW1xccyxdKy8pO1xuICB2YXIgbGVuID0gc3BsaXQubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoIXNwbGl0W2ldKSBjb250aW51ZTsgLy8gaWdub3JlIGVtcHR5IHN0cmluZ3NcbiAgICBuYW1lc3BhY2VzID0gc3BsaXRbaV0ucmVwbGFjZSgvXFwqL2csICcuKj8nKTtcbiAgICBpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG4gICAgICBleHBvcnRzLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnN1YnN0cigxKSArICckJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLm5hbWVzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzICsgJyQnKSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkaXNhYmxlKCkge1xuICBleHBvcnRzLmVuYWJsZSgnJyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcbiAgdmFyIGksIGxlbjtcbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5uYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLm5hbWVzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ29lcmNlIGB2YWxgLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBjb2VyY2UodmFsKSB7XG4gIGlmICh2YWwgaW5zdGFuY2VvZiBFcnJvcikgcmV0dXJuIHZhbC5zdGFjayB8fCB2YWwubWVzc2FnZTtcbiAgcmV0dXJuIHZhbDtcbn1cbiIsIi8qKlxuICogSGVscGVycy5cbiAqL1xuXG52YXIgcyA9IDEwMDBcbnZhciBtID0gcyAqIDYwXG52YXIgaCA9IG0gKiA2MFxudmFyIGQgPSBoICogMjRcbnZhciB5ID0gZCAqIDM2NS4yNVxuXG4vKipcbiAqIFBhcnNlIG9yIGZvcm1hdCB0aGUgZ2l2ZW4gYHZhbGAuXG4gKlxuICogT3B0aW9uczpcbiAqXG4gKiAgLSBgbG9uZ2AgdmVyYm9zZSBmb3JtYXR0aW5nIFtmYWxzZV1cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHRocm93cyB7RXJyb3J9IHRocm93IGFuIGVycm9yIGlmIHZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgbnVtYmVyXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWwsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsXG4gIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBwYXJzZSh2YWwpXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgaXNOYU4odmFsKSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb25nID9cblx0XHRcdGZtdExvbmcodmFsKSA6XG5cdFx0XHRmbXRTaG9ydCh2YWwpXG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCd2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIHZhbGlkIG51bWJlci4gdmFsPScgKyBKU09OLnN0cmluZ2lmeSh2YWwpKVxufVxuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgc3RyID0gU3RyaW5nKHN0cilcbiAgaWYgKHN0ci5sZW5ndGggPiAxMDAwMCkge1xuICAgIHJldHVyblxuICB9XG4gIHZhciBtYXRjaCA9IC9eKCg/OlxcZCspP1xcLj9cXGQrKSAqKG1pbGxpc2Vjb25kcz98bXNlY3M/fG1zfHNlY29uZHM/fHNlY3M/fHN8bWludXRlcz98bWlucz98bXxob3Vycz98aHJzP3xofGRheXM/fGR8eWVhcnM/fHlycz98eSk/JC9pLmV4ZWMoc3RyKVxuICBpZiAoIW1hdGNoKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIG4gPSBwYXJzZUZsb2F0KG1hdGNoWzFdKVxuICB2YXIgdHlwZSA9IChtYXRjaFsyXSB8fCAnbXMnKS50b0xvd2VyQ2FzZSgpXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3llYXJzJzpcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5cnMnOlxuICAgIGNhc2UgJ3lyJzpcbiAgICBjYXNlICd5JzpcbiAgICAgIHJldHVybiBuICogeVxuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZCc6XG4gICAgICByZXR1cm4gbiAqIGRcbiAgICBjYXNlICdob3Vycyc6XG4gICAgY2FzZSAnaG91cic6XG4gICAgY2FzZSAnaHJzJzpcbiAgICBjYXNlICdocic6XG4gICAgY2FzZSAnaCc6XG4gICAgICByZXR1cm4gbiAqIGhcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnMnOlxuICAgIGNhc2UgJ21pbic6XG4gICAgY2FzZSAnbSc6XG4gICAgICByZXR1cm4gbiAqIG1cbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICBjYXNlICdzZWNvbmQnOlxuICAgIGNhc2UgJ3NlY3MnOlxuICAgIGNhc2UgJ3NlYyc6XG4gICAgY2FzZSAncyc6XG4gICAgICByZXR1cm4gbiAqIHNcbiAgICBjYXNlICdtaWxsaXNlY29uZHMnOlxuICAgIGNhc2UgJ21pbGxpc2Vjb25kJzpcbiAgICBjYXNlICdtc2Vjcyc6XG4gICAgY2FzZSAnbXNlYyc6XG4gICAgY2FzZSAnbXMnOlxuICAgICAgcmV0dXJuIG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG59XG5cbi8qKlxuICogU2hvcnQgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10U2hvcnQobXMpIHtcbiAgaWYgKG1zID49IGQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGQpICsgJ2QnXG4gIH1cbiAgaWYgKG1zID49IGgpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGgpICsgJ2gnXG4gIH1cbiAgaWYgKG1zID49IG0pIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIG0pICsgJ20nXG4gIH1cbiAgaWYgKG1zID49IHMpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIHMpICsgJ3MnXG4gIH1cbiAgcmV0dXJuIG1zICsgJ21zJ1xufVxuXG4vKipcbiAqIExvbmcgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10TG9uZyhtcykge1xuICByZXR1cm4gcGx1cmFsKG1zLCBkLCAnZGF5JykgfHxcbiAgICBwbHVyYWwobXMsIGgsICdob3VyJykgfHxcbiAgICBwbHVyYWwobXMsIG0sICdtaW51dGUnKSB8fFxuICAgIHBsdXJhbChtcywgcywgJ3NlY29uZCcpIHx8XG4gICAgbXMgKyAnIG1zJ1xufVxuXG4vKipcbiAqIFBsdXJhbGl6YXRpb24gaGVscGVyLlxuICovXG5cbmZ1bmN0aW9uIHBsdXJhbChtcywgbiwgbmFtZSkge1xuICBpZiAobXMgPCBuKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKG1zIDwgbiAqIDEuNSkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKG1zIC8gbikgKyAnICcgKyBuYW1lXG4gIH1cbiAgcmV0dXJuIE1hdGguY2VpbChtcyAvIG4pICsgJyAnICsgbmFtZSArICdzJ1xufVxuIiwiLyoqXG4gKiBEZXBlbmRlbmNpZXMuXG4gKi9cbnZhciBVdGlsID0gcmVxdWlyZSgnLi9saWIvdXRpbCcpO1xudmFyIEtleXMgPSByZXF1aXJlKCcuL2xpYi9rZXlzJyk7XG52YXIgS2JkVXRpbCA9IHJlcXVpcmUoJy4vbGliL2tiZHV0aWwnKTtcbnZhciBJbnB1dCA9IHJlcXVpcmUoJy4vbGliL2lucHV0Jyk7XG52YXIgV2Vic29jayA9IHJlcXVpcmUoJy4vbGliL3dlYnNvY2snKTtcbnZhciBCYXNlNjQgPSByZXF1aXJlKCcuL2xpYi9iYXNlNjQnKTtcbnZhciBERVMgPSByZXF1aXJlKCcuL2xpYi9kZXMnKTtcbnZhciBUSU5GID0gcmVxdWlyZSgnLi9saWIvdGluZicpO1xudmFyIERpc3BsYXkgPSByZXF1aXJlKCcuL2xpYi9kaXNwbGF5Jyk7XG52YXIgUkZCID0gcmVxdWlyZSgnLi9saWIvcmZiJyk7XG5cblxuXG52YXIgbm9WTkMgPSB7XG5cdFV0aWw6IFV0aWwsXG5cdEtleXM6IEtleXMsXG5cdEtiZFV0aWw6IEtiZFV0aWwsXG5cdElucHV0OiBJbnB1dCxcblx0V2Vic29jazogV2Vic29jayxcblx0QmFzZTY0OiBCYXNlNjQsXG5cdERFUzogREVTLFxuXHRUSU5GOiBUSU5GLFxuXHREaXNwbGF5OiBEaXNwbGF5LFxuXHRSRkI6IFJGQlxufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IG5vVk5DO1xuIiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cblxuLyoqXG4gKiBEZXBlbmRlbmNpZXMuXG4gKi9cbnZhciBkZWJ1Z2Vycm9yID0gcmVxdWlyZSgnZGVidWcnKSgnbm9WTkM6RVJST1I6QmFzZTY0Jyk7XG5kZWJ1Z2Vycm9yLmxvZyA9IGNvbnNvbGUud2Fybi5iaW5kKGNvbnNvbGUpO1xuXG5cbi8qKlxuICogTG9jYWwgdmFyaWFibGVzLlxuICovXG52YXIgdG9CYXNlNjRUYWJsZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPScuc3BsaXQoJycpO1xudmFyIGJhc2U2NFBhZCA9ICc9JztcbnZhciB0b0JpbmFyeVRhYmxlID0gW1xuXHQtMSwtMSwtMSwtMSwgLTEsLTEsLTEsLTEsIC0xLC0xLC0xLC0xLCAtMSwtMSwtMSwtMSxcblx0LTEsLTEsLTEsLTEsIC0xLC0xLC0xLC0xLCAtMSwtMSwtMSwtMSwgLTEsLTEsLTEsLTEsXG5cdC0xLC0xLC0xLC0xLCAtMSwtMSwtMSwtMSwgLTEsLTEsLTEsNjIsIC0xLC0xLC0xLDYzLFxuXHQ1Miw1Myw1NCw1NSwgNTYsNTcsNTgsNTksIDYwLDYxLC0xLC0xLCAtMSwgMCwtMSwtMSxcblx0LTEsIDAsIDEsIDIsICAzLCA0LCA1LCA2LCAgNywgOCwgOSwxMCwgMTEsMTIsMTMsMTQsXG5cdDE1LDE2LDE3LDE4LCAxOSwyMCwyMSwyMiwgMjMsMjQsMjUsLTEsIC0xLC0xLC0xLC0xLFxuXHQtMSwyNiwyNywyOCwgMjksMzAsMzEsMzIsIDMzLDM0LDM1LDM2LCAzNywzOCwzOSw0MCxcblx0NDEsNDIsNDMsNDQsIDQ1LDQ2LDQ3LDQ4LCA0OSw1MCw1MSwtMSwgLTEsLTEsLTEsLTFcbl07XG5cblxuLyoqXG4gKiBFeHBvc2UgdGhlIEJhc2U2NCBPYmplY3QuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRlbmNvZGU6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0dmFyIHJlc3VsdCA9ICcnO1xuXHRcdHZhciBsZW5ndGggPSBkYXRhLmxlbmd0aDtcblx0XHR2YXIgbGVuZ3RocGFkID0gKGxlbmd0aCAlIDMpO1xuXG5cdFx0Ly8gQ29udmVydCBldmVyeSB0aHJlZSBieXRlcyB0byA0IGFzY2lpIGNoYXJhY3RlcnMuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAobGVuZ3RoIC0gMik7IGkgKz0gMykge1xuXHRcdFx0cmVzdWx0ICs9IHRvQmFzZTY0VGFibGVbZGF0YVtpXSA+PiAyXTtcblx0XHRcdHJlc3VsdCArPSB0b0Jhc2U2NFRhYmxlWygoZGF0YVtpXSAmIDB4MDMpIDw8IDQpICsgKGRhdGFbaSArIDFdID4+IDQpXTtcblx0XHRcdHJlc3VsdCArPSB0b0Jhc2U2NFRhYmxlWygoZGF0YVtpICsgMV0gJiAweDBmKSA8PCAyKSArIChkYXRhW2kgKyAyXSA+PiA2KV07XG5cdFx0XHRyZXN1bHQgKz0gdG9CYXNlNjRUYWJsZVtkYXRhW2kgKyAyXSAmIDB4M2ZdO1xuXHRcdH1cblxuXHRcdC8vIENvbnZlcnQgdGhlIHJlbWFpbmluZyAxIG9yIDIgYnl0ZXMsIHBhZCBvdXQgdG8gNCBjaGFyYWN0ZXJzLlxuXHRcdHZhciBqID0gMDtcblx0XHRpZiAobGVuZ3RocGFkID09PSAyKSB7XG5cdFx0XHRqID0gbGVuZ3RoIC0gbGVuZ3RocGFkO1xuXHRcdFx0cmVzdWx0ICs9IHRvQmFzZTY0VGFibGVbZGF0YVtqXSA+PiAyXTtcblx0XHRcdHJlc3VsdCArPSB0b0Jhc2U2NFRhYmxlWygoZGF0YVtqXSAmIDB4MDMpIDw8IDQpICsgKGRhdGFbaiArIDFdID4+IDQpXTtcblx0XHRcdHJlc3VsdCArPSB0b0Jhc2U2NFRhYmxlWyhkYXRhW2ogKyAxXSAmIDB4MGYpIDw8IDJdO1xuXHRcdFx0cmVzdWx0ICs9IHRvQmFzZTY0VGFibGVbNjRdO1xuXHRcdH0gZWxzZSBpZiAobGVuZ3RocGFkID09PSAxKSB7XG5cdFx0XHRqID0gbGVuZ3RoIC0gbGVuZ3RocGFkO1xuXHRcdFx0cmVzdWx0ICs9IHRvQmFzZTY0VGFibGVbZGF0YVtqXSA+PiAyXTtcblx0XHRcdHJlc3VsdCArPSB0b0Jhc2U2NFRhYmxlWyhkYXRhW2pdICYgMHgwMykgPDwgNF07XG5cdFx0XHRyZXN1bHQgKz0gdG9CYXNlNjRUYWJsZVs2NF07XG5cdFx0XHRyZXN1bHQgKz0gdG9CYXNlNjRUYWJsZVs2NF07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHRkZWNvZGU6IGZ1bmN0aW9uIChkYXRhLCBvZmZzZXQpIHtcblx0XHRvZmZzZXQgPSB0eXBlb2Yob2Zmc2V0KSAhPT0gJ3VuZGVmaW5lZCcgPyBvZmZzZXQgOiAwO1xuXHRcdHZhciByZXN1bHQsIHJlc3VsdF9sZW5ndGg7XG5cdFx0dmFyIGxlZnRiaXRzID0gMDsgLy8gbnVtYmVyIG9mIGJpdHMgZGVjb2RlZCwgYnV0IHlldCB0byBiZSBhcHBlbmRlZFxuXHRcdHZhciBsZWZ0ZGF0YSA9IDA7IC8vIGJpdHMgZGVjb2RlZCwgYnV0IHlldCB0byBiZSBhcHBlbmRlZFxuXHRcdHZhciBkYXRhX2xlbmd0aCA9IGRhdGEuaW5kZXhPZignPScpIC0gb2Zmc2V0O1xuXG5cdFx0aWYgKGRhdGFfbGVuZ3RoIDwgMCkgeyBkYXRhX2xlbmd0aCA9IGRhdGEubGVuZ3RoIC0gb2Zmc2V0OyB9XG5cblx0XHQvKiBFdmVyeSBmb3VyIGNoYXJhY3RlcnMgaXMgMyByZXN1bHRpbmcgbnVtYmVycyAqL1xuXHRcdHJlc3VsdF9sZW5ndGggPSAoZGF0YV9sZW5ndGggPj4gMikgKiAzICsgTWF0aC5mbG9vcigoZGF0YV9sZW5ndGggJSA0KSAvIDEuNSk7XG5cdFx0cmVzdWx0ID0gbmV3IEFycmF5KHJlc3VsdF9sZW5ndGgpO1xuXG5cdFx0Ly8gQ29udmVydCBvbmUgYnkgb25lLlxuXHRcdGZvciAodmFyIGlkeCA9IDAsIGkgPSBvZmZzZXQ7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYyA9IHRvQmluYXJ5VGFibGVbZGF0YS5jaGFyQ29kZUF0KGkpICYgMHg3Zl07XG5cdFx0XHR2YXIgcGFkZGluZyA9IChkYXRhLmNoYXJBdChpKSA9PT0gYmFzZTY0UGFkKTtcblx0XHRcdC8vIFNraXAgaWxsZWdhbCBjaGFyYWN0ZXJzIGFuZCB3aGl0ZXNwYWNlXG5cdFx0XHRpZiAoYyA9PT0gLTEpIHtcblx0XHRcdFx0ZGVidWdlcnJvcignZGVjb2RlKCkgfCBpbGxlZ2FsIGNoYXJhY3RlciBjb2RlICcgKyBkYXRhLmNoYXJDb2RlQXQoaSkgKyAnIGF0IHBvc2l0aW9uICcgKyBpKTtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbGxlY3QgZGF0YSBpbnRvIGxlZnRkYXRhLCB1cGRhdGUgYml0Y291bnRcblx0XHRcdGxlZnRkYXRhID0gKGxlZnRkYXRhIDw8IDYpIHwgYztcblx0XHRcdGxlZnRiaXRzICs9IDY7XG5cblx0XHRcdC8vIElmIHdlIGhhdmUgOCBvciBtb3JlIGJpdHMsIGFwcGVuZCA4IGJpdHMgdG8gdGhlIHJlc3VsdFxuXHRcdFx0aWYgKGxlZnRiaXRzID49IDgpIHtcblx0XHRcdFx0bGVmdGJpdHMgLT0gODtcblx0XHRcdFx0Ly8gQXBwZW5kIGlmIG5vdCBwYWRkaW5nLlxuXHRcdFx0XHRpZiAoIXBhZGRpbmcpIHtcblx0XHRcdFx0XHRyZXN1bHRbaWR4KytdID0gKGxlZnRkYXRhID4+IGxlZnRiaXRzKSAmIDB4ZmY7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGVmdGRhdGEgJj0gKDEgPDwgbGVmdGJpdHMpIC0gMTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBJZiB0aGVyZSBhcmUgYW55IGJpdHMgbGVmdCwgdGhlIGJhc2U2NCBzdHJpbmcgd2FzIGNvcnJ1cHRlZFxuXHRcdGlmIChsZWZ0Yml0cykge1xuXHRcdFx0ZGVidWdlcnJvcignZGVjb2RlKCkgfCBjb3JydXB0ZWQgQmFzZTY0IHN0cmluZycpO1xuXHRcdFx0dmFyIGVyciA9IG5ldyBFcnJvcignQ29ycnVwdGVkIEJhc2U2NCBzdHJpbmcnKTtcblx0XHRcdGVyci5uYW1lID0gJ0Jhc2U2NC1FcnJvcic7XG5cdFx0XHR0aHJvdyBlcnI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxufTtcbiIsIi8qXG4gKiBQb3J0ZWQgZnJvbSBGbGFzaGxpZ2h0IFZOQyBBY3Rpb25TY3JpcHQgaW1wbGVtZW50YXRpb246XG4gKiAgICAgaHR0cDovL3d3dy53aXpoZWxwLmNvbS9mbGFzaGxpZ2h0LXZuYy9cbiAqXG4gKiBGdWxsIGF0dHJpYnV0aW9uIGZvbGxvd3M6XG4gKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICpcbiAqIFRoaXMgREVTIGNsYXNzIGhhcyBiZWVuIGV4dHJhY3RlZCBmcm9tIHBhY2thZ2UgQWNtZS5DcnlwdG8gZm9yIHVzZSBpbiBWTkMuXG4gKiBUaGUgdW5uZWNlc3Nhcnkgb2RkIHBhcml0eSBjb2RlIGhhcyBiZWVuIHJlbW92ZWQuXG4gKlxuICogVGhlc2UgY2hhbmdlcyBhcmU6XG4gKiAgQ29weXJpZ2h0IChDKSAxOTk5IEFUJlQgTGFib3JhdG9yaWVzIENhbWJyaWRnZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS5cbiAqXG5cbiAqIERlc0NpcGhlciAtIHRoZSBERVMgZW5jcnlwdGlvbiBtZXRob2RcbiAqXG4gKiBUaGUgbWVhdCBvZiB0aGlzIGNvZGUgaXMgYnkgRGF2ZSBaaW1tZXJtYW4gPGR6aW1tQHdpZGdldC5jb20+LCBhbmQgaXM6XG4gKlxuICogQ29weXJpZ2h0IChjKSAxOTk2IFdpZGdldCBXb3Jrc2hvcCwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIGFuZCBpdHMgZG9jdW1lbnRhdGlvbiBmb3IgTk9OLUNPTU1FUkNJQUwgb3IgQ09NTUVSQ0lBTCBwdXJwb3NlcyBhbmRcbiAqIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLCBwcm92aWRlZCB0aGF0IHRoaXMgY29weXJpZ2h0IG5vdGljZSBpcyBrZXB0XG4gKiBpbnRhY3QuXG4gKlxuICogV0lER0VUIFdPUktTSE9QIE1BS0VTIE5PIFJFUFJFU0VOVEFUSU9OUyBPUiBXQVJSQU5USUVTIEFCT1VUIFRIRSBTVUlUQUJJTElUWVxuICogT0YgVEhFIFNPRlRXQVJFLCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEXG4gKiBUTyBUSEUgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQVxuICogUEFSVElDVUxBUiBQVVJQT1NFLCBPUiBOT04tSU5GUklOR0VNRU5ULiBXSURHRVQgV09SS1NIT1AgU0hBTEwgTk9UIEJFIExJQUJMRVxuICogRk9SIEFOWSBEQU1BR0VTIFNVRkZFUkVEIEJZIExJQ0VOU0VFIEFTIEEgUkVTVUxUIE9GIFVTSU5HLCBNT0RJRllJTkcgT1JcbiAqIERJU1RSSUJVVElORyBUSElTIFNPRlRXQVJFIE9SIElUUyBERVJJVkFUSVZFUy5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIE5PVCBERVNJR05FRCBPUiBJTlRFTkRFRCBGT1IgVVNFIE9SIFJFU0FMRSBBUyBPTi1MSU5FXG4gKiBDT05UUk9MIEVRVUlQTUVOVCBJTiBIQVpBUkRPVVMgRU5WSVJPTk1FTlRTIFJFUVVJUklORyBGQUlMLVNBRkVcbiAqIFBFUkZPUk1BTkNFLCBTVUNIIEFTIElOIFRIRSBPUEVSQVRJT04gT0YgTlVDTEVBUiBGQUNJTElUSUVTLCBBSVJDUkFGVFxuICogTkFWSUdBVElPTiBPUiBDT01NVU5JQ0FUSU9OIFNZU1RFTVMsIEFJUiBUUkFGRklDIENPTlRST0wsIERJUkVDVCBMSUZFXG4gKiBTVVBQT1JUIE1BQ0hJTkVTLCBPUiBXRUFQT05TIFNZU1RFTVMsIElOIFdISUNIIFRIRSBGQUlMVVJFIE9GIFRIRVxuICogU09GVFdBUkUgQ09VTEQgTEVBRCBESVJFQ1RMWSBUTyBERUFUSCwgUEVSU09OQUwgSU5KVVJZLCBPUiBTRVZFUkVcbiAqIFBIWVNJQ0FMIE9SIEVOVklST05NRU5UQUwgREFNQUdFIChcIkhJR0ggUklTSyBBQ1RJVklUSUVTXCIpLiAgV0lER0VUIFdPUktTSE9QXG4gKiBTUEVDSUZJQ0FMTFkgRElTQ0xBSU1TIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVFkgT0YgRklUTkVTUyBGT1JcbiAqIEhJR0ggUklTSyBBQ1RJVklUSUVTLlxuICpcbiAqXG4gKiBUaGUgcmVzdCBpczpcbiAqXG4gKiBDb3B5cmlnaHQgKEMpIDE5OTYgYnkgSmVmIFBvc2thbnplciA8amVmQGFjbWUuY29tPi4gIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnNcbiAqIGFyZSBtZXQ6XG4gKiAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodFxuICogICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHRcbiAqICAgIG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGVcbiAqICAgIGRvY3VtZW50YXRpb24gYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQVVUSE9SIEFORCBDT05UUklCVVRPUlMgYGBBUyBJUycnIEFORFxuICogQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG4gKiBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRVxuICogQVJFIERJU0NMQUlNRUQuICBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEVcbiAqIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMXG4gKiBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EU1xuICogT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pXG4gKiBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVFxuICogTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWVxuICogT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRlxuICogU1VDSCBEQU1BR0UuXG4gKlxuICogVmlzaXQgdGhlIEFDTUUgTGFicyBKYXZhIHBhZ2UgZm9yIHVwLXRvLWRhdGUgdmVyc2lvbnMgb2YgdGhpcyBhbmQgb3RoZXJcbiAqIGZpbmUgSmF2YSB1dGlsaXRpZXM6IGh0dHA6Ly93d3cuYWNtZS5jb20vamF2YS9cbiAqL1xuXG5cbi8vIFRhYmxlcywgcGVybXV0YXRpb25zLCBTLWJveGVzLCBldGMuXG52YXIgUEMyID0gWzEzLDE2LDEwLDIzLCAwLCA0LCAyLDI3LDE0LCA1LDIwLCA5LDIyLDE4LDExLCAzLFxuXHRcdCAgIDI1LCA3LDE1LCA2LDI2LDE5LDEyLCAxLDQwLDUxLDMwLDM2LDQ2LDU0LDI5LDM5LFxuXHRcdCAgIDUwLDQ0LDMyLDQ3LDQzLDQ4LDM4LDU1LDMzLDUyLDQ1LDQxLDQ5LDM1LDI4LDMxIF0sXG5cdHRvdHJvdCA9IFsgMSwgMiwgNCwgNiwgOCwxMCwxMiwxNCwxNSwxNywxOSwyMSwyMywyNSwyNywyOF0sXG5cdHogPSAweDAsIGEsYixjLGQsZSxmLCBTUDEsU1AyLFNQMyxTUDQsU1A1LFNQNixTUDcsU1A4LFxuXHRrZXlzID0gW107XG5cbmE9MTw8MTY7IGI9MTw8MjQ7IGM9YXxiOyBkPTE8PDI7IGU9MTw8MTA7IGY9ZHxlO1xuU1AxID0gW2N8ZSx6fHosYXx6LGN8ZixjfGQsYXxmLHp8ZCxhfHosenxlLGN8ZSxjfGYsenxlLGJ8ZixjfGQsYnx6LHp8ZCxcblx0ICAgenxmLGJ8ZSxifGUsYXxlLGF8ZSxjfHosY3x6LGJ8ZixhfGQsYnxkLGJ8ZCxhfGQsenx6LHp8ZixhfGYsYnx6LFxuXHQgICBhfHosY3xmLHp8ZCxjfHosY3xlLGJ8eixifHosenxlLGN8ZCxhfHosYXxlLGJ8ZCx6fGUsenxkLGJ8ZixhfGYsXG5cdCAgIGN8ZixhfGQsY3x6LGJ8ZixifGQsenxmLGF8ZixjfGUsenxmLGJ8ZSxifGUsenx6LGF8ZCxhfGUsenx6LGN8ZF07XG5cbmE9MTw8MjA7IGI9MTw8MzE7IGM9YXxiOyBkPTE8PDU7IGU9MTw8MTU7IGY9ZHxlO1xuU1AyID0gW2N8ZixifGUsenxlLGF8ZixhfHosenxkLGN8ZCxifGYsYnxkLGN8ZixjfGUsYnx6LGJ8ZSxhfHosenxkLGN8ZCxcblx0ICAgYXxlLGF8ZCxifGYsenx6LGJ8eix6fGUsYXxmLGN8eixhfGQsYnxkLHp8eixhfGUsenxmLGN8ZSxjfHosenxmLFxuXHQgICB6fHosYXxmLGN8ZCxhfHosYnxmLGN8eixjfGUsenxlLGN8eixifGUsenxkLGN8ZixhfGYsenxkLHp8ZSxifHosXG5cdCAgIHp8ZixjfGUsYXx6LGJ8ZCxhfGQsYnxmLGJ8ZCxhfGQsYXxlLHp8eixifGUsenxmLGJ8eixjfGQsY3xmLGF8ZV07XG5cbmE9MTw8MTc7IGI9MTw8Mjc7IGM9YXxiOyBkPTE8PDM7IGU9MTw8OTsgZj1kfGU7XG5TUDMgPSBbenxmLGN8ZSx6fHosY3xkLGJ8ZSx6fHosYXxmLGJ8ZSxhfGQsYnxkLGJ8ZCxhfHosY3xmLGF8ZCxjfHosenxmLFxuXHQgICBifHosenxkLGN8ZSx6fGUsYXxlLGN8eixjfGQsYXxmLGJ8ZixhfGUsYXx6LGJ8Zix6fGQsY3xmLHp8ZSxifHosXG5cdCAgIGN8ZSxifHosYXxkLHp8ZixhfHosY3xlLGJ8ZSx6fHosenxlLGF8ZCxjfGYsYnxlLGJ8ZCx6fGUsenx6LGN8ZCxcblx0ICAgYnxmLGF8eixifHosY3xmLHp8ZCxhfGYsYXxlLGJ8ZCxjfHosYnxmLHp8ZixjfHosYXxmLHp8ZCxjfGQsYXxlXTtcblxuYT0xPDwxMzsgYj0xPDwyMzsgYz1hfGI7IGQ9MTw8MDsgZT0xPDw3OyBmPWR8ZTtcblNQNCA9IFtjfGQsYXxmLGF8Zix6fGUsY3xlLGJ8ZixifGQsYXxkLHp8eixjfHosY3x6LGN8Zix6fGYsenx6LGJ8ZSxifGQsXG5cdCAgIHp8ZCxhfHosYnx6LGN8ZCx6fGUsYnx6LGF8ZCxhfGUsYnxmLHp8ZCxhfGUsYnxlLGF8eixjfGUsY3xmLHp8Zixcblx0ICAgYnxlLGJ8ZCxjfHosY3xmLHp8Zix6fHosenx6LGN8eixhfGUsYnxlLGJ8Zix6fGQsY3xkLGF8ZixhfGYsenxlLFxuXHQgICBjfGYsenxmLHp8ZCxhfHosYnxkLGF8ZCxjfGUsYnxmLGF8ZCxhfGUsYnx6LGN8ZCx6fGUsYnx6LGF8eixjfGVdO1xuXG5hPTE8PDI1OyBiPTE8PDMwOyBjPWF8YjsgZD0xPDw4OyBlPTE8PDE5OyBmPWR8ZTtcblNQNSA9IFt6fGQsYXxmLGF8ZSxjfGQsenxlLHp8ZCxifHosYXxlLGJ8Zix6fGUsYXxkLGJ8ZixjfGQsY3xlLHp8ZixifHosXG5cdCAgIGF8eixifGUsYnxlLHp8eixifGQsY3xmLGN8ZixhfGQsY3xlLGJ8ZCx6fHosY3x6LGF8ZixhfHosY3x6LHp8Zixcblx0ICAgenxlLGN8ZCx6fGQsYXx6LGJ8eixhfGUsY3xkLGJ8ZixhfGQsYnx6LGN8ZSxhfGYsYnxmLHp8ZCxhfHosY3xlLFxuXHQgICBjfGYsenxmLGN8eixjfGYsYXxlLHp8eixifGUsY3x6LHp8ZixhfGQsYnxkLHp8ZSx6fHosYnxlLGF8ZixifGRdO1xuXG5hPTE8PDIyOyBiPTE8PDI5OyBjPWF8YjsgZD0xPDw0OyBlPTE8PDE0OyBmPWR8ZTtcblNQNiA9IFtifGQsY3x6LHp8ZSxjfGYsY3x6LHp8ZCxjfGYsYXx6LGJ8ZSxhfGYsYXx6LGJ8ZCxhfGQsYnxlLGJ8eix6fGYsXG5cdCAgIHp8eixhfGQsYnxmLHp8ZSxhfGUsYnxmLHp8ZCxjfGQsY3xkLHp8eixhfGYsY3xlLHp8ZixhfGUsY3xlLGJ8eixcblx0ICAgYnxlLHp8ZCxjfGQsYXxlLGN8ZixhfHosenxmLGJ8ZCxhfHosYnxlLGJ8eix6fGYsYnxkLGN8ZixhfGUsY3x6LFxuXHQgICBhfGYsY3xlLHp8eixjfGQsenxkLHp8ZSxjfHosYXxmLHp8ZSxhfGQsYnxmLHp8eixjfGUsYnx6LGF8ZCxifGZdO1xuXG5hPTE8PDIxOyBiPTE8PDI2OyBjPWF8YjsgZD0xPDwxOyBlPTE8PDExOyBmPWR8ZTtcblNQNyA9IFthfHosY3xkLGJ8Zix6fHosenxlLGJ8ZixhfGYsY3xlLGN8ZixhfHosenx6LGJ8ZCx6fGQsYnx6LGN8ZCx6fGYsXG5cdCAgIGJ8ZSxhfGYsYXxkLGJ8ZSxifGQsY3x6LGN8ZSxhfGQsY3x6LHp8ZSx6fGYsY3xmLGF8ZSx6fGQsYnx6LGF8ZSxcblx0ICAgYnx6LGF8ZSxhfHosYnxmLGJ8ZixjfGQsY3xkLHp8ZCxhfGQsYnx6LGJ8ZSxhfHosY3xlLHp8ZixhfGYsY3xlLFxuXHQgICB6fGYsYnxkLGN8ZixjfHosYXxlLHp8eix6fGQsY3xmLHp8eixhfGYsY3x6LHp8ZSxifGQsYnxlLHp8ZSxhfGRdO1xuXG5hPTE8PDE4OyBiPTE8PDI4OyBjPWF8YjsgZD0xPDw2OyBlPTE8PDEyOyBmPWR8ZTtcblNQOCA9IFtifGYsenxlLGF8eixjfGYsYnx6LGJ8Zix6fGQsYnx6LGF8ZCxjfHosY3xmLGF8ZSxjfGUsYXxmLHp8ZSx6fGQsXG5cdCAgIGN8eixifGQsYnxlLHp8ZixhfGUsYXxkLGN8ZCxjfGUsenxmLHp8eix6fHosY3xkLGJ8ZCxifGUsYXxmLGF8eixcblx0ICAgYXxmLGF8eixjfGUsenxlLHp8ZCxjfGQsenxlLGF8ZixifGUsenxkLGJ8ZCxjfHosY3xkLGJ8eixhfHosYnxmLFxuXHQgICB6fHosY3xmLGF8ZCxifGQsY3x6LGJ8ZSxifGYsenx6LGN8ZixhfGUsYXxlLHp8Zix6fGYsYXxkLGJ8eixjfGVdO1xuXG5cbi8qKlxuICogRXhwb3NlIHRoZSBERVMgZnVuY3Rpb24uXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhc3N3ZCkge1xuXHRzZXRLZXlzKHBhc3N3ZCk7ICAgICAgICAgICAgIC8vIFNldHVwIGtleXNcblx0cmV0dXJuIHsnZW5jcnlwdCc6IGVuY3J5cHR9OyAvLyBQdWJsaWMgaW50ZXJmYWNlXG59O1xuXG5cbi8qKlxuICogUHJpdmF0ZSBBUEkuXG4gKi9cblxuXG4vLyBTZXQgdGhlIGtleS5cbmZ1bmN0aW9uIHNldEtleXMoa2V5QmxvY2spIHtcblx0dmFyIGksIGosIGwsIG0sIG4sIG8sIHBjMW0gPSBbXSwgcGNyID0gW10sIGtuID0gW10sXG5cdFx0cmF3MCwgcmF3MSwgcmF3aSwgS25MaTtcblxuXHRmb3IgKGogPSAwLCBsID0gNTY7IGogPCA1NjsgKytqLCBsIC09IDgpIHtcblx0XHRsICs9IGwgPCAtNSA/IDY1IDogbCA8IC0zID8gMzEgOiBsIDwgLTEgPyA2MyA6IGwgPT09IDI3ID8gMzUgOiAwOyAvLyBQQzFcblx0XHRtID0gbCAmIDB4Nztcblx0XHRwYzFtW2pdID0gKChrZXlCbG9ja1tsID4+PiAzXSAmICgxPDxtKSkgIT09IDApID8gMTogMDtcblx0fVxuXG5cdGZvciAoaSA9IDA7IGkgPCAxNjsgKytpKSB7XG5cdFx0bSA9IGkgPDwgMTtcblx0XHRuID0gbSArIDE7XG5cdFx0a25bbV0gPSBrbltuXSA9IDA7XG5cdFx0Zm9yIChvID0gMjg7IG8gPCA1OTsgbyArPSAyOCkge1xuXHRcdFx0Zm9yIChqID0gbyAtIDI4OyBqIDwgbzsgKytqKSB7XG5cdFx0XHRcdGwgPSBqICsgdG90cm90W2ldO1xuXHRcdFx0XHRpZiAobCA8IG8pIHtcblx0XHRcdFx0XHRwY3Jbal0gPSBwYzFtW2xdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHBjcltqXSA9IHBjMW1bbCAtIDI4XTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKGogPSAwOyBqIDwgMjQ7ICsraikge1xuXHRcdFx0aWYgKHBjcltQQzJbal1dICE9PSAwKSB7XG5cdFx0XHRcdGtuW21dIHw9IDEgPDwgKDIzIC0gaik7XG5cdFx0XHR9XG5cdFx0XHRpZiAocGNyW1BDMltqICsgMjRdXSAhPT0gMCkge1xuXHRcdFx0XHRrbltuXSB8PSAxIDw8ICgyMyAtIGopO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIGNvb2tleVxuXHRmb3IgKGkgPSAwLCByYXdpID0gMCwgS25MaSA9IDA7IGkgPCAxNjsgKytpKSB7XG5cdFx0cmF3MCA9IGtuW3Jhd2krK107XG5cdFx0cmF3MSA9IGtuW3Jhd2krK107XG5cdFx0a2V5c1tLbkxpXSA9IChyYXcwICYgMHgwMGZjMDAwMCkgPDwgNjtcblx0XHRrZXlzW0tuTGldIHw9IChyYXcwICYgMHgwMDAwMGZjMCkgPDwgMTA7XG5cdFx0a2V5c1tLbkxpXSB8PSAocmF3MSAmIDB4MDBmYzAwMDApID4+PiAxMDtcblx0XHRrZXlzW0tuTGldIHw9IChyYXcxICYgMHgwMDAwMGZjMCkgPj4+IDY7XG5cdFx0KytLbkxpO1xuXHRcdGtleXNbS25MaV0gPSAocmF3MCAmIDB4MDAwM2YwMDApIDw8IDEyO1xuXHRcdGtleXNbS25MaV0gfD0gKHJhdzAgJiAweDAwMDAwMDNmKSA8PCAxNjtcblx0XHRrZXlzW0tuTGldIHw9IChyYXcxICYgMHgwMDAzZjAwMCkgPj4+IDQ7XG5cdFx0a2V5c1tLbkxpXSB8PSAocmF3MSAmIDB4MDAwMDAwM2YpO1xuXHRcdCsrS25MaTtcblx0fVxufVxuXG5cbi8vIEVuY3J5cHQgOCBieXRlcyBvZiB0ZXh0XG5mdW5jdGlvbiBlbmM4KHRleHQpIHtcblx0dmFyIGkgPSAwLCBiID0gdGV4dC5zbGljZSgpLCBmdmFsLCBrZXlzaSA9IDAsXG5cdFx0bCwgciwgeDsgLy8gbGVmdCwgcmlnaHQsIGFjY3VtdWxhdG9yXG5cblx0Ly8gU3F1YXNoIDggYnl0ZXMgdG8gMiBpbnRzXG5cdGwgPSBiW2krK108PDI0IHwgYltpKytdPDwxNiB8IGJbaSsrXTw8OCB8IGJbaSsrXTtcblx0ciA9IGJbaSsrXTw8MjQgfCBiW2krK108PDE2IHwgYltpKytdPDw4IHwgYltpKytdO1xuXG5cdHggPSAoKGwgPj4+IDQpIF4gcikgJiAweDBmMGYwZjBmO1xuXHRyIF49IHg7XG5cdGwgXj0gKHggPDwgNCk7XG5cdHggPSAoKGwgPj4+IDE2KSBeIHIpICYgMHgwMDAwZmZmZjtcblx0ciBePSB4O1xuXHRsIF49ICh4IDw8IDE2KTtcblx0eCA9ICgociA+Pj4gMikgXiBsKSAmIDB4MzMzMzMzMzM7XG5cdGwgXj0geDtcblx0ciBePSAoeCA8PCAyKTtcblx0eCA9ICgociA+Pj4gOCkgXiBsKSAmIDB4MDBmZjAwZmY7XG5cdGwgXj0geDtcblx0ciBePSAoeCA8PCA4KTtcblx0ciA9IChyIDw8IDEpIHwgKChyID4+PiAzMSkgJiAxKTtcblx0eCA9IChsIF4gcikgJiAweGFhYWFhYWFhO1xuXHRsIF49IHg7XG5cdHIgXj0geDtcblx0bCA9IChsIDw8IDEpIHwgKChsID4+PiAzMSkgJiAxKTtcblxuXHRmb3IgKGkgPSAwOyBpIDwgODsgKytpKSB7XG5cdFx0eCA9IChyIDw8IDI4KSB8IChyID4+PiA0KTtcblx0XHR4IF49IGtleXNba2V5c2krK107XG5cdFx0ZnZhbCA9ICBTUDdbeCAmIDB4M2ZdO1xuXHRcdGZ2YWwgfD0gU1A1Wyh4ID4+PiA4KSAmIDB4M2ZdO1xuXHRcdGZ2YWwgfD0gU1AzWyh4ID4+PiAxNikgJiAweDNmXTtcblx0XHRmdmFsIHw9IFNQMVsoeCA+Pj4gMjQpICYgMHgzZl07XG5cdFx0eCA9IHIgXiBrZXlzW2tleXNpKytdO1xuXHRcdGZ2YWwgfD0gU1A4W3ggJiAweDNmXTtcblx0XHRmdmFsIHw9IFNQNlsoeCA+Pj4gOCkgJiAweDNmXTtcblx0XHRmdmFsIHw9IFNQNFsoeCA+Pj4gMTYpICYgMHgzZl07XG5cdFx0ZnZhbCB8PSBTUDJbKHggPj4+IDI0KSAmIDB4M2ZdO1xuXHRcdGwgXj0gZnZhbDtcblx0XHR4ID0gKGwgPDwgMjgpIHwgKGwgPj4+IDQpO1xuXHRcdHggXj0ga2V5c1trZXlzaSsrXTtcblx0XHRmdmFsID0gIFNQN1t4ICYgMHgzZl07XG5cdFx0ZnZhbCB8PSBTUDVbKHggPj4+IDgpICYgMHgzZl07XG5cdFx0ZnZhbCB8PSBTUDNbKHggPj4+IDE2KSAmIDB4M2ZdO1xuXHRcdGZ2YWwgfD0gU1AxWyh4ID4+PiAyNCkgJiAweDNmXTtcblx0XHR4ID0gbCBeIGtleXNba2V5c2krK107XG5cdFx0ZnZhbCB8PSBTUDhbeCAmIDB4MDAwMDAwM2ZdO1xuXHRcdGZ2YWwgfD0gU1A2Wyh4ID4+PiA4KSAmIDB4M2ZdO1xuXHRcdGZ2YWwgfD0gU1A0Wyh4ID4+PiAxNikgJiAweDNmXTtcblx0XHRmdmFsIHw9IFNQMlsoeCA+Pj4gMjQpICYgMHgzZl07XG5cdFx0ciBePSBmdmFsO1xuXHR9XG5cblx0ciA9IChyIDw8IDMxKSB8IChyID4+PiAxKTtcblx0eCA9IChsIF4gcikgJiAweGFhYWFhYWFhO1xuXHRsIF49IHg7XG5cdHIgXj0geDtcblx0bCA9IChsIDw8IDMxKSB8IChsID4+PiAxKTtcblx0eCA9ICgobCA+Pj4gOCkgXiByKSAmIDB4MDBmZjAwZmY7XG5cdHIgXj0geDtcblx0bCBePSAoeCA8PCA4KTtcblx0eCA9ICgobCA+Pj4gMikgXiByKSAmIDB4MzMzMzMzMzM7XG5cdHIgXj0geDtcblx0bCBePSAoeCA8PCAyKTtcblx0eCA9ICgociA+Pj4gMTYpIF4gbCkgJiAweDAwMDBmZmZmO1xuXHRsIF49IHg7XG5cdHIgXj0gKHggPDwgMTYpO1xuXHR4ID0gKChyID4+PiA0KSBeIGwpICYgMHgwZjBmMGYwZjtcblx0bCBePSB4O1xuXHRyIF49ICh4IDw8IDQpO1xuXG5cdC8vIFNwcmVhZCBpbnRzIHRvIGJ5dGVzXG5cdHggPSBbciwgbF07XG5cdGZvciAoaSA9IDA7IGkgPCA4OyBpKyspIHtcblx0XHRiW2ldID0gKHhbaT4+PjJdID4+PiAoOCAqICgzIC0gKGkgJSA0KSkpKSAlIDI1Njtcblx0XHRpZiAoYltpXSA8IDApIHsgYltpXSArPSAyNTY7IH0gLy8gdW5zaWduZWRcblx0fVxuXHRyZXR1cm4gYjtcbn1cblxuXG4vLyBFbmNyeXB0IDE2IGJ5dGVzIG9mIHRleHQgdXNpbmcgcGFzc3dkIGFzIGtleVxuZnVuY3Rpb24gZW5jcnlwdCh0KSB7XG5cdHJldHVybiBlbmM4KHQuc2xpY2UoMCwgOCkpLmNvbmNhdChlbmM4KHQuc2xpY2UoOCwgMTYpKSk7XG59XG4iLCIvKlxuICogbm9WTkM6IEhUTUw1IFZOQyBjbGllbnRcbiAqIENvcHlyaWdodCAoQykgMjAxMiBKb2VsIE1hcnRpblxuICogQ29weXJpZ2h0IChDKSAyMDE1IFNhbXVlbCBNYW5uZWhlZCBmb3IgQ2VuZGlvIEFCXG4gKiBMaWNlbnNlZCB1bmRlciBNUEwgMi4wIChzZWUgTElDRU5TRS50eHQpXG4gKi9cblxuXG4vKipcbiAqIEV4cG9zZSB0aGUgRGlzcGxheSBjbGFzcy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBEaXNwbGF5O1xuXG5cbi8qKlxuICogRGVwZW5kZW5jaWVzLlxuICovXG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdub1ZOQzpEaXNwbGF5Jyk7XG52YXIgZGVidWdlcnJvciA9IHJlcXVpcmUoJ2RlYnVnJykoJ25vVk5DOkVSUk9SOkRpc3BsYXknKTtcbmRlYnVnZXJyb3IubG9nID0gY29uc29sZS53YXJuLmJpbmQoY29uc29sZSk7XG52YXIgYnJvd3NlciA9IHJlcXVpcmUoJ2Jvd3NlcicpLmJyb3dzZXI7XG52YXIgVXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xudmFyIEJhc2U2NCA9IHJlcXVpcmUoJy4vYmFzZTY0Jyk7XG5cblxuZnVuY3Rpb24gRGlzcGxheSAoZGVmYXVsdHMpIHtcblx0ZGVidWcoJ25ldygpJyk7XG5cblx0dGhpcy5fZHJhd0N0eCA9IG51bGw7XG5cdHRoaXMuX2NfZm9yY2VDYW52YXMgPSBmYWxzZTtcblxuXHR0aGlzLl9yZW5kZXJRID0gW107ICAvLyBxdWV1ZSBkcmF3aW5nIGFjdGlvbnMgZm9yIGluLW9kZXIgcmVuZGVyaW5nXG5cblx0Ly8gdGhlIGZ1bGwgZnJhbWUgYnVmZmVyIChsb2dpY2FsIGNhbnZhcykgc2l6ZVxuXHR0aGlzLl9mYl93aWR0aCA9IDA7XG5cdHRoaXMuX2ZiX2hlaWdodCA9IDA7XG5cblx0Ly8gdGhlIHNpemUgbGltaXQgb2YgdGhlIHZpZXdwb3J0IChzdGFydCBkaXNhYmxlZClcblx0dGhpcy5fbWF4V2lkdGggPSAwO1xuXHR0aGlzLl9tYXhIZWlnaHQgPSAwO1xuXG5cdC8vIHRoZSB2aXNpYmxlICdwaHlzaWNhbCBjYW52YXMnIHZpZXdwb3J0XG5cdHRoaXMuX3ZpZXdwb3J0TG9jID0geyAneCc6IDAsICd5JzogMCwgJ3cnOiAwLCAnaCc6IDAgfTtcblx0dGhpcy5fY2xlYW5SZWN0ID0geyAneDEnOiAwLCAneTEnOiAwLCAneDInOiAtMSwgJ3kyJzogLTEgfTtcblxuXHR0aGlzLl9wcmV2RHJhd1N0eWxlID0gJyc7XG5cdHRoaXMuX3RpbGUgPSBudWxsO1xuXHR0aGlzLl90aWxlMTZ4MTYgPSBudWxsO1xuXHR0aGlzLl90aWxlX3ggPSAwO1xuXHR0aGlzLl90aWxlX3kgPSAwO1xuXG5cdFV0aWwuc2V0X2RlZmF1bHRzKHRoaXMsIGRlZmF1bHRzLCB7XG5cdFx0J3RydWVfY29sb3InOiB0cnVlLFxuXHRcdCdjb2xvdXJNYXAnOiBbXSxcblx0XHQnc2NhbGUnOiAxLjAsXG5cdFx0J3ZpZXdwb3J0JzogZmFsc2UsXG5cdFx0J3JlbmRlcl9tb2RlJzogJydcblx0fSk7XG5cblx0aWYgKCF0aGlzLl90YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RhcmdldCBtdXN0IGJlIHNldCcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiB0aGlzLl90YXJnZXQgPT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd0YXJnZXQgbXVzdCBiZSBhIERPTSBlbGVtZW50Jyk7XG5cdH1cblxuXHRpZiAoIXRoaXMuX3RhcmdldC5nZXRDb250ZXh0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdubyBnZXRDb250ZXh0IG1ldGhvZCcpO1xuXHR9XG5cblx0aWYgKCF0aGlzLl9kcmF3Q3R4KSB7XG5cdFx0dGhpcy5fZHJhd0N0eCA9IHRoaXMuX3RhcmdldC5nZXRDb250ZXh0KCcyZCcpO1xuXHR9XG5cblx0dGhpcy5jbGVhcigpO1xuXG5cdC8vIENoZWNrIGNhbnZhcyBmZWF0dXJlc1xuXHRpZiAoJ2NyZWF0ZUltYWdlRGF0YScgaW4gdGhpcy5fZHJhd0N0eCkge1xuXHRcdHRoaXMuX3JlbmRlcl9tb2RlID0gJ2NhbnZhcyByZW5kZXJpbmcnO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcignQ2FudmFzIGRvZXMgbm90IHN1cHBvcnQgY3JlYXRlSW1hZ2VEYXRhJyk7XG5cdH1cblxuXHRpZiAodGhpcy5fcHJlZmVyX2pzID09PSBudWxsKSB7XG5cdFx0dGhpcy5fcHJlZmVyX2pzID0gdHJ1ZTtcblx0fVxuXG5cdC8vIERldGVybWluZSBicm93c2VyIHN1cHBvcnQgZm9yIHNldHRpbmcgdGhlIGN1cnNvciB2aWEgZGF0YSBVUkkgc2NoZW1lXG5cdGlmICh0aGlzLl9jdXJzb3JfdXJpIHx8IHRoaXMuX2N1cnNvcl91cmkgPT09IG51bGwgfHxcblx0ICB0aGlzLl9jdXJzb3JfdXJpID09PSB1bmRlZmluZWQpIHtcblx0ICB0aGlzLl9jdXJzb3JfdXJpID0gVXRpbC5icm93c2VyU3VwcG9ydHNDdXJzb3JVUklzKCk7XG5cdH1cbn1cblxuXG5EaXNwbGF5LnByb3RvdHlwZSA9IHtcblx0Ly8gUHVibGljIG1ldGhvZHNcblx0dmlld3BvcnRDaGFuZ2VQb3M6IGZ1bmN0aW9uIChkZWx0YVgsIGRlbHRhWSkge1xuXHRcdHZhciB2cCA9IHRoaXMuX3ZpZXdwb3J0TG9jO1xuXG5cdFx0aWYgKCF0aGlzLl92aWV3cG9ydCkge1xuXHRcdFx0ZGVsdGFYID0gLXZwLnc7ICAvLyBjbGFtcGVkIGxhdGVyIG9mIG91dCBvZiBib3VuZHNcblx0XHRcdGRlbHRhWSA9IC12cC5oO1xuXHRcdH1cblxuXHRcdHZhciB2eDIgPSB2cC54ICsgdnAudyAtIDE7XG5cdFx0dmFyIHZ5MiA9IHZwLnkgKyB2cC5oIC0gMTtcblxuXHRcdC8vIFBvc2l0aW9uIGNoYW5nZVxuXG5cdFx0aWYgKGRlbHRhWCA8IDAgJiYgdnAueCArIGRlbHRhWCA8IDApIHtcblx0XHRcdGRlbHRhWCA9IC12cC54O1xuXHRcdH1cblx0XHRpZiAodngyICsgZGVsdGFYID49IHRoaXMuX2ZiX3dpZHRoKSB7XG5cdFx0XHRkZWx0YVggLT0gdngyICsgZGVsdGFYIC0gdGhpcy5fZmJfd2lkdGggKyAxO1xuXHRcdH1cblxuXHRcdGlmICh2cC55ICsgZGVsdGFZIDwgMCkge1xuXHRcdFx0ZGVsdGFZID0gLXZwLnk7XG5cdFx0fVxuXHRcdGlmICh2eTIgKyBkZWx0YVkgPj0gdGhpcy5fZmJfaGVpZ2h0KSB7XG5cdFx0XHRkZWx0YVkgLT0gKHZ5MiArIGRlbHRhWSAtIHRoaXMuX2ZiX2hlaWdodCArIDEpO1xuXHRcdH1cblxuXHRcdGlmIChkZWx0YVggPT09IDAgJiYgZGVsdGFZID09PSAwKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGRlYnVnKCd2aWV3cG9ydENoYW5nZVBvcygpIHwgZGVsdGFYOiAnICsgZGVsdGFYICsgJywgZGVsdGFZOiAnICsgZGVsdGFZKTtcblxuXHRcdHZwLnggKz0gZGVsdGFYO1xuXHRcdHZ4MiArPSBkZWx0YVg7XG5cdFx0dnAueSArPSBkZWx0YVk7XG5cdFx0dnkyICs9IGRlbHRhWTtcblxuXHRcdC8vIFVwZGF0ZSB0aGUgY2xlYW4gcmVjdGFuZ2xlXG5cdFx0dmFyIGNyID0gdGhpcy5fY2xlYW5SZWN0O1xuXHRcdGlmICh2cC54ID4gY3IueDEpIHtcblx0XHRcdGNyLngxID0gdnAueDtcblx0XHR9XG5cdFx0aWYgKHZ4MiA8IGNyLngyKSB7XG5cdFx0XHRjci54MiA9IHZ4Mjtcblx0XHR9XG5cdFx0aWYgKHZwLnkgPiBjci55MSkge1xuXHRcdFx0Y3IueTEgPSB2cC55O1xuXHRcdH1cblx0XHRpZiAodnkyIDwgY3IueTIpIHtcblx0XHRcdGNyLnkyID0gdnkyO1xuXHRcdH1cblxuXHRcdHZhciB4MSwgdztcblx0XHRpZiAoZGVsdGFYIDwgMCkge1xuXHRcdFx0Ly8gU2hpZnQgdmlld3BvcnQgbGVmdCwgcmVkcmF3IGxlZnQgc2VjdGlvblxuXHRcdFx0eDEgPSAwO1xuXHRcdFx0dyA9IC1kZWx0YVg7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIFNoaWZ0IHZpZXdwb3J0IHJpZ2h0LCByZWRyYXcgcmlnaHQgc2VjdGlvblxuXHRcdFx0eDEgPSB2cC53IC0gZGVsdGFYO1xuXHRcdFx0dyA9IGRlbHRhWDtcblx0XHR9XG5cblx0XHR2YXIgeTEsIGg7XG5cdFx0aWYgKGRlbHRhWSA8IDApIHtcblx0XHRcdC8vIFNoaWZ0IHZpZXdwb3J0IHVwLCByZWRyYXcgdG9wIHNlY3Rpb25cblx0XHRcdHkxID0gMDtcblx0XHRcdGggPSAtZGVsdGFZO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBTaGlmdCB2aWV3cG9ydCBkb3duLCByZWRyYXcgYm90dG9tIHNlY3Rpb25cblx0XHRcdHkxID0gdnAuaCAtIGRlbHRhWTtcblx0XHRcdGggPSBkZWx0YVk7XG5cdFx0fVxuXG5cdFx0Ly8gQ29weSB0aGUgdmFsaWQgcGFydCBvZiB0aGUgdmlld3BvcnQgdG8gdGhlIHNoaWZ0ZWQgbG9jYXRpb25cblx0XHR2YXIgc2F2ZVN0eWxlID0gdGhpcy5fZHJhd0N0eC5maWxsU3R5bGU7XG5cdFx0dmFyIGNhbnZhcyA9IHRoaXMuX3RhcmdldDtcblx0XHR0aGlzLl9kcmF3Q3R4LmZpbGxTdHlsZSA9ICdyZ2IoMjU1LDI1NSwyNTUpJztcblx0XHRpZiAoZGVsdGFYICE9PSAwKSB7XG5cdFx0XHR0aGlzLl9kcmF3Q3R4LmRyYXdJbWFnZShjYW52YXMsIDAsIDAsIHZwLncsIHZwLmgsIC1kZWx0YVgsIDAsIHZwLncsIHZwLmgpO1xuXHRcdFx0dGhpcy5fZHJhd0N0eC5maWxsUmVjdCh4MSwgMCwgdywgdnAuaCk7XG5cdFx0fVxuXHRcdGlmIChkZWx0YVkgIT09IDApIHtcblx0XHRcdHRoaXMuX2RyYXdDdHguZHJhd0ltYWdlKGNhbnZhcywgMCwgMCwgdnAudywgdnAuaCwgMCwgLWRlbHRhWSwgdnAudywgdnAuaCk7XG5cdFx0XHR0aGlzLl9kcmF3Q3R4LmZpbGxSZWN0KDAsIHkxLCB2cC53LCBoKTtcblx0XHR9XG5cdFx0dGhpcy5fZHJhd0N0eC5maWxsU3R5bGUgPSBzYXZlU3R5bGU7XG5cdH0sXG5cblx0dmlld3BvcnRDaGFuZ2VTaXplOiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XG5cdFx0aWYgKHR5cGVvZih3aWR0aCkgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZihoZWlnaHQpID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0ZGVidWcoJ3ZpZXdwb3J0Q2hhbmdlU2l6ZSgpIHwgc2V0dGluZyB2aWV3cG9ydCB0byBmdWxsIGRpc3BsYXkgcmVnaW9uJyk7XG5cdFx0XHR3aWR0aCA9IHRoaXMuX2ZiX3dpZHRoO1xuXHRcdFx0aGVpZ2h0ID0gdGhpcy5fZmJfaGVpZ2h0O1xuXHRcdH1cblxuXHRcdHZhciB2cCA9IHRoaXMuX3ZpZXdwb3J0TG9jO1xuXG5cdFx0aWYgKHZwLncgIT09IHdpZHRoIHx8IHZwLmggIT09IGhlaWdodCkge1xuXHRcdFx0aWYgKHRoaXMuX3ZpZXdwb3J0KSB7XG5cdFx0XHRcdGlmICh0aGlzLl9tYXhXaWR0aCAhPT0gMCAmJiB3aWR0aCA+IHRoaXMuX21heFdpZHRoKSB7XG5cdFx0XHRcdFx0d2lkdGggPSB0aGlzLl9tYXhXaWR0aDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy5fbWF4SGVpZ2h0ICE9PSAwICYmIGhlaWdodCA+IHRoaXMuX21heEhlaWdodCkge1xuXHRcdFx0XHRcdGhlaWdodCA9IHRoaXMuX21heEhlaWdodDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgY3IgPSB0aGlzLl9jbGVhblJlY3Q7XG5cblx0XHRcdGlmICh3aWR0aCA8IHZwLncgJiYgIGNyLngyID4gdnAueCArIHdpZHRoIC0gMSkge1xuXHRcdFx0XHRjci54MiA9IHZwLnggKyB3aWR0aCAtIDE7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChoZWlnaHQgPCB2cC5oICYmICBjci55MiA+IHZwLnkgKyBoZWlnaHQgLSAxKSB7XG5cdFx0XHRcdGNyLnkyID0gdnAueSArIGhlaWdodCAtIDE7XG5cdFx0XHR9XG5cblx0XHRcdHZwLncgPSB3aWR0aDtcblx0XHRcdHZwLmggPSBoZWlnaHQ7XG5cblx0XHRcdHZhciBjYW52YXMgPSB0aGlzLl90YXJnZXQ7XG5cblx0XHRcdGlmIChjYW52YXMud2lkdGggIT09IHdpZHRoIHx8IGNhbnZhcy5oZWlnaHQgIT09IGhlaWdodCkge1xuXHRcdFx0XHQvLyBXZSBoYXZlIHRvIHNhdmUgdGhlIGNhbnZhcyBkYXRhIHNpbmNlIGNoYW5naW5nIHRoZSBzaXplIHdpbGwgY2xlYXIgaXRcblx0XHRcdFx0dmFyIHNhdmVJbWcgPSBudWxsO1xuXG5cdFx0XHRcdGlmICh2cC53ID4gMCAmJiB2cC5oID4gMCAmJiBjYW52YXMud2lkdGggPiAwICYmIGNhbnZhcy5oZWlnaHQgPiAwKSB7XG5cdFx0XHRcdFx0dmFyIGltZ193aWR0aCA9IGNhbnZhcy53aWR0aCA8IHZwLncgPyBjYW52YXMud2lkdGggOiB2cC53O1xuXHRcdFx0XHRcdHZhciBpbWdfaGVpZ2h0ID0gY2FudmFzLmhlaWdodCA8IHZwLmggPyBjYW52YXMuaGVpZ2h0IDogdnAuaDtcblx0XHRcdFx0XHRzYXZlSW1nID0gdGhpcy5fZHJhd0N0eC5nZXRJbWFnZURhdGEoMCwgMCwgaW1nX3dpZHRoLCBpbWdfaGVpZ2h0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjYW52YXMud2lkdGggIT09IHdpZHRoKSB7XG5cdFx0XHRcdFx0Y2FudmFzLndpZHRoID0gd2lkdGg7XG5cdFx0XHRcdFx0Y2FudmFzLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChjYW52YXMuaGVpZ2h0ICE9PSBoZWlnaHQpIHtcblx0XHRcdFx0XHRjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdFx0XHRcdGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHNhdmVJbWcpIHtcblx0XHRcdFx0XHR0aGlzLl9kcmF3Q3R4LnB1dEltYWdlRGF0YShzYXZlSW1nLCAwLCAwKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvLyBSZXR1cm4gYSBtYXAgb2YgY2xlYW4gYW5kIGRpcnR5IGFyZWFzIG9mIHRoZSB2aWV3cG9ydCBhbmQgcmVzZXQgdGhlXG5cdC8vIHRyYWNraW5nIG9mIGNsZWFuIGFuZCBkaXJ0eSBhcmVhc1xuXHQvL1xuXHQvLyBSZXR1cm5zOiB7ICdjbGVhbkJveCc6IHsgJ3gnOiB4LCAneSc6IHksICd3JzogdywgJ2gnOiBofSxcblx0Ly8gICAgICAgICAgICAnZGlydHlCb3hlcyc6IFt7ICd4JzogeCwgJ3knOiB5LCAndyc6IHcsICdoJzogaCB9LCAuLi5dIH1cblx0Z2V0Q2xlYW5EaXJ0eVJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHZwID0gdGhpcy5fdmlld3BvcnRMb2M7XG5cdFx0dmFyIGNyID0gdGhpcy5fY2xlYW5SZWN0O1xuXG5cdFx0dmFyIGNsZWFuQm94ID0geyAneCc6IGNyLngxLCAneSc6IGNyLnkxLFxuXHRcdFx0XHRcdFx0ICd3JzogY3IueDIgLSBjci54MSArIDEsICdoJzogY3IueTIgLSBjci55MSArIDEgfTtcblxuXHRcdHZhciBkaXJ0eUJveGVzID0gW107XG5cdFx0aWYgKGNyLngxID49IGNyLngyIHx8IGNyLnkxID49IGNyLnkyKSB7XG5cdFx0XHQvLyBXaG9sZSB2aWV3cG9ydCBpcyBkaXJ0eVxuXHRcdFx0ZGlydHlCb3hlcy5wdXNoKHsgJ3gnOiB2cC54LCAneSc6IHZwLnksICd3JzogdnAudywgJ2gnOiB2cC5oIH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBSZWRyYXcgZGlydHkgcmVnaW9uc1xuXHRcdFx0dmFyIHZ4MiA9IHZwLnggKyB2cC53IC0gMTtcblx0XHRcdHZhciB2eTIgPSB2cC55ICsgdnAuaCAtIDE7XG5cblx0XHRcdGlmICh2cC54IDwgY3IueDEpIHtcblx0XHRcdFx0Ly8gbGVmdCBzaWRlIGRpcnR5IHJlZ2lvblxuXHRcdFx0XHRkaXJ0eUJveGVzLnB1c2goeyd4JzogdnAueCwgJ3knOiB2cC55LFxuXHRcdFx0XHRcdFx0XHRcdCAndyc6IGNyLngxIC0gdnAueCArIDEsICdoJzogdnAuaH0pO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHZ4MiA+IGNyLngyKSB7XG5cdFx0XHRcdC8vIHJpZ2h0IHNpZGUgZGlydHkgcmVnaW9uXG5cdFx0XHRcdGRpcnR5Qm94ZXMucHVzaCh7J3gnOiBjci54MiArIDEsICd5JzogdnAueSxcblx0XHRcdFx0XHRcdFx0XHQgJ3cnOiB2eDIgLSBjci54MiwgJ2gnOiB2cC5ofSk7XG5cdFx0XHR9XG5cdFx0XHRpZih2cC55IDwgY3IueTEpIHtcblx0XHRcdFx0Ly8gdG9wL21pZGRsZSBkaXJ0eSByZWdpb25cblx0XHRcdFx0ZGlydHlCb3hlcy5wdXNoKHsneCc6IGNyLngxLCAneSc6IHZwLnksXG5cdFx0XHRcdFx0XHRcdFx0ICd3JzogY3IueDIgLSBjci54MSArIDEsICdoJzogY3IueTEgLSB2cC55fSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodnkyID4gY3IueTIpIHtcblx0XHRcdFx0Ly8gYm90dG9tL21pZGRsZSBkaXJ0eSByZWdpb25cblx0XHRcdFx0ZGlydHlCb3hlcy5wdXNoKHsneCc6IGNyLngxLCAneSc6IGNyLnkyICsgMSxcblx0XHRcdFx0XHRcdFx0XHQgJ3cnOiBjci54MiAtIGNyLngxICsgMSwgJ2gnOiB2eTIgLSBjci55Mn0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuX2NsZWFuUmVjdCA9IHsneDEnOiB2cC54LCAneTEnOiB2cC55LFxuXHRcdFx0XHRcdFx0XHQgJ3gyJzogdnAueCArIHZwLncgLSAxLCAneTInOiB2cC55ICsgdnAuaCAtIDF9O1xuXG5cdFx0cmV0dXJuIHsnY2xlYW5Cb3gnOiBjbGVhbkJveCwgJ2RpcnR5Qm94ZXMnOiBkaXJ0eUJveGVzfTtcblx0fSxcblxuXHRhYnNYOiBmdW5jdGlvbiAoeCkge1xuXHRcdHJldHVybiB4ICsgdGhpcy5fdmlld3BvcnRMb2MueDtcblx0fSxcblxuXHRhYnNZOiBmdW5jdGlvbiAoeSkge1xuXHRcdHJldHVybiB5ICsgdGhpcy5fdmlld3BvcnRMb2MueTtcblx0fSxcblxuXHRyZXNpemU6IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XG5cdFx0dGhpcy5fcHJldkRyYXdTdHlsZSA9ICcnO1xuXG5cdFx0dGhpcy5fZmJfd2lkdGggPSB3aWR0aDtcblx0XHR0aGlzLl9mYl9oZWlnaHQgPSBoZWlnaHQ7XG5cblx0XHR0aGlzLl9yZXNjYWxlKHRoaXMuX3NjYWxlKTtcblxuXHRcdHRoaXMudmlld3BvcnRDaGFuZ2VTaXplKCk7XG5cdH0sXG5cblx0Y2xlYXI6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fbG9nbykge1xuXHRcdFx0dGhpcy5yZXNpemUodGhpcy5fbG9nby53aWR0aCwgdGhpcy5fbG9nby5oZWlnaHQpO1xuXHRcdFx0dGhpcy5ibGl0U3RyaW5nSW1hZ2UodGhpcy5fbG9nby5kYXRhLCAwLCAwKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKGJyb3dzZXIubXNpZSAmJiBwYXJzZUludChicm93c2VyLnZlcnNpb24pID09PSAxMCkge1xuXHRcdFx0XHQvLyBOQihkaXJlY3R4bWFuMTIpOiB0aGVyZSdzIGEgYnVnIGluIElFMTAgd2hlcmUgd2UgY2FuIGZhaWwgdG8gYWN0dWFsbHlcblx0XHRcdFx0Ly8gICAgICAgICAgICAgICAgICAgY2xlYXIgdGhlIGNhbnZhcyBoZXJlIGJlY2F1c2Ugb2YgdGhlIHJlc2l6ZS5cblx0XHRcdFx0Ly8gICAgICAgICAgICAgICAgICAgQ2xlYXJpbmcgdGhlIGN1cnJlbnQgdmlld3BvcnQgZmlyc3QgZml4ZXMgdGhlIGlzc3VlXG5cdFx0XHRcdHRoaXMuX2RyYXdDdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuX3ZpZXdwb3J0TG9jLncsIHRoaXMuX3ZpZXdwb3J0TG9jLmgpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5yZXNpemUoMjQwLCAyMCk7XG5cdFx0XHR0aGlzLl9kcmF3Q3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLl92aWV3cG9ydExvYy53LCB0aGlzLl92aWV3cG9ydExvYy5oKTtcblx0XHR9XG5cblx0XHR0aGlzLl9yZW5kZXJRID0gW107XG5cdH0sXG5cblx0ZmlsbFJlY3Q6IGZ1bmN0aW9uICh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjb2xvcikge1xuXHRcdHRoaXMuX3NldEZpbGxDb2xvcihjb2xvcik7XG5cdFx0dGhpcy5fZHJhd0N0eC5maWxsUmVjdCh4IC0gdGhpcy5fdmlld3BvcnRMb2MueCwgeSAtIHRoaXMuX3ZpZXdwb3J0TG9jLnksIHdpZHRoLCBoZWlnaHQpO1xuXHR9LFxuXG5cdGNvcHlJbWFnZTogZnVuY3Rpb24gKG9sZF94LCBvbGRfeSwgbmV3X3gsIG5ld195LCB3LCBoKSB7XG5cdFx0dmFyIHgxID0gb2xkX3ggLSB0aGlzLl92aWV3cG9ydExvYy54O1xuXHRcdHZhciB5MSA9IG9sZF95IC0gdGhpcy5fdmlld3BvcnRMb2MueTtcblx0XHR2YXIgeDIgPSBuZXdfeCAtIHRoaXMuX3ZpZXdwb3J0TG9jLng7XG5cdFx0dmFyIHkyID0gbmV3X3kgLSB0aGlzLl92aWV3cG9ydExvYy55O1xuXG5cdFx0dGhpcy5fZHJhd0N0eC5kcmF3SW1hZ2UodGhpcy5fdGFyZ2V0LCB4MSwgeTEsIHcsIGgsIHgyLCB5MiwgdywgaCk7XG5cdH0sXG5cblx0Ly8gc3RhcnQgdXBkYXRpbmcgYSB0aWxlXG5cdHN0YXJ0VGlsZTogZnVuY3Rpb24gKHgsIHksIHdpZHRoLCBoZWlnaHQsIGNvbG9yKSB7XG5cdFx0dGhpcy5fdGlsZV94ID0geDtcblx0XHR0aGlzLl90aWxlX3kgPSB5O1xuXHRcdGlmICh3aWR0aCA9PT0gMTYgJiYgaGVpZ2h0ID09PSAxNikge1xuXHRcdFx0dGhpcy5fdGlsZSA9IHRoaXMuX3RpbGUxNngxNjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fdGlsZSA9IHRoaXMuX2RyYXdDdHguY3JlYXRlSW1hZ2VEYXRhKHdpZHRoLCBoZWlnaHQpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9wcmVmZXJfanMpIHtcblx0XHRcdHZhciBiZ3I7XG5cdFx0XHRpZiAodGhpcy5fdHJ1ZV9jb2xvcikge1xuXHRcdFx0XHRiZ3IgPSBjb2xvcjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGJnciA9IHRoaXMuX2NvbG91ck1hcFtjb2xvclswXV07XG5cdFx0XHR9XG5cdFx0XHR2YXIgcmVkID0gYmdyWzJdO1xuXHRcdFx0dmFyIGdyZWVuID0gYmdyWzFdO1xuXHRcdFx0dmFyIGJsdWUgPSBiZ3JbMF07XG5cblx0XHRcdHZhciBkYXRhID0gdGhpcy5fdGlsZS5kYXRhO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB3aWR0aCAqIGhlaWdodCAqIDQ7IGkgKz0gNCkge1xuXHRcdFx0XHRkYXRhW2ldID0gcmVkO1xuXHRcdFx0XHRkYXRhW2kgKyAxXSA9IGdyZWVuO1xuXHRcdFx0XHRkYXRhW2kgKyAyXSA9IGJsdWU7XG5cdFx0XHRcdGRhdGFbaSArIDNdID0gMjU1O1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmZpbGxSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQsIGNvbG9yKTtcblx0XHR9XG5cdH0sXG5cblx0Ly8gdXBkYXRlIHN1Yi1yZWN0YW5nbGUgb2YgdGhlIGN1cnJlbnQgdGlsZVxuXHRzdWJUaWxlOiBmdW5jdGlvbiAoeCwgeSwgdywgaCwgY29sb3IpIHtcblx0XHRpZiAodGhpcy5fcHJlZmVyX2pzKSB7XG5cdFx0XHR2YXIgYmdyO1xuXHRcdFx0aWYgKHRoaXMuX3RydWVfY29sb3IpIHtcblx0XHRcdFx0YmdyID0gY29sb3I7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRiZ3IgPSB0aGlzLl9jb2xvdXJNYXBbY29sb3JbMF1dO1xuXHRcdFx0fVxuXHRcdFx0dmFyIHJlZCA9IGJnclsyXTtcblx0XHRcdHZhciBncmVlbiA9IGJnclsxXTtcblx0XHRcdHZhciBibHVlID0gYmdyWzBdO1xuXHRcdFx0dmFyIHhlbmQgPSB4ICsgdztcblx0XHRcdHZhciB5ZW5kID0geSArIGg7XG5cblx0XHRcdHZhciBkYXRhID0gdGhpcy5fdGlsZS5kYXRhO1xuXHRcdFx0dmFyIHdpZHRoID0gdGhpcy5fdGlsZS53aWR0aDtcblx0XHRcdGZvciAodmFyIGogPSB5OyBqIDwgeWVuZDsgaisrKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSB4OyBpIDwgeGVuZDsgaSsrKSB7XG5cdFx0XHRcdFx0dmFyIHAgPSAoaSArIChqICogd2lkdGgpKSAqIDQ7XG5cdFx0XHRcdFx0ZGF0YVtwXSA9IHJlZDtcblx0XHRcdFx0XHRkYXRhW3AgKyAxXSA9IGdyZWVuO1xuXHRcdFx0XHRcdGRhdGFbcCArIDJdID0gYmx1ZTtcblx0XHRcdFx0XHRkYXRhW3AgKyAzXSA9IDI1NTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmZpbGxSZWN0KHRoaXMuX3RpbGVfeCArIHgsIHRoaXMuX3RpbGVfeSArIHksIHcsIGgsIGNvbG9yKTtcblx0XHR9XG5cdH0sXG5cblx0Ly8gZHJhdyB0aGUgY3VycmVudCB0aWxlIHRvIHRoZSBzY3JlZW5cblx0ZmluaXNoVGlsZTogZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLl9wcmVmZXJfanMpIHtcblx0XHRcdHRoaXMuX2RyYXdDdHgucHV0SW1hZ2VEYXRhKHRoaXMuX3RpbGUsIHRoaXMuX3RpbGVfeCAtIHRoaXMuX3ZpZXdwb3J0TG9jLngsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCB0aGlzLl90aWxlX3kgLSB0aGlzLl92aWV3cG9ydExvYy55KTtcblx0XHR9XG5cdFx0Ly8gZWxzZTogTm8tb3AgLS0gYWxyZWFkeSBkb25lIGJ5IHNldFN1YlRpbGVcblx0fSxcblxuXHRibGl0SW1hZ2U6IGZ1bmN0aW9uICh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBhcnIsIG9mZnNldCkge1xuXHRcdGlmICh0aGlzLl90cnVlX2NvbG9yKSB7XG5cdFx0XHR0aGlzLl9iZ3J4SW1hZ2VEYXRhKHgsIHksIHRoaXMuX3ZpZXdwb3J0TG9jLngsIHRoaXMuX3ZpZXdwb3J0TG9jLnksIHdpZHRoLCBoZWlnaHQsIGFyciwgb2Zmc2V0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fY21hcEltYWdlRGF0YSh4LCB5LCB0aGlzLl92aWV3cG9ydExvYy54LCB0aGlzLl92aWV3cG9ydExvYy55LCB3aWR0aCwgaGVpZ2h0LCBhcnIsIG9mZnNldCk7XG5cdFx0fVxuXHR9LFxuXG5cdGJsaXRSZ2JJbWFnZTogZnVuY3Rpb24gKHgsIHkgLCB3aWR0aCwgaGVpZ2h0LCBhcnIsIG9mZnNldCkge1xuXHRcdGlmICh0aGlzLl90cnVlX2NvbG9yKSB7XG5cdFx0XHR0aGlzLl9yZ2JJbWFnZURhdGEoeCwgeSwgdGhpcy5fdmlld3BvcnRMb2MueCwgdGhpcy5fdmlld3BvcnRMb2MueSwgd2lkdGgsIGhlaWdodCwgYXJyLCBvZmZzZXQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwcm9iYWJseSB3cm9uZz9cblx0XHRcdHRoaXMuX2NtYXBJbWFnZURhdGEoeCwgeSwgdGhpcy5fdmlld3BvcnRMb2MueCwgdGhpcy5fdmlld3BvcnRMb2MueSwgd2lkdGgsIGhlaWdodCwgYXJyLCBvZmZzZXQpO1xuXHRcdH1cblx0fSxcblxuXHRibGl0U3RyaW5nSW1hZ2U6IGZ1bmN0aW9uIChzdHIsIHgsIHkpIHtcblx0XHR2YXIgaW1nID0gbmV3IEltYWdlKCk7XG5cdFx0aW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuX2RyYXdDdHguZHJhd0ltYWdlKGltZywgeCAtIHRoaXMuX3ZpZXdwb3J0TG9jLngsIHkgLSB0aGlzLl92aWV3cG9ydExvYy55KTtcblx0XHR9LmJpbmQodGhpcyk7XG5cdFx0aW1nLnNyYyA9IHN0cjtcblx0XHRyZXR1cm4gaW1nOyAvLyBmb3IgZGVidWdnaW5nIHB1cnBvc2VzXG5cdH0sXG5cblx0Ly8gd3JhcCBjdHguZHJhd0ltYWdlIGJ1dCByZWxhdGl2ZSB0byB2aWV3cG9ydFxuXHRkcmF3SW1hZ2U6IGZ1bmN0aW9uIChpbWcsIHgsIHkpIHtcblx0XHR0aGlzLl9kcmF3Q3R4LmRyYXdJbWFnZShpbWcsIHggLSB0aGlzLl92aWV3cG9ydExvYy54LCB5IC0gdGhpcy5fdmlld3BvcnRMb2MueSk7XG5cdH0sXG5cblx0cmVuZGVyUV9wdXNoOiBmdW5jdGlvbiAoYWN0aW9uKSB7XG5cdFx0dGhpcy5fcmVuZGVyUS5wdXNoKGFjdGlvbik7XG5cdFx0aWYgKHRoaXMuX3JlbmRlclEubGVuZ3RoID09PSAxKSB7XG5cdFx0XHQvLyBJZiB0aGlzIGNhbiBiZSByZW5kZXJlZCBpbW1lZGlhdGVseSBpdCB3aWxsIGJlLCBvdGhlcndpc2Vcblx0XHRcdC8vIHRoZSBzY2FubmVyIHdpbGwgc3RhcnQgcG9sbGluZyB0aGUgcXVldWUgKGV2ZXJ5XG5cdFx0XHQvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgaW50ZXJ2YWwpXG5cdFx0XHR0aGlzLl9zY2FuX3JlbmRlclEoKTtcblx0XHR9XG5cdH0sXG5cblx0Y2hhbmdlQ3Vyc29yOiBmdW5jdGlvbiAocGl4ZWxzLCBtYXNrLCBob3R4LCBob3R5LCB3LCBoKSB7XG5cdFx0aWYgKHRoaXMuX2N1cnNvcl91cmkgPT09IGZhbHNlKSB7XG5cdFx0XHRkZWJ1Z2Vycm9yKCdjaGFuZ2VDdXJzb3IoKSB8IGNhbGxlZCBidXQgbm8gY3Vyc29yIGRhdGEgVVJJIHN1cHBvcnQnKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fdHJ1ZV9jb2xvcikge1xuXHRcdFx0RGlzcGxheS5jaGFuZ2VDdXJzb3IodGhpcy5fdGFyZ2V0LCBwaXhlbHMsIG1hc2ssIGhvdHgsIGhvdHksIHcsIGgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHREaXNwbGF5LmNoYW5nZUN1cnNvcih0aGlzLl90YXJnZXQsIHBpeGVscywgbWFzaywgaG90eCwgaG90eSwgdywgaCwgdGhpcy5fY29sb3VyTWFwKTtcblx0XHR9XG5cdH0sXG5cblx0ZGVmYXVsdEN1cnNvcjogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX3RhcmdldC5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG5cdH0sXG5cblx0ZGlzYWJsZUxvY2FsQ3Vyc29yOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fdGFyZ2V0LnN0eWxlLmN1cnNvciA9ICdub25lJztcblx0fSxcblxuXHRjbGlwcGluZ0Rpc3BsYXk6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgdnAgPSB0aGlzLl92aWV3cG9ydExvYztcblxuXHRcdHZhciBmYkNsaXAgPSB0aGlzLl9mYl93aWR0aCA+IHZwLncgfHwgdGhpcy5fZmJfaGVpZ2h0ID4gdnAuaDtcblx0XHR2YXIgbGltaXRlZFZwID0gdGhpcy5fbWF4V2lkdGggIT09IDAgJiYgdGhpcy5fbWF4SGVpZ2h0ICE9PSAwO1xuXHRcdHZhciBjbGlwcGluZyA9IGZhbHNlO1xuXG5cdFx0aWYgKGxpbWl0ZWRWcCkge1xuXHRcdFx0Y2xpcHBpbmcgPSB2cC53ID4gdGhpcy5fbWF4V2lkdGggfHwgdnAuaCA+IHRoaXMuX21heEhlaWdodDtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmJDbGlwIHx8IChsaW1pdGVkVnAgJiYgY2xpcHBpbmcpO1xuXHR9LFxuXG5cdC8vIE92ZXJyaWRkZW4gZ2V0dGVycy9zZXR0ZXJzXG5cdGdldF9jb250ZXh0OiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2RyYXdDdHg7XG5cdH0sXG5cblx0c2V0X3NjYWxlOiBmdW5jdGlvbiAoc2NhbGUpIHtcblx0XHR0aGlzLl9yZXNjYWxlKHNjYWxlKTtcblx0fSxcblxuXHRzZXRfd2lkdGg6IGZ1bmN0aW9uICh3KSB7XG5cdFx0dGhpcy5fZmJfd2lkdGggPSB3O1xuXHR9LFxuXG5cdGdldF93aWR0aDogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9mYl93aWR0aDtcblx0fSxcblxuXHRzZXRfaGVpZ2h0OiBmdW5jdGlvbiAoaCkge1xuXHRcdHRoaXMuX2ZiX2hlaWdodCA9ICBoO1xuXHR9LFxuXG5cdGdldF9oZWlnaHQ6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5fZmJfaGVpZ2h0O1xuXHR9LFxuXG5cdGF1dG9zY2FsZTogZnVuY3Rpb24gKGNvbnRhaW5lcldpZHRoLCBjb250YWluZXJIZWlnaHQsIGRvd25zY2FsZU9ubHkpIHtcblx0XHR2YXIgdGFyZ2V0QXNwZWN0UmF0aW8gPSBjb250YWluZXJXaWR0aCAvIGNvbnRhaW5lckhlaWdodDtcblx0XHR2YXIgZmJBc3BlY3RSYXRpbyA9IHRoaXMuX2ZiX3dpZHRoIC8gdGhpcy5fZmJfaGVpZ2h0O1xuXG5cdFx0dmFyIHNjYWxlUmF0aW87XG5cdFx0aWYgKGZiQXNwZWN0UmF0aW8gPj0gdGFyZ2V0QXNwZWN0UmF0aW8pIHtcblx0XHRcdFx0c2NhbGVSYXRpbyA9IGNvbnRhaW5lcldpZHRoIC8gdGhpcy5fZmJfd2lkdGg7XG5cdFx0fSBlbHNlIHtcblx0XHRcdFx0c2NhbGVSYXRpbyA9IGNvbnRhaW5lckhlaWdodCAvIHRoaXMuX2ZiX2hlaWdodDtcblx0XHR9XG5cblx0XHR2YXIgdGFyZ2V0VywgdGFyZ2V0SDtcblx0XHRpZiAoc2NhbGVSYXRpbyA+IDEuMCAmJiBkb3duc2NhbGVPbmx5KSB7XG5cdFx0XHRcdHRhcmdldFcgPSB0aGlzLl9mYl93aWR0aDtcblx0XHRcdFx0dGFyZ2V0SCA9IHRoaXMuX2ZiX2hlaWdodDtcblx0XHRcdFx0c2NhbGVSYXRpbyA9IDEuMDtcblx0XHR9IGVsc2UgaWYgKGZiQXNwZWN0UmF0aW8gPj0gdGFyZ2V0QXNwZWN0UmF0aW8pIHtcblx0XHRcdFx0dGFyZ2V0VyA9IGNvbnRhaW5lcldpZHRoO1xuXHRcdFx0XHR0YXJnZXRIID0gTWF0aC5yb3VuZChjb250YWluZXJXaWR0aCAvIGZiQXNwZWN0UmF0aW8pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRhcmdldFcgPSBNYXRoLnJvdW5kKGNvbnRhaW5lckhlaWdodCAqIGZiQXNwZWN0UmF0aW8pO1xuXHRcdFx0XHR0YXJnZXRIID0gY29udGFpbmVySGVpZ2h0O1xuXHRcdH1cblxuXHRcdC8vIE5CKGRpcmVjdHhtYW4xMik6IElmIHlvdSBzZXQgdGhlIHdpZHRoIGRpcmVjdGx5LCBvciBzZXQgdGhlXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgc3R5bGUgd2lkdGggdG8gYSBudW1iZXIsIHRoZSBjYW52YXMgaXMgY2xlYXJlZC5cblx0XHQvLyAgICAgICAgICAgICAgICAgICBIb3dldmVyLCBpZiB5b3Ugc2V0IHRoZSBzdHlsZSB3aWR0aCB0byBhIHN0cmluZ1xuXHRcdC8vICAgICAgICAgICAgICAgICAgICgnTk5OcHgnKSwgdGhlIGNhbnZhcyBpcyBzY2FsZWQgd2l0aG91dCBjbGVhcmluZy5cblx0XHR0aGlzLl90YXJnZXQuc3R5bGUud2lkdGggPSB0YXJnZXRXICsgJ3B4Jztcblx0XHR0aGlzLl90YXJnZXQuc3R5bGUuaGVpZ2h0ID0gdGFyZ2V0SCArICdweCc7XG5cblx0XHR0aGlzLl9zY2FsZSA9IHNjYWxlUmF0aW87XG5cblx0XHRyZXR1cm4gc2NhbGVSYXRpbzsgIC8vIHNvIHRoYXQgdGhlIG1vdXNlLCBldGMgc2NhbGUgY2FuIGJlIHNldFxuXHR9LFxuXG5cdC8vIFByaXZhdGUgTWV0aG9kc1xuXG5cdF9yZXNjYWxlOiBmdW5jdGlvbiAoZmFjdG9yKSB7XG5cdFx0dGhpcy5fc2NhbGUgPSBmYWN0b3I7XG5cblx0XHR2YXIgdztcblx0XHR2YXIgaDtcblxuXHRcdGlmICh0aGlzLl92aWV3cG9ydCAmJlxuXHRcdFx0dGhpcy5fbWF4V2lkdGggIT09IDAgJiYgdGhpcy5fbWF4SGVpZ2h0ICE9PSAwKSB7XG5cdFx0XHR3ID0gTWF0aC5taW4odGhpcy5fZmJfd2lkdGgsIHRoaXMuX21heFdpZHRoKTtcblx0XHRcdGggPSBNYXRoLm1pbih0aGlzLl9mYl9oZWlnaHQsIHRoaXMuX21heEhlaWdodCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHcgPSB0aGlzLl9mYl93aWR0aDtcblx0XHRcdGggPSB0aGlzLl9mYl9oZWlnaHQ7XG5cdFx0fVxuXG5cdFx0dGhpcy5fdGFyZ2V0LnN0eWxlLndpZHRoID0gTWF0aC5yb3VuZChmYWN0b3IgKiB3KSArICdweCc7XG5cdFx0dGhpcy5fdGFyZ2V0LnN0eWxlLmhlaWdodCA9IE1hdGgucm91bmQoZmFjdG9yICogaCkgKyAncHgnO1xuXHR9LFxuXG5cdF9zZXRGaWxsQ29sb3I6IGZ1bmN0aW9uIChjb2xvcikge1xuXHRcdHZhciBiZ3I7XG5cdFx0aWYgKHRoaXMuX3RydWVfY29sb3IpIHtcblx0XHRcdGJnciA9IGNvbG9yO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRiZ3IgPSB0aGlzLl9jb2xvdXJNYXBbY29sb3JbMF1dO1xuXHRcdH1cblxuXHRcdHZhciBuZXdTdHlsZSA9ICdyZ2IoJyArIGJnclsyXSArICcsJyArIGJnclsxXSArICcsJyArIGJnclswXSArICcpJztcblx0XHRpZiAobmV3U3R5bGUgIT09IHRoaXMuX3ByZXZEcmF3U3R5bGUpIHtcblx0XHRcdHRoaXMuX2RyYXdDdHguZmlsbFN0eWxlID0gbmV3U3R5bGU7XG5cdFx0XHR0aGlzLl9wcmV2RHJhd1N0eWxlID0gbmV3U3R5bGU7XG5cdFx0fVxuXHR9LFxuXG5cdF9yZ2JJbWFnZURhdGE6IGZ1bmN0aW9uICh4LCB5LCB2eCwgdnksIHdpZHRoLCBoZWlnaHQsIGFyciwgb2Zmc2V0KSB7XG5cdFx0dmFyIGltZyA9IHRoaXMuX2RyYXdDdHguY3JlYXRlSW1hZ2VEYXRhKHdpZHRoLCBoZWlnaHQpO1xuXHRcdHZhciBkYXRhID0gaW1nLmRhdGE7XG5cblx0XHRmb3IgKHZhciBpID0gMCwgaiA9IG9mZnNldDsgaSA8IHdpZHRoICogaGVpZ2h0ICogNDsgaSArPSA0LCBqICs9IDMpIHtcblx0XHRcdGRhdGFbaV0gICAgID0gYXJyW2pdO1xuXHRcdFx0ZGF0YVtpICsgMV0gPSBhcnJbaiArIDFdO1xuXHRcdFx0ZGF0YVtpICsgMl0gPSBhcnJbaiArIDJdO1xuXHRcdFx0ZGF0YVtpICsgM10gPSAyNTU7ICAvLyBBbHBoYVxuXHRcdH1cblx0XHR0aGlzLl9kcmF3Q3R4LnB1dEltYWdlRGF0YShpbWcsIHggLSB2eCwgeSAtIHZ5KTtcblx0fSxcblxuXHRfYmdyeEltYWdlRGF0YTogZnVuY3Rpb24gKHgsIHksIHZ4LCB2eSwgd2lkdGgsIGhlaWdodCwgYXJyLCBvZmZzZXQpIHtcblx0XHR2YXIgaW1nID0gdGhpcy5fZHJhd0N0eC5jcmVhdGVJbWFnZURhdGEod2lkdGgsIGhlaWdodCk7XG5cdFx0dmFyIGRhdGEgPSBpbWcuZGF0YTtcblx0XHRmb3IgKHZhciBpID0gMCwgaiA9IG9mZnNldDsgaSA8IHdpZHRoICogaGVpZ2h0ICogNDsgaSArPSA0LCBqICs9IDQpIHtcblx0XHRcdGRhdGFbaV0gICAgID0gYXJyW2ogKyAyXTtcblx0XHRcdGRhdGFbaSArIDFdID0gYXJyW2ogKyAxXTtcblx0XHRcdGRhdGFbaSArIDJdID0gYXJyW2pdO1xuXHRcdFx0ZGF0YVtpICsgM10gPSAyNTU7ICAvLyBBbHBoYVxuXHRcdH1cblx0XHR0aGlzLl9kcmF3Q3R4LnB1dEltYWdlRGF0YShpbWcsIHggLSB2eCwgeSAtIHZ5KTtcblx0fSxcblxuXHRfY21hcEltYWdlRGF0YTogZnVuY3Rpb24gKHgsIHksIHZ4LCB2eSwgd2lkdGgsIGhlaWdodCwgYXJyLCBvZmZzZXQpIHtcblx0XHR2YXIgaW1nID0gdGhpcy5fZHJhd0N0eC5jcmVhdGVJbWFnZURhdGEod2lkdGgsIGhlaWdodCk7XG5cdFx0dmFyIGRhdGEgPSBpbWcuZGF0YTtcblx0XHR2YXIgY21hcCA9IHRoaXMuX2NvbG91ck1hcDtcblx0XHRmb3IgKHZhciBpID0gMCwgaiA9IG9mZnNldDsgaSA8IHdpZHRoICogaGVpZ2h0ICogNDsgaSArPSA0LCBqKyspIHtcblx0XHRcdHZhciBiZ3IgPSBjbWFwW2FycltqXV07XG5cdFx0XHRkYXRhW2ldICAgICA9IGJnclsyXTtcblx0XHRcdGRhdGFbaSArIDFdID0gYmdyWzFdO1xuXHRcdFx0ZGF0YVtpICsgMl0gPSBiZ3JbMF07XG5cdFx0XHRkYXRhW2kgKyAzXSA9IDI1NTsgIC8vIEFscGhhXG5cdFx0fVxuXHRcdHRoaXMuX2RyYXdDdHgucHV0SW1hZ2VEYXRhKGltZywgeCAtIHZ4LCB5IC0gdnkpO1xuXHR9LFxuXG5cdF9zY2FuX3JlbmRlclE6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgcmVhZHkgPSB0cnVlO1xuXHRcdHdoaWxlIChyZWFkeSAmJiB0aGlzLl9yZW5kZXJRLmxlbmd0aCA+IDApIHtcblx0XHRcdHZhciBhID0gdGhpcy5fcmVuZGVyUVswXTtcblx0XHRcdHN3aXRjaCAoYS50eXBlKSB7XG5cdFx0XHRcdGNhc2UgJ2NvcHknOlxuXHRcdFx0XHRcdHRoaXMuY29weUltYWdlKGEub2xkX3gsIGEub2xkX3ksIGEueCwgYS55LCBhLndpZHRoLCBhLmhlaWdodCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2ZpbGwnOlxuXHRcdFx0XHRcdHRoaXMuZmlsbFJlY3QoYS54LCBhLnksIGEud2lkdGgsIGEuaGVpZ2h0LCBhLmNvbG9yKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnYmxpdCc6XG5cdFx0XHRcdFx0dGhpcy5ibGl0SW1hZ2UoYS54LCBhLnksIGEud2lkdGgsIGEuaGVpZ2h0LCBhLmRhdGEsIDApO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdibGl0UmdiJzpcblx0XHRcdFx0XHR0aGlzLmJsaXRSZ2JJbWFnZShhLngsIGEueSwgYS53aWR0aCwgYS5oZWlnaHQsIGEuZGF0YSwgMCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2ltZyc6XG5cdFx0XHRcdFx0aWYgKGEuaW1nLmNvbXBsZXRlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRyYXdJbWFnZShhLmltZywgYS54LCBhLnkpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvLyBXZSBuZWVkIHRvIHdhaXQgZm9yIHRoaXMgaW1hZ2UgdG8gJ2xvYWQnXG5cdFx0XHRcdFx0XHQvLyB0byBrZWVwIHRoaW5ncyBpbi1vcmRlclxuXHRcdFx0XHRcdFx0cmVhZHkgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChyZWFkeSkge1xuXHRcdFx0XHR0aGlzLl9yZW5kZXJRLnNoaWZ0KCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX3JlbmRlclEubGVuZ3RoID4gMCkge1xuXHRcdFx0VXRpbC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fc2Nhbl9yZW5kZXJRLmJpbmQodGhpcykpO1xuXHRcdH1cblx0fSxcbn07XG5cblxuVXRpbC5tYWtlX3Byb3BlcnRpZXMoRGlzcGxheSwgW1xuXHRbJ3RhcmdldCcsICd3bycsICdkb20nXSwgICAgICAgLy8gQ2FudmFzIGVsZW1lbnQgZm9yIHJlbmRlcmluZ1xuXHRbJ2NvbnRleHQnLCAncm8nLCAncmF3J10sICAgICAgLy8gQ2FudmFzIDJEIGNvbnRleHQgZm9yIHJlbmRlcmluZyAocmVhZC1vbmx5KVxuXHRbJ2xvZ28nLCAncncnLCAncmF3J10sICAgICAgICAgLy8gTG9nbyB0byBkaXNwbGF5IHdoZW4gY2xlYXJlZDogeyd3aWR0aCc6IHcsICdoZWlnaHQnOiBoLCAnZGF0YSc6IGRhdGF9XG5cdFsndHJ1ZV9jb2xvcicsICdydycsICdib29sJ10sICAvLyBVc2UgdHJ1ZS1jb2xvciBwaXhlbCBkYXRhXG5cdFsnY29sb3VyTWFwJywgJ3J3JywgJ2FyciddLCAgICAvLyBDb2xvdXIgbWFwIGFycmF5ICh3aGVuIG5vdCB0cnVlLWNvbG9yKVxuXHRbJ3NjYWxlJywgJ3J3JywgJ2Zsb2F0J10sICAgICAgLy8gRGlzcGxheSBhcmVhIHNjYWxlIGZhY3RvciAwLjAgLSAxLjBcblx0Wyd2aWV3cG9ydCcsICdydycsICdib29sJ10sICAgIC8vIFVzZSB2aWV3cG9ydCBjbGlwcGluZ1xuXHRbJ3dpZHRoJywgJ3J3JywgJ2ludCddLCAgICAgICAgLy8gRGlzcGxheSBhcmVhIHdpZHRoXG5cdFsnaGVpZ2h0JywgJ3J3JywgJ2ludCddLCAgICAgICAvLyBEaXNwbGF5IGFyZWEgaGVpZ2h0XG5cdFsnbWF4V2lkdGgnLCAncncnLCAnaW50J10sICAgICAvLyBWaWV3cG9ydCBtYXggd2lkdGggKDAgaWYgZGlzYWJsZWQpXG5cdFsnbWF4SGVpZ2h0JywgJ3J3JywgJ2ludCddLCAgICAvLyBWaWV3cG9ydCBtYXggaGVpZ2h0ICgwIGlmIGRpc2FibGVkKVxuXG5cdFsncmVuZGVyX21vZGUnLCAncm8nLCAnc3RyJ10sICAvLyBDYW52YXMgcmVuZGVyaW5nIG1vZGUgKHJlYWQtb25seSlcblxuXHRbJ3ByZWZlcl9qcycsICdydycsICdzdHInXSwgICAgLy8gUHJlZmVyIEphdmFzY3JpcHQgb3ZlciBjYW52YXMgbWV0aG9kc1xuXHRbJ2N1cnNvcl91cmknLCAncncnLCAncmF3J10gICAgLy8gQ2FuIHdlIHJlbmRlciBjdXJzb3IgdXNpbmcgZGF0YSBVUklcbl0pO1xuXG5cbi8vIENsYXNzIE1ldGhvZHNcbkRpc3BsYXkuY2hhbmdlQ3Vyc29yID0gZnVuY3Rpb24gKHRhcmdldCwgcGl4ZWxzLCBtYXNrLCBob3R4LCBob3R5LCB3MCwgaDAsIGNtYXApIHtcblx0dmFyIHcgPSB3MDtcblx0dmFyIGggPSBoMDtcblx0aWYgKGggPCB3KSB7XG5cdFx0aCA9IHc7ICAvLyBpbmNyZWFzZSBoIHRvIG1ha2UgaXQgc3F1YXJlXG5cdH0gZWxzZSB7XG5cdFx0dyA9IGg7ICAvLyBpbmNyZWFzZSB3IHRvIG1ha2UgaXQgc3F1YXJlXG5cdH1cblxuXHR2YXIgY3VyID0gW107XG5cblx0Ly8gUHVzaCBtdWx0aS1ieXRlIGxpdHRsZS1lbmRpYW4gdmFsdWVzXG5cdGN1ci5wdXNoMTZsZSA9IGZ1bmN0aW9uIChudW0pIHtcblx0XHR0aGlzLnB1c2gobnVtICYgMHhGRiwgKG51bSA+PiA4KSAmIDB4RkYpO1xuXHR9O1xuXHRjdXIucHVzaDMybGUgPSBmdW5jdGlvbiAobnVtKSB7XG5cdFx0dGhpcy5wdXNoKG51bSAmIDB4RkYsXG5cdFx0XHRcdFx0KG51bSA+PiA4KSAmIDB4RkYsXG5cdFx0XHRcdFx0KG51bSA+PiAxNikgJiAweEZGLFxuXHRcdFx0XHRcdChudW0gPj4gMjQpICYgMHhGRik7XG5cdH07XG5cblx0dmFyIElIRFJzeiA9IDQwO1xuXHR2YXIgUkdCc3ogPSB3ICogaCAqIDQ7XG5cdHZhciBYT1JzeiA9IE1hdGguY2VpbCgodyAqIGgpIC8gOC4wKTtcblx0dmFyIEFORHN6ID0gTWF0aC5jZWlsKCh3ICogaCkgLyA4LjApO1xuXG5cdGN1ci5wdXNoMTZsZSgwKTsgICAgICAgIC8vIDA6IFJlc2VydmVkXG5cdGN1ci5wdXNoMTZsZSgyKTsgICAgICAgIC8vIDI6IC5DVVIgdHlwZVxuXHRjdXIucHVzaDE2bGUoMSk7ICAgICAgICAvLyA0OiBOdW1iZXIgb2YgaW1hZ2VzLCAxIGZvciBub24tYW5pbWF0ZWQgaWNvXG5cblx0Ly8gQ3Vyc29yICMxIGhlYWRlciAoSUNPTkRJUkVOVFJZKVxuXHRjdXIucHVzaCh3KTsgICAgICAgICAgICAvLyA2OiB3aWR0aFxuXHRjdXIucHVzaChoKTsgICAgICAgICAgICAvLyA3OiBoZWlnaHRcblx0Y3VyLnB1c2goMCk7ICAgICAgICAgICAgLy8gODogY29sb3JzLCAwIC0+IHRydWUtY29sb3Jcblx0Y3VyLnB1c2goMCk7ICAgICAgICAgICAgLy8gOTogcmVzZXJ2ZWRcblx0Y3VyLnB1c2gxNmxlKGhvdHgpOyAgICAgLy8gMTA6IGhvdHNwb3QgeCBjb29yZGluYXRlXG5cdGN1ci5wdXNoMTZsZShob3R5KTsgICAgIC8vIDEyOiBob3RzcG90IHkgY29vcmRpbmF0ZVxuXHRjdXIucHVzaDMybGUoSUhEUnN6ICsgUkdCc3ogKyBYT1JzeiArIEFORHN6KTtcblx0XHRcdFx0XHRcdFx0Ly8gMTQ6IGN1cnNvciBkYXRhIGJ5dGUgc2l6ZVxuXHRjdXIucHVzaDMybGUoMjIpOyAgICAgICAvLyAxODogb2Zmc2V0IG9mIGN1cnNvciBkYXRhIGluIHRoZSBmaWxlXG5cblx0Ly8gQ3Vyc29yICMxIEluZm9IZWFkZXIgKElDT05JTUFHRS9CSVRNQVBJTkZPKVxuXHRjdXIucHVzaDMybGUoSUhEUnN6KTsgICAvLyAyMjogSW5mb0hlYWRlciBzaXplXG5cdGN1ci5wdXNoMzJsZSh3KTsgICAgICAgIC8vIDI2OiBDdXJzb3Igd2lkdGhcblx0Y3VyLnB1c2gzMmxlKGggKiAyKTsgICAgLy8gMzA6IFhPUitBTkQgaGVpZ2h0XG5cdGN1ci5wdXNoMTZsZSgxKTsgICAgICAgIC8vIDM0OiBudW1iZXIgb2YgcGxhbmVzXG5cdGN1ci5wdXNoMTZsZSgzMik7ICAgICAgIC8vIDM2OiBiaXRzIHBlciBwaXhlbFxuXHRjdXIucHVzaDMybGUoMCk7ICAgICAgICAvLyAzODogVHlwZSBvZiBjb21wcmVzc2lvblxuXG5cdGN1ci5wdXNoMzJsZShYT1JzeiArIEFORHN6KTtcblx0XHRcdFx0XHRcdFx0Ly8gNDI6IFNpemUgb2YgSW1hZ2Vcblx0Y3VyLnB1c2gzMmxlKDApOyAgICAgICAgLy8gNDY6IHJlc2VydmVkXG5cdGN1ci5wdXNoMzJsZSgwKTsgICAgICAgIC8vIDUwOiByZXNlcnZlZFxuXHRjdXIucHVzaDMybGUoMCk7ICAgICAgICAvLyA1NDogcmVzZXJ2ZWRcblx0Y3VyLnB1c2gzMmxlKDApOyAgICAgICAgLy8gNTg6IHJlc2VydmVkXG5cblx0Ly8gNjI6IGNvbG9yIGRhdGEgKFJHQlFVQUQgaWNDb2xvcnNbXSlcblx0dmFyIHksIHg7XG5cdGZvciAoeSA9IGggLSAxOyB5ID49IDA7IHktLSkge1xuXHRcdGZvciAoeCA9IDA7IHggPCB3OyB4KyspIHtcblx0XHRcdGlmICh4ID49IHcwIHx8IHkgPj0gaDApIHtcblx0XHRcdFx0Y3VyLnB1c2goMCk7ICAvLyBibHVlXG5cdFx0XHRcdGN1ci5wdXNoKDApOyAgLy8gZ3JlZW5cblx0XHRcdFx0Y3VyLnB1c2goMCk7ICAvLyByZWRcblx0XHRcdFx0Y3VyLnB1c2goMCk7ICAvLyBhbHBoYVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFyIGlkeCA9IHkgKiBNYXRoLmNlaWwodzAgLyA4KSArIE1hdGguZmxvb3IoeCAvIDgpO1xuXHRcdFx0XHR2YXIgYWxwaGEgPSAobWFza1tpZHhdIDw8ICh4ICUgOCkpICYgMHg4MCA/IDI1NSA6IDA7XG5cdFx0XHRcdGlmIChjbWFwKSB7XG5cdFx0XHRcdFx0aWR4ID0gKHcwICogeSkgKyB4O1xuXHRcdFx0XHRcdHZhciByZ2IgPSBjbWFwW3BpeGVsc1tpZHhdXTtcblx0XHRcdFx0XHRjdXIucHVzaChyZ2JbMl0pOyAgLy8gYmx1ZVxuXHRcdFx0XHRcdGN1ci5wdXNoKHJnYlsxXSk7ICAvLyBncmVlblxuXHRcdFx0XHRcdGN1ci5wdXNoKHJnYlswXSk7ICAvLyByZWRcblx0XHRcdFx0XHRjdXIucHVzaChhbHBoYSk7ICAgLy8gYWxwaGFcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZHggPSAoKHcwICogeSkgKyB4KSAqIDQ7XG5cdFx0XHRcdFx0Y3VyLnB1c2gocGl4ZWxzW2lkeCArIDJdKTsgLy8gYmx1ZVxuXHRcdFx0XHRcdGN1ci5wdXNoKHBpeGVsc1tpZHggKyAxXSk7IC8vIGdyZWVuXG5cdFx0XHRcdFx0Y3VyLnB1c2gocGl4ZWxzW2lkeF0pOyAgICAgLy8gcmVkXG5cdFx0XHRcdFx0Y3VyLnB1c2goYWxwaGEpOyAgICAgICAgICAgLy8gYWxwaGFcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFhPUi9iaXRtYXNrIGRhdGEgKEJZVEUgaWNYT1JbXSlcblx0Ly8gKGlnbm9yZWQsIGp1c3QgbmVlZHMgdG8gYmUgdGhlIHJpZ2h0IHNpemUpXG5cdGZvciAoeSA9IDA7IHkgPCBoOyB5KyspIHtcblx0XHRmb3IgKHggPSAwOyB4IDwgTWF0aC5jZWlsKHcgLyA4KTsgeCsrKSB7XG5cdFx0XHRjdXIucHVzaCgwKTtcblx0XHR9XG5cdH1cblxuXHQvLyBBTkQvYml0bWFzayBkYXRhIChCWVRFIGljQU5EW10pXG5cdC8vIChpZ25vcmVkLCBqdXN0IG5lZWRzIHRvIGJlIHRoZSByaWdodCBzaXplKVxuXHRmb3IgKHkgPSAwOyB5IDwgaDsgeSsrKSB7XG5cdFx0Zm9yICh4ID0gMDsgeCA8IE1hdGguY2VpbCh3IC8gOCk7IHgrKykge1xuXHRcdFx0Y3VyLnB1c2goMCk7XG5cdFx0fVxuXHR9XG5cblx0dmFyIHVybCA9ICdkYXRhOmltYWdlL3gtaWNvbjtiYXNlNjQsJyArIEJhc2U2NC5lbmNvZGUoY3VyKTtcblx0dGFyZ2V0LnN0eWxlLmN1cnNvciA9ICd1cmwoJyArIHVybCArICcpJyArIGhvdHggKyAnICcgKyBob3R5ICsgJywgZGVmYXVsdCc7XG59O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuLypcbiAqIG5vVk5DOiBIVE1MNSBWTkMgY2xpZW50XG4gKiBDb3B5cmlnaHQgKEMpIDIwMTIgSm9lbCBNYXJ0aW5cbiAqIENvcHlyaWdodCAoQykgMjAxMyBTYW11ZWwgTWFubmVoZWQgZm9yIENlbmRpbyBBQlxuICogTGljZW5zZWQgdW5kZXIgTVBMIDIuMCBvciBhbnkgbGF0ZXIgdmVyc2lvbiAoc2VlIExJQ0VOU0UudHh0KVxuICovXG5cblxuLyoqXG4gKiBFeHBvc2UgdGhlIElucHV0IE9iamVjdC5cbiAqL1xudmFyIElucHV0ID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG4vKipcbiAqIERlcGVuZGVuY2llcy5cbiAqL1xudmFyIGRlYnVna2V5Ym9hcmQgPSByZXF1aXJlKCdkZWJ1ZycpKCdub1ZOQzpJbnB1dDpLZXlib3JkJyk7XG52YXIgZGVidWdtb3VzZSA9IHJlcXVpcmUoJ2RlYnVnJykoJ25vVk5DOklucHV0Ok1vdXNlJyk7XG52YXIgYnJvd3NlciA9IHJlcXVpcmUoJ2Jvd3NlcicpLmJyb3dzZXI7XG52YXIgVXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xudmFyIGtiZFV0aWwgPSByZXF1aXJlKCcuL2tiZHV0aWwnKTtcblxuXG5mdW5jdGlvbiBLZXlib2FyZCAoZGVmYXVsdHMpIHtcblx0dGhpcy5fa2V5RG93bkxpc3QgPSBbXTsgIC8vIExpc3Qgb2YgZGVwcmVzc2VkIGtleXNcblx0XHRcdFx0XHRcdFx0XHRcdCAgICAgICAgIC8vIChldmVuIGlmIHRoZXkgYXJlIGhhcHB5KVxuXG5cdFV0aWwuc2V0X2RlZmF1bHRzKHRoaXMsIGRlZmF1bHRzLCB7XG5cdFx0J3RhcmdldCc6IGRvY3VtZW50LFxuXHRcdCdmb2N1c2VkJzogdHJ1ZVxuXHR9KTtcblxuXHQvLyBjcmVhdGUgdGhlIGtleWJvYXJkIGhhbmRsZXJcblx0dGhpcy5faGFuZGxlciA9IG5ldyBrYmRVdGlsLktleUV2ZW50RGVjb2RlcihrYmRVdGlsLk1vZGlmaWVyU3luYygpLFxuXHRcdGtiZFV0aWwuVmVyaWZ5Q2hhck1vZGlmaWVyKFxuXHRcdFx0a2JkVXRpbC5UcmFja0tleVN0YXRlKFxuXHRcdFx0XHRrYmRVdGlsLkVzY2FwZU1vZGlmaWVycyh0aGlzLl9oYW5kbGVSZmJFdmVudC5iaW5kKHRoaXMpKVxuXHRcdFx0KVxuXHRcdClcblx0KTsgLyoganNoaW50IG5ld2NhcDogdHJ1ZSAqL1xuXG5cdC8vIGtlZXAgdGhlc2UgaGVyZSBzbyB3ZSBjYW4gcmVmZXIgdG8gdGhlbSBsYXRlclxuXHR0aGlzLl9ldmVudEhhbmRsZXJzID0ge1xuXHRcdCdrZXl1cCc6IHRoaXMuX2hhbmRsZUtleVVwLmJpbmQodGhpcyksXG5cdFx0J2tleWRvd24nOiB0aGlzLl9oYW5kbGVLZXlEb3duLmJpbmQodGhpcyksXG5cdFx0J2tleXByZXNzJzogdGhpcy5faGFuZGxlS2V5UHJlc3MuYmluZCh0aGlzKSxcblx0XHQnYmx1cic6IHRoaXMuX2FsbEtleXNVcC5iaW5kKHRoaXMpXG5cdH07XG59XG5cblxuS2V5Ym9hcmQucHJvdG90eXBlID0ge1xuXHRfaGFuZGxlUmZiRXZlbnQ6IGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKHRoaXMuX29uS2V5UHJlc3MpIHtcblx0XHRcdGRlYnVna2V5Ym9hcmQoJ29uS2V5UHJlc3M6ICcgKyAoZS50eXBlID09PSAna2V5ZG93bicgPyAnZG93bicgOiAndXAnKSArXG5cdFx0XHRcdFx0ICAgJywga2V5c3ltOiAnICsgZS5rZXlzeW0ua2V5c3ltICsgJygnICsgZS5rZXlzeW0ua2V5bmFtZSArICcpJyk7XG5cdFx0XHR0aGlzLl9vbktleVByZXNzKGUua2V5c3ltLmtleXN5bSwgZS50eXBlID09PSAna2V5ZG93bicpO1xuXHRcdH1cblx0fSxcblxuXHRfaGFuZGxlS2V5RG93bjogZnVuY3Rpb24gKGUpIHtcblx0XHRpZiAoIXRoaXMuX2ZvY3VzZWQpIHsgcmV0dXJuIHRydWU7IH1cblxuXHRcdGlmICh0aGlzLl9oYW5kbGVyLmtleWRvd24oZSkpIHtcblx0XHRcdC8vIFN1cHByZXNzIGJ1YmJsaW5nL2RlZmF1bHQgYWN0aW9uc1xuXHRcdFx0VXRpbC5zdG9wRXZlbnQoZSk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEFsbG93IHRoZSBldmVudCB0byBidWJibGUgYW5kIGJlY29tZSBhIGtleVByZXNzIGV2ZW50IHdoaWNoXG5cdFx0XHQvLyB3aWxsIGhhdmUgdGhlIGNoYXJhY3RlciBjb2RlIHRyYW5zbGF0ZWRcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fSxcblxuXHRfaGFuZGxlS2V5UHJlc3M6IGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKCF0aGlzLl9mb2N1c2VkKSB7IHJldHVybiB0cnVlOyB9XG5cblx0XHRpZiAodGhpcy5faGFuZGxlci5rZXlwcmVzcyhlKSkge1xuXHRcdFx0Ly8gU3VwcHJlc3MgYnViYmxpbmcvZGVmYXVsdCBhY3Rpb25zXG5cdFx0XHRVdGlsLnN0b3BFdmVudChlKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gQWxsb3cgdGhlIGV2ZW50IHRvIGJ1YmJsZSBhbmQgYmVjb21lIGEga2V5UHJlc3MgZXZlbnQgd2hpY2hcblx0XHRcdC8vIHdpbGwgaGF2ZSB0aGUgY2hhcmFjdGVyIGNvZGUgdHJhbnNsYXRlZFxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9LFxuXG5cdF9oYW5kbGVLZXlVcDogZnVuY3Rpb24gKGUpIHtcblx0XHRpZiAoIXRoaXMuX2ZvY3VzZWQpIHsgcmV0dXJuIHRydWU7IH1cblxuXHRcdGlmICh0aGlzLl9oYW5kbGVyLmtleXVwKGUpKSB7XG5cdFx0XHQvLyBTdXBwcmVzcyBidWJibGluZy9kZWZhdWx0IGFjdGlvbnNcblx0XHRcdFV0aWwuc3RvcEV2ZW50KGUpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBBbGxvdyB0aGUgZXZlbnQgdG8gYnViYmxlIGFuZCBiZWNvbWUgYSBrZXlVcCBldmVudCB3aGljaFxuXHRcdFx0Ly8gd2lsbCBoYXZlIHRoZSBjaGFyYWN0ZXIgY29kZSB0cmFuc2xhdGVkXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdH0sXG5cblx0X2FsbEtleXNVcDogZnVuY3Rpb24gKCkge1xuXHRcdGRlYnVna2V5Ym9hcmQoJ2FsbEtleXNVcCcpO1xuXHRcdHRoaXMuX2hhbmRsZXIucmVsZWFzZUFsbCgpO1xuXHR9LFxuXG5cdC8vIFB1YmxpYyBtZXRob2RzXG5cblx0Z3JhYjogZnVuY3Rpb24gKCkge1xuXHRcdGRlYnVna2V5Ym9hcmQoJ2dyYWIoKScpO1xuXG5cdFx0dmFyIGMgPSB0aGlzLl90YXJnZXQ7XG5cblx0XHRVdGlsLmFkZEV2ZW50KGMsICdrZXlkb3duJywgdGhpcy5fZXZlbnRIYW5kbGVycy5rZXlkb3duKTtcblx0XHRVdGlsLmFkZEV2ZW50KGMsICdrZXl1cCcsIHRoaXMuX2V2ZW50SGFuZGxlcnMua2V5dXApO1xuXHRcdFV0aWwuYWRkRXZlbnQoYywgJ2tleXByZXNzJywgdGhpcy5fZXZlbnRIYW5kbGVycy5rZXlwcmVzcyk7XG5cblx0XHQvLyBSZWxlYXNlIChrZXkgdXApIGlmIGdsb2JhbCBsb3NlcyBmb2N1c1xuXHRcdFV0aWwuYWRkRXZlbnQoZ2xvYmFsLCAnYmx1cicsIHRoaXMuX2V2ZW50SGFuZGxlcnMuYmx1cik7XG5cdH0sXG5cblx0dW5ncmFiOiBmdW5jdGlvbiAoKSB7XG5cdFx0ZGVidWdrZXlib2FyZCgndW5ncmFiKCknKTtcblxuXHRcdHZhciBjID0gdGhpcy5fdGFyZ2V0O1xuXG5cdFx0VXRpbC5yZW1vdmVFdmVudChjLCAna2V5ZG93bicsIHRoaXMuX2V2ZW50SGFuZGxlcnMua2V5ZG93bik7XG5cdFx0VXRpbC5yZW1vdmVFdmVudChjLCAna2V5dXAnLCB0aGlzLl9ldmVudEhhbmRsZXJzLmtleXVwKTtcblx0XHRVdGlsLnJlbW92ZUV2ZW50KGMsICdrZXlwcmVzcycsIHRoaXMuX2V2ZW50SGFuZGxlcnMua2V5cHJlc3MpO1xuXHRcdFV0aWwucmVtb3ZlRXZlbnQoZ2xvYmFsLCAnYmx1cicsIHRoaXMuX2V2ZW50SGFuZGxlcnMuYmx1cik7XG5cblx0XHQvLyBSZWxlYXNlIChrZXkgdXApIGFsbCBrZXlzIHRoYXQgYXJlIGluIGEgZG93biBzdGF0ZVxuXHRcdHRoaXMuX2FsbEtleXNVcCgpO1xuXHR9LFxuXG5cdHN5bmM6IGZ1bmN0aW9uIChlKSB7XG5cdFx0dGhpcy5faGFuZGxlci5zeW5jTW9kaWZpZXJzKGUpO1xuXHR9XG59O1xuXG5cblV0aWwubWFrZV9wcm9wZXJ0aWVzKEtleWJvYXJkLCBbXG5cdFsndGFyZ2V0JywgICAgICd3bycsICdkb20nXSwgIC8vIERPTSBlbGVtZW50IHRoYXQgY2FwdHVyZXMga2V5Ym9hcmQgaW5wdXRcblx0Wydmb2N1c2VkJywgICAgJ3J3JywgJ2Jvb2wnXSwgLy8gQ2FwdHVyZSBhbmQgc2VuZCBrZXkgZXZlbnRzXG5cdFsnb25LZXlQcmVzcycsICdydycsICdmdW5jJ10gLy8gSGFuZGxlciBmb3Iga2V5IHByZXNzL3JlbGVhc2Vcbl0pO1xuXG5cbmZ1bmN0aW9uIE1vdXNlIChkZWZhdWx0cykge1xuXHR0aGlzLl9tb3VzZUNhcHR1cmVkICA9IGZhbHNlO1xuXG5cdHRoaXMuX2RvdWJsZUNsaWNrVGltZXIgPSBudWxsO1xuXHR0aGlzLl9sYXN0VG91Y2hQb3MgPSBudWxsO1xuXG5cdC8vIENvbmZpZ3VyYXRpb24gYXR0cmlidXRlc1xuXHRVdGlsLnNldF9kZWZhdWx0cyh0aGlzLCBkZWZhdWx0cywge1xuXHRcdCd0YXJnZXQnOiBkb2N1bWVudCxcblx0XHQnZm9jdXNlZCc6IHRydWUsXG5cdFx0J3NjYWxlJzogMS4wLFxuXHRcdCd6b29tJzogMS4wLFxuXHRcdCd0b3VjaEJ1dHRvbic6IDFcblx0fSk7XG5cblx0dGhpcy5fZXZlbnRIYW5kbGVycyA9IHtcblx0XHQnbW91c2Vkb3duJzogdGhpcy5faGFuZGxlTW91c2VEb3duLmJpbmQodGhpcyksXG5cdFx0J21vdXNldXAnOiB0aGlzLl9oYW5kbGVNb3VzZVVwLmJpbmQodGhpcyksXG5cdFx0J21vdXNlbW92ZSc6IHRoaXMuX2hhbmRsZU1vdXNlTW92ZS5iaW5kKHRoaXMpLFxuXHRcdCdtb3VzZXdoZWVsJzogdGhpcy5faGFuZGxlTW91c2VXaGVlbC5iaW5kKHRoaXMpLFxuXHRcdCdtb3VzZWRpc2FibGUnOiB0aGlzLl9oYW5kbGVNb3VzZURpc2FibGUuYmluZCh0aGlzKVxuXHR9O1xufVxuXG5cbk1vdXNlLnByb3RvdHlwZSA9IHtcblx0X2NhcHR1cmVNb3VzZTogZnVuY3Rpb24gKCkge1xuXHRcdC8vIGNhcHR1cmluZyB0aGUgbW91c2UgZW5zdXJlcyB3ZSBnZXQgdGhlIG1vdXNldXAgZXZlbnRcblx0XHRpZiAodGhpcy5fdGFyZ2V0LnNldENhcHR1cmUpIHtcblx0XHRcdHRoaXMuX3RhcmdldC5zZXRDYXB0dXJlKCk7XG5cdFx0fVxuXG5cdFx0Ly8gc29tZSBicm93c2VycyBnaXZlIHVzIG1vdXNldXAgZXZlbnRzIHJlZ2FyZGxlc3MsXG5cdFx0Ly8gc28gaWYgd2UgbmV2ZXIgY2FwdHVyZWQgdGhlIG1vdXNlLCB3ZSBjYW4gZGlzcmVnYXJkIHRoZSBldmVudFxuXHRcdHRoaXMuX21vdXNlQ2FwdHVyZWQgPSB0cnVlO1xuXHR9LFxuXG5cdF9yZWxlYXNlTW91c2U6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fdGFyZ2V0LnJlbGVhc2VDYXB0dXJlKSB7XG5cdFx0XHR0aGlzLl90YXJnZXQucmVsZWFzZUNhcHR1cmUoKTtcblx0XHR9XG5cdFx0dGhpcy5fbW91c2VDYXB0dXJlZCA9IGZhbHNlO1xuXHR9LFxuXG5cdF9yZXNldERvdWJsZUNsaWNrVGltZXI6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9kb3VibGVDbGlja1RpbWVyID0gbnVsbDtcblx0fSxcblxuXHRfaGFuZGxlTW91c2VCdXR0b246IGZ1bmN0aW9uIChlLCBkb3duKSB7XG5cdFx0aWYgKCF0aGlzLl9mb2N1c2VkKSB7IHJldHVybiB0cnVlOyB9XG5cblx0XHRpZiAodGhpcy5fbm90aWZ5KSB7XG5cdFx0XHR0aGlzLl9ub3RpZnkoZSk7XG5cdFx0fVxuXG5cdFx0dmFyIGV2dCA9IChlID8gZSA6IGdsb2JhbC5ldmVudCk7XG5cdFx0dmFyIHBvcyA9IFV0aWwuZ2V0RXZlbnRQb3NpdGlvbihlLCB0aGlzLl90YXJnZXQsIHRoaXMuX3NjYWxlLCB0aGlzLl96b29tKTtcblxuXHRcdHZhciBibWFzaztcblx0XHRpZiAoZS50b3VjaGVzIHx8IGUuY2hhbmdlZFRvdWNoZXMpIHtcblx0XHRcdC8vIFRvdWNoIGRldmljZVxuXG5cdFx0XHQvLyBXaGVuIHR3byB0b3VjaGVzIG9jY3VyIHdpdGhpbiA1MDAgbXMgb2YgZWFjaCBvdGhlciBhbmQgYXJlXG5cdFx0XHQvLyBjbG9zZXIgdGhhbiAyMCBwaXhlbHMgdG9nZXRoZXIgYSBkb3VibGUgY2xpY2sgaXMgdHJpZ2dlcmVkLlxuXHRcdFx0aWYgKGRvd24gPT09IDEpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2RvdWJsZUNsaWNrVGltZXIgPT09IG51bGwpIHtcblx0XHRcdFx0XHR0aGlzLl9sYXN0VG91Y2hQb3MgPSBwb3M7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX2RvdWJsZUNsaWNrVGltZXIpO1xuXG5cdFx0XHRcdFx0Ly8gV2hlbiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgdHdvIHRvdWNoZXMgaXMgc21hbGwgZW5vdWdoXG5cdFx0XHRcdFx0Ly8gZm9yY2UgdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXR0ZXIgdG91Y2ggdG8gdGhlIHBvc2l0aW9uIG9mXG5cdFx0XHRcdFx0Ly8gdGhlIGZpcnN0LlxuXG5cdFx0XHRcdFx0dmFyIHhzID0gdGhpcy5fbGFzdFRvdWNoUG9zLnggLSBwb3MueDtcblx0XHRcdFx0XHR2YXIgeXMgPSB0aGlzLl9sYXN0VG91Y2hQb3MueSAtIHBvcy55O1xuXHRcdFx0XHRcdHZhciBkID0gTWF0aC5zcXJ0KCh4cyAqIHhzKSArICh5cyAqIHlzKSk7XG5cblx0XHRcdFx0XHQvLyBUaGUgZ29hbCBpcyB0byB0cmlnZ2VyIG9uIGEgY2VydGFpbiBwaHlzaWNhbCB3aWR0aCwgdGhlXG5cdFx0XHRcdFx0Ly8gZGV2aWNlUGl4ZWxSYXRpbyBicmluZ3MgdXMgYSBiaXQgY2xvc2VyIGJ1dCBpcyBub3Qgb3B0aW1hbC5cblx0XHRcdFx0XHRpZiAoZCA8IDIwICogZ2xvYmFsLmRldmljZVBpeGVsUmF0aW8pIHtcblx0XHRcdFx0XHRcdHBvcyA9IHRoaXMuX2xhc3RUb3VjaFBvcztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fZG91YmxlQ2xpY2tUaW1lciA9IHNldFRpbWVvdXQodGhpcy5fcmVzZXREb3VibGVDbGlja1RpbWVyLmJpbmQodGhpcyksIDUwMCk7XG5cdFx0XHR9XG5cdFx0XHRibWFzayA9IHRoaXMuX3RvdWNoQnV0dG9uO1xuXHRcdFx0Ly8gSWYgYm1hc2sgaXMgc2V0XG5cdFx0fSBlbHNlIGlmIChldnQud2hpY2gpIHtcblx0XHRcdC8qIGV2ZXJ5dGhpbmcgZXhjZXB0IElFICovXG5cdFx0XHRibWFzayA9IDEgPDwgZXZ0LmJ1dHRvbjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0LyogSUUgaW5jbHVkaW5nIDkgKi9cblx0XHRcdGJtYXNrID0gKGV2dC5idXR0b24gJiAweDEpICsgICAgICAvLyBMZWZ0XG5cdFx0XHRcdFx0KGV2dC5idXR0b24gJiAweDIpICogMiArICAvLyBSaWdodFxuXHRcdFx0XHRcdChldnQuYnV0dG9uICYgMHg0KSAvIDI7ICAgLy8gTWlkZGxlXG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX29uTW91c2VCdXR0b24pIHtcblx0XHRcdGRlYnVnbW91c2UoJ29uTW91c2VCdXR0b246ICcgKyAoZG93biA/ICdkb3duJyA6ICd1cCcpICtcblx0XHRcdFx0XHQgICAnLCB4OiAnICsgcG9zLnggKyAnLCB5OiAnICsgcG9zLnkgKyAnLCBibWFzazogJyArIGJtYXNrKTtcblx0XHRcdHRoaXMuX29uTW91c2VCdXR0b24ocG9zLngsIHBvcy55LCBkb3duLCBibWFzayk7XG5cdFx0fVxuXG5cdFx0VXRpbC5zdG9wRXZlbnQoZSk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdF9oYW5kbGVNb3VzZURvd246IGZ1bmN0aW9uIChlKSB7XG5cdFx0dGhpcy5fY2FwdHVyZU1vdXNlKCk7XG5cdFx0dGhpcy5faGFuZGxlTW91c2VCdXR0b24oZSwgMSk7XG5cdH0sXG5cblx0X2hhbmRsZU1vdXNlVXA6IGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKCF0aGlzLl9tb3VzZUNhcHR1cmVkKSB7IHJldHVybjsgfVxuXG5cdFx0dGhpcy5faGFuZGxlTW91c2VCdXR0b24oZSwgMCk7XG5cdFx0dGhpcy5fcmVsZWFzZU1vdXNlKCk7XG5cdH0sXG5cblx0X2hhbmRsZU1vdXNlV2hlZWw6IGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKCF0aGlzLl9mb2N1c2VkKSB7IHJldHVybiB0cnVlOyB9XG5cblx0XHRpZiAodGhpcy5fbm90aWZ5KSB7XG5cdFx0XHR0aGlzLl9ub3RpZnkoZSk7XG5cdFx0fVxuXG5cdFx0dmFyIGV2dCA9IChlID8gZSA6IGdsb2JhbC5ldmVudCk7XG5cdFx0dmFyIHBvcyA9IFV0aWwuZ2V0RXZlbnRQb3NpdGlvbihlLCB0aGlzLl90YXJnZXQsIHRoaXMuX3NjYWxlLCB0aGlzLl96b29tKTtcblx0XHR2YXIgd2hlZWxEYXRhID0gZXZ0LmRldGFpbCA/IGV2dC5kZXRhaWwgKiAtMSA6IGV2dC53aGVlbERlbHRhIC8gNDA7XG5cdFx0dmFyIGJtYXNrO1xuXHRcdGlmICh3aGVlbERhdGEgPiAwKSB7XG5cdFx0XHRibWFzayA9IDEgPDwgMztcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ym1hc2sgPSAxIDw8IDQ7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX29uTW91c2VCdXR0b24pIHtcblx0XHRcdHRoaXMuX29uTW91c2VCdXR0b24ocG9zLngsIHBvcy55LCAxLCBibWFzayk7XG5cdFx0XHR0aGlzLl9vbk1vdXNlQnV0dG9uKHBvcy54LCBwb3MueSwgMCwgYm1hc2spO1xuXHRcdH1cblxuXHRcdFV0aWwuc3RvcEV2ZW50KGUpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHRfaGFuZGxlTW91c2VNb3ZlOiBmdW5jdGlvbiAoZSkge1xuXHRcdGlmICghdGhpcy5fZm9jdXNlZCkgeyByZXR1cm4gdHJ1ZTsgfVxuXG5cdFx0aWYgKHRoaXMuX25vdGlmeSkge1xuXHRcdFx0dGhpcy5fbm90aWZ5KGUpO1xuXHRcdH1cblxuXHRcdHZhciBwb3MgPSBVdGlsLmdldEV2ZW50UG9zaXRpb24oZSwgdGhpcy5fdGFyZ2V0LCB0aGlzLl9zY2FsZSwgdGhpcy5fem9vbSk7XG5cdFx0aWYgKHRoaXMuX29uTW91c2VNb3ZlKSB7XG5cdFx0XHR0aGlzLl9vbk1vdXNlTW92ZShwb3MueCwgcG9zLnkpO1xuXHRcdH1cblxuXHRcdFV0aWwuc3RvcEV2ZW50KGUpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHRfaGFuZGxlTW91c2VEaXNhYmxlOiBmdW5jdGlvbiAoZSkge1xuXHRcdGlmICghdGhpcy5fZm9jdXNlZCkgeyByZXR1cm4gdHJ1ZTsgfVxuXG5cdFx0dmFyIHBvcyA9IFV0aWwuZ2V0RXZlbnRQb3NpdGlvbihlLCB0aGlzLl90YXJnZXQsIHRoaXMuX3NjYWxlLCB0aGlzLl96b29tKTtcblxuXHRcdC8qIFN0b3AgcHJvcGFnYXRpb24gaWYgaW5zaWRlIGNhbnZhcyBhcmVhICovXG5cdFx0aWYgKChwb3MucmVhbHggPj0gMCkgJiYgKHBvcy5yZWFseSA+PSAwKSAmJlxuXHRcdFx0KHBvcy5yZWFseCA8IHRoaXMuX3RhcmdldC5vZmZzZXRXaWR0aCkgJiZcblx0XHRcdChwb3MucmVhbHkgPCB0aGlzLl90YXJnZXQub2Zmc2V0SGVpZ2h0KSkge1xuXG5cdFx0XHRVdGlsLnN0b3BFdmVudChlKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHQvLyBQdWJsaWMgbWV0aG9kc1xuXG5cdGdyYWI6IGZ1bmN0aW9uICgpIHtcblx0XHRkZWJ1Z21vdXNlKCdncmFiKCknKTtcblxuXHRcdHZhciBjID0gdGhpcy5fdGFyZ2V0O1xuXHRcdHZhciBpc1RvdWNoID0gJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cdFx0aWYgKGlzVG91Y2gpIHtcblx0XHRcdFV0aWwuYWRkRXZlbnQoYywgJ3RvdWNoc3RhcnQnLCB0aGlzLl9ldmVudEhhbmRsZXJzLm1vdXNlZG93bik7XG5cdFx0XHRVdGlsLmFkZEV2ZW50KGdsb2JhbCwgJ3RvdWNoZW5kJywgdGhpcy5fZXZlbnRIYW5kbGVycy5tb3VzZXVwKTtcblx0XHRcdFV0aWwuYWRkRXZlbnQoYywgJ3RvdWNoZW5kJywgdGhpcy5fZXZlbnRIYW5kbGVycy5tb3VzZXVwKTtcblx0XHRcdFV0aWwuYWRkRXZlbnQoYywgJ3RvdWNobW92ZScsIHRoaXMuX2V2ZW50SGFuZGxlcnMubW91c2Vtb3ZlKTtcblx0XHR9XG5cblx0XHRpZiAoIWlzVG91Y2ggfHwgdGhpcy5fZW5hYmxlTW91c2VBbmRUb3VjaCkge1xuXHRcdFx0VXRpbC5hZGRFdmVudChjLCAnbW91c2Vkb3duJywgdGhpcy5fZXZlbnRIYW5kbGVycy5tb3VzZWRvd24pO1xuXHRcdFx0VXRpbC5hZGRFdmVudChnbG9iYWwsICdtb3VzZXVwJywgdGhpcy5fZXZlbnRIYW5kbGVycy5tb3VzZXVwKTtcblx0XHRcdFV0aWwuYWRkRXZlbnQoYywgJ21vdXNldXAnLCB0aGlzLl9ldmVudEhhbmRsZXJzLm1vdXNldXApO1xuXHRcdFx0VXRpbC5hZGRFdmVudChjLCAnbW91c2Vtb3ZlJywgdGhpcy5fZXZlbnRIYW5kbGVycy5tb3VzZW1vdmUpO1xuXHRcdFx0VXRpbC5hZGRFdmVudChjLCAoYnJvd3Nlci5nZWNrbykgPyAnRE9NTW91c2VTY3JvbGwnIDogJ21vdXNld2hlZWwnLFxuXHRcdFx0XHRcdFx0ICB0aGlzLl9ldmVudEhhbmRsZXJzLm1vdXNld2hlZWwpO1xuXHRcdH1cblxuXHRcdC8qIFdvcmsgYXJvdW5kIHJpZ2h0IGFuZCBtaWRkbGUgY2xpY2sgYnJvd3NlciBiZWhhdmlvcnMgKi9cblx0XHRVdGlsLmFkZEV2ZW50KGRvY3VtZW50LCAnY2xpY2snLCB0aGlzLl9ldmVudEhhbmRsZXJzLm1vdXNlZGlzYWJsZSk7XG5cdFx0VXRpbC5hZGRFdmVudChkb2N1bWVudC5ib2R5LCAnY29udGV4dG1lbnUnLCB0aGlzLl9ldmVudEhhbmRsZXJzLm1vdXNlZGlzYWJsZSk7XG5cdH0sXG5cblx0dW5ncmFiOiBmdW5jdGlvbiAoKSB7XG5cdFx0ZGVidWdtb3VzZSgndW5ncmFiKCknKTtcblxuXHRcdHZhciBjID0gdGhpcy5fdGFyZ2V0O1xuXHRcdHZhciBpc1RvdWNoID0gJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cdFx0aWYgKGlzVG91Y2gpIHtcblx0XHRcdFV0aWwucmVtb3ZlRXZlbnQoYywgJ3RvdWNoc3RhcnQnLCB0aGlzLl9ldmVudEhhbmRsZXJzLm1vdXNlZG93bik7XG5cdFx0XHRVdGlsLnJlbW92ZUV2ZW50KGdsb2JhbCwgJ3RvdWNoZW5kJywgdGhpcy5fZXZlbnRIYW5kbGVycy5tb3VzZXVwKTtcblx0XHRcdFV0aWwucmVtb3ZlRXZlbnQoYywgJ3RvdWNoZW5kJywgdGhpcy5fZXZlbnRIYW5kbGVycy5tb3VzZXVwKTtcblx0XHRcdFV0aWwucmVtb3ZlRXZlbnQoYywgJ3RvdWNobW92ZScsIHRoaXMuX2V2ZW50SGFuZGxlcnMubW91c2Vtb3ZlKTtcblx0XHR9XG5cblx0XHRpZiAoIWlzVG91Y2ggfHwgdGhpcy5fZW5hYmxlTW91c2VBbmRUb3VjaCkge1xuXHRcdFx0VXRpbC5yZW1vdmVFdmVudChjLCAnbW91c2Vkb3duJywgdGhpcy5fZXZlbnRIYW5kbGVycy5tb3VzZWRvd24pO1xuXHRcdFx0VXRpbC5yZW1vdmVFdmVudChnbG9iYWwsICdtb3VzZXVwJywgdGhpcy5fZXZlbnRIYW5kbGVycy5tb3VzZXVwKTtcblx0XHRcdFV0aWwucmVtb3ZlRXZlbnQoYywgJ21vdXNldXAnLCB0aGlzLl9ldmVudEhhbmRsZXJzLm1vdXNldXApO1xuXHRcdFx0VXRpbC5yZW1vdmVFdmVudChjLCAnbW91c2Vtb3ZlJywgdGhpcy5fZXZlbnRIYW5kbGVycy5tb3VzZW1vdmUpO1xuXHRcdFx0VXRpbC5yZW1vdmVFdmVudChjLCAoYnJvd3Nlci5nZWNrbykgPyAnRE9NTW91c2VTY3JvbGwnIDogJ21vdXNld2hlZWwnLFxuXHRcdFx0XHRcdFx0XHQgdGhpcy5fZXZlbnRIYW5kbGVycy5tb3VzZXdoZWVsKTtcblx0XHR9XG5cblx0XHQvKiBXb3JrIGFyb3VuZCByaWdodCBhbmQgbWlkZGxlIGNsaWNrIGJyb3dzZXIgYmVoYXZpb3JzICovXG5cdFx0VXRpbC5yZW1vdmVFdmVudChkb2N1bWVudCwgJ2NsaWNrJywgdGhpcy5fZXZlbnRIYW5kbGVycy5tb3VzZWRpc2FibGUpO1xuXHRcdFV0aWwucmVtb3ZlRXZlbnQoZG9jdW1lbnQuYm9keSwgJ2NvbnRleHRtZW51JywgdGhpcy5fZXZlbnRIYW5kbGVycy5tb3VzZWRpc2FibGUpO1xuXG5cdH1cbn07XG5cblxuVXRpbC5tYWtlX3Byb3BlcnRpZXMoTW91c2UsIFtcblx0Wyd0YXJnZXQnLCAgICAgICAgICdybycsICdkb20nXSwgICAvLyBET00gZWxlbWVudCB0aGF0IGNhcHR1cmVzIG1vdXNlIGlucHV0XG5cdFsnbm90aWZ5JywgICAgICAgICAncm8nLCAnZnVuYyddLCAgLy8gRnVuY3Rpb24gdG8gY2FsbCB0byBub3RpZnkgd2hlbmV2ZXIgYSBtb3VzZSBldmVudCBpcyByZWNlaXZlZFxuXHRbJ2ZvY3VzZWQnLCAgICAgICAgJ3J3JywgJ2Jvb2wnXSwgIC8vIENhcHR1cmUgYW5kIHNlbmQgbW91c2UgY2xpY2tzL21vdmVtZW50XG5cdFsnc2NhbGUnLCAgICAgICAgICAncncnLCAnZmxvYXQnXSwgLy8gVmlld3BvcnQgc2NhbGUgZmFjdG9yIDAuMCAtIDEuMFxuXHRbJ3pvb20nLCAgICAgICAgICAgJ3J3JywgJ2Zsb2F0J10sIC8vIENTUyB6b29tIGFwcGxpZWQgdG8gdGhlIERPTSBlbGVtZW50IHRoYXQgY2FwdHVyZXMgbW91c2UgaW5wdXRcblx0WydlbmFibGVNb3VzZUFuZFRvdWNoJywgJ3J3JywgJ2Jvb2wnXSwgIC8vIFdoZXRoZXIgYWxzbyBlbmFibGUgbW91c2UgZXZlbnRzIHdoZW4gdG91Y2ggc2NyZWVuIGlzIGRldGVjdGVkXG5cblx0Wydvbk1vdXNlQnV0dG9uJywgICdydycsICdmdW5jJ10sICAvLyBIYW5kbGVyIGZvciBtb3VzZSBidXR0b24gY2xpY2svcmVsZWFzZVxuXHRbJ29uTW91c2VNb3ZlJywgICAgJ3J3JywgJ2Z1bmMnXSwgIC8vIEhhbmRsZXIgZm9yIG1vdXNlIG1vdmVtZW50XG5cdFsndG91Y2hCdXR0b24nLCAgICAncncnLCAnaW50J10gICAgLy8gQnV0dG9uIG1hc2sgKDEsIDIsIDQpIGZvciB0b3VjaCBkZXZpY2VzICgwIG1lYW5zIGlnbm9yZSBjbGlja3MpXG5dKTtcblxuXG4vKipcbiAqIEFkZCBLZXlib2FyZCBhbmQgTW91c2UgaW4gdGhlIGV4cG9zZWQgT2JqZWN0LlxuICovXG5JbnB1dC5LZXlib2FyZCA9IEtleWJvYXJkO1xuSW5wdXQuTW91c2UgPSBNb3VzZTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCIvKipcbiAqIERlcGVuZGVuY2llcy5cbiAqL1xudmFyIGRlYnVnZXJyb3IgPSByZXF1aXJlKCdkZWJ1ZycpKCdub1ZOQzpFUlJPUjpLYmRVdGlsJyk7XG5kZWJ1Z2Vycm9yLmxvZyA9IGNvbnNvbGUud2Fybi5iaW5kKGNvbnNvbGUpO1xudmFyIEtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxuXG52YXIgS2JkVXRpbCA9IG1vZHVsZS5leHBvcnRzID0ge1xuXHQvKipcblx0ICogUmV0dXJuIHRydWUgaWYgYSBtb2RpZmllciB3aGljaCBpcyBub3QgdGhlIHNwZWNpZmllZCBjaGFyIG1vZGlmaWVyIChhbmRcblx0ICogaXMgbm90IHNoaWZ0KSBpcyBkb3duLlxuXHQgKi9cblx0aGFzU2hvcnRjdXRNb2RpZmllcjogZnVuY3Rpb24gKGNoYXJNb2RpZmllciwgY3VycmVudE1vZGlmaWVycykge1xuXHRcdHZhciBtb2RzID0ge307XG5cdFx0Zm9yICh2YXIga2V5IGluIGN1cnJlbnRNb2RpZmllcnMpIHtcblx0XHRcdGlmIChwYXJzZUludChrZXkpICE9PSBLZXlzLlhLX1NoaWZ0X0wpIHtcblx0XHRcdFx0bW9kc1trZXldID0gY3VycmVudE1vZGlmaWVyc1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciBzdW0gPSAwO1xuXHRcdGZvciAodmFyIGsgaW4gY3VycmVudE1vZGlmaWVycykge1xuXHRcdFx0aWYgKG1vZHNba10pIHtcblx0XHRcdFx0KytzdW07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKEtiZFV0aWwuaGFzQ2hhck1vZGlmaWVyKGNoYXJNb2RpZmllciwgbW9kcykpIHtcblx0XHRcdHJldHVybiBzdW0gPiBjaGFyTW9kaWZpZXIubGVuZ3RoO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHJldHVybiBzdW0gPiAwO1xuXHRcdH1cblx0fSxcblxuXHQvKipcblx0ICogUmV0dXJuIHRydWUgaWYgdGhlIHNwZWNpZmllZCBjaGFyIG1vZGlmaWVyIGlzIGN1cnJlbnRseSBkb3duLlxuXHQgKi9cblx0aGFzQ2hhck1vZGlmaWVyOiBmdW5jdGlvbiAoY2hhck1vZGlmaWVyLCBjdXJyZW50TW9kaWZpZXJzKSB7XG5cdFx0aWYgKGNoYXJNb2RpZmllci5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJNb2RpZmllci5sZW5ndGg7ICsraSkge1xuXHRcdFx0aWYgKCFjdXJyZW50TW9kaWZpZXJzW2NoYXJNb2RpZmllcltpXV0pIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHQvKipcblx0ICogSGVscGVyIG9iamVjdCB0cmFja2luZyBtb2RpZmllciBrZXkgc3RhdGUgYW5kIGdlbmVyYXRlcyBmYWtlIGtleSBldmVudHNcblx0ICogdG8gY29tcGVuc2F0ZSBpZiBpdCBnZXRzIG91dCBvZiBzeW5jLlxuXHQgKi9cblx0TW9kaWZpZXJTeW5jOiBmdW5jdGlvbiAoY2hhck1vZGlmaWVyKSB7XG5cdFx0aWYgKCFjaGFyTW9kaWZpZXIpIHtcblx0XHRcdGlmIChpc01hYygpKSB7XG5cdFx0XHRcdC8vIG9uIE1hYywgT3B0aW9uIChBS0EgQWx0KSBpcyB1c2VkIGFzIGEgY2hhciBtb2RpZmllclxuXHRcdFx0XHRjaGFyTW9kaWZpZXIgPSBbS2V5cy5YS19BbHRfTF07XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChpc1dpbmRvd3MoKSkge1xuXHRcdFx0XHQvLyBvbiBXaW5kb3dzLCBDdHJsK0FsdCBpcyB1c2VkIGFzIGEgY2hhciBtb2RpZmllclxuXHRcdFx0XHRjaGFyTW9kaWZpZXIgPSBbS2V5cy5YS19BbHRfTCwgS2V5cy5YS19Db250cm9sX0xdO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoaXNMaW51eCgpKSB7XG5cdFx0XHRcdC8vIG9uIExpbnV4LCBJU08gTGV2ZWwgMyBTaGlmdCAoQWx0R3IpIGlzIHVzZWQgYXMgYSBjaGFyIG1vZGlmaWVyXG5cdFx0XHRcdGNoYXJNb2RpZmllciA9IFtLZXlzLlhLX0lTT19MZXZlbDNfU2hpZnRdO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGNoYXJNb2RpZmllciA9IFtdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciBzdGF0ZSA9IHt9O1xuXG5cdFx0c3RhdGVbS2V5cy5YS19Db250cm9sX0xdID0gZmFsc2U7XG5cdFx0c3RhdGVbS2V5cy5YS19BbHRfTF0gPSBmYWxzZTtcblx0XHRzdGF0ZVtLZXlzLlhLX0lTT19MZXZlbDNfU2hpZnRdID0gZmFsc2U7XG5cdFx0c3RhdGVbS2V5cy5YS19TaGlmdF9MXSA9IGZhbHNlO1xuXHRcdHN0YXRlW0tleXMuWEtfTWV0YV9MXSA9IGZhbHNlO1xuXG5cdFx0ZnVuY3Rpb24gc3luYyhldnQsIGtleXN5bSkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IFtdO1xuXG5cdFx0XHRmdW5jdGlvbiBzeW5jS2V5KGtleXN5bSkge1xuXHRcdFx0XHRyZXR1cm4ge2tleXN5bTogS2V5cy5sb29rdXAoa2V5c3ltKSwgdHlwZTogc3RhdGVba2V5c3ltXSA/ICdrZXlkb3duJyA6ICdrZXl1cCd9O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZXZ0LmN0cmxLZXkgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0XHRldnQuY3RybEtleSAhPT0gc3RhdGVbS2V5cy5YS19Db250cm9sX0xdICYmIGtleXN5bSAhPT0gS2V5cy5YS19Db250cm9sX0wpIHtcblx0XHRcdFx0c3RhdGVbS2V5cy5YS19Db250cm9sX0xdID0gZXZ0LmN0cmxLZXk7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKHN5bmNLZXkoS2V5cy5YS19Db250cm9sX0wpKTtcblx0XHRcdH1cblx0XHRcdGlmIChldnQuYWx0S2V5ICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdFx0ZXZ0LmFsdEtleSAhPT0gc3RhdGVbS2V5cy5YS19BbHRfTF0gJiYga2V5c3ltICE9PSBLZXlzLlhLX0FsdF9MKSB7XG5cdFx0XHRcdHN0YXRlW0tleXMuWEtfQWx0X0xdID0gZXZ0LmFsdEtleTtcblx0XHRcdFx0cmVzdWx0LnB1c2goc3luY0tleShLZXlzLlhLX0FsdF9MKSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZXZ0LmFsdEdyYXBoS2V5ICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdFx0ZXZ0LmFsdEdyYXBoS2V5ICE9PSBzdGF0ZVtLZXlzLlhLX0lTT19MZXZlbDNfU2hpZnRdICYmIGtleXN5bSAhPT0gS2V5cy5YS19JU09fTGV2ZWwzX1NoaWZ0KSB7XG5cdFx0XHRcdHN0YXRlW0tleXMuWEtfSVNPX0xldmVsM19TaGlmdF0gPSBldnQuYWx0R3JhcGhLZXk7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKHN5bmNLZXkoS2V5cy5YS19JU09fTGV2ZWwzX1NoaWZ0KSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZXZ0LnNoaWZ0S2V5ICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdFx0ZXZ0LnNoaWZ0S2V5ICE9PSBzdGF0ZVtLZXlzLlhLX1NoaWZ0X0xdICYmIGtleXN5bSAhPT0gS2V5cy5YS19TaGlmdF9MKSB7XG5cdFx0XHRcdHN0YXRlW0tleXMuWEtfU2hpZnRfTF0gPSBldnQuc2hpZnRLZXk7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKHN5bmNLZXkoS2V5cy5YS19TaGlmdF9MKSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZXZ0Lm1ldGFLZXkgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0XHRldnQubWV0YUtleSAhPT0gc3RhdGVbS2V5cy5YS19NZXRhX0xdICYmIGtleXN5bSAhPT0gS2V5cy5YS19NZXRhX0wpIHtcblx0XHRcdFx0c3RhdGVbS2V5cy5YS19NZXRhX0xdID0gZXZ0Lm1ldGFLZXk7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKHN5bmNLZXkoS2V5cy5YS19NZXRhX0wpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc3luY0tleUV2ZW50KGV2dCwgZG93bikge1xuXHRcdFx0dmFyIG9iaiA9IEtiZFV0aWwuZ2V0S2V5c3ltKGV2dCk7XG5cdFx0XHR2YXIga2V5c3ltID0gb2JqID8gb2JqLmtleXN5bSA6IG51bGw7XG5cblx0XHRcdC8vIGZpcnN0LCBhcHBseSB0aGUgZXZlbnQgaXRzZWxmLCBpZiByZWxldmFudFxuXHRcdFx0aWYgKGtleXN5bSAhPT0gbnVsbCAmJiBzdGF0ZVtrZXlzeW1dICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0c3RhdGVba2V5c3ltXSA9IGRvd247XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3luYyhldnQsIGtleXN5bSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdC8vIHN5bmMgb24gdGhlIGFwcHJvcHJpYXRlIGtleWJvYXJkIGV2ZW50XG5cdFx0XHRrZXlkb3duOiBmdW5jdGlvbihldnQpIHsgcmV0dXJuIHN5bmNLZXlFdmVudChldnQsIHRydWUpOyB9LFxuXHRcdFx0a2V5dXA6IGZ1bmN0aW9uKGV2dCkgeyByZXR1cm4gc3luY0tleUV2ZW50KGV2dCwgZmFsc2UpOyB9LFxuXHRcdFx0Ly8gQ2FsbCB0aGlzIHdpdGggYSBub24ta2V5Ym9hcmQgZXZlbnQgKHN1Y2ggYXMgbW91c2UgZXZlbnRzKSB0byB1c2UgaXRzIG1vZGlmaWVyIHN0YXRlIHRvIHN5bmNocm9uaXplIGFueXdheVxuXHRcdFx0c3luY0FueTogZnVuY3Rpb24oZXZ0KSB7IHJldHVybiBzeW5jKGV2dCk7IH0sXG5cblx0XHRcdC8vIGlzIGEgc2hvcnRjdXQgbW9kaWZpZXIgZG93bj9cblx0XHRcdGhhc1Nob3J0Y3V0TW9kaWZpZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gS2JkVXRpbC5oYXNTaG9ydGN1dE1vZGlmaWVyKGNoYXJNb2RpZmllciwgc3RhdGUpO1xuXHRcdFx0fSxcblx0XHRcdC8vIGlmIGEgY2hhciBtb2RpZmllciBpcyBkb3duLCByZXR1cm4gdGhlIGtleXMgaXQgY29uc2lzdHMgb2YsIG90aGVyd2lzZSByZXR1cm4gbnVsbFxuXHRcdFx0YWN0aXZlQ2hhck1vZGlmaWVyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIEtiZFV0aWwuaGFzQ2hhck1vZGlmaWVyKGNoYXJNb2RpZmllciwgc3RhdGUpID8gY2hhck1vZGlmaWVyIDogbnVsbDtcblx0XHRcdH1cblx0XHR9O1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXQgYSBrZXkgSUQgZnJvbSBhIGtleWJvYXJkIGV2ZW50LlxuXHQgKiBNYXkgYmUgYSBzdHJpbmcgb3IgYW4gaW50ZWdlciBkZXBlbmRpbmcgb24gdGhlIGF2YWlsYWJsZSBwcm9wZXJ0aWVzLlxuXHQgKi9cblx0Z2V0S2V5OiBmdW5jdGlvbiAoZXZ0KSB7XG5cdFx0aWYgKCdrZXlDb2RlJyBpbiBldnQgJiYgJ2tleScgaW4gZXZ0KSB7XG5cdFx0XHRyZXR1cm4gZXZ0LmtleSArICc6JyArIGV2dC5rZXlDb2RlO1xuXHRcdH1cblx0XHRlbHNlIGlmICgna2V5Q29kZScgaW4gZXZ0KSB7XG5cdFx0XHRyZXR1cm4gZXZ0LmtleUNvZGU7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIGV2dC5rZXk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIG1vc3QgcmVsaWFibGUga2V5c3ltIHZhbHVlIHdlIGNhbiBnZXQgZnJvbSBhIGtleSBldmVudC5cblx0ICogSWYgY2hhci9jaGFyQ29kZSBpcyBhdmFpbGFibGUsIHByZWZlciB0aG9zZSwgb3RoZXJ3aXNlIGZhbGwgYmFjayB0b1xuXHQgKiBrZXkva2V5Q29kZS93aGljaC5cblx0ICovXG5cdGdldEtleXN5bTogZnVuY3Rpb24gKGV2dCkge1xuXHRcdHZhciBjb2RlcG9pbnQ7XG5cblx0XHRpZiAoZXZ0LmNoYXIgJiYgZXZ0LmNoYXIubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRjb2RlcG9pbnQgPSBldnQuY2hhci5jaGFyQ29kZUF0KCk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKGV2dC5jaGFyQ29kZSkge1xuXHRcdFx0Y29kZXBvaW50ID0gZXZ0LmNoYXJDb2RlO1xuXHRcdH1cblx0XHRlbHNlIGlmIChldnQua2V5Q29kZSAmJiBldnQudHlwZSA9PT0gJ2tleXByZXNzJykge1xuXHRcdFx0Ly8gSUUxMCBzdG9yZXMgdGhlIGNoYXIgY29kZSBhcyBrZXlDb2RlLCBhbmQgaGFzIG5vIG90aGVyIHVzZWZ1bCBwcm9wZXJ0aWVzXG5cdFx0XHRjb2RlcG9pbnQgPSBldnQua2V5Q29kZTtcblx0XHR9XG5cblx0XHRpZiAoY29kZXBvaW50KSB7XG5cdFx0XHR2YXIgcmVzID0gS2V5cy5mcm9tVW5pY29kZShLYmRVdGlsLnN1YnN0aXR1dGVDb2RlcG9pbnQoY29kZXBvaW50KSk7XG5cdFx0XHRpZiAocmVzKSB7XG5cdFx0XHRcdHJldHVybiByZXM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gd2UgY291bGQgY2hlY2sgZXZ0LmtleSBoZXJlLlxuXHRcdC8vIExlZ2FsIHZhbHVlcyBhcmUgZGVmaW5lZCBpbiBodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1FdmVudHMvI2tleS12YWx1ZXMtbGlzdCxcblx0XHQvLyBzbyB3ZSBcImp1c3RcIiBuZWVkIHRvIG1hcCB0aGVtIHRvIGtleXN5bSwgYnV0IEFGQUlLIHRoaXMgaXMgb25seSBhdmFpbGFibGUgaW4gSUUxMCxcblx0XHQvLyB3aGljaCBhbHNvIHByb3ZpZGVzIGV2dC5rZXkgc28gd2UgZG9uJ3QgKm5lZWQqIGl0IHlldC5cblx0XHRpZiAoZXZ0LmtleUNvZGUpIHtcblx0XHRcdHJldHVybiBLZXlzLmxvb2t1cChLYmRVdGlsLmtleXN5bUZyb21LZXlDb2RlKGV2dC5rZXlDb2RlLCBldnQuc2hpZnRLZXkpKTtcblx0XHR9XG5cdFx0aWYgKGV2dC53aGljaCkge1xuXHRcdFx0cmV0dXJuIEtleXMubG9va3VwKEtiZFV0aWwua2V5c3ltRnJvbUtleUNvZGUoZXZ0LndoaWNoLCBldnQuc2hpZnRLZXkpKTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEdpdmVuIGEga2V5Y29kZSwgdHJ5IHRvIHByZWRpY3Qgd2hpY2gga2V5c3ltIGl0IG1pZ2h0IGJlLlxuXHQgKiBJZiB0aGUga2V5Y29kZSBpcyB1bmtub3duLCBudWxsIGlzIHJldHVybmVkLlxuXHQgKi9cblx0a2V5c3ltRnJvbUtleUNvZGU6IGZ1bmN0aW9uIChrZXljb2RlLCBzaGlmdFByZXNzZWQpIHtcblx0XHRpZiAodHlwZW9mKGtleWNvZGUpICE9PSAnbnVtYmVyJykge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdC8vIHdvbid0IGJlIGFjY3VyYXRlIGZvciBhemVydHlcblx0XHRpZiAoa2V5Y29kZSA+PSAweDMwICYmIGtleWNvZGUgPD0gMHgzOSkge1xuXHRcdFx0cmV0dXJuIGtleWNvZGU7IC8vIGRpZ2l0XG5cdFx0fVxuXHRcdGlmIChrZXljb2RlID49IDB4NDEgJiYga2V5Y29kZSA8PSAweDVhKSB7XG5cdFx0XHQvLyByZW1hcCB0byBsb3dlcmNhc2UgdW5sZXNzIHNoaWZ0IGlzIGRvd25cblx0XHRcdHJldHVybiBzaGlmdFByZXNzZWQgPyBrZXljb2RlIDoga2V5Y29kZSArIDMyOyAvLyBBLVpcblx0XHR9XG5cdFx0aWYgKGtleWNvZGUgPj0gMHg2MCAmJiBrZXljb2RlIDw9IDB4NjkpIHtcblx0XHRcdHJldHVybiBLZXlzLlhLX0tQXzAgKyAoa2V5Y29kZSAtIDB4NjApOyAvLyBudW1wYWQgMC05XG5cdFx0fVxuXG5cdFx0c3dpdGNoKGtleWNvZGUpIHtcblx0XHRcdGNhc2UgMHgyMDogcmV0dXJuIEtleXMuWEtfc3BhY2U7XG5cdFx0XHRjYXNlIDB4NmE6IHJldHVybiBLZXlzLlhLX0tQX011bHRpcGx5O1xuXHRcdFx0Y2FzZSAweDZiOiByZXR1cm4gS2V5cy5YS19LUF9BZGQ7XG5cdFx0XHRjYXNlIDB4NmM6IHJldHVybiBLZXlzLlhLX0tQX1NlcGFyYXRvcjtcblx0XHRcdGNhc2UgMHg2ZDogcmV0dXJuIEtleXMuWEtfS1BfU3VidHJhY3Q7XG5cdFx0XHRjYXNlIDB4NmU6IHJldHVybiBLZXlzLlhLX0tQX0RlY2ltYWw7XG5cdFx0XHRjYXNlIDB4NmY6IHJldHVybiBLZXlzLlhLX0tQX0RpdmlkZTtcblx0XHRcdGNhc2UgMHhiYjogcmV0dXJuIEtleXMuWEtfcGx1cztcblx0XHRcdGNhc2UgMHhiYzogcmV0dXJuIEtleXMuWEtfY29tbWE7XG5cdFx0XHRjYXNlIDB4YmQ6IHJldHVybiBLZXlzLlhLX21pbnVzO1xuXHRcdFx0Y2FzZSAweGJlOiByZXR1cm4gS2V5cy5YS19wZXJpb2Q7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIEtiZFV0aWwubm9uQ2hhcmFjdGVyS2V5KHtrZXlDb2RlOiBrZXljb2RlfSk7XG5cdH0sXG5cblx0LyoqXG5cdCAqIElmIHRoZSBrZXkgaXMgYSBrbm93biBub24tY2hhcmFjdGVyIGtleSAoYW55IGtleSB3aGljaCBkb2Vzbid0IGdlbmVyYXRlXG5cdCAqIGNoYXJhY3RlciBkYXRhKSByZXR1cm4gaXRzIGtleXN5bSB2YWx1ZS4gT3RoZXJ3aXNlIHJldHVybiBudWxsLlxuXHQgKi9cblx0bm9uQ2hhcmFjdGVyS2V5OiBmdW5jdGlvbiAoZXZ0KSB7XG5cdFx0Ly8gZXZ0LmtleSBub3QgaW1wbGVtZW50ZWQgeWV0XG5cdFx0aWYgKCFldnQua2V5Q29kZSkgeyByZXR1cm4gbnVsbDsgfVxuXG5cdFx0dmFyIGtleWNvZGUgPSBldnQua2V5Q29kZTtcblxuXHRcdGlmIChrZXljb2RlID49IDB4NzAgJiYga2V5Y29kZSA8PSAweDg3KSB7XG5cdFx0XHRyZXR1cm4gS2V5cy5YS19GMSArIGtleWNvZGUgLSAweDcwOyAvLyBGMS1GMjRcblx0XHR9XG5cblx0XHRzd2l0Y2ggKGtleWNvZGUpIHtcblx0XHRcdGNhc2UgOCA6IHJldHVybiBLZXlzLlhLX0JhY2tTcGFjZTtcblx0XHRcdGNhc2UgMTMgOiByZXR1cm4gS2V5cy5YS19SZXR1cm47XG5cblx0XHRcdGNhc2UgOSA6IHJldHVybiBLZXlzLlhLX1RhYjtcblxuXHRcdFx0Y2FzZSAyNyA6IHJldHVybiBLZXlzLlhLX0VzY2FwZTtcblx0XHRcdGNhc2UgNDYgOiByZXR1cm4gS2V5cy5YS19EZWxldGU7XG5cblx0XHRcdGNhc2UgMzYgOiByZXR1cm4gS2V5cy5YS19Ib21lO1xuXHRcdFx0Y2FzZSAzNSA6IHJldHVybiBLZXlzLlhLX0VuZDtcblx0XHRcdGNhc2UgMzMgOiByZXR1cm4gS2V5cy5YS19QYWdlX1VwO1xuXHRcdFx0Y2FzZSAzNCA6IHJldHVybiBLZXlzLlhLX1BhZ2VfRG93bjtcblx0XHRcdGNhc2UgNDUgOiByZXR1cm4gS2V5cy5YS19JbnNlcnQ7XG5cblx0XHRcdGNhc2UgMzcgOiByZXR1cm4gS2V5cy5YS19MZWZ0O1xuXHRcdFx0Y2FzZSAzOCA6IHJldHVybiBLZXlzLlhLX1VwO1xuXHRcdFx0Y2FzZSAzOSA6IHJldHVybiBLZXlzLlhLX1JpZ2h0O1xuXHRcdFx0Y2FzZSA0MCA6IHJldHVybiBLZXlzLlhLX0Rvd247XG5cblx0XHRcdGNhc2UgMTYgOiByZXR1cm4gS2V5cy5YS19TaGlmdF9MO1xuXHRcdFx0Y2FzZSAxNyA6IHJldHVybiBLZXlzLlhLX0NvbnRyb2xfTDtcblx0XHRcdGNhc2UgMTggOiByZXR1cm4gS2V5cy5YS19BbHRfTDsgLy8gYWxzbzogT3B0aW9uLWtleSBvbiBNYWNcblxuXHRcdFx0Y2FzZSAyMjQgOiByZXR1cm4gS2V5cy5YS19NZXRhX0w7XG5cdFx0XHRjYXNlIDIyNSA6IHJldHVybiBLZXlzLlhLX0lTT19MZXZlbDNfU2hpZnQ7IC8vIEFsdEdyXG5cdFx0XHRjYXNlIDkxIDogcmV0dXJuIEtleXMuWEtfU3VwZXJfTDsgLy8gYWxzbzogV2luZG93cy1rZXlcblx0XHRcdGNhc2UgOTIgOiByZXR1cm4gS2V5cy5YS19TdXBlcl9SOyAvLyBhbHNvOiBXaW5kb3dzLWtleVxuXHRcdFx0Y2FzZSA5MyA6IHJldHVybiBLZXlzLlhLX01lbnU7IC8vIGFsc286IFdpbmRvd3MtTWVudSwgQ29tbWFuZCBvbiBNYWNcblxuXHRcdFx0ZGVmYXVsdDogcmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9LFxuXG5cdHN1YnN0aXR1dGVDb2RlcG9pbnQ6IGZ1bmN0aW9uKGNwKSB7XG5cdFx0Ly8gQW55IFVuaWNvZGUgY29kZSBwb2ludHMgd2hpY2ggZG8gbm90IGhhdmUgY29ycmVzcG9uZGluZyBrZXlzeW0gZW50cmllc1xuXHRcdC8vIGNhbiBiZSBzd2FwcGVkIG91dCBmb3IgYW5vdGhlciBjb2RlIHBvaW50IGJ5IGFkZGluZyB0aGVtIHRvIHRoaXMgdGFibGUuXG5cdFx0dmFyIHN1YnN0aXR1dGlvbnMgPSB7XG5cdFx0XHQvLyB7UyxzfSB3aXRoIGNvbW1hIGJlbG93IC0+IHtTLHN9IHdpdGggY2VkaWxsYVxuXHRcdFx0MHgyMTggOiAweDE1ZSxcblx0XHRcdDB4MjE5IDogMHgxNWYsXG5cdFx0XHQvLyB7VCx0fSB3aXRoIGNvbW1hIGJlbG93IC0+IHtULHR9IHdpdGggY2VkaWxsYVxuXHRcdFx0MHgyMWEgOiAweDE2Mixcblx0XHRcdDB4MjFiIDogMHgxNjNcblx0XHR9O1xuXG5cdFx0dmFyIHN1YiA9IHN1YnN0aXR1dGlvbnNbY3BdO1xuXHRcdHJldHVybiBzdWIgPyBzdWIgOiBjcDtcblx0fSxcblxuXHQvKipcblx0ICogVGFrZXMgYSBET00ga2V5Ym9hcmQgZXZlbnQgYW5kOlxuXHQgKiAtIGRldGVybWluZXMgd2hpY2gga2V5c3ltIGl0IHJlcHJlc2VudHMuXG5cdCAqIC0gZGV0ZXJtaW5lcyBhIGtleUlkICBpZGVudGlmeWluZyB0aGUga2V5IHRoYXQgd2FzIHByZXNzZWQgKGNvcnJlc3BvbmRpbmdcblx0ICogICB0byB0aGUga2V5L2tleUNvZGUgcHJvcGVydGllcyBvbiB0aGUgRE9NIGV2ZW50KS5cblx0ICogLSBzeW50aGVzaXplcyBldmVudHMgdG8gc3luY2hyb25pemUgbW9kaWZpZXIga2V5IHN0YXRlIGJldHdlZW4gd2hpY2hcblx0ICogICBtb2RpZmllcnMgYXJlIGFjdHVhbGx5IGRvd24sIGFuZCB3aGljaCB3ZSB0aG91Z2h0IHdlcmUgZG93bi5cblx0ICogLSBtYXJrcyBlYWNoIGV2ZW50IHdpdGggYW4gJ2VzY2FwZScgcHJvcGVydHkgaWYgYSBtb2RpZmllciB3YXMgZG93biB3aGljaFxuXHQgKiAgIHNob3VsZCBiZSBcImVzY2FwZWRcIi5cblx0ICogLSBnZW5lcmF0ZXMgYSBcInN0YWxsXCIgZXZlbnQgaW4gY2FzZXMgd2hlcmUgaXQgbWlnaHQgYmUgbmVjZXNzYXJ5IHRvIHdhaXRcblx0ICogICBhbmQgc2VlIGlmIGEga2V5cHJlc3MgZXZlbnQgZm9sbG93cyBhIGtleWRvd24uXG5cdCAqXG5cdCAqIFRoaXMgaW5mb3JtYXRpb24gaXMgY29sbGVjdGVkIGludG8gYW4gb2JqZWN0IHdoaWNoIGlzIHBhc3NlZCB0byB0aGUgbmV4dCgpXG5cdCAqIGZ1bmN0aW9uIChvbmUgY2FsbCBwZXIgZXZlbnQpLlxuXHQgKi9cblx0S2V5RXZlbnREZWNvZGVyOiBmdW5jdGlvbiAobW9kaWZpZXJTdGF0ZSwgbmV4dCkge1xuXHRcdGZ1bmN0aW9uIHNlbmRBbGwoZXZ0cykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBldnRzLmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdG5leHQoZXZ0c1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcHJvY2VzcyhldnQsIHR5cGUpIHtcblx0XHRcdHZhciByZXN1bHQgPSB7dHlwZTogdHlwZX07XG5cdFx0XHR2YXIga2V5SWQgPSBLYmRVdGlsLmdldEtleShldnQpO1xuXG5cdFx0XHRpZiAoa2V5SWQpIHtcblx0XHRcdFx0cmVzdWx0LmtleUlkID0ga2V5SWQ7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBrZXlzeW0gPSBLYmRVdGlsLmdldEtleXN5bShldnQpO1xuXG5cdFx0XHR2YXIgaGFzTW9kaWZpZXIgPSBtb2RpZmllclN0YXRlLmhhc1Nob3J0Y3V0TW9kaWZpZXIoKSB8fCAhIW1vZGlmaWVyU3RhdGUuYWN0aXZlQ2hhck1vZGlmaWVyKCk7XG5cblx0XHRcdC8vIElzIHRoaXMgYSBjYXNlIHdoZXJlIHdlIGhhdmUgdG8gZGVjaWRlIG9uIHRoZSBrZXlzeW0gcmlnaHQgYXdheSwgcmF0aGVyIHRoYW4gd2FpdGluZyBmb3IgdGhlIGtleXByZXNzP1xuXHRcdFx0Ly8gXCJzcGVjaWFsXCIga2V5cyBsaWtlIGVudGVyLCB0YWIgb3IgYmFja3NwYWNlIGRvbid0IHNlbmQga2V5cHJlc3MgZXZlbnRzLFxuXHRcdFx0Ly8gYW5kIHNvbWUgYnJvd3NlcnMgZG9uJ3Qgc2VuZCBrZXlwcmVzc2VzIGF0IGFsbCBpZiBhIG1vZGlmaWVyIGlzIGRvd25cblx0XHRcdGlmIChrZXlzeW0gJiYgKHR5cGUgIT09ICdrZXlkb3duJyB8fCBLYmRVdGlsLm5vbkNoYXJhY3RlcktleShldnQpIHx8IGhhc01vZGlmaWVyKSkge1xuXHRcdFx0XHRyZXN1bHQua2V5c3ltID0ga2V5c3ltO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgaXNTaGlmdCA9IGV2dC5rZXlDb2RlID09PSAweDEwIHx8IGV2dC5rZXkgPT09ICdTaGlmdCc7XG5cblx0XHRcdC8vIFNob3VsZCB3ZSBwcmV2ZW50IHRoZSBicm93c2VyIGZyb20gaGFuZGxpbmcgdGhlIGV2ZW50P1xuXHRcdFx0Ly8gRG9pbmcgc28gb24gYSBrZXlkb3duIChpbiBtb3N0IGJyb3dzZXJzKSBwcmV2ZW50cyBrZXlwcmVzcyBmcm9tIGJlaW5nIGdlbmVyYXRlZFxuXHRcdFx0Ly8gc28gb25seSBkbyB0aGF0IGlmIHdlIGhhdmUgdG8uXG5cdFx0XHR2YXIgc3VwcHJlc3MgPSAhaXNTaGlmdCAmJiAodHlwZSAhPT0gJ2tleWRvd24nIHx8IG1vZGlmaWVyU3RhdGUuaGFzU2hvcnRjdXRNb2RpZmllcigpIHx8ICEhS2JkVXRpbC5ub25DaGFyYWN0ZXJLZXkoZXZ0KSk7XG5cblx0XHRcdC8vIElmIGEgY2hhciBtb2RpZmllciBpcyBkb3duIG9uIGEga2V5ZG93biwgd2UgbmVlZCB0byBpbnNlcnQgYSBzdGFsbCxcblx0XHRcdC8vIHNvIFZlcmlmeUNoYXJNb2RpZmllciBrbm93cyB0byB3YWl0IGFuZCBzZWUgaWYgYSBrZXlwcmVzcyBpcyBjb21uaWdcblx0XHRcdHZhciBzdGFsbCA9IHR5cGUgPT09ICdrZXlkb3duJyAmJiBtb2RpZmllclN0YXRlLmFjdGl2ZUNoYXJNb2RpZmllcigpICYmICFLYmRVdGlsLm5vbkNoYXJhY3RlcktleShldnQpO1xuXG5cdFx0XHQvLyBpZiBhIGNoYXIgbW9kaWZpZXIgaXMgcHJlc3NlZCwgZ2V0IHRoZSBrZXlzIGl0IGNvbnNpc3RzIG9mIChvbiBXaW5kb3dzLCBBbHRHciBpcyBlcXVpdmFsZW50IHRvIEN0cmwrQWx0KVxuXHRcdFx0dmFyIGFjdGl2ZSA9IG1vZGlmaWVyU3RhdGUuYWN0aXZlQ2hhck1vZGlmaWVyKCk7XG5cblx0XHRcdC8vIElmIHdlIGhhdmUgYSBjaGFyIG1vZGlmaWVyIGRvd24sIGFuZCB3ZSdyZSBhYmxlIHRvIGRldGVybWluZSBhIGtleXN5bSByZWxpYWJseVxuXHRcdFx0Ly8gdGhlbiAoYSkgd2Uga25vdyB0byB0cmVhdCB0aGUgbW9kaWZpZXIgYXMgYSBjaGFyIG1vZGlmaWVyLFxuXHRcdFx0Ly8gYW5kIChiKSB3ZSdsbCBoYXZlIHRvIFwiZXNjYXBlXCIgdGhlIG1vZGlmaWVyIHRvIHVuZG8gdGhlIG1vZGlmaWVyIHdoZW4gc2VuZGluZyB0aGUgY2hhci5cblx0XHRcdGlmIChhY3RpdmUgJiYga2V5c3ltKSB7XG5cdFx0XHRcdHZhciBpc0NoYXJNb2RpZmllciA9IGZhbHNlO1xuXHRcdFx0XHRmb3IgKHZhciBpICA9IDA7IGkgPCBhY3RpdmUubGVuZ3RoOyArK2kpIHtcblx0XHRcdFx0XHRpZiAoYWN0aXZlW2ldID09PSBrZXlzeW0ua2V5c3ltKSB7XG5cdFx0XHRcdFx0XHRpc0NoYXJNb2RpZmllciA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0eXBlID09PSAna2V5cHJlc3MnICYmICFpc0NoYXJNb2RpZmllcikge1xuXHRcdFx0XHRcdHJlc3VsdC5lc2NhcGUgPSBtb2RpZmllclN0YXRlLmFjdGl2ZUNoYXJNb2RpZmllcigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzdGFsbCkge1xuXHRcdFx0XHQvLyBpbnNlcnQgYSBmYWtlIFwic3RhbGxcIiBldmVudFxuXHRcdFx0XHRuZXh0KHt0eXBlOiAnc3RhbGwnfSk7XG5cdFx0XHR9XG5cdFx0XHRuZXh0KHJlc3VsdCk7XG5cblx0XHRcdHJldHVybiBzdXBwcmVzcztcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0a2V5ZG93bjogZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdHNlbmRBbGwobW9kaWZpZXJTdGF0ZS5rZXlkb3duKGV2dCkpO1xuXHRcdFx0XHRyZXR1cm4gcHJvY2VzcyhldnQsICdrZXlkb3duJyk7XG5cdFx0XHR9LFxuXHRcdFx0a2V5cHJlc3M6IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRyZXR1cm4gcHJvY2VzcyhldnQsICdrZXlwcmVzcycpO1xuXHRcdFx0fSxcblx0XHRcdGtleXVwOiBmdW5jdGlvbihldnQpIHtcblx0XHRcdFx0c2VuZEFsbChtb2RpZmllclN0YXRlLmtleXVwKGV2dCkpO1xuXHRcdFx0XHRyZXR1cm4gcHJvY2VzcyhldnQsICdrZXl1cCcpO1xuXHRcdFx0fSxcblx0XHRcdHN5bmNNb2RpZmllcnM6IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRzZW5kQWxsKG1vZGlmaWVyU3RhdGUuc3luY0FueShldnQpKTtcblx0XHRcdH0sXG5cdFx0XHRyZWxlYXNlQWxsOiBmdW5jdGlvbigpIHsgbmV4dCh7dHlwZTogJ3JlbGVhc2VhbGwnfSk7IH1cblx0XHR9O1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBDb21iaW5lcyBrZXlkb3duIGFuZCBrZXlwcmVzcyBldmVudHMgd2hlcmUgbmVjZXNzYXJ5IHRvIGhhbmRsZSBjaGFyIG1vZGlmaWVycy5cblx0ICogT24gc29tZSBPUydlcywgYSBjaGFyIG1vZGlmaWVyIGlzIHNvbWV0aW1lcyB1c2VkIGFzIGEgc2hvcnRjdXQgbW9kaWZpZXIuXG5cdCAqIEZvciBleGFtcGxlLCBvbiBXaW5kb3dzLCBBbHRHciBpcyBzeW5vbnltb3VzIHdpdGggQ3RybC1BbHQuIE9uIGEgRGFuaXNoIGtleWJvYXJkXG5cdCAqIGxheW91dCwgQWx0R3ItMiB5aWVsZHMgYSBALCBidXQgQ3RybC1BbHQtRCBkb2VzIG5vdGhpbmcgc28gd2hlbiB1c2VkIHdpdGggdGhlXG5cdCAqICcyJyBrZXksIEN0cmwtQWx0IGNvdW50cyBhcyBhIGNoYXIgbW9kaWZpZXIgKGFuZCBzaG91bGQgYmUgZXNjYXBlZCksIGJ1dCB3aGVuXG5cdCAqIHVzZWQgd2l0aCAnRCcsIGl0IGRvZXMgbm90LlxuXHQgKiBUaGUgb25seSB3YXkgd2UgY2FuIGRpc3Rpbmd1aXNoIHRoZXNlIGNhc2VzIGlzIHRvIHdhaXQgYW5kIHNlZSBpZiBhIGtleXByZXNzXG5cdCAqIGV2ZW50IGFycml2ZXMuIFdoZW4gd2UgcmVjZWl2ZSBhIFwic3RhbGxcIiBldmVudCwgd2FpdCBhIGZldyBtcyBiZWZvcmUgcHJvY2Vzc2luZ1xuXHQgKiB0aGUgbmV4dCBrZXlkb3duLiBJZiBhIGtleXByZXNzIGhhcyBhbHNvIGFycml2ZWQsIG1lcmdlIHRoZSB0d28uXG5cdCAqL1xuXHRWZXJpZnlDaGFyTW9kaWZpZXI6IGZ1bmN0aW9uIChuZXh0KSB7XG5cdFx0dmFyIHF1ZXVlID0gW107XG5cdFx0dmFyIHRpbWVyID0gbnVsbDtcblxuXHRcdGZ1bmN0aW9uIHByb2Nlc3MoKSB7XG5cdFx0XHRpZiAodGltZXIpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBkZWxheVByb2Nlc3MgKCkge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZXIpO1xuXHRcdFx0XHR0aW1lciA9IG51bGw7XG5cdFx0XHRcdHByb2Nlc3MoKTtcblx0XHRcdH1cblxuXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCAhPT0gMCkge1xuXHRcdFx0XHR2YXIgY3VyID0gcXVldWVbMF07XG5cdFx0XHRcdHF1ZXVlID0gcXVldWUuc3BsaWNlKDEpO1xuXG5cdFx0XHRcdHN3aXRjaCAoY3VyLnR5cGUpIHtcblx0XHRcdFx0XHRjYXNlICdzdGFsbCc6XG5cdFx0XHRcdFx0XHQvLyBpbnNlcnQgYSBkZWxheSBiZWZvcmUgcHJvY2Vzc2luZyBhdmFpbGFibGUgZXZlbnRzLlxuXHRcdFx0XHRcdFx0LyoganNoaW50IGxvb3BmdW5jOiB0cnVlICovXG5cdFx0XHRcdFx0XHR0aW1lciA9IHNldFRpbWVvdXQoZGVsYXlQcm9jZXNzLCA1KTtcblx0XHRcdFx0XHRcdC8qIGpzaGludCBsb29wZnVuYzogZmFsc2UgKi9cblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRjYXNlICdrZXlkb3duJzpcblx0XHRcdFx0XHRcdC8vIGlzIHRoZSBuZXh0IGVsZW1lbnQgYSBrZXlwcmVzcz8gVGhlbiB3ZSBzaG91bGQgbWVyZ2UgdGhlIHR3b1xuXHRcdFx0XHRcdFx0aWYgKHF1ZXVlLmxlbmd0aCAhPT0gMCAmJiBxdWV1ZVswXS50eXBlID09PSAna2V5cHJlc3MnKSB7XG5cdFx0XHRcdFx0XHRcdC8vIEZpcmVmb3ggc2VuZHMga2V5cHJlc3MgZXZlbiB3aGVuIG5vIGNoYXIgaXMgZ2VuZXJhdGVkLlxuXHRcdFx0XHRcdFx0XHQvLyBzbywgaWYga2V5cHJlc3Mga2V5c3ltIGlzIHRoZSBzYW1lIGFzIHdlJ2QgaGF2ZSBndWVzc2VkIGZyb20ga2V5ZG93bixcblx0XHRcdFx0XHRcdFx0Ly8gdGhlIG1vZGlmaWVyIGRpZG4ndCBoYXZlIGFueSBlZmZlY3QsIGFuZCBzaG91bGQgbm90IGJlIGVzY2FwZWRcblx0XHRcdFx0XHRcdFx0aWYgKHF1ZXVlWzBdLmVzY2FwZSAmJiAoIWN1ci5rZXlzeW0gfHwgY3VyLmtleXN5bS5rZXlzeW0gIT09IHF1ZXVlWzBdLmtleXN5bS5rZXlzeW0pKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y3VyLmVzY2FwZSA9IHF1ZXVlWzBdLmVzY2FwZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRjdXIua2V5c3ltID0gcXVldWVbMF0ua2V5c3ltO1xuXHRcdFx0XHRcdFx0XHRxdWV1ZSA9IHF1ZXVlLnNwbGljZSgxKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gc3dhbGxvdyBzdGFsbCBldmVudHMsIGFuZCBwYXNzIGFsbCBvdGhlcnMgdG8gdGhlIG5leHQgc3RhZ2Vcblx0XHRcdFx0aWYgKGN1ci50eXBlICE9PSAnc3RhbGwnKSB7XG5cdFx0XHRcdFx0bmV4dChjdXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0cXVldWUucHVzaChldnQpO1xuXHRcdFx0cHJvY2VzcygpO1xuXHRcdH07XG5cdH0sXG5cblx0LyoqXG5cdCAqIEtlZXBzIHRyYWNrIG9mIHdoaWNoIGtleXMgd2UgKGFuZCB0aGUgc2VydmVyKSBiZWxpZXZlIGFyZSBkb3duLlxuXHQgKiBXaGVuIGEga2V5dXAgaXMgcmVjZWl2ZWQsIG1hdGNoIGl0IGFnYWluc3QgdGhpcyBsaXN0LCB0byBkZXRlcm1pbmUgdGhlXG5cdCAqIGNvcnJlc3BvbmRpbmcga2V5c3ltKHMpIGluIHNvbWUgY2FzZXMsIGEgc2luZ2xlIGtleSBtYXkgcHJvZHVjZSBtdWx0aXBsZVxuXHQgKiBrZXlzeW1zLCBzbyB0aGUgY29ycmVzcG9uZGluZyBrZXl1cCBldmVudCBtdXN0IHJlbGVhc2UgYWxsIG9mIHRoZXNlIGNoYXJzXG5cdCAqIGtleSByZXBlYXQgZXZlbnRzIHNob3VsZCBiZSBtZXJnZWQgaW50byBhIHNpbmdsZSBlbnRyeS5cblx0ICogQmVjYXVzZSB3ZSBjYW4ndCBhbHdheXMgaWRlbnRpZnkgd2hpY2ggZW50cnkgYSBrZXlkb3duIG9yIGtleXVwIGV2ZW50XG5cdCAqIGNvcnJlc3BvbmRzIHRvLCB3ZSBzb21ldGltZXMgaGF2ZSB0byBndWVzcy5cblx0ICovXG5cdFRyYWNrS2V5U3RhdGU6IGZ1bmN0aW9uIChuZXh0KSB7XG5cdFx0dmFyIHN0YXRlID0gW107XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKGV2dCkge1xuXHRcdFx0dmFyIGxhc3QgPSBzdGF0ZS5sZW5ndGggIT09IDAgPyBzdGF0ZVtzdGF0ZS5sZW5ndGgtMV0gOiBudWxsO1xuXG5cdFx0XHRzd2l0Y2ggKGV2dC50eXBlKSB7XG5cdFx0XHRcdGNhc2UgJ2tleWRvd24nOlxuXHRcdFx0XHRcdC8vIGluc2VydCBhIG5ldyBlbnRyeSBpZiBsYXN0IHNlZW4ga2V5IHdhcyBkaWZmZXJlbnQuXG5cdFx0XHRcdFx0aWYgKCFsYXN0IHx8ICFldnQua2V5SWQgfHwgbGFzdC5rZXlJZCAhPT0gZXZ0LmtleUlkKSB7XG5cdFx0XHRcdFx0XHRsYXN0ID0ge2tleUlkOiBldnQua2V5SWQsIGtleXN5bXM6IHt9fTtcblx0XHRcdFx0XHRcdHN0YXRlLnB1c2gobGFzdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChldnQua2V5c3ltKSB7XG5cdFx0XHRcdFx0XHQvLyBtYWtlIHN1cmUgbGFzdCBldmVudCBjb250YWlucyB0aGlzIGtleXN5bSAoYSBzaW5nbGUgXCJsb2dpY2FsXCIga2V5ZXZlbnRcblx0XHRcdFx0XHRcdC8vIGNhbiBjYXVzZSBtdWx0aXBsZSBrZXkgZXZlbnRzIHRvIGJlIHNlbnQgdG8gdGhlIFZOQyBzZXJ2ZXIpXG5cdFx0XHRcdFx0XHRsYXN0LmtleXN5bXNbZXZ0LmtleXN5bS5rZXlzeW1dID0gZXZ0LmtleXN5bTtcblx0XHRcdFx0XHRcdGxhc3QuaWdub3JlS2V5UHJlc3MgPSB0cnVlO1xuXHRcdFx0XHRcdFx0bmV4dChldnQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAna2V5cHJlc3MnOlxuXHRcdFx0XHRcdGlmICghbGFzdCkge1xuXHRcdFx0XHRcdFx0bGFzdCA9IHtrZXlJZDogZXZ0LmtleUlkLCBrZXlzeW1zOiB7fX07XG5cdFx0XHRcdFx0XHRzdGF0ZS5wdXNoKGxhc3QpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIWV2dC5rZXlzeW0pIHtcblx0XHRcdFx0XHRcdGRlYnVnZXJyb3IoJ1RyYWNrS2V5U3RhdGUoKSB8IGtleXByZXNzIHdpdGggbm8ga2V5c3ltOicsIGV2dCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gSWYgd2UgZGlkbid0IGV4cGVjdCBhIGtleXByZXNzLCBhbmQgYWxyZWFkeSBzZW50IGEga2V5ZG93biB0byB0aGUgVk5DIHNlcnZlclxuXHRcdFx0XHRcdC8vIGJhc2VkIG9uIHRoZSBrZXlkb3duLCBtYWtlIHN1cmUgdG8gc2tpcCB0aGlzIGV2ZW50LlxuXHRcdFx0XHRcdGlmIChldnQua2V5c3ltICYmICFsYXN0Lmlnbm9yZUtleVByZXNzKSB7XG5cdFx0XHRcdFx0XHRsYXN0LmtleXN5bXNbZXZ0LmtleXN5bS5rZXlzeW1dID0gZXZ0LmtleXN5bTtcblx0XHRcdFx0XHRcdGV2dC50eXBlID0gJ2tleWRvd24nO1xuXHRcdFx0XHRcdFx0bmV4dChldnQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAna2V5dXAnOlxuXHRcdFx0XHRcdGlmIChzdGF0ZS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFyIGlkeCA9IG51bGw7XG5cdFx0XHRcdFx0Ly8gZG8gd2UgaGF2ZSBhIG1hdGNoaW5nIGtleSB0cmFja2VkIGFzIGJlaW5nIGRvd24/XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgIT09IHN0YXRlLmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdFx0XHRpZiAoc3RhdGVbaV0ua2V5SWQgPT09IGV2dC5rZXlJZCkge1xuXHRcdFx0XHRcdFx0XHRpZHggPSBpO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gaWYgd2UgY291bGRuJ3QgZmluZCBhIG1hdGNoIChpdCBoYXBwZW5zKSwgYXNzdW1lIGl0IHdhcyB0aGUgbGFzdCBrZXkgcHJlc3NlZFxuXHRcdFx0XHRcdGlmIChpZHggPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdGlkeCA9IHN0YXRlLmxlbmd0aCAtIDE7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIGl0ZW0gPSBzdGF0ZS5zcGxpY2UoaWR4LCAxKVswXTtcblx0XHRcdFx0XHQvLyBmb3IgZWFjaCBrZXlzeW0gdHJhY2tlZCBieSB0aGlzIGtleSBlbnRyeSwgY2xvbmUgdGhlIGN1cnJlbnQgZXZlbnQgYW5kIG92ZXJyaWRlIHRoZSBrZXlzeW1cblx0XHRcdFx0XHR2YXIgY2xvbmUgPSAoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdGZ1bmN0aW9uIENsb25lKCl7fVxuXHRcdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChvYmopIHsgQ2xvbmUucHJvdG90eXBlPW9iajsgcmV0dXJuIG5ldyBDbG9uZSgpOyB9O1xuXHRcdFx0XHRcdH0oKSk7XG5cdFx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGl0ZW0ua2V5c3ltcykge1xuXHRcdFx0XHRcdFx0dmFyIG91dCA9IGNsb25lKGV2dCk7XG5cdFx0XHRcdFx0XHRvdXQua2V5c3ltID0gaXRlbS5rZXlzeW1zW2tleV07XG5cdFx0XHRcdFx0XHRuZXh0KG91dCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdyZWxlYXNlYWxsJzpcblx0XHRcdFx0XHQvKiBqc2hpbnQgc2hhZG93OiB0cnVlICovXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdGF0ZS5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIga2V5IGluIHN0YXRlW2ldLmtleXN5bXMpIHtcblx0XHRcdFx0XHRcdFx0dmFyIGtleXN5bSA9IHN0YXRlW2ldLmtleXN5bXNba2V5XTtcblx0XHRcdFx0XHRcdFx0bmV4dCh7a2V5SWQ6IDAsIGtleXN5bToga2V5c3ltLCB0eXBlOiAna2V5dXAnfSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8qIGpzaGludCBzaGFkb3c6IGZhbHNlICovXG5cdFx0XHRcdFx0c3RhdGUgPSBbXTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9O1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBIYW5kbGVzIFwiZXNjYXBpbmdcIiBvZiBtb2RpZmllcnM6IGlmIGEgY2hhciBtb2RpZmllciBpcyB1c2VkIHRvIHByb2R1Y2UgYVxuXHQgKiBrZXlzeW0gKHN1Y2ggYXMgQWx0R3ItMiB0byBnZW5lcmF0ZSBhbiBAKSwgdGhlbiB0aGUgbW9kaWZpZXIgbXVzdCBiZVxuXHQgKiBcInVuZG9uZVwiIGJlZm9yZSBzZW5kaW5nIHRoZSBALCBhbmQgXCJyZWRvbmVcIiBhZnRlcndhcmRzLlxuXHQgKi9cblx0RXNjYXBlTW9kaWZpZXJzOiBmdW5jdGlvbiAobmV4dCkge1xuXHRcdHJldHVybiBmdW5jdGlvbihldnQpIHtcblx0XHRcdHZhciBpO1xuXG5cdFx0XHRpZiAoZXZ0LnR5cGUgIT09ICdrZXlkb3duJyB8fCBldnQuZXNjYXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0bmV4dChldnQpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIHVuZG8gbW9kaWZpZXJzXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgZXZ0LmVzY2FwZS5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHRuZXh0KHt0eXBlOiAna2V5dXAnLCBrZXlJZDogMCwga2V5c3ltOiBLZXlzLmxvb2t1cChldnQuZXNjYXBlW2ldKX0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBzZW5kIHRoZSBjaGFyYWN0ZXIgZXZlbnRcblx0XHRcdG5leHQoZXZ0KTtcblxuXHRcdFx0Ly8gcmVkbyBtb2RpZmllcnNcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBldnQuZXNjYXBlLmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdG5leHQoe3R5cGU6ICdrZXlkb3duJywga2V5SWQ6IDAsIGtleXN5bTogS2V5cy5sb29rdXAoZXZ0LmVzY2FwZVtpXSl9KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59O1xuXG5cbi8qKlxuICogUHJpdmF0ZSBBUEkuXG4gKi9cblxuXG5mdW5jdGlvbiBpc01hYygpIHtcblx0cmV0dXJuIG5hdmlnYXRvciAmJiAhISgvbWFjL2kpLmV4ZWMobmF2aWdhdG9yLnBsYXRmb3JtKTtcbn1cblxuZnVuY3Rpb24gaXNXaW5kb3dzKCkge1xuXHRyZXR1cm4gbmF2aWdhdG9yICYmICEhKC93aW4vaSkuZXhlYyhuYXZpZ2F0b3IucGxhdGZvcm0pO1xufVxuXG5mdW5jdGlvbiBpc0xpbnV4KCkge1xuXHRyZXR1cm4gbmF2aWdhdG9yICYmICEhKC9saW51eC9pKS5leGVjKG5hdmlnYXRvci5wbGF0Zm9ybSk7XG59XG4iLCIvKipcbiAqIFRoZSBPYmplY3QgdG8gYmUgZXhwb3NlZC5cbiAqL1xudmFyIEtleXMgPSB7XG5cdFhLX1ZvaWRTeW1ib2w6ICAgICAgICAgICAgICAgICAgMHhmZmZmZmYsIC8qIFZvaWQgc3ltYm9sICovXG5cblx0WEtfQmFja1NwYWNlOiAgICAgICAgICAgICAgICAgICAweGZmMDgsIC8qIEJhY2sgc3BhY2UsIGJhY2sgY2hhciAqL1xuXHRYS19UYWI6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmYwOSxcblx0WEtfTGluZWZlZWQ6ICAgICAgICAgICAgICAgICAgICAweGZmMGEsIC8qIExpbmVmZWVkLCBMRiAqL1xuXHRYS19DbGVhcjogICAgICAgICAgICAgICAgICAgICAgIDB4ZmYwYixcblx0WEtfUmV0dXJuOiAgICAgICAgICAgICAgICAgICAgICAweGZmMGQsIC8qIFJldHVybiwgZW50ZXIgKi9cblx0WEtfUGF1c2U6ICAgICAgICAgICAgICAgICAgICAgICAweGZmMTMsIC8qIFBhdXNlLCBob2xkICovXG5cdFhLX1Njcm9sbF9Mb2NrOiAgICAgICAgICAgICAgICAgMHhmZjE0LFxuXHRYS19TeXNfUmVxOiAgICAgICAgICAgICAgICAgICAgIDB4ZmYxNSxcblx0WEtfRXNjYXBlOiAgICAgICAgICAgICAgICAgICAgICAweGZmMWIsXG5cdFhLX0RlbGV0ZTogICAgICAgICAgICAgICAgICAgICAgMHhmZmZmLCAvKiBEZWxldGUsIHJ1Ym91dCAqL1xuXG5cdC8qIEN1cnNvciBjb250cm9sICYgbW90aW9uICovXG5cblx0WEtfSG9tZTogICAgICAgICAgICAgICAgICAgICAgICAweGZmNTAsXG5cdFhLX0xlZnQ6ICAgICAgICAgICAgICAgICAgICAgICAgMHhmZjUxLCAvKiBNb3ZlIGxlZnQsIGxlZnQgYXJyb3cgKi9cblx0WEtfVXA6ICAgICAgICAgICAgICAgICAgICAgICAgICAweGZmNTIsIC8qIE1vdmUgdXAsIHVwIGFycm93ICovXG5cdFhLX1JpZ2h0OiAgICAgICAgICAgICAgICAgICAgICAgMHhmZjUzLCAvKiBNb3ZlIHJpZ2h0LCByaWdodCBhcnJvdyAqL1xuXHRYS19Eb3duOiAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmY1NCwgLyogTW92ZSBkb3duLCBkb3duIGFycm93ICovXG5cdFhLX1ByaW9yOiAgICAgICAgICAgICAgICAgICAgICAgMHhmZjU1LCAvKiBQcmlvciwgcHJldmlvdXMgKi9cblx0WEtfUGFnZV9VcDogICAgICAgICAgICAgICAgICAgICAweGZmNTUsXG5cdFhLX05leHQ6ICAgICAgICAgICAgICAgICAgICAgICAgMHhmZjU2LCAvKiBOZXh0ICovXG5cdFhLX1BhZ2VfRG93bjogICAgICAgICAgICAgICAgICAgMHhmZjU2LFxuXHRYS19FbmQ6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmY1NywgLyogRU9MICovXG5cdFhLX0JlZ2luOiAgICAgICAgICAgICAgICAgICAgICAgMHhmZjU4LCAvKiBCT0wgKi9cblxuXHQvKiBNaXNjIGZ1bmN0aW9ucyAqL1xuXG5cdFhLX1NlbGVjdDogICAgICAgICAgICAgICAgICAgICAgMHhmZjYwLCAvKiBTZWxlY3QsIG1hcmsgKi9cblx0WEtfUHJpbnQ6ICAgICAgICAgICAgICAgICAgICAgICAweGZmNjEsXG5cdFhLX0V4ZWN1dGU6ICAgICAgICAgICAgICAgICAgICAgMHhmZjYyLCAvKiBFeGVjdXRlLCBydW4sIGRvICovXG5cdFhLX0luc2VydDogICAgICAgICAgICAgICAgICAgICAgMHhmZjYzLCAvKiBJbnNlcnQsIGluc2VydCBoZXJlICovXG5cdFhLX1VuZG86ICAgICAgICAgICAgICAgICAgICAgICAgMHhmZjY1LFxuXHRYS19SZWRvOiAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmY2NiwgLyogUmVkbywgYWdhaW4gKi9cblx0WEtfTWVudTogICAgICAgICAgICAgICAgICAgICAgICAweGZmNjcsXG5cdFhLX0ZpbmQ6ICAgICAgICAgICAgICAgICAgICAgICAgMHhmZjY4LCAvKiBGaW5kLCBzZWFyY2ggKi9cblx0WEtfQ2FuY2VsOiAgICAgICAgICAgICAgICAgICAgICAweGZmNjksIC8qIENhbmNlbCwgc3RvcCwgYWJvcnQsIGV4aXQgKi9cblx0WEtfSGVscDogICAgICAgICAgICAgICAgICAgICAgICAweGZmNmEsIC8qIEhlbHAgKi9cblx0WEtfQnJlYWs6ICAgICAgICAgICAgICAgICAgICAgICAweGZmNmIsXG5cdFhLX01vZGVfc3dpdGNoOiAgICAgICAgICAgICAgICAgMHhmZjdlLCAvKiBDaGFyYWN0ZXIgc2V0IHN3aXRjaCAqL1xuXHRYS19zY3JpcHRfc3dpdGNoOiAgICAgICAgICAgICAgIDB4ZmY3ZSwgLyogQWxpYXMgZm9yIG1vZGVfc3dpdGNoICovXG5cdFhLX051bV9Mb2NrOiAgICAgICAgICAgICAgICAgICAgMHhmZjdmLFxuXG5cdC8qIEtleXBhZCBmdW5jdGlvbnMsIGtleXBhZCBudW1iZXJzIGNsZXZlcmx5IGNob3NlbiB0byBtYXAgdG8gQVNDSUkgKi9cblxuXHRYS19LUF9TcGFjZTogICAgICAgICAgICAgICAgICAgIDB4ZmY4MCwgLyogU3BhY2UgKi9cblx0WEtfS1BfVGFiOiAgICAgICAgICAgICAgICAgICAgICAweGZmODksXG5cdFhLX0tQX0VudGVyOiAgICAgICAgICAgICAgICAgICAgMHhmZjhkLCAvKiBFbnRlciAqL1xuXHRYS19LUF9GMTogICAgICAgICAgICAgICAgICAgICAgIDB4ZmY5MSwgLyogUEYxLCBLUF9BLCAuLi4gKi9cblx0WEtfS1BfRjI6ICAgICAgICAgICAgICAgICAgICAgICAweGZmOTIsXG5cdFhLX0tQX0YzOiAgICAgICAgICAgICAgICAgICAgICAgMHhmZjkzLFxuXHRYS19LUF9GNDogICAgICAgICAgICAgICAgICAgICAgIDB4ZmY5NCxcblx0WEtfS1BfSG9tZTogICAgICAgICAgICAgICAgICAgICAweGZmOTUsXG5cdFhLX0tQX0xlZnQ6ICAgICAgICAgICAgICAgICAgICAgMHhmZjk2LFxuXHRYS19LUF9VcDogICAgICAgICAgICAgICAgICAgICAgIDB4ZmY5Nyxcblx0WEtfS1BfUmlnaHQ6ICAgICAgICAgICAgICAgICAgICAweGZmOTgsXG5cdFhLX0tQX0Rvd246ICAgICAgICAgICAgICAgICAgICAgMHhmZjk5LFxuXHRYS19LUF9QcmlvcjogICAgICAgICAgICAgICAgICAgIDB4ZmY5YSxcblx0WEtfS1BfUGFnZV9VcDogICAgICAgICAgICAgICAgICAweGZmOWEsICAvLyBOT1RFOiBpYmMgZml4IChjb21tYSB3YXMgbWlzc2luZylcblx0WEtfS1BfTmV4dDogICAgICAgICAgICAgICAgICAgICAweGZmOWIsXG5cdFhLX0tQX1BhZ2VfRG93bjogICAgICAgICAgICAgICAgMHhmZjliLFxuXHRYS19LUF9FbmQ6ICAgICAgICAgICAgICAgICAgICAgIDB4ZmY5Yyxcblx0WEtfS1BfQmVnaW46ICAgICAgICAgICAgICAgICAgICAweGZmOWQsXG5cdFhLX0tQX0luc2VydDogICAgICAgICAgICAgICAgICAgMHhmZjllLFxuXHRYS19LUF9EZWxldGU6ICAgICAgICAgICAgICAgICAgIDB4ZmY5Zixcblx0WEtfS1BfRXF1YWw6ICAgICAgICAgICAgICAgICAgICAweGZmYmQsIC8qIEVxdWFscyAqL1xuXHRYS19LUF9NdWx0aXBseTogICAgICAgICAgICAgICAgIDB4ZmZhYSxcblx0WEtfS1BfQWRkOiAgICAgICAgICAgICAgICAgICAgICAweGZmYWIsXG5cdFhLX0tQX1NlcGFyYXRvcjogICAgICAgICAgICAgICAgMHhmZmFjLCAvKiBTZXBhcmF0b3IsIG9mdGVuIGNvbW1hICovXG5cdFhLX0tQX1N1YnRyYWN0OiAgICAgICAgICAgICAgICAgMHhmZmFkLFxuXHRYS19LUF9EZWNpbWFsOiAgICAgICAgICAgICAgICAgIDB4ZmZhZSxcblx0WEtfS1BfRGl2aWRlOiAgICAgICAgICAgICAgICAgICAweGZmYWYsXG5cblx0WEtfS1BfMDogICAgICAgICAgICAgICAgICAgICAgICAweGZmYjAsXG5cdFhLX0tQXzE6ICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmIxLFxuXHRYS19LUF8yOiAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZiMixcblx0WEtfS1BfMzogICAgICAgICAgICAgICAgICAgICAgICAweGZmYjMsXG5cdFhLX0tQXzQ6ICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmI0LFxuXHRYS19LUF81OiAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZiNSxcblx0WEtfS1BfNjogICAgICAgICAgICAgICAgICAgICAgICAweGZmYjYsXG5cdFhLX0tQXzc6ICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmI3LFxuXHRYS19LUF84OiAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZiOCxcblx0WEtfS1BfOTogICAgICAgICAgICAgICAgICAgICAgICAweGZmYjksXG5cblx0Lypcblx0ICogQXV4aWxpYXJ5IGZ1bmN0aW9uczsgbm90ZSB0aGUgZHVwbGljYXRlIGRlZmluaXRpb25zIGZvciBsZWZ0IGFuZCByaWdodFxuXHQgKiBmdW5jdGlvbiBrZXlzOyAgU3VuIGtleWJvYXJkcyBhbmQgYSBmZXcgb3RoZXIgbWFudWZhY3R1cmVycyBoYXZlIHN1Y2hcblx0ICogZnVuY3Rpb24ga2V5IGdyb3VwcyBvbiB0aGUgbGVmdCBhbmQvb3IgcmlnaHQgc2lkZXMgb2YgdGhlIGtleWJvYXJkLlxuXHQgKiBXZSd2ZSBub3QgZm91bmQgYSBrZXlib2FyZCB3aXRoIG1vcmUgdGhhbiAzNSBmdW5jdGlvbiBrZXlzIHRvdGFsLlxuXHQgKi9cblxuXHRYS19GMTogICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZiZSxcblx0WEtfRjI6ICAgICAgICAgICAgICAgICAgICAgICAgICAweGZmYmYsXG5cdFhLX0YzOiAgICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmMwLFxuXHRYS19GNDogICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZjMSxcblx0WEtfRjU6ICAgICAgICAgICAgICAgICAgICAgICAgICAweGZmYzIsXG5cdFhLX0Y2OiAgICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmMzLFxuXHRYS19GNzogICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZjNCxcblx0WEtfRjg6ICAgICAgICAgICAgICAgICAgICAgICAgICAweGZmYzUsXG5cdFhLX0Y5OiAgICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmM2LFxuXHRYS19GMTA6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZjNyxcblx0WEtfRjExOiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmYzgsXG5cdFhLX0wxOiAgICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmM4LFxuXHRYS19GMTI6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZjOSxcblx0WEtfTDI6ICAgICAgICAgICAgICAgICAgICAgICAgICAweGZmYzksXG5cdFhLX0YxMzogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmNhLFxuXHRYS19MMzogICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZjYSxcblx0WEtfRjE0OiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmY2IsXG5cdFhLX0w0OiAgICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmNiLFxuXHRYS19GMTU6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZjYyxcblx0WEtfTDU6ICAgICAgICAgICAgICAgICAgICAgICAgICAweGZmY2MsXG5cdFhLX0YxNjogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmNkLFxuXHRYS19MNjogICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZjZCxcblx0WEtfRjE3OiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmY2UsXG5cdFhLX0w3OiAgICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmNlLFxuXHRYS19GMTg6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZjZixcblx0WEtfTDg6ICAgICAgICAgICAgICAgICAgICAgICAgICAweGZmY2YsXG5cdFhLX0YxOTogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmQwLFxuXHRYS19MOTogICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkMCxcblx0WEtfRjIwOiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZDEsXG5cdFhLX0wxMDogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmQxLFxuXHRYS19GMjE6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkMixcblx0WEtfUjE6ICAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZDIsXG5cdFhLX0YyMjogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmQzLFxuXHRYS19SMjogICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkMyxcblx0WEtfRjIzOiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZDQsXG5cdFhLX1IzOiAgICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmQ0LFxuXHRYS19GMjQ6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkNSxcblx0WEtfUjQ6ICAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZDUsXG5cdFhLX0YyNTogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmQ2LFxuXHRYS19SNTogICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkNixcblx0WEtfRjI2OiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZDcsXG5cdFhLX1I2OiAgICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmQ3LFxuXHRYS19GMjc6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkOCxcblx0WEtfUjc6ICAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZDgsXG5cdFhLX0YyODogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmQ5LFxuXHRYS19SODogICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkOSxcblx0WEtfRjI5OiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZGEsXG5cdFhLX1I5OiAgICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmRhLFxuXHRYS19GMzA6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkYixcblx0WEtfUjEwOiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZGIsXG5cdFhLX0YzMTogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmRjLFxuXHRYS19SMTE6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkYyxcblx0WEtfRjMyOiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZGQsXG5cdFhLX1IxMjogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmRkLFxuXHRYS19GMzM6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkZSxcblx0WEtfUjEzOiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZGUsXG5cdFhLX0YzNDogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmRmLFxuXHRYS19SMTQ6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkZixcblx0WEtfRjM1OiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZTAsXG5cdFhLX1IxNTogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmUwLFxuXG5cdC8qIE1vZGlmaWVycyAqL1xuXG5cdFhLX1NoaWZ0X0w6ICAgICAgICAgICAgICAgICAgICAgMHhmZmUxLCAvKiBMZWZ0IHNoaWZ0ICovXG5cdFhLX1NoaWZ0X1I6ICAgICAgICAgICAgICAgICAgICAgMHhmZmUyLCAvKiBSaWdodCBzaGlmdCAqL1xuXHRYS19Db250cm9sX0w6ICAgICAgICAgICAgICAgICAgIDB4ZmZlMywgLyogTGVmdCBjb250cm9sICovXG5cdFhLX0NvbnRyb2xfUjogICAgICAgICAgICAgICAgICAgMHhmZmU0LCAvKiBSaWdodCBjb250cm9sICovXG5cdFhLX0NhcHNfTG9jazogICAgICAgICAgICAgICAgICAgMHhmZmU1LCAvKiBDYXBzIGxvY2sgKi9cblx0WEtfU2hpZnRfTG9jazogICAgICAgICAgICAgICAgICAweGZmZTYsIC8qIFNoaWZ0IGxvY2sgKi9cblxuXHRYS19NZXRhX0w6ICAgICAgICAgICAgICAgICAgICAgIDB4ZmZlNywgLyogTGVmdCBtZXRhICovXG5cdFhLX01ldGFfUjogICAgICAgICAgICAgICAgICAgICAgMHhmZmU4LCAvKiBSaWdodCBtZXRhICovXG5cdFhLX0FsdF9MOiAgICAgICAgICAgICAgICAgICAgICAgMHhmZmU5LCAvKiBMZWZ0IGFsdCAqL1xuXHRYS19BbHRfUjogICAgICAgICAgICAgICAgICAgICAgIDB4ZmZlYSwgLyogUmlnaHQgYWx0ICovXG5cdFhLX1N1cGVyX0w6ICAgICAgICAgICAgICAgICAgICAgMHhmZmViLCAvKiBMZWZ0IHN1cGVyICovXG5cdFhLX1N1cGVyX1I6ICAgICAgICAgICAgICAgICAgICAgMHhmZmVjLCAvKiBSaWdodCBzdXBlciAqL1xuXHRYS19IeXBlcl9MOiAgICAgICAgICAgICAgICAgICAgIDB4ZmZlZCwgLyogTGVmdCBoeXBlciAqL1xuXHRYS19IeXBlcl9SOiAgICAgICAgICAgICAgICAgICAgIDB4ZmZlZSwgLyogUmlnaHQgaHlwZXIgKi9cblxuXHRYS19JU09fTGV2ZWwzX1NoaWZ0OiAgICAgICAgICAgIDB4ZmUwMywgLyogQWx0R3IgKi9cblxuXHQvKlxuXHQgKiBMYXRpbiAxXG5cdCAqIChJU08vSUVDIDg4NTktMTogVW5pY29kZSBVKzAwMjAuLlUrMDBGRilcblx0ICogQnl0ZSAzID0gMFxuXHQgKi9cblxuXHRYS19zcGFjZTogICAgICAgICAgICAgICAgICAgICAgIDB4MDAyMCwgLyogVSswMDIwIFNQQUNFICovXG5cdFhLX2V4Y2xhbTogICAgICAgICAgICAgICAgICAgICAgMHgwMDIxLCAvKiBVKzAwMjEgRVhDTEFNQVRJT04gTUFSSyAqL1xuXHRYS19xdW90ZWRibDogICAgICAgICAgICAgICAgICAgIDB4MDAyMiwgLyogVSswMDIyIFFVT1RBVElPTiBNQVJLICovXG5cdFhLX251bWJlcnNpZ246ICAgICAgICAgICAgICAgICAgMHgwMDIzLCAvKiBVKzAwMjMgTlVNQkVSIFNJR04gKi9cblx0WEtfZG9sbGFyOiAgICAgICAgICAgICAgICAgICAgICAweDAwMjQsIC8qIFUrMDAyNCBET0xMQVIgU0lHTiAqL1xuXHRYS19wZXJjZW50OiAgICAgICAgICAgICAgICAgICAgIDB4MDAyNSwgLyogVSswMDI1IFBFUkNFTlQgU0lHTiAqL1xuXHRYS19hbXBlcnNhbmQ6ICAgICAgICAgICAgICAgICAgIDB4MDAyNiwgLyogVSswMDI2IEFNUEVSU0FORCAqL1xuXHRYS19hcG9zdHJvcGhlOiAgICAgICAgICAgICAgICAgIDB4MDAyNywgLyogVSswMDI3IEFQT1NUUk9QSEUgKi9cblx0WEtfcXVvdGVyaWdodDogICAgICAgICAgICAgICAgICAweDAwMjcsIC8qIGRlcHJlY2F0ZWQgKi9cblx0WEtfcGFyZW5sZWZ0OiAgICAgICAgICAgICAgICAgICAweDAwMjgsIC8qIFUrMDAyOCBMRUZUIFBBUkVOVEhFU0lTICovXG5cdFhLX3BhcmVucmlnaHQ6ICAgICAgICAgICAgICAgICAgMHgwMDI5LCAvKiBVKzAwMjkgUklHSFQgUEFSRU5USEVTSVMgKi9cblx0WEtfYXN0ZXJpc2s6ICAgICAgICAgICAgICAgICAgICAweDAwMmEsIC8qIFUrMDAyQSBBU1RFUklTSyAqL1xuXHRYS19wbHVzOiAgICAgICAgICAgICAgICAgICAgICAgIDB4MDAyYiwgLyogVSswMDJCIFBMVVMgU0lHTiAqL1xuXHRYS19jb21tYTogICAgICAgICAgICAgICAgICAgICAgIDB4MDAyYywgLyogVSswMDJDIENPTU1BICovXG5cdFhLX21pbnVzOiAgICAgICAgICAgICAgICAgICAgICAgMHgwMDJkLCAvKiBVKzAwMkQgSFlQSEVOLU1JTlVTICovXG5cdFhLX3BlcmlvZDogICAgICAgICAgICAgICAgICAgICAgMHgwMDJlLCAvKiBVKzAwMkUgRlVMTCBTVE9QICovXG5cdFhLX3NsYXNoOiAgICAgICAgICAgICAgICAgICAgICAgMHgwMDJmLCAvKiBVKzAwMkYgU09MSURVUyAqL1xuXHRYS18wOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDAzMCwgLyogVSswMDMwIERJR0lUIFpFUk8gKi9cblx0WEtfMTogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwMzEsIC8qIFUrMDAzMSBESUdJVCBPTkUgKi9cblx0WEtfMjogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwMzIsIC8qIFUrMDAzMiBESUdJVCBUV08gKi9cblx0WEtfMzogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwMzMsIC8qIFUrMDAzMyBESUdJVCBUSFJFRSAqL1xuXHRYS180OiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDAzNCwgLyogVSswMDM0IERJR0lUIEZPVVIgKi9cblx0WEtfNTogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwMzUsIC8qIFUrMDAzNSBESUdJVCBGSVZFICovXG5cdFhLXzY6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDM2LCAvKiBVKzAwMzYgRElHSVQgU0lYICovXG5cdFhLXzc6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDM3LCAvKiBVKzAwMzcgRElHSVQgU0VWRU4gKi9cblx0WEtfODogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwMzgsIC8qIFUrMDAzOCBESUdJVCBFSUdIVCAqL1xuXHRYS185OiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDAzOSwgLyogVSswMDM5IERJR0lUIE5JTkUgKi9cblx0WEtfY29sb246ICAgICAgICAgICAgICAgICAgICAgICAweDAwM2EsIC8qIFUrMDAzQSBDT0xPTiAqL1xuXHRYS19zZW1pY29sb246ICAgICAgICAgICAgICAgICAgIDB4MDAzYiwgLyogVSswMDNCIFNFTUlDT0xPTiAqL1xuXHRYS19sZXNzOiAgICAgICAgICAgICAgICAgICAgICAgIDB4MDAzYywgLyogVSswMDNDIExFU1MtVEhBTiBTSUdOICovXG5cdFhLX2VxdWFsOiAgICAgICAgICAgICAgICAgICAgICAgMHgwMDNkLCAvKiBVKzAwM0QgRVFVQUxTIFNJR04gKi9cblx0WEtfZ3JlYXRlcjogICAgICAgICAgICAgICAgICAgICAweDAwM2UsIC8qIFUrMDAzRSBHUkVBVEVSLVRIQU4gU0lHTiAqL1xuXHRYS19xdWVzdGlvbjogICAgICAgICAgICAgICAgICAgIDB4MDAzZiwgLyogVSswMDNGIFFVRVNUSU9OIE1BUksgKi9cblx0WEtfYXQ6ICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNDAsIC8qIFUrMDA0MCBDT01NRVJDSUFMIEFUICovXG5cdFhLX0E6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDQxLCAvKiBVKzAwNDEgTEFUSU4gQ0FQSVRBTCBMRVRURVIgQSAqL1xuXHRYS19COiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA0MiwgLyogVSswMDQyIExBVElOIENBUElUQUwgTEVUVEVSIEIgKi9cblx0WEtfQzogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNDMsIC8qIFUrMDA0MyBMQVRJTiBDQVBJVEFMIExFVFRFUiBDICovXG5cdFhLX0Q6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDQ0LCAvKiBVKzAwNDQgTEFUSU4gQ0FQSVRBTCBMRVRURVIgRCAqL1xuXHRYS19FOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA0NSwgLyogVSswMDQ1IExBVElOIENBUElUQUwgTEVUVEVSIEUgKi9cblx0WEtfRjogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNDYsIC8qIFUrMDA0NiBMQVRJTiBDQVBJVEFMIExFVFRFUiBGICovXG5cdFhLX0c6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDQ3LCAvKiBVKzAwNDcgTEFUSU4gQ0FQSVRBTCBMRVRURVIgRyAqL1xuXHRYS19IOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA0OCwgLyogVSswMDQ4IExBVElOIENBUElUQUwgTEVUVEVSIEggKi9cblx0WEtfSTogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNDksIC8qIFUrMDA0OSBMQVRJTiBDQVBJVEFMIExFVFRFUiBJICovXG5cdFhLX0o6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDRhLCAvKiBVKzAwNEEgTEFUSU4gQ0FQSVRBTCBMRVRURVIgSiAqL1xuXHRYS19LOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA0YiwgLyogVSswMDRCIExBVElOIENBUElUQUwgTEVUVEVSIEsgKi9cblx0WEtfTDogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNGMsIC8qIFUrMDA0QyBMQVRJTiBDQVBJVEFMIExFVFRFUiBMICovXG5cdFhLX006ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDRkLCAvKiBVKzAwNEQgTEFUSU4gQ0FQSVRBTCBMRVRURVIgTSAqL1xuXHRYS19OOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA0ZSwgLyogVSswMDRFIExBVElOIENBUElUQUwgTEVUVEVSIE4gKi9cblx0WEtfTzogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNGYsIC8qIFUrMDA0RiBMQVRJTiBDQVBJVEFMIExFVFRFUiBPICovXG5cdFhLX1A6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDUwLCAvKiBVKzAwNTAgTEFUSU4gQ0FQSVRBTCBMRVRURVIgUCAqL1xuXHRYS19ROiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA1MSwgLyogVSswMDUxIExBVElOIENBUElUQUwgTEVUVEVSIFEgKi9cblx0WEtfUjogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNTIsIC8qIFUrMDA1MiBMQVRJTiBDQVBJVEFMIExFVFRFUiBSICovXG5cdFhLX1M6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDUzLCAvKiBVKzAwNTMgTEFUSU4gQ0FQSVRBTCBMRVRURVIgUyAqL1xuXHRYS19UOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA1NCwgLyogVSswMDU0IExBVElOIENBUElUQUwgTEVUVEVSIFQgKi9cblx0WEtfVTogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNTUsIC8qIFUrMDA1NSBMQVRJTiBDQVBJVEFMIExFVFRFUiBVICovXG5cdFhLX1Y6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDU2LCAvKiBVKzAwNTYgTEFUSU4gQ0FQSVRBTCBMRVRURVIgViAqL1xuXHRYS19XOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA1NywgLyogVSswMDU3IExBVElOIENBUElUQUwgTEVUVEVSIFcgKi9cblx0WEtfWDogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNTgsIC8qIFUrMDA1OCBMQVRJTiBDQVBJVEFMIExFVFRFUiBYICovXG5cdFhLX1k6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDU5LCAvKiBVKzAwNTkgTEFUSU4gQ0FQSVRBTCBMRVRURVIgWSAqL1xuXHRYS19aOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA1YSwgLyogVSswMDVBIExBVElOIENBUElUQUwgTEVUVEVSIFogKi9cblx0WEtfYnJhY2tldGxlZnQ6ICAgICAgICAgICAgICAgICAweDAwNWIsIC8qIFUrMDA1QiBMRUZUIFNRVUFSRSBCUkFDS0VUICovXG5cdFhLX2JhY2tzbGFzaDogICAgICAgICAgICAgICAgICAgMHgwMDVjLCAvKiBVKzAwNUMgUkVWRVJTRSBTT0xJRFVTICovXG5cdFhLX2JyYWNrZXRyaWdodDogICAgICAgICAgICAgICAgMHgwMDVkLCAvKiBVKzAwNUQgUklHSFQgU1FVQVJFIEJSQUNLRVQgKi9cblx0WEtfYXNjaWljaXJjdW06ICAgICAgICAgICAgICAgICAweDAwNWUsIC8qIFUrMDA1RSBDSVJDVU1GTEVYIEFDQ0VOVCAqL1xuXHRYS191bmRlcnNjb3JlOiAgICAgICAgICAgICAgICAgIDB4MDA1ZiwgLyogVSswMDVGIExPVyBMSU5FICovXG5cdFhLX2dyYXZlOiAgICAgICAgICAgICAgICAgICAgICAgMHgwMDYwLCAvKiBVKzAwNjAgR1JBVkUgQUNDRU5UICovXG5cdFhLX3F1b3RlbGVmdDogICAgICAgICAgICAgICAgICAgMHgwMDYwLCAvKiBkZXByZWNhdGVkICovXG5cdFhLX2E6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDYxLCAvKiBVKzAwNjEgTEFUSU4gU01BTEwgTEVUVEVSIEEgKi9cblx0WEtfYjogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNjIsIC8qIFUrMDA2MiBMQVRJTiBTTUFMTCBMRVRURVIgQiAqL1xuXHRYS19jOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA2MywgLyogVSswMDYzIExBVElOIFNNQUxMIExFVFRFUiBDICovXG5cdFhLX2Q6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDY0LCAvKiBVKzAwNjQgTEFUSU4gU01BTEwgTEVUVEVSIEQgKi9cblx0WEtfZTogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNjUsIC8qIFUrMDA2NSBMQVRJTiBTTUFMTCBMRVRURVIgRSAqL1xuXHRYS19mOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA2NiwgLyogVSswMDY2IExBVElOIFNNQUxMIExFVFRFUiBGICovXG5cdFhLX2c6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDY3LCAvKiBVKzAwNjcgTEFUSU4gU01BTEwgTEVUVEVSIEcgKi9cblx0WEtfaDogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNjgsIC8qIFUrMDA2OCBMQVRJTiBTTUFMTCBMRVRURVIgSCAqL1xuXHRYS19pOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA2OSwgLyogVSswMDY5IExBVElOIFNNQUxMIExFVFRFUiBJICovXG5cdFhLX2o6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDZhLCAvKiBVKzAwNkEgTEFUSU4gU01BTEwgTEVUVEVSIEogKi9cblx0WEtfazogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNmIsIC8qIFUrMDA2QiBMQVRJTiBTTUFMTCBMRVRURVIgSyAqL1xuXHRYS19sOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA2YywgLyogVSswMDZDIExBVElOIFNNQUxMIExFVFRFUiBMICovXG5cdFhLX206ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDZkLCAvKiBVKzAwNkQgTEFUSU4gU01BTEwgTEVUVEVSIE0gKi9cblx0WEtfbjogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNmUsIC8qIFUrMDA2RSBMQVRJTiBTTUFMTCBMRVRURVIgTiAqL1xuXHRYS19vOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA2ZiwgLyogVSswMDZGIExBVElOIFNNQUxMIExFVFRFUiBPICovXG5cdFhLX3A6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDcwLCAvKiBVKzAwNzAgTEFUSU4gU01BTEwgTEVUVEVSIFAgKi9cblx0WEtfcTogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNzEsIC8qIFUrMDA3MSBMQVRJTiBTTUFMTCBMRVRURVIgUSAqL1xuXHRYS19yOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA3MiwgLyogVSswMDcyIExBVElOIFNNQUxMIExFVFRFUiBSICovXG5cdFhLX3M6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDczLCAvKiBVKzAwNzMgTEFUSU4gU01BTEwgTEVUVEVSIFMgKi9cblx0WEtfdDogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNzQsIC8qIFUrMDA3NCBMQVRJTiBTTUFMTCBMRVRURVIgVCAqL1xuXHRYS191OiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA3NSwgLyogVSswMDc1IExBVElOIFNNQUxMIExFVFRFUiBVICovXG5cdFhLX3Y6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDc2LCAvKiBVKzAwNzYgTEFUSU4gU01BTEwgTEVUVEVSIFYgKi9cblx0WEtfdzogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNzcsIC8qIFUrMDA3NyBMQVRJTiBTTUFMTCBMRVRURVIgVyAqL1xuXHRYS194OiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA3OCwgLyogVSswMDc4IExBVElOIFNNQUxMIExFVFRFUiBYICovXG5cdFhLX3k6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDc5LCAvKiBVKzAwNzkgTEFUSU4gU01BTEwgTEVUVEVSIFkgKi9cblx0WEtfejogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwN2EsIC8qIFUrMDA3QSBMQVRJTiBTTUFMTCBMRVRURVIgWiAqL1xuXHRYS19icmFjZWxlZnQ6ICAgICAgICAgICAgICAgICAgIDB4MDA3YiwgLyogVSswMDdCIExFRlQgQ1VSTFkgQlJBQ0tFVCAqL1xuXHRYS19iYXI6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA3YywgLyogVSswMDdDIFZFUlRJQ0FMIExJTkUgKi9cblx0WEtfYnJhY2VyaWdodDogICAgICAgICAgICAgICAgICAweDAwN2QsIC8qIFUrMDA3RCBSSUdIVCBDVVJMWSBCUkFDS0VUICovXG5cdFhLX2FzY2lpdGlsZGU6ICAgICAgICAgICAgICAgICAgMHgwMDdlLCAvKiBVKzAwN0UgVElMREUgKi9cblxuXHRYS19ub2JyZWFrc3BhY2U6ICAgICAgICAgICAgICAgIDB4MDBhMCwgLyogVSswMEEwIE5PLUJSRUFLIFNQQUNFICovXG5cdFhLX2V4Y2xhbWRvd246ICAgICAgICAgICAgICAgICAgMHgwMGExLCAvKiBVKzAwQTEgSU5WRVJURUQgRVhDTEFNQVRJT04gTUFSSyAqL1xuXHRYS19jZW50OiAgICAgICAgICAgICAgICAgICAgICAgIDB4MDBhMiwgLyogVSswMEEyIENFTlQgU0lHTiAqL1xuXHRYS19zdGVybGluZzogICAgICAgICAgICAgICAgICAgIDB4MDBhMywgLyogVSswMEEzIFBPVU5EIFNJR04gKi9cblx0WEtfY3VycmVuY3k6ICAgICAgICAgICAgICAgICAgICAweDAwYTQsIC8qIFUrMDBBNCBDVVJSRU5DWSBTSUdOICovXG5cdFhLX3llbjogICAgICAgICAgICAgICAgICAgICAgICAgMHgwMGE1LCAvKiBVKzAwQTUgWUVOIFNJR04gKi9cblx0WEtfYnJva2VuYmFyOiAgICAgICAgICAgICAgICAgICAweDAwYTYsIC8qIFUrMDBBNiBCUk9LRU4gQkFSICovXG5cdFhLX3NlY3Rpb246ICAgICAgICAgICAgICAgICAgICAgMHgwMGE3LCAvKiBVKzAwQTcgU0VDVElPTiBTSUdOICovXG5cdFhLX2RpYWVyZXNpczogICAgICAgICAgICAgICAgICAgMHgwMGE4LCAvKiBVKzAwQTggRElBRVJFU0lTICovXG5cdFhLX2NvcHlyaWdodDogICAgICAgICAgICAgICAgICAgMHgwMGE5LCAvKiBVKzAwQTkgQ09QWVJJR0hUIFNJR04gKi9cblx0WEtfb3JkZmVtaW5pbmU6ICAgICAgICAgICAgICAgICAweDAwYWEsIC8qIFUrMDBBQSBGRU1JTklORSBPUkRJTkFMIElORElDQVRPUiAqL1xuXHRYS19ndWlsbGVtb3RsZWZ0OiAgICAgICAgICAgICAgIDB4MDBhYiwgLyogVSswMEFCIExFRlQtUE9JTlRJTkcgRE9VQkxFIEFOR0xFIFFVT1RBVElPTiBNQVJLICovXG5cdFhLX25vdHNpZ246ICAgICAgICAgICAgICAgICAgICAgMHgwMGFjLCAvKiBVKzAwQUMgTk9UIFNJR04gKi9cblx0WEtfaHlwaGVuOiAgICAgICAgICAgICAgICAgICAgICAweDAwYWQsIC8qIFUrMDBBRCBTT0ZUIEhZUEhFTiAqL1xuXHRYS19yZWdpc3RlcmVkOiAgICAgICAgICAgICAgICAgIDB4MDBhZSwgLyogVSswMEFFIFJFR0lTVEVSRUQgU0lHTiAqL1xuXHRYS19tYWNyb246ICAgICAgICAgICAgICAgICAgICAgIDB4MDBhZiwgLyogVSswMEFGIE1BQ1JPTiAqL1xuXHRYS19kZWdyZWU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBiMCwgLyogVSswMEIwIERFR1JFRSBTSUdOICovXG5cdFhLX3BsdXNtaW51czogICAgICAgICAgICAgICAgICAgMHgwMGIxLCAvKiBVKzAwQjEgUExVUy1NSU5VUyBTSUdOICovXG5cdFhLX3R3b3N1cGVyaW9yOiAgICAgICAgICAgICAgICAgMHgwMGIyLCAvKiBVKzAwQjIgU1VQRVJTQ1JJUFQgVFdPICovXG5cdFhLX3RocmVlc3VwZXJpb3I6ICAgICAgICAgICAgICAgMHgwMGIzLCAvKiBVKzAwQjMgU1VQRVJTQ1JJUFQgVEhSRUUgKi9cblx0WEtfYWN1dGU6ICAgICAgICAgICAgICAgICAgICAgICAweDAwYjQsIC8qIFUrMDBCNCBBQ1VURSBBQ0NFTlQgKi9cblx0WEtfbXU6ICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwYjUsIC8qIFUrMDBCNSBNSUNSTyBTSUdOICovXG5cdFhLX3BhcmFncmFwaDogICAgICAgICAgICAgICAgICAgMHgwMGI2LCAvKiBVKzAwQjYgUElMQ1JPVyBTSUdOICovXG5cdFhLX3BlcmlvZGNlbnRlcmVkOiAgICAgICAgICAgICAgMHgwMGI3LCAvKiBVKzAwQjcgTUlERExFIERPVCAqL1xuXHRYS19jZWRpbGxhOiAgICAgICAgICAgICAgICAgICAgIDB4MDBiOCwgLyogVSswMEI4IENFRElMTEEgKi9cblx0WEtfb25lc3VwZXJpb3I6ICAgICAgICAgICAgICAgICAweDAwYjksIC8qIFUrMDBCOSBTVVBFUlNDUklQVCBPTkUgKi9cblx0WEtfbWFzY3VsaW5lOiAgICAgICAgICAgICAgICAgICAweDAwYmEsIC8qIFUrMDBCQSBNQVNDVUxJTkUgT1JESU5BTCBJTkRJQ0FUT1IgKi9cblx0WEtfZ3VpbGxlbW90cmlnaHQ6ICAgICAgICAgICAgICAweDAwYmIsIC8qIFUrMDBCQiBSSUdIVC1QT0lOVElORyBET1VCTEUgQU5HTEUgUVVPVEFUSU9OIE1BUksgKi9cblx0WEtfb25lcXVhcnRlcjogICAgICAgICAgICAgICAgICAweDAwYmMsIC8qIFUrMDBCQyBWVUxHQVIgRlJBQ1RJT04gT05FIFFVQVJURVIgKi9cblx0WEtfb25laGFsZjogICAgICAgICAgICAgICAgICAgICAweDAwYmQsIC8qIFUrMDBCRCBWVUxHQVIgRlJBQ1RJT04gT05FIEhBTEYgKi9cblx0WEtfdGhyZWVxdWFydGVyczogICAgICAgICAgICAgICAweDAwYmUsIC8qIFUrMDBCRSBWVUxHQVIgRlJBQ1RJT04gVEhSRUUgUVVBUlRFUlMgKi9cblx0WEtfcXVlc3Rpb25kb3duOiAgICAgICAgICAgICAgICAweDAwYmYsIC8qIFUrMDBCRiBJTlZFUlRFRCBRVUVTVElPTiBNQVJLICovXG5cdFhLX0FncmF2ZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGMwLCAvKiBVKzAwQzAgTEFUSU4gQ0FQSVRBTCBMRVRURVIgQSBXSVRIIEdSQVZFICovXG5cdFhLX0FhY3V0ZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGMxLCAvKiBVKzAwQzEgTEFUSU4gQ0FQSVRBTCBMRVRURVIgQSBXSVRIIEFDVVRFICovXG5cdFhLX0FjaXJjdW1mbGV4OiAgICAgICAgICAgICAgICAgMHgwMGMyLCAvKiBVKzAwQzIgTEFUSU4gQ0FQSVRBTCBMRVRURVIgQSBXSVRIIENJUkNVTUZMRVggKi9cblx0WEtfQXRpbGRlOiAgICAgICAgICAgICAgICAgICAgICAweDAwYzMsIC8qIFUrMDBDMyBMQVRJTiBDQVBJVEFMIExFVFRFUiBBIFdJVEggVElMREUgKi9cblx0WEtfQWRpYWVyZXNpczogICAgICAgICAgICAgICAgICAweDAwYzQsIC8qIFUrMDBDNCBMQVRJTiBDQVBJVEFMIExFVFRFUiBBIFdJVEggRElBRVJFU0lTICovXG5cdFhLX0FyaW5nOiAgICAgICAgICAgICAgICAgICAgICAgMHgwMGM1LCAvKiBVKzAwQzUgTEFUSU4gQ0FQSVRBTCBMRVRURVIgQSBXSVRIIFJJTkcgQUJPVkUgKi9cblx0WEtfQUU6ICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwYzYsIC8qIFUrMDBDNiBMQVRJTiBDQVBJVEFMIExFVFRFUiBBRSAqL1xuXHRYS19DY2VkaWxsYTogICAgICAgICAgICAgICAgICAgIDB4MDBjNywgLyogVSswMEM3IExBVElOIENBUElUQUwgTEVUVEVSIEMgV0lUSCBDRURJTExBICovXG5cdFhLX0VncmF2ZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGM4LCAvKiBVKzAwQzggTEFUSU4gQ0FQSVRBTCBMRVRURVIgRSBXSVRIIEdSQVZFICovXG5cdFhLX0VhY3V0ZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGM5LCAvKiBVKzAwQzkgTEFUSU4gQ0FQSVRBTCBMRVRURVIgRSBXSVRIIEFDVVRFICovXG5cdFhLX0VjaXJjdW1mbGV4OiAgICAgICAgICAgICAgICAgMHgwMGNhLCAvKiBVKzAwQ0EgTEFUSU4gQ0FQSVRBTCBMRVRURVIgRSBXSVRIIENJUkNVTUZMRVggKi9cblx0WEtfRWRpYWVyZXNpczogICAgICAgICAgICAgICAgICAweDAwY2IsIC8qIFUrMDBDQiBMQVRJTiBDQVBJVEFMIExFVFRFUiBFIFdJVEggRElBRVJFU0lTICovXG5cdFhLX0lncmF2ZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGNjLCAvKiBVKzAwQ0MgTEFUSU4gQ0FQSVRBTCBMRVRURVIgSSBXSVRIIEdSQVZFICovXG5cdFhLX0lhY3V0ZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGNkLCAvKiBVKzAwQ0QgTEFUSU4gQ0FQSVRBTCBMRVRURVIgSSBXSVRIIEFDVVRFICovXG5cdFhLX0ljaXJjdW1mbGV4OiAgICAgICAgICAgICAgICAgMHgwMGNlLCAvKiBVKzAwQ0UgTEFUSU4gQ0FQSVRBTCBMRVRURVIgSSBXSVRIIENJUkNVTUZMRVggKi9cblx0WEtfSWRpYWVyZXNpczogICAgICAgICAgICAgICAgICAweDAwY2YsIC8qIFUrMDBDRiBMQVRJTiBDQVBJVEFMIExFVFRFUiBJIFdJVEggRElBRVJFU0lTICovXG5cdFhLX0VUSDogICAgICAgICAgICAgICAgICAgICAgICAgMHgwMGQwLCAvKiBVKzAwRDAgTEFUSU4gQ0FQSVRBTCBMRVRURVIgRVRIICovXG5cdFhLX0V0aDogICAgICAgICAgICAgICAgICAgICAgICAgMHgwMGQwLCAvKiBkZXByZWNhdGVkICovXG5cdFhLX050aWxkZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGQxLCAvKiBVKzAwRDEgTEFUSU4gQ0FQSVRBTCBMRVRURVIgTiBXSVRIIFRJTERFICovXG5cdFhLX09ncmF2ZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGQyLCAvKiBVKzAwRDIgTEFUSU4gQ0FQSVRBTCBMRVRURVIgTyBXSVRIIEdSQVZFICovXG5cdFhLX09hY3V0ZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGQzLCAvKiBVKzAwRDMgTEFUSU4gQ0FQSVRBTCBMRVRURVIgTyBXSVRIIEFDVVRFICovXG5cdFhLX09jaXJjdW1mbGV4OiAgICAgICAgICAgICAgICAgMHgwMGQ0LCAvKiBVKzAwRDQgTEFUSU4gQ0FQSVRBTCBMRVRURVIgTyBXSVRIIENJUkNVTUZMRVggKi9cblx0WEtfT3RpbGRlOiAgICAgICAgICAgICAgICAgICAgICAweDAwZDUsIC8qIFUrMDBENSBMQVRJTiBDQVBJVEFMIExFVFRFUiBPIFdJVEggVElMREUgKi9cblx0WEtfT2RpYWVyZXNpczogICAgICAgICAgICAgICAgICAweDAwZDYsIC8qIFUrMDBENiBMQVRJTiBDQVBJVEFMIExFVFRFUiBPIFdJVEggRElBRVJFU0lTICovXG5cdFhLX211bHRpcGx5OiAgICAgICAgICAgICAgICAgICAgMHgwMGQ3LCAvKiBVKzAwRDcgTVVMVElQTElDQVRJT04gU0lHTiAqL1xuXHRYS19Pc2xhc2g6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBkOCwgLyogVSswMEQ4IExBVElOIENBUElUQUwgTEVUVEVSIE8gV0lUSCBTVFJPS0UgKi9cblx0WEtfT29ibGlxdWU6ICAgICAgICAgICAgICAgICAgICAweDAwZDgsIC8qIFUrMDBEOCBMQVRJTiBDQVBJVEFMIExFVFRFUiBPIFdJVEggU1RST0tFICovXG5cdFhLX1VncmF2ZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGQ5LCAvKiBVKzAwRDkgTEFUSU4gQ0FQSVRBTCBMRVRURVIgVSBXSVRIIEdSQVZFICovXG5cdFhLX1VhY3V0ZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGRhLCAvKiBVKzAwREEgTEFUSU4gQ0FQSVRBTCBMRVRURVIgVSBXSVRIIEFDVVRFICovXG5cdFhLX1VjaXJjdW1mbGV4OiAgICAgICAgICAgICAgICAgMHgwMGRiLCAvKiBVKzAwREIgTEFUSU4gQ0FQSVRBTCBMRVRURVIgVSBXSVRIIENJUkNVTUZMRVggKi9cblx0WEtfVWRpYWVyZXNpczogICAgICAgICAgICAgICAgICAweDAwZGMsIC8qIFUrMDBEQyBMQVRJTiBDQVBJVEFMIExFVFRFUiBVIFdJVEggRElBRVJFU0lTICovXG5cdFhLX1lhY3V0ZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGRkLCAvKiBVKzAwREQgTEFUSU4gQ0FQSVRBTCBMRVRURVIgWSBXSVRIIEFDVVRFICovXG5cdFhLX1RIT1JOOiAgICAgICAgICAgICAgICAgICAgICAgMHgwMGRlLCAvKiBVKzAwREUgTEFUSU4gQ0FQSVRBTCBMRVRURVIgVEhPUk4gKi9cblx0WEtfVGhvcm46ICAgICAgICAgICAgICAgICAgICAgICAweDAwZGUsIC8qIGRlcHJlY2F0ZWQgKi9cblx0WEtfc3NoYXJwOiAgICAgICAgICAgICAgICAgICAgICAweDAwZGYsIC8qIFUrMDBERiBMQVRJTiBTTUFMTCBMRVRURVIgU0hBUlAgUyAqL1xuXHRYS19hZ3JhdmU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBlMCwgLyogVSswMEUwIExBVElOIFNNQUxMIExFVFRFUiBBIFdJVEggR1JBVkUgKi9cblx0WEtfYWFjdXRlOiAgICAgICAgICAgICAgICAgICAgICAweDAwZTEsIC8qIFUrMDBFMSBMQVRJTiBTTUFMTCBMRVRURVIgQSBXSVRIIEFDVVRFICovXG5cdFhLX2FjaXJjdW1mbGV4OiAgICAgICAgICAgICAgICAgMHgwMGUyLCAvKiBVKzAwRTIgTEFUSU4gU01BTEwgTEVUVEVSIEEgV0lUSCBDSVJDVU1GTEVYICovXG5cdFhLX2F0aWxkZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGUzLCAvKiBVKzAwRTMgTEFUSU4gU01BTEwgTEVUVEVSIEEgV0lUSCBUSUxERSAqL1xuXHRYS19hZGlhZXJlc2lzOiAgICAgICAgICAgICAgICAgIDB4MDBlNCwgLyogVSswMEU0IExBVElOIFNNQUxMIExFVFRFUiBBIFdJVEggRElBRVJFU0lTICovXG5cdFhLX2FyaW5nOiAgICAgICAgICAgICAgICAgICAgICAgMHgwMGU1LCAvKiBVKzAwRTUgTEFUSU4gU01BTEwgTEVUVEVSIEEgV0lUSCBSSU5HIEFCT1ZFICovXG5cdFhLX2FlOiAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMGU2LCAvKiBVKzAwRTYgTEFUSU4gU01BTEwgTEVUVEVSIEFFICovXG5cdFhLX2NjZWRpbGxhOiAgICAgICAgICAgICAgICAgICAgMHgwMGU3LCAvKiBVKzAwRTcgTEFUSU4gU01BTEwgTEVUVEVSIEMgV0lUSCBDRURJTExBICovXG5cdFhLX2VncmF2ZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGU4LCAvKiBVKzAwRTggTEFUSU4gU01BTEwgTEVUVEVSIEUgV0lUSCBHUkFWRSAqL1xuXHRYS19lYWN1dGU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBlOSwgLyogVSswMEU5IExBVElOIFNNQUxMIExFVFRFUiBFIFdJVEggQUNVVEUgKi9cblx0WEtfZWNpcmN1bWZsZXg6ICAgICAgICAgICAgICAgICAweDAwZWEsIC8qIFUrMDBFQSBMQVRJTiBTTUFMTCBMRVRURVIgRSBXSVRIIENJUkNVTUZMRVggKi9cblx0WEtfZWRpYWVyZXNpczogICAgICAgICAgICAgICAgICAweDAwZWIsIC8qIFUrMDBFQiBMQVRJTiBTTUFMTCBMRVRURVIgRSBXSVRIIERJQUVSRVNJUyAqL1xuXHRYS19pZ3JhdmU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBlYywgLyogVSswMEVDIExBVElOIFNNQUxMIExFVFRFUiBJIFdJVEggR1JBVkUgKi9cblx0WEtfaWFjdXRlOiAgICAgICAgICAgICAgICAgICAgICAweDAwZWQsIC8qIFUrMDBFRCBMQVRJTiBTTUFMTCBMRVRURVIgSSBXSVRIIEFDVVRFICovXG5cdFhLX2ljaXJjdW1mbGV4OiAgICAgICAgICAgICAgICAgMHgwMGVlLCAvKiBVKzAwRUUgTEFUSU4gU01BTEwgTEVUVEVSIEkgV0lUSCBDSVJDVU1GTEVYICovXG5cdFhLX2lkaWFlcmVzaXM6ICAgICAgICAgICAgICAgICAgMHgwMGVmLCAvKiBVKzAwRUYgTEFUSU4gU01BTEwgTEVUVEVSIEkgV0lUSCBESUFFUkVTSVMgKi9cblx0WEtfZXRoOiAgICAgICAgICAgICAgICAgICAgICAgICAweDAwZjAsIC8qIFUrMDBGMCBMQVRJTiBTTUFMTCBMRVRURVIgRVRIICovXG5cdFhLX250aWxkZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGYxLCAvKiBVKzAwRjEgTEFUSU4gU01BTEwgTEVUVEVSIE4gV0lUSCBUSUxERSAqL1xuXHRYS19vZ3JhdmU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBmMiwgLyogVSswMEYyIExBVElOIFNNQUxMIExFVFRFUiBPIFdJVEggR1JBVkUgKi9cblx0WEtfb2FjdXRlOiAgICAgICAgICAgICAgICAgICAgICAweDAwZjMsIC8qIFUrMDBGMyBMQVRJTiBTTUFMTCBMRVRURVIgTyBXSVRIIEFDVVRFICovXG5cdFhLX29jaXJjdW1mbGV4OiAgICAgICAgICAgICAgICAgMHgwMGY0LCAvKiBVKzAwRjQgTEFUSU4gU01BTEwgTEVUVEVSIE8gV0lUSCBDSVJDVU1GTEVYICovXG5cdFhLX290aWxkZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGY1LCAvKiBVKzAwRjUgTEFUSU4gU01BTEwgTEVUVEVSIE8gV0lUSCBUSUxERSAqL1xuXHRYS19vZGlhZXJlc2lzOiAgICAgICAgICAgICAgICAgIDB4MDBmNiwgLyogVSswMEY2IExBVElOIFNNQUxMIExFVFRFUiBPIFdJVEggRElBRVJFU0lTICovXG5cdFhLX2RpdmlzaW9uOiAgICAgICAgICAgICAgICAgICAgMHgwMGY3LCAvKiBVKzAwRjcgRElWSVNJT04gU0lHTiAqL1xuXHRYS19vc2xhc2g6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBmOCwgLyogVSswMEY4IExBVElOIFNNQUxMIExFVFRFUiBPIFdJVEggU1RST0tFICovXG5cdFhLX29vYmxpcXVlOiAgICAgICAgICAgICAgICAgICAgMHgwMGY4LCAvKiBVKzAwRjggTEFUSU4gU01BTEwgTEVUVEVSIE8gV0lUSCBTVFJPS0UgKi9cblx0WEtfdWdyYXZlOiAgICAgICAgICAgICAgICAgICAgICAweDAwZjksIC8qIFUrMDBGOSBMQVRJTiBTTUFMTCBMRVRURVIgVSBXSVRIIEdSQVZFICovXG5cdFhLX3VhY3V0ZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGZhLCAvKiBVKzAwRkEgTEFUSU4gU01BTEwgTEVUVEVSIFUgV0lUSCBBQ1VURSAqL1xuXHRYS191Y2lyY3VtZmxleDogICAgICAgICAgICAgICAgIDB4MDBmYiwgLyogVSswMEZCIExBVElOIFNNQUxMIExFVFRFUiBVIFdJVEggQ0lSQ1VNRkxFWCAqL1xuXHRYS191ZGlhZXJlc2lzOiAgICAgICAgICAgICAgICAgIDB4MDBmYywgLyogVSswMEZDIExBVElOIFNNQUxMIExFVFRFUiBVIFdJVEggRElBRVJFU0lTICovXG5cdFhLX3lhY3V0ZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGZkLCAvKiBVKzAwRkQgTEFUSU4gU01BTEwgTEVUVEVSIFkgV0lUSCBBQ1VURSAqL1xuXHRYS190aG9ybjogICAgICAgICAgICAgICAgICAgICAgIDB4MDBmZSwgLyogVSswMEZFIExBVElOIFNNQUxMIExFVFRFUiBUSE9STiAqL1xuXHRYS195ZGlhZXJlc2lzOiAgICAgICAgICAgICAgICAgIDB4MDBmZiAgLyogVSswMEZGIExBVElOIFNNQUxMIExFVFRFUiBZIFdJVEggRElBRVJFU0lTICovXG59O1xuXG5cbi8qKlxuICogTWFwcGluZ3MgZnJvbSBVbmljb2RlIGNvZGVwb2ludHMgdG8gdGhlIGtleXN5bSB2YWx1ZXMgKGFuZCBvcHRpb25hbGx5LCBrZXlcbiAqIG5hbWVzKSBleHBlY3RlZCBieSB0aGUgUkZCIHByb3RvY29sLlxuICovXG52YXIga2V5bmFtZXMgPSBudWxsO1xudmFyIGNvZGVwb2ludHMgPSB7JzMyJzozMiwnMzMnOjMzLCczNCc6MzQsJzM1JzozNSwnMzYnOjM2LCczNyc6MzcsJzM4JzozOCwnMzknOjM5LCc0MCc6NDAsJzQxJzo0MSwnNDInOjQyLCc0Myc6NDMsJzQ0Jzo0NCwnNDUnOjQ1LCc0Nic6NDYsJzQ3Jzo0NywnNDgnOjQ4LCc0OSc6NDksJzUwJzo1MCwnNTEnOjUxLCc1Mic6NTIsJzUzJzo1MywnNTQnOjU0LCc1NSc6NTUsJzU2Jzo1NiwnNTcnOjU3LCc1OCc6NTgsJzU5Jzo1OSwnNjAnOjYwLCc2MSc6NjEsJzYyJzo2MiwnNjMnOjYzLCc2NCc6NjQsJzY1Jzo2NSwnNjYnOjY2LCc2Nyc6NjcsJzY4Jzo2OCwnNjknOjY5LCc3MCc6NzAsJzcxJzo3MSwnNzInOjcyLCc3Myc6NzMsJzc0Jzo3NCwnNzUnOjc1LCc3Nic6NzYsJzc3Jzo3NywnNzgnOjc4LCc3OSc6NzksJzgwJzo4MCwnODEnOjgxLCc4Mic6ODIsJzgzJzo4MywnODQnOjg0LCc4NSc6ODUsJzg2Jzo4NiwnODcnOjg3LCc4OCc6ODgsJzg5Jzo4OSwnOTAnOjkwLCc5MSc6OTEsJzkyJzo5MiwnOTMnOjkzLCc5NCc6OTQsJzk1Jzo5NSwnOTYnOjk2LCc5Nyc6OTcsJzk4Jzo5OCwnOTknOjk5LCcxMDAnOjEwMCwnMTAxJzoxMDEsJzEwMic6MTAyLCcxMDMnOjEwMywnMTA0JzoxMDQsJzEwNSc6MTA1LCcxMDYnOjEwNiwnMTA3JzoxMDcsJzEwOCc6MTA4LCcxMDknOjEwOSwnMTEwJzoxMTAsJzExMSc6MTExLCcxMTInOjExMiwnMTEzJzoxMTMsJzExNCc6MTE0LCcxMTUnOjExNSwnMTE2JzoxMTYsJzExNyc6MTE3LCcxMTgnOjExOCwnMTE5JzoxMTksJzEyMCc6MTIwLCcxMjEnOjEyMSwnMTIyJzoxMjIsJzEyMyc6MTIzLCcxMjQnOjEyNCwnMTI1JzoxMjUsJzEyNic6MTI2LCcxNjAnOjE2MCwnMTYxJzoxNjEsJzE2Mic6MTYyLCcxNjMnOjE2MywnMTY0JzoxNjQsJzE2NSc6MTY1LCcxNjYnOjE2NiwnMTY3JzoxNjcsJzE2OCc6MTY4LCcxNjknOjE2OSwnMTcwJzoxNzAsJzE3MSc6MTcxLCcxNzInOjE3MiwnMTczJzoxNzMsJzE3NCc6MTc0LCcxNzUnOjE3NSwnMTc2JzoxNzYsJzE3Nyc6MTc3LCcxNzgnOjE3OCwnMTc5JzoxNzksJzE4MCc6MTgwLCcxODEnOjE4MSwnMTgyJzoxODIsJzE4Myc6MTgzLCcxODQnOjE4NCwnMTg1JzoxODUsJzE4Nic6MTg2LCcxODcnOjE4NywnMTg4JzoxODgsJzE4OSc6MTg5LCcxOTAnOjE5MCwnMTkxJzoxOTEsJzE5Mic6MTkyLCcxOTMnOjE5MywnMTk0JzoxOTQsJzE5NSc6MTk1LCcxOTYnOjE5NiwnMTk3JzoxOTcsJzE5OCc6MTk4LCcxOTknOjE5OSwnMjAwJzoyMDAsJzIwMSc6MjAxLCcyMDInOjIwMiwnMjAzJzoyMDMsJzIwNCc6MjA0LCcyMDUnOjIwNSwnMjA2JzoyMDYsJzIwNyc6MjA3LCcyMDgnOjIwOCwnMjA5JzoyMDksJzIxMCc6MjEwLCcyMTEnOjIxMSwnMjEyJzoyMTIsJzIxMyc6MjEzLCcyMTQnOjIxNCwnMjE1JzoyMTUsJzIxNic6MjE2LCcyMTcnOjIxNywnMjE4JzoyMTgsJzIxOSc6MjE5LCcyMjAnOjIyMCwnMjIxJzoyMjEsJzIyMic6MjIyLCcyMjMnOjIyMywnMjI0JzoyMjQsJzIyNSc6MjI1LCcyMjYnOjIyNiwnMjI3JzoyMjcsJzIyOCc6MjI4LCcyMjknOjIyOSwnMjMwJzoyMzAsJzIzMSc6MjMxLCcyMzInOjIzMiwnMjMzJzoyMzMsJzIzNCc6MjM0LCcyMzUnOjIzNSwnMjM2JzoyMzYsJzIzNyc6MjM3LCcyMzgnOjIzOCwnMjM5JzoyMzksJzI0MCc6MjQwLCcyNDEnOjI0MSwnMjQyJzoyNDIsJzI0Myc6MjQzLCcyNDQnOjI0NCwnMjQ1JzoyNDUsJzI0Nic6MjQ2LCcyNDcnOjI0NywnMjQ4JzoyNDgsJzI0OSc6MjQ5LCcyNTAnOjI1MCwnMjUxJzoyNTEsJzI1Mic6MjUyLCcyNTMnOjI1MywnMjU0JzoyNTQsJzI1NSc6MjU1LCcyNTYnOjk2MCwnMjU3Jzo5OTIsJzI1OCc6NDUxLCcyNTknOjQ4MywnMjYwJzo0MTcsJzI2MSc6NDMzLCcyNjInOjQ1NCwnMjYzJzo0ODYsJzI2NCc6NzEwLCcyNjUnOjc0MiwnMjY2Jzo3MDksJzI2Nyc6NzQxLCcyNjgnOjQ1NiwnMjY5Jzo0ODgsJzI3MCc6NDYzLCcyNzEnOjQ5NSwnMjcyJzo0NjQsJzI3Myc6NDk2LCcyNzQnOjkzOCwnMjc1Jzo5NTQsJzI3OCc6OTcyLCcyNzknOjEwMDQsJzI4MCc6NDU4LCcyODEnOjQ5MCwnMjgyJzo0NjAsJzI4Myc6NDkyLCcyODQnOjcyOCwnMjg1Jzo3NjAsJzI4Nic6NjgzLCcyODcnOjY5OSwnMjg4Jzo3MjUsJzI4OSc6NzU3LCcyOTAnOjkzOSwnMjkxJzo5NTUsJzI5Mic6Njc4LCcyOTMnOjY5NCwnMjk0Jzo2NzMsJzI5NSc6Njg5LCcyOTYnOjkzMywnMjk3Jzo5NDksJzI5OCc6OTc1LCcyOTknOjEwMDcsJzMwMCc6MTY3Nzc1MTYsJzMwMSc6MTY3Nzc1MTcsJzMwMic6OTY3LCczMDMnOjk5OSwnMzA0Jzo2ODEsJzMwNSc6Njk3LCczMDgnOjY4NCwnMzA5Jzo3MDAsJzMxMCc6OTc5LCczMTEnOjEwMTEsJzMxMic6OTMwLCczMTMnOjQ1MywnMzE0Jzo0ODUsJzMxNSc6OTM0LCczMTYnOjk1MCwnMzE3Jzo0MjEsJzMxOCc6NDM3LCczMjEnOjQxOSwnMzIyJzo0MzUsJzMyMyc6NDY1LCczMjQnOjQ5NywnMzI1Jzo5NzcsJzMyNic6MTAwOSwnMzI3Jzo0NjYsJzMyOCc6NDk4LCczMzAnOjk1NywnMzMxJzo5NTksJzMzMic6OTc4LCczMzMnOjEwMTAsJzMzNic6NDY5LCczMzcnOjUwMSwnMzM4Jzo1MDUyLCczMzknOjUwNTMsJzM0MCc6NDQ4LCczNDEnOjQ4MCwnMzQyJzo5MzEsJzM0Myc6OTQ3LCczNDQnOjQ3MiwnMzQ1Jzo1MDQsJzM0Nic6NDIyLCczNDcnOjQzOCwnMzQ4Jzo3MzQsJzM0OSc6NzY2LCczNTAnOjQyNiwnMzUxJzo0NDIsJzM1Mic6NDI1LCczNTMnOjQ0MSwnMzU0Jzo0NzgsJzM1NSc6NTEwLCczNTYnOjQyNywnMzU3Jzo0NDMsJzM1OCc6OTQwLCczNTknOjk1NiwnMzYwJzo5ODksJzM2MSc6MTAyMSwnMzYyJzo5OTAsJzM2Myc6MTAyMiwnMzY0Jzo3MzMsJzM2NSc6NzY1LCczNjYnOjQ3MywnMzY3Jzo1MDUsJzM2OCc6NDc1LCczNjknOjUwNywnMzcwJzo5ODUsJzM3MSc6MTAxNywnMzcyJzoxNjc3NzU4OCwnMzczJzoxNjc3NzU4OSwnMzc0JzoxNjc3NzU5MCwnMzc1JzoxNjc3NzU5MSwnMzc2Jzo1MDU0LCczNzcnOjQyOCwnMzc4Jzo0NDQsJzM3OSc6NDMxLCczODAnOjQ0NywnMzgxJzo0MzAsJzM4Mic6NDQ2LCczOTknOjE2Nzc3NjE1LCc0MDInOjIyOTQsJzQxNSc6MTY3Nzc2MzEsJzQxNic6MTY3Nzc2MzIsJzQxNyc6MTY3Nzc2MzMsJzQzMSc6MTY3Nzc2NDcsJzQzMic6MTY3Nzc2NDgsJzQzNyc6MTY3Nzc2NTMsJzQzOCc6MTY3Nzc2NTQsJzQzOSc6MTY3Nzc2NTUsJzQ2Nic6MTY3Nzc2ODEsJzQ4Nic6MTY3Nzc3MDIsJzQ4Nyc6MTY3Nzc3MDMsJzYwMSc6MTY3Nzc4MTcsJzYyOSc6MTY3Nzc4NDUsJzY1OCc6MTY3Nzc4NzQsJzcxMSc6NDM5LCc3MjgnOjQxOCwnNzI5Jzo1MTEsJzczMSc6NDM0LCc3MzMnOjQ0NSwnOTAxJzoxOTY2LCc5MDInOjE5NTMsJzkwNCc6MTk1NCwnOTA1JzoxOTU1LCc5MDYnOjE5NTYsJzkwOCc6MTk1OSwnOTEwJzoxOTYwLCc5MTEnOjE5NjMsJzkxMic6MTk3NCwnOTEzJzoxOTg1LCc5MTQnOjE5ODYsJzkxNSc6MTk4NywnOTE2JzoxOTg4LCc5MTcnOjE5ODksJzkxOCc6MTk5MCwnOTE5JzoxOTkxLCc5MjAnOjE5OTIsJzkyMSc6MTk5MywnOTIyJzoxOTk0LCc5MjMnOjE5OTUsJzkyNCc6MTk5NiwnOTI1JzoxOTk3LCc5MjYnOjE5OTgsJzkyNyc6MTk5OSwnOTI4JzoyMDAwLCc5MjknOjIwMDEsJzkzMSc6MjAwMiwnOTMyJzoyMDA0LCc5MzMnOjIwMDUsJzkzNCc6MjAwNiwnOTM1JzoyMDA3LCc5MzYnOjIwMDgsJzkzNyc6MjAwOSwnOTM4JzoxOTU3LCc5MzknOjE5NjEsJzk0MCc6MTk2OSwnOTQxJzoxOTcwLCc5NDInOjE5NzEsJzk0Myc6MTk3MiwnOTQ0JzoxOTc4LCc5NDUnOjIwMTcsJzk0Nic6MjAxOCwnOTQ3JzoyMDE5LCc5NDgnOjIwMjAsJzk0OSc6MjAyMSwnOTUwJzoyMDIyLCc5NTEnOjIwMjMsJzk1Mic6MjAyNCwnOTUzJzoyMDI1LCc5NTQnOjIwMjYsJzk1NSc6MjAyNywnOTU2JzoyMDI4LCc5NTcnOjIwMjksJzk1OCc6MjAzMCwnOTU5JzoyMDMxLCc5NjAnOjIwMzIsJzk2MSc6MjAzMywnOTYyJzoyMDM1LCc5NjMnOjIwMzQsJzk2NCc6MjAzNiwnOTY1JzoyMDM3LCc5NjYnOjIwMzgsJzk2Nyc6MjAzOSwnOTY4JzoyMDQwLCc5NjknOjIwNDEsJzk3MCc6MTk3MywnOTcxJzoxOTc3LCc5NzInOjE5NzUsJzk3Myc6MTk3NiwnOTc0JzoxOTc5LCcxMDI1JzoxNzE1LCcxMDI2JzoxNzEzLCcxMDI3JzoxNzE0LCcxMDI4JzoxNzE2LCcxMDI5JzoxNzE3LCcxMDMwJzoxNzE4LCcxMDMxJzoxNzE5LCcxMDMyJzoxNzIwLCcxMDMzJzoxNzIxLCcxMDM0JzoxNzIyLCcxMDM1JzoxNzIzLCcxMDM2JzoxNzI0LCcxMDM4JzoxNzI2LCcxMDM5JzoxNzI3LCcxMDQwJzoxNzYxLCcxMDQxJzoxNzYyLCcxMDQyJzoxNzgzLCcxMDQzJzoxNzY3LCcxMDQ0JzoxNzY0LCcxMDQ1JzoxNzY1LCcxMDQ2JzoxNzgyLCcxMDQ3JzoxNzg2LCcxMDQ4JzoxNzY5LCcxMDQ5JzoxNzcwLCcxMDUwJzoxNzcxLCcxMDUxJzoxNzcyLCcxMDUyJzoxNzczLCcxMDUzJzoxNzc0LCcxMDU0JzoxNzc1LCcxMDU1JzoxNzc2LCcxMDU2JzoxNzc4LCcxMDU3JzoxNzc5LCcxMDU4JzoxNzgwLCcxMDU5JzoxNzgxLCcxMDYwJzoxNzY2LCcxMDYxJzoxNzY4LCcxMDYyJzoxNzYzLCcxMDYzJzoxNzkwLCcxMDY0JzoxNzg3LCcxMDY1JzoxNzg5LCcxMDY2JzoxNzkxLCcxMDY3JzoxNzg1LCcxMDY4JzoxNzg0LCcxMDY5JzoxNzg4LCcxMDcwJzoxNzYwLCcxMDcxJzoxNzc3LCcxMDcyJzoxNzI5LCcxMDczJzoxNzMwLCcxMDc0JzoxNzUxLCcxMDc1JzoxNzM1LCcxMDc2JzoxNzMyLCcxMDc3JzoxNzMzLCcxMDc4JzoxNzUwLCcxMDc5JzoxNzU0LCcxMDgwJzoxNzM3LCcxMDgxJzoxNzM4LCcxMDgyJzoxNzM5LCcxMDgzJzoxNzQwLCcxMDg0JzoxNzQxLCcxMDg1JzoxNzQyLCcxMDg2JzoxNzQzLCcxMDg3JzoxNzQ0LCcxMDg4JzoxNzQ2LCcxMDg5JzoxNzQ3LCcxMDkwJzoxNzQ4LCcxMDkxJzoxNzQ5LCcxMDkyJzoxNzM0LCcxMDkzJzoxNzM2LCcxMDk0JzoxNzMxLCcxMDk1JzoxNzU4LCcxMDk2JzoxNzU1LCcxMDk3JzoxNzU3LCcxMDk4JzoxNzU5LCcxMDk5JzoxNzUzLCcxMTAwJzoxNzUyLCcxMTAxJzoxNzU2LCcxMTAyJzoxNzI4LCcxMTAzJzoxNzQ1LCcxMTA1JzoxNjk5LCcxMTA2JzoxNjk3LCcxMTA3JzoxNjk4LCcxMTA4JzoxNzAwLCcxMTA5JzoxNzAxLCcxMTEwJzoxNzAyLCcxMTExJzoxNzAzLCcxMTEyJzoxNzA0LCcxMTEzJzoxNzA1LCcxMTE0JzoxNzA2LCcxMTE1JzoxNzA3LCcxMTE2JzoxNzA4LCcxMTE4JzoxNzEwLCcxMTE5JzoxNzExLCcxMTY4JzoxNzI1LCcxMTY5JzoxNzA5LCcxMTcwJzoxNjc3ODM4NiwnMTE3MSc6MTY3NzgzODcsJzExNzQnOjE2Nzc4MzkwLCcxMTc1JzoxNjc3ODM5MSwnMTE3OCc6MTY3NzgzOTQsJzExNzknOjE2Nzc4Mzk1LCcxMTgwJzoxNjc3ODM5NiwnMTE4MSc6MTY3NzgzOTcsJzExODYnOjE2Nzc4NDAyLCcxMTg3JzoxNjc3ODQwMywnMTE5OCc6MTY3Nzg0MTQsJzExOTknOjE2Nzc4NDE1LCcxMjAwJzoxNjc3ODQxNiwnMTIwMSc6MTY3Nzg0MTcsJzEyMDInOjE2Nzc4NDE4LCcxMjAzJzoxNjc3ODQxOSwnMTIwNic6MTY3Nzg0MjIsJzEyMDcnOjE2Nzc4NDIzLCcxMjA4JzoxNjc3ODQyNCwnMTIwOSc6MTY3Nzg0MjUsJzEyMTAnOjE2Nzc4NDI2LCcxMjExJzoxNjc3ODQyNywnMTI0MCc6MTY3Nzg0NTYsJzEyNDEnOjE2Nzc4NDU3LCcxMjUwJzoxNjc3ODQ2NiwnMTI1MSc6MTY3Nzg0NjcsJzEyNTYnOjE2Nzc4NDcyLCcxMjU3JzoxNjc3ODQ3MywnMTI2Mic6MTY3Nzg0NzgsJzEyNjMnOjE2Nzc4NDc5LCcxMzI5JzoxNjc3ODU0NSwnMTMzMCc6MTY3Nzg1NDYsJzEzMzEnOjE2Nzc4NTQ3LCcxMzMyJzoxNjc3ODU0OCwnMTMzMyc6MTY3Nzg1NDksJzEzMzQnOjE2Nzc4NTUwLCcxMzM1JzoxNjc3ODU1MSwnMTMzNic6MTY3Nzg1NTIsJzEzMzcnOjE2Nzc4NTUzLCcxMzM4JzoxNjc3ODU1NCwnMTMzOSc6MTY3Nzg1NTUsJzEzNDAnOjE2Nzc4NTU2LCcxMzQxJzoxNjc3ODU1NywnMTM0Mic6MTY3Nzg1NTgsJzEzNDMnOjE2Nzc4NTU5LCcxMzQ0JzoxNjc3ODU2MCwnMTM0NSc6MTY3Nzg1NjEsJzEzNDYnOjE2Nzc4NTYyLCcxMzQ3JzoxNjc3ODU2MywnMTM0OCc6MTY3Nzg1NjQsJzEzNDknOjE2Nzc4NTY1LCcxMzUwJzoxNjc3ODU2NiwnMTM1MSc6MTY3Nzg1NjcsJzEzNTInOjE2Nzc4NTY4LCcxMzUzJzoxNjc3ODU2OSwnMTM1NCc6MTY3Nzg1NzAsJzEzNTUnOjE2Nzc4NTcxLCcxMzU2JzoxNjc3ODU3MiwnMTM1Nyc6MTY3Nzg1NzMsJzEzNTgnOjE2Nzc4NTc0LCcxMzU5JzoxNjc3ODU3NSwnMTM2MCc6MTY3Nzg1NzYsJzEzNjEnOjE2Nzc4NTc3LCcxMzYyJzoxNjc3ODU3OCwnMTM2Myc6MTY3Nzg1NzksJzEzNjQnOjE2Nzc4NTgwLCcxMzY1JzoxNjc3ODU4MSwnMTM2Nic6MTY3Nzg1ODIsJzEzNzAnOjE2Nzc4NTg2LCcxMzcxJzoxNjc3ODU4NywnMTM3Mic6MTY3Nzg1ODgsJzEzNzMnOjE2Nzc4NTg5LCcxMzc0JzoxNjc3ODU5MCwnMTM3Nyc6MTY3Nzg1OTMsJzEzNzgnOjE2Nzc4NTk0LCcxMzc5JzoxNjc3ODU5NSwnMTM4MCc6MTY3Nzg1OTYsJzEzODEnOjE2Nzc4NTk3LCcxMzgyJzoxNjc3ODU5OCwnMTM4Myc6MTY3Nzg1OTksJzEzODQnOjE2Nzc4NjAwLCcxMzg1JzoxNjc3ODYwMSwnMTM4Nic6MTY3Nzg2MDIsJzEzODcnOjE2Nzc4NjAzLCcxMzg4JzoxNjc3ODYwNCwnMTM4OSc6MTY3Nzg2MDUsJzEzOTAnOjE2Nzc4NjA2LCcxMzkxJzoxNjc3ODYwNywnMTM5Mic6MTY3Nzg2MDgsJzEzOTMnOjE2Nzc4NjA5LCcxMzk0JzoxNjc3ODYxMCwnMTM5NSc6MTY3Nzg2MTEsJzEzOTYnOjE2Nzc4NjEyLCcxMzk3JzoxNjc3ODYxMywnMTM5OCc6MTY3Nzg2MTQsJzEzOTknOjE2Nzc4NjE1LCcxNDAwJzoxNjc3ODYxNiwnMTQwMSc6MTY3Nzg2MTcsJzE0MDInOjE2Nzc4NjE4LCcxNDAzJzoxNjc3ODYxOSwnMTQwNCc6MTY3Nzg2MjAsJzE0MDUnOjE2Nzc4NjIxLCcxNDA2JzoxNjc3ODYyMiwnMTQwNyc6MTY3Nzg2MjMsJzE0MDgnOjE2Nzc4NjI0LCcxNDA5JzoxNjc3ODYyNSwnMTQxMCc6MTY3Nzg2MjYsJzE0MTEnOjE2Nzc4NjI3LCcxNDEyJzoxNjc3ODYyOCwnMTQxMyc6MTY3Nzg2MjksJzE0MTQnOjE2Nzc4NjMwLCcxNDE1JzoxNjc3ODYzMSwnMTQxNyc6MTY3Nzg2MzMsJzE0MTgnOjE2Nzc4NjM0LCcxNDg4JzozMjk2LCcxNDg5JzozMjk3LCcxNDkwJzozMjk4LCcxNDkxJzozMjk5LCcxNDkyJzozMzAwLCcxNDkzJzozMzAxLCcxNDk0JzozMzAyLCcxNDk1JzozMzAzLCcxNDk2JzozMzA0LCcxNDk3JzozMzA1LCcxNDk4JzozMzA2LCcxNDk5JzozMzA3LCcxNTAwJzozMzA4LCcxNTAxJzozMzA5LCcxNTAyJzozMzEwLCcxNTAzJzozMzExLCcxNTA0JzozMzEyLCcxNTA1JzozMzEzLCcxNTA2JzozMzE0LCcxNTA3JzozMzE1LCcxNTA4JzozMzE2LCcxNTA5JzozMzE3LCcxNTEwJzozMzE4LCcxNTExJzozMzE5LCcxNTEyJzozMzIwLCcxNTEzJzozMzIxLCcxNTE0JzozMzIyLCcxNTQ4JzoxNDUyLCcxNTYzJzoxNDY3LCcxNTY3JzoxNDcxLCcxNTY5JzoxNDczLCcxNTcwJzoxNDc0LCcxNTcxJzoxNDc1LCcxNTcyJzoxNDc2LCcxNTczJzoxNDc3LCcxNTc0JzoxNDc4LCcxNTc1JzoxNDc5LCcxNTc2JzoxNDgwLCcxNTc3JzoxNDgxLCcxNTc4JzoxNDgyLCcxNTc5JzoxNDgzLCcxNTgwJzoxNDg0LCcxNTgxJzoxNDg1LCcxNTgyJzoxNDg2LCcxNTgzJzoxNDg3LCcxNTg0JzoxNDg4LCcxNTg1JzoxNDg5LCcxNTg2JzoxNDkwLCcxNTg3JzoxNDkxLCcxNTg4JzoxNDkyLCcxNTg5JzoxNDkzLCcxNTkwJzoxNDk0LCcxNTkxJzoxNDk1LCcxNTkyJzoxNDk2LCcxNTkzJzoxNDk3LCcxNTk0JzoxNDk4LCcxNjAwJzoxNTA0LCcxNjAxJzoxNTA1LCcxNjAyJzoxNTA2LCcxNjAzJzoxNTA3LCcxNjA0JzoxNTA4LCcxNjA1JzoxNTA5LCcxNjA2JzoxNTEwLCcxNjA3JzoxNTExLCcxNjA4JzoxNTEyLCcxNjA5JzoxNTEzLCcxNjEwJzoxNTE0LCcxNjExJzoxNTE1LCcxNjEyJzoxNTE2LCcxNjEzJzoxNTE3LCcxNjE0JzoxNTE4LCcxNjE1JzoxNTE5LCcxNjE2JzoxNTIwLCcxNjE3JzoxNTIxLCcxNjE4JzoxNTIyLCcxNjE5JzoxNjc3ODgzNSwnMTYyMCc6MTY3Nzg4MzYsJzE2MjEnOjE2Nzc4ODM3LCcxNjMyJzoxNjc3ODg0OCwnMTYzMyc6MTY3Nzg4NDksJzE2MzQnOjE2Nzc4ODUwLCcxNjM1JzoxNjc3ODg1MSwnMTYzNic6MTY3Nzg4NTIsJzE2MzcnOjE2Nzc4ODUzLCcxNjM4JzoxNjc3ODg1NCwnMTYzOSc6MTY3Nzg4NTUsJzE2NDAnOjE2Nzc4ODU2LCcxNjQxJzoxNjc3ODg1NywnMTY0Mic6MTY3Nzg4NTgsJzE2NDgnOjE2Nzc4ODY0LCcxNjU3JzoxNjc3ODg3MywnMTY2Mic6MTY3Nzg4NzgsJzE2NzAnOjE2Nzc4ODg2LCcxNjcyJzoxNjc3ODg4OCwnMTY4MSc6MTY3Nzg4OTcsJzE2ODgnOjE2Nzc4OTA0LCcxNzAwJzoxNjc3ODkxNiwnMTcwNSc6MTY3Nzg5MjEsJzE3MTEnOjE2Nzc4OTI3LCcxNzIyJzoxNjc3ODkzOCwnMTcyNic6MTY3Nzg5NDIsJzE3MjknOjE2Nzc4OTQ1LCcxNzQwJzoxNjc3ODk1NiwnMTc0Nic6MTY3Nzg5NjIsJzE3NDgnOjE2Nzc4OTY0LCcxNzc2JzoxNjc3ODk5MiwnMTc3Nyc6MTY3Nzg5OTMsJzE3NzgnOjE2Nzc4OTk0LCcxNzc5JzoxNjc3ODk5NSwnMTc4MCc6MTY3Nzg5OTYsJzE3ODEnOjE2Nzc4OTk3LCcxNzgyJzoxNjc3ODk5OCwnMTc4Myc6MTY3Nzg5OTksJzE3ODQnOjE2Nzc5MDAwLCcxNzg1JzoxNjc3OTAwMSwnMzQ1OCc6MTY3ODA2NzQsJzM0NTknOjE2NzgwNjc1LCczNDYxJzoxNjc4MDY3NywnMzQ2Mic6MTY3ODA2NzgsJzM0NjMnOjE2NzgwNjc5LCczNDY0JzoxNjc4MDY4MCwnMzQ2NSc6MTY3ODA2ODEsJzM0NjYnOjE2NzgwNjgyLCczNDY3JzoxNjc4MDY4MywnMzQ2OCc6MTY3ODA2ODQsJzM0NjknOjE2NzgwNjg1LCczNDcwJzoxNjc4MDY4NiwnMzQ3MSc6MTY3ODA2ODcsJzM0NzInOjE2NzgwNjg4LCczNDczJzoxNjc4MDY4OSwnMzQ3NCc6MTY3ODA2OTAsJzM0NzUnOjE2NzgwNjkxLCczNDc2JzoxNjc4MDY5MiwnMzQ3Nyc6MTY3ODA2OTMsJzM0NzgnOjE2NzgwNjk0LCczNDgyJzoxNjc4MDY5OCwnMzQ4Myc6MTY3ODA2OTksJzM0ODQnOjE2NzgwNzAwLCczNDg1JzoxNjc4MDcwMSwnMzQ4Nic6MTY3ODA3MDIsJzM0ODcnOjE2NzgwNzAzLCczNDg4JzoxNjc4MDcwNCwnMzQ4OSc6MTY3ODA3MDUsJzM0OTAnOjE2NzgwNzA2LCczNDkxJzoxNjc4MDcwNywnMzQ5Mic6MTY3ODA3MDgsJzM0OTMnOjE2NzgwNzA5LCczNDk0JzoxNjc4MDcxMCwnMzQ5NSc6MTY3ODA3MTEsJzM0OTYnOjE2NzgwNzEyLCczNDk3JzoxNjc4MDcxMywnMzQ5OCc6MTY3ODA3MTQsJzM0OTknOjE2NzgwNzE1LCczNTAwJzoxNjc4MDcxNiwnMzUwMSc6MTY3ODA3MTcsJzM1MDInOjE2NzgwNzE4LCczNTAzJzoxNjc4MDcxOSwnMzUwNCc6MTY3ODA3MjAsJzM1MDUnOjE2NzgwNzIxLCczNTA3JzoxNjc4MDcyMywnMzUwOCc6MTY3ODA3MjQsJzM1MDknOjE2NzgwNzI1LCczNTEwJzoxNjc4MDcyNiwnMzUxMSc6MTY3ODA3MjcsJzM1MTInOjE2NzgwNzI4LCczNTEzJzoxNjc4MDcyOSwnMzUxNCc6MTY3ODA3MzAsJzM1MTUnOjE2NzgwNzMxLCczNTE3JzoxNjc4MDczMywnMzUyMCc6MTY3ODA3MzYsJzM1MjEnOjE2NzgwNzM3LCczNTIyJzoxNjc4MDczOCwnMzUyMyc6MTY3ODA3MzksJzM1MjQnOjE2NzgwNzQwLCczNTI1JzoxNjc4MDc0MSwnMzUyNic6MTY3ODA3NDIsJzM1MzAnOjE2NzgwNzQ2LCczNTM1JzoxNjc4MDc1MSwnMzUzNic6MTY3ODA3NTIsJzM1MzcnOjE2NzgwNzUzLCczNTM4JzoxNjc4MDc1NCwnMzUzOSc6MTY3ODA3NTUsJzM1NDAnOjE2NzgwNzU2LCczNTQyJzoxNjc4MDc1OCwnMzU0NCc6MTY3ODA3NjAsJzM1NDUnOjE2NzgwNzYxLCczNTQ2JzoxNjc4MDc2MiwnMzU0Nyc6MTY3ODA3NjMsJzM1NDgnOjE2NzgwNzY0LCczNTQ5JzoxNjc4MDc2NSwnMzU1MCc6MTY3ODA3NjYsJzM1NTEnOjE2NzgwNzY3LCczNTcwJzoxNjc4MDc4NiwnMzU3MSc6MTY3ODA3ODcsJzM1NzInOjE2NzgwNzg4LCczNTg1JzozNDg5LCczNTg2JzozNDkwLCczNTg3JzozNDkxLCczNTg4JzozNDkyLCczNTg5JzozNDkzLCczNTkwJzozNDk0LCczNTkxJzozNDk1LCczNTkyJzozNDk2LCczNTkzJzozNDk3LCczNTk0JzozNDk4LCczNTk1JzozNDk5LCczNTk2JzozNTAwLCczNTk3JzozNTAxLCczNTk4JzozNTAyLCczNTk5JzozNTAzLCczNjAwJzozNTA0LCczNjAxJzozNTA1LCczNjAyJzozNTA2LCczNjAzJzozNTA3LCczNjA0JzozNTA4LCczNjA1JzozNTA5LCczNjA2JzozNTEwLCczNjA3JzozNTExLCczNjA4JzozNTEyLCczNjA5JzozNTEzLCczNjEwJzozNTE0LCczNjExJzozNTE1LCczNjEyJzozNTE2LCczNjEzJzozNTE3LCczNjE0JzozNTE4LCczNjE1JzozNTE5LCczNjE2JzozNTIwLCczNjE3JzozNTIxLCczNjE4JzozNTIyLCczNjE5JzozNTIzLCczNjIwJzozNTI0LCczNjIxJzozNTI1LCczNjIyJzozNTI2LCczNjIzJzozNTI3LCczNjI0JzozNTI4LCczNjI1JzozNTI5LCczNjI2JzozNTMwLCczNjI3JzozNTMxLCczNjI4JzozNTMyLCczNjI5JzozNTMzLCczNjMwJzozNTM0LCczNjMxJzozNTM1LCczNjMyJzozNTM2LCczNjMzJzozNTM3LCczNjM0JzozNTM4LCczNjM1JzozNTM5LCczNjM2JzozNTQwLCczNjM3JzozNTQxLCczNjM4JzozNTQyLCczNjM5JzozNTQzLCczNjQwJzozNTQ0LCczNjQxJzozNTQ1LCczNjQyJzozNTQ2LCczNjQ3JzozNTUxLCczNjQ4JzozNTUyLCczNjQ5JzozNTUzLCczNjUwJzozNTU0LCczNjUxJzozNTU1LCczNjUyJzozNTU2LCczNjUzJzozNTU3LCczNjU0JzozNTU4LCczNjU1JzozNTU5LCczNjU2JzozNTYwLCczNjU3JzozNTYxLCczNjU4JzozNTYyLCczNjU5JzozNTYzLCczNjYwJzozNTY0LCczNjYxJzozNTY1LCczNjY0JzozNTY4LCczNjY1JzozNTY5LCczNjY2JzozNTcwLCczNjY3JzozNTcxLCczNjY4JzozNTcyLCczNjY5JzozNTczLCczNjcwJzozNTc0LCczNjcxJzozNTc1LCczNjcyJzozNTc2LCczNjczJzozNTc3LCc0MzA0JzoxNjc4MTUyMCwnNDMwNSc6MTY3ODE1MjEsJzQzMDYnOjE2NzgxNTIyLCc0MzA3JzoxNjc4MTUyMywnNDMwOCc6MTY3ODE1MjQsJzQzMDknOjE2NzgxNTI1LCc0MzEwJzoxNjc4MTUyNiwnNDMxMSc6MTY3ODE1MjcsJzQzMTInOjE2NzgxNTI4LCc0MzEzJzoxNjc4MTUyOSwnNDMxNCc6MTY3ODE1MzAsJzQzMTUnOjE2NzgxNTMxLCc0MzE2JzoxNjc4MTUzMiwnNDMxNyc6MTY3ODE1MzMsJzQzMTgnOjE2NzgxNTM0LCc0MzE5JzoxNjc4MTUzNSwnNDMyMCc6MTY3ODE1MzYsJzQzMjEnOjE2NzgxNTM3LCc0MzIyJzoxNjc4MTUzOCwnNDMyMyc6MTY3ODE1MzksJzQzMjQnOjE2NzgxNTQwLCc0MzI1JzoxNjc4MTU0MSwnNDMyNic6MTY3ODE1NDIsJzQzMjcnOjE2NzgxNTQzLCc0MzI4JzoxNjc4MTU0NCwnNDMyOSc6MTY3ODE1NDUsJzQzMzAnOjE2NzgxNTQ2LCc0MzMxJzoxNjc4MTU0NywnNDMzMic6MTY3ODE1NDgsJzQzMzMnOjE2NzgxNTQ5LCc0MzM0JzoxNjc4MTU1MCwnNDMzNSc6MTY3ODE1NTEsJzQzMzYnOjE2NzgxNTUyLCc0MzM3JzoxNjc4MTU1MywnNDMzOCc6MTY3ODE1NTQsJzQzMzknOjE2NzgxNTU1LCc0MzQwJzoxNjc4MTU1NiwnNDM0MSc6MTY3ODE1NTcsJzQzNDInOjE2NzgxNTU4LCc3NjgyJzoxNjc4NDg5OCwnNzY4Myc6MTY3ODQ4OTksJzc2OTAnOjE2Nzg0OTA2LCc3NjkxJzoxNjc4NDkwNywnNzcxMCc6MTY3ODQ5MjYsJzc3MTEnOjE2Nzg0OTI3LCc3NzM0JzoxNjc4NDk1MCwnNzczNSc6MTY3ODQ5NTEsJzc3NDQnOjE2Nzg0OTYwLCc3NzQ1JzoxNjc4NDk2MSwnNzc2Nic6MTY3ODQ5ODIsJzc3NjcnOjE2Nzg0OTgzLCc3Nzc2JzoxNjc4NDk5MiwnNzc3Nyc6MTY3ODQ5OTMsJzc3ODYnOjE2Nzg1MDAyLCc3Nzg3JzoxNjc4NTAwMywnNzgwOCc6MTY3ODUwMjQsJzc4MDknOjE2Nzg1MDI1LCc3ODEwJzoxNjc4NTAyNiwnNzgxMSc6MTY3ODUwMjcsJzc4MTInOjE2Nzg1MDI4LCc3ODEzJzoxNjc4NTAyOSwnNzgxOCc6MTY3ODUwMzQsJzc4MTknOjE2Nzg1MDM1LCc3ODQwJzoxNjc4NTA1NiwnNzg0MSc6MTY3ODUwNTcsJzc4NDInOjE2Nzg1MDU4LCc3ODQzJzoxNjc4NTA1OSwnNzg0NCc6MTY3ODUwNjAsJzc4NDUnOjE2Nzg1MDYxLCc3ODQ2JzoxNjc4NTA2MiwnNzg0Nyc6MTY3ODUwNjMsJzc4NDgnOjE2Nzg1MDY0LCc3ODQ5JzoxNjc4NTA2NSwnNzg1MCc6MTY3ODUwNjYsJzc4NTEnOjE2Nzg1MDY3LCc3ODUyJzoxNjc4NTA2OCwnNzg1Myc6MTY3ODUwNjksJzc4NTQnOjE2Nzg1MDcwLCc3ODU1JzoxNjc4NTA3MSwnNzg1Nic6MTY3ODUwNzIsJzc4NTcnOjE2Nzg1MDczLCc3ODU4JzoxNjc4NTA3NCwnNzg1OSc6MTY3ODUwNzUsJzc4NjAnOjE2Nzg1MDc2LCc3ODYxJzoxNjc4NTA3NywnNzg2Mic6MTY3ODUwNzgsJzc4NjMnOjE2Nzg1MDc5LCc3ODY0JzoxNjc4NTA4MCwnNzg2NSc6MTY3ODUwODEsJzc4NjYnOjE2Nzg1MDgyLCc3ODY3JzoxNjc4NTA4MywnNzg2OCc6MTY3ODUwODQsJzc4NjknOjE2Nzg1MDg1LCc3ODcwJzoxNjc4NTA4NiwnNzg3MSc6MTY3ODUwODcsJzc4NzInOjE2Nzg1MDg4LCc3ODczJzoxNjc4NTA4OSwnNzg3NCc6MTY3ODUwOTAsJzc4NzUnOjE2Nzg1MDkxLCc3ODc2JzoxNjc4NTA5MiwnNzg3Nyc6MTY3ODUwOTMsJzc4NzgnOjE2Nzg1MDk0LCc3ODc5JzoxNjc4NTA5NSwnNzg4MCc6MTY3ODUwOTYsJzc4ODEnOjE2Nzg1MDk3LCc3ODgyJzoxNjc4NTA5OCwnNzg4Myc6MTY3ODUwOTksJzc4ODQnOjE2Nzg1MTAwLCc3ODg1JzoxNjc4NTEwMSwnNzg4Nic6MTY3ODUxMDIsJzc4ODcnOjE2Nzg1MTAzLCc3ODg4JzoxNjc4NTEwNCwnNzg4OSc6MTY3ODUxMDUsJzc4OTAnOjE2Nzg1MTA2LCc3ODkxJzoxNjc4NTEwNywnNzg5Mic6MTY3ODUxMDgsJzc4OTMnOjE2Nzg1MTA5LCc3ODk0JzoxNjc4NTExMCwnNzg5NSc6MTY3ODUxMTEsJzc4OTYnOjE2Nzg1MTEyLCc3ODk3JzoxNjc4NTExMywnNzg5OCc6MTY3ODUxMTQsJzc4OTknOjE2Nzg1MTE1LCc3OTAwJzoxNjc4NTExNiwnNzkwMSc6MTY3ODUxMTcsJzc5MDInOjE2Nzg1MTE4LCc3OTAzJzoxNjc4NTExOSwnNzkwNCc6MTY3ODUxMjAsJzc5MDUnOjE2Nzg1MTIxLCc3OTA2JzoxNjc4NTEyMiwnNzkwNyc6MTY3ODUxMjMsJzc5MDgnOjE2Nzg1MTI0LCc3OTA5JzoxNjc4NTEyNSwnNzkxMCc6MTY3ODUxMjYsJzc5MTEnOjE2Nzg1MTI3LCc3OTEyJzoxNjc4NTEyOCwnNzkxMyc6MTY3ODUxMjksJzc5MTQnOjE2Nzg1MTMwLCc3OTE1JzoxNjc4NTEzMSwnNzkxNic6MTY3ODUxMzIsJzc5MTcnOjE2Nzg1MTMzLCc3OTE4JzoxNjc4NTEzNCwnNzkxOSc6MTY3ODUxMzUsJzc5MjAnOjE2Nzg1MTM2LCc3OTIxJzoxNjc4NTEzNywnNzkyMic6MTY3ODUxMzgsJzc5MjMnOjE2Nzg1MTM5LCc3OTI0JzoxNjc4NTE0MCwnNzkyNSc6MTY3ODUxNDEsJzc5MjYnOjE2Nzg1MTQyLCc3OTI3JzoxNjc4NTE0MywnNzkyOCc6MTY3ODUxNDQsJzc5MjknOjE2Nzg1MTQ1LCc4MTk0JzoyNzIyLCc4MTk1JzoyNzIxLCc4MTk2JzoyNzIzLCc4MTk3JzoyNzI0LCc4MTk5JzoyNzI1LCc4MjAwJzoyNzI2LCc4MjAxJzoyNzI3LCc4MjAyJzoyNzI4LCc4MjEwJzoyNzQ3LCc4MjExJzoyNzMwLCc4MjEyJzoyNzI5LCc4MjEzJzoxOTY3LCc4MjE1JzozMjk1LCc4MjE2JzoyNzY4LCc4MjE3JzoyNzY5LCc4MjE4JzoyODEzLCc4MjIwJzoyNzcwLCc4MjIxJzoyNzcxLCc4MjIyJzoyODE0LCc4MjI0JzoyODAxLCc4MjI1JzoyODAyLCc4MjI2JzoyNzkwLCc4MjI5JzoyNzM1LCc4MjMwJzoyNzM0LCc4MjQwJzoyNzczLCc4MjQyJzoyNzc0LCc4MjQzJzoyNzc1LCc4MjQ4JzoyODEyLCc4MjU0JzoxMTUwLCc4MzA0JzoxNjc4NTUyMCwnODMwOCc6MTY3ODU1MjQsJzgzMDknOjE2Nzg1NTI1LCc4MzEwJzoxNjc4NTUyNiwnODMxMSc6MTY3ODU1MjcsJzgzMTInOjE2Nzg1NTI4LCc4MzEzJzoxNjc4NTUyOSwnODMyMCc6MTY3ODU1MzYsJzgzMjEnOjE2Nzg1NTM3LCc4MzIyJzoxNjc4NTUzOCwnODMyMyc6MTY3ODU1MzksJzgzMjQnOjE2Nzg1NTQwLCc4MzI1JzoxNjc4NTU0MSwnODMyNic6MTY3ODU1NDIsJzgzMjcnOjE2Nzg1NTQzLCc4MzI4JzoxNjc4NTU0NCwnODMyOSc6MTY3ODU1NDUsJzgzNTInOjE2Nzg1NTY4LCc4MzUzJzoxNjc4NTU2OSwnODM1NCc6MTY3ODU1NzAsJzgzNTUnOjE2Nzg1NTcxLCc4MzU2JzoxNjc4NTU3MiwnODM1Nyc6MTY3ODU1NzMsJzgzNTgnOjE2Nzg1NTc0LCc4MzU5JzoxNjc4NTU3NSwnODM2MCc6MTY3ODU1NzYsJzgzNjEnOjM4MzksJzgzNjInOjE2Nzg1NTc4LCc4MzYzJzoxNjc4NTU3OSwnODM2NCc6ODM2NCwnODQ1Myc6Mjc0NCwnODQ3MCc6MTcxMiwnODQ3MSc6MjgxMSwnODQ3OCc6Mjc3MiwnODQ4Mic6Mjc2MSwnODUzMSc6MjczNiwnODUzMic6MjczNywnODUzMyc6MjczOCwnODUzNCc6MjczOSwnODUzNSc6Mjc0MCwnODUzNic6Mjc0MSwnODUzNyc6Mjc0MiwnODUzOCc6Mjc0MywnODUzOSc6Mjc1NSwnODU0MCc6Mjc1NiwnODU0MSc6Mjc1NywnODU0Mic6Mjc1OCwnODU5Mic6MjI5OSwnODU5Myc6MjMwMCwnODU5NCc6MjMwMSwnODU5NSc6MjMwMiwnODY1OCc6MjI1NCwnODY2MCc6MjI1MywnODcwNic6MjI4NywnODcwOSc6MTY3ODU5MjUsJzg3MTEnOjIyNDUsJzg3MTInOjE2Nzg1OTI4LCc4NzEzJzoxNjc4NTkyOSwnODcxNSc6MTY3ODU5MzEsJzg3MjgnOjMwMTgsJzg3MzAnOjIyNjIsJzg3MzEnOjE2Nzg1OTQ3LCc4NzMyJzoxNjc4NTk0OCwnODczMyc6MjI0MSwnODczNCc6MjI0MiwnODc0Myc6MjI3MCwnODc0NCc6MjI3MSwnODc0NSc6MjI2OCwnODc0Nic6MjI2OSwnODc0Nyc6MjIzOSwnODc0OCc6MTY3ODU5NjQsJzg3NDknOjE2Nzg1OTY1LCc4NzU2JzoyMjQwLCc4NzU3JzoxNjc4NTk3MywnODc2NCc6MjI0OCwnODc3MSc6MjI0OSwnODc3Myc6MTY3ODU5OTIsJzg3NzUnOjE2Nzg1OTkxLCc4ODAwJzoyMjM3LCc4ODAxJzoyMjU1LCc4ODAyJzoxNjc4NjAxOCwnODgwMyc6MTY3ODYwMTksJzg4MDQnOjIyMzYsJzg4MDUnOjIyMzgsJzg4MzQnOjIyNjYsJzg4MzUnOjIyNjcsJzg4NjYnOjMwNjgsJzg4NjcnOjMwMzYsJzg4NjgnOjMwMTAsJzg4NjknOjMwMjIsJzg5NjgnOjMwMjcsJzg5NzAnOjMwMTIsJzg5ODEnOjI4MTAsJzg5OTInOjIyMTIsJzg5OTMnOjIyMTMsJzkxMDknOjMwMjAsJzkxMTUnOjIyMTksJzkxMTcnOjIyMjAsJzkxMTgnOjIyMjEsJzkxMjAnOjIyMjIsJzkxMjEnOjIyMTUsJzkxMjMnOjIyMTYsJzkxMjQnOjIyMTcsJzkxMjYnOjIyMTgsJzkxMjgnOjIyMjMsJzkxMzInOjIyMjQsJzkxNDMnOjIyMDksJzkxNDYnOjI1NDMsJzkxNDcnOjI1NDQsJzkxNDgnOjI1NDYsJzkxNDknOjI1NDcsJzkyMjUnOjI1MzAsJzkyMjYnOjI1MzMsJzkyMjcnOjI1MzcsJzkyMjgnOjI1MzEsJzkyMjknOjI1MzIsJzkyNTEnOjI3MzIsJzkyNTInOjI1MzYsJzk0NzInOjIyMTEsJzk0NzQnOjIyMTQsJzk0ODQnOjIyMTAsJzk0ODgnOjI1MzksJzk0OTInOjI1NDEsJzk0OTYnOjI1MzgsJzk1MDAnOjI1NDgsJzk1MDgnOjI1NDksJzk1MTYnOjI1NTEsJzk1MjQnOjI1NTAsJzk1MzInOjI1NDIsJzk2MTgnOjI1MjksJzk2NDInOjI3OTEsJzk2NDMnOjI3ODUsJzk2NDQnOjI3NzksJzk2NDUnOjI3ODYsJzk2NDYnOjI3ODMsJzk2NDcnOjI3NjcsJzk2NTAnOjI3OTIsJzk2NTEnOjI3ODcsJzk2NTQnOjI3ODEsJzk2NTUnOjI3NjUsJzk2NjAnOjI3OTMsJzk2NjEnOjI3ODgsJzk2NjQnOjI3ODAsJzk2NjUnOjI3NjQsJzk2NzAnOjI1MjgsJzk2NzUnOjI3NjYsJzk2NzknOjI3ODIsJzk3MDInOjI3ODQsJzk3MzQnOjI3ODksJzk3NDInOjI4MDksJzk3NDcnOjI3NjIsJzk3NTYnOjI3OTQsJzk3NTgnOjI3OTUsJzk3OTInOjI4MDgsJzk3OTQnOjI4MDcsJzk4MjcnOjI3OTYsJzk4MjknOjI3OTgsJzk4MzAnOjI3OTcsJzk4MzcnOjI4MDYsJzk4MzknOjI4MDUsJzEwMDAzJzoyODAzLCcxMDAwNyc6MjgwNCwnMTAwMTMnOjI3NzcsJzEwMDE2JzoyODAwLCcxMDIxNic6Mjc0OCwnMTAyMTcnOjI3NTAsJzEwMjQwJzoxNjc4NzQ1NiwnMTAyNDEnOjE2Nzg3NDU3LCcxMDI0Mic6MTY3ODc0NTgsJzEwMjQzJzoxNjc4NzQ1OSwnMTAyNDQnOjE2Nzg3NDYwLCcxMDI0NSc6MTY3ODc0NjEsJzEwMjQ2JzoxNjc4NzQ2MiwnMTAyNDcnOjE2Nzg3NDYzLCcxMDI0OCc6MTY3ODc0NjQsJzEwMjQ5JzoxNjc4NzQ2NSwnMTAyNTAnOjE2Nzg3NDY2LCcxMDI1MSc6MTY3ODc0NjcsJzEwMjUyJzoxNjc4NzQ2OCwnMTAyNTMnOjE2Nzg3NDY5LCcxMDI1NCc6MTY3ODc0NzAsJzEwMjU1JzoxNjc4NzQ3MSwnMTAyNTYnOjE2Nzg3NDcyLCcxMDI1Nyc6MTY3ODc0NzMsJzEwMjU4JzoxNjc4NzQ3NCwnMTAyNTknOjE2Nzg3NDc1LCcxMDI2MCc6MTY3ODc0NzYsJzEwMjYxJzoxNjc4NzQ3NywnMTAyNjInOjE2Nzg3NDc4LCcxMDI2Myc6MTY3ODc0NzksJzEwMjY0JzoxNjc4NzQ4MCwnMTAyNjUnOjE2Nzg3NDgxLCcxMDI2Nic6MTY3ODc0ODIsJzEwMjY3JzoxNjc4NzQ4MywnMTAyNjgnOjE2Nzg3NDg0LCcxMDI2OSc6MTY3ODc0ODUsJzEwMjcwJzoxNjc4NzQ4NiwnMTAyNzEnOjE2Nzg3NDg3LCcxMDI3Mic6MTY3ODc0ODgsJzEwMjczJzoxNjc4NzQ4OSwnMTAyNzQnOjE2Nzg3NDkwLCcxMDI3NSc6MTY3ODc0OTEsJzEwMjc2JzoxNjc4NzQ5MiwnMTAyNzcnOjE2Nzg3NDkzLCcxMDI3OCc6MTY3ODc0OTQsJzEwMjc5JzoxNjc4NzQ5NSwnMTAyODAnOjE2Nzg3NDk2LCcxMDI4MSc6MTY3ODc0OTcsJzEwMjgyJzoxNjc4NzQ5OCwnMTAyODMnOjE2Nzg3NDk5LCcxMDI4NCc6MTY3ODc1MDAsJzEwMjg1JzoxNjc4NzUwMSwnMTAyODYnOjE2Nzg3NTAyLCcxMDI4Nyc6MTY3ODc1MDMsJzEwMjg4JzoxNjc4NzUwNCwnMTAyODknOjE2Nzg3NTA1LCcxMDI5MCc6MTY3ODc1MDYsJzEwMjkxJzoxNjc4NzUwNywnMTAyOTInOjE2Nzg3NTA4LCcxMDI5Myc6MTY3ODc1MDksJzEwMjk0JzoxNjc4NzUxMCwnMTAyOTUnOjE2Nzg3NTExLCcxMDI5Nic6MTY3ODc1MTIsJzEwMjk3JzoxNjc4NzUxMywnMTAyOTgnOjE2Nzg3NTE0LCcxMDI5OSc6MTY3ODc1MTUsJzEwMzAwJzoxNjc4NzUxNiwnMTAzMDEnOjE2Nzg3NTE3LCcxMDMwMic6MTY3ODc1MTgsJzEwMzAzJzoxNjc4NzUxOSwnMTAzMDQnOjE2Nzg3NTIwLCcxMDMwNSc6MTY3ODc1MjEsJzEwMzA2JzoxNjc4NzUyMiwnMTAzMDcnOjE2Nzg3NTIzLCcxMDMwOCc6MTY3ODc1MjQsJzEwMzA5JzoxNjc4NzUyNSwnMTAzMTAnOjE2Nzg3NTI2LCcxMDMxMSc6MTY3ODc1MjcsJzEwMzEyJzoxNjc4NzUyOCwnMTAzMTMnOjE2Nzg3NTI5LCcxMDMxNCc6MTY3ODc1MzAsJzEwMzE1JzoxNjc4NzUzMSwnMTAzMTYnOjE2Nzg3NTMyLCcxMDMxNyc6MTY3ODc1MzMsJzEwMzE4JzoxNjc4NzUzNCwnMTAzMTknOjE2Nzg3NTM1LCcxMDMyMCc6MTY3ODc1MzYsJzEwMzIxJzoxNjc4NzUzNywnMTAzMjInOjE2Nzg3NTM4LCcxMDMyMyc6MTY3ODc1MzksJzEwMzI0JzoxNjc4NzU0MCwnMTAzMjUnOjE2Nzg3NTQxLCcxMDMyNic6MTY3ODc1NDIsJzEwMzI3JzoxNjc4NzU0MywnMTAzMjgnOjE2Nzg3NTQ0LCcxMDMyOSc6MTY3ODc1NDUsJzEwMzMwJzoxNjc4NzU0NiwnMTAzMzEnOjE2Nzg3NTQ3LCcxMDMzMic6MTY3ODc1NDgsJzEwMzMzJzoxNjc4NzU0OSwnMTAzMzQnOjE2Nzg3NTUwLCcxMDMzNSc6MTY3ODc1NTEsJzEwMzM2JzoxNjc4NzU1MiwnMTAzMzcnOjE2Nzg3NTUzLCcxMDMzOCc6MTY3ODc1NTQsJzEwMzM5JzoxNjc4NzU1NSwnMTAzNDAnOjE2Nzg3NTU2LCcxMDM0MSc6MTY3ODc1NTcsJzEwMzQyJzoxNjc4NzU1OCwnMTAzNDMnOjE2Nzg3NTU5LCcxMDM0NCc6MTY3ODc1NjAsJzEwMzQ1JzoxNjc4NzU2MSwnMTAzNDYnOjE2Nzg3NTYyLCcxMDM0Nyc6MTY3ODc1NjMsJzEwMzQ4JzoxNjc4NzU2NCwnMTAzNDknOjE2Nzg3NTY1LCcxMDM1MCc6MTY3ODc1NjYsJzEwMzUxJzoxNjc4NzU2NywnMTAzNTInOjE2Nzg3NTY4LCcxMDM1Myc6MTY3ODc1NjksJzEwMzU0JzoxNjc4NzU3MCwnMTAzNTUnOjE2Nzg3NTcxLCcxMDM1Nic6MTY3ODc1NzIsJzEwMzU3JzoxNjc4NzU3MywnMTAzNTgnOjE2Nzg3NTc0LCcxMDM1OSc6MTY3ODc1NzUsJzEwMzYwJzoxNjc4NzU3NiwnMTAzNjEnOjE2Nzg3NTc3LCcxMDM2Mic6MTY3ODc1NzgsJzEwMzYzJzoxNjc4NzU3OSwnMTAzNjQnOjE2Nzg3NTgwLCcxMDM2NSc6MTY3ODc1ODEsJzEwMzY2JzoxNjc4NzU4MiwnMTAzNjcnOjE2Nzg3NTgzLCcxMDM2OCc6MTY3ODc1ODQsJzEwMzY5JzoxNjc4NzU4NSwnMTAzNzAnOjE2Nzg3NTg2LCcxMDM3MSc6MTY3ODc1ODcsJzEwMzcyJzoxNjc4NzU4OCwnMTAzNzMnOjE2Nzg3NTg5LCcxMDM3NCc6MTY3ODc1OTAsJzEwMzc1JzoxNjc4NzU5MSwnMTAzNzYnOjE2Nzg3NTkyLCcxMDM3Nyc6MTY3ODc1OTMsJzEwMzc4JzoxNjc4NzU5NCwnMTAzNzknOjE2Nzg3NTk1LCcxMDM4MCc6MTY3ODc1OTYsJzEwMzgxJzoxNjc4NzU5NywnMTAzODInOjE2Nzg3NTk4LCcxMDM4Myc6MTY3ODc1OTksJzEwMzg0JzoxNjc4NzYwMCwnMTAzODUnOjE2Nzg3NjAxLCcxMDM4Nic6MTY3ODc2MDIsJzEwMzg3JzoxNjc4NzYwMywnMTAzODgnOjE2Nzg3NjA0LCcxMDM4OSc6MTY3ODc2MDUsJzEwMzkwJzoxNjc4NzYwNiwnMTAzOTEnOjE2Nzg3NjA3LCcxMDM5Mic6MTY3ODc2MDgsJzEwMzkzJzoxNjc4NzYwOSwnMTAzOTQnOjE2Nzg3NjEwLCcxMDM5NSc6MTY3ODc2MTEsJzEwMzk2JzoxNjc4NzYxMiwnMTAzOTcnOjE2Nzg3NjEzLCcxMDM5OCc6MTY3ODc2MTQsJzEwMzk5JzoxNjc4NzYxNSwnMTA0MDAnOjE2Nzg3NjE2LCcxMDQwMSc6MTY3ODc2MTcsJzEwNDAyJzoxNjc4NzYxOCwnMTA0MDMnOjE2Nzg3NjE5LCcxMDQwNCc6MTY3ODc2MjAsJzEwNDA1JzoxNjc4NzYyMSwnMTA0MDYnOjE2Nzg3NjIyLCcxMDQwNyc6MTY3ODc2MjMsJzEwNDA4JzoxNjc4NzYyNCwnMTA0MDknOjE2Nzg3NjI1LCcxMDQxMCc6MTY3ODc2MjYsJzEwNDExJzoxNjc4NzYyNywnMTA0MTInOjE2Nzg3NjI4LCcxMDQxMyc6MTY3ODc2MjksJzEwNDE0JzoxNjc4NzYzMCwnMTA0MTUnOjE2Nzg3NjMxLCcxMDQxNic6MTY3ODc2MzIsJzEwNDE3JzoxNjc4NzYzMywnMTA0MTgnOjE2Nzg3NjM0LCcxMDQxOSc6MTY3ODc2MzUsJzEwNDIwJzoxNjc4NzYzNiwnMTA0MjEnOjE2Nzg3NjM3LCcxMDQyMic6MTY3ODc2MzgsJzEwNDIzJzoxNjc4NzYzOSwnMTA0MjQnOjE2Nzg3NjQwLCcxMDQyNSc6MTY3ODc2NDEsJzEwNDI2JzoxNjc4NzY0MiwnMTA0MjcnOjE2Nzg3NjQzLCcxMDQyOCc6MTY3ODc2NDQsJzEwNDI5JzoxNjc4NzY0NSwnMTA0MzAnOjE2Nzg3NjQ2LCcxMDQzMSc6MTY3ODc2NDcsJzEwNDMyJzoxNjc4NzY0OCwnMTA0MzMnOjE2Nzg3NjQ5LCcxMDQzNCc6MTY3ODc2NTAsJzEwNDM1JzoxNjc4NzY1MSwnMTA0MzYnOjE2Nzg3NjUyLCcxMDQzNyc6MTY3ODc2NTMsJzEwNDM4JzoxNjc4NzY1NCwnMTA0MzknOjE2Nzg3NjU1LCcxMDQ0MCc6MTY3ODc2NTYsJzEwNDQxJzoxNjc4NzY1NywnMTA0NDInOjE2Nzg3NjU4LCcxMDQ0Myc6MTY3ODc2NTksJzEwNDQ0JzoxNjc4NzY2MCwnMTA0NDUnOjE2Nzg3NjYxLCcxMDQ0Nic6MTY3ODc2NjIsJzEwNDQ3JzoxNjc4NzY2MywnMTA0NDgnOjE2Nzg3NjY0LCcxMDQ0OSc6MTY3ODc2NjUsJzEwNDUwJzoxNjc4NzY2NiwnMTA0NTEnOjE2Nzg3NjY3LCcxMDQ1Mic6MTY3ODc2NjgsJzEwNDUzJzoxNjc4NzY2OSwnMTA0NTQnOjE2Nzg3NjcwLCcxMDQ1NSc6MTY3ODc2NzEsJzEwNDU2JzoxNjc4NzY3MiwnMTA0NTcnOjE2Nzg3NjczLCcxMDQ1OCc6MTY3ODc2NzQsJzEwNDU5JzoxNjc4NzY3NSwnMTA0NjAnOjE2Nzg3Njc2LCcxMDQ2MSc6MTY3ODc2NzcsJzEwNDYyJzoxNjc4NzY3OCwnMTA0NjMnOjE2Nzg3Njc5LCcxMDQ2NCc6MTY3ODc2ODAsJzEwNDY1JzoxNjc4NzY4MSwnMTA0NjYnOjE2Nzg3NjgyLCcxMDQ2Nyc6MTY3ODc2ODMsJzEwNDY4JzoxNjc4NzY4NCwnMTA0NjknOjE2Nzg3Njg1LCcxMDQ3MCc6MTY3ODc2ODYsJzEwNDcxJzoxNjc4NzY4NywnMTA0NzInOjE2Nzg3Njg4LCcxMDQ3Myc6MTY3ODc2ODksJzEwNDc0JzoxNjc4NzY5MCwnMTA0NzUnOjE2Nzg3NjkxLCcxMDQ3Nic6MTY3ODc2OTIsJzEwNDc3JzoxNjc4NzY5MywnMTA0NzgnOjE2Nzg3Njk0LCcxMDQ3OSc6MTY3ODc2OTUsJzEwNDgwJzoxNjc4NzY5NiwnMTA0ODEnOjE2Nzg3Njk3LCcxMDQ4Mic6MTY3ODc2OTgsJzEwNDgzJzoxNjc4NzY5OSwnMTA0ODQnOjE2Nzg3NzAwLCcxMDQ4NSc6MTY3ODc3MDEsJzEwNDg2JzoxNjc4NzcwMiwnMTA0ODcnOjE2Nzg3NzAzLCcxMDQ4OCc6MTY3ODc3MDQsJzEwNDg5JzoxNjc4NzcwNSwnMTA0OTAnOjE2Nzg3NzA2LCcxMDQ5MSc6MTY3ODc3MDcsJzEwNDkyJzoxNjc4NzcwOCwnMTA0OTMnOjE2Nzg3NzA5LCcxMDQ5NCc6MTY3ODc3MTAsJzEwNDk1JzoxNjc4NzcxMSwnMTIyODknOjExODgsJzEyMjkwJzoxMTg1LCcxMjMwMCc6MTE4NiwnMTIzMDEnOjExODcsJzEyNDQzJzoxMjQ2LCcxMjQ0NCc6MTI0NywnMTI0NDknOjExOTEsJzEyNDUwJzoxMjAxLCcxMjQ1MSc6MTE5MiwnMTI0NTInOjEyMDIsJzEyNDUzJzoxMTkzLCcxMjQ1NCc6MTIwMywnMTI0NTUnOjExOTQsJzEyNDU2JzoxMjA0LCcxMjQ1Nyc6MTE5NSwnMTI0NTgnOjEyMDUsJzEyNDU5JzoxMjA2LCcxMjQ2MSc6MTIwNywnMTI0NjMnOjEyMDgsJzEyNDY1JzoxMjA5LCcxMjQ2Nyc6MTIxMCwnMTI0NjknOjEyMTEsJzEyNDcxJzoxMjEyLCcxMjQ3Myc6MTIxMywnMTI0NzUnOjEyMTQsJzEyNDc3JzoxMjE1LCcxMjQ3OSc6MTIxNiwnMTI0ODEnOjEyMTcsJzEyNDgzJzoxMTk5LCcxMjQ4NCc6MTIxOCwnMTI0ODYnOjEyMTksJzEyNDg4JzoxMjIwLCcxMjQ5MCc6MTIyMSwnMTI0OTEnOjEyMjIsJzEyNDkyJzoxMjIzLCcxMjQ5Myc6MTIyNCwnMTI0OTQnOjEyMjUsJzEyNDk1JzoxMjI2LCcxMjQ5OCc6MTIyNywnMTI1MDEnOjEyMjgsJzEyNTA0JzoxMjI5LCcxMjUwNyc6MTIzMCwnMTI1MTAnOjEyMzEsJzEyNTExJzoxMjMyLCcxMjUxMic6MTIzMywnMTI1MTMnOjEyMzQsJzEyNTE0JzoxMjM1LCcxMjUxNSc6MTE5NiwnMTI1MTYnOjEyMzYsJzEyNTE3JzoxMTk3LCcxMjUxOCc6MTIzNywnMTI1MTknOjExOTgsJzEyNTIwJzoxMjM4LCcxMjUyMSc6MTIzOSwnMTI1MjInOjEyNDAsJzEyNTIzJzoxMjQxLCcxMjUyNCc6MTI0MiwnMTI1MjUnOjEyNDMsJzEyNTI3JzoxMjQ0LCcxMjUzMCc6MTE5MCwnMTI1MzEnOjEyNDUsJzEyNTM5JzoxMTg5LCcxMjU0MCc6MTIwMH07XG5cblxuZnVuY3Rpb24gbG9va3VwKGspIHtcblx0cmV0dXJuIGsgPyB7a2V5c3ltOiBrLCBrZXluYW1lOiBrZXluYW1lcyA/IGtleW5hbWVzW2tdIDoga30gOiB1bmRlZmluZWQ7XG59XG5cblxuZnVuY3Rpb24gZnJvbVVuaWNvZGUodSkge1xuXHRyZXR1cm4gbG9va3VwKGNvZGVwb2ludHNbdV0pO1xufVxuXG5cbi8qKlxuICogRXhwb3NlIGxvb2t1cCgpIGFuZCBmcm9tVW5pY29kZSgpIGZ1bmN0aW9ucy5cbiAqL1xuS2V5cy5sb29rdXAgPSBsb29rdXA7XG5LZXlzLmZyb21Vbmljb2RlID0gZnJvbVVuaWNvZGU7XG5cblxuLyoqXG4gKiBFeHBvc2UgS2V5cyBPYmplY3QuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gS2V5cztcbiIsIi8qXG4gKiBub1ZOQzogSFRNTDUgVk5DIGNsaWVudFxuICogQ29weXJpZ2h0IChDKSAyMDEyIEpvZWwgTWFydGluXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTMgU2FtdWVsIE1hbm5laGVkIGZvciBDZW5kaW8gQUJcbiAqIExpY2Vuc2VkIHVuZGVyIE1QTCAyLjAgKHNlZSBMSUNFTlNFLnR4dClcbiAqXG4gKiBUSUdIVCBkZWNvZGVyIHBvcnRpb246XG4gKiAoYykgMjAxMiBNaWNoYWVsIFRpbmdsb2YsIEpvZSBCYWxheiwgTGVzIFBpZWNoIChNZXJjdXJpLmNhKVxuICovXG5cblxuLyoqXG4gKiBFeHBvc2UgdGhlIFJGQiBjbGFzcy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBSRkI7XG5cblxuLyoqXG4gKiBEZXBlbmRlbmNpZXMuXG4gKi9cbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ25vVk5DOlJGQicpO1xudmFyIGRlYnVnZXJyb3IgPSByZXF1aXJlKCdkZWJ1ZycpKCdub1ZOQzpFUlJPUjpSRkInKTtcbmRlYnVnZXJyb3IubG9nID0gY29uc29sZS53YXJuLmJpbmQoY29uc29sZSk7XG52YXIgVXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xudmFyIFdlYnNvY2sgPSByZXF1aXJlKCcuL3dlYnNvY2snKTtcbnZhciBLZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG52YXIgSW5wdXQgPSByZXF1aXJlKCcuL2lucHV0Jyk7XG52YXIgS2V5Ym9hcmQgPSBJbnB1dC5LZXlib2FyZDtcbnZhciBNb3VzZSA9IElucHV0Lk1vdXNlO1xudmFyIERpc3BsYXkgPSByZXF1aXJlKCcuL2Rpc3BsYXknKTtcbnZhciBCYXNlNjQgPSByZXF1aXJlKCcuL2Jhc2U2NCcpO1xudmFyIERFUyA9IHJlcXVpcmUoJy4vZGVzJyk7XG52YXIgVElORiA9IHJlcXVpcmUoJy4vdGluZicpO1xuXG5cbmZ1bmN0aW9uIFJGQiAoZGVmYXVsdHMpIHtcblx0ZGVidWcoJ25ldygpJyk7XG5cblx0ZGVmYXVsdHMgPSBkZWZhdWx0cyB8fCB7fTtcblxuXHR0aGlzLl9yZmJfdXJsID0gbnVsbDtcblx0dGhpcy5fcmZiX3Bhc3N3b3JkID0gJyc7XG5cblx0dGhpcy5fcmZiX3N0YXRlID0gJ2Rpc2Nvbm5lY3RlZCc7XG5cdHRoaXMuX3JmYl92ZXJzaW9uID0gMDtcblx0dGhpcy5fcmZiX21heF92ZXJzaW9uID0gMy44O1xuXHR0aGlzLl9yZmJfYXV0aF9zY2hlbWUgPSAnJztcblxuXHR0aGlzLl9yZmJfdGlnaHR2bmMgPSBmYWxzZTtcblx0dGhpcy5fcmZiX3h2cF92ZXIgPSAwO1xuXG5cdC8vIEluIHByZWZlcmVuY2Ugb3JkZXJcblx0dGhpcy5fZW5jb2RpbmdzID0gW1xuXHRcdFsnQ09QWVJFQ1QnLCAgICAgICAgIDB4MDEgXSxcblx0XHRbJ1RJR0hUJywgICAgICAgICAgICAweDA3IF0sXG5cdFx0WydUSUdIVF9QTkcnLCAgICAgICAgLTI2MCBdLFxuXHRcdFsnSEVYVElMRScsICAgICAgICAgIDB4MDUgXSxcblx0XHRbJ1JSRScsICAgICAgICAgICAgICAweDAyIF0sXG5cdFx0WydSQVcnLCAgICAgICAgICAgICAgMHgwMCBdLFxuXHRcdFsnRGVza3RvcFNpemUnLCAgICAgIC0yMjMgXSxcblx0XHRbJ0N1cnNvcicsICAgICAgICAgICAtMjM5IF0sXG5cblx0XHQvLyBQc3VlZG8tZW5jb2Rpbmcgc2V0dGluZ3Ncblx0XHQvL1snSlBFR19xdWFsaXR5X2xvJywgICAgLTMyIF0sXG5cdFx0WydKUEVHX3F1YWxpdHlfbWVkJywgICAgIC0yNiBdLFxuXHRcdC8vWydKUEVHX3F1YWxpdHlfaGknLCAgICAtMjMgXSxcblx0XHQvL1snY29tcHJlc3NfbG8nLCAgICAgICAtMjU1IF0sXG5cdFx0Wydjb21wcmVzc19oaScsICAgICAgICAgLTI0NyBdLFxuXHRcdFsnbGFzdF9yZWN0JywgICAgICAgICAgIC0yMjQgXSxcblx0XHRbJ3h2cCcsICAgICAgICAgICAgICAgICAtMzA5IF0sXG5cdFx0WydFeHRlbmRlZERlc2t0b3BTaXplJywgLTMwOCBdXG5cdF07XG5cblx0dGhpcy5fZW5jSGFuZGxlcnMgPSB7fTtcblx0dGhpcy5fZW5jTmFtZXMgPSB7fTtcblx0dGhpcy5fZW5jU3RhdHMgPSB7fTtcblxuXHR0aGlzLl9zb2NrID0gbnVsbDsgICAgICAgICAgICAgIC8vIFdlYnNvY2sgb2JqZWN0XG5cdHRoaXMuX2Rpc3BsYXkgPSBudWxsOyAgICAgICAgICAgLy8gRGlzcGxheSBvYmplY3Rcblx0dGhpcy5fa2V5Ym9hcmQgPSBudWxsOyAgICAgICAgICAvLyBLZXlib2FyZCBpbnB1dCBoYW5kbGVyIG9iamVjdFxuXHR0aGlzLl9tb3VzZSA9IG51bGw7ICAgICAgICAgICAgIC8vIE1vdXNlIGlucHV0IGhhbmRsZXIgb2JqZWN0XG5cdHRoaXMuX3NlbmRUaW1lciA9IG51bGw7ICAgICAgICAgLy8gU2VuZCBRdWV1ZSBjaGVjayB0aW1lclxuXHR0aGlzLl9kaXNjb25uVGltZXIgPSBudWxsOyAgICAgIC8vIGRpc2Nvbm5lY3Rpb24gdGltZXJcblx0dGhpcy5fbXNnVGltZXIgPSBudWxsOyAgICAgICAgICAvLyBxdWV1ZWQgaGFuZGxlX21zZyB0aW1lclxuXG5cdC8vIEZyYW1lIGJ1ZmZlciB1cGRhdGUgc3RhdGVcblx0dGhpcy5fRkJVID0ge1xuXHRcdHJlY3RzOiAwLFxuXHRcdHN1YnJlY3RzOiAwLCAgICAgICAgICAgIC8vIFJSRVxuXHRcdGxpbmVzOiAwLCAgICAgICAgICAgICAgIC8vIFJBV1xuXHRcdHRpbGVzOiAwLCAgICAgICAgICAgICAgIC8vIEhFWFRJTEVcblx0XHRieXRlczogMCxcblx0XHR4OiAwLFxuXHRcdHk6IDAsXG5cdFx0d2lkdGg6IDAsXG5cdFx0aGVpZ2h0OiAwLFxuXHRcdGVuY29kaW5nOiAwLFxuXHRcdHN1YmVuY29kaW5nOiAtMSxcblx0XHRiYWNrZ3JvdW5kOiBudWxsLFxuXHRcdHpsaWI6IFtdICAgICAgICAgICAgICAgIC8vIFRJR0hUIHpsaWIgc3RyZWFtc1xuXHR9O1xuXG5cdHRoaXMuX2ZiX0JwcCA9IDQ7XG5cdHRoaXMuX2ZiX2RlcHRoID0gMztcblx0dGhpcy5fZmJfd2lkdGggPSAwO1xuXHR0aGlzLl9mYl9oZWlnaHQgPSAwO1xuXHR0aGlzLl9mYl9uYW1lID0gJyc7XG5cblx0dGhpcy5fcnJlX2NodW5rX3N6ID0gMTAwO1xuXG5cdHRoaXMuX3RpbWluZyA9IHtcblx0XHRsYXN0X2ZidTogMCxcblx0XHRmYnVfdG90YWw6IDAsXG5cdFx0ZmJ1X3RvdGFsX2NudDogMCxcblx0XHRmdWxsX2ZidV90b3RhbDogMCxcblx0XHRmdWxsX2ZidV9jbnQ6IDAsXG5cblx0XHRmYnVfcnRfc3RhcnQ6IDAsXG5cdFx0ZmJ1X3J0X3RvdGFsOiAwLFxuXHRcdGZidV9ydF9jbnQ6IDAsXG5cdFx0cGl4ZWxzOiAwXG5cdH07XG5cblx0dGhpcy5fc3VwcG9ydHNTZXREZXNrdG9wU2l6ZSA9IGZhbHNlO1xuXHR0aGlzLl9zY3JlZW5faWQgPSAwO1xuXHR0aGlzLl9zY3JlZW5fZmxhZ3MgPSAwO1xuXG5cdC8vIE1vdXNlIHN0YXRlXG5cdHRoaXMuX21vdXNlX2J1dHRvbk1hc2sgPSAwO1xuXHR0aGlzLl9tb3VzZV9hcnIgPSBbXTtcblx0dGhpcy5fdmlld3BvcnREcmFnZ2luZyA9IGZhbHNlO1xuXHR0aGlzLl92aWV3cG9ydERyYWdQb3MgPSB7fTtcblxuXHQvLyBzZXQgdGhlIGRlZmF1bHQgdmFsdWUgb24gdXNlci1mYWNpbmcgcHJvcGVydGllc1xuXHRVdGlsLnNldF9kZWZhdWx0cyh0aGlzLCBkZWZhdWx0cywge1xuXHRcdCd0YXJnZXQnOiAnbnVsbCcsICAgICAgICAgICAgICAgICAgICAgICAvLyBWTkMgZGlzcGxheSByZW5kZXJpbmcgQ2FudmFzIG9iamVjdFxuXHRcdCdmb2N1c0NvbnRhaW5lcic6IGRvY3VtZW50LCAgICAgICAgICAgICAvLyBET00gZWxlbWVudCB0aGF0IGNhcHR1cmVzIGtleWJvYXJkIGlucHV0XG5cdFx0J2VuY3J5cHQnOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzZSBUTFMvU1NML3dzcyBlbmNyeXB0aW9uXG5cdFx0J3RydWVfY29sb3InOiB0cnVlLCAgICAgICAgICAgICAgICAgICAgIC8vIFJlcXVlc3QgdHJ1ZSBjb2xvciBwaXhlbCBkYXRhXG5cdFx0J2xvY2FsX2N1cnNvcic6IGZhbHNlLCAgICAgICAgICAgICAgICAgIC8vIFJlcXVlc3QgbG9jYWxseSByZW5kZXJlZCBjdXJzb3Jcblx0XHQnc2hhcmVkJzogdHJ1ZSwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVxdWVzdCBzaGFyZWQgbW9kZVxuXHRcdCd2aWV3X29ubHknOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAvLyBEaXNhYmxlIGNsaWVudCBtb3VzZS9rZXlib2FyZFxuXHRcdCd4dnBfcGFzc3dvcmRfc2VwJzogJ0AnLCAgICAgICAgICAgICAgICAvLyBTZXBhcmF0b3IgZm9yIFhWUCBwYXNzd29yZCBmaWVsZHNcblx0XHQnZGlzY29ubmVjdFRpbWVvdXQnOiAzLCAgICAgICAgICAgICAgICAgLy8gVGltZSAocykgdG8gd2FpdCBmb3IgZGlzY29ubmVjdGlvblxuXHRcdCd3c1Byb3RvY29scyc6IFsnYmluYXJ5JywgJ2Jhc2U2NCddLCAgICAvLyBQcm90b2NvbHMgdG8gdXNlIGluIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvblxuXHRcdCdyZXBlYXRlcklEJzogJycsICAgICAgICAgICAgICAgICAgICAgICAvLyBbVWx0cmFWTkNdIFJlcGVhdGVySUQgdG8gY29ubmVjdCB0b1xuXHRcdCd2aWV3cG9ydERyYWcnOiBmYWxzZSwgICAgICAgICAgICAgICAgICAvLyBNb3ZlIHRoZSB2aWV3cG9ydCBvbiBtb3VzZSBkcmFnc1xuXHRcdCdmb3JjZUF1dGhTY2hlbWUnOiAwLCAgICAgICAgICAgICAgICAgICAvLyBGb3JjZSBhdXRoIHNjaGVtZSAoMCBtZWFucyBubylcblx0XHQnZW5hYmxlTW91c2VBbmRUb3VjaCc6IGZhbHNlLCAgICAgICAgICAgLy8gV2hldGhlciBhbHNvIGVuYWJsZSBtb3VzZSBldmVudHMgd2hlbiB0b3VjaCBzY3JlZW4gaXMgZGV0ZWN0ZWRcblxuXHRcdC8vIENhbGxiYWNrIGZ1bmN0aW9uc1xuXHRcdCdvblVwZGF0ZVN0YXRlJzogZnVuY3Rpb24gKCkgeyB9LCAgICAgICAvLyBvblVwZGF0ZVN0YXRlKHJmYiwgc3RhdGUsIG9sZHN0YXRlLCBzdGF0dXNNc2cpOiBzdGF0ZSB1cGRhdGUvY2hhbmdlXG5cdFx0J29uUGFzc3dvcmRSZXF1aXJlZCc6IGZ1bmN0aW9uICgpIHsgfSwgIC8vIG9uUGFzc3dvcmRSZXF1aXJlZChyZmIpOiBWTkMgcGFzc3dvcmQgaXMgcmVxdWlyZWRcblx0XHQnb25DbGlwYm9hcmQnOiBmdW5jdGlvbiAoKSB7IH0sICAgICAgICAgLy8gb25DbGlwYm9hcmQocmZiLCB0ZXh0KTogUkZCIGNsaXBib2FyZCBjb250ZW50cyByZWNlaXZlZFxuXHRcdCdvbkJlbGwnOiBmdW5jdGlvbiAoKSB7IH0sICAgICAgICAgICAgICAvLyBvbkJlbGwocmZiKTogUkZCIEJlbGwgbWVzc2FnZSByZWNlaXZlZFxuXHRcdCdvbkZCVVJlY2VpdmUnOiBmdW5jdGlvbiAoKSB7IH0sICAgICAgICAvLyBvbkZCVVJlY2VpdmUocmZiLCBmYnUpOiBSRkIgRkJVIHJlY2VpdmVkIGJ1dCBub3QgeWV0IHByb2Nlc3NlZFxuXHRcdCdvbkZCVUNvbXBsZXRlJzogZnVuY3Rpb24gKCkgeyB9LCAgICAgICAvLyBvbkZCVUNvbXBsZXRlKHJmYiwgZmJ1KTogUkZCIEZCVSByZWNlaXZlZCBhbmQgcHJvY2Vzc2VkXG5cdFx0J29uRkJSZXNpemUnOiBmdW5jdGlvbiAoKSB7IH0sICAgICAgICAgIC8vIG9uRkJSZXNpemUocmZiLCB3aWR0aCwgaGVpZ2h0KTogZnJhbWUgYnVmZmVyIHJlc2l6ZWRcblx0XHQnb25EZXNrdG9wTmFtZSc6IGZ1bmN0aW9uICgpIHsgfSwgICAgICAgLy8gb25EZXNrdG9wTmFtZShyZmIsIG5hbWUpOiBkZXNrdG9wIG5hbWUgcmVjZWl2ZWRcblx0XHQnb25YdnBJbml0JzogZnVuY3Rpb24gKCkgeyB9LCAgICAgICAgICAgLy8gb25YdnBJbml0KHZlcnNpb24pOiBYVlAgZXh0ZW5zaW9ucyBhY3RpdmUgZm9yIHRoaXMgY29ubmVjdGlvblxuXHRcdCdvblVua25vd25NZXNzYWdlVHlwZSc6IG51bGwgICAgICAgICAgICAvLyBIYW5kbGVyIGZvciB1bmtub3duIFZOQyBtZXNzYWdlIHR5cGVzLiBJZlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAvLyBudWxsIGZhaWx1cmUgaXMgZW1pdHRlZCBhbmQgdGhlIFJGQiBjbG9zZWQuXG5cdH0pO1xuXG5cdC8vIHBvcHVsYXRlIGVuY0hhbmRsZXJzIHdpdGggYm91bmQgdmVyc2lvbnNcblx0T2JqZWN0LmtleXMoUkZCLmVuY29kaW5nSGFuZGxlcnMpLmZvckVhY2goZnVuY3Rpb24gKGVuY05hbWUpIHtcblx0XHR0aGlzLl9lbmNIYW5kbGVyc1tlbmNOYW1lXSA9IFJGQi5lbmNvZGluZ0hhbmRsZXJzW2VuY05hbWVdLmJpbmQodGhpcyk7XG5cdH0uYmluZCh0aGlzKSk7XG5cblx0Ly8gQ3JlYXRlIGxvb2t1cCB0YWJsZXMgYmFzZWQgb24gZW5jb2RpbmcgbnVtYmVyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZW5jb2RpbmdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dGhpcy5fZW5jSGFuZGxlcnNbdGhpcy5fZW5jb2RpbmdzW2ldWzFdXSA9IHRoaXMuX2VuY0hhbmRsZXJzW3RoaXMuX2VuY29kaW5nc1tpXVswXV07XG5cdFx0dGhpcy5fZW5jTmFtZXNbdGhpcy5fZW5jb2RpbmdzW2ldWzFdXSA9IHRoaXMuX2VuY29kaW5nc1tpXVswXTtcblx0XHR0aGlzLl9lbmNTdGF0c1t0aGlzLl9lbmNvZGluZ3NbaV1bMV1dID0gWzAsIDBdO1xuXHR9XG5cblx0dHJ5IHtcblx0XHR0aGlzLl9kaXNwbGF5ID0gbmV3IERpc3BsYXkoe3RhcmdldDogdGhpcy5fdGFyZ2V0fSk7XG5cdH0gY2F0Y2goZXJyb3IpIHtcblx0XHRkZWJ1Z2Vycm9yKCdEaXNwbGF5IGV4Y2VwdGlvbjogJyArIGVycm9yKTtcblx0XHQvLyBEb24ndCBjb250aW51ZS4gQXZvaWQgdWdseSBlcnJvcnMgaW4gXCJmYXRhbFwiIHN0YXRlLlxuXHRcdHRocm93KGVycm9yKTtcblx0fVxuXG5cdHRoaXMuX2tleWJvYXJkID0gbmV3IEtleWJvYXJkKHtcblx0XHR0YXJnZXQ6IHRoaXMuX2ZvY3VzQ29udGFpbmVyLFxuXHRcdG9uS2V5UHJlc3M6IHRoaXMuX2hhbmRsZUtleVByZXNzLmJpbmQodGhpcylcblx0fSk7XG5cblx0dGhpcy5fbW91c2UgPSBuZXcgTW91c2Uoe1xuXHRcdHRhcmdldDogdGhpcy5fdGFyZ2V0LFxuXHRcdG9uTW91c2VCdXR0b246IHRoaXMuX2hhbmRsZU1vdXNlQnV0dG9uLmJpbmQodGhpcyksXG5cdFx0b25Nb3VzZU1vdmU6IHRoaXMuX2hhbmRsZU1vdXNlTW92ZS5iaW5kKHRoaXMpLFxuXHRcdG5vdGlmeTogdGhpcy5fa2V5Ym9hcmQuc3luYy5iaW5kKHRoaXMuX2tleWJvYXJkKSxcblx0XHRlbmFibGVNb3VzZUFuZFRvdWNoOiB0aGlzLl9lbmFibGVNb3VzZUFuZFRvdWNoXG5cdH0pO1xuXG5cdHRoaXMuX3NvY2sgPSBuZXcgV2Vic29jaygpO1xuXG5cdHRoaXMuX3NvY2sub24oJ21lc3NhZ2UnLCB0aGlzLl9oYW5kbGVfbWVzc2FnZS5iaW5kKHRoaXMpKTtcblxuXHR0aGlzLl9zb2NrLm9uKCdvcGVuJywgZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLl9yZmJfc3RhdGUgPT09ICdjb25uZWN0Jykge1xuXHRcdFx0dGhpcy5fdXBkYXRlU3RhdGUoJ1Byb3RvY29sVmVyc2lvbicsICdTdGFydGluZyBWTkMgaGFuZHNoYWtlJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2ZhaWwoJ0dvdCB1bmV4cGVjdGVkIFdlYlNvY2tldCBjb25uZWN0aW9uJyk7XG5cdFx0fVxuXHR9LmJpbmQodGhpcykpO1xuXG5cdHRoaXMuX3NvY2sub24oJ2Nsb3NlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRkZWJ1ZygnV2ViU29ja2V0IGNsb3NlZCcpO1xuXG5cdFx0dmFyIG1zZyA9ICcnO1xuXHRcdGlmIChlLmNvZGUpIHtcblx0XHRcdG1zZyA9ICcgKGNvZGU6ICcgKyBlLmNvZGU7XG5cdFx0XHRpZiAoZS5yZWFzb24pIHtcblx0XHRcdFx0bXNnICs9ICcsIHJlYXNvbjogJyArIGUucmVhc29uO1xuXHRcdFx0fVxuXHRcdFx0bXNnICs9ICcpJztcblx0XHR9XG5cdFx0aWYgKHRoaXMuX3JmYl9zdGF0ZSA9PT0gJ2Rpc2Nvbm5lY3QnKSB7XG5cdFx0XHR0aGlzLl91cGRhdGVTdGF0ZSgnZGlzY29ubmVjdGVkJywgJ1ZOQyBkaXNjb25uZWN0ZWQnICsgbXNnKTtcblx0XHR9IGVsc2UgaWYgKHRoaXMuX3JmYl9zdGF0ZSA9PT0gJ1Byb3RvY29sVmVyc2lvbicpIHtcblx0XHRcdHRoaXMuX2ZhaWwoJ0ZhaWxlZCB0byBjb25uZWN0IHRvIHNlcnZlcicgKyBtc2cpO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5fcmZiX3N0YXRlIGluIHsnZmFpbGVkJzogMSwgJ2Rpc2Nvbm5lY3RlZCc6IDF9KSB7XG5cdFx0XHRkZWJ1ZygnUmVjZWl2ZWQgb25jbG9zZSB3aGlsZSBkaXNjb25uZWN0ZWQnICsgbXNnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fZmFpbCgnU2VydmVyIGRpc2Nvbm5lY3RlZCcgKyBtc2cpO1xuXHRcdH1cblx0XHR0aGlzLl9zb2NrLm9mZignY2xvc2UnKTtcblx0fS5iaW5kKHRoaXMpKTtcblxuXHR0aGlzLl9zb2NrLm9uKCdlcnJvcicsIGZ1bmN0aW9uICgpIHtcblx0XHRkZWJ1Z2Vycm9yKCdXZWJTb2NrZXQgZXJyb3InKTtcblx0fSk7XG5cblx0dGhpcy5faW5pdF92YXJzKCk7XG5cblx0dmFyIHJtb2RlID0gdGhpcy5fZGlzcGxheS5nZXRfcmVuZGVyX21vZGUoKTtcblxuXHR0aGlzLl91cGRhdGVTdGF0ZSgnbG9hZGVkJywgJ25vVk5DIHJlYWR5OiAnICsgcm1vZGUpO1xufVxuXG5cblJGQi5wcm90b3R5cGUgPSB7XG5cdC8vIFB1YmxpYyBtZXRob2RzXG5cdGNvbm5lY3Q6IGZ1bmN0aW9uICh1cmwsIHBhc3N3b3JkKSB7XG5cdFx0dGhpcy5fcmZiX3VybCA9IHVybDtcblx0XHR0aGlzLl9yZmJfcGFzc3dvcmQgPSAocGFzc3dvcmQgIT09IHVuZGVmaW5lZCkgPyBwYXNzd29yZCA6ICcnO1xuXG5cdFx0dGhpcy5fdXBkYXRlU3RhdGUoJ2Nvbm5lY3QnLCAnQ29ubmVjdGluZycpO1xuXHR9LFxuXG5cdGRpc2Nvbm5lY3Q6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl91cGRhdGVTdGF0ZSgnZGlzY29ubmVjdCcsICdEaXNjb25uZWN0aW5nJyk7XG5cdFx0dGhpcy5fc29jay5vZmYoJ2Vycm9yJyk7XG5cdFx0dGhpcy5fc29jay5vZmYoJ21lc3NhZ2UnKTtcblx0XHR0aGlzLl9zb2NrLm9mZignb3BlbicpO1xuXHR9LFxuXG5cdHNlbmRQYXNzd29yZDogZnVuY3Rpb24gKHBhc3N3ZCkge1xuXHRcdHRoaXMuX3JmYl9wYXNzd29yZCA9IHBhc3N3ZDtcblx0XHR0aGlzLl9yZmJfc3RhdGUgPSAnQXV0aGVudGljYXRpb24nO1xuXHRcdHNldFRpbWVvdXQodGhpcy5faW5pdF9tc2cuYmluZCh0aGlzKSwgMSk7XG5cdH0sXG5cblx0c2VuZEN0cmxBbHREZWw6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fcmZiX3N0YXRlICE9PSAnbm9ybWFsJyB8fCB0aGlzLl92aWV3X29ubHkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHR2YXIgYXJyID0gW107XG5cdFx0YXJyID0gYXJyLmNvbmNhdChSRkIubWVzc2FnZXMua2V5RXZlbnQoS2V5cy5YS19Db250cm9sX0wsIDEpKTtcblx0XHRhcnIgPSBhcnIuY29uY2F0KFJGQi5tZXNzYWdlcy5rZXlFdmVudChLZXlzLlhLX0FsdF9MLCAxKSk7XG5cdFx0YXJyID0gYXJyLmNvbmNhdChSRkIubWVzc2FnZXMua2V5RXZlbnQoS2V5cy5YS19EZWxldGUsIDEpKTtcblx0XHRhcnIgPSBhcnIuY29uY2F0KFJGQi5tZXNzYWdlcy5rZXlFdmVudChLZXlzLlhLX0RlbGV0ZSwgMCkpO1xuXHRcdGFyciA9IGFyci5jb25jYXQoUkZCLm1lc3NhZ2VzLmtleUV2ZW50KEtleXMuWEtfQWx0X0wsIDApKTtcblx0XHRhcnIgPSBhcnIuY29uY2F0KFJGQi5tZXNzYWdlcy5rZXlFdmVudChLZXlzLlhLX0NvbnRyb2xfTCwgMCkpO1xuXHRcdHRoaXMuX3NvY2suc2VuZChhcnIpO1xuXHR9LFxuXG5cdHh2cE9wOiBmdW5jdGlvbiAodmVyLCBvcCkge1xuXHRcdGlmICh0aGlzLl9yZmJfeHZwX3ZlciA8IHZlcikgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRkZWJ1ZygneHZwT3AoKSB8IHNlbmRpbmcgWFZQIG9wZXJhdGlvbiAnICsgb3AgKyAnICh2ZXJzaW9uICcgKyB2ZXIgKyAnKScpO1xuXHRcdHRoaXMuX3NvY2suc2VuZF9zdHJpbmcoJ1xceEZBXFx4MDAnICsgU3RyaW5nLmZyb21DaGFyQ29kZSh2ZXIpICsgU3RyaW5nLmZyb21DaGFyQ29kZShvcCkpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdHh2cFNodXRkb3duOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMueHZwT3AoMSwgMik7XG5cdH0sXG5cblx0eHZwUmVib290OiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMueHZwT3AoMSwgMyk7XG5cdH0sXG5cblx0eHZwUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy54dnBPcCgxLCA0KTtcblx0fSxcblxuXHQvLyBTZW5kIGEga2V5IHByZXNzLiBJZiAnZG93bicgaXMgbm90IHNwZWNpZmllZCB0aGVuIHNlbmQgYSBkb3duIGtleVxuXHQvLyBmb2xsb3dlZCBieSBhbiB1cCBrZXkuXG5cdHNlbmRLZXk6IGZ1bmN0aW9uIChjb2RlLCBkb3duKSB7XG5cdFx0aWYgKHRoaXMuX3JmYl9zdGF0ZSAhPT0gJ25vcm1hbCcgfHwgdGhpcy5fdmlld19vbmx5KSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdHZhciBhcnIgPSBbXTtcblx0XHRpZiAodHlwZW9mIGRvd24gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRkZWJ1Zygnc2VuZEtleSgpIHwgc2VuZGluZyBrZXkgY29kZSAoJyArIChkb3duID8gJ2Rvd24nIDogJ3VwJykgKyAnKTogJyArIGNvZGUpO1xuXHRcdFx0YXJyID0gYXJyLmNvbmNhdChSRkIubWVzc2FnZXMua2V5RXZlbnQoY29kZSwgZG93biA/IDEgOiAwKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlYnVnKCdzZW5kS2V5KCkgfCBzZW5kaW5nIGtleSBjb2RlIChkb3duICsgdXApOiAnICsgY29kZSk7XG5cdFx0XHRhcnIgPSBhcnIuY29uY2F0KFJGQi5tZXNzYWdlcy5rZXlFdmVudChjb2RlLCAxKSk7XG5cdFx0XHRhcnIgPSBhcnIuY29uY2F0KFJGQi5tZXNzYWdlcy5rZXlFdmVudChjb2RlLCAwKSk7XG5cdFx0fVxuXHRcdHRoaXMuX3NvY2suc2VuZChhcnIpO1xuXHR9LFxuXG5cdGNsaXBib2FyZFBhc3RlRnJvbTogZnVuY3Rpb24gKHRleHQpIHtcblx0XHRpZiAodGhpcy5fcmZiX3N0YXRlICE9PSAnbm9ybWFsJykgeyByZXR1cm47IH1cblx0XHR0aGlzLl9zb2NrLnNlbmQoUkZCLm1lc3NhZ2VzLmNsaWVudEN1dFRleHQodGV4dCkpO1xuXHR9LFxuXG5cdHNldERlc2t0b3BTaXplOiBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuXHRcdGlmICh0aGlzLl9yZmJfc3RhdGUgIT09ICdub3JtYWwnKSB7IHJldHVybjsgfVxuXG5cdFx0aWYgKHRoaXMuX3N1cHBvcnRzU2V0RGVza3RvcFNpemUpIHtcblxuXHRcdFx0dmFyIGFyciA9IFsyNTFdOyAgICAvLyBtc2ctdHlwZVxuXHRcdFx0VXRpbC5wdXNoOChhcnIsIDApOyAgICAgICAvLyBwYWRkaW5nXG5cdFx0XHRVdGlsLnB1c2gxNihhcnIsIHdpZHRoKTsgIC8vIHdpZHRoXG5cdFx0XHRVdGlsLnB1c2gxNihhcnIsIGhlaWdodCk7IC8vIGhlaWdodFxuXG5cdFx0XHRVdGlsLnB1c2g4KGFyciwgMSk7ICAgICAgIC8vIG51bWJlci1vZi1zY3JlZW5zXG5cdFx0XHRVdGlsLnB1c2g4KGFyciwgMCk7ICAgICAgIC8vIHBhZGRpbmdcblxuXHRcdFx0Ly8gc2NyZWVuIGFycmF5XG5cdFx0XHRVdGlsLnB1c2gzMihhcnIsIHRoaXMuX3NjcmVlbl9pZCk7ICAgIC8vIGlkXG5cdFx0XHRVdGlsLnB1c2gxNihhcnIsIDApOyAgICAgICAgICAgICAgICAgIC8vIHgtcG9zaXRpb25cblx0XHRcdFV0aWwucHVzaDE2KGFyciwgMCk7ICAgICAgICAgICAgICAgICAgLy8geS1wb3NpdGlvblxuXHRcdFx0VXRpbC5wdXNoMTYoYXJyLCB3aWR0aCk7ICAgICAgICAgICAgICAvLyB3aWR0aFxuXHRcdFx0VXRpbC5wdXNoMTYoYXJyLCBoZWlnaHQpOyAgICAgICAgICAgICAvLyBoZWlnaHRcblx0XHRcdFV0aWwucHVzaDMyKGFyciwgdGhpcy5fc2NyZWVuX2ZsYWdzKTsgLy8gZmxhZ3NcblxuXHRcdFx0dGhpcy5fc29jay5zZW5kKGFycik7XG5cdFx0fVxuXHR9LFxuXG5cdC8vIFByaXZhdGUgbWV0aG9kc1xuXHRfY29ubmVjdDogZnVuY3Rpb24gKCkge1xuXHRcdGRlYnVnKCdfY29ubmVjdCgpIHwgY29ubmVjdGluZyB0byAnICsgdGhpcy5fcmZiX3VybCk7XG5cdFx0dGhpcy5fc29jay5vcGVuKHRoaXMuX3JmYl91cmwsIHRoaXMuX3dzUHJvdG9jb2xzKTtcblx0fSxcblxuXHRfaW5pdF92YXJzOiBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gcmVzZXQgc3RhdGVcblx0XHR0aGlzLl9zb2NrLmluaXQoKTtcblxuXHRcdHRoaXMuX0ZCVS5yZWN0cyAgICAgICAgPSAwO1xuXHRcdHRoaXMuX0ZCVS5zdWJyZWN0cyAgICAgPSAwOyAgLy8gUlJFIGFuZCBIRVhUSUxFXG5cdFx0dGhpcy5fRkJVLmxpbmVzICAgICAgICA9IDA7ICAvLyBSQVdcblx0XHR0aGlzLl9GQlUudGlsZXMgICAgICAgID0gMDsgIC8vIEhFWFRJTEVcblx0XHR0aGlzLl9GQlUuemxpYnMgICAgICAgID0gW107IC8vIFRJR0hUIHpsaWIgZW5jb2RlcnNcblx0XHR0aGlzLl9tb3VzZV9idXR0b25NYXNrID0gMDtcblx0XHR0aGlzLl9tb3VzZV9hcnIgICAgICAgID0gW107XG5cdFx0dGhpcy5fcmZiX3RpZ2h0dm5jICAgICA9IGZhbHNlO1xuXG5cdFx0Ly8gQ2xlYXIgdGhlIHBlciBjb25uZWN0aW9uIGVuY29kaW5nIHN0YXRzXG5cdFx0dmFyIGk7XG5cdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuX2VuY29kaW5ncy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGhpcy5fZW5jU3RhdHNbdGhpcy5fZW5jb2RpbmdzW2ldWzFdXVswXSA9IDA7XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMDsgaSA8IDQ7IGkrKykge1xuXHRcdFx0dGhpcy5fRkJVLnpsaWJzW2ldID0gbmV3IFRJTkYoKTtcblx0XHRcdHRoaXMuX0ZCVS56bGlic1tpXS5pbml0KCk7XG5cdFx0fVxuXHR9LFxuXG5cdF9wcmludF9zdGF0czogZnVuY3Rpb24gKCkge1xuXHRcdGRlYnVnKCdfcHJpbnRfc3RhdHMoKSB8IGVuY29kaW5nIHN0YXRzIGZvciB0aGlzIGNvbm5lY3Rpb246Jyk7XG5cblx0XHR2YXIgaSwgcztcblx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5fZW5jb2RpbmdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRzID0gdGhpcy5fZW5jU3RhdHNbdGhpcy5fZW5jb2RpbmdzW2ldWzFdXTtcblx0XHRcdGlmIChzWzBdICsgc1sxXSA+IDApIHtcblx0XHRcdFx0ZGVidWcoJ19wcmludF9zdGF0cygpIHwgJyArIHRoaXMuX2VuY29kaW5nc1tpXVswXSArICc6ICcgKyBzWzBdICsgJyByZWN0cycpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGRlYnVnKCdfcHJpbnRfc3RhdHMoKSB8IGVuY29kaW5nIHN0YXRzIHNpbmNlIHBhZ2UgbG9hZDonKTtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLl9lbmNvZGluZ3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdHMgPSB0aGlzLl9lbmNTdGF0c1t0aGlzLl9lbmNvZGluZ3NbaV1bMV1dO1xuXHRcdFx0ZGVidWcoJ19wcmludF9zdGF0cygpIHwgJyArIHRoaXMuX2VuY29kaW5nc1tpXVswXSArICc6ICcgKyBzWzFdICsgJyByZWN0cycpO1xuXHRcdH1cblx0fSxcblxuXHRfY2xlYW51cFNvY2tldDogZnVuY3Rpb24gKHN0YXRlKSB7XG5cdFx0aWYgKHRoaXMuX3NlbmRUaW1lcikge1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLl9zZW5kVGltZXIpO1xuXHRcdFx0dGhpcy5fc2VuZFRpbWVyID0gbnVsbDtcblx0XHR9XG5cdFx0aWYgKHRoaXMuX21zZ1RpbWVyKSB7XG5cdFx0XHRjbGVhckludGVydmFsKHRoaXMuX21zZ1RpbWVyKTtcblx0XHRcdHRoaXMuX21zZ1RpbWVyID0gbnVsbDtcblx0XHR9XG5cdFx0aWYgKHRoaXMuX2Rpc3BsYXkgJiYgdGhpcy5fZGlzcGxheS5nZXRfY29udGV4dCgpKSB7XG5cdFx0XHR0aGlzLl9rZXlib2FyZC51bmdyYWIoKTtcblx0XHRcdHRoaXMuX21vdXNlLnVuZ3JhYigpO1xuXHRcdFx0aWYgKHN0YXRlICE9PSAnY29ubmVjdCcgJiYgc3RhdGUgIT09ICdsb2FkZWQnKSB7XG5cdFx0XHRcdHRoaXMuX2Rpc3BsYXkuZGVmYXVsdEN1cnNvcigpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fZGlzcGxheS5jbGVhcigpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3NvY2suY2xvc2UoKTtcblx0fSxcblxuXG5cdC8qXG5cdCAqIFBhZ2Ugc3RhdGVzOlxuXHQgKiAgIGxvYWRlZCAgICAgICAtIHBhZ2UgbG9hZCwgZXF1aXZhbGVudCB0byBkaXNjb25uZWN0ZWRcblx0ICogICBkaXNjb25uZWN0ZWQgLSBpZGxlIHN0YXRlXG5cdCAqICAgY29ubmVjdCAgICAgIC0gc3RhcnRpbmcgdG8gY29ubmVjdCAodG8gUHJvdG9jb2xWZXJzaW9uKVxuXHQgKiAgIG5vcm1hbCAgICAgICAtIGNvbm5lY3RlZFxuXHQgKiAgIGRpc2Nvbm5lY3QgICAtIHN0YXJ0aW5nIHRvIGRpc2Nvbm5lY3Rcblx0ICogICBmYWlsZWQgICAgICAgLSBhYm5vcm1hbCBkaXNjb25uZWN0XG5cdCAqICAgZmF0YWwgICAgICAgIC0gZmFpbGVkIHRvIGxvYWQgcGFnZSwgb3IgZmF0YWwgZXJyb3Jcblx0ICpcblx0ICogUkZCIHByb3RvY29sIGluaXRpYWxpemF0aW9uIHN0YXRlczpcblx0ICogICBQcm90b2NvbFZlcnNpb25cblx0ICogICBTZWN1cml0eVxuXHQgKiAgIEF1dGhlbnRpY2F0aW9uXG5cdCAqICAgcGFzc3dvcmQgICAgIC0gd2FpdGluZyBmb3IgcGFzc3dvcmQsIG5vdCBwYXJ0IG9mIFJGQlxuXHQgKiAgIFNlY3VyaXR5UmVzdWx0XG5cdCAqICAgQ2xpZW50SW5pdGlhbGl6YXRpb24gLSBub3QgdHJpZ2dlcmVkIGJ5IHNlcnZlciBtZXNzYWdlXG5cdCAqICAgU2VydmVySW5pdGlhbGl6YXRpb24gKHRvIG5vcm1hbClcblx0ICovXG5cdF91cGRhdGVTdGF0ZTogZnVuY3Rpb24gKHN0YXRlLCBzdGF0dXNNc2cpIHtcblx0XHRkZWJ1ZygnX3VwZGF0ZVN0YXRlKCkgfCBbc3RhdGU6JXMsIG1zZzpcIiVzXCJdJywgc3RhdGUsIHN0YXR1c01zZyk7XG5cblx0XHR2YXIgb2xkc3RhdGUgPSB0aGlzLl9yZmJfc3RhdGU7XG5cblx0XHRpZiAoc3RhdGUgPT09IG9sZHN0YXRlKSB7XG5cdFx0XHQvLyBBbHJlYWR5IGhlcmUsIGlnbm9yZVxuXHRcdFx0ZGVidWcoJ191cGRhdGVTdGF0ZSgpIHwgYWxyZWFkeSBpbiBzdGF0ZSBcIicgKyBzdGF0ZSArICdcIiwgaWdub3JpbmcnKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKlxuXHRcdCAqIFRoZXNlIGFyZSBkaXNjb25uZWN0ZWQgc3RhdGVzLiBBIHByZXZpb3VzIGNvbm5lY3QgbWF5XG5cdFx0ICogYXN5bmNocm9ub3VzbHkgY2F1c2UgYSBjb25uZWN0aW9uIHNvIG1ha2Ugc3VyZSB3ZSBhcmUgY2xvc2VkLlxuXHRcdCAqL1xuXHRcdGlmIChzdGF0ZSBpbiB7J2Rpc2Nvbm5lY3RlZCc6IDEsICdsb2FkZWQnOiAxLCAnY29ubmVjdCc6IDEsXG5cdFx0XHQnZGlzY29ubmVjdCc6IDEsICdmYWlsZWQnOiAxLCAnZmF0YWwnOiAxfSkge1xuXHRcdFx0dGhpcy5fY2xlYW51cFNvY2tldChzdGF0ZSk7XG5cdFx0fVxuXG5cdFx0aWYgKG9sZHN0YXRlID09PSAnZmF0YWwnKSB7XG5cdFx0XHRkZWJ1Z2Vycm9yKCdfdXBkYXRlU3RhdGUoKSB8IGZhdGFsIGVycm9yLCBjYW5ub3QgY29udGludWUnKTtcblx0XHR9XG5cblx0XHRpZiAoc3RhdHVzTXNnICYmIChzdGF0ZSA9PT0gJ2ZhaWxlZCcgfHwgc3RhdGUgPT09ICdmYXRhbCcpKSB7XG5cdFx0XHRkZWJ1Z2Vycm9yKCdfdXBkYXRlU3RhdGUoKSB8ICVzOiAlcycsIHN0YXRlLCBzdGF0dXNNc2cpO1xuXHRcdH1cblxuXHRcdGlmIChvbGRzdGF0ZSA9PT0gJ2ZhaWxlZCcgJiYgc3RhdGUgPT09ICdkaXNjb25uZWN0ZWQnKSB7XG5cdFx0XHQvLyBkbyBkaXNjb25uZWN0IGFjdGlvbiwgYnV0IHN0YXkgaW4gZmFpbGVkIHN0YXRlXG5cdFx0XHR0aGlzLl9yZmJfc3RhdGUgPSAnZmFpbGVkJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fcmZiX3N0YXRlID0gc3RhdGU7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2Rpc2Nvbm5UaW1lciAmJiB0aGlzLl9yZmJfc3RhdGUgIT09ICdkaXNjb25uZWN0Jykge1xuXHRcdFx0ZGVidWcoJ191cGRhdGVTdGF0ZSgpIHwgY2xlYXJpbmcgZGlzY29ubmVjdCB0aW1lcicpO1xuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX2Rpc2Nvbm5UaW1lcik7XG5cdFx0XHR0aGlzLl9kaXNjb25uVGltZXIgPSBudWxsO1xuXHRcdFx0dGhpcy5fc29jay5vZmYoJ2Nsb3NlJyk7ICAvLyBtYWtlIHN1cmUgd2UgZG9uJ3QgZ2V0IGEgZG91YmxlIGV2ZW50XG5cdFx0fVxuXG5cdFx0c3dpdGNoIChzdGF0ZSkge1xuXHRcdFx0Y2FzZSAnbm9ybWFsJzpcblx0XHRcdFx0aWYgKG9sZHN0YXRlID09PSAnZGlzY29ubmVjdGVkJyB8fCBvbGRzdGF0ZSA9PT0gJ2ZhaWxlZCcpIHtcblx0XHRcdFx0XHRkZWJ1Z2Vycm9yKCdfdXBkYXRlU3RhdGUoKSB8IGludmFsaWQgdHJhbnNpdGlvbiBmcm9tIFwiZGlzY29ubmVjdGVkXCIgb3IgXCJmYWlsZWRcIiB0byBcIm5vcm1hbFwiJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ2Nvbm5lY3QnOlxuXHRcdFx0XHR0aGlzLl9pbml0X3ZhcnMoKTtcblx0XHRcdFx0dGhpcy5fY29ubmVjdCgpO1xuXHRcdFx0XHQvLyBXZWJTb2NrZXQub25vcGVuIHRyYW5zaXRpb25zIHRvICdQcm90b2NvbFZlcnNpb24nXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdkaXNjb25uZWN0Jzpcblx0XHRcdFx0dGhpcy5fZGlzY29ublRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dGhpcy5fZmFpbCgnRGlzY29ubmVjdCB0aW1lb3V0Jyk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSwgdGhpcy5fZGlzY29ubmVjdFRpbWVvdXQgKiAxMDAwKTtcblxuXHRcdFx0XHR0aGlzLl9wcmludF9zdGF0cygpO1xuXG5cdFx0XHRcdC8vIFdlYlNvY2tldC5vbmNsb3NlIHRyYW5zaXRpb25zIHRvICdkaXNjb25uZWN0ZWQnXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdmYWlsZWQnOlxuXHRcdFx0XHRpZiAob2xkc3RhdGUgPT09ICdkaXNjb25uZWN0ZWQnKSB7XG5cdFx0XHRcdFx0ZGVidWdlcnJvcignX3VwZGF0ZVN0YXRlKCkgfCBpbnZhbGlkIHRyYW5zaXRpb24gZnJvbSBcImRpc2Nvbm5lY3RlZFwiIHRvIFwiZmFpbGVkXCInKTtcblx0XHRcdFx0fSBlbHNlIGlmIChvbGRzdGF0ZSA9PT0gJ25vcm1hbCcpIHtcblx0XHRcdFx0XHRkZWJ1Z2Vycm9yKCdfdXBkYXRlU3RhdGUoKSB8IGVycm9yIHdoaWxlIGNvbm5lY3RlZCcpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKG9sZHN0YXRlID09PSAnaW5pdCcpIHtcblx0XHRcdFx0XHRkZWJ1Z2Vycm9yKCdfdXBkYXRlU3RhdGUoKSB8IGVycm9yIHdoaWxlIGluaXRpYWxpemluZycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gTWFrZSBzdXJlIHdlIHRyYW5zaXRpb24gdG8gZGlzY29ubmVjdGVkXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHRoaXMuX3VwZGF0ZVN0YXRlKCdkaXNjb25uZWN0ZWQnKTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpLCA1MCk7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdC8vIE5vIHN0YXRlIGNoYW5nZSBhY3Rpb24gdG8gdGFrZVxuXHRcdH1cblxuXHRcdGlmIChvbGRzdGF0ZSA9PT0gJ2ZhaWxlZCcgJiYgc3RhdGUgPT09ICdkaXNjb25uZWN0ZWQnKSB7XG5cdFx0XHR0aGlzLl9vblVwZGF0ZVN0YXRlKHRoaXMsIHN0YXRlLCBvbGRzdGF0ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX29uVXBkYXRlU3RhdGUodGhpcywgc3RhdGUsIG9sZHN0YXRlLCBzdGF0dXNNc2cpO1xuXHRcdH1cblx0fSxcblxuXHRfZmFpbDogZnVuY3Rpb24gKG1zZykge1xuXHRcdHRoaXMuX3VwZGF0ZVN0YXRlKCdmYWlsZWQnLCBtc2cpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHRfaGFuZGxlX21lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fc29jay5yUWxlbigpID09PSAwKSB7XG5cdFx0XHRkZWJ1Z2Vycm9yKCdfaGFuZGxlX21lc3NhZ2UoKSB8IGNhbGxlZCBvbiBhbiBlbXB0eSByZWNlaXZlIHF1ZXVlJyk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0c3dpdGNoICh0aGlzLl9yZmJfc3RhdGUpIHtcblx0XHRcdGNhc2UgJ2Rpc2Nvbm5lY3RlZCc6XG5cdFx0XHRjYXNlICdmYWlsZWQnOlxuXHRcdFx0XHRkZWJ1Z2Vycm9yKCdfaGFuZGxlX21lc3NhZ2UoKSB8IGdvdCBkYXRhIHdoaWxlIGRpc2Nvbm5lY3RlZCcpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ25vcm1hbCc6XG5cdFx0XHRcdGlmICh0aGlzLl9ub3JtYWxfbXNnKCkgJiYgdGhpcy5fc29jay5yUWxlbigpID4gMCkge1xuXHRcdFx0XHRcdC8vIHRydWUgbWVhbnMgd2UgY2FuIGNvbnRpbnVlIHByb2Nlc3Npbmdcblx0XHRcdFx0XHQvLyBHaXZlIG90aGVyIGV2ZW50cyBhIGNoYW5jZSB0byBydW5cblx0XHRcdFx0XHRpZiAodGhpcy5fbXNnVGltZXIgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdGRlYnVnKCdfaGFuZGxlX21lc3NhZ2UoKSB8IG1vcmUgZGF0YSB0byBwcm9jZXNzLCBjcmVhdGluZyB0aW1lcicpO1xuXHRcdFx0XHRcdFx0dGhpcy5fbXNnVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fbXNnVGltZXIgPSBudWxsO1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9oYW5kbGVfbWVzc2FnZSgpO1xuXHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpLCAxMCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGRlYnVnKCdfaGFuZGxlX21lc3NhZ2UoKSB8IG1vcmUgZGF0YSB0byBwcm9jZXNzLCBleGlzdGluZyB0aW1lcicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHRoaXMuX2luaXRfbXNnKCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fSxcblxuXHRfY2hlY2tFdmVudHM6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fcmZiX3N0YXRlID09PSAnbm9ybWFsJyAmJiAhdGhpcy5fdmlld3BvcnREcmFnZ2luZyAmJiB0aGlzLl9tb3VzZV9hcnIubGVuZ3RoID4gMCkge1xuXHRcdFx0dGhpcy5fc29jay5zZW5kKHRoaXMuX21vdXNlX2Fycik7XG5cdFx0XHR0aGlzLl9tb3VzZV9hcnIgPSBbXTtcblx0XHR9XG5cdH0sXG5cblx0X2hhbmRsZUtleVByZXNzOiBmdW5jdGlvbiAoa2V5c3ltLCBkb3duKSB7XG5cdFx0aWYgKHRoaXMuX3ZpZXdfb25seSkgeyByZXR1cm47IH0gLy8gVmlldyBvbmx5LCBza2lwIGtleWJvYXJkLCBldmVudHNcblx0XHR0aGlzLl9zb2NrLnNlbmQoUkZCLm1lc3NhZ2VzLmtleUV2ZW50KGtleXN5bSwgZG93bikpO1xuXHR9LFxuXG5cdF9oYW5kbGVNb3VzZUJ1dHRvbjogZnVuY3Rpb24gKHgsIHksIGRvd24sIGJtYXNrKSB7XG5cdFx0aWYgKGRvd24pIHtcblx0XHRcdHRoaXMuX21vdXNlX2J1dHRvbk1hc2sgfD0gYm1hc2s7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX21vdXNlX2J1dHRvbk1hc2sgXj0gYm1hc2s7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX3ZpZXdwb3J0RHJhZykge1xuXHRcdFx0aWYgKGRvd24gJiYgIXRoaXMuX3ZpZXdwb3J0RHJhZ2dpbmcpIHtcblx0XHRcdFx0dGhpcy5fdmlld3BvcnREcmFnZ2luZyA9IHRydWU7XG5cdFx0XHRcdHRoaXMuX3ZpZXdwb3J0RHJhZ1BvcyA9IHsneCc6IHgsICd5JzogeX07XG5cblx0XHRcdFx0Ly8gU2tpcCBzZW5kaW5nIG1vdXNlIGV2ZW50c1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl92aWV3cG9ydERyYWdnaW5nID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX3ZpZXdfb25seSkgeyByZXR1cm47IH0gLy8gVmlldyBvbmx5LCBza2lwIG1vdXNlIGV2ZW50c1xuXG5cdFx0dGhpcy5fbW91c2VfYXJyID0gdGhpcy5fbW91c2VfYXJyLmNvbmNhdChcblx0XHRcdFx0UkZCLm1lc3NhZ2VzLnBvaW50ZXJFdmVudCh0aGlzLl9kaXNwbGF5LmFic1goeCksIHRoaXMuX2Rpc3BsYXkuYWJzWSh5KSwgdGhpcy5fbW91c2VfYnV0dG9uTWFzaykpO1xuXHRcdHRoaXMuX3NvY2suc2VuZCh0aGlzLl9tb3VzZV9hcnIpO1xuXHRcdHRoaXMuX21vdXNlX2FyciA9IFtdO1xuXHR9LFxuXG5cdF9oYW5kbGVNb3VzZU1vdmU6IGZ1bmN0aW9uICh4LCB5KSB7XG5cdFx0aWYgKHRoaXMuX3ZpZXdwb3J0RHJhZ2dpbmcpIHtcblx0XHRcdHZhciBkZWx0YVggPSB0aGlzLl92aWV3cG9ydERyYWdQb3MueCAtIHg7XG5cdFx0XHR2YXIgZGVsdGFZID0gdGhpcy5fdmlld3BvcnREcmFnUG9zLnkgLSB5O1xuXHRcdFx0dGhpcy5fdmlld3BvcnREcmFnUG9zID0geyd4JzogeCwgJ3knOiB5fTtcblxuXHRcdFx0dGhpcy5fZGlzcGxheS52aWV3cG9ydENoYW5nZVBvcyhkZWx0YVgsIGRlbHRhWSk7XG5cblx0XHRcdC8vIFNraXAgc2VuZGluZyBtb3VzZSBldmVudHNcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fdmlld19vbmx5KSB7IHJldHVybjsgfSAvLyBWaWV3IG9ubHksIHNraXAgbW91c2UgZXZlbnRzXG5cblx0XHR0aGlzLl9tb3VzZV9hcnIgPSB0aGlzLl9tb3VzZV9hcnIuY29uY2F0KFxuXHRcdFx0XHRSRkIubWVzc2FnZXMucG9pbnRlckV2ZW50KHRoaXMuX2Rpc3BsYXkuYWJzWCh4KSwgdGhpcy5fZGlzcGxheS5hYnNZKHkpLCB0aGlzLl9tb3VzZV9idXR0b25NYXNrKSk7XG5cblx0XHR0aGlzLl9jaGVja0V2ZW50cygpO1xuXHR9LFxuXG5cdC8vIE1lc3NhZ2UgSGFuZGxlcnNcblxuXHRfbmVnb3RpYXRlX3Byb3RvY29sX3ZlcnNpb246IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fc29jay5yUWxlbigpIDwgMTIpIHtcblx0XHRcdHJldHVybiB0aGlzLl9mYWlsKCdJbmNvbXBsZXRlIHByb3RvY29sIHZlcnNpb24nKTtcblx0XHR9XG5cblx0XHR2YXIgc3ZlcnNpb24gPSB0aGlzLl9zb2NrLnJRc2hpZnRTdHIoMTIpLnN1YnN0cig0LCA3KTtcblx0XHRkZWJ1ZygnX25lZ290aWF0ZV9wcm90b2NvbF92ZXJzaW9uKCkgfCBzZXJ2ZXIgUHJvdG9jb2xWZXJzaW9uOiAnICsgc3ZlcnNpb24pO1xuXHRcdHZhciBpc19yZXBlYXRlciA9IDA7XG5cblx0XHRzd2l0Y2ggKHN2ZXJzaW9uKSB7XG5cdFx0XHRjYXNlICcwMDAuMDAwJzogIC8vIFVsdHJhVk5DIHJlcGVhdGVyXG5cdFx0XHRcdGlzX3JlcGVhdGVyID0gMTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICcwMDMuMDAzJzpcblx0XHRcdGNhc2UgJzAwMy4wMDYnOiAgLy8gVWx0cmFWTkNcblx0XHRcdGNhc2UgJzAwMy44ODknOiAgLy8gQXBwbGUgUmVtb3RlIERlc2t0b3Bcblx0XHRcdFx0dGhpcy5fcmZiX3ZlcnNpb24gPSAzLjM7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnMDAzLjAwNyc6XG5cdFx0XHRcdHRoaXMuX3JmYl92ZXJzaW9uID0gMy43O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJzAwMy4wMDgnOlxuXHRcdFx0Y2FzZSAnMDA0LjAwMCc6ICAvLyBJbnRlbCBBTVQgS1ZNXG5cdFx0XHRjYXNlICcwMDQuMDAxJzogIC8vIFJlYWxWTkMgNC42XG5cdFx0XHRcdHRoaXMuX3JmYl92ZXJzaW9uID0gMy44O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiB0aGlzLl9mYWlsKCdJbnZhbGlkIHNlcnZlciB2ZXJzaW9uICcgKyBzdmVyc2lvbik7XG5cdFx0fVxuXG5cdFx0aWYgKGlzX3JlcGVhdGVyKSB7XG5cdFx0XHR2YXIgcmVwZWF0ZXJJRCA9IHRoaXMuX3JlcGVhdGVySUQ7XG5cdFx0XHR3aGlsZSAocmVwZWF0ZXJJRC5sZW5ndGggPCAyNTApIHtcblx0XHRcdFx0cmVwZWF0ZXJJRCArPSAnXFwwJztcblx0XHRcdH1cblx0XHRcdHRoaXMuX3NvY2suc2VuZF9zdHJpbmcocmVwZWF0ZXJJRCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fcmZiX3ZlcnNpb24gPiB0aGlzLl9yZmJfbWF4X3ZlcnNpb24pIHtcblx0XHRcdHRoaXMuX3JmYl92ZXJzaW9uID0gdGhpcy5fcmZiX21heF92ZXJzaW9uO1xuXHRcdH1cblxuXHRcdC8vIFNlbmQgdXBkYXRlcyBlaXRoZXIgYXQgYSByYXRlIG9mIDEgdXBkYXRlIHBlciA1MG1zLCBvclxuXHRcdC8vIHdoYXRldmVyIHNsb3dlciByYXRlIHRoZSBuZXR3b3JrIGNhbiBoYW5kbGVcblx0XHR0aGlzLl9zZW5kVGltZXIgPSBzZXRJbnRlcnZhbCh0aGlzLl9zb2NrLmZsdXNoLmJpbmQodGhpcy5fc29jayksIDUwKTtcblxuXHRcdHZhciBjdmVyc2lvbiA9ICcwMCcgKyBwYXJzZUludCh0aGlzLl9yZmJfdmVyc2lvbiwgMTApICtcblx0XHRcdFx0XHRcdCAnLjAwJyArICgodGhpcy5fcmZiX3ZlcnNpb24gKiAxMCkgJSAxMCk7XG5cdFx0dGhpcy5fc29jay5zZW5kX3N0cmluZygnUkZCICcgKyBjdmVyc2lvbiArICdcXG4nKTtcblx0XHR0aGlzLl91cGRhdGVTdGF0ZSgnU2VjdXJpdHknLCAnU2VudCBQcm90b2NvbFZlcnNpb246ICcgKyBjdmVyc2lvbik7XG5cdH0sXG5cblx0X25lZ290aWF0ZV9zZWN1cml0eTogZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLl9yZmJfdmVyc2lvbiA+PSAzLjcpIHtcblx0XHRcdC8vIFNlcnZlciBzZW5kcyBzdXBwb3J0ZWQgbGlzdCwgY2xpZW50IGRlY2lkZXNcblx0XHRcdHZhciBudW1fdHlwZXMgPSB0aGlzLl9zb2NrLnJRc2hpZnQ4KCk7XG5cdFx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ3NlY3VyaXR5IHR5cGUnLCBudW1fdHlwZXMsIDEpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0XHRpZiAobnVtX3R5cGVzID09PSAwKSB7XG5cdFx0XHRcdHZhciBzdHJsZW4gPSB0aGlzLl9zb2NrLnJRc2hpZnQzMigpO1xuXHRcdFx0XHR2YXIgcmVhc29uID0gdGhpcy5fc29jay5yUXNoaWZ0U3RyKHN0cmxlbik7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9mYWlsKCdTZWN1cml0eSBmYWlsdXJlOiAnICsgcmVhc29uKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fcmZiX2F1dGhfc2NoZW1lID0gMDtcblx0XHRcdHZhciB0eXBlcyA9IHRoaXMuX3NvY2suclFzaGlmdEJ5dGVzKG51bV90eXBlcyk7XG5cdFx0XHRkZWJ1ZygnX25lZ290aWF0ZV9zZWN1cml0eSgpIHwgc2VydmVyIHNlY3VyaXR5IHR5cGVzOiAnICsgdHlwZXMpO1xuXG5cdFx0XHRpZiAoISB0aGlzLl9mb3JjZUF1dGhTY2hlbWUpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmICh0eXBlc1tpXSA+IHRoaXMuX3JmYl9hdXRoX3NjaGVtZSAmJiAodHlwZXNbaV0gPD0gMTYgfHwgdHlwZXNbaV0gPT09IDIyKSkge1xuXHRcdFx0XHRcdFx0dGhpcy5fcmZiX2F1dGhfc2NoZW1lID0gdHlwZXNbaV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5fcmZiX2F1dGhfc2NoZW1lID0gdGhpcy5fZm9yY2VBdXRoU2NoZW1lO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fcmZiX2F1dGhfc2NoZW1lID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9mYWlsKCdVbnN1cHBvcnRlZCBzZWN1cml0eSB0eXBlczogJyArIHR5cGVzKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fc29jay5zZW5kKFt0aGlzLl9yZmJfYXV0aF9zY2hlbWVdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gU2VydmVyIGRlY2lkZXNcblx0XHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgnc2VjdXJpdHkgc2NoZW1lJywgNCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHR0aGlzLl9yZmJfYXV0aF9zY2hlbWUgPSB0aGlzLl9zb2NrLnJRc2hpZnQzMigpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3VwZGF0ZVN0YXRlKCdBdXRoZW50aWNhdGlvbicsICdBdXRoZW50aWNhdGluZyB1c2luZyBzY2hlbWU6ICcgKyB0aGlzLl9yZmJfYXV0aF9zY2hlbWUpO1xuXHRcdHJldHVybiB0aGlzLl9pbml0X21zZygpOyAvLyBqdW1wIHRvIGF1dGhlbnRpY2F0aW9uXG5cdH0sXG5cblx0Ly8gYXV0aGVudGljYXRpb25cblx0X25lZ290aWF0ZV94dnBfYXV0aDogZnVuY3Rpb24gKCkge1xuXHRcdHZhciB4dnBfc2VwID0gdGhpcy5feHZwX3Bhc3N3b3JkX3NlcDtcblx0XHR2YXIgeHZwX2F1dGggPSB0aGlzLl9yZmJfcGFzc3dvcmQuc3BsaXQoeHZwX3NlcCk7XG5cdFx0aWYgKHh2cF9hdXRoLmxlbmd0aCA8IDMpIHtcblx0XHRcdHRoaXMuX3VwZGF0ZVN0YXRlKCdwYXNzd29yZCcsICdYVlAgY3JlZGVudGlhbHMgcmVxdWlyZWQgKHVzZXInICsgeHZwX3NlcCArXG5cdFx0XHRcdFx0XHRcdFx0J3RhcmdldCcgKyB4dnBfc2VwICsgJ3Bhc3N3b3JkKSAtLSBnb3Qgb25seSAnICsgdGhpcy5fcmZiX3Bhc3N3b3JkKTtcblx0XHRcdHRoaXMuX29uUGFzc3dvcmRSZXF1aXJlZCh0aGlzKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHR2YXIgeHZwX2F1dGhfc3RyID0gU3RyaW5nLmZyb21DaGFyQ29kZSh4dnBfYXV0aFswXS5sZW5ndGgpICtcblx0XHRcdFx0XHRcdFx0IFN0cmluZy5mcm9tQ2hhckNvZGUoeHZwX2F1dGhbMV0ubGVuZ3RoKSArXG5cdFx0XHRcdFx0XHRcdCB4dnBfYXV0aFswXSArXG5cdFx0XHRcdFx0XHRcdCB4dnBfYXV0aFsxXTtcblx0XHR0aGlzLl9zb2NrLnNlbmRfc3RyaW5nKHh2cF9hdXRoX3N0cik7XG5cdFx0dGhpcy5fcmZiX3Bhc3N3b3JkID0geHZwX2F1dGguc2xpY2UoMikuam9pbih4dnBfc2VwKTtcblx0XHR0aGlzLl9yZmJfYXV0aF9zY2hlbWUgPSAyO1xuXHRcdHJldHVybiB0aGlzLl9uZWdvdGlhdGVfYXV0aGVudGljYXRpb24oKTtcblx0fSxcblxuXHRfbmVnb3RpYXRlX3N0ZF92bmNfYXV0aDogZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLl9yZmJfcGFzc3dvcmQubGVuZ3RoID09PSAwKSB7XG5cdFx0XHQvLyBOb3RpZnkgdmlhIGJvdGggY2FsbGJhY2tzIHNpbmNlIGl0J3Mga2luZCBvZlxuXHRcdFx0Ly8gYW4gUkZCIHN0YXRlIGNoYW5nZSBhbmQgYSBVSSBpbnRlcmZhY2UgaXNzdWVcblx0XHRcdHRoaXMuX3VwZGF0ZVN0YXRlKCdwYXNzd29yZCcsICdQYXNzd29yZCBSZXF1aXJlZCcpO1xuXHRcdFx0dGhpcy5fb25QYXNzd29yZFJlcXVpcmVkKHRoaXMpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgnYXV0aCBjaGFsbGVuZ2UnLCAxNikpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHR2YXIgY2hhbGxlbmdlID0gdGhpcy5fc29jay5yUXNoaWZ0Qnl0ZXMoMTYpO1xuXHRcdHZhciByZXNwb25zZSA9IFJGQi5nZW5ERVModGhpcy5fcmZiX3Bhc3N3b3JkLCBjaGFsbGVuZ2UpO1xuXHRcdHRoaXMuX3NvY2suc2VuZChyZXNwb25zZSk7XG5cdFx0dGhpcy5fdXBkYXRlU3RhdGUoJ1NlY3VyaXR5UmVzdWx0Jyk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0X25lZ290aWF0ZV90aWdodF90dW5uZWxzOiBmdW5jdGlvbiAobnVtVHVubmVscykge1xuXHRcdHZhciBjbGllbnRTdXBwb3J0ZWRUdW5uZWxUeXBlcyA9IHtcblx0XHRcdDA6IHsgdmVuZG9yOiAnVEdIVCcsIHNpZ25hdHVyZTogJ05PVFVOTkVMJyB9XG5cdFx0fTtcblx0XHR2YXIgc2VydmVyU3VwcG9ydGVkVHVubmVsVHlwZXMgPSB7fTtcblx0XHQvLyByZWNlaXZlIHR1bm5lbCBjYXBhYmlsaXRpZXNcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG51bVR1bm5lbHM7IGkrKykge1xuXHRcdFx0dmFyIGNhcF9jb2RlID0gdGhpcy5fc29jay5yUXNoaWZ0MzIoKTtcblx0XHRcdHZhciBjYXBfdmVuZG9yID0gdGhpcy5fc29jay5yUXNoaWZ0U3RyKDQpO1xuXHRcdFx0dmFyIGNhcF9zaWduYXR1cmUgPSB0aGlzLl9zb2NrLnJRc2hpZnRTdHIoOCk7XG5cdFx0XHRzZXJ2ZXJTdXBwb3J0ZWRUdW5uZWxUeXBlc1tjYXBfY29kZV0gPSB7IHZlbmRvcjogY2FwX3ZlbmRvciwgc2lnbmF0dXJlOiBjYXBfc2lnbmF0dXJlIH07XG5cdFx0fVxuXG5cdFx0Ly8gY2hvb3NlIHRoZSBub3R1bm5lbCB0eXBlXG5cdFx0aWYgKHNlcnZlclN1cHBvcnRlZFR1bm5lbFR5cGVzWzBdKSB7XG5cdFx0XHRpZiAoc2VydmVyU3VwcG9ydGVkVHVubmVsVHlwZXNbMF0udmVuZG9yICE9PSBjbGllbnRTdXBwb3J0ZWRUdW5uZWxUeXBlc1swXS52ZW5kb3IgfHxcblx0XHRcdFx0c2VydmVyU3VwcG9ydGVkVHVubmVsVHlwZXNbMF0uc2lnbmF0dXJlICE9PSBjbGllbnRTdXBwb3J0ZWRUdW5uZWxUeXBlc1swXS5zaWduYXR1cmUpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2ZhaWwoJ0NsaWVudFxcJ3MgdHVubmVsIHR5cGUgaGFkIHRoZSBpbmNvcnJlY3QgdmVuZG9yIG9yIHNpZ25hdHVyZScpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fc29jay5zZW5kKFswLCAwLCAwLCAwXSk7ICAvLyB1c2UgTk9UVU5ORUxcblx0XHRcdHJldHVybiBmYWxzZTsgLy8gd2FpdCB1bnRpbCB3ZSByZWNlaXZlIHRoZSBzdWIgYXV0aCBjb3VudCB0byBjb250aW51ZVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fZmFpbCgnU2VydmVyIHdhbnRlZCB0dW5uZWxzLCBidXQgZG9lc25cXCd0IHN1cHBvcnQgdGhlIG5vdHVubmVsIHR5cGUnKTtcblx0XHR9XG5cdH0sXG5cblx0X25lZ290aWF0ZV90aWdodF9hdXRoOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKCF0aGlzLl9yZmJfdGlnaHR2bmMpIHsgIC8vIGZpcnN0IHBhc3MsIGRvIHRoZSB0dW5uZWwgbmVnb3RpYXRpb25cblx0XHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgnbnVtIHR1bm5lbHMnLCA0KSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdHZhciBudW1UdW5uZWxzID0gdGhpcy5fc29jay5yUXNoaWZ0MzIoKTtcblx0XHRcdGlmIChudW1UdW5uZWxzID4gMCAmJiB0aGlzLl9zb2NrLnJRd2FpdCgndHVubmVsIGNhcGFiaWxpdGllcycsIDE2ICogbnVtVHVubmVscywgNCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHRcdHRoaXMuX3JmYl90aWdodHZuYyA9IHRydWU7XG5cblx0XHRcdGlmIChudW1UdW5uZWxzID4gMCkge1xuXHRcdFx0XHR0aGlzLl9uZWdvdGlhdGVfdGlnaHRfdHVubmVscyhudW1UdW5uZWxzKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlOyAgLy8gd2FpdCB1bnRpbCB3ZSByZWNlaXZlIHRoZSBzdWIgYXV0aCB0byBjb250aW51ZVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIHNlY29uZCBwYXNzLCBkbyB0aGUgc3ViLWF1dGggbmVnb3RpYXRpb25cblx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ3N1YiBhdXRoIGNvdW50JywgNCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0dmFyIHN1YkF1dGhDb3VudCA9IHRoaXMuX3NvY2suclFzaGlmdDMyKCk7XG5cdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdzdWIgYXV0aCBjYXBhYmlsaXRpZXMnLCAxNiAqIHN1YkF1dGhDb3VudCwgNCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHR2YXIgY2xpZW50U3VwcG9ydGVkVHlwZXMgPSB7XG5cdFx0XHQnU1REVk5PQVVUSF9fJzogMSxcblx0XHRcdCdTVERWVk5DQVVUSF8nOiAyXG5cdFx0fTtcblxuXHRcdHZhciBzZXJ2ZXJTdXBwb3J0ZWRUeXBlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdWJBdXRoQ291bnQ7IGkrKykge1xuXHRcdFx0dmFyIGNhcGFiaWxpdGllcyA9IHRoaXMuX3NvY2suclFzaGlmdFN0cigxMik7XG5cdFx0XHRzZXJ2ZXJTdXBwb3J0ZWRUeXBlcy5wdXNoKGNhcGFiaWxpdGllcyk7XG5cdFx0fVxuXG5cdFx0ZGVidWcoJ19uZWdvdGlhdGVfdGlnaHRfYXV0aCgpIHwgY2xpZW50U3VwcG9ydGVkVHlwZXM6ICVvJywgY2xpZW50U3VwcG9ydGVkVHlwZXMpO1xuXHRcdGRlYnVnKCdfbmVnb3RpYXRlX3RpZ2h0X2F1dGgoKSB8IHNlcnZlclN1cHBvcnRlZFR5cGVzOiAlbycsIHNlcnZlclN1cHBvcnRlZFR5cGVzKTtcblxuXHRcdGZvciAodmFyIGF1dGhUeXBlIGluIGNsaWVudFN1cHBvcnRlZFR5cGVzKSB7XG5cdFx0XHRpZiAoc2VydmVyU3VwcG9ydGVkVHlwZXMuaW5kZXhPZihhdXRoVHlwZSkgIT09IC0xKSB7XG5cdFx0XHRcdHRoaXMuX3NvY2suc2VuZChbMCwgMCwgMCwgY2xpZW50U3VwcG9ydGVkVHlwZXNbYXV0aFR5cGVdXSk7XG5cblx0XHRcdFx0c3dpdGNoIChhdXRoVHlwZSkge1xuXHRcdFx0XHRcdGNhc2UgJ1NURFZOT0FVVEhfXyc6ICAvLyBubyBhdXRoXG5cdFx0XHRcdFx0XHR0aGlzLl91cGRhdGVTdGF0ZSgnU2VjdXJpdHlSZXN1bHQnKTtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdGNhc2UgJ1NURFZWTkNBVVRIXyc6IC8vIFZOQyBhdXRoXG5cdFx0XHRcdFx0XHR0aGlzLl9yZmJfYXV0aF9zY2hlbWUgPSAyO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2luaXRfbXNnKCk7XG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl9mYWlsKCdVbnN1cHBvcnRlZCB0aW55IGF1dGggc2NoZW1lOiAnICsgYXV0aFR5cGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5fZmFpbCgnTm8gc3VwcG9ydGVkIHN1Yi1hdXRoIHR5cGVzIScpO1xuXHR9LFxuXG5cdF9uZWdvdGlhdGVfYXV0aGVudGljYXRpb246IGZ1bmN0aW9uICgpIHtcblx0XHRzd2l0Y2ggKHRoaXMuX3JmYl9hdXRoX3NjaGVtZSkge1xuXHRcdFx0Y2FzZSAwOiAgLy8gY29ubmVjdGlvbiBmYWlsZWRcblx0XHRcdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdhdXRoIHJlYXNvbicsIDQpKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0XHR2YXIgc3RybGVuID0gdGhpcy5fc29jay5yUXNoaWZ0MzIoKTtcblx0XHRcdFx0dmFyIHJlYXNvbiA9IHRoaXMuX3NvY2suclFzaGlmdFN0cihzdHJsZW4pO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZmFpbCgnQXV0aCBmYWlsdXJlOiAnICsgcmVhc29uKTtcblxuXHRcdFx0Y2FzZSAxOiAgLy8gbm8gYXV0aFxuXHRcdFx0XHRpZiAodGhpcy5fcmZiX3ZlcnNpb24gPj0gMy44KSB7XG5cdFx0XHRcdFx0dGhpcy5fdXBkYXRlU3RhdGUoJ1NlY3VyaXR5UmVzdWx0Jyk7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fdXBkYXRlU3RhdGUoJ0NsaWVudEluaXRpYWxpc2F0aW9uJywgJ05vIGF1dGggcmVxdWlyZWQnKTtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2luaXRfbXNnKCk7XG5cblx0XHRcdGNhc2UgMjI6ICAvLyBYVlAgYXV0aFxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fbmVnb3RpYXRlX3h2cF9hdXRoKCk7XG5cblx0XHRcdGNhc2UgMjogIC8vIFZOQyBhdXRoZW50aWNhdGlvblxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fbmVnb3RpYXRlX3N0ZF92bmNfYXV0aCgpO1xuXG5cdFx0XHRjYXNlIDE2OiAgLy8gVGlnaHRWTkMgU2VjdXJpdHkgVHlwZVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fbmVnb3RpYXRlX3RpZ2h0X2F1dGgoKTtcblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2ZhaWwoJ1Vuc3VwcG9ydGVkIGF1dGggc2NoZW1lOiAnICsgdGhpcy5fcmZiX2F1dGhfc2NoZW1lKTtcblx0XHR9XG5cdH0sXG5cblx0X2hhbmRsZV9zZWN1cml0eV9yZXN1bHQ6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ1ZOQyBhdXRoIHJlc3BvbnNlICcsIDQpKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdHN3aXRjaCAodGhpcy5fc29jay5yUXNoaWZ0MzIoKSkge1xuXHRcdFx0Y2FzZSAwOiAgLy8gT0tcblx0XHRcdFx0dGhpcy5fdXBkYXRlU3RhdGUoJ0NsaWVudEluaXRpYWxpc2F0aW9uJywgJ0F1dGhlbnRpY2F0aW9uIE9LJyk7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9pbml0X21zZygpO1xuXHRcdFx0Y2FzZSAxOiAgLy8gZmFpbGVkXG5cdFx0XHRcdGlmICh0aGlzLl9yZmJfdmVyc2lvbiA+PSAzLjgpIHtcblx0XHRcdFx0XHR2YXIgbGVuZ3RoID0gdGhpcy5fc29jay5yUXNoaWZ0MzIoKTtcblx0XHRcdFx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ1NlY3VyaXR5UmVzdWx0IHJlYXNvbicsIGxlbmd0aCwgOCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRcdFx0dmFyIHJlYXNvbiA9IHRoaXMuX3NvY2suclFzaGlmdFN0cihsZW5ndGgpO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9mYWlsKHJlYXNvbik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2ZhaWwoJ0F1dGhlbnRpY2F0aW9uIGZhaWx1cmUnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdHJldHVybiB0aGlzLl9mYWlsKCdUb28gbWFueSBhdXRoIGF0dGVtcHRzJyk7XG5cdFx0fVxuXHR9LFxuXG5cdF9uZWdvdGlhdGVfc2VydmVyX2luaXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ3NlcnZlciBpbml0aWFsaXphdGlvbicsIDI0KSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdC8qIFNjcmVlbiBzaXplICovXG5cdFx0dGhpcy5fZmJfd2lkdGggID0gdGhpcy5fc29jay5yUXNoaWZ0MTYoKTtcblx0XHR0aGlzLl9mYl9oZWlnaHQgPSB0aGlzLl9zb2NrLnJRc2hpZnQxNigpO1xuXG5cdFx0LyogUElYRUxfRk9STUFUICovXG5cdFx0dmFyIGJwcCAgICAgICAgID0gdGhpcy5fc29jay5yUXNoaWZ0OCgpO1xuXHRcdHZhciBkZXB0aCAgICAgICA9IHRoaXMuX3NvY2suclFzaGlmdDgoKTtcblx0XHR2YXIgYmlnX2VuZGlhbiAgPSB0aGlzLl9zb2NrLnJRc2hpZnQ4KCk7XG5cdFx0dmFyIHRydWVfY29sb3IgID0gdGhpcy5fc29jay5yUXNoaWZ0OCgpO1xuXG5cdFx0dmFyIHJlZF9tYXggICAgID0gdGhpcy5fc29jay5yUXNoaWZ0MTYoKTtcblx0XHR2YXIgZ3JlZW5fbWF4ICAgPSB0aGlzLl9zb2NrLnJRc2hpZnQxNigpO1xuXHRcdHZhciBibHVlX21heCAgICA9IHRoaXMuX3NvY2suclFzaGlmdDE2KCk7XG5cdFx0dmFyIHJlZF9zaGlmdCAgID0gdGhpcy5fc29jay5yUXNoaWZ0OCgpO1xuXHRcdHZhciBncmVlbl9zaGlmdCA9IHRoaXMuX3NvY2suclFzaGlmdDgoKTtcblx0XHR2YXIgYmx1ZV9zaGlmdCAgPSB0aGlzLl9zb2NrLnJRc2hpZnQ4KCk7XG5cdFx0dGhpcy5fc29jay5yUXNraXBCeXRlcygzKTsgIC8vIHBhZGRpbmdcblxuXHRcdC8vIE5CKGRpcmVjdHhtYW4xMik6IHdlIGRvbid0IHdhbnQgdG8gY2FsbCBhbnkgY2FsbGJhY2tzIG9yIHByaW50IG1lc3NhZ2VzIHVudGlsXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgKmFmdGVyKiB3ZSdyZSBwYXN0IHRoZSBwb2ludCB3aGVyZSB3ZSBjb3VsZCBiYWNrdHJhY2tcblxuXHRcdC8qIENvbm5lY3Rpb24gbmFtZS90aXRsZSAqL1xuXHRcdHZhciBuYW1lX2xlbmd0aCA9IHRoaXMuX3NvY2suclFzaGlmdDMyKCk7XG5cdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdzZXJ2ZXIgaW5pdCBuYW1lJywgbmFtZV9sZW5ndGgsIDI0KSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR0aGlzLl9mYl9uYW1lID0gVXRpbC5kZWNvZGVVVEY4KHRoaXMuX3NvY2suclFzaGlmdFN0cihuYW1lX2xlbmd0aCkpO1xuXG5cdFx0aWYgKHRoaXMuX3JmYl90aWdodHZuYykge1xuXHRcdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdUaWdodFZOQyBleHRlbmRlZCBzZXJ2ZXIgaW5pdCBoZWFkZXInLCA4LCAyNCArIG5hbWVfbGVuZ3RoKSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdC8vIEluIFRpZ2h0Vk5DIG1vZGUsIFNlcnZlckluaXQgbWVzc2FnZSBpcyBleHRlbmRlZFxuXHRcdFx0dmFyIG51bVNlcnZlck1lc3NhZ2VzID0gdGhpcy5fc29jay5yUXNoaWZ0MTYoKTtcblx0XHRcdHZhciBudW1DbGllbnRNZXNzYWdlcyA9IHRoaXMuX3NvY2suclFzaGlmdDE2KCk7XG5cdFx0XHR2YXIgbnVtRW5jb2RpbmdzID0gdGhpcy5fc29jay5yUXNoaWZ0MTYoKTtcblx0XHRcdHRoaXMuX3NvY2suclFza2lwQnl0ZXMoMik7ICAvLyBwYWRkaW5nXG5cblx0XHRcdHZhciB0b3RhbE1lc3NhZ2VzTGVuZ3RoID0gKG51bVNlcnZlck1lc3NhZ2VzICsgbnVtQ2xpZW50TWVzc2FnZXMgKyBudW1FbmNvZGluZ3MpICogMTY7XG5cdFx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ1RpZ2h0Vk5DIGV4dGVuZGVkIHNlcnZlciBpbml0IGhlYWRlcicsIHRvdGFsTWVzc2FnZXNMZW5ndGgsIDMyICsgbmFtZV9sZW5ndGgpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGk7XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgbnVtU2VydmVyTWVzc2FnZXM7IGkrKykge1xuXHRcdFx0XHQvLyBUT0RPOiBodHRwczovL2dpdGh1Yi5jb20va2FuYWthL25vVk5DL2lzc3Vlcy80NDBcblx0XHRcdFx0dGhpcy5fc29jay5yUXNoaWZ0U3RyKDE2KTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IG51bUNsaWVudE1lc3NhZ2VzOyBpKyspIHtcblx0XHRcdFx0dGhpcy5fc29jay5yUXNoaWZ0U3RyKDE2KTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IG51bUVuY29kaW5nczsgaSsrKSB7XG5cdFx0XHRcdHRoaXMuX3NvY2suclFzaGlmdFN0cigxNik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gTkIoZGlyZWN0eG1hbjEyKTogdGhlc2UgYXJlIGRvd24gaGVyZSBzbyB0aGF0IHdlIGRvbid0IHJ1biB0aGVtIG11bHRpcGxlIHRpbWVzXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgaWYgd2UgYmFja3RyYWNrXG5cdFx0ZGVidWcoJ19uZWdvdGlhdGVfc2VydmVyX2luaXQoKSB8IHNjcmVlbjogJyArIHRoaXMuX2ZiX3dpZHRoICsgJ3gnICsgdGhpcy5fZmJfaGVpZ2h0ICtcblx0XHRcdFx0XHQnLCBicHA6ICcgKyBicHAgKyAnLCBkZXB0aDogJyArIGRlcHRoICtcblx0XHRcdFx0XHQnLCBiaWdfZW5kaWFuOiAnICsgYmlnX2VuZGlhbiArXG5cdFx0XHRcdFx0JywgdHJ1ZV9jb2xvcjogJyArIHRydWVfY29sb3IgK1xuXHRcdFx0XHRcdCcsIHJlZF9tYXg6ICcgKyByZWRfbWF4ICtcblx0XHRcdFx0XHQnLCBncmVlbl9tYXg6ICcgKyBncmVlbl9tYXggK1xuXHRcdFx0XHRcdCcsIGJsdWVfbWF4OiAnICsgYmx1ZV9tYXggK1xuXHRcdFx0XHRcdCcsIHJlZF9zaGlmdDogJyArIHJlZF9zaGlmdCArXG5cdFx0XHRcdFx0JywgZ3JlZW5fc2hpZnQ6ICcgKyBncmVlbl9zaGlmdCArXG5cdFx0XHRcdFx0JywgYmx1ZV9zaGlmdDogJyArIGJsdWVfc2hpZnQpO1xuXG5cdFx0aWYgKGJpZ19lbmRpYW4gIT09IDApIHtcblx0XHRcdGRlYnVnZXJyb3IoJ19uZWdvdGlhdGVfc2VydmVyX2luaXQoKSB8IHNlcnZlciBuYXRpdmUgZW5kaWFuIGlzIG5vdCBsaXR0bGUgZW5kaWFuJyk7XG5cdFx0fVxuXG5cdFx0aWYgKHJlZF9zaGlmdCAhPT0gMTYpIHtcblx0XHRcdGRlYnVnZXJyb3IoJ19uZWdvdGlhdGVfc2VydmVyX2luaXQoKSB8IHNlcnZlciBuYXRpdmUgcmVkLXNoaWZ0IGlzIG5vdCAxNicpO1xuXHRcdH1cblxuXHRcdGlmIChibHVlX3NoaWZ0ICE9PSAwKSB7XG5cdFx0XHRkZWJ1Z2Vycm9yKCdfbmVnb3RpYXRlX3NlcnZlcl9pbml0KCkgfCBzZXJ2ZXIgbmF0aXZlIGJsdWUtc2hpZnQgaXMgbm90IDAnKTtcblx0XHR9XG5cblx0XHQvLyB3ZSdyZSBwYXN0IHRoZSBwb2ludCB3aGVyZSB3ZSBjb3VsZCBiYWNrdHJhY2ssIHNvIGl0J3Mgc2FmZSB0byBjYWxsIHRoaXNcblx0XHR0aGlzLl9vbkRlc2t0b3BOYW1lKHRoaXMsIHRoaXMuX2ZiX25hbWUpO1xuXG5cdFx0aWYgKHRoaXMuX3RydWVfY29sb3IgJiYgdGhpcy5fZmJfbmFtZSA9PT0gJ0ludGVsKHIpIEFNVCBLVk0nKSB7XG5cdFx0XHRkZWJ1Z2Vycm9yKCdfbmVnb3RpYXRlX3NlcnZlcl9pbml0KCkgfCBJbnRlbCBBTVQgS1ZNIG9ubHkgc3VwcG9ydHMgOC8xNiBiaXQgZGVwdGhzLCBkaXNhYmxpbmcgdHJ1ZSBjb2xvcicpO1xuXHRcdFx0dGhpcy5fdHJ1ZV9jb2xvciA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdHRoaXMuX2Rpc3BsYXkuc2V0X3RydWVfY29sb3IodGhpcy5fdHJ1ZV9jb2xvcik7XG5cdFx0dGhpcy5fZGlzcGxheS5yZXNpemUodGhpcy5fZmJfd2lkdGgsIHRoaXMuX2ZiX2hlaWdodCk7XG5cdFx0dGhpcy5fb25GQlJlc2l6ZSh0aGlzLCB0aGlzLl9mYl93aWR0aCwgdGhpcy5fZmJfaGVpZ2h0KTtcblx0XHR0aGlzLl9rZXlib2FyZC5ncmFiKCk7XG5cdFx0dGhpcy5fbW91c2UuZ3JhYigpO1xuXG5cdFx0aWYgKHRoaXMuX3RydWVfY29sb3IpIHtcblx0XHRcdHRoaXMuX2ZiX0JwcCA9IDQ7XG5cdFx0XHR0aGlzLl9mYl9kZXB0aCA9IDM7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2ZiX0JwcCA9IDE7XG5cdFx0XHR0aGlzLl9mYl9kZXB0aCA9IDE7XG5cdFx0fVxuXG5cdFx0dmFyIHJlc3BvbnNlID0gUkZCLm1lc3NhZ2VzLnBpeGVsRm9ybWF0KHRoaXMuX2ZiX0JwcCwgdGhpcy5fZmJfZGVwdGgsIHRoaXMuX3RydWVfY29sb3IpO1xuXHRcdHJlc3BvbnNlID0gcmVzcG9uc2UuY29uY2F0KFxuXHRcdFx0XHRcdFx0UkZCLm1lc3NhZ2VzLmNsaWVudEVuY29kaW5ncyh0aGlzLl9lbmNvZGluZ3MsIHRoaXMuX2xvY2FsX2N1cnNvciwgdGhpcy5fdHJ1ZV9jb2xvcikpO1xuXHRcdHJlc3BvbnNlID0gcmVzcG9uc2UuY29uY2F0KFxuXHRcdFx0XHRcdFx0UkZCLm1lc3NhZ2VzLmZiVXBkYXRlUmVxdWVzdHModGhpcy5fZGlzcGxheS5nZXRDbGVhbkRpcnR5UmVzZXQoKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLl9mYl93aWR0aCwgdGhpcy5fZmJfaGVpZ2h0KSk7XG5cblx0XHR0aGlzLl90aW1pbmcuZmJ1X3J0X3N0YXJ0ID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblx0XHR0aGlzLl90aW1pbmcucGl4ZWxzID0gMDtcblx0XHR0aGlzLl9zb2NrLnNlbmQocmVzcG9uc2UpO1xuXG5cdFx0dGhpcy5fY2hlY2tFdmVudHMoKTtcblxuXHRcdHRoaXMuX3VwZGF0ZVN0YXRlKCdub3JtYWwnLCAnQ29ubmVjdGVkIHRvOiAnICsgdGhpcy5fZmJfbmFtZSk7XG5cdH0sXG5cblx0X2luaXRfbXNnOiBmdW5jdGlvbiAoKSB7XG5cdFx0c3dpdGNoICh0aGlzLl9yZmJfc3RhdGUpIHtcblx0XHRcdGNhc2UgJ1Byb3RvY29sVmVyc2lvbic6XG5cdFx0XHRcdHJldHVybiB0aGlzLl9uZWdvdGlhdGVfcHJvdG9jb2xfdmVyc2lvbigpO1xuXG5cdFx0XHRjYXNlICdTZWN1cml0eSc6XG5cdFx0XHRcdHJldHVybiB0aGlzLl9uZWdvdGlhdGVfc2VjdXJpdHkoKTtcblxuXHRcdFx0Y2FzZSAnQXV0aGVudGljYXRpb24nOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fbmVnb3RpYXRlX2F1dGhlbnRpY2F0aW9uKCk7XG5cblx0XHRcdGNhc2UgJ1NlY3VyaXR5UmVzdWx0Jzpcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2hhbmRsZV9zZWN1cml0eV9yZXN1bHQoKTtcblxuXHRcdFx0Y2FzZSAnQ2xpZW50SW5pdGlhbGlzYXRpb24nOlxuXHRcdFx0XHR0aGlzLl9zb2NrLnNlbmQoW3RoaXMuX3NoYXJlZCA/IDEgOiAwXSk7IC8vIENsaWVudEluaXRpYWxpc2F0aW9uXG5cdFx0XHRcdHRoaXMuX3VwZGF0ZVN0YXRlKCdTZXJ2ZXJJbml0aWFsaXNhdGlvbicsICdBdXRoZW50aWNhdGlvbiBPSycpO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdFx0Y2FzZSAnU2VydmVySW5pdGlhbGlzYXRpb24nOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fbmVnb3RpYXRlX3NlcnZlcl9pbml0KCk7XG5cdFx0fVxuXHR9LFxuXG5cdF9oYW5kbGVfc2V0X2NvbG91cl9tYXBfbXNnOiBmdW5jdGlvbiAoKSB7XG5cdFx0ZGVidWcoJ19oYW5kbGVfc2V0X2NvbG91cl9tYXBfbXNnKCknKTtcblxuXHRcdHRoaXMuX3NvY2suclFza2lwOCgpOyAgLy8gUGFkZGluZ1xuXG5cdFx0dmFyIGZpcnN0X2NvbG91ciA9IHRoaXMuX3NvY2suclFzaGlmdDE2KCk7XG5cdFx0dmFyIG51bV9jb2xvdXJzID0gdGhpcy5fc29jay5yUXNoaWZ0MTYoKTtcblx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ1NldENvbG9yTWFwRW50cmllcycsIG51bV9jb2xvdXJzICogNiwgNikpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHRmb3IgKHZhciBjID0gMDsgYyA8IG51bV9jb2xvdXJzOyBjKyspIHtcblx0XHRcdHZhciByZWQgPSBwYXJzZUludCh0aGlzLl9zb2NrLnJRc2hpZnQxNigpIC8gMjU2LCAxMCk7XG5cdFx0XHR2YXIgZ3JlZW4gPSBwYXJzZUludCh0aGlzLl9zb2NrLnJRc2hpZnQxNigpIC8gMjU2LCAxMCk7XG5cdFx0XHR2YXIgYmx1ZSA9IHBhcnNlSW50KHRoaXMuX3NvY2suclFzaGlmdDE2KCkgLyAyNTYsIDEwKTtcblx0XHRcdHRoaXMuX2Rpc3BsYXkuc2V0X2NvbG91ck1hcChbYmx1ZSwgZ3JlZW4sIHJlZF0sIGZpcnN0X2NvbG91ciArIGMpO1xuXHRcdH1cblx0XHRkZWJ1ZygnX2hhbmRsZV9zZXRfY29sb3VyX21hcF9tc2coKSB8IGNvbG91ck1hcDogJyArIHRoaXMuX2Rpc3BsYXkuZ2V0X2NvbG91ck1hcCgpKTtcblx0XHRkZWJ1ZygnX2hhbmRsZV9zZXRfY29sb3VyX21hcF9tc2coKSB8IHJlZ2lzdGVyZWQgJyArIG51bV9jb2xvdXJzICsgJyBjb2xvdXJNYXAgZW50cmllcycpO1xuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0X2hhbmRsZV9zZXJ2ZXJfY3V0X3RleHQ6IGZ1bmN0aW9uICgpIHtcblx0XHRkZWJ1ZygnX2hhbmRsZV9zZXJ2ZXJfY3V0X3RleHQoKScpO1xuXG5cdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdTZXJ2ZXJDdXRUZXh0IGhlYWRlcicsIDcsIDEpKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdHRoaXMuX3NvY2suclFza2lwQnl0ZXMoMyk7ICAvLyBQYWRkaW5nXG5cdFx0dmFyIGxlbmd0aCA9IHRoaXMuX3NvY2suclFzaGlmdDMyKCk7XG5cdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdTZXJ2ZXJDdXRUZXh0JywgbGVuZ3RoLCA4KSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdHZhciB0ZXh0ID0gdGhpcy5fc29jay5yUXNoaWZ0U3RyKGxlbmd0aCk7XG5cdFx0dGhpcy5fb25DbGlwYm9hcmQodGhpcywgdGV4dCk7XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHRfaGFuZGxlX3h2cF9tc2c6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ1hWUCB2ZXJzaW9uIGFuZCBtZXNzYWdlJywgMywgMSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0dGhpcy5fc29jay5yUXNraXA4KCk7ICAvLyBQYWRkaW5nXG5cdFx0dmFyIHh2cF92ZXIgPSB0aGlzLl9zb2NrLnJRc2hpZnQ4KCk7XG5cdFx0dmFyIHh2cF9tc2cgPSB0aGlzLl9zb2NrLnJRc2hpZnQ4KCk7XG5cblx0XHRzd2l0Y2ggKHh2cF9tc2cpIHtcblx0XHRcdGNhc2UgMDogIC8vIFhWUF9GQUlMXG5cdFx0XHRcdHRoaXMuX3VwZGF0ZVN0YXRlKHRoaXMuX3JmYl9zdGF0ZSwgJ09wZXJhdGlvbiBGYWlsZWQnKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDE6ICAvLyBYVlBfSU5JVFxuXHRcdFx0XHR0aGlzLl9yZmJfeHZwX3ZlciA9IHh2cF92ZXI7XG5cdFx0XHRcdGRlYnVnKCdfaGFuZGxlX3h2cF9tc2coKSB8IFhWUCBleHRlbnNpb25zIGVuYWJsZWQgKHZlcnNpb24gJyArIHRoaXMuX3JmYl94dnBfdmVyICsgJyknKTtcblx0XHRcdFx0dGhpcy5fb25YdnBJbml0KHRoaXMuX3JmYl94dnBfdmVyKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aGlzLl9mYWlsKCdEaXNjb25uZWN0ZWQ6IGlsbGVnYWwgc2VydmVyIFhWUCBtZXNzYWdlICcgKyB4dnBfbXNnKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0X25vcm1hbF9tc2c6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgbXNnX3R5cGU7XG5cblx0XHRpZiAodGhpcy5fRkJVLnJlY3RzID4gMCkge1xuXHRcdFx0bXNnX3R5cGUgPSAwO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtc2dfdHlwZSA9IHRoaXMuX3NvY2suclFzaGlmdDgoKTtcblx0XHR9XG5cblx0XHRzd2l0Y2ggKG1zZ190eXBlKSB7XG5cdFx0XHRjYXNlIDA6ICAvLyBGcmFtZWJ1ZmZlclVwZGF0ZVxuXHRcdFx0XHR2YXIgcmV0ID0gdGhpcy5fZnJhbWVidWZmZXJVcGRhdGUoKTtcblx0XHRcdFx0aWYgKHJldCkge1xuXHRcdFx0XHRcdHRoaXMuX3NvY2suc2VuZChSRkIubWVzc2FnZXMuZmJVcGRhdGVSZXF1ZXN0cyhcblx0XHRcdFx0XHRcdHRoaXMuX2Rpc3BsYXkuZ2V0Q2xlYW5EaXJ0eVJlc2V0KCksXG5cdFx0XHRcdFx0XHR0aGlzLl9mYl93aWR0aCxcblx0XHRcdFx0XHRcdHRoaXMuX2ZiX2hlaWdodFxuXHRcdFx0XHRcdCkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiByZXQ7XG5cblx0XHRcdGNhc2UgMTogIC8vIFNldENvbG9yTWFwRW50cmllc1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5faGFuZGxlX3NldF9jb2xvdXJfbWFwX21zZygpO1xuXG5cdFx0XHRjYXNlIDI6ICAvLyBCZWxsXG5cdFx0XHRcdGRlYnVnKCdfbm9ybWFsX21zZygpIHwgYmVsbCcpO1xuXHRcdFx0XHR0aGlzLl9vbkJlbGwodGhpcyk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0XHRjYXNlIDM6ICAvLyBTZXJ2ZXJDdXRUZXh0XG5cdFx0XHRcdHJldHVybiB0aGlzLl9oYW5kbGVfc2VydmVyX2N1dF90ZXh0KCk7XG5cblx0XHRcdGNhc2UgMjUwOiAgLy8gWFZQXG5cdFx0XHRcdHJldHVybiB0aGlzLl9oYW5kbGVfeHZwX21zZygpO1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHQvLyBJZiBvblVua25vd25NZXNzYWdlVHlwZSBpcyBub3Qgc2V0IHRoZW4ganVzdCBmYWlsLlxuXHRcdFx0XHRpZiAoISB0aGlzLl9vblVua25vd25NZXNzYWdlVHlwZSkge1xuXHRcdFx0XHRcdHRoaXMuX2ZhaWwoJ0Rpc2Nvbm5lY3RlZDogaWxsZWdhbCBzZXJ2ZXIgbWVzc2FnZSB0eXBlICcgKyBtc2dfdHlwZSk7XG5cdFx0XHRcdFx0ZGVidWdlcnJvcignX25vcm1hbF9tc2coKSB8IHNvY2suclFzbGljZSgwLCAzMCk6ICcgKyB0aGlzLl9zb2NrLnJRc2xpY2UoMCwgMzApKTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBJZiBvblVua25vd25NZXNzYWdlVHlwZSBpcyBzZXQgdGhlbiBjYWxsIGl0LiBJZiB0aGUgYXBwIGRvZXMgbm90IGFjY2VwdFxuXHRcdFx0XHQvLyB0aGUgdW5rbm93biBtZXNzYWdlIHR5cGUgaXQgbXVzdCB0aHJvdyBhbiBlcnJvci5cblx0XHRcdFx0Ly8gVGhlIGxpc3RlbmVyIG11c3QgcmV0dXJuIGZhbHNlIGlmIG1vcmUgYnl0ZXMgYXJlIG5lZWRlZCxcblx0XHRcdFx0Ly8gdHJ1ZSBvdGhlcndpc2UuXG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGRlYnVnKCdfbm9ybWFsX21zZygpIHwgcGFzc2luZyB1bmtub3duIG1lc3NhZ2UgdHlwZSAnICsgbXNnX3R5cGUgKyAnIHRvIHRoZSBvblVua25vd25NZXNzYWdlVHlwZSBsaXN0ZW5lcicpO1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fb25Vbmtub3duTWVzc2FnZVR5cGUobXNnX3R5cGUsIHRoaXMuX3NvY2spO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYXRjaChlcnJvcikge1xuXHRcdFx0XHRcdFx0ZGVidWdlcnJvcignX25vcm1hbF9tc2coKSB8IGVycm9yIGNhdGNoZWQgZHVyaW5nIG9uVW5rbm93bk1lc3NhZ2VUeXBlOiAlbycsIGVycm9yKTtcblx0XHRcdFx0XHRcdHRoaXMuX2ZhaWwoJ0Rpc2Nvbm5lY3RlZDogaW52YWxpZCBjdXN0b20gc2VydmVyIG1lc3NhZ2UgdHlwZSAnICsgbXNnX3R5cGUpO1xuXHRcdFx0XHRcdFx0ZGVidWdlcnJvcignX25vcm1hbF9tc2coKSB8IHNvY2suclFzbGljZSgwLCAzMCk6ICcgKyB0aGlzLl9zb2NrLnJRc2xpY2UoMCwgMzApKTtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRfZnJhbWVidWZmZXJVcGRhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgcmV0ID0gdHJ1ZTtcblx0XHR2YXIgbm93O1xuXG5cdFx0aWYgKHRoaXMuX0ZCVS5yZWN0cyA9PT0gMCkge1xuXHRcdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdGQlUgaGVhZGVyJywgMywgMSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHR0aGlzLl9zb2NrLnJRc2tpcDgoKTsgIC8vIFBhZGRpbmdcblx0XHRcdHRoaXMuX0ZCVS5yZWN0cyA9IHRoaXMuX3NvY2suclFzaGlmdDE2KCk7XG5cdFx0XHR0aGlzLl9GQlUuYnl0ZXMgPSAwO1xuXHRcdFx0dGhpcy5fdGltaW5nLmN1cl9mYnUgPSAwO1xuXHRcdFx0aWYgKHRoaXMuX3RpbWluZy5mYnVfcnRfc3RhcnQgPiAwKSB7XG5cdFx0XHRcdG5vdyA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cdFx0XHRcdGRlYnVnKCdfZnJhbWVidWZmZXJVcGRhdGUoKSB8IGZpcnN0IEZCVSBsYXRlbmN5OiAnICsgKG5vdyAtIHRoaXMuX3RpbWluZy5mYnVfcnRfc3RhcnQpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR3aGlsZSAodGhpcy5fRkJVLnJlY3RzID4gMCkge1xuXHRcdFx0aWYgKHRoaXMuX3JmYl9zdGF0ZSAhPT0gJ25vcm1hbCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgnRkJVJywgdGhpcy5fRkJVLmJ5dGVzKSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdGlmICh0aGlzLl9GQlUuYnl0ZXMgPT09IDApIHtcblx0XHRcdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdyZWN0IGhlYWRlcicsIDEyKSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdFx0LyogTmV3IEZyYW1lYnVmZmVyVXBkYXRlICovXG5cblx0XHRcdFx0dmFyIGhkciA9IHRoaXMuX3NvY2suclFzaGlmdEJ5dGVzKDEyKTtcblx0XHRcdFx0dGhpcy5fRkJVLnggICAgICAgID0gKGhkclswXSA8PCA4KSArIGhkclsxXTtcblx0XHRcdFx0dGhpcy5fRkJVLnkgICAgICAgID0gKGhkclsyXSA8PCA4KSArIGhkclszXTtcblx0XHRcdFx0dGhpcy5fRkJVLndpZHRoICAgID0gKGhkcls0XSA8PCA4KSArIGhkcls1XTtcblx0XHRcdFx0dGhpcy5fRkJVLmhlaWdodCAgID0gKGhkcls2XSA8PCA4KSArIGhkcls3XTtcblx0XHRcdFx0dGhpcy5fRkJVLmVuY29kaW5nID0gcGFyc2VJbnQoKGhkcls4XSA8PCAyNCkgKyAoaGRyWzldIDw8IDE2KSArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQoaGRyWzEwXSA8PCA4KSArIGhkclsxMV0sIDEwKTtcblxuXHRcdFx0XHR0aGlzLl9vbkZCVVJlY2VpdmUodGhpcyxcblx0XHRcdFx0XHR7J3gnOiB0aGlzLl9GQlUueCwgJ3knOiB0aGlzLl9GQlUueSxcblx0XHRcdFx0XHQgJ3dpZHRoJzogdGhpcy5fRkJVLndpZHRoLCAnaGVpZ2h0JzogdGhpcy5fRkJVLmhlaWdodCxcblx0XHRcdFx0XHQgJ2VuY29kaW5nJzogdGhpcy5fRkJVLmVuY29kaW5nLFxuXHRcdFx0XHRcdCAnZW5jb2RpbmdOYW1lJzogdGhpcy5fZW5jTmFtZXNbdGhpcy5fRkJVLmVuY29kaW5nXX0pO1xuXG5cdFx0XHRcdGlmICghdGhpcy5fZW5jTmFtZXNbdGhpcy5fRkJVLmVuY29kaW5nXSkge1xuXHRcdFx0XHRcdHRoaXMuX2ZhaWwoJ0Rpc2Nvbm5lY3RlZDogdW5zdXBwb3J0ZWQgZW5jb2RpbmcgJyArXG5cdFx0XHRcdFx0XHRcdFx0IHRoaXMuX0ZCVS5lbmNvZGluZyk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3RpbWluZy5sYXN0X2ZidSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cblx0XHRcdHJldCA9IHRoaXMuX2VuY0hhbmRsZXJzW3RoaXMuX0ZCVS5lbmNvZGluZ10oKTtcblxuXHRcdFx0bm93ID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblx0XHRcdHRoaXMuX3RpbWluZy5jdXJfZmJ1ICs9IChub3cgLSB0aGlzLl90aW1pbmcubGFzdF9mYnUpO1xuXG5cdFx0XHRpZiAocmV0KSB7XG5cdFx0XHRcdHRoaXMuX2VuY1N0YXRzW3RoaXMuX0ZCVS5lbmNvZGluZ11bMF0rKztcblx0XHRcdFx0dGhpcy5fZW5jU3RhdHNbdGhpcy5fRkJVLmVuY29kaW5nXVsxXSsrO1xuXHRcdFx0XHR0aGlzLl90aW1pbmcucGl4ZWxzICs9IHRoaXMuX0ZCVS53aWR0aCAqIHRoaXMuX0ZCVS5oZWlnaHQ7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLl90aW1pbmcucGl4ZWxzID49ICh0aGlzLl9mYl93aWR0aCAqIHRoaXMuX2ZiX2hlaWdodCkpIHtcblx0XHRcdFx0aWYgKCh0aGlzLl9GQlUud2lkdGggPT09IHRoaXMuX2ZiX3dpZHRoICYmIHRoaXMuX0ZCVS5oZWlnaHQgPT09IHRoaXMuX2ZiX2hlaWdodCkgfHxcblx0XHRcdFx0XHR0aGlzLl90aW1pbmcuZmJ1X3J0X3N0YXJ0ID4gMCkge1xuXHRcdFx0XHRcdHRoaXMuX3RpbWluZy5mdWxsX2ZidV90b3RhbCArPSB0aGlzLl90aW1pbmcuY3VyX2ZidTtcblx0XHRcdFx0XHR0aGlzLl90aW1pbmcuZnVsbF9mYnVfY250Kys7XG5cdFx0XHRcdFx0ZGVidWcoJ19mcmFtZWJ1ZmZlclVwZGF0ZSgpIHwgdGltaW5nIG9mIGZ1bGwgRkJVLCBjdXJyOiAnICtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl90aW1pbmcuY3VyX2ZidSArICcsIHRvdGFsOiAnICtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl90aW1pbmcuZnVsbF9mYnVfdG90YWwgKyAnLCBjbnQ6ICcgK1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX3RpbWluZy5mdWxsX2ZidV9jbnQgKyAnLCBhdmc6ICcgK1xuXHRcdFx0XHRcdFx0XHRcdCh0aGlzLl90aW1pbmcuZnVsbF9mYnVfdG90YWwgLyB0aGlzLl90aW1pbmcuZnVsbF9mYnVfY250KSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5fdGltaW5nLmZidV9ydF9zdGFydCA+IDApIHtcblx0XHRcdFx0XHR2YXIgZmJ1X3J0X2RpZmYgPSBub3cgLSB0aGlzLl90aW1pbmcuZmJ1X3J0X3N0YXJ0O1xuXHRcdFx0XHRcdHRoaXMuX3RpbWluZy5mYnVfcnRfdG90YWwgKz0gZmJ1X3J0X2RpZmY7XG5cdFx0XHRcdFx0dGhpcy5fdGltaW5nLmZidV9ydF9jbnQrKztcblx0XHRcdFx0XHRkZWJ1ZygnX2ZyYW1lYnVmZmVyVXBkYXRlKCkgfCBmdWxsIEZCVSByb3VuZC10cmlwLCBjdXI6ICcgK1xuXHRcdFx0XHRcdFx0IGZidV9ydF9kaWZmICsgJywgdG90YWw6ICcgK1xuXHRcdFx0XHRcdFx0IHRoaXMuX3RpbWluZy5mYnVfcnRfdG90YWwgKyAnLCBjbnQ6ICcgK1xuXHRcdFx0XHRcdFx0IHRoaXMuX3RpbWluZy5mYnVfcnRfY250ICsgJywgYXZnOiAnICtcblx0XHRcdFx0XHRcdCAodGhpcy5fdGltaW5nLmZidV9ydF90b3RhbCAvIHRoaXMuX3RpbWluZy5mYnVfcnRfY250KSk7XG5cdFx0XHRcdFx0dGhpcy5fdGltaW5nLmZidV9ydF9zdGFydCA9IDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKCFyZXQpIHsgcmV0dXJuIHJldDsgfSAgLy8gbmVlZCBtb3JlIGRhdGFcblx0XHR9XG5cblx0XHR0aGlzLl9vbkZCVUNvbXBsZXRlKHRoaXMsXG5cdFx0XHRcdHsneCc6IHRoaXMuX0ZCVS54LCAneSc6IHRoaXMuX0ZCVS55LFxuXHRcdFx0XHQgJ3dpZHRoJzogdGhpcy5fRkJVLndpZHRoLCAnaGVpZ2h0JzogdGhpcy5fRkJVLmhlaWdodCxcblx0XHRcdFx0ICdlbmNvZGluZyc6IHRoaXMuX0ZCVS5lbmNvZGluZyxcblx0XHRcdFx0ICdlbmNvZGluZ05hbWUnOiB0aGlzLl9lbmNOYW1lc1t0aGlzLl9GQlUuZW5jb2RpbmddfSk7XG5cblx0XHRyZXR1cm4gdHJ1ZTsgIC8vIFdlIGZpbmlzaGVkIHRoaXMgRkJVXG5cdH0sXG59O1xuXG5cblV0aWwubWFrZV9wcm9wZXJ0aWVzKFJGQiwgW1xuXHRbJ3RhcmdldCcsICd3bycsICdkb20nXSwgICAgICAgICAgICAgICAgLy8gVk5DIGRpc3BsYXkgcmVuZGVyaW5nIENhbnZhcyBvYmplY3Rcblx0Wydmb2N1c0NvbnRhaW5lcicsICd3bycsICdkb20nXSwgICAgICAgIC8vIERPTSBlbGVtZW50IHRoYXQgY2FwdHVyZXMga2V5Ym9hcmQgaW5wdXRcblx0WydlbmNyeXB0JywgJ3J3JywgJ2Jvb2wnXSwgICAgICAgICAgICAgIC8vIFVzZSBUTFMvU1NML3dzcyBlbmNyeXB0aW9uXG5cdFsndHJ1ZV9jb2xvcicsICdydycsICdib29sJ10sICAgICAgICAgICAvLyBSZXF1ZXN0IHRydWUgY29sb3IgcGl4ZWwgZGF0YVxuXHRbJ2xvY2FsX2N1cnNvcicsICdydycsICdib29sJ10sICAgICAgICAgLy8gUmVxdWVzdCBsb2NhbGx5IHJlbmRlcmVkIGN1cnNvclxuXHRbJ3NoYXJlZCcsICdydycsICdib29sJ10sICAgICAgICAgICAgICAgLy8gUmVxdWVzdCBzaGFyZWQgbW9kZVxuXHRbJ3ZpZXdfb25seScsICdydycsICdib29sJ10sICAgICAgICAgICAgLy8gRGlzYWJsZSBjbGllbnQgbW91c2Uva2V5Ym9hcmRcblx0Wyd4dnBfcGFzc3dvcmRfc2VwJywgJ3J3JywgJ3N0ciddLCAgICAgIC8vIFNlcGFyYXRvciBmb3IgWFZQIHBhc3N3b3JkIGZpZWxkc1xuXHRbJ2Rpc2Nvbm5lY3RUaW1lb3V0JywgJ3J3JywgJ2ludCddLCAgICAgLy8gVGltZSAocykgdG8gd2FpdCBmb3IgZGlzY29ubmVjdGlvblxuXHRbJ3dzUHJvdG9jb2xzJywgJ3J3JywgJ2FyciddLCAgICAgICAgICAgLy8gUHJvdG9jb2xzIHRvIHVzZSBpbiB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb25cblx0WydyZXBlYXRlcklEJywgJ3J3JywgJ3N0ciddLCAgICAgICAgICAgIC8vIFtVbHRyYVZOQ10gUmVwZWF0ZXJJRCB0byBjb25uZWN0IHRvXG5cdFsndmlld3BvcnREcmFnJywgJ3J3JywgJ2Jvb2wnXSwgICAgICAgICAvLyBNb3ZlIHRoZSB2aWV3cG9ydCBvbiBtb3VzZSBkcmFnc1xuXHRbJ2ZvcmNlQXV0aFNjaGVtZScsICdydycsICdpbnQnXSwgICAgICAgLy8gRm9yY2UgYXV0aCBzY2hlbWUgKDAgbWVhbnMgbm8pXG5cdFsnZW5hYmxlTW91c2VBbmRUb3VjaCcsICdydycsICdib29sJ10sICAvLyBXaGV0aGVyIGFsc28gZW5hYmxlIG1vdXNlIGV2ZW50cyB3aGVuIHRvdWNoIHNjcmVlbiBpcyBkZXRlY3RlZFxuXG5cdC8vIENhbGxiYWNrIGZ1bmN0aW9uc1xuXHRbJ29uVXBkYXRlU3RhdGUnLCAncncnLCAnZnVuYyddLCAgICAgICAgLy8gb25VcGRhdGVTdGF0ZShyZmIsIHN0YXRlLCBvbGRzdGF0ZSwgc3RhdHVzTXNnKTogUkZCIHN0YXRlIHVwZGF0ZS9jaGFuZ2Vcblx0WydvblBhc3N3b3JkUmVxdWlyZWQnLCAncncnLCAnZnVuYyddLCAgIC8vIG9uUGFzc3dvcmRSZXF1aXJlZChyZmIpOiBWTkMgcGFzc3dvcmQgaXMgcmVxdWlyZWRcblx0WydvbkNsaXBib2FyZCcsICdydycsICdmdW5jJ10sICAgICAgICAgIC8vIG9uQ2xpcGJvYXJkKHJmYiwgdGV4dCk6IFJGQiBjbGlwYm9hcmQgY29udGVudHMgcmVjZWl2ZWRcblx0WydvbkJlbGwnLCAncncnLCAnZnVuYyddLCAgICAgICAgICAgICAgIC8vIG9uQmVsbChyZmIpOiBSRkIgQmVsbCBtZXNzYWdlIHJlY2VpdmVkXG5cdFsnb25GQlVSZWNlaXZlJywgJ3J3JywgJ2Z1bmMnXSwgICAgICAgICAvLyBvbkZCVVJlY2VpdmUocmZiLCBmYnUpOiBSRkIgRkJVIHJlY2VpdmVkIGJ1dCBub3QgeWV0IHByb2Nlc3NlZFxuXHRbJ29uRkJVQ29tcGxldGUnLCAncncnLCAnZnVuYyddLCAgICAgICAgLy8gb25GQlVDb21wbGV0ZShyZmIsIGZidSk6IFJGQiBGQlUgcmVjZWl2ZWQgYW5kIHByb2Nlc3NlZFxuXHRbJ29uRkJSZXNpemUnLCAncncnLCAnZnVuYyddLCAgICAgICAgICAgLy8gb25GQlJlc2l6ZShyZmIsIHdpZHRoLCBoZWlnaHQpOiBmcmFtZSBidWZmZXIgcmVzaXplZFxuXHRbJ29uRGVza3RvcE5hbWUnLCAncncnLCAnZnVuYyddLCAgICAgICAgLy8gb25EZXNrdG9wTmFtZShyZmIsIG5hbWUpOiBkZXNrdG9wIG5hbWUgcmVjZWl2ZWRcblx0Wydvblh2cEluaXQnLCAncncnLCAnZnVuYyddLCAgICAgICAgICAgIC8vIG9uWHZwSW5pdCh2ZXJzaW9uKTogWFZQIGV4dGVuc2lvbnMgYWN0aXZlIGZvciB0aGlzIGNvbm5lY3Rpb25cblx0WydvblVua25vd25NZXNzYWdlVHlwZScsICdydycsICdmdW5jJ10gIC8vIEhhbmRsZXIgZm9yIHVua25vd24gVk5DIG1lc3NhZ2UgdHlwZXMuIElmXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAvLyBudWxsIGZhaWx1cmUgaXMgZW1pdHRlZCBhbmQgdGhlIFJGQiBjbG9zZWQuXG5dKTtcblxuXG5SRkIucHJvdG90eXBlLnNldF9sb2NhbF9jdXJzb3IgPSBmdW5jdGlvbiAoY3Vyc29yKSB7XG5cdGlmICghY3Vyc29yIHx8IChjdXJzb3IgaW4geycwJzogMSwgJ25vJzogMSwgJ2ZhbHNlJzogMX0pKSB7XG5cdFx0dGhpcy5fbG9jYWxfY3Vyc29yID0gZmFsc2U7XG5cdFx0dGhpcy5fZGlzcGxheS5kaXNhYmxlTG9jYWxDdXJzb3IoKTsgLy8gT25seSBzaG93IHNlcnZlci1zaWRlIGN1cnNvclxuXHR9IGVsc2Uge1xuXHRcdGlmICh0aGlzLl9kaXNwbGF5LmdldF9jdXJzb3JfdXJpKCkpIHtcblx0XHRcdHRoaXMuX2xvY2FsX2N1cnNvciA9IHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlYnVnKCdicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgbG9jYWwgY3Vyc29yJyk7XG5cdFx0XHR0aGlzLl9kaXNwbGF5LmRpc2FibGVMb2NhbEN1cnNvcigpO1xuXHRcdH1cblx0fVxufTtcblxuUkZCLnByb3RvdHlwZS5nZXRfZGlzcGxheSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2Rpc3BsYXk7IH07XG5SRkIucHJvdG90eXBlLmdldF9rZXlib2FyZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2tleWJvYXJkOyB9O1xuUkZCLnByb3RvdHlwZS5nZXRfbW91c2UgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9tb3VzZTsgfTtcblxuXG4vLyBDbGFzcyBNZXRob2RzXG5SRkIubWVzc2FnZXMgPSB7XG5cdGtleUV2ZW50OiBmdW5jdGlvbiAoa2V5c3ltLCBkb3duKSB7XG5cdFx0dmFyIGFyciA9IFs0XTtcblx0XHRVdGlsLnB1c2g4KGFyciwgZG93bik7XG5cdFx0VXRpbC5wdXNoMTYoYXJyLCAwKTtcblx0XHRVdGlsLnB1c2gzMihhcnIsIGtleXN5bSk7XG5cdFx0cmV0dXJuIGFycjtcblx0fSxcblxuXHRwb2ludGVyRXZlbnQ6IGZ1bmN0aW9uICh4LCB5LCBtYXNrKSB7XG5cdFx0dmFyIGFyciA9IFs1XTsgIC8vIG1zZy10eXBlXG5cdFx0VXRpbC5wdXNoOChhcnIsIG1hc2spO1xuXHRcdFV0aWwucHVzaDE2KGFyciwgeCk7XG5cdFx0VXRpbC5wdXNoMTYoYXJyLCB5KTtcblx0XHRyZXR1cm4gYXJyO1xuXHR9LFxuXG5cdC8vIFRPRE8oZGlyZWN0eG1hbjEyKTogbWFrZSB0aGlzIHVuaWNvZGUgY29tcGF0aWJsZT9cblx0Y2xpZW50Q3V0VGV4dDogZnVuY3Rpb24gKHRleHQpIHtcblx0XHR2YXIgYXJyID0gWzZdOyAgLy8gbXNnLXR5cGVcblx0XHRVdGlsLnB1c2g4KGFyciwgMCk7ICAgLy8gcGFkZGluZ1xuXHRcdFV0aWwucHVzaDgoYXJyLCAwKTsgICAvLyBwYWRkaW5nXG5cdFx0VXRpbC5wdXNoOChhcnIsIDApOyAgIC8vIHBhZGRpbmdcblx0XHRVdGlsLnB1c2gzMihhcnIsIHRleHQubGVuZ3RoKTtcblx0XHR2YXIgbiA9IHRleHQubGVuZ3RoO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSB7XG5cdFx0XHRhcnIucHVzaCh0ZXh0LmNoYXJDb2RlQXQoaSkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBhcnI7XG5cdH0sXG5cblx0cGl4ZWxGb3JtYXQ6IGZ1bmN0aW9uIChicHAsIGRlcHRoLCB0cnVlX2NvbG9yKSB7XG5cdFx0dmFyIGFyciA9IFswXTsgLy8gbXNnLXR5cGVcblx0XHRVdGlsLnB1c2g4KGFyciwgMCk7ICAvLyBwYWRkaW5nXG5cdFx0VXRpbC5wdXNoOChhcnIsIDApOyAgLy8gcGFkZGluZ1xuXHRcdFV0aWwucHVzaDgoYXJyLCAwKTsgIC8vIHBhZGRpbmdcblxuXHRcdFV0aWwucHVzaDgoYXJyLCBicHAgKiA4KTsgLy8gYml0cy1wZXItcGl4ZWxcblx0XHRVdGlsLnB1c2g4KGFyciwgZGVwdGggKiA4KTsgLy8gZGVwdGhcblx0XHRVdGlsLnB1c2g4KGFyciwgMCk7ICAvLyBsaXR0bGUtZW5kaWFuXG5cdFx0VXRpbC5wdXNoOChhcnIsIHRydWVfY29sb3IgPyAxIDogMCk7ICAvLyB0cnVlLWNvbG9yXG5cblx0XHRVdGlsLnB1c2gxNihhcnIsIDI1NSk7ICAvLyByZWQtbWF4XG5cdFx0VXRpbC5wdXNoMTYoYXJyLCAyNTUpOyAgLy8gZ3JlZW4tbWF4XG5cdFx0VXRpbC5wdXNoMTYoYXJyLCAyNTUpOyAgLy8gYmx1ZS1tYXhcblx0XHRVdGlsLnB1c2g4KGFyciwgMTYpOyAgICAvLyByZWQtc2hpZnRcblx0XHRVdGlsLnB1c2g4KGFyciwgOCk7ICAgICAvLyBncmVlbi1zaGlmdFxuXHRcdFV0aWwucHVzaDgoYXJyLCAwKTsgICAgIC8vIGJsdWUtc2hpZnRcblxuXHRcdFV0aWwucHVzaDgoYXJyLCAwKTsgICAgIC8vIHBhZGRpbmdcblx0XHRVdGlsLnB1c2g4KGFyciwgMCk7ICAgICAvLyBwYWRkaW5nXG5cdFx0VXRpbC5wdXNoOChhcnIsIDApOyAgICAgLy8gcGFkZGluZ1xuXHRcdHJldHVybiBhcnI7XG5cdH0sXG5cblx0Y2xpZW50RW5jb2RpbmdzOiBmdW5jdGlvbiAoZW5jb2RpbmdzLCBsb2NhbF9jdXJzb3IsIHRydWVfY29sb3IpIHtcblx0XHR2YXIgaSwgZW5jTGlzdCA9IFtdO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGVuY29kaW5ncy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKGVuY29kaW5nc1tpXVswXSA9PT0gJ0N1cnNvcicgJiYgIWxvY2FsX2N1cnNvcikge1xuXHRcdFx0XHRkZWJ1ZygnY2xpZW50RW5jb2RpbmdzKCkgfCBza2lwcGluZyBDdXJzb3IgcHNldWRvLWVuY29kaW5nJyk7XG5cdFx0XHR9IGVsc2UgaWYgKGVuY29kaW5nc1tpXVswXSA9PT0gJ1RJR0hUJyAmJiAhdHJ1ZV9jb2xvcikge1xuXHRcdFx0XHQvLyBUT0RPOiByZW1vdmUgdGhpcyB3aGVuIHdlIGhhdmUgdGlnaHQrbm9uLXRydWUtY29sb3Jcblx0XHRcdFx0ZGVidWcoJ2NsaWVudEVuY29kaW5ncygpIHwgc2tpcHBpbmcgdGlnaHQgYXMgaXQgaXMgb25seSBzdXBwb3J0ZWQgd2l0aCB0cnVlIGNvbG9yJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbmNMaXN0LnB1c2goZW5jb2RpbmdzW2ldWzFdKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YXIgYXJyID0gWzJdOyAgLy8gbXNnLXR5cGVcblx0XHRVdGlsLnB1c2g4KGFyciwgMCk7ICAgLy8gcGFkZGluZ1xuXG5cdFx0VXRpbC5wdXNoMTYoYXJyLCBlbmNMaXN0Lmxlbmd0aCk7ICAvLyBlbmNvZGluZyBjb3VudFxuXHRcdGZvciAoaSA9IDA7IGkgPCBlbmNMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRVdGlsLnB1c2gzMihhcnIsIGVuY0xpc3RbaV0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBhcnI7XG5cdH0sXG5cblx0ZmJVcGRhdGVSZXF1ZXN0czogZnVuY3Rpb24gKGNsZWFuRGlydHksIGZiX3dpZHRoLCBmYl9oZWlnaHQpIHtcblx0XHR2YXIgYXJyID0gW107XG5cblx0XHR2YXIgY2IgPSBjbGVhbkRpcnR5LmNsZWFuQm94O1xuXHRcdHZhciB3LCBoO1xuXHRcdGlmIChjYi53ID4gMCAmJiBjYi5oID4gMCkge1xuXHRcdFx0dyA9IHR5cGVvZiBjYi53ID09PSAndW5kZWZpbmVkJyA/IGZiX3dpZHRoIDogY2Iudztcblx0XHRcdGggPSB0eXBlb2YgY2IuaCA9PT0gJ3VuZGVmaW5lZCcgPyBmYl9oZWlnaHQgOiBjYi5oO1xuXHRcdFx0Ly8gUmVxdWVzdCBpbmNyZW1lbnRhbCBmb3IgY2xlYW4gYm94XG5cdFx0XHRhcnIgPSBhcnIuY29uY2F0KFJGQi5tZXNzYWdlcy5mYlVwZGF0ZVJlcXVlc3QoMSwgY2IueCwgY2IueSwgdywgaCkpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2xlYW5EaXJ0eS5kaXJ0eUJveGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZGIgPSBjbGVhbkRpcnR5LmRpcnR5Qm94ZXNbaV07XG5cdFx0XHQvLyBGb3JjZSBhbGwgKG5vbi1pbmNyZW1lbnRhbCkgZm9yIGRpcnR5IGJveFxuXHRcdFx0dyA9IHR5cGVvZiBkYi53ID09PSAndW5kZWZpbmVkJyA/IGZiX3dpZHRoIDogZGIudztcblx0XHRcdGggPSB0eXBlb2YgZGIuaCA9PT0gJ3VuZGVmaW5lZCcgPyBmYl9oZWlnaHQgOiBkYi5oO1xuXHRcdFx0YXJyID0gYXJyLmNvbmNhdChSRkIubWVzc2FnZXMuZmJVcGRhdGVSZXF1ZXN0KDAsIGRiLngsIGRiLnksIHcsIGgpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJyO1xuXHR9LFxuXG5cdGZiVXBkYXRlUmVxdWVzdDogZnVuY3Rpb24gKGluY3JlbWVudGFsLCB4LCB5LCB3LCBoKSB7XG5cdFx0aWYgKHR5cGVvZih4KSA9PT0gJ3VuZGVmaW5lZCcpIHsgeCA9IDA7IH1cblx0XHRpZiAodHlwZW9mKHkpID09PSAndW5kZWZpbmVkJykgeyB5ID0gMDsgfVxuXG5cdFx0dmFyIGFyciA9IFszXTsgIC8vIG1zZy10eXBlXG5cdFx0VXRpbC5wdXNoOChhcnIsIGluY3JlbWVudGFsKTtcblx0XHRVdGlsLnB1c2gxNihhcnIsIHgpO1xuXHRcdFV0aWwucHVzaDE2KGFyciwgeSk7XG5cdFx0VXRpbC5wdXNoMTYoYXJyLCB3KTtcblx0XHRVdGlsLnB1c2gxNihhcnIsIGgpO1xuXG5cdFx0cmV0dXJuIGFycjtcblx0fVxufTtcblxuUkZCLmdlbkRFUyA9IGZ1bmN0aW9uIChwYXNzd29yZCwgY2hhbGxlbmdlKSB7XG5cdHZhciBwYXNzd2QgPSBbXTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwYXNzd29yZC5sZW5ndGg7IGkrKykge1xuXHRcdHBhc3N3ZC5wdXNoKHBhc3N3b3JkLmNoYXJDb2RlQXQoaSkpO1xuXHR9XG5cdHJldHVybiAobmV3IERFUyhwYXNzd2QpKS5lbmNyeXB0KGNoYWxsZW5nZSk7XG59O1xuXG5SRkIuZW5jb2RpbmdIYW5kbGVycyA9IHtcblx0UkFXOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX0ZCVS5saW5lcyA9PT0gMCkge1xuXHRcdFx0dGhpcy5fRkJVLmxpbmVzID0gdGhpcy5fRkJVLmhlaWdodDtcblx0XHR9XG5cblx0XHR0aGlzLl9GQlUuYnl0ZXMgPSB0aGlzLl9GQlUud2lkdGggKiB0aGlzLl9mYl9CcHA7ICAvLyBhdCBsZWFzdCBhIGxpbmVcblx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ1JBVycsIHRoaXMuX0ZCVS5ieXRlcykpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0dmFyIGN1cl95ID0gdGhpcy5fRkJVLnkgKyAodGhpcy5fRkJVLmhlaWdodCAtIHRoaXMuX0ZCVS5saW5lcyk7XG5cdFx0dmFyIGN1cnJfaGVpZ2h0ID0gTWF0aC5taW4odGhpcy5fRkJVLmxpbmVzLFxuXHRcdFx0XHRcdFx0XHRcdFx0IE1hdGguZmxvb3IodGhpcy5fc29jay5yUWxlbigpIC8gKHRoaXMuX0ZCVS53aWR0aCAqIHRoaXMuX2ZiX0JwcCkpKTtcblx0XHR0aGlzLl9kaXNwbGF5LmJsaXRJbWFnZSh0aGlzLl9GQlUueCwgY3VyX3ksIHRoaXMuX0ZCVS53aWR0aCxcblx0XHRcdFx0XHRcdFx0XHRjdXJyX2hlaWdodCwgdGhpcy5fc29jay5nZXRfclEoKSxcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9zb2NrLmdldF9yUWkoKSk7XG5cdFx0dGhpcy5fc29jay5yUXNraXBCeXRlcyh0aGlzLl9GQlUud2lkdGggKiBjdXJyX2hlaWdodCAqIHRoaXMuX2ZiX0JwcCk7XG5cdFx0dGhpcy5fRkJVLmxpbmVzIC09IGN1cnJfaGVpZ2h0O1xuXG5cdFx0aWYgKHRoaXMuX0ZCVS5saW5lcyA+IDApIHtcblx0XHRcdHRoaXMuX0ZCVS5ieXRlcyA9IHRoaXMuX0ZCVS53aWR0aCAqIHRoaXMuX2ZiX0JwcDsgIC8vIEF0IGxlYXN0IGFub3RoZXIgbGluZVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9GQlUucmVjdHMtLTtcblx0XHRcdHRoaXMuX0ZCVS5ieXRlcyA9IDA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0Q09QWVJFQ1Q6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9GQlUuYnl0ZXMgPSA0O1xuXHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgnQ09QWVJFQ1QnLCA0KSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR0aGlzLl9kaXNwbGF5LnJlbmRlclFfcHVzaCh7XG5cdFx0XHQndHlwZSc6ICdjb3B5Jyxcblx0XHRcdCdvbGRfeCc6IHRoaXMuX3NvY2suclFzaGlmdDE2KCksXG5cdFx0XHQnb2xkX3knOiB0aGlzLl9zb2NrLnJRc2hpZnQxNigpLFxuXHRcdFx0J3gnOiB0aGlzLl9GQlUueCxcblx0XHRcdCd5JzogdGhpcy5fRkJVLnksXG5cdFx0XHQnd2lkdGgnOiB0aGlzLl9GQlUud2lkdGgsXG5cdFx0XHQnaGVpZ2h0JzogdGhpcy5fRkJVLmhlaWdodFxuXHRcdH0pO1xuXHRcdHRoaXMuX0ZCVS5yZWN0cy0tO1xuXHRcdHRoaXMuX0ZCVS5ieXRlcyA9IDA7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0UlJFOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGNvbG9yO1xuXHRcdGlmICh0aGlzLl9GQlUuc3VicmVjdHMgPT09IDApIHtcblx0XHRcdHRoaXMuX0ZCVS5ieXRlcyA9IDQgKyB0aGlzLl9mYl9CcHA7XG5cdFx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ1JSRScsIDQgKyB0aGlzLl9mYl9CcHApKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0dGhpcy5fRkJVLnN1YnJlY3RzID0gdGhpcy5fc29jay5yUXNoaWZ0MzIoKTtcblx0XHRcdGNvbG9yID0gdGhpcy5fc29jay5yUXNoaWZ0Qnl0ZXModGhpcy5fZmJfQnBwKTsgIC8vIEJhY2tncm91bmRcblx0XHRcdHRoaXMuX2Rpc3BsYXkuZmlsbFJlY3QodGhpcy5fRkJVLngsIHRoaXMuX0ZCVS55LCB0aGlzLl9GQlUud2lkdGgsIHRoaXMuX0ZCVS5oZWlnaHQsIGNvbG9yKTtcblx0XHR9XG5cblx0XHR3aGlsZSAodGhpcy5fRkJVLnN1YnJlY3RzID4gMCAmJiB0aGlzLl9zb2NrLnJRbGVuKCkgPj0gKHRoaXMuX2ZiX0JwcCArIDgpKSB7XG5cdFx0XHRjb2xvciA9IHRoaXMuX3NvY2suclFzaGlmdEJ5dGVzKHRoaXMuX2ZiX0JwcCk7XG5cdFx0XHR2YXIgeCA9IHRoaXMuX3NvY2suclFzaGlmdDE2KCk7XG5cdFx0XHR2YXIgeSA9IHRoaXMuX3NvY2suclFzaGlmdDE2KCk7XG5cdFx0XHR2YXIgd2lkdGggPSB0aGlzLl9zb2NrLnJRc2hpZnQxNigpO1xuXHRcdFx0dmFyIGhlaWdodCA9IHRoaXMuX3NvY2suclFzaGlmdDE2KCk7XG5cdFx0XHR0aGlzLl9kaXNwbGF5LmZpbGxSZWN0KHRoaXMuX0ZCVS54ICsgeCwgdGhpcy5fRkJVLnkgKyB5LCB3aWR0aCwgaGVpZ2h0LCBjb2xvcik7XG5cdFx0XHR0aGlzLl9GQlUuc3VicmVjdHMtLTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fRkJVLnN1YnJlY3RzID4gMCkge1xuXHRcdFx0dmFyIGNodW5rID0gTWF0aC5taW4odGhpcy5fcnJlX2NodW5rX3N6LCB0aGlzLl9GQlUuc3VicmVjdHMpO1xuXHRcdFx0dGhpcy5fRkJVLmJ5dGVzID0gKHRoaXMuX2ZiX0JwcCArIDgpICogY2h1bms7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX0ZCVS5yZWN0cy0tO1xuXHRcdFx0dGhpcy5fRkJVLmJ5dGVzID0gMDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHRIRVhUSUxFOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHJRID0gdGhpcy5fc29jay5nZXRfclEoKTtcblx0XHR2YXIgclFpID0gdGhpcy5fc29jay5nZXRfclFpKCk7XG5cblx0XHRpZiAodGhpcy5fRkJVLnRpbGVzID09PSAwKSB7XG5cdFx0XHR0aGlzLl9GQlUudGlsZXNfeCA9IE1hdGguY2VpbCh0aGlzLl9GQlUud2lkdGggLyAxNik7XG5cdFx0XHR0aGlzLl9GQlUudGlsZXNfeSA9IE1hdGguY2VpbCh0aGlzLl9GQlUuaGVpZ2h0IC8gMTYpO1xuXHRcdFx0dGhpcy5fRkJVLnRvdGFsX3RpbGVzID0gdGhpcy5fRkJVLnRpbGVzX3ggKiB0aGlzLl9GQlUudGlsZXNfeTtcblx0XHRcdHRoaXMuX0ZCVS50aWxlcyA9IHRoaXMuX0ZCVS50b3RhbF90aWxlcztcblx0XHR9XG5cblx0XHR3aGlsZSAodGhpcy5fRkJVLnRpbGVzID4gMCkge1xuXHRcdFx0dGhpcy5fRkJVLmJ5dGVzID0gMTtcblx0XHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgnSEVYVElMRSBzdWJlbmNvZGluZycsIHRoaXMuX0ZCVS5ieXRlcykpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHR2YXIgc3ViZW5jb2RpbmcgPSByUVtyUWldOyAgLy8gUGVla1xuXHRcdFx0aWYgKHN1YmVuY29kaW5nID4gMzApIHsgIC8vIFJhd1xuXHRcdFx0XHR0aGlzLl9mYWlsKCdEaXNjb25uZWN0ZWQ6IGlsbGVnYWwgaGV4dGlsZSBzdWJlbmNvZGluZyAnICsgc3ViZW5jb2RpbmcpO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBzdWJyZWN0cyA9IDA7XG5cdFx0XHR2YXIgY3Vycl90aWxlID0gdGhpcy5fRkJVLnRvdGFsX3RpbGVzIC0gdGhpcy5fRkJVLnRpbGVzO1xuXHRcdFx0dmFyIHRpbGVfeCA9IGN1cnJfdGlsZSAlIHRoaXMuX0ZCVS50aWxlc194O1xuXHRcdFx0dmFyIHRpbGVfeSA9IE1hdGguZmxvb3IoY3Vycl90aWxlIC8gdGhpcy5fRkJVLnRpbGVzX3gpO1xuXHRcdFx0dmFyIHggPSB0aGlzLl9GQlUueCArIHRpbGVfeCAqIDE2O1xuXHRcdFx0dmFyIHkgPSB0aGlzLl9GQlUueSArIHRpbGVfeSAqIDE2O1xuXHRcdFx0dmFyIHcgPSBNYXRoLm1pbigxNiwgKHRoaXMuX0ZCVS54ICsgdGhpcy5fRkJVLndpZHRoKSAtIHgpO1xuXHRcdFx0dmFyIGggPSBNYXRoLm1pbigxNiwgKHRoaXMuX0ZCVS55ICsgdGhpcy5fRkJVLmhlaWdodCkgLSB5KTtcblxuXHRcdFx0Ly8gRmlndXJlIG91dCBob3cgbXVjaCB3ZSBhcmUgZXhwZWN0aW5nXG5cdFx0XHRpZiAoc3ViZW5jb2RpbmcgJiAweDAxKSB7ICAvLyBSYXdcblx0XHRcdFx0dGhpcy5fRkJVLmJ5dGVzICs9IHcgKiBoICogdGhpcy5fZmJfQnBwO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHN1YmVuY29kaW5nICYgMHgwMikgeyAgLy8gQmFja2dyb3VuZFxuXHRcdFx0XHRcdHRoaXMuX0ZCVS5ieXRlcyArPSB0aGlzLl9mYl9CcHA7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHN1YmVuY29kaW5nICYgMHgwNCkgeyAgLy8gRm9yZWdyb3VuZFxuXHRcdFx0XHRcdHRoaXMuX0ZCVS5ieXRlcyArPSB0aGlzLl9mYl9CcHA7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHN1YmVuY29kaW5nICYgMHgwOCkgeyAgLy8gQW55U3VicmVjdHNcblx0XHRcdFx0XHR0aGlzLl9GQlUuYnl0ZXMrKzsgIC8vIFNpbmNlIHdlIGFyZW4ndCBzaGlmdGluZyBpdCBvZmZcblx0XHRcdFx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ2hleHRpbGUgc3VicmVjdHMgaGVhZGVyJywgdGhpcy5fRkJVLmJ5dGVzKSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdFx0XHRzdWJyZWN0cyA9IHJRW3JRaSArIHRoaXMuX0ZCVS5ieXRlcyAtIDFdOyAgLy8gUGVla1xuXHRcdFx0XHRcdGlmIChzdWJlbmNvZGluZyAmIDB4MTApIHsgIC8vIFN1YnJlY3RzQ29sb3VyZWRcblx0XHRcdFx0XHRcdHRoaXMuX0ZCVS5ieXRlcyArPSBzdWJyZWN0cyAqICh0aGlzLl9mYl9CcHAgKyAyKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5fRkJVLmJ5dGVzICs9IHN1YnJlY3RzICogMjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdoZXh0aWxlJywgdGhpcy5fRkJVLmJ5dGVzKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdFx0Ly8gV2Uga25vdyB0aGUgZW5jb2RpbmcgYW5kIGhhdmUgYSB3aG9sZSB0aWxlXG5cdFx0XHR0aGlzLl9GQlUuc3ViZW5jb2RpbmcgPSByUVtyUWldO1xuXHRcdFx0clFpKys7XG5cdFx0XHRpZiAodGhpcy5fRkJVLnN1YmVuY29kaW5nID09PSAwKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9GQlUubGFzdHN1YmVuY29kaW5nICYgMHgwMSkge1xuXHRcdFx0XHRcdC8vIFdlaXJkOiBpZ25vcmUgYmxhbmtzIGFyZSBSQVdcblx0XHRcdFx0XHRkZWJ1ZygnSEVYVElMRSgpIHwgaWdub3JpbmcgYmxhbmsgYWZ0ZXIgUkFXJyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fZGlzcGxheS5maWxsUmVjdCh4LCB5LCB3LCBoLCB0aGlzLl9GQlUuYmFja2dyb3VuZCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAodGhpcy5fRkJVLnN1YmVuY29kaW5nICYgMHgwMSkgeyAgLy8gUmF3XG5cdFx0XHRcdHRoaXMuX2Rpc3BsYXkuYmxpdEltYWdlKHgsIHksIHcsIGgsIHJRLCByUWkpO1xuXHRcdFx0XHRyUWkgKz0gdGhpcy5fRkJVLmJ5dGVzIC0gMTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0aGlzLl9GQlUuc3ViZW5jb2RpbmcgJiAweDAyKSB7ICAvLyBCYWNrZ3JvdW5kXG5cdFx0XHRcdFx0dGhpcy5fRkJVLmJhY2tncm91bmQgPSByUS5zbGljZShyUWksIHJRaSArIHRoaXMuX2ZiX0JwcCk7XG5cdFx0XHRcdFx0clFpICs9IHRoaXMuX2ZiX0JwcDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy5fRkJVLnN1YmVuY29kaW5nICYgMHgwNCkgeyAgLy8gRm9yZWdyb3VuZFxuXHRcdFx0XHRcdHRoaXMuX0ZCVS5mb3JlZ3JvdW5kID0gclEuc2xpY2UoclFpLCByUWkgKyB0aGlzLl9mYl9CcHApO1xuXHRcdFx0XHRcdHJRaSArPSB0aGlzLl9mYl9CcHA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl9kaXNwbGF5LnN0YXJ0VGlsZSh4LCB5LCB3LCBoLCB0aGlzLl9GQlUuYmFja2dyb3VuZCk7XG5cdFx0XHRcdGlmICh0aGlzLl9GQlUuc3ViZW5jb2RpbmcgJiAweDA4KSB7ICAvLyBBbnlTdWJyZWN0c1xuXHRcdFx0XHRcdHN1YnJlY3RzID0gclFbclFpXTtcblx0XHRcdFx0XHRyUWkrKztcblxuXHRcdFx0XHRcdGZvciAodmFyIHMgPSAwOyBzIDwgc3VicmVjdHM7IHMrKykge1xuXHRcdFx0XHRcdFx0dmFyIGNvbG9yO1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuX0ZCVS5zdWJlbmNvZGluZyAmIDB4MTApIHsgIC8vIFN1YnJlY3RzQ29sb3VyZWRcblx0XHRcdFx0XHRcdFx0Y29sb3IgPSByUS5zbGljZShyUWksIHJRaSArIHRoaXMuX2ZiX0JwcCk7XG5cdFx0XHRcdFx0XHRcdHJRaSArPSB0aGlzLl9mYl9CcHA7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRjb2xvciA9IHRoaXMuX0ZCVS5mb3JlZ3JvdW5kO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dmFyIHh5ID0gclFbclFpXTtcblx0XHRcdFx0XHRcdHJRaSsrO1xuXHRcdFx0XHRcdFx0dmFyIHN4ID0gKHh5ID4+IDQpO1xuXHRcdFx0XHRcdFx0dmFyIHN5ID0gKHh5ICYgMHgwZik7XG5cblx0XHRcdFx0XHRcdHZhciB3aCA9IHJRW3JRaV07XG5cdFx0XHRcdFx0XHRyUWkrKztcblx0XHRcdFx0XHRcdHZhciBzdyA9ICh3aCA+PiA0KSArIDE7XG5cdFx0XHRcdFx0XHR2YXIgc2ggPSAod2ggJiAweDBmKSArIDE7XG5cblx0XHRcdFx0XHRcdHRoaXMuX2Rpc3BsYXkuc3ViVGlsZShzeCwgc3ksIHN3LCBzaCwgY29sb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl9kaXNwbGF5LmZpbmlzaFRpbGUoKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX3NvY2suc2V0X3JRaShyUWkpO1xuXHRcdFx0dGhpcy5fRkJVLmxhc3RzdWJlbmNvZGluZyA9IHRoaXMuX0ZCVS5zdWJlbmNvZGluZztcblx0XHRcdHRoaXMuX0ZCVS5ieXRlcyA9IDA7XG5cdFx0XHR0aGlzLl9GQlUudGlsZXMtLTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fRkJVLnRpbGVzID09PSAwKSB7XG5cdFx0XHR0aGlzLl9GQlUucmVjdHMtLTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHRnZXRUaWdodENMZW5ndGg6IGZ1bmN0aW9uIChhcnIpIHtcblx0XHR2YXIgaGVhZGVyID0gMSwgZGF0YSA9IDA7XG5cdFx0ZGF0YSArPSBhcnJbMF0gJiAweDdmO1xuXHRcdGlmIChhcnJbMF0gJiAweDgwKSB7XG5cdFx0XHRoZWFkZXIrKztcblx0XHRcdGRhdGEgKz0gKGFyclsxXSAmIDB4N2YpIDw8IDc7XG5cdFx0XHRpZiAoYXJyWzFdICYgMHg4MCkge1xuXHRcdFx0XHRoZWFkZXIrKztcblx0XHRcdFx0ZGF0YSArPSBhcnJbMl0gPDwgMTQ7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBbaGVhZGVyLCBkYXRhXTtcblx0fSxcblxuXHRkaXNwbGF5X3RpZ2h0OiBmdW5jdGlvbiAoaXNUaWdodFBORykge1xuXHRcdGlmICh0aGlzLl9mYl9kZXB0aCA9PT0gMSkge1xuXHRcdFx0dGhpcy5fZmFpbCgnVGlnaHQgcHJvdG9jb2wgaGFuZGxlciBvbmx5IGltcGxlbWVudHMgdHJ1ZSBjb2xvciBtb2RlJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fRkJVLmJ5dGVzID0gMTsgIC8vIGNvbXByZXNzaW9uLWNvbnRyb2wgYnl0ZVxuXHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgnVElHSFQgY29tcHJlc3Npb24tY29udHJvbCcsIHRoaXMuX0ZCVS5ieXRlcykpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHQvLyB2YXIgY2hlY2tzdW0gPSBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdC8vIFx0dmFyIHN1bSA9IDA7XG5cdFx0Ly8gXHRmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHQvLyBcdFx0c3VtICs9IGRhdGFbaV07XG5cdFx0Ly8gXHRcdGlmIChzdW0gPiA2NTUzNikgeyBzdW0gLT0gNjU1MzY7IH1cblx0XHQvLyBcdH1cblx0XHQvLyBcdHJldHVybiBzdW07XG5cdFx0Ly8gfTtcblxuXHRcdHZhciByZXNldFN0cmVhbXMgPSAwO1xuXHRcdHZhciBzdHJlYW1JZCA9IC0xO1xuXHRcdHZhciBkZWNvbXByZXNzID0gZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG5cdFx0XHRcdGlmICgocmVzZXRTdHJlYW1zID4+IGkpICYgMSkge1xuXHRcdFx0XHRcdHRoaXMuX0ZCVS56bGlic1tpXS5yZXNldCgpO1xuXHRcdFx0XHRcdGRlYnVnKCdkaXNwbGF5X3RpZ2h0KCkgfCByZXNldCB6bGliIHN0cmVhbSAnICsgaSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dmFyIHVuY29tcHJlc3NlZCA9IHRoaXMuX0ZCVS56bGlic1tzdHJlYW1JZF0udW5jb21wcmVzcyhkYXRhLCAwKTtcblx0XHRcdGlmICh1bmNvbXByZXNzZWQuc3RhdHVzICE9PSAwKSB7XG5cdFx0XHRcdGRlYnVnZXJyb3IoJ2Rpc3BsYXlfdGlnaHQoKSB8IGludmFsaWQgZGF0YSBpbiB6bGliIHN0cmVhbScpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdW5jb21wcmVzc2VkLmRhdGE7XG5cdFx0fS5iaW5kKHRoaXMpO1xuXG5cdFx0dmFyIGluZGV4ZWRUb1JHQiA9IGZ1bmN0aW9uIChkYXRhLCBudW1Db2xvcnMsIHBhbGV0dGUsIHdpZHRoLCBoZWlnaHQpIHtcblx0XHRcdC8vIENvbnZlcnQgaW5kZXhlZCAocGFsZXR0ZSBiYXNlZCkgaW1hZ2UgZGF0YSB0byBSR0Jcblx0XHRcdC8vIFRPRE86IHJlZHVjZSBudW1iZXIgb2YgY2FsY3VsYXRpb25zIGluc2lkZSBsb29wXG5cdFx0XHR2YXIgZGVzdCA9IFtdO1xuXHRcdFx0dmFyIHgsIHksIGRwLCBzcDtcblx0XHRcdGlmIChudW1Db2xvcnMgPT09IDIpIHtcblx0XHRcdFx0dmFyIHcgPSBNYXRoLmZsb29yKCh3aWR0aCArIDcpIC8gOCk7XG5cdFx0XHRcdHZhciB3MSA9IE1hdGguZmxvb3Iod2lkdGggLyA4KTtcblxuXHRcdFx0XHRmb3IgKHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcblx0XHRcdFx0XHR2YXIgYjtcblx0XHRcdFx0XHRmb3IgKHggPSAwOyB4IDwgdzE7IHgrKykge1xuXHRcdFx0XHRcdFx0Zm9yIChiID0gNzsgYiA+PSAwOyBiLS0pIHtcblx0XHRcdFx0XHRcdFx0ZHAgPSAoeSAqIHdpZHRoICsgeCAqIDggKyA3IC0gYikgKiAzO1xuXHRcdFx0XHRcdFx0XHRzcCA9IChkYXRhW3kgKiB3ICsgeF0gPj4gYiAmIDEpICogMztcblx0XHRcdFx0XHRcdFx0ZGVzdFtkcF0gPSBwYWxldHRlW3NwXTtcblx0XHRcdFx0XHRcdFx0ZGVzdFtkcCArIDFdID0gcGFsZXR0ZVtzcCArIDFdO1xuXHRcdFx0XHRcdFx0XHRkZXN0W2RwICsgMl0gPSBwYWxldHRlW3NwICsgMl07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yIChiID0gNzsgYiA+PSA4IC0gd2lkdGggJSA4OyBiLS0pIHtcblx0XHRcdFx0XHRcdGRwID0gKHkgKiB3aWR0aCArIHggKiA4ICsgNyAtIGIpICogMztcblx0XHRcdFx0XHRcdHNwID0gKGRhdGFbeSAqIHcgKyB4XSA+PiBiICYgMSkgKiAzO1xuXHRcdFx0XHRcdFx0ZGVzdFtkcF0gPSBwYWxldHRlW3NwXTtcblx0XHRcdFx0XHRcdGRlc3RbZHAgKyAxXSA9IHBhbGV0dGVbc3AgKyAxXTtcblx0XHRcdFx0XHRcdGRlc3RbZHAgKyAyXSA9IHBhbGV0dGVbc3AgKyAyXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvciAoeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKykge1xuXHRcdFx0XHRcdGZvciAoeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XG5cdFx0XHRcdFx0XHRkcCA9ICh5ICogd2lkdGggKyB4KSAqIDM7XG5cdFx0XHRcdFx0XHRzcCA9IGRhdGFbeSAqIHdpZHRoICsgeF0gKiAzO1xuXHRcdFx0XHRcdFx0ZGVzdFtkcF0gPSBwYWxldHRlW3NwXTtcblx0XHRcdFx0XHRcdGRlc3RbZHAgKyAxXSA9IHBhbGV0dGVbc3AgKyAxXTtcblx0XHRcdFx0XHRcdGRlc3RbZHAgKyAyXSA9IHBhbGV0dGVbc3AgKyAyXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGRlc3Q7XG5cdFx0fS5iaW5kKHRoaXMpO1xuXG5cdFx0dmFyIHJRID0gdGhpcy5fc29jay5nZXRfclEoKTtcblx0XHR2YXIgclFpID0gdGhpcy5fc29jay5nZXRfclFpKCk7XG5cdFx0dmFyIGNtb2RlLCBjbGVuZ3RoLCBkYXRhO1xuXG5cdFx0dmFyIGhhbmRsZVBhbGV0dGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgbnVtQ29sb3JzID0gclFbclFpICsgMl0gKyAxO1xuXHRcdFx0dmFyIHBhbGV0dGVTaXplID0gbnVtQ29sb3JzICogdGhpcy5fZmJfZGVwdGg7XG5cdFx0XHR0aGlzLl9GQlUuYnl0ZXMgKz0gcGFsZXR0ZVNpemU7XG5cdFx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ1RJR0hUIHBhbGV0dGUgJyArIGNtb2RlLCB0aGlzLl9GQlUuYnl0ZXMpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0XHR2YXIgYnBwID0gKG51bUNvbG9ycyA8PSAyKSA/IDEgOiA4O1xuXHRcdFx0dmFyIHJvd1NpemUgPSBNYXRoLmZsb29yKCh0aGlzLl9GQlUud2lkdGggKiBicHAgKyA3KSAvIDgpO1xuXHRcdFx0dmFyIHJhdyA9IGZhbHNlO1xuXHRcdFx0aWYgKHJvd1NpemUgKiB0aGlzLl9GQlUuaGVpZ2h0IDwgMTIpIHtcblx0XHRcdFx0cmF3ID0gdHJ1ZTtcblx0XHRcdFx0Y2xlbmd0aCA9IFswLCByb3dTaXplICogdGhpcy5fRkJVLmhlaWdodF07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjbGVuZ3RoID0gUkZCLmVuY29kaW5nSGFuZGxlcnMuZ2V0VGlnaHRDTGVuZ3RoKFxuXHRcdFx0XHRcdHRoaXMuX3NvY2suclFzbGljZSgzICsgcGFsZXR0ZVNpemUsIDMgKyBwYWxldHRlU2l6ZSArIDNcblx0XHRcdFx0KSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX0ZCVS5ieXRlcyArPSBjbGVuZ3RoWzBdICsgY2xlbmd0aFsxXTtcblx0XHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgnVElHSFQgJyArIGNtb2RlLCB0aGlzLl9GQlUuYnl0ZXMpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0XHQvLyBTaGlmdCBjdGwsIGZpbHRlciBpZCwgbnVtIGNvbG9ycywgcGFsZXR0ZSBlbnRyaWVzLCBhbmQgY2xlbmd0aCBvZmZcblx0XHRcdHRoaXMuX3NvY2suclFza2lwQnl0ZXMoMyk7XG5cdFx0XHR2YXIgcGFsZXR0ZSA9IHRoaXMuX3NvY2suclFzaGlmdEJ5dGVzKHBhbGV0dGVTaXplKTtcblx0XHRcdHRoaXMuX3NvY2suclFza2lwQnl0ZXMoY2xlbmd0aFswXSk7XG5cblx0XHRcdGlmIChyYXcpIHtcblx0XHRcdFx0ZGF0YSA9IHRoaXMuX3NvY2suclFzaGlmdEJ5dGVzKGNsZW5ndGhbMV0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGF0YSA9IGRlY29tcHJlc3ModGhpcy5fc29jay5yUXNoaWZ0Qnl0ZXMoY2xlbmd0aFsxXSkpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb252ZXJ0IGluZGV4ZWQgKHBhbGV0dGUgYmFzZWQpIGltYWdlIGRhdGEgdG8gUkdCXG5cdFx0XHR2YXIgcmdiID0gaW5kZXhlZFRvUkdCKGRhdGEsIG51bUNvbG9ycywgcGFsZXR0ZSwgdGhpcy5fRkJVLndpZHRoLCB0aGlzLl9GQlUuaGVpZ2h0KTtcblxuXHRcdFx0dGhpcy5fZGlzcGxheS5yZW5kZXJRX3B1c2goe1xuXHRcdFx0XHQndHlwZSc6ICdibGl0UmdiJyxcblx0XHRcdFx0J2RhdGEnOiByZ2IsXG5cdFx0XHRcdCd4JzogdGhpcy5fRkJVLngsXG5cdFx0XHRcdCd5JzogdGhpcy5fRkJVLnksXG5cdFx0XHRcdCd3aWR0aCc6IHRoaXMuX0ZCVS53aWR0aCxcblx0XHRcdFx0J2hlaWdodCc6IHRoaXMuX0ZCVS5oZWlnaHRcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LmJpbmQodGhpcyk7XG5cblx0XHR2YXIgaGFuZGxlQ29weSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciByYXcgPSBmYWxzZTtcblx0XHRcdHZhciB1bmNvbXByZXNzZWRTaXplID0gdGhpcy5fRkJVLndpZHRoICogdGhpcy5fRkJVLmhlaWdodCAqIHRoaXMuX2ZiX2RlcHRoO1xuXHRcdFx0aWYgKHVuY29tcHJlc3NlZFNpemUgPCAxMikge1xuXHRcdFx0XHRyYXcgPSB0cnVlO1xuXHRcdFx0XHRjbGVuZ3RoID0gWzAsIHVuY29tcHJlc3NlZFNpemVdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2xlbmd0aCA9IFJGQi5lbmNvZGluZ0hhbmRsZXJzLmdldFRpZ2h0Q0xlbmd0aCh0aGlzLl9zb2NrLnJRc2xpY2UoMSwgNCkpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fRkJVLmJ5dGVzID0gMSArIGNsZW5ndGhbMF0gKyBjbGVuZ3RoWzFdO1xuXHRcdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdUSUdIVCAnICsgY21vZGUsIHRoaXMuX0ZCVS5ieXRlcykpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHRcdC8vIFNoaWZ0IGN0bCwgY2xlbmd0aCBvZmZcblx0XHRcdHRoaXMuX3NvY2suclFzaGlmdEJ5dGVzKDEgKyBjbGVuZ3RoWzBdKTtcblxuXHRcdFx0aWYgKHJhdykge1xuXHRcdFx0XHRkYXRhID0gdGhpcy5fc29jay5yUXNoaWZ0Qnl0ZXMoY2xlbmd0aFsxXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkYXRhID0gZGVjb21wcmVzcyh0aGlzLl9zb2NrLnJRc2hpZnRCeXRlcyhjbGVuZ3RoWzFdKSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX2Rpc3BsYXkucmVuZGVyUV9wdXNoKHtcblx0XHRcdFx0J3R5cGUnOiAnYmxpdFJnYicsXG5cdFx0XHRcdCdkYXRhJzogZGF0YSxcblx0XHRcdFx0J3gnOiB0aGlzLl9GQlUueCxcblx0XHRcdFx0J3knOiB0aGlzLl9GQlUueSxcblx0XHRcdFx0J3dpZHRoJzogdGhpcy5fRkJVLndpZHRoLFxuXHRcdFx0XHQnaGVpZ2h0JzogdGhpcy5fRkJVLmhlaWdodFxuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0uYmluZCh0aGlzKTtcblxuXHRcdHZhciBjdGwgPSB0aGlzLl9zb2NrLnJRcGVlazgoKTtcblxuXHRcdC8vIEtlZXAgdGlnaHQgcmVzZXQgYml0c1xuXHRcdHJlc2V0U3RyZWFtcyA9IGN0bCAmIDB4RjtcblxuXHRcdC8vIEZpZ3VyZSBvdXQgZmlsdGVyXG5cdFx0Y3RsID0gY3RsID4+IDQ7XG5cdFx0c3RyZWFtSWQgPSBjdGwgJiAweDM7XG5cblx0XHRpZiAoY3RsID09PSAweDA4KSAgICAgIHsgY21vZGUgPSAnZmlsbCc7IH1cblx0XHRlbHNlIGlmIChjdGwgPT09IDB4MDkpIHsgY21vZGUgPSAnanBlZyc7IH1cblx0XHRlbHNlIGlmIChjdGwgPT09IDB4MEEpIHsgY21vZGUgPSAncG5nJzsgfVxuXHRcdGVsc2UgaWYgKGN0bCAmIDB4MDQpICAgeyBjbW9kZSA9ICdmaWx0ZXInOyB9XG5cdFx0ZWxzZSBpZiAoY3RsIDwgMHgwNCkgICB7IGNtb2RlID0gJ2NvcHknOyB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fZmFpbCgnSWxsZWdhbCB0aWdodCBjb21wcmVzc2lvbiByZWNlaXZlZCwgY3RsOiAnICsgY3RsKTtcblx0XHR9XG5cblx0XHRpZiAoaXNUaWdodFBORyAmJiAoY21vZGUgPT09ICdmaWx0ZXInIHx8IGNtb2RlID09PSAnY29weScpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fZmFpbCgnZmlsdGVyL2NvcHkgcmVjZWl2ZWQgaW4gdGlnaHRQTkcgbW9kZScpO1xuXHRcdH1cblxuXHRcdHN3aXRjaCAoY21vZGUpIHtcblx0XHRcdC8vIGZpbGwgdXNlIGZiX2RlcHRoIGJlY2F1c2UgVFBJWEVMcyBkcm9wIHRoZSBwYWRkaW5nIGJ5dGVcblx0XHRcdGNhc2UgJ2ZpbGwnOiAgLy8gVFBJWEVMXG5cdFx0XHRcdHRoaXMuX0ZCVS5ieXRlcyArPSB0aGlzLl9mYl9kZXB0aDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdqcGVnJzogIC8vIG1heCBjbGVuZ3RoXG5cdFx0XHRcdHRoaXMuX0ZCVS5ieXRlcyArPSAzO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3BuZyc6ICAvLyBtYXggY2xlbmd0aFxuXHRcdFx0XHR0aGlzLl9GQlUuYnl0ZXMgKz0gMztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdmaWx0ZXInOiAgLy8gZmlsdGVyIGlkICsgbnVtIGNvbG9ycyBpZiBwYWxldHRlXG5cdFx0XHRcdHRoaXMuX0ZCVS5ieXRlcyArPSAyO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2NvcHknOlxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ1RJR0hUICcgKyBjbW9kZSwgdGhpcy5fRkJVLmJ5dGVzKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdC8vIERldGVybWluZSBGQlUuYnl0ZXNcblx0XHRzd2l0Y2ggKGNtb2RlKSB7XG5cdFx0XHRjYXNlICdmaWxsJzpcblx0XHRcdFx0dGhpcy5fc29jay5yUXNraXA4KCk7ICAvLyBzaGlmdCBvZmYgY3RsXG5cdFx0XHRcdHZhciBjb2xvciA9IHRoaXMuX3NvY2suclFzaGlmdEJ5dGVzKHRoaXMuX2ZiX2RlcHRoKTtcblx0XHRcdFx0dGhpcy5fZGlzcGxheS5yZW5kZXJRX3B1c2goe1xuXHRcdFx0XHRcdCd0eXBlJzogJ2ZpbGwnLFxuXHRcdFx0XHRcdCd4JzogdGhpcy5fRkJVLngsXG5cdFx0XHRcdFx0J3knOiB0aGlzLl9GQlUueSxcblx0XHRcdFx0XHQnd2lkdGgnOiB0aGlzLl9GQlUud2lkdGgsXG5cdFx0XHRcdFx0J2hlaWdodCc6IHRoaXMuX0ZCVS5oZWlnaHQsXG5cdFx0XHRcdFx0J2NvbG9yJzogW2NvbG9yWzJdLCBjb2xvclsxXSwgY29sb3JbMF1dXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3BuZyc6XG5cdFx0XHRjYXNlICdqcGVnJzpcblx0XHRcdFx0Y2xlbmd0aCA9IFJGQi5lbmNvZGluZ0hhbmRsZXJzLmdldFRpZ2h0Q0xlbmd0aCh0aGlzLl9zb2NrLnJRc2xpY2UoMSwgNCkpO1xuXHRcdFx0XHR0aGlzLl9GQlUuYnl0ZXMgPSAxICsgY2xlbmd0aFswXSArIGNsZW5ndGhbMV07ICAvLyBjdGwgKyBjbGVuZ3RoIHNpemUgKyBqcGVnLWRhdGFcblx0XHRcdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdUSUdIVCAnICsgY21vZGUsIHRoaXMuX0ZCVS5ieXRlcykpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHRcdFx0Ly8gV2UgaGF2ZSBldmVyeXRoaW5nLCByZW5kZXIgaXRcblx0XHRcdFx0dGhpcy5fc29jay5yUXNraXBCeXRlcygxICsgY2xlbmd0aFswXSk7ICAvLyBzaGlmdCBvZmYgY2x0ICsgY29tcGFjdCBsZW5ndGhcblx0XHRcdFx0dmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuXHRcdFx0XHRpbWcuc3JjID0gJ2RhdGE6IGltYWdlLycgKyBjbW9kZSArXG5cdFx0XHRcdFx0ZXh0cmFjdF9kYXRhX3VyaSh0aGlzLl9zb2NrLnJRc2hpZnRCeXRlcyhjbGVuZ3RoWzFdKSk7XG5cdFx0XHRcdHRoaXMuX2Rpc3BsYXkucmVuZGVyUV9wdXNoKHtcblx0XHRcdFx0XHQndHlwZSc6ICdpbWcnLFxuXHRcdFx0XHRcdCdpbWcnOiBpbWcsXG5cdFx0XHRcdFx0J3gnOiB0aGlzLl9GQlUueCxcblx0XHRcdFx0XHQneSc6IHRoaXMuX0ZCVS55XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRpbWcgPSBudWxsO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2ZpbHRlcic6XG5cdFx0XHRcdHZhciBmaWx0ZXJJZCA9IHJRW3JRaSArIDFdO1xuXHRcdFx0XHRpZiAoZmlsdGVySWQgPT09IDEpIHtcblx0XHRcdFx0XHRpZiAoIWhhbmRsZVBhbGV0dGUoKSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBGaWx0ZXIgMCwgQ29weSBjb3VsZCBiZSB2YWxpZCBoZXJlLCBidXQgc2VydmVycyBkb24ndCBzZW5kIGl0IGFzIGFuIGV4cGxpY2l0IGZpbHRlclxuXHRcdFx0XHRcdC8vIEZpbHRlciAyLCBHcmFkaWVudCBpcyB2YWxpZCBidXQgbm90IHVzZSBpZiBqcGVnIGlzIGVuYWJsZWRcblx0XHRcdFx0XHQvLyBUT0RPKGRpcmVjdHhtYW4xMik6IHdoeSBhcmVuJ3Qgd2UganVzdCBjYWxsaW5nICdfZmFpbCcgaGVyZVxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgdGlnaHQgc3ViZW5jb2RpbmcgcmVjZWl2ZWQsIGZpbHRlcjogJyArIGZpbHRlcklkKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2NvcHknOlxuXHRcdFx0XHRpZiAoIWhhbmRsZUNvcHkoKSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cblx0XHR0aGlzLl9GQlUuYnl0ZXMgPSAwO1xuXHRcdHRoaXMuX0ZCVS5yZWN0cy0tO1xuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0VElHSFQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2VuY0hhbmRsZXJzLmRpc3BsYXlfdGlnaHQoZmFsc2UpOyB9LFxuXHRUSUdIVF9QTkc6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2VuY0hhbmRsZXJzLmRpc3BsYXlfdGlnaHQodHJ1ZSk7IH0sXG5cblx0bGFzdF9yZWN0OiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fRkJVLnJlY3RzID0gMDtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHRoYW5kbGVfRkJfcmVzaXplOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fZmJfd2lkdGggPSB0aGlzLl9GQlUud2lkdGg7XG5cdFx0dGhpcy5fZmJfaGVpZ2h0ID0gdGhpcy5fRkJVLmhlaWdodDtcblx0XHR0aGlzLl9kaXNwbGF5LnJlc2l6ZSh0aGlzLl9mYl93aWR0aCwgdGhpcy5fZmJfaGVpZ2h0KTtcblx0XHR0aGlzLl9vbkZCUmVzaXplKHRoaXMsIHRoaXMuX2ZiX3dpZHRoLCB0aGlzLl9mYl9oZWlnaHQpO1xuXHRcdHRoaXMuX3RpbWluZy5mYnVfcnRfc3RhcnQgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG5cdFx0dGhpcy5fRkJVLmJ5dGVzID0gMDtcblx0XHR0aGlzLl9GQlUucmVjdHMgLT0gMTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHRFeHRlbmRlZERlc2t0b3BTaXplOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fRkJVLmJ5dGVzID0gMTtcblx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ0V4dGVuZGVkRGVza3RvcFNpemUnLCB0aGlzLl9GQlUuYnl0ZXMpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0dGhpcy5fc3VwcG9ydHNTZXREZXNrdG9wU2l6ZSA9IHRydWU7XG5cdFx0dmFyIG51bWJlcl9vZl9zY3JlZW5zID0gdGhpcy5fc29jay5yUXBlZWs4KCk7XG5cblx0XHR0aGlzLl9GQlUuYnl0ZXMgPSA0ICsgKG51bWJlcl9vZl9zY3JlZW5zICogMTYpO1xuXHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgnRXh0ZW5kZWREZXNrdG9wU2l6ZScsIHRoaXMuX0ZCVS5ieXRlcykpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHR0aGlzLl9zb2NrLnJRc2tpcEJ5dGVzKDEpOyAgLy8gbnVtYmVyLW9mLXNjcmVlbnNcblx0XHR0aGlzLl9zb2NrLnJRc2tpcEJ5dGVzKDMpOyAgLy8gcGFkZGluZ1xuXG5cdFx0Zm9yICh2YXIgaT0wOyBpPG51bWJlcl9vZl9zY3JlZW5zOyBpICs9IDEpIHtcblx0XHRcdC8vIFNhdmUgdGhlIGlkIGFuZCBmbGFncyBvZiB0aGUgZmlyc3Qgc2NyZWVuXG5cdFx0XHRpZiAoaSA9PT0gMCkge1xuXHRcdFx0XHR0aGlzLl9zY3JlZW5faWQgPSB0aGlzLl9zb2NrLnJRc2hpZnRCeXRlcyg0KTsgICAgLy8gaWRcblx0XHRcdFx0dGhpcy5fc29jay5yUXNraXBCeXRlcygyKTsgICAgICAgICAgICAgICAgICAgICAgIC8vIHgtcG9zaXRpb25cblx0XHRcdFx0dGhpcy5fc29jay5yUXNraXBCeXRlcygyKTsgICAgICAgICAgICAgICAgICAgICAgIC8vIHktcG9zaXRpb25cblx0XHRcdFx0dGhpcy5fc29jay5yUXNraXBCeXRlcygyKTsgICAgICAgICAgICAgICAgICAgICAgIC8vIHdpZHRoXG5cdFx0XHRcdHRoaXMuX3NvY2suclFza2lwQnl0ZXMoMik7ICAgICAgICAgICAgICAgICAgICAgICAvLyBoZWlnaHRcblx0XHRcdFx0dGhpcy5fc2NyZWVuX2ZsYWdzID0gdGhpcy5fc29jay5yUXNoaWZ0Qnl0ZXMoNCk7IC8vIGZsYWdzXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9zb2NrLnJRc2tpcEJ5dGVzKDE2KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKlxuXHRcdCAqIFRoZSB4LXBvc2l0aW9uIGluZGljYXRlcyB0aGUgcmVhc29uIGZvciB0aGUgY2hhbmdlOlxuXHRcdCAqXG5cdFx0ICogIDAgLSBzZXJ2ZXIgcmVzaXplZCBvbiBpdHMgb3duXG5cdFx0ICogIDEgLSB0aGlzIGNsaWVudCByZXF1ZXN0ZWQgdGhlIHJlc2l6ZVxuXHRcdCAqICAyIC0gYW5vdGhlciBjbGllbnQgcmVxdWVzdGVkIHRoZSByZXNpemVcblx0XHQgKi9cblxuXHRcdC8vIFdlIG5lZWQgdG8gaGFuZGxlIGVycm9ycyB3aGVuIHdlIHJlcXVlc3RlZCB0aGUgcmVzaXplLlxuXHRcdGlmICh0aGlzLl9GQlUueCA9PT0gMSAmJiB0aGlzLl9GQlUueSAhPT0gMCkge1xuXHRcdFx0dmFyIG1zZyA9ICcnO1xuXHRcdFx0Ly8gVGhlIHktcG9zaXRpb24gaW5kaWNhdGVzIHRoZSBzdGF0dXMgY29kZSBmcm9tIHRoZSBzZXJ2ZXJcblx0XHRcdHN3aXRjaCAodGhpcy5fRkJVLnkpIHtcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0XHRtc2cgPSAncmVzaXplIGlzIGFkbWluaXN0cmF0aXZlbHkgcHJvaGliaXRlZCc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdFx0bXNnID0gJ291dCBvZiByZXNvdXJjZXMnO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRcdG1zZyA9ICdpbnZhbGlkIHNjcmVlbiBsYXlvdXQnO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRtc2cgPSAndW5rbm93biByZWFzb24nO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0ZGVidWcoJ0V4dGVuZGVkRGVza3RvcFNpemUoKSB8IHNlcnZlciBkaWQgbm90IGFjY2VwdCB0aGUgcmVzaXplIHJlcXVlc3Q6ICVzJywgbXNnKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHRoaXMuX2VuY0hhbmRsZXJzLmhhbmRsZV9GQl9yZXNpemUoKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHREZXNrdG9wU2l6ZTogZnVuY3Rpb24gKCkge1xuXHRcdGRlYnVnKCdEZXNrdG9wU2l6ZSgpJyk7XG5cblx0XHR0aGlzLl9lbmNIYW5kbGVycy5oYW5kbGVfRkJfcmVzaXplKCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0Q3Vyc29yOiBmdW5jdGlvbiAoKSB7XG5cdFx0ZGVidWcoJ0N1cnNvcigpJyk7XG5cblx0XHR2YXIgeCA9IHRoaXMuX0ZCVS54OyAgLy8gaG90c3BvdC14XG5cdFx0dmFyIHkgPSB0aGlzLl9GQlUueTsgIC8vIGhvdHNwb3QteVxuXHRcdHZhciB3ID0gdGhpcy5fRkJVLndpZHRoO1xuXHRcdHZhciBoID0gdGhpcy5fRkJVLmhlaWdodDtcblxuXHRcdHZhciBwaXhlbHNsZW5ndGggPSB3ICogaCAqIHRoaXMuX2ZiX0JwcDtcblx0XHR2YXIgbWFza2xlbmd0aCA9IE1hdGguZmxvb3IoKHcgKyA3KSAvIDgpICogaDtcblxuXHRcdHRoaXMuX0ZCVS5ieXRlcyA9IHBpeGVsc2xlbmd0aCArIG1hc2tsZW5ndGg7XG5cdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdjdXJzb3IgZW5jb2RpbmcnLCB0aGlzLl9GQlUuYnl0ZXMpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0dGhpcy5fZGlzcGxheS5jaGFuZ2VDdXJzb3IodGhpcy5fc29jay5yUXNoaWZ0Qnl0ZXMocGl4ZWxzbGVuZ3RoKSxcblx0XHRcdFx0XHRcdFx0XHRcdCB0aGlzLl9zb2NrLnJRc2hpZnRCeXRlcyhtYXNrbGVuZ3RoKSxcblx0XHRcdFx0XHRcdFx0XHRcdCB4LCB5LCB3LCBoKTtcblxuXHRcdHRoaXMuX0ZCVS5ieXRlcyA9IDA7XG5cdFx0dGhpcy5fRkJVLnJlY3RzLS07XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHRKUEVHX3F1YWxpdHlfbG86IGZ1bmN0aW9uICgpIHtcblx0XHRkZWJ1Z2Vycm9yKCdKUEVHX3F1YWxpdHlfbG8oKSB8IHNlcnZlciBzZW50IGpwZWdfcXVhbGl0eSBwc2V1ZG8tZW5jb2RpbmcnKTtcblx0fSxcblxuXHRjb21wcmVzc19sbzogZnVuY3Rpb24gKCkge1xuXHRcdGRlYnVnZXJyb3IoJ2NvbXByZXNzX2xvKCkgfCBzZXJ2ZXIgc2VudCBjb21wcmVzcyBsZXZlbCBwc2V1ZG8tZW5jb2RpbmcnKTtcblx0fVxufTtcblxuXG4vKipcbiAqIFByaXZhdGUgQVBJLlxuICovXG5cblxuZnVuY3Rpb24gZXh0cmFjdF9kYXRhX3VyaSAoYXJyKSB7XG5cdHJldHVybiAnO2Jhc2U2NCwnICsgQmFzZTY0LmVuY29kZShhcnIpO1xufVxuIiwiLypcbiAqIHRpbmZsYXRlICAtICB0aW55IGluZmxhdGVcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMDMgYnkgSm9lcmdlbiBJYnNlbiAvIEppYnpcbiAqIEFsbCBSaWdodHMgUmVzZXJ2ZWRcbiAqXG4gKiBodHRwOi8vd3d3Lmlic2Vuc29mdHdhcmUuY29tL1xuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcHJvdmlkZWQgJ2FzLWlzJywgd2l0aG91dCBhbnkgZXhwcmVzc1xuICogb3IgaW1wbGllZCB3YXJyYW50eS4gIEluIG5vIGV2ZW50IHdpbGwgdGhlIGF1dGhvcnMgYmVcbiAqIGhlbGQgbGlhYmxlIGZvciBhbnkgZGFtYWdlcyBhcmlzaW5nIGZyb20gdGhlIHVzZSBvZlxuICogdGhpcyBzb2Z0d2FyZS5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gYW55b25lIHRvIHVzZSB0aGlzIHNvZnR3YXJlXG4gKiBmb3IgYW55IHB1cnBvc2UsIGluY2x1ZGluZyBjb21tZXJjaWFsIGFwcGxpY2F0aW9ucyxcbiAqIGFuZCB0byBhbHRlciBpdCBhbmQgcmVkaXN0cmlidXRlIGl0IGZyZWVseSwgc3ViamVjdCB0b1xuICogdGhlIGZvbGxvd2luZyByZXN0cmljdGlvbnM6XG4gKlxuICogMS4gVGhlIG9yaWdpbiBvZiB0aGlzIHNvZnR3YXJlIG11c3Qgbm90IGJlXG4gKiAgICBtaXNyZXByZXNlbnRlZDsgeW91IG11c3Qgbm90IGNsYWltIHRoYXQgeW91XG4gKiAgICB3cm90ZSB0aGUgb3JpZ2luYWwgc29mdHdhcmUuIElmIHlvdSB1c2UgdGhpc1xuICogICAgc29mdHdhcmUgaW4gYSBwcm9kdWN0LCBhbiBhY2tub3dsZWRnbWVudCBpblxuICogICAgdGhlIHByb2R1Y3QgZG9jdW1lbnRhdGlvbiB3b3VsZCBiZSBhcHByZWNpYXRlZFxuICogICAgYnV0IGlzIG5vdCByZXF1aXJlZC5cbiAqXG4gKiAyLiBBbHRlcmVkIHNvdXJjZSB2ZXJzaW9ucyBtdXN0IGJlIHBsYWlubHkgbWFya2VkXG4gKiAgICBhcyBzdWNoLCBhbmQgbXVzdCBub3QgYmUgbWlzcmVwcmVzZW50ZWQgYXNcbiAqICAgIGJlaW5nIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS5cbiAqXG4gKiAzLiBUaGlzIG5vdGljZSBtYXkgbm90IGJlIHJlbW92ZWQgb3IgYWx0ZXJlZCBmcm9tXG4gKiAgICBhbnkgc291cmNlIGRpc3RyaWJ1dGlvbi5cbiAqL1xuXG4vKlxuICogdGluZmxhdGUgamF2YXNjcmlwdCBwb3J0IGJ5IEVyaWsgTW9sbGVyIGluIE1heSAyMDExLlxuICogZW1vbGxlckBvcGVyYS5jb21cbiAqXG4gKiByZWFkX2JpdHMoKSBwYXRjaGVkIGJ5IG1pa2VAaW1pZGlvLmNvbSB0byBhbGxvd1xuICogcmVhZGluZyBtb3JlIHRoZW4gOCBiaXRzIChuZWVkZWQgaW4gc29tZSB6bGliIHN0cmVhbXMpXG4gKi9cblxuXG4vKipcbiAqIEV4cG9zZSB0aGUgVElORiBjbGFzcy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBUSU5GO1xuXG5cbmZ1bmN0aW9uIFRJTkYoKSB7XG5cdHRoaXMuT0sgPSAwO1xuXHR0aGlzLkRBVEFfRVJST1IgPSAoLTMpO1xuXHR0aGlzLldJTkRPV19TSVpFID0gMzI3Njg7XG5cblx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICpcblx0ICogLS0gaW50ZXJuYWwgZGF0YSBzdHJ1Y3R1cmVzIC0tICpcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0dGhpcy5UUkVFID0gZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy50YWJsZSA9IG5ldyBBcnJheSgxNik7ICAvKiB0YWJsZSBvZiBjb2RlIGxlbmd0aCBjb3VudHMgKi9cblx0XHR0aGlzLnRyYW5zID0gbmV3IEFycmF5KDI4OCk7IC8qIGNvZGUgLT4gc3ltYm9sIHRyYW5zbGF0aW9uIHRhYmxlICovXG5cdH07XG5cblx0dGhpcy5EQVRBID0gZnVuY3Rpb24odGhhdCkge1xuXHRcdHRoaXMuc291cmNlID0gJyc7XG5cdFx0dGhpcy5zb3VyY2VJbmRleCA9IDA7XG5cdFx0dGhpcy50YWcgPSAwO1xuXHRcdHRoaXMuYml0Y291bnQgPSAwO1xuXG5cdFx0dGhpcy5kZXN0ID0gW107XG5cblx0XHR0aGlzLmhpc3RvcnkgPSBbXTtcblxuXHRcdHRoaXMubHRyZWUgPSBuZXcgdGhhdC5UUkVFKCk7IC8qIGR5bmFtaWMgbGVuZ3RoL3N5bWJvbCB0cmVlICovXG5cdFx0dGhpcy5kdHJlZSA9IG5ldyB0aGF0LlRSRUUoKTsgLyogZHluYW1pYyBkaXN0YW5jZSB0cmVlICovXG5cdH07XG5cblx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICpcblx0ICogLS0gdW5pbml0aWFsaXplZCBnbG9iYWwgZGF0YSAoc3RhdGljIHN0cnVjdHVyZXMpIC0tICpcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0dGhpcy5zbHRyZWUgPSBuZXcgdGhpcy5UUkVFKCk7IC8qIGZpeGVkIGxlbmd0aC9zeW1ib2wgdHJlZSAqL1xuXHR0aGlzLnNkdHJlZSA9IG5ldyB0aGlzLlRSRUUoKTsgLyogZml4ZWQgZGlzdGFuY2UgdHJlZSAqL1xuXG5cdC8qIGV4dHJhIGJpdHMgYW5kIGJhc2UgdGFibGVzIGZvciBsZW5ndGggY29kZXMgKi9cblx0dGhpcy5sZW5ndGhfYml0cyA9IG5ldyBBcnJheSgzMCk7XG5cdHRoaXMubGVuZ3RoX2Jhc2UgPSBuZXcgQXJyYXkoMzApO1xuXG5cdC8qIGV4dHJhIGJpdHMgYW5kIGJhc2UgdGFibGVzIGZvciBkaXN0YW5jZSBjb2RlcyAqL1xuXHR0aGlzLmRpc3RfYml0cyA9IG5ldyBBcnJheSgzMCk7XG5cdHRoaXMuZGlzdF9iYXNlID0gbmV3IEFycmF5KDMwKTtcblxuXHQvKiBzcGVjaWFsIG9yZGVyaW5nIG9mIGNvZGUgbGVuZ3RoIGNvZGVzICovXG5cdHRoaXMuY2xjaWR4ID0gW1xuXHRcdDE2LCAxNywgMTgsIDAsIDgsIDcsIDksIDYsXG5cdFx0MTAsIDUsIDExLCA0LCAxMiwgMywgMTMsIDIsXG5cdFx0MTQsIDEsIDE1XG5cdF07XG5cblx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKlxuXHQgKiAtLSB1dGlsaXR5IGZ1bmN0aW9ucyAtLSAqXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0LyogYnVpbGQgZXh0cmEgYml0cyBhbmQgYmFzZSB0YWJsZXMgKi9cblx0dGhpcy5idWlsZF9iaXRzX2Jhc2UgPSBmdW5jdGlvbihiaXRzLCBiYXNlLCBkZWx0YSwgZmlyc3QpIHtcblx0XHR2YXIgaSwgc3VtO1xuXG5cdFx0LyogYnVpbGQgYml0cyB0YWJsZSAqL1xuXHRcdGZvciAoaSA9IDA7IGkgPCBkZWx0YTsgKytpKSB7XG5cdFx0XHRiaXRzW2ldID0gMDtcblx0XHR9XG5cdFx0Zm9yIChpID0gMDsgaSA8IDMwIC0gZGVsdGE7ICsraSkge1xuXHRcdFx0Yml0c1tpICsgZGVsdGFdID0gTWF0aC5mbG9vcihpIC8gZGVsdGEpO1xuXHRcdH1cblxuXHRcdC8qIGJ1aWxkIGJhc2UgdGFibGUgKi9cblx0XHRmb3IgKHN1bSA9IGZpcnN0LCBpID0gMDsgaSA8IDMwOyArK2kpIHtcblx0XHRcdGJhc2VbaV0gPSBzdW07XG5cdFx0XHRzdW0gKz0gMSA8PCBiaXRzW2ldO1xuXHRcdH1cblx0fTtcblxuXHQvKiBidWlsZCB0aGUgZml4ZWQgaHVmZm1hbiB0cmVlcyAqL1xuXHR0aGlzLmJ1aWxkX2ZpeGVkX3RyZWVzID0gZnVuY3Rpb24obHQsIGR0KSB7XG5cdFx0dmFyIGk7XG5cblx0XHQvKiBidWlsZCBmaXhlZCBsZW5ndGggdHJlZSAqL1xuXHRcdGZvciAoaSA9IDA7IGkgPCA3OyArK2kpIHsgbHQudGFibGVbaV0gPSAwOyB9XG5cblx0XHRsdC50YWJsZVs3XSA9IDI0O1xuXHRcdGx0LnRhYmxlWzhdID0gMTUyO1xuXHRcdGx0LnRhYmxlWzldID0gMTEyO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IDI0OyArK2kpIHsgbHQudHJhbnNbaV0gPSAyNTYgKyBpOyB9XG5cdFx0Zm9yIChpID0gMDsgaSA8IDE0NDsgKytpKSB7IGx0LnRyYW5zWzI0ICsgaV0gPSBpOyB9XG5cdFx0Zm9yIChpID0gMDsgaSA8IDg7ICsraSkgeyBsdC50cmFuc1syNCArIDE0NCArIGldID0gMjgwICsgaTsgfVxuXHRcdGZvciAoaSA9IDA7IGkgPCAxMTI7ICsraSkgeyBsdC50cmFuc1syNCArIDE0NCArIDggKyBpXSA9IDE0NCArIGk7IH1cblxuXHRcdC8qIGJ1aWxkIGZpeGVkIGRpc3RhbmNlIHRyZWUgKi9cblx0XHRmb3IgKGkgPSAwOyBpIDwgNTsgKytpKSB7IGR0LnRhYmxlW2ldID0gMDsgfVxuXG5cdFx0ZHQudGFibGVbNV0gPSAzMjtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCAzMjsgKytpKSB7IGR0LnRyYW5zW2ldID0gaTsgfVxuXHR9O1xuXG5cdC8qIGdpdmVuIGFuIGFycmF5IG9mIGNvZGUgbGVuZ3RocywgYnVpbGQgYSB0cmVlICovXG5cdHRoaXMuYnVpbGRfdHJlZSA9IGZ1bmN0aW9uKHQsIGxlbmd0aHMsIGxvZmZzZXQsIG51bSkge1xuXHRcdHZhciBvZmZzID0gbmV3IEFycmF5KDE2KTtcblx0XHR2YXIgaSwgc3VtO1xuXG5cdFx0LyogY2xlYXIgY29kZSBsZW5ndGggY291bnQgdGFibGUgKi9cblx0XHRmb3IgKGkgPSAwOyBpIDwgMTY7ICsraSkgeyB0LnRhYmxlW2ldID0gMDsgfVxuXG5cdFx0Lyogc2NhbiBzeW1ib2wgbGVuZ3RocywgYW5kIHN1bSBjb2RlIGxlbmd0aCBjb3VudHMgKi9cblx0XHRmb3IgKGkgPSAwOyBpIDwgbnVtOyArK2kpIHtcblx0XHRcdHQudGFibGVbbGVuZ3Roc1tsb2Zmc2V0ICsgaV1dKys7XG5cdFx0fVxuXG5cdFx0dC50YWJsZVswXSA9IDA7XG5cblx0XHQvKiBjb21wdXRlIG9mZnNldCB0YWJsZSBmb3IgZGlzdHJpYnV0aW9uIHNvcnQgKi9cblx0XHRmb3IgKHN1bSA9IDAsIGkgPSAwOyBpIDwgMTY7ICsraSkge1xuXHRcdFx0b2Zmc1tpXSA9IHN1bTtcblx0XHRcdHN1bSArPSB0LnRhYmxlW2ldO1xuXHRcdH1cblxuXHRcdC8qIGNyZWF0ZSBjb2RlLT5zeW1ib2wgdHJhbnNsYXRpb24gdGFibGUgKHN5bWJvbHMgc29ydGVkIGJ5IGNvZGUpICovXG5cdFx0Zm9yIChpID0gMDsgaSA8IG51bTsgKytpKSB7XG5cdFx0XHRpZiAobGVuZ3Roc1tsb2Zmc2V0ICsgaV0pIHtcblx0XHRcdFx0dC50cmFuc1tvZmZzW2xlbmd0aHNbbG9mZnNldCArIGldXSsrXSA9IGk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKlxuXHQgKiAtLSBkZWNvZGUgZnVuY3Rpb25zIC0tICpcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8qIGdldCBvbmUgYml0IGZyb20gc291cmNlIHN0cmVhbSAqL1xuXHR0aGlzLmdldGJpdCA9IGZ1bmN0aW9uKGQpIHtcblx0XHR2YXIgYml0O1xuXG5cdFx0LyogY2hlY2sgaWYgdGFnIGlzIGVtcHR5ICovXG5cdFx0aWYgKCEoZC5iaXRjb3VudC0tKSkge1xuXHRcdFx0LyogbG9hZCBuZXh0IHRhZyAqL1xuXHRcdFx0ZC50YWcgPSBkLnNvdXJjZVtkLnNvdXJjZUluZGV4KytdICYgMHhmZjtcblx0XHRcdGQuYml0Y291bnQgPSA3O1xuXHRcdH1cblxuXHRcdC8qIHNoaWZ0IGJpdCBvdXQgb2YgdGFnICovXG5cdFx0Yml0ID0gZC50YWcgJiAweDAxO1xuXHRcdGQudGFnID4+PSAxO1xuXG5cdFx0cmV0dXJuIGJpdDtcblx0fTtcblxuXHR0aGlzLnJlYWRfYml0cyA9IGZ1bmN0aW9uKGQsIG51bSwgYmFzZSkge1xuXHRcdGlmICghbnVtKSB7XG5cdFx0XHRyZXR1cm4gYmFzZTtcblx0XHR9XG5cblx0XHR2YXIgcmV0ID0gcmVhZF9iaXRzX2RpcmVjdChkLnNvdXJjZSwgZC5iaXRjb3VudCwgZC50YWcsIGQuc291cmNlSW5kZXgsIG51bSk7XG5cdFx0ZC5iaXRjb3VudCA9IHJldFswXTtcblx0XHRkLnRhZyA9IHJldFsxXTtcblx0XHRkLnNvdXJjZUluZGV4ID0gcmV0WzJdO1xuXHRcdHJldHVybiByZXRbM10gKyBiYXNlO1xuXHR9O1xuXG5cdC8qIGdpdmVuIGEgZGF0YSBzdHJlYW0gYW5kIGEgdHJlZSwgZGVjb2RlIGEgc3ltYm9sICovXG5cdHRoaXMuZGVjb2RlX3N5bWJvbCA9IGZ1bmN0aW9uKGQsIHQpIHtcblx0XHR3aGlsZSAoZC5iaXRjb3VudCA8IDE2KSB7XG5cdFx0XHRkLnRhZyA9IGQudGFnIHwgKGQuc291cmNlW2Quc291cmNlSW5kZXgrK10gJiAweGZmKSA8PCBkLmJpdGNvdW50O1xuXHRcdFx0ZC5iaXRjb3VudCArPSA4O1xuXHRcdH1cblxuXHRcdHZhciBzdW0gPSAwLCBjdXIgPSAwLCBsZW4gPSAwO1xuXHRcdGRvIHtcblx0XHRcdGN1ciA9IDIgKiBjdXIgKyAoKGQudGFnICYgKDEgPDwgbGVuKSkgPj4gbGVuKTtcblxuXHRcdFx0KytsZW47XG5cblx0XHRcdHN1bSArPSB0LnRhYmxlW2xlbl07XG5cdFx0XHRjdXIgLT0gdC50YWJsZVtsZW5dO1xuXHRcdH0gd2hpbGUgKGN1ciA+PSAwKTtcblxuXHRcdGQudGFnID4+PSBsZW47XG5cdFx0ZC5iaXRjb3VudCAtPSBsZW47XG5cblx0XHRyZXR1cm4gdC50cmFuc1tzdW0gKyBjdXJdO1xuXHR9O1xuXG5cdC8qIGdpdmVuIGEgZGF0YSBzdHJlYW0sIGRlY29kZSBkeW5hbWljIHRyZWVzIGZyb20gaXQgKi9cblx0dGhpcy5kZWNvZGVfdHJlZXMgPSBmdW5jdGlvbihkLCBsdCwgZHQpIHtcblx0XHR2YXIgY29kZV90cmVlID0gbmV3IHRoaXMuVFJFRSgpO1xuXHRcdHZhciBsZW5ndGhzID0gbmV3IEFycmF5KDI4OCszMik7XG5cdFx0dmFyIGhsaXQsIGhkaXN0LCBoY2xlbjtcblx0XHR2YXIgaSwgbnVtLCBsZW5ndGg7XG5cblx0XHQvKiBnZXQgNSBiaXRzIEhMSVQgKDI1Ny0yODYpICovXG5cdFx0aGxpdCA9IHRoaXMucmVhZF9iaXRzKGQsIDUsIDI1Nyk7XG5cblx0XHQvKiBnZXQgNSBiaXRzIEhESVNUICgxLTMyKSAqL1xuXHRcdGhkaXN0ID0gdGhpcy5yZWFkX2JpdHMoZCwgNSwgMSk7XG5cblx0XHQvKiBnZXQgNCBiaXRzIEhDTEVOICg0LTE5KSAqL1xuXHRcdGhjbGVuID0gdGhpcy5yZWFkX2JpdHMoZCwgNCwgNCk7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgMTk7ICsraSkgeyBsZW5ndGhzW2ldID0gMDsgfVxuXG5cdFx0LyogcmVhZCBjb2RlIGxlbmd0aHMgZm9yIGNvZGUgbGVuZ3RoIGFscGhhYmV0ICovXG5cdFx0Zm9yIChpID0gMDsgaSA8IGhjbGVuOyArK2kpIHtcblx0XHRcdC8qIGdldCAzIGJpdHMgY29kZSBsZW5ndGggKDAtNykgKi9cblx0XHRcdHZhciBjbGVuID0gdGhpcy5yZWFkX2JpdHMoZCwgMywgMCk7XG5cblx0XHRcdGxlbmd0aHNbdGhpcy5jbGNpZHhbaV1dID0gY2xlbjtcblx0XHR9XG5cblx0XHQvKiBidWlsZCBjb2RlIGxlbmd0aCB0cmVlICovXG5cdFx0dGhpcy5idWlsZF90cmVlKGNvZGVfdHJlZSwgbGVuZ3RocywgMCwgMTkpO1xuXG5cdFx0LyogZGVjb2RlIGNvZGUgbGVuZ3RocyBmb3IgdGhlIGR5bmFtaWMgdHJlZXMgKi9cblx0XHRmb3IgKG51bSA9IDA7IG51bSA8IGhsaXQgKyBoZGlzdDspIHtcblx0XHRcdHZhciBzeW0gPSB0aGlzLmRlY29kZV9zeW1ib2woZCwgY29kZV90cmVlKTtcblxuXHRcdFx0c3dpdGNoIChzeW0pIHtcblx0XHRcdGNhc2UgMTY6XG5cdFx0XHRcdC8qIGNvcHkgcHJldmlvdXMgY29kZSBsZW5ndGggMy02IHRpbWVzIChyZWFkIDIgYml0cykgKi9cblx0XHRcdFx0e1xuXHRcdFx0XHRcdHZhciBwcmV2ID0gbGVuZ3Roc1tudW0gLSAxXTtcblx0XHRcdFx0XHRmb3IgKGxlbmd0aCA9IHRoaXMucmVhZF9iaXRzKGQsIDIsIDMpOyBsZW5ndGg7IC0tbGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRsZW5ndGhzW251bSsrXSA9IHByZXY7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAxNzpcblx0XHRcdFx0LyogcmVwZWF0IGNvZGUgbGVuZ3RoIDAgZm9yIDMtMTAgdGltZXMgKHJlYWQgMyBiaXRzKSAqL1xuXHRcdFx0XHRmb3IgKGxlbmd0aCA9IHRoaXMucmVhZF9iaXRzKGQsIDMsIDMpOyBsZW5ndGg7IC0tbGVuZ3RoKSB7XG5cdFx0XHRcdFx0bGVuZ3Roc1tudW0rK10gPSAwO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAxODpcblx0XHRcdFx0LyogcmVwZWF0IGNvZGUgbGVuZ3RoIDAgZm9yIDExLTEzOCB0aW1lcyAocmVhZCA3IGJpdHMpICovXG5cdFx0XHRcdGZvciAobGVuZ3RoID0gdGhpcy5yZWFkX2JpdHMoZCwgNywgMTEpOyBsZW5ndGg7IC0tbGVuZ3RoKSB7XG5cdFx0XHRcdFx0bGVuZ3Roc1tudW0rK10gPSAwO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0LyogdmFsdWVzIDAtMTUgcmVwcmVzZW50IHRoZSBhY3R1YWwgY29kZSBsZW5ndGhzICovXG5cdFx0XHRcdGxlbmd0aHNbbnVtKytdID0gc3ltO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKiBidWlsZCBkeW5hbWljIHRyZWVzICovXG5cdFx0dGhpcy5idWlsZF90cmVlKGx0LCBsZW5ndGhzLCAwLCBobGl0KTtcblx0XHR0aGlzLmJ1aWxkX3RyZWUoZHQsIGxlbmd0aHMsIGhsaXQsIGhkaXN0KTtcblx0fTtcblxuXHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqXG5cdCAqIC0tIGJsb2NrIGluZmxhdGUgZnVuY3Rpb25zIC0tICpcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvKiBnaXZlbiBhIHN0cmVhbSBhbmQgdHdvIHRyZWVzLCBpbmZsYXRlIGEgYmxvY2sgb2YgZGF0YSAqL1xuXHR0aGlzLmluZmxhdGVfYmxvY2tfZGF0YSA9IGZ1bmN0aW9uKGQsIGx0LCBkdCkge1xuXHRcdC8vIGpzIG9wdGltaXphdGlvbi5cblx0XHR2YXIgZGRlc3QgPSBkLmRlc3Q7XG5cdFx0dmFyIGRkZXN0bGVuZ3RoID0gZGRlc3QubGVuZ3RoO1xuXG5cdFx0d2hpbGUgKDEpIHtcblx0XHRcdHZhciBzeW0gPSB0aGlzLmRlY29kZV9zeW1ib2woZCwgbHQpO1xuXG5cdFx0XHQvKiBjaGVjayBmb3IgZW5kIG9mIGJsb2NrICovXG5cdFx0XHRpZiAoc3ltID09PSAyNTYpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuT0s7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzeW0gPCAyNTYpIHtcblx0XHRcdFx0ZGRlc3RbZGRlc3RsZW5ndGgrK10gPSBzeW07IC8vID8gU3RyaW5nLmZyb21DaGFyQ29kZShzeW0pO1xuXHRcdFx0XHRkLmhpc3RvcnkucHVzaChzeW0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFyIGxlbmd0aCwgZGlzdCwgb2Zmcztcblx0XHRcdFx0dmFyIGk7XG5cblx0XHRcdFx0c3ltIC09IDI1NztcblxuXHRcdFx0XHQvKiBwb3NzaWJseSBnZXQgbW9yZSBiaXRzIGZyb20gbGVuZ3RoIGNvZGUgKi9cblx0XHRcdFx0bGVuZ3RoID0gdGhpcy5yZWFkX2JpdHMoZCwgdGhpcy5sZW5ndGhfYml0c1tzeW1dLCB0aGlzLmxlbmd0aF9iYXNlW3N5bV0pO1xuXG5cdFx0XHRcdGRpc3QgPSB0aGlzLmRlY29kZV9zeW1ib2woZCwgZHQpO1xuXG5cdFx0XHRcdC8qIHBvc3NpYmx5IGdldCBtb3JlIGJpdHMgZnJvbSBkaXN0YW5jZSBjb2RlICovXG5cdFx0XHRcdG9mZnMgPSBkLmhpc3RvcnkubGVuZ3RoIC0gdGhpcy5yZWFkX2JpdHMoZCwgdGhpcy5kaXN0X2JpdHNbZGlzdF0sIHRoaXMuZGlzdF9iYXNlW2Rpc3RdKTtcblxuXHRcdFx0XHRpZiAob2ZmcyA8IDApIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgemxpYiBvZmZzZXQgJyArIG9mZnMpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogY29weSBtYXRjaCAqL1xuXHRcdFx0XHRmb3IgKGkgPSBvZmZzOyBpIDwgb2ZmcyArIGxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdFx0Ly9kZGVzdFtkZGVzdGxlbmd0aCsrXSA9IGRkZXN0W2ldO1xuXHRcdFx0XHRcdGRkZXN0W2RkZXN0bGVuZ3RoKytdID0gZC5oaXN0b3J5W2ldO1xuXHRcdFx0XHRcdGQuaGlzdG9yeS5wdXNoKGQuaGlzdG9yeVtpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0LyogaW5mbGF0ZSBhbiB1bmNvbXByZXNzZWQgYmxvY2sgb2YgZGF0YSAqL1xuXHR0aGlzLmluZmxhdGVfdW5jb21wcmVzc2VkX2Jsb2NrID0gZnVuY3Rpb24oZCkge1xuXHRcdHZhciBsZW5ndGgsIGludmxlbmd0aDtcblx0XHR2YXIgaTtcblxuXHRcdGlmIChkLmJpdGNvdW50ID4gNykge1xuXHRcdFx0IHZhciBvdmVyZmxvdyA9IE1hdGguZmxvb3IoZC5iaXRjb3VudCAvIDgpO1xuXHRcdFx0IGQuc291cmNlSW5kZXggLT0gb3ZlcmZsb3c7XG5cdFx0XHQgZC5iaXRjb3VudCA9IDA7XG5cdFx0XHQgZC50YWcgPSAwO1xuXHRcdH1cblxuXHRcdC8qIGdldCBsZW5ndGggKi9cblx0XHRsZW5ndGggPSBkLnNvdXJjZVtkLnNvdXJjZUluZGV4KzFdO1xuXHRcdGxlbmd0aCA9IDI1NipsZW5ndGggKyBkLnNvdXJjZVtkLnNvdXJjZUluZGV4XTtcblxuXHRcdC8qIGdldCBvbmUncyBjb21wbGVtZW50IG9mIGxlbmd0aCAqL1xuXHRcdGludmxlbmd0aCA9IGQuc291cmNlW2Quc291cmNlSW5kZXgrM107XG5cdFx0aW52bGVuZ3RoID0gMjU2Kmludmxlbmd0aCArIGQuc291cmNlW2Quc291cmNlSW5kZXgrMl07XG5cblx0XHQvKiBjaGVjayBsZW5ndGggKi9cblx0XHRpZiAobGVuZ3RoICE9PSAofmludmxlbmd0aCAmIDB4MDAwMGZmZmYpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5EQVRBX0VSUk9SO1xuXHRcdH1cblxuXHRcdGQuc291cmNlSW5kZXggKz0gNDtcblxuXHRcdC8qIGNvcHkgYmxvY2sgKi9cblx0XHRmb3IgKGkgPSBsZW5ndGg7IGk7IC0taSkge1xuXHRcdFx0IGQuaGlzdG9yeS5wdXNoKGQuc291cmNlW2Quc291cmNlSW5kZXhdKTtcblx0XHRcdCBkLmRlc3RbZC5kZXN0Lmxlbmd0aF0gPSBkLnNvdXJjZVtkLnNvdXJjZUluZGV4KytdO1xuXHRcdH1cblxuXHRcdC8qIG1ha2Ugc3VyZSB3ZSBzdGFydCBuZXh0IGJsb2NrIG9uIGEgYnl0ZSBib3VuZGFyeSAqL1xuXHRcdGQuYml0Y291bnQgPSAwO1xuXG5cdFx0cmV0dXJuIHRoaXMuT0s7XG5cdH07XG5cblx0LyogaW5mbGF0ZSBhIGJsb2NrIG9mIGRhdGEgY29tcHJlc3NlZCB3aXRoIGZpeGVkIGh1ZmZtYW4gdHJlZXMgKi9cblx0dGhpcy5pbmZsYXRlX2ZpeGVkX2Jsb2NrID0gZnVuY3Rpb24oZCkge1xuXHRcdC8qIGRlY29kZSBibG9jayB1c2luZyBmaXhlZCB0cmVlcyAqL1xuXHRcdHJldHVybiB0aGlzLmluZmxhdGVfYmxvY2tfZGF0YShkLCB0aGlzLnNsdHJlZSwgdGhpcy5zZHRyZWUpO1xuXHR9O1xuXG5cdC8qIGluZmxhdGUgYSBibG9jayBvZiBkYXRhIGNvbXByZXNzZWQgd2l0aCBkeW5hbWljIGh1ZmZtYW4gdHJlZXMgKi9cblx0dGhpcy5pbmZsYXRlX2R5bmFtaWNfYmxvY2sgPSBmdW5jdGlvbihkKSB7XG5cdFx0LyogZGVjb2RlIHRyZWVzIGZyb20gc3RyZWFtICovXG5cdFx0dGhpcy5kZWNvZGVfdHJlZXMoZCwgZC5sdHJlZSwgZC5kdHJlZSk7XG5cblx0XHQvKiBkZWNvZGUgYmxvY2sgdXNpbmcgZGVjb2RlZCB0cmVlcyAqL1xuXHRcdHJldHVybiB0aGlzLmluZmxhdGVfYmxvY2tfZGF0YShkLCBkLmx0cmVlLCBkLmR0cmVlKTtcblx0fTtcblxuXHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tICpcblx0ICogLS0gcHVibGljIGZ1bmN0aW9ucyAtLSAqXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvKiBpbml0aWFsaXplIGdsb2JhbCAoc3RhdGljKSBkYXRhICovXG5cdHRoaXMuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXHRcdC8qIGJ1aWxkIGZpeGVkIGh1ZmZtYW4gdHJlZXMgKi9cblx0XHR0aGlzLmJ1aWxkX2ZpeGVkX3RyZWVzKHRoaXMuc2x0cmVlLCB0aGlzLnNkdHJlZSk7XG5cblx0XHQvKiBidWlsZCBleHRyYSBiaXRzIGFuZCBiYXNlIHRhYmxlcyAqL1xuXHRcdHRoaXMuYnVpbGRfYml0c19iYXNlKHRoaXMubGVuZ3RoX2JpdHMsIHRoaXMubGVuZ3RoX2Jhc2UsIDQsIDMpO1xuXHRcdHRoaXMuYnVpbGRfYml0c19iYXNlKHRoaXMuZGlzdF9iaXRzLCB0aGlzLmRpc3RfYmFzZSwgMiwgMSk7XG5cblx0XHQvKiBmaXggYSBzcGVjaWFsIGNhc2UgKi9cblx0XHR0aGlzLmxlbmd0aF9iaXRzWzI4XSA9IDA7XG5cdFx0dGhpcy5sZW5ndGhfYmFzZVsyOF0gPSAyNTg7XG5cblx0XHR0aGlzLnJlc2V0KCk7XG5cdH07XG5cblx0dGhpcy5yZXNldCA9IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuZCA9IG5ldyB0aGlzLkRBVEEodGhpcyk7XG5cdFx0ZGVsZXRlIHRoaXMuaGVhZGVyO1xuXHR9O1xuXG5cdC8qIGluZmxhdGUgc3RyZWFtIGZyb20gc291cmNlIHRvIGRlc3QgKi9cblx0dGhpcy51bmNvbXByZXNzID0gZnVuY3Rpb24oc291cmNlLCBvZmZzZXQpIHtcblx0XHR2YXIgZCA9IHRoaXMuZDtcblx0XHR2YXIgYmZpbmFsO1xuXG5cdFx0LyogaW5pdGlhbGlzZSBkYXRhICovXG5cdFx0ZC5zb3VyY2UgPSBzb3VyY2U7XG5cdFx0ZC5zb3VyY2VJbmRleCA9IG9mZnNldDtcblx0XHRkLmJpdGNvdW50ID0gMDtcblxuXHRcdGQuZGVzdCA9IFtdO1xuXG5cdFx0Ly8gU2tpcCB6bGliIGhlYWRlciBhdCBzdGFydCBvZiBzdHJlYW1cblx0XHRpZiAodHlwZW9mIHRoaXMuaGVhZGVyID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5oZWFkZXIgPSB0aGlzLnJlYWRfYml0cyhkLCAxNiwgMCk7XG5cdFx0XHQvKiBieXRlIDA6IDB4NzgsIDcgPSAzMmsgd2luZG93IHNpemUsIDggPSBkZWZsYXRlICovXG5cdFx0XHQvKiBieXRlIDE6IGNoZWNrIGJpdHMgZm9yIGhlYWRlciBhbmQgb3RoZXIgZmxhZ3MgKi9cblx0XHR9XG5cblx0XHR2YXIgYmxvY2tzID0gMDtcblxuXHRcdGRvIHtcblx0XHRcdHZhciBidHlwZTtcblx0XHRcdHZhciByZXM7XG5cblx0XHRcdC8qIHJlYWQgZmluYWwgYmxvY2sgZmxhZyAqL1xuXHRcdFx0YmZpbmFsID0gdGhpcy5nZXRiaXQoZCk7XG5cblx0XHRcdC8qIHJlYWQgYmxvY2sgdHlwZSAoMiBiaXRzKSAqL1xuXHRcdFx0YnR5cGUgPSB0aGlzLnJlYWRfYml0cyhkLCAyLCAwKTtcblxuXHRcdFx0LyogZGVjb21wcmVzcyBibG9jayAqL1xuXHRcdFx0c3dpdGNoIChidHlwZSkge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHQvKiBkZWNvbXByZXNzIHVuY29tcHJlc3NlZCBibG9jayAqL1xuXHRcdFx0XHRyZXMgPSB0aGlzLmluZmxhdGVfdW5jb21wcmVzc2VkX2Jsb2NrKGQpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0LyogZGVjb21wcmVzcyBibG9jayB3aXRoIGZpeGVkIGh1ZmZtYW4gdHJlZXMgKi9cblx0XHRcdFx0cmVzID0gdGhpcy5pbmZsYXRlX2ZpeGVkX2Jsb2NrKGQpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0LyogZGVjb21wcmVzcyBibG9jayB3aXRoIGR5bmFtaWMgaHVmZm1hbiB0cmVlcyAqL1xuXHRcdFx0XHRyZXMgPSB0aGlzLmluZmxhdGVfZHluYW1pY19ibG9jayhkKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4geyAnc3RhdHVzJyA6IHRoaXMuREFUQV9FUlJPUiB9O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocmVzICE9PSB0aGlzLk9LKSB7XG5cdFx0XHRcdHJldHVybiB7ICdzdGF0dXMnIDogdGhpcy5EQVRBX0VSUk9SIH07XG5cdFx0XHR9XG5cdFx0XHRibG9ja3MrKztcblxuXHRcdH0gd2hpbGUgKCFiZmluYWwgJiYgZC5zb3VyY2VJbmRleCA8IGQuc291cmNlLmxlbmd0aCk7XG5cblx0XHRkLmhpc3RvcnkgPSBkLmhpc3Rvcnkuc2xpY2UoLXRoaXMuV0lORE9XX1NJWkUpO1xuXG5cdFx0cmV0dXJuIHsgJ3N0YXR1cycgOiB0aGlzLk9LLCAnZGF0YScgOiBkLmRlc3QgfTtcblx0fTtcbn1cblxuXG4vKipcbiAqIFByaXZhdGUgQVBJLlxuICovXG5cblxuLyogcmVhZCBhIG51bSBiaXQgdmFsdWUgZnJvbSBhIHN0cmVhbSBhbmQgYWRkIGJhc2UgKi9cbmZ1bmN0aW9uIHJlYWRfYml0c19kaXJlY3Qoc291cmNlLCBiaXRjb3VudCwgdGFnLCBpZHgsIG51bSkge1xuXHR2YXIgdmFsID0gMDtcblxuXHR3aGlsZSAoYml0Y291bnQgPCAyNCkge1xuXHRcdHRhZyA9IHRhZyB8IChzb3VyY2VbaWR4KytdICYgMHhmZikgPDwgYml0Y291bnQ7XG5cdFx0Yml0Y291bnQgKz0gODtcblx0fVxuXG5cdHZhbCA9IHRhZyAmICgweGZmZmYgPj4gKDE2IC0gbnVtKSk7XG5cdHRhZyA+Pj0gbnVtO1xuXHRiaXRjb3VudCAtPSBudW07XG5cdHJldHVybiBbYml0Y291bnQsIHRhZywgaWR4LCB2YWxdO1xufVxuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuLypcbiAqIG5vVk5DOiBIVE1MNSBWTkMgY2xpZW50XG4gKiBDb3B5cmlnaHQgKEMpIDIwMTIgSm9lbCBNYXJ0aW5cbiAqIExpY2Vuc2VkIHVuZGVyIE1QTCAyLjAgKHNlZSBMSUNFTlNFLnR4dClcbiAqL1xuXG5cbi8qKlxuICogRGVwZW5kZW5jaWVzLlxuICovXG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdub1ZOQzpVdGlsJyk7XG52YXIgZGVidWdlcnJvciA9IHJlcXVpcmUoJ2RlYnVnJykoJ25vVk5DOkVSUk9SOlV0aWwnKTtcbmRlYnVnZXJyb3IubG9nID0gY29uc29sZS53YXJuLmJpbmQoY29uc29sZSk7XG5cblxuLyoqXG4gKiBMb2NhbCB2YXJpYWJsZXMuXG4gKi9cbnZhciBjdXJzb3JfdXJpc19zdXBwb3J0ZWQgPSBudWxsO1xuXG5cbnZhciBVdGlsID0gbW9kdWxlLmV4cG9ydHMgPSB7XG5cdHB1c2g4OiBmdW5jdGlvbiAoYXJyYXksIG51bSkge1xuXHRcdGFycmF5LnB1c2gobnVtICYgMHhGRik7XG5cdH0sXG5cblx0cHVzaDE2OiBmdW5jdGlvbiAoYXJyYXksIG51bSkge1xuXHRcdGFycmF5LnB1c2goKG51bSA+PiA4KSAmIDB4RkYsXG5cdFx0XHRcdFx0XHRudW0gJiAweEZGKTtcblx0fSxcblxuXHRwdXNoMzI6IGZ1bmN0aW9uIChhcnJheSwgbnVtKSB7XG5cdFx0YXJyYXkucHVzaCgobnVtID4+IDI0KSAmIDB4RkYsXG5cdFx0XHRcdFx0IChudW0gPj4gMTYpICYgMHhGRixcblx0XHRcdFx0XHQgKG51bSA+PiA4KSAmIDB4RkYsXG5cdFx0XHRcdFx0IG51bSAmIDB4RkYpO1xuXHR9LFxuXG5cdHJlcXVlc3RBbmltYXRpb25GcmFtZTogKGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoZ2xvYmFsLnJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuXHRcdFx0cmV0dXJuIGdsb2JhbC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUuYmluZChnbG9iYWwpO1xuXHRcdH1cblx0XHRlbHNlIGlmIChnbG9iYWwud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG5cdFx0XHRyZXR1cm4gZ2xvYmFsLndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKGdsb2JhbCk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKGdsb2JhbC5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcblx0XHRcdHJldHVybiBnbG9iYWwubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQoZ2xvYmFsKTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoZ2xvYmFsLm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcblx0XHRcdHJldHVybiBnbG9iYWwub1JlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKGdsb2JhbCk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKGdsb2JhbC5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuXHRcdFx0cmV0dXJuIGdsb2JhbC5tc1JlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKGdsb2JhbCk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fSkoKSxcblxuXHRtYWtlX3Byb3BlcnRpZXM6IGZ1bmN0aW9uIChjb25zdHJ1Y3RvciwgYXJyKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcblx0XHRcdG1ha2VfcHJvcGVydHkoY29uc3RydWN0b3IucHJvdG90eXBlLCBhcnJbaV1bMF0sIGFycltpXVsxXSwgYXJyW2ldWzJdKTtcblx0XHR9XG5cdH0sXG5cblx0c2V0X2RlZmF1bHRzOiBmdW5jdGlvbiAob2JqLCBjb25mLCBkZWZhdWx0cykge1xuXHRcdHZhciBkZWZhdWx0c19rZXlzID0gT2JqZWN0LmtleXMoZGVmYXVsdHMpO1xuXHRcdHZhciBjb25mX2tleXMgPSBPYmplY3Qua2V5cyhjb25mKTtcblx0XHR2YXIga2V5c19vYmogPSB7fTtcblx0XHR2YXIgaTtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCBkZWZhdWx0c19rZXlzLmxlbmd0aDsgaSsrKSB7IGtleXNfb2JqW2RlZmF1bHRzX2tleXNbaV1dID0gMTsgfVxuXHRcdGZvciAoaSA9IDA7IGkgPCBjb25mX2tleXMubGVuZ3RoOyBpKyspIHsga2V5c19vYmpbY29uZl9rZXlzW2ldXSA9IDE7IH1cblxuXHRcdHZhciBrZXlzID0gT2JqZWN0LmtleXMoa2V5c19vYmopO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBzZXR0ZXIgPSBvYmpbJ19yYXdfc2V0XycgKyBrZXlzW2ldXTtcblxuXHRcdFx0aWYgKCFzZXR0ZXIpIHtcblx0XHRcdFx0ZGVidWdlcnJvcignaW52YWxpZCBwcm9wZXJ0eTogJXMnLCBrZXlzW2ldKTtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrZXlzW2ldIGluIGNvbmYpIHtcblx0XHRcdFx0c2V0dGVyLmNhbGwob2JqLCBjb25mW2tleXNbaV1dKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNldHRlci5jYWxsKG9iaiwgZGVmYXVsdHNba2V5c1tpXV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRkZWNvZGVVVEY4OiBmdW5jdGlvbiAodXRmOHN0cmluZykge1xuXHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKHV0ZjhzdHJpbmcpKTtcblx0fSxcblxuXHQvKipcblx0ICogR2V0IERPTSBlbGVtZW50IHBvc2l0aW9uIG9uIHBhZ2UuXG5cdCAqL1xuXHRnZXRQb3NpdGlvbjogZnVuY3Rpb24gKG9iaikge1xuXHRcdC8vIE5CKHNyb3NzKTogdGhlIE1vemlsbGEgZGV2ZWxvcGVyIHJlZmVyZW5jZSBzZWVtcyB0byBpbmRpY2F0ZSB0aGF0XG5cdFx0Ly8gZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGluY2x1ZGVzIGJvcmRlciBhbmQgcGFkZGluZywgc28gdGhlIGNhbnZhc1xuXHRcdC8vIHN0eWxlIHNob3VsZCBOT1QgaW5jbHVkZSBlaXRoZXIuXG5cdFx0dmFyIG9ialBvc2l0aW9uID0gb2JqLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0cmV0dXJuIHsneCc6IG9ialBvc2l0aW9uLmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQsICd5Jzogb2JqUG9zaXRpb24udG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0LFxuXHRcdFx0XHRcdFx0J3dpZHRoJzogb2JqUG9zaXRpb24ud2lkdGgsICdoZWlnaHQnOiBvYmpQb3NpdGlvbi5oZWlnaHR9O1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXQgbW91c2UgZXZlbnQgcG9zaXRpb24gaW4gRE9NIGVsZW1lbnRcblx0ICovXG5cdGdldEV2ZW50UG9zaXRpb246IGZ1bmN0aW9uIChlLCBvYmosIHNjYWxlLCB6b29tKSB7XG5cdFx0dmFyIGV2dCwgZG9jWCwgZG9jWSwgcG9zO1xuXG5cdFx0aWYgKHR5cGVvZiB6b29tID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0em9vbSA9IDEuMDtcblx0XHR9XG5cdFx0ZXZ0ID0gKGUgPyBlIDogZ2xvYmFsLmV2ZW50KTtcblx0XHRldnQgPSAoZXZ0LmNoYW5nZWRUb3VjaGVzID8gZXZ0LmNoYW5nZWRUb3VjaGVzWzBdIDogZXZ0LnRvdWNoZXMgPyBldnQudG91Y2hlc1swXSA6IGV2dCk7XG5cdFx0aWYgKGV2dC5wYWdlWCB8fCBldnQucGFnZVkpIHtcblx0XHRcdGRvY1ggPSBldnQucGFnZVg7XG5cdFx0XHRkb2NZID0gZXZ0LnBhZ2VZO1xuXHRcdFx0ZG9jWCA9IGV2dC5wYWdlWC96b29tO1xuXHRcdFx0ZG9jWSA9IGV2dC5wYWdlWS96b29tO1xuXHRcdH0gZWxzZSBpZiAoZXZ0LmNsaWVudFggfHwgZXZ0LmNsaWVudFkpIHtcblx0XHRcdGRvY1ggPSBldnQuY2xpZW50WCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCArXG5cdFx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0O1xuXHRcdFx0ZG9jWSA9IGV2dC5jbGllbnRZICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgK1xuXHRcdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuXHRcdH1cblx0XHRwb3MgPSBVdGlsLmdldFBvc2l0aW9uKG9iaik7XG5cdFx0aWYgKHR5cGVvZiBzY2FsZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHNjYWxlID0gMTtcblx0XHR9XG5cblx0XHR2YXIgcmVhbHggPSBkb2NYIC0gcG9zLng7XG5cdFx0dmFyIHJlYWx5ID0gZG9jWSAtIHBvcy55O1xuXHRcdHZhciB4ID0gTWF0aC5tYXgoTWF0aC5taW4ocmVhbHgsIHBvcy53aWR0aCAtIDEpLCAwKTtcblx0XHR2YXIgeSA9IE1hdGgubWF4KE1hdGgubWluKHJlYWx5LCBwb3MuaGVpZ2h0IC0gMSksIDApO1xuXG5cdFx0cmV0dXJuIHsneCc6IHggLyBzY2FsZSwgJ3knOiB5IC8gc2NhbGUsICdyZWFseCc6IHJlYWx4IC8gc2NhbGUsICdyZWFseSc6IHJlYWx5IC8gc2NhbGV9O1xuXHR9LFxuXG5cdGFkZEV2ZW50OiBmdW5jdGlvbiAob2JqLCBldlR5cGUsIGZuKSB7XG5cdFx0aWYgKG9iai5hdHRhY2hFdmVudCkge1xuXHRcdFx0dmFyIHIgPSBvYmouYXR0YWNoRXZlbnQoJ29uJyArIGV2VHlwZSwgZm4pO1xuXHRcdFx0cmV0dXJuIHI7XG5cdFx0fSBlbHNlIGlmIChvYmouYWRkRXZlbnRMaXN0ZW5lcikge1xuXHRcdFx0b2JqLmFkZEV2ZW50TGlzdGVuZXIoZXZUeXBlLCBmbiwgZmFsc2UpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignaGFuZGxlciBjb3VsZCBub3QgYmUgYXR0YWNoZWQnKTtcblx0XHR9XG5cdH0sXG5cblx0cmVtb3ZlRXZlbnQ6IGZ1bmN0aW9uIChvYmosIGV2VHlwZSwgZm4pIHtcblx0XHRpZiAob2JqLmRldGFjaEV2ZW50KSB7XG5cdFx0XHR2YXIgciA9IG9iai5kZXRhY2hFdmVudCgnb24nICsgZXZUeXBlLCBmbik7XG5cdFx0XHRyZXR1cm4gcjtcblx0XHR9IGVsc2UgaWYgKG9iai5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG5cdFx0XHRvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcihldlR5cGUsIGZuLCBmYWxzZSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdoYW5kbGVyIGNvdWxkIG5vdCBiZSByZW1vdmVkJyk7XG5cdFx0fVxuXHR9LFxuXG5cdHN0b3BFdmVudDogZnVuY3Rpb24gKGUpIHtcblx0XHRpZiAoZS5zdG9wUHJvcGFnYXRpb24pIHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgfVxuXHRcdGVsc2UgICAgICAgICAgICAgICAgICAgeyBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7IH1cblxuXHRcdGlmIChlLnByZXZlbnREZWZhdWx0KSAgeyBlLnByZXZlbnREZWZhdWx0KCk7IH1cblx0XHRlbHNlICAgICAgICAgICAgICAgICAgIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9XG5cdH0sXG5cblx0YnJvd3NlclN1cHBvcnRzQ3Vyc29yVVJJczogZnVuY3Rpb24gKCkge1xuXHRcdGlmIChjdXJzb3JfdXJpc19zdXBwb3J0ZWQgPT09IG51bGwpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHZhciB0YXJnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuXHRcdFx0XHR0YXJnZXQuc3R5bGUuY3Vyc29yID0gJ3VybChcImRhdGE6aW1hZ2UveC1pY29uO2Jhc2U2NCxBQUFDQUFFQUNBZ0FBQUlBQWdBNEFRQUFGZ0FBQUNnQUFBQUlBQUFBRUFBQUFBRUFJQUFBQUFBQUVBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBRC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vQUFBQUFBQUFBQUFBQUFBQUFBQUFBQT09XCIpIDIgMiwgZGVmYXVsdCc7XG5cblx0XHRcdFx0aWYgKHRhcmdldC5zdHlsZS5jdXJzb3IpIHtcblx0XHRcdFx0XHRkZWJ1ZygnZGF0YSBVUkkgc2NoZW1lIGN1cnNvciBzdXBwb3J0ZWQnKTtcblx0XHRcdFx0XHRjdXJzb3JfdXJpc19zdXBwb3J0ZWQgPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRlYnVnZXJyb3IoJ2RhdGEgVVJJIHNjaGVtZSBjdXJzb3Igbm90IHN1cHBvcnRlZCcpO1xuXHRcdFx0XHRcdGN1cnNvcl91cmlzX3N1cHBvcnRlZCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChleGMpIHtcblx0XHRcdFx0ZGVidWdlcnJvcignZGF0YSBVUkkgc2NoZW1lIGN1cnNvciB0ZXN0IGV4Y2VwdGlvbjogJyArIGV4Yyk7XG5cdFx0XHRcdGN1cnNvcl91cmlzX3N1cHBvcnRlZCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjdXJzb3JfdXJpc19zdXBwb3J0ZWQ7XG5cdH1cbn07XG5cblxuLyoqXG4gKiBQcml2YXRlIEFQSS5cbiAqL1xuXG5cbmZ1bmN0aW9uIG1ha2VfcHJvcGVydHkgKHByb3RvLCBuYW1lLCBtb2RlLCB0eXBlKSB7XG5cdHZhciBnZXR0ZXI7XG5cblx0aWYgKHR5cGUgPT09ICdhcnInKSB7XG5cdFx0Z2V0dGVyID0gZnVuY3Rpb24gKGlkeCkge1xuXHRcdFx0aWYgKHR5cGVvZiBpZHggIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzWydfJyArIG5hbWVdW2lkeF07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdGhpc1snXycgKyBuYW1lXTtcblx0XHRcdH1cblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdGdldHRlciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXNbJ18nICsgbmFtZV07XG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIG1ha2Vfc2V0dGVyIChwcm9jZXNzX3ZhbCkge1xuXHRcdGlmIChwcm9jZXNzX3ZhbCkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICh2YWwsIGlkeCkge1xuXHRcdFx0XHRpZiAodHlwZW9mIGlkeCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHR0aGlzWydfJyArIG5hbWVdW2lkeF0gPSBwcm9jZXNzX3ZhbCh2YWwpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXNbJ18nICsgbmFtZV0gPSBwcm9jZXNzX3ZhbCh2YWwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKHZhbCwgaWR4KSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgaWR4ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdHRoaXNbJ18nICsgbmFtZV1baWR4XSA9IHZhbDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzWydfJyArIG5hbWVdID0gdmFsO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblx0fVxuXG5cdHZhciBzZXR0ZXI7XG5cblx0aWYgKHR5cGUgPT09ICdib29sJykge1xuXHRcdHNldHRlciA9IG1ha2Vfc2V0dGVyKGZ1bmN0aW9uICh2YWwpIHtcblx0XHRcdGlmICghdmFsIHx8ICh2YWwgaW4geycwJzogMSwgJ25vJzogMSwgJ2ZhbHNlJzogMX0pKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9IGVsc2UgaWYgKHR5cGUgPT09ICdpbnQnKSB7XG5cdFx0c2V0dGVyID0gbWFrZV9zZXR0ZXIoZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gcGFyc2VJbnQodmFsLCAxMCk7IH0pO1xuXHR9IGVsc2UgaWYgKHR5cGUgPT09ICdmbG9hdCcpIHtcblx0XHRzZXR0ZXIgPSBtYWtlX3NldHRlcihwYXJzZUZsb2F0KTtcblx0fSBlbHNlIGlmICh0eXBlID09PSAnc3RyJykge1xuXHRcdHNldHRlciA9IG1ha2Vfc2V0dGVyKFN0cmluZyk7XG5cdH0gZWxzZSBpZiAodHlwZSA9PT0gJ2Z1bmMnKSB7XG5cdFx0c2V0dGVyID0gbWFrZV9zZXR0ZXIoZnVuY3Rpb24gKHZhbCkge1xuXHRcdFx0aWYgKCF2YWwpIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHZhbDtcblx0XHRcdH1cblx0XHR9KTtcblx0fSBlbHNlIGlmICh0eXBlID09PSAnYXJyJyB8fCB0eXBlID09PSAnZG9tJyB8fCB0eXBlID09PSAncmF3Jykge1xuXHRcdHNldHRlciA9IG1ha2Vfc2V0dGVyKCk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd1bmtub3duIHByb3BlcnR5IHR5cGUgJyArIHR5cGUpOyAgLy8gc29tZSBzYW5pdHkgY2hlY2tpbmdcblx0fVxuXG5cdC8vIHNldCB0aGUgZ2V0dGVyXG5cdGlmICh0eXBlb2YgcHJvdG9bJ2dldF8nICsgbmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cHJvdG9bJ2dldF8nICsgbmFtZV0gPSBnZXR0ZXI7XG5cdH1cblxuXHQvLyBzZXQgdGhlIHNldHRlciBpZiBuZWVkZWRcblx0aWYgKHR5cGVvZiBwcm90b1snc2V0XycgKyBuYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRpZiAobW9kZSA9PT0gJ3J3Jykge1xuXHRcdFx0cHJvdG9bJ3NldF8nICsgbmFtZV0gPSBzZXR0ZXI7XG5cdFx0fSBlbHNlIGlmIChtb2RlID09PSAnd28nKSB7XG5cdFx0XHRwcm90b1snc2V0XycgKyBuYW1lXSA9IGZ1bmN0aW9uICh2YWwsIGlkeCkge1xuXHRcdFx0XHRpZiAodHlwZW9mIHRoaXNbJ18nICsgbmFtZV0gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKG5hbWUgKyAnIGNhbiBvbmx5IGJlIHNldCBvbmNlJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0c2V0dGVyLmNhbGwodGhpcywgdmFsLCBpZHgpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH1cblxuXHQvLyBtYWtlIGEgc3BlY2lhbCBzZXR0ZXIgdGhhdCB3ZSBjYW4gdXNlIGluIHNldCBkZWZhdWx0c1xuXHRwcm90b1snX3Jhd19zZXRfJyArIG5hbWVdID0gZnVuY3Rpb24gKHZhbCwgaWR4KSB7XG5cdFx0c2V0dGVyLmNhbGwodGhpcywgdmFsLCBpZHgpO1xuXHRcdC8vZGVsZXRlIHRoaXNbJ19pbml0X3NldF8nICsgbmFtZV07ICAvLyByZW1vdmUgaXQgYWZ0ZXIgdXNlXG5cdH07XG59XG5cbn0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuLypcbiAqIFdlYnNvY2s6IGhpZ2gtcGVyZm9ybWFuY2UgYmluYXJ5IFdlYlNvY2tldHNcbiAqIENvcHlyaWdodCAoQykgMjAxMiBKb2VsIE1hcnRpblxuICogTGljZW5zZWQgdW5kZXIgTVBMIDIuMCAoc2VlIExJQ0VOU0UudHh0KVxuICpcbiAqIFdlYnNvY2sgaXMgc2ltaWxhciB0byB0aGUgc3RhbmRhcmQgV2ViU29ja2V0IG9iamVjdCBidXQgV2Vic29ja1xuICogZW5hYmxlcyBjb21tdW5pY2F0aW9uIHdpdGggcmF3IFRDUCBzb2NrZXRzIChpLmUuIHRoZSBiaW5hcnkgc3RyZWFtKVxuICogdmlhIHdlYnNvY2tpZnkuIFRoaXMgaXMgYWNjb21wbGlzaGVkIGJ5IGJhc2U2NCBlbmNvZGluZyB0aGUgZGF0YVxuICogc3RyZWFtIGJldHdlZW4gV2Vic29jayBhbmQgd2Vic29ja2lmeS5cbiAqXG4gKiBXZWJzb2NrIGhhcyBidWlsdC1pbiByZWNlaXZlIHF1ZXVlIGJ1ZmZlcmluZzsgdGhlIG1lc3NhZ2UgZXZlbnRcbiAqIGRvZXMgbm90IGNvbnRhaW4gYWN0dWFsIGRhdGEgYnV0IGlzIHNpbXBseSBhIG5vdGlmaWNhdGlvbiB0aGF0XG4gKiB0aGVyZSBpcyBuZXcgZGF0YSBhdmFpbGFibGUuIFNldmVyYWwgclEqIG1ldGhvZHMgYXJlIGF2YWlsYWJsZSB0b1xuICogcmVhZCBiaW5hcnkgZGF0YSBvZmYgb2YgdGhlIHJlY2VpdmUgcXVldWUuXG4gKi9cblxuXG4vKipcbiAqIERlcGVuZGVuY2llcy5cbiAqL1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnbm9WTkM6V2Vic29jaycpO1xudmFyIGRlYnVnZXJyb3IgPSByZXF1aXJlKCdkZWJ1ZycpKCdub1ZOQzpFUlJPUjpXZWJzb2NrJyk7XG5kZWJ1Z2Vycm9yLmxvZyA9IGNvbnNvbGUud2Fybi5iaW5kKGNvbnNvbGUpO1xudmFyIGJyb3dzZXIgPSByZXF1aXJlKCdib3dzZXInKS5icm93c2VyO1xudmFyIEJhc2U2NCA9IHJlcXVpcmUoJy4vYmFzZTY0Jyk7XG5cblxuLyoqXG4gKiBFeHBvc2UgV2Vic29jayBjbGFzcy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBXZWJzb2NrO1xuXG5cbmZ1bmN0aW9uIFdlYnNvY2soKSB7XG5cdHRoaXMuX3dlYnNvY2tldCA9IG51bGw7ICAvLyBXZWJTb2NrZXQgb2JqZWN0XG5cdHRoaXMuX3JRID0gW107ICAgICAgICAgICAvLyBSZWNlaXZlIHF1ZXVlXG5cdHRoaXMuX3JRaSA9IDA7ICAgICAgICAgICAvLyBSZWNlaXZlIHF1ZXVlIGluZGV4XG5cdHRoaXMuX3JRbWF4ID0gMTAwMDA7ICAgICAvLyBNYXggcmVjZWl2ZSBxdWV1ZSBzaXplIGJlZm9yZSBjb21wYWN0aW5nXG5cdHRoaXMuX3NRID0gW107ICAgICAgICAgICAvLyBTZW5kIHF1ZXVlXG5cblx0dGhpcy5fbW9kZSA9ICdiYXNlNjQnOyAgICAvLyBDdXJyZW50IFdlYlNvY2tldCBtb2RlOiAnYmluYXJ5JywgJ2Jhc2U2NCdcblx0dGhpcy5tYXhCdWZmZXJlZEFtb3VudCA9IDIwMDtcblxuXHR0aGlzLl9ldmVudEhhbmRsZXJzID0ge1xuXHRcdCdtZXNzYWdlJzogZnVuY3Rpb24gKCkge30sXG5cdFx0J29wZW4nOiBmdW5jdGlvbiAoKSB7fSxcblx0XHQnY2xvc2UnOiBmdW5jdGlvbiAoKSB7fSxcblx0XHQnZXJyb3InOiBmdW5jdGlvbiAoKSB7fVxuXHR9O1xufVxuXG5cbldlYnNvY2sucHJvdG90eXBlID0ge1xuXHQvLyBHZXR0ZXJzIGFuZCBTZXR0ZXJzXG5cdGdldF9zUTogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9zUTtcblx0fSxcblxuXHRnZXRfclE6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5fclE7XG5cdH0sXG5cblx0Z2V0X3JRaTogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9yUWk7XG5cdH0sXG5cblx0c2V0X3JRaTogZnVuY3Rpb24gKHZhbCkge1xuXHRcdHRoaXMuX3JRaSA9IHZhbDtcblx0fSxcblxuXHQvLyBSZWNlaXZlIFF1ZXVlXG5cdHJRbGVuOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3JRLmxlbmd0aCAtIHRoaXMuX3JRaTtcblx0fSxcblxuXHRyUXBlZWs4OiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3JRW3RoaXMuX3JRaV07XG5cdH0sXG5cblx0clFzaGlmdDg6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5fclFbdGhpcy5fclFpKytdO1xuXHR9LFxuXG5cdHJRc2tpcDg6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9yUWkrKztcblx0fSxcblxuXHRyUXNraXBCeXRlczogZnVuY3Rpb24gKG51bSkge1xuXHRcdHRoaXMuX3JRaSArPSBudW07XG5cdH0sXG5cblx0clF1bnNoaWZ0ODogZnVuY3Rpb24gKG51bSkge1xuXHRcdGlmICh0aGlzLl9yUWkgPT09IDApIHtcblx0XHRcdHRoaXMuX3JRLnVuc2hpZnQobnVtKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fclFpLS07XG5cdFx0XHR0aGlzLl9yUVt0aGlzLl9yUWldID0gbnVtO1xuXHRcdH1cblx0fSxcblxuXHRyUXNoaWZ0MTY6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gKHRoaXMuX3JRW3RoaXMuX3JRaSsrXSA8PCA4KSArXG5cdFx0XHQgICB0aGlzLl9yUVt0aGlzLl9yUWkrK107XG5cdH0sXG5cblx0clFzaGlmdDMyOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuICh0aGlzLl9yUVt0aGlzLl9yUWkrK10gPDwgMjQpICtcblx0XHRcdCAgICh0aGlzLl9yUVt0aGlzLl9yUWkrK10gPDwgMTYpICtcblx0XHRcdCAgICh0aGlzLl9yUVt0aGlzLl9yUWkrK10gPDwgOCkgK1xuXHRcdFx0ICAgdGhpcy5fclFbdGhpcy5fclFpKytdO1xuXHR9LFxuXG5cdHJRc2hpZnRTdHI6IGZ1bmN0aW9uIChsZW4pIHtcblx0XHRpZiAodHlwZW9mKGxlbikgPT09ICd1bmRlZmluZWQnKSB7IGxlbiA9IHRoaXMuclFsZW4oKTsgfVxuXHRcdHZhciBhcnIgPSB0aGlzLl9yUS5zbGljZSh0aGlzLl9yUWksIHRoaXMuX3JRaSArIGxlbik7XG5cdFx0dGhpcy5fclFpICs9IGxlbjtcblx0XHRyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBhcnIpO1xuXHR9LFxuXG5cdHJRc2hpZnRCeXRlczogZnVuY3Rpb24gKGxlbikge1xuXHRcdGlmICh0eXBlb2YobGVuKSA9PT0gJ3VuZGVmaW5lZCcpIHsgbGVuID0gdGhpcy5yUWxlbigpOyB9XG5cdFx0dGhpcy5fclFpICs9IGxlbjtcblx0XHRyZXR1cm4gdGhpcy5fclEuc2xpY2UodGhpcy5fclFpIC0gbGVuLCB0aGlzLl9yUWkpO1xuXHR9LFxuXG5cdHJRc2xpY2U6IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG5cdFx0aWYgKGVuZCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX3JRLnNsaWNlKHRoaXMuX3JRaSArIHN0YXJ0LCB0aGlzLl9yUWkgKyBlbmQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fclEuc2xpY2UodGhpcy5fclFpICsgc3RhcnQpO1xuXHRcdH1cblx0fSxcblxuXHQvLyBDaGVjayB0byBzZWUgaWYgd2UgbXVzdCB3YWl0IGZvciAnbnVtJyBieXRlcyAoZGVmYXVsdCB0byBGQlUuYnl0ZXMpXG5cdC8vIHRvIGJlIGF2YWlsYWJsZSBpbiB0aGUgcmVjZWl2ZSBxdWV1ZS4gUmV0dXJuIHRydWUgaWYgd2UgbmVlZCB0b1xuXHQvLyB3YWl0IChhbmQgcG9zc2libHkgcHJpbnQgYSBkZWJ1ZyBtZXNzYWdlKSwgb3RoZXJ3aXNlIGZhbHNlLlxuXHRyUXdhaXQ6IGZ1bmN0aW9uIChtc2csIG51bSwgZ29iYWNrKSB7XG5cdFx0dmFyIHJRbGVuID0gdGhpcy5fclEubGVuZ3RoIC0gdGhpcy5fclFpOyAvLyBTa2lwIHJRbGVuKCkgZnVuY3Rpb24gY2FsbFxuXHRcdGlmIChyUWxlbiA8IG51bSkge1xuXHRcdFx0aWYgKGdvYmFjaykge1xuXHRcdFx0XHRpZiAodGhpcy5fclFpIDwgZ29iYWNrKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdyUXdhaXQgY2Fubm90IGJhY2t1cCAnICsgZ29iYWNrICsgJyBieXRlcycpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX3JRaSAtPSBnb2JhY2s7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTsgLy8gdHJ1ZSBtZWFucyBuZWVkIG1vcmUgZGF0YVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0Ly8gU2VuZCBRdWV1ZVxuXG5cdGZsdXNoOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX3dlYnNvY2tldC5idWZmZXJlZEFtb3VudCAhPT0gMCkge1xuXHRcdFx0ZGVidWcoJ2ZsdXNoKCkgfCBidWZmZXJlZEFtb3VudDogJWQnLCB0aGlzLl93ZWJzb2NrZXQuYnVmZmVyZWRBbW91bnQpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl93ZWJzb2NrZXQuYnVmZmVyZWRBbW91bnQgPCB0aGlzLm1heEJ1ZmZlcmVkQW1vdW50KSB7XG5cdFx0XHRpZiAodGhpcy5fc1EubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR0aGlzLl93ZWJzb2NrZXQuc2VuZCh0aGlzLl9lbmNvZGVfbWVzc2FnZSgpKTtcblx0XHRcdFx0dGhpcy5fc1EgPSBbXTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlYnVnKCdmbHVzaCgpIHwgZGVsYXlpbmcgc2VuZCcpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fSxcblxuXHRzZW5kOiBmdW5jdGlvbiAoYXJyKSB7XG5cdCAgIHRoaXMuX3NRID0gdGhpcy5fc1EuY29uY2F0KGFycik7XG5cdCAgIHJldHVybiB0aGlzLmZsdXNoKCk7XG5cdH0sXG5cblx0c2VuZF9zdHJpbmc6IGZ1bmN0aW9uIChzdHIpIHtcblx0XHR0aGlzLnNlbmQoc3RyLnNwbGl0KCcnKS5tYXAoZnVuY3Rpb24gKGNocikge1xuXHRcdFx0cmV0dXJuIGNoci5jaGFyQ29kZUF0KDApO1xuXHRcdH0pKTtcblx0fSxcblxuXHQvLyBFdmVudCBIYW5kbGVyc1xuXHRvbjogZnVuY3Rpb24gKGV2dCwgaGFuZGxlcikge1xuXHRcdHRoaXMuX2V2ZW50SGFuZGxlcnNbZXZ0XSA9IGhhbmRsZXI7XG5cdH0sXG5cblx0b2ZmOiBmdW5jdGlvbiAoZXZ0KSB7XG5cdFx0dGhpcy5fZXZlbnRIYW5kbGVyc1tldnRdID0gZnVuY3Rpb24oKSB7fTtcblx0fSxcblxuXHRpbml0OiBmdW5jdGlvbiAocHJvdG9jb2xzKSB7XG5cdFx0dGhpcy5fclEgPSBbXTtcblx0XHR0aGlzLl9yUWkgPSAwO1xuXHRcdHRoaXMuX3NRID0gW107XG5cdFx0dGhpcy5fd2Vic29ja2V0ID0gbnVsbDtcblxuXHRcdC8vIENoZWNrIGZvciBmdWxsIHR5cGVkIGFycmF5IHN1cHBvcnRcblx0XHR2YXIgYnQgPSBmYWxzZTtcblx0XHRpZiAoKCdVaW50OEFycmF5JyBpbiBnbG9iYWwpICYmICgnc2V0JyBpbiBVaW50OEFycmF5LnByb3RvdHlwZSkpIHtcblx0XHRcdGJ0ID0gdHJ1ZTtcblx0XHR9XG5cblx0XHR2YXIgd3NidCA9IGZhbHNlO1xuXHRcdGlmIChnbG9iYWwuV2ViU29ja2V0KSB7XG5cdFx0XHQvLyBTYWZhcmkgPCA3IGRvZXMgbm90IHN1cHBvcnQgYmluYXJ5IFdTLlxuXHRcdFx0aWYgKGJyb3dzZXIuc2FmYXJpICYmIE51bWJlcihicm93c2VyLnZlcnNpb24pID4gMCAmJiBOdW1iZXIoYnJvd3Nlci52ZXJzaW9uKSA8IDcpIHtcblx0XHRcdFx0ZGVidWcoJ2luaXQoKSB8IFNhZmFyaSAlZCBkb2VzIG5vdCBzdXBwb3J0IGJpbmFyeSBXZWJTb2NrZXQnLCBOdW1iZXIoYnJvd3Nlci52ZXJzaW9uKSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0d3NidCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRGVmYXVsdCBwcm90b2NvbHMgaWYgbm90IHNwZWNpZmllZFxuXHRcdGlmICh0eXBlb2YocHJvdG9jb2xzKSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdGlmICh3c2J0KSB7XG5cdFx0XHRcdHByb3RvY29scyA9IFsnYmluYXJ5JywgJ2Jhc2U2NCddO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cHJvdG9jb2xzID0gJ2Jhc2U2NCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCF3c2J0KSB7XG5cdFx0XHRpZiAocHJvdG9jb2xzID09PSAnYmluYXJ5Jykge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1dlYlNvY2tldCBiaW5hcnkgc3ViLXByb3RvY29sIHJlcXVlc3RlZCBidXQgbm90IHN1cHBvcnRlZCcpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodHlwZW9mKHByb3RvY29scykgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdHZhciBuZXdfcHJvdG9jb2xzID0gW107XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwcm90b2NvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZiAocHJvdG9jb2xzW2ldID09PSAnYmluYXJ5Jykge1xuXHRcdFx0XHRcdFx0ZGVidWdlcnJvcignaW5pdCgpIHwgc2tpcHBpbmcgdW5zdXBwb3J0ZWQgV2ViU29ja2V0IGJpbmFyeSBzdWItcHJvdG9jb2wnKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bmV3X3Byb3RvY29scy5wdXNoKHByb3RvY29sc1tpXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKG5ld19wcm90b2NvbHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHByb3RvY29scyA9IG5ld19wcm90b2NvbHM7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdvbmx5IFdlYlNvY2tldCBiaW5hcnkgc3ViLXByb3RvY29sIHdhcyByZXF1ZXN0ZWQgYW5kIGlzIG5vdCBzdXBwb3J0ZWQnKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBwcm90b2NvbHM7XG5cdH0sXG5cblx0b3BlbjogZnVuY3Rpb24gKHVyaSwgcHJvdG9jb2xzKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0cHJvdG9jb2xzID0gdGhpcy5pbml0KHByb3RvY29scyk7XG5cblx0XHQvLyB0aGlzLl93ZWJzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHVyaSwgcHJvdG9jb2xzKTtcblx0XHQvLyBUT0RPOiBBZGQgQVBJIG9yIHNldHRpbmdzIGZvciBwYXNzaW5nIHRoZSBXM0MgV2ViU29ja2V0IGNsYXNzLlxuXHRcdGlmIChnbG9iYWwuTmF0aXZlV2ViU29ja2V0KSB7XG5cdFx0XHRkZWJ1Zygnb3BlbigpIHwgdXNpbmcgTmF0aXZlV2ViU29ja2V0Jyk7XG5cdFx0XHR0aGlzLl93ZWJzb2NrZXQgPSBuZXcgZ2xvYmFsLk5hdGl2ZVdlYlNvY2tldCh1cmksIHByb3RvY29scyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlYnVnKCdvcGVuKCkgfCBub3QgdXNpbmcgTmF0aXZlV2ViU29ja2V0Jyk7XG5cdFx0XHR0aGlzLl93ZWJzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHVyaSwgcHJvdG9jb2xzKTtcblx0XHR9XG5cblx0XHRpZiAocHJvdG9jb2xzLmluZGV4T2YoJ2JpbmFyeScpID49IDApIHtcblx0XHRcdHRoaXMuX3dlYnNvY2tldC5iaW5hcnlUeXBlID0gJ2FycmF5YnVmZmVyJztcblx0XHR9XG5cblx0XHR0aGlzLl93ZWJzb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcblx0XHRcdHNlbGYuX3JlY3ZfbWVzc2FnZShlKTtcblx0XHR9O1xuXG5cdFx0dGhpcy5fd2Vic29ja2V0Lm9ub3BlbiA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKHNlbGYuX3dlYnNvY2tldC5wcm90b2NvbCkge1xuXHRcdFx0XHRkZWJ1Zygnb25vcGVuOiBzZXJ2ZXIgY2hvb3NlIFwiJXNcIiBzdWItcHJvdG9jb2wnLCBzZWxmLl93ZWJzb2NrZXQucHJvdG9jb2wpO1xuXHRcdFx0XHRzZWxmLl9tb2RlID0gc2VsZi5fd2Vic29ja2V0LnByb3RvY29sO1xuXHRcdFx0XHRzZWxmLl9ldmVudEhhbmRsZXJzLm9wZW4oKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRkZWJ1Z2Vycm9yKCdvbm9wZW46IHNlcnZlciBjaG9vc2Ugbm8gc3ViLXByb3RvY29sLCB1c2luZyBcImJhc2U2NFwiJyk7XG5cdFx0XHRcdHNlbGYuX21vZGUgPSAnYmFzZTY0Jztcblx0XHRcdFx0c2VsZi5fZXZlbnRIYW5kbGVycy5vcGVuKCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHRoaXMuX3dlYnNvY2tldC5vbmNsb3NlID0gZnVuY3Rpb24gKGUpIHtcblx0XHRcdGRlYnVnKCdvbmNsb3NlOiAlbycsIGUpO1xuXHRcdFx0c2VsZi5fZXZlbnRIYW5kbGVycy5jbG9zZShlKTtcblx0XHR9O1xuXG5cdFx0dGhpcy5fd2Vic29ja2V0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZGVidWdlcnJvcignb25lcnJvcjogJW8nLCBlKTtcblx0XHRcdHNlbGYuX2V2ZW50SGFuZGxlcnMuZXJyb3IoZSk7XG5cdFx0fTtcblx0fSxcblxuXHRjbG9zZTogZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLl93ZWJzb2NrZXQpIHtcblx0XHRcdGlmICgodGhpcy5fd2Vic29ja2V0LnJlYWR5U3RhdGUgPT09IHRoaXMuX3dlYnNvY2tldC5PUEVOKSB8fFxuXHRcdFx0XHRcdCh0aGlzLl93ZWJzb2NrZXQucmVhZHlTdGF0ZSA9PT0gdGhpcy5fd2Vic29ja2V0LkNPTk5FQ1RJTkcpKSB7XG5cdFx0XHRcdGRlYnVnKCdjbG9zZSgpJyk7XG5cdFx0XHRcdHRoaXMuX3dlYnNvY2tldC5jbG9zZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl93ZWJzb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24gKCkgeyByZXR1cm47IH07XG5cdFx0fVxuXHR9LFxuXG5cdC8vIHByaXZhdGUgbWV0aG9kc1xuXG5cdF9lbmNvZGVfbWVzc2FnZTogZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLl9tb2RlID09PSAnYmluYXJ5Jykge1xuXHRcdFx0Ly8gUHV0IGluIGEgYmluYXJ5IGFycmF5YnVmZmVyXG5cdFx0XHRyZXR1cm4gKG5ldyBVaW50OEFycmF5KHRoaXMuX3NRKSkuYnVmZmVyO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBiYXNlNjQgZW5jb2RlXG5cdFx0XHRyZXR1cm4gQmFzZTY0LmVuY29kZSh0aGlzLl9zUSk7XG5cdFx0fVxuXHR9LFxuXG5cdF9kZWNvZGVfbWVzc2FnZTogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRpZiAodGhpcy5fbW9kZSA9PT0gJ2JpbmFyeScpIHtcblx0XHRcdC8vIHB1c2ggYXJyYXlidWZmZXIgdmFsdWVzIG9udG8gdGhlIGVuZFxuXHRcdFx0dmFyIHU4ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHU4Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHRoaXMuX3JRLnB1c2godThbaV0pO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBiYXNlNjQgZGVjb2RlIGFuZCBjb25jYXQgdG8gZW5kXG5cdFx0XHR0aGlzLl9yUSA9IHRoaXMuX3JRLmNvbmNhdChCYXNlNjQuZGVjb2RlKGRhdGEsIDApKTtcblx0XHR9XG5cdH0sXG5cblx0X3JlY3ZfbWVzc2FnZTogZnVuY3Rpb24gKGUpIHtcblx0XHR0cnkge1xuXHRcdFx0dGhpcy5fZGVjb2RlX21lc3NhZ2UoZS5kYXRhKTtcblx0XHRcdGlmICh0aGlzLnJRbGVuKCkgPiAwKSB7XG5cdFx0XHRcdHRoaXMuX2V2ZW50SGFuZGxlcnMubWVzc2FnZSgpO1xuXHRcdFx0XHQvLyBDb21wYWN0IHRoZSByZWNlaXZlIHF1ZXVlXG5cdFx0XHRcdGlmICh0aGlzLl9yUS5sZW5ndGggPiB0aGlzLl9yUW1heCkge1xuXHRcdFx0XHRcdHRoaXMuX3JRID0gdGhpcy5fclEuc2xpY2UodGhpcy5fclFpKTtcblx0XHRcdFx0XHR0aGlzLl9yUWkgPSAwO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWJ1ZygnX3JlY3ZfbWVzc2FnZSgpIHwgaWdub3JpbmcgZW1wdHkgbWVzc2FnZScpO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRkZWJ1Z2Vycm9yKCdfcmVjdl9tZXNzYWdlKCkgfCBlcnJvcjogJW8nLCBlcnJvcik7XG5cblx0XHRcdGlmICh0eXBlb2YgZXJyb3IubmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0dGhpcy5fZXZlbnRIYW5kbGVycy5lcnJvcihlcnJvci5uYW1lICsgJzogJyArIGVycm9yLm1lc3NhZ2UpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fZXZlbnRIYW5kbGVycy5lcnJvcihlcnJvcik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5wb3N0TWVzc2FnZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lclxuICAgIDtcblxuICAgIGlmIChjYW5TZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGYpIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gW107XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gZXYuc291cmNlO1xuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IHdpbmRvdyB8fCBzb3VyY2UgPT09IG51bGwpICYmIGV2LmRhdGEgPT09ICdwcm9jZXNzLXRpY2snKSB7XG4gICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoJ3Byb2Nlc3MtdGljaycsICcqJyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG59KSgpO1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuIiwidmFyIG5vVk5DID0gcmVxdWlyZSgnbm92bmMtbm9kZScpO1xudmFyIFJlYWN0b3IgPSByZXF1aXJlKCcuL3JlYWN0b3InKTtcblxuXG4vKipcbiAqIFNpbXBsaWZpZWQgdmVyc2lvbiBvZiB0aGUgalF1ZXJ5ICQuZXh0ZW5kXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZCgpe1xuICBmb3IodmFyIGk9MTsgaTxhcmd1bWVudHMubGVuZ3RoOyBpKyspXG4gICAgZm9yKHZhciBrZXkgaW4gYXJndW1lbnRzW2ldKVxuICAgICAgaWYoYXJndW1lbnRzW2ldLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgIGFyZ3VtZW50c1swXVtrZXldID0gYXJndW1lbnRzW2ldW2tleV07XG4gIHJldHVybiBhcmd1bWVudHNbMF07XG59XG5cblxuKGZ1bmN0aW9uICh3aW5kb3cpIHtcblxuICB2YXIgQ1ZJTyA9IHt9O1xuICB2YXIgQ1ZJT0Rpc3BsYXkgPSBudWxsO1xuXG4gIC8vIENWSU8gcmVhY3RvciBldmVudHNcbiAgQ1ZJTy5FVl9TRVRfQVVUSF9UT0tFTiAgPSdzZXRBdXRoVG9rZW4nO1xuICBDVklPLkVWX0ZFVENIX0FVVEhfVE9LRU49J2ZldGNoQXV0aFRva2VuJztcbiAgQ1ZJTy5FVl9GRVRDSF9BVVRIX1RPS0VOX0VSUk9SPSdmZXRjaEF1dGhUb2tlbkVycm9yJztcbiAgQ1ZJTy5FVl9SQV9BVFRSU19MT0FEICAgPSdyYUF0dHJzTG9hZCc7XG4gIENWSU8uRVZfSU5JVF9FUlJPUiAgICAgID0naW5pdEVycm9yJztcbiAgQ1ZJTy5FVl9SQV9BVFRSU19FUlJPUiAgPSdyYUF0dHJzRXJyb3InO1xuXG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIENWSU9cbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiBtdXN0IGJlIGNhbGwgcHJpb3IgY3JlYXRpbmcgYSBuZXcgQ1ZJT0Rpc3BsYXlcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHNldHRpbmdzIC0gQ1ZJTyBzZXR0aW5nc1xuICAgKi9cbiAgQ1ZJTy5pbml0ID0gZnVuY3Rpb24oc2V0dGluZ3MpIHtcbiAgICAvLyBDVklPIFNldHRpbmdzXG4gICAgQ1ZJTy5zZXR0aW5ncyA9IGV4dGVuZCh7XG4gICAgICBhdXRob3JpemF0aW9uVG9rZW46IG51bGwsICAgICAgICAgICAgICAgICAgLy9DYXRWaXNpb24uaW8gYXV0aCB0b2tlbiBpbiBwbGFpbiB0ZXh0XG4gICAgICBhdXRob3JpemF0aW9uVG9rZW5VUkw6IG51bGwsICAgICAgICAgICAgICAgLy8gVVJMIHdpdGggYSBDYXRWaXNpb24uaW8gYXV0aCB0b2tlblxuICAgICAgb25BdXRoVG9rZW5SZXF1ZXN0OiBudWxsLCAgICAgICAgIC8vIEN1c3RvbSBDYXRWaXNpb24uaW8gYXV0aCB0b2tlbiBzZXR0ZXJcbiAgICAgIHVybDogJ2h0dHBzOi8vYXBwLmNhdHZpc2lvbi5pbycgICAvLyBDYXRWaXNpb24uaW8gb3IgYW55IFNlYUNhdCBwYW5lbCBVUkxcbiAgICB9LCBzZXR0aW5ncyk7XG5cbiAgICBDVklPLmF1dGhUb2tlblJlcXVlc3RlZCA9IGZhbHNlO1xuICAgIENWSU8ucmVhY3RvciA9IG5ldyBSZWFjdG9yKCk7XG5cbiAgICAvLyBpZiAoQ1ZJTy5zZXR0aW5ncy5hdXRob3JpemF0aW9uVG9rZW4gPT0gbnVsbCAmJiBDVklPLnNldHRpbmdzLmF1dGhvcml6YXRpb25Ub2tlblVSTCAhPSBudWxsKVxuICAgIC8vICAgQ1ZJTy5mZXRjaEF1dGhUb2tlbigpO1xuICAgIC8vIGVsc2UgaWYgKENWSU8uc2V0dGluZ3MuYXV0aG9yaXphdGlvblRva2VuID09IG51bGwgJiYgQ1ZJTy5zZXR0aW5ncy5hdXRob3JpemF0aW9uVG9rZW5VUkwgPT0gbnVsbClcbiAgICAvLyAgIHRocm93ICdTZWFDYXQgUGFuZWwgQXV0aCBUb2tlbiBub3Qgc3BlY2lmaWVkLic7XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGF1dGggdG9rZW4sIHVubG9ja3MgYXV0aFRva2VuIHJlcXVlc3RzXG4gICAqIGFuZCBmaXJlcyAnYXV0aFRva2VuU2V0JyBldmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGF1dGhUb2tlbiAtIGF1dGggdG9rZW5cbiAgICovXG4gIENWSU8uc2V0QXV0aFRva2VuID0gZnVuY3Rpb24oYXV0aFRva2VuKSB7XG4gICAgQ1ZJTy5zZXR0aW5ncy5hdXRob3JpemF0aW9uVG9rZW4gPSBhdXRoVG9rZW47XG4gICAgQ1ZJTy5yZWFjdG9yLmRpc3BhdGNoRXZlbnQoQ1ZJTy5FVl9TRVRfQVVUSF9UT0tFTik7XG5cbiAgICAvLyBEZWxheSBpcyBhcHBsaWVkIHRvIGZsdXNoIGxhdGUgcmVxdWVzdHNcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgQ1ZJTy5zZXR0aW5ncy5hdXRob3JpemF0aW9uVG9rZW5SZXF1ZXN0ZWQgPSBmYWxzZTtcbiAgICB9LCAyMDApO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKiBSZXF1ZXN0cyBuZXcgdG9rZW4gdG8gYmUgb2J0YWluZWQgYW5kIGxvY2tzIGZ1cnRoZXIgcmVxdWVzdHMgdW50aWwgc2V0QXV0aFRva2VuIGlzIGNhbGxlZC5cbiAgICpcbiAgICogVXNlciBjYW4gZGVmaW5lIGEgQ1ZJTy5zZXR0aW5ncy5vbkF1dGhUb2tlblJlcXVlc3QgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICogd2hlcmUgaGUgaXMgb2JsaWdlZCB0byBjYWxsIHNldEF1dGhUb2tlbiBtYW51YWxseS5cbiAgICpcbiAgICogSWYgdXNlciBjYWxsYmFjayBpcyBub3QgcHJlc2VudCwgdGhpcyBtZXRob2QgYXR0ZW1wdHNcbiAgICogdG8gZmV0Y2ggdGhlIHRva2VuIGZyb20gdGhlIHVybCBzZXQgaW4gQ1ZJTy5zZXR0aW5ncy5hdXRob3JpemF0aW9uVG9rZW5VUkxcbiAgICogXG4gICAqL1xuICBDVklPLnJlcXVlc3RBdXRoVG9rZW4gPSBmdW5jdGlvbigpXG4gIHtcbiAgICAvLyBPbmx5IHJlcXVlc3Qgb25jZVxuICAgIGlmIChDVklPLmF1dGhUb2tlblJlcXVlc3RlZClcbiAgICAgIHJldHVybjtcbiAgICBDVklPLmF1dGhUb2tlblJlcXVlc3RlZCA9IHRydWU7XG5cbiAgICBpZiAoQ1ZJTy5zZXR0aW5ncy5vbkF1dGhUb2tlblJlcXVlc3QgIT0gbnVsbCkge1xuICAgICAgQ1ZJTy5zZXR0aW5ncy5vbkF1dGhUb2tlblJlcXVlc3QoKTtcbiAgICB9XG5cbiAgICBlbHNlIGlmIChDVklPLnNldHRpbmdzLmF1dGhvcml6YXRpb25Ub2tlblVSTCkge1xuICAgICAgQ1ZJTy5mZXRjaEF1dGhUb2tlbihmdW5jdGlvbiBvblN1Y2Nlc3ModG9rZW4pIHtcbiAgICAgICAgQ1ZJTy5zZXRBdXRoVG9rZW4odG9rZW4pO1xuICAgICAgfSwgZnVuY3Rpb24gb25FcnJvcigpIHtcbiAgICAgICAgQ1ZJTy5hdXRoVG9rZW5SZXF1ZXN0ZWQgPSBmYWxzZTtcbiAgICAgICAgQ1ZJTy5yZWFjdG9yLmRpc3BhdGNoRXZlbnQoQ1ZJTy5FVl9GRVRDSF9BVVRIX1RPS0VOX0VSUk9SKTtcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyAnQXV0aCB0b2tlbiByZXF1ZXN0ZWQgYnV0IGNvdWxuXFwndCBiZSBmZXRjaGVkIGJ5IGFueSBtZWFucy4nO1xuICAgIH1cbiAgfVxuXG5cblxuICAvKipcbiAgICogT3BlbnMgYW5kIHNlbmRzIGEgWE1MSHR0cFJlcXVlc3QgdG8gdGhlIGNvbmZpZ3VyZWQgYXV0aFRva2VuVVJMXG4gICAqXG4gICAqIElmIENWSU8uYXV0aFRva2VuVVJMIGRvZXNuJ3QgZXhpc3Qgb3IgdGhlIHJlcXVlc3QgZGlkbid0IHN1Y2NlZWRcbiAgICovXG4gIENWSU8uZmV0Y2hBdXRoVG9rZW4gPSBmdW5jdGlvbihvblN1Y2Nlc3MsIG9uRXJyb3IpIHtcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICB4aHIub3BlbignR0VUJywgQ1ZJTy5zZXR0aW5ncy5hdXRob3JpemF0aW9uVG9rZW5VUkwsIHRydWUpO1xuXG4gICAgaWYgKG9uRXJyb3IgIT0gdW5kZWZpbmVkKVxuICAgICAgeGhyLm9uZXJyb3IgPSBvbkVycm9yO1xuXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKVxuICAgICAgICBvblN1Y2Nlc3MoeGhyLnJlc3BvbnNlKVxuICAgICAgZWxzZSBvbkVycm9yKCk7XG4gICAgfTtcbiAgICB4aHIuc2VuZCgnbG9hZCcpO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIHRoZSBDVklPIFNjcmVlblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc2V0dGluZ3MgLSBDVklPRGlzcGxheSBzZXR0aW5nc1xuICAgKi9cbiAgQ1ZJT0Rpc3BsYXkgPSBmdW5jdGlvbihzZXR0aW5ncykge1xuICAgIHRoaXMucmZiID0gbnVsbDtcbiAgICB0aGlzLnJhQXR0cnMgPSBudWxsO1xuICAgIHRoaXMuY29ubmVjdGluZyA9IGZhbHNlO1xuXG4gICAgLy8gQ1ZJTyBTY3JlZW4gU2V0dGluZ3NcbiAgICB0aGlzLnNldHRpbmdzID0gZXh0ZW5kKHtcbiAgICAgIHRhcmdldCA6ICAgICAgICAgICAgICBudWxsLCAvLyBUYXJnZXQgY2FudmFzIGVsZW1lbnRcbiAgICAgIGNsaWVudEhhbmRsZSA6ICAgICAgICBudWxsLCAvLyBEZXZpY2UgaWRlbnRpZmljYXRpb25cbiAgICAgIGNsaWVudEhhbmRsZUtleTogICAgICAndCcsICAvLyBEZXZpY2UgaGFuZGxlXG4gICAgICByYUF0dHJzVGltZW91dDogICAgICAgNTAwMCwgLy8gVGltZW91dCBmb3IgZmV0Y2hpbmcgUkEgYXR0cmlidXRlc1xuICAgICAgcmV0cnlEZWxheTogICAgICAgICAgIDIwMDAsIC8vIERlbGF5IHRvIHJldHJ5IGNvbm5lY3Rpb24gaWYgY2xpZW50IGlzIG5vdCBjb25uZWN0ZWQgdG8gYSBnYXRld2F5XG4gICAgICBwYXNzd29yZDogICAgICAgICAgICAgJycsICAgLy8gUGFzc3dvcmQgZm9yIHRoZSBWTkMgc2VydmVyXG4gICAgICBjb25uZWN0T25Jbml0OiAgICAgICAgdHJ1ZSAgLy8gV2hldGhlciBvciBub3QgYXR0ZW1wdCByZW1vdGUgYWNjZXNzIGNvbm5lY3Rpb24gYWZ0ZXIgaW5pdGlhbGl6YXRpb25cbiAgICB9LCBzZXR0aW5ncyk7XG5cbiAgICAvLyBSRkIgU2V0dGluZ3NcbiAgICB0aGlzLlJGQlNldHRpbmdzID0ge1xuICAgICAgJ3RhcmdldCc6ICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudGFyZ2V0LFxuICAgICAgJ2VuY3J5cHQnOiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJodHRwczpcIixcbiAgICAgICdyZXBlYXRlcklEJzogICAgICAgICAnJyxcbiAgICAgICd0cnVlX2NvbG9yJzogICAgICAgICB0cnVlLFxuICAgICAgJ2xvY2FsX2N1cnNvcic6ICAgICAgIHRydWUsXG4gICAgICAnc2hhcmVkJzogICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICd2aWV3X29ubHknOiAgICAgICAgICBmYWxzZSxcbiAgICAgICdvblBhc3N3b3JkUmVxdWlyZWQnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnBhc3N3b3JkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICdvblVwZGF0ZVN0YXRlJzogICAgICBmdW5jdGlvbihyZmIsIHN0YXRlLCBvbGRzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJGQlVwZGF0ZVN0YXRlKHJmYiwgc3RhdGUsIG9sZHN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksXG4gICAgfVxuXG4gICAgLy8gQXNzZXJ0IG1hbmRhdG9yeSBzZXR0aW5nc1xuICAgIGlmICh0aGlzLnNldHRpbmdzLnRhcmdldCA9PSBudWxsKSBcbiAgICAgIHRocm93ICdDVklPIFNjcmVlbiB0YXJnZXQgZWxlbWVudCBkb2VzIG5vdCBleGlzdC4nO1xuICAgIGlmICh0aGlzLnNldHRpbmdzLmNsaWVudEhhbmRsZSA9PSBudWxsKSBcbiAgICAgIHRocm93ICdEZXZpY2UgSUQgaXMgbWlzc2luZy4nO1xuXG4gICAgLy8gUmVnaXN0ZXIgY2FsbGJhY2tzXG4gICAgdGhpcy5yZWFjdG9yID0gbmV3IFJlYWN0b3IoKTtcblxuICAgIC8vIFJlZ2lzdGVyIENWSU8gZXZlbnQgbGlzdGVuZXJzXG4gICAgQ1ZJTy5yZWFjdG9yLmFkZEV2ZW50TGlzdGVuZXIoQ1ZJTy5FVl9TRVRfQVVUSF9UT0tFTiwgZnVuY3Rpb24oKSB7XG4gICAgICAvLyBDb250aW51ZSB3aXRoIGNvbm5lY3RpbmdcbiAgICAgIGlmICh0aGlzLmNvbm5lY3RpbmcpXG4gICAgICAgIHRoaXMuY29ubmVjdCgpO1xuICAgIH0sIHRoaXMpO1xuXG4gIH07XG5cblxuXG4gIC8vIEV2ZW50c1xuICBDVklPRGlzcGxheS5FVl9VUERBVEVfU1RBVEUgID0gJ3JhVXBkYXRlU3RhdGUnO1xuICBDVklPRGlzcGxheS5FVl9DT05ORUNUICAgICAgID0gJ2Nvbm5lY3QnO1xuICBDVklPRGlzcGxheS5FVl9ESVNDT05ORUNUICAgID0gJ2Rpc2Nvbm5lY3QnO1xuICBDVklPRGlzcGxheS5FVl9DT05ORUNUX0VSUk9SID0gJ2Nvbm5lY3RFcnJvcic7XG4gIENWSU9EaXNwbGF5LkVWX0VSUk9SICAgICAgICAgPSAnZXJyb3InO1xuXG5cblxuICAvKipcbiAgICogRW5hYmxlIHJlZ2lzdGVyaW5nIGV2ZW50IGNhbGxiYWNrc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lIC0gZXZlbnQgbmFtZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gY2FsbGJhY2tTZWxmIC0gdGhlIHRoaXMgZm9yIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgKi9cbiAgQ1ZJT0Rpc3BsYXkucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2FsbGJhY2ssIGNhbGxiYWNrU2VsZikge1xuICAgIHRoaXMucmVhY3Rvci5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2ssIGNhbGxiYWNrU2VsZik7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBGZXRjaGVzIFJBIGF0dHJpYnV0ZXMgZnJvbSB0aGUgU2VhQ2F0IFBhbmVsXG4gICAqIEZpcmVzICdyYUF0dHJzTG9hZCcgZXZlbnQgd2hlbiBhdHRyaWJ1dGVzIGFyZSBsb2FkZWRcbiAgICogRmlyZXMgJ3JhQXR0cnNFcnJvcicgZXZlbnQgd2hlbiBhdHRyaWJ1dGVzIGNvdWxkbid0IGJlIGxvYWRlZFxuICAgKlxuICAgKi9cbiAgQ1ZJT0Rpc3BsYXkucHJvdG90eXBlLnJhRmV0Y2hBdHRycyA9IGZ1bmN0aW9uIChvblN1Y2Nlc3MsIG9uQWNjZXNzRGVuaWVkLCBvbkVycm9yKVxuICB7XG4gICAgdmFyIHVybCA9ICcnXG4gICAgdXJsICs9IENWSU8uc2V0dGluZ3MudXJsKycvYXBpL3JhL2VuZHBvaW50JztcbiAgICB1cmwgKz0gJz8nK3RoaXMuc2V0dGluZ3MuY2xpZW50SGFuZGxlS2V5Kyc9Jyt0aGlzLnNldHRpbmdzLmNsaWVudEhhbmRsZVxuXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtU0MtQXV0aFRva2VuJywgQ1ZJTy5zZXR0aW5ncy5hdXRob3JpemF0aW9uVG9rZW4pO1xuXG4gICAgaWYgKG9uRXJyb3IgIT0gdW5kZWZpbmVkKVxuICAgICAgeGhyLm9uZXJyb3IgPSBvbkVycm9yO1xuXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKVxuICAgICAgICBvblN1Y2Nlc3MoSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpKTtcbiAgICAgIGVsc2UgaWYgKHhoci5zdGF0dXMgPT0gNDAzKVxuICAgICAgICBvbkFjY2Vzc0RlbmllZCgpO1xuICAgICAgZWxzZVxuICAgICAgICBvbkVycm9yKCk7XG4gICAgfTtcbiAgICB4aHIuc2VuZCgnbG9hZCcpO1xuICB9XG5cblxuICAvKipcbiAgICogUmVxdWVzdHMgUkEgYXR0cmlidXRlc1xuICAgKlxuICAgKiBJZiBSQSBhdHRyaWJ1dGVzIGFyZSBub3QgcHJlc2VudCBhdHRlbXB0cyB0byBmZXRjaCB0aGVtLlxuICAgKiBJZiBSQSBhdHRyaWJ1dGVzIGNhbid0IGJlIGRvd25sb2FkZWQgZHVlIHRvIG1pc3Npbmcgb3IgaW52YWxpZCBhdXRoIHRva2VuLCByZXF1ZXN0cyBhdXRoIHRva2VuIGZyb20gQ1ZJT1xuICAgKlxuICAgKi9cbiAgQ1ZJT0Rpc3BsYXkucHJvdG90eXBlLnJlcXVlc3RSYUF0dHJzID0gZnVuY3Rpb24ob25UaW1lb3V0KVxuICB7XG4gICAgLy8gUmVxdWVzdCBhdXRoIHRva2VuIGlmIG5lZWRlZFxuICAgIGlmIChDVklPLnNldHRpbmdzLmF1dGhvcml6YXRpb25Ub2tlbiA9PSBudWxsKSB7XG4gICAgICBDVklPLnJlcXVlc3RBdXRoVG9rZW4oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5yZXF1ZXN0ZWRSYUF0dHJzID0gdHJ1ZTtcbiAgICB0aGlzLnJhRmV0Y2hBdHRycyhcbiAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3MocmFBdHRycykge1xuICAgICAgICBzZWxmLnJhQXR0cnMgPSByYUF0dHJzO1xuICAgICAgICBzZWxmLnJlcXVlc3RlZFJhQXR0cnMgPSBmYWxzZTtcblxuICAgICAgICAvLyBDb250aW51ZSB3aXRoIGNvbm5lY3RpbmdcbiAgICAgICAgaWYgKHNlbGYuY29ubmVjdGluZylcbiAgICAgICAgICBzZWxmLmNvbm5lY3QoKTtcbiAgICAgIH0sXG4gICAgICBmdW5jdGlvbiBhY2Nlc3NEZW5pZWQoKSB7XG4gICAgICAgIENWSU8ucmVxdWVzdEF1dGhUb2tlbigpO1xuICAgICAgfSxcbiAgICAgIGZ1bmN0aW9uIGVycm9yKCkge1xuICAgICAgICB0aHJvdyAnQ2FuXFwndCBmZXRjaCBSQSBhdHRyaWJ1dGVzLidcbiAgICAgIH0pO1xuXG4gICAgLy8gZmV0Y2ggUkEgQXR0cnMgdGFrZXMgdG9vIGxvbmc6XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGlmIChzZWxmLnJlcXVlc3RlZFJhQXR0cnMpXG4gICAgICAgIG9uVGltZW91dCgpO1xuICAgICAgc2VsZi5yZXF1ZXN0ZWRSYUF0dHJzID0gZmFsc2U7XG4gICAgfSwgdGhpcy5zZXR0aW5ncy5yYUF0dHJzVGltZW91dCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBDb25uZWN0cyB0byB0aGUgd2Vic29ja2V0IHByb3h5XG4gICAqXG4gICAqL1xuICBDVklPRGlzcGxheS5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBUaGlzIHZhcmlhYmxlIGRldGVybWluZXMgd2hldGhlciBjb25uZWN0KCkgc2hvdWxkIGJlIHJlYXR0ZW1wdGVkXG4gICAgLy8gd2hlbiBmcmVzaCBhdHRyaWJ1dGVzIGFyZSBzZXQuIE90aGVyIG1ldGhvZHMgbXVzdCBjYWxsIGNvbm5lY3QoKVxuICAgIC8vIG9ubHkgd2hlbiB0aGlzLmNvbm5lY3RpbmcgaXMgc2V0IHRvIHRydWUhXG4gICAgLy8gVE9ETzogY2FuIHRoaXMgYmUgZGV0ZXJtaW5lZCBieSB2YWxpZGF0aW5nICd0aGlzJyB0byBiZSBhIENWSU9EaXNwbGF5IG9iamVjdD9cbiAgICB0aGlzLmNvbm5lY3RpbmcgPSB0cnVlO1xuXG4gICAgLy8gUmVxdWVzdCBSQSBhdHRyaWJ1dGVzIGlmIG5vdCBwcmVzZW50XG4gICAgaWYgKHRoaXMucmFBdHRycyA9PSBudWxsKSB7XG4gICAgICB0aGlzLnJlcXVlc3RSYUF0dHJzKGZ1bmN0aW9uIG9uVGltZW91dCgpe1xuICAgICAgICAvLyBDb3VsZG4ndCBmZXRjaCBSQSBhdHRyaWJ1dGVzIGJlZm9yZSB0aW1lb3V0XG4gICAgICAgIHRoaXMuY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChDVklPRGlzcGxheS5FVl9DT05ORUNUX0VSUk9SLCAncmFBdHRyc1RpbWVvdXQnKVxuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDb3VsZCBnZXQgUkEgYXR0cmlidXRlcyBidXQgdGhlIGNsaWVudCBpcyBub3QgZXN0YWJsaXNoZWRcbiAgICBlbHNlIGlmICghdGhpcy5yYUF0dHJzLmVzdGFibGlzaGVkKSB7XG4gICAgICAvLyBSZXNldCByYUF0dHJzIHNvIHRoYXQgdGhleSBhcmUgcmUtcmVxdWVzdGVkIG9uIHRoZSBuZXh0IGNvbm5lY3QoKSBjYWxsXG4gICAgICB0aGlzLnJhQXR0cnMgPSBudWxsO1xuICAgICAgdGhpcy5jb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChDVklPRGlzcGxheS5FVl9DT05ORUNUX0VSUk9SLCAnY2xpZW50Tm90RXN0YWJsaXNoZWQnKVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFRyeSB0byBpbml0aWFsaXplIFJGQlxuICAgIHRyeSB7XG4gICAgICB0aGlzLnJmYiA9IG5ldyBub1ZOQy5SRkIodGhpcy5SRkJTZXR0aW5ncyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5yZWFjdG9yLmRpc3BhdGNoRXZlbnQoQ1ZJT0Rpc3BsYXkuRVZfQ09OTkVDVF9FUlJPUiwgZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHByb3RvY29sID0gJ3dzOi8vJztcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLnByb3RvY29sID09ICdodHRwczonIHx8IHRoaXMucmFBdHRycy5saW5rLnNzbF9vbmx5ID09PSB0cnVlKVxuICAgICAgcHJvdG9jb2wgPSAnd3NzOi8vJztcblxuICAgIHZhciB1cmwgPSAnJztcbiAgICB1cmwgKz0gcHJvdG9jb2w7XG4gICAgdXJsICs9IHRoaXMucmFBdHRycy5saW5rLndzX2hvc3QgKyAnOicgKyB0aGlzLnJhQXR0cnMubGluay53c19wb3J0O1xuICAgIHVybCArPSAnLycrdGhpcy5yYUF0dHJzLmxpbmsuY2xpZW50X2lkKycvJyt0aGlzLnJhQXR0cnMubGluay5nd19pcDtcbiAgICB1cmwgKz0gJz9jdmlvX25vbmNlPScrdGhpcy5yYUF0dHJzLmxpbmsubm9uY2U7XG5cbiAgICAvLyBXaGV0aGVyIG9yIG5vdCB0aGUgY29ubmVjdCB3YXMgc3VjY2Vzc2Z1bCBpcyBmdXJ0aGVyIGRldGVybWluZWQgYnkgUkZCIHN0YXRlIGNoYW5nZXNcbiAgICAvLyBzZWUgQ1ZJT0Rpc3BsYXkucHJvdG90eXBlLm9uUkZCVXBkYXRlU3RhdGVcbiAgICB0aGlzLnJmYi5jb25uZWN0KHVybCwgJycpO1xuICAgIHRoaXMuY29ubmVjdGluZyA9IGZhbHNlO1xuICB9XG5cblxuICAvKipcbiAgICogRGlzY29ubmVjdHMgZnJvbSBSQVxuICAgKi9cbiAgQ1ZJT0Rpc3BsYXkucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jb25uZWN0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5yZmIuZGlzY29ubmVjdCgpO1xuICB9XG5cblxuICAvKipcbiAgICogSGFuZGxlcyBSRkIgb25VcGRhdGVTdGF0ZVxuICAgKi9cbiAgQ1ZJT0Rpc3BsYXkucHJvdG90eXBlLm9uUkZCVXBkYXRlU3RhdGUgPSBmdW5jdGlvbihyZmIsIHN0YXRlLCBvbGRzdGF0ZSkge1xuICAgIC8vIFVwZGF0ZSBzdGF0ZSBcbiAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChDVklPRGlzcGxheS5FVl9VUERBVEVfU1RBVEUsIHN0YXRlLCBvbGRzdGF0ZSk7XG5cbiAgICAvLyBTcGNpZmljIHN0YXRlc1xuICAgIC8vIFxuICAgIGlmIChzdGF0ZSA9PSAnbm9ybWFsJyAmJiBvbGRzdGF0ZSA9PSAnU2VydmVySW5pdGlhbGlzYXRpb24nKSB7XG4gICAgICAvLyBTdWNjZXNzZnVsbHkgY29ubmVjdGVkXG4gICAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChDVklPRGlzcGxheS5FVl9DT05ORUNUKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc3RhdGUgPT0gJ2Rpc2Nvbm5lY3RlZCcgJiYgb2xkc3RhdGUgPT0gJ2Rpc2Nvbm5lY3QnKSB7XG4gICAgICAvLyBTdWNjZXNzZnVsbHkgZGlzY29ubmVjdGVkXG4gICAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChDVklPRGlzcGxheS5FVl9ESVNDT05ORUNUKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc3RhdGUgPT0gJ2Rpc2Nvbm5lY3QnICYmIG9sZHN0YXRlID09ICdjb25uZWN0aW5nJykge1xuICAgICAgLy8gRHJvcHBlZCBieSB3ZWJzb2NraWZ5IG9yIGdhdGV3YXkuXG4gICAgICAvLyBTb21lIHBvc3NpYmxlIHJlYXNvbnM6XG4gICAgICAvLyAtIGludmFsaWQgbm9uY2UsXG4gICAgICAvLyAtIFNPQ0tTIGV4dGVuc2lvbiBvbiBnYXRld2F5IG5vdCBhdmFpbGFibGVcbiAgICAgIC8vIC0gY2xpZW50IG5vdCBlc3RhYmxpc2hlZCAoYWNjb3JkaW5nIHRvIHRoZSBnYXRld2F5KVxuICAgICAgdGhpcy5yZWFjdG9yLmRpc3BhdGNoRXZlbnQoQ1ZJT0Rpc3BsYXkuRVZfQ09OTkVDVF9FUlJPUiwgJ2NsaWVudFVuYXZhaWxhYmxlJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHN0YXRlID09ICdmYWlsZWQnICYmIG9sZHN0YXRlID09ICdQcm90b2NvbFZlcnNpb24nKSB7XG4gICAgICAvLyBDb25uZWN0aW9uIGZhaWx1cmUgb24gaW4gcHJvdG9jb2wgdmVyc2lvbiBwaGFzZVxuICAgICAgdGhpcy5yZWFjdG9yLmRpc3BhdGNoRXZlbnQoQ1ZJT0Rpc3BsYXkuRVZfQ09OTkVDVF9FUlJPUiwgJ3Byb3RvY29sVmVyc2lvbicpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzdGF0ZSA9PSAnZmFpbGVkJyAmJiBvbGRzdGF0ZSA9PSAnbm9ybWFsJykge1xuICAgICAgLy8gQ29ubmVjdGlvbiBpbnRlcnJ1cHRcbiAgICAgIHRoaXMucmVhY3Rvci5kaXNwYXRjaEV2ZW50KENWSU9EaXNwbGF5LkVWX0VSUk9SLCAnaW50ZXJydXB0Jyk7XG4gICAgfVxuICB9XG5cblxuXG4gIHdpbmRvdy5DVklPID0gQ1ZJTztcbiAgd2luZG93LkNWSU9EaXNwbGF5ID0gQ1ZJT0Rpc3BsYXk7XG5cbn0pKHdpbmRvdywgdW5kZWZpbmVkKTtcbiIsIi8qIENvcHlyaWdodCAyMDE3IE1pbG9zbGF2IFBhdmVsa2FcbkxpY2Vuc2VkIHVuZGVyIEJTRC0zLUNsYXVzZVxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuMy4gTmVpdGhlciB0aGUgbmFtZSBvZiB0aGUgY29weXJpZ2h0IGhvbGRlciBub3IgdGhlIG5hbWVzIG9mIGl0cyBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuKi9cblxuXG4vKipcbiAqIENhbGxiYWNrIGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRTZWxmIC0gdGhlIGRlZmF1bHQgdGhpcyBmb3IgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gKi9cbnZhciBDYWxsYmFjayA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBjYWxsYmFja1NlbGYpIHtcbiAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICB0aGlzLnNlbGYgPSBjYWxsYmFja1NlbGY7XG5cbiAgaWYgKHRoaXMuc2VsZiA9PSB1bmRlZmluZWQpXG4gICAgdGhpcy5zZWxmID0gbnVsbDtcbn1cblxuLyoqXG4gKiBDYWxscyB0aGUgY2FsbGJhY2tcbiAqIFRoaXMgbWV0aG9kJ3Mgcmd1bWVudHMgYXJlIHBhc3NlZCB0byB0aGUgY2FsbGJhY2tcbiAqL1xuQ2FsbGJhY2sucHJvdG90eXBlLmV4ZWN1dGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jYWxsYmFjay5hcHBseSh0aGlzLnNlbGYsIGFyZ3VtZW50cyk7XG59XG5cbi8qKlxuICogRXZlbnQgY2xhc3NcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gZXZlbnQgbmFtZVxuICovXG52YXIgRXZlbnQgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMuY2FsbGJhY2tzID0gW11cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBjYWxsYmFja3NcbiAqL1xuRXZlbnQucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2FsbGJhY2tzID0gW11cbn1cblxuLyoqXG4gKiBSZWFjdG9yIGNsYXNzXG4gKi9cbnZhciBSZWFjdG9yID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZXZlbnRzID0ge307XG59XG5cbi8qKlxuICogUmVnaXN0ZXIgYSBjYWxsYmFjayBmb3IgYW4gZXZlbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgLSBldmVudCBuYW1lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IGNhbGxiYWNrU2VsZiAtIHRoZSB0aGlzIGZvciB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAqL1xuUmVhY3Rvci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgY2FsbGJhY2ssIGNhbGxiYWNrU2VsZikge1xuICAvLyBQdXNoIGV2ZW50IG5hbWUgaWYgbm90IGV4aXN0cyB5ZXRcbiAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPT0gdW5kZWZpbmVkKVxuICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBuZXcgRXZlbnQoZXZlbnROYW1lKVxuXG4gIC8vIFJlZ2lzdGVyIGNhbGxiYWNrXG4gIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uY2FsbGJhY2tzLnB1c2gobmV3IENhbGxiYWNrKGNhbGxiYWNrLCBjYWxsYmFja1NlbGYpKTtcbn1cblxuLyoqXG4gKiBBc3luY2hyb25vdXNseSBleGVjdXRlcyBhbGwgY2FsbGJhY2tzIG9mIGFuIGV2ZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lIC0gZXZlbnQgbmFtZVxuICovXG5SZWFjdG9yLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24oZXZlbnROYW1lKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICBcbiAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPT0gdW5kZWZpbmVkKSB7XG4gICAgLy90aHJvdyBcIk5vIGNhbGxiYWNrcyBmb3IgZXZlbnQgXCIrZXZlbnROYW1lO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZvciAoeCBpbiB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmNhbGxiYWNrcykge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHNlbGYuZXZlbnRzW2V2ZW50TmFtZV0uY2FsbGJhY2tzW3hdLmV4ZWN1dGUuYXBwbHkoc2VsZi5ldmVudHNbZXZlbnROYW1lXS5jYWxsYmFja3NbeF0sIGFyZ3MpO1xuICAgIH0sIDApO1xuICB9XG59XG5cbi8qKlxuICogUmVzZXRzIGNhbGxiYWNrcyBhcnJheSBmb3IgYW4gZXZlbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgLSBldmVudCBuYW1lXG4gKi9cblJlYWN0b3IucHJvdG90eXBlLnJlc2V0RXZlbnQgPSBmdW5jdGlvbihldmVudE5hbWUpIHtcbiAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pXG4gICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5yZXNldCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0b3I7XG4iXX0=
