import { r as __toESM, t as __commonJSMin } from "../_runtime.mjs";
import { a as getOriginForLocation, c as CALLBACK_KEYS, i as getLivekitUrlForLocation, n as VoiceConversation, o as parseLocation, r as setSourceInfo, s as mergeOptions, t as Conversation } from "./@elevenlabs/client+[...].mjs";
//#region node_modules/react/cjs/react.production.js
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_PORTAL_TYPE = Symbol.for("react.portal");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
	var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
	var REACT_CONTEXT_TYPE = Symbol.for("react.context");
	var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
	var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
	var REACT_MEMO_TYPE = Symbol.for("react.memo");
	var REACT_LAZY_TYPE = Symbol.for("react.lazy");
	var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
	var REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition");
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var ReactNoopUpdateQueue = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	};
	var assign = Object.assign;
	var emptyObject = {};
	function Component(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	Component.prototype.isReactComponent = {};
	Component.prototype.setState = function(partialState, callback) {
		if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, partialState, callback, "setState");
	};
	Component.prototype.forceUpdate = function(callback) {
		this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
	};
	function ComponentDummy() {}
	ComponentDummy.prototype = Component.prototype;
	function PureComponent(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
	pureComponentPrototype.constructor = PureComponent;
	assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = !0;
	var isArrayImpl = Array.isArray;
	function noop() {}
	var ReactSharedInternals = {
		H: null,
		A: null,
		T: null,
		S: null
	};
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function ReactElement(type, key, props) {
		var refProp = props.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== refProp ? refProp : null,
			props
		};
	}
	function cloneAndReplaceKey(oldElement, newKey) {
		return ReactElement(oldElement.type, newKey, oldElement.props);
	}
	function isValidElement(object) {
		return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function escape(key) {
		var escaperLookup = {
			"=": "=0",
			":": "=2"
		};
		return "$" + key.replace(/[=:]/g, function(match) {
			return escaperLookup[match];
		});
	}
	var userProvidedKeyEscapeRegex = /\/+/g;
	function getElementKey(element, index) {
		return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
	}
	function resolveThenable(thenable) {
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenable.reason;
			default: switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
				"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
			}, function(error) {
				"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			})), thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
			}
		}
		throw thenable;
	}
	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		var type = typeof children;
		if ("undefined" === type || "boolean" === type) children = null;
		var invokeCallback = !1;
		if (null === children) invokeCallback = !0;
		else switch (type) {
			case "bigint":
			case "string":
			case "number":
				invokeCallback = !0;
				break;
			case "object": switch (children.$$typeof) {
				case REACT_ELEMENT_TYPE:
				case REACT_PORTAL_TYPE:
					invokeCallback = !0;
					break;
				case REACT_LAZY_TYPE: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
			}
		}
		if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
			return c;
		})) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
		invokeCallback = 0;
		var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
		if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if ("object" === type) {
			if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
			array = String(children);
			throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
		}
		return invokeCallback;
	}
	function mapChildren(children, func, context) {
		if (null == children) return children;
		var result = [], count = 0;
		mapIntoArray(children, result, "", "", function(child) {
			return func.call(context, child, count++);
		});
		return result;
	}
	function lazyInitializer(payload) {
		if (-1 === payload._status) {
			var ctor = payload._result, thenable = ctor();
			thenable.then(function(moduleObject) {
				if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject, void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
			}, function(error) {
				if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error, void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			});
			-1 === payload._status && (payload._status = 0, payload._result = thenable);
		}
		if (1 === payload._status) return payload._result.default;
		throw payload._result;
	}
	var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
		if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
			var event = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
				error
			});
			if (!window.dispatchEvent(event)) return;
		} else if ("object" === typeof process && "function" === typeof process.emit) {
			process.emit("uncaughtException", error);
			return;
		}
		console.error(error);
	};
	function startTransition(scope) {
		var prevTransition = ReactSharedInternals.T, currentTransition = {};
		currentTransition.types = null !== prevTransition ? prevTransition.types : null;
		ReactSharedInternals.T = currentTransition;
		try {
			var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
			null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
			"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
		} catch (error) {
			reportGlobalError(error);
		} finally {
			null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
		}
	}
	function addTransitionType(type) {
		var transition = ReactSharedInternals.T;
		if (null !== transition) {
			var transitionTypes = transition.types;
			null === transitionTypes ? transition.types = [type] : -1 === transitionTypes.indexOf(type) && transitionTypes.push(type);
		} else startTransition(addTransitionType.bind(null, type));
	}
	var Children = {
		map: mapChildren,
		forEach: function(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		},
		count: function(children) {
			var n = 0;
			mapChildren(children, function() {
				n++;
			});
			return n;
		},
		toArray: function(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		},
		only: function(children) {
			if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
			return children;
		}
	};
	exports.Activity = REACT_ACTIVITY_TYPE;
	exports.Children = Children;
	exports.Component = Component;
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.Profiler = REACT_PROFILER_TYPE;
	exports.PureComponent = PureComponent;
	exports.StrictMode = REACT_STRICT_MODE_TYPE;
	exports.Suspense = REACT_SUSPENSE_TYPE;
	exports.ViewTransition = REACT_VIEW_TRANSITION_TYPE;
	exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
	exports.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(size) {
			return ReactSharedInternals.H.useMemoCache(size);
		}
	};
	exports.addTransitionType = addTransitionType;
	exports.cache = function(fn) {
		return function() {
			return fn.apply(null, arguments);
		};
	};
	exports.cacheSignal = function() {
		return null;
	};
	exports.cloneElement = function(element, config, children) {
		if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
		var props = assign({}, element.props), key = element.key;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
		var propName = arguments.length - 2;
		if (1 === propName) props.children = children;
		else if (1 < propName) {
			for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		return ReactElement(element.type, key, props);
	};
	exports.createContext = function(defaultValue) {
		defaultValue = {
			$$typeof: REACT_CONTEXT_TYPE,
			_currentValue: defaultValue,
			_currentValue2: defaultValue,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		};
		defaultValue.Provider = defaultValue;
		defaultValue.Consumer = {
			$$typeof: REACT_CONSUMER_TYPE,
			_context: defaultValue
		};
		return defaultValue;
	};
	exports.createElement = function(type, config, children) {
		var propName, props = {}, key = null;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
		var childrenLength = arguments.length - 2;
		if (1 === childrenLength) props.children = children;
		else if (1 < childrenLength) {
			for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
		return ReactElement(type, key, props);
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(render) {
		return {
			$$typeof: REACT_FORWARD_REF_TYPE,
			render
		};
	};
	exports.isValidElement = isValidElement;
	exports.lazy = function(ctor) {
		return {
			$$typeof: REACT_LAZY_TYPE,
			_payload: {
				_status: -1,
				_result: ctor
			},
			_init: lazyInitializer
		};
	};
	exports.memo = function(type, compare) {
		return {
			$$typeof: REACT_MEMO_TYPE,
			type,
			compare: void 0 === compare ? null : compare
		};
	};
	exports.startTransition = startTransition;
	exports.unstable_useCacheRefresh = function() {
		return ReactSharedInternals.H.useCacheRefresh();
	};
	exports.use = function(usable) {
		return ReactSharedInternals.H.use(usable);
	};
	exports.useActionState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useActionState(action, initialState, permalink);
	};
	exports.useCallback = function(callback, deps) {
		return ReactSharedInternals.H.useCallback(callback, deps);
	};
	exports.useContext = function(Context) {
		return ReactSharedInternals.H.useContext(Context);
	};
	exports.useDebugValue = function() {};
	exports.useDeferredValue = function(value, initialValue) {
		return ReactSharedInternals.H.useDeferredValue(value, initialValue);
	};
	exports.useEffect = function(create, deps) {
		return ReactSharedInternals.H.useEffect(create, deps);
	};
	exports.useEffectEvent = function(callback) {
		return ReactSharedInternals.H.useEffectEvent(callback);
	};
	exports.useId = function() {
		return ReactSharedInternals.H.useId();
	};
	exports.useImperativeHandle = function(ref, create, deps) {
		return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
	};
	exports.useInsertionEffect = function(create, deps) {
		return ReactSharedInternals.H.useInsertionEffect(create, deps);
	};
	exports.useLayoutEffect = function(create, deps) {
		return ReactSharedInternals.H.useLayoutEffect(create, deps);
	};
	exports.useMemo = function(create, deps) {
		return ReactSharedInternals.H.useMemo(create, deps);
	};
	exports.useOptimistic = function(passthrough, reducer) {
		return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
	};
	exports.useReducer = function(reducer, initialArg, init) {
		return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
	};
	exports.useRef = function(initialValue) {
		return ReactSharedInternals.H.useRef(initialValue);
	};
	exports.useState = function(initialState) {
		return ReactSharedInternals.H.useState(initialState);
	};
	exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
		return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	};
	exports.useTransition = function() {
		return ReactSharedInternals.H.useTransition();
	};
	exports.version = "19.3.0";
}));
//#endregion
//#region node_modules/react/index.js
var require_react = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_production();
}));
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
		var key = null;
		void 0 !== maybeKey && (key = "" + maybeKey);
		void 0 !== config.key && (key = "" + config.key);
		if ("key" in config) {
			maybeKey = {};
			for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
		} else maybeKey = config;
		config = maybeKey.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== config ? config : null,
			props: maybeKey
		};
	}
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.jsx = jsxProd;
	exports.jsxs = jsxProd;
}));
//#endregion
//#region node_modules/react/jsx-runtime.js
var require_jsx_runtime = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_jsx_runtime_production();
}));
//#endregion
//#region node_modules/@elevenlabs/react/dist/version.js
var PACKAGE_VERSION = "1.16.0";
//#endregion
//#region node_modules/@elevenlabs/react/dist/scribe.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region node_modules/@elevenlabs/react/dist/conversation/ConversationContext.js
var import_jsx_runtime = require_jsx_runtime();
var ConversationContext = (0, import_react.createContext)(null);
/**
* Returns the raw `Conversation` instance (or `null` if no session is active).
* This is a public escape hatch for advanced use cases that need direct access
* to the underlying `@elevenlabs/client` Conversation object.
*
* Can be used outside a `ConversationProvider` — returns `null` in that case.
*/
function useRawConversation() {
	return (0, import_react.useContext)(ConversationContext)?.conversation ?? null;
}
/**
* Returns a stable ref to the active `Conversation` instance.
* The ref's `.current` is `null` when no session is active, and updates
* without causing re-renders — ideal for use inside callbacks and sub-providers.
*
* Must be used within a `ConversationProvider`.
*/
function useRawConversationRef() {
	const ctx = (0, import_react.useContext)(ConversationContext);
	if (!ctx) throw new Error("useRawConversationRef must be used within a ConversationProvider");
	return ctx.conversationRef;
}
/**
* Registers callback handlers with the nearest `ConversationProvider`.
* Uses a ref internally so the latest callback values are always invoked
* without re-subscribing on every render.
*
* Must be used within a `ConversationProvider`.
*/
function useRegisterCallbacks(callbacks) {
	const ctx = (0, import_react.useContext)(ConversationContext);
	if (!ctx) throw new Error("useRegisterCallbacks must be used within a ConversationProvider");
	const { registerCallbacks } = ctx;
	const callbacksRef = (0, import_react.useRef)(callbacks);
	const activeKeyToken = Object.keys(callbacks).filter((key) => callbacks[key] !== void 0).sort().join("|");
	(0, import_react.useLayoutEffect)(() => {
		callbacksRef.current = callbacks;
	});
	(0, import_react.useLayoutEffect)(() => {
		const activeKeys = activeKeyToken === "" ? [] : activeKeyToken.split("|");
		const stableCallbacks = Object.fromEntries(activeKeys.map((key) => [key, (...args) => {
			const fn = callbacksRef.current[key];
			if (typeof fn === "function") fn(...args);
		}]));
		return registerCallbacks(stableCallbacks);
	}, [registerCallbacks, activeKeyToken]);
}
//#endregion
//#region node_modules/@elevenlabs/react/dist/conversation/ConversationControls.js
var EMPTY_FREQUENCY_DATA = /* @__PURE__ */ new Uint8Array(0);
var ConversationControlsContext = (0, import_react.createContext)(null);
/**
* Reads from `ConversationContext` and provides stable action references to
* `ConversationControlsContext`. Must be rendered inside a `ConversationProvider`.
*/
function ConversationControlsProvider({ children }) {
	const ctx = (0, import_react.useContext)(ConversationContext);
	if (!ctx) throw new Error("ConversationControlsProvider must be rendered inside a ConversationProvider");
	const { conversationRef } = ctx;
	const getConversation = (0, import_react.useCallback)(() => {
		const conversation = conversationRef.current;
		if (!conversation) throw new Error("No active conversation. Call startSession() first.");
		return conversation;
	}, [conversationRef]);
	const sendUserMessage = (0, import_react.useCallback)((text) => {
		getConversation().sendUserMessage(text);
	}, [getConversation]);
	const sendMultimodalMessage = (0, import_react.useCallback)((options) => {
		getConversation().sendMultimodalMessage(options);
	}, [getConversation]);
	const uploadFile = (0, import_react.useCallback)((file) => {
		return getConversation().uploadFile(file);
	}, [getConversation]);
	const sendContextualUpdate = (0, import_react.useCallback)((text, options) => {
		getConversation().sendContextualUpdate(text, options);
	}, [getConversation]);
	const sendUserActivity = (0, import_react.useCallback)(() => {
		getConversation().sendUserActivity();
	}, [getConversation]);
	const sendMCPToolApprovalResult = (0, import_react.useCallback)((toolCallId, isApproved) => {
		getConversation().sendMCPToolApprovalResult(toolCallId, isApproved);
	}, [getConversation]);
	const setVolume = (0, import_react.useCallback)((options) => {
		getConversation().setVolume(options);
	}, [getConversation]);
	const changeInputDevice = (0, import_react.useCallback)(async (config) => {
		const conversation = getConversation();
		if (conversation instanceof VoiceConversation) return await conversation.changeInputDevice(config);
		throw new Error("Device switching is only available for voice conversations");
	}, [getConversation]);
	const changeOutputDevice = (0, import_react.useCallback)(async (config) => {
		const conversation = getConversation();
		if (conversation instanceof VoiceConversation) return await conversation.changeOutputDevice(config);
		throw new Error("Device switching is only available for voice conversations");
	}, [getConversation]);
	const getInputByteFrequencyData = (0, import_react.useCallback)(() => {
		return conversationRef.current?.getInputByteFrequencyData() ?? EMPTY_FREQUENCY_DATA;
	}, [conversationRef]);
	const getOutputByteFrequencyData = (0, import_react.useCallback)(() => {
		return conversationRef.current?.getOutputByteFrequencyData() ?? EMPTY_FREQUENCY_DATA;
	}, [conversationRef]);
	const getInputVolume = (0, import_react.useCallback)(() => {
		return conversationRef.current?.getInputVolume() ?? 0;
	}, [conversationRef]);
	const getOutputVolume = (0, import_react.useCallback)(() => {
		return conversationRef.current?.getOutputVolume() ?? 0;
	}, [conversationRef]);
	const getId = (0, import_react.useCallback)(() => {
		return getConversation().getId();
	}, [getConversation]);
	const value = (0, import_react.useMemo)(() => ({
		startSession: ctx.startSession,
		endSession: ctx.endSession,
		sendUserMessage,
		sendMultimodalMessage,
		uploadFile,
		sendContextualUpdate,
		sendUserActivity,
		sendMCPToolApprovalResult,
		setVolume,
		changeInputDevice,
		changeOutputDevice,
		getInputByteFrequencyData,
		getOutputByteFrequencyData,
		getInputVolume,
		getOutputVolume,
		getId
	}), [
		ctx.startSession,
		ctx.endSession,
		sendUserMessage,
		sendMultimodalMessage,
		uploadFile,
		sendContextualUpdate,
		sendUserActivity,
		sendMCPToolApprovalResult,
		setVolume,
		changeInputDevice,
		changeOutputDevice,
		getInputByteFrequencyData,
		getOutputByteFrequencyData,
		getInputVolume,
		getOutputVolume,
		getId
	]);
	return (0, import_jsx_runtime.jsx)(ConversationControlsContext.Provider, {
		value,
		children
	});
}
/**
* Returns stable action references for controlling the conversation.
* All function references are stable and will never cause re-renders.
*
* Must be used within a `ConversationProvider`.
*/
function useConversationControls() {
	const ctx = (0, import_react.useContext)(ConversationControlsContext);
	if (!ctx) throw new Error("useConversationControls must be used within a ConversationProvider");
	return ctx;
}
//#endregion
//#region node_modules/@elevenlabs/react/dist/conversation/ConversationStatus.js
var ConversationStatusContext = (0, import_react.createContext)(null);
/**
* Reads from `ConversationContext` and registers `onStatusChange` + `onError`
* callbacks. Manages its own `status`/`message` state and provides it through
* `ConversationStatusContext`. Must be rendered inside a `ConversationProvider`.
*/
function ConversationStatusProvider({ children }) {
	const [status, setStatus] = (0, import_react.useState)("disconnected");
	const [message, setMessage] = (0, import_react.useState)(void 0);
	useRegisterCallbacks({
		onStatusChange({ status: newStatus }) {
			setStatus(newStatus === "disconnecting" ? "disconnected" : newStatus);
			setMessage(void 0);
		},
		onError(errorMessage) {
			setStatus("error");
			setMessage(errorMessage);
		}
	});
	const value = (0, import_react.useMemo)(() => ({
		status,
		message
	}), [status, message]);
	return (0, import_jsx_runtime.jsx)(ConversationStatusContext.Provider, {
		value,
		children
	});
}
/**
* Returns the current conversation status and any error message.
* Re-renders when the connection status or error message changes.
*
* Must be used within a `ConversationProvider`.
*/
function useConversationStatus() {
	const ctx = (0, import_react.useContext)(ConversationStatusContext);
	if (!ctx) throw new Error("useConversationStatus must be used within a ConversationProvider");
	return ctx;
}
//#endregion
//#region node_modules/@elevenlabs/react/dist/conversation/ConversationInput.js
var ConversationInputContext = (0, import_react.createContext)(null);
/**
* Reads from `ConversationContext` and manages microphone mute state.
* `setMuted` calls `conversation.setMicMuted()` and updates local state.
* Must be rendered inside a `ConversationProvider`.
*/
function ConversationInputProvider({ children, isMuted: controlledIsMuted, onMutedChange }) {
	const conversation = useRawConversation();
	const conversationRef = useRawConversationRef();
	const isControlled = typeof controlledIsMuted === "boolean";
	const [uncontrolledIsMuted, setUncontrolledIsMuted] = (0, import_react.useState)(false);
	const isMuted = isControlled ? controlledIsMuted : uncontrolledIsMuted;
	useRegisterCallbacks({ onDisconnect() {
		if (!isControlled) setUncontrolledIsMuted(false);
	} });
	(0, import_react.useEffect)(() => {
		if (isControlled && conversation) conversation.setMicMuted(controlledIsMuted);
	}, [
		conversation,
		controlledIsMuted,
		isControlled
	]);
	const setMuted = (0, import_react.useCallback)((muted) => {
		const conversation = conversationRef.current;
		if (!conversation) throw new Error("No active conversation. Call startSession() first.");
		if (!isControlled) {
			conversation.setMicMuted(muted);
			setUncontrolledIsMuted(muted);
		}
		onMutedChange?.(muted);
	}, [
		conversationRef,
		isControlled,
		onMutedChange
	]);
	const value = (0, import_react.useMemo)(() => ({
		isMuted,
		setMuted
	}), [isMuted, setMuted]);
	return (0, import_jsx_runtime.jsx)(ConversationInputContext.Provider, {
		value,
		children
	});
}
/**
* Returns the current microphone mute state and a function to change it.
* Re-renders only when the mute state changes.
*
* Must be used within a `ConversationProvider`.
*/
function useConversationInput() {
	const ctx = (0, import_react.useContext)(ConversationInputContext);
	if (!ctx) throw new Error("useConversationInput must be used within a ConversationProvider");
	return ctx;
}
//#endregion
//#region node_modules/@elevenlabs/react/dist/conversation/ConversationMode.js
var ConversationModeContext = (0, import_react.createContext)(null);
/**
* Reads from `ConversationContext` and registers an `onModeChange` callback.
* Manages its own `mode` state and provides it through
* `ConversationModeContext`. Must be rendered inside a `ConversationProvider`.
*/
function ConversationModeProvider({ children }) {
	const [mode, setMode] = (0, import_react.useState)("listening");
	useRegisterCallbacks({
		onModeChange({ mode: newMode }) {
			setMode(newMode);
		},
		onDisconnect() {
			setMode("listening");
		}
	});
	const value = (0, import_react.useMemo)(() => ({
		mode,
		isSpeaking: mode === "speaking",
		isListening: mode === "listening"
	}), [mode]);
	return (0, import_jsx_runtime.jsx)(ConversationModeContext.Provider, {
		value,
		children
	});
}
/**
* Returns the current conversation mode (speaking/listening) and
* convenience booleans. Re-renders only when the mode changes.
*
* Must be used within a `ConversationProvider`.
*/
function useConversationMode() {
	const ctx = (0, import_react.useContext)(ConversationModeContext);
	if (!ctx) throw new Error("useConversationMode must be used within a ConversationProvider");
	return ctx;
}
//#endregion
//#region node_modules/@elevenlabs/react/dist/conversation/ConversationFeedback.js
var ConversationFeedbackContext = (0, import_react.createContext)(null);
/**
* Reads from `ConversationContext` and registers an `onCanSendFeedbackChange`
* callback. Manages its own `canSendFeedback` state and provides it along with
* a `sendFeedback` action through `ConversationFeedbackContext`.
* Must be rendered inside a `ConversationProvider`.
*/
function ConversationFeedbackProvider({ children }) {
	const conversationRef = useRawConversationRef();
	const [canSendFeedback, setCanSendFeedback] = (0, import_react.useState)(false);
	useRegisterCallbacks({
		onCanSendFeedbackChange({ canSendFeedback: newValue }) {
			setCanSendFeedback(newValue);
		},
		onDisconnect() {
			setCanSendFeedback(false);
		}
	});
	const sendFeedback = (0, import_react.useCallback)((like, eventId) => {
		conversationRef.current?.sendFeedback(like, eventId);
	}, [conversationRef]);
	const value = (0, import_react.useMemo)(() => ({
		canSendFeedback,
		sendFeedback
	}), [canSendFeedback, sendFeedback]);
	return (0, import_jsx_runtime.jsx)(ConversationFeedbackContext.Provider, {
		value,
		children
	});
}
/**
* Returns the current feedback state and a `sendFeedback` action.
* Re-renders only when `canSendFeedback` changes.
*
* Must be used within a `ConversationProvider`.
*/
function useConversationFeedback() {
	const ctx = (0, import_react.useContext)(ConversationFeedbackContext);
	if (!ctx) throw new Error("useConversationFeedback must be used within a ConversationProvider");
	return ctx;
}
//#endregion
//#region node_modules/@elevenlabs/react/dist/conversation/ConversationClientTools.js
/**
* Creates a fresh clientTools object by merging option-provided tools with
* hook-registered tools from the registry. Throws if a hook-registered tool
* name conflicts with an option-provided tool.
*/
function buildClientTools(optionTools, registry) {
	const clientTools = { ...optionTools };
	for (const [name, handler] of registry) {
		if (Object.hasOwn(clientTools, name)) throw new Error(`Client tool "${name}" is already provided via props/options. Remove it from props or do not register it with useConversationClientTool.`);
		clientTools[name] = handler;
	}
	return clientTools;
}
var ConversationClientToolsContext = (0, import_react.createContext)(null);
function ConversationClientToolsProvider({ children }) {
	const ctx = (0, import_react.useContext)(ConversationContext);
	if (!ctx) throw new Error("ConversationClientToolsProvider must be rendered inside a ConversationProvider");
	const { clientToolsRegistry, clientToolsRef } = ctx;
	const registerClientTool = (0, import_react.useCallback)((name, handler) => {
		if (clientToolsRegistry.has(name)) throw new Error(`Client tool "${name}" is already registered by another hook. Each tool name must be unique.`);
		clientToolsRegistry.set(name, handler);
		clientToolsRef.current[name] = handler;
		return () => {
			if (clientToolsRegistry.get(name) === handler) clientToolsRegistry.delete(name);
			if (clientToolsRef.current[name] === handler) delete clientToolsRef.current[name];
		};
	}, [clientToolsRegistry, clientToolsRef]);
	return (0, import_jsx_runtime.jsx)(ConversationClientToolsContext.Provider, {
		value: registerClientTool,
		children
	});
}
//#endregion
//#region node_modules/@elevenlabs/react/dist/conversation/ListenerSet.js
var ListenerSet = class {
	listeners = /* @__PURE__ */ new Set();
	add(fn) {
		this.listeners.add(fn);
		return () => {
			this.listeners.delete(fn);
		};
	}
	invoke(...args) {
		for (const fn of this.listeners) fn(...args);
	}
	get size() {
		return this.listeners.size;
	}
};
//#endregion
//#region node_modules/@elevenlabs/react/dist/conversation/ListenerMap.js
function assertFunction(value, key) {
	if (typeof value !== "function") throw new Error(`Expected function for key "${key}", got ${typeof value}`);
}
/**
* A map of named listener sets. Each key maps to a `ListenerSet` that can have
* multiple listeners registered. Typed through `T` so that `register` and
* `compose` preserve per-key callback signatures.
*
* All keys are pre-initialized in the constructor so `register` can validate
* keys. `compose()` only includes keys with at least one registered listener,
* preserving callback-presence semantics used by the client as feature guards.
* For included keys, composed functions delegate to the live listener set, so
* listeners added/removed after `compose()` still take effect. Keys with no
* listeners at compose time are omitted entirely; call `compose()` again after
* registering listeners to pick up newly populated keys.
*/
var ListenerMap = class {
	sets = /* @__PURE__ */ new Map();
	constructor(keys) {
		for (const key of keys) this.sets.set(key, new ListenerSet());
	}
	/**
	* Register listeners for one or more keys. Returns a function that removes
	* all listeners added by this call.
	*/
	register(callbacks) {
		const removers = Object.entries(callbacks).filter(([, fn]) => fn !== void 0).map(([key, fn]) => {
			assertFunction(fn, key);
			const set = this.sets.get(key);
			if (!set) throw new Error(`Unknown callback key "${key}"`);
			return set.add(fn);
		});
		return () => {
			for (const remove of removers) remove();
		};
	}
	/**
	* Compose all registered listeners into a single callbacks object. Each
	* composed function delegates to the live listener set, so listeners
	* added/removed after this call still take effect.
	*/
	compose() {
		return Object.fromEntries(Array.from(this.sets.entries()).filter(([, set]) => set.size > 0).map(([key, set]) => [key, (...args) => {
			set.invoke(...args);
		}]));
	}
};
//#endregion
//#region node_modules/@elevenlabs/react/dist/conversation/useStableCallbacks.js
/**
* Wraps user-provided callback props in stable ref-backed functions,
* preventing stale closure bugs when the session outlives renders.
*
* Returns a `Partial<Callbacks>` containing only the keys the caller
* actually provided. Function references are stable per key across
* renders, but always invoke the latest prop value. The returned object
* reference is stable as long as the set of provided keys doesn't change.
*/
function useStableCallbacks(props) {
	const callbackRefs = (0, import_react.useRef)({});
	const activeKeys = CALLBACK_KEYS.filter((key) => props[key] !== void 0);
	const activeKeySet = activeKeys.join("|");
	const stableCallbacks = (0, import_react.useMemo)(() => Object.fromEntries(activeKeys.map((key) => [key, (...args) => {
		const fn = callbackRefs.current[key];
		fn?.(...args);
	}])), [activeKeySet]);
	for (const key of CALLBACK_KEYS) callbackRefs.current[key] = props[key];
	return stableCallbacks;
}
//#endregion
//#region node_modules/@elevenlabs/react/dist/conversation/ConversationProvider.js
var SUB_PROVIDERS_WITHOUT_PROPS = [
	ConversationControlsProvider,
	ConversationStatusProvider,
	ConversationModeProvider,
	ConversationFeedbackProvider,
	ConversationClientToolsProvider
];
function ConversationProvider({ children, isMuted, onMutedChange, ...defaultOptions }) {
	/** The active conversation instance, if any. */
	const conversationRef = (0, import_react.useRef)(null);
	/** In-flight startSession promise, used to prevent duplicate connections. */
	const lockRef = (0, import_react.useRef)(null);
	/** Monotonic id used to ignore stale async handlers from older starts. */
	const startSessionIdRef = (0, import_react.useRef)(0);
	/** Signals that endSession was called while a connection was still pending. */
	const shouldEndRef = (0, import_react.useRef)(false);
	/** Registry of hook-registered client tools. Survives across sessions. */
	const [clientToolsRegistry] = (0, import_react.useState)(() => /* @__PURE__ */ new Map());
	/** Ref to the live clientTools object currently held by BaseConversation. */
	const clientToolsRef = (0, import_react.useRef)({});
	/** Always holds the latest provider props, avoiding stale closures in callbacks. */
	const defaultOptionsRef = (0, import_react.useRef)(defaultOptions);
	defaultOptionsRef.current = defaultOptions;
	/** Callback registry for sub-providers (status, mode, feedback, etc.). */
	const [listenerMap] = (0, import_react.useState)(() => new ListenerMap(CALLBACK_KEYS));
	/** Reactive mirror of conversationRef, triggers re-renders for context consumers. */
	const [conversation, setConversation] = (0, import_react.useState)(null);
	const stableCallbacks = useStableCallbacks(defaultOptions);
	const registerCallbacks = (0, import_react.useCallback)((callbacks) => listenerMap.register(callbacks), [listenerMap]);
	const startSession = (0, import_react.useCallback)((options) => {
		if (conversationRef.current) return;
		if (lockRef.current) return;
		shouldEndRef.current = false;
		const startSessionId = ++startSessionIdRef.current;
		const defaults = defaultOptionsRef.current;
		const resolvedServerLocation = parseLocation(options?.serverLocation || defaults?.serverLocation);
		const origin = getOriginForLocation(resolvedServerLocation);
		const calculatedLivekitUrl = getLivekitUrlForLocation(resolvedServerLocation);
		const defaultConfig = { ...defaults };
		for (const key of CALLBACK_KEYS) delete defaultConfig[key];
		const sessionOptions = mergeOptions({ livekitUrl: calculatedLivekitUrl }, defaultConfig, stableCallbacks, listenerMap.compose(), options ?? {}, { origin });
		const clientTools = buildClientTools(sessionOptions.clientTools, clientToolsRegistry);
		clientToolsRef.current = clientTools;
		sessionOptions.clientTools = clientTools;
		const isStaleStartSession = () => startSessionId !== startSessionIdRef.current;
		for (const key of CALLBACK_KEYS) {
			const callback = sessionOptions[key];
			if (typeof callback === "function") sessionOptions[key] = (...args) => {
				if (!isStaleStartSession()) callback(...args);
			};
		}
		const userOnConversationCreated = sessionOptions.onConversationCreated;
		const userOnDisconnect = sessionOptions.onDisconnect;
		let thisSessionConv = null;
		const handleConversationCreated = (conv) => {
			thisSessionConv = conv;
			if (shouldEndRef.current || isStaleStartSession()) return;
			conversationRef.current = conv;
			setConversation(conv);
			userOnConversationCreated?.(conv);
		};
		const handleConnect = (props) => {
			if (shouldEndRef.current || isStaleStartSession()) return;
			lockRef.current = null;
			sessionOptions.onConnect?.(props);
		};
		const handleStatusChange = (props) => {
			if (isStaleStartSession()) return;
			if (props.status === "disconnecting" && thisSessionConv !== null && conversationRef.current === thisSessionConv) {
				conversationRef.current = null;
				setConversation(null);
			}
			sessionOptions.onStatusChange?.(props);
		};
		const handleDisconnect = (details) => {
			if (isStaleStartSession()) return;
			if (conversationRef.current === thisSessionConv) {
				conversationRef.current = null;
				setConversation(null);
			}
			userOnDisconnect?.(details);
		};
		const providerLifecycleOptions = {
			onConversationCreated: handleConversationCreated,
			onConnect: handleConnect,
			onDisconnect: handleDisconnect,
			onStatusChange: handleStatusChange
		};
		const startSessionOptions = {
			...sessionOptions,
			...providerLifecycleOptions
		};
		lockRef.current = Conversation.startSession(startSessionOptions);
		lockRef.current.then((conv) => {
			if (isStaleStartSession()) return;
			if (shouldEndRef.current) {
				conv.endSession().catch((error) => console.warn("Error ending session:", error));
				lockRef.current = null;
				return;
			}
			if (conversationRef.current !== conv) {
				thisSessionConv = conv;
				conversationRef.current = conv;
				setConversation(conv);
			}
			lockRef.current = null;
		}, (error) => {
			if (isStaleStartSession()) return;
			conversationRef.current = null;
			setConversation(null);
			lockRef.current = null;
			if (shouldEndRef.current) return;
			const message = error instanceof Error ? error.message : "Session failed to start";
			sessionOptions.onError?.(message, error);
		});
	}, [
		stableCallbacks,
		listenerMap,
		clientToolsRegistry,
		clientToolsRef
	]);
	const endSession = (0, import_react.useCallback)(() => {
		shouldEndRef.current = true;
		const pendingConnection = lockRef.current;
		const conv = conversationRef.current;
		conversationRef.current = null;
		setConversation(null);
		if (pendingConnection) pendingConnection.then((c) => c.endSession().catch((error) => console.warn("Error ending session:", error)), () => {});
		else conv?.endSession().catch((error) => console.warn("Error ending session:", error));
	}, []);
	(0, import_react.useEffect)(() => {
		return () => {
			shouldEndRef.current = true;
			if (lockRef.current) lockRef.current.then((conv) => conv.endSession().catch(() => {}), () => {});
			else conversationRef.current?.endSession().catch(() => {});
		};
	}, []);
	const contextValue = (0, import_react.useMemo)(() => ({
		conversation,
		conversationRef,
		startSession,
		endSession,
		registerCallbacks,
		clientToolsRegistry,
		clientToolsRef
	}), [
		conversation,
		conversationRef,
		startSession,
		endSession,
		registerCallbacks,
		clientToolsRegistry,
		clientToolsRef
	]);
	const wrappedChildren = SUB_PROVIDERS_WITHOUT_PROPS.reduceRight((nested, Provider) => (0, import_jsx_runtime.jsx)(Provider, { children: nested }), (0, import_jsx_runtime.jsx)(ConversationInputProvider, {
		isMuted,
		onMutedChange,
		children
	}));
	return (0, import_jsx_runtime.jsx)(ConversationContext.Provider, {
		value: contextValue,
		children: wrappedChildren
	});
}
//#endregion
//#region node_modules/@elevenlabs/react/dist/conversation/useConversation.js
/**
* Convenience hook that combines all granular conversation hooks into a single
* return value. Less performant than using individual hooks because any state
* change in any sub-context triggers a re-render of the consuming component.
*
* Accepts optional `micMuted`, `volume`, session config, and callback props.
* Session config and callbacks passed here are used as defaults when calling
* `startSession()` without arguments. Callbacks are also registered with the
* provider so they stay up-to-date across re-renders.
*
* Must be used within a `ConversationProvider`.
*/
function useConversation(props = {}) {
	const { micMuted, volume, ...hookOptions } = props;
	useRegisterCallbacks(useStableCallbacks(hookOptions));
	const hookOptionsRef = (0, import_react.useRef)(hookOptions);
	hookOptionsRef.current = hookOptions;
	const controls = useConversationControls();
	const { status, message } = useConversationStatus();
	const { isMuted, setMuted } = useConversationInput();
	const { mode, isSpeaking, isListening } = useConversationMode();
	const { canSendFeedback, sendFeedback } = useConversationFeedback();
	const startSession = (0, import_react.useCallback)((options) => {
		const sessionConfig = { ...hookOptionsRef.current };
		for (const key of CALLBACK_KEYS) delete sessionConfig[key];
		controls.startSession({
			...sessionConfig,
			...options
		});
	}, [controls, hookOptionsRef]);
	const conversation = useRawConversation();
	(0, import_react.useEffect)(() => {
		if (micMuted !== void 0 && conversation) setMuted(micMuted);
	}, [
		micMuted,
		conversation,
		setMuted
	]);
	(0, import_react.useEffect)(() => {
		if (volume !== void 0 && conversation) conversation.setVolume({ volume });
	}, [volume, conversation]);
	return {
		...controls,
		startSession,
		status,
		message,
		isMuted: micMuted ?? isMuted,
		setMuted,
		mode,
		isSpeaking,
		isListening,
		canSendFeedback,
		sendFeedback
	};
}
//#endregion
//#region node_modules/@elevenlabs/react/dist/index.js
setSourceInfo({
	name: "react_sdk",
	version: PACKAGE_VERSION
});
//#endregion
export { require_react as i, ConversationProvider as n, require_jsx_runtime as r, useConversation as t };
