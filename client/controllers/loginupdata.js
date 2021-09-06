app.controller("loginUpData", function ($scope, $http, $location, httpFactory) {
    $scope.gname = "";
    $scope.vis = false;
    $scope.pw = "";
 $scope.sendingThedata = httpFactory.sendingThedata;
  });
  