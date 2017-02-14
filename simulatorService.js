
var Chance = require('chance');

module.exports = function() {
	
	var chance = new Chance();
    
var methods = {};

	methods.simulateDeviceData = function(device, cb){
//		console.log('IN simulateDeviceData: >> ', device);
		if(device && device.configuration && device.configuration.simulate){
			var simulateConfig = device.configuration.simulate;
			if(simulateConfig.heartBeat && simulateConfig.heartBeat.min && simulateConfig.heartBeat.max){
				var bpm = simulateConfig.heartBeat.min + 2;
				if(simulateConfig.heartBeat.auto == 'true'){
					bpm = methods.heartBeatSimulator(simulateConfig.heartBeat.min, simulateConfig.heartBeat.max);
				}
				device.data.hb = bpm;
			}
			if(simulateConfig.bTemp && simulateConfig.bTemp.min && simulateConfig.bTemp.max){
				var btemp = simulateConfig.bTemp.min + 2;
				if(simulateConfig.bTemp.auto == 'true'){
					btemp = methods.bodyTemperatureSimulator(simulateConfig.bTemp.min, simulateConfig.bTemp.max);
				}
				device.data.btemp = btemp;
			}
			if(simulateConfig.temp && simulateConfig.temp.min && simulateConfig.temp.max){
				var temperature = simulateConfig.temp.min + 2;
				if(simulateConfig.temp.auto == 'true'){
					temperature = methods.temperatureSimulator(simulateConfig.temp.min, simulateConfig.temp.max);
				}
				device.data.temp = temperature;
			}
			if(simulateConfig.hum && simulateConfig.hum.min && simulateConfig.hum.max){
				var humidity = simulateConfig.hum.min + 2;
				if(simulateConfig.hum.auto == 'true'){
					humidity = methods.humiditySimulator(simulateConfig.hum.min, simulateConfig.hum.max);
				}
				device.data.hum = humidity;
			}
			
			getLocation(device);
		}
		
		delete device.configuration;
		delete device["configuration"];
		
		cb(device);
	};
	
	methods.heartBeatSimulator = function(min, max){
		return getRandomInt(min, max);
	}
	
	methods.bodyTemperatureSimulator = function(min, max){
		return getRandomInt(min, max);
	}
	
	methods.temperatureSimulator = function(min, max){
		return getRandomInt(min, max);
	}
	
	methods.humiditySimulator = function(min, max){
		return getRandomInt(min, max);
	}
	
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	function getLocation(device) {
		if(device.configuration && device.configuration.simulate 
				&& device.configuration.simulate.location && device.configuration.simulate.location.auto == "true"){
			var location = device.configuration.simulate.location;
			var original_lat = location.lat;
			var original_lng = location.lon;
			var radius = 100;
			var r = radius/111300 // = 100 meters
			  , y0 = original_lat
			  , x0 = original_lng
			  , u = Math.random()
			  , v = Math.random()
			  , w = r * Math.sqrt(u)
			  , t = 2 * Math.PI * v
			  , x = w * Math.cos(t)
			  , y1 = w * Math.sin(t)
			  , x1 = x / Math.cos(y0);
			
			device.data.lat = y0 + y1;
			device.data.lon = x0 + x1;
			device.data.alt = chance.altitude({ max: 500 });
			
//			lat = chance.latitude({min: (original_lat - 0.0005), max: (original_lat + 0.0005), fixed: 7});
//			long = chance.longitude({min: (original_lng - 0.0005), max: (original_lng + 0.0005), fixed: 7});
			
//			console.log('lat: ', lat, ', long: ', long, ', alt: ', alt);
		}
	}

return methods;

}