var example1 = angular.module('example1',[]);

    example1.controller('ctlr1',function($scope){
        $scope.updateValue = function(){
          $scope.calculate = $scope.first +'+'+ $scope.second +'='+ (+$scope.first + +$scope.second);
        }
    });

    example1.controller('ctlr2',function($scope){
        $scope.groceries = [
          {item:"tomato" , status:"available"},
          {item:"potato" , status:"out of stock"},
          {item:"onion" , status:"available"}
        ];

        $scope.getList = function(){
          return $scope.showList ? "g2.html" :"g1.html";
        };
    });

    example1.controller('event',function($scope){
      $scope.blur=0;
      $scope.keydown = function(e){
          $scope.key = String.fromCharCode(e.keyCode);
      };

    });
