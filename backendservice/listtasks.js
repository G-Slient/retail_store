const mongoDbService = require('../backendservice/mongodbservice')
const bodyParser = require('body-parser')
const authHandler = require('./authhandler'); 
const commonService=require('../backendservice/common');

exports.getAllTaskManagementOperation = (app) => {
    

    app.get('/retrieve', bodyParser.json(), (request, response) => {
        var cutoff = new Date();
        mongoDbService.assets.find({endDate:{$gte:cutoff}})
            
            .sort({endDate:1})
            .then(val => {
                console.log(val);
                response.json(val);

            }).catch(err => {
                console.error("retrieveretrieve operation in errr"+err);
            })

    });
    
}
