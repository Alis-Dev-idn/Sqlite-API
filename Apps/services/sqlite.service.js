const Id = require('../database/model/id.model');

async function createData(id, name){
    let a;
    await Id.create({
        localId: id,
        localName: name
    }).then(data => {
        a = data;
    }).catch(err => {console.log(err)})
    console.log(a);
    return a;
}

async function getDataById(id){
    const Get = await Id.findOne({where: {localId: id}});
    return Get;
}

async function getAllData(){
    const Get = await Id.findAll();
    return Get;
}

module.exports = {createData, getDataById, getAllData};