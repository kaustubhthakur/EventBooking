const express = require('../routes/auth')
const router = express.Router();
const {register,login,logout} = require('../controllers/auth')
router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)
module.exports = router;