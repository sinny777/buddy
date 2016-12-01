define(function (require) {
    'use strict';

    var angular = require('angular'),
	config = require('config'),
	ngRoute = require('angularRoute'),
	ngStorage = require('angularLocalStorage'),
//	uiBootstrap = require('ui.bootstrap'),
    commonModule = angular.module('commonModule', ['ngRoute',
                                                   'ngAnimate',
                                                   'LocalStorageModule',
//                                                   'ui.bootstrap',
                                                   'app.config']);

    commonModule.factory('mqttService', require('modules/common/services/mqttService'));
    commonModule.factory('gatewayService', require('modules/common/services/gatewayService'));

    commonModule.controller('dashboardController', require('modules/common/controllers/dashboardController'));
    commonModule.controller('configController', require('modules/common/controllers/configController'));

    commonModule.controller('CommonController', ['$rootScope', '$cookies', '$http', function CommonController($rootScope, $cookies, $http){

      $rootScope.currentUser = {};
      $rootScope.footerLinks = [];
      $rootScope.initNavBar = function(){
	    //  commonService.pageLoadCalls();
	    };

	    $rootScope.allLinks = [];

	    $rootScope.getAllLinks = function(callBack){
	    	console.log('IN getAllLinks >>>>>>>>>> ');
	    	var req = {
	    			 method: 'GET',
	    			 url: '/resources/alllinks.json',
	    			 headers: {
	    			   'Accept': 'application/json'
	    			 }
	    			}

			$http(req).then(function(jsonResp){
				$rootScope.allLinks = jsonResp.data;
				if(callBack){
					callBack(jsonResp.data);
				}
			}, function(err){
				console.log(err);
			});
	    };

	    $rootScope.checkCurrentUser = function(){
	    	var cookies = $cookies.getAll();
	    	console.log('COOKIES: >>>>>>>', cookies);
			var userKey = cookies['user_key'];
			if(userKey){
				var userEmail = userKey.substring(userKey.lastIndexOf('/')+1);
				$rootScope.currentUser.email = userEmail;
				console.log('$rootScope.currentUser:>>>>> ', $rootScope.currentUser);
			}
	    };

    }]);

    commonModule.directive('fileModel', require('modules/common/directives/fileModelDirective'));
    commonModule.directive('toggle', require('modules/common/directives/toggleDirective'));

    commonModule.filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
          }
        }
        ]).
        filter('unsafe', ['$sce', function($sce) {
          return function(val) {
          	return $sce.trustAsHtml(val);
            }
          }
        ]);

    commonModule.config(['$routeProvider',
                         function($routeProvider) {
  		$routeProvider.
  			when('/dashboard', {
  				templateUrl: 'scripts/modules/common/views/dashboard.html',
  				controller: 'dashboardController',
  				controllerAs: 'vm',
  				access: { requiredLogin: false }
  			}).
        when('/config', {
  				templateUrl: 'scripts/modules/common/views/config.html',
  				controller: 'configController',
  				controllerAs: 'vm',
  				access: { requiredLogin: false }
  			}).
        otherwise('/dashboard');
  	}]);


    return commonModule;

});
