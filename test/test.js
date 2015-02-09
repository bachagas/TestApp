var should = require('should');


//Just learning Mocha:
describe('Just learning Mocha - Array', function(){
	describe('#indexOf()', function(){
    	it('should return >0 when the value is present', function(){
	        [1,2,3].indexOf(2).should.exactly(1);
		});
    	it('should return -1 when the value is not present', function(){
            [1,2,3].indexOf(5).should.equal(-1);
		})
	})
})

var util = require('../code_snippets.js');
var compareBy = util.compareBy;
var a = {name:"a",a:1,b:1,c:1};
var b = {name:"b",a:2,b:1,c:1};
var c = {name:"c",a:2,b:2,c:1};
var d = {name:"d",a:2,b:1,c:1};
var e = {name:"e",a:1,b:1,c:2};

describe('My functions', function(){
	describe('#compareBy()', function(){
		it('should have been loaded', function(){
	        util.compareBy.should.be.type('function');
		});

		it('f(a,b) should return < 0 if a < b', function(){
			compareBy(['a','b','c'])(a,b).should.lessThan(0);
		});
		it('f(b,a) should return > 0 if b > a', function(){
			compareBy(['a','b','c'])(b,a).should.greaterThan(0);
		});
		it('f(a,a) should return 0', function(){
			compareBy(['a','b','c'])(a,a).should.equal(0);
		});
		it('f(e,b) should return < 0 if e < b', function(){
			compareBy(['a','b','c'])(e,b).should.lessThan(0);
		});
		it('f(e,b) should return > 0 when compared by last attribute (e > b)', function(){
			compareBy(['c','b','a'])(e,b).should.greaterThan(0);
		});
	});

	describe('#sorting using compareBy()', function(){
		it('should do a basic sort by a single field', function() {
			[b,e,c,a,d].sort(compareBy('name')).should.eql([a,b,c,d,e]);     //"a", "b", "c", "d", "e"
		});
		it('should do a basic sort by a single field in reverse order', function() {
			[b,e,c,a,d].sort(compareBy('name',true)).should.eql([e,d,c,b,a]);     //"a", "b", "c", "d", "e"
		});
		it('should do a basic sort by more than one field', function() {
			[c,b,a].sort(compareBy(['a','b','c'])).should.eql([a,b,c]);      //"a", "e", "b", "d", "c"
		});
		it('should do a stable sort by more than one field (preserves original order)', function() {
			[a,b,c,d,e].sort(compareBy(['a','b','c'])).should.eql([a,e,b,d,c]);      //"a", "e", "b", "d", "c"
		});
		it('should do a stable sort by more than one field in reverse order', function() {
			[a,b,c,d,e].sort(compareBy(['a','b','c'], true)).should.eql([c,b,d,e,a]); //"c", "b", "d", "e", "a"
		});
		it('can use primers functions', function() {
			[a,b,c,d,e].sort(compareBy(['a','b','c'],false,[function(x) {return -x},function(x) {return -x},function(x) {return -x}]))
				.should.eql([c,b,d,e,a]); //"c", "b", "d", "e", "a"
		});
		it('can use primers functions and reverse order', function() {
			[a,b,c,d,e].sort(compareBy(['a','b','c'],true,[function(x) {return -x},function(x) {return -x},function(x) {return -x}]))
			.should.eql([a,e,b,d,c]);  //"a", "e", "b", "d", "c"
		});
		it('can use a single primer function for all properties', function() {
			[a,b,c,d,e].sort(compareBy(['name','a','b','c'],true,function(x) {return x}))
				.should.eql([e,d,c,b,a]); //"e", "d", "c", "b", "a"
		});
		it('can use a single primer function for all properties passed as an a one element array', function() {
			[a,b,c,d,e].sort(compareBy(['name','a','b','c'],true,[function(x) {return x}]))
				.should.eql([e,d,c,b,a]); //"e", "d", "c", "b", "a"
		});
		it('can use different primers functions for each propertie passed as an array of functions', function() {
			[e,d,c,b,a].sort(compareBy(['name','a','b','c'],false,[function(x) {return x},function(x) {return x+1},function(x) {return x+2},function(x) {return x+3}]))
				.should.eql([a,b,c,d,e]); //"a", "b", "c", "d", "e"
		});
		it('should throw error if number of primers is greater than 1 and differs from number of properties', function() {
			(function() { //should be wraped inside a function to get the throw error
				[a,b,c,d,e].sort(compareBy(['name','a','b','c'],true,[function(x) {return x},function(x) {return x}]))
			}).should.throw();
		});
	});
})