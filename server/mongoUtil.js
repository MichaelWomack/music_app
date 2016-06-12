'use strict';

let mongo = require('mongodb');
let client = mongo.MongoClient;
let objectId = mongo.ObjectId;
let _db;

let config = {
  host: 'localhost',
  db: 'musicApp'
}

module.exports = {
  connect() {
    client.connect(`mongodb://${config.host}:/${config.db}`, (err, db) => {
      if (err) {
        console.log('Error connecting to mongo -- check mongod connection');
        process.exit(1);
      }

      _db = db;
      console.log('Successfully connected to Mongo');
    });
  },

  users() {
    return _db.collection('users');
  },

  artists() {
    return _db.collection('artists');
  },

  toObjectId(id) {
    return new ObjectId(id);
  },

  isValidObjectId(id) {
    return toObjectId(id).length == 24;
  }
}
