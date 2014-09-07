var snooze = require('snooze');

snooze.module('snooze-notify').dto('$AndroidNotifyMessage', {
	collapseKey: {
		type: 'string',
		description: 'android collapse_key property'
	},
	delayWhileIdle: {
		type: 'object',
		description: 'android delay_while_idle property'
	},
	timeToLive: {
		type: 'int',
		description: 'android time_to_live property'
	},
	data: {
		type: 'object',
		description: 'android data property'
	}
});