var should = require('should');

//Testing for Brasileiro class:
var Brasileiro = require('../brasileiro.js');
describe('People', function() {
	describe('#Brasileiro()', function() {
		var joaoSilva = new Brasileiro('Joao', 'Silva', 36, 'castanho');
		console.log(joaoSilva);
		it('should return an object', function() {
			//joaoSilva.should.be.an.Object;
			joaoSilva.should.be.type('object');
		});
		it('should return a person object', function() {
			joaoSilva.should.be.instanceOf(Brasileiro, 'Brasileiro');
		});
		it('should have a first name', function() {
            joaoSilva.should.have.property('firstName', 'Joao');
		});
		it('should have a last name', function() {
            joaoSilva.should.have.property('lastName', 'Silva');
		});
		it('should have an age', function() {
            joaoSilva.should.have.property('age', 36);
		});
		it('should have an eye color', function() {
            joaoSilva.should.have.property('eyeColor', 'castanho');
		});
		it('should have a default nationality', function() {
			joaoSilva.should.have.property('nationality', 'Brazilian');
		});
		it('should have a name method that returns the full name', function() {
			//joaoSilva.should.have.property('name').be.a.Function;
			joaoSilva.name.should.be.type('function');
            joaoSilva.name().should.equal('Joao Silva');
		});
	});
});
