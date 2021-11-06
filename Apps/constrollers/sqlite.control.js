const {createData, getDataById, getAllData} = require('../services/sqlite.service');
const {DataValidation, NumberIdValidation} = require('../validation/validation');

const GetAll = async (req, res) => {
    const data = await getAllData();
    res.status(200).json({Data: data});
}

const GetById = async (req, res) => {
    if(Number.isNaN(Number(req.params.id))) return res.status(400).json({message: 'id must be number!'})
    const data = await getDataById(req.params.id);
    if(!data) return res.status(400).json({message: 'Data Not Found!'});
    res.status(200).send(data);
}

const NewData = async  (req, res) => {
    const {localId, localName} = req.body;
    const {error} = await DataValidation.validate({localId, localName});
    if(error) return res.status(400).json({message: error.details[0].message});
    const Id = await getDataById(localId);
    if (Id) return res.status(400).send('Id Has Ready!');
    const Data = await createData(localId, localName);
    res.status(200).json({message: 'Successfully Create New Data', Data});
}

module.exports = {GetById, NewData, GetAll};