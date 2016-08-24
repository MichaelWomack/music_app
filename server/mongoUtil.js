'use strict';

let mongo = require('mongodb');
let client = mongo.MongoClient;
let ObjectId = mongo.ObjectId;
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
  
  tracks() {
    return _db.collection('tracks');
  },

  toObjectId(id) {
    return new ObjectId(id);
  },

  isValidObjectId(id) {
    return this.toObjectId(id).toString().length == 24;
  },

  createObjectId() {
    return new ObjectId();
  }
}
