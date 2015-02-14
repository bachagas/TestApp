/* Alguns testes com Orientação a Objetos em Javascript.
 * Boas referência sobre orientação a objetos em Javascript:
 * - http://ejohn.org/blog/simple-javascript-inheritance/
 * - Livro: http://www.amazon.com/Secrets-JavaScript-Ninja-John-Resig/dp/193398869X/ref=pd_sim_b_1?ie=UTF8&refRID=1Q0SV4H4W6WVWMDAAV1Y
 * - Livro: http://www.amazon.com/dp/1593275404/ref=wl_it_dp_o_pC_nS_ttl?_encoding=UTF8&colid=1B1S3MS4XJDP1&coliid=IP2O80V9B5VO3
 */

var Person = require('./people.js');
//var first, last, age, eyecolor;
var _super;

function Brasileiro(_first, _last, _age, _eyecolor) {
	//People.Person(first, last, age, eyecolor);
	//this.__proto__ = new require('./people.js').Person(first, last, age, eyecolor);
	//TODO: Apesar de chamar o construtor da classe pai, as propriedades que ele executa não são enxergadas pela classe filha
	_super = new Person(_first, _last, _age, _eyecolor);
	//A não ser que vc as defina explicitamente:
	this.firstName = _first;
	this.lastName = _last;
	this.age = _age;
	this.eyeColor = _eyecolor;
	this.nationality = 'Brazilian';
}
module.exports = Brasileiro;
Brasileiro.prototype = new Person();
//Brasileiro.prototype.nationality = 'Brazilian';

console.log('\n*****');
console.log('Testando classe Brasileiro:');
var joao = new Brasileiro('Joao');
//joao.Person('Joao');
//joao.Brasileiro();
console.log(joao);
console.log(joao.name());
console.log(joao.nationality);
console.log(joao.fullDescription());
