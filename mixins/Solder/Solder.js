// Solder ======================================================================
function Solder () {
  if (!(this instanceof Solder)) { return new Solder(); }
  this.constructors = {};
}

Solder.prototype = {
  setMixin: function (name, constructor) { this.constructors[name] = constructor; },

  injectMixins: function (names, ctrl) {
    if (typeof names === 'string') { names = [names]; }
    for (var i = 0, len = names.length; i < len; i += 1) {
      ctrl[names[i]] = new this.constructors[names[i]](ctrl);
    }
  }
};