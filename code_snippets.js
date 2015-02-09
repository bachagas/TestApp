//"anti circular error" stringify:
function safeStringify(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
            // Circular reference found, discard key
            return '[Circular]';
        }
        // Store value in our collection
        cache.push(value);
    }
    return value;
};
exports.safeStringify=safeStringify;

//Reusable compare function to sort objects by any field - to be used with Array.sort(compareFunction):
function compareByField(field, reverse, primer) {
   var key = primer ? 
			   function(x) {return primer(x[field])} : 
			   function(x) {return x[field]};

   reverse = [1, -1][+!!reverse];

   return function (a, b) {
	   a = key(a); b = key(b);
	   return reverse * ((a > b) - (b > a));
	 } 
}
exports.compareByField=compareByField;

//Same function extended to allow sort by multiple fields:
function compareBy(_fields, _reverse, _primers) {
	
	var fieldsArray = [];
	var primersArray = [];
	if (_fields.constructor === Array) fieldsArray = _fields;
	else fieldsArray.push(_fields); //just a single field
	if (_primers) {
		if (_primers.constructor === Array) 
			if (_primers.length === fieldsArray.length || _primers.length === 1) primersArray = _primers;
			else throw new Error("compareBy(): primers should be [] of the same size of fields[] or one single function.");
		else primersArray.push(_primers); //just a single function
	}
	//console.log(fieldsArray.length);
	var keys = [];
	fieldsArray.forEach(function(element, index, array){
		keys[index] = primersArray[index] ? 
						function(x) {return primersArray[index](x[element])} :
					   (primersArray[0] ? function(x) {return primersArray[0](x[element])} : 
										  function(x) {return x[element]});
	});
	//console.log(keys);
	var reverse = [1, -1][+!!_reverse];
	return function (a, b) {
		function helper(_a,_b,_index) {
			//console.log(_a + " " + _b + " " + _index);
			//console.log(fieldsArray.length);
			if (_index >= fieldsArray.length) return 0;
			else {
				var val_a = keys[_index](_a);
				var val_b = keys[_index](_b);
				//console.log(val_a + " " + val_b + " " + _index);
				//console.log(reverse);
				var temp = ((val_a > val_b) - (val_b > val_a));
				//console.log(temp);
				if (temp !== 0) return reverse * temp;
				else return helper(_a,_b,_index+1);
			}
		}
		return helper(a,b,0);
	}
};
exports.compareBy=compareBy;

/*
//Tests:
a = {name:"a",a:1,b:1,c:1};
b = {name:"b",a:2,b:1,c:1};
c = {name:"c",a:2,b:2,c:1};
d = {name:"d",a:2,b:1,c:1};
e = {name:"e",a:1,b:1,c:2};

console.log(compareBy);
//compare pairs:
var f = compareBy(['a','b','c']);
f(a,b); //-1
f(a,e); //-1
f(b,a); //1
f(e,a); //1
f(b,d); //0
f(d,b); //0
f(b,c); //-1
f(c,b); //1
f(e,b); //-1 ==> e < b

f = compareBy(['c','b','a']);
f(e,b); //1 ==> e > b

//ordering by ['a','b','c'] should return objects in this order of obj.name: "a", "e", "b", "d", "c"
data = [a,b,c,d,e];
console.log(data);
result = data.sort(compareBy(['a','b','c']));      //"a", "e", "b", "d", "c"
console.log(result);
data.sort(compareBy('name'));      //"a", "b", "c", "d", "e"
data.sort(compareBy(['a','b','c'],true)); //"c", "b", "d", "e", "a" - Note: sort performs a stable sort, which will always preserve the original order
data.sort(compareBy(['a','b','c'],false,[function(x) {return -x},function(x) {return -x},function(x) {return -x}])); //"c", "b", "d", "e", "a"
data.sort(compareBy(['a','b','c'],true,[function(x) {return -x},function(x) {return -x},function(x) {return -x}]));  //"a", "e", "b", "d", "c"
data.sort(compareBy(['name','a','b','c'],true,[function(x) {return -x},function(x) {return -x},function(x) {return -x}]));  //Error: compareBy(): primers should be [] of the same size of fields[] or one single function.
data.sort(compareBy(['name','a','b','c'],false));  //"a", "b", "c", "d", "e"
data.sort(compareBy(['name','a','b','c'],true,[function(x) {return x}]));  //"a", "b", "c", "d", "e"
data.sort(compareBy(['name','a','b','c'],false,function(x) {return x}));  //"a", "b", "c", "d", "e"
data.sort(compareBy(['name','a','b','c'],false,[function(x) {return x},function(x) {return x},function(x) {return x},function(x) {return x}]));  //"a", "b", "c", "d", "e"
data.sort(compareBy(['name','a','b','c'],true,[function(x) {return x},function(x) {return x},function(x) {return x},function(x) {return x}]));  //"e", "d", "c", "b", "a"
*/

