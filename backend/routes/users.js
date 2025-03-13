const express = require('express')
const router = express.Router();
const {getUser,getUsers,deleteUser} = require('../controllers/users')
router.get('/:id',getUser)
router.get('/',getUsers)
router.delete('/:id',deleteUser)
module.exports = router;