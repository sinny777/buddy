
var Client = require("ibmiotf");
var SerialPort = require("serialport");
var usbPort = "/dev/ttyUSB0";
var CONFIG = require('./config').get();

var simulatorService = require("./simulatorService")();
var appClient;

var serialPort;
var methods = {};
var appConfig = {};
var gatewayId = "";

methods.initGateway = function(){
	console.log('\n\n<<<<<<<< IN initGateway >>>>>>>');
	gatewayId = methods.getRPISerialNumber();
	console.log("gatewayId: >>> ", gatewayId);
	methods.connectToIBMCloud();
};

methods.getRPISerialNumber = function() {
	try{
		var fs = require('fs');
	    var content = fs.readFileSync('/proc/cpuinfo', 'utf8');
	    var cont_array = content.split("\n");
	    var serial_line = cont_array[cont_array.length-2];
	    var serial = serial_line.split(":");
	    var serialNo = serial[1].slice(1);
	    return serialNo;
	}catch(err){
		return "GG-000-000-001";
	}
};

methods.connectToIBMCloud = function(){
    	console.log('\n\n<<<<<< IN connectToMqtt >>>>>>>>> ');
        appClient = new Client.IotfApplication(CONFIG.SERVICES_CONFIG.IOT_CONFIG);
        appClient.connect();
      //setting the log level to 'trace'
        appClient.log.setLevel('trace');
       
        appClient.on("connect", function () {
        	console.log('<<<<<<< IBM IoT Cloud Connected Successfully >>>>>> \n\n');
    		methods.initSerialPort(appClient);
//    		methods.startSimulatingAll(appClient);
        });
        
        appClient.on("error", function (err) {
            console.log("Error in appClient: >>  "+err);
        });
        
    };
    
methods.initSerialPort = function(appClient){
	  serialPort = new SerialPort(usbPort, {
	    baudrate: 9600,
	    bufferSize: 131072,
	    parser: SerialPort.parsers.readline('\n')
	  });
	  serialPort.on("open", function () {
	    serialPort.on('data', function(data) {
	      console.log('data received: ' + data);
	      methods.handleDataFromDevice(appClient, data);
	    });
	  });
	  
	  serialPort.on('error', function(err) {
		  console.log("ERROR in initSerialPort: >>> ", err);
//		  throw new Error('Custom SerialPort Communication Error: ', err);
		  return false;
	  });
};

methods.handleDataFromDevice = function(appClient, deviceData){
	//TODO: if required simulate some sensor data
	var timeNow = new Date();
	try{
		var deviceWithData = JSON.parse(deviceData);
		deviceWithData.data.id = deviceWithData.uniqueId;
		deviceWithData.data.ts = timeNow;
		deviceWithData.data.gatewayId = gatewayId;
		
		methods.publishMessage(appClient, deviceWithData);
		
	}catch(err){
		console.log('INVALID DATA: >>> ', deviceData);
	}
};

methods.publishMessage = function(appClient, deviceWithData){
	try{
		if(deviceWithData.data.assignedTo){
			 var sensorData = {"d": deviceWithData.data};
			 console.log('\n\n<<<<<< IN publishMessage >>>>>>>>> myData: ', JSON.stringify(deviceWithData));
			 appClient.publishDeviceEvent(deviceWithData.type, deviceWithData.uniqueId, "status", "json", sensorData);
		}else{
			console.log('<<<<<< NO OWNER ASSIGNED TO THE DEVICE >>>>>>>> ');
		}
	}catch(err){
		console.log(err);
	}
  };

methods.startSimulatingAll = function(appClient){
	 setInterval(function(){
			fetchDevicesFromLocal(function(simulators){
				for(var index in simulators) { 
					  var simulator = simulators[index];
					  
//					    if(simulator.deviceId != 'SM-111-111-001'){
//				  			continue;
//				  		}
					  
						    var device = {"type":simulator.deviceType, "uniqueId": simulator.deviceId, "data": {"hb": 0, "btemp":0 , "temp": 0, "hum": 0}};
						    var timeNow = new Date();
						    device.configuration = simulator.configuration;
						    device.assignedTo = simulator.assignedTo;
						    device.data.id = simulator.deviceId;
						    device.data.ts = timeNow;
						    device.data.gatewayId = gatewayId;
						    simulatorService.simulateDeviceData(device, function(data){
						    	addWorkerInfo(data, function(deviceWithData){
						    		if(deviceWithData.data.assignedTo){
						    			 methods.publishMessage(appClient, deviceWithData);
						    		}
						    	});
						    });
				  }
			});
	 }, CONFIG.SIMULATE_FREQUENCY * 1000);
	
};


methods.initGateway();
