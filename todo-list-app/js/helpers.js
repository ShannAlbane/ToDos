/*global NodeList */
(function (window) {
	'use strict';

	/**
	 * Get element(s) by CSS selector
	 *  
	 * @param {string} selector The CSS selector
	 * @param {object} scope The scope tested, or by default the entire document
	 */ 
	window.qs = function (selector, scope) {
		return (scope || document).querySelector(selector);
	};
	window.qsa = function (selector, scope) {
		return (scope || document).querySelectorAll(selector);
	};

	/**
	 * Wrap a event listener to an existing element 
	 *  
	 * @param {object} target The element targeted
	 * @param {boolean} type Blur or Focus
	 * @param {function} callback The callback of the function
	 * @param {object} useCapture useCapture is composed by the type (blur or focus)
	 */ 
	window.$on = function (target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
	};

	/** 
	 * Attach a handler to event for all elements that match the selector,
	 * now or in the future, based on a root element
	 * 
	 * @param {object} target The element targeted
	 * @param {string} selector The CSS selector to filter the element
	 * @param {boolean} type Blur or Focus 
	 * @param {function} handler Callback executed (handler to attach) if the condition is verified	
	 * 
	 */ 	window.$delegate = function (target, selector, type, handler) {
		function dispatchEvent(event) {
			var targetElement = event.target;
			var potentialElements = window.qsa(selector, target);
			var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

			if (hasMatch) {
				handler.call(targetElement, event);
			}
		}

		// https://developer.mozilla.org/en-US/docs/Web/Events/blur
		var useCapture = type === 'blur' || type === 'focus';

		window.$on(target, type, dispatchEvent, useCapture);
	};

	/**
	 * Find the element's parent with the given tag name:
	 * @param {object} element The element targeted
	 * @param {string} tagName The HTML tag to filter 
	 * 
	 * @example
	 * $parent(qs('a'), 'div');
	 * 	//will returns the <div> who contains <a> element 
	 */ 
	// 
	window.$parent = function (element, tagName) {
		if (!element.parentNode) {
			return;
		}
		if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
			return element.parentNode;
		}
		return window.$parent(element.parentNode, tagName);
	};

	/**
	 * Allow for looping on nodes by chaining
	 * 
	 * @example
	 * qsa('.foo').forEach(function () {})
	 * //will returns all elements with the HTML class 'foo'
	 */ 
	NodeList.prototype.forEach = Array.prototype.forEach;
})(window);
