app.controller("loginUpData", function ($scope, $http, $location) {
    $scope.gname = "";
    $scope.vis = false;
    $scope.msg = '';
    $scope.pw = "";
    console.log(gname.value, pw.value);
    $scope.sendingTheData = function () {
      let data = {
        gname: gname.value,
        pw: pw.value,
      };
      $http.post("http://localhost:3000/login", data).then((res) => {
        console.log(res, 'this is res');
        if(res.data.message === 'password did not match'){
$scope.msg = 'password did not match';
        }
        if(res.data.message === "please enter valid email and passwor"){
          $scope.msg = 'please enter valid email and password';
        }
        if (res.data.user) {
          console.log(res.data.user);
          $location.path("/show");
        }
      });
    };
  });
  