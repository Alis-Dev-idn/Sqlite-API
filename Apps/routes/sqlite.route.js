const {GetAll, NewData, GetById} = require('../constrollers/sqlite.control');
const express = require('express');

const Sqlite = express.Router();

Sqlite.get('/', GetAll);
Sqlite.get('/get/:id', GetById);
Sqlite.post('/new', NewData);

module.exports = Sqlite;