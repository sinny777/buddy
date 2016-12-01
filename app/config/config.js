
'use strict';

module.exports.get = function() {
		return {
			"gatewayId": "GG-000-000-001",
			MQTT: {
				MQTT_BROKER: '52.76.33.2',
				PORT: 9001,
				TOPIC_PREFIX: 'granslive/iot'
			},
			"CLOUD_CONFIG": {
		      "org": "o6oosq",
		      "id": "a-o6oosq-v9xbyockrk",
		      "auth-key": "a-o6oosq-ugylh9r4ug",
		      "auth-token": "Tun&)vjKlf6sJ_9BdK"
		    },
		    "SERVICES_CONFIG":{
				"cloudantNOSQLDB":{
					 "username": "acb0bba8-0370-47c4-8e49-5ad1b1050873-bluemix",
					  "password": "5bfe2ecae5c815202c4d78db2600812ef5099f337a6deb6dba96ce0b7a5b0e13",
					  "host": "acb0bba8-0370-47c4-8e49-5ad1b1050873-bluemix.cloudant.com",
					  "port": 443,
					  "url": "https://acb0bba8-0370-47c4-8e49-5ad1b1050873-bluemix:5bfe2ecae5c815202c4d78db2600812ef5099f337a6deb6dba96ce0b7a5b0e13@acb0bba8-0370-47c4-8e49-5ad1b1050873-bluemix.cloudant.com"
				},
				"stt":{
					"url": "https://stream.watsonplatform.net/text-to-speech/api",
					"password": "xGaXXN1sHQNE",
					"username": "d1ea6af9-ca33-43c6-a85d-572257ff6a64"
				},
				"conversation":{
					"credentials":{
						"url": "https://gateway.watsonplatform.net/conversation/api",
						"password": "Dd6zArf1tY05",
						"username": "7374796d-9f99-4e50-92f4-b4c5f5ce7e59",
						"version_date": "2016-07-11",
						"version": "v1-experimental",
						"silent": true
					},
					"workspace_id": "ccc639e8-9b25-4226-8611-1f4386000344"
				}
			},
			"home_path":"/home/pi",
			"base_path": "/home/pi/granslive/granslive-gateway",
            "resources_path": "/app/resources",
		    "wifi_interface": "wlan0",
		    "wifi_driver_type": "nl80211",

		    "access_point": {
		        "force_reconfigure": true,
		        "wifi_interface":    "wlan0",
		        "ssid":              "granslive-gateway",
		        "passphrase":        "1SatnamW",
		        "domain":            "rpi.config",
		        "ip_addr":           "192.168.44.1",
		        "netmask":           "255.255.255.0",
		        "subnet_ip":         "192.168.44.0",
		        "broadcast_address": "192.168.44.255",
		        "subnet_range": {
		            "start":         "192.168.44.10",
		            "end":           "192.168.44.50"
		        }
		    },

		    "server": {
		        "port": 88
		    }
		}
    	
};