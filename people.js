/* Alguns testes com Orientação a Objetos em Javascript.
 * Boas referência sobre orientação a objetos em Javascript:
 * - http://ejohn.org/blog/simple-javascript-inheritance/
 * - Livro: http://www.amazon.com/Secrets-JavaScript-Ninja-John-Resig/dp/193398869X/ref=pd_sim_b_1?ie=UTF8&refRID=1Q0SV4H4W6WVWMDAAV1Y
 * - Livro: http://www.amazon.com/dp/1593275404/ref=wl_it_dp_o_pC_nS_ttl?_encoding=UTF8&colid=1B1S3MS4XJDP1&coliid=IP2O80V9B5VO3
 */

 var _ = require('lodash');

//exports.Person = function(first, last, age, eyecolor) {
function Person(first, last, age, eyecolor) {
//module.exports = function (first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eyecolor;
    //return this;
    //this.nationality = 'English';
    this.name = function() {
		return (this.firstName ? this.firstName : '') + ' ' + (this.lastName ? this.lastName : '');
	};
}
//exports.Person = Person;
module.exports = Person;

//exports.Person.prototype.nationality = 'English';
Person.prototype.nationality = 'English';
//module.exports.prototype.nationality = 'English';

//exports.Person.prototype.name = function() {
Person.prototype.fullDescription = function() {
//module.exports.prototype.name = function() {
	var text = '';
	var i = 0;
	for (var prop in this) {
		if (!_.isFunction(this[prop])) {
			if (this[prop]) {
				if (i++ !== 0) { text += ', '; }
				text += (this[prop] ? this[prop] : '');
			}
		}
	}
	return text;
 };

//exports.Person.prototype.Brasileiro = function() {
//Person.prototype.Brasileiro = function() {
// module.exports.prototype.Brasileiro = function() {
// 	this.nationality = 'Brazilian';
// };
function Brasileiro() {
//function Brasileiro(first, last, age, eyecolor) {
	//this.prototype = new Person(first, last, age, eyecolor);
	//this.prototype = new Person();
	this.nationality = 'Brazilian';
}
//exports.Brasileiro = Brasileiro;
Brasileiro.prototype = new Person();
// Brasileiro.prototype.nationality = 'Brazilian';

console.log('\n*****');
console.log('Testando classe Person:');
var john = new Person('John');
//var john = new module.exports('John');
console.log(john);
console.log(john.name());
console.log(john.nationality);
console.log(john.fullDescription());

console.log('\n*****');
console.log('Testando classe Brasileiro:');
var joao = new Brasileiro(); //TODO: Chamar o construtor da classe pai de alguma maneira para setar os atributos
//joao.Person('Joao');
//joao.Brasileiro();
console.log(joao);
console.log(joao.name());
console.log(joao.nationality);
console.log(joao.fullDescription());
