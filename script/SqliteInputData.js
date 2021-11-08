const {Sequelize, DataTypes} = require('sequelize');

//variable setup
let sqlite;
let Id;

main();

//main program
async function main(){
  await database();
    for (let j = 0; j < 100; j++) {
        let data = {}
        data['localId'] = j;
        data['localName'] = `WaterSensor-${j}`;
        await dataCek(data);
    }
}

//database settings
async function database(){
    sqlite = new Sequelize({
        dialect: `sqlite`,
        host: `local.db`,
        logging: false
    })
    sqlite.sync().then(() => {console.log('Sqlite Is Ready!')}).catch(err => {console.log(err)});

    //database models
    Id = sqlite.define('local-db',{
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
    }, {sqlite, underscored: false, timestamps: false});
    Id.removeAttribute('id');
}

//cek data didalam
async function dataCek(sensor){
    const data = await Id.findOne({where: sensor});
    if(data) return console.log('data is found, not input to database!');
    await sendData(sensor).then(respon =>{console.log('success')}).catch(err => {console.log(err)});
}

//input to database
async function sendData(data){
    await Id.create(data);
}