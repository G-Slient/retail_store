const mongoDbService = require('../backendservice/mongodbservice')
const bodyParser = require('body-parser')
const authHandler = require('./authhandler'); 
const commonService=require('../backendservice/common');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;



exports.getAllpastTaskManagementOperation = (app) => {
    

    app.get('/retrieverules', bodyParser.json(), (request, response) => {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                console.log("Done!");
                data=JSON.parse(xhttp.responseText)
                console.log(JSON.parse(xhttp.responseText));
                response.json(data);
            }
            
            };	

                url = "http://192.168.43.68:5000/assoc_rules"
                xhttp.open("GET", url, true);
                xhttp.send();
    });
    
}
