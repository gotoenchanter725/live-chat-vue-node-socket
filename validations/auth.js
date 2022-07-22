const { check } = require('express-validator')

module.exports = {
    signUpValidator: [
        check('userName', 'username is required').not().isEmpty()
            .isLength({
                min: 5,
                max: 32
            })
            .withMessage('userName must have an length of 5'),
        check('mobileNumber', 'Mobile number is required').not().isEmpty()
            .isLength({
                min: 10,
                max: 10
            })
            .withMessage('Enter valid mobile number!!'),
        check('password','Password is required').not().isEmpty()
            .isLength({ min: 5 })
            .withMessage('Password must contain at least 6 characters')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/)
            .withMessage('Password must contain one character & one special character!!')
    ],
    signInValidator: [
        check('mobileNumber', 'Mobile number is required').not().isEmpty()
            .isLength({
                min: 10,
                max: 10
            })
            .withMessage('Enter valid mobile number!!'),
        check('password','Password is required').not().isEmpty()
            .isLength({ min: 5 })
            .withMessage('Password must contain at least 6 characters')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/)
            .withMessage('Password must contain one character & one special character!!')
    ]
}