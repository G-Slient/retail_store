var jwt = require('jsonwebtoken');
var config = require('./../config/appConfig');

function loginCheck(req, res, next) {
    if (req.headers && req.headers.authorization) {
        console.log("req.headers.authorization.split(' ')[1]"+req.headers.authorization.split(' ')[1])
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwtSecret, function (err, decode) {
            if (err) {
                return res.status(401).json({ message: "Unauthorized!" })
            }
            else {
                //Do need to check user Role
                req.user = decode;
                next();
            }
        })
    }
    else {
        return res.status(401).json({ message: "Unauthorized!" })
    }
};

module.exports = loginCheck;