const request = require('request');
const cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var fs = require("fs");
app.use(cors());

exports.temperatura = function (req, res) {
    var city = req.body.cidade;
    var i=0,j=0;
    var arrayTempo=[];
    for(i=0;i<city.length;i++){
        console.log(city[i]);
        
        request('http://api.openweathermap.org/data/2.5/weather?q=' + city[i] + '&units=metric&appid=74bf24768501a41ba7a1d66c2054a799', { json: true }, (err, res, body) => {
        //request('http://api.openweathermap.org/data/2.5/weather?q=Porto&units=metric&appid=74bf24768501a41ba7a1d66c2054a799', { json: true }, (err, res, body) => {  
        if (err) {
            return callback(err);
        } else {
            
            arrayTempo.push(body.main.temp);
            //res.send(body);
        }
    });
    }

    const timer = setTimeout(() => {
        console.log(arrayTempo);
        res.send({tempo:arrayTempo,cidade:city})
      }, 400);
    
    
};

exports.distrito = function (req, res) {
    const dataPath = './Data/indica.json';

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        res.send(JSON.parse(data));
    });
};