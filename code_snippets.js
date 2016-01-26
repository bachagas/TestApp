var _ = require('lodash');

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
				function (x) {return primer(x[field]);} :
				function (x) {return x[field];};

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
				fieldsArray.forEach(function () {
					reverse.push(_reverse[0]);
				});
			} else {
				throw new Error('compareBy(): reverse should be [boolean] of the same size of fields[] or one single boolean value.');
			}
		} else { //just a single value
			fieldsArray.forEach(function () {
				reverse.push(_reverse);
			});
		}
	}

	var keys = [];
	fieldsArray.forEach(function (element, index) {
		keys[index] = primersArray[index] ?
						function (x) {return primersArray[index](x[element]);} :
						(primersArray[0] ? function (x) {return primersArray[0](x[element]);} :
											function (x) {return x[element];});
		reverse[index] = [1, -1][+!!reverse[index]]; //forces to be -1 or 1: //[1, -1][+!!_reverse];
	});

	return function (a, b) {
		function helper(_a, _b, _index) {
			if (_index >= fieldsArray.length) {
				return 0;
			} else {
				var valA = keys[_index](_a);
				var valB = keys[_index](_b);
				//var temp = ((valA > valB) - (valB > valA));
				var temp = (valA) ? ( valB ? ((valA > valB) - (valB > valA)) : 1 ) : (valB ? -1 : 0);
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

/**
*
*  Javascript string pad
*  http://www.webtoolkit.info/
*
**/
// took from: http://stackoverflow.com/questions/2686855/is-there-a-javascript-function-that-can-pad-a-string-to-get-to-a-determined-leng
var STR_PAD_RIGHT = 1;
var STR_PAD_LEFT = 2;
var STR_PAD_BOTH = 3;

function pad(_len, _char, _dir) {
	var str = this;
	if (typeof _len == 'undefined') { _len = 0; }
	if (typeof _char == 'undefined') { _char = ' '; }
	if (typeof _dir == 'undefined') {
		_dir = STR_PAD_RIGHT;
    } else {
		if (_.isNumber(_dir) && ( _dir < 1 || _dir > 3)) {
			_dir = STR_PAD_RIGHT;
		} else if (_.isString(_dir)) {
			switch (_dir.toUpperCase()) {
				case 'CENTER':
				case 'BOTH':
					_dir = STR_PAD_BOTH;
					break;
				case 'LEFT':
					_dir = STR_PAD_LEFT;
					break;
				case 'RIGHT':
				default:
					_dir = STR_PAD_RIGHT;
					break;
			}
		}
	}
	var padLen;
    if (_len + 1 >= str.length) {
        switch (_dir) {
            case STR_PAD_LEFT:
                str = Array(_len + 1 - str.length).join(_char) + str;
                break;
            case STR_PAD_BOTH:
                var right = Math.ceil((padLen = _len - str.length) / 2);
                var left = padLen - right;
                str = Array(left + 1).join(_char) + str + Array(right + 1).join(_char);
                break;
            default:
                str = str + Array(_len + 1 - str.length).join(_char);
                break;
        } // switch
    }
    return str;
}
String.prototype.pad = pad;

function toFileNameFormat() {
	/*return this.toISOString().			//ex: 2015-01-14T18:33:35.029Z
				replace(/-/g, '').		// replace all - with nothing
				replace(/:/g, '').		// replace all : with nothing
				replace(/T/, '_').		// replace T with a _
				replace(/\..+/, '');	// delete the dot and everything after*/
	return this.getFullYear().toString().pad(4, '0', 'left') +
			this.getMonth().toString().pad(2, '0', 'left') +
			this.getDay().toString().pad(2, '0', 'left') + '_' +
			this.getHours().toString().pad(2, '0', 'left') +
			this.getMinutes().toString().pad(2, '0', 'left') +
			this.getSeconds().toString().pad(2, '0', 'left');
}
Date.prototype.toFileNameFormat = toFileNameFormat;

//Add utility functions to Array objects
// Warn if overriding existing method
if (!!Array.prototype.equals) {
	console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
}

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array1, array2) {
	// if the other array is a falsy value, return
	if (!array1 || !array2)
		return false;

	// compare lengths - can save a lot of time
	if (array1.length != array2.length)
		return false;

	for (var i = 0, l=array1.length; i < l; i++) {
		// Check if we have nested arrays
		if (array1[i] instanceof Array && array2[i] instanceof Array) {
			// recurse into the nested arrays
			if (!_.arrayEquals(array1[i], array2[i]))
				return false;
		} else if (array1[i] != array2[i]) {
			// Warning - two different object instances will never be equal: {x:20} != {x:20}
			return false;
		}
	}
	return true;
}

// Warn if overriding existing method
if (!!Array.prototype.flatten) {
	console.warn("Overriding existing Array.prototype.flatten. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
}

// attach the .flatten method to Array's prototype to call it on any array
Array.prototype.flatten = function (deep) {
	return this.reduce(function (acc, elem) {
		if (deep && elem instanceof Array) return acc.concat(elem.flatten(deep));
		else return acc.concat(elem);
	}, []);
}

// Warn if overriding existing method
if (!!Array.prototype.humanizedJoin) {
	console.warn("Overriding existing Array.prototype.humanizedJoin. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
}

// attach the .humanizedJoin method to Array's prototype to call it on any array
Array.prototype.humanizedJoin = function (separator, beforeLast, afterFirst) {
	if (arguments.length < 2) return this.flatten(true).join(separator); //return standard Array.join result
	beforeLast = beforeLast || separator;
	afterFirst = afterFirst || separator;

	return this.flatten(true).reduce(function (acc, elem, index, array) {
		var sep = separator;
		if (index == 1) sep = afterFirst;
		if (index == array.length - 1) sep = beforeLast;
		if (index == 0) sep = '';
		return acc + sep + elem;
	}, '');
}
