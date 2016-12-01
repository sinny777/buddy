
'use strict';

module.exports.getServiceCreds = function(name) {
    if (process.env.VCAP_SERVICES) {
        var services = JSON.parse(process.env.VCAP_SERVICES);
        for (var service_name in services) {
            if (service_name.indexOf(name) === 0) {
                var service = services[service_name][0];
                return service.credentials;
            }
        }
    }else{
    	// THIS ELSE BLOCK IS TO RUN THE APPLICATION LOCALLY
    	if(name == 'speech_to_text'){
    		return {
    			"url": "https://stream.watsonplatform.net/speech-to-text/api",
                "password": "eoOB2PFBEAWT",
                "username": "d5214313-4222-43f8-8c97-ea73eb5954d0"
    		}
    	}
    }
    return {};
};