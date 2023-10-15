const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const api = require('./routes/api');

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/', api)

api.get("/", (req, res) => {
    res.send("Hello!!");
  });

// app.get('*/',(req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// })

module.exports = app