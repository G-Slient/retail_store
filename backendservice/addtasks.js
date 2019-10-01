const mongoose = require('mongoose');
const mongoDbService=require('../backendservice/mongodbservice')
const bodyParser = require('body-parser')
const commonService=require('../backendservice/common');
const authHandler = require('./authhandler'); 

exports.getAllTasksGenerationOperation=(app)=>{
     
      app.post('/gettasktypes',bodyParser.json(), (req, resp) => {
        console.log('getting taskTypes');
        commonService.gettasksTypes(req, resp);
        
      });

      app.post('/gettaskwebsites',bodyParser.json(), (req, resp) => {
        console.log('getting websites');
        commonService.gettaskwebsites(req, resp);
        
      });

      app.post('/savetask',bodyParser.json(), (req, resp)=>{

       var uniquieId= mongoDbService.shortId.generate();
       this.saveTask(req,resp,uniquieId);

     });


    
    }

    exports.saveTask = function (req, resp,uniquieId) {

          let taskDetail = new  mongoDbService.assets(
              {
      
                  "id":  uniquieId,
                  "taskType": req.body.taskType.toUpperCase(),
                  "website": req.body.website.toUpperCase(),
          
                  "tasktitle": req.body.tasktitle.toUpperCase(),
                  "startDate": req.body.startDate,
                
                  "endDate": req.body.endDate,
                  
                  "link": req.body.link,
                  "remarks": req.body.remarks.toUpperCase(),
      
              });
      
      
          console.log('Inside task addition js', taskDetail);
          taskDetail.save((err, data) => {
              if (err) {
                  resp.json("Error while Saving");
                  console.log(err)
      
              } else {
                  resp.json(uniquieId);
                  console.log("Data Saved successfully",data)
              }
          })
      }
      