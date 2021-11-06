const {Sequelize} = require('sequelize');

const sqlite = new Sequelize({
    dialect: `${process.env.type_data}`,
    host: `${process.env.location_data}`,
    logging: false
})

sqlite.sync().then(() => {console.log('Sqlite Is Ready!')}).catch(err => {console.log(err)});

module.exports = sqlite;