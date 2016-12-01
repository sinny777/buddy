/*global define */

define(['angular'], function (angular) {
	'use strict';
  
	return angular.module('app.config', [])
	.constant('CONFIG', {
		VERSION: '0.1',
		ENVIRONMENT: 'DEV',
		API_URL: 'http://granslive-web.mybluemix.net/api',
		MQTT: {
			MQTT_BROKER: '52.76.33.2',
			PORT: 9001,
			TOPIC_PREFIX: 'granslive/iot/'
		}
	});
    
});