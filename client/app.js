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
          msg = "password did not match";
        }
        if (res.data.message === "please enter valid email and passwor") {
          msg = "please enter valid email and password";
        }
        if (res.data.user) {
          console.log(res.data.user);
          $location.path("/show");
        }
      })
      .catch(angular.noop);
  }
});
app.factory("MyResource", function ($resource) {
  return $resource("http://localhost:3000/totalLength");
});

app.factory("fact1", function ($resource) {
  return $resource("http://localhost:3000/posts", { method: "POST" });
});
