app.controller("showData", function ($scope, $http, $location, httpFactory) {
    $scope.len = 0;
  $scope.vis = true;
  console.log($scope.vis);
    $http.get("http://localhost:3000/totalLength").then((response) => {
      $scope.len = response.data;
      console.log(response);
    });
    $scope.$validator = "";
    $scope.logout = function () {
      httpFactory.redditGet("http://localhost:3000/logout").then(function (response) {
        console.log(response);
      });
      $location.path("/login");
    };
    $scope.currentPage = 1;
    $scope.posts = "";
    let data = {};
    data.page = 0;
    data.limit = 10;
    $scope.heads = ["school", "branch", "marks", "name", "place"];
    $http.post("http://localhost:3000/posts", data).then(function (response) {
      console.log(response.data);
      if(response.data === '404 error'){
        $location.path("/login");

      }
      console.log($scope.currentPage);
      $scope.posts = response.data;
      console.log($scope.posts);
      console.log($scope.posts.length);
    });
    $scope.pageChanged = function () {
      console.log("Page changed to: " + $scope.currentPage);
      data.page = $scope.currentPage - 1;
  
      console.log(data);
      $scope.posts = "";
      $http.post("http://localhost:3000/posts", data).then(function (response) {
        console.log(response.data);
        $scope.posts = response.data;
      });
    };
    $scope.setItemsPerPage = function (num) {
      $scope.itemsPerPage = num;
      $scope.currentPage = 1; //reset to first page
    };
  
  });
//   app.factory('httpFactory', function ($http) {
//     return {
//       redditGet: redditGet
//     };
//     function redditGet (url) {
//       return $http.get(url);
//     }
//   });