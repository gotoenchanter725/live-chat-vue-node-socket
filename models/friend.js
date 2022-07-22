const { Schema, model } = require('mongoose')

let friend_schema = Schema({
	userId : Schema.Types.ObjectId,
	friends : [{
		mobileNumber : {
			type : Number
		},
		name : Schema.Types.String,
		createdAt : {
			type : Schema.Types.Date,
			default : new Date()
		}
	}]
})

friend_schema.virtual('friends.originialDetails',{
	ref: 'user',
	localField: 'friends.mobileNumber',
	foreignField: 'mobileNumber'
})

module.exports = new model('friend',friend_schema)