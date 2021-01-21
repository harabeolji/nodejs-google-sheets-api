const express = require('express')
const path = require('path')
const http = require('http')

const routes = require('./routes')
const bodyParser = require('body-parser')

const port = 8080

class App {
	
	constructor(port) {
		this.port = port
		const app = express()

		app.use(bodyParser.json())
		app.use(bodyParser.urlencoded({extended: true}))

		app.use(express.static(path.join(__dirname, '../client')))
		app.use('/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist')))

		app.use('/api', routes)

		this.server = new http.Server(app)
	}

	Start() {
		this.server.listen(this.port, () => {
			console.log(`Server listening on port ${this.port}`)
		})
	}
}

new App(port).Start()