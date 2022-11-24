// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

//const filmingLocations = require('./lieux-de-tournage-a-paris.json')

const router = require('express').Router()
const locationsService = require('./locations.service')

router.get('/', (req, res) => {
	return res.status(200).send('Hello World!')
})

router.get('/locations', async(req, res, next) => {
	//return res.status(200).send(locationsService.getAll({}))
	try {
		const allLocs = await locationsService.getAll({});
		res.json(allLocs);
	} catch(error) {
		next(error);
	}
})

router.get('/locations/:id', async(req, res,next) => {
	//return res.status(200).send(locationsService.findOne(req.params.id))
	try {
		const { id } = req.params;
		const location = await locationsService.findOne({
			_id: id,
		});

		if (!location) {
			const error = new Error('Cannot find location');
			return next(error);
		}

		res.json(location);
	} catch (error) {
		next(error);
	}
})


module.exports = router
