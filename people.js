//exports.Person = function(first, last, age, eyecolor) {
function Person(first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eyecolor;
    //return this;
}
exports.Person = Person;

//exports.Person.prototype.nationality = 'English';
Person.prototype.nationality = 'English';

//exports.Person.prototype.name = function() {
Person.prototype.name = function() {
	return (this.firstName ? this.firstName : '') + ' ' + (this.lastName ? this.lastName : '');
};

//exports.Person.prototype.Brasileiro = function() {
Person.prototype.Brasileiro = function() {
	this.nationality = 'Brazilian';
}
// function Brasileiro() {

// }
// exports.Brasileiro = Brasileiro;
// Brasileiro.prototype = new Person();
// Brasileiro.prototype.nationality = 'Brazilian';

var john = new Person('John');
console.log(john);
console.log(john.name());
console.log(john.nationality);

var joao = new Person('Joao'); //.then(Brasileiro);
joao.Brasileiro();
console.log(joao);
console.log(joao.name());
console.log(joao.nationality);