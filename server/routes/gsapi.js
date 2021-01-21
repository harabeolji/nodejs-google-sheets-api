const { google } = require('googleapis')
const keys = require('../gsapikeys.json')

const client = new google.auth.JWT(
	keys.client_email,
	null,
	keys.private_key,
	['https://www.googleapis.com/auth/spreadsheets']
)

client.authorize(function(err, tokens) {
	if (err) {
		return console.log(err)
	} else {
		return console.log('Google Sheets API connected')
	}
})

const gsapi = google.sheets({version: 'v4', auth: client})
const spreadsheetId = '1uOQ2Sw2M7YBFeiwtbAH_K0GjnhkP_EUGU5_JHAl5UGw'

const appendData = async (jsonData) => {

	const arrayData = Object.values(jsonData)

	const getDate = () => {
		const date = new Date()

		const day = date.getDate()
		const month = date.getMonth() + 1
		const year = date.getFullYear()

		return `${year}-${month}-${day}`
	}

	const getTime = () => {
		const date = new Date()

		let hour = date.getHours().toString()
		let minutes = date.getMinutes().toString()
		let seconds = date.getSeconds().toString()

		if (hour.length < 2) {
			hour = `0${hour}`
		}
		if (minutes.length < 2) {
			minutes = `0${minutes}`
		}
		if (seconds.length < 2) {
			seconds = `0${seconds}`
		}

		return `${hour}${minutes}${seconds}`
	}

	const date = getDate()
	const time = getTime()

	arrayData.unshift(date, time)

	const appendOptions = {
		spreadsheetId,
		range: 'Sheet1',
		valueInputOption: 'USER_ENTERED',
		resource: { values: [arrayData] }
	}

	await gsapi.spreadsheets.values.append(appendOptions)
	
	return {date, time}
}

module.exports = {
	appendData,
}