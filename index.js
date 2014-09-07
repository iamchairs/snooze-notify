var snooze = require('snooze');

snooze.module('snooze-notify')
	.libs(['lib/services', 'lib/dtos'])
	.requireLibs(__dirname);