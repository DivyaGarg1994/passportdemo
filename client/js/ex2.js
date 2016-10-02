var example2 = angular.module('example2',['ngRoute'])
  .config(function($routeProvider){
  // .config(function($routeProvider , $locationProvider){
  //  $locationProvider.html5Mode(true);
    $routeProvider
      .when('/main',{
        templateUrl : 'main.html',
        controller: 'mainCtlr'
      })
      .when('/about',{
        templateUrl : 'about.html',
        controller: 'aboutCtlr'
      })
      .otherwise({
        redirectTo :'/'
      });
  });


  // example2.controller('mainCtlr',function($scope){
  //     $scope.title1 = "main controller";
  // });
  //
  // example2.controller('aboutCtlr',function($scope){
  //     $scope.title2 = "about controller";
  // });
