/**
 * Module dependencies
 */

var linkstash = require('linkstash');
var assert = require('assert');

/**
 * Prototype.
 */

var burl = Burl.prototype;

/**
 * Expose `burl`.
 */

module.exports = Burl;

/**
 * Create a new `burl` instance.
 *
 * @param {Object} opts
 *   @prop {Function} previous
 *   @prop {Function} next
 *   @prop {Function} normalize
 * @return {Self}
 * @api public
 */

function Burl(opts) {
  if (!(this instanceof Burl)) return new Burl(opts);

  assert(!opts || 'object' == typeof opts, 'burl: opts should be an object');

  opts = opts || {};
  this._prev = opts.previous || function(val) {return val};
  this._next = opts.next || function(val) {return val};

  this._stash = opts.normalize
    ? linkstash(opts.normalize)
    : linkstash();

  return this;
}

/**
 * Set.
 *
 * @param {Object} newLinks
 *   @prop {String} previous
 *   @prop {String} next
 * @api public
 */

burl.set = function(newLinks) {
  assert('object' == typeof newLinks, 'burl: newLinks should be an object');
  this._stash.set(newLinks);
};

/**
 * Get.
 *
 * @api public
 */

burl.get = function() {
  var nw = {};
  var links = this._stash.get();

  nw.previous = this._prev(links.previous);
  nw.next = this._next(links.next);

  return nw;
};
