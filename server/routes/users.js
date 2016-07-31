'use strict';

let mongoUtil = require('./../mongoUtil');
let secret = require('../config').secret
let router = require('express').Router();

// Chain together some of these using router.route().post().get() etc...
module.exports = (app, express) => {
    router.get('/', (req, res) => {
        let users = mongoUtil.users();
        users.find({}).toArray((err, users) => {
            if (err) res.json({
                success: false,
                message: err
            });
            res.json(users);
        })
    });

    router.get('/me', (req, res) => {
        let users = mongoUtil.users();
        let userInfo = req.decoded;
        users.find({email: userInfo.email}).limit(1).next((err, user) => {
          if (err) res.json({success: false, message: err});
          res.json(user);
        });
    });

    router.get('/:id', (req, res) => {
        let userId = req.params.id;
        let users = mongoUtil.users();

        if (mongoUtil.isValidObjectId(userId)) {
            users.find({
                _id: mongoUtil.toObjectId(userId)
            }).limit(1).next((err, doc) => {
                if (err) res.json({
                    success: false,
                    message: err
                });
                res.json(doc);
            });
        } else {
            console.log(`Object Id ${userId} is invalid\n`);
            res.send(`Object Id ${userId} is invalid\n`);
        }
    });

    router.delete('/:email', (req, res) => {
        let email = req.params.email;
        let users = mongoUtil.users();

        users.deleteOne({
            email: email
        }, (err, result) => {
            if (err) res.send(err);
            res.json(result);
        });
    });

    return router;
}
