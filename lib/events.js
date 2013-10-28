var slice = Array.prototype.slice;

module.exports = Events;

function Events() {}

Events.prototype.on = function (eventname, callback) {
  if (typeof this.eventsRegistry[eventname] === 'undefined') {
    this.eventsRegistry[eventname] = [];
  }

  return this.eventsRegistry[eventname].push(callback);
}

Events.prototype.off = function (eventname, callback) {
  var i, callbacks = this.eventsRegistry[eventname];

  if (typeof callbacks === 'undefined') {
    return false;
  }

  for (i = 0; i < callbacks.length; i++) {
    if (callbacks[i] === callback) {
      return callbacks.splice(i, 1);
    }
  }

  return false;
}

Events.prototype.trigger = function (eventname, args) {
  args = slice.call(arguments);
  eventname = args.shift();

  var callbacks = this.eventsRegistry[eventname];
  var host = this;

  if (typeof callbacks === 'undefined') {
    return this;
  }

  callbacks.forEach(function (callback, index) {
    setTimeout(function () {
      callback.apply(host, args);
    }, 0);
  });

  return this;
}

Events.prototype.triggerSync = function (eventname, args) {
  args = slice.call(arguments);
  eventname = args.shift();

  var callbacks = this.eventsRegistry[eventname];
  var host = this;

  if (typeof callbacks === 'undefined') {
    return this;
  }

  callbacks.forEach(function (callback, index) {
    callback.apply(host, args);
  });

  return this;
}
