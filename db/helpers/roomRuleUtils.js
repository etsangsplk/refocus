/**
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * db/helpers/roomRuleUtils.js
 *
 * Used by the Room Rule model.
 */

const ValidationError = require('../dbErrors').ValidationError;
const maxNest = 0;
const maxLogic = 2;

/**
 * Confirms that the array is non-null and has two elements.
 *
 * @param {Array} arr - The array to test
 * @returns {undefined} - OK
 * @throws {InvalidRangeSizeError} if the array does not contain two elements
 */
function singleLineLogic(obj) {
  Object.keys(obj).forEach((key, index) => {
    // key: the name of the object key
    // index: the ordinal position of the key within the object
    if (index !== maxNest) {
      throw new ValidationError();
    }
    if ((key !== '>') || (key !== '<') || (key !== 'like') || (key !== '==')) {
      throw new ValidationError();
    }
    if ((!Array.isArray(obj[key])) || (obj[key].length !== maxLogic)) {
      throw new ValidationError();
    }
  });
}

/**
 * Confirms that the array is non-null and has two elements.
 *
 * @param {Array} arr - The array to test
 * @returns {undefined} - OK
 * @throws {InvalidRangeSizeError} if the array does not contain two elements
 */
function combinationOperator(arr) {
  if (Array.isArray(arr)) {
    throw new ValidationError();
  }
  for (let i = 0; i < arr.length; i++){
    if (arr[i] !== null && typeof arr[i] === 'object'){
      Object.keys(arr[i]).forEach((key) => {
        if ((key === 'AND') || (key === 'OR')) {
          combinationOperator(arr[i][key]);
        } else {
          singleLineLogic(arr[i]);
        }
      });
    } else {
      throw new ValidationError();
    }
  }
}


/**
 * Confirms that the array is non-null and has two elements.
 *
 * @param {Array} arr - The array to test
 * @returns {undefined} - OK
 * @throws {InvalidRangeSizeError} if the array does not contain two elements
 */
function keyMatch(obj) {
  Object.keys(obj).forEach((key, index) => {
    // key: the name of the object key
    // index: the ordinal position of the key within the object
    if (index !== maxNest) {
      throw new ValidationError();
    }
    if ((key === 'AND') || (key === 'OR')) {
      combinationOperator(obj[key]);
    }
  });
}


/**
 * Custom validation rule for the status range fields confirms that value
 * provided is a two-element array, does not contain nested arrays, does not
 * contain objects, and its elements are in ascending order.
 *
 * @param {Array} arr - The array to test
 * @returns {undefined} - OK
 * @throws {InvalidRangeSizeError}
 * @throws {InvalidRangeValuesError}
 */
function validateJSONCriteria(obj) {
  keyMatch(obj);
} // validateStatusRange

module.exports = {
  validateJSONCriteria,
}; // exports
