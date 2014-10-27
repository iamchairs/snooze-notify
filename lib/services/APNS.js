var snooze = require('snooze');
var apn = require('apn');

snooze.module('snooze-notify').service('$notifyAPNS', function($fs, $tls, $module) {
	var url = 'gateway.push.apple.com';
	var sandboxUrl = 'gateway.sandbox.push.apple.com';
	var port = 2195;
	var initialized = false;
	var connection = null;
	var err = '';
	var passphrase = '';
	var certFile = '';

	var _send = function($NotifyMessageDTO) {
		if(initialized === true) {
			var iOS = $NotifyMessageDTO.iOS || {};
			var android = $NotifyMessageDTO.android || {};

			var message = $NotifyMessageDTO.message;
			var type = $NotifyMessageDTO.deviceType;
			var id = $NotifyMessageDTO.deviceId;
			var sound = $NotifyMessageDTO.sound;

			var expiry = Math.floor(Date.now() / 1000) + (3600*48); // Defaults to 48 hours from now
			var badge = null;
			var alert = message;

			var note = new apn.Notification();

			if(iOS.alert) {
				alert = iOS.alert;
			}

			if(iOS.alertData) {
				alert = iOS.alertData;
			}

			if(iOS.expiry) {
				expiry = iOS.expiry;
			}

			if(iOS.badge) {
				badge = iOS.badge;
			}

			if(iOS.sound) {
				sound = iOS.sound;
			};

			note.expiry = expiry;
			note.badge = badge;
			note.alert = alert;
			note.sound = sound;

			console.log(note);

			var device = new apn.Device(id);
			var code = connection.pushNotification(note, device);
			
		} else {
			snooze.fatal(new Error('Cannot send APNS Notification. Failed to initialize: ' + err))
		}
	}

	var $compile = function() {
		var config = $module.getConfig();
		if(config.snoozeNotify) {
			if(config.snoozeNotify.ios) {
				certFile = config.snoozeNotify.ios.pfx;
				passphrase = config.snoozeNotify.ios.passphrase;

				if(certFile === undefined) {
					err = 'No cert file defined';
				} else {
					var path = process.cwd() + '/' + certFile;
					if($fs.existsSync(path) === false) {
						atal(new Error('APNS cert file doesnt exist at `' + path + '`'))
					}
				}

				connection = new apn.Connection({
					cert: false,
					key: false,
					pfx: path,
					passphrase: passphrase,
					production: (config.snoozeNotify.ios.sandbox !== true)
				});

				initialized = true;
			}
		} else {
			$module.warn('snoozeNotify.ios not defined in snooze.json');
		}
	};

	return {
		send: _send,
		$compile: $compile
	};
});