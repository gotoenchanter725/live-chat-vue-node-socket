function formatResponse(status,data,message=''){
	return {
		status,
		data,
		message
	}
}

function formatCatchError(err=""){
	return err.toUpperCase().split(' ').join('_')
}

module.exports = {
	formatResponse,
	formatCatchError
}