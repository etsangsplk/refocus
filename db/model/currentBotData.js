/**
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * db/model/currentBotData.js
 *
 * During a room session bots data will need to be localized
 * so that it can be retrieved quickly in room rule checks.
 * This table will hold the current value for bot data.
 */

const assoc = {};

module.exports = function user(seq, dataTypes) {
  const CurrentBotData = seq.define('CurrentBotData', {
    id: {
      type: dataTypes.UUID,
      primaryKey: true,
      defaultValue: dataTypes.UUIDV4,
    },
    value: {
      type: dataTypes.STRING,
      comment: 'Current value for bot data',
    },
  }, {
    classMethods: {
      getCurrentBotDataAssociations() {
        return assoc;
      },

      postImport(models) {
        assoc.room = CurrentBotData.belongsTo(models.Room, {
          foreignKey: 'roomId',
        });
        assoc.botData = CurrentBotData.belongsTo(models.BotData, {
          foreignKey: 'botDataId',
        });
      },
    },
  });
  return CurrentBotData;
};

