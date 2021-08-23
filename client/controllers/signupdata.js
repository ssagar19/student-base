app.controller("signUpData", function ($scope, $http, $location) {
  $scope.vis = false;
    $scope.gname = "";
    $scope.pw = "";
    $scope.msg = '';
    console.log(gname.value, pw.value);
    $scope.sendTheData = function () {
      let data = {
        gname: gname.value,
        pw: pw.value,
      };
      $http.post("http://localhost:3000/signup", data).then((res) => {
console.log(res)
      if(res.data === 'error, user not created'){
$scope.msg = 'user not created';
      }

        console.log(res.data);
        console.log('fefef');
        console.log(res.data.message);
        if(res.data.message === 'Mail Exists'){
          $scope.msg = res.data.message;
                    }
       if (res.data.usr) {
        
          console.log(res.data.usr);
          $location.path("/login");
        }
      });
    };
  });