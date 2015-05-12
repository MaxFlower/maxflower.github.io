
angular.module('MaxFlowerApp', [
    'ngRoute',
    'app.refresh_div'
    ]);

//app config
angular
    .module('MaxFlowerApp')
    .config(config);

function config($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);
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

//mainController
angular
    .module('MaxFlowerApp')
    .controller('mainController', mainController);

function mainController($scope) {       
    $scope.message = 'Everyone come and see how good I look!';
}

//examplesController
angular
    .module('MaxFlowerApp')
    .controller('examplesController', examplesController);

function examplesController($scope) {       
    $scope.message = 'That is examplesPage!!!';
}

//projectsController
angular
    .module('MaxFlowerApp')
    .controller('projectsController', projectsController);

function projectsController($scope) {       
    $scope.message = 'That is projectsPage!!!';
}

//contactController
angular
    .module('MaxFlowerApp')
    .controller('contactController', contactController);

function contactController($scope) {       
    $scope.message = 'That is contactPage!!!';
}


angular.module('app.refresh_div',[]);

angular
    .module('app.refresh_div')
    .service('GetLimits', sourceLimits);

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

angular
    .module('app.refresh_div')
    .service('GetCurrentValue', sourceData);

//GetCurrentValue service
function sourceData () {
    /*jshint validthis: true*/
    var getValue = this;
    getValue.getData = function (a, b, c) {
    return (a + Math.random()*b).toFixed(c);    
    };
}

angular
    .module('app.refresh_div')
    .directive('widget', widget);

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
    }
}