'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.runSql(`
    ALTER TABLE pharmacy_medications
    DROP COLUMN IF EXISTS last_inquired;
  `).then(() => db.runSql(`
    ALTER TABLE pharmacy_medications
    ADD COLUMN last_inquired TIMESTAMP DEFAULT NULL;
  `));
};

exports.down = function (db) {
  return db.runSql(`
    ALTER TABLE pharmacy_medications
    DROP COLUMN last_inquired;
  `);
};

exports._meta = {
  'version': 1
};
