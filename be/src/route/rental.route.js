const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { getAllRentals, createRental, updateRentalStatus } = require('../controller/rental.controller');
const { verifyToken } = require('../middleware/auth');
=======
const { getAllRentals, createRental, updateRentalStatus, deleteRental } = require('../controller/rental.controller');
>>>>>>> bfc8b0aebcee2e7709f7e5ed257316133154ef40

router.get('/', getAllRentals);
router.post('/',verifyToken, createRental);
router.patch('/:id/status', updateRentalStatus);
router.delete('/:id', deleteRental);

module.exports = router;
