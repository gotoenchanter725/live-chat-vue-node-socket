const router = require('express').Router()
const { authorize } = require('../middleware')
const { chatController } = require('../controllers')

router.use(authorize)

// @route    GET /chats
// @desc     Create a user
// @access   Public

router.get('/', chatController.getChatList)



module.exports = router