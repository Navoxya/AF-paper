const Vehicle = require('../models/vehicle.model')

const createVehicle = async (req, res) => {
    if (req.body) {
        const vehicle = new Vehicle(req.body);
        await vehicle.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getVehicles = async (req, res) => {
    await Vehicle.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getValue = async (req, res) => {
    const VtypeID = req.body.vid;
    const duration = req.body.duration;

    const Vehicl = await Vehicle.findById(VtypeID);

    const total = Vehicl.cost * Number(duration);

    res.status(200).json({
        success: true,
        price: total
    })
   
}



module.exports = {
    createVehicle,
    getVehicles,
    getValue
}