var snooze = require('snooze');

snooze.module('snooze-notify').dto('$NotifyMessage', {
	message: {
		type: 'string',
		description: 'simple text message'
	},
	deviceType: {
		type: 'string',
		description: 'android or ios. case insensitive',
		example: 'iOS'
	},
	deviceId: {
		type: 'string',
		description: 'id of device'
	},
	iOS: {
		type: '@$iOSNotifyMessageDTO',
		description: 'iOS specific message data'
	},
	android: {
		type: '@$AndroidNotifyMessageDTO',
		description: 'android specific message data'
	}
});