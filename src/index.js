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
