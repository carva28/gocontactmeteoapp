const request = require('request');
const cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var fs = require("fs");
app.use(cors());
const bcrypt = require('bcrypt');

const users = []

exports.todosusers = function (req, res) {
    res.json(users);
}

exports.registo = async function (req, res) {
    var todos, dataTodos;
    fs.readFile('./login.json', 'utf8', async (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        todos = JSON.parse(jsonString)
        //console.log(Object.keys(todos).length)
        dataTodos = Object.keys(todos).length;


        var arrayData = [];

        var totaluser = dataTodos + 1;


        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        var nome = "user" + totaluser;

        var user = {};
        user[nome] = {
            name: req.body.name,
            password: hashedPassword,
        };
        // const user = {
        //     nome: {
        //         name: req.body.name,
        //         password: hashedPassword,
        //     },
        // }
        // //const jsonString = JSON.stringify(user)
        arrayData.push(todos, user);
        console.log(arrayData);
        const jsonString2 = JSON.stringify(arrayData, null, 2)
        console.log(jsonString2)

        fs.writeFileSync('./login.json', jsonString2, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
                res.send({ message: 'utilizador inserido' })
            }
        })
    })


}

exports.login = async function (req, res) {
    var username, user, password;
    fs.readFile('./login.json', 'utf8', async (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        user = JSON.parse(jsonString)
        //FAZER FOOR LOOPPPP
        var dataall = Object.keys(user).length;
        for (var i = 1; i <= dataall; i++) {
            var nome = "user" + i;

            console.log(user[nome])
            if (user[nome].name === req.body.name) {
                console.log(user[nome].name)
                username = user[nome].name;
                password = user[nome].password;
                try {
                    if (await bcrypt.compare(req.body.password, password)) {
                        res.send({ message: 'Success' })
                    } else {
                        res.send('Not Allowed')
                    }
                } catch {
                    res.status(500).send()
                }
                break;
            } else {
                if (dataall < i) {
                    console.log('erro');
                    username = user[nome].name;
                    password = user[nome].password;
                    if (username == null) {
                        return res.status(400).send('Cannot find user')
                    }
                    try {
                        if (await bcrypt.compare(req.body.password, password)) {
                            res.send({ message: 'Success' })
                        } else {
                            res.send('Not Allowed')
                        }
                    } catch {
                        res.status(500).send()
                    }
                } else if (dataall == i) {
                    console.log('erro');
                    username = user[nome].name;
                    password = user[nome].password;
                    if (username == null || username !== req.body.name) {
                        return res.status(400).send('Cannot find user')
                    }
                    try {
                        if (await bcrypt.compare(req.body.password, password)) {
                            res.send({ message: 'Success' })
                        } else {
                            res.send('Not Allowed')
                        }
                    } catch {
                        res.status(500).send()
                    }
                    break;
                }


            }
        }

    })








    // const user = users.find(user => user.name === req.body.name)
    // if (user == null) {
    //     return res.status(400).send('Cannot find user')
    // }
    // try {
    //     if (await bcrypt.compare(req.body.password, user.password)) {
    //         res.send({ message: 'Success' })
    //     } else {
    //         res.send('Not Allowed')
    //     }
    // } catch {
    //     res.status(500).send()
    // }
}


exports.temperatura = function (req, res) {
    var city = req.body.cidade;
    var i = 0, j = 0;
    var verifica = 0;
    var arrayTempo = [], arrayHorasSunrise = [], arrayHorasSunset = [];
    for (i = 0; i < city.length; i++) {
        console.log(city[i]);

        request('http://api.openweathermap.org/data/2.5/weather?q=' + city[i] + '&units=metric&appid=74bf24768501a41ba7a1d66c2054a799', { json: true }, (err, res, body) => {
            if (err) {

                return callback(err);

            } else {
                if (!body.main) {
                    return verifica = 1;
                } else {
                    arrayTempo.push(body.main.temp);
                }


            }
        });

    }

    for (i = 0; i < city.length; i++) {
        request('https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_astronomy&name=' + city[i] + '&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg', { json: true }, (err, res, body) => {
            if (err) {

                return callback(err);

            } else {

                if (!body.astronomy.astronomy) {
                    return verifica = 1;
                } else {
                    arrayHorasSunset.push(body.astronomy.astronomy[0].sunset);
                    arrayHorasSunrise.push(body.astronomy.astronomy[0].sunrise);
                }
            }
        });

    }



    const timer = setTimeout(() => {
        if (verifica == 1) {
            res.send({ erro: 'Cidade não existe' })
        } else {
            console.log(arrayTempo);
            res.send({
                tempo: arrayTempo,
                cidade: city,
                horassunset: arrayHorasSunset,
                horassunrise: arrayHorasSunrise
            })
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