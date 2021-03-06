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
      clientHandle :        null, // Device identification, e. g. {'t' : '[CLIENT_TAG]'} for client tag
      clientTag:            null,
      clientId:             null,
      customId:             null,
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

    if (this.settings.clientHandle != null) {
    } else if (this.settings.clientId != null) {
      this.settings.clientHandle = {
        'i' : this.settings.clientId
      }
    } else if (this.settings.clientTag != null) {
      this.settings.clientHandle = {
        't' : this.settings.clientTag
      }
    } else if (this.settings.customId != null) {
      this.settings.clientHandle = {
        'u' : this.settings.customId
      }
    }

    // Assert mandatory settings
    if (this.settings.target == null) 
      throw 'CVIO Screen target element does not exist.';
    if (this.settings.clientHandle == null) 
      throw 'Device identification (clientId|clientTag|customId) is missing.';

    if (typeof this.settings.clientHandle !== 'object')
      throw 'clientHandle must be an object like {\'t\': \'[CLIENT_TAG]\'}'
    if (Object.keys(this.settings.clientHandle).length == 0)
      throw 'clientHandle must contain a key-value pair.'

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
    var key=Object.keys(this.settings.clientHandle)[0]
    
    url += CVIO.settings.url+'/api/ra/endpoint';
    url += '?'+key+'='+this.settings.clientHandle[key]

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
