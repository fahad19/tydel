this["Tydel"] =
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ChainableTypes = __webpack_require__(2);

	var ChainableTypes = _interopRequireWildcard(_ChainableTypes);

	var _chainType = __webpack_require__(5);

	var _chainType2 = _interopRequireDefault(_chainType);

	var _createCollection = __webpack_require__(7);

	var _createCollection2 = _interopRequireDefault(_createCollection);

	var _createModel = __webpack_require__(20);

	var _createModel2 = _interopRequireDefault(_createModel);

	var _isCollection = __webpack_require__(22);

	var _isCollection2 = _interopRequireDefault(_isCollection);

	var _isModel = __webpack_require__(10);

	var _isModel2 = _interopRequireDefault(_isModel);

	var _isEvent = __webpack_require__(15);

	var _isEvent2 = _interopRequireDefault(_isEvent);

	var _Event = __webpack_require__(14);

	var _Event2 = _interopRequireDefault(_Event);

	var _Types = __webpack_require__(21);

	var _Types2 = _interopRequireDefault(_Types);

	var _Type = __webpack_require__(3);

	var _Type2 = _interopRequireDefault(_Type);

	var _Method = __webpack_require__(8);

	var _Method2 = _interopRequireDefault(_Method);

	var _Collection = __webpack_require__(9);

	var _Collection2 = _interopRequireDefault(_Collection);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	module.exports = {
	  // Type
	  ChainableTypes: ChainableTypes,
	  chainType: _chainType2.default,
	  Types: _Types2.default,
	  TypeError: _Type2.default,

	  // Collection
	  createCollection: _createCollection2.default,
	  isCollection: _isCollection2.default,
	  CollectionError: _Collection2.default,

	  // Model
	  createModel: _createModel2.default,
	  isModel: _isModel2.default,

	  // Event
	  Event: _Event2.default,
	  isEvent: _isEvent2.default,

	  MethodError: _Method2.default
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.defaults = exports.isRequired = undefined;

	var _Type = __webpack_require__(3);

	var _Type2 = _interopRequireDefault(_Type);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var isRequired = exports.isRequired = {
	  func: function isRequired(value) {
	    if (typeof value === 'undefined') {
	      throw new _Type2.default('value is not defined');
	    }

	    return value;
	  }
	};

	var defaults = exports.defaults = {
	  isFactory: true,
	  func: function defaults(value, defaultValue) {
	    if (value) {
	      return value;
	    }

	    return defaultValue;
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Base = __webpack_require__(4);

	var _Base2 = _interopRequireDefault(_Base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TypeError = function (_BaseError) {
	  _inherits(TypeError, _BaseError);

	  function TypeError() {
	    var _Object$getPrototypeO;

	    _classCallCheck(this, TypeError);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TypeError)).call.apply(_Object$getPrototypeO, [this].concat(args)));

	    _this.name = 'TypeError';
	    return _this;
	  }

	  return TypeError;
	}(_Base2.default);

	exports.default = TypeError;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BaseError = function (_Error) {
	  _inherits(BaseError, _Error);

	  function BaseError(message) {
	    _classCallCheck(this, BaseError);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BaseError).call(this, message));

	    _this.name = _this.constructor.name;
	    _this.message = message;

	    if (typeof Error.captureStackTrace === 'function') {
	      Error.captureStackTrace(_this, _this.constructor);
	    } else {
	      _this.stack = new Error(message).stack;
	    }
	    return _this;
	  }

	  return BaseError;
	}(Error);

	exports.default = BaseError;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = chain;

	var _lodash = __webpack_require__(6);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _Type = __webpack_require__(3);

	var _Type2 = _interopRequireDefault(_Type);

	var _ChainableTypes = __webpack_require__(2);

	var chainables = _interopRequireWildcard(_ChainableTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function chain(fn) {
	  var omitChainables = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	  _lodash2.default.each(chainables, function (chainObj, chainName) {
	    var chainFunc = chainObj.func;
	    var chainIsFactory = chainObj.isFactory === true;

	    if (omitChainables.indexOf(chainName) > -1) {
	      return;
	    }

	    Object.defineProperty(fn, chainName, {
	      get: function get() {
	        if (chainIsFactory) {
	          return function () {
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	              args[_key] = arguments[_key];
	            }

	            return chain(function (value) {
	              var nextValue = chainFunc.apply(undefined, [value].concat(args));

	              return fn(nextValue);
	            });
	          };
	        }

	        return chain(function (value) {
	          var nextValue = value;

	          nextValue = chainFunc(nextValue);
	          nextValue = fn(nextValue);

	          return nextValue;
	        }, omitChainables.concat([chainName]));
	      }
	    });
	  });

	  return fn;
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	(function() { module.exports = this["_"]; }());

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createCollection;

	var _lodash = __webpack_require__(6);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _Method = __webpack_require__(8);

	var _Method2 = _interopRequireDefault(_Method);

	var _Collection = __webpack_require__(9);

	var _Collection2 = _interopRequireDefault(_Collection);

	var _isModel = __webpack_require__(10);

	var _isModel2 = _interopRequireDefault(_isModel);

	var _Collection3 = __webpack_require__(13);

	var _Collection4 = _interopRequireDefault(_Collection3);

	var _Event = __webpack_require__(14);

	var _Event2 = _interopRequireDefault(_Event);

	var _isEvent = __webpack_require__(15);

	var _isEvent2 = _interopRequireDefault(_isEvent);

	var _events = __webpack_require__(16);

	var _events2 = _interopRequireDefault(_events);

	var _bubbleUpEvent = __webpack_require__(17);

	var _bubbleUpEvent2 = _interopRequireDefault(_bubbleUpEvent);

	var _wrapCustomMethod = __webpack_require__(18);

	var _wrapCustomMethod2 = _interopRequireDefault(_wrapCustomMethod);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function createCollection(Model) {
	  var methods = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var Collection = function (_BaseCollection) {
	    _inherits(Collection, _BaseCollection);

	    function Collection() {
	      var givenModels = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	      _classCallCheck(this, Collection);

	      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Collection).call(this, givenModels));

	      var models = [];

	      // others listening to this
	      var listeners = {};

	      (0, _events2.default)(_this, listeners);

	      var bubbleUp = function bubbleUp(model, eventName) {
	        return (0, _bubbleUpEvent2.default)(_this, model, eventName, function (ctx, m) {
	          return [ctx.findIndex(m)];
	        });
	      };

	      Object.defineProperty(_this, 'length', {
	        get: function get() {
	          return models.length;
	        }
	      });

	      _this.at = function (n) {
	        return models[n];
	      };

	      _this.push = function (model) {
	        var _this2 = this;

	        if (!(0, _isModel2.default)(model)) {
	          throw new _Collection2.default('not a valid Model instance is being pushed');
	        }

	        if (!(model instanceof Model)) {
	          throw new _Collection2.default('Model instance is not of the one Collection is expecting');
	        }

	        this.trigger('method:call', new _Event2.default({ path: ['push'] }));

	        var result = models.push(model);
	        var index = result - 1;
	        this.trigger('change', new _Event2.default({ path: [index] }));
	        this.trigger('method:change', new _Event2.default({ path: ['push'] }));

	        var changeWatcher = bubbleUp(model, 'change');
	        var methodCallWatcher = bubbleUp(model, 'method:call');
	        var methodChangeWatcher = bubbleUp(model, 'method:change');

	        model.on('destroy', function () {
	          _this2.remove(model);
	          changeWatcher();
	          methodCallWatcher();
	          methodChangeWatcher();
	        });

	        model.on('remove', function () {
	          _this2.trigger('change');
	          changeWatcher();
	          methodCallWatcher();
	          methodChangeWatcher();
	        });

	        return result;
	      };

	      // native array methods
	      ['every', 'filter', 'find', 'forEach', 'includes', 'indexOf', 'map', 'reduce', 'some'].forEach(function (readOnlyMethod) {
	        _this[readOnlyMethod] = function (fn) {
	          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	          }

	          return models[readOnlyMethod].apply(models, [fn.bind(this)].concat(args));
	        };
	      });

	      // lodash methods
	      ['difference', 'findIndex', 'first', 'last', 'nth', 'take', 'takeRight'].forEach(function (lodashMethod) {
	        _this[lodashMethod] = function () {
	          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            args[_key2] = arguments[_key2];
	          }

	          return _lodash2.default[lodashMethod].apply(_lodash2.default, [models].concat(args));
	        };
	      });

	      _this.pop = function () {
	        this.trigger('method:call', new _Event2.default({ path: ['pop'] }));
	        var model = models.pop();

	        this.trigger('change');
	        this.trigger('method:change', new _Event2.default({ path: ['pop'] }));

	        model.trigger('remove');

	        return model;
	      };

	      _this.shift = function () {
	        this.trigger('method:call', new _Event2.default({ path: ['shift'] }));
	        var model = models.shift();

	        this.trigger('change');
	        this.trigger('method:change', new _Event2.default({ path: ['shift'] }));

	        model.trigger('remove');

	        return model;
	      };

	      _this.unshift = function (model) {
	        var _this3 = this;

	        if (!(0, _isModel2.default)(model)) {
	          throw new _Collection2.default('not a valid Model instance is being pushed');
	        }

	        if (!(model instanceof Model)) {
	          throw new _Collection2.default('Model instance is not of the one Collection is expecting');
	        }

	        this.trigger('method:call', new _Event2.default({ path: ['unshift'] }));
	        var result = models.unshift(model);

	        this.trigger('change', new _Event2.default({ path: [0] }));
	        this.trigger('method:change', new _Event2.default({ path: ['unshift'] }));

	        var changeWatcher = bubbleUp(model, 'change');
	        var methodCallWatcher = bubbleUp(model, 'method:call');
	        var methodChangeWatcher = bubbleUp(model, 'method:change');

	        model.on('destroy', function () {
	          _this3.remove(model);
	          _this3.trigger('change');

	          changeWatcher();
	          methodCallWatcher();
	          methodChangeWatcher();
	        });

	        return result;
	      };

	      _this.remove = function (model) {
	        var index = this.findIndex(model);

	        this.removeFrom(index);
	      };

	      _this.removeFrom = function (index) {
	        var model = models[index];

	        if (!model) {
	          return;
	        }

	        this.trigger('method:call', new _Event2.default({ path: ['removeFrom'] }));
	        models.splice(index, 1);
	        model.destroy();
	        this.trigger('change');
	        this.trigger('method:change', new _Event2.default({ path: ['removeFrom'] }));
	      };

	      _this.destroy = function () {
	        this.trigger('method:call', new _Event2.default({ path: ['destroy'] }));
	        models.forEach(function (model) {
	          model.destroy();
	        });

	        this.trigger('destroy');
	        this.trigger('method:change', new _Event2.default({ path: ['destroy'] }));
	        this.off();
	      };

	      _this.toJS = function () {
	        return models.map(function (model) {
	          return model.toJS();
	        });
	      };

	      // methods
	      _lodash2.default.each(methods, function (methodFunc, methodName) {
	        if (typeof _this[methodName] !== 'undefined') {
	          throw new _Method2.default('conflicting method name: ' + methodName);
	        }

	        _this[methodName] = (0, _wrapCustomMethod2.default)(_this, methodName, methodFunc);
	      });

	      // initialize
	      givenModels.forEach(function (v) {
	        if ((0, _isModel2.default)(v)) {
	          _this.push(v);

	          return;
	        }

	        var model = new Model(v);
	        _this.push(model);
	      });
	      return _this;
	    }

	    return Collection;
	  }(_Collection4.default);

	  return Collection;
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Base = __webpack_require__(4);

	var _Base2 = _interopRequireDefault(_Base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MethodError = function (_BaseError) {
	  _inherits(MethodError, _BaseError);

	  function MethodError() {
	    var _Object$getPrototypeO;

	    _classCallCheck(this, MethodError);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(MethodError)).call.apply(_Object$getPrototypeO, [this].concat(args)));

	    _this.name = 'MethodError';
	    return _this;
	  }

	  return MethodError;
	}(_Base2.default);

	exports.default = MethodError;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Base = __webpack_require__(4);

	var _Base2 = _interopRequireDefault(_Base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CollectionError = function (_BaseError) {
	  _inherits(CollectionError, _BaseError);

	  function CollectionError() {
	    var _Object$getPrototypeO;

	    _classCallCheck(this, CollectionError);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(CollectionError)).call.apply(_Object$getPrototypeO, [this].concat(args)));

	    _this.name = 'CollectionError';
	    return _this;
	  }

	  return CollectionError;
	}(_Base2.default);

	exports.default = CollectionError;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isModel;

	var _Model = __webpack_require__(11);

	var _Model2 = _interopRequireDefault(_Model);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isModel(model) {
	  try {
	    return model instanceof _Model2.default;
	  } catch (e) {
	    return false;
	  }
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Base2 = __webpack_require__(12);

	var _Base3 = _interopRequireDefault(_Base2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = function (_Base) {
	  _inherits(Model, _Base);

	  function Model() {
	    _classCallCheck(this, Model);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Model).apply(this, arguments));
	  }

	  return Model;
	}(_Base3.default);

	exports.default = Model;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Base = function Base() {
	  _classCallCheck(this, Base);
	};

	exports.default = Base;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Base2 = __webpack_require__(12);

	var _Base3 = _interopRequireDefault(_Base2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Collection = function (_Base) {
	  _inherits(Collection, _Base);

	  function Collection() {
	    _classCallCheck(this, Collection);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Collection).apply(this, arguments));
	  }

	  return Collection;
	}(_Base3.default);

	exports.default = Collection;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Base2 = __webpack_require__(12);

	var _Base3 = _interopRequireDefault(_Base2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Event = function (_Base) {
	  _inherits(Event, _Base);

	  function Event(_ref) {
	    var _ref$path = _ref.path;
	    var path = _ref$path === undefined ? [] : _ref$path;

	    _classCallCheck(this, Event);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Event).call(this));

	    _this.path = path;
	    return _this;
	  }

	  return Event;
	}(_Base3.default);

	exports.default = Event;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isEvent;

	var _Event = __webpack_require__(14);

	var _Event2 = _interopRequireDefault(_Event);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isEvent(event) {
	  try {
	    return event instanceof _Event2.default;
	  } catch (e) {
	    return false;
	  }
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = events;
	function events(context) {
	  var listeners = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  Object.defineProperty(context, 'on', {
	    value: function value(event, fn) {
	      if (typeof listeners[event] === 'undefined') {
	        listeners[event] = [];
	      }

	      listeners[event].push(fn);

	      return function cancelListener() {
	        return context.off(event, fn);
	      };
	    }
	  });

	  Object.defineProperty(context, 'trigger', {
	    value: function value(event) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      if (typeof listeners[event] === 'undefined') {
	        return;
	      }

	      return listeners[event].forEach(function (listener) {
	        listener.apply(undefined, args);
	      });
	    }
	  });

	  Object.defineProperty(context, 'off', {
	    value: function value() {
	      var event = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	      var fn = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	      if (!event) {
	        listeners = {}; // eslint-disable-line

	        return;
	      }

	      if (!fn) {
	        listeners[event] = [];

	        return;
	      }

	      if (typeof listeners[event] === 'undefined') {
	        return;
	      }

	      listeners[event].forEach(function (listener, index) {
	        if (listener === fn) {
	          listeners[event].splice(index, 1);
	        }
	      });
	    }
	  });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = bubbleUpEvent;

	var _isEvent = __webpack_require__(15);

	var _isEvent2 = _interopRequireDefault(_isEvent);

	var _Event = __webpack_require__(14);

	var _Event2 = _interopRequireDefault(_Event);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function bubbleUpEvent(context, mc, eventName) {
	  var prefix = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];

	  return mc.on(eventName, function (event) {
	    var p = typeof prefix === 'function' ? prefix(context, mc) : prefix;

	    context.trigger(eventName, new _Event2.default({
	      path: (0, _isEvent2.default)(event) ? p.concat(event.path) : p
	    }));
	  });
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = wrapCustomMethod;

	var _Event = __webpack_require__(14);

	var _Event2 = _interopRequireDefault(_Event);

	var _isPromise = __webpack_require__(19);

	var _isPromise2 = _interopRequireDefault(_isPromise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function wrapCustomMethod(context, methodName, func) {
	  return function () {
	    context.trigger('method:call', new _Event2.default({ path: [methodName] }));

	    var changed = false;
	    var watcher = context.on('change', function () {
	      changed = true;
	    });

	    var result = func.bind(context).apply(undefined, arguments);

	    // sync
	    if (!(0, _isPromise2.default)(result)) {
	      watcher();

	      if (changed) {
	        context.trigger('method:change', new _Event2.default({
	          path: [methodName]
	        }));
	      }

	      return result;
	    }

	    // async
	    return result.then(function (promiseResult) {
	      watcher();

	      if (changed) {
	        context.trigger('method', new _Event2.default({
	          path: [methodName]
	        }));
	      }

	      return promiseResult;
	    });
	  };
	}

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = isPromise;
	function isPromise(promise) {
	  if ((typeof promise === 'undefined' ? 'undefined' : _typeof(promise)) !== 'object') {
	    return false;
	  }

	  if (typeof promise.then !== 'function') {
	    return false;
	  }

	  return true;
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createModel;

	var _lodash = __webpack_require__(6);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _Types = __webpack_require__(21);

	var _Types2 = _interopRequireDefault(_Types);

	var _isModel = __webpack_require__(10);

	var _isModel2 = _interopRequireDefault(_isModel);

	var _isCollection = __webpack_require__(22);

	var _isCollection2 = _interopRequireDefault(_isCollection);

	var _Method = __webpack_require__(8);

	var _Method2 = _interopRequireDefault(_Method);

	var _Model = __webpack_require__(11);

	var _Model2 = _interopRequireDefault(_Model);

	var _Event = __webpack_require__(14);

	var _Event2 = _interopRequireDefault(_Event);

	var _isEvent = __webpack_require__(15);

	var _isEvent2 = _interopRequireDefault(_isEvent);

	var _events = __webpack_require__(16);

	var _events2 = _interopRequireDefault(_events);

	var _bubbleUpEvent = __webpack_require__(17);

	var _bubbleUpEvent2 = _interopRequireDefault(_bubbleUpEvent);

	var _wrapCustomMethod = __webpack_require__(18);

	var _wrapCustomMethod2 = _interopRequireDefault(_wrapCustomMethod);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function createModel() {
	  var schema = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var methods = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var Model = function (_BaseModel) {
	    _inherits(Model, _BaseModel);

	    function Model() {
	      var givenAttributes = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      _classCallCheck(this, Model);

	      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Model).call(this, givenAttributes));

	      var self = _this;

	      var attributes = {};

	      // others listening to this
	      var listeners = {};

	      // apply mixins
	      (0, _events2.default)(_this, listeners);

	      // built-in methods
	      Object.defineProperty(_this, 'toJS', {
	        value: function value() {
	          function convertToJS(attrs) {
	            return _lodash2.default.mapValues(attrs, function (v, k) {
	              if ((0, _isModel2.default)(v) || (0, _isCollection2.default)(v)) {
	                return v.toJS();
	              }

	              if (_lodash2.default.isPlainObject(v)) {
	                return convertToJS(v);
	              }

	              return v;
	            });
	          }

	          return convertToJS(attributes);
	        }
	      });

	      Object.defineProperty(_this, 'destroy', {
	        value: function value() {
	          this.trigger('method:call', new _Event2.default({ path: ['destroy'] }));
	          this.trigger('destroy');
	          this.trigger('method:change', new _Event2.default({ path: ['destroy'] }));
	          this.off();

	          _lodash2.default.each(attributes, function (v, k) {
	            if ((0, _isModel2.default)(v) || (0, _isCollection2.default)(v)) {
	              v.destroy();
	            }
	          });
	        }
	      });

	      Object.defineProperty(_this, 'getIn', {
	        value: function value(paths) {
	          if (!_lodash2.default.isArray(paths)) {
	            throw new _Method2.default('`path` array is not provided');
	          }

	          var reducedPaths = [];
	          return paths.reduce(function (result, path) {
	            reducedPaths.push(path);

	            if (!isNaN(path)) {
	              // collection
	              if (!(0, _isCollection2.default)(result)) {
	                var collectionPath = _lodash2.default.take(reducedPaths, reducedPaths.length - 1);
	                throw new _Method2.default('Path ' + JSON.stringify(collectionPath) + ' is not inside a collection');
	              }

	              return result.at(path);
	            }

	            // model
	            if (!path in result) {
	              throw new _Method2.default('Path ' + JSON.stringify(reducedPaths) + ' does not exist');
	            }

	            return result[path];
	          }, this);
	        }
	      });

	      // parse by schema
	      var applySchema = _Types2.default.object.of(schema);
	      attributes = applySchema(givenAttributes);

	      // define attributes
	      _lodash2.default.each(attributes, function (value, attributeName) {
	        Object.defineProperty(_this, attributeName, {
	          get: function get() {
	            return attributes[attributeName];
	          },
	          set: function set(newValue) {
	            try {
	              schema[attributeName](newValue);
	              attributes[attributeName] = newValue;

	              self.trigger('change', new _Event2.default({
	                path: [attributeName]
	              }));
	            } catch (typeError) {
	              throw typeError;
	            }
	          },


	          enumerable: true
	        });

	        // watch children
	        if ((0, _isModel2.default)(value) || (0, _isCollection2.default)(value)) {
	          (function () {
	            var changeWatcher = (0, _bubbleUpEvent2.default)(self, value, 'change', [attributeName]);
	            var methodCallWatcher = (0, _bubbleUpEvent2.default)(self, value, 'method:call', [attributeName]);
	            var methodChangeWatcher = (0, _bubbleUpEvent2.default)(self, value, 'method:change', [attributeName]);

	            value.on('destroy', function () {
	              self.trigger('change', new _Event2.default({
	                path: [attributeName]
	              }));

	              changeWatcher();
	              methodCallWatcher();
	              methodChangeWatcher();
	            });
	          })();
	        }
	      });

	      // define methods
	      _lodash2.default.each(methods, function (func, methodName) {
	        if (typeof attributes[methodName] !== 'undefined' || typeof _this[methodName] !== 'undefined') {
	          throw new _Method2.default('conflicting method name: ' + methodName);
	        }

	        _this[methodName] = (0, _wrapCustomMethod2.default)(_this, methodName, func);
	      });
	      return _this;
	    }

	    return Model;
	  }(_Model2.default);

	  return Model;
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _lodash = __webpack_require__(6);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _Type = __webpack_require__(3);

	var _Type2 = _interopRequireDefault(_Type);

	var _chainType = __webpack_require__(5);

	var _chainType2 = _interopRequireDefault(_chainType);

	var _isModel = __webpack_require__(10);

	var _isModel2 = _interopRequireDefault(_isModel);

	var _isCollection = __webpack_require__(22);

	var _isCollection2 = _interopRequireDefault(_isCollection);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Types
	 */
	var Types = {};

	Types.string = (0, _chainType2.default)(function (value) {
	  if (typeof value === 'undefined') {
	    return value;
	  }

	  if (typeof value !== 'string') {
	    throw new _Type2.default('value is not a string');
	  }

	  return value;
	});

	Types.bool = (0, _chainType2.default)(function (value) {
	  if (typeof value === 'undefined') {
	    return value;
	  }

	  if (typeof value !== 'boolean') {
	    throw new _Type2.default('value is not a boolean');
	  }

	  return value;
	});

	Types.number = (0, _chainType2.default)(function (value) {
	  if (typeof value === 'undefined') {
	    return value;
	  }

	  if (typeof value !== 'number') {
	    throw new _Type2.default('value is not a number');
	  }

	  return value;
	});

	Types.array = (0, _chainType2.default)(function (value) {
	  if (typeof value === 'undefined') {
	    return value;
	  }

	  if (!_lodash2.default.isArray(value)) {
	    throw new _Type2.default('value is not an array');
	  }

	  return value;
	});

	Types.func = (0, _chainType2.default)(function (value) {
	  if (typeof value === 'undefined') {
	    return value;
	  }

	  if (typeof value !== 'function') {
	    throw new _Type2.default('value is not a function');
	  }

	  return value;
	});

	Types.enum = function () {
	  var enums = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	  if (!_lodash2.default.isArray(enums)) {
	    enums = [enums];
	  }

	  return (0, _chainType2.default)(function (value) {
	    if (typeof value === 'undefined') {
	      return value;
	    }

	    var isValid = enums.some(function (enumValue) {
	      return value === enumValue;
	    });

	    if (isValid) {
	      return value;
	    }

	    throw new _Type2.default('value is none of the provided enums');
	  });
	};

	Types.enum.of = function () {
	  var enumTypes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	  if (!_lodash2.default.isArray(enumTypes)) {
	    enumTypes = [enumTypes];
	  }

	  return (0, _chainType2.default)(function (value) {
	    if (typeof value === 'undefined') {
	      return value;
	    }

	    var isValid = enumTypes.some(function (enumType) {
	      try {
	        enumType(value);

	        return true;
	      } catch (e) {
	        return false;
	      }
	    });

	    if (isValid) {
	      return value;
	    }

	    throw new _Type2.default('value is none of the provided enum types');
	  });
	};

	Types.any = (0, _chainType2.default)(function (value) {
	  return value;
	});

	/**
	 * Object
	 */
	Types.object = (0, _chainType2.default)(function (value) {
	  if (typeof value === 'undefined') {
	    return value;
	  }

	  if (!_lodash2.default.isPlainObject(value)) {
	    throw new _Type2.default('value is not an object');
	  }

	  return value;
	});

	function validateAndReturnObject(value, schema) {
	  return _lodash2.default.mapValues(schema, function (type, k) {
	    try {
	      return type(value[k]);
	    } catch (e) {
	      throw new _Type2.default('schema failed for key `' + k + '`, ' + e.message);
	    }
	  });
	}

	Types.object.of = function (schema) {
	  if (!_lodash2.default.isPlainObject(schema)) {
	    throw new _Type2.default('`object.of` must receive a plain object');
	  }

	  return (0, _chainType2.default)(function (value) {
	    if (typeof value === 'undefined') {
	      return value;
	    }

	    if (!_lodash2.default.isPlainObject(value)) {
	      throw new _Type2.default('value is not an object');
	    }

	    return validateAndReturnObject(value, schema);
	  });
	};

	/**
	 * Model
	 */
	Types.model = (0, _chainType2.default)(function (value) {
	  if (typeof value === 'undefined') {
	    return value;
	  }

	  if ((0, _isModel2.default)(value)) {
	    return value;
	  }

	  throw new _Type2.default('value is not a Model instance');
	});

	Types.model.of = function (Model) {
	  if (typeof Model !== 'function') {
	    throw new _Type2.default('Model is not a function');
	  }

	  return (0, _chainType2.default)(function (value) {
	    if (typeof value === 'undefined') {
	      return value;
	    }

	    if ((0, _isModel2.default)(value)) {
	      if (value instanceof Model) {
	        return value;
	      }

	      throw new _Type2.default('value is not instance of expected Model');
	    }

	    if (_lodash2.default.isPlainObject(value)) {
	      return new Model(value);
	    }

	    throw new _Type2.default('value is not an object');
	  });
	};

	/**
	 * Collection
	 */
	Types.collection = (0, _chainType2.default)(function (value) {
	  if (typeof value === 'undefined') {
	    return value;
	  }

	  if ((0, _isCollection2.default)(value)) {
	    return value;
	  }

	  throw new _Type2.default('value is not a Collection instance');
	});

	Types.collection.of = function (Collection) {
	  if (typeof Collection !== 'function') {
	    throw new _Type2.default('Collection is not a function');
	  }

	  return (0, _chainType2.default)(function (value) {
	    if (typeof value === 'undefined') {
	      return value;
	    }

	    if ((0, _isCollection2.default)(value)) {
	      if (value instanceof Collection) {
	        return value;
	      }

	      throw new _Type2.default('value is not instance of expected Collection');
	    }

	    if (_lodash2.default.isArray(value)) {
	      return new Collection(value);
	    }

	    throw new _Type2.default('value is not an array');
	  });
	};

	exports.default = Types;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isCollection;

	var _Collection = __webpack_require__(13);

	var _Collection2 = _interopRequireDefault(_Collection);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isCollection(collection) {
	  try {
	    return collection instanceof _Collection2.default;
	  } catch (e) {
	    return false;
	  }
	}

/***/ }
/******/ ]);