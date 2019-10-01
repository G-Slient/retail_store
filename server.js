var http = require('http');
var express = require('express');
const app = express();
const path=require('path');
const bodyParser = require('body-parser')
const port=process.env.port || 3000;
app.use(express.static(__dirname+'/dist/tasks'))
const mongoDbService=require('./backendservice/mongodbservice')

http.createServer(app).listen(port);
mongoDbService.connectMongoDb();

const addtasks =require('./backendservice/addtasks');
const listtasks = require('./backendservice/listtasks');
const pasttasks = require('./backendservice/pasttasks');


addtasks.getAllTasksGenerationOperation(app);
listtasks.getAllTaskManagementOperation(app);
pasttasks.getAllpastTaskManagementOperation(app);