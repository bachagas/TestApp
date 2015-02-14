//"anti circular error" stringify:
var cache = [];
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
}
exports.safeStringify = safeStringify;

//Reusable compare function to sort objects by any field - to be used with Array.sort(compareFunction):
function compareByField(field, reverse, primer) {
   var key = primer ?
				function(x) {return primer(x[field]);} :
				function(x) {return x[field];};

   reverse = [1, -1][+!!reverse];

   return function (a, b) {
		a = key(a); b = key(b);
		return reverse * ((a > b) - (b > a));
	};
}
exports.compareByField = compareByField;

//Same function extended to allow sort by multiple fields:
function compareBy(_fields, _reverse, _primers) {
	var fieldsArray = [];
	var primersArray = [];
	if (_fields.constructor === Array) {
		fieldsArray = _fields;
	} else {
		fieldsArray.push(_fields); //just a single field
	}
	if (_primers) {
		if (_primers.constructor === Array) {
			if (_primers.length === fieldsArray.length || _primers.length === 1) {
				primersArray = _primers;
			} else {
				throw new Error('compareBy(): primers should be [] of the same size of fields[] or one single function.');
			}
		} else {
			primersArray.push(_primers); //just a single function
		}
	}

	var reverse = [];
	if (_reverse) {
		if (_reverse.constructor === Array) {
			if (_reverse.length === fieldsArray.length) {
				reverse = _reverse;
			} else if (_reverse.length === 1) { //replicates single value
				fieldsArray.forEach(function() {
					reverse.push(_reverse[0]);
				});
			} else {
				throw new Error('compareBy(): reverse should be [boolean] of the same size of fields[] or one single boolean value.');
			}
		} else { //just a single value
			fieldsArray.forEach(function() {
				reverse.push(_reverse);
			});
		}
	}

	var keys = [];
	fieldsArray.forEach(function(element, index) {
		keys[index] = primersArray[index] ?
						function(x) {return primersArray[index](x[element]);} :
						(primersArray[0] ? function(x) {return primersArray[0](x[element]);} :
											function(x) {return x[element];});
		reverse[index] = [1, -1][+!!reverse[index]]; //forces to be -1 or 1: //[1, -1][+!!_reverse];
	});

	return function (a, b) {
		function helper(_a, _b, _index) {
			if (_index >= fieldsArray.length) {
				return 0;
			} else {
				var valA = keys[_index](_a);
				var valB = keys[_index](_b);
				var temp = ((valA > valB) - (valB > valA));
				if (temp !== 0) {
					return reverse[_index] * temp;
				} else {
					return helper(_a, _b, ++_index);
				}
			}
		}
		return helper(a, b, 0);
	};
}
exports.compareBy = compareBy;
