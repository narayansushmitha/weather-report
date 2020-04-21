const express = require("express");
const app = express();
const https = require('https');
const apiKey ="8a832a3ae72e4dc50801b7cf45c88954";
const units="metric";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?q=";
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    var location = req.body.location;
    const weatherURL = apiUrl+location+'&appid='+apiKey+'&units='+units;
    console.log(weatherURL);
    https.get(weatherURL,function (response) {
    response.on("data",function(data){
      const weatherData=  JSON.parse(data);
      const temp =weatherData.main.temp;
      const iconurl="https://openweathermap.org/img/wn/"+ weatherData.weather[0].icon+"@2x.png";
      console.log(weatherData);
      res.write("<h1>The temperature in "+location+" is "+temp+"</h1>");
      res.write("<img src="+iconurl+">");
      res.send();
  });
  });
  });



app.listen(3000, function(){
  console.log("server is running");
});
