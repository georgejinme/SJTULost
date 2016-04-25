/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gougoumemeda on 16/4/22.
	 */
	var constant = {
	    'dev-prefix': 'http://127.0.0.1:8888'
	};

	var JaccountLoginActions = __webpack_require__(1);
	var UserInfoStore = __webpack_require__(6);

	var Homepage = __webpack_require__(9);
	var Finding = __webpack_require__(10);

	var Navigation = React.createClass({displayName: "Navigation",
	    getInitialState: function() {
	        return {
	            name: UserInfoStore.getUserName()
	        }
	    },

	    componentDidMount: function() {
	        UserInfoStore.addChangeListener(this._onChange);
	    },

	    componentWillUnmount: function() {
	        UserInfoStore.removeChangeListener(this._onChange);
	    },

	    _onChange: function () {
	        this.setState({
	            name: UserInfoStore.getUserName()
	        });
	    },

	    login: function() {
	        JaccountLoginActions.login()
	    },

	    render: function() {
	        return (
	            React.createElement("div", {className: "navbar navbar-default navbar-fixed-top"}, 
	                React.createElement("div", {className: "container"}, 
	                    React.createElement("div", {className: "navbar-header"}, 
	                        React.createElement("a", {href: "/", className: "navbar-brand", target: "_blank"}, "SJTU Lost")
	                    ), 
	                    React.createElement("div", {className: "navbar-collapse collapse", id: "navbar-main"}, 
	                        React.createElement("ul", {className: "nav navbar-nav"}, 
	                            React.createElement("li", null, 
	                                React.createElement("a", {href: "/finding/", target: "_blank"}, "丢失")
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement("a", {href: "#", target: "_blank"}, "拾物")
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement("a", {href: "#", target: "_blank"}, "排行")
	                            )
	                        ), 
	                        React.createElement("ul", {className: "nav navbar-nav navbar-right"}, 
	                            React.createElement("li", null, React.createElement("a", {href: "#", onClick:  this.login},  this.state.name))
	                        )
	                    )
	                )
	            )
	        )
	    }
	})

	var App = React.createClass({displayName: "App",
	    render: function() {
	        if (window.location.href == constant['dev-prefix'] + '/') {
	            return (
	                React.createElement("div", null, 
	                    React.createElement(Navigation, null), 
	                    React.createElement(Homepage, null)
	                )
	            )
	        } else if (window.location.href == constant['dev-prefix'] + '/finding/'){
	            return (
	                React.createElement("div", null, 
	                    React.createElement(Navigation, null), 
	                    React.createElement(Finding, null)
	                )
	            )
	        }
	    }
	})

	React.render(
	    React.createElement(App, null),
	    document.getElementById('content')
	);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gougoumemeda on 16/4/22.
	 */
	'use strict';

	var AppDispatcher = __webpack_require__(2);

	var JaccountLoginActions = {
	    login: function login() {
	        AppDispatcher.dispatch({
	            actionType: 'JACCOUNT_LOGIN',
	            name: "JIN JIAJUN"
	        });
	    }
	};

	module.exports = JaccountLoginActions;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Dispatcher = __webpack_require__(3).Dispatcher;
	var AppDispatcher = new Dispatcher();

	var UserInfoStore = __webpack_require__(6);
	var FindingStore = __webpack_require__(11);

	AppDispatcher.register(function (action) {
	    switch (action.actionType) {
	        case 'JACCOUNT_LOGIN':
	            UserInfoStore.setUserName(action.name);
	            UserInfoStore.emitChange();
	            break;

	        case 'FINDING_INITIALIZATION':
	            FindingStore.setFindings(action.findingArray);
	            FindingStore.emitChange();
	            break;
	        default:
	        // no op
	    }
	});

	module.exports = AppDispatcher;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	module.exports.Dispatcher = __webpack_require__(4)


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * @typechecks
	 */

	"use strict";

	var invariant = __webpack_require__(5);

	var _lastID = 1;
	var _prefix = 'ID_';

	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *
	 *         case 'city-update':
	 *           FlightPriceStore.price =
	 *             FlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */

	  function Dispatcher() {
	    this.$Dispatcher_callbacks = {};
	    this.$Dispatcher_isPending = {};
	    this.$Dispatcher_isHandled = {};
	    this.$Dispatcher_isDispatching = false;
	    this.$Dispatcher_pendingPayload = null;
	  }

	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   *
	   * @param {function} callback
	   * @return {string}
	   */
	  Dispatcher.prototype.register=function(callback) {
	    var id = _prefix + _lastID++;
	    this.$Dispatcher_callbacks[id] = callback;
	    return id;
	  };

	  /**
	   * Removes a callback based on its token.
	   *
	   * @param {string} id
	   */
	  Dispatcher.prototype.unregister=function(id) {
	    invariant(
	      this.$Dispatcher_callbacks[id],
	      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
	      id
	    );
	    delete this.$Dispatcher_callbacks[id];
	  };

	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   *
	   * @param {array<string>} ids
	   */
	  Dispatcher.prototype.waitFor=function(ids) {
	    invariant(
	      this.$Dispatcher_isDispatching,
	      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
	    );
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this.$Dispatcher_isPending[id]) {
	        invariant(
	          this.$Dispatcher_isHandled[id],
	          'Dispatcher.waitFor(...): Circular dependency detected while ' +
	          'waiting for `%s`.',
	          id
	        );
	        continue;
	      }
	      invariant(
	        this.$Dispatcher_callbacks[id],
	        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
	        id
	      );
	      this.$Dispatcher_invokeCallback(id);
	    }
	  };

	  /**
	   * Dispatches a payload to all registered callbacks.
	   *
	   * @param {object} payload
	   */
	  Dispatcher.prototype.dispatch=function(payload) {
	    invariant(
	      !this.$Dispatcher_isDispatching,
	      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
	    );
	    this.$Dispatcher_startDispatching(payload);
	    try {
	      for (var id in this.$Dispatcher_callbacks) {
	        if (this.$Dispatcher_isPending[id]) {
	          continue;
	        }
	        this.$Dispatcher_invokeCallback(id);
	      }
	    } finally {
	      this.$Dispatcher_stopDispatching();
	    }
	  };

	  /**
	   * Is this Dispatcher currently dispatching.
	   *
	   * @return {boolean}
	   */
	  Dispatcher.prototype.isDispatching=function() {
	    return this.$Dispatcher_isDispatching;
	  };

	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @param {string} id
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
	    this.$Dispatcher_isPending[id] = true;
	    this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
	    this.$Dispatcher_isHandled[id] = true;
	  };

	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @param {object} payload
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
	    for (var id in this.$Dispatcher_callbacks) {
	      this.$Dispatcher_isPending[id] = false;
	      this.$Dispatcher_isHandled[id] = false;
	    }
	    this.$Dispatcher_pendingPayload = payload;
	    this.$Dispatcher_isDispatching = true;
	  };

	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
	    this.$Dispatcher_pendingPayload = null;
	    this.$Dispatcher_isDispatching = false;
	  };


	module.exports = Dispatcher;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gougoumemeda on 16/4/22.
	 */
	'use strict';

	var EventEmitter = __webpack_require__(7).EventEmitter;
	var assign = __webpack_require__(8);

	var UserInfoStore = assign({}, EventEmitter.prototype, {
	    name: "使用Jaccount登录",
	    phone: "",
	    studentId: "",
	    recommend_ids: [],

	    getUserName: function getUserName() {
	        return this.name;
	    },

	    setUserName: function setUserName(name) {
	        this.name = name;
	    },

	    getUserPhone: function getUserPhone() {
	        return this.phone;
	    },

	    setUserPhone: function setUserPhone(phone) {
	        this.phone = phone;
	    },

	    getUserStudentId: function getUserStudentId() {
	        return this.studentId;
	    },

	    setUserStudentId: function setUserStudentId(id) {
	        this.studentId = id;
	    },

	    getUserRecommend: function getUserRecommend() {
	        return this.recommend_ids;
	    },

	    setUserRecommend: function setUserRecommend(ids) {
	        this.recommend_ids = ids;
	    },

	    getUserInfo: function getUserInfo() {
	        return {
	            name: this.getUserName(),
	            phone: this.getUserPhone(),
	            student_id: this.getUserStudentId(),
	            recommend_ids: this.getUserRecommend()
	        };
	    },

	    setUserInfo: function setUserInfo(json) {
	        if (json['name']) this.setUserName(json['name']);
	        if (json['phone']) this.setUserPhone(json['phone']);
	        if (json['student_id']) this.setUserStudentId(json['student_id']);
	        if (json['recommend_ids']) this.setUserRecommend(json['recommend_ids']);
	    },

	    emitChange: function emitChange() {
	        this.emit('change');
	    },

	    addChangeListener: function addChangeListener(callback) {
	        this.on('change', callback);
	    },

	    removeChangeListener: function removeChangeListener(callback) {
	        this.removeListener('change', callback);
	    }
	});

	module.exports = UserInfoStore;

