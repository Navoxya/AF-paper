const Category = require('../models/category.model')

const createCategory = async (req, res) => {
    if (req.body) {
        const category = new Category(req.body);
        await category.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllCategories = async (req, res) => {
    await Category.find({}).populate('vehicles', 'model type name')
    .then(data => {
      res.status(200).send({ data: data });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
  }

  const getVehiclesforCategory = async (req, res) => {
    if (req.params && req.params.id) {
        await Category.findById(req.params.id)
        .populate('vehicles', 'code model type name cost')
        .then(data => {
          res.status(200).send({ data: data.vehicles });
        })
        .catch(error => {
          res.status(500).send({ error: error.message });
        });
      }
    } 

module.exports = {
    createCategory,
    getAllCategories,
    getVehiclesforCategory
}