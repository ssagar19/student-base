var app = angular.module("myApp", ["ngRoute", "ui.bootstrap", "ngResource"]);
app.directive("as", function () {
  return {
    require: "ngModel",
    link: function (scope, element, attributes, control) {
      control.$validators.as = function (modelValue, viewValue) {
        if (control.$isEmpty(modelValue)) {
          // if empty, correct value
          return true;
        }
        var branch = String(viewValue);

        if (branch.length > 2) {
          // correct value
          return true;
        }
        return false; // wrong value
      };
    },
  };
});

app.directive("ad", function () {
  return {
    require: "ngModel",
    link: function (scope, element, attributes, control) {
      control.$validators.ad = function (modelValue, viewValue) {
        if (control.$isEmpty(modelValue)) {
          // if empty, correct value
          return true;
        }

        var name = String(viewValue);

        if (name.length >= 4) {
          // correct value
          return true;
        }
        return false; // wrong value
      };
    },
  };
});

app.directive("bs", function () {
  return {
    require: "ngModel",
    link: function (scope, element, attributes, control) {
      control.$validators.bs = function (modelValue, viewValue) {
        if (control.$isEmpty(modelValue)) {
          // if empty, correct value
          return true;
        }

        var marks = Number(viewValue);

        if (marks >= 0 && marks <= 100) {
          // correct value
          return true;
        }
        return false; // wrong value
      };
    },
  };
});

app.controller('adminData', function($scope, $http, $location){

  $scope.gname = "";
  $scope.vis = false;
  $scope.pw = "";

  $scope.addStudent = function(){
    console.log('hi222');
    document.cookie = `email=${gname.value}`;
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
      
      $scope.fname = "";
      $scope.marks = 0;
      $scope.branch = '';
      $scope.place = '';
    };
   

  }

  $scope.sendTheData = function() {
    console.log('hi');
    let url = "http://localhost:3000/create-admin";
    let data = {
      gname: gname.value,
      pw: pw.value,
    };
document.cookie = `email=${gname.value}`;
    $http.post(url, data).then((res) => {
      console.log(res);
      if (res.data === "error, user not created") {
        msg = "user not created";
      }
      if (res.data.message === "Mail Exists") {
        msg = res.data.message;
      }
      if (res.data.usr) {
        console.log(res.data.usr);
        $location.path("/admin");
      }
    });
  };
 
  // sending the data

  $scope.sendingThedata =  function(){
    msg = "";
    let url = "http://localhost:3000/admin";
    let data = {
      gname: gname.value,
      pw: pw.value,
    };
    document.cookie = `email=${gname.value}`;
    $http
      .post(url, data)
      .then((res) => {
        console.log(res, "this is res");

        if (res.data.message === "password did not match") {
          $.bootstrapGrowl("Incorrect password");
        }
        if (res.data.message === "please enter valid email and passwor") {
          $.bootstrapGrowl("please enter valid email and password");
        }
        if (res.data.user) {
          console.log(res.data.user);
          $location.path("/show");
        }
      })
      .catch(err =>{
        if (err.data.message === "password did not match") {
          $.bootstrapGrowl("Incorrect password", {
            ele: 'body', // which element to append to
            type: 'danger', // (null, 'info', 'error', 'success')
            offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
            align: 'right', // ('left', 'right', or 'center')
            width: 250, // (integer, or 'auto')
            delay: 4000,
            allow_dismiss: true,
            stackup_spacing: 10 // spacing between consecutively stacked growls.
          });
        }
        if (err.data.message === "please enter valid email and passwor") {
          $.bootstrapGrowl("please enter valid email and password", {
            ele: 'body', // which element to append to
            type: 'danger', // (null, 'info', 'error', 'success')
            offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
            align: 'right', // ('left', 'right', or 'center')
            width: 250, // (integer, or 'auto')
            delay: 4000,
            allow_dismiss: true,
            stackup_spacing: 10 // spacing between consecutively stacked growls.
          });
        }
      });
  };

});

app.factory("httpFactory", function ($http, $location) {
  return {
    logOut: logOut,
    sendTheData: sendTheData,
    sendingThedata: sendingThedata,
  };

  function logOut(url) {
    return $http.get(url);
  }

  function sendTheData() {
    let url = "http://localhost:3000/signup";
    let data = {
      gname: gname.value,
      pw: pw.value,
    };
    $http.post(url, data).then((res) => {
      console.log(res);
      if (res.data === "error, user not created") {
        msg = "user not created";
      }
      if (res.data.message === "Mail Exists") {
        msg = res.data.message;
      }
      if (res.data.usr) {
        console.log(res.data.usr);
        $location.path("/login");
      }
    });
  }

  function sendingThedata() {
    msg = "";
    let url = "http://localhost:3000/login";
    let data = {
      gname: gname.value,
      pw: pw.value,
    };
    $http
      .post(url, data)
      .then((res) => {
        console.log(res, "this is res");

        if (res.data.message === "password did not match") {
          $.bootstrapGrowl("Incorrect password");
        }
        if (res.data.message === "please enter valid email and passwor") {
          $.bootstrapGrowl("please enter valid email and password");
        }
        if (res.data.user) {
          console.log(res.data.user);
          $location.path("/showsome");
        }
      })
      .catch(err =>{
        if (err.data.message === "password did not match") {
          $.bootstrapGrowl("Incorrect password", {
            ele: 'body', // which element to append to
            type: 'danger', // (null, 'info', 'error', 'success')
            offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
            align: 'right', // ('left', 'right', or 'center')
            width: 250, // (integer, or 'auto')
            delay: 4000,
            allow_dismiss: true,
            stackup_spacing: 10 // spacing between consecutively stacked growls.
          });
        }
        if (err.data.message === "please enter valid email and passwor") {
          $.bootstrapGrowl("please enter valid email and password", {
            ele: 'body', // which element to append to
            type: 'danger', // (null, 'info', 'error', 'success')
            offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
            align: 'right', // ('left', 'right', or 'center')
            width: 250, // (integer, or 'auto')
            delay: 4000,
            allow_dismiss: true,
            stackup_spacing: 10 // spacing between consecutively stacked growls.
          });
        }
      });
  }
});
app.factory("MyResource", function ($resource) {
  return $resource("http://localhost:3000/totalLength");
});

app.factory("fact1", function ($resource) {
  return $resource("http://localhost:3000/posts", { method: "POST" });
});

app.controller('addSchool', function($scope, $location, $http ){

  $scope.schools = '';
    $scope.school = "";
    $scope.city = "";
    $scope.region = "";
    $scope.email = "";
    $scope.area = '';
  

    $scope.logout = function () {
      httpFactory.logOut("http://localhost:3000/logout").then(function (response) {
        console.log(response);
      });
      $location.path("/login");
    };
  
  $http.get('http://localhost:3000/getSchool')
  .then(response =>{
    $scope.schools = response.data;
  })
  .catch(response => console.log(response));
  
    $scope.addSchool = function (a) {
     
      let data = {
        school: school.value,
        city: city.value,
        region: region.value,
        email: email.value,
        area: area.value,
      };
      $http.post("http://localhost:3000/addSchool", data);
      $scope.school = "";
      $scope.email = '';
      $scope.city = '';
      $scope.region = '';
      $scope.area = '';
    };
   


});
