const {config} = require('dotenv');
config();
const express = require("express");
const app = express();
const sqlite = require('./Apps/database/database');
const Sqlite = require('./Apps/routes/sqlite.route');

app.use(express.json());

app.use('/data', Sqlite);

app.listen(3000, () => {
    console.log("app is running");
});