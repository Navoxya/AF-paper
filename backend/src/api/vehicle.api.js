const express = require('express');
const router = express.Router();
const controller = require('../controllers/vehicle.controller');

module.exports = function () {
  router.post('/create', controller.createVehicle);
  router.get('/', controller.getVehicles)
  router.post('/calculate', controller.getValue);
  return router;
}