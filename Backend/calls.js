const request = require('request');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


exports.temperatura = function (req, res) {
    request('http://api.openweathermap.org/data/2.5/weather?q=' + req.body.cidade + '&units=metric&appid=74bf24768501a41ba7a1d66c2054a799', { json: true }, (err, res, body) => {
        //request('http://api.openweathermap.org/data/2.5/weather?q=Porto&units=metric&appid=74bf24768501a41ba7a1d66c2054a799', { json: true }, (err, res, body) => {  
        if (err) {
            return callback(err);
        } else {
            console.log(body.main.temp);
            res.send(body);
        }
    });
};