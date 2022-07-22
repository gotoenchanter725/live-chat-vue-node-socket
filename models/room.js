const { Schema, model } = require('mongoose')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

let user_ref_schema = {
	ref : 'friend',
    type : Number
}

let room_schema = Schema({
	participant : [user_ref_schema]
})

module.exports = new model('room',room_schema)