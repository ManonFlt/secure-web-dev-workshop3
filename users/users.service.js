const User = require('./users.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

async function register(username, password){
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = new User({username, password: hash})
    return await user.save()
}

async function login(username){
    return jwt.sign({"sub":username}, process.env.JWT_SECRET)
}

async function checkPassword(username, password){
    const user = await User.findOne({username})
    const match = await bcrypt.compare(password, user.password)
    if (!match){
        return false
    }
    return user
}

async function findOne(id){
    const user = await User.findById({'_id':id})
    if (!user) {
        throw new Error("User not found")
    }
    return user
}

async function updateOne(id, modification){
    const userToUpdate = await findOne(id)
    return userToUpdate.update(modification)
}

async function getSelf(username){
    const user = await User.find({"username":username})
    if (!user) {
        throw new Error("User not found")
    }
    return user
}

async function deleteOne(id){
    const userToDelete = await findOne(id)
    return userToDelete.findByIdAndDelete(id)
}

async function findAll(){
    const allUsers = await User.find().select('username').select('role')
    if (!allUsers) {
        throw new Error('Users not found')
    }
    return allUsers
}

module.exports.register = register
module.exports.login = login
module.exports.findAll = findAll
module.exports.checkPassword = checkPassword
module.exports.findOne = findOne
module.exports.updateOne = updateOne
module.exports.deleteOne = deleteOne
module.exports.getSelf = getSelf