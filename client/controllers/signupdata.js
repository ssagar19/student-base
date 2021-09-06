app.controller("signUpData", function ($scope, $http, $location, httpFactory) {
  $scope.vis = false;
    $scope.gname = "";
    $scope.pw = "";
    $scope.msg = '';
    console.log(gname.value, pw.value);
    $scope.sendTheData = httpFactory.sendTheData;
  });