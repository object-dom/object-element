var domify = require('domify');
var Events = require('./events');
var slice = Array.prototype.slice;

module.exports = ObjectElement;

function ObjectElement(param) {
  var element, eventsRegistry = {};

  if (typeof param === 'undefined' || param === null) {
    element = document.createElement('div');
  } else if (typeof param === 'string') {
    element = document.createElement(param);
  } else if (typeof param === 'object') {
    element = param;
  }

  Object.defineProperty(this, 'element', {
    get: function () {
      return element;
    },

    set: function (value) {
      element = value;
    }
  });

  Object.defineProperty(this, 'eventsRegistry', {
    get: function () {
      return eventsRegistry
    }
  });
}

/**
 * Wrap HTMLElement with ObjectElement
 * @param  {HTMLElement element}
 * @return {ObjectElement}
 */
ObjectElement.wrapElement = function (element) {
  return element.OBJECT_ELEMENT ? element : new ObjectElement(element);
}

/**
 * Loop through HTMLElements and wrap each of them with ObjectElement
 * @param  {Array elements}
 * @return {Array}
 */
ObjectElement.wrapElements = function (elements) {
  elements = slice.call(elements);

  return elements.map(function (element, i) {
    return ObjectElement.wrapElement(element);
  });
}

ObjectElement.createElement = function (tag) {
  tag = tag || 'div';

  return this.wrapElement(document.createElement(tag));
}

ObjectElement.prototype = new Events;

ObjectElement.prototype.defineProperty = function (name, defines) {
  Object.defineProperty(this, name, defines);
}

ObjectElement.prototype.defineProperty('OBJECT_ELEMENT', {
  get: function () {
    return 1;
  }
});

/**
 * Shortcut to .element.id
 */
ObjectElement.prototype.defineProperty('id', {
  get: function () {
    return this.element.id;
  },

  set: function (value) {
    this.element.id = value;
  }
});

/**
 * Shortcut to .element.tagName
 */
ObjectElement.prototype.defineProperty('tag', {
  get: function () {
    return this.element.tagName;
  }
});

/**
 * Get or set textContent of the element
 */
ObjectElement.prototype.defineProperty('text', {
  get: function () {
    return this.element.textContent;
  },

  set: function (value) {
    this.element.textContent = value;
  }
});

/**
 * Get or set innerHTML of the element
 */
ObjectElement.prototype.defineProperty('html', {
  get: function () {
    return this.element.innerHTML;
  },

  set: function (htmlString) {
    this.element.innerHTML = '';
    this.element.appendChild(domify(htmlString));
  }
});

/**
 * Call a function on this element
 * @param  {Function callback}
 * @return {Null}
 */
ObjectElement.prototype.tie = function (callback) {
  callback.call(this, this.element);
}
