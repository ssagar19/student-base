app.controller("bigData", function ($scope, $http, $location, httpFactory) {
    $scope.fname = "";
    $scope.vis = true;
    $scope.branch = "";
    if(!document.cookie){
      $location.path('/login');

    }
    $scope.marks = 0;
    $scope.school = "";
    $scope.place = "";
    $scope.firstName = "";
    $scope.message = "";
    $scope.val = "";
    $scope.topthree = "j";
    console.log($scope.vis);
    $scope.logout = function () {
      httpFactory.logOut("http://localhost:3000/logout").then(function (response) {
        console.log(response);
      });
      $location.path("/login");
    };
  
    $scope.getTopthree = function () {
      var data = {
        topthree: topthree.value,
      };
      if (topthree.value.length <= 1) {
        return;
      }
  
      $http
        .post("http://localhost:3000/myposts", data)
        .then(function (response) {
          $scope.val = response.data;
          $scope.topthree.value = "";
        })
        .catch((err) => console.log(err));
    };
  
    $scope.consoleData = function (a) {
      if (a) {
        let data = {
          a: a,
        };
        console.log(data);
  
        $http.post("http://localhost:3000/create", data);
        return;
      }
      if (fname.value.length <= 3) {
        console.log(fname.value.length);
        $scope.message = "name must be greater than 3 characters";
        return;
      } else if (Number(marks.value) > 750) {
        $scope.message = "marks must be smaller than 750";
        return;
      } else {
        $scope.message = "no message";
      }
      console.log(fname.value);
      let data = {
        fname: fname.value,
        branch: branch.value,
        marks: marks.value,
        school: school.value,
        place: place.value,
      };
      $http.post("http://localhost:3000/create", data);
    };
    $scope.marks = 0;
    $scope.school = "";
    $scope.branch.value = "";
    $scope.place.value = "";
    console.log('hi');
    
    $scope.fname = "";
  });
 