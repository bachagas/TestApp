var should = require('should');

//Testing for Person class:
var Person = require('../people.js');
describe('People', function() {
	describe('#Person()', function() {
		var johnSimith = new Person('John', 'Smith', 36, 'brown');
		console.log(johnSimith);
		it('should return an object', function() {
			//johnSimith.should.be.an.Object;
			johnSimith.should.be.type('object');
		});
		it('should return a person object', function() {
			johnSimith.should.be.instanceOf(Person, 'Person');
		});
		it('should have a first name', function() {
            johnSimith.should.have.property('firstName', 'John');
		});
		it('should have a last name', function() {
            johnSimith.should.have.property('lastName', 'Smith');
		});
		it('should have an age', function() {
            johnSimith.should.have.property('age', 36);
		});
		it('should have an eye color', function() {
            johnSimith.should.have.property('eyeColor', 'brown');
		});
		it('should have a default nationality', function() {
			johnSimith.should.have.property('nationality', 'English');
		});
		it('should have a name method that returns the full name', function() {
			//johnSimith.should.have.property('name').be.a.Function;
			johnSimith.name.should.be.type('function');
            johnSimith.name().should.equal('John Smith');
		});
	});
});
