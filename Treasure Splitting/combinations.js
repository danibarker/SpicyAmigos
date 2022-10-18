require = require("esm")(module);
var Combo = require("js-combinatorics");
let array = [1,2,3,4]

let combinations = new Combo.Combination(array, 2)

for (combo of combinations) {
    console.log(combo)
}

