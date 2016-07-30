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

    router.get('/:id', (req, res) => {
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

    router.get('/:name', (req, res) => {
        let name = req.params.name;
        let artists = mongoUtil.artists();

        artists.find({
            name: name
        }).toArray((err, artist) => {
            if (err) res.json({
                success: false,
                message: err
            });
            res.json(artist);
        });
    });

    // router.use((req, res, next) => {
    //   console.log("Used middleware in artists API!!!!");
    //   let token = req.body.token || req.params.token || req.headers['x-access-token'];
    //   if (token) {
    //     jwt.verify(token, secret, (err, decoded) => {
    //       if (err)
    //         return res.status(403).send({
    //             sucess: false,
    //             message: 'Failed to authenticate token.'
    //         });
    //       else {
    //         req.decoded = decoded;
    //         next();
    //       }
    //     });
    //   }
    //   else {
    //     return res.status(403).send({
    //       sucess: false,
    //       message: 'No token provided'
    //     });
    //   }
    // });

    return router;
}
