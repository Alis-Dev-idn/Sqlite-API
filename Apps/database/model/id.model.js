const {Model, DataTypes} = require('sequelize');
const sqlite = require('../database');

const Id = sqlite.define('local-db',{
    localId: {
        primaryKey: true,
        autoIncrement: false,
        type: DataTypes.STRING,
        allowNull: false
    },
    localName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {underscored: false, timestamps: false});
Id.removeAttribute('id');

module.exports = Id;