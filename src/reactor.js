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
