var jwt = require('jsonwebtoken');
var appconfig = require('./../config/appConfig');
const mongoDbService = require('../backendservice/mongodbservice')
const bodyParser = require('body-parser')
const authHandler = require('./authhandler')


exports.gettasksTypes =function (request, response)
{
  console.log("inside tasktypes")
  
  data=['Hackathon','ML Competition','Hiring','Others'];

  response.json(data);  
}


exports.gettaskwebsites =function (request, response)
{
  console.log("inside gettaskwebsites")
  
  data=['Skillenze','Tech Gig','Hacker Earth','Analytics Vidya','Kaggle','Others'];

  response.json(data);  
}
  


