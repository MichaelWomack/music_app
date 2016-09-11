'use strict';

let mongoUtil = require('./../mongoUtil');
let multer = require('multer');
let audioUploads = './uploads/audio/';
let fs = require('fs');

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log("In audio destination function...");

        let audioPath = `${audioUploads}${req.params.artist_id}`;
        fs.exists(audioPath, (exists) => {
            if (!exists) {
                fs.mkdir(audioPath, (err) => {
                    if (err) console.log("ERROR: " + err);
                    req.params.url = `${audioPath.substr(1)}/${file.originalname}`;
                    callback(null, audioPath);
                });
            }
        });

    },

    filename: (req, file, callback) => {
        console.log('In audio filename function...');
        callback(null, file.originalname);
    }
});

let upload = multer({storage: storage});


module.exports = (app, express) => {
    let router = express.Router();

    router.get('/:artist_id', (req, res) => {
        let tracks = mongoUtil.tracks();
        let artistId = mongoUtil.toObjectId(req.params.artist_id);

        tracks.find({artist_id: artistId}).toArray((err, trackDocs) => {
            if (err) res.json({success: false, message: err});
            res.json(trackDocs);
        });
    });

    router.put('/:id', (req, res) => {
        let updatedInfo = req.body;
        let tracks = mongoUtil.tracks();
    });

    router.post('/:artist_id', (req, res) => {
        upload.single('file')(req, res, (err) => {
            console.log("Track upload request made successfully");
            if (err) res.json({success: false, message: err});

            else {
                let trackInfo = req.body;
                console.log("TRACK INFO: " + JSON.stringify(trackInfo) );
                trackInfo.url = req.params.url;
                let tracks = mongoUtil.tracks();
                console.log("Artist ID: " + req.params.artist_id);
                trackInfo.artist_id = mongoUtil.toObjectId(req.params.artist_id);
                console.log("Artist ID: " + trackInfo.artist_id);
                tracks.insert(trackInfo, (err, result) => {
                    if (err) res.json({success: false, message: err});
                    res.json({success: true, message: `Successfully uploaded ${trackInfo.name}.`});
                });
            }
        });
    });

    return router;
};