$('#form').on('submit', (event) => {
	event.preventDefault();
	const formName = $('#formName').val()
	const formEmail = $('#formEmail').val()
	const formMobile = $('#formMobile').val()
	const formAddress = $('#formAddress').val()
	const formPostal = $('#formPostal').val()
	$.post('/api', { 
		name: formName, 
		email: formEmail, 
		mobile: formMobile, 
		address: formAddress, 
		postal: formPostal,
	})
		.then((res) => {
			$('#formName').val('')
			$('#formEmail').val('')
			$('#formMobile').val('')
			$('#formAddress').val('')
			$('#formPostal').val('')
			console.log(res)
		})
		.catch((err) => {
			console.log(err)
		})
})