const _ = require('underscore');

const findKey = (obj,value, compare = (a, b) => a === b) => {
	return Object.keys(obj).find(k => compare(obj[k], value))
}

var testObj = {"1": "a", "2": "b"}

console.log(findKey(testObj, "b"));