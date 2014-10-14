/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var burl = require('./index');

/**
 * Test
 */

describe('burl', function() {
  it('should assert input types', function() {
    burl.bind(burl, 123)
      .should.throw('burl: opts should be an object');

    burl.bind(burl)
      .should.not.throw('burl: opts should be an object');
  });

  it('should set default properties', function() {
    var links = burl();

    links._prev.should.be.of.type('function');
    links._next.should.be.of.type('function');
    links._stash.should.be.of.type('object');
  });

  it('should decorator functions', function() {
    var next = function() {};
    var prev = function() {};
    var nlz = function() {};

    var links = burl({
      previous: prev,
      next: next,
      normalize: nlz
    });

    links._prev.should.eql(prev);
    links._next.should.eql(next);
    links._stash._nlz.should.eql(nlz);

    next();
    prev();
    nlz();
  });
});

describe('.set', function() {
  it('should assert input types', function() {
    var links = burl();

    links.set.bind(links, 123)
      .should.throw('burl: newLinks should be an object');

    links.set.bind(links, {})
      .should.not.throw('burl: newLinks should be an object');
  });

  it('should set link values', function() {
    var links = burl();

    links.set({
      previous: '123',
      next: '456'
    });

    links._stash._prev.should.eql('123');
    links._stash._next.should.eql('456');
  });
});

describe('get', function() {
  it('should get stores values', function() {
    var links = burl();
    links._stash._prev = '123';
    links._stash._next = '456';

    var nw = links.get();
    nw.previous.should.eql('123');
    nw.next.should.eql('456');
  });

  it('should call the decorator functions', function() {
    var links = burl({
      previous: function(val) {
        return 'foo' + val
      },
      next: function(val) {
        return 'bar' + val
      }
    });

    links._stash._prev = '123';
    links._stash._next = '456';

    var nw = links.get();
    nw.previous.should.eql('foo123');
    nw.next.should.eql('bar456');
  });
});
