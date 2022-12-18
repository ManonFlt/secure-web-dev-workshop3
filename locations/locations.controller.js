// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')
const passport = require('passport')
const roleMiddleware = (allowedRoles) => (req, res, next) => allowedRoles.includes(req.user?.role) ? next() : res.status(403).send()

require('../strategies/jwt.stategy')
require('../strategies/local.strategy')

/* Get Hello World */
router.get('/', (req, res) => {
	return res.status(200).send('Hello World!')
})


/* Get all locations */
router.get('/locations', async(req, res) => {
	try {
		const allLocations = await locationsService.getAll({});
		return res.status(200).send(allLocations)
	} catch(error) {
		return res.status(404).send("Error! Try again.")
	}
})


/* Get one specific location */
router.get('/locations/:id', async(req, res) => {
	try {
		const findLoc = await locationsService.getOne(req.params['id'])
		return res.status(200).send(findLoc);
	} catch (error) {
		return res.status(404).send("Error! Try again.")
	}
})


/* Create a new location */
router.post('/locations', async (req, res) => {
	try {
		return res.status(200).send( await locationsService.create(req.body));
	} catch(error) {
		return res.status(404).send("Error! Try again.")
	}
})


/* Update a specific location */
router.put('/locations/:id', async (req, res) => {
	try {
		return res.status(200).send( await locationsService.update(req.params.id,req.body));
	} catch(error) {
		return res.status(400).send("Error! Try again.")
	}
})


/* Delete a specific location */
router.delete('/locations/:id', async (req, res, next) => {
	try {
		const deletedLoc = await locationsService.deleteOne(req.params['id'])
		return res.status(200).send(deletedLoc);
	} catch(error) {
		return res.status(400).send("Error! Try again.")
	}
});

module.exports = router
