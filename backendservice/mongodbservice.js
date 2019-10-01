const mongoose = require('mongoose');
const appConfig = require('../config/appConfig');

const shortid = require('shortid');
require('../schema/task');
const assetModel = mongoose.model('assets'); 

///mongoDbStart

module.exports.connectMongoDb=function(){

    mongoose.connect(appConfig.db.uri);

    mongoose.connection.on('error', function (err) {
      console.log('database connection error');
      console.log(err)
      //process.exit(1)
    }); // end mongoose connection error
    
    mongoose.connection.on('open', function (err) {
      if (err) {
        console.log("database error");
        console.log(err);
     
      } else {
        console.log("database connection open success");
       
      }
      //process.exit(1)
    });
}

module.exports.shortId=shortid;
module.exports.assets=assetModel;
