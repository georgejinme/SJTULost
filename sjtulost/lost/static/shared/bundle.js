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

	var UserActions = __webpack_require__(1);
	var UserInfoStore = __webpack_require__(6);

	var Homepage = __webpack_require__(14);
	var Finding = __webpack_require__(16);
	var Found = __webpack_require__(18);
	var Rank = __webpack_require__(19);
	var FindingView = __webpack_require__(20);
	var FoundView = __webpack_require__(21);
	var Me = __webpack_require__(22);

	var Navigation = React.createClass({displayName: "Navigation",
	    getInitialState: function() {
	        return {
	            userInfo: UserInfoStore.getUserInfo()
	        }
	    },

	    componentDidMount: function() {
	        UserInfoStore.addChangeListener(this._onChange);
	        UserActions.fetchData();
	    },

	    componentWillUnmount: function() {
	        UserInfoStore.removeChangeListener(this._onChange);
	    },

	    _onChange: function () {
	        this.setState({
	            userInfo: UserInfoStore.getUserInfo()
	        });
	    },

	    getUrl: function() {
	        if (this.state.userInfo['student_number'] == '') return '/loginwithjaccount/';
	        else return '/me/';
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
	                                React.createElement("a", {href: "/finding/"}, "丢失")
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement("a", {href: "/found/"}, "拾物")
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement("a", {href: "/rank/"}, "排行")
	                            )
	                        ), 
	                        React.createElement("ul", {className: "nav navbar-nav navbar-right"}, 
	                            React.createElement("li", null, React.createElement("a", {href: "#"}, "发布")), 
	                            React.createElement("li", null, React.createElement("a", {href: this.getUrl()},  this.state.userInfo['name'] ))
	                        )
	                    )
	                )
	            )
	        )
	    }
	});

	var App = React.createClass({displayName: "App",
	    url: window.location.href.split('/')[3],
	    id: window.location.href.split('/')[4],

	    render: function() {
	        if (this.url == '') {
	            return (
	                React.createElement("div", {className: "container"}, 
	                    React.createElement(Navigation, null), 
	                    React.createElement(Homepage, null)
	                )
	            )
	        } else if (this.url == 'finding'){
	            return (
	                React.createElement("div", {className: "container"}, 
	                    React.createElement(Navigation, null), 
	                    React.createElement(Finding, null)
	                )
	            )
	        } else if (this.url == 'found') {
	            return (
	                React.createElement("div", {className: "container"}, 
	                    React.createElement(Navigation, null), 
	                    React.createElement(Found, null)
	                )
	            )
	        } else if (this.url == 'rank') {
	            return (
	                React.createElement("div", {className: "container"}, 
	                    React.createElement(Navigation, null), 
	                    React.createElement(Rank, null)
	                )
	            )
	        } else if (this.url == 'findingview') {
	            return (
	                React.createElement("div", {className: "container"}, 
	                    React.createElement(Navigation, null), 
	                    React.createElement(FindingView, {
	                        id: this.id}
	                    )
	                )
	            )
	        } else if (this.url == 'foundview') {
	            return (
	                React.createElement("div", {className: "container"}, 
	                    React.createElement(Navigation, null), 
	                    React.createElement(FoundView, {
	                        id: this.id}
	                    )
	                )
	            )
	        } else if (this.url == 'me') {
	            return (
	                React.createElement("div", {className: "meContainer"}, 
	                    React.createElement(Navigation, null), 
	                    React.createElement(Me, null)
	                )
	            )
	        }
	    }
	});

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

	var UserActions = {
	    fetchData: function fetchData() {
	        $.get('/getuserinfo/', function (data) {
	            AppDispatcher.dispatch({
	                actionType: 'USER_INFO_INITIALIZATION',
	                userInfo: data
	            });
	        });
	    },
	    updateData: function updateData(data) {
	        $.post('/updateuserinfo/', {
	            phone: data['phone'],
	            student_number: data['student_number']
	        }, function (rdata) {
	            AppDispatcher.dispatch({
	                actionType: 'USER_INFO_UPDATE',
	                result: rdata['success']
	            });
	        });
	    },

	    fetchUserFindings: function fetchUserFindings() {
	        $.get('/getuserfindings/', function (data) {
	            AppDispatcher.dispatch({
	                actionType: 'USER_FINDING_INITIALIZATION',
	                findingArray: data
	            });
	        });
	    },

	    fetchUserFounds: function fetchUserFounds() {
	        $.get('/getuserfounds/', function (data) {
	            AppDispatcher.dispatch({
	                actionType: 'USER_FOUND_INITIALIZATION',
	                foundArray: data
	            });
	        });
	    }
	};

	module.exports = UserActions;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Dispatcher = __webpack_require__(3).Dispatcher;
	var AppDispatcher = new Dispatcher();

	var UserInfoStore = __webpack_require__(6);
	var FindingStore = __webpack_require__(9);
	var FoundStore = __webpack_require__(10);
	var ItemStore = __webpack_require__(11);
	var PlaceStore = __webpack_require__(12);
	var RankStore = __webpack_require__(13);

	AppDispatcher.register(function (action) {
	    switch (action.actionType) {
	        case 'USER_INFO_UPDATE':
	            UserInfoStore.setUpdateResult(action.result);
	            UserInfoStore.emitUpdateResult();
	            break;

	        case 'USER_INFO_INITIALIZATION':
	            UserInfoStore.setUserInfo(action.userInfo);
	            UserInfoStore.emitChange();
	            break;

	        case 'USER_FINDING_INITIALIZATION':
	        case 'FINDING_INITIALIZATION':
	        case 'FINDING_UPDATE':
	        case 'FINDING_VIEWING':
	            FindingStore.setFindings(action.findingArray);
	            FindingStore.emitChange();
	            break;

	        case 'USER_FOUND_INITIALIZATION':
	        case 'FOUND_INITIALIZATION':
	        case 'FOUND_UPDATE':
	        case 'FOUND_VIEWING':
	            FoundStore.setFounds(action.foundArray);
	            FoundStore.emitChange();
	            break;

	        case 'ITEM_TYPE_INITIALIZATION':
	            ItemStore.setItems(action.itemTypes);
	            ItemStore.emitChange();
	            break;

	        case 'PLACE_INITIALIZATION':
	            PlaceStore.setPlaces(action.places);
	            PlaceStore.emitChange();
	            break;

	        case 'ITEM_TYPE_SELECT':
	            ItemStore.selectItem(action.id);
	            ItemStore.emitSelect();
	            break;

	        case 'PLACE_SELECT':
	            PlaceStore.selectPlace(action.id);
	            PlaceStore.emitSelect();
	            break;

	        case 'RANK_INITIALIZATION':
	            RankStore.setRanks(action.ranks);
	            RankStore.emitChange();
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

	    /*
	        {
	            name:
	            phone:
	            student_number:
	        }
	     */

	    userInfo: {},
	    // this property indicated the result of updating of user information
	    updateResult: 0,

	    getUserInfo: function getUserInfo() {
	        return this.userInfo;
	    },

	    getUpdateResult: function getUpdateResult() {
	        return this.updateResult;
	    },

	    setUserPhone: function setUserPhone(phone) {
	        this.userInfo['phone'] = phone;
	    },

	    setUserStudentNumber: function setUserStudentNumber(sn) {
	        this.userInfo['student_number'] = sn;
	    },

	    setUserInfo: function setUserInfo(json) {
	        this.userInfo = json;
	    },

	    setUpdateResult: function setUpdateResult(re) {
	        this.updateResult = re;
	    },

	    emitChange: function emitChange() {
	        this.emit('change');
	    },

	    emitUpdateResult: function emitUpdateResult() {
	        this.emit('update');
	    },

	    addUpdateListener: function addUpdateListener(callback) {
	        this.on('update', callback);
	    },

	    removeUpdateListener: function removeUpdateListener(callback) {
	        this.removeListener('update', callback);
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
	        id:
	        description: string
	        img: string
	        item_type:
	        user_phone: string
	        time:
	        place:
	        place_detail:
	        detail:
	        pay:
	        state:
	     }
	     */

	    findings: [],

	    getDefaultFinding: function getDefaultFinding() {
	        return {
	            id: 0,
	            description: '',
	            img: '',
	            item_type: '',
	            user_phone: '',
	            time: '0000/00/00 00:00:00',
	            place: '',
	            place_detail: '',
	            detail: '',
	            pay: 0,
	            state: 0
	        };
	    },

	    getFindingsWithAmount: function getFindingsWithAmount() {
	        var amount = arguments.length <= 0 || arguments[0] === undefined ? this.findings.count : arguments[0];

	        return this.findings.slice(0, amount);
	    },

	    setFindings: function setFindings(array) {
	        this.findings = array;
	    },

	    getFirstFinding: function getFirstFinding() {
	        if (this.findings.length == 0) return this.getDefaultFinding();else return this.findings[0];
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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gougoumemeda on 16/4/25.
	 */

	'use strict';

	var EventEmitter = __webpack_require__(7).EventEmitter;
	var assign = __webpack_require__(8);

	var FoundStore = assign({}, EventEmitter.prototype, {

	    /*
	     Each finding format:
	     {
	         id:
	         description: string
	         img: string
	         item_type:
	         user_phone: string
	         time:
	         place:
	         place_detail:
	         detail:
	         state:
	     }
	     */

	    founds: [],

	    getDefaultFound: function getDefaultFound() {
	        return {
	            id: 0,
	            description: '',
	            img: '',
	            item_type: '',
	            user_phone: '',
	            time: '0000/00/00 00:00:00',
	            place: '',
	            place_detail: '',
	            detail: '',
	            state: 0
	        };
	    },

	    getFoundsWithAmount: function getFoundsWithAmount() {
	        var amount = arguments.length <= 0 || arguments[0] === undefined ? this.founds.count : arguments[0];

	        return this.founds.slice(0, amount);
	    },

	    setFounds: function setFounds(array) {
	        this.founds = array;
	    },

	    getFirstFound: function getFirstFound() {
	        if (this.founds.length == 0) return this.getDefaultFound();else return this.founds[0];
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

	module.exports = FoundStore;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gougoumemeda on 16/4/25.
	 */

	'use strict';

	var EventEmitter = __webpack_require__(7).EventEmitter;
	var assign = __webpack_require__(8);

	var ItemStore = assign({}, EventEmitter.prototype, {
	    /*
	      Each item format:
	      {
	        id:
	        description:
	      }
	       selectedItems: [Bool]
	     */

	    items: [],
	    selectedItems: [],

	    selectItem: function selectItem(index) {
	        if (this.selectedItems[0] == true) {
	            if (index != 0) {
	                this.selectedItems[0] = false;
	                this.selectedItems[index] = true;
	            }
	        } else {
	            if (index != 0) {
	                if (this.countSelectedItems() > 1 || this.selectedItems[index] == false) {
	                    this.selectedItems[index] = !this.selectedItems[index];
	                }
	            } else {
	                this.clearSelectedItems();
	            }
	        }
	    },

	    clearSelectedItems: function clearSelectedItems() {
	        this.selectedItems = [];
	        for (var i = 0; i < this.items.length; ++i) {
	            this.selectedItems.push(false);
	        }
	        this.selectedItems[0] = true;
	    },

	    countSelectedItems: function countSelectedItems() {
	        var count = 0;
	        for (var i = 0; i < this.selectedItems.length; ++i) {
	            if (this.selectedItems[i] == true) ++count;
	        }
	        return count;
	    },

	    getItems: function getItems() {
	        return this.items;
	    },

	    setItems: function setItems(array) {
	        this.items = array;
	        this.items.unshift({
	            'id': 0,
	            'description': '全部'
	        });
	        this.clearSelectedItems();
	    },

	    getSelectedItems: function getSelectedItems() {
	        return this.selectedItems;
	    },

	    getSelectedItemsId: function getSelectedItemsId() {
	        var ids = [];
	        var all = false;
	        if (this.selectedItems[0]) {
	            all = true;
	        }
	        for (var i = 1; i < this.items.length; ++i) {
	            if (all || this.selectedItems[i]) ids.push(this.items[i]['id']);
	        }
	        return ids;
	    },

	    emitChange: function emitChange() {
	        this.emit('change');
	    },

	    emitSelect: function emitSelect() {
	        this.emit('select');
	    },

	    addChangeListener: function addChangeListener(callback) {
	        this.on('change', callback);
	    },

	    addSelectListener: function addSelectListener(callback) {
	        this.on('select', callback);
	    },

	    removeChangeListener: function removeChangeListener(callback) {
	        this.removeListener('change', callback);
	    },

	    removeSelectListener: function removeSelectListener(callback) {
	        this.removeListener('select', callback);
	    }

	});

	module.exports = ItemStore;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gougoumemeda on 16/4/25.
	 */

	'use strict';

	var EventEmitter = __webpack_require__(7).EventEmitter;
	var assign = __webpack_require__(8);

	var PlaceStore = assign({}, EventEmitter.prototype, {
	    /*
	    Each place format:
	    {
	        id:
	        description:
	    }
	     selectedPlaces: [Bool]
	     */

	    places: [],
	    selectedPlaces: [],

	    selectPlace: function selectPlace(index) {
	        if (this.selectedPlaces[0] == true) {
	            if (index != 0) {
	                this.selectedPlaces[0] = false;
	                this.selectedPlaces[index] = true;
	            }
	        } else {
	            if (index != 0) {
	                if (this.countSelectedPlaces() > 1 || this.selectedPlaces[index] == false) {
	                    this.selectedPlaces[index] = !this.selectedPlaces[index];
	                }
	            } else {
	                this.clearSelectedPlaces();
	            }
	        }
	    },

	    clearSelectedPlaces: function clearSelectedPlaces() {
	        this.selectedPlaces = [];
	        for (var i = 0; i < this.places.length; ++i) {
	            this.selectedPlaces.push(false);
	        }
	        this.selectedPlaces[0] = true;
	    },

	    countSelectedPlaces: function countSelectedPlaces() {
	        var count = 0;
	        for (var i = 0; i < this.selectedPlaces.length; ++i) {
	            if (this.selectedPlaces[i] == true) ++count;
	        }
	        return count;
	    },

	    getPlaces: function getPlaces() {
	        return this.places;
	    },

	    setPlaces: function setPlaces(array) {
	        this.places = array;
	        this.places.unshift({
	            'id': 0,
	            'description': '全部'
	        });
	        this.clearSelectedPlaces();
	    },

	    getSelectedPlaces: function getSelectedPlaces() {
	        return this.selectedPlaces;
	    },

	    getSelectedPlacesId: function getSelectedPlacesId() {
	        var ids = [];
	        var all = false;
	        if (this.selectedPlaces[0]) {
	            all = true;
	        }
	        for (var i = 1; i < this.places.length; ++i) {
	            if (all || this.selectedPlaces[i]) ids.push(this.places[i]['id']);
	        }
	        return ids;
	    },

	    emitChange: function emitChange() {
	        this.emit('change');
	    },

	    emitSelect: function emitSelect() {
	        this.emit('select');
	    },

	    addChangeListener: function addChangeListener(callback) {
	        this.on('change', callback);
	    },

	    addSelectListener: function addSelectListener(callback) {
	        this.on('select', callback);
	    },

	    removeChangeListener: function removeChangeListener(callback) {
	        this.removeListener('change', callback);
	    },

	    removeSelectListener: function removeSelectListener(callback) {
	        this.removeListener('select', callback);
	    }

	});

	module.exports = PlaceStore;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gougoumemeda on 16/5/4.
	 */

	'use strict';

	var EventEmitter = __webpack_require__(7).EventEmitter;
	var assign = __webpack_require__(8);
	var RankStore = assign({}, EventEmitter.prototype, {
	    /*
	        each rank:
	        {
	            name:
	            student_id:
	            times:
	        }
	     */
	    ranks: [],

	    getRanks: function getRanks() {
	        return this.ranks;
	    },

	    setRanks: function setRanks(array) {
	        this.ranks = array;
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

	module.exports = RankStore;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var FindingAction = __webpack_require__(15).FindingAction;
	var FoundAction = __webpack_require__(15).FoundAction;
	var FindingStore = __webpack_require__(9);
	var FoundStore = __webpack_require__(10);


	var HomepageItems = React.createClass({displayName: "HomepageItems",
	    badgeColor: function() {
	        if (this.props.json['state'] == 0) return 'label-danger label homepageItemState';
	        else return 'label-success label homepageItemState';
	    },

	    badgeText: function() {
	        if (this.props.json['state'] == 0) return 'Uncompleted';
	        else return 'Completed'
	    },

	    render: function() {
	        return (
	            React.createElement("div", {className: "homepageItem"}, 
	                React.createElement("a", {href: '/' + this.props.url + '/' + this.props.json['id'], target: "_blank"}, 
	                    React.createElement("span", {className: this.badgeColor()}, this.badgeText()), 
	                    React.createElement("img", {src: this.props.json['img'], className: "img-rounded homepageItemImage"}), 
	                    React.createElement("div", {className: "homepageItemDetail"}, 
	                        React.createElement("p", {className: "homepageItemDetailTitle"}, this.props.json['description']), 
	                        React.createElement("p", {className: "homepageItemDetailInfo"}, "遗失时间: ", this.props.json['time']), 
	                        React.createElement("p", {className: "homepageItemDetailInfo"}, "遗失地点: ", this.props.json['place'])
	                    )
	                )
	            )
	        )
	    }
	});

	var HomepageRow = React.createClass({displayName: "HomepageRow",
	    render: function() {
	        var url = this.props.url;
	        return (
	            React.createElement("div", {className: "row"}, 
	                
	                this.props.data.map(function(val, index){
	                    return (
	                        React.createElement("div", {className: "col-lg-3 col-md-3 col-sm-3"}, 
	                            React.createElement(HomepageItems, {
	                                json: val, 
	                                url: url}
	                            )
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
	            React.createElement("div", null, 
	                React.createElement("h1", null,  this.props.title, " "), 
	                React.createElement("hr", null), 
	                React.createElement(HomepageRow, {
	                    data: this.props.data, 
	                    url: this.props.url}
	                )
	            )
	        )
	    }
	});



	var HomePage = React.createClass({displayName: "HomePage",
	    getInitialState: function() {
	        return {
	            findings: FindingStore.getFindingsWithAmount(4),
	            founds: FoundStore.getFoundsWithAmount(4)
	        }
	    },


	    componentDidMount: function() {
	        FindingStore.addChangeListener(this._onFindingChange);
	        FoundStore.addChangeListener(this._onFoundChange);
	        FindingAction.fetchData();
	        FoundAction.fetchData();
	    },

	    componentWillUnmount: function() {
	        FindingStore.removeChangeListener(this._onFindingChange);
	        FoundStore.removeChangeListener(this._onFoundChange);
	    },

	    _onFindingChange: function () {
	        this.setState({
	            findings: FindingStore.getFindingsWithAmount(4)
	        });
	    },

	    _onFoundChange: function() {
	        this.setState({
	            founds: FoundStore.getFoundsWithAmount(4)
	        });
	    },

	    render: function() {
	        return (
	            React.createElement("div", {className: "homepageContent"}, 
	                React.createElement(HomepageSection, {
	                    title: "最新丢失", 
	                    data: this.state.findings, 
	                    url: "findingview"}
	                ), 
	                React.createElement("br", null), 
	                React.createElement("br", null), 
	                React.createElement("br", null), 
	                React.createElement(HomepageSection, {
	                    title: "最新拾遗", 
	                    data: this.state.founds, 
	                    url: "foundview"}
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gougoumemeda on 16/4/25.
	 */

	'use strict';

	var AppDispatcher = __webpack_require__(2);

	var FindingAction = {
	    fetchData: function fetchData() {
	        $.get('/getfindings/', function (data) {
	            AppDispatcher.dispatch({
	                actionType: 'FINDING_INITIALIZATION',
	                findingArray: data
	            });
	        });
	    },

	    fetchDataWithFilter: function fetchDataWithFilter(item, place) {
	        $.post('/getfindingswithfilter/', {
	            'item': item,
	            'place': place
	        }, function (data) {
	            AppDispatcher.dispatch({
	                actionType: 'FINDING_UPDATE',
	                findingArray: data
	            });
	        });
	    },

	    fetchDataWithId: function fetchDataWithId(id) {
	        $.post('/getfindingswithid/', {
	            'id': id
	        }, function (data) {
	            AppDispatcher.dispatch({
	                actionType: 'FINDING_VIEWING',
	                findingArray: data
	            });
	        });
	    }
	};

	var FoundAction = {
	    fetchData: function fetchData() {
	        $.get('/getfounds/', function (data) {
	            AppDispatcher.dispatch({
	                actionType: 'FOUND_INITIALIZATION',
	                foundArray: data
	            });
	        });
	    },
	    fetchDataWithFilter: function fetchDataWithFilter(item, place) {
	        $.post('/getfoundswithfilter/', {
	            'item': item,
	            'place': place
	        }, function (data) {
	            AppDispatcher.dispatch({
	                actionType: 'FOUND_UPDATE',
	                foundArray: data
	            });
	        });
	    },

	    fetchDataWithId: function fetchDataWithId(id) {
	        $.post('/getfoundswithid/', {
	            'id': id
	        }, function (data) {
	            AppDispatcher.dispatch({
	                actionType: 'FOUND_VIEWING',
	                foundArray: data
	            });
	        });
	    }
	};

	var ItemTypeAction = {
	    fetchData: function fetchData() {
	        $.get('/getitems/', function (data) {
	            AppDispatcher.dispatch({
	                actionType: 'ITEM_TYPE_INITIALIZATION',
	                itemTypes: data
	            });
	        });
	    },
	    select: function select(id) {
	        AppDispatcher.dispatch({
	            actionType: 'ITEM_TYPE_SELECT',
	            id: id
	        });
	    }
	};

	var PlaceAction = {
	    fetchData: function fetchData() {
	        $.get('/getplaces/', function (data) {
	            AppDispatcher.dispatch({
	                actionType: 'PLACE_INITIALIZATION',
	                places: data
	            });
	        });
	    },
	    select: function select(id) {
	        AppDispatcher.dispatch({
	            actionType: 'PLACE_SELECT',
	            id: id
	        });
	    }
	};

	var RankAction = {
	    fetchData: function fetchData() {
	        $.get('/getrank/', function (data) {
	            AppDispatcher.dispatch({
	                actionType: 'RANK_INITIALIZATION',
	                ranks: data
	            });
	        });
	    }
	};

	module.exports = {
	    FindingAction: FindingAction,
	    FoundAction: FoundAction,
	    ItemTypeAction: ItemTypeAction,
	    PlaceAction: PlaceAction,
	    RankAction: RankAction
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var ItemTypeAction = __webpack_require__(15).ItemTypeAction;
	var PlaceAction = __webpack_require__(15).PlaceAction;
	var FindingAction = __webpack_require__(15).FindingAction;

	var ItemStore = __webpack_require__(11);
	var PlaceStore = __webpack_require__(12);
	var FindingStore = __webpack_require__(9);

	var idOperation = __webpack_require__(17);

	var FindingTypeRow = React.createClass({displayName: "FindingTypeRow",
	    getSelectedClass: function(index) {
	        if (this.props.selectedData[index] == true) return 'active';
	        else return '';
	    },

	    render: function() {
	        var handler = this.props.handler;
	        var classes = this.getSelectedClass;
	        return (
	            React.createElement("div", {className: "row"}, 
	                React.createElement("p", {className: "col-lg-2 col-md-2 col-sm-2 findingTypeLabel"},  this.props.typeName), 
	                React.createElement("ul", {className: "nav nav-pills col-lg-10 col-md-10 col-sm-10 findingTypeNav"}, 
	                    
	                        this.props.data.map(function(val, index){
	                            return (
	                                React.createElement("li", {className: classes(index)}, 
	                                    React.createElement("a", {id: idOperation.encodeId('type', index), 
	                                       href: "javascript:void(0);", 
	                                       onClick: handler}, val['description']
	                                    )
	                                )
	                            )
	                        })
	                    
	                )
	            )
	        )
	    }
	});

	var FindingType = React.createClass({displayName: "FindingType",
	    render: function() {
	        return (
	            React.createElement("div", {className: "findingType"}, 
	                React.createElement(FindingTypeRow, {
	                    typeName: "物品类别", 
	                    data: this.props.itemTypes, 
	                    selectedData: this.props.selectedItemTypes, 
	                    handler: this.props.selectItemTypeHandler}
	                ), 
	                React.createElement(FindingTypeRow, {
	                    typeName: "地点", 
	                    data: this.props.places, 
	                    selectedData: this.props.selectedPlaces, 
	                    handler: this.props.selectPlaceHandler}
	                )
	            )
	        )
	    }
	});

	var FindingItem = React.createClass({displayName: "FindingItem",
	    badgeColor: function() {
	        if (this.props.json['state'] == 0) return 'label-danger label';
	        else return 'label-success label';
	    },

	    badgeText: function() {
	        if (this.props.json['state'] == 0) return 'Uncompleted';
	        else return 'Completed'
	    },
	    render: function() {
	        return (
	            React.createElement("div", {className: "row findingItem"}, 
	                React.createElement("div", {className: "col-lg-3 col-md-3 col-sm-3 findingItemImage"}, 
	                    React.createElement("img", {src: this.props.json['img'], className: "img-rounded"})
	                ), 
	                React.createElement("div", {className: "col-lg-9 col-md-9 col-sm-9 findingItemDetail"}, 
	                    React.createElement("a", {href: '/findingview/' + this.props.json['id'], target: "_blank"}, 
	                        React.createElement("p", {className: "findingItemTitle"}, this.props.json['description'])
	                    ), 
	                    React.createElement("span", {className: this.badgeColor()}, this.badgeText()), 
	                    React.createElement("p", {className: "findingItemInfo"}, "物品类别: ", this.props.json['item_type']), 
	                    React.createElement("p", {className: "findingItemInfo"}, "遗失时间: ", this.props.json['time']), 
	                    React.createElement("p", {className: "findingItemInfo"}, "遗失地点: ", this.props.json['place'], ". ", this.props.json['place_detail']), 
	                    React.createElement("p", {className: "findingItemInfo"}, "联系电话: ", this.props.json['user_phone']), 
	                    React.createElement("p", {className: "findingItemInfo findingItemPay"}, "酬金: ", this.props.json['pay'], " 元")
	                )
	            )
	        )
	    }
	});

	var FindingSection = React.createClass({displayName: "FindingSection",
	    render: function() {
	        return (
	            React.createElement("div", {className: "findingSection"}, 
	                
	                    this.props.data.map(function(val, index) {
	                        return (
	                            React.createElement("div", null, 
	                                React.createElement(FindingItem, {
	                                    json: val}
	                                ), 
	                                React.createElement("hr", null)
	                            )
	                        )
	                    })
	                
	            )
	        )
	    }
	});

	var Finding = React.createClass({displayName: "Finding",
	    getInitialState: function() {
	        return {
	            itemTypes: ItemStore.getItems(),
	            places: PlaceStore.getPlaces(),
	            findings: FindingStore.getFindingsWithAmount(),
	            selectedItemTypes: ItemStore.getSelectedItems(),
	            selectedPlaces: PlaceStore.getSelectedPlaces()
	        }
	    },

	    componentDidMount: function() {
	        ItemStore.addChangeListener(this._onItemChange);
	        PlaceStore.addChangeListener(this._onPlaceChange);
	        FindingStore.addChangeListener(this._onFindingChange);
	        ItemStore.addSelectListener(this._onItemSelectChange);
	        PlaceStore.addSelectListener(this._onPlaceSelectChange);
	        ItemTypeAction.fetchData();
	        PlaceAction.fetchData();
	        FindingAction.fetchData();
	    },

	    componentWillUnmount: function() {
	        ItemStore.removeChangeListener(this._onItemChange);
	        PlaceStore.removeChangeListener(this._onPlaceChange);
	        FindingStore.removeChangeListener(this._onFindingChange);
	        ItemStore.removeSelectListener(this._onItemSelectChange);
	        PlaceStore.removeSelectListener(this._onItemSelectChange)
	    },

	    _onItemChange: function () {
	        this.setState({
	            itemTypes: ItemStore.getItems(),
	            selectedItemTypes: ItemStore.getSelectedItems()
	        });
	    },

	    _onPlaceChange: function() {
	        this.setState({
	            places: PlaceStore.getPlaces(),
	            selectedPlaces: PlaceStore.getSelectedPlaces()
	        });
	    },

	    _onItemSelectChange: function() {
	        this.setState({
	            selectedItemTypes: ItemStore.getSelectedItems()
	        });
	        FindingAction.fetchDataWithFilter(ItemStore.getSelectedItemsId(), PlaceStore.getSelectedPlacesId())
	    },

	    _onPlaceSelectChange: function() {
	        this.setState({
	            selectedPlaces: PlaceStore.getSelectedPlaces()
	        });
	        FindingAction.fetchDataWithFilter(ItemStore.getSelectedItemsId(), PlaceStore.getSelectedPlacesId())
	    },

	    _onFindingChange: function() {
	        this.setState({
	            findings: FindingStore.getFindingsWithAmount()
	        })
	    },

	    selectItemTypeHandler: function(event) {
	        ItemTypeAction.select(idOperation.decodeId(event.target.id));
	    },

	    selectPlaceHandler: function(event) {
	        PlaceAction.select(idOperation.decodeId(event.target.id));
	    },

	    render: function() {
	        return (
	            React.createElement("div", {className: "findingContent"}, 
	                React.createElement(FindingType, {
	                    itemTypes: this.state.itemTypes, 
	                    places: this.state.places, 
	                    selectedItemTypes: this.state.selectedItemTypes, 
	                    selectedPlaces: this.state.selectedPlaces, 
	                    selectItemTypeHandler: this.selectItemTypeHandler, 
	                    selectPlaceHandler: this.selectPlaceHandler}
	                ), 
	                React.createElement("hr", null), 
	                React.createElement(FindingSection, {
	                    data: this.state.findings}
	                )
	            )
	        )
	    }
	});

	module.exports = Finding;

/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * Created by gougoumemeda on 16/4/26.
	 */

	'use strict';

	var idOperation = {
	    encodeId: function encodeId(type, id) {
	        return type + '|' + id;
	    },

	    decodeId: function decodeId(str) {
	        return str.split('|')[1];
	    }
	};

	module.exports = idOperation;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var ItemTypeAction = __webpack_require__(15).ItemTypeAction;
	var PlaceAction = __webpack_require__(15).PlaceAction;
	var FoundAction = __webpack_require__(15).FoundAction;

	var ItemStore = __webpack_require__(11);
	var PlaceStore = __webpack_require__(12);
	var FoundStore = __webpack_require__(10);

	var idOperation = __webpack_require__(17);

	var FoundTypeRow = React.createClass({displayName: "FoundTypeRow",
	    getSelectedClass: function(index) {
	        if (this.props.selectedData[index] == true) return 'active';
	        else return '';
	    },

	    render: function() {
	        var handler = this.props.handler;
	        var classes = this.getSelectedClass;
	        return (
	            React.createElement("div", {className: "row"}, 
	                React.createElement("p", {className: "col-lg-2 col-md-2 col-sm-2 foundTypeLabel"},  this.props.typeName), 
	                React.createElement("ul", {className: "nav nav-pills col-lg-10 col-md-10 col-sm-10 foundTypeNav"}, 
	                    
	                        this.props.data.map(function(val, index){
	                            return (
	                                React.createElement("li", {className: classes(index)}, 
	                                    React.createElement("a", {id: idOperation.encodeId('type', index), 
	                                       href: "javascript:void(0);", 
	                                       onClick: handler}, val['description']
	                                    )
	                                )
	                            )
	                        })
	                    
	                )
	            )
	        )
	    }
	});

	var FoundType = React.createClass({displayName: "FoundType",
	    render: function() {
	        return (
	            React.createElement("div", {className: "foundType"}, 
	                React.createElement(FoundTypeRow, {
	                    typeName: "物品类别", 
	                    data: this.props.itemTypes, 
	                    selectedData: this.props.selectedItemTypes, 
	                    handler: this.props.selectItemTypeHandler}
	                ), 
	                React.createElement(FoundTypeRow, {
	                    typeName: "地点", 
	                    data: this.props.places, 
	                    selectedData: this.props.selectedPlaces, 
	                    handler: this.props.selectPlaceHandler}
	                )
	            )
	        )
	    }
	});

	var FoundItem = React.createClass({displayName: "FoundItem",
	    badgeColor: function() {
	        if (this.props.json['state'] == 0) return 'label-danger label';
	        else return 'label-success label';
	    },

	    badgeText: function() {
	        if (this.props.json['state'] == 0) return 'Uncompleted';
	        else return 'Completed'
	    },
	    render: function() {
	        return (
	            React.createElement("div", {className: "row foundItem"}, 
	                React.createElement("div", {className: "col-lg-3 col-md-3 col-sm-3 foundItemImage"}, 
	                    React.createElement("img", {src: this.props.json['img'], className: "img-rounded"})
	                ), 
	                React.createElement("div", {className: "col-lg-9 col-md-9 col-sm-9 foundItemDetail"}, 
	                    React.createElement("a", {href: '/foundview/' + this.props.json['id'], target: "_blank"}, 
	                        React.createElement("p", {className: "foundItemTitle"}, this.props.json['description'])
	                    ), 
	                    React.createElement("span", {className: this.badgeColor()}, this.badgeText()), 
	                    React.createElement("p", {className: "foundItemInfo"}, "物品类别: ", this.props.json['item_type']), 
	                    React.createElement("p", {className: "foundItemInfo"}, "拾物时间: ", this.props.json['time']), 
	                    React.createElement("p", {className: "foundItemInfo"}, "拾物地点: ", this.props.json['place'], ". ", this.props.json['place_detail']), 
	                    React.createElement("p", {className: "foundItemInfo"}, "联系电话: ", this.props.json['user_phone'])
	                )
	            )
	        )
	    }
	});

	var FoundSection = React.createClass({displayName: "FoundSection",
	    render: function() {
	        return (
	            React.createElement("div", {className: "foundSection"}, 
	                
	                    this.props.data.map(function(val, index) {
	                        return (
	                            React.createElement("div", null, 
	                                React.createElement(FoundItem, {
	                                    json: val}
	                                ), 
	                                React.createElement("hr", null)
	                            )
	                        )
	                    })
	                
	            )
	        )
	    }
	});




	var Found = React.createClass({displayName: "Found",
	    getInitialState: function() {
	        return {
	            itemTypes: ItemStore.getItems(),
	            places: PlaceStore.getPlaces(),
	            founds: FoundStore.getFoundsWithAmount(),
	            selectedItemTypes: ItemStore.getSelectedItems(),
	            selectedPlaces: PlaceStore.getSelectedPlaces()
	        }
	    },

	    componentDidMount: function() {
	        ItemStore.addChangeListener(this._onItemChange);
	        PlaceStore.addChangeListener(this._onPlaceChange);
	        FoundStore.addChangeListener(this._onFoundChange);
	        ItemStore.addSelectListener(this._onItemSelectChange);
	        PlaceStore.addSelectListener(this._onPlaceSelectChange);
	        ItemTypeAction.fetchData();
	        PlaceAction.fetchData();
	        FoundAction.fetchData();
	    },

	    componentWillUnmount: function() {
	        ItemStore.removeChangeListener(this._onItemChange);
	        PlaceStore.removeChangeListener(this._onPlaceChange);
	        FoundStore.removeChangeListener(this._onFoundChange);
	        ItemStore.removeSelectListener(this._onItemSelectChange);
	        PlaceStore.removeSelectListener(this._onItemSelectChange)
	    },

	    _onItemChange: function () {
	        this.setState({
	            itemTypes: ItemStore.getItems(),
	            selectedItemTypes: ItemStore.getSelectedItems()
	        });
	    },

	    _onPlaceChange: function() {
	        this.setState({
	            places: PlaceStore.getPlaces(),
	            selectedPlaces: PlaceStore.getSelectedPlaces()
	        });
	    },

	    _onItemSelectChange: function() {
	        this.setState({
	            selectedItemTypes: ItemStore.getSelectedItems()
	        });
	        FoundAction.fetchDataWithFilter(ItemStore.getSelectedItemsId(), PlaceStore.getSelectedPlacesId())
	    },

	    _onPlaceSelectChange: function() {
	        this.setState({
	            selectedPlaces: PlaceStore.getSelectedPlaces()
	        });
	        FoundAction.fetchDataWithFilter(ItemStore.getSelectedItemsId(), PlaceStore.getSelectedPlacesId())
	    },

	    _onFoundChange: function() {
	        this.setState({
	            founds: FoundStore.getFoundsWithAmount()
	        })
	    },

	    selectItemTypeHandler: function(event) {
	        ItemTypeAction.select(idOperation.decodeId(event.target.id));
	    },

	    selectPlaceHandler: function(event) {
	        PlaceAction.select(idOperation.decodeId(event.target.id));
	    },

	    render: function() {
	        return (
	            React.createElement("div", {className: "foundContent"}, 
	                React.createElement(FoundType, {
	                    itemTypes: this.state.itemTypes, 
	                    places: this.state.places, 
	                    selectedItemTypes: this.state.selectedItemTypes, 
	                    selectedPlaces: this.state.selectedPlaces, 
	                    selectItemTypeHandler: this.selectItemTypeHandler, 
	                    selectPlaceHandler: this.selectPlaceHandler}
	                ), 
	                React.createElement("hr", null), 
	                React.createElement(FoundSection, {
	                    data: this.state.founds}
	                )
	            )
	        )
	    }
	});

	module.exports = Found;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	
	var RankAction = __webpack_require__(15).RankAction;
	var RankStore = __webpack_require__(13);

	var RankBody = React.createClass({displayName: "RankBody",
	    getRankClass: function(index) {
	        if (index == 1) return "label label-success";
	        else if (index <= 3) return "label label-primary";
	        else if (index <= 10) return "label label-warning";
	        else return "label label-default"
	    },

	    render: function() {
	        var getRankClass = this.getRankClass;
	        return (
	            React.createElement("tbody", {className: "rankBody"}, 
	            
	                this.props.data.map(function(val, index) {
	                    return (
	                        React.createElement("tr", null, 
	                            React.createElement("td", null, React.createElement("span", {className: getRankClass(index + 1)}, index + 1)), 
	                            React.createElement("td", null, val['name']), 
	                            React.createElement("td", null, val['student_id']), 
	                            React.createElement("td", null, val['times'])
	                        )
	                    )
	                })
	            
	            )
	        )
	    }
	});

	var RankHeader = React.createClass({displayName: "RankHeader",
	    render: function() {
	        return (
	            React.createElement("thead", null, 
	                React.createElement("tr", null, 
	                    React.createElement("td", null, "排行"), 
	                    React.createElement("td", null, "姓名"), 
	                    React.createElement("td", null, "学号"), 
	                    React.createElement("td", null, "拾物次数")
	                )
	            )
	        )
	    }
	});

	var RankTable = React.createClass({displayName: "RankTable",
	    render: function() {
	        return (
	            React.createElement("div", {className: "rankTable"}, 
	                React.createElement("table", {className: "table table-striped table-hover "}, 
	                    React.createElement(RankHeader, null), 
	                    React.createElement(RankBody, {
	                        data: this.props.ranks}
	                    )
	                )
	            )
	        )
	    }
	});


	var Rank = React.createClass({displayName: "Rank",
	    getInitialState: function() {
	        return {
	            ranks: RankStore.getRanks()
	        }
	    },

	    componentDidMount: function() {
	        RankAction.fetchData();
	        RankStore.addChangeListener(this._onRanksChange)
	    },

	    componentWillUnmount: function() {
	        RankStore.removeChangeListener(this._onRanksChange)
	    },

	    _onRanksChange: function() {
	        this.setState({
	            ranks: RankStore.getRanks()
	        })
	    },

	    render: function(){
	        return (
	            React.createElement("div", {className: "rankContent"}, 
	                React.createElement(RankTable, {
	                    ranks: this.state.ranks}
	                )
	            )
	        )
	    }
	});

	module.exports = Rank;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var FindingAction = __webpack_require__(15).FindingAction;
	var FindingStore = __webpack_require__(9);

	var FindingViewBody = React.createClass({displayName: "FindingViewBody",
	    render: function() {
	        return (
	            React.createElement("div", {className: "findingViewBody"}, 
	                React.createElement("p", {className: "findingViewBodyTitle"}, this.props.json['description']), 
	                React.createElement("div", {className: "findingViewBodyImage"}, 
	                    React.createElement("img", {src: this.props.json['img']})
	                ), 
	                React.createElement("hr", null), 
	                React.createElement("p", null, this.props.json['detail'])
	            )
	        )
	    }
	});

	var FindingViewHeader = React.createClass({displayName: "FindingViewHeader",
	    badgeColor: function() {
	        if (this.props.json['state'] == 0) return 'label-danger label';
	        else return 'label-success label';
	    },

	    badgeText: function() {
	        if (this.props.json['state'] == 0) return 'Uncompleted';
	        else return 'Completed'
	    },

	    render: function() {
	        return(
	            React.createElement("div", {className: "findingViewHeader"}, 
	                React.createElement("span", {className: this.badgeColor()}, this.badgeText()), 
	                React.createElement("p", null, "物品类别: ", this.props.json['item_type']), 
	                React.createElement("p", null, "遗失时间: ", this.props.json['time']), 
	                React.createElement("p", null, "遗失地点: ", this.props.json['place']), 
	                React.createElement("p", null, "详细位置: ", this.props.json['place_detail']), 
	                React.createElement("p", null, "联系电话: ", this.props.json['user_phone']), 
	                React.createElement("p", null, "酬金: ", this.props.json['pay'], " 元")
	            )

	        )
	    }
	});

	var FindingView = React.createClass({displayName: "FindingView",
	    getInitialState: function() {
	        return {
	            finding: FindingStore.getFirstFinding()
	        }
	    },

	    componentDidMount: function() {
	        FindingStore.addChangeListener(this._onFindingChange);
	        FindingAction.fetchDataWithId(this.props.id)
	    },

	    componentWillUnmount: function() {
	        FindingStore.removeChangeListener(this._onFindingChange);
	    },

	    _onFindingChange: function() {
	        this.setState({
	            finding: FindingStore.getFirstFinding()
	        })
	    },

	    render: function() {
	        return (
	            React.createElement("div", {className: "findingViewContent"}, 
	                React.createElement("div", {className: "row"}, 
	                    React.createElement("div", {className: "col-lg-8 col-md-8 col-sm-8"}, 
	                        React.createElement(FindingViewBody, {
	                            json: this.state.finding}
	                        )
	                    ), 
	                    React.createElement("div", {className: "col-lg-4 col-md-4 col-sm-4"}, 
	                        React.createElement(FindingViewHeader, {
	                            json: this.state.finding}
	                        )
	                    )
	                )
	            )
	        )
	    }
	});

	module.exports = FindingView;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var FoundAction = __webpack_require__(15).FoundAction;
	var FoundStore = __webpack_require__(10);

	var FoundViewBody = React.createClass({displayName: "FoundViewBody",
	    render: function() {
	        return (
	            React.createElement("div", {className: "foundViewBody"}, 
	                React.createElement("p", {className: "foundViewBodyTitle"}, this.props.json['description']), 
	                React.createElement("div", {className: "foundViewBodyImage"}, 
	                    React.createElement("img", {src: this.props.json['img']})
	                ), 
	                React.createElement("hr", null), 
	                React.createElement("p", null, this.props.json['detail'])
	            )
	        )
	    }
	});

	var FoundViewHeader = React.createClass({displayName: "FoundViewHeader",
	    badgeColor: function() {
	        if (this.props.json['state'] == 0) return 'label-danger label';
	        else return 'label-success label';
	    },

	    badgeText: function() {
	        if (this.props.json['state'] == 0) return 'Uncompleted';
	        else return 'Completed'
	    },

	    render: function() {
	        return(
	            React.createElement("div", {className: "foundViewHeader"}, 
	                React.createElement("span", {className: this.badgeColor()}, this.badgeText()), 
	                React.createElement("p", null, "物品类别: ", this.props.json['item_type']), 
	                React.createElement("p", null, "拾物时间: ", this.props.json['time']), 
	                React.createElement("p", null, "拾物地点: ", this.props.json['place']), 
	                React.createElement("p", null, "详细位置: ", this.props.json['place_detail']), 
	                React.createElement("p", null, "联系电话: ", this.props.json['user_phone'])
	            )

	        )
	    }
	});

	var FoundView = React.createClass({displayName: "FoundView",
	    getInitialState: function() {
	        return {
	            found: FoundStore.getFirstFound()
	        }
	    },

	    componentDidMount: function() {
	        FoundStore.addChangeListener(this._onFoundChange);
	        FoundAction.fetchDataWithId(this.props.id)
	    },

	    componentWillUnmount: function() {
	        FoundStore.removeChangeListener(this._onFoundChange);
	    },

	    _onFoundChange: function() {
	        this.setState({
	            found: FoundStore.getFirstFound()
	        })
	    },

	    render: function() {
	        return (
	            React.createElement("div", {className: "foundViewContent"}, 
	                React.createElement("div", {className: "row"}, 
	                    React.createElement("div", {className: "col-lg-8 col-md-8 col-sm-8"}, 
	                        React.createElement(FoundViewBody, {
	                            json: this.state.found}
	                        )
	                    ), 
	                    React.createElement("div", {className: "col-lg-4 col-md-4 col-sm-4"}, 
	                        React.createElement(FoundViewHeader, {
	                            json: this.state.found}
	                        )
	                    )
	                )
	            )
	        )
	    }
	});

	module.exports = FoundView;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var idOperation = __webpack_require__(17);

	var UserActions = __webpack_require__(1);
	var UserInfoStore = __webpack_require__(6);

	var FindingStore = __webpack_require__(9);
	var FoundStore = __webpack_require__(10);


	var MeInformation = React.createClass({displayName: "MeInformation",

	    getInitialState: function() {
	        return {
	            userInfo: UserInfoStore.getUserInfo(),
	            updateResult: UserInfoStore.getUpdateResult(),
	            updating: false
	        }
	    },

	    componentDidMount: function() {
	        UserInfoStore.addChangeListener(this._onChange);
	        UserInfoStore.addUpdateListener(this._onUpdate);
	        UserActions.fetchData();
	    },

	    componentWillUnmount: function() {
	        UserInfoStore.removeChangeListener(this._onChange);
	        UserInfoStore.removeUpdateListener(this._onUpdate);
	    },

	    _onChange: function () {
	        this.setState({
	            userInfo: UserInfoStore.getUserInfo()
	        });
	    },

	    _onUpdate: function() {
	        this.setState({
	            updateResult: UserInfoStore.getUpdateResult(),
	            updating: true
	        });
	        var that = this;
	        setTimeout(function(){
	            that.setState({
	                updating: false
	            })}, 2100
	        )
	    },

	    phoneChange: function(ev) {
	        UserInfoStore.setUserPhone(ev.target.value);
	        UserInfoStore.emitChange()
	    },

	    studentNumberChange: function(ev) {
	        UserInfoStore.setUserStudentNumber(ev.target.value);
	        UserInfoStore.emitChange()
	    },

	    updateUserInfo: function() {
	        UserActions.updateData(this.state.userInfo)
	    },

	    getAlertText: function() {
	        if (this.state.updateResult == 1) return '更新成功';
	        else return '更新失败, 请重新登录'
	    },

	    getAlertClass: function() {
	        var c = 'alert alert-dismissible meInfoAlert';
	        if (this.state.updating) c += ' updating';
	        if (this.state.updateResult == 1) c += ' alert-success';
	        else c += ' alert-danger';
	        return c
	    },

	    render: function() {
	        return (
	            React.createElement("div", {className: "meInfo"}, 
	                React.createElement("div", {className: this.getAlertClass()}, 
	                    React.createElement("p", null, this.getAlertText())
	                ), 
	                React.createElement("h1", null, this.state.userInfo['name']), 
	                React.createElement("hr", null), 
	                React.createElement("div", {className: "form-group"}, 
	                    React.createElement("label", {className: "control-label", htmlFor: "focusedInput"}, "联系方式"), 
	                    React.createElement("input", {className: "form-control", id: "focusedInput1", type: "text", onChange: this.phoneChange, value: this.state.userInfo['phone']})
	                ), 
	                React.createElement("div", {className: "form-group"}, 
	                    React.createElement("label", {className: "control-label", htmlFor: "focusedInput"}, "学号"), 
	                    React.createElement("input", {className: "form-control", id: "focusedInput2", type: "text", onChange: this.studentNumberChange, value: this.state.userInfo['student_number']})
	                ), 
	                React.createElement("a", {href: "#", className: "btn btn-success", onClick: this.updateUserInfo}, "修改完成")
	            )
	        )
	    }
	});

	var MeFindingItem = React.createClass({displayName: "MeFindingItem",
	    badgeColor: function() {
	        if (this.props.json['state'] == 0) return 'label-danger label';
	        else return 'label-success label';
	    },

	    badgeText: function() {
	        if (this.props.json['state'] == 0) return 'Uncompleted';
	        else return 'Completed'
	    },

	    getButtonActive:function() {
	        if (this.props.json['state'] == 0) return 'btn btn-success meFindingBtn';
	        else return 'btn btn-success meFindingBtn disable'
	    },

	    render: function() {
	        return (
	            React.createElement("div", {className: "row meFindingItem"}, 
	                React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-6 meFindingItemImage"}, 
	                    React.createElement("span", {className: this.badgeColor()}, this.badgeText()), 
	                    React.createElement("img", {src: this.props.json['img']})
	                ), 
	                React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-6 meFindingItemDetail"}, 
	                    React.createElement("a", {href: '/findingview/' + this.props.json['id'], target: "_blank"}, 
	                        React.createElement("p", {className: "meFindingItemDetailTitle"}, this.props.json['description'])
	                    ), 
	                    React.createElement("p", {className: "meFindingItemDetailInfo"}, "物品类别: ", this.props.json['item_type']), 
	                    React.createElement("p", {className: "meFindingItemDetailInfo"}, "遗失时间: ", this.props.json['time']), 
	                    React.createElement("p", {className: "meFindingItemDetailInfo"}, "遗失地点: ", this.props.json['place']), 
	                    React.createElement("p", {className: "meFindingItemDetailInfo"}, "详细位置: ", this.props.json['place_detail']), 
	                    React.createElement("p", {className: "meFindingItemDetailInfo"}, "酬金: ", this.props.json['pay'], " 元"), 
	                    React.createElement("a", {href: "#", className: this.getButtonActive()}, "已经找到")
	                )
	            )
	        )
	    }
	});

	var MeFinding = React.createClass({displayName: "MeFinding",
	    getInitialState: function() {
	        return {
	            findings: FindingStore.getFindingsWithAmount()
	        }
	    },


	    componentDidMount: function() {
	        FindingStore.addChangeListener(this._onFindingChange);
	        UserActions.fetchUserFindings();
	    },

	    componentWillUnmount: function() {
	        FindingStore.removeChangeListener(this._onFindingChange);
	    },

	    _onFindingChange: function () {
	        this.setState({
	            findings: FindingStore.getFindingsWithAmount()
	        });
	    },

	    render: function() {
	        return (
	            React.createElement("div", {className: "row meFinding"}, 
	                
	                    this.state.findings.map(function(val, index){
	                        return (
	                            React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-6"}, 
	                                React.createElement(MeFindingItem, {
	                                    json: val}
	                                )
	                            )
	                        )
	                    })
	                
	            )
	        )
	    }
	});

	var MeFoundItem = React.createClass({displayName: "MeFoundItem",
	    badgeColor: function() {
	        if (this.props.json['state'] == 0) return 'label-danger label';
	        else return 'label-success label';
	    },

	    badgeText: function() {
	        if (this.props.json['state'] == 0) return 'Uncompleted';
	        else return 'Completed'
	    },

	    getButtonActive:function() {
	        if (this.props.json['state'] == 0) return 'btn btn-success meFoundBtn';
	        else return 'btn btn-success meFoundBtn disable'
	    },

	    render: function() {
	        return (
	            React.createElement("div", {className: "row meFoundItem"}, 
	                React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-6 meFoundItemImage"}, 
	                    React.createElement("span", {className: this.badgeColor()}, this.badgeText()), 
	                    React.createElement("img", {src: this.props.json['img']})
	                ), 
	                React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-6 meFoundItemDetail"}, 
	                    React.createElement("a", {href: '/foundview/' + this.props.json['id'], target: "_blank"}, 
	                        React.createElement("p", {className: "meFoundItemDetailTitle"}, this.props.json['description'])
	                    ), 
	                    React.createElement("p", {className: "meFoundItemDetailInfo"}, "物品类别: ", this.props.json['item_type']), 
	                    React.createElement("p", {className: "meFoundItemDetailInfo"}, "遗失时间: ", this.props.json['time']), 
	                    React.createElement("p", {className: "meFoundItemDetailInfo"}, "遗失地点: ", this.props.json['place']), 
	                    React.createElement("p", {className: "meFoundItemDetailInfo"}, "详细位置: ", this.props.json['place_detail']), 
	                    React.createElement("a", {href: "#", className: this.getButtonActive()}, "已经归还")
	                )
	            )
	        )
	    }
	});

	var MeFound = React.createClass({displayName: "MeFound",
	    getInitialState: function() {
	        return {
	            founds: FoundStore.getFoundsWithAmount()
	        }
	    },


	    componentDidMount: function() {
	        FoundStore.addChangeListener(this._onFoundChange);
	        UserActions.fetchUserFounds();
	    },

	    componentWillUnmount: function() {
	        FoundStore.removeChangeListener(this._onFoundChange);
	    },

	    _onFoundChange: function () {
	        this.setState({
	            founds: FoundStore.getFoundsWithAmount()
	        });
	    },

	    render: function() {
	        return (
	            React.createElement("div", {className: "row meFound"}, 
	                
	                    this.state.founds.map(function(val, index){
	                        return (
	                            React.createElement("div", {className: "col-lg-6 col-md-6 col-sm-6"}, 
	                                React.createElement(MeFoundItem, {
	                                    json: val}
	                                )
	                            )
	                        )
	                    })
	                
	            )
	        )
	    }
	});



	var MeNavigation = React.createClass({displayName: "MeNavigation",
	    getNavClass: function(selected) {
	        if (selected == this.props.selected) return "active";
	        else return ""
	    },

	    render: function() {
	        return (
	            React.createElement("ul", {className: "nav nav-pills nav-stacked meNav"}, 
	                React.createElement("li", {className: this.getNavClass(0)}, 
	                    React.createElement("a", {href: "#", id: idOperation.encodeId('meNav', 0), onClick: this.props.navClick}, "我的信息")
	                ), 
	                React.createElement("li", {className: this.getNavClass(1)}, 
	                    React.createElement("a", {href: "#", id: idOperation.encodeId('meNav', 1), onClick: this.props.navClick}, "我丢失过")
	                ), 
	                React.createElement("li", {className: this.getNavClass(2)}, 
	                    React.createElement("a", {href: "#", id: idOperation.encodeId('meNav', 2), onClick: this.props.navClick}, "我拾到过")
	                ), 
	                React.createElement("li", {className: this.getNavClass(3)}, 
	                    React.createElement("a", {href: "#", id: idOperation.encodeId('meNav', 3), onClick: this.props.navClick}, "退出登录")
	                )
	            )
	        )
	    }
	});



	var MeDisplay = React.createClass({displayName: "MeDisplay",
	    render: function() {
	        if (this.props.selected == 0) {
	            return (
	                React.createElement("div", null, 
	                    React.createElement(MeInformation, null
	                    )
	                )
	            )
	        } else if (this.props.selected == 1) {
	            return (
	                React.createElement("div", null, 
	                    React.createElement(MeFinding, null)
	                )
	            )
	        } else if (this.props.selected == 2) {
	            return (
	                React.createElement("div", null, 
	                    React.createElement(MeFound, null)
	                )
	            )
	        } else {
	            return (
	                React.createElement("div", null)
	            )
	        }
	    }
	});

	var Me = React.createClass({displayName: "Me",
	    getInitialState: function() {
	        return {
	            selectedNavItem: 0,
	            userInfo: UserInfoStore.getUserInfo()
	        }
	    },

	    meNavClick: function(ev){
	        var id = idOperation.decodeId(ev.target.id);
	        this.setState({
	            selectedNavItem: id
	        })
	    },

	    render: function() {
	        return (
	            React.createElement("div", {className: "meContent row"}, 
	                React.createElement("div", {className: "col-lg-3 col-md-3 col-sm-3"}, 
	                    React.createElement(MeNavigation, {
	                        selected: this.state.selectedNavItem, 
	                        navClick: this.meNavClick}
	                    )
	                ), 
	                React.createElement("div", {className: "col-lg-9 col-md-9 col-sm-9"}, 
	                    React.createElement(MeDisplay, {
	                        selected: this.state.selectedNavItem}
	                    )
	                )
	            )
	        )
	    }
	});

	module.exports = Me;

/***/ }
/******/ ]);