const express = require('express');
const ficheiroPedidos = require('./calls');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/tempo', ficheiroPedidos.temperatura);


const PORT = process.env.PORT || 8080

app.listen(PORT, function() {
 console.log('Server running on:'+PORT);
});