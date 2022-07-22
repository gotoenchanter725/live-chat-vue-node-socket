const FriendModel = require('../models/friend')
let RoomModel = require('../models/room')
const messages = require('../messages.json')
const { formatResponse, formatCatchError } = require('../helpers')
const mongoose = require('mongoose')

module.exports = {
    getFriendsList: async (req, res) => {

        let { _id: userId } = req.user

        try {
            let data = await FriendModel.findOne({ userId })
                .populate('friends.originialDetails', ['_id', 'userName', 'mobileNumber'])
            if(!data)
            	throw Error()
            let newData = await Promise.all(data.friends.map(async friend => {
                       let room = await RoomModel.findOne({ participant : {
                            $all : [friend.mobileNumber,req.user.mobileNumber]
                       } })
                       // console.log()
                       // console.log(req.user,friend,room,"--------------")
                       return ({
                            name : friend.name,
                            mobileNumber : friend.mobileNumber,
                            _id : friend.name,
                            originialDetails : friend.originialDetails,
                            room
                       })
                }))
            res.status(200).json(
                formatResponse(200, newData, messages.SUCCESS_GET_FRIEND_LIST)
            )
        }
        catch(err){
        	res.status(200).json(
                formatResponse(200, [], messages.FRIEND_LIST_EMPTY)
            )
        }
    },
    addNewFriend: async (req, res) => {
    	
        let { _id: userId, mobileNumber } = req.user

        try {

            let user = await FriendModel.findOne({ userId })

            if (user) {

                user.friends.unshift(req.body)
                user.save()
                let participant = [req.user.mobileNumber,req.body.mobileNumber]
                let createRoom = await new RoomModel({ participant }).save()
                console.log(createRoom,participant)
                res.status(201).json(
                    formatResponse(201, user.friends, messages.ADD_FRIEND_SUCCESS)
                )
            } else {
                let addNewFriend = await new FriendModel({ userId })
                addNewFriend.friends.unshift(req.body)
                addNewFriend.save()
                let participant = [req.user.mobileNumber,req.body.mobileNumber]
                let createRoom = await new RoomModel({ participant }).save()
                res.status(201).json(
                    formatResponse(201, addNewFriend.friends, messages.ADD_FRIEND_SUCCESS)
                )
            }

        } catch (err) {
            console.log(err)
            let error = formatCatchError(err.message)
            res.status(400).json(
                formatResponse(400, null, messages[error])
            )
        }
    },
    updateFriend: async (req, res) => {

        try {

            let { _id: userId, mobileNumber } = req.user

            let { friendId } = req.params

            let user = await FriendModel
                .findOneAndUpdate({
                    userId,
                    "friends._id": friendId
                }, {
                    $set: {
                        "friends.$": {
                            _id: friendId,
                            ...req.body
                        }
                    }
                }, {
                    new: true,
                    upsert: true
                })
            if (!user)
                throw new Error('EDIT_FRIEND_NOT_FOUND')

            res.status(200).json(
                formatResponse(200, user.friends, messages.EDIT_FRIEND_SUCESS)
            )
        } catch (err) {
            console.log(err)
            let error = formatCatchError(err.message)
            res.status(400).json(
                formatResponse(400, [], messages[error])
            )
        }
    },
    deleteFriend: async (req, res) => {

        try {

            let { _id: userId, mobileNumber } = req.user

            let { friendId } = req.params

            let user = await FriendModel.findOneAndUpdate(
                { 
                    userId 
                },
                {
                    $pull : {
                        friends : {
                            _id : friendId
                        }
                    }
                },
                {
                    new : true
                }
            )

            res.status(200).json(
                formatResponse(200, user.friends, messages.DELETE_FRIEND_SUCCESS)
            )

        } catch (err) {
            let error = formatCatchError(err.message)
            res.status(400).json(
                formatResponse(400, [], messages[error])
            )
        }
    }
}