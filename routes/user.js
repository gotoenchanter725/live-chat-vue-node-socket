const router = require('express').Router()
const { authorize,validateAddAndUpdateFriend,handleFieldError } = require('../middleware')
const { userController } = require('../controllers')
const { userRoutesValidation } = require('../validations')

router.use(authorize)
// @route    GET user/friends
// @desc     GET friend list
// @access   Private

router.get('/friends',userController.getFriendsList)

// @route    POST user/friend
// @desc     Add New friend
// @access   Private

router.post(
	'/friend',
	userRoutesValidation.addFriend,
	handleFieldError,
	validateAddAndUpdateFriend, 
	userController.addNewFriend
)

// @route    POST user/friend
// @desc     Update friend
// @access   Private

router.put(
	'/friend/:friendId',
	userRoutesValidation.editFriend,
	handleFieldError,
	validateAddAndUpdateFriend, 
	userController.updateFriend
)

// @route    DELTE user/friend
// @desc     delete friend
// @access   Private

router.delete(
	'/friend/:friendId', 
	userRoutesValidation.deleteFriend,
	handleFieldError,
	userController.deleteFriend
)





module.exports = router