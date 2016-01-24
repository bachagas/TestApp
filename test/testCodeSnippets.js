require('should');

//Just learning Mocha:
describe('Just learning Mocha - Array', function () {
	describe('#indexOf()', function () {
		it('should return >0 when the value is present', function () {
			[1, 2, 3].indexOf(2).should.exactly(1);
		});
		it('should return -1 when the value is not present', function () {
            [1, 2, 3].indexOf(5).should.equal(-1);
		});
	});
});

var util = require('../code_snippets.js');
var compareBy = util.compareBy;
var a = {name: 'a', a: 1, b: 1, c: 1};
var b = {name: 'b', a: 2, b: 1, c: 1};
var c = {name: 'c', a: 2, b: 2, c: 1};
var d = {name: 'd', a: 2, b: 1, c: 1};
var e = {name: 'e', a: 1, b: 1, c: 2};
var u = {name: undefined, a: undefined, b: undefined};

describe('My functions', function () {
	describe('#compareBy()', function () {
		it('should have been loaded', function () {
			util.compareBy.should.be.type('function');
		});

		it('f(a,b) should return < 0 when a < b', function () {
			compareBy(['a', 'b', 'c'])(a, b).should.lessThan(0);
		});
		it('f(b,a) should return > 0 when b > a', function () {
			compareBy(['a', 'b', 'c'])(b, a).should.greaterThan(0);
		});
		it('f(x,x) should return 0 for any x', function () {
			compareBy(['a', 'b', 'c'])(a, a).should.equal(0);
			compareBy(['a', 'b', 'c'])(b, b).should.equal(0);
			compareBy(['a', 'b', 'c'])(c, c).should.equal(0);
			compareBy(['a', 'b', 'c'])(d, d).should.equal(0);
			compareBy(['a', 'b', 'c'])(e, e).should.equal(0);
		});
		it('f(e,b) should return < 0 when e < b', function () {
			compareBy(['a', 'b', 'c'])(e, b).should.lessThan(0);
		});
		it('f(e,b) should return > 0 when compared by last attribute (e > b)', function () {
			compareBy(['c', 'b', 'a'])(e, b).should.greaterThan(0);
		});
		it('f(u,x) should return < 0 when u is undefined, for any x', function () {
			compareBy(['name', 'a', 'b', 'c'])(u, a).should.lessThan(0);
			compareBy(['name', 'a', 'b', 'c'])(u, b).should.lessThan(0);
			compareBy(['name', 'a', 'b', 'c'])(u, c).should.lessThan(0);
			compareBy(['name', 'a', 'b', 'c'])(u, d).should.lessThan(0);
			compareBy(['name', 'a', 'b', 'c'])(u, e).should.lessThan(0);
			compareBy(['c'])(u, a).should.lessThan(0);
		});
		it('f(x,u) should return > 0 when u is undefined, for any x', function () {
			compareBy(['name', 'a', 'b', 'c'])(a, u).should.greaterThan(0);
			compareBy(['name', 'a', 'b', 'c'])(b, u).should.greaterThan(0);
			compareBy(['name', 'a', 'b', 'c'])(c, u).should.greaterThan(0);
			compareBy(['name', 'a', 'b', 'c'])(d, u).should.greaterThan(0);
			compareBy(['name', 'a', 'b', 'c'])(e, u).should.greaterThan(0);
			compareBy(['c'])(a, u).should.greaterThan(0);
		});
		it('f(u,u) should return 0 when u is undefined, for any x', function () {
			compareBy(['name', 'a', 'b', 'c'])(u, u).should.equal(0);
			compareBy(['property does not exist'])(a, a).should.equal(0);
		});
	});

	describe('#sorting using compareBy()', function () {
		it('should do a basic sort by a single field', function () {
			[b, e, c, a, d].sort(compareBy('name')).should.eql([a, b, c, d, e]);     //"a", "b", "c", "d", "e"
		});
		it('should do a basic sort by a single field in reverse order', function () {
			[b, e, c, a, d].sort(compareBy('name', true)).should.eql([e, d, c, b, a]);     //"a", "b", "c", "d", "e"
		});
		it('should do a basic sort by more than one field', function () {
			[c, b, a].sort(compareBy(['a', 'b', 'c'])).should.eql([a, b, c]);      //"a", "e", "b", "d", "c"
		});
		it('should do a stable sort (preserves original order)', function () {
			[a, b, c, d, e].sort(compareBy('a')).should.eql([a, e, b, c, d]);      //"a", "e", "b", "c", "d"
		});
		it('should do a stable sort by more than one field (preserves original order)', function () {
			[a, b, c, d, e].sort(compareBy(['a', 'b', 'c'])).should.eql([a, e, b, d, c]);      //"a", "e", "b", "d", "c"
		});
		it('should do a stable sort by more than one field in reverse order', function () {
			[a, b, c, d, e].sort(compareBy(['a', 'b', 'c'], true)).should.eql([c, b, d, e, a]); //"c", "b", "d", "e", "a"
		});
		it('should do a stable sort even when using functions primers', function () {
			[a, b, c, d, e].sort(compareBy(['a'], [false], [function (x) {return x;}])).should.eql([a, e, b, c, d]); //"a", "e", "b", "c", "d"
			[a, b, c, d, e].sort(compareBy(['a'], [false], [function (x) {return -x;}])).should.eql([b, c, d, a, e]);
			[a, b, c, d, e].sort(compareBy(['a'], [true], [function (x) {return -x;}])).should.eql([a, e, b, c, d]); //"a", "e", "b", "c", "d"
		});
		it('should do a stable sort even when some field is undefined', function () {
			[a, b, c, d, e, u].sort(compareBy(['a'], [false], [function (x) {return x;}])).should.eql([u, a, e, b, c, d]);
			[a, b, u, c, d, e].sort(compareBy(['a'], [false], [function (x) {return -x;}])).should.eql([u, b, c, d, a, e]);
			[a, b, c, u, d, e].sort(compareBy(['a'], [true], [function (x) {return -x;}])).should.eql([a, e, b, c, d, u]); //"a", "e", "b", "c", "d"
		});
		it('can use different orders for different properties passed as an array of booleans', function () {
			[a, b, c, d, e].sort(compareBy(['a', 'b', 'c'], [false, true, false]))
				.should.eql([a, e, c, b, d]); //"a", "e", "c", "b", "d"
			[a, b, c, d, e].sort(compareBy(['a', 'b', 'c'], [false, false, false]))
				.should.eql([a, e, b, d, c]); //"a", "e", "b", "d", "c"
			[a, b, c, d, e].sort(compareBy(['a', 'b', 'c'], [true, true, true]))
				.should.eql([c, b, d, e, a]); //"c", "b", "d", "e", "a"
			[a, b, c, d, e].sort(compareBy(['a', 'b', 'c'], [true, true, false]))
				.should.eql([c, b, d, a, e]); //"c", "b", "d", "a", "e"
			[a, b, c, d, e].sort(compareBy(['a', 'b', 'c'], [true, false, true]))
				.should.eql([b, d, c, e, a]); //"b", "d", "c", "e", "a"
		});
		it('can use a single reverse flag for all properties passed as one single boolean', function () {
			[a, b, c, d, e].sort(compareBy(['name', 'a', 'b', 'c'], true, [function (x) {return x;}]))
				.should.eql([e, d, c, b, a]); //"e", "d", "c", "b", "a"
		});
		it('can use a single reverse flag for all properties passed as an a one element array', function () {
			[a, b, c, d, e].sort(compareBy(['name', 'a', 'b', 'c'], [true], [function (x) {return x;}]))
				.should.eql([e, d, c, b, a]); //"e", "d", "c", "b", "a"
		});
		it('should throw error if number of reverse flags is greater than 1 and differs from number of properties', function () {
			(function () { //should be wraped inside a function to get the throw error
				[a, b, c, d, e].sort(compareBy(['a', 'b', 'c'], [true, false]));
			}).should.throw();
		});
		it('can use primers functions', function () {
			[a, b, c, d, e].sort(compareBy(['a', 'b', 'c'], false, [function (x) {return -x;}, function (x) {return -x;}, function (x) {return -x;}]))
				.should.eql([c, b, d, e, a]); //"c", "b", "d", "e", "a"
		});
		it('can use primers functions and reverse order', function () {
			[a, b, c, d, e].sort(compareBy(['a', 'b', 'c'], true, [function (x) {return -x;}, function (x) {return -x;}, function (x) {return -x;}]))
			.should.eql([a, e, b, d, c]);  //"a", "e", "b", "d", "c"
		});
		it('can use a single primer function for all properties', function () {
			[a, b, c, d, e].sort(compareBy(['name', 'a', 'b', 'c'], true, function (x) {return x;}))
				.should.eql([e, d, c, b, a]); //"e", "d", "c", "b", "a"
		});
		it('can use a single primer function for all properties passed as an a one element array', function () {
			[a, b, c, d, e].sort(compareBy(['name', 'a', 'b', 'c'], true, [function (x) {return x;}]))
				.should.eql([e, d, c, b, a]); //"e", "d", "c", "b", "a"
		});
		it('can use different primers functions for each propertie passed as an array of functions', function () {
			[e, d, c, b, a].sort(compareBy(['name', 'a', 'b', 'c'], false, [function (x) {return x;}, function (x) {return x++;}, function (x) {return x + 2;}, function (x) {return x + 3;}]))
				.should.eql([a, b, c, d, e]); //"a", "b", "c", "d", "e"
		});
		it('should throw error if number of primers is greater than 1 and differs from number of properties', function () {
			(function () { //should be wraped inside a function to get the throw error
				[a, b, c, d, e].sort(compareBy(['name', 'a', 'b', 'c'], true, [function (x) {return x;}, function (x) {return x;}]));
			}).should.throw();
		});
	});

	describe('#Array.prototype.flatten', function () {
		it('should return itself', function () {
			[1, 2, 3].flatten().should.eql([1,2,3]);
		});
		it('should unfold the first element', function () {
			[[1], 2, 3].flatten().should.eql([1,2,3]);
		});
		it('should unfold the first and the second element', function () {
			[[1, 2], 3].flatten().should.eql([1,2,3]);
		});
		it('should unfold all elements', function () {
			[[1, 2, 3]].flatten().should.eql([1,2,3]);
		});
		it('should unfold the first and the second element, but not the third element', function () {
			[[1, 2, [3]]].flatten().should.eql([1,2,[3]]);
		});
		it('should unfold all elements', function () {
			[[1, 2, [3, 4, [5]]]].flatten(true).should.eql([1,2,3,4,5]);
		});
	});

	describe('#Array.prototype.humanizedJoin', function () {
		it('should return standard join', function () {
			[1,2,3].humanizedJoin(', ').should.eql('1, 2, 3');
		});
		it('should return an "and" before the last element', function () {
			[1,2,3].humanizedJoin(', ', ' and ').should.eql('1, 2 and 3');
		});
		it('should return an "and" after the first element', function () {
			[1,2,3].humanizedJoin(', ', undefined, ' and ').should.eql('1 and 2, 3');
		});
		it('should return an "and" after the first and before the last element', function () {
			[1,2,3,4].humanizedJoin(', ', ' and ', ' and ').should.eql('1 and 2, 3 and 4');
		});
		it('should return standard join (with nested arrays)', function () {
			[1,2,3].humanizedJoin(', ').should.eql('1, 2, 3');
		});
		it('should return an "and" before the last element (with nested arrays)', function () {
			[1,2,[3,4]].humanizedJoin(', ', ' and ').should.eql('1, 2, 3 and 4');
		});
		it('should return an "and" after the first element (with nested arrays)', function () {
			[[1,2],3,4].humanizedJoin(', ', undefined, ' and ').should.eql('1 and 2, 3, 4');
		});
		it('should return an "and" after the first and before the last element (with nested arrays)', function () {
			[[1,2],3,[4,5]].humanizedJoin(', ', ' and ', ' and ').should.eql('1 and 2, 3, 4 and 5');
		});
		it('should return an "and" after the first and before the last element (with nested arrays in the middle)', function () {
			[1,[2,3,4],5].humanizedJoin(', ', ' and ', ' and ').should.eql('1 and 2, 3, 4 and 5');
		});
	});
});
