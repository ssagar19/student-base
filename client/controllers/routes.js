
app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : '../views/login.html',
    controller: 'loginUpData',
    vis:false
  })
  .when("/add", {
    templateUrl : "../views/form.html",
    controller:"bigData",
    vis:true
  })
  .when("/show", {
    templateUrl : "../views/show-data.html", 
    controller: 'showData',
    filter:"startPagination", 
    vis:true
  })
  .when("/signup", {
    templateUrl : "../views/signup.html", 
    controller: 'signUpData',
    vis: false
  })
  .when("/login", {
    templateUrl : "../views/login.html", 
    controller: 'loginUpData',
    vis:false
  })
  .when("/analytics", {
    templateUrl : "../views/analytics.html", 
    controller: 'bigData', 
    vis:true
  });
});