/***/ },
/* 7 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	
	var HomepageItems = React.createClass({displayName: "HomepageItems",
	    render: function() {
	        return (
	            React.createElement("div", null, 
	                React.createElement("span", {className: "label label-danger homepageItemState"}, "未找到"), 
	                React.createElement("img", {src: "static/image/qwt.jpg", className: "img-rounded homepageItemImage"}), 
	                React.createElement("div", {className: "homepageItemDetail"}, 
	                    React.createElement("p", {className: "homepageItemDetailTitle"}, "求助!丢失了一个钱包,钱包对我很关键,我知道没福利没人看,先po裸照"), 
	                    React.createElement("p", {className: "homepageItemDetailInfo"}, "遗失时间: 2015/02/04"), 
	                    React.createElement("p", {className: "homepageItemDetailInfo"}, "遗失地点: 东转篮球场"), 
	                    React.createElement("p", {className: "homepageItemDetailInfo"}, "联系电话: 1383838438")
	                )
	            )
	        )
	    }
	});

	var HomepageRow = React.createClass({displayName: "HomepageRow",
	    render: function() {
	        var times = [0, 1, 2, 3];
	        return (
	            React.createElement("div", {className: "row"}, 
	                
	                times.map(function(index, val){
	                    return (
	                        React.createElement("div", {className: "col-lg-3 col-md-3 col-sm-3"}, 
	                            React.createElement(HomepageItems, null)
	                        )
	                    )
	                })
	                
	            )
	        )
	    }
	});

	var HomepageSection = React.createClass({displayName: "HomepageSection",
	    render: function() {
	        return (
	            React.createElement("div", {className: "container"}, 
	                React.createElement("h1", null,  this.props.title, " "), 
	                React.createElement("hr", null), 
	                React.createElement(HomepageRow, null)
	            )
	        )
	    }
	})



	var HomePage = React.createClass({displayName: "HomePage",
	    render: function() {
	        return (
	            React.createElement("div", {className: "homepageContent"}, 
	                React.createElement(HomepageSection, {
	                    title: "最新丢失"}
	                ), 
	                React.createElement("br", null), 
	                React.createElement("br", null), 
	                React.createElement("br", null), 
	                React.createElement(HomepageSection, {
	                    title: "最新拾遗"}
	                ), 
	                React.createElement("br", null), 
	                React.createElement("br", null), 
	                React.createElement("br", null)
	            )
	        )
	    }
	})



	module.exports = HomePage;


/***/ },
/* 10 */
/***/ function(module, exports) {

	var Finding = React.createClass({displayName: "Finding",
	    render: function() {
	        return (
	            React.createElement("div", null, 
	                "44444"
	            )
	        )
	    }
	});

	module.exports = Finding;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gougoumemeda on 16/4/25.
	 */

	'use strict';

	var EventEmitter = __webpack_require__(7).EventEmitter;
	var assign = __webpack_require__(8);

	var FindingStore = assign({}, EventEmitter.prototype, {

	    /*
	     Each finding format:
	     {
	        description: string
	        user_phone: string
	        lost_time:
	        lost_place:
	        state:
	     }
	     */

	    findings: [],

	    getFindings: function getFindings() {
	        return this.findings;
	    },

	    setFindings: function setFindings(array) {
	        this.findings = array;
	    },

	    appendNewFinding: function appendNewFinding(json) {
	        this.findings.append(json);
	    },

	    emitChange: function emitChange() {
	        this.emit('change');
	    },

	    addChangeListener: function addChangeListener(callback) {
	        this.on('change', callback);
	    },

	    removeChangeListener: function removeChangeListener(callback) {
	        this.removeListener('change', callback);
	    }
	});

	module.exports = FindingStore;

/***/ }
/******/ ]);