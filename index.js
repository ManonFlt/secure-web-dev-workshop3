const express = require('express')
const locationController = require('./locations/locations.controller')
const userController = require('./users/users.controller')
const app = express()
const port = 3000

require('dotenv').config()
const mongoose = require('mongoose');

app.use(locationController)
app.use(userController)

async function main(){
	const res = await mongoose.connect(process.env.MONGO_URI)
	console.log('Successfully connected to database')

	app.listen(port, () => {
		console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
	})

}

main()