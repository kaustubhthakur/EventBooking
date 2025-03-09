const User = require("../models/User")

const verifyUser = async(userId) => {
    const user = await User.findById(userId)

    if(user.role === 'admin'){
        return true
    }

    return false
}


module.exports = verifyUser