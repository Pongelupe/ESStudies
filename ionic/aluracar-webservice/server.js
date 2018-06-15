const express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , cors = require('cors');

const extractIpParameter = () => 
    process.argv[2] ? process.argv[2] : 'localhost';

const ip = extractIpParameter();
app.set('ip', ip);    

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

require('./api')(app);

app.listen(8080, () => 
    console.log(`Servidor rodando em http://${ip}:8080`));