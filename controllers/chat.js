const ChatModel = require('../models/chat')
const FriendModel = require('../models/friend')
const { formatResponse } = require('../helpers')
const message = require('../messages.json')
const _ = require('lodash')

module.exports = {
    getChatList: async (req, res) => {
        let lookUpQuery = {
            $lookup: {
                from: 'rooms',
                localField: 'room',
                foreignField: '_id',
                as: 'rooms'
            }
        }

        let matchQuery = {
            $match: {
                'rooms.participant': { $in: [req.user.mobileNumber] }
            }
        }

        let unwind = { "$unwind": "$rooms" }

        let chatList = await ChatModel.aggregate([lookUpQuery, matchQuery, unwind])

        let friendsList = await FriendModel.findOne({ userId: req.user._id }).then(data => data.friends)

        let response = {
            chatList,
            friendsList
        }

        res.status(200).json(
            formatResponse(200, response, message.SUCCESS_GET_FRIEND_LIST)
        )
    }
}