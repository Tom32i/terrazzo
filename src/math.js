/**
 * Get random element in the given array
 *
 * @param {Array} array
 *
 * @return {mixed}
 */
Math.randomElement = function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get randow int between the given boundaries
 *
 * @param {Number} min
 * @param {Number} max
 *
 * @return {Number}
 */
Math.randomInt = function randomInt(min = 0, max = 1) {
    return Math.round(Math.random() * (max - min)) + min;
}

/**
 * Get a random ration between base - margnitude and base + margnitude
 *
 * @param {Number} magnitude
 * @param {Number} base
 *
 * @return {Number}
 */
Math.randomModificator = function randomModificator(magnitude, base = 0) {
    return base + (Math.random() * magnitude - (magnitude / 2));
}

/**
 * Calculate distance between two points
 *
 * @param {Array} A
 * @param {Array} B
 *
 * @return {Number}
 */
Math.dist = function dist(A, B) {
    return Math.sqrt(Math.pow(A[0] - B[0], 2) + Math.pow(A[1] - B[1], 2));
}
