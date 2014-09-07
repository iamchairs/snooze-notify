var snooze = require('snooze');

snooze.module('snooze-notify').dto('$iOSNotifyMessage', {
	alert: {
		type: 'string',
		description: 'iOS alert property'
	},
	alertData: {
		type: 'object',
		description: 'iOS alert property (object format)'
	},
	badge: {
		type: 'int',
		description: 'iOS badge property'
	},
	contentAvailable: {
		type: 'string',
		description: 'iOS content-available property'
	}
});