const { check, param } = require('express-validator')
const mongoose = require('mongoose')

module.exports = {
    addFriend: [
        check('name', 'name is required').not().isEmpty()
        .isLength({
            min: 5,
            max: 32
        })
        .withMessage('name must have an length of 5'),
        check('mobileNumber', 'Mobile number is required').not().isEmpty()
        .isLength({
            min: 10,
            max: 10
        })
        .withMessage('Enter valid mobile number!!')
    ],
    editFriend: [
        param('friendId', 'friendId is required').exists()
        .custom(value => mongoose.Types.ObjectId.isValid(value))
        .withMessage('Invalid friendId'),
        check('name', 'name is required').not().isEmpty()
        .isLength({
            min: 5,
            max: 32
        })
        .withMessage('name must have an length of 5'),
        check('mobileNumber', 'Mobile number is required').not().isEmpty()
        .isLength({
            min: 10,
            max: 10
        })
        .withMessage('Enter valid mobile number!!')
    ],
    deleteFriend: [
        param('friendId', 'friendId is required').exists()
        .custom(value => mongoose.Types.ObjectId.isValid(value))
        .withMessage('Invalid friendId')
    ]
}