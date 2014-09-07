var snooze = require('snooze');

// Sends the message to GCM, APNS, WNS, MPNS, and ADM if setup
snooze.module('snooze-notify').service('$snoozeNotify', function(
	$notifyADM,
	$notifyAPNS,
	$notifyGCM,
	$notifyWNS,
	$notifyMPNS,
	$module) {

	var _send = function($NotifyMessageDTO) {
		var type = $NotifyMessageDTO.deviceType;

		if(type) {
			switch(type.toLowerCase()) {
				case 'ios': 
						$notifyAPNS.send($NotifyMessageDTO);
					break;
				case 'android':
						$notifyGCM.send($NotifyMessageDTO);
					break;
				default:
					$module.warn('snooze-notify error: Unkown Device Type `' + type + '`');
			}
		} else {
			$module.warn('snooze-notify error: Device Type Not Defined (aborting).');
		}
	}

	return {
		send: _send
	}
});