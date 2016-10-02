example2.controller('mainCtlr',function($scope , $location){
    $scope.title1 = "main controller";
});

example2.controller('aboutCtlr',function($scope, $location ,$http){
    $http.get('/resultui.json').success(function(data){
      console.log(data);
      $scope.data = data;
    }).error(function(data,status , headers , config){
      console.error(data,status,headers,config);
      if(status === 404)
        window.alert("not found");
      else {
        window.alert("unknown error");
      }
    });//http

    $scope.title2 = "about controller";
    $scope.abt = "this is about us page";
    $scope.ran = function(){
        // var url = '/main';
        // $location.url(url);
        $scope.abt = "this is about us page on click";
    }
    $scope.temp = function(){
      $scope.abt = "this is about us page on click";
    }
});
