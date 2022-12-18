// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

function getAll(){
	return Location.find({})
}

async function getOne(id){
	const location = await Location.findById(id)
	if(!location){
		throw new Error('Location not found')
	}
	return location
}

async function create(newLoc){
	const toCreate = new Location(newLoc)
	return toCreate.save()
}

async function update(id, modification){
	const location = await getOne(id)
	return location.update(modification)
}

async function deleteOne(id){
	const locationToDelete = await getOne(id)
	return locationToDelete.remove()
}


module.exports.getAll = getAll
module.exports.getOne = getOne
module.exports.create = create
module.exports.update = update
module.exports.deleteOne = deleteOne