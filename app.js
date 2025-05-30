const express = require('express');
const app = express();
const rutas = require('./routes');
require('dotenv').config();

app.use(express.json());
app.use('/api', rutas);

module.exports = app;
