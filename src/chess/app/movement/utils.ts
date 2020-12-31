/**
 * Finds the nearest value in an array of numbers.
 * Example: nearestValue(array, 42)
 *
 * @param {Array<number>} arr
 * @param {number} val the ideal value for which the nearest or equal should be found
 */
export const nearestValue = (arr, val) => arr.reduce((p, n) => (Math.abs(p) > Math.abs(n - val) ? n - val : p), Infinity) + val;

