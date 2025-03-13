const express  = require('express')
const router = express.Router();
const {createEvent,getEvents,deleteEvent} = require('../controllers/events')
const protectRoute = require('../utils/protectRoute')
const verifyUser = require('../utils/organizer')

router.get('/',verifyUser,getEvents)
router.post('/',protectRoute,verifyUser,createEvent)
router.delete('/:id',protectRoute,verifyUser,deleteEvent)
module.exports = router;