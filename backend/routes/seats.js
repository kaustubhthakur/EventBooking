const express = require('express')
const router = express.Router();
const {getSeat,getSeats,updateSeat,updateSeatAvailability,deleteSeat,createSeat} = require('../controllers/seats')
const verifyUser = require('../utils/organizer')
const protectRoute =require('../utils/protectRoute')
router.post('/:id',protectRoute,verifyUser,createSeat)
router.get('/:id/:id',protectRoute,verifyUser,getSeat)
router.get('/:id',getSeats)
router.put('/:id/:id',protectRoute,verifyUser,updateSeat)
router.put('/:id/:id',protectRoute,updateSeatAvailability)
router.delete('/:id/:id',protectRoute,verifyUser,deleteSeat)
module.exports =router;