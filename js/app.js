//--------------------------------------------
//---Declare main module with dependencies----
//--------------------------------------------

angular.module('MaxFlowerApp', ['ngRoute','app.refresh_div']);

    //app config
    angular
        .module('MaxFlowerApp')
        .config(config);

    //mainController
    angular
        .module('MaxFlowerApp')
        .controller('mainController', mainController); 
        
    //examplesController
    angular
        .module('MaxFlowerApp')
        .controller('examplesController', examplesController);  

    //projectsController
    angular
        .module('MaxFlowerApp')
        .controller('projectsController', projectsController);

    //contactController
    angular
        .module('MaxFlowerApp')
        .controller('contactController', contactController); 

    
// refresh module for main page(declared in MaxFlowerApp module) 
angular.module('app.refresh_div',[]);

    angular
        .module('app.refresh_div')
        .service('GetLimits', sourceLimits);

    angular
        .module('app.refresh_div')
        .service('GetCurrentValue', sourceData);

    angular
        .module('app.refresh_div')
        .directive('widget', widget);

    //-----------------------------------
    //------------All functions----------
    //-----------------------------------


    //config for MaxFlowerApp module
    function config($locationProvider, $routeProvider) {
        // don't use # sign in URL
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $routeProvider 
            // home
            .when('/', {
                templateUrl : '/pages/home.html',
                controller  : 'mainController'
            })
            //404
            .when('/404', {
                templateUrl : '/pages/404.html',
                controller  : 'mainController'
            })  
            // examples
            .when('/examples', {
                templateUrl : '/pages/examples.html',
                controller  : 'examplesController'
            })
            //projects
            .when('/examples/projects', {
                templateUrl : '/pages/examples/projects.html',
                controller  : 'projectsController'
            })  
            // contact
            .when('/contact', {
                templateUrl : '/pages/contact.html',
                controller  : 'contactController'
            })
            .otherwise({redirectTo: '/'});                   
    }

    //functions for Controllers
    function mainController($scope) {       
        $scope.message = 'Everyone come and see how good I look!';
    }
    function examplesController($scope) {       
        $scope.message = 'That is examplesPage!!!';
    }
    function projectsController($scope) {       
        $scope.message = 'That is projectsPage!!!';
    }
    function contactController($scope) {       
        $scope.message = 'That is contactPage!!!';
    }

    //Functons for refresh module
    //GetLimits service
    function sourceLimits () {
        /*jshint validthis: true*/
        var putLimit = this;
        putLimit.getSourceLimits = function (sourceName) {        
            if (sourceName ==='cpu') return {min: 0, max: 100, measure: '%', accuracy: 0};
            if (sourceName ==='memoryUsed') return {min: 0, max: 5, measure: 'Gb', accuracy: 2};
            if (sourceName ==='memoryAvailable') return {min: 0, max: 3, measure: 'Gb', accuracy: 2};   
        };
    }
    //GetCurrentValue service
    function sourceData () {
        /*jshint validthis: true*/
        var getValue = this;
        getValue.getData = function (a, b, c) {
        return (a + Math.random()*b).toFixed(c);    
        };
    }
    //function for widget-directive
    function widget(){
        return {
            restrict: 'E',
            replace: true,                  
            scope: {
                widgetSource:'@src'
                },
            template: '<div class="box"> {{widgetSource + " :  " + sourceData + " " + sourceDef.measure}}</div>',                   
            controller: function($scope, $interval, GetLimits, GetCurrentValue) {                       
                $interval(function(){               
                    $scope.sourceDef = GetLimits.getSourceLimits($scope.widgetSource);                          
                    $scope.sourceData = GetCurrentValue.getData($scope.sourceDef.min, $scope.sourceDef.max, $scope.sourceDef.accuracy);                         
                }, 2000);   
            }                           
        };
    }

