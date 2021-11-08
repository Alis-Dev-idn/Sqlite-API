const {Sequelize, DataTypes} = require('sequelize');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

//variable setup
let sqlite;
let Id;
let ManyData;
let GetAmountData;

main();

//main program
async function main(){
  await database();
  GetAmountData = await findData();
}

//generate data
async function GenerateData(AmountData){
    let sum = GetAmountData + parseInt(AmountData);
    console.log('input data, please wait ...')
    for (let j = 0; j < sum; j++) {
        let data = {}
        data['localId'] = j;
        data['localName'] = `WaterSensor-${j}`;
        await CekData(data).catch(err => {console.log('message: '+ err)});
    }
    console.log('Done!')
}

//database settings
async function database(){
    sqlite = new Sequelize({
        dialect: `sqlite`,
        host: `local.db`,
        logging: false
    })
    sqlite.sync().then(response => {
        readline.question('How many data to add? ', amount => {
            if(amount) return GenerateData(amount), readline.close();
            readline.close();
        });
    }).catch(err => {console.log(err)});

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

//cek value data in database
async function findData(){
    ManyData = 0;
    const data = await Id.findAll();
    for (let i = 0; i < data.length; i++) {
        ManyData++
    }
    console.log('find '+ ManyData + ' data in data base');
    return ManyData;
}

//cek value id use or no
async function CekData(sensor){
    const data = await Id.findOne({where: sensor})
    if(data) return;
    await sendData(sensor).catch(err => {console.log('message: '+ err)});
}

//input to database
async function sendData(data){
    await Id.create(data);
}