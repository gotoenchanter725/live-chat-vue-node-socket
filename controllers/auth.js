let { JWT_SECRET } = process.env
const UserModel = require('../models/user')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { formatResponse } = require('../helpers')
const message = require('../messages.json')
const _ = require('lodash')

module.exports = {

    signUp: async (req, res) => {

        let { userName, mobileNumber, password } = req.body;

        let alreadyRegisteredUser = await UserModel
        									.findOne({ mobileNumber })

        if (alreadyRegisteredUser)
            return res
        			.status(400)
        			.json(
            			formatResponse(
            				400,
            				null,
            				message.SIGNUP_USER_EXIST
            			)
		            )

        let user = new UserModel({
            userName,
            mobileNumber,
            password
        })

        user.save((err, data) => {
            if (err)
                return res
            			.status(500)
            			.json(
            				formatResponse(
            					500,
            					null,
            					message.INTERNAL_ERROR
            				)
            			)
            data = _.pick(data, ['_id','userName','mobileNumber','createdAt']);

            res
              .status(201)
        	  .json(
        		formatResponse(
        			201,
        			data,
        			message.SIGNUP_SUCCESS
        		)
        	)
        })
    },
    signIn: async (req, res) => {

        let { mobileNumber, password } = req.body;

        //CHECKING USER

        UserModel
            .findOne({
                mobileNumber
            })
            .then(user => {

                if (
                	!bcrypt.compareSync(password, user.password)
                )
	                throw Error()

                let token = jwt.sign({ _id: user._id.toHexString() }, JWT_SECRET)

                user.token = token

                user.save().then((err, data) => {

                    if (!err)
                        throw Error()

                    data = _.pick(user, ['_id','userName','mobileNumber','createdAt','token']);

                    res.status(200)
                    	.json(
                    		formatResponse(
                    			200,
                    			data,
                    			message.SIGNIN_SUCCESS
                    		)
                    	)
                })
            })
            .catch(() => {
                res.json(
                	formatResponse(
                		400,
                		null,
                		message.SIGNIN_FAILED
                	)
                )
            })
    },
    verifyToken: async (req, res) => {

        let { token } = req.headers

        try {

            let decoded = await jwt.verify(token, JWT_SECRET)

            if (!decoded)
                throw Error()

            let user = await UserModel.findOne({ _id: decoded._id })

            if (user.token !== token)
                throw Error()

            user = _.pick(user, ['_id','userName','mobileNumber','createdAt']);

            res.status(200).json(
            	formatResponse(
	            	200,
	            	user,
	            	"Active session"
	            )
            )
        } catch (err) {
            res.status(401).json(formatResponse(401,null,"Unauthorized"))
        }
    },
    isAuthorizedRoute: async (req, res, next) => {
        let { token } = req.headers

        try {

            let decoded = await jwt.verify(token, JWT_SECRET)

            if (!decoded)
                throw Error()

            let user = await UserModel.findOne({ _id: decoded._id })

            if (user.token !== token)
                throw Error()

            req.user = user

            next()
        } catch (err) {
            res.status(401).json({ error: 'Unauthorized' })
        }
    }
}