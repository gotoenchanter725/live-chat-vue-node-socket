const { Schema, model } = require('mongoose')

let friend_ref_schema = {
    type : Schema.Types.ObjectId,
	ref : 'friend',
	required:true

}

let chat_schema = Schema({
	room :{
		type: Schema.Types.ObjectId,
		ref : 'room'
	},
	chats : [{
		user : friend_ref_schema,
		message : String,
		Date : {
			type : 'date',
			default : Date.now
		}
	}]
})

let ChatModel = new model('chat',chat_schema)

module.exports = ChatModel