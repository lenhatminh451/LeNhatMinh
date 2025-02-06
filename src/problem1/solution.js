/**
 * Calculates the sum of all integers from 1 to n.
 * This function uses a loop to accumulate the sum.
 * 
 * @param {number} n - The number up to which summation is performed.
 * @returns {number} - The summation of integers from 1 to n.
 */
var sum_to_n_a = function(n) {
    // Handle negative or zero input
    if (n < 1) {
        return 0;
    }

    let sum = 0;    // Initialize a variable to store the result

    // Loop from 1 to n, and add each value to sum
    for (let i = 1; i <= n; ++i) {
        sum += i;
    }

    return sum;     // Return the final sum
};

var sum_to_n_b = function(n) {
    // your code here
};

var sum_to_n_c = function(n) {
    // your code here
};