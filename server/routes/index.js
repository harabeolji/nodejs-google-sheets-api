const express = require('express')
const gsapi = require('./gsapi')

const router = express.Router()

router.post('/', (req, res) => {
	gsapi.appendData(req.body)
		.then((time) => {
			res.status(200).send(`Request received and processed on ${time.date}, ${time.time}`)
		})
		.catch(() => {
			console.log('Error: failed to append data to the spreadsheet')
		})
})

module.exports = router