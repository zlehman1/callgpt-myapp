'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.runSql(`
    ALTER TABLE pharmacy_medications 
    MODIFY available ENUM('Yes', 'No', 'Maybe', 'Unknown') DEFAULT 'Unknown',
    ADD last_inquired TIMESTAMP;
  `);
};

exports.down = function (db) {
  return db.runSql(`
    ALTER TABLE pharmacy_medications 
    MODIFY available ENUM('Yes', 'No', 'Unknown') DEFAULT 'Unknown',
    DROP COLUMN last_inquired;
  `);
};

exports._meta = {
  version: 1,
};
