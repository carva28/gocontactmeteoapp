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
    var verifica=0;
    var arrayTempo=[],arrayHorasSunrise=[],arrayHorasSunset=[];
    for(i=0;i<city.length;i++){
        console.log(city[i]);
        
        request('http://api.openweathermap.org/data/2.5/weather?q=' + city[i] + '&units=metric&appid=74bf24768501a41ba7a1d66c2054a799', { json: true }, (err, res, body) => {
        if (err) {
            
            return callback(err);
           
        } else {
            if(!body.main){
                return verifica=1;
            }else{
                arrayTempo.push(body.main.temp);
            }
            
            
        }
        });

    }

    for(i=0;i<city.length;i++){        
        request('https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_astronomy&name=' + city[i] + '&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg', { json: true }, (err, res, body) => {
        if (err) {
            
            return callback(err);
           
        } else {
            
            if(!body.astronomy.astronomy){
                return verifica=1;
            }else{
                arrayHorasSunset.push(body.astronomy.astronomy[0].sunset);
                arrayHorasSunrise.push(body.astronomy.astronomy[0].sunrise);
            }
        }
        });

    }

    

    const timer = setTimeout(() => {
        if(verifica==1){
            res.send({erro:'Cidade não existe'})
        }else{
            console.log(arrayTempo);
            res.send({
                tempo:arrayTempo,
                cidade:city,
                horassunset:arrayHorasSunset,
                horassunrise:arrayHorasSunrise})
        }
        
      }, 1000);
    
    
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