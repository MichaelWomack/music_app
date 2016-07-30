'use strict';

let jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     let token = req.body.token || req.param('token') || req.headers['x-access-token'];
//     if (token) {
//         jwt.verify(token, secret, (err, decoded) => {
//             if (err)
//                 return res.status(403).send({
//                     sucess: false,
//                     message: 'Failed to authenticate token.'
//                 });
//             else {
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//     } else {
//         return res.status(403).send({
//             sucess: false,
//             message: 'No token provided'
//         });
//     }
// }
