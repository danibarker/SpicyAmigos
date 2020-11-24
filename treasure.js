require = require("esm")(module);
var Combo = require("js-combinatorics");

let valueList = []

// random treasure values seed
for (let n = 0; n < 20; n++) {
    valueList.push(Math.floor(Math.random() * 300))
}
distribution_generator(valueList)

function distribution_generator(values) {
    min_value = sum(values) / 4 - 1
    max_value = sum(values) / 4 + 1
    let distributions = []
    let treasureIndexes = []
    for (let i = 1; i <= values.length; i++) {
        treasureIndexes.push(i)
    }
    const treasurePerPerson = values.length/4

    let final_possible_distributions = []
    
    
    
    function generate_possible_distributions(treasure, depth = 0) {
        
        let possible_distributions = []
        let possible_distributions_combo = new Combo.Combination(treasure, treasurePerPerson)
        for (let distribution of possible_distributions_combo) {
            possible_distributions.push(distribution)
        }
        //filter out all distributions that fall outside the constraints
        possible_distributions = possible_distributions.filter((distribution) => distribution_in_range(distribution, min_value, max_value))
            
            for (let distribution of possible_distributions) {

                // looping through the distributions of the lowest remaining treasure (by index)
                if (distribution[0] == min(treasure)) {
                    // filter the treasure out from future choices
                    const leftover = treasure.filter((choice) => !distribution.includes(choice))
                    // if there is more treasure left to distribute than each person gets
                    if (leftover.length > treasurePerPerson) {
                        distributions[depth] = distribution
                        // recursively generate distributions from the leftover treasure
                        generate_possible_distributions(leftover, depth + 1)
                    } else {
                        const final_distribution = []
                        for (let d of distributions) {
                            final_distribution.push(d)
                        }
                        // push the last distribution into the array
                        final_distribution.push([...distribution])
                        final_distribution.push(leftover) // the treasure left over makes the last distribution
                        // push this full distribution to the list of possible choices
                        final_possible_distributions.push(final_distribution)
                            

                        
                    }
                }
            }
            
        
    }

    function distribution_in_range(distribution, minD, maxD) {

        let sum = calculate_distribution_value(distribution)
        return (sum > minD && sum < maxD)
    }
    function calculate_distribution_value(distribution) {
        let sum = 0
        for (member of distribution) {
            sum += values[member - 1]
        }
        return sum
    }

    
   

   
    

    generate_possible_distributions(treasureIndexes)

    // filter through the chosen distributions to find the best one
    
    let min_diff = 10000
    let best_choice
    for (possibility of final_possible_distributions) {
        let distribution_value = possibility.map((team) => calculate_distribution_value(team))
        diff = max(distribution_value) - min(distribution_value)
        if (diff < min_diff) {
            min_diff = diff
            best_choice = possibility
        }
        
    }

    console.log(best_choice, min_diff)
}

// helper functions
function sum(array) {
    return array.reduce(function (a, b) { return a + b; }, 0);
}

function min(array) {
    return Math.min(...array)
}
function max(array) {
    return Math.max(...array)
}
