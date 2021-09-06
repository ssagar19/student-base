app.controller(
  "showData",
  function (
    $scope,
    $http,
    $location,
    httpFactory,
    MyResource,
    $resource,
    fact1
  ) {
    $scope.len = 0;
    $scope.vis = true;
    console.log($scope.vis);
    MyResource.query(function (vals) {
      $scope.len = vals.length;
    });
    fact1.save().$promise.then(function (todos) {
      $scope.posts = todos.doc;
    });
    $scope.$validator = "";
    if (!document.cookie) {
      $location.path("/login");
    }
    $scope.logout = function () {
      httpFactory
        .logOut("http://localhost:3000/logout")
        .then(function (response) {
          console.log(response.data);
        });
      $location.path("/login");
    };
    $scope.currentPage = 1;
    $scope.posts = "";
    let data = {};
    data.page = 0;
    data.limit = 10;
    $scope.heads = ["school", "branch", "marks", "name", "place"];
    $scope.pageChanged = function () {
      console.log("Page changed to: " + $scope.currentPage);
      data.page = $scope.currentPage - 1;
      $scope.posts = "";
      $http.post("http://localhost:3000/posts", data).then(function (response) {
        $scope.posts = response.data.doc;
      });
    };
    $scope.deleteThis = function (id) {
      let data = { id: id };
      console.log(data);
      $http
        .post("http://localhost:3000/delete", data)
        .then(function (response) {
          console.log(response.data);
          $scope.pageChanged();
        });
    };
    $scope.setItemsPerPage = function (num) {
      $scope.itemsPerPage = num;
      $scope.currentPage = 1; //reset to first page
    };
  }
);
