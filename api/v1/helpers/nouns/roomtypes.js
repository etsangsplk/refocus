/**
 * Copyright (c) 2016, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * api/v1/helpers/nouns/roomtypes.js
 */

const RoomTypes = require('../../../../db/index').RoomTypes;

const m = 'RoomTypes';

module.exports = {
  apiLinks: {
    DELETE: `Delete ${m}`,
    GET: `Retrieve ${m}`,
    PATCH: `Update selected attributes of ${m}`,
    POST: `Create a new ${m}`,
  },
  baseUrl: '/v1/RoomTypes',
  model: RoomTypes,
  modelName: 'RoomTypes',
  nameFinder: 'key',
}; // exports
