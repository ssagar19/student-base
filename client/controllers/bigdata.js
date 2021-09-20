
app.controller("bigData", function ($scope, $http, $location, httpFactory, uibDateParser) {
    $scope.fname = "";
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();
  
    $scope.clear = function() {
      $scope.dt = null;
    };
  
    $scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };
  
    $scope.dateOptions = {
      dateDisabled: disabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };
  
    // Disable weekend selection
    function disabled(data) {
      var date = data.date,
        mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }
  
    $scope.toggleMin = function() {
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
      $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };
  
    $scope.toggleMin();
  
    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };
  
  
    $scope.date = new Date().getDate();
    $scope.month = new Date().getMonth();
    $scope.year = new Date().getYear();
   
  //   $scope.setDate = function(year, month, day) {
      $scope.dt = new Date($scope.year, $scope.month,  $scope.date);
  //   };
  
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
  
    $scope.popup1 = {
      opened: false
    };
  
   
  
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];
  
    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);
  
        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
  
          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }
  
      return '';
    }
    $scope.vis = true;
    $scope.branch = "";
    $scope.isCollapsed = false;


    console.log(document.cookie.indexOf('email'));
    
    if(document.cookie.indexOf('email') === -1){
      $location.path('/login');
    }
    $scope.maths = 0;
    $scope.science = 0;
    $scope.sst = 0;
    $scope.hindi = 0;
    $scope.sanskrit = 0;
    $scope.school = "";
    $scope.message = "";
    $scope.schools = '';
    $scope.val = "";
    $scope.topthree = "j";
    console.log($scope.vis);
    $scope.logout = function () {
      httpFactory.logOut("http://localhost:3000/logout").then(function (response) {
        console.log(response);
      });
      $location.path("/login");
    };
    $http.get('http://localhost:3000/getSchool')
    .then(response =>{
      $scope.schools = response.data;
    });
  
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
      
      let data = {
        fname: fname.value,
        maths: maths.value,
        school: school.value,
        science :science.value,
        sst :sst.value,
        hindi: hindi.value,
        sanskrit : sanskrit.value
      };
      console.log(data);
      $http.post("http://localhost:3000/create", data);
    };
   
  });
 