/**
 * Created by michaelwomack on 9/6/16.
 */
'use strict';

const mongoUtil = require('../mongoUtil');

module.exports = (app, express) => {
    let router = express.Router();
    
    router.get('/', (req, res) => {
        res.send("Where are all the albums?");
    });
    
    return router;
}; 