'use strict';

let mongoUtil = require('../mongoUtil');
let secret = require('../config').secret;

module.exports = (app, express) => {
    let router = express.Router();

    router.get('/', (req, res) => {
        let artists = mongoUtil.artists();

        artists.find({}).toArray((err, artists) => {
            if (err) res.json({
                success: false,
                message: err
            });
            res.json(artists);
        });
    });

    router.get('/id/:id', (req, res) => {
        let id = req.params.id;
        let artists = mongoUtil.artists();

        if (mongoUtil.isValidObjectId(id))
            artists.find({
                _id: mongoUtil.toObjectId(id)
            }).limit(1).next((err, artist) => {
                if (err) res.json({
                    success: false,
                    message: err
                });
                res.json(artist);
            });
        else
            res.json({
                success: false,
                message: 'Invalid object id'
            });
    });

    router.put('/id/:id', (req, res) => {
      let id = req.params.id;
      let update = req.body;
      let artists = mongoUtil.artists();

      if (mongoUtil.isValidObjectId(id)) {
        artists.save({_id: mongoUtil.toObjectId(id)}, update, (err, result) => {
            if (err) res.json({success: false, message: err});
            res.json({success: true, result: result});
        });
      } else {
        res.json({success: false, message: 'Invalid object Id.'})
      }
    });

    router.get('/name/:name', (req, res) => {
        let name = req.params.name;
        let artists = mongoUtil.artists();

        artists.find({ name: name }).toArray((err, artist) => {
            if (err) res.json({
                success: false,
                message: err
            });
            res.json(artist);
        });
    });

    return router;
}
