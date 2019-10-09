var express = require('express');
var app  = express();
const cors = require('cors');


const PORT = process.env.PORT || 3030 

app.listen(PORT, function() {
 console.log('Server running on:'+PORT);
});
