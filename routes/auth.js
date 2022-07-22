const router = require('express').Router()
const { authRoutesValidation } = require('../validations')
const { authController } = require('../controllers')
const { handleFieldError } = require('../middleware')
// @route    POST auth/signUp
// @desc     Create a user
// @access   Public

router.post(
	'/register', 
	authRoutesValidation.signUpValidator,
	handleFieldError,
	authController.signUp
)

// @route    POST auth/signIn
// @desc     login the user
// @access   Public

router.post(
	'/login', 
	authRoutesValidation.signInValidator,
	handleFieldError,
	authController.signIn
)

// @route    POST auth/verifyToken
// @desc     verify the jwt token
// @access   Public

router.get('/verifyToken',authController.verifyToken)

module.exports = router