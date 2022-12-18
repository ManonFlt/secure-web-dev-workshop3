const router = require('express').Router()
const userService = require('./users.service')
const passport = require('passport')
const roleMiddleware = (allowedRoles) => (req, res, next) => allowedRoles.includes(req.user?.role) ? next() : res.status(403).send()

require('../strategies/jwt.stategy')
require('../strategies/local.strategy')


// Register
router.post('/users/register', async (req, res) => {
    res.status(200).send(await userService.register(req.body?.username, req.body?.password, req.body?.role))
})

// Login
router.post('/users/login',  passport.authenticate('local',{session: false}),
    async (req, res) => {
        const token = await userService.login(req.user._id, req.user.role)
        return res.status(200).send(token)
    }
)

// Get self
router.get('/users/me', passport.authenticate('jwt',{session:false}), async (req, res) => {
    try {
        const myUser = await userService.findOne(req.user._id);
        return res.status(200).send(myUser)
    } catch(error) {
        return res.status(403).send("Error! Try again.")
    }
})

// Update self
router.put('/users/me', passport.authenticate('jwt',{session:false}), async (req, res) => {
    try {
        const myUser = await userService.update(req, res)
        return res.status(200).send(myUser)
    } catch(e) {
        return res.status(400).send("Bad Request, Try again !")
    }
})

// Delete self
router.delete('/users/me', passport.authenticate('jwt',{session:false}), async (req, res) => {
    try {
        const userToDelete = await userService.deleteOne(req.params.id)
        res.status(200).send(userToDelete)
    } catch(e) {
        return res.status(400).send("Bad Request, Try again !")
    }
})

// Get all
router.get('/users', passport.authenticate('jwt',{session:false}), roleMiddleware(['admin']), async (req, res) => {
    try {
        const allUsers = await userService.findAll();
        return res.status(200).send(allUsers)
    } catch(error) {
        return res.status(403).send("Error! Try again.")
    }
})

module.exports = router