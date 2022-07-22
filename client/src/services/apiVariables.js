export const authAPI = {
	login : {
		url : '/auth/login',
		method : 'post',
		data : null
	},
	register : {
		url : '/auth/register',
		method : 'post',
		data : null
	},
	verifyToken : {
		url : '/auth/verifyToken',
		method : 'get'
	}
}

export const userAPI = {
	getFriendList : {
		url : '/user/friends',
		method : 'get'
	},
	addNewFriend : {
		url : '/user/friend',
		method : 'post',
		data : null
	},
	editFriend : {
		url : '/user/friend/:id',
		method : 'put',
		data : null
	},
	deleteFriend : {
		url : '/user/friend/:id',
		method : 'delete',
		data : null
	}
}

export const chatAPI = {
	getChatList : {
		url : '/chats',
		method : 'get'
	}
}