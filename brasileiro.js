var first, last, age, eyecolor;

function Brasileiro(_first, _last, _age, _eyecolor) {
	//People.Person(first, last, age, eyecolor);
	//this.__proto__ = new require('./people.js').Person(first, last, age, eyecolor);
	first = _first;
	last = _last;
	age = _age;
	eyecolor = _eyecolor;
}
exports.Brasileiro = Brasileiro;
Brasileiro.prototype = new require('./people.js').Person(first, last, age, eyecolor);
Brasileiro.prototype.nationality = 'Brazilian';

var j = new Brasileiro('jose');
console.log(j);