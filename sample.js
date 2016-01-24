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

console.log('Array.prototype.flatten(deep):');
console.log([1,2,3].flatten());
console.log([[1],2,3].flatten());
console.log([[1,2,3]].flatten());
console.log([[1,2,[3]]].flatten());
console.log([[1,2,[3]]].flatten(true));
console.log([[1,2,[3, [4,5]]]].flatten());
console.log([1,2,[3, [4,5]]].flatten());
console.log([[1,2,[3, [4,5]]]].flatten(true));

// Warn if overriding existing method
if (!!Array.prototype.humanizedJoin) {
    console.warn("Overriding existing Array.prototype.humanizedJoin. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
}

// attach the .humanizedJoin method to Array's prototype to call it on any array
Array.prototype.humanizedJoin = function (separator, beforeLast, afterFirst) {
    if (arguments.length < 2) return this.join(separator); //return standard Array.join result
    beforeLast = beforeLast || separator;
    afterFirst = afterFirst || separator;

    return this.flatten(true).reduce(function (acc, elem, index, array) {
        var sep = separator;
        if (index == 0) sep = '';
        if (index == 1) sep = afterFirst;
        if (index == array.length - 1) sep = beforeLast;
        return acc + sep + elem;
    }, '');
}

console.log();
console.log('Array.prototype.humanizedJoin(separator, beforeLast, afterFirst):');
console.log('A more humanized join() function for Javascript Arrays:');
console.log('[1,2,3].humanizedJoin(\', \', \' and \') =', [1,2,3].humanizedJoin(', ', ' and '));
console.log('[1,2,3].humanizedJoin(\', \', undefined, \' and \') =', [1,2,3].humanizedJoin(', ', undefined, ' and '), '- works with the first element too');
console.log('[1,2,3].humanizedJoin(\', \', \' and \', \' and \') =', [1,2,3].humanizedJoin(', ', ' and ', ' and '), '- or with both first and last elements');
console.log('[1,2,[3,4,[5,[6]]]].humanizedJoin(\', \', \' and \', \' and \') =', [1,2,[3,4,[5,[6]]]].humanizedJoin(', ', ' and ', ' and '), '- and even with nested arrays ;-)');
