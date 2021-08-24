var app = angular.module("myApp", ["ngRoute", "ui.bootstrap"]);
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


app.factory('httpFactory', function ($http) {
  return {
    logOut: logOut
  };
  function logOut (url) {
    return $http.get(url);
  }
});



