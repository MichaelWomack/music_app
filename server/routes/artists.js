'use strict';

let mongoUtil = require('../mongoUtil');
let secret = require('../config').secret;
let multer = require('multer');
let fs = require('fs');
let imagesPath = './uploads/images/';

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log("In the destination function");
        callback(null, imagesPath);
    },

    filename: (req, file, callback) => {
        console.log("IN the filename function");
        //check for existence of original profile image and delete for consistency. **Figure out naming**
        let ext = file.originalname.split('.').pop();
        let name = `${req.params.id}_${file.originalname}`;
        req.params.fileName = name;
        callback(null, name);
    }
});

let upload = multer({storage: storage});

let deleteFileIfExists = (filePath) => {
    fs.exists(filePath, (exists) => {
        if (exists) {
            fs.unlink(filePath, (err) => {
                console.log(err);
            });
            console.log(filePath + " EXISTS!!!!");
        }
        else console.log(filePath + " DOESN'T EXIST!!!");
    });
};


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


    router.put('/upload/:id', (req, res) => {
        upload.single('file')(req, res, (err) => {
            console.log("Request made successfully...");
            if (err) res.json({success: false, message: err});

            else {
                let id = req.params.id;
                let artists = mongoUtil.artists();
                let originalFilePath;

                // Get previous file path if exists
                artists.find({_id: mongoUtil.toObjectId(id)}).limit(1).next((err, artist) => {
                    if (err) console.log(err);
                    console.log("ARTIST: " + JSON.stringify(artist) + " id: " + id);
                    if (artist.imageUrl)
                        originalFilePath = `${imagesPath}${artist.imageUrl.split('\/').pop()}`;
                    console.log("IS THIS CORRECT : " + originalFilePath);
                });

                console.log("File name: " + req.params.fileName);
                artists.update({_id: mongoUtil.toObjectId(id)}, {$set: {"imageUrl": `/uploads/images/${req.params.fileName}`}}, (err, result) => {
                    if (err) res.json({success: false, message: err});

                    // remove previous file from uploads if exists
                    if (originalFilePath) {
                        deleteFileIfExists(originalFilePath);
                    }
                    res.json({success: true, message: "Successfully uploaded image."});
                });
            }
        });
    });

    router.put('/id/:id', (req, res) => {
        let id = req.params.id;
        let update = req.body;
        let artists = mongoUtil.artists();

        delete update['_id'];
        console.log("Artist Info: " + JSON.stringify(update));
        if (mongoUtil.isValidObjectId(id)) {
            artists.replaceOne({_id: mongoUtil.toObjectId(id)}, update, (err, result) => {
                if (err) res.json({success: false, message: err});

                else {
                    console.log(JSON.stringify(result));
                    res.json({success: true, result: result});
                }
            });
        } else {
            res.json({success: false, message: 'Invalid object Id.'});
        }
    });

    router.get('/name/:name', (req, res) => {
        let name = req.params.name;
        let artists = mongoUtil.artists();

        artists.find({name: name}).toArray((err, artist) => {
            if (err) res.json({
                success: false,
                message: err
            });
            res.json(artist);
        });
    });

    return router;
};
