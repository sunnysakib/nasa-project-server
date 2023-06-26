const express = require('express');
const planetsRouter = require('./routes/planets/planets.router');
const app = express();
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const launchesRouter = require('./routes/launches/launches.routers');

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);

// app.get('*/',(req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// })

module.exports = app