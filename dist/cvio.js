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
      authToken: null,                  // SeaCat Panel auth token in plain text
      authTokenURL: null,               // URL where auth token can be fetched
      onAuthTokenRequest: null,
      url: null                         // SeaCat Panel URL
    }, settings);

    CVIO.authTokenRequested = false;
    CVIO.reactor = new Reactor();

    // if (CVIO.settings.authToken == null && CVIO.settings.authTokenURL != null)
    //   CVIO.fetchAuthToken();
    // else if (CVIO.settings.authToken == null && CVIO.settings.authTokenURL == null)
    //   throw 'SeaCat Panel Auth Token not specified.';
  }



  /**
   * Sets the auth token, unlocks authToken requests
   * and fires 'authTokenSet' event.
   *
   * @param {String} authToken - auth token
   */
  CVIO.setAuthToken = function(authToken) {
    CVIO.settings.authToken = authToken;
    CVIO.reactor.dispatchEvent(CVIO.EV_SET_AUTH_TOKEN);

    // Delay is applied to flush late requests
    setTimeout(function() {
      CVIO.settings.authTokenRequested = false;
    }, 200);
  }



  /**
   * Requests new token to be obtained and locks further requests until setAuthToken is called.
   *
   * User can define a CVIO.settings.onAuthTokenRequest callback function
   * where he is obliged to call setAuthToken manually.
   *
   * If user callback is not present, this method attempts
   * to fetch the token from the url set in CVIO.settings.authTokenURL
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

    else if (CVIO.settings.authTokenURL) {
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

    xhr.open('GET', CVIO.settings.authTokenURL, true);

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
      deviceId :            null, // Device identification
      deviceHandle:         't',  // Device handle
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
                              this.reactor.dispatchEvent(CVIODisplay.EV_UPDATE_STATE, state, oldstate)
                            }.bind(this),
    }


    if (this.settings.target == null) 
      throw 'CVIO Screen target element does not exist.';
    if (this.settings.deviceId == null) 
      throw 'Device ID is missing.';


    // Register callbacks
    this.reactor = new Reactor();
    this.reactor.addEventListener(CVIODisplay.EV_ATTRS_LOAD, this.onRaAttrsLoad, this);

    // Register CVIO event listeners
    CVIO.reactor.addEventListener(CVIO.EV_SET_AUTH_TOKEN, function() {
      // Continue with connecting
      if (this.connecting)
        this.connect();
    }, this);

  };



  // Events
  CVIODisplay.EV_UPDATE_STATE = 'raUpdateState';
  CVIODisplay.EV_ATTRS_LOAD = 'raAttrsLoad';



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
    url += '?'+this.settings.deviceHandle+'='+this.settings.deviceId

    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.setRequestHeader('X-SC-AuthToken', CVIO.settings.authToken);

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
  CVIODisplay.prototype.requestRaAttrs = function()
  {
    // Request auth token if needed
    if (CVIO.settings.authToken == null) {
      CVIO.requestAuthToken();
      return;
    }

    var self = this;
    this.raFetchAttrs(
      function success(raAttrs) {
        self.raAttrs = raAttrs;

        // Continue with connecting
        if (self.connecting)
          self.connect();
      },
      function accessDenied() {
        CVIO.requestAuthToken();
      },
      function error() {
        throw 'Can\'t fetch RA attributes.'
      })
  }


  /**
   * Connects to the websocket proxy
   *
   */
  CVIODisplay.prototype.connect = function () {
    this.connecting = true;

    // Request RA attributes if not present
    if (this.raAttrs == null) {
      this.requestRaAttrs();
      return;
    }

    // Try to initialize RFB
    try {
      this.rfb = new noVNC.RFB(this.RFBSettings);
    } catch (e) {
      this.reactor.dispatchEvent('initError', e);
    }

    var protocol = 'ws://';
        if (window.location.protocol == 'https:' || this.raAttrs.link.sslonly === true)
          protocol = 'wss://';

    var url = '';
    
    url += protocol;
    url += this.raAttrs.link.ws_host + ':' + this.raAttrs.link.ws_port;
    url += '/'+this.raAttrs.link.client_id+'/'+this.raAttrs.link.gw_ip;
    url += '?cvio_nonce='+this.raAttrs.link.nonce;

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



  window.CVIO = CVIO;
  window.CVIODisplay = CVIODisplay;
  if (window.cvioAsyncInit !== undefined)
    window.cvioAsyncInit()

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tcGF2ZWxrYS9Xb3Jrc3BhY2UvVGVza2FMYWJzL0dpdEh1Yi9DYXRWaXNpb24tRGlzcGxheS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL21wYXZlbGthL1dvcmtzcGFjZS9UZXNrYUxhYnMvR2l0SHViL0NhdFZpc2lvbi1EaXNwbGF5L25vZGVfbW9kdWxlcy9ib3dzZXIvYm93c2VyLmpzIiwiL1VzZXJzL21wYXZlbGthL1dvcmtzcGFjZS9UZXNrYUxhYnMvR2l0SHViL0NhdFZpc2lvbi1EaXNwbGF5L25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsIi9Vc2Vycy9tcGF2ZWxrYS9Xb3Jrc3BhY2UvVGVza2FMYWJzL0dpdEh1Yi9DYXRWaXNpb24tRGlzcGxheS9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2RlYnVnLmpzIiwiL1VzZXJzL21wYXZlbGthL1dvcmtzcGFjZS9UZXNrYUxhYnMvR2l0SHViL0NhdFZpc2lvbi1EaXNwbGF5L25vZGVfbW9kdWxlcy9tcy9pbmRleC5qcyIsIi9Vc2Vycy9tcGF2ZWxrYS9Xb3Jrc3BhY2UvVGVza2FMYWJzL0dpdEh1Yi9DYXRWaXNpb24tRGlzcGxheS9ub2RlX21vZHVsZXMvbm92bmMtbm9kZS9pbmRleC5qcyIsIi9Vc2Vycy9tcGF2ZWxrYS9Xb3Jrc3BhY2UvVGVza2FMYWJzL0dpdEh1Yi9DYXRWaXNpb24tRGlzcGxheS9ub2RlX21vZHVsZXMvbm92bmMtbm9kZS9saWIvYmFzZTY0LmpzIiwiL1VzZXJzL21wYXZlbGthL1dvcmtzcGFjZS9UZXNrYUxhYnMvR2l0SHViL0NhdFZpc2lvbi1EaXNwbGF5L25vZGVfbW9kdWxlcy9ub3ZuYy1ub2RlL2xpYi9kZXMuanMiLCIvVXNlcnMvbXBhdmVsa2EvV29ya3NwYWNlL1Rlc2thTGFicy9HaXRIdWIvQ2F0VmlzaW9uLURpc3BsYXkvbm9kZV9tb2R1bGVzL25vdm5jLW5vZGUvbGliL2Rpc3BsYXkuanMiLCIvVXNlcnMvbXBhdmVsa2EvV29ya3NwYWNlL1Rlc2thTGFicy9HaXRIdWIvQ2F0VmlzaW9uLURpc3BsYXkvbm9kZV9tb2R1bGVzL25vdm5jLW5vZGUvbGliL2lucHV0LmpzIiwiL1VzZXJzL21wYXZlbGthL1dvcmtzcGFjZS9UZXNrYUxhYnMvR2l0SHViL0NhdFZpc2lvbi1EaXNwbGF5L25vZGVfbW9kdWxlcy9ub3ZuYy1ub2RlL2xpYi9rYmR1dGlsLmpzIiwiL1VzZXJzL21wYXZlbGthL1dvcmtzcGFjZS9UZXNrYUxhYnMvR2l0SHViL0NhdFZpc2lvbi1EaXNwbGF5L25vZGVfbW9kdWxlcy9ub3ZuYy1ub2RlL2xpYi9rZXlzLmpzIiwiL1VzZXJzL21wYXZlbGthL1dvcmtzcGFjZS9UZXNrYUxhYnMvR2l0SHViL0NhdFZpc2lvbi1EaXNwbGF5L25vZGVfbW9kdWxlcy9ub3ZuYy1ub2RlL2xpYi9yZmIuanMiLCIvVXNlcnMvbXBhdmVsa2EvV29ya3NwYWNlL1Rlc2thTGFicy9HaXRIdWIvQ2F0VmlzaW9uLURpc3BsYXkvbm9kZV9tb2R1bGVzL25vdm5jLW5vZGUvbGliL3RpbmYuanMiLCIvVXNlcnMvbXBhdmVsa2EvV29ya3NwYWNlL1Rlc2thTGFicy9HaXRIdWIvQ2F0VmlzaW9uLURpc3BsYXkvbm9kZV9tb2R1bGVzL25vdm5jLW5vZGUvbGliL3V0aWwuanMiLCIvVXNlcnMvbXBhdmVsa2EvV29ya3NwYWNlL1Rlc2thTGFicy9HaXRIdWIvQ2F0VmlzaW9uLURpc3BsYXkvbm9kZV9tb2R1bGVzL25vdm5jLW5vZGUvbGliL3dlYnNvY2suanMiLCIvVXNlcnMvbXBhdmVsa2EvV29ya3NwYWNlL1Rlc2thTGFicy9HaXRIdWIvQ2F0VmlzaW9uLURpc3BsYXkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIi9Vc2Vycy9tcGF2ZWxrYS9Xb3Jrc3BhY2UvVGVza2FMYWJzL0dpdEh1Yi9DYXRWaXNpb24tRGlzcGxheS9zcmMvZmFrZV81NmVlOWU3Ni5qcyIsIi9Vc2Vycy9tcGF2ZWxrYS9Xb3Jrc3BhY2UvVGVza2FMYWJzL0dpdEh1Yi9DYXRWaXNpb24tRGlzcGxheS9zcmMvcmVhY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaFNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3paQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMWxCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4K0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNWZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4VUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyohXG4gICogQm93c2VyIC0gYSBicm93c2VyIGRldGVjdG9yXG4gICogaHR0cHM6Ly9naXRodWIuY29tL2RlZC9ib3dzZXJcbiAgKiBNSVQgTGljZW5zZSB8IChjKSBEdXN0aW4gRGlheiAyMDE0XG4gICovXG5cbiFmdW5jdGlvbiAobmFtZSwgZGVmaW5pdGlvbikge1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHNbJ2Jyb3dzZXInXSA9IGRlZmluaXRpb24oKVxuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKGRlZmluaXRpb24pXG4gIGVsc2UgdGhpc1tuYW1lXSA9IGRlZmluaXRpb24oKVxufSgnYm93c2VyJywgZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICAqIFNlZSB1c2VyYWdlbnRzLmpzIGZvciBleGFtcGxlcyBvZiBuYXZpZ2F0b3IudXNlckFnZW50XG4gICAgKi9cblxuICB2YXIgdCA9IHRydWVcblxuICBmdW5jdGlvbiBkZXRlY3QodWEpIHtcblxuICAgIGZ1bmN0aW9uIGdldEZpcnN0TWF0Y2gocmVnZXgpIHtcbiAgICAgIHZhciBtYXRjaCA9IHVhLm1hdGNoKHJlZ2V4KTtcbiAgICAgIHJldHVybiAobWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID4gMSAmJiBtYXRjaFsxXSkgfHwgJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2Vjb25kTWF0Y2gocmVnZXgpIHtcbiAgICAgIHZhciBtYXRjaCA9IHVhLm1hdGNoKHJlZ2V4KTtcbiAgICAgIHJldHVybiAobWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID4gMSAmJiBtYXRjaFsyXSkgfHwgJyc7XG4gICAgfVxuXG4gICAgdmFyIGlvc2RldmljZSA9IGdldEZpcnN0TWF0Y2goLyhpcG9kfGlwaG9uZXxpcGFkKS9pKS50b0xvd2VyQ2FzZSgpXG4gICAgICAsIGxpa2VBbmRyb2lkID0gL2xpa2UgYW5kcm9pZC9pLnRlc3QodWEpXG4gICAgICAsIGFuZHJvaWQgPSAhbGlrZUFuZHJvaWQgJiYgL2FuZHJvaWQvaS50ZXN0KHVhKVxuICAgICAgLCBlZGdlVmVyc2lvbiA9IGdldEZpcnN0TWF0Y2goL2VkZ2VcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICAsIHZlcnNpb25JZGVudGlmaWVyID0gZ2V0Rmlyc3RNYXRjaCgvdmVyc2lvblxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgICwgdGFibGV0ID0gL3RhYmxldC9pLnRlc3QodWEpXG4gICAgICAsIG1vYmlsZSA9ICF0YWJsZXQgJiYgL1teLV1tb2JpL2kudGVzdCh1YSlcbiAgICAgICwgcmVzdWx0XG5cbiAgICBpZiAoL29wZXJhfG9wci9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdPcGVyYSdcbiAgICAgICwgb3BlcmE6IHRcbiAgICAgICwgdmVyc2lvbjogdmVyc2lvbklkZW50aWZpZXIgfHwgZ2V0Rmlyc3RNYXRjaCgvKD86b3BlcmF8b3ByKVtcXHNcXC9dKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvd2luZG93cyBwaG9uZS9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdXaW5kb3dzIFBob25lJ1xuICAgICAgLCB3aW5kb3dzcGhvbmU6IHRcbiAgICAgIH1cbiAgICAgIGlmIChlZGdlVmVyc2lvbikge1xuICAgICAgICByZXN1bHQubXNlZGdlID0gdFxuICAgICAgICByZXN1bHQudmVyc2lvbiA9IGVkZ2VWZXJzaW9uXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0Lm1zaWUgPSB0XG4gICAgICAgIHJlc3VsdC52ZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvaWVtb2JpbGVcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9tc2llfHRyaWRlbnQvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnSW50ZXJuZXQgRXhwbG9yZXInXG4gICAgICAsIG1zaWU6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86bXNpZSB8cnY6KShcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL2Nocm9tZS4rPyBlZGdlL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ01pY3Jvc29mdCBFZGdlJ1xuICAgICAgLCBtc2VkZ2U6IHRcbiAgICAgICwgdmVyc2lvbjogZWRnZVZlcnNpb25cbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL2Nocm9tZXxjcmlvc3xjcm1vL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0Nocm9tZSdcbiAgICAgICwgY2hyb21lOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goLyg/OmNocm9tZXxjcmlvc3xjcm1vKVxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaW9zZGV2aWNlKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWUgOiBpb3NkZXZpY2UgPT0gJ2lwaG9uZScgPyAnaVBob25lJyA6IGlvc2RldmljZSA9PSAnaXBhZCcgPyAnaVBhZCcgOiAnaVBvZCdcbiAgICAgIH1cbiAgICAgIC8vIFdURjogdmVyc2lvbiBpcyBub3QgcGFydCBvZiB1c2VyIGFnZW50IGluIHdlYiBhcHBzXG4gICAgICBpZiAodmVyc2lvbklkZW50aWZpZXIpIHtcbiAgICAgICAgcmVzdWx0LnZlcnNpb24gPSB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvc2FpbGZpc2gvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnU2FpbGZpc2gnXG4gICAgICAsIHNhaWxmaXNoOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goL3NhaWxmaXNoXFxzP2Jyb3dzZXJcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9zZWFtb25rZXlcXC8vaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnU2VhTW9ua2V5J1xuICAgICAgLCBzZWFtb25rZXk6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvc2VhbW9ua2V5XFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvZmlyZWZveHxpY2V3ZWFzZWwvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnRmlyZWZveCdcbiAgICAgICwgZmlyZWZveDogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC8oPzpmaXJlZm94fGljZXdlYXNlbClbIFxcL10oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgICBpZiAoL1xcKChtb2JpbGV8dGFibGV0KTtbXlxcKV0qcnY6W1xcZFxcLl0rXFwpL2kudGVzdCh1YSkpIHtcbiAgICAgICAgcmVzdWx0LmZpcmVmb3hvcyA9IHRcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL3NpbGsvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0gIHtcbiAgICAgICAgbmFtZTogJ0FtYXpvbiBTaWxrJ1xuICAgICAgLCBzaWxrOiB0XG4gICAgICAsIHZlcnNpb24gOiBnZXRGaXJzdE1hdGNoKC9zaWxrXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChhbmRyb2lkKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdBbmRyb2lkJ1xuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvcGhhbnRvbS9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdQaGFudG9tSlMnXG4gICAgICAsIHBoYW50b206IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvcGhhbnRvbWpzXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvYmxhY2tiZXJyeXxcXGJiYlxcZCsvaS50ZXN0KHVhKSB8fCAvcmltXFxzdGFibGV0L2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0JsYWNrQmVycnknXG4gICAgICAsIGJsYWNrYmVycnk6IHRcbiAgICAgICwgdmVyc2lvbjogdmVyc2lvbklkZW50aWZpZXIgfHwgZ2V0Rmlyc3RNYXRjaCgvYmxhY2tiZXJyeVtcXGRdK1xcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoLyh3ZWJ8aHB3KW9zL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1dlYk9TJ1xuICAgICAgLCB3ZWJvczogdFxuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllciB8fCBnZXRGaXJzdE1hdGNoKC93KD86ZWIpP29zYnJvd3NlclxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH07XG4gICAgICAvdG91Y2hwYWRcXC8vaS50ZXN0KHVhKSAmJiAocmVzdWx0LnRvdWNocGFkID0gdClcbiAgICB9XG4gICAgZWxzZSBpZiAoL2JhZGEvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnQmFkYSdcbiAgICAgICwgYmFkYTogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC9kb2xmaW5cXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9O1xuICAgIH1cbiAgICBlbHNlIGlmICgvdGl6ZW4vaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnVGl6ZW4nXG4gICAgICAsIHRpemVuOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goLyg/OnRpemVuXFxzPyk/YnJvd3NlclxcLyhcXGQrKFxcLlxcZCspPykvaSkgfHwgdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKC9zYWZhcmkvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnU2FmYXJpJ1xuICAgICAgLCBzYWZhcmk6IHRcbiAgICAgICwgdmVyc2lvbjogdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6IGdldEZpcnN0TWF0Y2goL14oLiopXFwvKC4qKSAvKSxcbiAgICAgICAgdmVyc2lvbjogZ2V0U2Vjb25kTWF0Y2goL14oLiopXFwvKC4qKSAvKVxuICAgICB9O1xuICAgfVxuXG4gICAgLy8gc2V0IHdlYmtpdCBvciBnZWNrbyBmbGFnIGZvciBicm93c2VycyBiYXNlZCBvbiB0aGVzZSBlbmdpbmVzXG4gICAgaWYgKCFyZXN1bHQubXNlZGdlICYmIC8oYXBwbGUpP3dlYmtpdC9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQubmFtZSA9IHJlc3VsdC5uYW1lIHx8IFwiV2Via2l0XCJcbiAgICAgIHJlc3VsdC53ZWJraXQgPSB0XG4gICAgICBpZiAoIXJlc3VsdC52ZXJzaW9uICYmIHZlcnNpb25JZGVudGlmaWVyKSB7XG4gICAgICAgIHJlc3VsdC52ZXJzaW9uID0gdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFyZXN1bHQub3BlcmEgJiYgL2dlY2tvXFwvL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdC5uYW1lID0gcmVzdWx0Lm5hbWUgfHwgXCJHZWNrb1wiXG4gICAgICByZXN1bHQuZ2Vja28gPSB0XG4gICAgICByZXN1bHQudmVyc2lvbiA9IHJlc3VsdC52ZXJzaW9uIHx8IGdldEZpcnN0TWF0Y2goL2dlY2tvXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgIH1cblxuICAgIC8vIHNldCBPUyBmbGFncyBmb3IgcGxhdGZvcm1zIHRoYXQgaGF2ZSBtdWx0aXBsZSBicm93c2Vyc1xuICAgIGlmICghcmVzdWx0Lm1zZWRnZSAmJiAoYW5kcm9pZCB8fCByZXN1bHQuc2lsaykpIHtcbiAgICAgIHJlc3VsdC5hbmRyb2lkID0gdFxuICAgIH0gZWxzZSBpZiAoaW9zZGV2aWNlKSB7XG4gICAgICByZXN1bHRbaW9zZGV2aWNlXSA9IHRcbiAgICAgIHJlc3VsdC5pb3MgPSB0XG4gICAgfVxuXG4gICAgLy8gT1MgdmVyc2lvbiBleHRyYWN0aW9uXG4gICAgdmFyIG9zVmVyc2lvbiA9ICcnO1xuICAgIGlmIChyZXN1bHQud2luZG93c3Bob25lKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC93aW5kb3dzIHBob25lICg/Om9zKT9cXHM/KFxcZCsoXFwuXFxkKykqKS9pKTtcbiAgICB9IGVsc2UgaWYgKGlvc2RldmljZSkge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvb3MgKFxcZCsoW19cXHNdXFxkKykqKSBsaWtlIG1hYyBvcyB4L2kpO1xuICAgICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uLnJlcGxhY2UoL1tfXFxzXS9nLCAnLicpO1xuICAgIH0gZWxzZSBpZiAoYW5kcm9pZCkge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvYW5kcm9pZFsgXFwvLV0oXFxkKyhcXC5cXGQrKSopL2kpO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0LndlYm9zKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC8oPzp3ZWJ8aHB3KW9zXFwvKFxcZCsoXFwuXFxkKykqKS9pKTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC5ibGFja2JlcnJ5KSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9yaW1cXHN0YWJsZXRcXHNvc1xccyhcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQuYmFkYSkge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvYmFkYVxcLyhcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQudGl6ZW4pIHtcbiAgICAgIG9zVmVyc2lvbiA9IGdldEZpcnN0TWF0Y2goL3RpemVuW1xcL1xcc10oXFxkKyhcXC5cXGQrKSopL2kpO1xuICAgIH1cbiAgICBpZiAob3NWZXJzaW9uKSB7XG4gICAgICByZXN1bHQub3N2ZXJzaW9uID0gb3NWZXJzaW9uO1xuICAgIH1cblxuICAgIC8vIGRldmljZSB0eXBlIGV4dHJhY3Rpb25cbiAgICB2YXIgb3NNYWpvclZlcnNpb24gPSBvc1ZlcnNpb24uc3BsaXQoJy4nKVswXTtcbiAgICBpZiAodGFibGV0IHx8IGlvc2RldmljZSA9PSAnaXBhZCcgfHwgKGFuZHJvaWQgJiYgKG9zTWFqb3JWZXJzaW9uID09IDMgfHwgKG9zTWFqb3JWZXJzaW9uID09IDQgJiYgIW1vYmlsZSkpKSB8fCByZXN1bHQuc2lsaykge1xuICAgICAgcmVzdWx0LnRhYmxldCA9IHRcbiAgICB9IGVsc2UgaWYgKG1vYmlsZSB8fCBpb3NkZXZpY2UgPT0gJ2lwaG9uZScgfHwgaW9zZGV2aWNlID09ICdpcG9kJyB8fCBhbmRyb2lkIHx8IHJlc3VsdC5ibGFja2JlcnJ5IHx8IHJlc3VsdC53ZWJvcyB8fCByZXN1bHQuYmFkYSkge1xuICAgICAgcmVzdWx0Lm1vYmlsZSA9IHRcbiAgICB9XG5cbiAgICAvLyBHcmFkZWQgQnJvd3NlciBTdXBwb3J0XG4gICAgLy8gaHR0cDovL2RldmVsb3Blci55YWhvby5jb20veXVpL2FydGljbGVzL2dic1xuICAgIGlmIChyZXN1bHQubXNlZGdlIHx8XG4gICAgICAgIChyZXN1bHQubXNpZSAmJiByZXN1bHQudmVyc2lvbiA+PSAxMCkgfHxcbiAgICAgICAgKHJlc3VsdC5jaHJvbWUgJiYgcmVzdWx0LnZlcnNpb24gPj0gMjApIHx8XG4gICAgICAgIChyZXN1bHQuZmlyZWZveCAmJiByZXN1bHQudmVyc2lvbiA+PSAyMC4wKSB8fFxuICAgICAgICAocmVzdWx0LnNhZmFyaSAmJiByZXN1bHQudmVyc2lvbiA+PSA2KSB8fFxuICAgICAgICAocmVzdWx0Lm9wZXJhICYmIHJlc3VsdC52ZXJzaW9uID49IDEwLjApIHx8XG4gICAgICAgIChyZXN1bHQuaW9zICYmIHJlc3VsdC5vc3ZlcnNpb24gJiYgcmVzdWx0Lm9zdmVyc2lvbi5zcGxpdChcIi5cIilbMF0gPj0gNikgfHxcbiAgICAgICAgKHJlc3VsdC5ibGFja2JlcnJ5ICYmIHJlc3VsdC52ZXJzaW9uID49IDEwLjEpXG4gICAgICAgICkge1xuICAgICAgcmVzdWx0LmEgPSB0O1xuICAgIH1cbiAgICBlbHNlIGlmICgocmVzdWx0Lm1zaWUgJiYgcmVzdWx0LnZlcnNpb24gPCAxMCkgfHxcbiAgICAgICAgKHJlc3VsdC5jaHJvbWUgJiYgcmVzdWx0LnZlcnNpb24gPCAyMCkgfHxcbiAgICAgICAgKHJlc3VsdC5maXJlZm94ICYmIHJlc3VsdC52ZXJzaW9uIDwgMjAuMCkgfHxcbiAgICAgICAgKHJlc3VsdC5zYWZhcmkgJiYgcmVzdWx0LnZlcnNpb24gPCA2KSB8fFxuICAgICAgICAocmVzdWx0Lm9wZXJhICYmIHJlc3VsdC52ZXJzaW9uIDwgMTAuMCkgfHxcbiAgICAgICAgKHJlc3VsdC5pb3MgJiYgcmVzdWx0Lm9zdmVyc2lvbiAmJiByZXN1bHQub3N2ZXJzaW9uLnNwbGl0KFwiLlwiKVswXSA8IDYpXG4gICAgICAgICkge1xuICAgICAgcmVzdWx0LmMgPSB0XG4gICAgfSBlbHNlIHJlc3VsdC54ID0gdFxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgdmFyIGJvd3NlciA9IGRldGVjdCh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyA/IG5hdmlnYXRvci51c2VyQWdlbnQgOiAnJylcblxuICBib3dzZXIudGVzdCA9IGZ1bmN0aW9uIChicm93c2VyTGlzdCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnJvd3Nlckxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBicm93c2VySXRlbSA9IGJyb3dzZXJMaXN0W2ldO1xuICAgICAgaWYgKHR5cGVvZiBicm93c2VySXRlbT09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAoYnJvd3Nlckl0ZW0gaW4gYm93c2VyKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLypcbiAgICogU2V0IG91ciBkZXRlY3QgbWV0aG9kIHRvIHRoZSBtYWluIGJvd3NlciBvYmplY3Qgc28gd2UgY2FuXG4gICAqIHJldXNlIGl0IHRvIHRlc3Qgb3RoZXIgdXNlciBhZ2VudHMuXG4gICAqIFRoaXMgaXMgbmVlZGVkIHRvIGltcGxlbWVudCBmdXR1cmUgdGVzdHMuXG4gICAqL1xuICBib3dzZXIuX2RldGVjdCA9IGRldGVjdDtcblxuICByZXR1cm4gYm93c2VyXG59KTtcbiIsIihmdW5jdGlvbiAocHJvY2Vzcyl7XG4vKipcbiAqIFRoaXMgaXMgdGhlIHdlYiBicm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kZWJ1ZycpO1xuZXhwb3J0cy5sb2cgPSBsb2c7XG5leHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuZXhwb3J0cy5zYXZlID0gc2F2ZTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcbmV4cG9ydHMuc3RvcmFnZSA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWVcbiAgICAgICAgICAgICAgICYmICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWUuc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgPyBjaHJvbWUuc3RvcmFnZS5sb2NhbFxuICAgICAgICAgICAgICAgICAgOiBsb2NhbHN0b3JhZ2UoKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbXG4gICdsaWdodHNlYWdyZWVuJyxcbiAgJ2ZvcmVzdGdyZWVuJyxcbiAgJ2dvbGRlbnJvZCcsXG4gICdkb2RnZXJibHVlJyxcbiAgJ2RhcmtvcmNoaWQnLFxuICAnY3JpbXNvbidcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuICAvLyBOQjogSW4gYW4gRWxlY3Ryb24gcHJlbG9hZCBzY3JpcHQsIGRvY3VtZW50IHdpbGwgYmUgZGVmaW5lZCBidXQgbm90IGZ1bGx5XG4gIC8vIGluaXRpYWxpemVkLiBTaW5jZSB3ZSBrbm93IHdlJ3JlIGluIENocm9tZSwgd2UnbGwganVzdCBkZXRlY3QgdGhpcyBjYXNlXG4gIC8vIGV4cGxpY2l0bHlcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdyAmJiB0eXBlb2Ygd2luZG93LnByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIGlzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG4gIC8vIGRvY3VtZW50IGlzIHVuZGVmaW5lZCBpbiByZWFjdC1uYXRpdmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvcHVsbC8xNjMyXG4gIHJldHVybiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudCAmJiAnV2Via2l0QXBwZWFyYW5jZScgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKSB8fFxuICAgIC8vIGlzIGZpcmVidWc/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5ODEyMC8zNzY3NzNcbiAgICAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93ICYmIHdpbmRvdy5jb25zb2xlICYmIChjb25zb2xlLmZpcmVidWcgfHwgKGNvbnNvbGUuZXhjZXB0aW9uICYmIGNvbnNvbGUudGFibGUpKSkgfHxcbiAgICAvLyBpcyBmaXJlZm94ID49IHYzMT9cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1Rvb2xzL1dlYl9Db25zb2xlI1N0eWxpbmdfbWVzc2FnZXNcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCkgPj0gMzEpIHx8XG4gICAgLy8gZG91YmxlIGNoZWNrIHdlYmtpdCBpbiB1c2VyQWdlbnQganVzdCBpbiBjYXNlIHdlIGFyZSBpbiBhIHdvcmtlclxuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2FwcGxld2Via2l0XFwvKFxcZCspLykpO1xufVxuXG4vKipcbiAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMuaiA9IGZ1bmN0aW9uKHYpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiAnW1VuZXhwZWN0ZWRKU09OUGFyc2VFcnJvcl06ICcgKyBlcnIubWVzc2FnZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIENvbG9yaXplIGxvZyBhcmd1bWVudHMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoYXJncykge1xuICB2YXIgdXNlQ29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cbiAgYXJnc1swXSA9ICh1c2VDb2xvcnMgPyAnJWMnIDogJycpXG4gICAgKyB0aGlzLm5hbWVzcGFjZVxuICAgICsgKHVzZUNvbG9ycyA/ICcgJWMnIDogJyAnKVxuICAgICsgYXJnc1swXVxuICAgICsgKHVzZUNvbG9ycyA/ICclYyAnIDogJyAnKVxuICAgICsgJysnICsgZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpO1xuXG4gIGlmICghdXNlQ29sb3JzKSByZXR1cm47XG5cbiAgdmFyIGMgPSAnY29sb3I6ICcgKyB0aGlzLmNvbG9yO1xuICBhcmdzLnNwbGljZSgxLCAwLCBjLCAnY29sb3I6IGluaGVyaXQnKVxuXG4gIC8vIHRoZSBmaW5hbCBcIiVjXCIgaXMgc29tZXdoYXQgdHJpY2t5LCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyXG4gIC8vIGFyZ3VtZW50cyBwYXNzZWQgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgJWMsIHNvIHdlIG5lZWQgdG9cbiAgLy8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsYXN0QyA9IDA7XG4gIGFyZ3NbMF0ucmVwbGFjZSgvJVthLXpBLVolXS9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgIGlmICgnJSUnID09PSBtYXRjaCkgcmV0dXJuO1xuICAgIGluZGV4Kys7XG4gICAgaWYgKCclYycgPT09IG1hdGNoKSB7XG4gICAgICAvLyB3ZSBvbmx5IGFyZSBpbnRlcmVzdGVkIGluIHRoZSAqbGFzdCogJWNcbiAgICAgIC8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG4gICAgICBsYXN0QyA9IGluZGV4O1xuICAgIH1cbiAgfSk7XG5cbiAgYXJncy5zcGxpY2UobGFzdEMsIDAsIGMpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYGNvbnNvbGUubG9nKClgIHdoZW4gYXZhaWxhYmxlLlxuICogTm8tb3Agd2hlbiBgY29uc29sZS5sb2dgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGxvZygpIHtcbiAgLy8gdGhpcyBoYWNrZXJ5IGlzIHJlcXVpcmVkIGZvciBJRTgvOSwgd2hlcmVcbiAgLy8gdGhlIGBjb25zb2xlLmxvZ2AgZnVuY3Rpb24gZG9lc24ndCBoYXZlICdhcHBseSdcbiAgcmV0dXJuICdvYmplY3QnID09PSB0eXBlb2YgY29uc29sZVxuICAgICYmIGNvbnNvbGUubG9nXG4gICAgJiYgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5sb2csIGNvbnNvbGUsIGFyZ3VtZW50cyk7XG59XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNhdmUobmFtZXNwYWNlcykge1xuICB0cnkge1xuICAgIGlmIChudWxsID09IG5hbWVzcGFjZXMpIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5yZW1vdmVJdGVtKCdkZWJ1ZycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UuZGVidWcgPSBuYW1lc3BhY2VzO1xuICAgIH1cbiAgfSBjYXRjaChlKSB7fVxufVxuXG4vKipcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvYWQoKSB7XG4gIHZhciByO1xuICB0cnkge1xuICAgIHIgPSBleHBvcnRzLnN0b3JhZ2UuZGVidWc7XG4gIH0gY2F0Y2goZSkge31cblxuICAvLyBJZiBkZWJ1ZyBpc24ndCBzZXQgaW4gTFMsIGFuZCB3ZSdyZSBpbiBFbGVjdHJvbiwgdHJ5IHRvIGxvYWQgJERFQlVHXG4gIGlmICghciAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ2VudicgaW4gcHJvY2Vzcykge1xuICAgIHIgPSBwcm9jZXNzLmVudi5ERUJVRztcbiAgfVxuXG4gIHJldHVybiByO1xufVxuXG4vKipcbiAqIEVuYWJsZSBuYW1lc3BhY2VzIGxpc3RlZCBpbiBgbG9jYWxTdG9yYWdlLmRlYnVnYCBpbml0aWFsbHkuXG4gKi9cblxuZXhwb3J0cy5lbmFibGUobG9hZCgpKTtcblxuLyoqXG4gKiBMb2NhbHN0b3JhZ2UgYXR0ZW1wdHMgdG8gcmV0dXJuIHRoZSBsb2NhbHN0b3JhZ2UuXG4gKlxuICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBzYWZhcmkgdGhyb3dzXG4gKiB3aGVuIGEgdXNlciBkaXNhYmxlcyBjb29raWVzL2xvY2Fsc3RvcmFnZVxuICogYW5kIHlvdSBhdHRlbXB0IHRvIGFjY2VzcyBpdC5cbiAqXG4gKiBAcmV0dXJuIHtMb2NhbFN0b3JhZ2V9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2NhbHN0b3JhZ2UoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gIH0gY2F0Y2ggKGUpIHt9XG59XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwicEJHdkFwXCIpKSIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnWydkZWZhdWx0J10gPSBjcmVhdGVEZWJ1ZztcbmV4cG9ydHMuY29lcmNlID0gY29lcmNlO1xuZXhwb3J0cy5kaXNhYmxlID0gZGlzYWJsZTtcbmV4cG9ydHMuZW5hYmxlID0gZW5hYmxlO1xuZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtcbmV4cG9ydHMuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXG4vKipcbiAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuICovXG5cbmV4cG9ydHMubmFtZXMgPSBbXTtcbmV4cG9ydHMuc2tpcHMgPSBbXTtcblxuLyoqXG4gKiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXG4gKlxuICogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycyA9IHt9O1xuXG4vKipcbiAqIFByZXZpb3VzIGxvZyB0aW1lc3RhbXAuXG4gKi9cblxudmFyIHByZXZUaW1lO1xuXG4vKipcbiAqIFNlbGVjdCBhIGNvbG9yLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VsZWN0Q29sb3IobmFtZXNwYWNlKSB7XG4gIHZhciBoYXNoID0gMCwgaTtcblxuICBmb3IgKGkgaW4gbmFtZXNwYWNlKSB7XG4gICAgaGFzaCAgPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIG5hbWVzcGFjZS5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gIH1cblxuICByZXR1cm4gZXhwb3J0cy5jb2xvcnNbTWF0aC5hYnMoaGFzaCkgJSBleHBvcnRzLmNvbG9ycy5sZW5ndGhdO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVEZWJ1ZyhuYW1lc3BhY2UpIHtcblxuICBmdW5jdGlvbiBkZWJ1ZygpIHtcbiAgICAvLyBkaXNhYmxlZD9cbiAgICBpZiAoIWRlYnVnLmVuYWJsZWQpIHJldHVybjtcblxuICAgIHZhciBzZWxmID0gZGVidWc7XG5cbiAgICAvLyBzZXQgYGRpZmZgIHRpbWVzdGFtcFxuICAgIHZhciBjdXJyID0gK25ldyBEYXRlKCk7XG4gICAgdmFyIG1zID0gY3VyciAtIChwcmV2VGltZSB8fCBjdXJyKTtcbiAgICBzZWxmLmRpZmYgPSBtcztcbiAgICBzZWxmLnByZXYgPSBwcmV2VGltZTtcbiAgICBzZWxmLmN1cnIgPSBjdXJyO1xuICAgIHByZXZUaW1lID0gY3VycjtcblxuICAgIC8vIHR1cm4gdGhlIGBhcmd1bWVudHNgIGludG8gYSBwcm9wZXIgQXJyYXlcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgYXJnc1swXSA9IGV4cG9ydHMuY29lcmNlKGFyZ3NbMF0pO1xuXG4gICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgYXJnc1swXSkge1xuICAgICAgLy8gYW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJU9cbiAgICAgIGFyZ3MudW5zaGlmdCgnJU8nKTtcbiAgICB9XG5cbiAgICAvLyBhcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgYXJnc1swXSA9IGFyZ3NbMF0ucmVwbGFjZSgvJShbYS16QS1aJV0pL2csIGZ1bmN0aW9uKG1hdGNoLCBmb3JtYXQpIHtcbiAgICAgIC8vIGlmIHdlIGVuY291bnRlciBhbiBlc2NhcGVkICUgdGhlbiBkb24ndCBpbmNyZWFzZSB0aGUgYXJyYXkgaW5kZXhcbiAgICAgIGlmIChtYXRjaCA9PT0gJyUlJykgcmV0dXJuIG1hdGNoO1xuICAgICAgaW5kZXgrKztcbiAgICAgIHZhciBmb3JtYXR0ZXIgPSBleHBvcnRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcbiAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZm9ybWF0dGVyKSB7XG4gICAgICAgIHZhciB2YWwgPSBhcmdzW2luZGV4XTtcbiAgICAgICAgbWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLCB2YWwpO1xuXG4gICAgICAgIC8vIG5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcbiAgICAgICAgYXJncy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpbmRleC0tO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuXG4gICAgLy8gYXBwbHkgZW52LXNwZWNpZmljIGZvcm1hdHRpbmcgKGNvbG9ycywgZXRjLilcbiAgICBleHBvcnRzLmZvcm1hdEFyZ3MuY2FsbChzZWxmLCBhcmdzKTtcblxuICAgIHZhciBsb2dGbiA9IGRlYnVnLmxvZyB8fCBleHBvcnRzLmxvZyB8fCBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuICAgIGxvZ0ZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICB9XG5cbiAgZGVidWcubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuICBkZWJ1Zy5lbmFibGVkID0gZXhwb3J0cy5lbmFibGVkKG5hbWVzcGFjZSk7XG4gIGRlYnVnLnVzZUNvbG9ycyA9IGV4cG9ydHMudXNlQ29sb3JzKCk7XG4gIGRlYnVnLmNvbG9yID0gc2VsZWN0Q29sb3IobmFtZXNwYWNlKTtcblxuICAvLyBlbnYtc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbG9naWMgZm9yIGRlYnVnIGluc3RhbmNlc1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGV4cG9ydHMuaW5pdCkge1xuICAgIGV4cG9ydHMuaW5pdChkZWJ1Zyk7XG4gIH1cblxuICByZXR1cm4gZGVidWc7XG59XG5cbi8qKlxuICogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuICogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGUobmFtZXNwYWNlcykge1xuICBleHBvcnRzLnNhdmUobmFtZXNwYWNlcyk7XG5cbiAgZXhwb3J0cy5uYW1lcyA9IFtdO1xuICBleHBvcnRzLnNraXBzID0gW107XG5cbiAgdmFyIHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcbiAgdmFyIGxlbiA9IHNwbGl0Lmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKCFzcGxpdFtpXSkgY29udGludWU7IC8vIGlnbm9yZSBlbXB0eSBzdHJpbmdzXG4gICAgbmFtZXNwYWNlcyA9IHNwbGl0W2ldLnJlcGxhY2UoL1xcKi9nLCAnLio/Jyk7XG4gICAgaWYgKG5hbWVzcGFjZXNbMF0gPT09ICctJykge1xuICAgICAgZXhwb3J0cy5za2lwcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcy5zdWJzdHIoMSkgKyAnJCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5uYW1lcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcyArICckJykpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIERpc2FibGUgZGVidWcgb3V0cHV0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgZXhwb3J0cy5lbmFibGUoJycpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlZChuYW1lKSB7XG4gIHZhciBpLCBsZW47XG4gIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMuc2tpcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoZXhwb3J0cy5za2lwc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMubmFtZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoZXhwb3J0cy5uYW1lc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENvZXJjZSBgdmFsYC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gY29lcmNlKHZhbCkge1xuICBpZiAodmFsIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiB2YWwuc3RhY2sgfHwgdmFsLm1lc3NhZ2U7XG4gIHJldHVybiB2YWw7XG59XG4iLCIvKipcbiAqIEhlbHBlcnMuXG4gKi9cblxudmFyIHMgPSAxMDAwXG52YXIgbSA9IHMgKiA2MFxudmFyIGggPSBtICogNjBcbnZhciBkID0gaCAqIDI0XG52YXIgeSA9IGQgKiAzNjUuMjVcblxuLyoqXG4gKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogIC0gYGxvbmdgIHZlcmJvc2UgZm9ybWF0dGluZyBbZmFsc2VdXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEB0aHJvd3Mge0Vycm9yfSB0aHJvdyBhbiBlcnJvciBpZiB2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIG51bWJlclxuICogQHJldHVybiB7U3RyaW5nfE51bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbFxuICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gcGFyc2UodmFsKVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmIGlzTmFOKHZhbCkgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9uZyA/XG5cdFx0XHRmbXRMb25nKHZhbCkgOlxuXHRcdFx0Zm10U2hvcnQodmFsKVxuICB9XG4gIHRocm93IG5ldyBFcnJvcigndmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSB2YWxpZCBudW1iZXIuIHZhbD0nICsgSlNPTi5zdHJpbmdpZnkodmFsKSlcbn1cblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYHN0cmAgYW5kIHJldHVybiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gIHN0ciA9IFN0cmluZyhzdHIpXG4gIGlmIChzdHIubGVuZ3RoID4gMTAwMDApIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgbWF0Y2ggPSAvXigoPzpcXGQrKT9cXC4/XFxkKykgKihtaWxsaXNlY29uZHM/fG1zZWNzP3xtc3xzZWNvbmRzP3xzZWNzP3xzfG1pbnV0ZXM/fG1pbnM/fG18aG91cnM/fGhycz98aHxkYXlzP3xkfHllYXJzP3x5cnM/fHkpPyQvaS5leGVjKHN0cilcbiAgaWYgKCFtYXRjaCkge1xuICAgIHJldHVyblxuICB9XG4gIHZhciBuID0gcGFyc2VGbG9hdChtYXRjaFsxXSlcbiAgdmFyIHR5cGUgPSAobWF0Y2hbMl0gfHwgJ21zJykudG9Mb3dlckNhc2UoKVxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgY2FzZSAneWVhcic6XG4gICAgY2FzZSAneXJzJzpcbiAgICBjYXNlICd5cic6XG4gICAgY2FzZSAneSc6XG4gICAgICByZXR1cm4gbiAqIHlcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2QnOlxuICAgICAgcmV0dXJuIG4gKiBkXG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hycyc6XG4gICAgY2FzZSAnaHInOlxuICAgIGNhc2UgJ2gnOlxuICAgICAgcmV0dXJuIG4gKiBoXG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtaW5zJzpcbiAgICBjYXNlICdtaW4nOlxuICAgIGNhc2UgJ20nOlxuICAgICAgcmV0dXJuIG4gKiBtXG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNzJzpcbiAgICBjYXNlICdzZWMnOlxuICAgIGNhc2UgJ3MnOlxuICAgICAgcmV0dXJuIG4gKiBzXG4gICAgY2FzZSAnbWlsbGlzZWNvbmRzJzpcbiAgICBjYXNlICdtaWxsaXNlY29uZCc6XG4gICAgY2FzZSAnbXNlY3MnOlxuICAgIGNhc2UgJ21zZWMnOlxuICAgIGNhc2UgJ21zJzpcbiAgICAgIHJldHVybiBuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxufVxuXG4vKipcbiAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdFNob3J0KG1zKSB7XG4gIGlmIChtcyA+PSBkKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBkKSArICdkJ1xuICB9XG4gIGlmIChtcyA+PSBoKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBoKSArICdoJ1xuICB9XG4gIGlmIChtcyA+PSBtKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBtKSArICdtJ1xuICB9XG4gIGlmIChtcyA+PSBzKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBzKSArICdzJ1xuICB9XG4gIHJldHVybiBtcyArICdtcydcbn1cblxuLyoqXG4gKiBMb25nIGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdExvbmcobXMpIHtcbiAgcmV0dXJuIHBsdXJhbChtcywgZCwgJ2RheScpIHx8XG4gICAgcGx1cmFsKG1zLCBoLCAnaG91cicpIHx8XG4gICAgcGx1cmFsKG1zLCBtLCAnbWludXRlJykgfHxcbiAgICBwbHVyYWwobXMsIHMsICdzZWNvbmQnKSB8fFxuICAgIG1zICsgJyBtcydcbn1cblxuLyoqXG4gKiBQbHVyYWxpemF0aW9uIGhlbHBlci5cbiAqL1xuXG5mdW5jdGlvbiBwbHVyYWwobXMsIG4sIG5hbWUpIHtcbiAgaWYgKG1zIDwgbikge1xuICAgIHJldHVyblxuICB9XG4gIGlmIChtcyA8IG4gKiAxLjUpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihtcyAvIG4pICsgJyAnICsgbmFtZVxuICB9XG4gIHJldHVybiBNYXRoLmNlaWwobXMgLyBuKSArICcgJyArIG5hbWUgKyAncydcbn1cbiIsIi8qKlxuICogRGVwZW5kZW5jaWVzLlxuICovXG52YXIgVXRpbCA9IHJlcXVpcmUoJy4vbGliL3V0aWwnKTtcbnZhciBLZXlzID0gcmVxdWlyZSgnLi9saWIva2V5cycpO1xudmFyIEtiZFV0aWwgPSByZXF1aXJlKCcuL2xpYi9rYmR1dGlsJyk7XG52YXIgSW5wdXQgPSByZXF1aXJlKCcuL2xpYi9pbnB1dCcpO1xudmFyIFdlYnNvY2sgPSByZXF1aXJlKCcuL2xpYi93ZWJzb2NrJyk7XG52YXIgQmFzZTY0ID0gcmVxdWlyZSgnLi9saWIvYmFzZTY0Jyk7XG52YXIgREVTID0gcmVxdWlyZSgnLi9saWIvZGVzJyk7XG52YXIgVElORiA9IHJlcXVpcmUoJy4vbGliL3RpbmYnKTtcbnZhciBEaXNwbGF5ID0gcmVxdWlyZSgnLi9saWIvZGlzcGxheScpO1xudmFyIFJGQiA9IHJlcXVpcmUoJy4vbGliL3JmYicpO1xuXG5cblxudmFyIG5vVk5DID0ge1xuXHRVdGlsOiBVdGlsLFxuXHRLZXlzOiBLZXlzLFxuXHRLYmRVdGlsOiBLYmRVdGlsLFxuXHRJbnB1dDogSW5wdXQsXG5cdFdlYnNvY2s6IFdlYnNvY2ssXG5cdEJhc2U2NDogQmFzZTY0LFxuXHRERVM6IERFUyxcblx0VElORjogVElORixcblx0RGlzcGxheTogRGlzcGxheSxcblx0UkZCOiBSRkJcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBub1ZOQztcbiIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG5cbi8qKlxuICogRGVwZW5kZW5jaWVzLlxuICovXG52YXIgZGVidWdlcnJvciA9IHJlcXVpcmUoJ2RlYnVnJykoJ25vVk5DOkVSUk9SOkJhc2U2NCcpO1xuZGVidWdlcnJvci5sb2cgPSBjb25zb2xlLndhcm4uYmluZChjb25zb2xlKTtcblxuXG4vKipcbiAqIExvY2FsIHZhcmlhYmxlcy5cbiAqL1xudmFyIHRvQmFzZTY0VGFibGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nLnNwbGl0KCcnKTtcbnZhciBiYXNlNjRQYWQgPSAnPSc7XG52YXIgdG9CaW5hcnlUYWJsZSA9IFtcblx0LTEsLTEsLTEsLTEsIC0xLC0xLC0xLC0xLCAtMSwtMSwtMSwtMSwgLTEsLTEsLTEsLTEsXG5cdC0xLC0xLC0xLC0xLCAtMSwtMSwtMSwtMSwgLTEsLTEsLTEsLTEsIC0xLC0xLC0xLC0xLFxuXHQtMSwtMSwtMSwtMSwgLTEsLTEsLTEsLTEsIC0xLC0xLC0xLDYyLCAtMSwtMSwtMSw2Myxcblx0NTIsNTMsNTQsNTUsIDU2LDU3LDU4LDU5LCA2MCw2MSwtMSwtMSwgLTEsIDAsLTEsLTEsXG5cdC0xLCAwLCAxLCAyLCAgMywgNCwgNSwgNiwgIDcsIDgsIDksMTAsIDExLDEyLDEzLDE0LFxuXHQxNSwxNiwxNywxOCwgMTksMjAsMjEsMjIsIDIzLDI0LDI1LC0xLCAtMSwtMSwtMSwtMSxcblx0LTEsMjYsMjcsMjgsIDI5LDMwLDMxLDMyLCAzMywzNCwzNSwzNiwgMzcsMzgsMzksNDAsXG5cdDQxLDQyLDQzLDQ0LCA0NSw0Niw0Nyw0OCwgNDksNTAsNTEsLTEsIC0xLC0xLC0xLC0xXG5dO1xuXG5cbi8qKlxuICogRXhwb3NlIHRoZSBCYXNlNjQgT2JqZWN0LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0ZW5jb2RlOiBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdHZhciByZXN1bHQgPSAnJztcblx0XHR2YXIgbGVuZ3RoID0gZGF0YS5sZW5ndGg7XG5cdFx0dmFyIGxlbmd0aHBhZCA9IChsZW5ndGggJSAzKTtcblxuXHRcdC8vIENvbnZlcnQgZXZlcnkgdGhyZWUgYnl0ZXMgdG8gNCBhc2NpaSBjaGFyYWN0ZXJzLlxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgKGxlbmd0aCAtIDIpOyBpICs9IDMpIHtcblx0XHRcdHJlc3VsdCArPSB0b0Jhc2U2NFRhYmxlW2RhdGFbaV0gPj4gMl07XG5cdFx0XHRyZXN1bHQgKz0gdG9CYXNlNjRUYWJsZVsoKGRhdGFbaV0gJiAweDAzKSA8PCA0KSArIChkYXRhW2kgKyAxXSA+PiA0KV07XG5cdFx0XHRyZXN1bHQgKz0gdG9CYXNlNjRUYWJsZVsoKGRhdGFbaSArIDFdICYgMHgwZikgPDwgMikgKyAoZGF0YVtpICsgMl0gPj4gNildO1xuXHRcdFx0cmVzdWx0ICs9IHRvQmFzZTY0VGFibGVbZGF0YVtpICsgMl0gJiAweDNmXTtcblx0XHR9XG5cblx0XHQvLyBDb252ZXJ0IHRoZSByZW1haW5pbmcgMSBvciAyIGJ5dGVzLCBwYWQgb3V0IHRvIDQgY2hhcmFjdGVycy5cblx0XHR2YXIgaiA9IDA7XG5cdFx0aWYgKGxlbmd0aHBhZCA9PT0gMikge1xuXHRcdFx0aiA9IGxlbmd0aCAtIGxlbmd0aHBhZDtcblx0XHRcdHJlc3VsdCArPSB0b0Jhc2U2NFRhYmxlW2RhdGFbal0gPj4gMl07XG5cdFx0XHRyZXN1bHQgKz0gdG9CYXNlNjRUYWJsZVsoKGRhdGFbal0gJiAweDAzKSA8PCA0KSArIChkYXRhW2ogKyAxXSA+PiA0KV07XG5cdFx0XHRyZXN1bHQgKz0gdG9CYXNlNjRUYWJsZVsoZGF0YVtqICsgMV0gJiAweDBmKSA8PCAyXTtcblx0XHRcdHJlc3VsdCArPSB0b0Jhc2U2NFRhYmxlWzY0XTtcblx0XHR9IGVsc2UgaWYgKGxlbmd0aHBhZCA9PT0gMSkge1xuXHRcdFx0aiA9IGxlbmd0aCAtIGxlbmd0aHBhZDtcblx0XHRcdHJlc3VsdCArPSB0b0Jhc2U2NFRhYmxlW2RhdGFbal0gPj4gMl07XG5cdFx0XHRyZXN1bHQgKz0gdG9CYXNlNjRUYWJsZVsoZGF0YVtqXSAmIDB4MDMpIDw8IDRdO1xuXHRcdFx0cmVzdWx0ICs9IHRvQmFzZTY0VGFibGVbNjRdO1xuXHRcdFx0cmVzdWx0ICs9IHRvQmFzZTY0VGFibGVbNjRdO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0ZGVjb2RlOiBmdW5jdGlvbiAoZGF0YSwgb2Zmc2V0KSB7XG5cdFx0b2Zmc2V0ID0gdHlwZW9mKG9mZnNldCkgIT09ICd1bmRlZmluZWQnID8gb2Zmc2V0IDogMDtcblx0XHR2YXIgcmVzdWx0LCByZXN1bHRfbGVuZ3RoO1xuXHRcdHZhciBsZWZ0Yml0cyA9IDA7IC8vIG51bWJlciBvZiBiaXRzIGRlY29kZWQsIGJ1dCB5ZXQgdG8gYmUgYXBwZW5kZWRcblx0XHR2YXIgbGVmdGRhdGEgPSAwOyAvLyBiaXRzIGRlY29kZWQsIGJ1dCB5ZXQgdG8gYmUgYXBwZW5kZWRcblx0XHR2YXIgZGF0YV9sZW5ndGggPSBkYXRhLmluZGV4T2YoJz0nKSAtIG9mZnNldDtcblxuXHRcdGlmIChkYXRhX2xlbmd0aCA8IDApIHsgZGF0YV9sZW5ndGggPSBkYXRhLmxlbmd0aCAtIG9mZnNldDsgfVxuXG5cdFx0LyogRXZlcnkgZm91ciBjaGFyYWN0ZXJzIGlzIDMgcmVzdWx0aW5nIG51bWJlcnMgKi9cblx0XHRyZXN1bHRfbGVuZ3RoID0gKGRhdGFfbGVuZ3RoID4+IDIpICogMyArIE1hdGguZmxvb3IoKGRhdGFfbGVuZ3RoICUgNCkgLyAxLjUpO1xuXHRcdHJlc3VsdCA9IG5ldyBBcnJheShyZXN1bHRfbGVuZ3RoKTtcblxuXHRcdC8vIENvbnZlcnQgb25lIGJ5IG9uZS5cblx0XHRmb3IgKHZhciBpZHggPSAwLCBpID0gb2Zmc2V0OyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGMgPSB0b0JpbmFyeVRhYmxlW2RhdGEuY2hhckNvZGVBdChpKSAmIDB4N2ZdO1xuXHRcdFx0dmFyIHBhZGRpbmcgPSAoZGF0YS5jaGFyQXQoaSkgPT09IGJhc2U2NFBhZCk7XG5cdFx0XHQvLyBTa2lwIGlsbGVnYWwgY2hhcmFjdGVycyBhbmQgd2hpdGVzcGFjZVxuXHRcdFx0aWYgKGMgPT09IC0xKSB7XG5cdFx0XHRcdGRlYnVnZXJyb3IoJ2RlY29kZSgpIHwgaWxsZWdhbCBjaGFyYWN0ZXIgY29kZSAnICsgZGF0YS5jaGFyQ29kZUF0KGkpICsgJyBhdCBwb3NpdGlvbiAnICsgaSk7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb2xsZWN0IGRhdGEgaW50byBsZWZ0ZGF0YSwgdXBkYXRlIGJpdGNvdW50XG5cdFx0XHRsZWZ0ZGF0YSA9IChsZWZ0ZGF0YSA8PCA2KSB8IGM7XG5cdFx0XHRsZWZ0Yml0cyArPSA2O1xuXG5cdFx0XHQvLyBJZiB3ZSBoYXZlIDggb3IgbW9yZSBiaXRzLCBhcHBlbmQgOCBiaXRzIHRvIHRoZSByZXN1bHRcblx0XHRcdGlmIChsZWZ0Yml0cyA+PSA4KSB7XG5cdFx0XHRcdGxlZnRiaXRzIC09IDg7XG5cdFx0XHRcdC8vIEFwcGVuZCBpZiBub3QgcGFkZGluZy5cblx0XHRcdFx0aWYgKCFwYWRkaW5nKSB7XG5cdFx0XHRcdFx0cmVzdWx0W2lkeCsrXSA9IChsZWZ0ZGF0YSA+PiBsZWZ0Yml0cykgJiAweGZmO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxlZnRkYXRhICY9ICgxIDw8IGxlZnRiaXRzKSAtIDE7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlcmUgYXJlIGFueSBiaXRzIGxlZnQsIHRoZSBiYXNlNjQgc3RyaW5nIHdhcyBjb3JydXB0ZWRcblx0XHRpZiAobGVmdGJpdHMpIHtcblx0XHRcdGRlYnVnZXJyb3IoJ2RlY29kZSgpIHwgY29ycnVwdGVkIEJhc2U2NCBzdHJpbmcnKTtcblx0XHRcdHZhciBlcnIgPSBuZXcgRXJyb3IoJ0NvcnJ1cHRlZCBCYXNlNjQgc3RyaW5nJyk7XG5cdFx0XHRlcnIubmFtZSA9ICdCYXNlNjQtRXJyb3InO1xuXHRcdFx0dGhyb3cgZXJyO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cbn07XG4iLCIvKlxuICogUG9ydGVkIGZyb20gRmxhc2hsaWdodCBWTkMgQWN0aW9uU2NyaXB0IGltcGxlbWVudGF0aW9uOlxuICogICAgIGh0dHA6Ly93d3cud2l6aGVscC5jb20vZmxhc2hsaWdodC12bmMvXG4gKlxuICogRnVsbCBhdHRyaWJ1dGlvbiBmb2xsb3dzOlxuICpcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqXG4gKiBUaGlzIERFUyBjbGFzcyBoYXMgYmVlbiBleHRyYWN0ZWQgZnJvbSBwYWNrYWdlIEFjbWUuQ3J5cHRvIGZvciB1c2UgaW4gVk5DLlxuICogVGhlIHVubmVjZXNzYXJ5IG9kZCBwYXJpdHkgY29kZSBoYXMgYmVlbiByZW1vdmVkLlxuICpcbiAqIFRoZXNlIGNoYW5nZXMgYXJlOlxuICogIENvcHlyaWdodCAoQykgMTk5OSBBVCZUIExhYm9yYXRvcmllcyBDYW1icmlkZ2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuXG4gKlxuXG4gKiBEZXNDaXBoZXIgLSB0aGUgREVTIGVuY3J5cHRpb24gbWV0aG9kXG4gKlxuICogVGhlIG1lYXQgb2YgdGhpcyBjb2RlIGlzIGJ5IERhdmUgWmltbWVybWFuIDxkemltbUB3aWRnZXQuY29tPiwgYW5kIGlzOlxuICpcbiAqIENvcHlyaWdodCAoYykgMTk5NiBXaWRnZXQgV29ya3Nob3AsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBQZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlXG4gKiBhbmQgaXRzIGRvY3VtZW50YXRpb24gZm9yIE5PTi1DT01NRVJDSUFMIG9yIENPTU1FUkNJQUwgcHVycG9zZXMgYW5kXG4gKiB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZCwgcHJvdmlkZWQgdGhhdCB0aGlzIGNvcHlyaWdodCBub3RpY2UgaXMga2VwdFxuICogaW50YWN0LlxuICpcbiAqIFdJREdFVCBXT1JLU0hPUCBNQUtFUyBOTyBSRVBSRVNFTlRBVElPTlMgT1IgV0FSUkFOVElFUyBBQk9VVCBUSEUgU1VJVEFCSUxJVFlcbiAqIE9GIFRIRSBTT0ZUV0FSRSwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRFxuICogVE8gVEhFIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEFcbiAqIFBBUlRJQ1VMQVIgUFVSUE9TRSwgT1IgTk9OLUlORlJJTkdFTUVOVC4gV0lER0VUIFdPUktTSE9QIFNIQUxMIE5PVCBCRSBMSUFCTEVcbiAqIEZPUiBBTlkgREFNQUdFUyBTVUZGRVJFRCBCWSBMSUNFTlNFRSBBUyBBIFJFU1VMVCBPRiBVU0lORywgTU9ESUZZSU5HIE9SXG4gKiBESVNUUklCVVRJTkcgVEhJUyBTT0ZUV0FSRSBPUiBJVFMgREVSSVZBVElWRVMuXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBOT1QgREVTSUdORUQgT1IgSU5URU5ERUQgRk9SIFVTRSBPUiBSRVNBTEUgQVMgT04tTElORVxuICogQ09OVFJPTCBFUVVJUE1FTlQgSU4gSEFaQVJET1VTIEVOVklST05NRU5UUyBSRVFVSVJJTkcgRkFJTC1TQUZFXG4gKiBQRVJGT1JNQU5DRSwgU1VDSCBBUyBJTiBUSEUgT1BFUkFUSU9OIE9GIE5VQ0xFQVIgRkFDSUxJVElFUywgQUlSQ1JBRlRcbiAqIE5BVklHQVRJT04gT1IgQ09NTVVOSUNBVElPTiBTWVNURU1TLCBBSVIgVFJBRkZJQyBDT05UUk9MLCBESVJFQ1QgTElGRVxuICogU1VQUE9SVCBNQUNISU5FUywgT1IgV0VBUE9OUyBTWVNURU1TLCBJTiBXSElDSCBUSEUgRkFJTFVSRSBPRiBUSEVcbiAqIFNPRlRXQVJFIENPVUxEIExFQUQgRElSRUNUTFkgVE8gREVBVEgsIFBFUlNPTkFMIElOSlVSWSwgT1IgU0VWRVJFXG4gKiBQSFlTSUNBTCBPUiBFTlZJUk9OTUVOVEFMIERBTUFHRSAoXCJISUdIIFJJU0sgQUNUSVZJVElFU1wiKS4gIFdJREdFVCBXT1JLU0hPUFxuICogU1BFQ0lGSUNBTExZIERJU0NMQUlNUyBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRZIE9GIEZJVE5FU1MgRk9SXG4gKiBISUdIIFJJU0sgQUNUSVZJVElFUy5cbiAqXG4gKlxuICogVGhlIHJlc3QgaXM6XG4gKlxuICogQ29weXJpZ2h0IChDKSAxOTk2IGJ5IEplZiBQb3NrYW56ZXIgPGplZkBhY21lLmNvbT4uICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zXG4gKiBhcmUgbWV0OlxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHRcbiAqICAgIG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0XG4gKiAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlXG4gKiAgICBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIEFVVEhPUiBBTkQgQ09OVFJJQlVUT1JTIGBgQVMgSVMnJyBBTkRcbiAqIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuICogSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcbiAqIEFSRSBESVNDTEFJTUVELiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFXG4gKiBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTFxuICogREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFNcbiAqIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKVxuICogSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1RcbiAqIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVlcbiAqIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0ZcbiAqIFNVQ0ggREFNQUdFLlxuICpcbiAqIFZpc2l0IHRoZSBBQ01FIExhYnMgSmF2YSBwYWdlIGZvciB1cC10by1kYXRlIHZlcnNpb25zIG9mIHRoaXMgYW5kIG90aGVyXG4gKiBmaW5lIEphdmEgdXRpbGl0aWVzOiBodHRwOi8vd3d3LmFjbWUuY29tL2phdmEvXG4gKi9cblxuXG4vLyBUYWJsZXMsIHBlcm11dGF0aW9ucywgUy1ib3hlcywgZXRjLlxudmFyIFBDMiA9IFsxMywxNiwxMCwyMywgMCwgNCwgMiwyNywxNCwgNSwyMCwgOSwyMiwxOCwxMSwgMyxcblx0XHQgICAyNSwgNywxNSwgNiwyNiwxOSwxMiwgMSw0MCw1MSwzMCwzNiw0Niw1NCwyOSwzOSxcblx0XHQgICA1MCw0NCwzMiw0Nyw0Myw0OCwzOCw1NSwzMyw1Miw0NSw0MSw0OSwzNSwyOCwzMSBdLFxuXHR0b3Ryb3QgPSBbIDEsIDIsIDQsIDYsIDgsMTAsMTIsMTQsMTUsMTcsMTksMjEsMjMsMjUsMjcsMjhdLFxuXHR6ID0gMHgwLCBhLGIsYyxkLGUsZiwgU1AxLFNQMixTUDMsU1A0LFNQNSxTUDYsU1A3LFNQOCxcblx0a2V5cyA9IFtdO1xuXG5hPTE8PDE2OyBiPTE8PDI0OyBjPWF8YjsgZD0xPDwyOyBlPTE8PDEwOyBmPWR8ZTtcblNQMSA9IFtjfGUsenx6LGF8eixjfGYsY3xkLGF8Zix6fGQsYXx6LHp8ZSxjfGUsY3xmLHp8ZSxifGYsY3xkLGJ8eix6fGQsXG5cdCAgIHp8ZixifGUsYnxlLGF8ZSxhfGUsY3x6LGN8eixifGYsYXxkLGJ8ZCxifGQsYXxkLHp8eix6fGYsYXxmLGJ8eixcblx0ICAgYXx6LGN8Zix6fGQsY3x6LGN8ZSxifHosYnx6LHp8ZSxjfGQsYXx6LGF8ZSxifGQsenxlLHp8ZCxifGYsYXxmLFxuXHQgICBjfGYsYXxkLGN8eixifGYsYnxkLHp8ZixhfGYsY3xlLHp8ZixifGUsYnxlLHp8eixhfGQsYXxlLHp8eixjfGRdO1xuXG5hPTE8PDIwOyBiPTE8PDMxOyBjPWF8YjsgZD0xPDw1OyBlPTE8PDE1OyBmPWR8ZTtcblNQMiA9IFtjfGYsYnxlLHp8ZSxhfGYsYXx6LHp8ZCxjfGQsYnxmLGJ8ZCxjfGYsY3xlLGJ8eixifGUsYXx6LHp8ZCxjfGQsXG5cdCAgIGF8ZSxhfGQsYnxmLHp8eixifHosenxlLGF8ZixjfHosYXxkLGJ8ZCx6fHosYXxlLHp8ZixjfGUsY3x6LHp8Zixcblx0ICAgenx6LGF8ZixjfGQsYXx6LGJ8ZixjfHosY3xlLHp8ZSxjfHosYnxlLHp8ZCxjfGYsYXxmLHp8ZCx6fGUsYnx6LFxuXHQgICB6fGYsY3xlLGF8eixifGQsYXxkLGJ8ZixifGQsYXxkLGF8ZSx6fHosYnxlLHp8ZixifHosY3xkLGN8ZixhfGVdO1xuXG5hPTE8PDE3OyBiPTE8PDI3OyBjPWF8YjsgZD0xPDwzOyBlPTE8PDk7IGY9ZHxlO1xuU1AzID0gW3p8ZixjfGUsenx6LGN8ZCxifGUsenx6LGF8ZixifGUsYXxkLGJ8ZCxifGQsYXx6LGN8ZixhfGQsY3x6LHp8Zixcblx0ICAgYnx6LHp8ZCxjfGUsenxlLGF8ZSxjfHosY3xkLGF8ZixifGYsYXxlLGF8eixifGYsenxkLGN8Zix6fGUsYnx6LFxuXHQgICBjfGUsYnx6LGF8ZCx6fGYsYXx6LGN8ZSxifGUsenx6LHp8ZSxhfGQsY3xmLGJ8ZSxifGQsenxlLHp8eixjfGQsXG5cdCAgIGJ8ZixhfHosYnx6LGN8Zix6fGQsYXxmLGF8ZSxifGQsY3x6LGJ8Zix6fGYsY3x6LGF8Zix6fGQsY3xkLGF8ZV07XG5cbmE9MTw8MTM7IGI9MTw8MjM7IGM9YXxiOyBkPTE8PDA7IGU9MTw8NzsgZj1kfGU7XG5TUDQgPSBbY3xkLGF8ZixhfGYsenxlLGN8ZSxifGYsYnxkLGF8ZCx6fHosY3x6LGN8eixjfGYsenxmLHp8eixifGUsYnxkLFxuXHQgICB6fGQsYXx6LGJ8eixjfGQsenxlLGJ8eixhfGQsYXxlLGJ8Zix6fGQsYXxlLGJ8ZSxhfHosY3xlLGN8Zix6fGYsXG5cdCAgIGJ8ZSxifGQsY3x6LGN8Zix6fGYsenx6LHp8eixjfHosYXxlLGJ8ZSxifGYsenxkLGN8ZCxhfGYsYXxmLHp8ZSxcblx0ICAgY3xmLHp8Zix6fGQsYXx6LGJ8ZCxhfGQsY3xlLGJ8ZixhfGQsYXxlLGJ8eixjfGQsenxlLGJ8eixhfHosY3xlXTtcblxuYT0xPDwyNTsgYj0xPDwzMDsgYz1hfGI7IGQ9MTw8ODsgZT0xPDwxOTsgZj1kfGU7XG5TUDUgPSBbenxkLGF8ZixhfGUsY3xkLHp8ZSx6fGQsYnx6LGF8ZSxifGYsenxlLGF8ZCxifGYsY3xkLGN8ZSx6fGYsYnx6LFxuXHQgICBhfHosYnxlLGJ8ZSx6fHosYnxkLGN8ZixjfGYsYXxkLGN8ZSxifGQsenx6LGN8eixhfGYsYXx6LGN8eix6fGYsXG5cdCAgIHp8ZSxjfGQsenxkLGF8eixifHosYXxlLGN8ZCxifGYsYXxkLGJ8eixjfGUsYXxmLGJ8Zix6fGQsYXx6LGN8ZSxcblx0ICAgY3xmLHp8ZixjfHosY3xmLGF8ZSx6fHosYnxlLGN8eix6fGYsYXxkLGJ8ZCx6fGUsenx6LGJ8ZSxhfGYsYnxkXTtcblxuYT0xPDwyMjsgYj0xPDwyOTsgYz1hfGI7IGQ9MTw8NDsgZT0xPDwxNDsgZj1kfGU7XG5TUDYgPSBbYnxkLGN8eix6fGUsY3xmLGN8eix6fGQsY3xmLGF8eixifGUsYXxmLGF8eixifGQsYXxkLGJ8ZSxifHosenxmLFxuXHQgICB6fHosYXxkLGJ8Zix6fGUsYXxlLGJ8Zix6fGQsY3xkLGN8ZCx6fHosYXxmLGN8ZSx6fGYsYXxlLGN8ZSxifHosXG5cdCAgIGJ8ZSx6fGQsY3xkLGF8ZSxjfGYsYXx6LHp8ZixifGQsYXx6LGJ8ZSxifHosenxmLGJ8ZCxjfGYsYXxlLGN8eixcblx0ICAgYXxmLGN8ZSx6fHosY3xkLHp8ZCx6fGUsY3x6LGF8Zix6fGUsYXxkLGJ8Zix6fHosY3xlLGJ8eixhfGQsYnxmXTtcblxuYT0xPDwyMTsgYj0xPDwyNjsgYz1hfGI7IGQ9MTw8MTsgZT0xPDwxMTsgZj1kfGU7XG5TUDcgPSBbYXx6LGN8ZCxifGYsenx6LHp8ZSxifGYsYXxmLGN8ZSxjfGYsYXx6LHp8eixifGQsenxkLGJ8eixjfGQsenxmLFxuXHQgICBifGUsYXxmLGF8ZCxifGUsYnxkLGN8eixjfGUsYXxkLGN8eix6fGUsenxmLGN8ZixhfGUsenxkLGJ8eixhfGUsXG5cdCAgIGJ8eixhfGUsYXx6LGJ8ZixifGYsY3xkLGN8ZCx6fGQsYXxkLGJ8eixifGUsYXx6LGN8ZSx6fGYsYXxmLGN8ZSxcblx0ICAgenxmLGJ8ZCxjfGYsY3x6LGF8ZSx6fHosenxkLGN8Zix6fHosYXxmLGN8eix6fGUsYnxkLGJ8ZSx6fGUsYXxkXTtcblxuYT0xPDwxODsgYj0xPDwyODsgYz1hfGI7IGQ9MTw8NjsgZT0xPDwxMjsgZj1kfGU7XG5TUDggPSBbYnxmLHp8ZSxhfHosY3xmLGJ8eixifGYsenxkLGJ8eixhfGQsY3x6LGN8ZixhfGUsY3xlLGF8Zix6fGUsenxkLFxuXHQgICBjfHosYnxkLGJ8ZSx6fGYsYXxlLGF8ZCxjfGQsY3xlLHp8Zix6fHosenx6LGN8ZCxifGQsYnxlLGF8ZixhfHosXG5cdCAgIGF8ZixhfHosY3xlLHp8ZSx6fGQsY3xkLHp8ZSxhfGYsYnxlLHp8ZCxifGQsY3x6LGN8ZCxifHosYXx6LGJ8Zixcblx0ICAgenx6LGN8ZixhfGQsYnxkLGN8eixifGUsYnxmLHp8eixjfGYsYXxlLGF8ZSx6fGYsenxmLGF8ZCxifHosY3xlXTtcblxuXG4vKipcbiAqIEV4cG9zZSB0aGUgREVTIGZ1bmN0aW9uLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXNzd2QpIHtcblx0c2V0S2V5cyhwYXNzd2QpOyAgICAgICAgICAgICAvLyBTZXR1cCBrZXlzXG5cdHJldHVybiB7J2VuY3J5cHQnOiBlbmNyeXB0fTsgLy8gUHVibGljIGludGVyZmFjZVxufTtcblxuXG4vKipcbiAqIFByaXZhdGUgQVBJLlxuICovXG5cblxuLy8gU2V0IHRoZSBrZXkuXG5mdW5jdGlvbiBzZXRLZXlzKGtleUJsb2NrKSB7XG5cdHZhciBpLCBqLCBsLCBtLCBuLCBvLCBwYzFtID0gW10sIHBjciA9IFtdLCBrbiA9IFtdLFxuXHRcdHJhdzAsIHJhdzEsIHJhd2ksIEtuTGk7XG5cblx0Zm9yIChqID0gMCwgbCA9IDU2OyBqIDwgNTY7ICsraiwgbCAtPSA4KSB7XG5cdFx0bCArPSBsIDwgLTUgPyA2NSA6IGwgPCAtMyA/IDMxIDogbCA8IC0xID8gNjMgOiBsID09PSAyNyA/IDM1IDogMDsgLy8gUEMxXG5cdFx0bSA9IGwgJiAweDc7XG5cdFx0cGMxbVtqXSA9ICgoa2V5QmxvY2tbbCA+Pj4gM10gJiAoMTw8bSkpICE9PSAwKSA/IDE6IDA7XG5cdH1cblxuXHRmb3IgKGkgPSAwOyBpIDwgMTY7ICsraSkge1xuXHRcdG0gPSBpIDw8IDE7XG5cdFx0biA9IG0gKyAxO1xuXHRcdGtuW21dID0ga25bbl0gPSAwO1xuXHRcdGZvciAobyA9IDI4OyBvIDwgNTk7IG8gKz0gMjgpIHtcblx0XHRcdGZvciAoaiA9IG8gLSAyODsgaiA8IG87ICsraikge1xuXHRcdFx0XHRsID0gaiArIHRvdHJvdFtpXTtcblx0XHRcdFx0aWYgKGwgPCBvKSB7XG5cdFx0XHRcdFx0cGNyW2pdID0gcGMxbVtsXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRwY3Jbal0gPSBwYzFtW2wgLSAyOF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yIChqID0gMDsgaiA8IDI0OyArK2opIHtcblx0XHRcdGlmIChwY3JbUEMyW2pdXSAhPT0gMCkge1xuXHRcdFx0XHRrblttXSB8PSAxIDw8ICgyMyAtIGopO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBjcltQQzJbaiArIDI0XV0gIT09IDApIHtcblx0XHRcdFx0a25bbl0gfD0gMSA8PCAoMjMgLSBqKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBjb29rZXlcblx0Zm9yIChpID0gMCwgcmF3aSA9IDAsIEtuTGkgPSAwOyBpIDwgMTY7ICsraSkge1xuXHRcdHJhdzAgPSBrbltyYXdpKytdO1xuXHRcdHJhdzEgPSBrbltyYXdpKytdO1xuXHRcdGtleXNbS25MaV0gPSAocmF3MCAmIDB4MDBmYzAwMDApIDw8IDY7XG5cdFx0a2V5c1tLbkxpXSB8PSAocmF3MCAmIDB4MDAwMDBmYzApIDw8IDEwO1xuXHRcdGtleXNbS25MaV0gfD0gKHJhdzEgJiAweDAwZmMwMDAwKSA+Pj4gMTA7XG5cdFx0a2V5c1tLbkxpXSB8PSAocmF3MSAmIDB4MDAwMDBmYzApID4+PiA2O1xuXHRcdCsrS25MaTtcblx0XHRrZXlzW0tuTGldID0gKHJhdzAgJiAweDAwMDNmMDAwKSA8PCAxMjtcblx0XHRrZXlzW0tuTGldIHw9IChyYXcwICYgMHgwMDAwMDAzZikgPDwgMTY7XG5cdFx0a2V5c1tLbkxpXSB8PSAocmF3MSAmIDB4MDAwM2YwMDApID4+PiA0O1xuXHRcdGtleXNbS25MaV0gfD0gKHJhdzEgJiAweDAwMDAwMDNmKTtcblx0XHQrK0tuTGk7XG5cdH1cbn1cblxuXG4vLyBFbmNyeXB0IDggYnl0ZXMgb2YgdGV4dFxuZnVuY3Rpb24gZW5jOCh0ZXh0KSB7XG5cdHZhciBpID0gMCwgYiA9IHRleHQuc2xpY2UoKSwgZnZhbCwga2V5c2kgPSAwLFxuXHRcdGwsIHIsIHg7IC8vIGxlZnQsIHJpZ2h0LCBhY2N1bXVsYXRvclxuXG5cdC8vIFNxdWFzaCA4IGJ5dGVzIHRvIDIgaW50c1xuXHRsID0gYltpKytdPDwyNCB8IGJbaSsrXTw8MTYgfCBiW2krK108PDggfCBiW2krK107XG5cdHIgPSBiW2krK108PDI0IHwgYltpKytdPDwxNiB8IGJbaSsrXTw8OCB8IGJbaSsrXTtcblxuXHR4ID0gKChsID4+PiA0KSBeIHIpICYgMHgwZjBmMGYwZjtcblx0ciBePSB4O1xuXHRsIF49ICh4IDw8IDQpO1xuXHR4ID0gKChsID4+PiAxNikgXiByKSAmIDB4MDAwMGZmZmY7XG5cdHIgXj0geDtcblx0bCBePSAoeCA8PCAxNik7XG5cdHggPSAoKHIgPj4+IDIpIF4gbCkgJiAweDMzMzMzMzMzO1xuXHRsIF49IHg7XG5cdHIgXj0gKHggPDwgMik7XG5cdHggPSAoKHIgPj4+IDgpIF4gbCkgJiAweDAwZmYwMGZmO1xuXHRsIF49IHg7XG5cdHIgXj0gKHggPDwgOCk7XG5cdHIgPSAociA8PCAxKSB8ICgociA+Pj4gMzEpICYgMSk7XG5cdHggPSAobCBeIHIpICYgMHhhYWFhYWFhYTtcblx0bCBePSB4O1xuXHRyIF49IHg7XG5cdGwgPSAobCA8PCAxKSB8ICgobCA+Pj4gMzEpICYgMSk7XG5cblx0Zm9yIChpID0gMDsgaSA8IDg7ICsraSkge1xuXHRcdHggPSAociA8PCAyOCkgfCAociA+Pj4gNCk7XG5cdFx0eCBePSBrZXlzW2tleXNpKytdO1xuXHRcdGZ2YWwgPSAgU1A3W3ggJiAweDNmXTtcblx0XHRmdmFsIHw9IFNQNVsoeCA+Pj4gOCkgJiAweDNmXTtcblx0XHRmdmFsIHw9IFNQM1soeCA+Pj4gMTYpICYgMHgzZl07XG5cdFx0ZnZhbCB8PSBTUDFbKHggPj4+IDI0KSAmIDB4M2ZdO1xuXHRcdHggPSByIF4ga2V5c1trZXlzaSsrXTtcblx0XHRmdmFsIHw9IFNQOFt4ICYgMHgzZl07XG5cdFx0ZnZhbCB8PSBTUDZbKHggPj4+IDgpICYgMHgzZl07XG5cdFx0ZnZhbCB8PSBTUDRbKHggPj4+IDE2KSAmIDB4M2ZdO1xuXHRcdGZ2YWwgfD0gU1AyWyh4ID4+PiAyNCkgJiAweDNmXTtcblx0XHRsIF49IGZ2YWw7XG5cdFx0eCA9IChsIDw8IDI4KSB8IChsID4+PiA0KTtcblx0XHR4IF49IGtleXNba2V5c2krK107XG5cdFx0ZnZhbCA9ICBTUDdbeCAmIDB4M2ZdO1xuXHRcdGZ2YWwgfD0gU1A1Wyh4ID4+PiA4KSAmIDB4M2ZdO1xuXHRcdGZ2YWwgfD0gU1AzWyh4ID4+PiAxNikgJiAweDNmXTtcblx0XHRmdmFsIHw9IFNQMVsoeCA+Pj4gMjQpICYgMHgzZl07XG5cdFx0eCA9IGwgXiBrZXlzW2tleXNpKytdO1xuXHRcdGZ2YWwgfD0gU1A4W3ggJiAweDAwMDAwMDNmXTtcblx0XHRmdmFsIHw9IFNQNlsoeCA+Pj4gOCkgJiAweDNmXTtcblx0XHRmdmFsIHw9IFNQNFsoeCA+Pj4gMTYpICYgMHgzZl07XG5cdFx0ZnZhbCB8PSBTUDJbKHggPj4+IDI0KSAmIDB4M2ZdO1xuXHRcdHIgXj0gZnZhbDtcblx0fVxuXG5cdHIgPSAociA8PCAzMSkgfCAociA+Pj4gMSk7XG5cdHggPSAobCBeIHIpICYgMHhhYWFhYWFhYTtcblx0bCBePSB4O1xuXHRyIF49IHg7XG5cdGwgPSAobCA8PCAzMSkgfCAobCA+Pj4gMSk7XG5cdHggPSAoKGwgPj4+IDgpIF4gcikgJiAweDAwZmYwMGZmO1xuXHRyIF49IHg7XG5cdGwgXj0gKHggPDwgOCk7XG5cdHggPSAoKGwgPj4+IDIpIF4gcikgJiAweDMzMzMzMzMzO1xuXHRyIF49IHg7XG5cdGwgXj0gKHggPDwgMik7XG5cdHggPSAoKHIgPj4+IDE2KSBeIGwpICYgMHgwMDAwZmZmZjtcblx0bCBePSB4O1xuXHRyIF49ICh4IDw8IDE2KTtcblx0eCA9ICgociA+Pj4gNCkgXiBsKSAmIDB4MGYwZjBmMGY7XG5cdGwgXj0geDtcblx0ciBePSAoeCA8PCA0KTtcblxuXHQvLyBTcHJlYWQgaW50cyB0byBieXRlc1xuXHR4ID0gW3IsIGxdO1xuXHRmb3IgKGkgPSAwOyBpIDwgODsgaSsrKSB7XG5cdFx0YltpXSA9ICh4W2k+Pj4yXSA+Pj4gKDggKiAoMyAtIChpICUgNCkpKSkgJSAyNTY7XG5cdFx0aWYgKGJbaV0gPCAwKSB7IGJbaV0gKz0gMjU2OyB9IC8vIHVuc2lnbmVkXG5cdH1cblx0cmV0dXJuIGI7XG59XG5cblxuLy8gRW5jcnlwdCAxNiBieXRlcyBvZiB0ZXh0IHVzaW5nIHBhc3N3ZCBhcyBrZXlcbmZ1bmN0aW9uIGVuY3J5cHQodCkge1xuXHRyZXR1cm4gZW5jOCh0LnNsaWNlKDAsIDgpKS5jb25jYXQoZW5jOCh0LnNsaWNlKDgsIDE2KSkpO1xufVxuIiwiLypcbiAqIG5vVk5DOiBIVE1MNSBWTkMgY2xpZW50XG4gKiBDb3B5cmlnaHQgKEMpIDIwMTIgSm9lbCBNYXJ0aW5cbiAqIENvcHlyaWdodCAoQykgMjAxNSBTYW11ZWwgTWFubmVoZWQgZm9yIENlbmRpbyBBQlxuICogTGljZW5zZWQgdW5kZXIgTVBMIDIuMCAoc2VlIExJQ0VOU0UudHh0KVxuICovXG5cblxuLyoqXG4gKiBFeHBvc2UgdGhlIERpc3BsYXkgY2xhc3MuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gRGlzcGxheTtcblxuXG4vKipcbiAqIERlcGVuZGVuY2llcy5cbiAqL1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnbm9WTkM6RGlzcGxheScpO1xudmFyIGRlYnVnZXJyb3IgPSByZXF1aXJlKCdkZWJ1ZycpKCdub1ZOQzpFUlJPUjpEaXNwbGF5Jyk7XG5kZWJ1Z2Vycm9yLmxvZyA9IGNvbnNvbGUud2Fybi5iaW5kKGNvbnNvbGUpO1xudmFyIGJyb3dzZXIgPSByZXF1aXJlKCdib3dzZXInKS5icm93c2VyO1xudmFyIFV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBCYXNlNjQgPSByZXF1aXJlKCcuL2Jhc2U2NCcpO1xuXG5cbmZ1bmN0aW9uIERpc3BsYXkgKGRlZmF1bHRzKSB7XG5cdGRlYnVnKCduZXcoKScpO1xuXG5cdHRoaXMuX2RyYXdDdHggPSBudWxsO1xuXHR0aGlzLl9jX2ZvcmNlQ2FudmFzID0gZmFsc2U7XG5cblx0dGhpcy5fcmVuZGVyUSA9IFtdOyAgLy8gcXVldWUgZHJhd2luZyBhY3Rpb25zIGZvciBpbi1vZGVyIHJlbmRlcmluZ1xuXG5cdC8vIHRoZSBmdWxsIGZyYW1lIGJ1ZmZlciAobG9naWNhbCBjYW52YXMpIHNpemVcblx0dGhpcy5fZmJfd2lkdGggPSAwO1xuXHR0aGlzLl9mYl9oZWlnaHQgPSAwO1xuXG5cdC8vIHRoZSBzaXplIGxpbWl0IG9mIHRoZSB2aWV3cG9ydCAoc3RhcnQgZGlzYWJsZWQpXG5cdHRoaXMuX21heFdpZHRoID0gMDtcblx0dGhpcy5fbWF4SGVpZ2h0ID0gMDtcblxuXHQvLyB0aGUgdmlzaWJsZSAncGh5c2ljYWwgY2FudmFzJyB2aWV3cG9ydFxuXHR0aGlzLl92aWV3cG9ydExvYyA9IHsgJ3gnOiAwLCAneSc6IDAsICd3JzogMCwgJ2gnOiAwIH07XG5cdHRoaXMuX2NsZWFuUmVjdCA9IHsgJ3gxJzogMCwgJ3kxJzogMCwgJ3gyJzogLTEsICd5Mic6IC0xIH07XG5cblx0dGhpcy5fcHJldkRyYXdTdHlsZSA9ICcnO1xuXHR0aGlzLl90aWxlID0gbnVsbDtcblx0dGhpcy5fdGlsZTE2eDE2ID0gbnVsbDtcblx0dGhpcy5fdGlsZV94ID0gMDtcblx0dGhpcy5fdGlsZV95ID0gMDtcblxuXHRVdGlsLnNldF9kZWZhdWx0cyh0aGlzLCBkZWZhdWx0cywge1xuXHRcdCd0cnVlX2NvbG9yJzogdHJ1ZSxcblx0XHQnY29sb3VyTWFwJzogW10sXG5cdFx0J3NjYWxlJzogMS4wLFxuXHRcdCd2aWV3cG9ydCc6IGZhbHNlLFxuXHRcdCdyZW5kZXJfbW9kZSc6ICcnXG5cdH0pO1xuXG5cdGlmICghdGhpcy5fdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdUYXJnZXQgbXVzdCBiZSBzZXQnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgdGhpcy5fdGFyZ2V0ID09PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBFcnJvcigndGFyZ2V0IG11c3QgYmUgYSBET00gZWxlbWVudCcpO1xuXHR9XG5cblx0aWYgKCF0aGlzLl90YXJnZXQuZ2V0Q29udGV4dCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignbm8gZ2V0Q29udGV4dCBtZXRob2QnKTtcblx0fVxuXG5cdGlmICghdGhpcy5fZHJhd0N0eCkge1xuXHRcdHRoaXMuX2RyYXdDdHggPSB0aGlzLl90YXJnZXQuZ2V0Q29udGV4dCgnMmQnKTtcblx0fVxuXG5cdHRoaXMuY2xlYXIoKTtcblxuXHQvLyBDaGVjayBjYW52YXMgZmVhdHVyZXNcblx0aWYgKCdjcmVhdGVJbWFnZURhdGEnIGluIHRoaXMuX2RyYXdDdHgpIHtcblx0XHR0aGlzLl9yZW5kZXJfbW9kZSA9ICdjYW52YXMgcmVuZGVyaW5nJztcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NhbnZhcyBkb2VzIG5vdCBzdXBwb3J0IGNyZWF0ZUltYWdlRGF0YScpO1xuXHR9XG5cblx0aWYgKHRoaXMuX3ByZWZlcl9qcyA9PT0gbnVsbCkge1xuXHRcdHRoaXMuX3ByZWZlcl9qcyA9IHRydWU7XG5cdH1cblxuXHQvLyBEZXRlcm1pbmUgYnJvd3NlciBzdXBwb3J0IGZvciBzZXR0aW5nIHRoZSBjdXJzb3IgdmlhIGRhdGEgVVJJIHNjaGVtZVxuXHRpZiAodGhpcy5fY3Vyc29yX3VyaSB8fCB0aGlzLl9jdXJzb3JfdXJpID09PSBudWxsIHx8XG5cdCAgdGhpcy5fY3Vyc29yX3VyaSA9PT0gdW5kZWZpbmVkKSB7XG5cdCAgdGhpcy5fY3Vyc29yX3VyaSA9IFV0aWwuYnJvd3NlclN1cHBvcnRzQ3Vyc29yVVJJcygpO1xuXHR9XG59XG5cblxuRGlzcGxheS5wcm90b3R5cGUgPSB7XG5cdC8vIFB1YmxpYyBtZXRob2RzXG5cdHZpZXdwb3J0Q2hhbmdlUG9zOiBmdW5jdGlvbiAoZGVsdGFYLCBkZWx0YVkpIHtcblx0XHR2YXIgdnAgPSB0aGlzLl92aWV3cG9ydExvYztcblxuXHRcdGlmICghdGhpcy5fdmlld3BvcnQpIHtcblx0XHRcdGRlbHRhWCA9IC12cC53OyAgLy8gY2xhbXBlZCBsYXRlciBvZiBvdXQgb2YgYm91bmRzXG5cdFx0XHRkZWx0YVkgPSAtdnAuaDtcblx0XHR9XG5cblx0XHR2YXIgdngyID0gdnAueCArIHZwLncgLSAxO1xuXHRcdHZhciB2eTIgPSB2cC55ICsgdnAuaCAtIDE7XG5cblx0XHQvLyBQb3NpdGlvbiBjaGFuZ2VcblxuXHRcdGlmIChkZWx0YVggPCAwICYmIHZwLnggKyBkZWx0YVggPCAwKSB7XG5cdFx0XHRkZWx0YVggPSAtdnAueDtcblx0XHR9XG5cdFx0aWYgKHZ4MiArIGRlbHRhWCA+PSB0aGlzLl9mYl93aWR0aCkge1xuXHRcdFx0ZGVsdGFYIC09IHZ4MiArIGRlbHRhWCAtIHRoaXMuX2ZiX3dpZHRoICsgMTtcblx0XHR9XG5cblx0XHRpZiAodnAueSArIGRlbHRhWSA8IDApIHtcblx0XHRcdGRlbHRhWSA9IC12cC55O1xuXHRcdH1cblx0XHRpZiAodnkyICsgZGVsdGFZID49IHRoaXMuX2ZiX2hlaWdodCkge1xuXHRcdFx0ZGVsdGFZIC09ICh2eTIgKyBkZWx0YVkgLSB0aGlzLl9mYl9oZWlnaHQgKyAxKTtcblx0XHR9XG5cblx0XHRpZiAoZGVsdGFYID09PSAwICYmIGRlbHRhWSA9PT0gMCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRkZWJ1Zygndmlld3BvcnRDaGFuZ2VQb3MoKSB8IGRlbHRhWDogJyArIGRlbHRhWCArICcsIGRlbHRhWTogJyArIGRlbHRhWSk7XG5cblx0XHR2cC54ICs9IGRlbHRhWDtcblx0XHR2eDIgKz0gZGVsdGFYO1xuXHRcdHZwLnkgKz0gZGVsdGFZO1xuXHRcdHZ5MiArPSBkZWx0YVk7XG5cblx0XHQvLyBVcGRhdGUgdGhlIGNsZWFuIHJlY3RhbmdsZVxuXHRcdHZhciBjciA9IHRoaXMuX2NsZWFuUmVjdDtcblx0XHRpZiAodnAueCA+IGNyLngxKSB7XG5cdFx0XHRjci54MSA9IHZwLng7XG5cdFx0fVxuXHRcdGlmICh2eDIgPCBjci54Mikge1xuXHRcdFx0Y3IueDIgPSB2eDI7XG5cdFx0fVxuXHRcdGlmICh2cC55ID4gY3IueTEpIHtcblx0XHRcdGNyLnkxID0gdnAueTtcblx0XHR9XG5cdFx0aWYgKHZ5MiA8IGNyLnkyKSB7XG5cdFx0XHRjci55MiA9IHZ5Mjtcblx0XHR9XG5cblx0XHR2YXIgeDEsIHc7XG5cdFx0aWYgKGRlbHRhWCA8IDApIHtcblx0XHRcdC8vIFNoaWZ0IHZpZXdwb3J0IGxlZnQsIHJlZHJhdyBsZWZ0IHNlY3Rpb25cblx0XHRcdHgxID0gMDtcblx0XHRcdHcgPSAtZGVsdGFYO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBTaGlmdCB2aWV3cG9ydCByaWdodCwgcmVkcmF3IHJpZ2h0IHNlY3Rpb25cblx0XHRcdHgxID0gdnAudyAtIGRlbHRhWDtcblx0XHRcdHcgPSBkZWx0YVg7XG5cdFx0fVxuXG5cdFx0dmFyIHkxLCBoO1xuXHRcdGlmIChkZWx0YVkgPCAwKSB7XG5cdFx0XHQvLyBTaGlmdCB2aWV3cG9ydCB1cCwgcmVkcmF3IHRvcCBzZWN0aW9uXG5cdFx0XHR5MSA9IDA7XG5cdFx0XHRoID0gLWRlbHRhWTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gU2hpZnQgdmlld3BvcnQgZG93biwgcmVkcmF3IGJvdHRvbSBzZWN0aW9uXG5cdFx0XHR5MSA9IHZwLmggLSBkZWx0YVk7XG5cdFx0XHRoID0gZGVsdGFZO1xuXHRcdH1cblxuXHRcdC8vIENvcHkgdGhlIHZhbGlkIHBhcnQgb2YgdGhlIHZpZXdwb3J0IHRvIHRoZSBzaGlmdGVkIGxvY2F0aW9uXG5cdFx0dmFyIHNhdmVTdHlsZSA9IHRoaXMuX2RyYXdDdHguZmlsbFN0eWxlO1xuXHRcdHZhciBjYW52YXMgPSB0aGlzLl90YXJnZXQ7XG5cdFx0dGhpcy5fZHJhd0N0eC5maWxsU3R5bGUgPSAncmdiKDI1NSwyNTUsMjU1KSc7XG5cdFx0aWYgKGRlbHRhWCAhPT0gMCkge1xuXHRcdFx0dGhpcy5fZHJhd0N0eC5kcmF3SW1hZ2UoY2FudmFzLCAwLCAwLCB2cC53LCB2cC5oLCAtZGVsdGFYLCAwLCB2cC53LCB2cC5oKTtcblx0XHRcdHRoaXMuX2RyYXdDdHguZmlsbFJlY3QoeDEsIDAsIHcsIHZwLmgpO1xuXHRcdH1cblx0XHRpZiAoZGVsdGFZICE9PSAwKSB7XG5cdFx0XHR0aGlzLl9kcmF3Q3R4LmRyYXdJbWFnZShjYW52YXMsIDAsIDAsIHZwLncsIHZwLmgsIDAsIC1kZWx0YVksIHZwLncsIHZwLmgpO1xuXHRcdFx0dGhpcy5fZHJhd0N0eC5maWxsUmVjdCgwLCB5MSwgdnAudywgaCk7XG5cdFx0fVxuXHRcdHRoaXMuX2RyYXdDdHguZmlsbFN0eWxlID0gc2F2ZVN0eWxlO1xuXHR9LFxuXG5cdHZpZXdwb3J0Q2hhbmdlU2l6ZTogZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xuXHRcdGlmICh0eXBlb2Yod2lkdGgpID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YoaGVpZ2h0KSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdGRlYnVnKCd2aWV3cG9ydENoYW5nZVNpemUoKSB8IHNldHRpbmcgdmlld3BvcnQgdG8gZnVsbCBkaXNwbGF5IHJlZ2lvbicpO1xuXHRcdFx0d2lkdGggPSB0aGlzLl9mYl93aWR0aDtcblx0XHRcdGhlaWdodCA9IHRoaXMuX2ZiX2hlaWdodDtcblx0XHR9XG5cblx0XHR2YXIgdnAgPSB0aGlzLl92aWV3cG9ydExvYztcblxuXHRcdGlmICh2cC53ICE9PSB3aWR0aCB8fCB2cC5oICE9PSBoZWlnaHQpIHtcblx0XHRcdGlmICh0aGlzLl92aWV3cG9ydCkge1xuXHRcdFx0XHRpZiAodGhpcy5fbWF4V2lkdGggIT09IDAgJiYgd2lkdGggPiB0aGlzLl9tYXhXaWR0aCkge1xuXHRcdFx0XHRcdHdpZHRoID0gdGhpcy5fbWF4V2lkdGg7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHRoaXMuX21heEhlaWdodCAhPT0gMCAmJiBoZWlnaHQgPiB0aGlzLl9tYXhIZWlnaHQpIHtcblx0XHRcdFx0XHRoZWlnaHQgPSB0aGlzLl9tYXhIZWlnaHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dmFyIGNyID0gdGhpcy5fY2xlYW5SZWN0O1xuXG5cdFx0XHRpZiAod2lkdGggPCB2cC53ICYmICBjci54MiA+IHZwLnggKyB3aWR0aCAtIDEpIHtcblx0XHRcdFx0Y3IueDIgPSB2cC54ICsgd2lkdGggLSAxO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaGVpZ2h0IDwgdnAuaCAmJiAgY3IueTIgPiB2cC55ICsgaGVpZ2h0IC0gMSkge1xuXHRcdFx0XHRjci55MiA9IHZwLnkgKyBoZWlnaHQgLSAxO1xuXHRcdFx0fVxuXG5cdFx0XHR2cC53ID0gd2lkdGg7XG5cdFx0XHR2cC5oID0gaGVpZ2h0O1xuXG5cdFx0XHR2YXIgY2FudmFzID0gdGhpcy5fdGFyZ2V0O1xuXG5cdFx0XHRpZiAoY2FudmFzLndpZHRoICE9PSB3aWR0aCB8fCBjYW52YXMuaGVpZ2h0ICE9PSBoZWlnaHQpIHtcblx0XHRcdFx0Ly8gV2UgaGF2ZSB0byBzYXZlIHRoZSBjYW52YXMgZGF0YSBzaW5jZSBjaGFuZ2luZyB0aGUgc2l6ZSB3aWxsIGNsZWFyIGl0XG5cdFx0XHRcdHZhciBzYXZlSW1nID0gbnVsbDtcblxuXHRcdFx0XHRpZiAodnAudyA+IDAgJiYgdnAuaCA+IDAgJiYgY2FudmFzLndpZHRoID4gMCAmJiBjYW52YXMuaGVpZ2h0ID4gMCkge1xuXHRcdFx0XHRcdHZhciBpbWdfd2lkdGggPSBjYW52YXMud2lkdGggPCB2cC53ID8gY2FudmFzLndpZHRoIDogdnAudztcblx0XHRcdFx0XHR2YXIgaW1nX2hlaWdodCA9IGNhbnZhcy5oZWlnaHQgPCB2cC5oID8gY2FudmFzLmhlaWdodCA6IHZwLmg7XG5cdFx0XHRcdFx0c2F2ZUltZyA9IHRoaXMuX2RyYXdDdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGltZ193aWR0aCwgaW1nX2hlaWdodCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY2FudmFzLndpZHRoICE9PSB3aWR0aCkge1xuXHRcdFx0XHRcdGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuXHRcdFx0XHRcdGNhbnZhcy5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4Jztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoY2FudmFzLmhlaWdodCAhPT0gaGVpZ2h0KSB7XG5cdFx0XHRcdFx0Y2FudmFzLmhlaWdodCA9IGhlaWdodDtcblx0XHRcdFx0XHRjYW52YXMuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4Jztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChzYXZlSW1nKSB7XG5cdFx0XHRcdFx0dGhpcy5fZHJhd0N0eC5wdXRJbWFnZURhdGEoc2F2ZUltZywgMCwgMCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Ly8gUmV0dXJuIGEgbWFwIG9mIGNsZWFuIGFuZCBkaXJ0eSBhcmVhcyBvZiB0aGUgdmlld3BvcnQgYW5kIHJlc2V0IHRoZVxuXHQvLyB0cmFja2luZyBvZiBjbGVhbiBhbmQgZGlydHkgYXJlYXNcblx0Ly9cblx0Ly8gUmV0dXJuczogeyAnY2xlYW5Cb3gnOiB7ICd4JzogeCwgJ3knOiB5LCAndyc6IHcsICdoJzogaH0sXG5cdC8vICAgICAgICAgICAgJ2RpcnR5Qm94ZXMnOiBbeyAneCc6IHgsICd5JzogeSwgJ3cnOiB3LCAnaCc6IGggfSwgLi4uXSB9XG5cdGdldENsZWFuRGlydHlSZXNldDogZnVuY3Rpb24gKCkge1xuXHRcdHZhciB2cCA9IHRoaXMuX3ZpZXdwb3J0TG9jO1xuXHRcdHZhciBjciA9IHRoaXMuX2NsZWFuUmVjdDtcblxuXHRcdHZhciBjbGVhbkJveCA9IHsgJ3gnOiBjci54MSwgJ3knOiBjci55MSxcblx0XHRcdFx0XHRcdCAndyc6IGNyLngyIC0gY3IueDEgKyAxLCAnaCc6IGNyLnkyIC0gY3IueTEgKyAxIH07XG5cblx0XHR2YXIgZGlydHlCb3hlcyA9IFtdO1xuXHRcdGlmIChjci54MSA+PSBjci54MiB8fCBjci55MSA+PSBjci55Mikge1xuXHRcdFx0Ly8gV2hvbGUgdmlld3BvcnQgaXMgZGlydHlcblx0XHRcdGRpcnR5Qm94ZXMucHVzaCh7ICd4JzogdnAueCwgJ3knOiB2cC55LCAndyc6IHZwLncsICdoJzogdnAuaCB9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gUmVkcmF3IGRpcnR5IHJlZ2lvbnNcblx0XHRcdHZhciB2eDIgPSB2cC54ICsgdnAudyAtIDE7XG5cdFx0XHR2YXIgdnkyID0gdnAueSArIHZwLmggLSAxO1xuXG5cdFx0XHRpZiAodnAueCA8IGNyLngxKSB7XG5cdFx0XHRcdC8vIGxlZnQgc2lkZSBkaXJ0eSByZWdpb25cblx0XHRcdFx0ZGlydHlCb3hlcy5wdXNoKHsneCc6IHZwLngsICd5JzogdnAueSxcblx0XHRcdFx0XHRcdFx0XHQgJ3cnOiBjci54MSAtIHZwLnggKyAxLCAnaCc6IHZwLmh9KTtcblx0XHRcdH1cblx0XHRcdGlmICh2eDIgPiBjci54Mikge1xuXHRcdFx0XHQvLyByaWdodCBzaWRlIGRpcnR5IHJlZ2lvblxuXHRcdFx0XHRkaXJ0eUJveGVzLnB1c2goeyd4JzogY3IueDIgKyAxLCAneSc6IHZwLnksXG5cdFx0XHRcdFx0XHRcdFx0ICd3JzogdngyIC0gY3IueDIsICdoJzogdnAuaH0pO1xuXHRcdFx0fVxuXHRcdFx0aWYodnAueSA8IGNyLnkxKSB7XG5cdFx0XHRcdC8vIHRvcC9taWRkbGUgZGlydHkgcmVnaW9uXG5cdFx0XHRcdGRpcnR5Qm94ZXMucHVzaCh7J3gnOiBjci54MSwgJ3knOiB2cC55LFxuXHRcdFx0XHRcdFx0XHRcdCAndyc6IGNyLngyIC0gY3IueDEgKyAxLCAnaCc6IGNyLnkxIC0gdnAueX0pO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHZ5MiA+IGNyLnkyKSB7XG5cdFx0XHRcdC8vIGJvdHRvbS9taWRkbGUgZGlydHkgcmVnaW9uXG5cdFx0XHRcdGRpcnR5Qm94ZXMucHVzaCh7J3gnOiBjci54MSwgJ3knOiBjci55MiArIDEsXG5cdFx0XHRcdFx0XHRcdFx0ICd3JzogY3IueDIgLSBjci54MSArIDEsICdoJzogdnkyIC0gY3IueTJ9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLl9jbGVhblJlY3QgPSB7J3gxJzogdnAueCwgJ3kxJzogdnAueSxcblx0XHRcdFx0XHRcdFx0ICd4Mic6IHZwLnggKyB2cC53IC0gMSwgJ3kyJzogdnAueSArIHZwLmggLSAxfTtcblxuXHRcdHJldHVybiB7J2NsZWFuQm94JzogY2xlYW5Cb3gsICdkaXJ0eUJveGVzJzogZGlydHlCb3hlc307XG5cdH0sXG5cblx0YWJzWDogZnVuY3Rpb24gKHgpIHtcblx0XHRyZXR1cm4geCArIHRoaXMuX3ZpZXdwb3J0TG9jLng7XG5cdH0sXG5cblx0YWJzWTogZnVuY3Rpb24gKHkpIHtcblx0XHRyZXR1cm4geSArIHRoaXMuX3ZpZXdwb3J0TG9jLnk7XG5cdH0sXG5cblx0cmVzaXplOiBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuXHRcdHRoaXMuX3ByZXZEcmF3U3R5bGUgPSAnJztcblxuXHRcdHRoaXMuX2ZiX3dpZHRoID0gd2lkdGg7XG5cdFx0dGhpcy5fZmJfaGVpZ2h0ID0gaGVpZ2h0O1xuXG5cdFx0dGhpcy5fcmVzY2FsZSh0aGlzLl9zY2FsZSk7XG5cblx0XHR0aGlzLnZpZXdwb3J0Q2hhbmdlU2l6ZSgpO1xuXHR9LFxuXG5cdGNsZWFyOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX2xvZ28pIHtcblx0XHRcdHRoaXMucmVzaXplKHRoaXMuX2xvZ28ud2lkdGgsIHRoaXMuX2xvZ28uaGVpZ2h0KTtcblx0XHRcdHRoaXMuYmxpdFN0cmluZ0ltYWdlKHRoaXMuX2xvZ28uZGF0YSwgMCwgMCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChicm93c2VyLm1zaWUgJiYgcGFyc2VJbnQoYnJvd3Nlci52ZXJzaW9uKSA9PT0gMTApIHtcblx0XHRcdFx0Ly8gTkIoZGlyZWN0eG1hbjEyKTogdGhlcmUncyBhIGJ1ZyBpbiBJRTEwIHdoZXJlIHdlIGNhbiBmYWlsIHRvIGFjdHVhbGx5XG5cdFx0XHRcdC8vICAgICAgICAgICAgICAgICAgIGNsZWFyIHRoZSBjYW52YXMgaGVyZSBiZWNhdXNlIG9mIHRoZSByZXNpemUuXG5cdFx0XHRcdC8vICAgICAgICAgICAgICAgICAgIENsZWFyaW5nIHRoZSBjdXJyZW50IHZpZXdwb3J0IGZpcnN0IGZpeGVzIHRoZSBpc3N1ZVxuXHRcdFx0XHR0aGlzLl9kcmF3Q3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLl92aWV3cG9ydExvYy53LCB0aGlzLl92aWV3cG9ydExvYy5oKTtcblx0XHRcdH1cblx0XHRcdHRoaXMucmVzaXplKDI0MCwgMjApO1xuXHRcdFx0dGhpcy5fZHJhd0N0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5fdmlld3BvcnRMb2MudywgdGhpcy5fdmlld3BvcnRMb2MuaCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fcmVuZGVyUSA9IFtdO1xuXHR9LFxuXG5cdGZpbGxSZWN0OiBmdW5jdGlvbiAoeCwgeSwgd2lkdGgsIGhlaWdodCwgY29sb3IpIHtcblx0XHR0aGlzLl9zZXRGaWxsQ29sb3IoY29sb3IpO1xuXHRcdHRoaXMuX2RyYXdDdHguZmlsbFJlY3QoeCAtIHRoaXMuX3ZpZXdwb3J0TG9jLngsIHkgLSB0aGlzLl92aWV3cG9ydExvYy55LCB3aWR0aCwgaGVpZ2h0KTtcblx0fSxcblxuXHRjb3B5SW1hZ2U6IGZ1bmN0aW9uIChvbGRfeCwgb2xkX3ksIG5ld194LCBuZXdfeSwgdywgaCkge1xuXHRcdHZhciB4MSA9IG9sZF94IC0gdGhpcy5fdmlld3BvcnRMb2MueDtcblx0XHR2YXIgeTEgPSBvbGRfeSAtIHRoaXMuX3ZpZXdwb3J0TG9jLnk7XG5cdFx0dmFyIHgyID0gbmV3X3ggLSB0aGlzLl92aWV3cG9ydExvYy54O1xuXHRcdHZhciB5MiA9IG5ld195IC0gdGhpcy5fdmlld3BvcnRMb2MueTtcblxuXHRcdHRoaXMuX2RyYXdDdHguZHJhd0ltYWdlKHRoaXMuX3RhcmdldCwgeDEsIHkxLCB3LCBoLCB4MiwgeTIsIHcsIGgpO1xuXHR9LFxuXG5cdC8vIHN0YXJ0IHVwZGF0aW5nIGEgdGlsZVxuXHRzdGFydFRpbGU6IGZ1bmN0aW9uICh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjb2xvcikge1xuXHRcdHRoaXMuX3RpbGVfeCA9IHg7XG5cdFx0dGhpcy5fdGlsZV95ID0geTtcblx0XHRpZiAod2lkdGggPT09IDE2ICYmIGhlaWdodCA9PT0gMTYpIHtcblx0XHRcdHRoaXMuX3RpbGUgPSB0aGlzLl90aWxlMTZ4MTY7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3RpbGUgPSB0aGlzLl9kcmF3Q3R4LmNyZWF0ZUltYWdlRGF0YSh3aWR0aCwgaGVpZ2h0KTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fcHJlZmVyX2pzKSB7XG5cdFx0XHR2YXIgYmdyO1xuXHRcdFx0aWYgKHRoaXMuX3RydWVfY29sb3IpIHtcblx0XHRcdFx0YmdyID0gY29sb3I7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRiZ3IgPSB0aGlzLl9jb2xvdXJNYXBbY29sb3JbMF1dO1xuXHRcdFx0fVxuXHRcdFx0dmFyIHJlZCA9IGJnclsyXTtcblx0XHRcdHZhciBncmVlbiA9IGJnclsxXTtcblx0XHRcdHZhciBibHVlID0gYmdyWzBdO1xuXG5cdFx0XHR2YXIgZGF0YSA9IHRoaXMuX3RpbGUuZGF0YTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgd2lkdGggKiBoZWlnaHQgKiA0OyBpICs9IDQpIHtcblx0XHRcdFx0ZGF0YVtpXSA9IHJlZDtcblx0XHRcdFx0ZGF0YVtpICsgMV0gPSBncmVlbjtcblx0XHRcdFx0ZGF0YVtpICsgMl0gPSBibHVlO1xuXHRcdFx0XHRkYXRhW2kgKyAzXSA9IDI1NTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5maWxsUmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjb2xvcik7XG5cdFx0fVxuXHR9LFxuXG5cdC8vIHVwZGF0ZSBzdWItcmVjdGFuZ2xlIG9mIHRoZSBjdXJyZW50IHRpbGVcblx0c3ViVGlsZTogZnVuY3Rpb24gKHgsIHksIHcsIGgsIGNvbG9yKSB7XG5cdFx0aWYgKHRoaXMuX3ByZWZlcl9qcykge1xuXHRcdFx0dmFyIGJncjtcblx0XHRcdGlmICh0aGlzLl90cnVlX2NvbG9yKSB7XG5cdFx0XHRcdGJnciA9IGNvbG9yO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YmdyID0gdGhpcy5fY29sb3VyTWFwW2NvbG9yWzBdXTtcblx0XHRcdH1cblx0XHRcdHZhciByZWQgPSBiZ3JbMl07XG5cdFx0XHR2YXIgZ3JlZW4gPSBiZ3JbMV07XG5cdFx0XHR2YXIgYmx1ZSA9IGJnclswXTtcblx0XHRcdHZhciB4ZW5kID0geCArIHc7XG5cdFx0XHR2YXIgeWVuZCA9IHkgKyBoO1xuXG5cdFx0XHR2YXIgZGF0YSA9IHRoaXMuX3RpbGUuZGF0YTtcblx0XHRcdHZhciB3aWR0aCA9IHRoaXMuX3RpbGUud2lkdGg7XG5cdFx0XHRmb3IgKHZhciBqID0geTsgaiA8IHllbmQ7IGorKykge1xuXHRcdFx0XHRmb3IgKHZhciBpID0geDsgaSA8IHhlbmQ7IGkrKykge1xuXHRcdFx0XHRcdHZhciBwID0gKGkgKyAoaiAqIHdpZHRoKSkgKiA0O1xuXHRcdFx0XHRcdGRhdGFbcF0gPSByZWQ7XG5cdFx0XHRcdFx0ZGF0YVtwICsgMV0gPSBncmVlbjtcblx0XHRcdFx0XHRkYXRhW3AgKyAyXSA9IGJsdWU7XG5cdFx0XHRcdFx0ZGF0YVtwICsgM10gPSAyNTU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5maWxsUmVjdCh0aGlzLl90aWxlX3ggKyB4LCB0aGlzLl90aWxlX3kgKyB5LCB3LCBoLCBjb2xvcik7XG5cdFx0fVxuXHR9LFxuXG5cdC8vIGRyYXcgdGhlIGN1cnJlbnQgdGlsZSB0byB0aGUgc2NyZWVuXG5cdGZpbmlzaFRpbGU6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fcHJlZmVyX2pzKSB7XG5cdFx0XHR0aGlzLl9kcmF3Q3R4LnB1dEltYWdlRGF0YSh0aGlzLl90aWxlLCB0aGlzLl90aWxlX3ggLSB0aGlzLl92aWV3cG9ydExvYy54LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgdGhpcy5fdGlsZV95IC0gdGhpcy5fdmlld3BvcnRMb2MueSk7XG5cdFx0fVxuXHRcdC8vIGVsc2U6IE5vLW9wIC0tIGFscmVhZHkgZG9uZSBieSBzZXRTdWJUaWxlXG5cdH0sXG5cblx0YmxpdEltYWdlOiBmdW5jdGlvbiAoeCwgeSwgd2lkdGgsIGhlaWdodCwgYXJyLCBvZmZzZXQpIHtcblx0XHRpZiAodGhpcy5fdHJ1ZV9jb2xvcikge1xuXHRcdFx0dGhpcy5fYmdyeEltYWdlRGF0YSh4LCB5LCB0aGlzLl92aWV3cG9ydExvYy54LCB0aGlzLl92aWV3cG9ydExvYy55LCB3aWR0aCwgaGVpZ2h0LCBhcnIsIG9mZnNldCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2NtYXBJbWFnZURhdGEoeCwgeSwgdGhpcy5fdmlld3BvcnRMb2MueCwgdGhpcy5fdmlld3BvcnRMb2MueSwgd2lkdGgsIGhlaWdodCwgYXJyLCBvZmZzZXQpO1xuXHRcdH1cblx0fSxcblxuXHRibGl0UmdiSW1hZ2U6IGZ1bmN0aW9uICh4LCB5ICwgd2lkdGgsIGhlaWdodCwgYXJyLCBvZmZzZXQpIHtcblx0XHRpZiAodGhpcy5fdHJ1ZV9jb2xvcikge1xuXHRcdFx0dGhpcy5fcmdiSW1hZ2VEYXRhKHgsIHksIHRoaXMuX3ZpZXdwb3J0TG9jLngsIHRoaXMuX3ZpZXdwb3J0TG9jLnksIHdpZHRoLCBoZWlnaHQsIGFyciwgb2Zmc2V0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcHJvYmFibHkgd3Jvbmc/XG5cdFx0XHR0aGlzLl9jbWFwSW1hZ2VEYXRhKHgsIHksIHRoaXMuX3ZpZXdwb3J0TG9jLngsIHRoaXMuX3ZpZXdwb3J0TG9jLnksIHdpZHRoLCBoZWlnaHQsIGFyciwgb2Zmc2V0KTtcblx0XHR9XG5cdH0sXG5cblx0YmxpdFN0cmluZ0ltYWdlOiBmdW5jdGlvbiAoc3RyLCB4LCB5KSB7XG5cdFx0dmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuXHRcdGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9kcmF3Q3R4LmRyYXdJbWFnZShpbWcsIHggLSB0aGlzLl92aWV3cG9ydExvYy54LCB5IC0gdGhpcy5fdmlld3BvcnRMb2MueSk7XG5cdFx0fS5iaW5kKHRoaXMpO1xuXHRcdGltZy5zcmMgPSBzdHI7XG5cdFx0cmV0dXJuIGltZzsgLy8gZm9yIGRlYnVnZ2luZyBwdXJwb3Nlc1xuXHR9LFxuXG5cdC8vIHdyYXAgY3R4LmRyYXdJbWFnZSBidXQgcmVsYXRpdmUgdG8gdmlld3BvcnRcblx0ZHJhd0ltYWdlOiBmdW5jdGlvbiAoaW1nLCB4LCB5KSB7XG5cdFx0dGhpcy5fZHJhd0N0eC5kcmF3SW1hZ2UoaW1nLCB4IC0gdGhpcy5fdmlld3BvcnRMb2MueCwgeSAtIHRoaXMuX3ZpZXdwb3J0TG9jLnkpO1xuXHR9LFxuXG5cdHJlbmRlclFfcHVzaDogZnVuY3Rpb24gKGFjdGlvbikge1xuXHRcdHRoaXMuX3JlbmRlclEucHVzaChhY3Rpb24pO1xuXHRcdGlmICh0aGlzLl9yZW5kZXJRLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0Ly8gSWYgdGhpcyBjYW4gYmUgcmVuZGVyZWQgaW1tZWRpYXRlbHkgaXQgd2lsbCBiZSwgb3RoZXJ3aXNlXG5cdFx0XHQvLyB0aGUgc2Nhbm5lciB3aWxsIHN0YXJ0IHBvbGxpbmcgdGhlIHF1ZXVlIChldmVyeVxuXHRcdFx0Ly8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGludGVydmFsKVxuXHRcdFx0dGhpcy5fc2Nhbl9yZW5kZXJRKCk7XG5cdFx0fVxuXHR9LFxuXG5cdGNoYW5nZUN1cnNvcjogZnVuY3Rpb24gKHBpeGVscywgbWFzaywgaG90eCwgaG90eSwgdywgaCkge1xuXHRcdGlmICh0aGlzLl9jdXJzb3JfdXJpID09PSBmYWxzZSkge1xuXHRcdFx0ZGVidWdlcnJvcignY2hhbmdlQ3Vyc29yKCkgfCBjYWxsZWQgYnV0IG5vIGN1cnNvciBkYXRhIFVSSSBzdXBwb3J0Jyk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX3RydWVfY29sb3IpIHtcblx0XHRcdERpc3BsYXkuY2hhbmdlQ3Vyc29yKHRoaXMuX3RhcmdldCwgcGl4ZWxzLCBtYXNrLCBob3R4LCBob3R5LCB3LCBoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0RGlzcGxheS5jaGFuZ2VDdXJzb3IodGhpcy5fdGFyZ2V0LCBwaXhlbHMsIG1hc2ssIGhvdHgsIGhvdHksIHcsIGgsIHRoaXMuX2NvbG91ck1hcCk7XG5cdFx0fVxuXHR9LFxuXG5cdGRlZmF1bHRDdXJzb3I6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl90YXJnZXQuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuXHR9LFxuXG5cdGRpc2FibGVMb2NhbEN1cnNvcjogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX3RhcmdldC5zdHlsZS5jdXJzb3IgPSAnbm9uZSc7XG5cdH0sXG5cblx0Y2xpcHBpbmdEaXNwbGF5OiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHZwID0gdGhpcy5fdmlld3BvcnRMb2M7XG5cblx0XHR2YXIgZmJDbGlwID0gdGhpcy5fZmJfd2lkdGggPiB2cC53IHx8IHRoaXMuX2ZiX2hlaWdodCA+IHZwLmg7XG5cdFx0dmFyIGxpbWl0ZWRWcCA9IHRoaXMuX21heFdpZHRoICE9PSAwICYmIHRoaXMuX21heEhlaWdodCAhPT0gMDtcblx0XHR2YXIgY2xpcHBpbmcgPSBmYWxzZTtcblxuXHRcdGlmIChsaW1pdGVkVnApIHtcblx0XHRcdGNsaXBwaW5nID0gdnAudyA+IHRoaXMuX21heFdpZHRoIHx8IHZwLmggPiB0aGlzLl9tYXhIZWlnaHQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZiQ2xpcCB8fCAobGltaXRlZFZwICYmIGNsaXBwaW5nKTtcblx0fSxcblxuXHQvLyBPdmVycmlkZGVuIGdldHRlcnMvc2V0dGVyc1xuXHRnZXRfY29udGV4dDogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9kcmF3Q3R4O1xuXHR9LFxuXG5cdHNldF9zY2FsZTogZnVuY3Rpb24gKHNjYWxlKSB7XG5cdFx0dGhpcy5fcmVzY2FsZShzY2FsZSk7XG5cdH0sXG5cblx0c2V0X3dpZHRoOiBmdW5jdGlvbiAodykge1xuXHRcdHRoaXMuX2ZiX3dpZHRoID0gdztcblx0fSxcblxuXHRnZXRfd2lkdGg6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5fZmJfd2lkdGg7XG5cdH0sXG5cblx0c2V0X2hlaWdodDogZnVuY3Rpb24gKGgpIHtcblx0XHR0aGlzLl9mYl9oZWlnaHQgPSAgaDtcblx0fSxcblxuXHRnZXRfaGVpZ2h0OiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2ZiX2hlaWdodDtcblx0fSxcblxuXHRhdXRvc2NhbGU6IGZ1bmN0aW9uIChjb250YWluZXJXaWR0aCwgY29udGFpbmVySGVpZ2h0LCBkb3duc2NhbGVPbmx5KSB7XG5cdFx0dmFyIHRhcmdldEFzcGVjdFJhdGlvID0gY29udGFpbmVyV2lkdGggLyBjb250YWluZXJIZWlnaHQ7XG5cdFx0dmFyIGZiQXNwZWN0UmF0aW8gPSB0aGlzLl9mYl93aWR0aCAvIHRoaXMuX2ZiX2hlaWdodDtcblxuXHRcdHZhciBzY2FsZVJhdGlvO1xuXHRcdGlmIChmYkFzcGVjdFJhdGlvID49IHRhcmdldEFzcGVjdFJhdGlvKSB7XG5cdFx0XHRcdHNjYWxlUmF0aW8gPSBjb250YWluZXJXaWR0aCAvIHRoaXMuX2ZiX3dpZHRoO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNjYWxlUmF0aW8gPSBjb250YWluZXJIZWlnaHQgLyB0aGlzLl9mYl9oZWlnaHQ7XG5cdFx0fVxuXG5cdFx0dmFyIHRhcmdldFcsIHRhcmdldEg7XG5cdFx0aWYgKHNjYWxlUmF0aW8gPiAxLjAgJiYgZG93bnNjYWxlT25seSkge1xuXHRcdFx0XHR0YXJnZXRXID0gdGhpcy5fZmJfd2lkdGg7XG5cdFx0XHRcdHRhcmdldEggPSB0aGlzLl9mYl9oZWlnaHQ7XG5cdFx0XHRcdHNjYWxlUmF0aW8gPSAxLjA7XG5cdFx0fSBlbHNlIGlmIChmYkFzcGVjdFJhdGlvID49IHRhcmdldEFzcGVjdFJhdGlvKSB7XG5cdFx0XHRcdHRhcmdldFcgPSBjb250YWluZXJXaWR0aDtcblx0XHRcdFx0dGFyZ2V0SCA9IE1hdGgucm91bmQoY29udGFpbmVyV2lkdGggLyBmYkFzcGVjdFJhdGlvKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0YXJnZXRXID0gTWF0aC5yb3VuZChjb250YWluZXJIZWlnaHQgKiBmYkFzcGVjdFJhdGlvKTtcblx0XHRcdFx0dGFyZ2V0SCA9IGNvbnRhaW5lckhlaWdodDtcblx0XHR9XG5cblx0XHQvLyBOQihkaXJlY3R4bWFuMTIpOiBJZiB5b3Ugc2V0IHRoZSB3aWR0aCBkaXJlY3RseSwgb3Igc2V0IHRoZVxuXHRcdC8vICAgICAgICAgICAgICAgICAgIHN0eWxlIHdpZHRoIHRvIGEgbnVtYmVyLCB0aGUgY2FudmFzIGlzIGNsZWFyZWQuXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgSG93ZXZlciwgaWYgeW91IHNldCB0aGUgc3R5bGUgd2lkdGggdG8gYSBzdHJpbmdcblx0XHQvLyAgICAgICAgICAgICAgICAgICAoJ05OTnB4JyksIHRoZSBjYW52YXMgaXMgc2NhbGVkIHdpdGhvdXQgY2xlYXJpbmcuXG5cdFx0dGhpcy5fdGFyZ2V0LnN0eWxlLndpZHRoID0gdGFyZ2V0VyArICdweCc7XG5cdFx0dGhpcy5fdGFyZ2V0LnN0eWxlLmhlaWdodCA9IHRhcmdldEggKyAncHgnO1xuXG5cdFx0dGhpcy5fc2NhbGUgPSBzY2FsZVJhdGlvO1xuXG5cdFx0cmV0dXJuIHNjYWxlUmF0aW87ICAvLyBzbyB0aGF0IHRoZSBtb3VzZSwgZXRjIHNjYWxlIGNhbiBiZSBzZXRcblx0fSxcblxuXHQvLyBQcml2YXRlIE1ldGhvZHNcblxuXHRfcmVzY2FsZTogZnVuY3Rpb24gKGZhY3Rvcikge1xuXHRcdHRoaXMuX3NjYWxlID0gZmFjdG9yO1xuXG5cdFx0dmFyIHc7XG5cdFx0dmFyIGg7XG5cblx0XHRpZiAodGhpcy5fdmlld3BvcnQgJiZcblx0XHRcdHRoaXMuX21heFdpZHRoICE9PSAwICYmIHRoaXMuX21heEhlaWdodCAhPT0gMCkge1xuXHRcdFx0dyA9IE1hdGgubWluKHRoaXMuX2ZiX3dpZHRoLCB0aGlzLl9tYXhXaWR0aCk7XG5cdFx0XHRoID0gTWF0aC5taW4odGhpcy5fZmJfaGVpZ2h0LCB0aGlzLl9tYXhIZWlnaHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR3ID0gdGhpcy5fZmJfd2lkdGg7XG5cdFx0XHRoID0gdGhpcy5fZmJfaGVpZ2h0O1xuXHRcdH1cblxuXHRcdHRoaXMuX3RhcmdldC5zdHlsZS53aWR0aCA9IE1hdGgucm91bmQoZmFjdG9yICogdykgKyAncHgnO1xuXHRcdHRoaXMuX3RhcmdldC5zdHlsZS5oZWlnaHQgPSBNYXRoLnJvdW5kKGZhY3RvciAqIGgpICsgJ3B4Jztcblx0fSxcblxuXHRfc2V0RmlsbENvbG9yOiBmdW5jdGlvbiAoY29sb3IpIHtcblx0XHR2YXIgYmdyO1xuXHRcdGlmICh0aGlzLl90cnVlX2NvbG9yKSB7XG5cdFx0XHRiZ3IgPSBjb2xvcjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YmdyID0gdGhpcy5fY29sb3VyTWFwW2NvbG9yWzBdXTtcblx0XHR9XG5cblx0XHR2YXIgbmV3U3R5bGUgPSAncmdiKCcgKyBiZ3JbMl0gKyAnLCcgKyBiZ3JbMV0gKyAnLCcgKyBiZ3JbMF0gKyAnKSc7XG5cdFx0aWYgKG5ld1N0eWxlICE9PSB0aGlzLl9wcmV2RHJhd1N0eWxlKSB7XG5cdFx0XHR0aGlzLl9kcmF3Q3R4LmZpbGxTdHlsZSA9IG5ld1N0eWxlO1xuXHRcdFx0dGhpcy5fcHJldkRyYXdTdHlsZSA9IG5ld1N0eWxlO1xuXHRcdH1cblx0fSxcblxuXHRfcmdiSW1hZ2VEYXRhOiBmdW5jdGlvbiAoeCwgeSwgdngsIHZ5LCB3aWR0aCwgaGVpZ2h0LCBhcnIsIG9mZnNldCkge1xuXHRcdHZhciBpbWcgPSB0aGlzLl9kcmF3Q3R4LmNyZWF0ZUltYWdlRGF0YSh3aWR0aCwgaGVpZ2h0KTtcblx0XHR2YXIgZGF0YSA9IGltZy5kYXRhO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGogPSBvZmZzZXQ7IGkgPCB3aWR0aCAqIGhlaWdodCAqIDQ7IGkgKz0gNCwgaiArPSAzKSB7XG5cdFx0XHRkYXRhW2ldICAgICA9IGFycltqXTtcblx0XHRcdGRhdGFbaSArIDFdID0gYXJyW2ogKyAxXTtcblx0XHRcdGRhdGFbaSArIDJdID0gYXJyW2ogKyAyXTtcblx0XHRcdGRhdGFbaSArIDNdID0gMjU1OyAgLy8gQWxwaGFcblx0XHR9XG5cdFx0dGhpcy5fZHJhd0N0eC5wdXRJbWFnZURhdGEoaW1nLCB4IC0gdngsIHkgLSB2eSk7XG5cdH0sXG5cblx0X2JncnhJbWFnZURhdGE6IGZ1bmN0aW9uICh4LCB5LCB2eCwgdnksIHdpZHRoLCBoZWlnaHQsIGFyciwgb2Zmc2V0KSB7XG5cdFx0dmFyIGltZyA9IHRoaXMuX2RyYXdDdHguY3JlYXRlSW1hZ2VEYXRhKHdpZHRoLCBoZWlnaHQpO1xuXHRcdHZhciBkYXRhID0gaW1nLmRhdGE7XG5cdFx0Zm9yICh2YXIgaSA9IDAsIGogPSBvZmZzZXQ7IGkgPCB3aWR0aCAqIGhlaWdodCAqIDQ7IGkgKz0gNCwgaiArPSA0KSB7XG5cdFx0XHRkYXRhW2ldICAgICA9IGFycltqICsgMl07XG5cdFx0XHRkYXRhW2kgKyAxXSA9IGFycltqICsgMV07XG5cdFx0XHRkYXRhW2kgKyAyXSA9IGFycltqXTtcblx0XHRcdGRhdGFbaSArIDNdID0gMjU1OyAgLy8gQWxwaGFcblx0XHR9XG5cdFx0dGhpcy5fZHJhd0N0eC5wdXRJbWFnZURhdGEoaW1nLCB4IC0gdngsIHkgLSB2eSk7XG5cdH0sXG5cblx0X2NtYXBJbWFnZURhdGE6IGZ1bmN0aW9uICh4LCB5LCB2eCwgdnksIHdpZHRoLCBoZWlnaHQsIGFyciwgb2Zmc2V0KSB7XG5cdFx0dmFyIGltZyA9IHRoaXMuX2RyYXdDdHguY3JlYXRlSW1hZ2VEYXRhKHdpZHRoLCBoZWlnaHQpO1xuXHRcdHZhciBkYXRhID0gaW1nLmRhdGE7XG5cdFx0dmFyIGNtYXAgPSB0aGlzLl9jb2xvdXJNYXA7XG5cdFx0Zm9yICh2YXIgaSA9IDAsIGogPSBvZmZzZXQ7IGkgPCB3aWR0aCAqIGhlaWdodCAqIDQ7IGkgKz0gNCwgaisrKSB7XG5cdFx0XHR2YXIgYmdyID0gY21hcFthcnJbal1dO1xuXHRcdFx0ZGF0YVtpXSAgICAgPSBiZ3JbMl07XG5cdFx0XHRkYXRhW2kgKyAxXSA9IGJnclsxXTtcblx0XHRcdGRhdGFbaSArIDJdID0gYmdyWzBdO1xuXHRcdFx0ZGF0YVtpICsgM10gPSAyNTU7ICAvLyBBbHBoYVxuXHRcdH1cblx0XHR0aGlzLl9kcmF3Q3R4LnB1dEltYWdlRGF0YShpbWcsIHggLSB2eCwgeSAtIHZ5KTtcblx0fSxcblxuXHRfc2Nhbl9yZW5kZXJROiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHJlYWR5ID0gdHJ1ZTtcblx0XHR3aGlsZSAocmVhZHkgJiYgdGhpcy5fcmVuZGVyUS5sZW5ndGggPiAwKSB7XG5cdFx0XHR2YXIgYSA9IHRoaXMuX3JlbmRlclFbMF07XG5cdFx0XHRzd2l0Y2ggKGEudHlwZSkge1xuXHRcdFx0XHRjYXNlICdjb3B5Jzpcblx0XHRcdFx0XHR0aGlzLmNvcHlJbWFnZShhLm9sZF94LCBhLm9sZF95LCBhLngsIGEueSwgYS53aWR0aCwgYS5oZWlnaHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdmaWxsJzpcblx0XHRcdFx0XHR0aGlzLmZpbGxSZWN0KGEueCwgYS55LCBhLndpZHRoLCBhLmhlaWdodCwgYS5jb2xvcik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2JsaXQnOlxuXHRcdFx0XHRcdHRoaXMuYmxpdEltYWdlKGEueCwgYS55LCBhLndpZHRoLCBhLmhlaWdodCwgYS5kYXRhLCAwKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnYmxpdFJnYic6XG5cdFx0XHRcdFx0dGhpcy5ibGl0UmdiSW1hZ2UoYS54LCBhLnksIGEud2lkdGgsIGEuaGVpZ2h0LCBhLmRhdGEsIDApO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdpbWcnOlxuXHRcdFx0XHRcdGlmIChhLmltZy5jb21wbGV0ZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5kcmF3SW1hZ2UoYS5pbWcsIGEueCwgYS55KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly8gV2UgbmVlZCB0byB3YWl0IGZvciB0aGlzIGltYWdlIHRvICdsb2FkJ1xuXHRcdFx0XHRcdFx0Ly8gdG8ga2VlcCB0aGluZ3MgaW4tb3JkZXJcblx0XHRcdFx0XHRcdHJlYWR5ID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocmVhZHkpIHtcblx0XHRcdFx0dGhpcy5fcmVuZGVyUS5zaGlmdCgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9yZW5kZXJRLmxlbmd0aCA+IDApIHtcblx0XHRcdFV0aWwucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3NjYW5fcmVuZGVyUS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdH0sXG59O1xuXG5cblV0aWwubWFrZV9wcm9wZXJ0aWVzKERpc3BsYXksIFtcblx0Wyd0YXJnZXQnLCAnd28nLCAnZG9tJ10sICAgICAgIC8vIENhbnZhcyBlbGVtZW50IGZvciByZW5kZXJpbmdcblx0Wydjb250ZXh0JywgJ3JvJywgJ3JhdyddLCAgICAgIC8vIENhbnZhcyAyRCBjb250ZXh0IGZvciByZW5kZXJpbmcgKHJlYWQtb25seSlcblx0Wydsb2dvJywgJ3J3JywgJ3JhdyddLCAgICAgICAgIC8vIExvZ28gdG8gZGlzcGxheSB3aGVuIGNsZWFyZWQ6IHsnd2lkdGgnOiB3LCAnaGVpZ2h0JzogaCwgJ2RhdGEnOiBkYXRhfVxuXHRbJ3RydWVfY29sb3InLCAncncnLCAnYm9vbCddLCAgLy8gVXNlIHRydWUtY29sb3IgcGl4ZWwgZGF0YVxuXHRbJ2NvbG91ck1hcCcsICdydycsICdhcnInXSwgICAgLy8gQ29sb3VyIG1hcCBhcnJheSAod2hlbiBub3QgdHJ1ZS1jb2xvcilcblx0WydzY2FsZScsICdydycsICdmbG9hdCddLCAgICAgIC8vIERpc3BsYXkgYXJlYSBzY2FsZSBmYWN0b3IgMC4wIC0gMS4wXG5cdFsndmlld3BvcnQnLCAncncnLCAnYm9vbCddLCAgICAvLyBVc2Ugdmlld3BvcnQgY2xpcHBpbmdcblx0Wyd3aWR0aCcsICdydycsICdpbnQnXSwgICAgICAgIC8vIERpc3BsYXkgYXJlYSB3aWR0aFxuXHRbJ2hlaWdodCcsICdydycsICdpbnQnXSwgICAgICAgLy8gRGlzcGxheSBhcmVhIGhlaWdodFxuXHRbJ21heFdpZHRoJywgJ3J3JywgJ2ludCddLCAgICAgLy8gVmlld3BvcnQgbWF4IHdpZHRoICgwIGlmIGRpc2FibGVkKVxuXHRbJ21heEhlaWdodCcsICdydycsICdpbnQnXSwgICAgLy8gVmlld3BvcnQgbWF4IGhlaWdodCAoMCBpZiBkaXNhYmxlZClcblxuXHRbJ3JlbmRlcl9tb2RlJywgJ3JvJywgJ3N0ciddLCAgLy8gQ2FudmFzIHJlbmRlcmluZyBtb2RlIChyZWFkLW9ubHkpXG5cblx0WydwcmVmZXJfanMnLCAncncnLCAnc3RyJ10sICAgIC8vIFByZWZlciBKYXZhc2NyaXB0IG92ZXIgY2FudmFzIG1ldGhvZHNcblx0WydjdXJzb3JfdXJpJywgJ3J3JywgJ3JhdyddICAgIC8vIENhbiB3ZSByZW5kZXIgY3Vyc29yIHVzaW5nIGRhdGEgVVJJXG5dKTtcblxuXG4vLyBDbGFzcyBNZXRob2RzXG5EaXNwbGF5LmNoYW5nZUN1cnNvciA9IGZ1bmN0aW9uICh0YXJnZXQsIHBpeGVscywgbWFzaywgaG90eCwgaG90eSwgdzAsIGgwLCBjbWFwKSB7XG5cdHZhciB3ID0gdzA7XG5cdHZhciBoID0gaDA7XG5cdGlmIChoIDwgdykge1xuXHRcdGggPSB3OyAgLy8gaW5jcmVhc2UgaCB0byBtYWtlIGl0IHNxdWFyZVxuXHR9IGVsc2Uge1xuXHRcdHcgPSBoOyAgLy8gaW5jcmVhc2UgdyB0byBtYWtlIGl0IHNxdWFyZVxuXHR9XG5cblx0dmFyIGN1ciA9IFtdO1xuXG5cdC8vIFB1c2ggbXVsdGktYnl0ZSBsaXR0bGUtZW5kaWFuIHZhbHVlc1xuXHRjdXIucHVzaDE2bGUgPSBmdW5jdGlvbiAobnVtKSB7XG5cdFx0dGhpcy5wdXNoKG51bSAmIDB4RkYsIChudW0gPj4gOCkgJiAweEZGKTtcblx0fTtcblx0Y3VyLnB1c2gzMmxlID0gZnVuY3Rpb24gKG51bSkge1xuXHRcdHRoaXMucHVzaChudW0gJiAweEZGLFxuXHRcdFx0XHRcdChudW0gPj4gOCkgJiAweEZGLFxuXHRcdFx0XHRcdChudW0gPj4gMTYpICYgMHhGRixcblx0XHRcdFx0XHQobnVtID4+IDI0KSAmIDB4RkYpO1xuXHR9O1xuXG5cdHZhciBJSERSc3ogPSA0MDtcblx0dmFyIFJHQnN6ID0gdyAqIGggKiA0O1xuXHR2YXIgWE9Sc3ogPSBNYXRoLmNlaWwoKHcgKiBoKSAvIDguMCk7XG5cdHZhciBBTkRzeiA9IE1hdGguY2VpbCgodyAqIGgpIC8gOC4wKTtcblxuXHRjdXIucHVzaDE2bGUoMCk7ICAgICAgICAvLyAwOiBSZXNlcnZlZFxuXHRjdXIucHVzaDE2bGUoMik7ICAgICAgICAvLyAyOiAuQ1VSIHR5cGVcblx0Y3VyLnB1c2gxNmxlKDEpOyAgICAgICAgLy8gNDogTnVtYmVyIG9mIGltYWdlcywgMSBmb3Igbm9uLWFuaW1hdGVkIGljb1xuXG5cdC8vIEN1cnNvciAjMSBoZWFkZXIgKElDT05ESVJFTlRSWSlcblx0Y3VyLnB1c2godyk7ICAgICAgICAgICAgLy8gNjogd2lkdGhcblx0Y3VyLnB1c2goaCk7ICAgICAgICAgICAgLy8gNzogaGVpZ2h0XG5cdGN1ci5wdXNoKDApOyAgICAgICAgICAgIC8vIDg6IGNvbG9ycywgMCAtPiB0cnVlLWNvbG9yXG5cdGN1ci5wdXNoKDApOyAgICAgICAgICAgIC8vIDk6IHJlc2VydmVkXG5cdGN1ci5wdXNoMTZsZShob3R4KTsgICAgIC8vIDEwOiBob3RzcG90IHggY29vcmRpbmF0ZVxuXHRjdXIucHVzaDE2bGUoaG90eSk7ICAgICAvLyAxMjogaG90c3BvdCB5IGNvb3JkaW5hdGVcblx0Y3VyLnB1c2gzMmxlKElIRFJzeiArIFJHQnN6ICsgWE9Sc3ogKyBBTkRzeik7XG5cdFx0XHRcdFx0XHRcdC8vIDE0OiBjdXJzb3IgZGF0YSBieXRlIHNpemVcblx0Y3VyLnB1c2gzMmxlKDIyKTsgICAgICAgLy8gMTg6IG9mZnNldCBvZiBjdXJzb3IgZGF0YSBpbiB0aGUgZmlsZVxuXG5cdC8vIEN1cnNvciAjMSBJbmZvSGVhZGVyIChJQ09OSU1BR0UvQklUTUFQSU5GTylcblx0Y3VyLnB1c2gzMmxlKElIRFJzeik7ICAgLy8gMjI6IEluZm9IZWFkZXIgc2l6ZVxuXHRjdXIucHVzaDMybGUodyk7ICAgICAgICAvLyAyNjogQ3Vyc29yIHdpZHRoXG5cdGN1ci5wdXNoMzJsZShoICogMik7ICAgIC8vIDMwOiBYT1IrQU5EIGhlaWdodFxuXHRjdXIucHVzaDE2bGUoMSk7ICAgICAgICAvLyAzNDogbnVtYmVyIG9mIHBsYW5lc1xuXHRjdXIucHVzaDE2bGUoMzIpOyAgICAgICAvLyAzNjogYml0cyBwZXIgcGl4ZWxcblx0Y3VyLnB1c2gzMmxlKDApOyAgICAgICAgLy8gMzg6IFR5cGUgb2YgY29tcHJlc3Npb25cblxuXHRjdXIucHVzaDMybGUoWE9Sc3ogKyBBTkRzeik7XG5cdFx0XHRcdFx0XHRcdC8vIDQyOiBTaXplIG9mIEltYWdlXG5cdGN1ci5wdXNoMzJsZSgwKTsgICAgICAgIC8vIDQ2OiByZXNlcnZlZFxuXHRjdXIucHVzaDMybGUoMCk7ICAgICAgICAvLyA1MDogcmVzZXJ2ZWRcblx0Y3VyLnB1c2gzMmxlKDApOyAgICAgICAgLy8gNTQ6IHJlc2VydmVkXG5cdGN1ci5wdXNoMzJsZSgwKTsgICAgICAgIC8vIDU4OiByZXNlcnZlZFxuXG5cdC8vIDYyOiBjb2xvciBkYXRhIChSR0JRVUFEIGljQ29sb3JzW10pXG5cdHZhciB5LCB4O1xuXHRmb3IgKHkgPSBoIC0gMTsgeSA+PSAwOyB5LS0pIHtcblx0XHRmb3IgKHggPSAwOyB4IDwgdzsgeCsrKSB7XG5cdFx0XHRpZiAoeCA+PSB3MCB8fCB5ID49IGgwKSB7XG5cdFx0XHRcdGN1ci5wdXNoKDApOyAgLy8gYmx1ZVxuXHRcdFx0XHRjdXIucHVzaCgwKTsgIC8vIGdyZWVuXG5cdFx0XHRcdGN1ci5wdXNoKDApOyAgLy8gcmVkXG5cdFx0XHRcdGN1ci5wdXNoKDApOyAgLy8gYWxwaGFcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhciBpZHggPSB5ICogTWF0aC5jZWlsKHcwIC8gOCkgKyBNYXRoLmZsb29yKHggLyA4KTtcblx0XHRcdFx0dmFyIGFscGhhID0gKG1hc2tbaWR4XSA8PCAoeCAlIDgpKSAmIDB4ODAgPyAyNTUgOiAwO1xuXHRcdFx0XHRpZiAoY21hcCkge1xuXHRcdFx0XHRcdGlkeCA9ICh3MCAqIHkpICsgeDtcblx0XHRcdFx0XHR2YXIgcmdiID0gY21hcFtwaXhlbHNbaWR4XV07XG5cdFx0XHRcdFx0Y3VyLnB1c2gocmdiWzJdKTsgIC8vIGJsdWVcblx0XHRcdFx0XHRjdXIucHVzaChyZ2JbMV0pOyAgLy8gZ3JlZW5cblx0XHRcdFx0XHRjdXIucHVzaChyZ2JbMF0pOyAgLy8gcmVkXG5cdFx0XHRcdFx0Y3VyLnB1c2goYWxwaGEpOyAgIC8vIGFscGhhXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWR4ID0gKCh3MCAqIHkpICsgeCkgKiA0O1xuXHRcdFx0XHRcdGN1ci5wdXNoKHBpeGVsc1tpZHggKyAyXSk7IC8vIGJsdWVcblx0XHRcdFx0XHRjdXIucHVzaChwaXhlbHNbaWR4ICsgMV0pOyAvLyBncmVlblxuXHRcdFx0XHRcdGN1ci5wdXNoKHBpeGVsc1tpZHhdKTsgICAgIC8vIHJlZFxuXHRcdFx0XHRcdGN1ci5wdXNoKGFscGhhKTsgICAgICAgICAgIC8vIGFscGhhXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBYT1IvYml0bWFzayBkYXRhIChCWVRFIGljWE9SW10pXG5cdC8vIChpZ25vcmVkLCBqdXN0IG5lZWRzIHRvIGJlIHRoZSByaWdodCBzaXplKVxuXHRmb3IgKHkgPSAwOyB5IDwgaDsgeSsrKSB7XG5cdFx0Zm9yICh4ID0gMDsgeCA8IE1hdGguY2VpbCh3IC8gOCk7IHgrKykge1xuXHRcdFx0Y3VyLnB1c2goMCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gQU5EL2JpdG1hc2sgZGF0YSAoQllURSBpY0FORFtdKVxuXHQvLyAoaWdub3JlZCwganVzdCBuZWVkcyB0byBiZSB0aGUgcmlnaHQgc2l6ZSlcblx0Zm9yICh5ID0gMDsgeSA8IGg7IHkrKykge1xuXHRcdGZvciAoeCA9IDA7IHggPCBNYXRoLmNlaWwodyAvIDgpOyB4KyspIHtcblx0XHRcdGN1ci5wdXNoKDApO1xuXHRcdH1cblx0fVxuXG5cdHZhciB1cmwgPSAnZGF0YTppbWFnZS94LWljb247YmFzZTY0LCcgKyBCYXNlNjQuZW5jb2RlKGN1cik7XG5cdHRhcmdldC5zdHlsZS5jdXJzb3IgPSAndXJsKCcgKyB1cmwgKyAnKScgKyBob3R4ICsgJyAnICsgaG90eSArICcsIGRlZmF1bHQnO1xufTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbi8qXG4gKiBub1ZOQzogSFRNTDUgVk5DIGNsaWVudFxuICogQ29weXJpZ2h0IChDKSAyMDEyIEpvZWwgTWFydGluXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTMgU2FtdWVsIE1hbm5laGVkIGZvciBDZW5kaW8gQUJcbiAqIExpY2Vuc2VkIHVuZGVyIE1QTCAyLjAgb3IgYW55IGxhdGVyIHZlcnNpb24gKHNlZSBMSUNFTlNFLnR4dClcbiAqL1xuXG5cbi8qKlxuICogRXhwb3NlIHRoZSBJbnB1dCBPYmplY3QuXG4gKi9cbnZhciBJbnB1dCA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cblxuLyoqXG4gKiBEZXBlbmRlbmNpZXMuXG4gKi9cbnZhciBkZWJ1Z2tleWJvYXJkID0gcmVxdWlyZSgnZGVidWcnKSgnbm9WTkM6SW5wdXQ6S2V5Ym9yZCcpO1xudmFyIGRlYnVnbW91c2UgPSByZXF1aXJlKCdkZWJ1ZycpKCdub1ZOQzpJbnB1dDpNb3VzZScpO1xudmFyIGJyb3dzZXIgPSByZXF1aXJlKCdib3dzZXInKS5icm93c2VyO1xudmFyIFV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBrYmRVdGlsID0gcmVxdWlyZSgnLi9rYmR1dGlsJyk7XG5cblxuZnVuY3Rpb24gS2V5Ym9hcmQgKGRlZmF1bHRzKSB7XG5cdHRoaXMuX2tleURvd25MaXN0ID0gW107ICAvLyBMaXN0IG9mIGRlcHJlc3NlZCBrZXlzXG5cdFx0XHRcdFx0XHRcdFx0XHQgICAgICAgICAvLyAoZXZlbiBpZiB0aGV5IGFyZSBoYXBweSlcblxuXHRVdGlsLnNldF9kZWZhdWx0cyh0aGlzLCBkZWZhdWx0cywge1xuXHRcdCd0YXJnZXQnOiBkb2N1bWVudCxcblx0XHQnZm9jdXNlZCc6IHRydWVcblx0fSk7XG5cblx0Ly8gY3JlYXRlIHRoZSBrZXlib2FyZCBoYW5kbGVyXG5cdHRoaXMuX2hhbmRsZXIgPSBuZXcga2JkVXRpbC5LZXlFdmVudERlY29kZXIoa2JkVXRpbC5Nb2RpZmllclN5bmMoKSxcblx0XHRrYmRVdGlsLlZlcmlmeUNoYXJNb2RpZmllcihcblx0XHRcdGtiZFV0aWwuVHJhY2tLZXlTdGF0ZShcblx0XHRcdFx0a2JkVXRpbC5Fc2NhcGVNb2RpZmllcnModGhpcy5faGFuZGxlUmZiRXZlbnQuYmluZCh0aGlzKSlcblx0XHRcdClcblx0XHQpXG5cdCk7IC8qIGpzaGludCBuZXdjYXA6IHRydWUgKi9cblxuXHQvLyBrZWVwIHRoZXNlIGhlcmUgc28gd2UgY2FuIHJlZmVyIHRvIHRoZW0gbGF0ZXJcblx0dGhpcy5fZXZlbnRIYW5kbGVycyA9IHtcblx0XHQna2V5dXAnOiB0aGlzLl9oYW5kbGVLZXlVcC5iaW5kKHRoaXMpLFxuXHRcdCdrZXlkb3duJzogdGhpcy5faGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpLFxuXHRcdCdrZXlwcmVzcyc6IHRoaXMuX2hhbmRsZUtleVByZXNzLmJpbmQodGhpcyksXG5cdFx0J2JsdXInOiB0aGlzLl9hbGxLZXlzVXAuYmluZCh0aGlzKVxuXHR9O1xufVxuXG5cbktleWJvYXJkLnByb3RvdHlwZSA9IHtcblx0X2hhbmRsZVJmYkV2ZW50OiBmdW5jdGlvbiAoZSkge1xuXHRcdGlmICh0aGlzLl9vbktleVByZXNzKSB7XG5cdFx0XHRkZWJ1Z2tleWJvYXJkKCdvbktleVByZXNzOiAnICsgKGUudHlwZSA9PT0gJ2tleWRvd24nID8gJ2Rvd24nIDogJ3VwJykgK1xuXHRcdFx0XHRcdCAgICcsIGtleXN5bTogJyArIGUua2V5c3ltLmtleXN5bSArICcoJyArIGUua2V5c3ltLmtleW5hbWUgKyAnKScpO1xuXHRcdFx0dGhpcy5fb25LZXlQcmVzcyhlLmtleXN5bS5rZXlzeW0sIGUudHlwZSA9PT0gJ2tleWRvd24nKTtcblx0XHR9XG5cdH0sXG5cblx0X2hhbmRsZUtleURvd246IGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKCF0aGlzLl9mb2N1c2VkKSB7IHJldHVybiB0cnVlOyB9XG5cblx0XHRpZiAodGhpcy5faGFuZGxlci5rZXlkb3duKGUpKSB7XG5cdFx0XHQvLyBTdXBwcmVzcyBidWJibGluZy9kZWZhdWx0IGFjdGlvbnNcblx0XHRcdFV0aWwuc3RvcEV2ZW50KGUpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBBbGxvdyB0aGUgZXZlbnQgdG8gYnViYmxlIGFuZCBiZWNvbWUgYSBrZXlQcmVzcyBldmVudCB3aGljaFxuXHRcdFx0Ly8gd2lsbCBoYXZlIHRoZSBjaGFyYWN0ZXIgY29kZSB0cmFuc2xhdGVkXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdH0sXG5cblx0X2hhbmRsZUtleVByZXNzOiBmdW5jdGlvbiAoZSkge1xuXHRcdGlmICghdGhpcy5fZm9jdXNlZCkgeyByZXR1cm4gdHJ1ZTsgfVxuXG5cdFx0aWYgKHRoaXMuX2hhbmRsZXIua2V5cHJlc3MoZSkpIHtcblx0XHRcdC8vIFN1cHByZXNzIGJ1YmJsaW5nL2RlZmF1bHQgYWN0aW9uc1xuXHRcdFx0VXRpbC5zdG9wRXZlbnQoZSk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEFsbG93IHRoZSBldmVudCB0byBidWJibGUgYW5kIGJlY29tZSBhIGtleVByZXNzIGV2ZW50IHdoaWNoXG5cdFx0XHQvLyB3aWxsIGhhdmUgdGhlIGNoYXJhY3RlciBjb2RlIHRyYW5zbGF0ZWRcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fSxcblxuXHRfaGFuZGxlS2V5VXA6IGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKCF0aGlzLl9mb2N1c2VkKSB7IHJldHVybiB0cnVlOyB9XG5cblx0XHRpZiAodGhpcy5faGFuZGxlci5rZXl1cChlKSkge1xuXHRcdFx0Ly8gU3VwcHJlc3MgYnViYmxpbmcvZGVmYXVsdCBhY3Rpb25zXG5cdFx0XHRVdGlsLnN0b3BFdmVudChlKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gQWxsb3cgdGhlIGV2ZW50IHRvIGJ1YmJsZSBhbmQgYmVjb21lIGEga2V5VXAgZXZlbnQgd2hpY2hcblx0XHRcdC8vIHdpbGwgaGF2ZSB0aGUgY2hhcmFjdGVyIGNvZGUgdHJhbnNsYXRlZFxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9LFxuXG5cdF9hbGxLZXlzVXA6IGZ1bmN0aW9uICgpIHtcblx0XHRkZWJ1Z2tleWJvYXJkKCdhbGxLZXlzVXAnKTtcblx0XHR0aGlzLl9oYW5kbGVyLnJlbGVhc2VBbGwoKTtcblx0fSxcblxuXHQvLyBQdWJsaWMgbWV0aG9kc1xuXG5cdGdyYWI6IGZ1bmN0aW9uICgpIHtcblx0XHRkZWJ1Z2tleWJvYXJkKCdncmFiKCknKTtcblxuXHRcdHZhciBjID0gdGhpcy5fdGFyZ2V0O1xuXG5cdFx0VXRpbC5hZGRFdmVudChjLCAna2V5ZG93bicsIHRoaXMuX2V2ZW50SGFuZGxlcnMua2V5ZG93bik7XG5cdFx0VXRpbC5hZGRFdmVudChjLCAna2V5dXAnLCB0aGlzLl9ldmVudEhhbmRsZXJzLmtleXVwKTtcblx0XHRVdGlsLmFkZEV2ZW50KGMsICdrZXlwcmVzcycsIHRoaXMuX2V2ZW50SGFuZGxlcnMua2V5cHJlc3MpO1xuXG5cdFx0Ly8gUmVsZWFzZSAoa2V5IHVwKSBpZiBnbG9iYWwgbG9zZXMgZm9jdXNcblx0XHRVdGlsLmFkZEV2ZW50KGdsb2JhbCwgJ2JsdXInLCB0aGlzLl9ldmVudEhhbmRsZXJzLmJsdXIpO1xuXHR9LFxuXG5cdHVuZ3JhYjogZnVuY3Rpb24gKCkge1xuXHRcdGRlYnVna2V5Ym9hcmQoJ3VuZ3JhYigpJyk7XG5cblx0XHR2YXIgYyA9IHRoaXMuX3RhcmdldDtcblxuXHRcdFV0aWwucmVtb3ZlRXZlbnQoYywgJ2tleWRvd24nLCB0aGlzLl9ldmVudEhhbmRsZXJzLmtleWRvd24pO1xuXHRcdFV0aWwucmVtb3ZlRXZlbnQoYywgJ2tleXVwJywgdGhpcy5fZXZlbnRIYW5kbGVycy5rZXl1cCk7XG5cdFx0VXRpbC5yZW1vdmVFdmVudChjLCAna2V5cHJlc3MnLCB0aGlzLl9ldmVudEhhbmRsZXJzLmtleXByZXNzKTtcblx0XHRVdGlsLnJlbW92ZUV2ZW50KGdsb2JhbCwgJ2JsdXInLCB0aGlzLl9ldmVudEhhbmRsZXJzLmJsdXIpO1xuXG5cdFx0Ly8gUmVsZWFzZSAoa2V5IHVwKSBhbGwga2V5cyB0aGF0IGFyZSBpbiBhIGRvd24gc3RhdGVcblx0XHR0aGlzLl9hbGxLZXlzVXAoKTtcblx0fSxcblxuXHRzeW5jOiBmdW5jdGlvbiAoZSkge1xuXHRcdHRoaXMuX2hhbmRsZXIuc3luY01vZGlmaWVycyhlKTtcblx0fVxufTtcblxuXG5VdGlsLm1ha2VfcHJvcGVydGllcyhLZXlib2FyZCwgW1xuXHRbJ3RhcmdldCcsICAgICAnd28nLCAnZG9tJ10sICAvLyBET00gZWxlbWVudCB0aGF0IGNhcHR1cmVzIGtleWJvYXJkIGlucHV0XG5cdFsnZm9jdXNlZCcsICAgICdydycsICdib29sJ10sIC8vIENhcHR1cmUgYW5kIHNlbmQga2V5IGV2ZW50c1xuXHRbJ29uS2V5UHJlc3MnLCAncncnLCAnZnVuYyddIC8vIEhhbmRsZXIgZm9yIGtleSBwcmVzcy9yZWxlYXNlXG5dKTtcblxuXG5mdW5jdGlvbiBNb3VzZSAoZGVmYXVsdHMpIHtcblx0dGhpcy5fbW91c2VDYXB0dXJlZCAgPSBmYWxzZTtcblxuXHR0aGlzLl9kb3VibGVDbGlja1RpbWVyID0gbnVsbDtcblx0dGhpcy5fbGFzdFRvdWNoUG9zID0gbnVsbDtcblxuXHQvLyBDb25maWd1cmF0aW9uIGF0dHJpYnV0ZXNcblx0VXRpbC5zZXRfZGVmYXVsdHModGhpcywgZGVmYXVsdHMsIHtcblx0XHQndGFyZ2V0JzogZG9jdW1lbnQsXG5cdFx0J2ZvY3VzZWQnOiB0cnVlLFxuXHRcdCdzY2FsZSc6IDEuMCxcblx0XHQnem9vbSc6IDEuMCxcblx0XHQndG91Y2hCdXR0b24nOiAxXG5cdH0pO1xuXG5cdHRoaXMuX2V2ZW50SGFuZGxlcnMgPSB7XG5cdFx0J21vdXNlZG93bic6IHRoaXMuX2hhbmRsZU1vdXNlRG93bi5iaW5kKHRoaXMpLFxuXHRcdCdtb3VzZXVwJzogdGhpcy5faGFuZGxlTW91c2VVcC5iaW5kKHRoaXMpLFxuXHRcdCdtb3VzZW1vdmUnOiB0aGlzLl9oYW5kbGVNb3VzZU1vdmUuYmluZCh0aGlzKSxcblx0XHQnbW91c2V3aGVlbCc6IHRoaXMuX2hhbmRsZU1vdXNlV2hlZWwuYmluZCh0aGlzKSxcblx0XHQnbW91c2VkaXNhYmxlJzogdGhpcy5faGFuZGxlTW91c2VEaXNhYmxlLmJpbmQodGhpcylcblx0fTtcbn1cblxuXG5Nb3VzZS5wcm90b3R5cGUgPSB7XG5cdF9jYXB0dXJlTW91c2U6IGZ1bmN0aW9uICgpIHtcblx0XHQvLyBjYXB0dXJpbmcgdGhlIG1vdXNlIGVuc3VyZXMgd2UgZ2V0IHRoZSBtb3VzZXVwIGV2ZW50XG5cdFx0aWYgKHRoaXMuX3RhcmdldC5zZXRDYXB0dXJlKSB7XG5cdFx0XHR0aGlzLl90YXJnZXQuc2V0Q2FwdHVyZSgpO1xuXHRcdH1cblxuXHRcdC8vIHNvbWUgYnJvd3NlcnMgZ2l2ZSB1cyBtb3VzZXVwIGV2ZW50cyByZWdhcmRsZXNzLFxuXHRcdC8vIHNvIGlmIHdlIG5ldmVyIGNhcHR1cmVkIHRoZSBtb3VzZSwgd2UgY2FuIGRpc3JlZ2FyZCB0aGUgZXZlbnRcblx0XHR0aGlzLl9tb3VzZUNhcHR1cmVkID0gdHJ1ZTtcblx0fSxcblxuXHRfcmVsZWFzZU1vdXNlOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX3RhcmdldC5yZWxlYXNlQ2FwdHVyZSkge1xuXHRcdFx0dGhpcy5fdGFyZ2V0LnJlbGVhc2VDYXB0dXJlKCk7XG5cdFx0fVxuXHRcdHRoaXMuX21vdXNlQ2FwdHVyZWQgPSBmYWxzZTtcblx0fSxcblxuXHRfcmVzZXREb3VibGVDbGlja1RpbWVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fZG91YmxlQ2xpY2tUaW1lciA9IG51bGw7XG5cdH0sXG5cblx0X2hhbmRsZU1vdXNlQnV0dG9uOiBmdW5jdGlvbiAoZSwgZG93bikge1xuXHRcdGlmICghdGhpcy5fZm9jdXNlZCkgeyByZXR1cm4gdHJ1ZTsgfVxuXG5cdFx0aWYgKHRoaXMuX25vdGlmeSkge1xuXHRcdFx0dGhpcy5fbm90aWZ5KGUpO1xuXHRcdH1cblxuXHRcdHZhciBldnQgPSAoZSA/IGUgOiBnbG9iYWwuZXZlbnQpO1xuXHRcdHZhciBwb3MgPSBVdGlsLmdldEV2ZW50UG9zaXRpb24oZSwgdGhpcy5fdGFyZ2V0LCB0aGlzLl9zY2FsZSwgdGhpcy5fem9vbSk7XG5cblx0XHR2YXIgYm1hc2s7XG5cdFx0aWYgKGUudG91Y2hlcyB8fCBlLmNoYW5nZWRUb3VjaGVzKSB7XG5cdFx0XHQvLyBUb3VjaCBkZXZpY2VcblxuXHRcdFx0Ly8gV2hlbiB0d28gdG91Y2hlcyBvY2N1ciB3aXRoaW4gNTAwIG1zIG9mIGVhY2ggb3RoZXIgYW5kIGFyZVxuXHRcdFx0Ly8gY2xvc2VyIHRoYW4gMjAgcGl4ZWxzIHRvZ2V0aGVyIGEgZG91YmxlIGNsaWNrIGlzIHRyaWdnZXJlZC5cblx0XHRcdGlmIChkb3duID09PSAxKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9kb3VibGVDbGlja1RpbWVyID09PSBudWxsKSB7XG5cdFx0XHRcdFx0dGhpcy5fbGFzdFRvdWNoUG9zID0gcG9zO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aGlzLl9kb3VibGVDbGlja1RpbWVyKTtcblxuXHRcdFx0XHRcdC8vIFdoZW4gdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIHR3byB0b3VjaGVzIGlzIHNtYWxsIGVub3VnaFxuXHRcdFx0XHRcdC8vIGZvcmNlIHRoZSBwb3NpdGlvbiBvZiB0aGUgbGF0dGVyIHRvdWNoIHRvIHRoZSBwb3NpdGlvbiBvZlxuXHRcdFx0XHRcdC8vIHRoZSBmaXJzdC5cblxuXHRcdFx0XHRcdHZhciB4cyA9IHRoaXMuX2xhc3RUb3VjaFBvcy54IC0gcG9zLng7XG5cdFx0XHRcdFx0dmFyIHlzID0gdGhpcy5fbGFzdFRvdWNoUG9zLnkgLSBwb3MueTtcblx0XHRcdFx0XHR2YXIgZCA9IE1hdGguc3FydCgoeHMgKiB4cykgKyAoeXMgKiB5cykpO1xuXG5cdFx0XHRcdFx0Ly8gVGhlIGdvYWwgaXMgdG8gdHJpZ2dlciBvbiBhIGNlcnRhaW4gcGh5c2ljYWwgd2lkdGgsIHRoZVxuXHRcdFx0XHRcdC8vIGRldmljZVBpeGVsUmF0aW8gYnJpbmdzIHVzIGEgYml0IGNsb3NlciBidXQgaXMgbm90IG9wdGltYWwuXG5cdFx0XHRcdFx0aWYgKGQgPCAyMCAqIGdsb2JhbC5kZXZpY2VQaXhlbFJhdGlvKSB7XG5cdFx0XHRcdFx0XHRwb3MgPSB0aGlzLl9sYXN0VG91Y2hQb3M7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX2RvdWJsZUNsaWNrVGltZXIgPSBzZXRUaW1lb3V0KHRoaXMuX3Jlc2V0RG91YmxlQ2xpY2tUaW1lci5iaW5kKHRoaXMpLCA1MDApO1xuXHRcdFx0fVxuXHRcdFx0Ym1hc2sgPSB0aGlzLl90b3VjaEJ1dHRvbjtcblx0XHRcdC8vIElmIGJtYXNrIGlzIHNldFxuXHRcdH0gZWxzZSBpZiAoZXZ0LndoaWNoKSB7XG5cdFx0XHQvKiBldmVyeXRoaW5nIGV4Y2VwdCBJRSAqL1xuXHRcdFx0Ym1hc2sgPSAxIDw8IGV2dC5idXR0b247XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8qIElFIGluY2x1ZGluZyA5ICovXG5cdFx0XHRibWFzayA9IChldnQuYnV0dG9uICYgMHgxKSArICAgICAgLy8gTGVmdFxuXHRcdFx0XHRcdChldnQuYnV0dG9uICYgMHgyKSAqIDIgKyAgLy8gUmlnaHRcblx0XHRcdFx0XHQoZXZ0LmJ1dHRvbiAmIDB4NCkgLyAyOyAgIC8vIE1pZGRsZVxuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9vbk1vdXNlQnV0dG9uKSB7XG5cdFx0XHRkZWJ1Z21vdXNlKCdvbk1vdXNlQnV0dG9uOiAnICsgKGRvd24gPyAnZG93bicgOiAndXAnKSArXG5cdFx0XHRcdFx0ICAgJywgeDogJyArIHBvcy54ICsgJywgeTogJyArIHBvcy55ICsgJywgYm1hc2s6ICcgKyBibWFzayk7XG5cdFx0XHR0aGlzLl9vbk1vdXNlQnV0dG9uKHBvcy54LCBwb3MueSwgZG93biwgYm1hc2spO1xuXHRcdH1cblxuXHRcdFV0aWwuc3RvcEV2ZW50KGUpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHRfaGFuZGxlTW91c2VEb3duOiBmdW5jdGlvbiAoZSkge1xuXHRcdHRoaXMuX2NhcHR1cmVNb3VzZSgpO1xuXHRcdHRoaXMuX2hhbmRsZU1vdXNlQnV0dG9uKGUsIDEpO1xuXHR9LFxuXG5cdF9oYW5kbGVNb3VzZVVwOiBmdW5jdGlvbiAoZSkge1xuXHRcdGlmICghdGhpcy5fbW91c2VDYXB0dXJlZCkgeyByZXR1cm47IH1cblxuXHRcdHRoaXMuX2hhbmRsZU1vdXNlQnV0dG9uKGUsIDApO1xuXHRcdHRoaXMuX3JlbGVhc2VNb3VzZSgpO1xuXHR9LFxuXG5cdF9oYW5kbGVNb3VzZVdoZWVsOiBmdW5jdGlvbiAoZSkge1xuXHRcdGlmICghdGhpcy5fZm9jdXNlZCkgeyByZXR1cm4gdHJ1ZTsgfVxuXG5cdFx0aWYgKHRoaXMuX25vdGlmeSkge1xuXHRcdFx0dGhpcy5fbm90aWZ5KGUpO1xuXHRcdH1cblxuXHRcdHZhciBldnQgPSAoZSA/IGUgOiBnbG9iYWwuZXZlbnQpO1xuXHRcdHZhciBwb3MgPSBVdGlsLmdldEV2ZW50UG9zaXRpb24oZSwgdGhpcy5fdGFyZ2V0LCB0aGlzLl9zY2FsZSwgdGhpcy5fem9vbSk7XG5cdFx0dmFyIHdoZWVsRGF0YSA9IGV2dC5kZXRhaWwgPyBldnQuZGV0YWlsICogLTEgOiBldnQud2hlZWxEZWx0YSAvIDQwO1xuXHRcdHZhciBibWFzaztcblx0XHRpZiAod2hlZWxEYXRhID4gMCkge1xuXHRcdFx0Ym1hc2sgPSAxIDw8IDM7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJtYXNrID0gMSA8PCA0O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9vbk1vdXNlQnV0dG9uKSB7XG5cdFx0XHR0aGlzLl9vbk1vdXNlQnV0dG9uKHBvcy54LCBwb3MueSwgMSwgYm1hc2spO1xuXHRcdFx0dGhpcy5fb25Nb3VzZUJ1dHRvbihwb3MueCwgcG9zLnksIDAsIGJtYXNrKTtcblx0XHR9XG5cblx0XHRVdGlsLnN0b3BFdmVudChlKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0X2hhbmRsZU1vdXNlTW92ZTogZnVuY3Rpb24gKGUpIHtcblx0XHRpZiAoIXRoaXMuX2ZvY3VzZWQpIHsgcmV0dXJuIHRydWU7IH1cblxuXHRcdGlmICh0aGlzLl9ub3RpZnkpIHtcblx0XHRcdHRoaXMuX25vdGlmeShlKTtcblx0XHR9XG5cblx0XHR2YXIgcG9zID0gVXRpbC5nZXRFdmVudFBvc2l0aW9uKGUsIHRoaXMuX3RhcmdldCwgdGhpcy5fc2NhbGUsIHRoaXMuX3pvb20pO1xuXHRcdGlmICh0aGlzLl9vbk1vdXNlTW92ZSkge1xuXHRcdFx0dGhpcy5fb25Nb3VzZU1vdmUocG9zLngsIHBvcy55KTtcblx0XHR9XG5cblx0XHRVdGlsLnN0b3BFdmVudChlKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0X2hhbmRsZU1vdXNlRGlzYWJsZTogZnVuY3Rpb24gKGUpIHtcblx0XHRpZiAoIXRoaXMuX2ZvY3VzZWQpIHsgcmV0dXJuIHRydWU7IH1cblxuXHRcdHZhciBwb3MgPSBVdGlsLmdldEV2ZW50UG9zaXRpb24oZSwgdGhpcy5fdGFyZ2V0LCB0aGlzLl9zY2FsZSwgdGhpcy5fem9vbSk7XG5cblx0XHQvKiBTdG9wIHByb3BhZ2F0aW9uIGlmIGluc2lkZSBjYW52YXMgYXJlYSAqL1xuXHRcdGlmICgocG9zLnJlYWx4ID49IDApICYmIChwb3MucmVhbHkgPj0gMCkgJiZcblx0XHRcdChwb3MucmVhbHggPCB0aGlzLl90YXJnZXQub2Zmc2V0V2lkdGgpICYmXG5cdFx0XHQocG9zLnJlYWx5IDwgdGhpcy5fdGFyZ2V0Lm9mZnNldEhlaWdodCkpIHtcblxuXHRcdFx0VXRpbC5zdG9wRXZlbnQoZSk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0Ly8gUHVibGljIG1ldGhvZHNcblxuXHRncmFiOiBmdW5jdGlvbiAoKSB7XG5cdFx0ZGVidWdtb3VzZSgnZ3JhYigpJyk7XG5cblx0XHR2YXIgYyA9IHRoaXMuX3RhcmdldDtcblx0XHR2YXIgaXNUb3VjaCA9ICdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXHRcdGlmIChpc1RvdWNoKSB7XG5cdFx0XHRVdGlsLmFkZEV2ZW50KGMsICd0b3VjaHN0YXJ0JywgdGhpcy5fZXZlbnRIYW5kbGVycy5tb3VzZWRvd24pO1xuXHRcdFx0VXRpbC5hZGRFdmVudChnbG9iYWwsICd0b3VjaGVuZCcsIHRoaXMuX2V2ZW50SGFuZGxlcnMubW91c2V1cCk7XG5cdFx0XHRVdGlsLmFkZEV2ZW50KGMsICd0b3VjaGVuZCcsIHRoaXMuX2V2ZW50SGFuZGxlcnMubW91c2V1cCk7XG5cdFx0XHRVdGlsLmFkZEV2ZW50KGMsICd0b3VjaG1vdmUnLCB0aGlzLl9ldmVudEhhbmRsZXJzLm1vdXNlbW92ZSk7XG5cdFx0fVxuXG5cdFx0aWYgKCFpc1RvdWNoIHx8IHRoaXMuX2VuYWJsZU1vdXNlQW5kVG91Y2gpIHtcblx0XHRcdFV0aWwuYWRkRXZlbnQoYywgJ21vdXNlZG93bicsIHRoaXMuX2V2ZW50SGFuZGxlcnMubW91c2Vkb3duKTtcblx0XHRcdFV0aWwuYWRkRXZlbnQoZ2xvYmFsLCAnbW91c2V1cCcsIHRoaXMuX2V2ZW50SGFuZGxlcnMubW91c2V1cCk7XG5cdFx0XHRVdGlsLmFkZEV2ZW50KGMsICdtb3VzZXVwJywgdGhpcy5fZXZlbnRIYW5kbGVycy5tb3VzZXVwKTtcblx0XHRcdFV0aWwuYWRkRXZlbnQoYywgJ21vdXNlbW92ZScsIHRoaXMuX2V2ZW50SGFuZGxlcnMubW91c2Vtb3ZlKTtcblx0XHRcdFV0aWwuYWRkRXZlbnQoYywgKGJyb3dzZXIuZ2Vja28pID8gJ0RPTU1vdXNlU2Nyb2xsJyA6ICdtb3VzZXdoZWVsJyxcblx0XHRcdFx0XHRcdCAgdGhpcy5fZXZlbnRIYW5kbGVycy5tb3VzZXdoZWVsKTtcblx0XHR9XG5cblx0XHQvKiBXb3JrIGFyb3VuZCByaWdodCBhbmQgbWlkZGxlIGNsaWNrIGJyb3dzZXIgYmVoYXZpb3JzICovXG5cdFx0VXRpbC5hZGRFdmVudChkb2N1bWVudCwgJ2NsaWNrJywgdGhpcy5fZXZlbnRIYW5kbGVycy5tb3VzZWRpc2FibGUpO1xuXHRcdFV0aWwuYWRkRXZlbnQoZG9jdW1lbnQuYm9keSwgJ2NvbnRleHRtZW51JywgdGhpcy5fZXZlbnRIYW5kbGVycy5tb3VzZWRpc2FibGUpO1xuXHR9LFxuXG5cdHVuZ3JhYjogZnVuY3Rpb24gKCkge1xuXHRcdGRlYnVnbW91c2UoJ3VuZ3JhYigpJyk7XG5cblx0XHR2YXIgYyA9IHRoaXMuX3RhcmdldDtcblx0XHR2YXIgaXNUb3VjaCA9ICdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXHRcdGlmIChpc1RvdWNoKSB7XG5cdFx0XHRVdGlsLnJlbW92ZUV2ZW50KGMsICd0b3VjaHN0YXJ0JywgdGhpcy5fZXZlbnRIYW5kbGVycy5tb3VzZWRvd24pO1xuXHRcdFx0VXRpbC5yZW1vdmVFdmVudChnbG9iYWwsICd0b3VjaGVuZCcsIHRoaXMuX2V2ZW50SGFuZGxlcnMubW91c2V1cCk7XG5cdFx0XHRVdGlsLnJlbW92ZUV2ZW50KGMsICd0b3VjaGVuZCcsIHRoaXMuX2V2ZW50SGFuZGxlcnMubW91c2V1cCk7XG5cdFx0XHRVdGlsLnJlbW92ZUV2ZW50KGMsICd0b3VjaG1vdmUnLCB0aGlzLl9ldmVudEhhbmRsZXJzLm1vdXNlbW92ZSk7XG5cdFx0fVxuXG5cdFx0aWYgKCFpc1RvdWNoIHx8IHRoaXMuX2VuYWJsZU1vdXNlQW5kVG91Y2gpIHtcblx0XHRcdFV0aWwucmVtb3ZlRXZlbnQoYywgJ21vdXNlZG93bicsIHRoaXMuX2V2ZW50SGFuZGxlcnMubW91c2Vkb3duKTtcblx0XHRcdFV0aWwucmVtb3ZlRXZlbnQoZ2xvYmFsLCAnbW91c2V1cCcsIHRoaXMuX2V2ZW50SGFuZGxlcnMubW91c2V1cCk7XG5cdFx0XHRVdGlsLnJlbW92ZUV2ZW50KGMsICdtb3VzZXVwJywgdGhpcy5fZXZlbnRIYW5kbGVycy5tb3VzZXVwKTtcblx0XHRcdFV0aWwucmVtb3ZlRXZlbnQoYywgJ21vdXNlbW92ZScsIHRoaXMuX2V2ZW50SGFuZGxlcnMubW91c2Vtb3ZlKTtcblx0XHRcdFV0aWwucmVtb3ZlRXZlbnQoYywgKGJyb3dzZXIuZ2Vja28pID8gJ0RPTU1vdXNlU2Nyb2xsJyA6ICdtb3VzZXdoZWVsJyxcblx0XHRcdFx0XHRcdFx0IHRoaXMuX2V2ZW50SGFuZGxlcnMubW91c2V3aGVlbCk7XG5cdFx0fVxuXG5cdFx0LyogV29yayBhcm91bmQgcmlnaHQgYW5kIG1pZGRsZSBjbGljayBicm93c2VyIGJlaGF2aW9ycyAqL1xuXHRcdFV0aWwucmVtb3ZlRXZlbnQoZG9jdW1lbnQsICdjbGljaycsIHRoaXMuX2V2ZW50SGFuZGxlcnMubW91c2VkaXNhYmxlKTtcblx0XHRVdGlsLnJlbW92ZUV2ZW50KGRvY3VtZW50LmJvZHksICdjb250ZXh0bWVudScsIHRoaXMuX2V2ZW50SGFuZGxlcnMubW91c2VkaXNhYmxlKTtcblxuXHR9XG59O1xuXG5cblV0aWwubWFrZV9wcm9wZXJ0aWVzKE1vdXNlLCBbXG5cdFsndGFyZ2V0JywgICAgICAgICAncm8nLCAnZG9tJ10sICAgLy8gRE9NIGVsZW1lbnQgdGhhdCBjYXB0dXJlcyBtb3VzZSBpbnB1dFxuXHRbJ25vdGlmeScsICAgICAgICAgJ3JvJywgJ2Z1bmMnXSwgIC8vIEZ1bmN0aW9uIHRvIGNhbGwgdG8gbm90aWZ5IHdoZW5ldmVyIGEgbW91c2UgZXZlbnQgaXMgcmVjZWl2ZWRcblx0Wydmb2N1c2VkJywgICAgICAgICdydycsICdib29sJ10sICAvLyBDYXB0dXJlIGFuZCBzZW5kIG1vdXNlIGNsaWNrcy9tb3ZlbWVudFxuXHRbJ3NjYWxlJywgICAgICAgICAgJ3J3JywgJ2Zsb2F0J10sIC8vIFZpZXdwb3J0IHNjYWxlIGZhY3RvciAwLjAgLSAxLjBcblx0Wyd6b29tJywgICAgICAgICAgICdydycsICdmbG9hdCddLCAvLyBDU1Mgem9vbSBhcHBsaWVkIHRvIHRoZSBET00gZWxlbWVudCB0aGF0IGNhcHR1cmVzIG1vdXNlIGlucHV0XG5cdFsnZW5hYmxlTW91c2VBbmRUb3VjaCcsICdydycsICdib29sJ10sICAvLyBXaGV0aGVyIGFsc28gZW5hYmxlIG1vdXNlIGV2ZW50cyB3aGVuIHRvdWNoIHNjcmVlbiBpcyBkZXRlY3RlZFxuXG5cdFsnb25Nb3VzZUJ1dHRvbicsICAncncnLCAnZnVuYyddLCAgLy8gSGFuZGxlciBmb3IgbW91c2UgYnV0dG9uIGNsaWNrL3JlbGVhc2Vcblx0Wydvbk1vdXNlTW92ZScsICAgICdydycsICdmdW5jJ10sICAvLyBIYW5kbGVyIGZvciBtb3VzZSBtb3ZlbWVudFxuXHRbJ3RvdWNoQnV0dG9uJywgICAgJ3J3JywgJ2ludCddICAgIC8vIEJ1dHRvbiBtYXNrICgxLCAyLCA0KSBmb3IgdG91Y2ggZGV2aWNlcyAoMCBtZWFucyBpZ25vcmUgY2xpY2tzKVxuXSk7XG5cblxuLyoqXG4gKiBBZGQgS2V5Ym9hcmQgYW5kIE1vdXNlIGluIHRoZSBleHBvc2VkIE9iamVjdC5cbiAqL1xuSW5wdXQuS2V5Ym9hcmQgPSBLZXlib2FyZDtcbklucHV0Lk1vdXNlID0gTW91c2U7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwiLyoqXG4gKiBEZXBlbmRlbmNpZXMuXG4gKi9cbnZhciBkZWJ1Z2Vycm9yID0gcmVxdWlyZSgnZGVidWcnKSgnbm9WTkM6RVJST1I6S2JkVXRpbCcpO1xuZGVidWdlcnJvci5sb2cgPSBjb25zb2xlLndhcm4uYmluZChjb25zb2xlKTtcbnZhciBLZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG5cblxudmFyIEtiZFV0aWwgPSBtb2R1bGUuZXhwb3J0cyA9IHtcblx0LyoqXG5cdCAqIFJldHVybiB0cnVlIGlmIGEgbW9kaWZpZXIgd2hpY2ggaXMgbm90IHRoZSBzcGVjaWZpZWQgY2hhciBtb2RpZmllciAoYW5kXG5cdCAqIGlzIG5vdCBzaGlmdCkgaXMgZG93bi5cblx0ICovXG5cdGhhc1Nob3J0Y3V0TW9kaWZpZXI6IGZ1bmN0aW9uIChjaGFyTW9kaWZpZXIsIGN1cnJlbnRNb2RpZmllcnMpIHtcblx0XHR2YXIgbW9kcyA9IHt9O1xuXHRcdGZvciAodmFyIGtleSBpbiBjdXJyZW50TW9kaWZpZXJzKSB7XG5cdFx0XHRpZiAocGFyc2VJbnQoa2V5KSAhPT0gS2V5cy5YS19TaGlmdF9MKSB7XG5cdFx0XHRcdG1vZHNba2V5XSA9IGN1cnJlbnRNb2RpZmllcnNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YXIgc3VtID0gMDtcblx0XHRmb3IgKHZhciBrIGluIGN1cnJlbnRNb2RpZmllcnMpIHtcblx0XHRcdGlmIChtb2RzW2tdKSB7XG5cdFx0XHRcdCsrc3VtO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChLYmRVdGlsLmhhc0NoYXJNb2RpZmllcihjaGFyTW9kaWZpZXIsIG1vZHMpKSB7XG5cdFx0XHRyZXR1cm4gc3VtID4gY2hhck1vZGlmaWVyLmxlbmd0aDtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRyZXR1cm4gc3VtID4gMDtcblx0XHR9XG5cdH0sXG5cblx0LyoqXG5cdCAqIFJldHVybiB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgY2hhciBtb2RpZmllciBpcyBjdXJyZW50bHkgZG93bi5cblx0ICovXG5cdGhhc0NoYXJNb2RpZmllcjogZnVuY3Rpb24gKGNoYXJNb2RpZmllciwgY3VycmVudE1vZGlmaWVycykge1xuXHRcdGlmIChjaGFyTW9kaWZpZXIubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjaGFyTW9kaWZpZXIubGVuZ3RoOyArK2kpIHtcblx0XHRcdGlmICghY3VycmVudE1vZGlmaWVyc1tjaGFyTW9kaWZpZXJbaV1dKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEhlbHBlciBvYmplY3QgdHJhY2tpbmcgbW9kaWZpZXIga2V5IHN0YXRlIGFuZCBnZW5lcmF0ZXMgZmFrZSBrZXkgZXZlbnRzXG5cdCAqIHRvIGNvbXBlbnNhdGUgaWYgaXQgZ2V0cyBvdXQgb2Ygc3luYy5cblx0ICovXG5cdE1vZGlmaWVyU3luYzogZnVuY3Rpb24gKGNoYXJNb2RpZmllcikge1xuXHRcdGlmICghY2hhck1vZGlmaWVyKSB7XG5cdFx0XHRpZiAoaXNNYWMoKSkge1xuXHRcdFx0XHQvLyBvbiBNYWMsIE9wdGlvbiAoQUtBIEFsdCkgaXMgdXNlZCBhcyBhIGNoYXIgbW9kaWZpZXJcblx0XHRcdFx0Y2hhck1vZGlmaWVyID0gW0tleXMuWEtfQWx0X0xdO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoaXNXaW5kb3dzKCkpIHtcblx0XHRcdFx0Ly8gb24gV2luZG93cywgQ3RybCtBbHQgaXMgdXNlZCBhcyBhIGNoYXIgbW9kaWZpZXJcblx0XHRcdFx0Y2hhck1vZGlmaWVyID0gW0tleXMuWEtfQWx0X0wsIEtleXMuWEtfQ29udHJvbF9MXTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKGlzTGludXgoKSkge1xuXHRcdFx0XHQvLyBvbiBMaW51eCwgSVNPIExldmVsIDMgU2hpZnQgKEFsdEdyKSBpcyB1c2VkIGFzIGEgY2hhciBtb2RpZmllclxuXHRcdFx0XHRjaGFyTW9kaWZpZXIgPSBbS2V5cy5YS19JU09fTGV2ZWwzX1NoaWZ0XTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjaGFyTW9kaWZpZXIgPSBbXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YXIgc3RhdGUgPSB7fTtcblxuXHRcdHN0YXRlW0tleXMuWEtfQ29udHJvbF9MXSA9IGZhbHNlO1xuXHRcdHN0YXRlW0tleXMuWEtfQWx0X0xdID0gZmFsc2U7XG5cdFx0c3RhdGVbS2V5cy5YS19JU09fTGV2ZWwzX1NoaWZ0XSA9IGZhbHNlO1xuXHRcdHN0YXRlW0tleXMuWEtfU2hpZnRfTF0gPSBmYWxzZTtcblx0XHRzdGF0ZVtLZXlzLlhLX01ldGFfTF0gPSBmYWxzZTtcblxuXHRcdGZ1bmN0aW9uIHN5bmMoZXZ0LCBrZXlzeW0pIHtcblx0XHRcdHZhciByZXN1bHQgPSBbXTtcblxuXHRcdFx0ZnVuY3Rpb24gc3luY0tleShrZXlzeW0pIHtcblx0XHRcdFx0cmV0dXJuIHtrZXlzeW06IEtleXMubG9va3VwKGtleXN5bSksIHR5cGU6IHN0YXRlW2tleXN5bV0gPyAna2V5ZG93bicgOiAna2V5dXAnfTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGV2dC5jdHJsS2V5ICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdFx0ZXZ0LmN0cmxLZXkgIT09IHN0YXRlW0tleXMuWEtfQ29udHJvbF9MXSAmJiBrZXlzeW0gIT09IEtleXMuWEtfQ29udHJvbF9MKSB7XG5cdFx0XHRcdHN0YXRlW0tleXMuWEtfQ29udHJvbF9MXSA9IGV2dC5jdHJsS2V5O1xuXHRcdFx0XHRyZXN1bHQucHVzaChzeW5jS2V5KEtleXMuWEtfQ29udHJvbF9MKSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZXZ0LmFsdEtleSAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRcdGV2dC5hbHRLZXkgIT09IHN0YXRlW0tleXMuWEtfQWx0X0xdICYmIGtleXN5bSAhPT0gS2V5cy5YS19BbHRfTCkge1xuXHRcdFx0XHRzdGF0ZVtLZXlzLlhLX0FsdF9MXSA9IGV2dC5hbHRLZXk7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKHN5bmNLZXkoS2V5cy5YS19BbHRfTCkpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGV2dC5hbHRHcmFwaEtleSAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRcdGV2dC5hbHRHcmFwaEtleSAhPT0gc3RhdGVbS2V5cy5YS19JU09fTGV2ZWwzX1NoaWZ0XSAmJiBrZXlzeW0gIT09IEtleXMuWEtfSVNPX0xldmVsM19TaGlmdCkge1xuXHRcdFx0XHRzdGF0ZVtLZXlzLlhLX0lTT19MZXZlbDNfU2hpZnRdID0gZXZ0LmFsdEdyYXBoS2V5O1xuXHRcdFx0XHRyZXN1bHQucHVzaChzeW5jS2V5KEtleXMuWEtfSVNPX0xldmVsM19TaGlmdCkpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGV2dC5zaGlmdEtleSAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRcdGV2dC5zaGlmdEtleSAhPT0gc3RhdGVbS2V5cy5YS19TaGlmdF9MXSAmJiBrZXlzeW0gIT09IEtleXMuWEtfU2hpZnRfTCkge1xuXHRcdFx0XHRzdGF0ZVtLZXlzLlhLX1NoaWZ0X0xdID0gZXZ0LnNoaWZ0S2V5O1xuXHRcdFx0XHRyZXN1bHQucHVzaChzeW5jS2V5KEtleXMuWEtfU2hpZnRfTCkpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGV2dC5tZXRhS2V5ICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdFx0ZXZ0Lm1ldGFLZXkgIT09IHN0YXRlW0tleXMuWEtfTWV0YV9MXSAmJiBrZXlzeW0gIT09IEtleXMuWEtfTWV0YV9MKSB7XG5cdFx0XHRcdHN0YXRlW0tleXMuWEtfTWV0YV9MXSA9IGV2dC5tZXRhS2V5O1xuXHRcdFx0XHRyZXN1bHQucHVzaChzeW5jS2V5KEtleXMuWEtfTWV0YV9MKSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHN5bmNLZXlFdmVudChldnQsIGRvd24pIHtcblx0XHRcdHZhciBvYmogPSBLYmRVdGlsLmdldEtleXN5bShldnQpO1xuXHRcdFx0dmFyIGtleXN5bSA9IG9iaiA/IG9iai5rZXlzeW0gOiBudWxsO1xuXG5cdFx0XHQvLyBmaXJzdCwgYXBwbHkgdGhlIGV2ZW50IGl0c2VsZiwgaWYgcmVsZXZhbnRcblx0XHRcdGlmIChrZXlzeW0gIT09IG51bGwgJiYgc3RhdGVba2V5c3ltXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHN0YXRlW2tleXN5bV0gPSBkb3duO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN5bmMoZXZ0LCBrZXlzeW0pO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHQvLyBzeW5jIG9uIHRoZSBhcHByb3ByaWF0ZSBrZXlib2FyZCBldmVudFxuXHRcdFx0a2V5ZG93bjogZnVuY3Rpb24oZXZ0KSB7IHJldHVybiBzeW5jS2V5RXZlbnQoZXZ0LCB0cnVlKTsgfSxcblx0XHRcdGtleXVwOiBmdW5jdGlvbihldnQpIHsgcmV0dXJuIHN5bmNLZXlFdmVudChldnQsIGZhbHNlKTsgfSxcblx0XHRcdC8vIENhbGwgdGhpcyB3aXRoIGEgbm9uLWtleWJvYXJkIGV2ZW50IChzdWNoIGFzIG1vdXNlIGV2ZW50cykgdG8gdXNlIGl0cyBtb2RpZmllciBzdGF0ZSB0byBzeW5jaHJvbml6ZSBhbnl3YXlcblx0XHRcdHN5bmNBbnk6IGZ1bmN0aW9uKGV2dCkgeyByZXR1cm4gc3luYyhldnQpOyB9LFxuXG5cdFx0XHQvLyBpcyBhIHNob3J0Y3V0IG1vZGlmaWVyIGRvd24/XG5cdFx0XHRoYXNTaG9ydGN1dE1vZGlmaWVyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIEtiZFV0aWwuaGFzU2hvcnRjdXRNb2RpZmllcihjaGFyTW9kaWZpZXIsIHN0YXRlKTtcblx0XHRcdH0sXG5cdFx0XHQvLyBpZiBhIGNoYXIgbW9kaWZpZXIgaXMgZG93biwgcmV0dXJuIHRoZSBrZXlzIGl0IGNvbnNpc3RzIG9mLCBvdGhlcndpc2UgcmV0dXJuIG51bGxcblx0XHRcdGFjdGl2ZUNoYXJNb2RpZmllcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBLYmRVdGlsLmhhc0NoYXJNb2RpZmllcihjaGFyTW9kaWZpZXIsIHN0YXRlKSA/IGNoYXJNb2RpZmllciA6IG51bGw7XG5cdFx0XHR9XG5cdFx0fTtcblx0fSxcblxuXHQvKipcblx0ICogR2V0IGEga2V5IElEIGZyb20gYSBrZXlib2FyZCBldmVudC5cblx0ICogTWF5IGJlIGEgc3RyaW5nIG9yIGFuIGludGVnZXIgZGVwZW5kaW5nIG9uIHRoZSBhdmFpbGFibGUgcHJvcGVydGllcy5cblx0ICovXG5cdGdldEtleTogZnVuY3Rpb24gKGV2dCkge1xuXHRcdGlmICgna2V5Q29kZScgaW4gZXZ0ICYmICdrZXknIGluIGV2dCkge1xuXHRcdFx0cmV0dXJuIGV2dC5rZXkgKyAnOicgKyBldnQua2V5Q29kZTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoJ2tleUNvZGUnIGluIGV2dCkge1xuXHRcdFx0cmV0dXJuIGV2dC5rZXlDb2RlO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHJldHVybiBldnQua2V5O1xuXHRcdH1cblx0fSxcblxuXHQvKipcblx0ICogR2V0IHRoZSBtb3N0IHJlbGlhYmxlIGtleXN5bSB2YWx1ZSB3ZSBjYW4gZ2V0IGZyb20gYSBrZXkgZXZlbnQuXG5cdCAqIElmIGNoYXIvY2hhckNvZGUgaXMgYXZhaWxhYmxlLCBwcmVmZXIgdGhvc2UsIG90aGVyd2lzZSBmYWxsIGJhY2sgdG9cblx0ICoga2V5L2tleUNvZGUvd2hpY2guXG5cdCAqL1xuXHRnZXRLZXlzeW06IGZ1bmN0aW9uIChldnQpIHtcblx0XHR2YXIgY29kZXBvaW50O1xuXG5cdFx0aWYgKGV2dC5jaGFyICYmIGV2dC5jaGFyLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0Y29kZXBvaW50ID0gZXZ0LmNoYXIuY2hhckNvZGVBdCgpO1xuXHRcdH1cblx0XHRlbHNlIGlmIChldnQuY2hhckNvZGUpIHtcblx0XHRcdGNvZGVwb2ludCA9IGV2dC5jaGFyQ29kZTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoZXZ0LmtleUNvZGUgJiYgZXZ0LnR5cGUgPT09ICdrZXlwcmVzcycpIHtcblx0XHRcdC8vIElFMTAgc3RvcmVzIHRoZSBjaGFyIGNvZGUgYXMga2V5Q29kZSwgYW5kIGhhcyBubyBvdGhlciB1c2VmdWwgcHJvcGVydGllc1xuXHRcdFx0Y29kZXBvaW50ID0gZXZ0LmtleUNvZGU7XG5cdFx0fVxuXG5cdFx0aWYgKGNvZGVwb2ludCkge1xuXHRcdFx0dmFyIHJlcyA9IEtleXMuZnJvbVVuaWNvZGUoS2JkVXRpbC5zdWJzdGl0dXRlQ29kZXBvaW50KGNvZGVwb2ludCkpO1xuXHRcdFx0aWYgKHJlcykge1xuXHRcdFx0XHRyZXR1cm4gcmVzO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIHdlIGNvdWxkIGNoZWNrIGV2dC5rZXkgaGVyZS5cblx0XHQvLyBMZWdhbCB2YWx1ZXMgYXJlIGRlZmluZWQgaW4gaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtRXZlbnRzLyNrZXktdmFsdWVzLWxpc3QsXG5cdFx0Ly8gc28gd2UgXCJqdXN0XCIgbmVlZCB0byBtYXAgdGhlbSB0byBrZXlzeW0sIGJ1dCBBRkFJSyB0aGlzIGlzIG9ubHkgYXZhaWxhYmxlIGluIElFMTAsXG5cdFx0Ly8gd2hpY2ggYWxzbyBwcm92aWRlcyBldnQua2V5IHNvIHdlIGRvbid0ICpuZWVkKiBpdCB5ZXQuXG5cdFx0aWYgKGV2dC5rZXlDb2RlKSB7XG5cdFx0XHRyZXR1cm4gS2V5cy5sb29rdXAoS2JkVXRpbC5rZXlzeW1Gcm9tS2V5Q29kZShldnQua2V5Q29kZSwgZXZ0LnNoaWZ0S2V5KSk7XG5cdFx0fVxuXHRcdGlmIChldnQud2hpY2gpIHtcblx0XHRcdHJldHVybiBLZXlzLmxvb2t1cChLYmRVdGlsLmtleXN5bUZyb21LZXlDb2RlKGV2dC53aGljaCwgZXZ0LnNoaWZ0S2V5KSk7XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBHaXZlbiBhIGtleWNvZGUsIHRyeSB0byBwcmVkaWN0IHdoaWNoIGtleXN5bSBpdCBtaWdodCBiZS5cblx0ICogSWYgdGhlIGtleWNvZGUgaXMgdW5rbm93biwgbnVsbCBpcyByZXR1cm5lZC5cblx0ICovXG5cdGtleXN5bUZyb21LZXlDb2RlOiBmdW5jdGlvbiAoa2V5Y29kZSwgc2hpZnRQcmVzc2VkKSB7XG5cdFx0aWYgKHR5cGVvZihrZXljb2RlKSAhPT0gJ251bWJlcicpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHQvLyB3b24ndCBiZSBhY2N1cmF0ZSBmb3IgYXplcnR5XG5cdFx0aWYgKGtleWNvZGUgPj0gMHgzMCAmJiBrZXljb2RlIDw9IDB4MzkpIHtcblx0XHRcdHJldHVybiBrZXljb2RlOyAvLyBkaWdpdFxuXHRcdH1cblx0XHRpZiAoa2V5Y29kZSA+PSAweDQxICYmIGtleWNvZGUgPD0gMHg1YSkge1xuXHRcdFx0Ly8gcmVtYXAgdG8gbG93ZXJjYXNlIHVubGVzcyBzaGlmdCBpcyBkb3duXG5cdFx0XHRyZXR1cm4gc2hpZnRQcmVzc2VkID8ga2V5Y29kZSA6IGtleWNvZGUgKyAzMjsgLy8gQS1aXG5cdFx0fVxuXHRcdGlmIChrZXljb2RlID49IDB4NjAgJiYga2V5Y29kZSA8PSAweDY5KSB7XG5cdFx0XHRyZXR1cm4gS2V5cy5YS19LUF8wICsgKGtleWNvZGUgLSAweDYwKTsgLy8gbnVtcGFkIDAtOVxuXHRcdH1cblxuXHRcdHN3aXRjaChrZXljb2RlKSB7XG5cdFx0XHRjYXNlIDB4MjA6IHJldHVybiBLZXlzLlhLX3NwYWNlO1xuXHRcdFx0Y2FzZSAweDZhOiByZXR1cm4gS2V5cy5YS19LUF9NdWx0aXBseTtcblx0XHRcdGNhc2UgMHg2YjogcmV0dXJuIEtleXMuWEtfS1BfQWRkO1xuXHRcdFx0Y2FzZSAweDZjOiByZXR1cm4gS2V5cy5YS19LUF9TZXBhcmF0b3I7XG5cdFx0XHRjYXNlIDB4NmQ6IHJldHVybiBLZXlzLlhLX0tQX1N1YnRyYWN0O1xuXHRcdFx0Y2FzZSAweDZlOiByZXR1cm4gS2V5cy5YS19LUF9EZWNpbWFsO1xuXHRcdFx0Y2FzZSAweDZmOiByZXR1cm4gS2V5cy5YS19LUF9EaXZpZGU7XG5cdFx0XHRjYXNlIDB4YmI6IHJldHVybiBLZXlzLlhLX3BsdXM7XG5cdFx0XHRjYXNlIDB4YmM6IHJldHVybiBLZXlzLlhLX2NvbW1hO1xuXHRcdFx0Y2FzZSAweGJkOiByZXR1cm4gS2V5cy5YS19taW51cztcblx0XHRcdGNhc2UgMHhiZTogcmV0dXJuIEtleXMuWEtfcGVyaW9kO1xuXHRcdH1cblxuXHRcdHJldHVybiBLYmRVdGlsLm5vbkNoYXJhY3RlcktleSh7a2V5Q29kZToga2V5Y29kZX0pO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBJZiB0aGUga2V5IGlzIGEga25vd24gbm9uLWNoYXJhY3RlciBrZXkgKGFueSBrZXkgd2hpY2ggZG9lc24ndCBnZW5lcmF0ZVxuXHQgKiBjaGFyYWN0ZXIgZGF0YSkgcmV0dXJuIGl0cyBrZXlzeW0gdmFsdWUuIE90aGVyd2lzZSByZXR1cm4gbnVsbC5cblx0ICovXG5cdG5vbkNoYXJhY3RlcktleTogZnVuY3Rpb24gKGV2dCkge1xuXHRcdC8vIGV2dC5rZXkgbm90IGltcGxlbWVudGVkIHlldFxuXHRcdGlmICghZXZ0LmtleUNvZGUpIHsgcmV0dXJuIG51bGw7IH1cblxuXHRcdHZhciBrZXljb2RlID0gZXZ0LmtleUNvZGU7XG5cblx0XHRpZiAoa2V5Y29kZSA+PSAweDcwICYmIGtleWNvZGUgPD0gMHg4Nykge1xuXHRcdFx0cmV0dXJuIEtleXMuWEtfRjEgKyBrZXljb2RlIC0gMHg3MDsgLy8gRjEtRjI0XG5cdFx0fVxuXG5cdFx0c3dpdGNoIChrZXljb2RlKSB7XG5cdFx0XHRjYXNlIDggOiByZXR1cm4gS2V5cy5YS19CYWNrU3BhY2U7XG5cdFx0XHRjYXNlIDEzIDogcmV0dXJuIEtleXMuWEtfUmV0dXJuO1xuXG5cdFx0XHRjYXNlIDkgOiByZXR1cm4gS2V5cy5YS19UYWI7XG5cblx0XHRcdGNhc2UgMjcgOiByZXR1cm4gS2V5cy5YS19Fc2NhcGU7XG5cdFx0XHRjYXNlIDQ2IDogcmV0dXJuIEtleXMuWEtfRGVsZXRlO1xuXG5cdFx0XHRjYXNlIDM2IDogcmV0dXJuIEtleXMuWEtfSG9tZTtcblx0XHRcdGNhc2UgMzUgOiByZXR1cm4gS2V5cy5YS19FbmQ7XG5cdFx0XHRjYXNlIDMzIDogcmV0dXJuIEtleXMuWEtfUGFnZV9VcDtcblx0XHRcdGNhc2UgMzQgOiByZXR1cm4gS2V5cy5YS19QYWdlX0Rvd247XG5cdFx0XHRjYXNlIDQ1IDogcmV0dXJuIEtleXMuWEtfSW5zZXJ0O1xuXG5cdFx0XHRjYXNlIDM3IDogcmV0dXJuIEtleXMuWEtfTGVmdDtcblx0XHRcdGNhc2UgMzggOiByZXR1cm4gS2V5cy5YS19VcDtcblx0XHRcdGNhc2UgMzkgOiByZXR1cm4gS2V5cy5YS19SaWdodDtcblx0XHRcdGNhc2UgNDAgOiByZXR1cm4gS2V5cy5YS19Eb3duO1xuXG5cdFx0XHRjYXNlIDE2IDogcmV0dXJuIEtleXMuWEtfU2hpZnRfTDtcblx0XHRcdGNhc2UgMTcgOiByZXR1cm4gS2V5cy5YS19Db250cm9sX0w7XG5cdFx0XHRjYXNlIDE4IDogcmV0dXJuIEtleXMuWEtfQWx0X0w7IC8vIGFsc286IE9wdGlvbi1rZXkgb24gTWFjXG5cblx0XHRcdGNhc2UgMjI0IDogcmV0dXJuIEtleXMuWEtfTWV0YV9MO1xuXHRcdFx0Y2FzZSAyMjUgOiByZXR1cm4gS2V5cy5YS19JU09fTGV2ZWwzX1NoaWZ0OyAvLyBBbHRHclxuXHRcdFx0Y2FzZSA5MSA6IHJldHVybiBLZXlzLlhLX1N1cGVyX0w7IC8vIGFsc286IFdpbmRvd3Mta2V5XG5cdFx0XHRjYXNlIDkyIDogcmV0dXJuIEtleXMuWEtfU3VwZXJfUjsgLy8gYWxzbzogV2luZG93cy1rZXlcblx0XHRcdGNhc2UgOTMgOiByZXR1cm4gS2V5cy5YS19NZW51OyAvLyBhbHNvOiBXaW5kb3dzLU1lbnUsIENvbW1hbmQgb24gTWFjXG5cblx0XHRcdGRlZmF1bHQ6IHJldHVybiBudWxsO1xuXHRcdH1cblx0fSxcblxuXHRzdWJzdGl0dXRlQ29kZXBvaW50OiBmdW5jdGlvbihjcCkge1xuXHRcdC8vIEFueSBVbmljb2RlIGNvZGUgcG9pbnRzIHdoaWNoIGRvIG5vdCBoYXZlIGNvcnJlc3BvbmRpbmcga2V5c3ltIGVudHJpZXNcblx0XHQvLyBjYW4gYmUgc3dhcHBlZCBvdXQgZm9yIGFub3RoZXIgY29kZSBwb2ludCBieSBhZGRpbmcgdGhlbSB0byB0aGlzIHRhYmxlLlxuXHRcdHZhciBzdWJzdGl0dXRpb25zID0ge1xuXHRcdFx0Ly8ge1Msc30gd2l0aCBjb21tYSBiZWxvdyAtPiB7UyxzfSB3aXRoIGNlZGlsbGFcblx0XHRcdDB4MjE4IDogMHgxNWUsXG5cdFx0XHQweDIxOSA6IDB4MTVmLFxuXHRcdFx0Ly8ge1QsdH0gd2l0aCBjb21tYSBiZWxvdyAtPiB7VCx0fSB3aXRoIGNlZGlsbGFcblx0XHRcdDB4MjFhIDogMHgxNjIsXG5cdFx0XHQweDIxYiA6IDB4MTYzXG5cdFx0fTtcblxuXHRcdHZhciBzdWIgPSBzdWJzdGl0dXRpb25zW2NwXTtcblx0XHRyZXR1cm4gc3ViID8gc3ViIDogY3A7XG5cdH0sXG5cblx0LyoqXG5cdCAqIFRha2VzIGEgRE9NIGtleWJvYXJkIGV2ZW50IGFuZDpcblx0ICogLSBkZXRlcm1pbmVzIHdoaWNoIGtleXN5bSBpdCByZXByZXNlbnRzLlxuXHQgKiAtIGRldGVybWluZXMgYSBrZXlJZCAgaWRlbnRpZnlpbmcgdGhlIGtleSB0aGF0IHdhcyBwcmVzc2VkIChjb3JyZXNwb25kaW5nXG5cdCAqICAgdG8gdGhlIGtleS9rZXlDb2RlIHByb3BlcnRpZXMgb24gdGhlIERPTSBldmVudCkuXG5cdCAqIC0gc3ludGhlc2l6ZXMgZXZlbnRzIHRvIHN5bmNocm9uaXplIG1vZGlmaWVyIGtleSBzdGF0ZSBiZXR3ZWVuIHdoaWNoXG5cdCAqICAgbW9kaWZpZXJzIGFyZSBhY3R1YWxseSBkb3duLCBhbmQgd2hpY2ggd2UgdGhvdWdodCB3ZXJlIGRvd24uXG5cdCAqIC0gbWFya3MgZWFjaCBldmVudCB3aXRoIGFuICdlc2NhcGUnIHByb3BlcnR5IGlmIGEgbW9kaWZpZXIgd2FzIGRvd24gd2hpY2hcblx0ICogICBzaG91bGQgYmUgXCJlc2NhcGVkXCIuXG5cdCAqIC0gZ2VuZXJhdGVzIGEgXCJzdGFsbFwiIGV2ZW50IGluIGNhc2VzIHdoZXJlIGl0IG1pZ2h0IGJlIG5lY2Vzc2FyeSB0byB3YWl0XG5cdCAqICAgYW5kIHNlZSBpZiBhIGtleXByZXNzIGV2ZW50IGZvbGxvd3MgYSBrZXlkb3duLlxuXHQgKlxuXHQgKiBUaGlzIGluZm9ybWF0aW9uIGlzIGNvbGxlY3RlZCBpbnRvIGFuIG9iamVjdCB3aGljaCBpcyBwYXNzZWQgdG8gdGhlIG5leHQoKVxuXHQgKiBmdW5jdGlvbiAob25lIGNhbGwgcGVyIGV2ZW50KS5cblx0ICovXG5cdEtleUV2ZW50RGVjb2RlcjogZnVuY3Rpb24gKG1vZGlmaWVyU3RhdGUsIG5leHQpIHtcblx0XHRmdW5jdGlvbiBzZW5kQWxsKGV2dHMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZXZ0cy5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHRuZXh0KGV2dHNbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHByb2Nlc3MoZXZ0LCB0eXBlKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0ge3R5cGU6IHR5cGV9O1xuXHRcdFx0dmFyIGtleUlkID0gS2JkVXRpbC5nZXRLZXkoZXZ0KTtcblxuXHRcdFx0aWYgKGtleUlkKSB7XG5cdFx0XHRcdHJlc3VsdC5rZXlJZCA9IGtleUlkO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIga2V5c3ltID0gS2JkVXRpbC5nZXRLZXlzeW0oZXZ0KTtcblxuXHRcdFx0dmFyIGhhc01vZGlmaWVyID0gbW9kaWZpZXJTdGF0ZS5oYXNTaG9ydGN1dE1vZGlmaWVyKCkgfHwgISFtb2RpZmllclN0YXRlLmFjdGl2ZUNoYXJNb2RpZmllcigpO1xuXG5cdFx0XHQvLyBJcyB0aGlzIGEgY2FzZSB3aGVyZSB3ZSBoYXZlIHRvIGRlY2lkZSBvbiB0aGUga2V5c3ltIHJpZ2h0IGF3YXksIHJhdGhlciB0aGFuIHdhaXRpbmcgZm9yIHRoZSBrZXlwcmVzcz9cblx0XHRcdC8vIFwic3BlY2lhbFwiIGtleXMgbGlrZSBlbnRlciwgdGFiIG9yIGJhY2tzcGFjZSBkb24ndCBzZW5kIGtleXByZXNzIGV2ZW50cyxcblx0XHRcdC8vIGFuZCBzb21lIGJyb3dzZXJzIGRvbid0IHNlbmQga2V5cHJlc3NlcyBhdCBhbGwgaWYgYSBtb2RpZmllciBpcyBkb3duXG5cdFx0XHRpZiAoa2V5c3ltICYmICh0eXBlICE9PSAna2V5ZG93bicgfHwgS2JkVXRpbC5ub25DaGFyYWN0ZXJLZXkoZXZ0KSB8fCBoYXNNb2RpZmllcikpIHtcblx0XHRcdFx0cmVzdWx0LmtleXN5bSA9IGtleXN5bTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGlzU2hpZnQgPSBldnQua2V5Q29kZSA9PT0gMHgxMCB8fCBldnQua2V5ID09PSAnU2hpZnQnO1xuXG5cdFx0XHQvLyBTaG91bGQgd2UgcHJldmVudCB0aGUgYnJvd3NlciBmcm9tIGhhbmRsaW5nIHRoZSBldmVudD9cblx0XHRcdC8vIERvaW5nIHNvIG9uIGEga2V5ZG93biAoaW4gbW9zdCBicm93c2VycykgcHJldmVudHMga2V5cHJlc3MgZnJvbSBiZWluZyBnZW5lcmF0ZWRcblx0XHRcdC8vIHNvIG9ubHkgZG8gdGhhdCBpZiB3ZSBoYXZlIHRvLlxuXHRcdFx0dmFyIHN1cHByZXNzID0gIWlzU2hpZnQgJiYgKHR5cGUgIT09ICdrZXlkb3duJyB8fCBtb2RpZmllclN0YXRlLmhhc1Nob3J0Y3V0TW9kaWZpZXIoKSB8fCAhIUtiZFV0aWwubm9uQ2hhcmFjdGVyS2V5KGV2dCkpO1xuXG5cdFx0XHQvLyBJZiBhIGNoYXIgbW9kaWZpZXIgaXMgZG93biBvbiBhIGtleWRvd24sIHdlIG5lZWQgdG8gaW5zZXJ0IGEgc3RhbGwsXG5cdFx0XHQvLyBzbyBWZXJpZnlDaGFyTW9kaWZpZXIga25vd3MgdG8gd2FpdCBhbmQgc2VlIGlmIGEga2V5cHJlc3MgaXMgY29tbmlnXG5cdFx0XHR2YXIgc3RhbGwgPSB0eXBlID09PSAna2V5ZG93bicgJiYgbW9kaWZpZXJTdGF0ZS5hY3RpdmVDaGFyTW9kaWZpZXIoKSAmJiAhS2JkVXRpbC5ub25DaGFyYWN0ZXJLZXkoZXZ0KTtcblxuXHRcdFx0Ly8gaWYgYSBjaGFyIG1vZGlmaWVyIGlzIHByZXNzZWQsIGdldCB0aGUga2V5cyBpdCBjb25zaXN0cyBvZiAob24gV2luZG93cywgQWx0R3IgaXMgZXF1aXZhbGVudCB0byBDdHJsK0FsdClcblx0XHRcdHZhciBhY3RpdmUgPSBtb2RpZmllclN0YXRlLmFjdGl2ZUNoYXJNb2RpZmllcigpO1xuXG5cdFx0XHQvLyBJZiB3ZSBoYXZlIGEgY2hhciBtb2RpZmllciBkb3duLCBhbmQgd2UncmUgYWJsZSB0byBkZXRlcm1pbmUgYSBrZXlzeW0gcmVsaWFibHlcblx0XHRcdC8vIHRoZW4gKGEpIHdlIGtub3cgdG8gdHJlYXQgdGhlIG1vZGlmaWVyIGFzIGEgY2hhciBtb2RpZmllcixcblx0XHRcdC8vIGFuZCAoYikgd2UnbGwgaGF2ZSB0byBcImVzY2FwZVwiIHRoZSBtb2RpZmllciB0byB1bmRvIHRoZSBtb2RpZmllciB3aGVuIHNlbmRpbmcgdGhlIGNoYXIuXG5cdFx0XHRpZiAoYWN0aXZlICYmIGtleXN5bSkge1xuXHRcdFx0XHR2YXIgaXNDaGFyTW9kaWZpZXIgPSBmYWxzZTtcblx0XHRcdFx0Zm9yICh2YXIgaSAgPSAwOyBpIDwgYWN0aXZlLmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdFx0aWYgKGFjdGl2ZVtpXSA9PT0ga2V5c3ltLmtleXN5bSkge1xuXHRcdFx0XHRcdFx0aXNDaGFyTW9kaWZpZXIgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodHlwZSA9PT0gJ2tleXByZXNzJyAmJiAhaXNDaGFyTW9kaWZpZXIpIHtcblx0XHRcdFx0XHRyZXN1bHQuZXNjYXBlID0gbW9kaWZpZXJTdGF0ZS5hY3RpdmVDaGFyTW9kaWZpZXIoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoc3RhbGwpIHtcblx0XHRcdFx0Ly8gaW5zZXJ0IGEgZmFrZSBcInN0YWxsXCIgZXZlbnRcblx0XHRcdFx0bmV4dCh7dHlwZTogJ3N0YWxsJ30pO1xuXHRcdFx0fVxuXHRcdFx0bmV4dChyZXN1bHQpO1xuXG5cdFx0XHRyZXR1cm4gc3VwcHJlc3M7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGtleWRvd246IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRzZW5kQWxsKG1vZGlmaWVyU3RhdGUua2V5ZG93bihldnQpKTtcblx0XHRcdFx0cmV0dXJuIHByb2Nlc3MoZXZ0LCAna2V5ZG93bicpO1xuXHRcdFx0fSxcblx0XHRcdGtleXByZXNzOiBmdW5jdGlvbihldnQpIHtcblx0XHRcdFx0cmV0dXJuIHByb2Nlc3MoZXZ0LCAna2V5cHJlc3MnKTtcblx0XHRcdH0sXG5cdFx0XHRrZXl1cDogZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdHNlbmRBbGwobW9kaWZpZXJTdGF0ZS5rZXl1cChldnQpKTtcblx0XHRcdFx0cmV0dXJuIHByb2Nlc3MoZXZ0LCAna2V5dXAnKTtcblx0XHRcdH0sXG5cdFx0XHRzeW5jTW9kaWZpZXJzOiBmdW5jdGlvbihldnQpIHtcblx0XHRcdFx0c2VuZEFsbChtb2RpZmllclN0YXRlLnN5bmNBbnkoZXZ0KSk7XG5cdFx0XHR9LFxuXHRcdFx0cmVsZWFzZUFsbDogZnVuY3Rpb24oKSB7IG5leHQoe3R5cGU6ICdyZWxlYXNlYWxsJ30pOyB9XG5cdFx0fTtcblx0fSxcblxuXHQvKipcblx0ICogQ29tYmluZXMga2V5ZG93biBhbmQga2V5cHJlc3MgZXZlbnRzIHdoZXJlIG5lY2Vzc2FyeSB0byBoYW5kbGUgY2hhciBtb2RpZmllcnMuXG5cdCAqIE9uIHNvbWUgT1MnZXMsIGEgY2hhciBtb2RpZmllciBpcyBzb21ldGltZXMgdXNlZCBhcyBhIHNob3J0Y3V0IG1vZGlmaWVyLlxuXHQgKiBGb3IgZXhhbXBsZSwgb24gV2luZG93cywgQWx0R3IgaXMgc3lub255bW91cyB3aXRoIEN0cmwtQWx0LiBPbiBhIERhbmlzaCBrZXlib2FyZFxuXHQgKiBsYXlvdXQsIEFsdEdyLTIgeWllbGRzIGEgQCwgYnV0IEN0cmwtQWx0LUQgZG9lcyBub3RoaW5nIHNvIHdoZW4gdXNlZCB3aXRoIHRoZVxuXHQgKiAnMicga2V5LCBDdHJsLUFsdCBjb3VudHMgYXMgYSBjaGFyIG1vZGlmaWVyIChhbmQgc2hvdWxkIGJlIGVzY2FwZWQpLCBidXQgd2hlblxuXHQgKiB1c2VkIHdpdGggJ0QnLCBpdCBkb2VzIG5vdC5cblx0ICogVGhlIG9ubHkgd2F5IHdlIGNhbiBkaXN0aW5ndWlzaCB0aGVzZSBjYXNlcyBpcyB0byB3YWl0IGFuZCBzZWUgaWYgYSBrZXlwcmVzc1xuXHQgKiBldmVudCBhcnJpdmVzLiBXaGVuIHdlIHJlY2VpdmUgYSBcInN0YWxsXCIgZXZlbnQsIHdhaXQgYSBmZXcgbXMgYmVmb3JlIHByb2Nlc3Npbmdcblx0ICogdGhlIG5leHQga2V5ZG93bi4gSWYgYSBrZXlwcmVzcyBoYXMgYWxzbyBhcnJpdmVkLCBtZXJnZSB0aGUgdHdvLlxuXHQgKi9cblx0VmVyaWZ5Q2hhck1vZGlmaWVyOiBmdW5jdGlvbiAobmV4dCkge1xuXHRcdHZhciBxdWV1ZSA9IFtdO1xuXHRcdHZhciB0aW1lciA9IG51bGw7XG5cblx0XHRmdW5jdGlvbiBwcm9jZXNzKCkge1xuXHRcdFx0aWYgKHRpbWVyKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gZGVsYXlQcm9jZXNzICgpIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKTtcblx0XHRcdFx0dGltZXIgPSBudWxsO1xuXHRcdFx0XHRwcm9jZXNzKCk7XG5cdFx0XHR9XG5cblx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggIT09IDApIHtcblx0XHRcdFx0dmFyIGN1ciA9IHF1ZXVlWzBdO1xuXHRcdFx0XHRxdWV1ZSA9IHF1ZXVlLnNwbGljZSgxKTtcblxuXHRcdFx0XHRzd2l0Y2ggKGN1ci50eXBlKSB7XG5cdFx0XHRcdFx0Y2FzZSAnc3RhbGwnOlxuXHRcdFx0XHRcdFx0Ly8gaW5zZXJ0IGEgZGVsYXkgYmVmb3JlIHByb2Nlc3NpbmcgYXZhaWxhYmxlIGV2ZW50cy5cblx0XHRcdFx0XHRcdC8qIGpzaGludCBsb29wZnVuYzogdHJ1ZSAqL1xuXHRcdFx0XHRcdFx0dGltZXIgPSBzZXRUaW1lb3V0KGRlbGF5UHJvY2VzcywgNSk7XG5cdFx0XHRcdFx0XHQvKiBqc2hpbnQgbG9vcGZ1bmM6IGZhbHNlICovXG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0Y2FzZSAna2V5ZG93bic6XG5cdFx0XHRcdFx0XHQvLyBpcyB0aGUgbmV4dCBlbGVtZW50IGEga2V5cHJlc3M/IFRoZW4gd2Ugc2hvdWxkIG1lcmdlIHRoZSB0d29cblx0XHRcdFx0XHRcdGlmIChxdWV1ZS5sZW5ndGggIT09IDAgJiYgcXVldWVbMF0udHlwZSA9PT0gJ2tleXByZXNzJykge1xuXHRcdFx0XHRcdFx0XHQvLyBGaXJlZm94IHNlbmRzIGtleXByZXNzIGV2ZW4gd2hlbiBubyBjaGFyIGlzIGdlbmVyYXRlZC5cblx0XHRcdFx0XHRcdFx0Ly8gc28sIGlmIGtleXByZXNzIGtleXN5bSBpcyB0aGUgc2FtZSBhcyB3ZSdkIGhhdmUgZ3Vlc3NlZCBmcm9tIGtleWRvd24sXG5cdFx0XHRcdFx0XHRcdC8vIHRoZSBtb2RpZmllciBkaWRuJ3QgaGF2ZSBhbnkgZWZmZWN0LCBhbmQgc2hvdWxkIG5vdCBiZSBlc2NhcGVkXG5cdFx0XHRcdFx0XHRcdGlmIChxdWV1ZVswXS5lc2NhcGUgJiYgKCFjdXIua2V5c3ltIHx8IGN1ci5rZXlzeW0ua2V5c3ltICE9PSBxdWV1ZVswXS5rZXlzeW0ua2V5c3ltKSkge1xuXHRcdFx0XHRcdFx0XHRcdGN1ci5lc2NhcGUgPSBxdWV1ZVswXS5lc2NhcGU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0Y3VyLmtleXN5bSA9IHF1ZXVlWzBdLmtleXN5bTtcblx0XHRcdFx0XHRcdFx0cXVldWUgPSBxdWV1ZS5zcGxpY2UoMSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHN3YWxsb3cgc3RhbGwgZXZlbnRzLCBhbmQgcGFzcyBhbGwgb3RoZXJzIHRvIHRoZSBuZXh0IHN0YWdlXG5cdFx0XHRcdGlmIChjdXIudHlwZSAhPT0gJ3N0YWxsJykge1xuXHRcdFx0XHRcdG5leHQoY3VyKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmdW5jdGlvbihldnQpIHtcblx0XHRcdHF1ZXVlLnB1c2goZXZ0KTtcblx0XHRcdHByb2Nlc3MoKTtcblx0XHR9O1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBLZWVwcyB0cmFjayBvZiB3aGljaCBrZXlzIHdlIChhbmQgdGhlIHNlcnZlcikgYmVsaWV2ZSBhcmUgZG93bi5cblx0ICogV2hlbiBhIGtleXVwIGlzIHJlY2VpdmVkLCBtYXRjaCBpdCBhZ2FpbnN0IHRoaXMgbGlzdCwgdG8gZGV0ZXJtaW5lIHRoZVxuXHQgKiBjb3JyZXNwb25kaW5nIGtleXN5bShzKSBpbiBzb21lIGNhc2VzLCBhIHNpbmdsZSBrZXkgbWF5IHByb2R1Y2UgbXVsdGlwbGVcblx0ICoga2V5c3ltcywgc28gdGhlIGNvcnJlc3BvbmRpbmcga2V5dXAgZXZlbnQgbXVzdCByZWxlYXNlIGFsbCBvZiB0aGVzZSBjaGFyc1xuXHQgKiBrZXkgcmVwZWF0IGV2ZW50cyBzaG91bGQgYmUgbWVyZ2VkIGludG8gYSBzaW5nbGUgZW50cnkuXG5cdCAqIEJlY2F1c2Ugd2UgY2FuJ3QgYWx3YXlzIGlkZW50aWZ5IHdoaWNoIGVudHJ5IGEga2V5ZG93biBvciBrZXl1cCBldmVudFxuXHQgKiBjb3JyZXNwb25kcyB0bywgd2Ugc29tZXRpbWVzIGhhdmUgdG8gZ3Vlc3MuXG5cdCAqL1xuXHRUcmFja0tleVN0YXRlOiBmdW5jdGlvbiAobmV4dCkge1xuXHRcdHZhciBzdGF0ZSA9IFtdO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChldnQpIHtcblx0XHRcdHZhciBsYXN0ID0gc3RhdGUubGVuZ3RoICE9PSAwID8gc3RhdGVbc3RhdGUubGVuZ3RoLTFdIDogbnVsbDtcblxuXHRcdFx0c3dpdGNoIChldnQudHlwZSkge1xuXHRcdFx0XHRjYXNlICdrZXlkb3duJzpcblx0XHRcdFx0XHQvLyBpbnNlcnQgYSBuZXcgZW50cnkgaWYgbGFzdCBzZWVuIGtleSB3YXMgZGlmZmVyZW50LlxuXHRcdFx0XHRcdGlmICghbGFzdCB8fCAhZXZ0LmtleUlkIHx8IGxhc3Qua2V5SWQgIT09IGV2dC5rZXlJZCkge1xuXHRcdFx0XHRcdFx0bGFzdCA9IHtrZXlJZDogZXZ0LmtleUlkLCBrZXlzeW1zOiB7fX07XG5cdFx0XHRcdFx0XHRzdGF0ZS5wdXNoKGxhc3QpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoZXZ0LmtleXN5bSkge1xuXHRcdFx0XHRcdFx0Ly8gbWFrZSBzdXJlIGxhc3QgZXZlbnQgY29udGFpbnMgdGhpcyBrZXlzeW0gKGEgc2luZ2xlIFwibG9naWNhbFwiIGtleWV2ZW50XG5cdFx0XHRcdFx0XHQvLyBjYW4gY2F1c2UgbXVsdGlwbGUga2V5IGV2ZW50cyB0byBiZSBzZW50IHRvIHRoZSBWTkMgc2VydmVyKVxuXHRcdFx0XHRcdFx0bGFzdC5rZXlzeW1zW2V2dC5rZXlzeW0ua2V5c3ltXSA9IGV2dC5rZXlzeW07XG5cdFx0XHRcdFx0XHRsYXN0Lmlnbm9yZUtleVByZXNzID0gdHJ1ZTtcblx0XHRcdFx0XHRcdG5leHQoZXZ0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2tleXByZXNzJzpcblx0XHRcdFx0XHRpZiAoIWxhc3QpIHtcblx0XHRcdFx0XHRcdGxhc3QgPSB7a2V5SWQ6IGV2dC5rZXlJZCwga2V5c3ltczoge319O1xuXHRcdFx0XHRcdFx0c3RhdGUucHVzaChsYXN0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCFldnQua2V5c3ltKSB7XG5cdFx0XHRcdFx0XHRkZWJ1Z2Vycm9yKCdUcmFja0tleVN0YXRlKCkgfCBrZXlwcmVzcyB3aXRoIG5vIGtleXN5bTonLCBldnQpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIElmIHdlIGRpZG4ndCBleHBlY3QgYSBrZXlwcmVzcywgYW5kIGFscmVhZHkgc2VudCBhIGtleWRvd24gdG8gdGhlIFZOQyBzZXJ2ZXJcblx0XHRcdFx0XHQvLyBiYXNlZCBvbiB0aGUga2V5ZG93biwgbWFrZSBzdXJlIHRvIHNraXAgdGhpcyBldmVudC5cblx0XHRcdFx0XHRpZiAoZXZ0LmtleXN5bSAmJiAhbGFzdC5pZ25vcmVLZXlQcmVzcykge1xuXHRcdFx0XHRcdFx0bGFzdC5rZXlzeW1zW2V2dC5rZXlzeW0ua2V5c3ltXSA9IGV2dC5rZXlzeW07XG5cdFx0XHRcdFx0XHRldnQudHlwZSA9ICdrZXlkb3duJztcblx0XHRcdFx0XHRcdG5leHQoZXZ0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2tleXVwJzpcblx0XHRcdFx0XHRpZiAoc3RhdGUubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciBpZHggPSBudWxsO1xuXHRcdFx0XHRcdC8vIGRvIHdlIGhhdmUgYSBtYXRjaGluZyBrZXkgdHJhY2tlZCBhcyBiZWluZyBkb3duP1xuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpICE9PSBzdGF0ZS5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHRcdFx0aWYgKHN0YXRlW2ldLmtleUlkID09PSBldnQua2V5SWQpIHtcblx0XHRcdFx0XHRcdFx0aWR4ID0gaTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIGlmIHdlIGNvdWxkbid0IGZpbmQgYSBtYXRjaCAoaXQgaGFwcGVucyksIGFzc3VtZSBpdCB3YXMgdGhlIGxhc3Qga2V5IHByZXNzZWRcblx0XHRcdFx0XHRpZiAoaWR4ID09PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRpZHggPSBzdGF0ZS5sZW5ndGggLSAxO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBpdGVtID0gc3RhdGUuc3BsaWNlKGlkeCwgMSlbMF07XG5cdFx0XHRcdFx0Ly8gZm9yIGVhY2gga2V5c3ltIHRyYWNrZWQgYnkgdGhpcyBrZXkgZW50cnksIGNsb25lIHRoZSBjdXJyZW50IGV2ZW50IGFuZCBvdmVycmlkZSB0aGUga2V5c3ltXG5cdFx0XHRcdFx0dmFyIGNsb25lID0gKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRmdW5jdGlvbiBDbG9uZSgpe31cblx0XHRcdFx0XHRcdHJldHVybiBmdW5jdGlvbiAob2JqKSB7IENsb25lLnByb3RvdHlwZT1vYmo7IHJldHVybiBuZXcgQ2xvbmUoKTsgfTtcblx0XHRcdFx0XHR9KCkpO1xuXHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiBpdGVtLmtleXN5bXMpIHtcblx0XHRcdFx0XHRcdHZhciBvdXQgPSBjbG9uZShldnQpO1xuXHRcdFx0XHRcdFx0b3V0LmtleXN5bSA9IGl0ZW0ua2V5c3ltc1trZXldO1xuXHRcdFx0XHRcdFx0bmV4dChvdXQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAncmVsZWFzZWFsbCc6XG5cdFx0XHRcdFx0LyoganNoaW50IHNoYWRvdzogdHJ1ZSAqL1xuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3RhdGUubGVuZ3RoOyArK2kpIHtcblx0XHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiBzdGF0ZVtpXS5rZXlzeW1zKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBrZXlzeW0gPSBzdGF0ZVtpXS5rZXlzeW1zW2tleV07XG5cdFx0XHRcdFx0XHRcdG5leHQoe2tleUlkOiAwLCBrZXlzeW06IGtleXN5bSwgdHlwZTogJ2tleXVwJ30pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvKiBqc2hpbnQgc2hhZG93OiBmYWxzZSAqL1xuXHRcdFx0XHRcdHN0YXRlID0gW107XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fTtcblx0fSxcblxuXHQvKipcblx0ICogSGFuZGxlcyBcImVzY2FwaW5nXCIgb2YgbW9kaWZpZXJzOiBpZiBhIGNoYXIgbW9kaWZpZXIgaXMgdXNlZCB0byBwcm9kdWNlIGFcblx0ICoga2V5c3ltIChzdWNoIGFzIEFsdEdyLTIgdG8gZ2VuZXJhdGUgYW4gQCksIHRoZW4gdGhlIG1vZGlmaWVyIG11c3QgYmVcblx0ICogXCJ1bmRvbmVcIiBiZWZvcmUgc2VuZGluZyB0aGUgQCwgYW5kIFwicmVkb25lXCIgYWZ0ZXJ3YXJkcy5cblx0ICovXG5cdEVzY2FwZU1vZGlmaWVyczogZnVuY3Rpb24gKG5leHQpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHR2YXIgaTtcblxuXHRcdFx0aWYgKGV2dC50eXBlICE9PSAna2V5ZG93bicgfHwgZXZ0LmVzY2FwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdG5leHQoZXZ0KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyB1bmRvIG1vZGlmaWVyc1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGV2dC5lc2NhcGUubGVuZ3RoOyArK2kpIHtcblx0XHRcdFx0bmV4dCh7dHlwZTogJ2tleXVwJywga2V5SWQ6IDAsIGtleXN5bTogS2V5cy5sb29rdXAoZXZ0LmVzY2FwZVtpXSl9KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gc2VuZCB0aGUgY2hhcmFjdGVyIGV2ZW50XG5cdFx0XHRuZXh0KGV2dCk7XG5cblx0XHRcdC8vIHJlZG8gbW9kaWZpZXJzXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgZXZ0LmVzY2FwZS5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHRuZXh0KHt0eXBlOiAna2V5ZG93bicsIGtleUlkOiAwLCBrZXlzeW06IEtleXMubG9va3VwKGV2dC5lc2NhcGVbaV0pfSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufTtcblxuXG4vKipcbiAqIFByaXZhdGUgQVBJLlxuICovXG5cblxuZnVuY3Rpb24gaXNNYWMoKSB7XG5cdHJldHVybiBuYXZpZ2F0b3IgJiYgISEoL21hYy9pKS5leGVjKG5hdmlnYXRvci5wbGF0Zm9ybSk7XG59XG5cbmZ1bmN0aW9uIGlzV2luZG93cygpIHtcblx0cmV0dXJuIG5hdmlnYXRvciAmJiAhISgvd2luL2kpLmV4ZWMobmF2aWdhdG9yLnBsYXRmb3JtKTtcbn1cblxuZnVuY3Rpb24gaXNMaW51eCgpIHtcblx0cmV0dXJuIG5hdmlnYXRvciAmJiAhISgvbGludXgvaSkuZXhlYyhuYXZpZ2F0b3IucGxhdGZvcm0pO1xufVxuIiwiLyoqXG4gKiBUaGUgT2JqZWN0IHRvIGJlIGV4cG9zZWQuXG4gKi9cbnZhciBLZXlzID0ge1xuXHRYS19Wb2lkU3ltYm9sOiAgICAgICAgICAgICAgICAgIDB4ZmZmZmZmLCAvKiBWb2lkIHN5bWJvbCAqL1xuXG5cdFhLX0JhY2tTcGFjZTogICAgICAgICAgICAgICAgICAgMHhmZjA4LCAvKiBCYWNrIHNwYWNlLCBiYWNrIGNoYXIgKi9cblx0WEtfVGFiOiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmMDksXG5cdFhLX0xpbmVmZWVkOiAgICAgICAgICAgICAgICAgICAgMHhmZjBhLCAvKiBMaW5lZmVlZCwgTEYgKi9cblx0WEtfQ2xlYXI6ICAgICAgICAgICAgICAgICAgICAgICAweGZmMGIsXG5cdFhLX1JldHVybjogICAgICAgICAgICAgICAgICAgICAgMHhmZjBkLCAvKiBSZXR1cm4sIGVudGVyICovXG5cdFhLX1BhdXNlOiAgICAgICAgICAgICAgICAgICAgICAgMHhmZjEzLCAvKiBQYXVzZSwgaG9sZCAqL1xuXHRYS19TY3JvbGxfTG9jazogICAgICAgICAgICAgICAgIDB4ZmYxNCxcblx0WEtfU3lzX1JlcTogICAgICAgICAgICAgICAgICAgICAweGZmMTUsXG5cdFhLX0VzY2FwZTogICAgICAgICAgICAgICAgICAgICAgMHhmZjFiLFxuXHRYS19EZWxldGU6ICAgICAgICAgICAgICAgICAgICAgIDB4ZmZmZiwgLyogRGVsZXRlLCBydWJvdXQgKi9cblxuXHQvKiBDdXJzb3IgY29udHJvbCAmIG1vdGlvbiAqL1xuXG5cdFhLX0hvbWU6ICAgICAgICAgICAgICAgICAgICAgICAgMHhmZjUwLFxuXHRYS19MZWZ0OiAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmY1MSwgLyogTW92ZSBsZWZ0LCBsZWZ0IGFycm93ICovXG5cdFhLX1VwOiAgICAgICAgICAgICAgICAgICAgICAgICAgMHhmZjUyLCAvKiBNb3ZlIHVwLCB1cCBhcnJvdyAqL1xuXHRYS19SaWdodDogICAgICAgICAgICAgICAgICAgICAgIDB4ZmY1MywgLyogTW92ZSByaWdodCwgcmlnaHQgYXJyb3cgKi9cblx0WEtfRG93bjogICAgICAgICAgICAgICAgICAgICAgICAweGZmNTQsIC8qIE1vdmUgZG93biwgZG93biBhcnJvdyAqL1xuXHRYS19QcmlvcjogICAgICAgICAgICAgICAgICAgICAgIDB4ZmY1NSwgLyogUHJpb3IsIHByZXZpb3VzICovXG5cdFhLX1BhZ2VfVXA6ICAgICAgICAgICAgICAgICAgICAgMHhmZjU1LFxuXHRYS19OZXh0OiAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmY1NiwgLyogTmV4dCAqL1xuXHRYS19QYWdlX0Rvd246ICAgICAgICAgICAgICAgICAgIDB4ZmY1Nixcblx0WEtfRW5kOiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmNTcsIC8qIEVPTCAqL1xuXHRYS19CZWdpbjogICAgICAgICAgICAgICAgICAgICAgIDB4ZmY1OCwgLyogQk9MICovXG5cblx0LyogTWlzYyBmdW5jdGlvbnMgKi9cblxuXHRYS19TZWxlY3Q6ICAgICAgICAgICAgICAgICAgICAgIDB4ZmY2MCwgLyogU2VsZWN0LCBtYXJrICovXG5cdFhLX1ByaW50OiAgICAgICAgICAgICAgICAgICAgICAgMHhmZjYxLFxuXHRYS19FeGVjdXRlOiAgICAgICAgICAgICAgICAgICAgIDB4ZmY2MiwgLyogRXhlY3V0ZSwgcnVuLCBkbyAqL1xuXHRYS19JbnNlcnQ6ICAgICAgICAgICAgICAgICAgICAgIDB4ZmY2MywgLyogSW5zZXJ0LCBpbnNlcnQgaGVyZSAqL1xuXHRYS19VbmRvOiAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmY2NSxcblx0WEtfUmVkbzogICAgICAgICAgICAgICAgICAgICAgICAweGZmNjYsIC8qIFJlZG8sIGFnYWluICovXG5cdFhLX01lbnU6ICAgICAgICAgICAgICAgICAgICAgICAgMHhmZjY3LFxuXHRYS19GaW5kOiAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmY2OCwgLyogRmluZCwgc2VhcmNoICovXG5cdFhLX0NhbmNlbDogICAgICAgICAgICAgICAgICAgICAgMHhmZjY5LCAvKiBDYW5jZWwsIHN0b3AsIGFib3J0LCBleGl0ICovXG5cdFhLX0hlbHA6ICAgICAgICAgICAgICAgICAgICAgICAgMHhmZjZhLCAvKiBIZWxwICovXG5cdFhLX0JyZWFrOiAgICAgICAgICAgICAgICAgICAgICAgMHhmZjZiLFxuXHRYS19Nb2RlX3N3aXRjaDogICAgICAgICAgICAgICAgIDB4ZmY3ZSwgLyogQ2hhcmFjdGVyIHNldCBzd2l0Y2ggKi9cblx0WEtfc2NyaXB0X3N3aXRjaDogICAgICAgICAgICAgICAweGZmN2UsIC8qIEFsaWFzIGZvciBtb2RlX3N3aXRjaCAqL1xuXHRYS19OdW1fTG9jazogICAgICAgICAgICAgICAgICAgIDB4ZmY3ZixcblxuXHQvKiBLZXlwYWQgZnVuY3Rpb25zLCBrZXlwYWQgbnVtYmVycyBjbGV2ZXJseSBjaG9zZW4gdG8gbWFwIHRvIEFTQ0lJICovXG5cblx0WEtfS1BfU3BhY2U6ICAgICAgICAgICAgICAgICAgICAweGZmODAsIC8qIFNwYWNlICovXG5cdFhLX0tQX1RhYjogICAgICAgICAgICAgICAgICAgICAgMHhmZjg5LFxuXHRYS19LUF9FbnRlcjogICAgICAgICAgICAgICAgICAgIDB4ZmY4ZCwgLyogRW50ZXIgKi9cblx0WEtfS1BfRjE6ICAgICAgICAgICAgICAgICAgICAgICAweGZmOTEsIC8qIFBGMSwgS1BfQSwgLi4uICovXG5cdFhLX0tQX0YyOiAgICAgICAgICAgICAgICAgICAgICAgMHhmZjkyLFxuXHRYS19LUF9GMzogICAgICAgICAgICAgICAgICAgICAgIDB4ZmY5Myxcblx0WEtfS1BfRjQ6ICAgICAgICAgICAgICAgICAgICAgICAweGZmOTQsXG5cdFhLX0tQX0hvbWU6ICAgICAgICAgICAgICAgICAgICAgMHhmZjk1LFxuXHRYS19LUF9MZWZ0OiAgICAgICAgICAgICAgICAgICAgIDB4ZmY5Nixcblx0WEtfS1BfVXA6ICAgICAgICAgICAgICAgICAgICAgICAweGZmOTcsXG5cdFhLX0tQX1JpZ2h0OiAgICAgICAgICAgICAgICAgICAgMHhmZjk4LFxuXHRYS19LUF9Eb3duOiAgICAgICAgICAgICAgICAgICAgIDB4ZmY5OSxcblx0WEtfS1BfUHJpb3I6ICAgICAgICAgICAgICAgICAgICAweGZmOWEsXG5cdFhLX0tQX1BhZ2VfVXA6ICAgICAgICAgICAgICAgICAgMHhmZjlhLCAgLy8gTk9URTogaWJjIGZpeCAoY29tbWEgd2FzIG1pc3NpbmcpXG5cdFhLX0tQX05leHQ6ICAgICAgICAgICAgICAgICAgICAgMHhmZjliLFxuXHRYS19LUF9QYWdlX0Rvd246ICAgICAgICAgICAgICAgIDB4ZmY5Yixcblx0WEtfS1BfRW5kOiAgICAgICAgICAgICAgICAgICAgICAweGZmOWMsXG5cdFhLX0tQX0JlZ2luOiAgICAgICAgICAgICAgICAgICAgMHhmZjlkLFxuXHRYS19LUF9JbnNlcnQ6ICAgICAgICAgICAgICAgICAgIDB4ZmY5ZSxcblx0WEtfS1BfRGVsZXRlOiAgICAgICAgICAgICAgICAgICAweGZmOWYsXG5cdFhLX0tQX0VxdWFsOiAgICAgICAgICAgICAgICAgICAgMHhmZmJkLCAvKiBFcXVhbHMgKi9cblx0WEtfS1BfTXVsdGlwbHk6ICAgICAgICAgICAgICAgICAweGZmYWEsXG5cdFhLX0tQX0FkZDogICAgICAgICAgICAgICAgICAgICAgMHhmZmFiLFxuXHRYS19LUF9TZXBhcmF0b3I6ICAgICAgICAgICAgICAgIDB4ZmZhYywgLyogU2VwYXJhdG9yLCBvZnRlbiBjb21tYSAqL1xuXHRYS19LUF9TdWJ0cmFjdDogICAgICAgICAgICAgICAgIDB4ZmZhZCxcblx0WEtfS1BfRGVjaW1hbDogICAgICAgICAgICAgICAgICAweGZmYWUsXG5cdFhLX0tQX0RpdmlkZTogICAgICAgICAgICAgICAgICAgMHhmZmFmLFxuXG5cdFhLX0tQXzA6ICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmIwLFxuXHRYS19LUF8xOiAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZiMSxcblx0WEtfS1BfMjogICAgICAgICAgICAgICAgICAgICAgICAweGZmYjIsXG5cdFhLX0tQXzM6ICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmIzLFxuXHRYS19LUF80OiAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZiNCxcblx0WEtfS1BfNTogICAgICAgICAgICAgICAgICAgICAgICAweGZmYjUsXG5cdFhLX0tQXzY6ICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmI2LFxuXHRYS19LUF83OiAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZiNyxcblx0WEtfS1BfODogICAgICAgICAgICAgICAgICAgICAgICAweGZmYjgsXG5cdFhLX0tQXzk6ICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmI5LFxuXG5cdC8qXG5cdCAqIEF1eGlsaWFyeSBmdW5jdGlvbnM7IG5vdGUgdGhlIGR1cGxpY2F0ZSBkZWZpbml0aW9ucyBmb3IgbGVmdCBhbmQgcmlnaHRcblx0ICogZnVuY3Rpb24ga2V5czsgIFN1biBrZXlib2FyZHMgYW5kIGEgZmV3IG90aGVyIG1hbnVmYWN0dXJlcnMgaGF2ZSBzdWNoXG5cdCAqIGZ1bmN0aW9uIGtleSBncm91cHMgb24gdGhlIGxlZnQgYW5kL29yIHJpZ2h0IHNpZGVzIG9mIHRoZSBrZXlib2FyZC5cblx0ICogV2UndmUgbm90IGZvdW5kIGEga2V5Ym9hcmQgd2l0aCBtb3JlIHRoYW4gMzUgZnVuY3Rpb24ga2V5cyB0b3RhbC5cblx0ICovXG5cblx0WEtfRjE6ICAgICAgICAgICAgICAgICAgICAgICAgICAweGZmYmUsXG5cdFhLX0YyOiAgICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmJmLFxuXHRYS19GMzogICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZjMCxcblx0WEtfRjQ6ICAgICAgICAgICAgICAgICAgICAgICAgICAweGZmYzEsXG5cdFhLX0Y1OiAgICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmMyLFxuXHRYS19GNjogICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZjMyxcblx0WEtfRjc6ICAgICAgICAgICAgICAgICAgICAgICAgICAweGZmYzQsXG5cdFhLX0Y4OiAgICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmM1LFxuXHRYS19GOTogICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZjNixcblx0WEtfRjEwOiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmYzcsXG5cdFhLX0YxMTogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmM4LFxuXHRYS19MMTogICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZjOCxcblx0WEtfRjEyOiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmYzksXG5cdFhLX0wyOiAgICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmM5LFxuXHRYS19GMTM6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZjYSxcblx0WEtfTDM6ICAgICAgICAgICAgICAgICAgICAgICAgICAweGZmY2EsXG5cdFhLX0YxNDogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmNiLFxuXHRYS19MNDogICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZjYixcblx0WEtfRjE1OiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmY2MsXG5cdFhLX0w1OiAgICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmNjLFxuXHRYS19GMTY6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZjZCxcblx0WEtfTDY6ICAgICAgICAgICAgICAgICAgICAgICAgICAweGZmY2QsXG5cdFhLX0YxNzogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmNlLFxuXHRYS19MNzogICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZjZSxcblx0WEtfRjE4OiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmY2YsXG5cdFhLX0w4OiAgICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmNmLFxuXHRYS19GMTk6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkMCxcblx0WEtfTDk6ICAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZDAsXG5cdFhLX0YyMDogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmQxLFxuXHRYS19MMTA6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkMSxcblx0WEtfRjIxOiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZDIsXG5cdFhLX1IxOiAgICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmQyLFxuXHRYS19GMjI6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkMyxcblx0WEtfUjI6ICAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZDMsXG5cdFhLX0YyMzogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmQ0LFxuXHRYS19SMzogICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkNCxcblx0WEtfRjI0OiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZDUsXG5cdFhLX1I0OiAgICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmQ1LFxuXHRYS19GMjU6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkNixcblx0WEtfUjU6ICAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZDYsXG5cdFhLX0YyNjogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmQ3LFxuXHRYS19SNjogICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkNyxcblx0WEtfRjI3OiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZDgsXG5cdFhLX1I3OiAgICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmQ4LFxuXHRYS19GMjg6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkOSxcblx0WEtfUjg6ICAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZDksXG5cdFhLX0YyOTogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmRhLFxuXHRYS19SOTogICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkYSxcblx0WEtfRjMwOiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZGIsXG5cdFhLX1IxMDogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmRiLFxuXHRYS19GMzE6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkYyxcblx0WEtfUjExOiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZGMsXG5cdFhLX0YzMjogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmRkLFxuXHRYS19SMTI6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkZCxcblx0WEtfRjMzOiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZGUsXG5cdFhLX1IxMzogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmRlLFxuXHRYS19GMzQ6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZkZixcblx0WEtfUjE0OiAgICAgICAgICAgICAgICAgICAgICAgICAweGZmZGYsXG5cdFhLX0YzNTogICAgICAgICAgICAgICAgICAgICAgICAgMHhmZmUwLFxuXHRYS19SMTU6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4ZmZlMCxcblxuXHQvKiBNb2RpZmllcnMgKi9cblxuXHRYS19TaGlmdF9MOiAgICAgICAgICAgICAgICAgICAgIDB4ZmZlMSwgLyogTGVmdCBzaGlmdCAqL1xuXHRYS19TaGlmdF9SOiAgICAgICAgICAgICAgICAgICAgIDB4ZmZlMiwgLyogUmlnaHQgc2hpZnQgKi9cblx0WEtfQ29udHJvbF9MOiAgICAgICAgICAgICAgICAgICAweGZmZTMsIC8qIExlZnQgY29udHJvbCAqL1xuXHRYS19Db250cm9sX1I6ICAgICAgICAgICAgICAgICAgIDB4ZmZlNCwgLyogUmlnaHQgY29udHJvbCAqL1xuXHRYS19DYXBzX0xvY2s6ICAgICAgICAgICAgICAgICAgIDB4ZmZlNSwgLyogQ2FwcyBsb2NrICovXG5cdFhLX1NoaWZ0X0xvY2s6ICAgICAgICAgICAgICAgICAgMHhmZmU2LCAvKiBTaGlmdCBsb2NrICovXG5cblx0WEtfTWV0YV9MOiAgICAgICAgICAgICAgICAgICAgICAweGZmZTcsIC8qIExlZnQgbWV0YSAqL1xuXHRYS19NZXRhX1I6ICAgICAgICAgICAgICAgICAgICAgIDB4ZmZlOCwgLyogUmlnaHQgbWV0YSAqL1xuXHRYS19BbHRfTDogICAgICAgICAgICAgICAgICAgICAgIDB4ZmZlOSwgLyogTGVmdCBhbHQgKi9cblx0WEtfQWx0X1I6ICAgICAgICAgICAgICAgICAgICAgICAweGZmZWEsIC8qIFJpZ2h0IGFsdCAqL1xuXHRYS19TdXBlcl9MOiAgICAgICAgICAgICAgICAgICAgIDB4ZmZlYiwgLyogTGVmdCBzdXBlciAqL1xuXHRYS19TdXBlcl9SOiAgICAgICAgICAgICAgICAgICAgIDB4ZmZlYywgLyogUmlnaHQgc3VwZXIgKi9cblx0WEtfSHlwZXJfTDogICAgICAgICAgICAgICAgICAgICAweGZmZWQsIC8qIExlZnQgaHlwZXIgKi9cblx0WEtfSHlwZXJfUjogICAgICAgICAgICAgICAgICAgICAweGZmZWUsIC8qIFJpZ2h0IGh5cGVyICovXG5cblx0WEtfSVNPX0xldmVsM19TaGlmdDogICAgICAgICAgICAweGZlMDMsIC8qIEFsdEdyICovXG5cblx0Lypcblx0ICogTGF0aW4gMVxuXHQgKiAoSVNPL0lFQyA4ODU5LTE6IFVuaWNvZGUgVSswMDIwLi5VKzAwRkYpXG5cdCAqIEJ5dGUgMyA9IDBcblx0ICovXG5cblx0WEtfc3BhY2U6ICAgICAgICAgICAgICAgICAgICAgICAweDAwMjAsIC8qIFUrMDAyMCBTUEFDRSAqL1xuXHRYS19leGNsYW06ICAgICAgICAgICAgICAgICAgICAgIDB4MDAyMSwgLyogVSswMDIxIEVYQ0xBTUFUSU9OIE1BUksgKi9cblx0WEtfcXVvdGVkYmw6ICAgICAgICAgICAgICAgICAgICAweDAwMjIsIC8qIFUrMDAyMiBRVU9UQVRJT04gTUFSSyAqL1xuXHRYS19udW1iZXJzaWduOiAgICAgICAgICAgICAgICAgIDB4MDAyMywgLyogVSswMDIzIE5VTUJFUiBTSUdOICovXG5cdFhLX2RvbGxhcjogICAgICAgICAgICAgICAgICAgICAgMHgwMDI0LCAvKiBVKzAwMjQgRE9MTEFSIFNJR04gKi9cblx0WEtfcGVyY2VudDogICAgICAgICAgICAgICAgICAgICAweDAwMjUsIC8qIFUrMDAyNSBQRVJDRU5UIFNJR04gKi9cblx0WEtfYW1wZXJzYW5kOiAgICAgICAgICAgICAgICAgICAweDAwMjYsIC8qIFUrMDAyNiBBTVBFUlNBTkQgKi9cblx0WEtfYXBvc3Ryb3BoZTogICAgICAgICAgICAgICAgICAweDAwMjcsIC8qIFUrMDAyNyBBUE9TVFJPUEhFICovXG5cdFhLX3F1b3RlcmlnaHQ6ICAgICAgICAgICAgICAgICAgMHgwMDI3LCAvKiBkZXByZWNhdGVkICovXG5cdFhLX3BhcmVubGVmdDogICAgICAgICAgICAgICAgICAgMHgwMDI4LCAvKiBVKzAwMjggTEVGVCBQQVJFTlRIRVNJUyAqL1xuXHRYS19wYXJlbnJpZ2h0OiAgICAgICAgICAgICAgICAgIDB4MDAyOSwgLyogVSswMDI5IFJJR0hUIFBBUkVOVEhFU0lTICovXG5cdFhLX2FzdGVyaXNrOiAgICAgICAgICAgICAgICAgICAgMHgwMDJhLCAvKiBVKzAwMkEgQVNURVJJU0sgKi9cblx0WEtfcGx1czogICAgICAgICAgICAgICAgICAgICAgICAweDAwMmIsIC8qIFUrMDAyQiBQTFVTIFNJR04gKi9cblx0WEtfY29tbWE6ICAgICAgICAgICAgICAgICAgICAgICAweDAwMmMsIC8qIFUrMDAyQyBDT01NQSAqL1xuXHRYS19taW51czogICAgICAgICAgICAgICAgICAgICAgIDB4MDAyZCwgLyogVSswMDJEIEhZUEhFTi1NSU5VUyAqL1xuXHRYS19wZXJpb2Q6ICAgICAgICAgICAgICAgICAgICAgIDB4MDAyZSwgLyogVSswMDJFIEZVTEwgU1RPUCAqL1xuXHRYS19zbGFzaDogICAgICAgICAgICAgICAgICAgICAgIDB4MDAyZiwgLyogVSswMDJGIFNPTElEVVMgKi9cblx0WEtfMDogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwMzAsIC8qIFUrMDAzMCBESUdJVCBaRVJPICovXG5cdFhLXzE6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDMxLCAvKiBVKzAwMzEgRElHSVQgT05FICovXG5cdFhLXzI6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDMyLCAvKiBVKzAwMzIgRElHSVQgVFdPICovXG5cdFhLXzM6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDMzLCAvKiBVKzAwMzMgRElHSVQgVEhSRUUgKi9cblx0WEtfNDogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwMzQsIC8qIFUrMDAzNCBESUdJVCBGT1VSICovXG5cdFhLXzU6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDM1LCAvKiBVKzAwMzUgRElHSVQgRklWRSAqL1xuXHRYS182OiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDAzNiwgLyogVSswMDM2IERJR0lUIFNJWCAqL1xuXHRYS183OiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDAzNywgLyogVSswMDM3IERJR0lUIFNFVkVOICovXG5cdFhLXzg6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDM4LCAvKiBVKzAwMzggRElHSVQgRUlHSFQgKi9cblx0WEtfOTogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwMzksIC8qIFUrMDAzOSBESUdJVCBOSU5FICovXG5cdFhLX2NvbG9uOiAgICAgICAgICAgICAgICAgICAgICAgMHgwMDNhLCAvKiBVKzAwM0EgQ09MT04gKi9cblx0WEtfc2VtaWNvbG9uOiAgICAgICAgICAgICAgICAgICAweDAwM2IsIC8qIFUrMDAzQiBTRU1JQ09MT04gKi9cblx0WEtfbGVzczogICAgICAgICAgICAgICAgICAgICAgICAweDAwM2MsIC8qIFUrMDAzQyBMRVNTLVRIQU4gU0lHTiAqL1xuXHRYS19lcXVhbDogICAgICAgICAgICAgICAgICAgICAgIDB4MDAzZCwgLyogVSswMDNEIEVRVUFMUyBTSUdOICovXG5cdFhLX2dyZWF0ZXI6ICAgICAgICAgICAgICAgICAgICAgMHgwMDNlLCAvKiBVKzAwM0UgR1JFQVRFUi1USEFOIFNJR04gKi9cblx0WEtfcXVlc3Rpb246ICAgICAgICAgICAgICAgICAgICAweDAwM2YsIC8qIFUrMDAzRiBRVUVTVElPTiBNQVJLICovXG5cdFhLX2F0OiAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDQwLCAvKiBVKzAwNDAgQ09NTUVSQ0lBTCBBVCAqL1xuXHRYS19BOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA0MSwgLyogVSswMDQxIExBVElOIENBUElUQUwgTEVUVEVSIEEgKi9cblx0WEtfQjogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNDIsIC8qIFUrMDA0MiBMQVRJTiBDQVBJVEFMIExFVFRFUiBCICovXG5cdFhLX0M6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDQzLCAvKiBVKzAwNDMgTEFUSU4gQ0FQSVRBTCBMRVRURVIgQyAqL1xuXHRYS19EOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA0NCwgLyogVSswMDQ0IExBVElOIENBUElUQUwgTEVUVEVSIEQgKi9cblx0WEtfRTogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNDUsIC8qIFUrMDA0NSBMQVRJTiBDQVBJVEFMIExFVFRFUiBFICovXG5cdFhLX0Y6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDQ2LCAvKiBVKzAwNDYgTEFUSU4gQ0FQSVRBTCBMRVRURVIgRiAqL1xuXHRYS19HOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA0NywgLyogVSswMDQ3IExBVElOIENBUElUQUwgTEVUVEVSIEcgKi9cblx0WEtfSDogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNDgsIC8qIFUrMDA0OCBMQVRJTiBDQVBJVEFMIExFVFRFUiBIICovXG5cdFhLX0k6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDQ5LCAvKiBVKzAwNDkgTEFUSU4gQ0FQSVRBTCBMRVRURVIgSSAqL1xuXHRYS19KOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA0YSwgLyogVSswMDRBIExBVElOIENBUElUQUwgTEVUVEVSIEogKi9cblx0WEtfSzogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNGIsIC8qIFUrMDA0QiBMQVRJTiBDQVBJVEFMIExFVFRFUiBLICovXG5cdFhLX0w6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDRjLCAvKiBVKzAwNEMgTEFUSU4gQ0FQSVRBTCBMRVRURVIgTCAqL1xuXHRYS19NOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA0ZCwgLyogVSswMDREIExBVElOIENBUElUQUwgTEVUVEVSIE0gKi9cblx0WEtfTjogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNGUsIC8qIFUrMDA0RSBMQVRJTiBDQVBJVEFMIExFVFRFUiBOICovXG5cdFhLX086ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDRmLCAvKiBVKzAwNEYgTEFUSU4gQ0FQSVRBTCBMRVRURVIgTyAqL1xuXHRYS19QOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA1MCwgLyogVSswMDUwIExBVElOIENBUElUQUwgTEVUVEVSIFAgKi9cblx0WEtfUTogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNTEsIC8qIFUrMDA1MSBMQVRJTiBDQVBJVEFMIExFVFRFUiBRICovXG5cdFhLX1I6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDUyLCAvKiBVKzAwNTIgTEFUSU4gQ0FQSVRBTCBMRVRURVIgUiAqL1xuXHRYS19TOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA1MywgLyogVSswMDUzIExBVElOIENBUElUQUwgTEVUVEVSIFMgKi9cblx0WEtfVDogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNTQsIC8qIFUrMDA1NCBMQVRJTiBDQVBJVEFMIExFVFRFUiBUICovXG5cdFhLX1U6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDU1LCAvKiBVKzAwNTUgTEFUSU4gQ0FQSVRBTCBMRVRURVIgVSAqL1xuXHRYS19WOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA1NiwgLyogVSswMDU2IExBVElOIENBUElUQUwgTEVUVEVSIFYgKi9cblx0WEtfVzogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNTcsIC8qIFUrMDA1NyBMQVRJTiBDQVBJVEFMIExFVFRFUiBXICovXG5cdFhLX1g6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDU4LCAvKiBVKzAwNTggTEFUSU4gQ0FQSVRBTCBMRVRURVIgWCAqL1xuXHRYS19ZOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA1OSwgLyogVSswMDU5IExBVElOIENBUElUQUwgTEVUVEVSIFkgKi9cblx0WEtfWjogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNWEsIC8qIFUrMDA1QSBMQVRJTiBDQVBJVEFMIExFVFRFUiBaICovXG5cdFhLX2JyYWNrZXRsZWZ0OiAgICAgICAgICAgICAgICAgMHgwMDViLCAvKiBVKzAwNUIgTEVGVCBTUVVBUkUgQlJBQ0tFVCAqL1xuXHRYS19iYWNrc2xhc2g6ICAgICAgICAgICAgICAgICAgIDB4MDA1YywgLyogVSswMDVDIFJFVkVSU0UgU09MSURVUyAqL1xuXHRYS19icmFja2V0cmlnaHQ6ICAgICAgICAgICAgICAgIDB4MDA1ZCwgLyogVSswMDVEIFJJR0hUIFNRVUFSRSBCUkFDS0VUICovXG5cdFhLX2FzY2lpY2lyY3VtOiAgICAgICAgICAgICAgICAgMHgwMDVlLCAvKiBVKzAwNUUgQ0lSQ1VNRkxFWCBBQ0NFTlQgKi9cblx0WEtfdW5kZXJzY29yZTogICAgICAgICAgICAgICAgICAweDAwNWYsIC8qIFUrMDA1RiBMT1cgTElORSAqL1xuXHRYS19ncmF2ZTogICAgICAgICAgICAgICAgICAgICAgIDB4MDA2MCwgLyogVSswMDYwIEdSQVZFIEFDQ0VOVCAqL1xuXHRYS19xdW90ZWxlZnQ6ICAgICAgICAgICAgICAgICAgIDB4MDA2MCwgLyogZGVwcmVjYXRlZCAqL1xuXHRYS19hOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA2MSwgLyogVSswMDYxIExBVElOIFNNQUxMIExFVFRFUiBBICovXG5cdFhLX2I6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDYyLCAvKiBVKzAwNjIgTEFUSU4gU01BTEwgTEVUVEVSIEIgKi9cblx0WEtfYzogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNjMsIC8qIFUrMDA2MyBMQVRJTiBTTUFMTCBMRVRURVIgQyAqL1xuXHRYS19kOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA2NCwgLyogVSswMDY0IExBVElOIFNNQUxMIExFVFRFUiBEICovXG5cdFhLX2U6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDY1LCAvKiBVKzAwNjUgTEFUSU4gU01BTEwgTEVUVEVSIEUgKi9cblx0WEtfZjogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNjYsIC8qIFUrMDA2NiBMQVRJTiBTTUFMTCBMRVRURVIgRiAqL1xuXHRYS19nOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA2NywgLyogVSswMDY3IExBVElOIFNNQUxMIExFVFRFUiBHICovXG5cdFhLX2g6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDY4LCAvKiBVKzAwNjggTEFUSU4gU01BTEwgTEVUVEVSIEggKi9cblx0WEtfaTogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNjksIC8qIFUrMDA2OSBMQVRJTiBTTUFMTCBMRVRURVIgSSAqL1xuXHRYS19qOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA2YSwgLyogVSswMDZBIExBVElOIFNNQUxMIExFVFRFUiBKICovXG5cdFhLX2s6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDZiLCAvKiBVKzAwNkIgTEFUSU4gU01BTEwgTEVUVEVSIEsgKi9cblx0WEtfbDogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNmMsIC8qIFUrMDA2QyBMQVRJTiBTTUFMTCBMRVRURVIgTCAqL1xuXHRYS19tOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA2ZCwgLyogVSswMDZEIExBVElOIFNNQUxMIExFVFRFUiBNICovXG5cdFhLX246ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDZlLCAvKiBVKzAwNkUgTEFUSU4gU01BTEwgTEVUVEVSIE4gKi9cblx0WEtfbzogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNmYsIC8qIFUrMDA2RiBMQVRJTiBTTUFMTCBMRVRURVIgTyAqL1xuXHRYS19wOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA3MCwgLyogVSswMDcwIExBVElOIFNNQUxMIExFVFRFUiBQICovXG5cdFhLX3E6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDcxLCAvKiBVKzAwNzEgTEFUSU4gU01BTEwgTEVUVEVSIFEgKi9cblx0WEtfcjogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNzIsIC8qIFUrMDA3MiBMQVRJTiBTTUFMTCBMRVRURVIgUiAqL1xuXHRYS19zOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA3MywgLyogVSswMDczIExBVElOIFNNQUxMIExFVFRFUiBTICovXG5cdFhLX3Q6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDc0LCAvKiBVKzAwNzQgTEFUSU4gU01BTEwgTEVUVEVSIFQgKi9cblx0WEtfdTogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNzUsIC8qIFUrMDA3NSBMQVRJTiBTTUFMTCBMRVRURVIgVSAqL1xuXHRYS192OiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA3NiwgLyogVSswMDc2IExBVElOIFNNQUxMIExFVFRFUiBWICovXG5cdFhLX3c6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDc3LCAvKiBVKzAwNzcgTEFUSU4gU01BTEwgTEVUVEVSIFcgKi9cblx0WEtfeDogICAgICAgICAgICAgICAgICAgICAgICAgICAweDAwNzgsIC8qIFUrMDA3OCBMQVRJTiBTTUFMTCBMRVRURVIgWCAqL1xuXHRYS195OiAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDA3OSwgLyogVSswMDc5IExBVElOIFNNQUxMIExFVFRFUiBZICovXG5cdFhLX3o6ICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDdhLCAvKiBVKzAwN0EgTEFUSU4gU01BTEwgTEVUVEVSIFogKi9cblx0WEtfYnJhY2VsZWZ0OiAgICAgICAgICAgICAgICAgICAweDAwN2IsIC8qIFUrMDA3QiBMRUZUIENVUkxZIEJSQUNLRVQgKi9cblx0WEtfYmFyOiAgICAgICAgICAgICAgICAgICAgICAgICAweDAwN2MsIC8qIFUrMDA3QyBWRVJUSUNBTCBMSU5FICovXG5cdFhLX2JyYWNlcmlnaHQ6ICAgICAgICAgICAgICAgICAgMHgwMDdkLCAvKiBVKzAwN0QgUklHSFQgQ1VSTFkgQlJBQ0tFVCAqL1xuXHRYS19hc2NpaXRpbGRlOiAgICAgICAgICAgICAgICAgIDB4MDA3ZSwgLyogVSswMDdFIFRJTERFICovXG5cblx0WEtfbm9icmVha3NwYWNlOiAgICAgICAgICAgICAgICAweDAwYTAsIC8qIFUrMDBBMCBOTy1CUkVBSyBTUEFDRSAqL1xuXHRYS19leGNsYW1kb3duOiAgICAgICAgICAgICAgICAgIDB4MDBhMSwgLyogVSswMEExIElOVkVSVEVEIEVYQ0xBTUFUSU9OIE1BUksgKi9cblx0WEtfY2VudDogICAgICAgICAgICAgICAgICAgICAgICAweDAwYTIsIC8qIFUrMDBBMiBDRU5UIFNJR04gKi9cblx0WEtfc3Rlcmxpbmc6ICAgICAgICAgICAgICAgICAgICAweDAwYTMsIC8qIFUrMDBBMyBQT1VORCBTSUdOICovXG5cdFhLX2N1cnJlbmN5OiAgICAgICAgICAgICAgICAgICAgMHgwMGE0LCAvKiBVKzAwQTQgQ1VSUkVOQ1kgU0lHTiAqL1xuXHRYS195ZW46ICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDBhNSwgLyogVSswMEE1IFlFTiBTSUdOICovXG5cdFhLX2Jyb2tlbmJhcjogICAgICAgICAgICAgICAgICAgMHgwMGE2LCAvKiBVKzAwQTYgQlJPS0VOIEJBUiAqL1xuXHRYS19zZWN0aW9uOiAgICAgICAgICAgICAgICAgICAgIDB4MDBhNywgLyogVSswMEE3IFNFQ1RJT04gU0lHTiAqL1xuXHRYS19kaWFlcmVzaXM6ICAgICAgICAgICAgICAgICAgIDB4MDBhOCwgLyogVSswMEE4IERJQUVSRVNJUyAqL1xuXHRYS19jb3B5cmlnaHQ6ICAgICAgICAgICAgICAgICAgIDB4MDBhOSwgLyogVSswMEE5IENPUFlSSUdIVCBTSUdOICovXG5cdFhLX29yZGZlbWluaW5lOiAgICAgICAgICAgICAgICAgMHgwMGFhLCAvKiBVKzAwQUEgRkVNSU5JTkUgT1JESU5BTCBJTkRJQ0FUT1IgKi9cblx0WEtfZ3VpbGxlbW90bGVmdDogICAgICAgICAgICAgICAweDAwYWIsIC8qIFUrMDBBQiBMRUZULVBPSU5USU5HIERPVUJMRSBBTkdMRSBRVU9UQVRJT04gTUFSSyAqL1xuXHRYS19ub3RzaWduOiAgICAgICAgICAgICAgICAgICAgIDB4MDBhYywgLyogVSswMEFDIE5PVCBTSUdOICovXG5cdFhLX2h5cGhlbjogICAgICAgICAgICAgICAgICAgICAgMHgwMGFkLCAvKiBVKzAwQUQgU09GVCBIWVBIRU4gKi9cblx0WEtfcmVnaXN0ZXJlZDogICAgICAgICAgICAgICAgICAweDAwYWUsIC8qIFUrMDBBRSBSRUdJU1RFUkVEIFNJR04gKi9cblx0WEtfbWFjcm9uOiAgICAgICAgICAgICAgICAgICAgICAweDAwYWYsIC8qIFUrMDBBRiBNQUNST04gKi9cblx0WEtfZGVncmVlOiAgICAgICAgICAgICAgICAgICAgICAweDAwYjAsIC8qIFUrMDBCMCBERUdSRUUgU0lHTiAqL1xuXHRYS19wbHVzbWludXM6ICAgICAgICAgICAgICAgICAgIDB4MDBiMSwgLyogVSswMEIxIFBMVVMtTUlOVVMgU0lHTiAqL1xuXHRYS190d29zdXBlcmlvcjogICAgICAgICAgICAgICAgIDB4MDBiMiwgLyogVSswMEIyIFNVUEVSU0NSSVBUIFRXTyAqL1xuXHRYS190aHJlZXN1cGVyaW9yOiAgICAgICAgICAgICAgIDB4MDBiMywgLyogVSswMEIzIFNVUEVSU0NSSVBUIFRIUkVFICovXG5cdFhLX2FjdXRlOiAgICAgICAgICAgICAgICAgICAgICAgMHgwMGI0LCAvKiBVKzAwQjQgQUNVVEUgQUNDRU5UICovXG5cdFhLX211OiAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMGI1LCAvKiBVKzAwQjUgTUlDUk8gU0lHTiAqL1xuXHRYS19wYXJhZ3JhcGg6ICAgICAgICAgICAgICAgICAgIDB4MDBiNiwgLyogVSswMEI2IFBJTENST1cgU0lHTiAqL1xuXHRYS19wZXJpb2RjZW50ZXJlZDogICAgICAgICAgICAgIDB4MDBiNywgLyogVSswMEI3IE1JRERMRSBET1QgKi9cblx0WEtfY2VkaWxsYTogICAgICAgICAgICAgICAgICAgICAweDAwYjgsIC8qIFUrMDBCOCBDRURJTExBICovXG5cdFhLX29uZXN1cGVyaW9yOiAgICAgICAgICAgICAgICAgMHgwMGI5LCAvKiBVKzAwQjkgU1VQRVJTQ1JJUFQgT05FICovXG5cdFhLX21hc2N1bGluZTogICAgICAgICAgICAgICAgICAgMHgwMGJhLCAvKiBVKzAwQkEgTUFTQ1VMSU5FIE9SRElOQUwgSU5ESUNBVE9SICovXG5cdFhLX2d1aWxsZW1vdHJpZ2h0OiAgICAgICAgICAgICAgMHgwMGJiLCAvKiBVKzAwQkIgUklHSFQtUE9JTlRJTkcgRE9VQkxFIEFOR0xFIFFVT1RBVElPTiBNQVJLICovXG5cdFhLX29uZXF1YXJ0ZXI6ICAgICAgICAgICAgICAgICAgMHgwMGJjLCAvKiBVKzAwQkMgVlVMR0FSIEZSQUNUSU9OIE9ORSBRVUFSVEVSICovXG5cdFhLX29uZWhhbGY6ICAgICAgICAgICAgICAgICAgICAgMHgwMGJkLCAvKiBVKzAwQkQgVlVMR0FSIEZSQUNUSU9OIE9ORSBIQUxGICovXG5cdFhLX3RocmVlcXVhcnRlcnM6ICAgICAgICAgICAgICAgMHgwMGJlLCAvKiBVKzAwQkUgVlVMR0FSIEZSQUNUSU9OIFRIUkVFIFFVQVJURVJTICovXG5cdFhLX3F1ZXN0aW9uZG93bjogICAgICAgICAgICAgICAgMHgwMGJmLCAvKiBVKzAwQkYgSU5WRVJURUQgUVVFU1RJT04gTUFSSyAqL1xuXHRYS19BZ3JhdmU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBjMCwgLyogVSswMEMwIExBVElOIENBUElUQUwgTEVUVEVSIEEgV0lUSCBHUkFWRSAqL1xuXHRYS19BYWN1dGU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBjMSwgLyogVSswMEMxIExBVElOIENBUElUQUwgTEVUVEVSIEEgV0lUSCBBQ1VURSAqL1xuXHRYS19BY2lyY3VtZmxleDogICAgICAgICAgICAgICAgIDB4MDBjMiwgLyogVSswMEMyIExBVElOIENBUElUQUwgTEVUVEVSIEEgV0lUSCBDSVJDVU1GTEVYICovXG5cdFhLX0F0aWxkZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGMzLCAvKiBVKzAwQzMgTEFUSU4gQ0FQSVRBTCBMRVRURVIgQSBXSVRIIFRJTERFICovXG5cdFhLX0FkaWFlcmVzaXM6ICAgICAgICAgICAgICAgICAgMHgwMGM0LCAvKiBVKzAwQzQgTEFUSU4gQ0FQSVRBTCBMRVRURVIgQSBXSVRIIERJQUVSRVNJUyAqL1xuXHRYS19BcmluZzogICAgICAgICAgICAgICAgICAgICAgIDB4MDBjNSwgLyogVSswMEM1IExBVElOIENBUElUQUwgTEVUVEVSIEEgV0lUSCBSSU5HIEFCT1ZFICovXG5cdFhLX0FFOiAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwMGM2LCAvKiBVKzAwQzYgTEFUSU4gQ0FQSVRBTCBMRVRURVIgQUUgKi9cblx0WEtfQ2NlZGlsbGE6ICAgICAgICAgICAgICAgICAgICAweDAwYzcsIC8qIFUrMDBDNyBMQVRJTiBDQVBJVEFMIExFVFRFUiBDIFdJVEggQ0VESUxMQSAqL1xuXHRYS19FZ3JhdmU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBjOCwgLyogVSswMEM4IExBVElOIENBUElUQUwgTEVUVEVSIEUgV0lUSCBHUkFWRSAqL1xuXHRYS19FYWN1dGU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBjOSwgLyogVSswMEM5IExBVElOIENBUElUQUwgTEVUVEVSIEUgV0lUSCBBQ1VURSAqL1xuXHRYS19FY2lyY3VtZmxleDogICAgICAgICAgICAgICAgIDB4MDBjYSwgLyogVSswMENBIExBVElOIENBUElUQUwgTEVUVEVSIEUgV0lUSCBDSVJDVU1GTEVYICovXG5cdFhLX0VkaWFlcmVzaXM6ICAgICAgICAgICAgICAgICAgMHgwMGNiLCAvKiBVKzAwQ0IgTEFUSU4gQ0FQSVRBTCBMRVRURVIgRSBXSVRIIERJQUVSRVNJUyAqL1xuXHRYS19JZ3JhdmU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBjYywgLyogVSswMENDIExBVElOIENBUElUQUwgTEVUVEVSIEkgV0lUSCBHUkFWRSAqL1xuXHRYS19JYWN1dGU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBjZCwgLyogVSswMENEIExBVElOIENBUElUQUwgTEVUVEVSIEkgV0lUSCBBQ1VURSAqL1xuXHRYS19JY2lyY3VtZmxleDogICAgICAgICAgICAgICAgIDB4MDBjZSwgLyogVSswMENFIExBVElOIENBUElUQUwgTEVUVEVSIEkgV0lUSCBDSVJDVU1GTEVYICovXG5cdFhLX0lkaWFlcmVzaXM6ICAgICAgICAgICAgICAgICAgMHgwMGNmLCAvKiBVKzAwQ0YgTEFUSU4gQ0FQSVRBTCBMRVRURVIgSSBXSVRIIERJQUVSRVNJUyAqL1xuXHRYS19FVEg6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDBkMCwgLyogVSswMEQwIExBVElOIENBUElUQUwgTEVUVEVSIEVUSCAqL1xuXHRYS19FdGg6ICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDBkMCwgLyogZGVwcmVjYXRlZCAqL1xuXHRYS19OdGlsZGU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBkMSwgLyogVSswMEQxIExBVElOIENBUElUQUwgTEVUVEVSIE4gV0lUSCBUSUxERSAqL1xuXHRYS19PZ3JhdmU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBkMiwgLyogVSswMEQyIExBVElOIENBUElUQUwgTEVUVEVSIE8gV0lUSCBHUkFWRSAqL1xuXHRYS19PYWN1dGU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBkMywgLyogVSswMEQzIExBVElOIENBUElUQUwgTEVUVEVSIE8gV0lUSCBBQ1VURSAqL1xuXHRYS19PY2lyY3VtZmxleDogICAgICAgICAgICAgICAgIDB4MDBkNCwgLyogVSswMEQ0IExBVElOIENBUElUQUwgTEVUVEVSIE8gV0lUSCBDSVJDVU1GTEVYICovXG5cdFhLX090aWxkZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGQ1LCAvKiBVKzAwRDUgTEFUSU4gQ0FQSVRBTCBMRVRURVIgTyBXSVRIIFRJTERFICovXG5cdFhLX09kaWFlcmVzaXM6ICAgICAgICAgICAgICAgICAgMHgwMGQ2LCAvKiBVKzAwRDYgTEFUSU4gQ0FQSVRBTCBMRVRURVIgTyBXSVRIIERJQUVSRVNJUyAqL1xuXHRYS19tdWx0aXBseTogICAgICAgICAgICAgICAgICAgIDB4MDBkNywgLyogVSswMEQ3IE1VTFRJUExJQ0FUSU9OIFNJR04gKi9cblx0WEtfT3NsYXNoOiAgICAgICAgICAgICAgICAgICAgICAweDAwZDgsIC8qIFUrMDBEOCBMQVRJTiBDQVBJVEFMIExFVFRFUiBPIFdJVEggU1RST0tFICovXG5cdFhLX09vYmxpcXVlOiAgICAgICAgICAgICAgICAgICAgMHgwMGQ4LCAvKiBVKzAwRDggTEFUSU4gQ0FQSVRBTCBMRVRURVIgTyBXSVRIIFNUUk9LRSAqL1xuXHRYS19VZ3JhdmU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBkOSwgLyogVSswMEQ5IExBVElOIENBUElUQUwgTEVUVEVSIFUgV0lUSCBHUkFWRSAqL1xuXHRYS19VYWN1dGU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBkYSwgLyogVSswMERBIExBVElOIENBUElUQUwgTEVUVEVSIFUgV0lUSCBBQ1VURSAqL1xuXHRYS19VY2lyY3VtZmxleDogICAgICAgICAgICAgICAgIDB4MDBkYiwgLyogVSswMERCIExBVElOIENBUElUQUwgTEVUVEVSIFUgV0lUSCBDSVJDVU1GTEVYICovXG5cdFhLX1VkaWFlcmVzaXM6ICAgICAgICAgICAgICAgICAgMHgwMGRjLCAvKiBVKzAwREMgTEFUSU4gQ0FQSVRBTCBMRVRURVIgVSBXSVRIIERJQUVSRVNJUyAqL1xuXHRYS19ZYWN1dGU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBkZCwgLyogVSswMEREIExBVElOIENBUElUQUwgTEVUVEVSIFkgV0lUSCBBQ1VURSAqL1xuXHRYS19USE9STjogICAgICAgICAgICAgICAgICAgICAgIDB4MDBkZSwgLyogVSswMERFIExBVElOIENBUElUQUwgTEVUVEVSIFRIT1JOICovXG5cdFhLX1Rob3JuOiAgICAgICAgICAgICAgICAgICAgICAgMHgwMGRlLCAvKiBkZXByZWNhdGVkICovXG5cdFhLX3NzaGFycDogICAgICAgICAgICAgICAgICAgICAgMHgwMGRmLCAvKiBVKzAwREYgTEFUSU4gU01BTEwgTEVUVEVSIFNIQVJQIFMgKi9cblx0WEtfYWdyYXZlOiAgICAgICAgICAgICAgICAgICAgICAweDAwZTAsIC8qIFUrMDBFMCBMQVRJTiBTTUFMTCBMRVRURVIgQSBXSVRIIEdSQVZFICovXG5cdFhLX2FhY3V0ZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGUxLCAvKiBVKzAwRTEgTEFUSU4gU01BTEwgTEVUVEVSIEEgV0lUSCBBQ1VURSAqL1xuXHRYS19hY2lyY3VtZmxleDogICAgICAgICAgICAgICAgIDB4MDBlMiwgLyogVSswMEUyIExBVElOIFNNQUxMIExFVFRFUiBBIFdJVEggQ0lSQ1VNRkxFWCAqL1xuXHRYS19hdGlsZGU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBlMywgLyogVSswMEUzIExBVElOIFNNQUxMIExFVFRFUiBBIFdJVEggVElMREUgKi9cblx0WEtfYWRpYWVyZXNpczogICAgICAgICAgICAgICAgICAweDAwZTQsIC8qIFUrMDBFNCBMQVRJTiBTTUFMTCBMRVRURVIgQSBXSVRIIERJQUVSRVNJUyAqL1xuXHRYS19hcmluZzogICAgICAgICAgICAgICAgICAgICAgIDB4MDBlNSwgLyogVSswMEU1IExBVElOIFNNQUxMIExFVFRFUiBBIFdJVEggUklORyBBQk9WRSAqL1xuXHRYS19hZTogICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDBlNiwgLyogVSswMEU2IExBVElOIFNNQUxMIExFVFRFUiBBRSAqL1xuXHRYS19jY2VkaWxsYTogICAgICAgICAgICAgICAgICAgIDB4MDBlNywgLyogVSswMEU3IExBVElOIFNNQUxMIExFVFRFUiBDIFdJVEggQ0VESUxMQSAqL1xuXHRYS19lZ3JhdmU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBlOCwgLyogVSswMEU4IExBVElOIFNNQUxMIExFVFRFUiBFIFdJVEggR1JBVkUgKi9cblx0WEtfZWFjdXRlOiAgICAgICAgICAgICAgICAgICAgICAweDAwZTksIC8qIFUrMDBFOSBMQVRJTiBTTUFMTCBMRVRURVIgRSBXSVRIIEFDVVRFICovXG5cdFhLX2VjaXJjdW1mbGV4OiAgICAgICAgICAgICAgICAgMHgwMGVhLCAvKiBVKzAwRUEgTEFUSU4gU01BTEwgTEVUVEVSIEUgV0lUSCBDSVJDVU1GTEVYICovXG5cdFhLX2VkaWFlcmVzaXM6ICAgICAgICAgICAgICAgICAgMHgwMGViLCAvKiBVKzAwRUIgTEFUSU4gU01BTEwgTEVUVEVSIEUgV0lUSCBESUFFUkVTSVMgKi9cblx0WEtfaWdyYXZlOiAgICAgICAgICAgICAgICAgICAgICAweDAwZWMsIC8qIFUrMDBFQyBMQVRJTiBTTUFMTCBMRVRURVIgSSBXSVRIIEdSQVZFICovXG5cdFhLX2lhY3V0ZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGVkLCAvKiBVKzAwRUQgTEFUSU4gU01BTEwgTEVUVEVSIEkgV0lUSCBBQ1VURSAqL1xuXHRYS19pY2lyY3VtZmxleDogICAgICAgICAgICAgICAgIDB4MDBlZSwgLyogVSswMEVFIExBVElOIFNNQUxMIExFVFRFUiBJIFdJVEggQ0lSQ1VNRkxFWCAqL1xuXHRYS19pZGlhZXJlc2lzOiAgICAgICAgICAgICAgICAgIDB4MDBlZiwgLyogVSswMEVGIExBVElOIFNNQUxMIExFVFRFUiBJIFdJVEggRElBRVJFU0lTICovXG5cdFhLX2V0aDogICAgICAgICAgICAgICAgICAgICAgICAgMHgwMGYwLCAvKiBVKzAwRjAgTEFUSU4gU01BTEwgTEVUVEVSIEVUSCAqL1xuXHRYS19udGlsZGU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBmMSwgLyogVSswMEYxIExBVElOIFNNQUxMIExFVFRFUiBOIFdJVEggVElMREUgKi9cblx0WEtfb2dyYXZlOiAgICAgICAgICAgICAgICAgICAgICAweDAwZjIsIC8qIFUrMDBGMiBMQVRJTiBTTUFMTCBMRVRURVIgTyBXSVRIIEdSQVZFICovXG5cdFhLX29hY3V0ZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGYzLCAvKiBVKzAwRjMgTEFUSU4gU01BTEwgTEVUVEVSIE8gV0lUSCBBQ1VURSAqL1xuXHRYS19vY2lyY3VtZmxleDogICAgICAgICAgICAgICAgIDB4MDBmNCwgLyogVSswMEY0IExBVElOIFNNQUxMIExFVFRFUiBPIFdJVEggQ0lSQ1VNRkxFWCAqL1xuXHRYS19vdGlsZGU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBmNSwgLyogVSswMEY1IExBVElOIFNNQUxMIExFVFRFUiBPIFdJVEggVElMREUgKi9cblx0WEtfb2RpYWVyZXNpczogICAgICAgICAgICAgICAgICAweDAwZjYsIC8qIFUrMDBGNiBMQVRJTiBTTUFMTCBMRVRURVIgTyBXSVRIIERJQUVSRVNJUyAqL1xuXHRYS19kaXZpc2lvbjogICAgICAgICAgICAgICAgICAgIDB4MDBmNywgLyogVSswMEY3IERJVklTSU9OIFNJR04gKi9cblx0WEtfb3NsYXNoOiAgICAgICAgICAgICAgICAgICAgICAweDAwZjgsIC8qIFUrMDBGOCBMQVRJTiBTTUFMTCBMRVRURVIgTyBXSVRIIFNUUk9LRSAqL1xuXHRYS19vb2JsaXF1ZTogICAgICAgICAgICAgICAgICAgIDB4MDBmOCwgLyogVSswMEY4IExBVElOIFNNQUxMIExFVFRFUiBPIFdJVEggU1RST0tFICovXG5cdFhLX3VncmF2ZTogICAgICAgICAgICAgICAgICAgICAgMHgwMGY5LCAvKiBVKzAwRjkgTEFUSU4gU01BTEwgTEVUVEVSIFUgV0lUSCBHUkFWRSAqL1xuXHRYS191YWN1dGU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBmYSwgLyogVSswMEZBIExBVElOIFNNQUxMIExFVFRFUiBVIFdJVEggQUNVVEUgKi9cblx0WEtfdWNpcmN1bWZsZXg6ICAgICAgICAgICAgICAgICAweDAwZmIsIC8qIFUrMDBGQiBMQVRJTiBTTUFMTCBMRVRURVIgVSBXSVRIIENJUkNVTUZMRVggKi9cblx0WEtfdWRpYWVyZXNpczogICAgICAgICAgICAgICAgICAweDAwZmMsIC8qIFUrMDBGQyBMQVRJTiBTTUFMTCBMRVRURVIgVSBXSVRIIERJQUVSRVNJUyAqL1xuXHRYS195YWN1dGU6ICAgICAgICAgICAgICAgICAgICAgIDB4MDBmZCwgLyogVSswMEZEIExBVElOIFNNQUxMIExFVFRFUiBZIFdJVEggQUNVVEUgKi9cblx0WEtfdGhvcm46ICAgICAgICAgICAgICAgICAgICAgICAweDAwZmUsIC8qIFUrMDBGRSBMQVRJTiBTTUFMTCBMRVRURVIgVEhPUk4gKi9cblx0WEtfeWRpYWVyZXNpczogICAgICAgICAgICAgICAgICAweDAwZmYgIC8qIFUrMDBGRiBMQVRJTiBTTUFMTCBMRVRURVIgWSBXSVRIIERJQUVSRVNJUyAqL1xufTtcblxuXG4vKipcbiAqIE1hcHBpbmdzIGZyb20gVW5pY29kZSBjb2RlcG9pbnRzIHRvIHRoZSBrZXlzeW0gdmFsdWVzIChhbmQgb3B0aW9uYWxseSwga2V5XG4gKiBuYW1lcykgZXhwZWN0ZWQgYnkgdGhlIFJGQiBwcm90b2NvbC5cbiAqL1xudmFyIGtleW5hbWVzID0gbnVsbDtcbnZhciBjb2RlcG9pbnRzID0geyczMic6MzIsJzMzJzozMywnMzQnOjM0LCczNSc6MzUsJzM2JzozNiwnMzcnOjM3LCczOCc6MzgsJzM5JzozOSwnNDAnOjQwLCc0MSc6NDEsJzQyJzo0MiwnNDMnOjQzLCc0NCc6NDQsJzQ1Jzo0NSwnNDYnOjQ2LCc0Nyc6NDcsJzQ4Jzo0OCwnNDknOjQ5LCc1MCc6NTAsJzUxJzo1MSwnNTInOjUyLCc1Myc6NTMsJzU0Jzo1NCwnNTUnOjU1LCc1Nic6NTYsJzU3Jzo1NywnNTgnOjU4LCc1OSc6NTksJzYwJzo2MCwnNjEnOjYxLCc2Mic6NjIsJzYzJzo2MywnNjQnOjY0LCc2NSc6NjUsJzY2Jzo2NiwnNjcnOjY3LCc2OCc6NjgsJzY5Jzo2OSwnNzAnOjcwLCc3MSc6NzEsJzcyJzo3MiwnNzMnOjczLCc3NCc6NzQsJzc1Jzo3NSwnNzYnOjc2LCc3Nyc6NzcsJzc4Jzo3OCwnNzknOjc5LCc4MCc6ODAsJzgxJzo4MSwnODInOjgyLCc4Myc6ODMsJzg0Jzo4NCwnODUnOjg1LCc4Nic6ODYsJzg3Jzo4NywnODgnOjg4LCc4OSc6ODksJzkwJzo5MCwnOTEnOjkxLCc5Mic6OTIsJzkzJzo5MywnOTQnOjk0LCc5NSc6OTUsJzk2Jzo5NiwnOTcnOjk3LCc5OCc6OTgsJzk5Jzo5OSwnMTAwJzoxMDAsJzEwMSc6MTAxLCcxMDInOjEwMiwnMTAzJzoxMDMsJzEwNCc6MTA0LCcxMDUnOjEwNSwnMTA2JzoxMDYsJzEwNyc6MTA3LCcxMDgnOjEwOCwnMTA5JzoxMDksJzExMCc6MTEwLCcxMTEnOjExMSwnMTEyJzoxMTIsJzExMyc6MTEzLCcxMTQnOjExNCwnMTE1JzoxMTUsJzExNic6MTE2LCcxMTcnOjExNywnMTE4JzoxMTgsJzExOSc6MTE5LCcxMjAnOjEyMCwnMTIxJzoxMjEsJzEyMic6MTIyLCcxMjMnOjEyMywnMTI0JzoxMjQsJzEyNSc6MTI1LCcxMjYnOjEyNiwnMTYwJzoxNjAsJzE2MSc6MTYxLCcxNjInOjE2MiwnMTYzJzoxNjMsJzE2NCc6MTY0LCcxNjUnOjE2NSwnMTY2JzoxNjYsJzE2Nyc6MTY3LCcxNjgnOjE2OCwnMTY5JzoxNjksJzE3MCc6MTcwLCcxNzEnOjE3MSwnMTcyJzoxNzIsJzE3Myc6MTczLCcxNzQnOjE3NCwnMTc1JzoxNzUsJzE3Nic6MTc2LCcxNzcnOjE3NywnMTc4JzoxNzgsJzE3OSc6MTc5LCcxODAnOjE4MCwnMTgxJzoxODEsJzE4Mic6MTgyLCcxODMnOjE4MywnMTg0JzoxODQsJzE4NSc6MTg1LCcxODYnOjE4NiwnMTg3JzoxODcsJzE4OCc6MTg4LCcxODknOjE4OSwnMTkwJzoxOTAsJzE5MSc6MTkxLCcxOTInOjE5MiwnMTkzJzoxOTMsJzE5NCc6MTk0LCcxOTUnOjE5NSwnMTk2JzoxOTYsJzE5Nyc6MTk3LCcxOTgnOjE5OCwnMTk5JzoxOTksJzIwMCc6MjAwLCcyMDEnOjIwMSwnMjAyJzoyMDIsJzIwMyc6MjAzLCcyMDQnOjIwNCwnMjA1JzoyMDUsJzIwNic6MjA2LCcyMDcnOjIwNywnMjA4JzoyMDgsJzIwOSc6MjA5LCcyMTAnOjIxMCwnMjExJzoyMTEsJzIxMic6MjEyLCcyMTMnOjIxMywnMjE0JzoyMTQsJzIxNSc6MjE1LCcyMTYnOjIxNiwnMjE3JzoyMTcsJzIxOCc6MjE4LCcyMTknOjIxOSwnMjIwJzoyMjAsJzIyMSc6MjIxLCcyMjInOjIyMiwnMjIzJzoyMjMsJzIyNCc6MjI0LCcyMjUnOjIyNSwnMjI2JzoyMjYsJzIyNyc6MjI3LCcyMjgnOjIyOCwnMjI5JzoyMjksJzIzMCc6MjMwLCcyMzEnOjIzMSwnMjMyJzoyMzIsJzIzMyc6MjMzLCcyMzQnOjIzNCwnMjM1JzoyMzUsJzIzNic6MjM2LCcyMzcnOjIzNywnMjM4JzoyMzgsJzIzOSc6MjM5LCcyNDAnOjI0MCwnMjQxJzoyNDEsJzI0Mic6MjQyLCcyNDMnOjI0MywnMjQ0JzoyNDQsJzI0NSc6MjQ1LCcyNDYnOjI0NiwnMjQ3JzoyNDcsJzI0OCc6MjQ4LCcyNDknOjI0OSwnMjUwJzoyNTAsJzI1MSc6MjUxLCcyNTInOjI1MiwnMjUzJzoyNTMsJzI1NCc6MjU0LCcyNTUnOjI1NSwnMjU2Jzo5NjAsJzI1Nyc6OTkyLCcyNTgnOjQ1MSwnMjU5Jzo0ODMsJzI2MCc6NDE3LCcyNjEnOjQzMywnMjYyJzo0NTQsJzI2Myc6NDg2LCcyNjQnOjcxMCwnMjY1Jzo3NDIsJzI2Nic6NzA5LCcyNjcnOjc0MSwnMjY4Jzo0NTYsJzI2OSc6NDg4LCcyNzAnOjQ2MywnMjcxJzo0OTUsJzI3Mic6NDY0LCcyNzMnOjQ5NiwnMjc0Jzo5MzgsJzI3NSc6OTU0LCcyNzgnOjk3MiwnMjc5JzoxMDA0LCcyODAnOjQ1OCwnMjgxJzo0OTAsJzI4Mic6NDYwLCcyODMnOjQ5MiwnMjg0Jzo3MjgsJzI4NSc6NzYwLCcyODYnOjY4MywnMjg3Jzo2OTksJzI4OCc6NzI1LCcyODknOjc1NywnMjkwJzo5MzksJzI5MSc6OTU1LCcyOTInOjY3OCwnMjkzJzo2OTQsJzI5NCc6NjczLCcyOTUnOjY4OSwnMjk2Jzo5MzMsJzI5Nyc6OTQ5LCcyOTgnOjk3NSwnMjk5JzoxMDA3LCczMDAnOjE2Nzc3NTE2LCczMDEnOjE2Nzc3NTE3LCczMDInOjk2NywnMzAzJzo5OTksJzMwNCc6NjgxLCczMDUnOjY5NywnMzA4Jzo2ODQsJzMwOSc6NzAwLCczMTAnOjk3OSwnMzExJzoxMDExLCczMTInOjkzMCwnMzEzJzo0NTMsJzMxNCc6NDg1LCczMTUnOjkzNCwnMzE2Jzo5NTAsJzMxNyc6NDIxLCczMTgnOjQzNywnMzIxJzo0MTksJzMyMic6NDM1LCczMjMnOjQ2NSwnMzI0Jzo0OTcsJzMyNSc6OTc3LCczMjYnOjEwMDksJzMyNyc6NDY2LCczMjgnOjQ5OCwnMzMwJzo5NTcsJzMzMSc6OTU5LCczMzInOjk3OCwnMzMzJzoxMDEwLCczMzYnOjQ2OSwnMzM3Jzo1MDEsJzMzOCc6NTA1MiwnMzM5Jzo1MDUzLCczNDAnOjQ0OCwnMzQxJzo0ODAsJzM0Mic6OTMxLCczNDMnOjk0NywnMzQ0Jzo0NzIsJzM0NSc6NTA0LCczNDYnOjQyMiwnMzQ3Jzo0MzgsJzM0OCc6NzM0LCczNDknOjc2NiwnMzUwJzo0MjYsJzM1MSc6NDQyLCczNTInOjQyNSwnMzUzJzo0NDEsJzM1NCc6NDc4LCczNTUnOjUxMCwnMzU2Jzo0MjcsJzM1Nyc6NDQzLCczNTgnOjk0MCwnMzU5Jzo5NTYsJzM2MCc6OTg5LCczNjEnOjEwMjEsJzM2Mic6OTkwLCczNjMnOjEwMjIsJzM2NCc6NzMzLCczNjUnOjc2NSwnMzY2Jzo0NzMsJzM2Nyc6NTA1LCczNjgnOjQ3NSwnMzY5Jzo1MDcsJzM3MCc6OTg1LCczNzEnOjEwMTcsJzM3Mic6MTY3Nzc1ODgsJzM3Myc6MTY3Nzc1ODksJzM3NCc6MTY3Nzc1OTAsJzM3NSc6MTY3Nzc1OTEsJzM3Nic6NTA1NCwnMzc3Jzo0MjgsJzM3OCc6NDQ0LCczNzknOjQzMSwnMzgwJzo0NDcsJzM4MSc6NDMwLCczODInOjQ0NiwnMzk5JzoxNjc3NzYxNSwnNDAyJzoyMjk0LCc0MTUnOjE2Nzc3NjMxLCc0MTYnOjE2Nzc3NjMyLCc0MTcnOjE2Nzc3NjMzLCc0MzEnOjE2Nzc3NjQ3LCc0MzInOjE2Nzc3NjQ4LCc0MzcnOjE2Nzc3NjUzLCc0MzgnOjE2Nzc3NjU0LCc0MzknOjE2Nzc3NjU1LCc0NjYnOjE2Nzc3NjgxLCc0ODYnOjE2Nzc3NzAyLCc0ODcnOjE2Nzc3NzAzLCc2MDEnOjE2Nzc3ODE3LCc2MjknOjE2Nzc3ODQ1LCc2NTgnOjE2Nzc3ODc0LCc3MTEnOjQzOSwnNzI4Jzo0MTgsJzcyOSc6NTExLCc3MzEnOjQzNCwnNzMzJzo0NDUsJzkwMSc6MTk2NiwnOTAyJzoxOTUzLCc5MDQnOjE5NTQsJzkwNSc6MTk1NSwnOTA2JzoxOTU2LCc5MDgnOjE5NTksJzkxMCc6MTk2MCwnOTExJzoxOTYzLCc5MTInOjE5NzQsJzkxMyc6MTk4NSwnOTE0JzoxOTg2LCc5MTUnOjE5ODcsJzkxNic6MTk4OCwnOTE3JzoxOTg5LCc5MTgnOjE5OTAsJzkxOSc6MTk5MSwnOTIwJzoxOTkyLCc5MjEnOjE5OTMsJzkyMic6MTk5NCwnOTIzJzoxOTk1LCc5MjQnOjE5OTYsJzkyNSc6MTk5NywnOTI2JzoxOTk4LCc5MjcnOjE5OTksJzkyOCc6MjAwMCwnOTI5JzoyMDAxLCc5MzEnOjIwMDIsJzkzMic6MjAwNCwnOTMzJzoyMDA1LCc5MzQnOjIwMDYsJzkzNSc6MjAwNywnOTM2JzoyMDA4LCc5MzcnOjIwMDksJzkzOCc6MTk1NywnOTM5JzoxOTYxLCc5NDAnOjE5NjksJzk0MSc6MTk3MCwnOTQyJzoxOTcxLCc5NDMnOjE5NzIsJzk0NCc6MTk3OCwnOTQ1JzoyMDE3LCc5NDYnOjIwMTgsJzk0Nyc6MjAxOSwnOTQ4JzoyMDIwLCc5NDknOjIwMjEsJzk1MCc6MjAyMiwnOTUxJzoyMDIzLCc5NTInOjIwMjQsJzk1Myc6MjAyNSwnOTU0JzoyMDI2LCc5NTUnOjIwMjcsJzk1Nic6MjAyOCwnOTU3JzoyMDI5LCc5NTgnOjIwMzAsJzk1OSc6MjAzMSwnOTYwJzoyMDMyLCc5NjEnOjIwMzMsJzk2Mic6MjAzNSwnOTYzJzoyMDM0LCc5NjQnOjIwMzYsJzk2NSc6MjAzNywnOTY2JzoyMDM4LCc5NjcnOjIwMzksJzk2OCc6MjA0MCwnOTY5JzoyMDQxLCc5NzAnOjE5NzMsJzk3MSc6MTk3NywnOTcyJzoxOTc1LCc5NzMnOjE5NzYsJzk3NCc6MTk3OSwnMTAyNSc6MTcxNSwnMTAyNic6MTcxMywnMTAyNyc6MTcxNCwnMTAyOCc6MTcxNiwnMTAyOSc6MTcxNywnMTAzMCc6MTcxOCwnMTAzMSc6MTcxOSwnMTAzMic6MTcyMCwnMTAzMyc6MTcyMSwnMTAzNCc6MTcyMiwnMTAzNSc6MTcyMywnMTAzNic6MTcyNCwnMTAzOCc6MTcyNiwnMTAzOSc6MTcyNywnMTA0MCc6MTc2MSwnMTA0MSc6MTc2MiwnMTA0Mic6MTc4MywnMTA0Myc6MTc2NywnMTA0NCc6MTc2NCwnMTA0NSc6MTc2NSwnMTA0Nic6MTc4MiwnMTA0Nyc6MTc4NiwnMTA0OCc6MTc2OSwnMTA0OSc6MTc3MCwnMTA1MCc6MTc3MSwnMTA1MSc6MTc3MiwnMTA1Mic6MTc3MywnMTA1Myc6MTc3NCwnMTA1NCc6MTc3NSwnMTA1NSc6MTc3NiwnMTA1Nic6MTc3OCwnMTA1Nyc6MTc3OSwnMTA1OCc6MTc4MCwnMTA1OSc6MTc4MSwnMTA2MCc6MTc2NiwnMTA2MSc6MTc2OCwnMTA2Mic6MTc2MywnMTA2Myc6MTc5MCwnMTA2NCc6MTc4NywnMTA2NSc6MTc4OSwnMTA2Nic6MTc5MSwnMTA2Nyc6MTc4NSwnMTA2OCc6MTc4NCwnMTA2OSc6MTc4OCwnMTA3MCc6MTc2MCwnMTA3MSc6MTc3NywnMTA3Mic6MTcyOSwnMTA3Myc6MTczMCwnMTA3NCc6MTc1MSwnMTA3NSc6MTczNSwnMTA3Nic6MTczMiwnMTA3Nyc6MTczMywnMTA3OCc6MTc1MCwnMTA3OSc6MTc1NCwnMTA4MCc6MTczNywnMTA4MSc6MTczOCwnMTA4Mic6MTczOSwnMTA4Myc6MTc0MCwnMTA4NCc6MTc0MSwnMTA4NSc6MTc0MiwnMTA4Nic6MTc0MywnMTA4Nyc6MTc0NCwnMTA4OCc6MTc0NiwnMTA4OSc6MTc0NywnMTA5MCc6MTc0OCwnMTA5MSc6MTc0OSwnMTA5Mic6MTczNCwnMTA5Myc6MTczNiwnMTA5NCc6MTczMSwnMTA5NSc6MTc1OCwnMTA5Nic6MTc1NSwnMTA5Nyc6MTc1NywnMTA5OCc6MTc1OSwnMTA5OSc6MTc1MywnMTEwMCc6MTc1MiwnMTEwMSc6MTc1NiwnMTEwMic6MTcyOCwnMTEwMyc6MTc0NSwnMTEwNSc6MTY5OSwnMTEwNic6MTY5NywnMTEwNyc6MTY5OCwnMTEwOCc6MTcwMCwnMTEwOSc6MTcwMSwnMTExMCc6MTcwMiwnMTExMSc6MTcwMywnMTExMic6MTcwNCwnMTExMyc6MTcwNSwnMTExNCc6MTcwNiwnMTExNSc6MTcwNywnMTExNic6MTcwOCwnMTExOCc6MTcxMCwnMTExOSc6MTcxMSwnMTE2OCc6MTcyNSwnMTE2OSc6MTcwOSwnMTE3MCc6MTY3NzgzODYsJzExNzEnOjE2Nzc4Mzg3LCcxMTc0JzoxNjc3ODM5MCwnMTE3NSc6MTY3NzgzOTEsJzExNzgnOjE2Nzc4Mzk0LCcxMTc5JzoxNjc3ODM5NSwnMTE4MCc6MTY3NzgzOTYsJzExODEnOjE2Nzc4Mzk3LCcxMTg2JzoxNjc3ODQwMiwnMTE4Nyc6MTY3Nzg0MDMsJzExOTgnOjE2Nzc4NDE0LCcxMTk5JzoxNjc3ODQxNSwnMTIwMCc6MTY3Nzg0MTYsJzEyMDEnOjE2Nzc4NDE3LCcxMjAyJzoxNjc3ODQxOCwnMTIwMyc6MTY3Nzg0MTksJzEyMDYnOjE2Nzc4NDIyLCcxMjA3JzoxNjc3ODQyMywnMTIwOCc6MTY3Nzg0MjQsJzEyMDknOjE2Nzc4NDI1LCcxMjEwJzoxNjc3ODQyNiwnMTIxMSc6MTY3Nzg0MjcsJzEyNDAnOjE2Nzc4NDU2LCcxMjQxJzoxNjc3ODQ1NywnMTI1MCc6MTY3Nzg0NjYsJzEyNTEnOjE2Nzc4NDY3LCcxMjU2JzoxNjc3ODQ3MiwnMTI1Nyc6MTY3Nzg0NzMsJzEyNjInOjE2Nzc4NDc4LCcxMjYzJzoxNjc3ODQ3OSwnMTMyOSc6MTY3Nzg1NDUsJzEzMzAnOjE2Nzc4NTQ2LCcxMzMxJzoxNjc3ODU0NywnMTMzMic6MTY3Nzg1NDgsJzEzMzMnOjE2Nzc4NTQ5LCcxMzM0JzoxNjc3ODU1MCwnMTMzNSc6MTY3Nzg1NTEsJzEzMzYnOjE2Nzc4NTUyLCcxMzM3JzoxNjc3ODU1MywnMTMzOCc6MTY3Nzg1NTQsJzEzMzknOjE2Nzc4NTU1LCcxMzQwJzoxNjc3ODU1NiwnMTM0MSc6MTY3Nzg1NTcsJzEzNDInOjE2Nzc4NTU4LCcxMzQzJzoxNjc3ODU1OSwnMTM0NCc6MTY3Nzg1NjAsJzEzNDUnOjE2Nzc4NTYxLCcxMzQ2JzoxNjc3ODU2MiwnMTM0Nyc6MTY3Nzg1NjMsJzEzNDgnOjE2Nzc4NTY0LCcxMzQ5JzoxNjc3ODU2NSwnMTM1MCc6MTY3Nzg1NjYsJzEzNTEnOjE2Nzc4NTY3LCcxMzUyJzoxNjc3ODU2OCwnMTM1Myc6MTY3Nzg1NjksJzEzNTQnOjE2Nzc4NTcwLCcxMzU1JzoxNjc3ODU3MSwnMTM1Nic6MTY3Nzg1NzIsJzEzNTcnOjE2Nzc4NTczLCcxMzU4JzoxNjc3ODU3NCwnMTM1OSc6MTY3Nzg1NzUsJzEzNjAnOjE2Nzc4NTc2LCcxMzYxJzoxNjc3ODU3NywnMTM2Mic6MTY3Nzg1NzgsJzEzNjMnOjE2Nzc4NTc5LCcxMzY0JzoxNjc3ODU4MCwnMTM2NSc6MTY3Nzg1ODEsJzEzNjYnOjE2Nzc4NTgyLCcxMzcwJzoxNjc3ODU4NiwnMTM3MSc6MTY3Nzg1ODcsJzEzNzInOjE2Nzc4NTg4LCcxMzczJzoxNjc3ODU4OSwnMTM3NCc6MTY3Nzg1OTAsJzEzNzcnOjE2Nzc4NTkzLCcxMzc4JzoxNjc3ODU5NCwnMTM3OSc6MTY3Nzg1OTUsJzEzODAnOjE2Nzc4NTk2LCcxMzgxJzoxNjc3ODU5NywnMTM4Mic6MTY3Nzg1OTgsJzEzODMnOjE2Nzc4NTk5LCcxMzg0JzoxNjc3ODYwMCwnMTM4NSc6MTY3Nzg2MDEsJzEzODYnOjE2Nzc4NjAyLCcxMzg3JzoxNjc3ODYwMywnMTM4OCc6MTY3Nzg2MDQsJzEzODknOjE2Nzc4NjA1LCcxMzkwJzoxNjc3ODYwNiwnMTM5MSc6MTY3Nzg2MDcsJzEzOTInOjE2Nzc4NjA4LCcxMzkzJzoxNjc3ODYwOSwnMTM5NCc6MTY3Nzg2MTAsJzEzOTUnOjE2Nzc4NjExLCcxMzk2JzoxNjc3ODYxMiwnMTM5Nyc6MTY3Nzg2MTMsJzEzOTgnOjE2Nzc4NjE0LCcxMzk5JzoxNjc3ODYxNSwnMTQwMCc6MTY3Nzg2MTYsJzE0MDEnOjE2Nzc4NjE3LCcxNDAyJzoxNjc3ODYxOCwnMTQwMyc6MTY3Nzg2MTksJzE0MDQnOjE2Nzc4NjIwLCcxNDA1JzoxNjc3ODYyMSwnMTQwNic6MTY3Nzg2MjIsJzE0MDcnOjE2Nzc4NjIzLCcxNDA4JzoxNjc3ODYyNCwnMTQwOSc6MTY3Nzg2MjUsJzE0MTAnOjE2Nzc4NjI2LCcxNDExJzoxNjc3ODYyNywnMTQxMic6MTY3Nzg2MjgsJzE0MTMnOjE2Nzc4NjI5LCcxNDE0JzoxNjc3ODYzMCwnMTQxNSc6MTY3Nzg2MzEsJzE0MTcnOjE2Nzc4NjMzLCcxNDE4JzoxNjc3ODYzNCwnMTQ4OCc6MzI5NiwnMTQ4OSc6MzI5NywnMTQ5MCc6MzI5OCwnMTQ5MSc6MzI5OSwnMTQ5Mic6MzMwMCwnMTQ5Myc6MzMwMSwnMTQ5NCc6MzMwMiwnMTQ5NSc6MzMwMywnMTQ5Nic6MzMwNCwnMTQ5Nyc6MzMwNSwnMTQ5OCc6MzMwNiwnMTQ5OSc6MzMwNywnMTUwMCc6MzMwOCwnMTUwMSc6MzMwOSwnMTUwMic6MzMxMCwnMTUwMyc6MzMxMSwnMTUwNCc6MzMxMiwnMTUwNSc6MzMxMywnMTUwNic6MzMxNCwnMTUwNyc6MzMxNSwnMTUwOCc6MzMxNiwnMTUwOSc6MzMxNywnMTUxMCc6MzMxOCwnMTUxMSc6MzMxOSwnMTUxMic6MzMyMCwnMTUxMyc6MzMyMSwnMTUxNCc6MzMyMiwnMTU0OCc6MTQ1MiwnMTU2Myc6MTQ2NywnMTU2Nyc6MTQ3MSwnMTU2OSc6MTQ3MywnMTU3MCc6MTQ3NCwnMTU3MSc6MTQ3NSwnMTU3Mic6MTQ3NiwnMTU3Myc6MTQ3NywnMTU3NCc6MTQ3OCwnMTU3NSc6MTQ3OSwnMTU3Nic6MTQ4MCwnMTU3Nyc6MTQ4MSwnMTU3OCc6MTQ4MiwnMTU3OSc6MTQ4MywnMTU4MCc6MTQ4NCwnMTU4MSc6MTQ4NSwnMTU4Mic6MTQ4NiwnMTU4Myc6MTQ4NywnMTU4NCc6MTQ4OCwnMTU4NSc6MTQ4OSwnMTU4Nic6MTQ5MCwnMTU4Nyc6MTQ5MSwnMTU4OCc6MTQ5MiwnMTU4OSc6MTQ5MywnMTU5MCc6MTQ5NCwnMTU5MSc6MTQ5NSwnMTU5Mic6MTQ5NiwnMTU5Myc6MTQ5NywnMTU5NCc6MTQ5OCwnMTYwMCc6MTUwNCwnMTYwMSc6MTUwNSwnMTYwMic6MTUwNiwnMTYwMyc6MTUwNywnMTYwNCc6MTUwOCwnMTYwNSc6MTUwOSwnMTYwNic6MTUxMCwnMTYwNyc6MTUxMSwnMTYwOCc6MTUxMiwnMTYwOSc6MTUxMywnMTYxMCc6MTUxNCwnMTYxMSc6MTUxNSwnMTYxMic6MTUxNiwnMTYxMyc6MTUxNywnMTYxNCc6MTUxOCwnMTYxNSc6MTUxOSwnMTYxNic6MTUyMCwnMTYxNyc6MTUyMSwnMTYxOCc6MTUyMiwnMTYxOSc6MTY3Nzg4MzUsJzE2MjAnOjE2Nzc4ODM2LCcxNjIxJzoxNjc3ODgzNywnMTYzMic6MTY3Nzg4NDgsJzE2MzMnOjE2Nzc4ODQ5LCcxNjM0JzoxNjc3ODg1MCwnMTYzNSc6MTY3Nzg4NTEsJzE2MzYnOjE2Nzc4ODUyLCcxNjM3JzoxNjc3ODg1MywnMTYzOCc6MTY3Nzg4NTQsJzE2MzknOjE2Nzc4ODU1LCcxNjQwJzoxNjc3ODg1NiwnMTY0MSc6MTY3Nzg4NTcsJzE2NDInOjE2Nzc4ODU4LCcxNjQ4JzoxNjc3ODg2NCwnMTY1Nyc6MTY3Nzg4NzMsJzE2NjInOjE2Nzc4ODc4LCcxNjcwJzoxNjc3ODg4NiwnMTY3Mic6MTY3Nzg4ODgsJzE2ODEnOjE2Nzc4ODk3LCcxNjg4JzoxNjc3ODkwNCwnMTcwMCc6MTY3Nzg5MTYsJzE3MDUnOjE2Nzc4OTIxLCcxNzExJzoxNjc3ODkyNywnMTcyMic6MTY3Nzg5MzgsJzE3MjYnOjE2Nzc4OTQyLCcxNzI5JzoxNjc3ODk0NSwnMTc0MCc6MTY3Nzg5NTYsJzE3NDYnOjE2Nzc4OTYyLCcxNzQ4JzoxNjc3ODk2NCwnMTc3Nic6MTY3Nzg5OTIsJzE3NzcnOjE2Nzc4OTkzLCcxNzc4JzoxNjc3ODk5NCwnMTc3OSc6MTY3Nzg5OTUsJzE3ODAnOjE2Nzc4OTk2LCcxNzgxJzoxNjc3ODk5NywnMTc4Mic6MTY3Nzg5OTgsJzE3ODMnOjE2Nzc4OTk5LCcxNzg0JzoxNjc3OTAwMCwnMTc4NSc6MTY3NzkwMDEsJzM0NTgnOjE2NzgwNjc0LCczNDU5JzoxNjc4MDY3NSwnMzQ2MSc6MTY3ODA2NzcsJzM0NjInOjE2NzgwNjc4LCczNDYzJzoxNjc4MDY3OSwnMzQ2NCc6MTY3ODA2ODAsJzM0NjUnOjE2NzgwNjgxLCczNDY2JzoxNjc4MDY4MiwnMzQ2Nyc6MTY3ODA2ODMsJzM0NjgnOjE2NzgwNjg0LCczNDY5JzoxNjc4MDY4NSwnMzQ3MCc6MTY3ODA2ODYsJzM0NzEnOjE2NzgwNjg3LCczNDcyJzoxNjc4MDY4OCwnMzQ3Myc6MTY3ODA2ODksJzM0NzQnOjE2NzgwNjkwLCczNDc1JzoxNjc4MDY5MSwnMzQ3Nic6MTY3ODA2OTIsJzM0NzcnOjE2NzgwNjkzLCczNDc4JzoxNjc4MDY5NCwnMzQ4Mic6MTY3ODA2OTgsJzM0ODMnOjE2NzgwNjk5LCczNDg0JzoxNjc4MDcwMCwnMzQ4NSc6MTY3ODA3MDEsJzM0ODYnOjE2NzgwNzAyLCczNDg3JzoxNjc4MDcwMywnMzQ4OCc6MTY3ODA3MDQsJzM0ODknOjE2NzgwNzA1LCczNDkwJzoxNjc4MDcwNiwnMzQ5MSc6MTY3ODA3MDcsJzM0OTInOjE2NzgwNzA4LCczNDkzJzoxNjc4MDcwOSwnMzQ5NCc6MTY3ODA3MTAsJzM0OTUnOjE2NzgwNzExLCczNDk2JzoxNjc4MDcxMiwnMzQ5Nyc6MTY3ODA3MTMsJzM0OTgnOjE2NzgwNzE0LCczNDk5JzoxNjc4MDcxNSwnMzUwMCc6MTY3ODA3MTYsJzM1MDEnOjE2NzgwNzE3LCczNTAyJzoxNjc4MDcxOCwnMzUwMyc6MTY3ODA3MTksJzM1MDQnOjE2NzgwNzIwLCczNTA1JzoxNjc4MDcyMSwnMzUwNyc6MTY3ODA3MjMsJzM1MDgnOjE2NzgwNzI0LCczNTA5JzoxNjc4MDcyNSwnMzUxMCc6MTY3ODA3MjYsJzM1MTEnOjE2NzgwNzI3LCczNTEyJzoxNjc4MDcyOCwnMzUxMyc6MTY3ODA3MjksJzM1MTQnOjE2NzgwNzMwLCczNTE1JzoxNjc4MDczMSwnMzUxNyc6MTY3ODA3MzMsJzM1MjAnOjE2NzgwNzM2LCczNTIxJzoxNjc4MDczNywnMzUyMic6MTY3ODA3MzgsJzM1MjMnOjE2NzgwNzM5LCczNTI0JzoxNjc4MDc0MCwnMzUyNSc6MTY3ODA3NDEsJzM1MjYnOjE2NzgwNzQyLCczNTMwJzoxNjc4MDc0NiwnMzUzNSc6MTY3ODA3NTEsJzM1MzYnOjE2NzgwNzUyLCczNTM3JzoxNjc4MDc1MywnMzUzOCc6MTY3ODA3NTQsJzM1MzknOjE2NzgwNzU1LCczNTQwJzoxNjc4MDc1NiwnMzU0Mic6MTY3ODA3NTgsJzM1NDQnOjE2NzgwNzYwLCczNTQ1JzoxNjc4MDc2MSwnMzU0Nic6MTY3ODA3NjIsJzM1NDcnOjE2NzgwNzYzLCczNTQ4JzoxNjc4MDc2NCwnMzU0OSc6MTY3ODA3NjUsJzM1NTAnOjE2NzgwNzY2LCczNTUxJzoxNjc4MDc2NywnMzU3MCc6MTY3ODA3ODYsJzM1NzEnOjE2NzgwNzg3LCczNTcyJzoxNjc4MDc4OCwnMzU4NSc6MzQ4OSwnMzU4Nic6MzQ5MCwnMzU4Nyc6MzQ5MSwnMzU4OCc6MzQ5MiwnMzU4OSc6MzQ5MywnMzU5MCc6MzQ5NCwnMzU5MSc6MzQ5NSwnMzU5Mic6MzQ5NiwnMzU5Myc6MzQ5NywnMzU5NCc6MzQ5OCwnMzU5NSc6MzQ5OSwnMzU5Nic6MzUwMCwnMzU5Nyc6MzUwMSwnMzU5OCc6MzUwMiwnMzU5OSc6MzUwMywnMzYwMCc6MzUwNCwnMzYwMSc6MzUwNSwnMzYwMic6MzUwNiwnMzYwMyc6MzUwNywnMzYwNCc6MzUwOCwnMzYwNSc6MzUwOSwnMzYwNic6MzUxMCwnMzYwNyc6MzUxMSwnMzYwOCc6MzUxMiwnMzYwOSc6MzUxMywnMzYxMCc6MzUxNCwnMzYxMSc6MzUxNSwnMzYxMic6MzUxNiwnMzYxMyc6MzUxNywnMzYxNCc6MzUxOCwnMzYxNSc6MzUxOSwnMzYxNic6MzUyMCwnMzYxNyc6MzUyMSwnMzYxOCc6MzUyMiwnMzYxOSc6MzUyMywnMzYyMCc6MzUyNCwnMzYyMSc6MzUyNSwnMzYyMic6MzUyNiwnMzYyMyc6MzUyNywnMzYyNCc6MzUyOCwnMzYyNSc6MzUyOSwnMzYyNic6MzUzMCwnMzYyNyc6MzUzMSwnMzYyOCc6MzUzMiwnMzYyOSc6MzUzMywnMzYzMCc6MzUzNCwnMzYzMSc6MzUzNSwnMzYzMic6MzUzNiwnMzYzMyc6MzUzNywnMzYzNCc6MzUzOCwnMzYzNSc6MzUzOSwnMzYzNic6MzU0MCwnMzYzNyc6MzU0MSwnMzYzOCc6MzU0MiwnMzYzOSc6MzU0MywnMzY0MCc6MzU0NCwnMzY0MSc6MzU0NSwnMzY0Mic6MzU0NiwnMzY0Nyc6MzU1MSwnMzY0OCc6MzU1MiwnMzY0OSc6MzU1MywnMzY1MCc6MzU1NCwnMzY1MSc6MzU1NSwnMzY1Mic6MzU1NiwnMzY1Myc6MzU1NywnMzY1NCc6MzU1OCwnMzY1NSc6MzU1OSwnMzY1Nic6MzU2MCwnMzY1Nyc6MzU2MSwnMzY1OCc6MzU2MiwnMzY1OSc6MzU2MywnMzY2MCc6MzU2NCwnMzY2MSc6MzU2NSwnMzY2NCc6MzU2OCwnMzY2NSc6MzU2OSwnMzY2Nic6MzU3MCwnMzY2Nyc6MzU3MSwnMzY2OCc6MzU3MiwnMzY2OSc6MzU3MywnMzY3MCc6MzU3NCwnMzY3MSc6MzU3NSwnMzY3Mic6MzU3NiwnMzY3Myc6MzU3NywnNDMwNCc6MTY3ODE1MjAsJzQzMDUnOjE2NzgxNTIxLCc0MzA2JzoxNjc4MTUyMiwnNDMwNyc6MTY3ODE1MjMsJzQzMDgnOjE2NzgxNTI0LCc0MzA5JzoxNjc4MTUyNSwnNDMxMCc6MTY3ODE1MjYsJzQzMTEnOjE2NzgxNTI3LCc0MzEyJzoxNjc4MTUyOCwnNDMxMyc6MTY3ODE1MjksJzQzMTQnOjE2NzgxNTMwLCc0MzE1JzoxNjc4MTUzMSwnNDMxNic6MTY3ODE1MzIsJzQzMTcnOjE2NzgxNTMzLCc0MzE4JzoxNjc4MTUzNCwnNDMxOSc6MTY3ODE1MzUsJzQzMjAnOjE2NzgxNTM2LCc0MzIxJzoxNjc4MTUzNywnNDMyMic6MTY3ODE1MzgsJzQzMjMnOjE2NzgxNTM5LCc0MzI0JzoxNjc4MTU0MCwnNDMyNSc6MTY3ODE1NDEsJzQzMjYnOjE2NzgxNTQyLCc0MzI3JzoxNjc4MTU0MywnNDMyOCc6MTY3ODE1NDQsJzQzMjknOjE2NzgxNTQ1LCc0MzMwJzoxNjc4MTU0NiwnNDMzMSc6MTY3ODE1NDcsJzQzMzInOjE2NzgxNTQ4LCc0MzMzJzoxNjc4MTU0OSwnNDMzNCc6MTY3ODE1NTAsJzQzMzUnOjE2NzgxNTUxLCc0MzM2JzoxNjc4MTU1MiwnNDMzNyc6MTY3ODE1NTMsJzQzMzgnOjE2NzgxNTU0LCc0MzM5JzoxNjc4MTU1NSwnNDM0MCc6MTY3ODE1NTYsJzQzNDEnOjE2NzgxNTU3LCc0MzQyJzoxNjc4MTU1OCwnNzY4Mic6MTY3ODQ4OTgsJzc2ODMnOjE2Nzg0ODk5LCc3NjkwJzoxNjc4NDkwNiwnNzY5MSc6MTY3ODQ5MDcsJzc3MTAnOjE2Nzg0OTI2LCc3NzExJzoxNjc4NDkyNywnNzczNCc6MTY3ODQ5NTAsJzc3MzUnOjE2Nzg0OTUxLCc3NzQ0JzoxNjc4NDk2MCwnNzc0NSc6MTY3ODQ5NjEsJzc3NjYnOjE2Nzg0OTgyLCc3NzY3JzoxNjc4NDk4MywnNzc3Nic6MTY3ODQ5OTIsJzc3NzcnOjE2Nzg0OTkzLCc3Nzg2JzoxNjc4NTAwMiwnNzc4Nyc6MTY3ODUwMDMsJzc4MDgnOjE2Nzg1MDI0LCc3ODA5JzoxNjc4NTAyNSwnNzgxMCc6MTY3ODUwMjYsJzc4MTEnOjE2Nzg1MDI3LCc3ODEyJzoxNjc4NTAyOCwnNzgxMyc6MTY3ODUwMjksJzc4MTgnOjE2Nzg1MDM0LCc3ODE5JzoxNjc4NTAzNSwnNzg0MCc6MTY3ODUwNTYsJzc4NDEnOjE2Nzg1MDU3LCc3ODQyJzoxNjc4NTA1OCwnNzg0Myc6MTY3ODUwNTksJzc4NDQnOjE2Nzg1MDYwLCc3ODQ1JzoxNjc4NTA2MSwnNzg0Nic6MTY3ODUwNjIsJzc4NDcnOjE2Nzg1MDYzLCc3ODQ4JzoxNjc4NTA2NCwnNzg0OSc6MTY3ODUwNjUsJzc4NTAnOjE2Nzg1MDY2LCc3ODUxJzoxNjc4NTA2NywnNzg1Mic6MTY3ODUwNjgsJzc4NTMnOjE2Nzg1MDY5LCc3ODU0JzoxNjc4NTA3MCwnNzg1NSc6MTY3ODUwNzEsJzc4NTYnOjE2Nzg1MDcyLCc3ODU3JzoxNjc4NTA3MywnNzg1OCc6MTY3ODUwNzQsJzc4NTknOjE2Nzg1MDc1LCc3ODYwJzoxNjc4NTA3NiwnNzg2MSc6MTY3ODUwNzcsJzc4NjInOjE2Nzg1MDc4LCc3ODYzJzoxNjc4NTA3OSwnNzg2NCc6MTY3ODUwODAsJzc4NjUnOjE2Nzg1MDgxLCc3ODY2JzoxNjc4NTA4MiwnNzg2Nyc6MTY3ODUwODMsJzc4NjgnOjE2Nzg1MDg0LCc3ODY5JzoxNjc4NTA4NSwnNzg3MCc6MTY3ODUwODYsJzc4NzEnOjE2Nzg1MDg3LCc3ODcyJzoxNjc4NTA4OCwnNzg3Myc6MTY3ODUwODksJzc4NzQnOjE2Nzg1MDkwLCc3ODc1JzoxNjc4NTA5MSwnNzg3Nic6MTY3ODUwOTIsJzc4NzcnOjE2Nzg1MDkzLCc3ODc4JzoxNjc4NTA5NCwnNzg3OSc6MTY3ODUwOTUsJzc4ODAnOjE2Nzg1MDk2LCc3ODgxJzoxNjc4NTA5NywnNzg4Mic6MTY3ODUwOTgsJzc4ODMnOjE2Nzg1MDk5LCc3ODg0JzoxNjc4NTEwMCwnNzg4NSc6MTY3ODUxMDEsJzc4ODYnOjE2Nzg1MTAyLCc3ODg3JzoxNjc4NTEwMywnNzg4OCc6MTY3ODUxMDQsJzc4ODknOjE2Nzg1MTA1LCc3ODkwJzoxNjc4NTEwNiwnNzg5MSc6MTY3ODUxMDcsJzc4OTInOjE2Nzg1MTA4LCc3ODkzJzoxNjc4NTEwOSwnNzg5NCc6MTY3ODUxMTAsJzc4OTUnOjE2Nzg1MTExLCc3ODk2JzoxNjc4NTExMiwnNzg5Nyc6MTY3ODUxMTMsJzc4OTgnOjE2Nzg1MTE0LCc3ODk5JzoxNjc4NTExNSwnNzkwMCc6MTY3ODUxMTYsJzc5MDEnOjE2Nzg1MTE3LCc3OTAyJzoxNjc4NTExOCwnNzkwMyc6MTY3ODUxMTksJzc5MDQnOjE2Nzg1MTIwLCc3OTA1JzoxNjc4NTEyMSwnNzkwNic6MTY3ODUxMjIsJzc5MDcnOjE2Nzg1MTIzLCc3OTA4JzoxNjc4NTEyNCwnNzkwOSc6MTY3ODUxMjUsJzc5MTAnOjE2Nzg1MTI2LCc3OTExJzoxNjc4NTEyNywnNzkxMic6MTY3ODUxMjgsJzc5MTMnOjE2Nzg1MTI5LCc3OTE0JzoxNjc4NTEzMCwnNzkxNSc6MTY3ODUxMzEsJzc5MTYnOjE2Nzg1MTMyLCc3OTE3JzoxNjc4NTEzMywnNzkxOCc6MTY3ODUxMzQsJzc5MTknOjE2Nzg1MTM1LCc3OTIwJzoxNjc4NTEzNiwnNzkyMSc6MTY3ODUxMzcsJzc5MjInOjE2Nzg1MTM4LCc3OTIzJzoxNjc4NTEzOSwnNzkyNCc6MTY3ODUxNDAsJzc5MjUnOjE2Nzg1MTQxLCc3OTI2JzoxNjc4NTE0MiwnNzkyNyc6MTY3ODUxNDMsJzc5MjgnOjE2Nzg1MTQ0LCc3OTI5JzoxNjc4NTE0NSwnODE5NCc6MjcyMiwnODE5NSc6MjcyMSwnODE5Nic6MjcyMywnODE5Nyc6MjcyNCwnODE5OSc6MjcyNSwnODIwMCc6MjcyNiwnODIwMSc6MjcyNywnODIwMic6MjcyOCwnODIxMCc6Mjc0NywnODIxMSc6MjczMCwnODIxMic6MjcyOSwnODIxMyc6MTk2NywnODIxNSc6MzI5NSwnODIxNic6Mjc2OCwnODIxNyc6Mjc2OSwnODIxOCc6MjgxMywnODIyMCc6Mjc3MCwnODIyMSc6Mjc3MSwnODIyMic6MjgxNCwnODIyNCc6MjgwMSwnODIyNSc6MjgwMiwnODIyNic6Mjc5MCwnODIyOSc6MjczNSwnODIzMCc6MjczNCwnODI0MCc6Mjc3MywnODI0Mic6Mjc3NCwnODI0Myc6Mjc3NSwnODI0OCc6MjgxMiwnODI1NCc6MTE1MCwnODMwNCc6MTY3ODU1MjAsJzgzMDgnOjE2Nzg1NTI0LCc4MzA5JzoxNjc4NTUyNSwnODMxMCc6MTY3ODU1MjYsJzgzMTEnOjE2Nzg1NTI3LCc4MzEyJzoxNjc4NTUyOCwnODMxMyc6MTY3ODU1MjksJzgzMjAnOjE2Nzg1NTM2LCc4MzIxJzoxNjc4NTUzNywnODMyMic6MTY3ODU1MzgsJzgzMjMnOjE2Nzg1NTM5LCc4MzI0JzoxNjc4NTU0MCwnODMyNSc6MTY3ODU1NDEsJzgzMjYnOjE2Nzg1NTQyLCc4MzI3JzoxNjc4NTU0MywnODMyOCc6MTY3ODU1NDQsJzgzMjknOjE2Nzg1NTQ1LCc4MzUyJzoxNjc4NTU2OCwnODM1Myc6MTY3ODU1NjksJzgzNTQnOjE2Nzg1NTcwLCc4MzU1JzoxNjc4NTU3MSwnODM1Nic6MTY3ODU1NzIsJzgzNTcnOjE2Nzg1NTczLCc4MzU4JzoxNjc4NTU3NCwnODM1OSc6MTY3ODU1NzUsJzgzNjAnOjE2Nzg1NTc2LCc4MzYxJzozODM5LCc4MzYyJzoxNjc4NTU3OCwnODM2Myc6MTY3ODU1NzksJzgzNjQnOjgzNjQsJzg0NTMnOjI3NDQsJzg0NzAnOjE3MTIsJzg0NzEnOjI4MTEsJzg0NzgnOjI3NzIsJzg0ODInOjI3NjEsJzg1MzEnOjI3MzYsJzg1MzInOjI3MzcsJzg1MzMnOjI3MzgsJzg1MzQnOjI3MzksJzg1MzUnOjI3NDAsJzg1MzYnOjI3NDEsJzg1MzcnOjI3NDIsJzg1MzgnOjI3NDMsJzg1MzknOjI3NTUsJzg1NDAnOjI3NTYsJzg1NDEnOjI3NTcsJzg1NDInOjI3NTgsJzg1OTInOjIyOTksJzg1OTMnOjIzMDAsJzg1OTQnOjIzMDEsJzg1OTUnOjIzMDIsJzg2NTgnOjIyNTQsJzg2NjAnOjIyNTMsJzg3MDYnOjIyODcsJzg3MDknOjE2Nzg1OTI1LCc4NzExJzoyMjQ1LCc4NzEyJzoxNjc4NTkyOCwnODcxMyc6MTY3ODU5MjksJzg3MTUnOjE2Nzg1OTMxLCc4NzI4JzozMDE4LCc4NzMwJzoyMjYyLCc4NzMxJzoxNjc4NTk0NywnODczMic6MTY3ODU5NDgsJzg3MzMnOjIyNDEsJzg3MzQnOjIyNDIsJzg3NDMnOjIyNzAsJzg3NDQnOjIyNzEsJzg3NDUnOjIyNjgsJzg3NDYnOjIyNjksJzg3NDcnOjIyMzksJzg3NDgnOjE2Nzg1OTY0LCc4NzQ5JzoxNjc4NTk2NSwnODc1Nic6MjI0MCwnODc1Nyc6MTY3ODU5NzMsJzg3NjQnOjIyNDgsJzg3NzEnOjIyNDksJzg3NzMnOjE2Nzg1OTkyLCc4Nzc1JzoxNjc4NTk5MSwnODgwMCc6MjIzNywnODgwMSc6MjI1NSwnODgwMic6MTY3ODYwMTgsJzg4MDMnOjE2Nzg2MDE5LCc4ODA0JzoyMjM2LCc4ODA1JzoyMjM4LCc4ODM0JzoyMjY2LCc4ODM1JzoyMjY3LCc4ODY2JzozMDY4LCc4ODY3JzozMDM2LCc4ODY4JzozMDEwLCc4ODY5JzozMDIyLCc4OTY4JzozMDI3LCc4OTcwJzozMDEyLCc4OTgxJzoyODEwLCc4OTkyJzoyMjEyLCc4OTkzJzoyMjEzLCc5MTA5JzozMDIwLCc5MTE1JzoyMjE5LCc5MTE3JzoyMjIwLCc5MTE4JzoyMjIxLCc5MTIwJzoyMjIyLCc5MTIxJzoyMjE1LCc5MTIzJzoyMjE2LCc5MTI0JzoyMjE3LCc5MTI2JzoyMjE4LCc5MTI4JzoyMjIzLCc5MTMyJzoyMjI0LCc5MTQzJzoyMjA5LCc5MTQ2JzoyNTQzLCc5MTQ3JzoyNTQ0LCc5MTQ4JzoyNTQ2LCc5MTQ5JzoyNTQ3LCc5MjI1JzoyNTMwLCc5MjI2JzoyNTMzLCc5MjI3JzoyNTM3LCc5MjI4JzoyNTMxLCc5MjI5JzoyNTMyLCc5MjUxJzoyNzMyLCc5MjUyJzoyNTM2LCc5NDcyJzoyMjExLCc5NDc0JzoyMjE0LCc5NDg0JzoyMjEwLCc5NDg4JzoyNTM5LCc5NDkyJzoyNTQxLCc5NDk2JzoyNTM4LCc5NTAwJzoyNTQ4LCc5NTA4JzoyNTQ5LCc5NTE2JzoyNTUxLCc5NTI0JzoyNTUwLCc5NTMyJzoyNTQyLCc5NjE4JzoyNTI5LCc5NjQyJzoyNzkxLCc5NjQzJzoyNzg1LCc5NjQ0JzoyNzc5LCc5NjQ1JzoyNzg2LCc5NjQ2JzoyNzgzLCc5NjQ3JzoyNzY3LCc5NjUwJzoyNzkyLCc5NjUxJzoyNzg3LCc5NjU0JzoyNzgxLCc5NjU1JzoyNzY1LCc5NjYwJzoyNzkzLCc5NjYxJzoyNzg4LCc5NjY0JzoyNzgwLCc5NjY1JzoyNzY0LCc5NjcwJzoyNTI4LCc5Njc1JzoyNzY2LCc5Njc5JzoyNzgyLCc5NzAyJzoyNzg0LCc5NzM0JzoyNzg5LCc5NzQyJzoyODA5LCc5NzQ3JzoyNzYyLCc5NzU2JzoyNzk0LCc5NzU4JzoyNzk1LCc5NzkyJzoyODA4LCc5Nzk0JzoyODA3LCc5ODI3JzoyNzk2LCc5ODI5JzoyNzk4LCc5ODMwJzoyNzk3LCc5ODM3JzoyODA2LCc5ODM5JzoyODA1LCcxMDAwMyc6MjgwMywnMTAwMDcnOjI4MDQsJzEwMDEzJzoyNzc3LCcxMDAxNic6MjgwMCwnMTAyMTYnOjI3NDgsJzEwMjE3JzoyNzUwLCcxMDI0MCc6MTY3ODc0NTYsJzEwMjQxJzoxNjc4NzQ1NywnMTAyNDInOjE2Nzg3NDU4LCcxMDI0Myc6MTY3ODc0NTksJzEwMjQ0JzoxNjc4NzQ2MCwnMTAyNDUnOjE2Nzg3NDYxLCcxMDI0Nic6MTY3ODc0NjIsJzEwMjQ3JzoxNjc4NzQ2MywnMTAyNDgnOjE2Nzg3NDY0LCcxMDI0OSc6MTY3ODc0NjUsJzEwMjUwJzoxNjc4NzQ2NiwnMTAyNTEnOjE2Nzg3NDY3LCcxMDI1Mic6MTY3ODc0NjgsJzEwMjUzJzoxNjc4NzQ2OSwnMTAyNTQnOjE2Nzg3NDcwLCcxMDI1NSc6MTY3ODc0NzEsJzEwMjU2JzoxNjc4NzQ3MiwnMTAyNTcnOjE2Nzg3NDczLCcxMDI1OCc6MTY3ODc0NzQsJzEwMjU5JzoxNjc4NzQ3NSwnMTAyNjAnOjE2Nzg3NDc2LCcxMDI2MSc6MTY3ODc0NzcsJzEwMjYyJzoxNjc4NzQ3OCwnMTAyNjMnOjE2Nzg3NDc5LCcxMDI2NCc6MTY3ODc0ODAsJzEwMjY1JzoxNjc4NzQ4MSwnMTAyNjYnOjE2Nzg3NDgyLCcxMDI2Nyc6MTY3ODc0ODMsJzEwMjY4JzoxNjc4NzQ4NCwnMTAyNjknOjE2Nzg3NDg1LCcxMDI3MCc6MTY3ODc0ODYsJzEwMjcxJzoxNjc4NzQ4NywnMTAyNzInOjE2Nzg3NDg4LCcxMDI3Myc6MTY3ODc0ODksJzEwMjc0JzoxNjc4NzQ5MCwnMTAyNzUnOjE2Nzg3NDkxLCcxMDI3Nic6MTY3ODc0OTIsJzEwMjc3JzoxNjc4NzQ5MywnMTAyNzgnOjE2Nzg3NDk0LCcxMDI3OSc6MTY3ODc0OTUsJzEwMjgwJzoxNjc4NzQ5NiwnMTAyODEnOjE2Nzg3NDk3LCcxMDI4Mic6MTY3ODc0OTgsJzEwMjgzJzoxNjc4NzQ5OSwnMTAyODQnOjE2Nzg3NTAwLCcxMDI4NSc6MTY3ODc1MDEsJzEwMjg2JzoxNjc4NzUwMiwnMTAyODcnOjE2Nzg3NTAzLCcxMDI4OCc6MTY3ODc1MDQsJzEwMjg5JzoxNjc4NzUwNSwnMTAyOTAnOjE2Nzg3NTA2LCcxMDI5MSc6MTY3ODc1MDcsJzEwMjkyJzoxNjc4NzUwOCwnMTAyOTMnOjE2Nzg3NTA5LCcxMDI5NCc6MTY3ODc1MTAsJzEwMjk1JzoxNjc4NzUxMSwnMTAyOTYnOjE2Nzg3NTEyLCcxMDI5Nyc6MTY3ODc1MTMsJzEwMjk4JzoxNjc4NzUxNCwnMTAyOTknOjE2Nzg3NTE1LCcxMDMwMCc6MTY3ODc1MTYsJzEwMzAxJzoxNjc4NzUxNywnMTAzMDInOjE2Nzg3NTE4LCcxMDMwMyc6MTY3ODc1MTksJzEwMzA0JzoxNjc4NzUyMCwnMTAzMDUnOjE2Nzg3NTIxLCcxMDMwNic6MTY3ODc1MjIsJzEwMzA3JzoxNjc4NzUyMywnMTAzMDgnOjE2Nzg3NTI0LCcxMDMwOSc6MTY3ODc1MjUsJzEwMzEwJzoxNjc4NzUyNiwnMTAzMTEnOjE2Nzg3NTI3LCcxMDMxMic6MTY3ODc1MjgsJzEwMzEzJzoxNjc4NzUyOSwnMTAzMTQnOjE2Nzg3NTMwLCcxMDMxNSc6MTY3ODc1MzEsJzEwMzE2JzoxNjc4NzUzMiwnMTAzMTcnOjE2Nzg3NTMzLCcxMDMxOCc6MTY3ODc1MzQsJzEwMzE5JzoxNjc4NzUzNSwnMTAzMjAnOjE2Nzg3NTM2LCcxMDMyMSc6MTY3ODc1MzcsJzEwMzIyJzoxNjc4NzUzOCwnMTAzMjMnOjE2Nzg3NTM5LCcxMDMyNCc6MTY3ODc1NDAsJzEwMzI1JzoxNjc4NzU0MSwnMTAzMjYnOjE2Nzg3NTQyLCcxMDMyNyc6MTY3ODc1NDMsJzEwMzI4JzoxNjc4NzU0NCwnMTAzMjknOjE2Nzg3NTQ1LCcxMDMzMCc6MTY3ODc1NDYsJzEwMzMxJzoxNjc4NzU0NywnMTAzMzInOjE2Nzg3NTQ4LCcxMDMzMyc6MTY3ODc1NDksJzEwMzM0JzoxNjc4NzU1MCwnMTAzMzUnOjE2Nzg3NTUxLCcxMDMzNic6MTY3ODc1NTIsJzEwMzM3JzoxNjc4NzU1MywnMTAzMzgnOjE2Nzg3NTU0LCcxMDMzOSc6MTY3ODc1NTUsJzEwMzQwJzoxNjc4NzU1NiwnMTAzNDEnOjE2Nzg3NTU3LCcxMDM0Mic6MTY3ODc1NTgsJzEwMzQzJzoxNjc4NzU1OSwnMTAzNDQnOjE2Nzg3NTYwLCcxMDM0NSc6MTY3ODc1NjEsJzEwMzQ2JzoxNjc4NzU2MiwnMTAzNDcnOjE2Nzg3NTYzLCcxMDM0OCc6MTY3ODc1NjQsJzEwMzQ5JzoxNjc4NzU2NSwnMTAzNTAnOjE2Nzg3NTY2LCcxMDM1MSc6MTY3ODc1NjcsJzEwMzUyJzoxNjc4NzU2OCwnMTAzNTMnOjE2Nzg3NTY5LCcxMDM1NCc6MTY3ODc1NzAsJzEwMzU1JzoxNjc4NzU3MSwnMTAzNTYnOjE2Nzg3NTcyLCcxMDM1Nyc6MTY3ODc1NzMsJzEwMzU4JzoxNjc4NzU3NCwnMTAzNTknOjE2Nzg3NTc1LCcxMDM2MCc6MTY3ODc1NzYsJzEwMzYxJzoxNjc4NzU3NywnMTAzNjInOjE2Nzg3NTc4LCcxMDM2Myc6MTY3ODc1NzksJzEwMzY0JzoxNjc4NzU4MCwnMTAzNjUnOjE2Nzg3NTgxLCcxMDM2Nic6MTY3ODc1ODIsJzEwMzY3JzoxNjc4NzU4MywnMTAzNjgnOjE2Nzg3NTg0LCcxMDM2OSc6MTY3ODc1ODUsJzEwMzcwJzoxNjc4NzU4NiwnMTAzNzEnOjE2Nzg3NTg3LCcxMDM3Mic6MTY3ODc1ODgsJzEwMzczJzoxNjc4NzU4OSwnMTAzNzQnOjE2Nzg3NTkwLCcxMDM3NSc6MTY3ODc1OTEsJzEwMzc2JzoxNjc4NzU5MiwnMTAzNzcnOjE2Nzg3NTkzLCcxMDM3OCc6MTY3ODc1OTQsJzEwMzc5JzoxNjc4NzU5NSwnMTAzODAnOjE2Nzg3NTk2LCcxMDM4MSc6MTY3ODc1OTcsJzEwMzgyJzoxNjc4NzU5OCwnMTAzODMnOjE2Nzg3NTk5LCcxMDM4NCc6MTY3ODc2MDAsJzEwMzg1JzoxNjc4NzYwMSwnMTAzODYnOjE2Nzg3NjAyLCcxMDM4Nyc6MTY3ODc2MDMsJzEwMzg4JzoxNjc4NzYwNCwnMTAzODknOjE2Nzg3NjA1LCcxMDM5MCc6MTY3ODc2MDYsJzEwMzkxJzoxNjc4NzYwNywnMTAzOTInOjE2Nzg3NjA4LCcxMDM5Myc6MTY3ODc2MDksJzEwMzk0JzoxNjc4NzYxMCwnMTAzOTUnOjE2Nzg3NjExLCcxMDM5Nic6MTY3ODc2MTIsJzEwMzk3JzoxNjc4NzYxMywnMTAzOTgnOjE2Nzg3NjE0LCcxMDM5OSc6MTY3ODc2MTUsJzEwNDAwJzoxNjc4NzYxNiwnMTA0MDEnOjE2Nzg3NjE3LCcxMDQwMic6MTY3ODc2MTgsJzEwNDAzJzoxNjc4NzYxOSwnMTA0MDQnOjE2Nzg3NjIwLCcxMDQwNSc6MTY3ODc2MjEsJzEwNDA2JzoxNjc4NzYyMiwnMTA0MDcnOjE2Nzg3NjIzLCcxMDQwOCc6MTY3ODc2MjQsJzEwNDA5JzoxNjc4NzYyNSwnMTA0MTAnOjE2Nzg3NjI2LCcxMDQxMSc6MTY3ODc2MjcsJzEwNDEyJzoxNjc4NzYyOCwnMTA0MTMnOjE2Nzg3NjI5LCcxMDQxNCc6MTY3ODc2MzAsJzEwNDE1JzoxNjc4NzYzMSwnMTA0MTYnOjE2Nzg3NjMyLCcxMDQxNyc6MTY3ODc2MzMsJzEwNDE4JzoxNjc4NzYzNCwnMTA0MTknOjE2Nzg3NjM1LCcxMDQyMCc6MTY3ODc2MzYsJzEwNDIxJzoxNjc4NzYzNywnMTA0MjInOjE2Nzg3NjM4LCcxMDQyMyc6MTY3ODc2MzksJzEwNDI0JzoxNjc4NzY0MCwnMTA0MjUnOjE2Nzg3NjQxLCcxMDQyNic6MTY3ODc2NDIsJzEwNDI3JzoxNjc4NzY0MywnMTA0MjgnOjE2Nzg3NjQ0LCcxMDQyOSc6MTY3ODc2NDUsJzEwNDMwJzoxNjc4NzY0NiwnMTA0MzEnOjE2Nzg3NjQ3LCcxMDQzMic6MTY3ODc2NDgsJzEwNDMzJzoxNjc4NzY0OSwnMTA0MzQnOjE2Nzg3NjUwLCcxMDQzNSc6MTY3ODc2NTEsJzEwNDM2JzoxNjc4NzY1MiwnMTA0MzcnOjE2Nzg3NjUzLCcxMDQzOCc6MTY3ODc2NTQsJzEwNDM5JzoxNjc4NzY1NSwnMTA0NDAnOjE2Nzg3NjU2LCcxMDQ0MSc6MTY3ODc2NTcsJzEwNDQyJzoxNjc4NzY1OCwnMTA0NDMnOjE2Nzg3NjU5LCcxMDQ0NCc6MTY3ODc2NjAsJzEwNDQ1JzoxNjc4NzY2MSwnMTA0NDYnOjE2Nzg3NjYyLCcxMDQ0Nyc6MTY3ODc2NjMsJzEwNDQ4JzoxNjc4NzY2NCwnMTA0NDknOjE2Nzg3NjY1LCcxMDQ1MCc6MTY3ODc2NjYsJzEwNDUxJzoxNjc4NzY2NywnMTA0NTInOjE2Nzg3NjY4LCcxMDQ1Myc6MTY3ODc2NjksJzEwNDU0JzoxNjc4NzY3MCwnMTA0NTUnOjE2Nzg3NjcxLCcxMDQ1Nic6MTY3ODc2NzIsJzEwNDU3JzoxNjc4NzY3MywnMTA0NTgnOjE2Nzg3Njc0LCcxMDQ1OSc6MTY3ODc2NzUsJzEwNDYwJzoxNjc4NzY3NiwnMTA0NjEnOjE2Nzg3Njc3LCcxMDQ2Mic6MTY3ODc2NzgsJzEwNDYzJzoxNjc4NzY3OSwnMTA0NjQnOjE2Nzg3NjgwLCcxMDQ2NSc6MTY3ODc2ODEsJzEwNDY2JzoxNjc4NzY4MiwnMTA0NjcnOjE2Nzg3NjgzLCcxMDQ2OCc6MTY3ODc2ODQsJzEwNDY5JzoxNjc4NzY4NSwnMTA0NzAnOjE2Nzg3Njg2LCcxMDQ3MSc6MTY3ODc2ODcsJzEwNDcyJzoxNjc4NzY4OCwnMTA0NzMnOjE2Nzg3Njg5LCcxMDQ3NCc6MTY3ODc2OTAsJzEwNDc1JzoxNjc4NzY5MSwnMTA0NzYnOjE2Nzg3NjkyLCcxMDQ3Nyc6MTY3ODc2OTMsJzEwNDc4JzoxNjc4NzY5NCwnMTA0NzknOjE2Nzg3Njk1LCcxMDQ4MCc6MTY3ODc2OTYsJzEwNDgxJzoxNjc4NzY5NywnMTA0ODInOjE2Nzg3Njk4LCcxMDQ4Myc6MTY3ODc2OTksJzEwNDg0JzoxNjc4NzcwMCwnMTA0ODUnOjE2Nzg3NzAxLCcxMDQ4Nic6MTY3ODc3MDIsJzEwNDg3JzoxNjc4NzcwMywnMTA0ODgnOjE2Nzg3NzA0LCcxMDQ4OSc6MTY3ODc3MDUsJzEwNDkwJzoxNjc4NzcwNiwnMTA0OTEnOjE2Nzg3NzA3LCcxMDQ5Mic6MTY3ODc3MDgsJzEwNDkzJzoxNjc4NzcwOSwnMTA0OTQnOjE2Nzg3NzEwLCcxMDQ5NSc6MTY3ODc3MTEsJzEyMjg5JzoxMTg4LCcxMjI5MCc6MTE4NSwnMTIzMDAnOjExODYsJzEyMzAxJzoxMTg3LCcxMjQ0Myc6MTI0NiwnMTI0NDQnOjEyNDcsJzEyNDQ5JzoxMTkxLCcxMjQ1MCc6MTIwMSwnMTI0NTEnOjExOTIsJzEyNDUyJzoxMjAyLCcxMjQ1Myc6MTE5MywnMTI0NTQnOjEyMDMsJzEyNDU1JzoxMTk0LCcxMjQ1Nic6MTIwNCwnMTI0NTcnOjExOTUsJzEyNDU4JzoxMjA1LCcxMjQ1OSc6MTIwNiwnMTI0NjEnOjEyMDcsJzEyNDYzJzoxMjA4LCcxMjQ2NSc6MTIwOSwnMTI0NjcnOjEyMTAsJzEyNDY5JzoxMjExLCcxMjQ3MSc6MTIxMiwnMTI0NzMnOjEyMTMsJzEyNDc1JzoxMjE0LCcxMjQ3Nyc6MTIxNSwnMTI0NzknOjEyMTYsJzEyNDgxJzoxMjE3LCcxMjQ4Myc6MTE5OSwnMTI0ODQnOjEyMTgsJzEyNDg2JzoxMjE5LCcxMjQ4OCc6MTIyMCwnMTI0OTAnOjEyMjEsJzEyNDkxJzoxMjIyLCcxMjQ5Mic6MTIyMywnMTI0OTMnOjEyMjQsJzEyNDk0JzoxMjI1LCcxMjQ5NSc6MTIyNiwnMTI0OTgnOjEyMjcsJzEyNTAxJzoxMjI4LCcxMjUwNCc6MTIyOSwnMTI1MDcnOjEyMzAsJzEyNTEwJzoxMjMxLCcxMjUxMSc6MTIzMiwnMTI1MTInOjEyMzMsJzEyNTEzJzoxMjM0LCcxMjUxNCc6MTIzNSwnMTI1MTUnOjExOTYsJzEyNTE2JzoxMjM2LCcxMjUxNyc6MTE5NywnMTI1MTgnOjEyMzcsJzEyNTE5JzoxMTk4LCcxMjUyMCc6MTIzOCwnMTI1MjEnOjEyMzksJzEyNTIyJzoxMjQwLCcxMjUyMyc6MTI0MSwnMTI1MjQnOjEyNDIsJzEyNTI1JzoxMjQzLCcxMjUyNyc6MTI0NCwnMTI1MzAnOjExOTAsJzEyNTMxJzoxMjQ1LCcxMjUzOSc6MTE4OSwnMTI1NDAnOjEyMDB9O1xuXG5cbmZ1bmN0aW9uIGxvb2t1cChrKSB7XG5cdHJldHVybiBrID8ge2tleXN5bTogaywga2V5bmFtZToga2V5bmFtZXMgPyBrZXluYW1lc1trXSA6IGt9IDogdW5kZWZpbmVkO1xufVxuXG5cbmZ1bmN0aW9uIGZyb21Vbmljb2RlKHUpIHtcblx0cmV0dXJuIGxvb2t1cChjb2RlcG9pbnRzW3VdKTtcbn1cblxuXG4vKipcbiAqIEV4cG9zZSBsb29rdXAoKSBhbmQgZnJvbVVuaWNvZGUoKSBmdW5jdGlvbnMuXG4gKi9cbktleXMubG9va3VwID0gbG9va3VwO1xuS2V5cy5mcm9tVW5pY29kZSA9IGZyb21Vbmljb2RlO1xuXG5cbi8qKlxuICogRXhwb3NlIEtleXMgT2JqZWN0LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IEtleXM7XG4iLCIvKlxuICogbm9WTkM6IEhUTUw1IFZOQyBjbGllbnRcbiAqIENvcHlyaWdodCAoQykgMjAxMiBKb2VsIE1hcnRpblxuICogQ29weXJpZ2h0IChDKSAyMDEzIFNhbXVlbCBNYW5uZWhlZCBmb3IgQ2VuZGlvIEFCXG4gKiBMaWNlbnNlZCB1bmRlciBNUEwgMi4wIChzZWUgTElDRU5TRS50eHQpXG4gKlxuICogVElHSFQgZGVjb2RlciBwb3J0aW9uOlxuICogKGMpIDIwMTIgTWljaGFlbCBUaW5nbG9mLCBKb2UgQmFsYXosIExlcyBQaWVjaCAoTWVyY3VyaS5jYSlcbiAqL1xuXG5cbi8qKlxuICogRXhwb3NlIHRoZSBSRkIgY2xhc3MuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gUkZCO1xuXG5cbi8qKlxuICogRGVwZW5kZW5jaWVzLlxuICovXG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdub1ZOQzpSRkInKTtcbnZhciBkZWJ1Z2Vycm9yID0gcmVxdWlyZSgnZGVidWcnKSgnbm9WTkM6RVJST1I6UkZCJyk7XG5kZWJ1Z2Vycm9yLmxvZyA9IGNvbnNvbGUud2Fybi5iaW5kKGNvbnNvbGUpO1xudmFyIFV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBXZWJzb2NrID0gcmVxdWlyZSgnLi93ZWJzb2NrJyk7XG52YXIgS2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xudmFyIElucHV0ID0gcmVxdWlyZSgnLi9pbnB1dCcpO1xudmFyIEtleWJvYXJkID0gSW5wdXQuS2V5Ym9hcmQ7XG52YXIgTW91c2UgPSBJbnB1dC5Nb3VzZTtcbnZhciBEaXNwbGF5ID0gcmVxdWlyZSgnLi9kaXNwbGF5Jyk7XG52YXIgQmFzZTY0ID0gcmVxdWlyZSgnLi9iYXNlNjQnKTtcbnZhciBERVMgPSByZXF1aXJlKCcuL2RlcycpO1xudmFyIFRJTkYgPSByZXF1aXJlKCcuL3RpbmYnKTtcblxuXG5mdW5jdGlvbiBSRkIgKGRlZmF1bHRzKSB7XG5cdGRlYnVnKCduZXcoKScpO1xuXG5cdGRlZmF1bHRzID0gZGVmYXVsdHMgfHwge307XG5cblx0dGhpcy5fcmZiX3VybCA9IG51bGw7XG5cdHRoaXMuX3JmYl9wYXNzd29yZCA9ICcnO1xuXG5cdHRoaXMuX3JmYl9zdGF0ZSA9ICdkaXNjb25uZWN0ZWQnO1xuXHR0aGlzLl9yZmJfdmVyc2lvbiA9IDA7XG5cdHRoaXMuX3JmYl9tYXhfdmVyc2lvbiA9IDMuODtcblx0dGhpcy5fcmZiX2F1dGhfc2NoZW1lID0gJyc7XG5cblx0dGhpcy5fcmZiX3RpZ2h0dm5jID0gZmFsc2U7XG5cdHRoaXMuX3JmYl94dnBfdmVyID0gMDtcblxuXHQvLyBJbiBwcmVmZXJlbmNlIG9yZGVyXG5cdHRoaXMuX2VuY29kaW5ncyA9IFtcblx0XHRbJ0NPUFlSRUNUJywgICAgICAgICAweDAxIF0sXG5cdFx0WydUSUdIVCcsICAgICAgICAgICAgMHgwNyBdLFxuXHRcdFsnVElHSFRfUE5HJywgICAgICAgIC0yNjAgXSxcblx0XHRbJ0hFWFRJTEUnLCAgICAgICAgICAweDA1IF0sXG5cdFx0WydSUkUnLCAgICAgICAgICAgICAgMHgwMiBdLFxuXHRcdFsnUkFXJywgICAgICAgICAgICAgIDB4MDAgXSxcblx0XHRbJ0Rlc2t0b3BTaXplJywgICAgICAtMjIzIF0sXG5cdFx0WydDdXJzb3InLCAgICAgICAgICAgLTIzOSBdLFxuXG5cdFx0Ly8gUHN1ZWRvLWVuY29kaW5nIHNldHRpbmdzXG5cdFx0Ly9bJ0pQRUdfcXVhbGl0eV9sbycsICAgIC0zMiBdLFxuXHRcdFsnSlBFR19xdWFsaXR5X21lZCcsICAgICAtMjYgXSxcblx0XHQvL1snSlBFR19xdWFsaXR5X2hpJywgICAgLTIzIF0sXG5cdFx0Ly9bJ2NvbXByZXNzX2xvJywgICAgICAgLTI1NSBdLFxuXHRcdFsnY29tcHJlc3NfaGknLCAgICAgICAgIC0yNDcgXSxcblx0XHRbJ2xhc3RfcmVjdCcsICAgICAgICAgICAtMjI0IF0sXG5cdFx0Wyd4dnAnLCAgICAgICAgICAgICAgICAgLTMwOSBdLFxuXHRcdFsnRXh0ZW5kZWREZXNrdG9wU2l6ZScsIC0zMDggXVxuXHRdO1xuXG5cdHRoaXMuX2VuY0hhbmRsZXJzID0ge307XG5cdHRoaXMuX2VuY05hbWVzID0ge307XG5cdHRoaXMuX2VuY1N0YXRzID0ge307XG5cblx0dGhpcy5fc29jayA9IG51bGw7ICAgICAgICAgICAgICAvLyBXZWJzb2NrIG9iamVjdFxuXHR0aGlzLl9kaXNwbGF5ID0gbnVsbDsgICAgICAgICAgIC8vIERpc3BsYXkgb2JqZWN0XG5cdHRoaXMuX2tleWJvYXJkID0gbnVsbDsgICAgICAgICAgLy8gS2V5Ym9hcmQgaW5wdXQgaGFuZGxlciBvYmplY3Rcblx0dGhpcy5fbW91c2UgPSBudWxsOyAgICAgICAgICAgICAvLyBNb3VzZSBpbnB1dCBoYW5kbGVyIG9iamVjdFxuXHR0aGlzLl9zZW5kVGltZXIgPSBudWxsOyAgICAgICAgIC8vIFNlbmQgUXVldWUgY2hlY2sgdGltZXJcblx0dGhpcy5fZGlzY29ublRpbWVyID0gbnVsbDsgICAgICAvLyBkaXNjb25uZWN0aW9uIHRpbWVyXG5cdHRoaXMuX21zZ1RpbWVyID0gbnVsbDsgICAgICAgICAgLy8gcXVldWVkIGhhbmRsZV9tc2cgdGltZXJcblxuXHQvLyBGcmFtZSBidWZmZXIgdXBkYXRlIHN0YXRlXG5cdHRoaXMuX0ZCVSA9IHtcblx0XHRyZWN0czogMCxcblx0XHRzdWJyZWN0czogMCwgICAgICAgICAgICAvLyBSUkVcblx0XHRsaW5lczogMCwgICAgICAgICAgICAgICAvLyBSQVdcblx0XHR0aWxlczogMCwgICAgICAgICAgICAgICAvLyBIRVhUSUxFXG5cdFx0Ynl0ZXM6IDAsXG5cdFx0eDogMCxcblx0XHR5OiAwLFxuXHRcdHdpZHRoOiAwLFxuXHRcdGhlaWdodDogMCxcblx0XHRlbmNvZGluZzogMCxcblx0XHRzdWJlbmNvZGluZzogLTEsXG5cdFx0YmFja2dyb3VuZDogbnVsbCxcblx0XHR6bGliOiBbXSAgICAgICAgICAgICAgICAvLyBUSUdIVCB6bGliIHN0cmVhbXNcblx0fTtcblxuXHR0aGlzLl9mYl9CcHAgPSA0O1xuXHR0aGlzLl9mYl9kZXB0aCA9IDM7XG5cdHRoaXMuX2ZiX3dpZHRoID0gMDtcblx0dGhpcy5fZmJfaGVpZ2h0ID0gMDtcblx0dGhpcy5fZmJfbmFtZSA9ICcnO1xuXG5cdHRoaXMuX3JyZV9jaHVua19zeiA9IDEwMDtcblxuXHR0aGlzLl90aW1pbmcgPSB7XG5cdFx0bGFzdF9mYnU6IDAsXG5cdFx0ZmJ1X3RvdGFsOiAwLFxuXHRcdGZidV90b3RhbF9jbnQ6IDAsXG5cdFx0ZnVsbF9mYnVfdG90YWw6IDAsXG5cdFx0ZnVsbF9mYnVfY250OiAwLFxuXG5cdFx0ZmJ1X3J0X3N0YXJ0OiAwLFxuXHRcdGZidV9ydF90b3RhbDogMCxcblx0XHRmYnVfcnRfY250OiAwLFxuXHRcdHBpeGVsczogMFxuXHR9O1xuXG5cdHRoaXMuX3N1cHBvcnRzU2V0RGVza3RvcFNpemUgPSBmYWxzZTtcblx0dGhpcy5fc2NyZWVuX2lkID0gMDtcblx0dGhpcy5fc2NyZWVuX2ZsYWdzID0gMDtcblxuXHQvLyBNb3VzZSBzdGF0ZVxuXHR0aGlzLl9tb3VzZV9idXR0b25NYXNrID0gMDtcblx0dGhpcy5fbW91c2VfYXJyID0gW107XG5cdHRoaXMuX3ZpZXdwb3J0RHJhZ2dpbmcgPSBmYWxzZTtcblx0dGhpcy5fdmlld3BvcnREcmFnUG9zID0ge307XG5cblx0Ly8gc2V0IHRoZSBkZWZhdWx0IHZhbHVlIG9uIHVzZXItZmFjaW5nIHByb3BlcnRpZXNcblx0VXRpbC5zZXRfZGVmYXVsdHModGhpcywgZGVmYXVsdHMsIHtcblx0XHQndGFyZ2V0JzogJ251bGwnLCAgICAgICAgICAgICAgICAgICAgICAgLy8gVk5DIGRpc3BsYXkgcmVuZGVyaW5nIENhbnZhcyBvYmplY3Rcblx0XHQnZm9jdXNDb250YWluZXInOiBkb2N1bWVudCwgICAgICAgICAgICAgLy8gRE9NIGVsZW1lbnQgdGhhdCBjYXB0dXJlcyBrZXlib2FyZCBpbnB1dFxuXHRcdCdlbmNyeXB0JzogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2UgVExTL1NTTC93c3MgZW5jcnlwdGlvblxuXHRcdCd0cnVlX2NvbG9yJzogdHJ1ZSwgICAgICAgICAgICAgICAgICAgICAvLyBSZXF1ZXN0IHRydWUgY29sb3IgcGl4ZWwgZGF0YVxuXHRcdCdsb2NhbF9jdXJzb3InOiBmYWxzZSwgICAgICAgICAgICAgICAgICAvLyBSZXF1ZXN0IGxvY2FsbHkgcmVuZGVyZWQgY3Vyc29yXG5cdFx0J3NoYXJlZCc6IHRydWUsICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlcXVlc3Qgc2hhcmVkIG1vZGVcblx0XHQndmlld19vbmx5JzogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgLy8gRGlzYWJsZSBjbGllbnQgbW91c2Uva2V5Ym9hcmRcblx0XHQneHZwX3Bhc3N3b3JkX3NlcCc6ICdAJywgICAgICAgICAgICAgICAgLy8gU2VwYXJhdG9yIGZvciBYVlAgcGFzc3dvcmQgZmllbGRzXG5cdFx0J2Rpc2Nvbm5lY3RUaW1lb3V0JzogMywgICAgICAgICAgICAgICAgIC8vIFRpbWUgKHMpIHRvIHdhaXQgZm9yIGRpc2Nvbm5lY3Rpb25cblx0XHQnd3NQcm90b2NvbHMnOiBbJ2JpbmFyeScsICdiYXNlNjQnXSwgICAgLy8gUHJvdG9jb2xzIHRvIHVzZSBpbiB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb25cblx0XHQncmVwZWF0ZXJJRCc6ICcnLCAgICAgICAgICAgICAgICAgICAgICAgLy8gW1VsdHJhVk5DXSBSZXBlYXRlcklEIHRvIGNvbm5lY3QgdG9cblx0XHQndmlld3BvcnREcmFnJzogZmFsc2UsICAgICAgICAgICAgICAgICAgLy8gTW92ZSB0aGUgdmlld3BvcnQgb24gbW91c2UgZHJhZ3Ncblx0XHQnZm9yY2VBdXRoU2NoZW1lJzogMCwgICAgICAgICAgICAgICAgICAgLy8gRm9yY2UgYXV0aCBzY2hlbWUgKDAgbWVhbnMgbm8pXG5cdFx0J2VuYWJsZU1vdXNlQW5kVG91Y2gnOiBmYWxzZSwgICAgICAgICAgIC8vIFdoZXRoZXIgYWxzbyBlbmFibGUgbW91c2UgZXZlbnRzIHdoZW4gdG91Y2ggc2NyZWVuIGlzIGRldGVjdGVkXG5cblx0XHQvLyBDYWxsYmFjayBmdW5jdGlvbnNcblx0XHQnb25VcGRhdGVTdGF0ZSc6IGZ1bmN0aW9uICgpIHsgfSwgICAgICAgLy8gb25VcGRhdGVTdGF0ZShyZmIsIHN0YXRlLCBvbGRzdGF0ZSwgc3RhdHVzTXNnKTogc3RhdGUgdXBkYXRlL2NoYW5nZVxuXHRcdCdvblBhc3N3b3JkUmVxdWlyZWQnOiBmdW5jdGlvbiAoKSB7IH0sICAvLyBvblBhc3N3b3JkUmVxdWlyZWQocmZiKTogVk5DIHBhc3N3b3JkIGlzIHJlcXVpcmVkXG5cdFx0J29uQ2xpcGJvYXJkJzogZnVuY3Rpb24gKCkgeyB9LCAgICAgICAgIC8vIG9uQ2xpcGJvYXJkKHJmYiwgdGV4dCk6IFJGQiBjbGlwYm9hcmQgY29udGVudHMgcmVjZWl2ZWRcblx0XHQnb25CZWxsJzogZnVuY3Rpb24gKCkgeyB9LCAgICAgICAgICAgICAgLy8gb25CZWxsKHJmYik6IFJGQiBCZWxsIG1lc3NhZ2UgcmVjZWl2ZWRcblx0XHQnb25GQlVSZWNlaXZlJzogZnVuY3Rpb24gKCkgeyB9LCAgICAgICAgLy8gb25GQlVSZWNlaXZlKHJmYiwgZmJ1KTogUkZCIEZCVSByZWNlaXZlZCBidXQgbm90IHlldCBwcm9jZXNzZWRcblx0XHQnb25GQlVDb21wbGV0ZSc6IGZ1bmN0aW9uICgpIHsgfSwgICAgICAgLy8gb25GQlVDb21wbGV0ZShyZmIsIGZidSk6IFJGQiBGQlUgcmVjZWl2ZWQgYW5kIHByb2Nlc3NlZFxuXHRcdCdvbkZCUmVzaXplJzogZnVuY3Rpb24gKCkgeyB9LCAgICAgICAgICAvLyBvbkZCUmVzaXplKHJmYiwgd2lkdGgsIGhlaWdodCk6IGZyYW1lIGJ1ZmZlciByZXNpemVkXG5cdFx0J29uRGVza3RvcE5hbWUnOiBmdW5jdGlvbiAoKSB7IH0sICAgICAgIC8vIG9uRGVza3RvcE5hbWUocmZiLCBuYW1lKTogZGVza3RvcCBuYW1lIHJlY2VpdmVkXG5cdFx0J29uWHZwSW5pdCc6IGZ1bmN0aW9uICgpIHsgfSwgICAgICAgICAgIC8vIG9uWHZwSW5pdCh2ZXJzaW9uKTogWFZQIGV4dGVuc2lvbnMgYWN0aXZlIGZvciB0aGlzIGNvbm5lY3Rpb25cblx0XHQnb25Vbmtub3duTWVzc2FnZVR5cGUnOiBudWxsICAgICAgICAgICAgLy8gSGFuZGxlciBmb3IgdW5rbm93biBWTkMgbWVzc2FnZSB0eXBlcy4gSWZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgLy8gbnVsbCBmYWlsdXJlIGlzIGVtaXR0ZWQgYW5kIHRoZSBSRkIgY2xvc2VkLlxuXHR9KTtcblxuXHQvLyBwb3B1bGF0ZSBlbmNIYW5kbGVycyB3aXRoIGJvdW5kIHZlcnNpb25zXG5cdE9iamVjdC5rZXlzKFJGQi5lbmNvZGluZ0hhbmRsZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChlbmNOYW1lKSB7XG5cdFx0dGhpcy5fZW5jSGFuZGxlcnNbZW5jTmFtZV0gPSBSRkIuZW5jb2RpbmdIYW5kbGVyc1tlbmNOYW1lXS5iaW5kKHRoaXMpO1xuXHR9LmJpbmQodGhpcykpO1xuXG5cdC8vIENyZWF0ZSBsb29rdXAgdGFibGVzIGJhc2VkIG9uIGVuY29kaW5nIG51bWJlclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2VuY29kaW5ncy5sZW5ndGg7IGkrKykge1xuXHRcdHRoaXMuX2VuY0hhbmRsZXJzW3RoaXMuX2VuY29kaW5nc1tpXVsxXV0gPSB0aGlzLl9lbmNIYW5kbGVyc1t0aGlzLl9lbmNvZGluZ3NbaV1bMF1dO1xuXHRcdHRoaXMuX2VuY05hbWVzW3RoaXMuX2VuY29kaW5nc1tpXVsxXV0gPSB0aGlzLl9lbmNvZGluZ3NbaV1bMF07XG5cdFx0dGhpcy5fZW5jU3RhdHNbdGhpcy5fZW5jb2RpbmdzW2ldWzFdXSA9IFswLCAwXTtcblx0fVxuXG5cdHRyeSB7XG5cdFx0dGhpcy5fZGlzcGxheSA9IG5ldyBEaXNwbGF5KHt0YXJnZXQ6IHRoaXMuX3RhcmdldH0pO1xuXHR9IGNhdGNoKGVycm9yKSB7XG5cdFx0ZGVidWdlcnJvcignRGlzcGxheSBleGNlcHRpb246ICcgKyBlcnJvcik7XG5cdFx0Ly8gRG9uJ3QgY29udGludWUuIEF2b2lkIHVnbHkgZXJyb3JzIGluIFwiZmF0YWxcIiBzdGF0ZS5cblx0XHR0aHJvdyhlcnJvcik7XG5cdH1cblxuXHR0aGlzLl9rZXlib2FyZCA9IG5ldyBLZXlib2FyZCh7XG5cdFx0dGFyZ2V0OiB0aGlzLl9mb2N1c0NvbnRhaW5lcixcblx0XHRvbktleVByZXNzOiB0aGlzLl9oYW5kbGVLZXlQcmVzcy5iaW5kKHRoaXMpXG5cdH0pO1xuXG5cdHRoaXMuX21vdXNlID0gbmV3IE1vdXNlKHtcblx0XHR0YXJnZXQ6IHRoaXMuX3RhcmdldCxcblx0XHRvbk1vdXNlQnV0dG9uOiB0aGlzLl9oYW5kbGVNb3VzZUJ1dHRvbi5iaW5kKHRoaXMpLFxuXHRcdG9uTW91c2VNb3ZlOiB0aGlzLl9oYW5kbGVNb3VzZU1vdmUuYmluZCh0aGlzKSxcblx0XHRub3RpZnk6IHRoaXMuX2tleWJvYXJkLnN5bmMuYmluZCh0aGlzLl9rZXlib2FyZCksXG5cdFx0ZW5hYmxlTW91c2VBbmRUb3VjaDogdGhpcy5fZW5hYmxlTW91c2VBbmRUb3VjaFxuXHR9KTtcblxuXHR0aGlzLl9zb2NrID0gbmV3IFdlYnNvY2soKTtcblxuXHR0aGlzLl9zb2NrLm9uKCdtZXNzYWdlJywgdGhpcy5faGFuZGxlX21lc3NhZ2UuYmluZCh0aGlzKSk7XG5cblx0dGhpcy5fc29jay5vbignb3BlbicsIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fcmZiX3N0YXRlID09PSAnY29ubmVjdCcpIHtcblx0XHRcdHRoaXMuX3VwZGF0ZVN0YXRlKCdQcm90b2NvbFZlcnNpb24nLCAnU3RhcnRpbmcgVk5DIGhhbmRzaGFrZScpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9mYWlsKCdHb3QgdW5leHBlY3RlZCBXZWJTb2NrZXQgY29ubmVjdGlvbicpO1xuXHRcdH1cblx0fS5iaW5kKHRoaXMpKTtcblxuXHR0aGlzLl9zb2NrLm9uKCdjbG9zZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0ZGVidWcoJ1dlYlNvY2tldCBjbG9zZWQnKTtcblxuXHRcdHZhciBtc2cgPSAnJztcblx0XHRpZiAoZS5jb2RlKSB7XG5cdFx0XHRtc2cgPSAnIChjb2RlOiAnICsgZS5jb2RlO1xuXHRcdFx0aWYgKGUucmVhc29uKSB7XG5cdFx0XHRcdG1zZyArPSAnLCByZWFzb246ICcgKyBlLnJlYXNvbjtcblx0XHRcdH1cblx0XHRcdG1zZyArPSAnKSc7XG5cdFx0fVxuXHRcdGlmICh0aGlzLl9yZmJfc3RhdGUgPT09ICdkaXNjb25uZWN0Jykge1xuXHRcdFx0dGhpcy5fdXBkYXRlU3RhdGUoJ2Rpc2Nvbm5lY3RlZCcsICdWTkMgZGlzY29ubmVjdGVkJyArIG1zZyk7XG5cdFx0fSBlbHNlIGlmICh0aGlzLl9yZmJfc3RhdGUgPT09ICdQcm90b2NvbFZlcnNpb24nKSB7XG5cdFx0XHR0aGlzLl9mYWlsKCdGYWlsZWQgdG8gY29ubmVjdCB0byBzZXJ2ZXInICsgbXNnKTtcblx0XHR9IGVsc2UgaWYgKHRoaXMuX3JmYl9zdGF0ZSBpbiB7J2ZhaWxlZCc6IDEsICdkaXNjb25uZWN0ZWQnOiAxfSkge1xuXHRcdFx0ZGVidWcoJ1JlY2VpdmVkIG9uY2xvc2Ugd2hpbGUgZGlzY29ubmVjdGVkJyArIG1zZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2ZhaWwoJ1NlcnZlciBkaXNjb25uZWN0ZWQnICsgbXNnKTtcblx0XHR9XG5cdFx0dGhpcy5fc29jay5vZmYoJ2Nsb3NlJyk7XG5cdH0uYmluZCh0aGlzKSk7XG5cblx0dGhpcy5fc29jay5vbignZXJyb3InLCBmdW5jdGlvbiAoKSB7XG5cdFx0ZGVidWdlcnJvcignV2ViU29ja2V0IGVycm9yJyk7XG5cdH0pO1xuXG5cdHRoaXMuX2luaXRfdmFycygpO1xuXG5cdHZhciBybW9kZSA9IHRoaXMuX2Rpc3BsYXkuZ2V0X3JlbmRlcl9tb2RlKCk7XG5cblx0dGhpcy5fdXBkYXRlU3RhdGUoJ2xvYWRlZCcsICdub1ZOQyByZWFkeTogJyArIHJtb2RlKTtcbn1cblxuXG5SRkIucHJvdG90eXBlID0ge1xuXHQvLyBQdWJsaWMgbWV0aG9kc1xuXHRjb25uZWN0OiBmdW5jdGlvbiAodXJsLCBwYXNzd29yZCkge1xuXHRcdHRoaXMuX3JmYl91cmwgPSB1cmw7XG5cdFx0dGhpcy5fcmZiX3Bhc3N3b3JkID0gKHBhc3N3b3JkICE9PSB1bmRlZmluZWQpID8gcGFzc3dvcmQgOiAnJztcblxuXHRcdHRoaXMuX3VwZGF0ZVN0YXRlKCdjb25uZWN0JywgJ0Nvbm5lY3RpbmcnKTtcblx0fSxcblxuXHRkaXNjb25uZWN0OiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fdXBkYXRlU3RhdGUoJ2Rpc2Nvbm5lY3QnLCAnRGlzY29ubmVjdGluZycpO1xuXHRcdHRoaXMuX3NvY2sub2ZmKCdlcnJvcicpO1xuXHRcdHRoaXMuX3NvY2sub2ZmKCdtZXNzYWdlJyk7XG5cdFx0dGhpcy5fc29jay5vZmYoJ29wZW4nKTtcblx0fSxcblxuXHRzZW5kUGFzc3dvcmQ6IGZ1bmN0aW9uIChwYXNzd2QpIHtcblx0XHR0aGlzLl9yZmJfcGFzc3dvcmQgPSBwYXNzd2Q7XG5cdFx0dGhpcy5fcmZiX3N0YXRlID0gJ0F1dGhlbnRpY2F0aW9uJztcblx0XHRzZXRUaW1lb3V0KHRoaXMuX2luaXRfbXNnLmJpbmQodGhpcyksIDEpO1xuXHR9LFxuXG5cdHNlbmRDdHJsQWx0RGVsOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX3JmYl9zdGF0ZSAhPT0gJ25vcm1hbCcgfHwgdGhpcy5fdmlld19vbmx5KSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0dmFyIGFyciA9IFtdO1xuXHRcdGFyciA9IGFyci5jb25jYXQoUkZCLm1lc3NhZ2VzLmtleUV2ZW50KEtleXMuWEtfQ29udHJvbF9MLCAxKSk7XG5cdFx0YXJyID0gYXJyLmNvbmNhdChSRkIubWVzc2FnZXMua2V5RXZlbnQoS2V5cy5YS19BbHRfTCwgMSkpO1xuXHRcdGFyciA9IGFyci5jb25jYXQoUkZCLm1lc3NhZ2VzLmtleUV2ZW50KEtleXMuWEtfRGVsZXRlLCAxKSk7XG5cdFx0YXJyID0gYXJyLmNvbmNhdChSRkIubWVzc2FnZXMua2V5RXZlbnQoS2V5cy5YS19EZWxldGUsIDApKTtcblx0XHRhcnIgPSBhcnIuY29uY2F0KFJGQi5tZXNzYWdlcy5rZXlFdmVudChLZXlzLlhLX0FsdF9MLCAwKSk7XG5cdFx0YXJyID0gYXJyLmNvbmNhdChSRkIubWVzc2FnZXMua2V5RXZlbnQoS2V5cy5YS19Db250cm9sX0wsIDApKTtcblx0XHR0aGlzLl9zb2NrLnNlbmQoYXJyKTtcblx0fSxcblxuXHR4dnBPcDogZnVuY3Rpb24gKHZlciwgb3ApIHtcblx0XHRpZiAodGhpcy5fcmZiX3h2cF92ZXIgPCB2ZXIpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0ZGVidWcoJ3h2cE9wKCkgfCBzZW5kaW5nIFhWUCBvcGVyYXRpb24gJyArIG9wICsgJyAodmVyc2lvbiAnICsgdmVyICsgJyknKTtcblx0XHR0aGlzLl9zb2NrLnNlbmRfc3RyaW5nKCdcXHhGQVxceDAwJyArIFN0cmluZy5mcm9tQ2hhckNvZGUodmVyKSArIFN0cmluZy5mcm9tQ2hhckNvZGUob3ApKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHR4dnBTaHV0ZG93bjogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnh2cE9wKDEsIDIpO1xuXHR9LFxuXG5cdHh2cFJlYm9vdDogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnh2cE9wKDEsIDMpO1xuXHR9LFxuXG5cdHh2cFJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMueHZwT3AoMSwgNCk7XG5cdH0sXG5cblx0Ly8gU2VuZCBhIGtleSBwcmVzcy4gSWYgJ2Rvd24nIGlzIG5vdCBzcGVjaWZpZWQgdGhlbiBzZW5kIGEgZG93biBrZXlcblx0Ly8gZm9sbG93ZWQgYnkgYW4gdXAga2V5LlxuXHRzZW5kS2V5OiBmdW5jdGlvbiAoY29kZSwgZG93bikge1xuXHRcdGlmICh0aGlzLl9yZmJfc3RhdGUgIT09ICdub3JtYWwnIHx8IHRoaXMuX3ZpZXdfb25seSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR2YXIgYXJyID0gW107XG5cdFx0aWYgKHR5cGVvZiBkb3duICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0ZGVidWcoJ3NlbmRLZXkoKSB8IHNlbmRpbmcga2V5IGNvZGUgKCcgKyAoZG93biA/ICdkb3duJyA6ICd1cCcpICsgJyk6ICcgKyBjb2RlKTtcblx0XHRcdGFyciA9IGFyci5jb25jYXQoUkZCLm1lc3NhZ2VzLmtleUV2ZW50KGNvZGUsIGRvd24gPyAxIDogMCkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWJ1Zygnc2VuZEtleSgpIHwgc2VuZGluZyBrZXkgY29kZSAoZG93biArIHVwKTogJyArIGNvZGUpO1xuXHRcdFx0YXJyID0gYXJyLmNvbmNhdChSRkIubWVzc2FnZXMua2V5RXZlbnQoY29kZSwgMSkpO1xuXHRcdFx0YXJyID0gYXJyLmNvbmNhdChSRkIubWVzc2FnZXMua2V5RXZlbnQoY29kZSwgMCkpO1xuXHRcdH1cblx0XHR0aGlzLl9zb2NrLnNlbmQoYXJyKTtcblx0fSxcblxuXHRjbGlwYm9hcmRQYXN0ZUZyb206IGZ1bmN0aW9uICh0ZXh0KSB7XG5cdFx0aWYgKHRoaXMuX3JmYl9zdGF0ZSAhPT0gJ25vcm1hbCcpIHsgcmV0dXJuOyB9XG5cdFx0dGhpcy5fc29jay5zZW5kKFJGQi5tZXNzYWdlcy5jbGllbnRDdXRUZXh0KHRleHQpKTtcblx0fSxcblxuXHRzZXREZXNrdG9wU2l6ZTogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcblx0XHRpZiAodGhpcy5fcmZiX3N0YXRlICE9PSAnbm9ybWFsJykgeyByZXR1cm47IH1cblxuXHRcdGlmICh0aGlzLl9zdXBwb3J0c1NldERlc2t0b3BTaXplKSB7XG5cblx0XHRcdHZhciBhcnIgPSBbMjUxXTsgICAgLy8gbXNnLXR5cGVcblx0XHRcdFV0aWwucHVzaDgoYXJyLCAwKTsgICAgICAgLy8gcGFkZGluZ1xuXHRcdFx0VXRpbC5wdXNoMTYoYXJyLCB3aWR0aCk7ICAvLyB3aWR0aFxuXHRcdFx0VXRpbC5wdXNoMTYoYXJyLCBoZWlnaHQpOyAvLyBoZWlnaHRcblxuXHRcdFx0VXRpbC5wdXNoOChhcnIsIDEpOyAgICAgICAvLyBudW1iZXItb2Ytc2NyZWVuc1xuXHRcdFx0VXRpbC5wdXNoOChhcnIsIDApOyAgICAgICAvLyBwYWRkaW5nXG5cblx0XHRcdC8vIHNjcmVlbiBhcnJheVxuXHRcdFx0VXRpbC5wdXNoMzIoYXJyLCB0aGlzLl9zY3JlZW5faWQpOyAgICAvLyBpZFxuXHRcdFx0VXRpbC5wdXNoMTYoYXJyLCAwKTsgICAgICAgICAgICAgICAgICAvLyB4LXBvc2l0aW9uXG5cdFx0XHRVdGlsLnB1c2gxNihhcnIsIDApOyAgICAgICAgICAgICAgICAgIC8vIHktcG9zaXRpb25cblx0XHRcdFV0aWwucHVzaDE2KGFyciwgd2lkdGgpOyAgICAgICAgICAgICAgLy8gd2lkdGhcblx0XHRcdFV0aWwucHVzaDE2KGFyciwgaGVpZ2h0KTsgICAgICAgICAgICAgLy8gaGVpZ2h0XG5cdFx0XHRVdGlsLnB1c2gzMihhcnIsIHRoaXMuX3NjcmVlbl9mbGFncyk7IC8vIGZsYWdzXG5cblx0XHRcdHRoaXMuX3NvY2suc2VuZChhcnIpO1xuXHRcdH1cblx0fSxcblxuXHQvLyBQcml2YXRlIG1ldGhvZHNcblx0X2Nvbm5lY3Q6IGZ1bmN0aW9uICgpIHtcblx0XHRkZWJ1ZygnX2Nvbm5lY3QoKSB8IGNvbm5lY3RpbmcgdG8gJyArIHRoaXMuX3JmYl91cmwpO1xuXHRcdHRoaXMuX3NvY2sub3Blbih0aGlzLl9yZmJfdXJsLCB0aGlzLl93c1Byb3RvY29scyk7XG5cdH0sXG5cblx0X2luaXRfdmFyczogZnVuY3Rpb24gKCkge1xuXHRcdC8vIHJlc2V0IHN0YXRlXG5cdFx0dGhpcy5fc29jay5pbml0KCk7XG5cblx0XHR0aGlzLl9GQlUucmVjdHMgICAgICAgID0gMDtcblx0XHR0aGlzLl9GQlUuc3VicmVjdHMgICAgID0gMDsgIC8vIFJSRSBhbmQgSEVYVElMRVxuXHRcdHRoaXMuX0ZCVS5saW5lcyAgICAgICAgPSAwOyAgLy8gUkFXXG5cdFx0dGhpcy5fRkJVLnRpbGVzICAgICAgICA9IDA7ICAvLyBIRVhUSUxFXG5cdFx0dGhpcy5fRkJVLnpsaWJzICAgICAgICA9IFtdOyAvLyBUSUdIVCB6bGliIGVuY29kZXJzXG5cdFx0dGhpcy5fbW91c2VfYnV0dG9uTWFzayA9IDA7XG5cdFx0dGhpcy5fbW91c2VfYXJyICAgICAgICA9IFtdO1xuXHRcdHRoaXMuX3JmYl90aWdodHZuYyAgICAgPSBmYWxzZTtcblxuXHRcdC8vIENsZWFyIHRoZSBwZXIgY29ubmVjdGlvbiBlbmNvZGluZyBzdGF0c1xuXHRcdHZhciBpO1xuXHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLl9lbmNvZGluZ3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRoaXMuX2VuY1N0YXRzW3RoaXMuX2VuY29kaW5nc1tpXVsxXV1bMF0gPSAwO1xuXHRcdH1cblxuXHRcdGZvciAoaSA9IDA7IGkgPCA0OyBpKyspIHtcblx0XHRcdHRoaXMuX0ZCVS56bGlic1tpXSA9IG5ldyBUSU5GKCk7XG5cdFx0XHR0aGlzLl9GQlUuemxpYnNbaV0uaW5pdCgpO1xuXHRcdH1cblx0fSxcblxuXHRfcHJpbnRfc3RhdHM6IGZ1bmN0aW9uICgpIHtcblx0XHRkZWJ1ZygnX3ByaW50X3N0YXRzKCkgfCBlbmNvZGluZyBzdGF0cyBmb3IgdGhpcyBjb25uZWN0aW9uOicpO1xuXG5cdFx0dmFyIGksIHM7XG5cdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuX2VuY29kaW5ncy5sZW5ndGg7IGkrKykge1xuXHRcdFx0cyA9IHRoaXMuX2VuY1N0YXRzW3RoaXMuX2VuY29kaW5nc1tpXVsxXV07XG5cdFx0XHRpZiAoc1swXSArIHNbMV0gPiAwKSB7XG5cdFx0XHRcdGRlYnVnKCdfcHJpbnRfc3RhdHMoKSB8ICcgKyB0aGlzLl9lbmNvZGluZ3NbaV1bMF0gKyAnOiAnICsgc1swXSArICcgcmVjdHMnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRkZWJ1ZygnX3ByaW50X3N0YXRzKCkgfCBlbmNvZGluZyBzdGF0cyBzaW5jZSBwYWdlIGxvYWQ6Jyk7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5fZW5jb2RpbmdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRzID0gdGhpcy5fZW5jU3RhdHNbdGhpcy5fZW5jb2RpbmdzW2ldWzFdXTtcblx0XHRcdGRlYnVnKCdfcHJpbnRfc3RhdHMoKSB8ICcgKyB0aGlzLl9lbmNvZGluZ3NbaV1bMF0gKyAnOiAnICsgc1sxXSArICcgcmVjdHMnKTtcblx0XHR9XG5cdH0sXG5cblx0X2NsZWFudXBTb2NrZXQ6IGZ1bmN0aW9uIChzdGF0ZSkge1xuXHRcdGlmICh0aGlzLl9zZW5kVGltZXIpIHtcblx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5fc2VuZFRpbWVyKTtcblx0XHRcdHRoaXMuX3NlbmRUaW1lciA9IG51bGw7XG5cdFx0fVxuXHRcdGlmICh0aGlzLl9tc2dUaW1lcikge1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLl9tc2dUaW1lcik7XG5cdFx0XHR0aGlzLl9tc2dUaW1lciA9IG51bGw7XG5cdFx0fVxuXHRcdGlmICh0aGlzLl9kaXNwbGF5ICYmIHRoaXMuX2Rpc3BsYXkuZ2V0X2NvbnRleHQoKSkge1xuXHRcdFx0dGhpcy5fa2V5Ym9hcmQudW5ncmFiKCk7XG5cdFx0XHR0aGlzLl9tb3VzZS51bmdyYWIoKTtcblx0XHRcdGlmIChzdGF0ZSAhPT0gJ2Nvbm5lY3QnICYmIHN0YXRlICE9PSAnbG9hZGVkJykge1xuXHRcdFx0XHR0aGlzLl9kaXNwbGF5LmRlZmF1bHRDdXJzb3IoKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX2Rpc3BsYXkuY2xlYXIoKTtcblx0XHR9XG5cblx0XHR0aGlzLl9zb2NrLmNsb3NlKCk7XG5cdH0sXG5cblxuXHQvKlxuXHQgKiBQYWdlIHN0YXRlczpcblx0ICogICBsb2FkZWQgICAgICAgLSBwYWdlIGxvYWQsIGVxdWl2YWxlbnQgdG8gZGlzY29ubmVjdGVkXG5cdCAqICAgZGlzY29ubmVjdGVkIC0gaWRsZSBzdGF0ZVxuXHQgKiAgIGNvbm5lY3QgICAgICAtIHN0YXJ0aW5nIHRvIGNvbm5lY3QgKHRvIFByb3RvY29sVmVyc2lvbilcblx0ICogICBub3JtYWwgICAgICAgLSBjb25uZWN0ZWRcblx0ICogICBkaXNjb25uZWN0ICAgLSBzdGFydGluZyB0byBkaXNjb25uZWN0XG5cdCAqICAgZmFpbGVkICAgICAgIC0gYWJub3JtYWwgZGlzY29ubmVjdFxuXHQgKiAgIGZhdGFsICAgICAgICAtIGZhaWxlZCB0byBsb2FkIHBhZ2UsIG9yIGZhdGFsIGVycm9yXG5cdCAqXG5cdCAqIFJGQiBwcm90b2NvbCBpbml0aWFsaXphdGlvbiBzdGF0ZXM6XG5cdCAqICAgUHJvdG9jb2xWZXJzaW9uXG5cdCAqICAgU2VjdXJpdHlcblx0ICogICBBdXRoZW50aWNhdGlvblxuXHQgKiAgIHBhc3N3b3JkICAgICAtIHdhaXRpbmcgZm9yIHBhc3N3b3JkLCBub3QgcGFydCBvZiBSRkJcblx0ICogICBTZWN1cml0eVJlc3VsdFxuXHQgKiAgIENsaWVudEluaXRpYWxpemF0aW9uIC0gbm90IHRyaWdnZXJlZCBieSBzZXJ2ZXIgbWVzc2FnZVxuXHQgKiAgIFNlcnZlckluaXRpYWxpemF0aW9uICh0byBub3JtYWwpXG5cdCAqL1xuXHRfdXBkYXRlU3RhdGU6IGZ1bmN0aW9uIChzdGF0ZSwgc3RhdHVzTXNnKSB7XG5cdFx0ZGVidWcoJ191cGRhdGVTdGF0ZSgpIHwgW3N0YXRlOiVzLCBtc2c6XCIlc1wiXScsIHN0YXRlLCBzdGF0dXNNc2cpO1xuXG5cdFx0dmFyIG9sZHN0YXRlID0gdGhpcy5fcmZiX3N0YXRlO1xuXG5cdFx0aWYgKHN0YXRlID09PSBvbGRzdGF0ZSkge1xuXHRcdFx0Ly8gQWxyZWFkeSBoZXJlLCBpZ25vcmVcblx0XHRcdGRlYnVnKCdfdXBkYXRlU3RhdGUoKSB8IGFscmVhZHkgaW4gc3RhdGUgXCInICsgc3RhdGUgKyAnXCIsIGlnbm9yaW5nJyk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Lypcblx0XHQgKiBUaGVzZSBhcmUgZGlzY29ubmVjdGVkIHN0YXRlcy4gQSBwcmV2aW91cyBjb25uZWN0IG1heVxuXHRcdCAqIGFzeW5jaHJvbm91c2x5IGNhdXNlIGEgY29ubmVjdGlvbiBzbyBtYWtlIHN1cmUgd2UgYXJlIGNsb3NlZC5cblx0XHQgKi9cblx0XHRpZiAoc3RhdGUgaW4geydkaXNjb25uZWN0ZWQnOiAxLCAnbG9hZGVkJzogMSwgJ2Nvbm5lY3QnOiAxLFxuXHRcdFx0J2Rpc2Nvbm5lY3QnOiAxLCAnZmFpbGVkJzogMSwgJ2ZhdGFsJzogMX0pIHtcblx0XHRcdHRoaXMuX2NsZWFudXBTb2NrZXQoc3RhdGUpO1xuXHRcdH1cblxuXHRcdGlmIChvbGRzdGF0ZSA9PT0gJ2ZhdGFsJykge1xuXHRcdFx0ZGVidWdlcnJvcignX3VwZGF0ZVN0YXRlKCkgfCBmYXRhbCBlcnJvciwgY2Fubm90IGNvbnRpbnVlJyk7XG5cdFx0fVxuXG5cdFx0aWYgKHN0YXR1c01zZyAmJiAoc3RhdGUgPT09ICdmYWlsZWQnIHx8IHN0YXRlID09PSAnZmF0YWwnKSkge1xuXHRcdFx0ZGVidWdlcnJvcignX3VwZGF0ZVN0YXRlKCkgfCAlczogJXMnLCBzdGF0ZSwgc3RhdHVzTXNnKTtcblx0XHR9XG5cblx0XHRpZiAob2xkc3RhdGUgPT09ICdmYWlsZWQnICYmIHN0YXRlID09PSAnZGlzY29ubmVjdGVkJykge1xuXHRcdFx0Ly8gZG8gZGlzY29ubmVjdCBhY3Rpb24sIGJ1dCBzdGF5IGluIGZhaWxlZCBzdGF0ZVxuXHRcdFx0dGhpcy5fcmZiX3N0YXRlID0gJ2ZhaWxlZCc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3JmYl9zdGF0ZSA9IHN0YXRlO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9kaXNjb25uVGltZXIgJiYgdGhpcy5fcmZiX3N0YXRlICE9PSAnZGlzY29ubmVjdCcpIHtcblx0XHRcdGRlYnVnKCdfdXBkYXRlU3RhdGUoKSB8IGNsZWFyaW5nIGRpc2Nvbm5lY3QgdGltZXInKTtcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLl9kaXNjb25uVGltZXIpO1xuXHRcdFx0dGhpcy5fZGlzY29ublRpbWVyID0gbnVsbDtcblx0XHRcdHRoaXMuX3NvY2sub2ZmKCdjbG9zZScpOyAgLy8gbWFrZSBzdXJlIHdlIGRvbid0IGdldCBhIGRvdWJsZSBldmVudFxuXHRcdH1cblxuXHRcdHN3aXRjaCAoc3RhdGUpIHtcblx0XHRcdGNhc2UgJ25vcm1hbCc6XG5cdFx0XHRcdGlmIChvbGRzdGF0ZSA9PT0gJ2Rpc2Nvbm5lY3RlZCcgfHwgb2xkc3RhdGUgPT09ICdmYWlsZWQnKSB7XG5cdFx0XHRcdFx0ZGVidWdlcnJvcignX3VwZGF0ZVN0YXRlKCkgfCBpbnZhbGlkIHRyYW5zaXRpb24gZnJvbSBcImRpc2Nvbm5lY3RlZFwiIG9yIFwiZmFpbGVkXCIgdG8gXCJub3JtYWxcIicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdjb25uZWN0Jzpcblx0XHRcdFx0dGhpcy5faW5pdF92YXJzKCk7XG5cdFx0XHRcdHRoaXMuX2Nvbm5lY3QoKTtcblx0XHRcdFx0Ly8gV2ViU29ja2V0Lm9ub3BlbiB0cmFuc2l0aW9ucyB0byAnUHJvdG9jb2xWZXJzaW9uJ1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnZGlzY29ubmVjdCc6XG5cdFx0XHRcdHRoaXMuX2Rpc2Nvbm5UaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHRoaXMuX2ZhaWwoJ0Rpc2Nvbm5lY3QgdGltZW91dCcpO1xuXHRcdFx0XHR9LmJpbmQodGhpcyksIHRoaXMuX2Rpc2Nvbm5lY3RUaW1lb3V0ICogMTAwMCk7XG5cblx0XHRcdFx0dGhpcy5fcHJpbnRfc3RhdHMoKTtcblxuXHRcdFx0XHQvLyBXZWJTb2NrZXQub25jbG9zZSB0cmFuc2l0aW9ucyB0byAnZGlzY29ubmVjdGVkJ1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnZmFpbGVkJzpcblx0XHRcdFx0aWYgKG9sZHN0YXRlID09PSAnZGlzY29ubmVjdGVkJykge1xuXHRcdFx0XHRcdGRlYnVnZXJyb3IoJ191cGRhdGVTdGF0ZSgpIHwgaW52YWxpZCB0cmFuc2l0aW9uIGZyb20gXCJkaXNjb25uZWN0ZWRcIiB0byBcImZhaWxlZFwiJyk7XG5cdFx0XHRcdH0gZWxzZSBpZiAob2xkc3RhdGUgPT09ICdub3JtYWwnKSB7XG5cdFx0XHRcdFx0ZGVidWdlcnJvcignX3VwZGF0ZVN0YXRlKCkgfCBlcnJvciB3aGlsZSBjb25uZWN0ZWQnKTtcblx0XHRcdFx0fSBlbHNlIGlmIChvbGRzdGF0ZSA9PT0gJ2luaXQnKSB7XG5cdFx0XHRcdFx0ZGVidWdlcnJvcignX3VwZGF0ZVN0YXRlKCkgfCBlcnJvciB3aGlsZSBpbml0aWFsaXppbmcnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIE1ha2Ugc3VyZSB3ZSB0cmFuc2l0aW9uIHRvIGRpc2Nvbm5lY3RlZFxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR0aGlzLl91cGRhdGVTdGF0ZSgnZGlzY29ubmVjdGVkJyk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSwgNTApO1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHQvLyBObyBzdGF0ZSBjaGFuZ2UgYWN0aW9uIHRvIHRha2Vcblx0XHR9XG5cblx0XHRpZiAob2xkc3RhdGUgPT09ICdmYWlsZWQnICYmIHN0YXRlID09PSAnZGlzY29ubmVjdGVkJykge1xuXHRcdFx0dGhpcy5fb25VcGRhdGVTdGF0ZSh0aGlzLCBzdGF0ZSwgb2xkc3RhdGUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9vblVwZGF0ZVN0YXRlKHRoaXMsIHN0YXRlLCBvbGRzdGF0ZSwgc3RhdHVzTXNnKTtcblx0XHR9XG5cdH0sXG5cblx0X2ZhaWw6IGZ1bmN0aW9uIChtc2cpIHtcblx0XHR0aGlzLl91cGRhdGVTdGF0ZSgnZmFpbGVkJywgbXNnKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0X2hhbmRsZV9tZXNzYWdlOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX3NvY2suclFsZW4oKSA9PT0gMCkge1xuXHRcdFx0ZGVidWdlcnJvcignX2hhbmRsZV9tZXNzYWdlKCkgfCBjYWxsZWQgb24gYW4gZW1wdHkgcmVjZWl2ZSBxdWV1ZScpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHN3aXRjaCAodGhpcy5fcmZiX3N0YXRlKSB7XG5cdFx0XHRjYXNlICdkaXNjb25uZWN0ZWQnOlxuXHRcdFx0Y2FzZSAnZmFpbGVkJzpcblx0XHRcdFx0ZGVidWdlcnJvcignX2hhbmRsZV9tZXNzYWdlKCkgfCBnb3QgZGF0YSB3aGlsZSBkaXNjb25uZWN0ZWQnKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdub3JtYWwnOlxuXHRcdFx0XHRpZiAodGhpcy5fbm9ybWFsX21zZygpICYmIHRoaXMuX3NvY2suclFsZW4oKSA+IDApIHtcblx0XHRcdFx0XHQvLyB0cnVlIG1lYW5zIHdlIGNhbiBjb250aW51ZSBwcm9jZXNzaW5nXG5cdFx0XHRcdFx0Ly8gR2l2ZSBvdGhlciBldmVudHMgYSBjaGFuY2UgdG8gcnVuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX21zZ1RpbWVyID09PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRkZWJ1ZygnX2hhbmRsZV9tZXNzYWdlKCkgfCBtb3JlIGRhdGEgdG8gcHJvY2VzcywgY3JlYXRpbmcgdGltZXInKTtcblx0XHRcdFx0XHRcdHRoaXMuX21zZ1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX21zZ1RpbWVyID0gbnVsbDtcblx0XHRcdFx0XHRcdFx0dGhpcy5faGFuZGxlX21lc3NhZ2UoKTtcblx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSwgMTApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRkZWJ1ZygnX2hhbmRsZV9tZXNzYWdlKCkgfCBtb3JlIGRhdGEgdG8gcHJvY2VzcywgZXhpc3RpbmcgdGltZXInKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aGlzLl9pbml0X21zZygpO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH0sXG5cblx0X2NoZWNrRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX3JmYl9zdGF0ZSA9PT0gJ25vcm1hbCcgJiYgIXRoaXMuX3ZpZXdwb3J0RHJhZ2dpbmcgJiYgdGhpcy5fbW91c2VfYXJyLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMuX3NvY2suc2VuZCh0aGlzLl9tb3VzZV9hcnIpO1xuXHRcdFx0dGhpcy5fbW91c2VfYXJyID0gW107XG5cdFx0fVxuXHR9LFxuXG5cdF9oYW5kbGVLZXlQcmVzczogZnVuY3Rpb24gKGtleXN5bSwgZG93bikge1xuXHRcdGlmICh0aGlzLl92aWV3X29ubHkpIHsgcmV0dXJuOyB9IC8vIFZpZXcgb25seSwgc2tpcCBrZXlib2FyZCwgZXZlbnRzXG5cdFx0dGhpcy5fc29jay5zZW5kKFJGQi5tZXNzYWdlcy5rZXlFdmVudChrZXlzeW0sIGRvd24pKTtcblx0fSxcblxuXHRfaGFuZGxlTW91c2VCdXR0b246IGZ1bmN0aW9uICh4LCB5LCBkb3duLCBibWFzaykge1xuXHRcdGlmIChkb3duKSB7XG5cdFx0XHR0aGlzLl9tb3VzZV9idXR0b25NYXNrIHw9IGJtYXNrO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9tb3VzZV9idXR0b25NYXNrIF49IGJtYXNrO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl92aWV3cG9ydERyYWcpIHtcblx0XHRcdGlmIChkb3duICYmICF0aGlzLl92aWV3cG9ydERyYWdnaW5nKSB7XG5cdFx0XHRcdHRoaXMuX3ZpZXdwb3J0RHJhZ2dpbmcgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLl92aWV3cG9ydERyYWdQb3MgPSB7J3gnOiB4LCAneSc6IHl9O1xuXG5cdFx0XHRcdC8vIFNraXAgc2VuZGluZyBtb3VzZSBldmVudHNcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fdmlld3BvcnREcmFnZ2luZyA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICh0aGlzLl92aWV3X29ubHkpIHsgcmV0dXJuOyB9IC8vIFZpZXcgb25seSwgc2tpcCBtb3VzZSBldmVudHNcblxuXHRcdHRoaXMuX21vdXNlX2FyciA9IHRoaXMuX21vdXNlX2Fyci5jb25jYXQoXG5cdFx0XHRcdFJGQi5tZXNzYWdlcy5wb2ludGVyRXZlbnQodGhpcy5fZGlzcGxheS5hYnNYKHgpLCB0aGlzLl9kaXNwbGF5LmFic1koeSksIHRoaXMuX21vdXNlX2J1dHRvbk1hc2spKTtcblx0XHR0aGlzLl9zb2NrLnNlbmQodGhpcy5fbW91c2VfYXJyKTtcblx0XHR0aGlzLl9tb3VzZV9hcnIgPSBbXTtcblx0fSxcblxuXHRfaGFuZGxlTW91c2VNb3ZlOiBmdW5jdGlvbiAoeCwgeSkge1xuXHRcdGlmICh0aGlzLl92aWV3cG9ydERyYWdnaW5nKSB7XG5cdFx0XHR2YXIgZGVsdGFYID0gdGhpcy5fdmlld3BvcnREcmFnUG9zLnggLSB4O1xuXHRcdFx0dmFyIGRlbHRhWSA9IHRoaXMuX3ZpZXdwb3J0RHJhZ1Bvcy55IC0geTtcblx0XHRcdHRoaXMuX3ZpZXdwb3J0RHJhZ1BvcyA9IHsneCc6IHgsICd5JzogeX07XG5cblx0XHRcdHRoaXMuX2Rpc3BsYXkudmlld3BvcnRDaGFuZ2VQb3MoZGVsdGFYLCBkZWx0YVkpO1xuXG5cdFx0XHQvLyBTa2lwIHNlbmRpbmcgbW91c2UgZXZlbnRzXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX3ZpZXdfb25seSkgeyByZXR1cm47IH0gLy8gVmlldyBvbmx5LCBza2lwIG1vdXNlIGV2ZW50c1xuXG5cdFx0dGhpcy5fbW91c2VfYXJyID0gdGhpcy5fbW91c2VfYXJyLmNvbmNhdChcblx0XHRcdFx0UkZCLm1lc3NhZ2VzLnBvaW50ZXJFdmVudCh0aGlzLl9kaXNwbGF5LmFic1goeCksIHRoaXMuX2Rpc3BsYXkuYWJzWSh5KSwgdGhpcy5fbW91c2VfYnV0dG9uTWFzaykpO1xuXG5cdFx0dGhpcy5fY2hlY2tFdmVudHMoKTtcblx0fSxcblxuXHQvLyBNZXNzYWdlIEhhbmRsZXJzXG5cblx0X25lZ290aWF0ZV9wcm90b2NvbF92ZXJzaW9uOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX3NvY2suclFsZW4oKSA8IDEyKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fZmFpbCgnSW5jb21wbGV0ZSBwcm90b2NvbCB2ZXJzaW9uJyk7XG5cdFx0fVxuXG5cdFx0dmFyIHN2ZXJzaW9uID0gdGhpcy5fc29jay5yUXNoaWZ0U3RyKDEyKS5zdWJzdHIoNCwgNyk7XG5cdFx0ZGVidWcoJ19uZWdvdGlhdGVfcHJvdG9jb2xfdmVyc2lvbigpIHwgc2VydmVyIFByb3RvY29sVmVyc2lvbjogJyArIHN2ZXJzaW9uKTtcblx0XHR2YXIgaXNfcmVwZWF0ZXIgPSAwO1xuXG5cdFx0c3dpdGNoIChzdmVyc2lvbikge1xuXHRcdFx0Y2FzZSAnMDAwLjAwMCc6ICAvLyBVbHRyYVZOQyByZXBlYXRlclxuXHRcdFx0XHRpc19yZXBlYXRlciA9IDE7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnMDAzLjAwMyc6XG5cdFx0XHRjYXNlICcwMDMuMDA2JzogIC8vIFVsdHJhVk5DXG5cdFx0XHRjYXNlICcwMDMuODg5JzogIC8vIEFwcGxlIFJlbW90ZSBEZXNrdG9wXG5cdFx0XHRcdHRoaXMuX3JmYl92ZXJzaW9uID0gMy4zO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJzAwMy4wMDcnOlxuXHRcdFx0XHR0aGlzLl9yZmJfdmVyc2lvbiA9IDMuNztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICcwMDMuMDA4Jzpcblx0XHRcdGNhc2UgJzAwNC4wMDAnOiAgLy8gSW50ZWwgQU1UIEtWTVxuXHRcdFx0Y2FzZSAnMDA0LjAwMSc6ICAvLyBSZWFsVk5DIDQuNlxuXHRcdFx0XHR0aGlzLl9yZmJfdmVyc2lvbiA9IDMuODtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZmFpbCgnSW52YWxpZCBzZXJ2ZXIgdmVyc2lvbiAnICsgc3ZlcnNpb24pO1xuXHRcdH1cblxuXHRcdGlmIChpc19yZXBlYXRlcikge1xuXHRcdFx0dmFyIHJlcGVhdGVySUQgPSB0aGlzLl9yZXBlYXRlcklEO1xuXHRcdFx0d2hpbGUgKHJlcGVhdGVySUQubGVuZ3RoIDwgMjUwKSB7XG5cdFx0XHRcdHJlcGVhdGVySUQgKz0gJ1xcMCc7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9zb2NrLnNlbmRfc3RyaW5nKHJlcGVhdGVySUQpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX3JmYl92ZXJzaW9uID4gdGhpcy5fcmZiX21heF92ZXJzaW9uKSB7XG5cdFx0XHR0aGlzLl9yZmJfdmVyc2lvbiA9IHRoaXMuX3JmYl9tYXhfdmVyc2lvbjtcblx0XHR9XG5cblx0XHQvLyBTZW5kIHVwZGF0ZXMgZWl0aGVyIGF0IGEgcmF0ZSBvZiAxIHVwZGF0ZSBwZXIgNTBtcywgb3Jcblx0XHQvLyB3aGF0ZXZlciBzbG93ZXIgcmF0ZSB0aGUgbmV0d29yayBjYW4gaGFuZGxlXG5cdFx0dGhpcy5fc2VuZFRpbWVyID0gc2V0SW50ZXJ2YWwodGhpcy5fc29jay5mbHVzaC5iaW5kKHRoaXMuX3NvY2spLCA1MCk7XG5cblx0XHR2YXIgY3ZlcnNpb24gPSAnMDAnICsgcGFyc2VJbnQodGhpcy5fcmZiX3ZlcnNpb24sIDEwKSArXG5cdFx0XHRcdFx0XHQgJy4wMCcgKyAoKHRoaXMuX3JmYl92ZXJzaW9uICogMTApICUgMTApO1xuXHRcdHRoaXMuX3NvY2suc2VuZF9zdHJpbmcoJ1JGQiAnICsgY3ZlcnNpb24gKyAnXFxuJyk7XG5cdFx0dGhpcy5fdXBkYXRlU3RhdGUoJ1NlY3VyaXR5JywgJ1NlbnQgUHJvdG9jb2xWZXJzaW9uOiAnICsgY3ZlcnNpb24pO1xuXHR9LFxuXG5cdF9uZWdvdGlhdGVfc2VjdXJpdHk6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fcmZiX3ZlcnNpb24gPj0gMy43KSB7XG5cdFx0XHQvLyBTZXJ2ZXIgc2VuZHMgc3VwcG9ydGVkIGxpc3QsIGNsaWVudCBkZWNpZGVzXG5cdFx0XHR2YXIgbnVtX3R5cGVzID0gdGhpcy5fc29jay5yUXNoaWZ0OCgpO1xuXHRcdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdzZWN1cml0eSB0eXBlJywgbnVtX3R5cGVzLCAxKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdFx0aWYgKG51bV90eXBlcyA9PT0gMCkge1xuXHRcdFx0XHR2YXIgc3RybGVuID0gdGhpcy5fc29jay5yUXNoaWZ0MzIoKTtcblx0XHRcdFx0dmFyIHJlYXNvbiA9IHRoaXMuX3NvY2suclFzaGlmdFN0cihzdHJsZW4pO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZmFpbCgnU2VjdXJpdHkgZmFpbHVyZTogJyArIHJlYXNvbik7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3JmYl9hdXRoX3NjaGVtZSA9IDA7XG5cdFx0XHR2YXIgdHlwZXMgPSB0aGlzLl9zb2NrLnJRc2hpZnRCeXRlcyhudW1fdHlwZXMpO1xuXHRcdFx0ZGVidWcoJ19uZWdvdGlhdGVfc2VjdXJpdHkoKSB8IHNlcnZlciBzZWN1cml0eSB0eXBlczogJyArIHR5cGVzKTtcblxuXHRcdFx0aWYgKCEgdGhpcy5fZm9yY2VBdXRoU2NoZW1lKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZiAodHlwZXNbaV0gPiB0aGlzLl9yZmJfYXV0aF9zY2hlbWUgJiYgKHR5cGVzW2ldIDw9IDE2IHx8IHR5cGVzW2ldID09PSAyMikpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3JmYl9hdXRoX3NjaGVtZSA9IHR5cGVzW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuX3JmYl9hdXRoX3NjaGVtZSA9IHRoaXMuX2ZvcmNlQXV0aFNjaGVtZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX3JmYl9hdXRoX3NjaGVtZSA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZmFpbCgnVW5zdXBwb3J0ZWQgc2VjdXJpdHkgdHlwZXM6ICcgKyB0eXBlcyk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3NvY2suc2VuZChbdGhpcy5fcmZiX2F1dGhfc2NoZW1lXSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIFNlcnZlciBkZWNpZGVzXG5cdFx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ3NlY3VyaXR5IHNjaGVtZScsIDQpKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0dGhpcy5fcmZiX2F1dGhfc2NoZW1lID0gdGhpcy5fc29jay5yUXNoaWZ0MzIoKTtcblx0XHR9XG5cblx0XHR0aGlzLl91cGRhdGVTdGF0ZSgnQXV0aGVudGljYXRpb24nLCAnQXV0aGVudGljYXRpbmcgdXNpbmcgc2NoZW1lOiAnICsgdGhpcy5fcmZiX2F1dGhfc2NoZW1lKTtcblx0XHRyZXR1cm4gdGhpcy5faW5pdF9tc2coKTsgLy8ganVtcCB0byBhdXRoZW50aWNhdGlvblxuXHR9LFxuXG5cdC8vIGF1dGhlbnRpY2F0aW9uXG5cdF9uZWdvdGlhdGVfeHZwX2F1dGg6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgeHZwX3NlcCA9IHRoaXMuX3h2cF9wYXNzd29yZF9zZXA7XG5cdFx0dmFyIHh2cF9hdXRoID0gdGhpcy5fcmZiX3Bhc3N3b3JkLnNwbGl0KHh2cF9zZXApO1xuXHRcdGlmICh4dnBfYXV0aC5sZW5ndGggPCAzKSB7XG5cdFx0XHR0aGlzLl91cGRhdGVTdGF0ZSgncGFzc3dvcmQnLCAnWFZQIGNyZWRlbnRpYWxzIHJlcXVpcmVkICh1c2VyJyArIHh2cF9zZXAgK1xuXHRcdFx0XHRcdFx0XHRcdCd0YXJnZXQnICsgeHZwX3NlcCArICdwYXNzd29yZCkgLS0gZ290IG9ubHkgJyArIHRoaXMuX3JmYl9wYXNzd29yZCk7XG5cdFx0XHR0aGlzLl9vblBhc3N3b3JkUmVxdWlyZWQodGhpcyk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0dmFyIHh2cF9hdXRoX3N0ciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoeHZwX2F1dGhbMF0ubGVuZ3RoKSArXG5cdFx0XHRcdFx0XHRcdCBTdHJpbmcuZnJvbUNoYXJDb2RlKHh2cF9hdXRoWzFdLmxlbmd0aCkgK1xuXHRcdFx0XHRcdFx0XHQgeHZwX2F1dGhbMF0gK1xuXHRcdFx0XHRcdFx0XHQgeHZwX2F1dGhbMV07XG5cdFx0dGhpcy5fc29jay5zZW5kX3N0cmluZyh4dnBfYXV0aF9zdHIpO1xuXHRcdHRoaXMuX3JmYl9wYXNzd29yZCA9IHh2cF9hdXRoLnNsaWNlKDIpLmpvaW4oeHZwX3NlcCk7XG5cdFx0dGhpcy5fcmZiX2F1dGhfc2NoZW1lID0gMjtcblx0XHRyZXR1cm4gdGhpcy5fbmVnb3RpYXRlX2F1dGhlbnRpY2F0aW9uKCk7XG5cdH0sXG5cblx0X25lZ290aWF0ZV9zdGRfdm5jX2F1dGg6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fcmZiX3Bhc3N3b3JkLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0Ly8gTm90aWZ5IHZpYSBib3RoIGNhbGxiYWNrcyBzaW5jZSBpdCdzIGtpbmQgb2Zcblx0XHRcdC8vIGFuIFJGQiBzdGF0ZSBjaGFuZ2UgYW5kIGEgVUkgaW50ZXJmYWNlIGlzc3VlXG5cdFx0XHR0aGlzLl91cGRhdGVTdGF0ZSgncGFzc3dvcmQnLCAnUGFzc3dvcmQgUmVxdWlyZWQnKTtcblx0XHRcdHRoaXMuX29uUGFzc3dvcmRSZXF1aXJlZCh0aGlzKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ2F1dGggY2hhbGxlbmdlJywgMTYpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0dmFyIGNoYWxsZW5nZSA9IHRoaXMuX3NvY2suclFzaGlmdEJ5dGVzKDE2KTtcblx0XHR2YXIgcmVzcG9uc2UgPSBSRkIuZ2VuREVTKHRoaXMuX3JmYl9wYXNzd29yZCwgY2hhbGxlbmdlKTtcblx0XHR0aGlzLl9zb2NrLnNlbmQocmVzcG9uc2UpO1xuXHRcdHRoaXMuX3VwZGF0ZVN0YXRlKCdTZWN1cml0eVJlc3VsdCcpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdF9uZWdvdGlhdGVfdGlnaHRfdHVubmVsczogZnVuY3Rpb24gKG51bVR1bm5lbHMpIHtcblx0XHR2YXIgY2xpZW50U3VwcG9ydGVkVHVubmVsVHlwZXMgPSB7XG5cdFx0XHQwOiB7IHZlbmRvcjogJ1RHSFQnLCBzaWduYXR1cmU6ICdOT1RVTk5FTCcgfVxuXHRcdH07XG5cdFx0dmFyIHNlcnZlclN1cHBvcnRlZFR1bm5lbFR5cGVzID0ge307XG5cdFx0Ly8gcmVjZWl2ZSB0dW5uZWwgY2FwYWJpbGl0aWVzXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBudW1UdW5uZWxzOyBpKyspIHtcblx0XHRcdHZhciBjYXBfY29kZSA9IHRoaXMuX3NvY2suclFzaGlmdDMyKCk7XG5cdFx0XHR2YXIgY2FwX3ZlbmRvciA9IHRoaXMuX3NvY2suclFzaGlmdFN0cig0KTtcblx0XHRcdHZhciBjYXBfc2lnbmF0dXJlID0gdGhpcy5fc29jay5yUXNoaWZ0U3RyKDgpO1xuXHRcdFx0c2VydmVyU3VwcG9ydGVkVHVubmVsVHlwZXNbY2FwX2NvZGVdID0geyB2ZW5kb3I6IGNhcF92ZW5kb3IsIHNpZ25hdHVyZTogY2FwX3NpZ25hdHVyZSB9O1xuXHRcdH1cblxuXHRcdC8vIGNob29zZSB0aGUgbm90dW5uZWwgdHlwZVxuXHRcdGlmIChzZXJ2ZXJTdXBwb3J0ZWRUdW5uZWxUeXBlc1swXSkge1xuXHRcdFx0aWYgKHNlcnZlclN1cHBvcnRlZFR1bm5lbFR5cGVzWzBdLnZlbmRvciAhPT0gY2xpZW50U3VwcG9ydGVkVHVubmVsVHlwZXNbMF0udmVuZG9yIHx8XG5cdFx0XHRcdHNlcnZlclN1cHBvcnRlZFR1bm5lbFR5cGVzWzBdLnNpZ25hdHVyZSAhPT0gY2xpZW50U3VwcG9ydGVkVHVubmVsVHlwZXNbMF0uc2lnbmF0dXJlKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9mYWlsKCdDbGllbnRcXCdzIHR1bm5lbCB0eXBlIGhhZCB0aGUgaW5jb3JyZWN0IHZlbmRvciBvciBzaWduYXR1cmUnKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX3NvY2suc2VuZChbMCwgMCwgMCwgMF0pOyAgLy8gdXNlIE5PVFVOTkVMXG5cdFx0XHRyZXR1cm4gZmFsc2U7IC8vIHdhaXQgdW50aWwgd2UgcmVjZWl2ZSB0aGUgc3ViIGF1dGggY291bnQgdG8gY29udGludWVcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2ZhaWwoJ1NlcnZlciB3YW50ZWQgdHVubmVscywgYnV0IGRvZXNuXFwndCBzdXBwb3J0IHRoZSBub3R1bm5lbCB0eXBlJyk7XG5cdFx0fVxuXHR9LFxuXG5cdF9uZWdvdGlhdGVfdGlnaHRfYXV0aDogZnVuY3Rpb24gKCkge1xuXHRcdGlmICghdGhpcy5fcmZiX3RpZ2h0dm5jKSB7ICAvLyBmaXJzdCBwYXNzLCBkbyB0aGUgdHVubmVsIG5lZ290aWF0aW9uXG5cdFx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ251bSB0dW5uZWxzJywgNCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHR2YXIgbnVtVHVubmVscyA9IHRoaXMuX3NvY2suclFzaGlmdDMyKCk7XG5cdFx0XHRpZiAobnVtVHVubmVscyA+IDAgJiYgdGhpcy5fc29jay5yUXdhaXQoJ3R1bm5lbCBjYXBhYmlsaXRpZXMnLCAxNiAqIG51bVR1bm5lbHMsIDQpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0XHR0aGlzLl9yZmJfdGlnaHR2bmMgPSB0cnVlO1xuXG5cdFx0XHRpZiAobnVtVHVubmVscyA+IDApIHtcblx0XHRcdFx0dGhpcy5fbmVnb3RpYXRlX3RpZ2h0X3R1bm5lbHMobnVtVHVubmVscyk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTsgIC8vIHdhaXQgdW50aWwgd2UgcmVjZWl2ZSB0aGUgc3ViIGF1dGggdG8gY29udGludWVcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBzZWNvbmQgcGFzcywgZG8gdGhlIHN1Yi1hdXRoIG5lZ290aWF0aW9uXG5cdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdzdWIgYXV0aCBjb3VudCcsIDQpKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdHZhciBzdWJBdXRoQ291bnQgPSB0aGlzLl9zb2NrLnJRc2hpZnQzMigpO1xuXHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgnc3ViIGF1dGggY2FwYWJpbGl0aWVzJywgMTYgKiBzdWJBdXRoQ291bnQsIDQpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0dmFyIGNsaWVudFN1cHBvcnRlZFR5cGVzID0ge1xuXHRcdFx0J1NURFZOT0FVVEhfXyc6IDEsXG5cdFx0XHQnU1REVlZOQ0FVVEhfJzogMlxuXHRcdH07XG5cblx0XHR2YXIgc2VydmVyU3VwcG9ydGVkVHlwZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ViQXV0aENvdW50OyBpKyspIHtcblx0XHRcdHZhciBjYXBhYmlsaXRpZXMgPSB0aGlzLl9zb2NrLnJRc2hpZnRTdHIoMTIpO1xuXHRcdFx0c2VydmVyU3VwcG9ydGVkVHlwZXMucHVzaChjYXBhYmlsaXRpZXMpO1xuXHRcdH1cblxuXHRcdGRlYnVnKCdfbmVnb3RpYXRlX3RpZ2h0X2F1dGgoKSB8IGNsaWVudFN1cHBvcnRlZFR5cGVzOiAlbycsIGNsaWVudFN1cHBvcnRlZFR5cGVzKTtcblx0XHRkZWJ1ZygnX25lZ290aWF0ZV90aWdodF9hdXRoKCkgfCBzZXJ2ZXJTdXBwb3J0ZWRUeXBlczogJW8nLCBzZXJ2ZXJTdXBwb3J0ZWRUeXBlcyk7XG5cblx0XHRmb3IgKHZhciBhdXRoVHlwZSBpbiBjbGllbnRTdXBwb3J0ZWRUeXBlcykge1xuXHRcdFx0aWYgKHNlcnZlclN1cHBvcnRlZFR5cGVzLmluZGV4T2YoYXV0aFR5cGUpICE9PSAtMSkge1xuXHRcdFx0XHR0aGlzLl9zb2NrLnNlbmQoWzAsIDAsIDAsIGNsaWVudFN1cHBvcnRlZFR5cGVzW2F1dGhUeXBlXV0pO1xuXG5cdFx0XHRcdHN3aXRjaCAoYXV0aFR5cGUpIHtcblx0XHRcdFx0XHRjYXNlICdTVERWTk9BVVRIX18nOiAgLy8gbm8gYXV0aFxuXHRcdFx0XHRcdFx0dGhpcy5fdXBkYXRlU3RhdGUoJ1NlY3VyaXR5UmVzdWx0Jyk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRjYXNlICdTVERWVk5DQVVUSF8nOiAvLyBWTkMgYXV0aFxuXHRcdFx0XHRcdFx0dGhpcy5fcmZiX2F1dGhfc2NoZW1lID0gMjtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl9pbml0X21zZygpO1xuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fZmFpbCgnVW5zdXBwb3J0ZWQgdGlueSBhdXRoIHNjaGVtZTogJyArIGF1dGhUeXBlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuX2ZhaWwoJ05vIHN1cHBvcnRlZCBzdWItYXV0aCB0eXBlcyEnKTtcblx0fSxcblxuXHRfbmVnb3RpYXRlX2F1dGhlbnRpY2F0aW9uOiBmdW5jdGlvbiAoKSB7XG5cdFx0c3dpdGNoICh0aGlzLl9yZmJfYXV0aF9zY2hlbWUpIHtcblx0XHRcdGNhc2UgMDogIC8vIGNvbm5lY3Rpb24gZmFpbGVkXG5cdFx0XHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgnYXV0aCByZWFzb24nLCA0KSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdFx0dmFyIHN0cmxlbiA9IHRoaXMuX3NvY2suclFzaGlmdDMyKCk7XG5cdFx0XHRcdHZhciByZWFzb24gPSB0aGlzLl9zb2NrLnJRc2hpZnRTdHIoc3RybGVuKTtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2ZhaWwoJ0F1dGggZmFpbHVyZTogJyArIHJlYXNvbik7XG5cblx0XHRcdGNhc2UgMTogIC8vIG5vIGF1dGhcblx0XHRcdFx0aWYgKHRoaXMuX3JmYl92ZXJzaW9uID49IDMuOCkge1xuXHRcdFx0XHRcdHRoaXMuX3VwZGF0ZVN0YXRlKCdTZWN1cml0eVJlc3VsdCcpO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX3VwZGF0ZVN0YXRlKCdDbGllbnRJbml0aWFsaXNhdGlvbicsICdObyBhdXRoIHJlcXVpcmVkJyk7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9pbml0X21zZygpO1xuXG5cdFx0XHRjYXNlIDIyOiAgLy8gWFZQIGF1dGhcblx0XHRcdFx0cmV0dXJuIHRoaXMuX25lZ290aWF0ZV94dnBfYXV0aCgpO1xuXG5cdFx0XHRjYXNlIDI6ICAvLyBWTkMgYXV0aGVudGljYXRpb25cblx0XHRcdFx0cmV0dXJuIHRoaXMuX25lZ290aWF0ZV9zdGRfdm5jX2F1dGgoKTtcblxuXHRcdFx0Y2FzZSAxNjogIC8vIFRpZ2h0Vk5DIFNlY3VyaXR5IFR5cGVcblx0XHRcdFx0cmV0dXJuIHRoaXMuX25lZ290aWF0ZV90aWdodF9hdXRoKCk7XG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiB0aGlzLl9mYWlsKCdVbnN1cHBvcnRlZCBhdXRoIHNjaGVtZTogJyArIHRoaXMuX3JmYl9hdXRoX3NjaGVtZSk7XG5cdFx0fVxuXHR9LFxuXG5cdF9oYW5kbGVfc2VjdXJpdHlfcmVzdWx0OiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdWTkMgYXV0aCByZXNwb25zZSAnLCA0KSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRzd2l0Y2ggKHRoaXMuX3NvY2suclFzaGlmdDMyKCkpIHtcblx0XHRcdGNhc2UgMDogIC8vIE9LXG5cdFx0XHRcdHRoaXMuX3VwZGF0ZVN0YXRlKCdDbGllbnRJbml0aWFsaXNhdGlvbicsICdBdXRoZW50aWNhdGlvbiBPSycpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5faW5pdF9tc2coKTtcblx0XHRcdGNhc2UgMTogIC8vIGZhaWxlZFxuXHRcdFx0XHRpZiAodGhpcy5fcmZiX3ZlcnNpb24gPj0gMy44KSB7XG5cdFx0XHRcdFx0dmFyIGxlbmd0aCA9IHRoaXMuX3NvY2suclFzaGlmdDMyKCk7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdTZWN1cml0eVJlc3VsdCByZWFzb24nLCBsZW5ndGgsIDgpKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0XHRcdHZhciByZWFzb24gPSB0aGlzLl9zb2NrLnJRc2hpZnRTdHIobGVuZ3RoKTtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fZmFpbChyZWFzb24pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9mYWlsKCdBdXRoZW50aWNhdGlvbiBmYWlsdXJlJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZmFpbCgnVG9vIG1hbnkgYXV0aCBhdHRlbXB0cycpO1xuXHRcdH1cblx0fSxcblxuXHRfbmVnb3RpYXRlX3NlcnZlcl9pbml0OiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdzZXJ2ZXIgaW5pdGlhbGl6YXRpb24nLCAyNCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHQvKiBTY3JlZW4gc2l6ZSAqL1xuXHRcdHRoaXMuX2ZiX3dpZHRoICA9IHRoaXMuX3NvY2suclFzaGlmdDE2KCk7XG5cdFx0dGhpcy5fZmJfaGVpZ2h0ID0gdGhpcy5fc29jay5yUXNoaWZ0MTYoKTtcblxuXHRcdC8qIFBJWEVMX0ZPUk1BVCAqL1xuXHRcdHZhciBicHAgICAgICAgICA9IHRoaXMuX3NvY2suclFzaGlmdDgoKTtcblx0XHR2YXIgZGVwdGggICAgICAgPSB0aGlzLl9zb2NrLnJRc2hpZnQ4KCk7XG5cdFx0dmFyIGJpZ19lbmRpYW4gID0gdGhpcy5fc29jay5yUXNoaWZ0OCgpO1xuXHRcdHZhciB0cnVlX2NvbG9yICA9IHRoaXMuX3NvY2suclFzaGlmdDgoKTtcblxuXHRcdHZhciByZWRfbWF4ICAgICA9IHRoaXMuX3NvY2suclFzaGlmdDE2KCk7XG5cdFx0dmFyIGdyZWVuX21heCAgID0gdGhpcy5fc29jay5yUXNoaWZ0MTYoKTtcblx0XHR2YXIgYmx1ZV9tYXggICAgPSB0aGlzLl9zb2NrLnJRc2hpZnQxNigpO1xuXHRcdHZhciByZWRfc2hpZnQgICA9IHRoaXMuX3NvY2suclFzaGlmdDgoKTtcblx0XHR2YXIgZ3JlZW5fc2hpZnQgPSB0aGlzLl9zb2NrLnJRc2hpZnQ4KCk7XG5cdFx0dmFyIGJsdWVfc2hpZnQgID0gdGhpcy5fc29jay5yUXNoaWZ0OCgpO1xuXHRcdHRoaXMuX3NvY2suclFza2lwQnl0ZXMoMyk7ICAvLyBwYWRkaW5nXG5cblx0XHQvLyBOQihkaXJlY3R4bWFuMTIpOiB3ZSBkb24ndCB3YW50IHRvIGNhbGwgYW55IGNhbGxiYWNrcyBvciBwcmludCBtZXNzYWdlcyB1bnRpbFxuXHRcdC8vICAgICAgICAgICAgICAgICAgICphZnRlciogd2UncmUgcGFzdCB0aGUgcG9pbnQgd2hlcmUgd2UgY291bGQgYmFja3RyYWNrXG5cblx0XHQvKiBDb25uZWN0aW9uIG5hbWUvdGl0bGUgKi9cblx0XHR2YXIgbmFtZV9sZW5ndGggPSB0aGlzLl9zb2NrLnJRc2hpZnQzMigpO1xuXHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgnc2VydmVyIGluaXQgbmFtZScsIG5hbWVfbGVuZ3RoLCAyNCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0dGhpcy5fZmJfbmFtZSA9IFV0aWwuZGVjb2RlVVRGOCh0aGlzLl9zb2NrLnJRc2hpZnRTdHIobmFtZV9sZW5ndGgpKTtcblxuXHRcdGlmICh0aGlzLl9yZmJfdGlnaHR2bmMpIHtcblx0XHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgnVGlnaHRWTkMgZXh0ZW5kZWQgc2VydmVyIGluaXQgaGVhZGVyJywgOCwgMjQgKyBuYW1lX2xlbmd0aCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHQvLyBJbiBUaWdodFZOQyBtb2RlLCBTZXJ2ZXJJbml0IG1lc3NhZ2UgaXMgZXh0ZW5kZWRcblx0XHRcdHZhciBudW1TZXJ2ZXJNZXNzYWdlcyA9IHRoaXMuX3NvY2suclFzaGlmdDE2KCk7XG5cdFx0XHR2YXIgbnVtQ2xpZW50TWVzc2FnZXMgPSB0aGlzLl9zb2NrLnJRc2hpZnQxNigpO1xuXHRcdFx0dmFyIG51bUVuY29kaW5ncyA9IHRoaXMuX3NvY2suclFzaGlmdDE2KCk7XG5cdFx0XHR0aGlzLl9zb2NrLnJRc2tpcEJ5dGVzKDIpOyAgLy8gcGFkZGluZ1xuXG5cdFx0XHR2YXIgdG90YWxNZXNzYWdlc0xlbmd0aCA9IChudW1TZXJ2ZXJNZXNzYWdlcyArIG51bUNsaWVudE1lc3NhZ2VzICsgbnVtRW5jb2RpbmdzKSAqIDE2O1xuXHRcdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdUaWdodFZOQyBleHRlbmRlZCBzZXJ2ZXIgaW5pdCBoZWFkZXInLCB0b3RhbE1lc3NhZ2VzTGVuZ3RoLCAzMiArIG5hbWVfbGVuZ3RoKSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBpO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IG51bVNlcnZlck1lc3NhZ2VzOyBpKyspIHtcblx0XHRcdFx0Ly8gVE9ETzogaHR0cHM6Ly9naXRodWIuY29tL2thbmFrYS9ub1ZOQy9pc3N1ZXMvNDQwXG5cdFx0XHRcdHRoaXMuX3NvY2suclFzaGlmdFN0cigxNik7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoaSA9IDA7IGkgPCBudW1DbGllbnRNZXNzYWdlczsgaSsrKSB7XG5cdFx0XHRcdHRoaXMuX3NvY2suclFzaGlmdFN0cigxNik7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoaSA9IDA7IGkgPCBudW1FbmNvZGluZ3M7IGkrKykge1xuXHRcdFx0XHR0aGlzLl9zb2NrLnJRc2hpZnRTdHIoMTYpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIE5CKGRpcmVjdHhtYW4xMik6IHRoZXNlIGFyZSBkb3duIGhlcmUgc28gdGhhdCB3ZSBkb24ndCBydW4gdGhlbSBtdWx0aXBsZSB0aW1lc1xuXHRcdC8vICAgICAgICAgICAgICAgICAgIGlmIHdlIGJhY2t0cmFja1xuXHRcdGRlYnVnKCdfbmVnb3RpYXRlX3NlcnZlcl9pbml0KCkgfCBzY3JlZW46ICcgKyB0aGlzLl9mYl93aWR0aCArICd4JyArIHRoaXMuX2ZiX2hlaWdodCArXG5cdFx0XHRcdFx0JywgYnBwOiAnICsgYnBwICsgJywgZGVwdGg6ICcgKyBkZXB0aCArXG5cdFx0XHRcdFx0JywgYmlnX2VuZGlhbjogJyArIGJpZ19lbmRpYW4gK1xuXHRcdFx0XHRcdCcsIHRydWVfY29sb3I6ICcgKyB0cnVlX2NvbG9yICtcblx0XHRcdFx0XHQnLCByZWRfbWF4OiAnICsgcmVkX21heCArXG5cdFx0XHRcdFx0JywgZ3JlZW5fbWF4OiAnICsgZ3JlZW5fbWF4ICtcblx0XHRcdFx0XHQnLCBibHVlX21heDogJyArIGJsdWVfbWF4ICtcblx0XHRcdFx0XHQnLCByZWRfc2hpZnQ6ICcgKyByZWRfc2hpZnQgK1xuXHRcdFx0XHRcdCcsIGdyZWVuX3NoaWZ0OiAnICsgZ3JlZW5fc2hpZnQgK1xuXHRcdFx0XHRcdCcsIGJsdWVfc2hpZnQ6ICcgKyBibHVlX3NoaWZ0KTtcblxuXHRcdGlmIChiaWdfZW5kaWFuICE9PSAwKSB7XG5cdFx0XHRkZWJ1Z2Vycm9yKCdfbmVnb3RpYXRlX3NlcnZlcl9pbml0KCkgfCBzZXJ2ZXIgbmF0aXZlIGVuZGlhbiBpcyBub3QgbGl0dGxlIGVuZGlhbicpO1xuXHRcdH1cblxuXHRcdGlmIChyZWRfc2hpZnQgIT09IDE2KSB7XG5cdFx0XHRkZWJ1Z2Vycm9yKCdfbmVnb3RpYXRlX3NlcnZlcl9pbml0KCkgfCBzZXJ2ZXIgbmF0aXZlIHJlZC1zaGlmdCBpcyBub3QgMTYnKTtcblx0XHR9XG5cblx0XHRpZiAoYmx1ZV9zaGlmdCAhPT0gMCkge1xuXHRcdFx0ZGVidWdlcnJvcignX25lZ290aWF0ZV9zZXJ2ZXJfaW5pdCgpIHwgc2VydmVyIG5hdGl2ZSBibHVlLXNoaWZ0IGlzIG5vdCAwJyk7XG5cdFx0fVxuXG5cdFx0Ly8gd2UncmUgcGFzdCB0aGUgcG9pbnQgd2hlcmUgd2UgY291bGQgYmFja3RyYWNrLCBzbyBpdCdzIHNhZmUgdG8gY2FsbCB0aGlzXG5cdFx0dGhpcy5fb25EZXNrdG9wTmFtZSh0aGlzLCB0aGlzLl9mYl9uYW1lKTtcblxuXHRcdGlmICh0aGlzLl90cnVlX2NvbG9yICYmIHRoaXMuX2ZiX25hbWUgPT09ICdJbnRlbChyKSBBTVQgS1ZNJykge1xuXHRcdFx0ZGVidWdlcnJvcignX25lZ290aWF0ZV9zZXJ2ZXJfaW5pdCgpIHwgSW50ZWwgQU1UIEtWTSBvbmx5IHN1cHBvcnRzIDgvMTYgYml0IGRlcHRocywgZGlzYWJsaW5nIHRydWUgY29sb3InKTtcblx0XHRcdHRoaXMuX3RydWVfY29sb3IgPSBmYWxzZTtcblx0XHR9XG5cblx0XHR0aGlzLl9kaXNwbGF5LnNldF90cnVlX2NvbG9yKHRoaXMuX3RydWVfY29sb3IpO1xuXHRcdHRoaXMuX2Rpc3BsYXkucmVzaXplKHRoaXMuX2ZiX3dpZHRoLCB0aGlzLl9mYl9oZWlnaHQpO1xuXHRcdHRoaXMuX29uRkJSZXNpemUodGhpcywgdGhpcy5fZmJfd2lkdGgsIHRoaXMuX2ZiX2hlaWdodCk7XG5cdFx0dGhpcy5fa2V5Ym9hcmQuZ3JhYigpO1xuXHRcdHRoaXMuX21vdXNlLmdyYWIoKTtcblxuXHRcdGlmICh0aGlzLl90cnVlX2NvbG9yKSB7XG5cdFx0XHR0aGlzLl9mYl9CcHAgPSA0O1xuXHRcdFx0dGhpcy5fZmJfZGVwdGggPSAzO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9mYl9CcHAgPSAxO1xuXHRcdFx0dGhpcy5fZmJfZGVwdGggPSAxO1xuXHRcdH1cblxuXHRcdHZhciByZXNwb25zZSA9IFJGQi5tZXNzYWdlcy5waXhlbEZvcm1hdCh0aGlzLl9mYl9CcHAsIHRoaXMuX2ZiX2RlcHRoLCB0aGlzLl90cnVlX2NvbG9yKTtcblx0XHRyZXNwb25zZSA9IHJlc3BvbnNlLmNvbmNhdChcblx0XHRcdFx0XHRcdFJGQi5tZXNzYWdlcy5jbGllbnRFbmNvZGluZ3ModGhpcy5fZW5jb2RpbmdzLCB0aGlzLl9sb2NhbF9jdXJzb3IsIHRoaXMuX3RydWVfY29sb3IpKTtcblx0XHRyZXNwb25zZSA9IHJlc3BvbnNlLmNvbmNhdChcblx0XHRcdFx0XHRcdFJGQi5tZXNzYWdlcy5mYlVwZGF0ZVJlcXVlc3RzKHRoaXMuX2Rpc3BsYXkuZ2V0Q2xlYW5EaXJ0eVJlc2V0KCksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5fZmJfd2lkdGgsIHRoaXMuX2ZiX2hlaWdodCkpO1xuXG5cdFx0dGhpcy5fdGltaW5nLmZidV9ydF9zdGFydCA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cdFx0dGhpcy5fdGltaW5nLnBpeGVscyA9IDA7XG5cdFx0dGhpcy5fc29jay5zZW5kKHJlc3BvbnNlKTtcblxuXHRcdHRoaXMuX2NoZWNrRXZlbnRzKCk7XG5cblx0XHR0aGlzLl91cGRhdGVTdGF0ZSgnbm9ybWFsJywgJ0Nvbm5lY3RlZCB0bzogJyArIHRoaXMuX2ZiX25hbWUpO1xuXHR9LFxuXG5cdF9pbml0X21zZzogZnVuY3Rpb24gKCkge1xuXHRcdHN3aXRjaCAodGhpcy5fcmZiX3N0YXRlKSB7XG5cdFx0XHRjYXNlICdQcm90b2NvbFZlcnNpb24nOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fbmVnb3RpYXRlX3Byb3RvY29sX3ZlcnNpb24oKTtcblxuXHRcdFx0Y2FzZSAnU2VjdXJpdHknOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fbmVnb3RpYXRlX3NlY3VyaXR5KCk7XG5cblx0XHRcdGNhc2UgJ0F1dGhlbnRpY2F0aW9uJzpcblx0XHRcdFx0cmV0dXJuIHRoaXMuX25lZ290aWF0ZV9hdXRoZW50aWNhdGlvbigpO1xuXG5cdFx0XHRjYXNlICdTZWN1cml0eVJlc3VsdCc6XG5cdFx0XHRcdHJldHVybiB0aGlzLl9oYW5kbGVfc2VjdXJpdHlfcmVzdWx0KCk7XG5cblx0XHRcdGNhc2UgJ0NsaWVudEluaXRpYWxpc2F0aW9uJzpcblx0XHRcdFx0dGhpcy5fc29jay5zZW5kKFt0aGlzLl9zaGFyZWQgPyAxIDogMF0pOyAvLyBDbGllbnRJbml0aWFsaXNhdGlvblxuXHRcdFx0XHR0aGlzLl91cGRhdGVTdGF0ZSgnU2VydmVySW5pdGlhbGlzYXRpb24nLCAnQXV0aGVudGljYXRpb24gT0snKTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHRcdGNhc2UgJ1NlcnZlckluaXRpYWxpc2F0aW9uJzpcblx0XHRcdFx0cmV0dXJuIHRoaXMuX25lZ290aWF0ZV9zZXJ2ZXJfaW5pdCgpO1xuXHRcdH1cblx0fSxcblxuXHRfaGFuZGxlX3NldF9jb2xvdXJfbWFwX21zZzogZnVuY3Rpb24gKCkge1xuXHRcdGRlYnVnKCdfaGFuZGxlX3NldF9jb2xvdXJfbWFwX21zZygpJyk7XG5cblx0XHR0aGlzLl9zb2NrLnJRc2tpcDgoKTsgIC8vIFBhZGRpbmdcblxuXHRcdHZhciBmaXJzdF9jb2xvdXIgPSB0aGlzLl9zb2NrLnJRc2hpZnQxNigpO1xuXHRcdHZhciBudW1fY29sb3VycyA9IHRoaXMuX3NvY2suclFzaGlmdDE2KCk7XG5cdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdTZXRDb2xvck1hcEVudHJpZXMnLCBudW1fY29sb3VycyAqIDYsIDYpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0Zm9yICh2YXIgYyA9IDA7IGMgPCBudW1fY29sb3VyczsgYysrKSB7XG5cdFx0XHR2YXIgcmVkID0gcGFyc2VJbnQodGhpcy5fc29jay5yUXNoaWZ0MTYoKSAvIDI1NiwgMTApO1xuXHRcdFx0dmFyIGdyZWVuID0gcGFyc2VJbnQodGhpcy5fc29jay5yUXNoaWZ0MTYoKSAvIDI1NiwgMTApO1xuXHRcdFx0dmFyIGJsdWUgPSBwYXJzZUludCh0aGlzLl9zb2NrLnJRc2hpZnQxNigpIC8gMjU2LCAxMCk7XG5cdFx0XHR0aGlzLl9kaXNwbGF5LnNldF9jb2xvdXJNYXAoW2JsdWUsIGdyZWVuLCByZWRdLCBmaXJzdF9jb2xvdXIgKyBjKTtcblx0XHR9XG5cdFx0ZGVidWcoJ19oYW5kbGVfc2V0X2NvbG91cl9tYXBfbXNnKCkgfCBjb2xvdXJNYXA6ICcgKyB0aGlzLl9kaXNwbGF5LmdldF9jb2xvdXJNYXAoKSk7XG5cdFx0ZGVidWcoJ19oYW5kbGVfc2V0X2NvbG91cl9tYXBfbXNnKCkgfCByZWdpc3RlcmVkICcgKyBudW1fY29sb3VycyArICcgY29sb3VyTWFwIGVudHJpZXMnKTtcblxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdF9oYW5kbGVfc2VydmVyX2N1dF90ZXh0OiBmdW5jdGlvbiAoKSB7XG5cdFx0ZGVidWcoJ19oYW5kbGVfc2VydmVyX2N1dF90ZXh0KCknKTtcblxuXHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgnU2VydmVyQ3V0VGV4dCBoZWFkZXInLCA3LCAxKSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR0aGlzLl9zb2NrLnJRc2tpcEJ5dGVzKDMpOyAgLy8gUGFkZGluZ1xuXHRcdHZhciBsZW5ndGggPSB0aGlzLl9zb2NrLnJRc2hpZnQzMigpO1xuXHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgnU2VydmVyQ3V0VGV4dCcsIGxlbmd0aCwgOCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHR2YXIgdGV4dCA9IHRoaXMuX3NvY2suclFzaGlmdFN0cihsZW5ndGgpO1xuXHRcdHRoaXMuX29uQ2xpcGJvYXJkKHRoaXMsIHRleHQpO1xuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0X2hhbmRsZV94dnBfbXNnOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdYVlAgdmVyc2lvbiBhbmQgbWVzc2FnZScsIDMsIDEpKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdHRoaXMuX3NvY2suclFza2lwOCgpOyAgLy8gUGFkZGluZ1xuXHRcdHZhciB4dnBfdmVyID0gdGhpcy5fc29jay5yUXNoaWZ0OCgpO1xuXHRcdHZhciB4dnBfbXNnID0gdGhpcy5fc29jay5yUXNoaWZ0OCgpO1xuXG5cdFx0c3dpdGNoICh4dnBfbXNnKSB7XG5cdFx0XHRjYXNlIDA6ICAvLyBYVlBfRkFJTFxuXHRcdFx0XHR0aGlzLl91cGRhdGVTdGF0ZSh0aGlzLl9yZmJfc3RhdGUsICdPcGVyYXRpb24gRmFpbGVkJyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAxOiAgLy8gWFZQX0lOSVRcblx0XHRcdFx0dGhpcy5fcmZiX3h2cF92ZXIgPSB4dnBfdmVyO1xuXHRcdFx0XHRkZWJ1ZygnX2hhbmRsZV94dnBfbXNnKCkgfCBYVlAgZXh0ZW5zaW9ucyBlbmFibGVkICh2ZXJzaW9uICcgKyB0aGlzLl9yZmJfeHZwX3ZlciArICcpJyk7XG5cdFx0XHRcdHRoaXMuX29uWHZwSW5pdCh0aGlzLl9yZmJfeHZwX3Zlcik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhpcy5fZmFpbCgnRGlzY29ubmVjdGVkOiBpbGxlZ2FsIHNlcnZlciBYVlAgbWVzc2FnZSAnICsgeHZwX21zZyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdF9ub3JtYWxfbXNnOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIG1zZ190eXBlO1xuXG5cdFx0aWYgKHRoaXMuX0ZCVS5yZWN0cyA+IDApIHtcblx0XHRcdG1zZ190eXBlID0gMDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bXNnX3R5cGUgPSB0aGlzLl9zb2NrLnJRc2hpZnQ4KCk7XG5cdFx0fVxuXG5cdFx0c3dpdGNoIChtc2dfdHlwZSkge1xuXHRcdFx0Y2FzZSAwOiAgLy8gRnJhbWVidWZmZXJVcGRhdGVcblx0XHRcdFx0dmFyIHJldCA9IHRoaXMuX2ZyYW1lYnVmZmVyVXBkYXRlKCk7XG5cdFx0XHRcdGlmIChyZXQpIHtcblx0XHRcdFx0XHR0aGlzLl9zb2NrLnNlbmQoUkZCLm1lc3NhZ2VzLmZiVXBkYXRlUmVxdWVzdHMoXG5cdFx0XHRcdFx0XHR0aGlzLl9kaXNwbGF5LmdldENsZWFuRGlydHlSZXNldCgpLFxuXHRcdFx0XHRcdFx0dGhpcy5fZmJfd2lkdGgsXG5cdFx0XHRcdFx0XHR0aGlzLl9mYl9oZWlnaHRcblx0XHRcdFx0XHQpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXG5cdFx0XHRjYXNlIDE6ICAvLyBTZXRDb2xvck1hcEVudHJpZXNcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2hhbmRsZV9zZXRfY29sb3VyX21hcF9tc2coKTtcblxuXHRcdFx0Y2FzZSAyOiAgLy8gQmVsbFxuXHRcdFx0XHRkZWJ1ZygnX25vcm1hbF9tc2coKSB8IGJlbGwnKTtcblx0XHRcdFx0dGhpcy5fb25CZWxsKHRoaXMpO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdFx0Y2FzZSAzOiAgLy8gU2VydmVyQ3V0VGV4dFxuXHRcdFx0XHRyZXR1cm4gdGhpcy5faGFuZGxlX3NlcnZlcl9jdXRfdGV4dCgpO1xuXG5cdFx0XHRjYXNlIDI1MDogIC8vIFhWUFxuXHRcdFx0XHRyZXR1cm4gdGhpcy5faGFuZGxlX3h2cF9tc2coKTtcblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0Ly8gSWYgb25Vbmtub3duTWVzc2FnZVR5cGUgaXMgbm90IHNldCB0aGVuIGp1c3QgZmFpbC5cblx0XHRcdFx0aWYgKCEgdGhpcy5fb25Vbmtub3duTWVzc2FnZVR5cGUpIHtcblx0XHRcdFx0XHR0aGlzLl9mYWlsKCdEaXNjb25uZWN0ZWQ6IGlsbGVnYWwgc2VydmVyIG1lc3NhZ2UgdHlwZSAnICsgbXNnX3R5cGUpO1xuXHRcdFx0XHRcdGRlYnVnZXJyb3IoJ19ub3JtYWxfbXNnKCkgfCBzb2NrLnJRc2xpY2UoMCwgMzApOiAnICsgdGhpcy5fc29jay5yUXNsaWNlKDAsIDMwKSk7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gSWYgb25Vbmtub3duTWVzc2FnZVR5cGUgaXMgc2V0IHRoZW4gY2FsbCBpdC4gSWYgdGhlIGFwcCBkb2VzIG5vdCBhY2NlcHRcblx0XHRcdFx0Ly8gdGhlIHVua25vd24gbWVzc2FnZSB0eXBlIGl0IG11c3QgdGhyb3cgYW4gZXJyb3IuXG5cdFx0XHRcdC8vIFRoZSBsaXN0ZW5lciBtdXN0IHJldHVybiBmYWxzZSBpZiBtb3JlIGJ5dGVzIGFyZSBuZWVkZWQsXG5cdFx0XHRcdC8vIHRydWUgb3RoZXJ3aXNlLlxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRkZWJ1ZygnX25vcm1hbF9tc2coKSB8IHBhc3NpbmcgdW5rbm93biBtZXNzYWdlIHR5cGUgJyArIG1zZ190eXBlICsgJyB0byB0aGUgb25Vbmtub3duTWVzc2FnZVR5cGUgbGlzdGVuZXInKTtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX29uVW5rbm93bk1lc3NhZ2VUeXBlKG1zZ190eXBlLCB0aGlzLl9zb2NrKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2F0Y2goZXJyb3IpIHtcblx0XHRcdFx0XHRcdGRlYnVnZXJyb3IoJ19ub3JtYWxfbXNnKCkgfCBlcnJvciBjYXRjaGVkIGR1cmluZyBvblVua25vd25NZXNzYWdlVHlwZTogJW8nLCBlcnJvcik7XG5cdFx0XHRcdFx0XHR0aGlzLl9mYWlsKCdEaXNjb25uZWN0ZWQ6IGludmFsaWQgY3VzdG9tIHNlcnZlciBtZXNzYWdlIHR5cGUgJyArIG1zZ190eXBlKTtcblx0XHRcdFx0XHRcdGRlYnVnZXJyb3IoJ19ub3JtYWxfbXNnKCkgfCBzb2NrLnJRc2xpY2UoMCwgMzApOiAnICsgdGhpcy5fc29jay5yUXNsaWNlKDAsIDMwKSk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0X2ZyYW1lYnVmZmVyVXBkYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHJldCA9IHRydWU7XG5cdFx0dmFyIG5vdztcblxuXHRcdGlmICh0aGlzLl9GQlUucmVjdHMgPT09IDApIHtcblx0XHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgnRkJVIGhlYWRlcicsIDMsIDEpKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0dGhpcy5fc29jay5yUXNraXA4KCk7ICAvLyBQYWRkaW5nXG5cdFx0XHR0aGlzLl9GQlUucmVjdHMgPSB0aGlzLl9zb2NrLnJRc2hpZnQxNigpO1xuXHRcdFx0dGhpcy5fRkJVLmJ5dGVzID0gMDtcblx0XHRcdHRoaXMuX3RpbWluZy5jdXJfZmJ1ID0gMDtcblx0XHRcdGlmICh0aGlzLl90aW1pbmcuZmJ1X3J0X3N0YXJ0ID4gMCkge1xuXHRcdFx0XHRub3cgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXHRcdFx0XHRkZWJ1ZygnX2ZyYW1lYnVmZmVyVXBkYXRlKCkgfCBmaXJzdCBGQlUgbGF0ZW5jeTogJyArIChub3cgLSB0aGlzLl90aW1pbmcuZmJ1X3J0X3N0YXJ0KSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0d2hpbGUgKHRoaXMuX0ZCVS5yZWN0cyA+IDApIHtcblx0XHRcdGlmICh0aGlzLl9yZmJfc3RhdGUgIT09ICdub3JtYWwnKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ0ZCVScsIHRoaXMuX0ZCVS5ieXRlcykpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRpZiAodGhpcy5fRkJVLmJ5dGVzID09PSAwKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgncmVjdCBoZWFkZXInLCAxMikpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRcdC8qIE5ldyBGcmFtZWJ1ZmZlclVwZGF0ZSAqL1xuXG5cdFx0XHRcdHZhciBoZHIgPSB0aGlzLl9zb2NrLnJRc2hpZnRCeXRlcygxMik7XG5cdFx0XHRcdHRoaXMuX0ZCVS54ICAgICAgICA9IChoZHJbMF0gPDwgOCkgKyBoZHJbMV07XG5cdFx0XHRcdHRoaXMuX0ZCVS55ICAgICAgICA9IChoZHJbMl0gPDwgOCkgKyBoZHJbM107XG5cdFx0XHRcdHRoaXMuX0ZCVS53aWR0aCAgICA9IChoZHJbNF0gPDwgOCkgKyBoZHJbNV07XG5cdFx0XHRcdHRoaXMuX0ZCVS5oZWlnaHQgICA9IChoZHJbNl0gPDwgOCkgKyBoZHJbN107XG5cdFx0XHRcdHRoaXMuX0ZCVS5lbmNvZGluZyA9IHBhcnNlSW50KChoZHJbOF0gPDwgMjQpICsgKGhkcls5XSA8PCAxNikgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KGhkclsxMF0gPDwgOCkgKyBoZHJbMTFdLCAxMCk7XG5cblx0XHRcdFx0dGhpcy5fb25GQlVSZWNlaXZlKHRoaXMsXG5cdFx0XHRcdFx0eyd4JzogdGhpcy5fRkJVLngsICd5JzogdGhpcy5fRkJVLnksXG5cdFx0XHRcdFx0ICd3aWR0aCc6IHRoaXMuX0ZCVS53aWR0aCwgJ2hlaWdodCc6IHRoaXMuX0ZCVS5oZWlnaHQsXG5cdFx0XHRcdFx0ICdlbmNvZGluZyc6IHRoaXMuX0ZCVS5lbmNvZGluZyxcblx0XHRcdFx0XHQgJ2VuY29kaW5nTmFtZSc6IHRoaXMuX2VuY05hbWVzW3RoaXMuX0ZCVS5lbmNvZGluZ119KTtcblxuXHRcdFx0XHRpZiAoIXRoaXMuX2VuY05hbWVzW3RoaXMuX0ZCVS5lbmNvZGluZ10pIHtcblx0XHRcdFx0XHR0aGlzLl9mYWlsKCdEaXNjb25uZWN0ZWQ6IHVuc3VwcG9ydGVkIGVuY29kaW5nICcgK1xuXHRcdFx0XHRcdFx0XHRcdCB0aGlzLl9GQlUuZW5jb2RpbmcpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl90aW1pbmcubGFzdF9mYnUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG5cdFx0XHRyZXQgPSB0aGlzLl9lbmNIYW5kbGVyc1t0aGlzLl9GQlUuZW5jb2RpbmddKCk7XG5cblx0XHRcdG5vdyA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cdFx0XHR0aGlzLl90aW1pbmcuY3VyX2ZidSArPSAobm93IC0gdGhpcy5fdGltaW5nLmxhc3RfZmJ1KTtcblxuXHRcdFx0aWYgKHJldCkge1xuXHRcdFx0XHR0aGlzLl9lbmNTdGF0c1t0aGlzLl9GQlUuZW5jb2RpbmddWzBdKys7XG5cdFx0XHRcdHRoaXMuX2VuY1N0YXRzW3RoaXMuX0ZCVS5lbmNvZGluZ11bMV0rKztcblx0XHRcdFx0dGhpcy5fdGltaW5nLnBpeGVscyArPSB0aGlzLl9GQlUud2lkdGggKiB0aGlzLl9GQlUuaGVpZ2h0O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fdGltaW5nLnBpeGVscyA+PSAodGhpcy5fZmJfd2lkdGggKiB0aGlzLl9mYl9oZWlnaHQpKSB7XG5cdFx0XHRcdGlmICgodGhpcy5fRkJVLndpZHRoID09PSB0aGlzLl9mYl93aWR0aCAmJiB0aGlzLl9GQlUuaGVpZ2h0ID09PSB0aGlzLl9mYl9oZWlnaHQpIHx8XG5cdFx0XHRcdFx0dGhpcy5fdGltaW5nLmZidV9ydF9zdGFydCA+IDApIHtcblx0XHRcdFx0XHR0aGlzLl90aW1pbmcuZnVsbF9mYnVfdG90YWwgKz0gdGhpcy5fdGltaW5nLmN1cl9mYnU7XG5cdFx0XHRcdFx0dGhpcy5fdGltaW5nLmZ1bGxfZmJ1X2NudCsrO1xuXHRcdFx0XHRcdGRlYnVnKCdfZnJhbWVidWZmZXJVcGRhdGUoKSB8IHRpbWluZyBvZiBmdWxsIEZCVSwgY3VycjogJyArXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fdGltaW5nLmN1cl9mYnUgKyAnLCB0b3RhbDogJyArXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fdGltaW5nLmZ1bGxfZmJ1X3RvdGFsICsgJywgY250OiAnICtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl90aW1pbmcuZnVsbF9mYnVfY250ICsgJywgYXZnOiAnICtcblx0XHRcdFx0XHRcdFx0XHQodGhpcy5fdGltaW5nLmZ1bGxfZmJ1X3RvdGFsIC8gdGhpcy5fdGltaW5nLmZ1bGxfZmJ1X2NudCkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX3RpbWluZy5mYnVfcnRfc3RhcnQgPiAwKSB7XG5cdFx0XHRcdFx0dmFyIGZidV9ydF9kaWZmID0gbm93IC0gdGhpcy5fdGltaW5nLmZidV9ydF9zdGFydDtcblx0XHRcdFx0XHR0aGlzLl90aW1pbmcuZmJ1X3J0X3RvdGFsICs9IGZidV9ydF9kaWZmO1xuXHRcdFx0XHRcdHRoaXMuX3RpbWluZy5mYnVfcnRfY250Kys7XG5cdFx0XHRcdFx0ZGVidWcoJ19mcmFtZWJ1ZmZlclVwZGF0ZSgpIHwgZnVsbCBGQlUgcm91bmQtdHJpcCwgY3VyOiAnICtcblx0XHRcdFx0XHRcdCBmYnVfcnRfZGlmZiArICcsIHRvdGFsOiAnICtcblx0XHRcdFx0XHRcdCB0aGlzLl90aW1pbmcuZmJ1X3J0X3RvdGFsICsgJywgY250OiAnICtcblx0XHRcdFx0XHRcdCB0aGlzLl90aW1pbmcuZmJ1X3J0X2NudCArICcsIGF2ZzogJyArXG5cdFx0XHRcdFx0XHQgKHRoaXMuX3RpbWluZy5mYnVfcnRfdG90YWwgLyB0aGlzLl90aW1pbmcuZmJ1X3J0X2NudCkpO1xuXHRcdFx0XHRcdHRoaXMuX3RpbWluZy5mYnVfcnRfc3RhcnQgPSAwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICghcmV0KSB7IHJldHVybiByZXQ7IH0gIC8vIG5lZWQgbW9yZSBkYXRhXG5cdFx0fVxuXG5cdFx0dGhpcy5fb25GQlVDb21wbGV0ZSh0aGlzLFxuXHRcdFx0XHR7J3gnOiB0aGlzLl9GQlUueCwgJ3knOiB0aGlzLl9GQlUueSxcblx0XHRcdFx0ICd3aWR0aCc6IHRoaXMuX0ZCVS53aWR0aCwgJ2hlaWdodCc6IHRoaXMuX0ZCVS5oZWlnaHQsXG5cdFx0XHRcdCAnZW5jb2RpbmcnOiB0aGlzLl9GQlUuZW5jb2RpbmcsXG5cdFx0XHRcdCAnZW5jb2RpbmdOYW1lJzogdGhpcy5fZW5jTmFtZXNbdGhpcy5fRkJVLmVuY29kaW5nXX0pO1xuXG5cdFx0cmV0dXJuIHRydWU7ICAvLyBXZSBmaW5pc2hlZCB0aGlzIEZCVVxuXHR9LFxufTtcblxuXG5VdGlsLm1ha2VfcHJvcGVydGllcyhSRkIsIFtcblx0Wyd0YXJnZXQnLCAnd28nLCAnZG9tJ10sICAgICAgICAgICAgICAgIC8vIFZOQyBkaXNwbGF5IHJlbmRlcmluZyBDYW52YXMgb2JqZWN0XG5cdFsnZm9jdXNDb250YWluZXInLCAnd28nLCAnZG9tJ10sICAgICAgICAvLyBET00gZWxlbWVudCB0aGF0IGNhcHR1cmVzIGtleWJvYXJkIGlucHV0XG5cdFsnZW5jcnlwdCcsICdydycsICdib29sJ10sICAgICAgICAgICAgICAvLyBVc2UgVExTL1NTTC93c3MgZW5jcnlwdGlvblxuXHRbJ3RydWVfY29sb3InLCAncncnLCAnYm9vbCddLCAgICAgICAgICAgLy8gUmVxdWVzdCB0cnVlIGNvbG9yIHBpeGVsIGRhdGFcblx0Wydsb2NhbF9jdXJzb3InLCAncncnLCAnYm9vbCddLCAgICAgICAgIC8vIFJlcXVlc3QgbG9jYWxseSByZW5kZXJlZCBjdXJzb3Jcblx0WydzaGFyZWQnLCAncncnLCAnYm9vbCddLCAgICAgICAgICAgICAgIC8vIFJlcXVlc3Qgc2hhcmVkIG1vZGVcblx0Wyd2aWV3X29ubHknLCAncncnLCAnYm9vbCddLCAgICAgICAgICAgIC8vIERpc2FibGUgY2xpZW50IG1vdXNlL2tleWJvYXJkXG5cdFsneHZwX3Bhc3N3b3JkX3NlcCcsICdydycsICdzdHInXSwgICAgICAvLyBTZXBhcmF0b3IgZm9yIFhWUCBwYXNzd29yZCBmaWVsZHNcblx0WydkaXNjb25uZWN0VGltZW91dCcsICdydycsICdpbnQnXSwgICAgIC8vIFRpbWUgKHMpIHRvIHdhaXQgZm9yIGRpc2Nvbm5lY3Rpb25cblx0Wyd3c1Byb3RvY29scycsICdydycsICdhcnInXSwgICAgICAgICAgIC8vIFByb3RvY29scyB0byB1c2UgaW4gdGhlIFdlYlNvY2tldCBjb25uZWN0aW9uXG5cdFsncmVwZWF0ZXJJRCcsICdydycsICdzdHInXSwgICAgICAgICAgICAvLyBbVWx0cmFWTkNdIFJlcGVhdGVySUQgdG8gY29ubmVjdCB0b1xuXHRbJ3ZpZXdwb3J0RHJhZycsICdydycsICdib29sJ10sICAgICAgICAgLy8gTW92ZSB0aGUgdmlld3BvcnQgb24gbW91c2UgZHJhZ3Ncblx0Wydmb3JjZUF1dGhTY2hlbWUnLCAncncnLCAnaW50J10sICAgICAgIC8vIEZvcmNlIGF1dGggc2NoZW1lICgwIG1lYW5zIG5vKVxuXHRbJ2VuYWJsZU1vdXNlQW5kVG91Y2gnLCAncncnLCAnYm9vbCddLCAgLy8gV2hldGhlciBhbHNvIGVuYWJsZSBtb3VzZSBldmVudHMgd2hlbiB0b3VjaCBzY3JlZW4gaXMgZGV0ZWN0ZWRcblxuXHQvLyBDYWxsYmFjayBmdW5jdGlvbnNcblx0WydvblVwZGF0ZVN0YXRlJywgJ3J3JywgJ2Z1bmMnXSwgICAgICAgIC8vIG9uVXBkYXRlU3RhdGUocmZiLCBzdGF0ZSwgb2xkc3RhdGUsIHN0YXR1c01zZyk6IFJGQiBzdGF0ZSB1cGRhdGUvY2hhbmdlXG5cdFsnb25QYXNzd29yZFJlcXVpcmVkJywgJ3J3JywgJ2Z1bmMnXSwgICAvLyBvblBhc3N3b3JkUmVxdWlyZWQocmZiKTogVk5DIHBhc3N3b3JkIGlzIHJlcXVpcmVkXG5cdFsnb25DbGlwYm9hcmQnLCAncncnLCAnZnVuYyddLCAgICAgICAgICAvLyBvbkNsaXBib2FyZChyZmIsIHRleHQpOiBSRkIgY2xpcGJvYXJkIGNvbnRlbnRzIHJlY2VpdmVkXG5cdFsnb25CZWxsJywgJ3J3JywgJ2Z1bmMnXSwgICAgICAgICAgICAgICAvLyBvbkJlbGwocmZiKTogUkZCIEJlbGwgbWVzc2FnZSByZWNlaXZlZFxuXHRbJ29uRkJVUmVjZWl2ZScsICdydycsICdmdW5jJ10sICAgICAgICAgLy8gb25GQlVSZWNlaXZlKHJmYiwgZmJ1KTogUkZCIEZCVSByZWNlaXZlZCBidXQgbm90IHlldCBwcm9jZXNzZWRcblx0WydvbkZCVUNvbXBsZXRlJywgJ3J3JywgJ2Z1bmMnXSwgICAgICAgIC8vIG9uRkJVQ29tcGxldGUocmZiLCBmYnUpOiBSRkIgRkJVIHJlY2VpdmVkIGFuZCBwcm9jZXNzZWRcblx0WydvbkZCUmVzaXplJywgJ3J3JywgJ2Z1bmMnXSwgICAgICAgICAgIC8vIG9uRkJSZXNpemUocmZiLCB3aWR0aCwgaGVpZ2h0KTogZnJhbWUgYnVmZmVyIHJlc2l6ZWRcblx0WydvbkRlc2t0b3BOYW1lJywgJ3J3JywgJ2Z1bmMnXSwgICAgICAgIC8vIG9uRGVza3RvcE5hbWUocmZiLCBuYW1lKTogZGVza3RvcCBuYW1lIHJlY2VpdmVkXG5cdFsnb25YdnBJbml0JywgJ3J3JywgJ2Z1bmMnXSwgICAgICAgICAgICAvLyBvblh2cEluaXQodmVyc2lvbik6IFhWUCBleHRlbnNpb25zIGFjdGl2ZSBmb3IgdGhpcyBjb25uZWN0aW9uXG5cdFsnb25Vbmtub3duTWVzc2FnZVR5cGUnLCAncncnLCAnZnVuYyddICAvLyBIYW5kbGVyIGZvciB1bmtub3duIFZOQyBtZXNzYWdlIHR5cGVzLiBJZlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgLy8gbnVsbCBmYWlsdXJlIGlzIGVtaXR0ZWQgYW5kIHRoZSBSRkIgY2xvc2VkLlxuXSk7XG5cblxuUkZCLnByb3RvdHlwZS5zZXRfbG9jYWxfY3Vyc29yID0gZnVuY3Rpb24gKGN1cnNvcikge1xuXHRpZiAoIWN1cnNvciB8fCAoY3Vyc29yIGluIHsnMCc6IDEsICdubyc6IDEsICdmYWxzZSc6IDF9KSkge1xuXHRcdHRoaXMuX2xvY2FsX2N1cnNvciA9IGZhbHNlO1xuXHRcdHRoaXMuX2Rpc3BsYXkuZGlzYWJsZUxvY2FsQ3Vyc29yKCk7IC8vIE9ubHkgc2hvdyBzZXJ2ZXItc2lkZSBjdXJzb3Jcblx0fSBlbHNlIHtcblx0XHRpZiAodGhpcy5fZGlzcGxheS5nZXRfY3Vyc29yX3VyaSgpKSB7XG5cdFx0XHR0aGlzLl9sb2NhbF9jdXJzb3IgPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWJ1ZygnYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGxvY2FsIGN1cnNvcicpO1xuXHRcdFx0dGhpcy5fZGlzcGxheS5kaXNhYmxlTG9jYWxDdXJzb3IoKTtcblx0XHR9XG5cdH1cbn07XG5cblJGQi5wcm90b3R5cGUuZ2V0X2Rpc3BsYXkgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9kaXNwbGF5OyB9O1xuUkZCLnByb3RvdHlwZS5nZXRfa2V5Ym9hcmQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9rZXlib2FyZDsgfTtcblJGQi5wcm90b3R5cGUuZ2V0X21vdXNlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fbW91c2U7IH07XG5cblxuLy8gQ2xhc3MgTWV0aG9kc1xuUkZCLm1lc3NhZ2VzID0ge1xuXHRrZXlFdmVudDogZnVuY3Rpb24gKGtleXN5bSwgZG93bikge1xuXHRcdHZhciBhcnIgPSBbNF07XG5cdFx0VXRpbC5wdXNoOChhcnIsIGRvd24pO1xuXHRcdFV0aWwucHVzaDE2KGFyciwgMCk7XG5cdFx0VXRpbC5wdXNoMzIoYXJyLCBrZXlzeW0pO1xuXHRcdHJldHVybiBhcnI7XG5cdH0sXG5cblx0cG9pbnRlckV2ZW50OiBmdW5jdGlvbiAoeCwgeSwgbWFzaykge1xuXHRcdHZhciBhcnIgPSBbNV07ICAvLyBtc2ctdHlwZVxuXHRcdFV0aWwucHVzaDgoYXJyLCBtYXNrKTtcblx0XHRVdGlsLnB1c2gxNihhcnIsIHgpO1xuXHRcdFV0aWwucHVzaDE2KGFyciwgeSk7XG5cdFx0cmV0dXJuIGFycjtcblx0fSxcblxuXHQvLyBUT0RPKGRpcmVjdHhtYW4xMik6IG1ha2UgdGhpcyB1bmljb2RlIGNvbXBhdGlibGU/XG5cdGNsaWVudEN1dFRleHQ6IGZ1bmN0aW9uICh0ZXh0KSB7XG5cdFx0dmFyIGFyciA9IFs2XTsgIC8vIG1zZy10eXBlXG5cdFx0VXRpbC5wdXNoOChhcnIsIDApOyAgIC8vIHBhZGRpbmdcblx0XHRVdGlsLnB1c2g4KGFyciwgMCk7ICAgLy8gcGFkZGluZ1xuXHRcdFV0aWwucHVzaDgoYXJyLCAwKTsgICAvLyBwYWRkaW5nXG5cdFx0VXRpbC5wdXNoMzIoYXJyLCB0ZXh0Lmxlbmd0aCk7XG5cdFx0dmFyIG4gPSB0ZXh0Lmxlbmd0aDtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG47IGkrKykge1xuXHRcdFx0YXJyLnB1c2godGV4dC5jaGFyQ29kZUF0KGkpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJyO1xuXHR9LFxuXG5cdHBpeGVsRm9ybWF0OiBmdW5jdGlvbiAoYnBwLCBkZXB0aCwgdHJ1ZV9jb2xvcikge1xuXHRcdHZhciBhcnIgPSBbMF07IC8vIG1zZy10eXBlXG5cdFx0VXRpbC5wdXNoOChhcnIsIDApOyAgLy8gcGFkZGluZ1xuXHRcdFV0aWwucHVzaDgoYXJyLCAwKTsgIC8vIHBhZGRpbmdcblx0XHRVdGlsLnB1c2g4KGFyciwgMCk7ICAvLyBwYWRkaW5nXG5cblx0XHRVdGlsLnB1c2g4KGFyciwgYnBwICogOCk7IC8vIGJpdHMtcGVyLXBpeGVsXG5cdFx0VXRpbC5wdXNoOChhcnIsIGRlcHRoICogOCk7IC8vIGRlcHRoXG5cdFx0VXRpbC5wdXNoOChhcnIsIDApOyAgLy8gbGl0dGxlLWVuZGlhblxuXHRcdFV0aWwucHVzaDgoYXJyLCB0cnVlX2NvbG9yID8gMSA6IDApOyAgLy8gdHJ1ZS1jb2xvclxuXG5cdFx0VXRpbC5wdXNoMTYoYXJyLCAyNTUpOyAgLy8gcmVkLW1heFxuXHRcdFV0aWwucHVzaDE2KGFyciwgMjU1KTsgIC8vIGdyZWVuLW1heFxuXHRcdFV0aWwucHVzaDE2KGFyciwgMjU1KTsgIC8vIGJsdWUtbWF4XG5cdFx0VXRpbC5wdXNoOChhcnIsIDE2KTsgICAgLy8gcmVkLXNoaWZ0XG5cdFx0VXRpbC5wdXNoOChhcnIsIDgpOyAgICAgLy8gZ3JlZW4tc2hpZnRcblx0XHRVdGlsLnB1c2g4KGFyciwgMCk7ICAgICAvLyBibHVlLXNoaWZ0XG5cblx0XHRVdGlsLnB1c2g4KGFyciwgMCk7ICAgICAvLyBwYWRkaW5nXG5cdFx0VXRpbC5wdXNoOChhcnIsIDApOyAgICAgLy8gcGFkZGluZ1xuXHRcdFV0aWwucHVzaDgoYXJyLCAwKTsgICAgIC8vIHBhZGRpbmdcblx0XHRyZXR1cm4gYXJyO1xuXHR9LFxuXG5cdGNsaWVudEVuY29kaW5nczogZnVuY3Rpb24gKGVuY29kaW5ncywgbG9jYWxfY3Vyc29yLCB0cnVlX2NvbG9yKSB7XG5cdFx0dmFyIGksIGVuY0xpc3QgPSBbXTtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCBlbmNvZGluZ3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChlbmNvZGluZ3NbaV1bMF0gPT09ICdDdXJzb3InICYmICFsb2NhbF9jdXJzb3IpIHtcblx0XHRcdFx0ZGVidWcoJ2NsaWVudEVuY29kaW5ncygpIHwgc2tpcHBpbmcgQ3Vyc29yIHBzZXVkby1lbmNvZGluZycpO1xuXHRcdFx0fSBlbHNlIGlmIChlbmNvZGluZ3NbaV1bMF0gPT09ICdUSUdIVCcgJiYgIXRydWVfY29sb3IpIHtcblx0XHRcdFx0Ly8gVE9ETzogcmVtb3ZlIHRoaXMgd2hlbiB3ZSBoYXZlIHRpZ2h0K25vbi10cnVlLWNvbG9yXG5cdFx0XHRcdGRlYnVnKCdjbGllbnRFbmNvZGluZ3MoKSB8IHNraXBwaW5nIHRpZ2h0IGFzIGl0IGlzIG9ubHkgc3VwcG9ydGVkIHdpdGggdHJ1ZSBjb2xvcicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZW5jTGlzdC5wdXNoKGVuY29kaW5nc1tpXVsxXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFyIGFyciA9IFsyXTsgIC8vIG1zZy10eXBlXG5cdFx0VXRpbC5wdXNoOChhcnIsIDApOyAgIC8vIHBhZGRpbmdcblxuXHRcdFV0aWwucHVzaDE2KGFyciwgZW5jTGlzdC5sZW5ndGgpOyAgLy8gZW5jb2RpbmcgY291bnRcblx0XHRmb3IgKGkgPSAwOyBpIDwgZW5jTGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0VXRpbC5wdXNoMzIoYXJyLCBlbmNMaXN0W2ldKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJyO1xuXHR9LFxuXG5cdGZiVXBkYXRlUmVxdWVzdHM6IGZ1bmN0aW9uIChjbGVhbkRpcnR5LCBmYl93aWR0aCwgZmJfaGVpZ2h0KSB7XG5cdFx0dmFyIGFyciA9IFtdO1xuXG5cdFx0dmFyIGNiID0gY2xlYW5EaXJ0eS5jbGVhbkJveDtcblx0XHR2YXIgdywgaDtcblx0XHRpZiAoY2IudyA+IDAgJiYgY2IuaCA+IDApIHtcblx0XHRcdHcgPSB0eXBlb2YgY2IudyA9PT0gJ3VuZGVmaW5lZCcgPyBmYl93aWR0aCA6IGNiLnc7XG5cdFx0XHRoID0gdHlwZW9mIGNiLmggPT09ICd1bmRlZmluZWQnID8gZmJfaGVpZ2h0IDogY2IuaDtcblx0XHRcdC8vIFJlcXVlc3QgaW5jcmVtZW50YWwgZm9yIGNsZWFuIGJveFxuXHRcdFx0YXJyID0gYXJyLmNvbmNhdChSRkIubWVzc2FnZXMuZmJVcGRhdGVSZXF1ZXN0KDEsIGNiLngsIGNiLnksIHcsIGgpKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNsZWFuRGlydHkuZGlydHlCb3hlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRiID0gY2xlYW5EaXJ0eS5kaXJ0eUJveGVzW2ldO1xuXHRcdFx0Ly8gRm9yY2UgYWxsIChub24taW5jcmVtZW50YWwpIGZvciBkaXJ0eSBib3hcblx0XHRcdHcgPSB0eXBlb2YgZGIudyA9PT0gJ3VuZGVmaW5lZCcgPyBmYl93aWR0aCA6IGRiLnc7XG5cdFx0XHRoID0gdHlwZW9mIGRiLmggPT09ICd1bmRlZmluZWQnID8gZmJfaGVpZ2h0IDogZGIuaDtcblx0XHRcdGFyciA9IGFyci5jb25jYXQoUkZCLm1lc3NhZ2VzLmZiVXBkYXRlUmVxdWVzdCgwLCBkYi54LCBkYi55LCB3LCBoKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFycjtcblx0fSxcblxuXHRmYlVwZGF0ZVJlcXVlc3Q6IGZ1bmN0aW9uIChpbmNyZW1lbnRhbCwgeCwgeSwgdywgaCkge1xuXHRcdGlmICh0eXBlb2YoeCkgPT09ICd1bmRlZmluZWQnKSB7IHggPSAwOyB9XG5cdFx0aWYgKHR5cGVvZih5KSA9PT0gJ3VuZGVmaW5lZCcpIHsgeSA9IDA7IH1cblxuXHRcdHZhciBhcnIgPSBbM107ICAvLyBtc2ctdHlwZVxuXHRcdFV0aWwucHVzaDgoYXJyLCBpbmNyZW1lbnRhbCk7XG5cdFx0VXRpbC5wdXNoMTYoYXJyLCB4KTtcblx0XHRVdGlsLnB1c2gxNihhcnIsIHkpO1xuXHRcdFV0aWwucHVzaDE2KGFyciwgdyk7XG5cdFx0VXRpbC5wdXNoMTYoYXJyLCBoKTtcblxuXHRcdHJldHVybiBhcnI7XG5cdH1cbn07XG5cblJGQi5nZW5ERVMgPSBmdW5jdGlvbiAocGFzc3dvcmQsIGNoYWxsZW5nZSkge1xuXHR2YXIgcGFzc3dkID0gW107XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcGFzc3dvcmQubGVuZ3RoOyBpKyspIHtcblx0XHRwYXNzd2QucHVzaChwYXNzd29yZC5jaGFyQ29kZUF0KGkpKTtcblx0fVxuXHRyZXR1cm4gKG5ldyBERVMocGFzc3dkKSkuZW5jcnlwdChjaGFsbGVuZ2UpO1xufTtcblxuUkZCLmVuY29kaW5nSGFuZGxlcnMgPSB7XG5cdFJBVzogZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLl9GQlUubGluZXMgPT09IDApIHtcblx0XHRcdHRoaXMuX0ZCVS5saW5lcyA9IHRoaXMuX0ZCVS5oZWlnaHQ7XG5cdFx0fVxuXG5cdFx0dGhpcy5fRkJVLmJ5dGVzID0gdGhpcy5fRkJVLndpZHRoICogdGhpcy5fZmJfQnBwOyAgLy8gYXQgbGVhc3QgYSBsaW5lXG5cdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdSQVcnLCB0aGlzLl9GQlUuYnl0ZXMpKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdHZhciBjdXJfeSA9IHRoaXMuX0ZCVS55ICsgKHRoaXMuX0ZCVS5oZWlnaHQgLSB0aGlzLl9GQlUubGluZXMpO1xuXHRcdHZhciBjdXJyX2hlaWdodCA9IE1hdGgubWluKHRoaXMuX0ZCVS5saW5lcyxcblx0XHRcdFx0XHRcdFx0XHRcdCBNYXRoLmZsb29yKHRoaXMuX3NvY2suclFsZW4oKSAvICh0aGlzLl9GQlUud2lkdGggKiB0aGlzLl9mYl9CcHApKSk7XG5cdFx0dGhpcy5fZGlzcGxheS5ibGl0SW1hZ2UodGhpcy5fRkJVLngsIGN1cl95LCB0aGlzLl9GQlUud2lkdGgsXG5cdFx0XHRcdFx0XHRcdFx0Y3Vycl9oZWlnaHQsIHRoaXMuX3NvY2suZ2V0X3JRKCksXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fc29jay5nZXRfclFpKCkpO1xuXHRcdHRoaXMuX3NvY2suclFza2lwQnl0ZXModGhpcy5fRkJVLndpZHRoICogY3Vycl9oZWlnaHQgKiB0aGlzLl9mYl9CcHApO1xuXHRcdHRoaXMuX0ZCVS5saW5lcyAtPSBjdXJyX2hlaWdodDtcblxuXHRcdGlmICh0aGlzLl9GQlUubGluZXMgPiAwKSB7XG5cdFx0XHR0aGlzLl9GQlUuYnl0ZXMgPSB0aGlzLl9GQlUud2lkdGggKiB0aGlzLl9mYl9CcHA7ICAvLyBBdCBsZWFzdCBhbm90aGVyIGxpbmVcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fRkJVLnJlY3RzLS07XG5cdFx0XHR0aGlzLl9GQlUuYnl0ZXMgPSAwO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdENPUFlSRUNUOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fRkJVLmJ5dGVzID0gNDtcblx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ0NPUFlSRUNUJywgNCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0dGhpcy5fZGlzcGxheS5yZW5kZXJRX3B1c2goe1xuXHRcdFx0J3R5cGUnOiAnY29weScsXG5cdFx0XHQnb2xkX3gnOiB0aGlzLl9zb2NrLnJRc2hpZnQxNigpLFxuXHRcdFx0J29sZF95JzogdGhpcy5fc29jay5yUXNoaWZ0MTYoKSxcblx0XHRcdCd4JzogdGhpcy5fRkJVLngsXG5cdFx0XHQneSc6IHRoaXMuX0ZCVS55LFxuXHRcdFx0J3dpZHRoJzogdGhpcy5fRkJVLndpZHRoLFxuXHRcdFx0J2hlaWdodCc6IHRoaXMuX0ZCVS5oZWlnaHRcblx0XHR9KTtcblx0XHR0aGlzLl9GQlUucmVjdHMtLTtcblx0XHR0aGlzLl9GQlUuYnl0ZXMgPSAwO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdFJSRTogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBjb2xvcjtcblx0XHRpZiAodGhpcy5fRkJVLnN1YnJlY3RzID09PSAwKSB7XG5cdFx0XHR0aGlzLl9GQlUuYnl0ZXMgPSA0ICsgdGhpcy5fZmJfQnBwO1xuXHRcdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdSUkUnLCA0ICsgdGhpcy5fZmJfQnBwKSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdHRoaXMuX0ZCVS5zdWJyZWN0cyA9IHRoaXMuX3NvY2suclFzaGlmdDMyKCk7XG5cdFx0XHRjb2xvciA9IHRoaXMuX3NvY2suclFzaGlmdEJ5dGVzKHRoaXMuX2ZiX0JwcCk7ICAvLyBCYWNrZ3JvdW5kXG5cdFx0XHR0aGlzLl9kaXNwbGF5LmZpbGxSZWN0KHRoaXMuX0ZCVS54LCB0aGlzLl9GQlUueSwgdGhpcy5fRkJVLndpZHRoLCB0aGlzLl9GQlUuaGVpZ2h0LCBjb2xvcik7XG5cdFx0fVxuXG5cdFx0d2hpbGUgKHRoaXMuX0ZCVS5zdWJyZWN0cyA+IDAgJiYgdGhpcy5fc29jay5yUWxlbigpID49ICh0aGlzLl9mYl9CcHAgKyA4KSkge1xuXHRcdFx0Y29sb3IgPSB0aGlzLl9zb2NrLnJRc2hpZnRCeXRlcyh0aGlzLl9mYl9CcHApO1xuXHRcdFx0dmFyIHggPSB0aGlzLl9zb2NrLnJRc2hpZnQxNigpO1xuXHRcdFx0dmFyIHkgPSB0aGlzLl9zb2NrLnJRc2hpZnQxNigpO1xuXHRcdFx0dmFyIHdpZHRoID0gdGhpcy5fc29jay5yUXNoaWZ0MTYoKTtcblx0XHRcdHZhciBoZWlnaHQgPSB0aGlzLl9zb2NrLnJRc2hpZnQxNigpO1xuXHRcdFx0dGhpcy5fZGlzcGxheS5maWxsUmVjdCh0aGlzLl9GQlUueCArIHgsIHRoaXMuX0ZCVS55ICsgeSwgd2lkdGgsIGhlaWdodCwgY29sb3IpO1xuXHRcdFx0dGhpcy5fRkJVLnN1YnJlY3RzLS07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX0ZCVS5zdWJyZWN0cyA+IDApIHtcblx0XHRcdHZhciBjaHVuayA9IE1hdGgubWluKHRoaXMuX3JyZV9jaHVua19zeiwgdGhpcy5fRkJVLnN1YnJlY3RzKTtcblx0XHRcdHRoaXMuX0ZCVS5ieXRlcyA9ICh0aGlzLl9mYl9CcHAgKyA4KSAqIGNodW5rO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9GQlUucmVjdHMtLTtcblx0XHRcdHRoaXMuX0ZCVS5ieXRlcyA9IDA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0SEVYVElMRTogZnVuY3Rpb24gKCkge1xuXHRcdHZhciByUSA9IHRoaXMuX3NvY2suZ2V0X3JRKCk7XG5cdFx0dmFyIHJRaSA9IHRoaXMuX3NvY2suZ2V0X3JRaSgpO1xuXG5cdFx0aWYgKHRoaXMuX0ZCVS50aWxlcyA9PT0gMCkge1xuXHRcdFx0dGhpcy5fRkJVLnRpbGVzX3ggPSBNYXRoLmNlaWwodGhpcy5fRkJVLndpZHRoIC8gMTYpO1xuXHRcdFx0dGhpcy5fRkJVLnRpbGVzX3kgPSBNYXRoLmNlaWwodGhpcy5fRkJVLmhlaWdodCAvIDE2KTtcblx0XHRcdHRoaXMuX0ZCVS50b3RhbF90aWxlcyA9IHRoaXMuX0ZCVS50aWxlc194ICogdGhpcy5fRkJVLnRpbGVzX3k7XG5cdFx0XHR0aGlzLl9GQlUudGlsZXMgPSB0aGlzLl9GQlUudG90YWxfdGlsZXM7XG5cdFx0fVxuXG5cdFx0d2hpbGUgKHRoaXMuX0ZCVS50aWxlcyA+IDApIHtcblx0XHRcdHRoaXMuX0ZCVS5ieXRlcyA9IDE7XG5cdFx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ0hFWFRJTEUgc3ViZW5jb2RpbmcnLCB0aGlzLl9GQlUuYnl0ZXMpKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0dmFyIHN1YmVuY29kaW5nID0gclFbclFpXTsgIC8vIFBlZWtcblx0XHRcdGlmIChzdWJlbmNvZGluZyA+IDMwKSB7ICAvLyBSYXdcblx0XHRcdFx0dGhpcy5fZmFpbCgnRGlzY29ubmVjdGVkOiBpbGxlZ2FsIGhleHRpbGUgc3ViZW5jb2RpbmcgJyArIHN1YmVuY29kaW5nKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgc3VicmVjdHMgPSAwO1xuXHRcdFx0dmFyIGN1cnJfdGlsZSA9IHRoaXMuX0ZCVS50b3RhbF90aWxlcyAtIHRoaXMuX0ZCVS50aWxlcztcblx0XHRcdHZhciB0aWxlX3ggPSBjdXJyX3RpbGUgJSB0aGlzLl9GQlUudGlsZXNfeDtcblx0XHRcdHZhciB0aWxlX3kgPSBNYXRoLmZsb29yKGN1cnJfdGlsZSAvIHRoaXMuX0ZCVS50aWxlc194KTtcblx0XHRcdHZhciB4ID0gdGhpcy5fRkJVLnggKyB0aWxlX3ggKiAxNjtcblx0XHRcdHZhciB5ID0gdGhpcy5fRkJVLnkgKyB0aWxlX3kgKiAxNjtcblx0XHRcdHZhciB3ID0gTWF0aC5taW4oMTYsICh0aGlzLl9GQlUueCArIHRoaXMuX0ZCVS53aWR0aCkgLSB4KTtcblx0XHRcdHZhciBoID0gTWF0aC5taW4oMTYsICh0aGlzLl9GQlUueSArIHRoaXMuX0ZCVS5oZWlnaHQpIC0geSk7XG5cblx0XHRcdC8vIEZpZ3VyZSBvdXQgaG93IG11Y2ggd2UgYXJlIGV4cGVjdGluZ1xuXHRcdFx0aWYgKHN1YmVuY29kaW5nICYgMHgwMSkgeyAgLy8gUmF3XG5cdFx0XHRcdHRoaXMuX0ZCVS5ieXRlcyArPSB3ICogaCAqIHRoaXMuX2ZiX0JwcDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChzdWJlbmNvZGluZyAmIDB4MDIpIHsgIC8vIEJhY2tncm91bmRcblx0XHRcdFx0XHR0aGlzLl9GQlUuYnl0ZXMgKz0gdGhpcy5fZmJfQnBwO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChzdWJlbmNvZGluZyAmIDB4MDQpIHsgIC8vIEZvcmVncm91bmRcblx0XHRcdFx0XHR0aGlzLl9GQlUuYnl0ZXMgKz0gdGhpcy5fZmJfQnBwO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChzdWJlbmNvZGluZyAmIDB4MDgpIHsgIC8vIEFueVN1YnJlY3RzXG5cdFx0XHRcdFx0dGhpcy5fRkJVLmJ5dGVzKys7ICAvLyBTaW5jZSB3ZSBhcmVuJ3Qgc2hpZnRpbmcgaXQgb2ZmXG5cdFx0XHRcdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdoZXh0aWxlIHN1YnJlY3RzIGhlYWRlcicsIHRoaXMuX0ZCVS5ieXRlcykpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRcdFx0c3VicmVjdHMgPSByUVtyUWkgKyB0aGlzLl9GQlUuYnl0ZXMgLSAxXTsgIC8vIFBlZWtcblx0XHRcdFx0XHRpZiAoc3ViZW5jb2RpbmcgJiAweDEwKSB7ICAvLyBTdWJyZWN0c0NvbG91cmVkXG5cdFx0XHRcdFx0XHR0aGlzLl9GQlUuYnl0ZXMgKz0gc3VicmVjdHMgKiAodGhpcy5fZmJfQnBwICsgMik7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMuX0ZCVS5ieXRlcyArPSBzdWJyZWN0cyAqIDI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgnaGV4dGlsZScsIHRoaXMuX0ZCVS5ieXRlcykpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHRcdC8vIFdlIGtub3cgdGhlIGVuY29kaW5nIGFuZCBoYXZlIGEgd2hvbGUgdGlsZVxuXHRcdFx0dGhpcy5fRkJVLnN1YmVuY29kaW5nID0gclFbclFpXTtcblx0XHRcdHJRaSsrO1xuXHRcdFx0aWYgKHRoaXMuX0ZCVS5zdWJlbmNvZGluZyA9PT0gMCkge1xuXHRcdFx0XHRpZiAodGhpcy5fRkJVLmxhc3RzdWJlbmNvZGluZyAmIDB4MDEpIHtcblx0XHRcdFx0XHQvLyBXZWlyZDogaWdub3JlIGJsYW5rcyBhcmUgUkFXXG5cdFx0XHRcdFx0ZGVidWcoJ0hFWFRJTEUoKSB8IGlnbm9yaW5nIGJsYW5rIGFmdGVyIFJBVycpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX2Rpc3BsYXkuZmlsbFJlY3QoeCwgeSwgdywgaCwgdGhpcy5fRkJVLmJhY2tncm91bmQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuX0ZCVS5zdWJlbmNvZGluZyAmIDB4MDEpIHsgIC8vIFJhd1xuXHRcdFx0XHR0aGlzLl9kaXNwbGF5LmJsaXRJbWFnZSh4LCB5LCB3LCBoLCByUSwgclFpKTtcblx0XHRcdFx0clFpICs9IHRoaXMuX0ZCVS5ieXRlcyAtIDE7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGhpcy5fRkJVLnN1YmVuY29kaW5nICYgMHgwMikgeyAgLy8gQmFja2dyb3VuZFxuXHRcdFx0XHRcdHRoaXMuX0ZCVS5iYWNrZ3JvdW5kID0gclEuc2xpY2UoclFpLCByUWkgKyB0aGlzLl9mYl9CcHApO1xuXHRcdFx0XHRcdHJRaSArPSB0aGlzLl9mYl9CcHA7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHRoaXMuX0ZCVS5zdWJlbmNvZGluZyAmIDB4MDQpIHsgIC8vIEZvcmVncm91bmRcblx0XHRcdFx0XHR0aGlzLl9GQlUuZm9yZWdyb3VuZCA9IHJRLnNsaWNlKHJRaSwgclFpICsgdGhpcy5fZmJfQnBwKTtcblx0XHRcdFx0XHRyUWkgKz0gdGhpcy5fZmJfQnBwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5fZGlzcGxheS5zdGFydFRpbGUoeCwgeSwgdywgaCwgdGhpcy5fRkJVLmJhY2tncm91bmQpO1xuXHRcdFx0XHRpZiAodGhpcy5fRkJVLnN1YmVuY29kaW5nICYgMHgwOCkgeyAgLy8gQW55U3VicmVjdHNcblx0XHRcdFx0XHRzdWJyZWN0cyA9IHJRW3JRaV07XG5cdFx0XHRcdFx0clFpKys7XG5cblx0XHRcdFx0XHRmb3IgKHZhciBzID0gMDsgcyA8IHN1YnJlY3RzOyBzKyspIHtcblx0XHRcdFx0XHRcdHZhciBjb2xvcjtcblx0XHRcdFx0XHRcdGlmICh0aGlzLl9GQlUuc3ViZW5jb2RpbmcgJiAweDEwKSB7ICAvLyBTdWJyZWN0c0NvbG91cmVkXG5cdFx0XHRcdFx0XHRcdGNvbG9yID0gclEuc2xpY2UoclFpLCByUWkgKyB0aGlzLl9mYl9CcHApO1xuXHRcdFx0XHRcdFx0XHRyUWkgKz0gdGhpcy5fZmJfQnBwO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Y29sb3IgPSB0aGlzLl9GQlUuZm9yZWdyb3VuZDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHZhciB4eSA9IHJRW3JRaV07XG5cdFx0XHRcdFx0XHRyUWkrKztcblx0XHRcdFx0XHRcdHZhciBzeCA9ICh4eSA+PiA0KTtcblx0XHRcdFx0XHRcdHZhciBzeSA9ICh4eSAmIDB4MGYpO1xuXG5cdFx0XHRcdFx0XHR2YXIgd2ggPSByUVtyUWldO1xuXHRcdFx0XHRcdFx0clFpKys7XG5cdFx0XHRcdFx0XHR2YXIgc3cgPSAod2ggPj4gNCkgKyAxO1xuXHRcdFx0XHRcdFx0dmFyIHNoID0gKHdoICYgMHgwZikgKyAxO1xuXG5cdFx0XHRcdFx0XHR0aGlzLl9kaXNwbGF5LnN1YlRpbGUoc3gsIHN5LCBzdywgc2gsIGNvbG9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fZGlzcGxheS5maW5pc2hUaWxlKCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9zb2NrLnNldF9yUWkoclFpKTtcblx0XHRcdHRoaXMuX0ZCVS5sYXN0c3ViZW5jb2RpbmcgPSB0aGlzLl9GQlUuc3ViZW5jb2Rpbmc7XG5cdFx0XHR0aGlzLl9GQlUuYnl0ZXMgPSAwO1xuXHRcdFx0dGhpcy5fRkJVLnRpbGVzLS07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX0ZCVS50aWxlcyA9PT0gMCkge1xuXHRcdFx0dGhpcy5fRkJVLnJlY3RzLS07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0Z2V0VGlnaHRDTGVuZ3RoOiBmdW5jdGlvbiAoYXJyKSB7XG5cdFx0dmFyIGhlYWRlciA9IDEsIGRhdGEgPSAwO1xuXHRcdGRhdGEgKz0gYXJyWzBdICYgMHg3Zjtcblx0XHRpZiAoYXJyWzBdICYgMHg4MCkge1xuXHRcdFx0aGVhZGVyKys7XG5cdFx0XHRkYXRhICs9IChhcnJbMV0gJiAweDdmKSA8PCA3O1xuXHRcdFx0aWYgKGFyclsxXSAmIDB4ODApIHtcblx0XHRcdFx0aGVhZGVyKys7XG5cdFx0XHRcdGRhdGEgKz0gYXJyWzJdIDw8IDE0O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gW2hlYWRlciwgZGF0YV07XG5cdH0sXG5cblx0ZGlzcGxheV90aWdodDogZnVuY3Rpb24gKGlzVGlnaHRQTkcpIHtcblx0XHRpZiAodGhpcy5fZmJfZGVwdGggPT09IDEpIHtcblx0XHRcdHRoaXMuX2ZhaWwoJ1RpZ2h0IHByb3RvY29sIGhhbmRsZXIgb25seSBpbXBsZW1lbnRzIHRydWUgY29sb3IgbW9kZScpO1xuXHRcdH1cblxuXHRcdHRoaXMuX0ZCVS5ieXRlcyA9IDE7ICAvLyBjb21wcmVzc2lvbi1jb250cm9sIGJ5dGVcblx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ1RJR0hUIGNvbXByZXNzaW9uLWNvbnRyb2wnLCB0aGlzLl9GQlUuYnl0ZXMpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0Ly8gdmFyIGNoZWNrc3VtID0gZnVuY3Rpb24gKGRhdGEpIHtcblx0XHQvLyBcdHZhciBzdW0gPSAwO1xuXHRcdC8vIFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG5cdFx0Ly8gXHRcdHN1bSArPSBkYXRhW2ldO1xuXHRcdC8vIFx0XHRpZiAoc3VtID4gNjU1MzYpIHsgc3VtIC09IDY1NTM2OyB9XG5cdFx0Ly8gXHR9XG5cdFx0Ly8gXHRyZXR1cm4gc3VtO1xuXHRcdC8vIH07XG5cblx0XHR2YXIgcmVzZXRTdHJlYW1zID0gMDtcblx0XHR2YXIgc3RyZWFtSWQgPSAtMTtcblx0XHR2YXIgZGVjb21wcmVzcyA9IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuXHRcdFx0XHRpZiAoKHJlc2V0U3RyZWFtcyA+PiBpKSAmIDEpIHtcblx0XHRcdFx0XHR0aGlzLl9GQlUuemxpYnNbaV0ucmVzZXQoKTtcblx0XHRcdFx0XHRkZWJ1ZygnZGlzcGxheV90aWdodCgpIHwgcmVzZXQgemxpYiBzdHJlYW0gJyArIGkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHZhciB1bmNvbXByZXNzZWQgPSB0aGlzLl9GQlUuemxpYnNbc3RyZWFtSWRdLnVuY29tcHJlc3MoZGF0YSwgMCk7XG5cdFx0XHRpZiAodW5jb21wcmVzc2VkLnN0YXR1cyAhPT0gMCkge1xuXHRcdFx0XHRkZWJ1Z2Vycm9yKCdkaXNwbGF5X3RpZ2h0KCkgfCBpbnZhbGlkIGRhdGEgaW4gemxpYiBzdHJlYW0nKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHVuY29tcHJlc3NlZC5kYXRhO1xuXHRcdH0uYmluZCh0aGlzKTtcblxuXHRcdHZhciBpbmRleGVkVG9SR0IgPSBmdW5jdGlvbiAoZGF0YSwgbnVtQ29sb3JzLCBwYWxldHRlLCB3aWR0aCwgaGVpZ2h0KSB7XG5cdFx0XHQvLyBDb252ZXJ0IGluZGV4ZWQgKHBhbGV0dGUgYmFzZWQpIGltYWdlIGRhdGEgdG8gUkdCXG5cdFx0XHQvLyBUT0RPOiByZWR1Y2UgbnVtYmVyIG9mIGNhbGN1bGF0aW9ucyBpbnNpZGUgbG9vcFxuXHRcdFx0dmFyIGRlc3QgPSBbXTtcblx0XHRcdHZhciB4LCB5LCBkcCwgc3A7XG5cdFx0XHRpZiAobnVtQ29sb3JzID09PSAyKSB7XG5cdFx0XHRcdHZhciB3ID0gTWF0aC5mbG9vcigod2lkdGggKyA3KSAvIDgpO1xuXHRcdFx0XHR2YXIgdzEgPSBNYXRoLmZsb29yKHdpZHRoIC8gOCk7XG5cblx0XHRcdFx0Zm9yICh5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XG5cdFx0XHRcdFx0dmFyIGI7XG5cdFx0XHRcdFx0Zm9yICh4ID0gMDsgeCA8IHcxOyB4KyspIHtcblx0XHRcdFx0XHRcdGZvciAoYiA9IDc7IGIgPj0gMDsgYi0tKSB7XG5cdFx0XHRcdFx0XHRcdGRwID0gKHkgKiB3aWR0aCArIHggKiA4ICsgNyAtIGIpICogMztcblx0XHRcdFx0XHRcdFx0c3AgPSAoZGF0YVt5ICogdyArIHhdID4+IGIgJiAxKSAqIDM7XG5cdFx0XHRcdFx0XHRcdGRlc3RbZHBdID0gcGFsZXR0ZVtzcF07XG5cdFx0XHRcdFx0XHRcdGRlc3RbZHAgKyAxXSA9IHBhbGV0dGVbc3AgKyAxXTtcblx0XHRcdFx0XHRcdFx0ZGVzdFtkcCArIDJdID0gcGFsZXR0ZVtzcCArIDJdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGZvciAoYiA9IDc7IGIgPj0gOCAtIHdpZHRoICUgODsgYi0tKSB7XG5cdFx0XHRcdFx0XHRkcCA9ICh5ICogd2lkdGggKyB4ICogOCArIDcgLSBiKSAqIDM7XG5cdFx0XHRcdFx0XHRzcCA9IChkYXRhW3kgKiB3ICsgeF0gPj4gYiAmIDEpICogMztcblx0XHRcdFx0XHRcdGRlc3RbZHBdID0gcGFsZXR0ZVtzcF07XG5cdFx0XHRcdFx0XHRkZXN0W2RwICsgMV0gPSBwYWxldHRlW3NwICsgMV07XG5cdFx0XHRcdFx0XHRkZXN0W2RwICsgMl0gPSBwYWxldHRlW3NwICsgMl07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcblx0XHRcdFx0XHRmb3IgKHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xuXHRcdFx0XHRcdFx0ZHAgPSAoeSAqIHdpZHRoICsgeCkgKiAzO1xuXHRcdFx0XHRcdFx0c3AgPSBkYXRhW3kgKiB3aWR0aCArIHhdICogMztcblx0XHRcdFx0XHRcdGRlc3RbZHBdID0gcGFsZXR0ZVtzcF07XG5cdFx0XHRcdFx0XHRkZXN0W2RwICsgMV0gPSBwYWxldHRlW3NwICsgMV07XG5cdFx0XHRcdFx0XHRkZXN0W2RwICsgMl0gPSBwYWxldHRlW3NwICsgMl07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBkZXN0O1xuXHRcdH0uYmluZCh0aGlzKTtcblxuXHRcdHZhciByUSA9IHRoaXMuX3NvY2suZ2V0X3JRKCk7XG5cdFx0dmFyIHJRaSA9IHRoaXMuX3NvY2suZ2V0X3JRaSgpO1xuXHRcdHZhciBjbW9kZSwgY2xlbmd0aCwgZGF0YTtcblxuXHRcdHZhciBoYW5kbGVQYWxldHRlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIG51bUNvbG9ycyA9IHJRW3JRaSArIDJdICsgMTtcblx0XHRcdHZhciBwYWxldHRlU2l6ZSA9IG51bUNvbG9ycyAqIHRoaXMuX2ZiX2RlcHRoO1xuXHRcdFx0dGhpcy5fRkJVLmJ5dGVzICs9IHBhbGV0dGVTaXplO1xuXHRcdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdUSUdIVCBwYWxldHRlICcgKyBjbW9kZSwgdGhpcy5fRkJVLmJ5dGVzKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdFx0dmFyIGJwcCA9IChudW1Db2xvcnMgPD0gMikgPyAxIDogODtcblx0XHRcdHZhciByb3dTaXplID0gTWF0aC5mbG9vcigodGhpcy5fRkJVLndpZHRoICogYnBwICsgNykgLyA4KTtcblx0XHRcdHZhciByYXcgPSBmYWxzZTtcblx0XHRcdGlmIChyb3dTaXplICogdGhpcy5fRkJVLmhlaWdodCA8IDEyKSB7XG5cdFx0XHRcdHJhdyA9IHRydWU7XG5cdFx0XHRcdGNsZW5ndGggPSBbMCwgcm93U2l6ZSAqIHRoaXMuX0ZCVS5oZWlnaHRdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2xlbmd0aCA9IFJGQi5lbmNvZGluZ0hhbmRsZXJzLmdldFRpZ2h0Q0xlbmd0aChcblx0XHRcdFx0XHR0aGlzLl9zb2NrLnJRc2xpY2UoMyArIHBhbGV0dGVTaXplLCAzICsgcGFsZXR0ZVNpemUgKyAzXG5cdFx0XHRcdCkpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9GQlUuYnl0ZXMgKz0gY2xlbmd0aFswXSArIGNsZW5ndGhbMV07XG5cdFx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ1RJR0hUICcgKyBjbW9kZSwgdGhpcy5fRkJVLmJ5dGVzKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdFx0Ly8gU2hpZnQgY3RsLCBmaWx0ZXIgaWQsIG51bSBjb2xvcnMsIHBhbGV0dGUgZW50cmllcywgYW5kIGNsZW5ndGggb2ZmXG5cdFx0XHR0aGlzLl9zb2NrLnJRc2tpcEJ5dGVzKDMpO1xuXHRcdFx0dmFyIHBhbGV0dGUgPSB0aGlzLl9zb2NrLnJRc2hpZnRCeXRlcyhwYWxldHRlU2l6ZSk7XG5cdFx0XHR0aGlzLl9zb2NrLnJRc2tpcEJ5dGVzKGNsZW5ndGhbMF0pO1xuXG5cdFx0XHRpZiAocmF3KSB7XG5cdFx0XHRcdGRhdGEgPSB0aGlzLl9zb2NrLnJRc2hpZnRCeXRlcyhjbGVuZ3RoWzFdKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRhdGEgPSBkZWNvbXByZXNzKHRoaXMuX3NvY2suclFzaGlmdEJ5dGVzKGNsZW5ndGhbMV0pKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29udmVydCBpbmRleGVkIChwYWxldHRlIGJhc2VkKSBpbWFnZSBkYXRhIHRvIFJHQlxuXHRcdFx0dmFyIHJnYiA9IGluZGV4ZWRUb1JHQihkYXRhLCBudW1Db2xvcnMsIHBhbGV0dGUsIHRoaXMuX0ZCVS53aWR0aCwgdGhpcy5fRkJVLmhlaWdodCk7XG5cblx0XHRcdHRoaXMuX2Rpc3BsYXkucmVuZGVyUV9wdXNoKHtcblx0XHRcdFx0J3R5cGUnOiAnYmxpdFJnYicsXG5cdFx0XHRcdCdkYXRhJzogcmdiLFxuXHRcdFx0XHQneCc6IHRoaXMuX0ZCVS54LFxuXHRcdFx0XHQneSc6IHRoaXMuX0ZCVS55LFxuXHRcdFx0XHQnd2lkdGgnOiB0aGlzLl9GQlUud2lkdGgsXG5cdFx0XHRcdCdoZWlnaHQnOiB0aGlzLl9GQlUuaGVpZ2h0XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fS5iaW5kKHRoaXMpO1xuXG5cdFx0dmFyIGhhbmRsZUNvcHkgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgcmF3ID0gZmFsc2U7XG5cdFx0XHR2YXIgdW5jb21wcmVzc2VkU2l6ZSA9IHRoaXMuX0ZCVS53aWR0aCAqIHRoaXMuX0ZCVS5oZWlnaHQgKiB0aGlzLl9mYl9kZXB0aDtcblx0XHRcdGlmICh1bmNvbXByZXNzZWRTaXplIDwgMTIpIHtcblx0XHRcdFx0cmF3ID0gdHJ1ZTtcblx0XHRcdFx0Y2xlbmd0aCA9IFswLCB1bmNvbXByZXNzZWRTaXplXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNsZW5ndGggPSBSRkIuZW5jb2RpbmdIYW5kbGVycy5nZXRUaWdodENMZW5ndGgodGhpcy5fc29jay5yUXNsaWNlKDEsIDQpKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX0ZCVS5ieXRlcyA9IDEgKyBjbGVuZ3RoWzBdICsgY2xlbmd0aFsxXTtcblx0XHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgnVElHSFQgJyArIGNtb2RlLCB0aGlzLl9GQlUuYnl0ZXMpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0XHQvLyBTaGlmdCBjdGwsIGNsZW5ndGggb2ZmXG5cdFx0XHR0aGlzLl9zb2NrLnJRc2hpZnRCeXRlcygxICsgY2xlbmd0aFswXSk7XG5cblx0XHRcdGlmIChyYXcpIHtcblx0XHRcdFx0ZGF0YSA9IHRoaXMuX3NvY2suclFzaGlmdEJ5dGVzKGNsZW5ndGhbMV0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGF0YSA9IGRlY29tcHJlc3ModGhpcy5fc29jay5yUXNoaWZ0Qnl0ZXMoY2xlbmd0aFsxXSkpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9kaXNwbGF5LnJlbmRlclFfcHVzaCh7XG5cdFx0XHRcdCd0eXBlJzogJ2JsaXRSZ2InLFxuXHRcdFx0XHQnZGF0YSc6IGRhdGEsXG5cdFx0XHRcdCd4JzogdGhpcy5fRkJVLngsXG5cdFx0XHRcdCd5JzogdGhpcy5fRkJVLnksXG5cdFx0XHRcdCd3aWR0aCc6IHRoaXMuX0ZCVS53aWR0aCxcblx0XHRcdFx0J2hlaWdodCc6IHRoaXMuX0ZCVS5oZWlnaHRcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LmJpbmQodGhpcyk7XG5cblx0XHR2YXIgY3RsID0gdGhpcy5fc29jay5yUXBlZWs4KCk7XG5cblx0XHQvLyBLZWVwIHRpZ2h0IHJlc2V0IGJpdHNcblx0XHRyZXNldFN0cmVhbXMgPSBjdGwgJiAweEY7XG5cblx0XHQvLyBGaWd1cmUgb3V0IGZpbHRlclxuXHRcdGN0bCA9IGN0bCA+PiA0O1xuXHRcdHN0cmVhbUlkID0gY3RsICYgMHgzO1xuXG5cdFx0aWYgKGN0bCA9PT0gMHgwOCkgICAgICB7IGNtb2RlID0gJ2ZpbGwnOyB9XG5cdFx0ZWxzZSBpZiAoY3RsID09PSAweDA5KSB7IGNtb2RlID0gJ2pwZWcnOyB9XG5cdFx0ZWxzZSBpZiAoY3RsID09PSAweDBBKSB7IGNtb2RlID0gJ3BuZyc7IH1cblx0XHRlbHNlIGlmIChjdGwgJiAweDA0KSAgIHsgY21vZGUgPSAnZmlsdGVyJzsgfVxuXHRcdGVsc2UgaWYgKGN0bCA8IDB4MDQpICAgeyBjbW9kZSA9ICdjb3B5JzsgfVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2ZhaWwoJ0lsbGVnYWwgdGlnaHQgY29tcHJlc3Npb24gcmVjZWl2ZWQsIGN0bDogJyArIGN0bCk7XG5cdFx0fVxuXG5cdFx0aWYgKGlzVGlnaHRQTkcgJiYgKGNtb2RlID09PSAnZmlsdGVyJyB8fCBjbW9kZSA9PT0gJ2NvcHknKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2ZhaWwoJ2ZpbHRlci9jb3B5IHJlY2VpdmVkIGluIHRpZ2h0UE5HIG1vZGUnKTtcblx0XHR9XG5cblx0XHRzd2l0Y2ggKGNtb2RlKSB7XG5cdFx0XHQvLyBmaWxsIHVzZSBmYl9kZXB0aCBiZWNhdXNlIFRQSVhFTHMgZHJvcCB0aGUgcGFkZGluZyBieXRlXG5cdFx0XHRjYXNlICdmaWxsJzogIC8vIFRQSVhFTFxuXHRcdFx0XHR0aGlzLl9GQlUuYnl0ZXMgKz0gdGhpcy5fZmJfZGVwdGg7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnanBlZyc6ICAvLyBtYXggY2xlbmd0aFxuXHRcdFx0XHR0aGlzLl9GQlUuYnl0ZXMgKz0gMztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdwbmcnOiAgLy8gbWF4IGNsZW5ndGhcblx0XHRcdFx0dGhpcy5fRkJVLmJ5dGVzICs9IDM7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnZmlsdGVyJzogIC8vIGZpbHRlciBpZCArIG51bSBjb2xvcnMgaWYgcGFsZXR0ZVxuXHRcdFx0XHR0aGlzLl9GQlUuYnl0ZXMgKz0gMjtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdjb3B5Jzpcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdUSUdIVCAnICsgY21vZGUsIHRoaXMuX0ZCVS5ieXRlcykpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHQvLyBEZXRlcm1pbmUgRkJVLmJ5dGVzXG5cdFx0c3dpdGNoIChjbW9kZSkge1xuXHRcdFx0Y2FzZSAnZmlsbCc6XG5cdFx0XHRcdHRoaXMuX3NvY2suclFza2lwOCgpOyAgLy8gc2hpZnQgb2ZmIGN0bFxuXHRcdFx0XHR2YXIgY29sb3IgPSB0aGlzLl9zb2NrLnJRc2hpZnRCeXRlcyh0aGlzLl9mYl9kZXB0aCk7XG5cdFx0XHRcdHRoaXMuX2Rpc3BsYXkucmVuZGVyUV9wdXNoKHtcblx0XHRcdFx0XHQndHlwZSc6ICdmaWxsJyxcblx0XHRcdFx0XHQneCc6IHRoaXMuX0ZCVS54LFxuXHRcdFx0XHRcdCd5JzogdGhpcy5fRkJVLnksXG5cdFx0XHRcdFx0J3dpZHRoJzogdGhpcy5fRkJVLndpZHRoLFxuXHRcdFx0XHRcdCdoZWlnaHQnOiB0aGlzLl9GQlUuaGVpZ2h0LFxuXHRcdFx0XHRcdCdjb2xvcic6IFtjb2xvclsyXSwgY29sb3JbMV0sIGNvbG9yWzBdXVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdwbmcnOlxuXHRcdFx0Y2FzZSAnanBlZyc6XG5cdFx0XHRcdGNsZW5ndGggPSBSRkIuZW5jb2RpbmdIYW5kbGVycy5nZXRUaWdodENMZW5ndGgodGhpcy5fc29jay5yUXNsaWNlKDEsIDQpKTtcblx0XHRcdFx0dGhpcy5fRkJVLmJ5dGVzID0gMSArIGNsZW5ndGhbMF0gKyBjbGVuZ3RoWzFdOyAgLy8gY3RsICsgY2xlbmd0aCBzaXplICsganBlZy1kYXRhXG5cdFx0XHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgnVElHSFQgJyArIGNtb2RlLCB0aGlzLl9GQlUuYnl0ZXMpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0XHRcdC8vIFdlIGhhdmUgZXZlcnl0aGluZywgcmVuZGVyIGl0XG5cdFx0XHRcdHRoaXMuX3NvY2suclFza2lwQnl0ZXMoMSArIGNsZW5ndGhbMF0pOyAgLy8gc2hpZnQgb2ZmIGNsdCArIGNvbXBhY3QgbGVuZ3RoXG5cdFx0XHRcdHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcblx0XHRcdFx0aW1nLnNyYyA9ICdkYXRhOiBpbWFnZS8nICsgY21vZGUgK1xuXHRcdFx0XHRcdGV4dHJhY3RfZGF0YV91cmkodGhpcy5fc29jay5yUXNoaWZ0Qnl0ZXMoY2xlbmd0aFsxXSkpO1xuXHRcdFx0XHR0aGlzLl9kaXNwbGF5LnJlbmRlclFfcHVzaCh7XG5cdFx0XHRcdFx0J3R5cGUnOiAnaW1nJyxcblx0XHRcdFx0XHQnaW1nJzogaW1nLFxuXHRcdFx0XHRcdCd4JzogdGhpcy5fRkJVLngsXG5cdFx0XHRcdFx0J3knOiB0aGlzLl9GQlUueVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0aW1nID0gbnVsbDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdmaWx0ZXInOlxuXHRcdFx0XHR2YXIgZmlsdGVySWQgPSByUVtyUWkgKyAxXTtcblx0XHRcdFx0aWYgKGZpbHRlcklkID09PSAxKSB7XG5cdFx0XHRcdFx0aWYgKCFoYW5kbGVQYWxldHRlKCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gRmlsdGVyIDAsIENvcHkgY291bGQgYmUgdmFsaWQgaGVyZSwgYnV0IHNlcnZlcnMgZG9uJ3Qgc2VuZCBpdCBhcyBhbiBleHBsaWNpdCBmaWx0ZXJcblx0XHRcdFx0XHQvLyBGaWx0ZXIgMiwgR3JhZGllbnQgaXMgdmFsaWQgYnV0IG5vdCB1c2UgaWYganBlZyBpcyBlbmFibGVkXG5cdFx0XHRcdFx0Ly8gVE9ETyhkaXJlY3R4bWFuMTIpOiB3aHkgYXJlbid0IHdlIGp1c3QgY2FsbGluZyAnX2ZhaWwnIGhlcmVcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIHRpZ2h0IHN1YmVuY29kaW5nIHJlY2VpdmVkLCBmaWx0ZXI6ICcgKyBmaWx0ZXJJZCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdjb3B5Jzpcblx0XHRcdFx0aWYgKCFoYW5kbGVDb3B5KCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXG5cdFx0dGhpcy5fRkJVLmJ5dGVzID0gMDtcblx0XHR0aGlzLl9GQlUucmVjdHMtLTtcblxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdFRJR0hUOiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9lbmNIYW5kbGVycy5kaXNwbGF5X3RpZ2h0KGZhbHNlKTsgfSxcblx0VElHSFRfUE5HOiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9lbmNIYW5kbGVycy5kaXNwbGF5X3RpZ2h0KHRydWUpOyB9LFxuXG5cdGxhc3RfcmVjdDogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX0ZCVS5yZWN0cyA9IDA7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0aGFuZGxlX0ZCX3Jlc2l6ZTogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX2ZiX3dpZHRoID0gdGhpcy5fRkJVLndpZHRoO1xuXHRcdHRoaXMuX2ZiX2hlaWdodCA9IHRoaXMuX0ZCVS5oZWlnaHQ7XG5cdFx0dGhpcy5fZGlzcGxheS5yZXNpemUodGhpcy5fZmJfd2lkdGgsIHRoaXMuX2ZiX2hlaWdodCk7XG5cdFx0dGhpcy5fb25GQlJlc2l6ZSh0aGlzLCB0aGlzLl9mYl93aWR0aCwgdGhpcy5fZmJfaGVpZ2h0KTtcblx0XHR0aGlzLl90aW1pbmcuZmJ1X3J0X3N0YXJ0ID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuXHRcdHRoaXMuX0ZCVS5ieXRlcyA9IDA7XG5cdFx0dGhpcy5fRkJVLnJlY3RzIC09IDE7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0RXh0ZW5kZWREZXNrdG9wU2l6ZTogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX0ZCVS5ieXRlcyA9IDE7XG5cdFx0aWYgKHRoaXMuX3NvY2suclF3YWl0KCdFeHRlbmRlZERlc2t0b3BTaXplJywgdGhpcy5fRkJVLmJ5dGVzKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdHRoaXMuX3N1cHBvcnRzU2V0RGVza3RvcFNpemUgPSB0cnVlO1xuXHRcdHZhciBudW1iZXJfb2Zfc2NyZWVucyA9IHRoaXMuX3NvY2suclFwZWVrOCgpO1xuXG5cdFx0dGhpcy5fRkJVLmJ5dGVzID0gNCArIChudW1iZXJfb2Zfc2NyZWVucyAqIDE2KTtcblx0XHRpZiAodGhpcy5fc29jay5yUXdhaXQoJ0V4dGVuZGVkRGVza3RvcFNpemUnLCB0aGlzLl9GQlUuYnl0ZXMpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0dGhpcy5fc29jay5yUXNraXBCeXRlcygxKTsgIC8vIG51bWJlci1vZi1zY3JlZW5zXG5cdFx0dGhpcy5fc29jay5yUXNraXBCeXRlcygzKTsgIC8vIHBhZGRpbmdcblxuXHRcdGZvciAodmFyIGk9MDsgaTxudW1iZXJfb2Zfc2NyZWVuczsgaSArPSAxKSB7XG5cdFx0XHQvLyBTYXZlIHRoZSBpZCBhbmQgZmxhZ3Mgb2YgdGhlIGZpcnN0IHNjcmVlblxuXHRcdFx0aWYgKGkgPT09IDApIHtcblx0XHRcdFx0dGhpcy5fc2NyZWVuX2lkID0gdGhpcy5fc29jay5yUXNoaWZ0Qnl0ZXMoNCk7ICAgIC8vIGlkXG5cdFx0XHRcdHRoaXMuX3NvY2suclFza2lwQnl0ZXMoMik7ICAgICAgICAgICAgICAgICAgICAgICAvLyB4LXBvc2l0aW9uXG5cdFx0XHRcdHRoaXMuX3NvY2suclFza2lwQnl0ZXMoMik7ICAgICAgICAgICAgICAgICAgICAgICAvLyB5LXBvc2l0aW9uXG5cdFx0XHRcdHRoaXMuX3NvY2suclFza2lwQnl0ZXMoMik7ICAgICAgICAgICAgICAgICAgICAgICAvLyB3aWR0aFxuXHRcdFx0XHR0aGlzLl9zb2NrLnJRc2tpcEJ5dGVzKDIpOyAgICAgICAgICAgICAgICAgICAgICAgLy8gaGVpZ2h0XG5cdFx0XHRcdHRoaXMuX3NjcmVlbl9mbGFncyA9IHRoaXMuX3NvY2suclFzaGlmdEJ5dGVzKDQpOyAvLyBmbGFnc1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fc29jay5yUXNraXBCeXRlcygxNik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Lypcblx0XHQgKiBUaGUgeC1wb3NpdGlvbiBpbmRpY2F0ZXMgdGhlIHJlYXNvbiBmb3IgdGhlIGNoYW5nZTpcblx0XHQgKlxuXHRcdCAqICAwIC0gc2VydmVyIHJlc2l6ZWQgb24gaXRzIG93blxuXHRcdCAqICAxIC0gdGhpcyBjbGllbnQgcmVxdWVzdGVkIHRoZSByZXNpemVcblx0XHQgKiAgMiAtIGFub3RoZXIgY2xpZW50IHJlcXVlc3RlZCB0aGUgcmVzaXplXG5cdFx0ICovXG5cblx0XHQvLyBXZSBuZWVkIHRvIGhhbmRsZSBlcnJvcnMgd2hlbiB3ZSByZXF1ZXN0ZWQgdGhlIHJlc2l6ZS5cblx0XHRpZiAodGhpcy5fRkJVLnggPT09IDEgJiYgdGhpcy5fRkJVLnkgIT09IDApIHtcblx0XHRcdHZhciBtc2cgPSAnJztcblx0XHRcdC8vIFRoZSB5LXBvc2l0aW9uIGluZGljYXRlcyB0aGUgc3RhdHVzIGNvZGUgZnJvbSB0aGUgc2VydmVyXG5cdFx0XHRzd2l0Y2ggKHRoaXMuX0ZCVS55KSB7XG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdFx0bXNnID0gJ3Jlc2l6ZSBpcyBhZG1pbmlzdHJhdGl2ZWx5IHByb2hpYml0ZWQnO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRcdG1zZyA9ICdvdXQgb2YgcmVzb3VyY2VzJztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMzpcblx0XHRcdFx0XHRtc2cgPSAnaW52YWxpZCBzY3JlZW4gbGF5b3V0Jztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0bXNnID0gJ3Vua25vd24gcmVhc29uJztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGRlYnVnKCdFeHRlbmRlZERlc2t0b3BTaXplKCkgfCBzZXJ2ZXIgZGlkIG5vdCBhY2NlcHQgdGhlIHJlc2l6ZSByZXF1ZXN0OiAlcycsIG1zZyk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHR0aGlzLl9lbmNIYW5kbGVycy5oYW5kbGVfRkJfcmVzaXplKCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0RGVza3RvcFNpemU6IGZ1bmN0aW9uICgpIHtcblx0XHRkZWJ1ZygnRGVza3RvcFNpemUoKScpO1xuXG5cdFx0dGhpcy5fZW5jSGFuZGxlcnMuaGFuZGxlX0ZCX3Jlc2l6ZSgpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdEN1cnNvcjogZnVuY3Rpb24gKCkge1xuXHRcdGRlYnVnKCdDdXJzb3IoKScpO1xuXG5cdFx0dmFyIHggPSB0aGlzLl9GQlUueDsgIC8vIGhvdHNwb3QteFxuXHRcdHZhciB5ID0gdGhpcy5fRkJVLnk7ICAvLyBob3RzcG90LXlcblx0XHR2YXIgdyA9IHRoaXMuX0ZCVS53aWR0aDtcblx0XHR2YXIgaCA9IHRoaXMuX0ZCVS5oZWlnaHQ7XG5cblx0XHR2YXIgcGl4ZWxzbGVuZ3RoID0gdyAqIGggKiB0aGlzLl9mYl9CcHA7XG5cdFx0dmFyIG1hc2tsZW5ndGggPSBNYXRoLmZsb29yKCh3ICsgNykgLyA4KSAqIGg7XG5cblx0XHR0aGlzLl9GQlUuYnl0ZXMgPSBwaXhlbHNsZW5ndGggKyBtYXNrbGVuZ3RoO1xuXHRcdGlmICh0aGlzLl9zb2NrLnJRd2FpdCgnY3Vyc29yIGVuY29kaW5nJywgdGhpcy5fRkJVLmJ5dGVzKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdHRoaXMuX2Rpc3BsYXkuY2hhbmdlQ3Vyc29yKHRoaXMuX3NvY2suclFzaGlmdEJ5dGVzKHBpeGVsc2xlbmd0aCksXG5cdFx0XHRcdFx0XHRcdFx0XHQgdGhpcy5fc29jay5yUXNoaWZ0Qnl0ZXMobWFza2xlbmd0aCksXG5cdFx0XHRcdFx0XHRcdFx0XHQgeCwgeSwgdywgaCk7XG5cblx0XHR0aGlzLl9GQlUuYnl0ZXMgPSAwO1xuXHRcdHRoaXMuX0ZCVS5yZWN0cy0tO1xuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0SlBFR19xdWFsaXR5X2xvOiBmdW5jdGlvbiAoKSB7XG5cdFx0ZGVidWdlcnJvcignSlBFR19xdWFsaXR5X2xvKCkgfCBzZXJ2ZXIgc2VudCBqcGVnX3F1YWxpdHkgcHNldWRvLWVuY29kaW5nJyk7XG5cdH0sXG5cblx0Y29tcHJlc3NfbG86IGZ1bmN0aW9uICgpIHtcblx0XHRkZWJ1Z2Vycm9yKCdjb21wcmVzc19sbygpIHwgc2VydmVyIHNlbnQgY29tcHJlc3MgbGV2ZWwgcHNldWRvLWVuY29kaW5nJyk7XG5cdH1cbn07XG5cblxuLyoqXG4gKiBQcml2YXRlIEFQSS5cbiAqL1xuXG5cbmZ1bmN0aW9uIGV4dHJhY3RfZGF0YV91cmkgKGFycikge1xuXHRyZXR1cm4gJztiYXNlNjQsJyArIEJhc2U2NC5lbmNvZGUoYXJyKTtcbn1cbiIsIi8qXG4gKiB0aW5mbGF0ZSAgLSAgdGlueSBpbmZsYXRlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDAzIGJ5IEpvZXJnZW4gSWJzZW4gLyBKaWJ6XG4gKiBBbGwgUmlnaHRzIFJlc2VydmVkXG4gKlxuICogaHR0cDovL3d3dy5pYnNlbnNvZnR3YXJlLmNvbS9cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHByb3ZpZGVkICdhcy1pcycsIHdpdGhvdXQgYW55IGV4cHJlc3NcbiAqIG9yIGltcGxpZWQgd2FycmFudHkuICBJbiBubyBldmVudCB3aWxsIHRoZSBhdXRob3JzIGJlXG4gKiBoZWxkIGxpYWJsZSBmb3IgYW55IGRhbWFnZXMgYXJpc2luZyBmcm9tIHRoZSB1c2Ugb2ZcbiAqIHRoaXMgc29mdHdhcmUuXG4gKlxuICogUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIGFueW9uZSB0byB1c2UgdGhpcyBzb2Z0d2FyZVxuICogZm9yIGFueSBwdXJwb3NlLCBpbmNsdWRpbmcgY29tbWVyY2lhbCBhcHBsaWNhdGlvbnMsXG4gKiBhbmQgdG8gYWx0ZXIgaXQgYW5kIHJlZGlzdHJpYnV0ZSBpdCBmcmVlbHksIHN1YmplY3QgdG9cbiAqIHRoZSBmb2xsb3dpbmcgcmVzdHJpY3Rpb25zOlxuICpcbiAqIDEuIFRoZSBvcmlnaW4gb2YgdGhpcyBzb2Z0d2FyZSBtdXN0IG5vdCBiZVxuICogICAgbWlzcmVwcmVzZW50ZWQ7IHlvdSBtdXN0IG5vdCBjbGFpbSB0aGF0IHlvdVxuICogICAgd3JvdGUgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLiBJZiB5b3UgdXNlIHRoaXNcbiAqICAgIHNvZnR3YXJlIGluIGEgcHJvZHVjdCwgYW4gYWNrbm93bGVkZ21lbnQgaW5cbiAqICAgIHRoZSBwcm9kdWN0IGRvY3VtZW50YXRpb24gd291bGQgYmUgYXBwcmVjaWF0ZWRcbiAqICAgIGJ1dCBpcyBub3QgcmVxdWlyZWQuXG4gKlxuICogMi4gQWx0ZXJlZCBzb3VyY2UgdmVyc2lvbnMgbXVzdCBiZSBwbGFpbmx5IG1hcmtlZFxuICogICAgYXMgc3VjaCwgYW5kIG11c3Qgbm90IGJlIG1pc3JlcHJlc2VudGVkIGFzXG4gKiAgICBiZWluZyB0aGUgb3JpZ2luYWwgc29mdHdhcmUuXG4gKlxuICogMy4gVGhpcyBub3RpY2UgbWF5IG5vdCBiZSByZW1vdmVkIG9yIGFsdGVyZWQgZnJvbVxuICogICAgYW55IHNvdXJjZSBkaXN0cmlidXRpb24uXG4gKi9cblxuLypcbiAqIHRpbmZsYXRlIGphdmFzY3JpcHQgcG9ydCBieSBFcmlrIE1vbGxlciBpbiBNYXkgMjAxMS5cbiAqIGVtb2xsZXJAb3BlcmEuY29tXG4gKlxuICogcmVhZF9iaXRzKCkgcGF0Y2hlZCBieSBtaWtlQGltaWRpby5jb20gdG8gYWxsb3dcbiAqIHJlYWRpbmcgbW9yZSB0aGVuIDggYml0cyAobmVlZGVkIGluIHNvbWUgemxpYiBzdHJlYW1zKVxuICovXG5cblxuLyoqXG4gKiBFeHBvc2UgdGhlIFRJTkYgY2xhc3MuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gVElORjtcblxuXG5mdW5jdGlvbiBUSU5GKCkge1xuXHR0aGlzLk9LID0gMDtcblx0dGhpcy5EQVRBX0VSUk9SID0gKC0zKTtcblx0dGhpcy5XSU5ET1dfU0laRSA9IDMyNzY4O1xuXG5cdC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqXG5cdCAqIC0tIGludGVybmFsIGRhdGEgc3RydWN0dXJlcyAtLSAqXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdHRoaXMuVFJFRSA9IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMudGFibGUgPSBuZXcgQXJyYXkoMTYpOyAgLyogdGFibGUgb2YgY29kZSBsZW5ndGggY291bnRzICovXG5cdFx0dGhpcy50cmFucyA9IG5ldyBBcnJheSgyODgpOyAvKiBjb2RlIC0+IHN5bWJvbCB0cmFuc2xhdGlvbiB0YWJsZSAqL1xuXHR9O1xuXG5cdHRoaXMuREFUQSA9IGZ1bmN0aW9uKHRoYXQpIHtcblx0XHR0aGlzLnNvdXJjZSA9ICcnO1xuXHRcdHRoaXMuc291cmNlSW5kZXggPSAwO1xuXHRcdHRoaXMudGFnID0gMDtcblx0XHR0aGlzLmJpdGNvdW50ID0gMDtcblxuXHRcdHRoaXMuZGVzdCA9IFtdO1xuXG5cdFx0dGhpcy5oaXN0b3J5ID0gW107XG5cblx0XHR0aGlzLmx0cmVlID0gbmV3IHRoYXQuVFJFRSgpOyAvKiBkeW5hbWljIGxlbmd0aC9zeW1ib2wgdHJlZSAqL1xuXHRcdHRoaXMuZHRyZWUgPSBuZXcgdGhhdC5UUkVFKCk7IC8qIGR5bmFtaWMgZGlzdGFuY2UgdHJlZSAqL1xuXHR9O1xuXG5cdC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqXG5cdCAqIC0tIHVuaW5pdGlhbGl6ZWQgZ2xvYmFsIGRhdGEgKHN0YXRpYyBzdHJ1Y3R1cmVzKSAtLSAqXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdHRoaXMuc2x0cmVlID0gbmV3IHRoaXMuVFJFRSgpOyAvKiBmaXhlZCBsZW5ndGgvc3ltYm9sIHRyZWUgKi9cblx0dGhpcy5zZHRyZWUgPSBuZXcgdGhpcy5UUkVFKCk7IC8qIGZpeGVkIGRpc3RhbmNlIHRyZWUgKi9cblxuXHQvKiBleHRyYSBiaXRzIGFuZCBiYXNlIHRhYmxlcyBmb3IgbGVuZ3RoIGNvZGVzICovXG5cdHRoaXMubGVuZ3RoX2JpdHMgPSBuZXcgQXJyYXkoMzApO1xuXHR0aGlzLmxlbmd0aF9iYXNlID0gbmV3IEFycmF5KDMwKTtcblxuXHQvKiBleHRyYSBiaXRzIGFuZCBiYXNlIHRhYmxlcyBmb3IgZGlzdGFuY2UgY29kZXMgKi9cblx0dGhpcy5kaXN0X2JpdHMgPSBuZXcgQXJyYXkoMzApO1xuXHR0aGlzLmRpc3RfYmFzZSA9IG5ldyBBcnJheSgzMCk7XG5cblx0Lyogc3BlY2lhbCBvcmRlcmluZyBvZiBjb2RlIGxlbmd0aCBjb2RlcyAqL1xuXHR0aGlzLmNsY2lkeCA9IFtcblx0XHQxNiwgMTcsIDE4LCAwLCA4LCA3LCA5LCA2LFxuXHRcdDEwLCA1LCAxMSwgNCwgMTIsIDMsIDEzLCAyLFxuXHRcdDE0LCAxLCAxNVxuXHRdO1xuXG5cdC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICpcblx0ICogLS0gdXRpbGl0eSBmdW5jdGlvbnMgLS0gKlxuXHQgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8qIGJ1aWxkIGV4dHJhIGJpdHMgYW5kIGJhc2UgdGFibGVzICovXG5cdHRoaXMuYnVpbGRfYml0c19iYXNlID0gZnVuY3Rpb24oYml0cywgYmFzZSwgZGVsdGEsIGZpcnN0KSB7XG5cdFx0dmFyIGksIHN1bTtcblxuXHRcdC8qIGJ1aWxkIGJpdHMgdGFibGUgKi9cblx0XHRmb3IgKGkgPSAwOyBpIDwgZGVsdGE7ICsraSkge1xuXHRcdFx0Yml0c1tpXSA9IDA7XG5cdFx0fVxuXHRcdGZvciAoaSA9IDA7IGkgPCAzMCAtIGRlbHRhOyArK2kpIHtcblx0XHRcdGJpdHNbaSArIGRlbHRhXSA9IE1hdGguZmxvb3IoaSAvIGRlbHRhKTtcblx0XHR9XG5cblx0XHQvKiBidWlsZCBiYXNlIHRhYmxlICovXG5cdFx0Zm9yIChzdW0gPSBmaXJzdCwgaSA9IDA7IGkgPCAzMDsgKytpKSB7XG5cdFx0XHRiYXNlW2ldID0gc3VtO1xuXHRcdFx0c3VtICs9IDEgPDwgYml0c1tpXTtcblx0XHR9XG5cdH07XG5cblx0LyogYnVpbGQgdGhlIGZpeGVkIGh1ZmZtYW4gdHJlZXMgKi9cblx0dGhpcy5idWlsZF9maXhlZF90cmVlcyA9IGZ1bmN0aW9uKGx0LCBkdCkge1xuXHRcdHZhciBpO1xuXG5cdFx0LyogYnVpbGQgZml4ZWQgbGVuZ3RoIHRyZWUgKi9cblx0XHRmb3IgKGkgPSAwOyBpIDwgNzsgKytpKSB7IGx0LnRhYmxlW2ldID0gMDsgfVxuXG5cdFx0bHQudGFibGVbN10gPSAyNDtcblx0XHRsdC50YWJsZVs4XSA9IDE1Mjtcblx0XHRsdC50YWJsZVs5XSA9IDExMjtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCAyNDsgKytpKSB7IGx0LnRyYW5zW2ldID0gMjU2ICsgaTsgfVxuXHRcdGZvciAoaSA9IDA7IGkgPCAxNDQ7ICsraSkgeyBsdC50cmFuc1syNCArIGldID0gaTsgfVxuXHRcdGZvciAoaSA9IDA7IGkgPCA4OyArK2kpIHsgbHQudHJhbnNbMjQgKyAxNDQgKyBpXSA9IDI4MCArIGk7IH1cblx0XHRmb3IgKGkgPSAwOyBpIDwgMTEyOyArK2kpIHsgbHQudHJhbnNbMjQgKyAxNDQgKyA4ICsgaV0gPSAxNDQgKyBpOyB9XG5cblx0XHQvKiBidWlsZCBmaXhlZCBkaXN0YW5jZSB0cmVlICovXG5cdFx0Zm9yIChpID0gMDsgaSA8IDU7ICsraSkgeyBkdC50YWJsZVtpXSA9IDA7IH1cblxuXHRcdGR0LnRhYmxlWzVdID0gMzI7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgMzI7ICsraSkgeyBkdC50cmFuc1tpXSA9IGk7IH1cblx0fTtcblxuXHQvKiBnaXZlbiBhbiBhcnJheSBvZiBjb2RlIGxlbmd0aHMsIGJ1aWxkIGEgdHJlZSAqL1xuXHR0aGlzLmJ1aWxkX3RyZWUgPSBmdW5jdGlvbih0LCBsZW5ndGhzLCBsb2Zmc2V0LCBudW0pIHtcblx0XHR2YXIgb2ZmcyA9IG5ldyBBcnJheSgxNik7XG5cdFx0dmFyIGksIHN1bTtcblxuXHRcdC8qIGNsZWFyIGNvZGUgbGVuZ3RoIGNvdW50IHRhYmxlICovXG5cdFx0Zm9yIChpID0gMDsgaSA8IDE2OyArK2kpIHsgdC50YWJsZVtpXSA9IDA7IH1cblxuXHRcdC8qIHNjYW4gc3ltYm9sIGxlbmd0aHMsIGFuZCBzdW0gY29kZSBsZW5ndGggY291bnRzICovXG5cdFx0Zm9yIChpID0gMDsgaSA8IG51bTsgKytpKSB7XG5cdFx0XHR0LnRhYmxlW2xlbmd0aHNbbG9mZnNldCArIGldXSsrO1xuXHRcdH1cblxuXHRcdHQudGFibGVbMF0gPSAwO1xuXG5cdFx0LyogY29tcHV0ZSBvZmZzZXQgdGFibGUgZm9yIGRpc3RyaWJ1dGlvbiBzb3J0ICovXG5cdFx0Zm9yIChzdW0gPSAwLCBpID0gMDsgaSA8IDE2OyArK2kpIHtcblx0XHRcdG9mZnNbaV0gPSBzdW07XG5cdFx0XHRzdW0gKz0gdC50YWJsZVtpXTtcblx0XHR9XG5cblx0XHQvKiBjcmVhdGUgY29kZS0+c3ltYm9sIHRyYW5zbGF0aW9uIHRhYmxlIChzeW1ib2xzIHNvcnRlZCBieSBjb2RlKSAqL1xuXHRcdGZvciAoaSA9IDA7IGkgPCBudW07ICsraSkge1xuXHRcdFx0aWYgKGxlbmd0aHNbbG9mZnNldCArIGldKSB7XG5cdFx0XHRcdHQudHJhbnNbb2Zmc1tsZW5ndGhzW2xvZmZzZXQgKyBpXV0rK10gPSBpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tICpcblx0ICogLS0gZGVjb2RlIGZ1bmN0aW9ucyAtLSAqXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvKiBnZXQgb25lIGJpdCBmcm9tIHNvdXJjZSBzdHJlYW0gKi9cblx0dGhpcy5nZXRiaXQgPSBmdW5jdGlvbihkKSB7XG5cdFx0dmFyIGJpdDtcblxuXHRcdC8qIGNoZWNrIGlmIHRhZyBpcyBlbXB0eSAqL1xuXHRcdGlmICghKGQuYml0Y291bnQtLSkpIHtcblx0XHRcdC8qIGxvYWQgbmV4dCB0YWcgKi9cblx0XHRcdGQudGFnID0gZC5zb3VyY2VbZC5zb3VyY2VJbmRleCsrXSAmIDB4ZmY7XG5cdFx0XHRkLmJpdGNvdW50ID0gNztcblx0XHR9XG5cblx0XHQvKiBzaGlmdCBiaXQgb3V0IG9mIHRhZyAqL1xuXHRcdGJpdCA9IGQudGFnICYgMHgwMTtcblx0XHRkLnRhZyA+Pj0gMTtcblxuXHRcdHJldHVybiBiaXQ7XG5cdH07XG5cblx0dGhpcy5yZWFkX2JpdHMgPSBmdW5jdGlvbihkLCBudW0sIGJhc2UpIHtcblx0XHRpZiAoIW51bSkge1xuXHRcdFx0cmV0dXJuIGJhc2U7XG5cdFx0fVxuXG5cdFx0dmFyIHJldCA9IHJlYWRfYml0c19kaXJlY3QoZC5zb3VyY2UsIGQuYml0Y291bnQsIGQudGFnLCBkLnNvdXJjZUluZGV4LCBudW0pO1xuXHRcdGQuYml0Y291bnQgPSByZXRbMF07XG5cdFx0ZC50YWcgPSByZXRbMV07XG5cdFx0ZC5zb3VyY2VJbmRleCA9IHJldFsyXTtcblx0XHRyZXR1cm4gcmV0WzNdICsgYmFzZTtcblx0fTtcblxuXHQvKiBnaXZlbiBhIGRhdGEgc3RyZWFtIGFuZCBhIHRyZWUsIGRlY29kZSBhIHN5bWJvbCAqL1xuXHR0aGlzLmRlY29kZV9zeW1ib2wgPSBmdW5jdGlvbihkLCB0KSB7XG5cdFx0d2hpbGUgKGQuYml0Y291bnQgPCAxNikge1xuXHRcdFx0ZC50YWcgPSBkLnRhZyB8IChkLnNvdXJjZVtkLnNvdXJjZUluZGV4KytdICYgMHhmZikgPDwgZC5iaXRjb3VudDtcblx0XHRcdGQuYml0Y291bnQgKz0gODtcblx0XHR9XG5cblx0XHR2YXIgc3VtID0gMCwgY3VyID0gMCwgbGVuID0gMDtcblx0XHRkbyB7XG5cdFx0XHRjdXIgPSAyICogY3VyICsgKChkLnRhZyAmICgxIDw8IGxlbikpID4+IGxlbik7XG5cblx0XHRcdCsrbGVuO1xuXG5cdFx0XHRzdW0gKz0gdC50YWJsZVtsZW5dO1xuXHRcdFx0Y3VyIC09IHQudGFibGVbbGVuXTtcblx0XHR9IHdoaWxlIChjdXIgPj0gMCk7XG5cblx0XHRkLnRhZyA+Pj0gbGVuO1xuXHRcdGQuYml0Y291bnQgLT0gbGVuO1xuXG5cdFx0cmV0dXJuIHQudHJhbnNbc3VtICsgY3VyXTtcblx0fTtcblxuXHQvKiBnaXZlbiBhIGRhdGEgc3RyZWFtLCBkZWNvZGUgZHluYW1pYyB0cmVlcyBmcm9tIGl0ICovXG5cdHRoaXMuZGVjb2RlX3RyZWVzID0gZnVuY3Rpb24oZCwgbHQsIGR0KSB7XG5cdFx0dmFyIGNvZGVfdHJlZSA9IG5ldyB0aGlzLlRSRUUoKTtcblx0XHR2YXIgbGVuZ3RocyA9IG5ldyBBcnJheSgyODgrMzIpO1xuXHRcdHZhciBobGl0LCBoZGlzdCwgaGNsZW47XG5cdFx0dmFyIGksIG51bSwgbGVuZ3RoO1xuXG5cdFx0LyogZ2V0IDUgYml0cyBITElUICgyNTctMjg2KSAqL1xuXHRcdGhsaXQgPSB0aGlzLnJlYWRfYml0cyhkLCA1LCAyNTcpO1xuXG5cdFx0LyogZ2V0IDUgYml0cyBIRElTVCAoMS0zMikgKi9cblx0XHRoZGlzdCA9IHRoaXMucmVhZF9iaXRzKGQsIDUsIDEpO1xuXG5cdFx0LyogZ2V0IDQgYml0cyBIQ0xFTiAoNC0xOSkgKi9cblx0XHRoY2xlbiA9IHRoaXMucmVhZF9iaXRzKGQsIDQsIDQpO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IDE5OyArK2kpIHsgbGVuZ3Roc1tpXSA9IDA7IH1cblxuXHRcdC8qIHJlYWQgY29kZSBsZW5ndGhzIGZvciBjb2RlIGxlbmd0aCBhbHBoYWJldCAqL1xuXHRcdGZvciAoaSA9IDA7IGkgPCBoY2xlbjsgKytpKSB7XG5cdFx0XHQvKiBnZXQgMyBiaXRzIGNvZGUgbGVuZ3RoICgwLTcpICovXG5cdFx0XHR2YXIgY2xlbiA9IHRoaXMucmVhZF9iaXRzKGQsIDMsIDApO1xuXG5cdFx0XHRsZW5ndGhzW3RoaXMuY2xjaWR4W2ldXSA9IGNsZW47XG5cdFx0fVxuXG5cdFx0LyogYnVpbGQgY29kZSBsZW5ndGggdHJlZSAqL1xuXHRcdHRoaXMuYnVpbGRfdHJlZShjb2RlX3RyZWUsIGxlbmd0aHMsIDAsIDE5KTtcblxuXHRcdC8qIGRlY29kZSBjb2RlIGxlbmd0aHMgZm9yIHRoZSBkeW5hbWljIHRyZWVzICovXG5cdFx0Zm9yIChudW0gPSAwOyBudW0gPCBobGl0ICsgaGRpc3Q7KSB7XG5cdFx0XHR2YXIgc3ltID0gdGhpcy5kZWNvZGVfc3ltYm9sKGQsIGNvZGVfdHJlZSk7XG5cblx0XHRcdHN3aXRjaCAoc3ltKSB7XG5cdFx0XHRjYXNlIDE2OlxuXHRcdFx0XHQvKiBjb3B5IHByZXZpb3VzIGNvZGUgbGVuZ3RoIDMtNiB0aW1lcyAocmVhZCAyIGJpdHMpICovXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR2YXIgcHJldiA9IGxlbmd0aHNbbnVtIC0gMV07XG5cdFx0XHRcdFx0Zm9yIChsZW5ndGggPSB0aGlzLnJlYWRfYml0cyhkLCAyLCAzKTsgbGVuZ3RoOyAtLWxlbmd0aCkge1xuXHRcdFx0XHRcdFx0bGVuZ3Roc1tudW0rK10gPSBwcmV2O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMTc6XG5cdFx0XHRcdC8qIHJlcGVhdCBjb2RlIGxlbmd0aCAwIGZvciAzLTEwIHRpbWVzIChyZWFkIDMgYml0cykgKi9cblx0XHRcdFx0Zm9yIChsZW5ndGggPSB0aGlzLnJlYWRfYml0cyhkLCAzLCAzKTsgbGVuZ3RoOyAtLWxlbmd0aCkge1xuXHRcdFx0XHRcdGxlbmd0aHNbbnVtKytdID0gMDtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMTg6XG5cdFx0XHRcdC8qIHJlcGVhdCBjb2RlIGxlbmd0aCAwIGZvciAxMS0xMzggdGltZXMgKHJlYWQgNyBiaXRzKSAqL1xuXHRcdFx0XHRmb3IgKGxlbmd0aCA9IHRoaXMucmVhZF9iaXRzKGQsIDcsIDExKTsgbGVuZ3RoOyAtLWxlbmd0aCkge1xuXHRcdFx0XHRcdGxlbmd0aHNbbnVtKytdID0gMDtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdC8qIHZhbHVlcyAwLTE1IHJlcHJlc2VudCB0aGUgYWN0dWFsIGNvZGUgbGVuZ3RocyAqL1xuXHRcdFx0XHRsZW5ndGhzW251bSsrXSA9IHN5bTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyogYnVpbGQgZHluYW1pYyB0cmVlcyAqL1xuXHRcdHRoaXMuYnVpbGRfdHJlZShsdCwgbGVuZ3RocywgMCwgaGxpdCk7XG5cdFx0dGhpcy5idWlsZF90cmVlKGR0LCBsZW5ndGhzLCBobGl0LCBoZGlzdCk7XG5cdH07XG5cblx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKlxuXHQgKiAtLSBibG9jayBpbmZsYXRlIGZ1bmN0aW9ucyAtLSAqXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0LyogZ2l2ZW4gYSBzdHJlYW0gYW5kIHR3byB0cmVlcywgaW5mbGF0ZSBhIGJsb2NrIG9mIGRhdGEgKi9cblx0dGhpcy5pbmZsYXRlX2Jsb2NrX2RhdGEgPSBmdW5jdGlvbihkLCBsdCwgZHQpIHtcblx0XHQvLyBqcyBvcHRpbWl6YXRpb24uXG5cdFx0dmFyIGRkZXN0ID0gZC5kZXN0O1xuXHRcdHZhciBkZGVzdGxlbmd0aCA9IGRkZXN0Lmxlbmd0aDtcblxuXHRcdHdoaWxlICgxKSB7XG5cdFx0XHR2YXIgc3ltID0gdGhpcy5kZWNvZGVfc3ltYm9sKGQsIGx0KTtcblxuXHRcdFx0LyogY2hlY2sgZm9yIGVuZCBvZiBibG9jayAqL1xuXHRcdFx0aWYgKHN5bSA9PT0gMjU2KSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLk9LO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoc3ltIDwgMjU2KSB7XG5cdFx0XHRcdGRkZXN0W2RkZXN0bGVuZ3RoKytdID0gc3ltOyAvLyA/IFN0cmluZy5mcm9tQ2hhckNvZGUoc3ltKTtcblx0XHRcdFx0ZC5oaXN0b3J5LnB1c2goc3ltKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhciBsZW5ndGgsIGRpc3QsIG9mZnM7XG5cdFx0XHRcdHZhciBpO1xuXG5cdFx0XHRcdHN5bSAtPSAyNTc7XG5cblx0XHRcdFx0LyogcG9zc2libHkgZ2V0IG1vcmUgYml0cyBmcm9tIGxlbmd0aCBjb2RlICovXG5cdFx0XHRcdGxlbmd0aCA9IHRoaXMucmVhZF9iaXRzKGQsIHRoaXMubGVuZ3RoX2JpdHNbc3ltXSwgdGhpcy5sZW5ndGhfYmFzZVtzeW1dKTtcblxuXHRcdFx0XHRkaXN0ID0gdGhpcy5kZWNvZGVfc3ltYm9sKGQsIGR0KTtcblxuXHRcdFx0XHQvKiBwb3NzaWJseSBnZXQgbW9yZSBiaXRzIGZyb20gZGlzdGFuY2UgY29kZSAqL1xuXHRcdFx0XHRvZmZzID0gZC5oaXN0b3J5Lmxlbmd0aCAtIHRoaXMucmVhZF9iaXRzKGQsIHRoaXMuZGlzdF9iaXRzW2Rpc3RdLCB0aGlzLmRpc3RfYmFzZVtkaXN0XSk7XG5cblx0XHRcdFx0aWYgKG9mZnMgPCAwKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHpsaWIgb2Zmc2V0ICcgKyBvZmZzKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIGNvcHkgbWF0Y2ggKi9cblx0XHRcdFx0Zm9yIChpID0gb2ZmczsgaSA8IG9mZnMgKyBsZW5ndGg7ICsraSkge1xuXHRcdFx0XHRcdC8vZGRlc3RbZGRlc3RsZW5ndGgrK10gPSBkZGVzdFtpXTtcblx0XHRcdFx0XHRkZGVzdFtkZGVzdGxlbmd0aCsrXSA9IGQuaGlzdG9yeVtpXTtcblx0XHRcdFx0XHRkLmhpc3RvcnkucHVzaChkLmhpc3RvcnlbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdC8qIGluZmxhdGUgYW4gdW5jb21wcmVzc2VkIGJsb2NrIG9mIGRhdGEgKi9cblx0dGhpcy5pbmZsYXRlX3VuY29tcHJlc3NlZF9ibG9jayA9IGZ1bmN0aW9uKGQpIHtcblx0XHR2YXIgbGVuZ3RoLCBpbnZsZW5ndGg7XG5cdFx0dmFyIGk7XG5cblx0XHRpZiAoZC5iaXRjb3VudCA+IDcpIHtcblx0XHRcdCB2YXIgb3ZlcmZsb3cgPSBNYXRoLmZsb29yKGQuYml0Y291bnQgLyA4KTtcblx0XHRcdCBkLnNvdXJjZUluZGV4IC09IG92ZXJmbG93O1xuXHRcdFx0IGQuYml0Y291bnQgPSAwO1xuXHRcdFx0IGQudGFnID0gMDtcblx0XHR9XG5cblx0XHQvKiBnZXQgbGVuZ3RoICovXG5cdFx0bGVuZ3RoID0gZC5zb3VyY2VbZC5zb3VyY2VJbmRleCsxXTtcblx0XHRsZW5ndGggPSAyNTYqbGVuZ3RoICsgZC5zb3VyY2VbZC5zb3VyY2VJbmRleF07XG5cblx0XHQvKiBnZXQgb25lJ3MgY29tcGxlbWVudCBvZiBsZW5ndGggKi9cblx0XHRpbnZsZW5ndGggPSBkLnNvdXJjZVtkLnNvdXJjZUluZGV4KzNdO1xuXHRcdGludmxlbmd0aCA9IDI1NippbnZsZW5ndGggKyBkLnNvdXJjZVtkLnNvdXJjZUluZGV4KzJdO1xuXG5cdFx0LyogY2hlY2sgbGVuZ3RoICovXG5cdFx0aWYgKGxlbmd0aCAhPT0gKH5pbnZsZW5ndGggJiAweDAwMDBmZmZmKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuREFUQV9FUlJPUjtcblx0XHR9XG5cblx0XHRkLnNvdXJjZUluZGV4ICs9IDQ7XG5cblx0XHQvKiBjb3B5IGJsb2NrICovXG5cdFx0Zm9yIChpID0gbGVuZ3RoOyBpOyAtLWkpIHtcblx0XHRcdCBkLmhpc3RvcnkucHVzaChkLnNvdXJjZVtkLnNvdXJjZUluZGV4XSk7XG5cdFx0XHQgZC5kZXN0W2QuZGVzdC5sZW5ndGhdID0gZC5zb3VyY2VbZC5zb3VyY2VJbmRleCsrXTtcblx0XHR9XG5cblx0XHQvKiBtYWtlIHN1cmUgd2Ugc3RhcnQgbmV4dCBibG9jayBvbiBhIGJ5dGUgYm91bmRhcnkgKi9cblx0XHRkLmJpdGNvdW50ID0gMDtcblxuXHRcdHJldHVybiB0aGlzLk9LO1xuXHR9O1xuXG5cdC8qIGluZmxhdGUgYSBibG9jayBvZiBkYXRhIGNvbXByZXNzZWQgd2l0aCBmaXhlZCBodWZmbWFuIHRyZWVzICovXG5cdHRoaXMuaW5mbGF0ZV9maXhlZF9ibG9jayA9IGZ1bmN0aW9uKGQpIHtcblx0XHQvKiBkZWNvZGUgYmxvY2sgdXNpbmcgZml4ZWQgdHJlZXMgKi9cblx0XHRyZXR1cm4gdGhpcy5pbmZsYXRlX2Jsb2NrX2RhdGEoZCwgdGhpcy5zbHRyZWUsIHRoaXMuc2R0cmVlKTtcblx0fTtcblxuXHQvKiBpbmZsYXRlIGEgYmxvY2sgb2YgZGF0YSBjb21wcmVzc2VkIHdpdGggZHluYW1pYyBodWZmbWFuIHRyZWVzICovXG5cdHRoaXMuaW5mbGF0ZV9keW5hbWljX2Jsb2NrID0gZnVuY3Rpb24oZCkge1xuXHRcdC8qIGRlY29kZSB0cmVlcyBmcm9tIHN0cmVhbSAqL1xuXHRcdHRoaXMuZGVjb2RlX3RyZWVzKGQsIGQubHRyZWUsIGQuZHRyZWUpO1xuXG5cdFx0LyogZGVjb2RlIGJsb2NrIHVzaW5nIGRlY29kZWQgdHJlZXMgKi9cblx0XHRyZXR1cm4gdGhpcy5pbmZsYXRlX2Jsb2NrX2RhdGEoZCwgZC5sdHJlZSwgZC5kdHJlZSk7XG5cdH07XG5cblx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqXG5cdCAqIC0tIHB1YmxpYyBmdW5jdGlvbnMgLS0gKlxuXHQgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0LyogaW5pdGlhbGl6ZSBnbG9iYWwgKHN0YXRpYykgZGF0YSAqL1xuXHR0aGlzLmluaXQgPSBmdW5jdGlvbigpIHtcblx0XHQvKiBidWlsZCBmaXhlZCBodWZmbWFuIHRyZWVzICovXG5cdFx0dGhpcy5idWlsZF9maXhlZF90cmVlcyh0aGlzLnNsdHJlZSwgdGhpcy5zZHRyZWUpO1xuXG5cdFx0LyogYnVpbGQgZXh0cmEgYml0cyBhbmQgYmFzZSB0YWJsZXMgKi9cblx0XHR0aGlzLmJ1aWxkX2JpdHNfYmFzZSh0aGlzLmxlbmd0aF9iaXRzLCB0aGlzLmxlbmd0aF9iYXNlLCA0LCAzKTtcblx0XHR0aGlzLmJ1aWxkX2JpdHNfYmFzZSh0aGlzLmRpc3RfYml0cywgdGhpcy5kaXN0X2Jhc2UsIDIsIDEpO1xuXG5cdFx0LyogZml4IGEgc3BlY2lhbCBjYXNlICovXG5cdFx0dGhpcy5sZW5ndGhfYml0c1syOF0gPSAwO1xuXHRcdHRoaXMubGVuZ3RoX2Jhc2VbMjhdID0gMjU4O1xuXG5cdFx0dGhpcy5yZXNldCgpO1xuXHR9O1xuXG5cdHRoaXMucmVzZXQgPSBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmQgPSBuZXcgdGhpcy5EQVRBKHRoaXMpO1xuXHRcdGRlbGV0ZSB0aGlzLmhlYWRlcjtcblx0fTtcblxuXHQvKiBpbmZsYXRlIHN0cmVhbSBmcm9tIHNvdXJjZSB0byBkZXN0ICovXG5cdHRoaXMudW5jb21wcmVzcyA9IGZ1bmN0aW9uKHNvdXJjZSwgb2Zmc2V0KSB7XG5cdFx0dmFyIGQgPSB0aGlzLmQ7XG5cdFx0dmFyIGJmaW5hbDtcblxuXHRcdC8qIGluaXRpYWxpc2UgZGF0YSAqL1xuXHRcdGQuc291cmNlID0gc291cmNlO1xuXHRcdGQuc291cmNlSW5kZXggPSBvZmZzZXQ7XG5cdFx0ZC5iaXRjb3VudCA9IDA7XG5cblx0XHRkLmRlc3QgPSBbXTtcblxuXHRcdC8vIFNraXAgemxpYiBoZWFkZXIgYXQgc3RhcnQgb2Ygc3RyZWFtXG5cdFx0aWYgKHR5cGVvZiB0aGlzLmhlYWRlciA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuaGVhZGVyID0gdGhpcy5yZWFkX2JpdHMoZCwgMTYsIDApO1xuXHRcdFx0LyogYnl0ZSAwOiAweDc4LCA3ID0gMzJrIHdpbmRvdyBzaXplLCA4ID0gZGVmbGF0ZSAqL1xuXHRcdFx0LyogYnl0ZSAxOiBjaGVjayBiaXRzIGZvciBoZWFkZXIgYW5kIG90aGVyIGZsYWdzICovXG5cdFx0fVxuXG5cdFx0dmFyIGJsb2NrcyA9IDA7XG5cblx0XHRkbyB7XG5cdFx0XHR2YXIgYnR5cGU7XG5cdFx0XHR2YXIgcmVzO1xuXG5cdFx0XHQvKiByZWFkIGZpbmFsIGJsb2NrIGZsYWcgKi9cblx0XHRcdGJmaW5hbCA9IHRoaXMuZ2V0Yml0KGQpO1xuXG5cdFx0XHQvKiByZWFkIGJsb2NrIHR5cGUgKDIgYml0cykgKi9cblx0XHRcdGJ0eXBlID0gdGhpcy5yZWFkX2JpdHMoZCwgMiwgMCk7XG5cblx0XHRcdC8qIGRlY29tcHJlc3MgYmxvY2sgKi9cblx0XHRcdHN3aXRjaCAoYnR5cGUpIHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0LyogZGVjb21wcmVzcyB1bmNvbXByZXNzZWQgYmxvY2sgKi9cblx0XHRcdFx0cmVzID0gdGhpcy5pbmZsYXRlX3VuY29tcHJlc3NlZF9ibG9jayhkKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdC8qIGRlY29tcHJlc3MgYmxvY2sgd2l0aCBmaXhlZCBodWZmbWFuIHRyZWVzICovXG5cdFx0XHRcdHJlcyA9IHRoaXMuaW5mbGF0ZV9maXhlZF9ibG9jayhkKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdC8qIGRlY29tcHJlc3MgYmxvY2sgd2l0aCBkeW5hbWljIGh1ZmZtYW4gdHJlZXMgKi9cblx0XHRcdFx0cmVzID0gdGhpcy5pbmZsYXRlX2R5bmFtaWNfYmxvY2soZCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIHsgJ3N0YXR1cycgOiB0aGlzLkRBVEFfRVJST1IgfTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHJlcyAhPT0gdGhpcy5PSykge1xuXHRcdFx0XHRyZXR1cm4geyAnc3RhdHVzJyA6IHRoaXMuREFUQV9FUlJPUiB9O1xuXHRcdFx0fVxuXHRcdFx0YmxvY2tzKys7XG5cblx0XHR9IHdoaWxlICghYmZpbmFsICYmIGQuc291cmNlSW5kZXggPCBkLnNvdXJjZS5sZW5ndGgpO1xuXG5cdFx0ZC5oaXN0b3J5ID0gZC5oaXN0b3J5LnNsaWNlKC10aGlzLldJTkRPV19TSVpFKTtcblxuXHRcdHJldHVybiB7ICdzdGF0dXMnIDogdGhpcy5PSywgJ2RhdGEnIDogZC5kZXN0IH07XG5cdH07XG59XG5cblxuLyoqXG4gKiBQcml2YXRlIEFQSS5cbiAqL1xuXG5cbi8qIHJlYWQgYSBudW0gYml0IHZhbHVlIGZyb20gYSBzdHJlYW0gYW5kIGFkZCBiYXNlICovXG5mdW5jdGlvbiByZWFkX2JpdHNfZGlyZWN0KHNvdXJjZSwgYml0Y291bnQsIHRhZywgaWR4LCBudW0pIHtcblx0dmFyIHZhbCA9IDA7XG5cblx0d2hpbGUgKGJpdGNvdW50IDwgMjQpIHtcblx0XHR0YWcgPSB0YWcgfCAoc291cmNlW2lkeCsrXSAmIDB4ZmYpIDw8IGJpdGNvdW50O1xuXHRcdGJpdGNvdW50ICs9IDg7XG5cdH1cblxuXHR2YWwgPSB0YWcgJiAoMHhmZmZmID4+ICgxNiAtIG51bSkpO1xuXHR0YWcgPj49IG51bTtcblx0Yml0Y291bnQgLT0gbnVtO1xuXHRyZXR1cm4gW2JpdGNvdW50LCB0YWcsIGlkeCwgdmFsXTtcbn1cbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbi8qXG4gKiBub1ZOQzogSFRNTDUgVk5DIGNsaWVudFxuICogQ29weXJpZ2h0IChDKSAyMDEyIEpvZWwgTWFydGluXG4gKiBMaWNlbnNlZCB1bmRlciBNUEwgMi4wIChzZWUgTElDRU5TRS50eHQpXG4gKi9cblxuXG4vKipcbiAqIERlcGVuZGVuY2llcy5cbiAqL1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnbm9WTkM6VXRpbCcpO1xudmFyIGRlYnVnZXJyb3IgPSByZXF1aXJlKCdkZWJ1ZycpKCdub1ZOQzpFUlJPUjpVdGlsJyk7XG5kZWJ1Z2Vycm9yLmxvZyA9IGNvbnNvbGUud2Fybi5iaW5kKGNvbnNvbGUpO1xuXG5cbi8qKlxuICogTG9jYWwgdmFyaWFibGVzLlxuICovXG52YXIgY3Vyc29yX3VyaXNfc3VwcG9ydGVkID0gbnVsbDtcblxuXG52YXIgVXRpbCA9IG1vZHVsZS5leHBvcnRzID0ge1xuXHRwdXNoODogZnVuY3Rpb24gKGFycmF5LCBudW0pIHtcblx0XHRhcnJheS5wdXNoKG51bSAmIDB4RkYpO1xuXHR9LFxuXG5cdHB1c2gxNjogZnVuY3Rpb24gKGFycmF5LCBudW0pIHtcblx0XHRhcnJheS5wdXNoKChudW0gPj4gOCkgJiAweEZGLFxuXHRcdFx0XHRcdFx0bnVtICYgMHhGRik7XG5cdH0sXG5cblx0cHVzaDMyOiBmdW5jdGlvbiAoYXJyYXksIG51bSkge1xuXHRcdGFycmF5LnB1c2goKG51bSA+PiAyNCkgJiAweEZGLFxuXHRcdFx0XHRcdCAobnVtID4+IDE2KSAmIDB4RkYsXG5cdFx0XHRcdFx0IChudW0gPj4gOCkgJiAweEZGLFxuXHRcdFx0XHRcdCBudW0gJiAweEZGKTtcblx0fSxcblxuXHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWU6IChmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKGdsb2JhbC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcblx0XHRcdHJldHVybiBnbG9iYWwucmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQoZ2xvYmFsKTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoZ2xvYmFsLndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuXHRcdFx0cmV0dXJuIGdsb2JhbC53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUuYmluZChnbG9iYWwpO1xuXHRcdH1cblx0XHRlbHNlIGlmIChnbG9iYWwubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG5cdFx0XHRyZXR1cm4gZ2xvYmFsLm1velJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKGdsb2JhbCk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKGdsb2JhbC5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG5cdFx0XHRyZXR1cm4gZ2xvYmFsLm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUuYmluZChnbG9iYWwpO1xuXHRcdH1cblx0XHRlbHNlIGlmIChnbG9iYWwubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcblx0XHRcdHJldHVybiBnbG9iYWwubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUuYmluZChnbG9iYWwpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbihjYWxsYmFjaykge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0pKCksXG5cblx0bWFrZV9wcm9wZXJ0aWVzOiBmdW5jdGlvbiAoY29uc3RydWN0b3IsIGFycikge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRtYWtlX3Byb3BlcnR5KGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgYXJyW2ldWzBdLCBhcnJbaV1bMV0sIGFycltpXVsyXSk7XG5cdFx0fVxuXHR9LFxuXG5cdHNldF9kZWZhdWx0czogZnVuY3Rpb24gKG9iaiwgY29uZiwgZGVmYXVsdHMpIHtcblx0XHR2YXIgZGVmYXVsdHNfa2V5cyA9IE9iamVjdC5rZXlzKGRlZmF1bHRzKTtcblx0XHR2YXIgY29uZl9rZXlzID0gT2JqZWN0LmtleXMoY29uZik7XG5cdFx0dmFyIGtleXNfb2JqID0ge307XG5cdFx0dmFyIGk7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgZGVmYXVsdHNfa2V5cy5sZW5ndGg7IGkrKykgeyBrZXlzX29ialtkZWZhdWx0c19rZXlzW2ldXSA9IDE7IH1cblx0XHRmb3IgKGkgPSAwOyBpIDwgY29uZl9rZXlzLmxlbmd0aDsgaSsrKSB7IGtleXNfb2JqW2NvbmZfa2V5c1tpXV0gPSAxOyB9XG5cblx0XHR2YXIga2V5cyA9IE9iamVjdC5rZXlzKGtleXNfb2JqKTtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgc2V0dGVyID0gb2JqWydfcmF3X3NldF8nICsga2V5c1tpXV07XG5cblx0XHRcdGlmICghc2V0dGVyKSB7XG5cdFx0XHRcdGRlYnVnZXJyb3IoJ2ludmFsaWQgcHJvcGVydHk6ICVzJywga2V5c1tpXSk7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoa2V5c1tpXSBpbiBjb25mKSB7XG5cdFx0XHRcdHNldHRlci5jYWxsKG9iaiwgY29uZltrZXlzW2ldXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZXR0ZXIuY2FsbChvYmosIGRlZmF1bHRzW2tleXNbaV1dKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0ZGVjb2RlVVRGODogZnVuY3Rpb24gKHV0ZjhzdHJpbmcpIHtcblx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZSh1dGY4c3RyaW5nKSk7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldCBET00gZWxlbWVudCBwb3NpdGlvbiBvbiBwYWdlLlxuXHQgKi9cblx0Z2V0UG9zaXRpb246IGZ1bmN0aW9uIChvYmopIHtcblx0XHQvLyBOQihzcm9zcyk6IHRoZSBNb3ppbGxhIGRldmVsb3BlciByZWZlcmVuY2Ugc2VlbXMgdG8gaW5kaWNhdGUgdGhhdFxuXHRcdC8vIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBpbmNsdWRlcyBib3JkZXIgYW5kIHBhZGRpbmcsIHNvIHRoZSBjYW52YXNcblx0XHQvLyBzdHlsZSBzaG91bGQgTk9UIGluY2x1ZGUgZWl0aGVyLlxuXHRcdHZhciBvYmpQb3NpdGlvbiA9IG9iai5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdHJldHVybiB7J3gnOiBvYmpQb3NpdGlvbi5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0LCAneSc6IG9ialBvc2l0aW9uLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCxcblx0XHRcdFx0XHRcdCd3aWR0aCc6IG9ialBvc2l0aW9uLndpZHRoLCAnaGVpZ2h0Jzogb2JqUG9zaXRpb24uaGVpZ2h0fTtcblx0fSxcblxuXHQvKipcblx0ICogR2V0IG1vdXNlIGV2ZW50IHBvc2l0aW9uIGluIERPTSBlbGVtZW50XG5cdCAqL1xuXHRnZXRFdmVudFBvc2l0aW9uOiBmdW5jdGlvbiAoZSwgb2JqLCBzY2FsZSwgem9vbSkge1xuXHRcdHZhciBldnQsIGRvY1gsIGRvY1ksIHBvcztcblxuXHRcdGlmICh0eXBlb2Ygem9vbSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHpvb20gPSAxLjA7XG5cdFx0fVxuXHRcdGV2dCA9IChlID8gZSA6IGdsb2JhbC5ldmVudCk7XG5cdFx0ZXZ0ID0gKGV2dC5jaGFuZ2VkVG91Y2hlcyA/IGV2dC5jaGFuZ2VkVG91Y2hlc1swXSA6IGV2dC50b3VjaGVzID8gZXZ0LnRvdWNoZXNbMF0gOiBldnQpO1xuXHRcdGlmIChldnQucGFnZVggfHwgZXZ0LnBhZ2VZKSB7XG5cdFx0XHRkb2NYID0gZXZ0LnBhZ2VYO1xuXHRcdFx0ZG9jWSA9IGV2dC5wYWdlWTtcblx0XHRcdGRvY1ggPSBldnQucGFnZVgvem9vbTtcblx0XHRcdGRvY1kgPSBldnQucGFnZVkvem9vbTtcblx0XHR9IGVsc2UgaWYgKGV2dC5jbGllbnRYIHx8IGV2dC5jbGllbnRZKSB7XG5cdFx0XHRkb2NYID0gZXZ0LmNsaWVudFggKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgK1xuXHRcdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdDtcblx0XHRcdGRvY1kgPSBldnQuY2xpZW50WSArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wICtcblx0XHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcblx0XHR9XG5cdFx0cG9zID0gVXRpbC5nZXRQb3NpdGlvbihvYmopO1xuXHRcdGlmICh0eXBlb2Ygc2NhbGUgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRzY2FsZSA9IDE7XG5cdFx0fVxuXG5cdFx0dmFyIHJlYWx4ID0gZG9jWCAtIHBvcy54O1xuXHRcdHZhciByZWFseSA9IGRvY1kgLSBwb3MueTtcblx0XHR2YXIgeCA9IE1hdGgubWF4KE1hdGgubWluKHJlYWx4LCBwb3Mud2lkdGggLSAxKSwgMCk7XG5cdFx0dmFyIHkgPSBNYXRoLm1heChNYXRoLm1pbihyZWFseSwgcG9zLmhlaWdodCAtIDEpLCAwKTtcblxuXHRcdHJldHVybiB7J3gnOiB4IC8gc2NhbGUsICd5JzogeSAvIHNjYWxlLCAncmVhbHgnOiByZWFseCAvIHNjYWxlLCAncmVhbHknOiByZWFseSAvIHNjYWxlfTtcblx0fSxcblxuXHRhZGRFdmVudDogZnVuY3Rpb24gKG9iaiwgZXZUeXBlLCBmbikge1xuXHRcdGlmIChvYmouYXR0YWNoRXZlbnQpIHtcblx0XHRcdHZhciByID0gb2JqLmF0dGFjaEV2ZW50KCdvbicgKyBldlR5cGUsIGZuKTtcblx0XHRcdHJldHVybiByO1xuXHRcdH0gZWxzZSBpZiAob2JqLmFkZEV2ZW50TGlzdGVuZXIpIHtcblx0XHRcdG9iai5hZGRFdmVudExpc3RlbmVyKGV2VHlwZSwgZm4sIGZhbHNlKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2hhbmRsZXIgY291bGQgbm90IGJlIGF0dGFjaGVkJyk7XG5cdFx0fVxuXHR9LFxuXG5cdHJlbW92ZUV2ZW50OiBmdW5jdGlvbiAob2JqLCBldlR5cGUsIGZuKSB7XG5cdFx0aWYgKG9iai5kZXRhY2hFdmVudCkge1xuXHRcdFx0dmFyIHIgPSBvYmouZGV0YWNoRXZlbnQoJ29uJyArIGV2VHlwZSwgZm4pO1xuXHRcdFx0cmV0dXJuIHI7XG5cdFx0fSBlbHNlIGlmIChvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuXHRcdFx0b2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZUeXBlLCBmbiwgZmFsc2UpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignaGFuZGxlciBjb3VsZCBub3QgYmUgcmVtb3ZlZCcpO1xuXHRcdH1cblx0fSxcblxuXHRzdG9wRXZlbnQ6IGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKGUuc3RvcFByb3BhZ2F0aW9uKSB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IH1cblx0XHRlbHNlICAgICAgICAgICAgICAgICAgIHsgZS5jYW5jZWxCdWJibGUgPSB0cnVlOyB9XG5cblx0XHRpZiAoZS5wcmV2ZW50RGVmYXVsdCkgIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyB9XG5cdFx0ZWxzZSAgICAgICAgICAgICAgICAgICB7IGUucmV0dXJuVmFsdWUgPSBmYWxzZTsgfVxuXHR9LFxuXG5cdGJyb3dzZXJTdXBwb3J0c0N1cnNvclVSSXM6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoY3Vyc29yX3VyaXNfc3VwcG9ydGVkID09PSBudWxsKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cblx0XHRcdFx0dGFyZ2V0LnN0eWxlLmN1cnNvciA9ICd1cmwoXCJkYXRhOmltYWdlL3gtaWNvbjtiYXNlNjQsQUFBQ0FBRUFDQWdBQUFJQUFnQTRBUUFBRmdBQUFDZ0FBQUFJQUFBQUVBQUFBQUVBSUFBQUFBQUFFQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL0FBQUFBQUFBQUFBQUFBQUFBQUFBQUE9PVwiKSAyIDIsIGRlZmF1bHQnO1xuXG5cdFx0XHRcdGlmICh0YXJnZXQuc3R5bGUuY3Vyc29yKSB7XG5cdFx0XHRcdFx0ZGVidWcoJ2RhdGEgVVJJIHNjaGVtZSBjdXJzb3Igc3VwcG9ydGVkJyk7XG5cdFx0XHRcdFx0Y3Vyc29yX3VyaXNfc3VwcG9ydGVkID0gdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRkZWJ1Z2Vycm9yKCdkYXRhIFVSSSBzY2hlbWUgY3Vyc29yIG5vdCBzdXBwb3J0ZWQnKTtcblx0XHRcdFx0XHRjdXJzb3JfdXJpc19zdXBwb3J0ZWQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXhjKSB7XG5cdFx0XHRcdGRlYnVnZXJyb3IoJ2RhdGEgVVJJIHNjaGVtZSBjdXJzb3IgdGVzdCBleGNlcHRpb246ICcgKyBleGMpO1xuXHRcdFx0XHRjdXJzb3JfdXJpc19zdXBwb3J0ZWQgPSBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY3Vyc29yX3VyaXNfc3VwcG9ydGVkO1xuXHR9XG59O1xuXG5cbi8qKlxuICogUHJpdmF0ZSBBUEkuXG4gKi9cblxuXG5mdW5jdGlvbiBtYWtlX3Byb3BlcnR5IChwcm90bywgbmFtZSwgbW9kZSwgdHlwZSkge1xuXHR2YXIgZ2V0dGVyO1xuXG5cdGlmICh0eXBlID09PSAnYXJyJykge1xuXHRcdGdldHRlciA9IGZ1bmN0aW9uIChpZHgpIHtcblx0XHRcdGlmICh0eXBlb2YgaWR4ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gdGhpc1snXycgKyBuYW1lXVtpZHhdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRoaXNbJ18nICsgbmFtZV07XG5cdFx0XHR9XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRnZXR0ZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzWydfJyArIG5hbWVdO1xuXHRcdH07XG5cdH1cblxuXHRmdW5jdGlvbiBtYWtlX3NldHRlciAocHJvY2Vzc192YWwpIHtcblx0XHRpZiAocHJvY2Vzc192YWwpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAodmFsLCBpZHgpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBpZHggIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0dGhpc1snXycgKyBuYW1lXVtpZHhdID0gcHJvY2Vzc192YWwodmFsKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzWydfJyArIG5hbWVdID0gcHJvY2Vzc192YWwodmFsKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICh2YWwsIGlkeCkge1xuXHRcdFx0XHRpZiAodHlwZW9mIGlkeCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHR0aGlzWydfJyArIG5hbWVdW2lkeF0gPSB2YWw7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpc1snXycgKyBuYW1lXSA9IHZhbDtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cdH1cblxuXHR2YXIgc2V0dGVyO1xuXG5cdGlmICh0eXBlID09PSAnYm9vbCcpIHtcblx0XHRzZXR0ZXIgPSBtYWtlX3NldHRlcihmdW5jdGlvbiAodmFsKSB7XG5cdFx0XHRpZiAoIXZhbCB8fCAodmFsIGluIHsnMCc6IDEsICdubyc6IDEsICdmYWxzZSc6IDF9KSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSBlbHNlIGlmICh0eXBlID09PSAnaW50Jykge1xuXHRcdHNldHRlciA9IG1ha2Vfc2V0dGVyKGZ1bmN0aW9uICh2YWwpIHsgcmV0dXJuIHBhcnNlSW50KHZhbCwgMTApOyB9KTtcblx0fSBlbHNlIGlmICh0eXBlID09PSAnZmxvYXQnKSB7XG5cdFx0c2V0dGVyID0gbWFrZV9zZXR0ZXIocGFyc2VGbG9hdCk7XG5cdH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N0cicpIHtcblx0XHRzZXR0ZXIgPSBtYWtlX3NldHRlcihTdHJpbmcpO1xuXHR9IGVsc2UgaWYgKHR5cGUgPT09ICdmdW5jJykge1xuXHRcdHNldHRlciA9IG1ha2Vfc2V0dGVyKGZ1bmN0aW9uICh2YWwpIHtcblx0XHRcdGlmICghdmFsKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7fTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiB2YWw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0gZWxzZSBpZiAodHlwZSA9PT0gJ2FycicgfHwgdHlwZSA9PT0gJ2RvbScgfHwgdHlwZSA9PT0gJ3JhdycpIHtcblx0XHRzZXR0ZXIgPSBtYWtlX3NldHRlcigpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcigndW5rbm93biBwcm9wZXJ0eSB0eXBlICcgKyB0eXBlKTsgIC8vIHNvbWUgc2FuaXR5IGNoZWNraW5nXG5cdH1cblxuXHQvLyBzZXQgdGhlIGdldHRlclxuXHRpZiAodHlwZW9mIHByb3RvWydnZXRfJyArIG5hbWVdID09PSAndW5kZWZpbmVkJykge1xuXHRcdHByb3RvWydnZXRfJyArIG5hbWVdID0gZ2V0dGVyO1xuXHR9XG5cblx0Ly8gc2V0IHRoZSBzZXR0ZXIgaWYgbmVlZGVkXG5cdGlmICh0eXBlb2YgcHJvdG9bJ3NldF8nICsgbmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0aWYgKG1vZGUgPT09ICdydycpIHtcblx0XHRcdHByb3RvWydzZXRfJyArIG5hbWVdID0gc2V0dGVyO1xuXHRcdH0gZWxzZSBpZiAobW9kZSA9PT0gJ3dvJykge1xuXHRcdFx0cHJvdG9bJ3NldF8nICsgbmFtZV0gPSBmdW5jdGlvbiAodmFsLCBpZHgpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiB0aGlzWydfJyArIG5hbWVdICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihuYW1lICsgJyBjYW4gb25seSBiZSBzZXQgb25jZScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHNldHRlci5jYWxsKHRoaXMsIHZhbCwgaWR4KTtcblx0XHRcdH07XG5cdFx0fVxuXHR9XG5cblx0Ly8gbWFrZSBhIHNwZWNpYWwgc2V0dGVyIHRoYXQgd2UgY2FuIHVzZSBpbiBzZXQgZGVmYXVsdHNcblx0cHJvdG9bJ19yYXdfc2V0XycgKyBuYW1lXSA9IGZ1bmN0aW9uICh2YWwsIGlkeCkge1xuXHRcdHNldHRlci5jYWxsKHRoaXMsIHZhbCwgaWR4KTtcblx0XHQvL2RlbGV0ZSB0aGlzWydfaW5pdF9zZXRfJyArIG5hbWVdOyAgLy8gcmVtb3ZlIGl0IGFmdGVyIHVzZVxuXHR9O1xufVxuXG59KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbi8qXG4gKiBXZWJzb2NrOiBoaWdoLXBlcmZvcm1hbmNlIGJpbmFyeSBXZWJTb2NrZXRzXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTIgSm9lbCBNYXJ0aW5cbiAqIExpY2Vuc2VkIHVuZGVyIE1QTCAyLjAgKHNlZSBMSUNFTlNFLnR4dClcbiAqXG4gKiBXZWJzb2NrIGlzIHNpbWlsYXIgdG8gdGhlIHN0YW5kYXJkIFdlYlNvY2tldCBvYmplY3QgYnV0IFdlYnNvY2tcbiAqIGVuYWJsZXMgY29tbXVuaWNhdGlvbiB3aXRoIHJhdyBUQ1Agc29ja2V0cyAoaS5lLiB0aGUgYmluYXJ5IHN0cmVhbSlcbiAqIHZpYSB3ZWJzb2NraWZ5LiBUaGlzIGlzIGFjY29tcGxpc2hlZCBieSBiYXNlNjQgZW5jb2RpbmcgdGhlIGRhdGFcbiAqIHN0cmVhbSBiZXR3ZWVuIFdlYnNvY2sgYW5kIHdlYnNvY2tpZnkuXG4gKlxuICogV2Vic29jayBoYXMgYnVpbHQtaW4gcmVjZWl2ZSBxdWV1ZSBidWZmZXJpbmc7IHRoZSBtZXNzYWdlIGV2ZW50XG4gKiBkb2VzIG5vdCBjb250YWluIGFjdHVhbCBkYXRhIGJ1dCBpcyBzaW1wbHkgYSBub3RpZmljYXRpb24gdGhhdFxuICogdGhlcmUgaXMgbmV3IGRhdGEgYXZhaWxhYmxlLiBTZXZlcmFsIHJRKiBtZXRob2RzIGFyZSBhdmFpbGFibGUgdG9cbiAqIHJlYWQgYmluYXJ5IGRhdGEgb2ZmIG9mIHRoZSByZWNlaXZlIHF1ZXVlLlxuICovXG5cblxuLyoqXG4gKiBEZXBlbmRlbmNpZXMuXG4gKi9cbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ25vVk5DOldlYnNvY2snKTtcbnZhciBkZWJ1Z2Vycm9yID0gcmVxdWlyZSgnZGVidWcnKSgnbm9WTkM6RVJST1I6V2Vic29jaycpO1xuZGVidWdlcnJvci5sb2cgPSBjb25zb2xlLndhcm4uYmluZChjb25zb2xlKTtcbnZhciBicm93c2VyID0gcmVxdWlyZSgnYm93c2VyJykuYnJvd3NlcjtcbnZhciBCYXNlNjQgPSByZXF1aXJlKCcuL2Jhc2U2NCcpO1xuXG5cbi8qKlxuICogRXhwb3NlIFdlYnNvY2sgY2xhc3MuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gV2Vic29jaztcblxuXG5mdW5jdGlvbiBXZWJzb2NrKCkge1xuXHR0aGlzLl93ZWJzb2NrZXQgPSBudWxsOyAgLy8gV2ViU29ja2V0IG9iamVjdFxuXHR0aGlzLl9yUSA9IFtdOyAgICAgICAgICAgLy8gUmVjZWl2ZSBxdWV1ZVxuXHR0aGlzLl9yUWkgPSAwOyAgICAgICAgICAgLy8gUmVjZWl2ZSBxdWV1ZSBpbmRleFxuXHR0aGlzLl9yUW1heCA9IDEwMDAwOyAgICAgLy8gTWF4IHJlY2VpdmUgcXVldWUgc2l6ZSBiZWZvcmUgY29tcGFjdGluZ1xuXHR0aGlzLl9zUSA9IFtdOyAgICAgICAgICAgLy8gU2VuZCBxdWV1ZVxuXG5cdHRoaXMuX21vZGUgPSAnYmFzZTY0JzsgICAgLy8gQ3VycmVudCBXZWJTb2NrZXQgbW9kZTogJ2JpbmFyeScsICdiYXNlNjQnXG5cdHRoaXMubWF4QnVmZmVyZWRBbW91bnQgPSAyMDA7XG5cblx0dGhpcy5fZXZlbnRIYW5kbGVycyA9IHtcblx0XHQnbWVzc2FnZSc6IGZ1bmN0aW9uICgpIHt9LFxuXHRcdCdvcGVuJzogZnVuY3Rpb24gKCkge30sXG5cdFx0J2Nsb3NlJzogZnVuY3Rpb24gKCkge30sXG5cdFx0J2Vycm9yJzogZnVuY3Rpb24gKCkge31cblx0fTtcbn1cblxuXG5XZWJzb2NrLnByb3RvdHlwZSA9IHtcblx0Ly8gR2V0dGVycyBhbmQgU2V0dGVyc1xuXHRnZXRfc1E6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5fc1E7XG5cdH0sXG5cblx0Z2V0X3JROiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3JRO1xuXHR9LFxuXG5cdGdldF9yUWk6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5fclFpO1xuXHR9LFxuXG5cdHNldF9yUWk6IGZ1bmN0aW9uICh2YWwpIHtcblx0XHR0aGlzLl9yUWkgPSB2YWw7XG5cdH0sXG5cblx0Ly8gUmVjZWl2ZSBRdWV1ZVxuXHRyUWxlbjogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9yUS5sZW5ndGggLSB0aGlzLl9yUWk7XG5cdH0sXG5cblx0clFwZWVrODogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9yUVt0aGlzLl9yUWldO1xuXHR9LFxuXG5cdHJRc2hpZnQ4OiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3JRW3RoaXMuX3JRaSsrXTtcblx0fSxcblxuXHRyUXNraXA4OiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fclFpKys7XG5cdH0sXG5cblx0clFza2lwQnl0ZXM6IGZ1bmN0aW9uIChudW0pIHtcblx0XHR0aGlzLl9yUWkgKz0gbnVtO1xuXHR9LFxuXG5cdHJRdW5zaGlmdDg6IGZ1bmN0aW9uIChudW0pIHtcblx0XHRpZiAodGhpcy5fclFpID09PSAwKSB7XG5cdFx0XHR0aGlzLl9yUS51bnNoaWZ0KG51bSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3JRaS0tO1xuXHRcdFx0dGhpcy5fclFbdGhpcy5fclFpXSA9IG51bTtcblx0XHR9XG5cdH0sXG5cblx0clFzaGlmdDE2OiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuICh0aGlzLl9yUVt0aGlzLl9yUWkrK10gPDwgOCkgK1xuXHRcdFx0ICAgdGhpcy5fclFbdGhpcy5fclFpKytdO1xuXHR9LFxuXG5cdHJRc2hpZnQzMjogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiAodGhpcy5fclFbdGhpcy5fclFpKytdIDw8IDI0KSArXG5cdFx0XHQgICAodGhpcy5fclFbdGhpcy5fclFpKytdIDw8IDE2KSArXG5cdFx0XHQgICAodGhpcy5fclFbdGhpcy5fclFpKytdIDw8IDgpICtcblx0XHRcdCAgIHRoaXMuX3JRW3RoaXMuX3JRaSsrXTtcblx0fSxcblxuXHRyUXNoaWZ0U3RyOiBmdW5jdGlvbiAobGVuKSB7XG5cdFx0aWYgKHR5cGVvZihsZW4pID09PSAndW5kZWZpbmVkJykgeyBsZW4gPSB0aGlzLnJRbGVuKCk7IH1cblx0XHR2YXIgYXJyID0gdGhpcy5fclEuc2xpY2UodGhpcy5fclFpLCB0aGlzLl9yUWkgKyBsZW4pO1xuXHRcdHRoaXMuX3JRaSArPSBsZW47XG5cdFx0cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgYXJyKTtcblx0fSxcblxuXHRyUXNoaWZ0Qnl0ZXM6IGZ1bmN0aW9uIChsZW4pIHtcblx0XHRpZiAodHlwZW9mKGxlbikgPT09ICd1bmRlZmluZWQnKSB7IGxlbiA9IHRoaXMuclFsZW4oKTsgfVxuXHRcdHRoaXMuX3JRaSArPSBsZW47XG5cdFx0cmV0dXJuIHRoaXMuX3JRLnNsaWNlKHRoaXMuX3JRaSAtIGxlbiwgdGhpcy5fclFpKTtcblx0fSxcblxuXHRyUXNsaWNlOiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuXHRcdGlmIChlbmQpIHtcblx0XHRcdHJldHVybiB0aGlzLl9yUS5zbGljZSh0aGlzLl9yUWkgKyBzdGFydCwgdGhpcy5fclFpICsgZW5kKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHRoaXMuX3JRLnNsaWNlKHRoaXMuX3JRaSArIHN0YXJ0KTtcblx0XHR9XG5cdH0sXG5cblx0Ly8gQ2hlY2sgdG8gc2VlIGlmIHdlIG11c3Qgd2FpdCBmb3IgJ251bScgYnl0ZXMgKGRlZmF1bHQgdG8gRkJVLmJ5dGVzKVxuXHQvLyB0byBiZSBhdmFpbGFibGUgaW4gdGhlIHJlY2VpdmUgcXVldWUuIFJldHVybiB0cnVlIGlmIHdlIG5lZWQgdG9cblx0Ly8gd2FpdCAoYW5kIHBvc3NpYmx5IHByaW50IGEgZGVidWcgbWVzc2FnZSksIG90aGVyd2lzZSBmYWxzZS5cblx0clF3YWl0OiBmdW5jdGlvbiAobXNnLCBudW0sIGdvYmFjaykge1xuXHRcdHZhciByUWxlbiA9IHRoaXMuX3JRLmxlbmd0aCAtIHRoaXMuX3JRaTsgLy8gU2tpcCByUWxlbigpIGZ1bmN0aW9uIGNhbGxcblx0XHRpZiAoclFsZW4gPCBudW0pIHtcblx0XHRcdGlmIChnb2JhY2spIHtcblx0XHRcdFx0aWYgKHRoaXMuX3JRaSA8IGdvYmFjaykge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignclF3YWl0IGNhbm5vdCBiYWNrdXAgJyArIGdvYmFjayArICcgYnl0ZXMnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl9yUWkgLT0gZ29iYWNrO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7IC8vIHRydWUgbWVhbnMgbmVlZCBtb3JlIGRhdGFcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8vIFNlbmQgUXVldWVcblxuXHRmbHVzaDogZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLl93ZWJzb2NrZXQuYnVmZmVyZWRBbW91bnQgIT09IDApIHtcblx0XHRcdGRlYnVnKCdmbHVzaCgpIHwgYnVmZmVyZWRBbW91bnQ6ICVkJywgdGhpcy5fd2Vic29ja2V0LmJ1ZmZlcmVkQW1vdW50KTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fd2Vic29ja2V0LmJ1ZmZlcmVkQW1vdW50IDwgdGhpcy5tYXhCdWZmZXJlZEFtb3VudCkge1xuXHRcdFx0aWYgKHRoaXMuX3NRLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dGhpcy5fd2Vic29ja2V0LnNlbmQodGhpcy5fZW5jb2RlX21lc3NhZ2UoKSk7XG5cdFx0XHRcdHRoaXMuX3NRID0gW107XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWJ1ZygnZmx1c2goKSB8IGRlbGF5aW5nIHNlbmQnKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH0sXG5cblx0c2VuZDogZnVuY3Rpb24gKGFycikge1xuXHQgICB0aGlzLl9zUSA9IHRoaXMuX3NRLmNvbmNhdChhcnIpO1xuXHQgICByZXR1cm4gdGhpcy5mbHVzaCgpO1xuXHR9LFxuXG5cdHNlbmRfc3RyaW5nOiBmdW5jdGlvbiAoc3RyKSB7XG5cdFx0dGhpcy5zZW5kKHN0ci5zcGxpdCgnJykubWFwKGZ1bmN0aW9uIChjaHIpIHtcblx0XHRcdHJldHVybiBjaHIuY2hhckNvZGVBdCgwKTtcblx0XHR9KSk7XG5cdH0sXG5cblx0Ly8gRXZlbnQgSGFuZGxlcnNcblx0b246IGZ1bmN0aW9uIChldnQsIGhhbmRsZXIpIHtcblx0XHR0aGlzLl9ldmVudEhhbmRsZXJzW2V2dF0gPSBoYW5kbGVyO1xuXHR9LFxuXG5cdG9mZjogZnVuY3Rpb24gKGV2dCkge1xuXHRcdHRoaXMuX2V2ZW50SGFuZGxlcnNbZXZ0XSA9IGZ1bmN0aW9uKCkge307XG5cdH0sXG5cblx0aW5pdDogZnVuY3Rpb24gKHByb3RvY29scykge1xuXHRcdHRoaXMuX3JRID0gW107XG5cdFx0dGhpcy5fclFpID0gMDtcblx0XHR0aGlzLl9zUSA9IFtdO1xuXHRcdHRoaXMuX3dlYnNvY2tldCA9IG51bGw7XG5cblx0XHQvLyBDaGVjayBmb3IgZnVsbCB0eXBlZCBhcnJheSBzdXBwb3J0XG5cdFx0dmFyIGJ0ID0gZmFsc2U7XG5cdFx0aWYgKCgnVWludDhBcnJheScgaW4gZ2xvYmFsKSAmJiAoJ3NldCcgaW4gVWludDhBcnJheS5wcm90b3R5cGUpKSB7XG5cdFx0XHRidCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0dmFyIHdzYnQgPSBmYWxzZTtcblx0XHRpZiAoZ2xvYmFsLldlYlNvY2tldCkge1xuXHRcdFx0Ly8gU2FmYXJpIDwgNyBkb2VzIG5vdCBzdXBwb3J0IGJpbmFyeSBXUy5cblx0XHRcdGlmIChicm93c2VyLnNhZmFyaSAmJiBOdW1iZXIoYnJvd3Nlci52ZXJzaW9uKSA+IDAgJiYgTnVtYmVyKGJyb3dzZXIudmVyc2lvbikgPCA3KSB7XG5cdFx0XHRcdGRlYnVnKCdpbml0KCkgfCBTYWZhcmkgJWQgZG9lcyBub3Qgc3VwcG9ydCBiaW5hcnkgV2ViU29ja2V0JywgTnVtYmVyKGJyb3dzZXIudmVyc2lvbikpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHdzYnQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIERlZmF1bHQgcHJvdG9jb2xzIGlmIG5vdCBzcGVjaWZpZWRcblx0XHRpZiAodHlwZW9mKHByb3RvY29scykgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRpZiAod3NidCkge1xuXHRcdFx0XHRwcm90b2NvbHMgPSBbJ2JpbmFyeScsICdiYXNlNjQnXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHByb3RvY29scyA9ICdiYXNlNjQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICghd3NidCkge1xuXHRcdFx0aWYgKHByb3RvY29scyA9PT0gJ2JpbmFyeScpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdXZWJTb2NrZXQgYmluYXJ5IHN1Yi1wcm90b2NvbCByZXF1ZXN0ZWQgYnV0IG5vdCBzdXBwb3J0ZWQnKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZihwcm90b2NvbHMpID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHR2YXIgbmV3X3Byb3RvY29scyA9IFtdO1xuXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcHJvdG9jb2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0aWYgKHByb3RvY29sc1tpXSA9PT0gJ2JpbmFyeScpIHtcblx0XHRcdFx0XHRcdGRlYnVnZXJyb3IoJ2luaXQoKSB8IHNraXBwaW5nIHVuc3VwcG9ydGVkIFdlYlNvY2tldCBiaW5hcnkgc3ViLXByb3RvY29sJyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG5ld19wcm90b2NvbHMucHVzaChwcm90b2NvbHNbaV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChuZXdfcHJvdG9jb2xzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRwcm90b2NvbHMgPSBuZXdfcHJvdG9jb2xzO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignb25seSBXZWJTb2NrZXQgYmluYXJ5IHN1Yi1wcm90b2NvbCB3YXMgcmVxdWVzdGVkIGFuZCBpcyBub3Qgc3VwcG9ydGVkJyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcHJvdG9jb2xzO1xuXHR9LFxuXG5cdG9wZW46IGZ1bmN0aW9uICh1cmksIHByb3RvY29scykge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdHByb3RvY29scyA9IHRoaXMuaW5pdChwcm90b2NvbHMpO1xuXG5cdFx0Ly8gdGhpcy5fd2Vic29ja2V0ID0gbmV3IFdlYlNvY2tldCh1cmksIHByb3RvY29scyk7XG5cdFx0Ly8gVE9ETzogQWRkIEFQSSBvciBzZXR0aW5ncyBmb3IgcGFzc2luZyB0aGUgVzNDIFdlYlNvY2tldCBjbGFzcy5cblx0XHRpZiAoZ2xvYmFsLk5hdGl2ZVdlYlNvY2tldCkge1xuXHRcdFx0ZGVidWcoJ29wZW4oKSB8IHVzaW5nIE5hdGl2ZVdlYlNvY2tldCcpO1xuXHRcdFx0dGhpcy5fd2Vic29ja2V0ID0gbmV3IGdsb2JhbC5OYXRpdmVXZWJTb2NrZXQodXJpLCBwcm90b2NvbHMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWJ1Zygnb3BlbigpIHwgbm90IHVzaW5nIE5hdGl2ZVdlYlNvY2tldCcpO1xuXHRcdFx0dGhpcy5fd2Vic29ja2V0ID0gbmV3IFdlYlNvY2tldCh1cmksIHByb3RvY29scyk7XG5cdFx0fVxuXG5cdFx0aWYgKHByb3RvY29scy5pbmRleE9mKCdiaW5hcnknKSA+PSAwKSB7XG5cdFx0XHR0aGlzLl93ZWJzb2NrZXQuYmluYXJ5VHlwZSA9ICdhcnJheWJ1ZmZlcic7XG5cdFx0fVxuXG5cdFx0dGhpcy5fd2Vic29ja2V0Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRzZWxmLl9yZWN2X21lc3NhZ2UoZSk7XG5cdFx0fTtcblxuXHRcdHRoaXMuX3dlYnNvY2tldC5vbm9wZW4gPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmIChzZWxmLl93ZWJzb2NrZXQucHJvdG9jb2wpIHtcblx0XHRcdFx0ZGVidWcoJ29ub3Blbjogc2VydmVyIGNob29zZSBcIiVzXCIgc3ViLXByb3RvY29sJywgc2VsZi5fd2Vic29ja2V0LnByb3RvY29sKTtcblx0XHRcdFx0c2VsZi5fbW9kZSA9IHNlbGYuX3dlYnNvY2tldC5wcm90b2NvbDtcblx0XHRcdFx0c2VsZi5fZXZlbnRIYW5kbGVycy5vcGVuKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0ZGVidWdlcnJvcignb25vcGVuOiBzZXJ2ZXIgY2hvb3NlIG5vIHN1Yi1wcm90b2NvbCwgdXNpbmcgXCJiYXNlNjRcIicpO1xuXHRcdFx0XHRzZWxmLl9tb2RlID0gJ2Jhc2U2NCc7XG5cdFx0XHRcdHNlbGYuX2V2ZW50SGFuZGxlcnMub3BlbigpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR0aGlzLl93ZWJzb2NrZXQub25jbG9zZSA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRkZWJ1Zygnb25jbG9zZTogJW8nLCBlKTtcblx0XHRcdHNlbGYuX2V2ZW50SGFuZGxlcnMuY2xvc2UoZSk7XG5cdFx0fTtcblxuXHRcdHRoaXMuX3dlYnNvY2tldC5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcblx0XHRcdGRlYnVnZXJyb3IoJ29uZXJyb3I6ICVvJywgZSk7XG5cdFx0XHRzZWxmLl9ldmVudEhhbmRsZXJzLmVycm9yKGUpO1xuXHRcdH07XG5cdH0sXG5cblx0Y2xvc2U6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fd2Vic29ja2V0KSB7XG5cdFx0XHRpZiAoKHRoaXMuX3dlYnNvY2tldC5yZWFkeVN0YXRlID09PSB0aGlzLl93ZWJzb2NrZXQuT1BFTikgfHxcblx0XHRcdFx0XHQodGhpcy5fd2Vic29ja2V0LnJlYWR5U3RhdGUgPT09IHRoaXMuX3dlYnNvY2tldC5DT05ORUNUSU5HKSkge1xuXHRcdFx0XHRkZWJ1ZygnY2xvc2UoKScpO1xuXHRcdFx0XHR0aGlzLl93ZWJzb2NrZXQuY2xvc2UoKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fd2Vic29ja2V0Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuOyB9O1xuXHRcdH1cblx0fSxcblxuXHQvLyBwcml2YXRlIG1ldGhvZHNcblxuXHRfZW5jb2RlX21lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5fbW9kZSA9PT0gJ2JpbmFyeScpIHtcblx0XHRcdC8vIFB1dCBpbiBhIGJpbmFyeSBhcnJheWJ1ZmZlclxuXHRcdFx0cmV0dXJuIChuZXcgVWludDhBcnJheSh0aGlzLl9zUSkpLmJ1ZmZlcjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gYmFzZTY0IGVuY29kZVxuXHRcdFx0cmV0dXJuIEJhc2U2NC5lbmNvZGUodGhpcy5fc1EpO1xuXHRcdH1cblx0fSxcblxuXHRfZGVjb2RlX21lc3NhZ2U6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0aWYgKHRoaXMuX21vZGUgPT09ICdiaW5hcnknKSB7XG5cdFx0XHQvLyBwdXNoIGFycmF5YnVmZmVyIHZhbHVlcyBvbnRvIHRoZSBlbmRcblx0XHRcdHZhciB1OCA9IG5ldyBVaW50OEFycmF5KGRhdGEpO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB1OC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR0aGlzLl9yUS5wdXNoKHU4W2ldKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gYmFzZTY0IGRlY29kZSBhbmQgY29uY2F0IHRvIGVuZFxuXHRcdFx0dGhpcy5fclEgPSB0aGlzLl9yUS5jb25jYXQoQmFzZTY0LmRlY29kZShkYXRhLCAwKSk7XG5cdFx0fVxuXHR9LFxuXG5cdF9yZWN2X21lc3NhZ2U6IGZ1bmN0aW9uIChlKSB7XG5cdFx0dHJ5IHtcblx0XHRcdHRoaXMuX2RlY29kZV9tZXNzYWdlKGUuZGF0YSk7XG5cdFx0XHRpZiAodGhpcy5yUWxlbigpID4gMCkge1xuXHRcdFx0XHR0aGlzLl9ldmVudEhhbmRsZXJzLm1lc3NhZ2UoKTtcblx0XHRcdFx0Ly8gQ29tcGFjdCB0aGUgcmVjZWl2ZSBxdWV1ZVxuXHRcdFx0XHRpZiAodGhpcy5fclEubGVuZ3RoID4gdGhpcy5fclFtYXgpIHtcblx0XHRcdFx0XHR0aGlzLl9yUSA9IHRoaXMuX3JRLnNsaWNlKHRoaXMuX3JRaSk7XG5cdFx0XHRcdFx0dGhpcy5fclFpID0gMDtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVidWcoJ19yZWN2X21lc3NhZ2UoKSB8IGlnbm9yaW5nIGVtcHR5IG1lc3NhZ2UnKTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0ZGVidWdlcnJvcignX3JlY3ZfbWVzc2FnZSgpIHwgZXJyb3I6ICVvJywgZXJyb3IpO1xuXG5cdFx0XHRpZiAodHlwZW9mIGVycm9yLm5hbWUgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHRoaXMuX2V2ZW50SGFuZGxlcnMuZXJyb3IoZXJyb3IubmFtZSArICc6ICcgKyBlcnJvci5tZXNzYWdlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX2V2ZW50SGFuZGxlcnMuZXJyb3IoZXJyb3IpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5wcm9jZXNzLm5leHRUaWNrID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FuU2V0SW1tZWRpYXRlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuICAgIHZhciBjYW5Qb3N0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cucG9zdE1lc3NhZ2UgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXJcbiAgICA7XG5cbiAgICBpZiAoY2FuU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZikgeyByZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShmKSB9O1xuICAgIH1cblxuICAgIGlmIChjYW5Qb3N0KSB7XG4gICAgICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGV2LnNvdXJjZTtcbiAgICAgICAgICAgIGlmICgoc291cmNlID09PSB3aW5kb3cgfHwgc291cmNlID09PSBudWxsKSAmJiBldi5kYXRhID09PSAncHJvY2Vzcy10aWNrJykge1xuICAgICAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xuICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKCdwcm9jZXNzLXRpY2snLCAnKicpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xufSkoKTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbiIsInZhciBub1ZOQyA9IHJlcXVpcmUoJ25vdm5jLW5vZGUnKTtcbnZhciBSZWFjdG9yID0gcmVxdWlyZSgnLi9yZWFjdG9yJyk7XG5cblxuLyoqXG4gKiBTaW1wbGlmaWVkIHZlcnNpb24gb2YgdGhlIGpRdWVyeSAkLmV4dGVuZFxuICovXG5mdW5jdGlvbiBleHRlbmQoKXtcbiAgZm9yKHZhciBpPTE7IGk8YXJndW1lbnRzLmxlbmd0aDsgaSsrKVxuICAgIGZvcih2YXIga2V5IGluIGFyZ3VtZW50c1tpXSlcbiAgICAgIGlmKGFyZ3VtZW50c1tpXS5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICBhcmd1bWVudHNbMF1ba2V5XSA9IGFyZ3VtZW50c1tpXVtrZXldO1xuICByZXR1cm4gYXJndW1lbnRzWzBdO1xufVxuXG5cbihmdW5jdGlvbiAod2luZG93KSB7XG5cbiAgdmFyIENWSU8gPSB7fTtcbiAgdmFyIENWSU9EaXNwbGF5ID0gbnVsbDtcblxuICAvLyBDVklPIHJlYWN0b3IgZXZlbnRzXG4gIENWSU8uRVZfU0VUX0FVVEhfVE9LRU4gID0nc2V0QXV0aFRva2VuJztcbiAgQ1ZJTy5FVl9GRVRDSF9BVVRIX1RPS0VOPSdmZXRjaEF1dGhUb2tlbic7XG4gIENWSU8uRVZfRkVUQ0hfQVVUSF9UT0tFTl9FUlJPUj0nZmV0Y2hBdXRoVG9rZW5FcnJvcic7XG4gIENWSU8uRVZfUkFfQVRUUlNfTE9BRCAgID0ncmFBdHRyc0xvYWQnO1xuICBDVklPLkVWX0lOSVRfRVJST1IgICAgICA9J2luaXRFcnJvcic7XG4gIENWSU8uRVZfUkFfQVRUUlNfRVJST1IgID0ncmFBdHRyc0Vycm9yJztcblxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyBDVklPXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gbXVzdCBiZSBjYWxsIHByaW9yIGNyZWF0aW5nIGEgbmV3IENWSU9EaXNwbGF5XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZXR0aW5ncyAtIENWSU8gc2V0dGluZ3NcbiAgICovXG4gIENWSU8uaW5pdCA9IGZ1bmN0aW9uKHNldHRpbmdzKSB7XG4gICAgLy8gQ1ZJTyBTZXR0aW5nc1xuICAgIENWSU8uc2V0dGluZ3MgPSBleHRlbmQoe1xuICAgICAgYXV0aFRva2VuOiBudWxsLCAgICAgICAgICAgICAgICAgIC8vIFNlYUNhdCBQYW5lbCBhdXRoIHRva2VuIGluIHBsYWluIHRleHRcbiAgICAgIGF1dGhUb2tlblVSTDogbnVsbCwgICAgICAgICAgICAgICAvLyBVUkwgd2hlcmUgYXV0aCB0b2tlbiBjYW4gYmUgZmV0Y2hlZFxuICAgICAgb25BdXRoVG9rZW5SZXF1ZXN0OiBudWxsLFxuICAgICAgdXJsOiBudWxsICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNlYUNhdCBQYW5lbCBVUkxcbiAgICB9LCBzZXR0aW5ncyk7XG5cbiAgICBDVklPLmF1dGhUb2tlblJlcXVlc3RlZCA9IGZhbHNlO1xuICAgIENWSU8ucmVhY3RvciA9IG5ldyBSZWFjdG9yKCk7XG5cbiAgICAvLyBpZiAoQ1ZJTy5zZXR0aW5ncy5hdXRoVG9rZW4gPT0gbnVsbCAmJiBDVklPLnNldHRpbmdzLmF1dGhUb2tlblVSTCAhPSBudWxsKVxuICAgIC8vICAgQ1ZJTy5mZXRjaEF1dGhUb2tlbigpO1xuICAgIC8vIGVsc2UgaWYgKENWSU8uc2V0dGluZ3MuYXV0aFRva2VuID09IG51bGwgJiYgQ1ZJTy5zZXR0aW5ncy5hdXRoVG9rZW5VUkwgPT0gbnVsbClcbiAgICAvLyAgIHRocm93ICdTZWFDYXQgUGFuZWwgQXV0aCBUb2tlbiBub3Qgc3BlY2lmaWVkLic7XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGF1dGggdG9rZW4sIHVubG9ja3MgYXV0aFRva2VuIHJlcXVlc3RzXG4gICAqIGFuZCBmaXJlcyAnYXV0aFRva2VuU2V0JyBldmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGF1dGhUb2tlbiAtIGF1dGggdG9rZW5cbiAgICovXG4gIENWSU8uc2V0QXV0aFRva2VuID0gZnVuY3Rpb24oYXV0aFRva2VuKSB7XG4gICAgQ1ZJTy5zZXR0aW5ncy5hdXRoVG9rZW4gPSBhdXRoVG9rZW47XG4gICAgQ1ZJTy5yZWFjdG9yLmRpc3BhdGNoRXZlbnQoQ1ZJTy5FVl9TRVRfQVVUSF9UT0tFTik7XG5cbiAgICAvLyBEZWxheSBpcyBhcHBsaWVkIHRvIGZsdXNoIGxhdGUgcmVxdWVzdHNcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgQ1ZJTy5zZXR0aW5ncy5hdXRoVG9rZW5SZXF1ZXN0ZWQgPSBmYWxzZTtcbiAgICB9LCAyMDApO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKiBSZXF1ZXN0cyBuZXcgdG9rZW4gdG8gYmUgb2J0YWluZWQgYW5kIGxvY2tzIGZ1cnRoZXIgcmVxdWVzdHMgdW50aWwgc2V0QXV0aFRva2VuIGlzIGNhbGxlZC5cbiAgICpcbiAgICogVXNlciBjYW4gZGVmaW5lIGEgQ1ZJTy5zZXR0aW5ncy5vbkF1dGhUb2tlblJlcXVlc3QgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICogd2hlcmUgaGUgaXMgb2JsaWdlZCB0byBjYWxsIHNldEF1dGhUb2tlbiBtYW51YWxseS5cbiAgICpcbiAgICogSWYgdXNlciBjYWxsYmFjayBpcyBub3QgcHJlc2VudCwgdGhpcyBtZXRob2QgYXR0ZW1wdHNcbiAgICogdG8gZmV0Y2ggdGhlIHRva2VuIGZyb20gdGhlIHVybCBzZXQgaW4gQ1ZJTy5zZXR0aW5ncy5hdXRoVG9rZW5VUkxcbiAgICogXG4gICAqL1xuICBDVklPLnJlcXVlc3RBdXRoVG9rZW4gPSBmdW5jdGlvbigpXG4gIHtcbiAgICAvLyBPbmx5IHJlcXVlc3Qgb25jZVxuICAgIGlmIChDVklPLmF1dGhUb2tlblJlcXVlc3RlZClcbiAgICAgIHJldHVybjtcbiAgICBDVklPLmF1dGhUb2tlblJlcXVlc3RlZCA9IHRydWU7XG5cbiAgICBpZiAoQ1ZJTy5zZXR0aW5ncy5vbkF1dGhUb2tlblJlcXVlc3QgIT0gbnVsbCkge1xuICAgICAgQ1ZJTy5zZXR0aW5ncy5vbkF1dGhUb2tlblJlcXVlc3QoKTtcbiAgICB9XG5cbiAgICBlbHNlIGlmIChDVklPLnNldHRpbmdzLmF1dGhUb2tlblVSTCkge1xuICAgICAgQ1ZJTy5mZXRjaEF1dGhUb2tlbihmdW5jdGlvbiBvblN1Y2Nlc3ModG9rZW4pIHtcbiAgICAgICAgQ1ZJTy5zZXRBdXRoVG9rZW4odG9rZW4pO1xuICAgICAgfSwgZnVuY3Rpb24gb25FcnJvcigpIHtcbiAgICAgICAgQ1ZJTy5hdXRoVG9rZW5SZXF1ZXN0ZWQgPSBmYWxzZTtcbiAgICAgICAgQ1ZJTy5yZWFjdG9yLmRpc3BhdGNoRXZlbnQoQ1ZJTy5FVl9GRVRDSF9BVVRIX1RPS0VOX0VSUk9SKTtcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyAnQXV0aCB0b2tlbiByZXF1ZXN0ZWQgYnV0IGNvdWxuXFwndCBiZSBmZXRjaGVkIGJ5IGFueSBtZWFucy4nO1xuICAgIH1cbiAgfVxuXG5cblxuICAvKipcbiAgICogT3BlbnMgYW5kIHNlbmRzIGEgWE1MSHR0cFJlcXVlc3QgdG8gdGhlIGNvbmZpZ3VyZWQgYXV0aFRva2VuVVJMXG4gICAqXG4gICAqIElmIENWSU8uYXV0aFRva2VuVVJMIGRvZXNuJ3QgZXhpc3Qgb3IgdGhlIHJlcXVlc3QgZGlkbid0IHN1Y2NlZWRcbiAgICovXG4gIENWSU8uZmV0Y2hBdXRoVG9rZW4gPSBmdW5jdGlvbihvblN1Y2Nlc3MsIG9uRXJyb3IpIHtcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICB4aHIub3BlbignR0VUJywgQ1ZJTy5zZXR0aW5ncy5hdXRoVG9rZW5VUkwsIHRydWUpO1xuXG4gICAgaWYgKG9uRXJyb3IgIT0gdW5kZWZpbmVkKVxuICAgICAgeGhyLm9uZXJyb3IgPSBvbkVycm9yO1xuXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKVxuICAgICAgICBvblN1Y2Nlc3MoeGhyLnJlc3BvbnNlKVxuICAgICAgZWxzZSBvbkVycm9yKCk7XG4gICAgfTtcbiAgICB4aHIuc2VuZCgnbG9hZCcpO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIHRoZSBDVklPIFNjcmVlblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc2V0dGluZ3MgLSBDVklPRGlzcGxheSBzZXR0aW5nc1xuICAgKi9cbiAgQ1ZJT0Rpc3BsYXkgPSBmdW5jdGlvbihzZXR0aW5ncykge1xuICAgIHRoaXMucmZiID0gbnVsbDtcbiAgICB0aGlzLnJhQXR0cnMgPSBudWxsO1xuICAgIHRoaXMuY29ubmVjdGluZyA9IGZhbHNlO1xuXG4gICAgLy8gQ1ZJTyBTY3JlZW4gU2V0dGluZ3NcbiAgICB0aGlzLnNldHRpbmdzID0gZXh0ZW5kKHtcbiAgICAgIHRhcmdldCA6ICAgICAgICAgICAgICBudWxsLCAvLyBUYXJnZXQgY2FudmFzIGVsZW1lbnRcbiAgICAgIGRldmljZUlkIDogICAgICAgICAgICBudWxsLCAvLyBEZXZpY2UgaWRlbnRpZmljYXRpb25cbiAgICAgIGRldmljZUhhbmRsZTogICAgICAgICAndCcsICAvLyBEZXZpY2UgaGFuZGxlXG4gICAgICByZXRyeURlbGF5OiAgICAgICAgICAgMjAwMCwgLy8gRGVsYXkgdG8gcmV0cnkgY29ubmVjdGlvbiBpZiBjbGllbnQgaXMgbm90IGNvbm5lY3RlZCB0byBhIGdhdGV3YXlcbiAgICAgIHBhc3N3b3JkOiAgICAgICAgICAgICAnJywgICAvLyBQYXNzd29yZCBmb3IgdGhlIFZOQyBzZXJ2ZXJcbiAgICAgIGNvbm5lY3RPbkluaXQ6ICAgICAgICB0cnVlICAvLyBXaGV0aGVyIG9yIG5vdCBhdHRlbXB0IHJlbW90ZSBhY2Nlc3MgY29ubmVjdGlvbiBhZnRlciBpbml0aWFsaXphdGlvblxuICAgIH0sIHNldHRpbmdzKTtcblxuICAgIC8vIFJGQiBTZXR0aW5nc1xuICAgIHRoaXMuUkZCU2V0dGluZ3MgPSB7XG4gICAgICAndGFyZ2V0JzogICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy50YXJnZXQsXG4gICAgICAnZW5jcnlwdCc6ICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnByb3RvY29sID09PSBcImh0dHBzOlwiLFxuICAgICAgJ3JlcGVhdGVySUQnOiAgICAgICAgICcnLFxuICAgICAgJ3RydWVfY29sb3InOiAgICAgICAgIHRydWUsXG4gICAgICAnbG9jYWxfY3Vyc29yJzogICAgICAgdHJ1ZSxcbiAgICAgICdzaGFyZWQnOiAgICAgICAgICAgICB0cnVlLFxuICAgICAgJ3ZpZXdfb25seSc6ICAgICAgICAgIGZhbHNlLFxuICAgICAgJ29uUGFzc3dvcmRSZXF1aXJlZCc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MucGFzc3dvcmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgJ29uVXBkYXRlU3RhdGUnOiAgICAgIGZ1bmN0aW9uKHJmYiwgc3RhdGUsIG9sZHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChDVklPRGlzcGxheS5FVl9VUERBVEVfU1RBVEUsIHN0YXRlLCBvbGRzdGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksXG4gICAgfVxuXG5cbiAgICBpZiAodGhpcy5zZXR0aW5ncy50YXJnZXQgPT0gbnVsbCkgXG4gICAgICB0aHJvdyAnQ1ZJTyBTY3JlZW4gdGFyZ2V0IGVsZW1lbnQgZG9lcyBub3QgZXhpc3QuJztcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5kZXZpY2VJZCA9PSBudWxsKSBcbiAgICAgIHRocm93ICdEZXZpY2UgSUQgaXMgbWlzc2luZy4nO1xuXG5cbiAgICAvLyBSZWdpc3RlciBjYWxsYmFja3NcbiAgICB0aGlzLnJlYWN0b3IgPSBuZXcgUmVhY3RvcigpO1xuICAgIHRoaXMucmVhY3Rvci5hZGRFdmVudExpc3RlbmVyKENWSU9EaXNwbGF5LkVWX0FUVFJTX0xPQUQsIHRoaXMub25SYUF0dHJzTG9hZCwgdGhpcyk7XG5cbiAgICAvLyBSZWdpc3RlciBDVklPIGV2ZW50IGxpc3RlbmVyc1xuICAgIENWSU8ucmVhY3Rvci5hZGRFdmVudExpc3RlbmVyKENWSU8uRVZfU0VUX0FVVEhfVE9LRU4sIGZ1bmN0aW9uKCkge1xuICAgICAgLy8gQ29udGludWUgd2l0aCBjb25uZWN0aW5nXG4gICAgICBpZiAodGhpcy5jb25uZWN0aW5nKVxuICAgICAgICB0aGlzLmNvbm5lY3QoKTtcbiAgICB9LCB0aGlzKTtcblxuICB9O1xuXG5cblxuICAvLyBFdmVudHNcbiAgQ1ZJT0Rpc3BsYXkuRVZfVVBEQVRFX1NUQVRFID0gJ3JhVXBkYXRlU3RhdGUnO1xuICBDVklPRGlzcGxheS5FVl9BVFRSU19MT0FEID0gJ3JhQXR0cnNMb2FkJztcblxuXG5cbiAgLyoqXG4gICAqIEVuYWJsZSByZWdpc3RlcmluZyBldmVudCBjYWxsYmFja3NcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZSAtIGV2ZW50IG5hbWVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IGNhbGxiYWNrU2VsZiAtIHRoZSB0aGlzIGZvciB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICovXG4gIENWSU9EaXNwbGF5LnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNhbGxiYWNrLCBjYWxsYmFja1NlbGYpIHtcbiAgICB0aGlzLnJlYWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrLCBjYWxsYmFja1NlbGYpO1xuICB9XG5cblxuICAvKipcbiAgICogRmV0Y2hlcyBSQSBhdHRyaWJ1dGVzIGZyb20gdGhlIFNlYUNhdCBQYW5lbFxuICAgKiBGaXJlcyAncmFBdHRyc0xvYWQnIGV2ZW50IHdoZW4gYXR0cmlidXRlcyBhcmUgbG9hZGVkXG4gICAqIEZpcmVzICdyYUF0dHJzRXJyb3InIGV2ZW50IHdoZW4gYXR0cmlidXRlcyBjb3VsZG4ndCBiZSBsb2FkZWRcbiAgICpcbiAgICovXG4gIENWSU9EaXNwbGF5LnByb3RvdHlwZS5yYUZldGNoQXR0cnMgPSBmdW5jdGlvbiAob25TdWNjZXNzLCBvbkFjY2Vzc0RlbmllZCwgb25FcnJvcilcbiAge1xuICAgIHZhciB1cmwgPSAnJ1xuICAgIHVybCArPSBDVklPLnNldHRpbmdzLnVybCsnL2FwaS9yYS9lbmRwb2ludCc7XG4gICAgdXJsICs9ICc/Jyt0aGlzLnNldHRpbmdzLmRldmljZUhhbmRsZSsnPScrdGhpcy5zZXR0aW5ncy5kZXZpY2VJZFxuXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtU0MtQXV0aFRva2VuJywgQ1ZJTy5zZXR0aW5ncy5hdXRoVG9rZW4pO1xuXG4gICAgaWYgKG9uRXJyb3IgIT0gdW5kZWZpbmVkKVxuICAgICAgeGhyLm9uZXJyb3IgPSBvbkVycm9yO1xuXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKVxuICAgICAgICBvblN1Y2Nlc3MoSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpKTtcbiAgICAgIGVsc2UgaWYgKHhoci5zdGF0dXMgPT0gNDAzKVxuICAgICAgICBvbkFjY2Vzc0RlbmllZCgpO1xuICAgICAgZWxzZVxuICAgICAgICBvbkVycm9yKCk7XG4gICAgfTtcbiAgICB4aHIuc2VuZCgnbG9hZCcpO1xuICB9XG5cblxuICAvKipcbiAgICogUmVxdWVzdHMgUkEgYXR0cmlidXRlc1xuICAgKlxuICAgKiBJZiBSQSBhdHRyaWJ1dGVzIGFyZSBub3QgcHJlc2VudCBhdHRlbXB0cyB0byBmZXRjaCB0aGVtLlxuICAgKiBJZiBSQSBhdHRyaWJ1dGVzIGNhbid0IGJlIGRvd25sb2FkZWQgZHVlIHRvIG1pc3Npbmcgb3IgaW52YWxpZCBhdXRoIHRva2VuLCByZXF1ZXN0cyBhdXRoIHRva2VuIGZyb20gQ1ZJT1xuICAgKlxuICAgKi9cbiAgQ1ZJT0Rpc3BsYXkucHJvdG90eXBlLnJlcXVlc3RSYUF0dHJzID0gZnVuY3Rpb24oKVxuICB7XG4gICAgLy8gUmVxdWVzdCBhdXRoIHRva2VuIGlmIG5lZWRlZFxuICAgIGlmIChDVklPLnNldHRpbmdzLmF1dGhUb2tlbiA9PSBudWxsKSB7XG4gICAgICBDVklPLnJlcXVlc3RBdXRoVG9rZW4oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5yYUZldGNoQXR0cnMoXG4gICAgICBmdW5jdGlvbiBzdWNjZXNzKHJhQXR0cnMpIHtcbiAgICAgICAgc2VsZi5yYUF0dHJzID0gcmFBdHRycztcblxuICAgICAgICAvLyBDb250aW51ZSB3aXRoIGNvbm5lY3RpbmdcbiAgICAgICAgaWYgKHNlbGYuY29ubmVjdGluZylcbiAgICAgICAgICBzZWxmLmNvbm5lY3QoKTtcbiAgICAgIH0sXG4gICAgICBmdW5jdGlvbiBhY2Nlc3NEZW5pZWQoKSB7XG4gICAgICAgIENWSU8ucmVxdWVzdEF1dGhUb2tlbigpO1xuICAgICAgfSxcbiAgICAgIGZ1bmN0aW9uIGVycm9yKCkge1xuICAgICAgICB0aHJvdyAnQ2FuXFwndCBmZXRjaCBSQSBhdHRyaWJ1dGVzLidcbiAgICAgIH0pXG4gIH1cblxuXG4gIC8qKlxuICAgKiBDb25uZWN0cyB0byB0aGUgd2Vic29ja2V0IHByb3h5XG4gICAqXG4gICAqL1xuICBDVklPRGlzcGxheS5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNvbm5lY3RpbmcgPSB0cnVlO1xuXG4gICAgLy8gUmVxdWVzdCBSQSBhdHRyaWJ1dGVzIGlmIG5vdCBwcmVzZW50XG4gICAgaWYgKHRoaXMucmFBdHRycyA9PSBudWxsKSB7XG4gICAgICB0aGlzLnJlcXVlc3RSYUF0dHJzKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVHJ5IHRvIGluaXRpYWxpemUgUkZCXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucmZiID0gbmV3IG5vVk5DLlJGQih0aGlzLlJGQlNldHRpbmdzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudCgnaW5pdEVycm9yJywgZSk7XG4gICAgfVxuXG4gICAgdmFyIHByb3RvY29sID0gJ3dzOi8vJztcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PSAnaHR0cHM6JyB8fCB0aGlzLnJhQXR0cnMubGluay5zc2xvbmx5ID09PSB0cnVlKVxuICAgICAgICAgIHByb3RvY29sID0gJ3dzczovLyc7XG5cbiAgICB2YXIgdXJsID0gJyc7XG4gICAgXG4gICAgdXJsICs9IHByb3RvY29sO1xuICAgIHVybCArPSB0aGlzLnJhQXR0cnMubGluay53c19ob3N0ICsgJzonICsgdGhpcy5yYUF0dHJzLmxpbmsud3NfcG9ydDtcbiAgICB1cmwgKz0gJy8nK3RoaXMucmFBdHRycy5saW5rLmNsaWVudF9pZCsnLycrdGhpcy5yYUF0dHJzLmxpbmsuZ3dfaXA7XG4gICAgdXJsICs9ICc/Y3Zpb19ub25jZT0nK3RoaXMucmFBdHRycy5saW5rLm5vbmNlO1xuXG4gICAgdGhpcy5yZmIuY29ubmVjdCh1cmwsICcnKTtcbiAgICB0aGlzLmNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIGZyb20gUkFcbiAgICovXG4gIENWSU9EaXNwbGF5LnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY29ubmVjdGluZyA9IGZhbHNlO1xuICAgIHRoaXMucmZiLmRpc2Nvbm5lY3QoKTtcbiAgfVxuXG5cblxuICB3aW5kb3cuQ1ZJTyA9IENWSU87XG4gIHdpbmRvdy5DVklPRGlzcGxheSA9IENWSU9EaXNwbGF5O1xuICBpZiAod2luZG93LmN2aW9Bc3luY0luaXQgIT09IHVuZGVmaW5lZClcbiAgICB3aW5kb3cuY3Zpb0FzeW5jSW5pdCgpXG5cbn0pKHdpbmRvdywgdW5kZWZpbmVkKTtcbiIsIi8qIENvcHlyaWdodCAyMDE3IE1pbG9zbGF2IFBhdmVsa2FcbkxpY2Vuc2VkIHVuZGVyIEJTRC0zLUNsYXVzZVxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuMy4gTmVpdGhlciB0aGUgbmFtZSBvZiB0aGUgY29weXJpZ2h0IGhvbGRlciBub3IgdGhlIG5hbWVzIG9mIGl0cyBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuKi9cblxuXG4vKipcbiAqIENhbGxiYWNrIGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRTZWxmIC0gdGhlIGRlZmF1bHQgdGhpcyBmb3IgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gKi9cbnZhciBDYWxsYmFjayA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBjYWxsYmFja1NlbGYpIHtcbiAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICB0aGlzLnNlbGYgPSBjYWxsYmFja1NlbGY7XG5cbiAgaWYgKHRoaXMuc2VsZiA9PSB1bmRlZmluZWQpXG4gICAgdGhpcy5zZWxmID0gbnVsbDtcbn1cblxuLyoqXG4gKiBDYWxscyB0aGUgY2FsbGJhY2tcbiAqIFRoaXMgbWV0aG9kJ3Mgcmd1bWVudHMgYXJlIHBhc3NlZCB0byB0aGUgY2FsbGJhY2tcbiAqL1xuQ2FsbGJhY2sucHJvdG90eXBlLmV4ZWN1dGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jYWxsYmFjay5hcHBseSh0aGlzLnNlbGYsIGFyZ3VtZW50cyk7XG59XG5cbi8qKlxuICogRXZlbnQgY2xhc3NcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gZXZlbnQgbmFtZVxuICovXG52YXIgRXZlbnQgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMuY2FsbGJhY2tzID0gW11cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBjYWxsYmFja3NcbiAqL1xuRXZlbnQucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2FsbGJhY2tzID0gW11cbn1cblxuLyoqXG4gKiBSZWFjdG9yIGNsYXNzXG4gKi9cbnZhciBSZWFjdG9yID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZXZlbnRzID0ge307XG59XG5cbi8qKlxuICogUmVnaXN0ZXIgYSBjYWxsYmFjayBmb3IgYW4gZXZlbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgLSBldmVudCBuYW1lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IGNhbGxiYWNrU2VsZiAtIHRoZSB0aGlzIGZvciB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAqL1xuUmVhY3Rvci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgY2FsbGJhY2ssIGNhbGxiYWNrU2VsZikge1xuICAvLyBQdXNoIGV2ZW50IG5hbWUgaWYgbm90IGV4aXN0cyB5ZXRcbiAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPT0gdW5kZWZpbmVkKVxuICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBuZXcgRXZlbnQoZXZlbnROYW1lKVxuXG4gIC8vIFJlZ2lzdGVyIGNhbGxiYWNrXG4gIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uY2FsbGJhY2tzLnB1c2gobmV3IENhbGxiYWNrKGNhbGxiYWNrLCBjYWxsYmFja1NlbGYpKTtcbn1cblxuLyoqXG4gKiBBc3luY2hyb25vdXNseSBleGVjdXRlcyBhbGwgY2FsbGJhY2tzIG9mIGFuIGV2ZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lIC0gZXZlbnQgbmFtZVxuICovXG5SZWFjdG9yLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24oZXZlbnROYW1lKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICBcbiAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPT0gdW5kZWZpbmVkKSB7XG4gICAgLy90aHJvdyBcIk5vIGNhbGxiYWNrcyBmb3IgZXZlbnQgXCIrZXZlbnROYW1lO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZvciAoeCBpbiB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmNhbGxiYWNrcykge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHNlbGYuZXZlbnRzW2V2ZW50TmFtZV0uY2FsbGJhY2tzW3hdLmV4ZWN1dGUuYXBwbHkoc2VsZi5ldmVudHNbZXZlbnROYW1lXS5jYWxsYmFja3NbeF0sIGFyZ3MpO1xuICAgIH0sIDApO1xuICB9XG59XG5cbi8qKlxuICogUmVzZXRzIGNhbGxiYWNrcyBhcnJheSBmb3IgYW4gZXZlbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgLSBldmVudCBuYW1lXG4gKi9cblJlYWN0b3IucHJvdG90eXBlLnJlc2V0RXZlbnQgPSBmdW5jdGlvbihldmVudE5hbWUpIHtcbiAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pXG4gICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5yZXNldCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0b3I7XG4iXX0=
