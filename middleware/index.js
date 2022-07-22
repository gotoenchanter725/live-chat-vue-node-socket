let { JWT_SECRET } = process.env
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')
const message = require('../messages.json')
const { validationResult } = require('express-validator')
const { formatResponse, formatCatchError } = require('../helpers')
const FriendModel = require('../models/friend')

const authorize = async (req, res, next) => {
    let { token } = req.headers

    try {

        let decoded = await jwt.verify(token, JWT_SECRET)

        let user = await UserModel.findOne({ _id: decoded._id })

        if (user.token !== token)
            throw new Error('TOKEN EXPIRED')

        req.user = user

        next()
    } catch (err) {

        let { message: errorMessage } = err

        res.status(401).json(
            formatResponse(
                401,
                null,
                message[
                    formatCatchError(errorMessage)
                ]
            )

        )
    }
}


const validateAddAndUpdateFriend = async (req, res, next) => {
    try {
        let { _id: userId, mobileNumber } = req.user

        let { friendId } = req.params

        if (mobileNumber === parseInt(req.body.mobileNumber))
            throw new Error('CANT_ADD_YOUR_NUMBER')

        let user = await FriendModel
            .findOne({ userId })
        if (!user)
            return next()


        if (!friendId) {

            let isAnyFriendWithThisNumber = user.friends.find(
                data => parseInt(data.mobileNumber) === parseInt(req.body.mobileNumber)
            )

        } else {

            if (!user)
                throw new Error('EDIT_FRIEND_NOT_FOUND')

            let IsFriendCreateWithId = user.friends.find(
                data => data._id.toString() === friendId
            )

            if(IsFriendCreateWithId.mobileNumber === parseInt(req.body.mobileNumber))
                return next()

            let list = user.friends.filter(data => data.mobileNumber === parseInt(req.body.mobileNumber))

            if (
                list.length > 0
            )
                throw Error('FRIEND_ALREADY_EXIST')
        }
        next()
    } catch (err) {
        let error = formatCatchError(err.message)
        res.status(400).json(
            formatResponse(400, null, message[error])
        )
    }
}

const handleFieldError = (req,res,next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const firstError = errors
            .array()[0]
            .msg;
        return res
            .status(400)
            .json(
                formatResponse(400, null, firstError)
            );
    }
    next()
}


module.exports = {
    authorize,
    validateAddAndUpdateFriend,
    handleFieldError
}