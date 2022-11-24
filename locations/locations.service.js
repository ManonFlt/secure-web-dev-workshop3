// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

function findAll() {
	return [1,2,3,4]
}

async function create(){

}

async function update(id, modification){

}

function getAll(){
	//return Location[1,2,3,4]
	return Location.find({})
}

async function getOne(){

}

function findOne(id){
	//return Location.findOne({sourceLocationId: id})
	return Location.findOne({sourceLocationId: id})
}

module.exports.findAll = findAll
module.exports.findOne = findOne
module.exports.create = create
module.exports.update = update
module.exports.getAll = getAll
module.exports.getOne = getOne