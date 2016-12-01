
console.log('\n\n<<<<<<<<< INSIDE main.js >>>>>>>>>');

require.config({
    paths :{
    	'jquery' : '../scripts/lib/jquery/dist/jquery.min',
        'angular' :'../scripts/lib/angular/angular.min',
        'angularRoute' : '../scripts/lib/angular-route/angular-route.min',
        'angularLocalStorage' : '../scripts/lib/angular-local-storage/dist/angular-local-storage.min',
        'angularAnimate' : '../scripts/lib/angular-animate/angular-animate.min',
        'angularFilesystem': '../scripts/lib/angular-filesystem/src/filesystem',
        'angularToastr': '../scripts/lib/angular-toastr/dist/angular-toastr.tpls.min',
        'angularCookies' : '../scripts/lib/angular-cookies/angular-cookies.min',
        'bootstrap' : '../scripts/lib/bootstrap/dist/js/bootstrap.min',
        'ui.bootstrap':'../scripts/lib/angular-bootstrap/ui-bootstrap.min',
        'cryptojslib' : '../scripts/lib/cryptojslib/rollups/pbkdf2',
        'querystring': '../scripts/lib/querystring/querystring.min',
        'text': '../scripts/lib/text'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angularRoute' :{
            deps: ['angular']
        },
        'angularAnimate' :{
            deps: ['angular']
        },
        'angularToastr': {
            deps: ['angularAnimate']
        },
        'angularLocalStorage' :{
            deps: ['angular']
        },
        'angularFilesystem' :{
            deps: ['angular']
        },
        'angularCookies' :{
            deps: ['angular']
        },
        'cryptojslib' : {
            exports : 'cryptojslib'
        },
        'querystring' : {
            exports : 'querystring'
        },
        'jquery':{
        	 exports : 'jquery'
        },
        'bootstrap' : {
        	deps: ['jquery'],
        	exports: 'bootstrap'
        }, 
        'ui.bootstrap': {
            deps: ['angular','bootstrap'],
            exports: 'ui.bootstrap'
        }           
    },
    priority: 
    	[
           'jquery',
	       'angular',
	       'cryptojslib',
	       'querystring',
	       'bootstrap',
	       'ui.bootstrap'
	   ],
   deps: [
          'initialize'
          ]
});

/*
require(['require','angular','bootstrap','app'], function () {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['myworkstyle']);
    });
});
*/
