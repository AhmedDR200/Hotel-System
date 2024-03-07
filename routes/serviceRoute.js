const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/availableServiceController');
const serviceValidation = require('../validators/availableServiceValidator');


router.route('/')
.post(
    serviceValidation.createServiceValidator,
    serviceController.createService
);

router.route('/:id')
.put(
    serviceValidation.updateServiceValidator,
    serviceController.updateService
)
.delete(serviceController.deleteService);


module.exports = router;