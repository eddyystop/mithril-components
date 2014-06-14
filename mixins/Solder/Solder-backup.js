// Solder ======================================================================
// Pimple inspired dependency injection. Fork of gist.github.com/elfet/11349215
function Solder () {
  if (!(this instanceof Solder)) { return new Solder(); }
  this.values = {};
  this.factories = {};
  this.constructors = {};
}

Solder.prototype = {

  setMixin: function (name, constructor) {
    this.constructors[name] = constructor;
  },

  injectMixins: function (names, ctrl) {
    if (typeof names === 'string') { names = [names]; }
    for (var i = 0, len = names.length; i < len; i += 1) {
      ctrl[names[i]] = new this.constructors[names[i]](ctrl);
    }
  },

  set: function (name, factory) {
    if (typeof factory === 'function') { this.factories[name] = factory; }
    else { this.values[name] = factory; }
  },

  get: function (name, context) {
    if (this.constructors[name]) { return new this.constructors[name](context); }
    if (this.values[name] === undefined) { this.values[name] = this.factories[name](this); }
    return this.values[name];
  },

  extend: function (name, fcn) {
    var factory = this.factories[name];
    if (factory === undefined) { throw new Error('Factory "' + name + '" not found.'); }

    this.factories[name] = function (solder) {
      return fcn(factory(solder), solder);
    };
  }
};