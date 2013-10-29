var domify = require('domify');
var Events = require('./events');
var slice = Array.prototype.slice;

module.exports = ObjectElement;

function ObjectElement(element) {
  Events.apply(this, arguments);

  var eventsRegistry = {};

  Object.defineProperty(this, 'eventsRegistry', {
    get: function () {
      return eventsRegistry
    }
  });

  this.element = element;
}

ObjectElement.prototype = Object.create(Events.prototype);

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
