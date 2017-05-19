/**
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * db/model/roomRule.js
 *
 * Rules are JSON logic structure which have the names of bots, bot
 * actions, and bot data. The criteria will be will be evaluated and
 * the bot action will be executed.
 */

const assoc = {};
const u = require('../helpers/aspectUtils');

module.exports = function user(seq, dataTypes) {
  const RoomRule = seq.define('RoomRule', {
    criteria: {
      type: dataTypes.JSON,
      allowNull: false,
      unique: true,
      validate: {
        logic: u.validateJSONCriteria,
      },
      comment: 'The criteria for a rule in a JSON logic',
    },
  }, {
    classMethods: {
      getRoomRuleAssociations() {
        return assoc;
      },

      postImport(models) {
        assoc.room = RoomRule.belongsTo(models.RoomType, {
          foreignKey: 'roomTypeId',
        });
        assoc.botAction = RoomRule.belongsTo(models.BotAction, {
          foreignKey: 'botActionId',
        });
      },
    },
  });
  return RoomRule;
};

