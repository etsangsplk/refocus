/**
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * db/model/roomEvent.js
 *
 * Room Events are how bots are supposed to interact with rooms
 * each room event type along with
 */

const assoc = {};

module.exports = function user(seq, dataTypes) {
  const RoomEvent = seq.define('RoomEvent', {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    log: {
      type: dataTypes.STRING,
      allowNull: false,
      comment: 'Readable log line',
    },
    type: {
      type:
        dataTypes.ENUM('LOGGING', 'ACTION', 'DATAUPDATE', 'CONNECT', 'REFRESH'),
      defaultValue: 'LOGGING',
      comment: 'Type of event',
    },
    pendingAction: {
      type: dataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Determines if an pending action is completed',
    },
    dataValue: {
      type: dataTypes.STRING,
      allowNull: true,
      comment: 'Value of data to update',
    },
  }, {
    classMethods: {
      getRoomEventAssociations() {
        return assoc;
      },

      postImport(models) {
        assoc.room = RoomEvent.belongsTo(models.Room, {
          foreignKey: 'roomId',
        });
        assoc.bot = RoomEvent.belongsTo(models.Bot, {
          foreignKey: 'botId',
        });
        assoc.user = RoomEvent.belongsTo(models.User, {
          foreignKey: 'userId',
        });
        assoc.botaction = RoomEvent.belongsTo(models.BotAction, {
          foreignKey: 'actionId',
        });
        assoc.currentbotdata = RoomEvent.belongsTo(models.CurrentBotData, {
          foreignKey: 'botDataId',
        });
        assoc.pendingaction = RoomEvent.belongsTo(models.PendingBotAction, {
          foreignKey: 'pendingId',
        });
      },
    },
    hooks: {

      /**
       * When a publihsed aspect is deleted. Delete its entry in the aspectStore
       * and the sampleStore if any.
       *
       * @param {Aspect} inst - The deleted instance
       */
      afterCreate(inst /* , opts */) {
        if (inst.getDataValue('dataValue')) {
          const test = { log: 'test' };
          seq.models.RoomEvent.create(test);
        }
      }, // hooks.afterCreate
    },
  });
  return RoomEvent;
};

