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

/**
 * Recursively calculates the sum of numbers from 1 to n.
 * Uses recursion by adding `n` to the sum of `n-1` until it reaches 0.
 *
 * ### Limitations:
 *  - Stack Overflow Risk: Calling this function with a very large `n` (e.g., `sum_to_n_b(100000)`) may cause a stack overflow.
 * 
 * @param {number} n - The number up to which summation is performed.
 * @returns {number} - The summation of integers from 1 to n.
 */
var sum_to_n_b = function(n) {
    // Base case: If n is 0 or negative, return 0
    if (n < 1) {
        return 0;
    }

    // Recursive step: n + sum of (n-1)
    return n + sum_to_n_b(n - 1);
};

/**
 * Calculates the sum of numbers from 1 to n using the arithmetic sum formula.
 * The formula is: sum = (n * (n + 1)) / 2
 *
 * @param {number} n - The number up to which summation is performed.
 * @returns {number} - The summation of integers from 1 to n.
 */
var sum_to_n_c = function(n) {
    // Handle negative or zero input
    if (n < 1) { 
        return 0;
    }
    
    // Use the arithmetic formula
    return (n * (n + 1)) / 2;
};