const express = require('express');
const ficheiroPedidos = require('./calls');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors())
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
   });
   

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/distritos', ficheiroPedidos.distrito);

app.post('/api/tempo', ficheiroPedidos.temperatura);


const PORT = process.env.PORT || 8080

app.listen(PORT, function() {
 console.log('Server running on:'+PORT);
});