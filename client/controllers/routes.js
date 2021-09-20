
var testInterceptor = function ($q)  
{  
    return {  
      request: function (config) {    
          //Validating the requests whu  
   config.headers['x-csrf-token'] = 'lalalalala';
    return config;   
   
    },
    response: function (result) {   
     //If some manipulation of result is required.                                result["testKey"] = 'testValue';    
    //  console.log('request completed', result.data);    
     return result;    
 },  
    };
  };
// };  




app.config(function($routeProvider, $httpProvider) {
  
  $httpProvider.interceptors.push(testInterceptor);  

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
  .when("/showsome", {
    templateUrl : "../views/show-some-data.html", 
    controller: 'showData',
    filter:"startPagination", 
    vis:true
  })
  .when("/show", {
    resolve:{
      function($location){
        if(document.cookie.indexOf('email') == -1){


          $location.path('/');
        }
      }
    },
    templateUrl : "../views/show-data.html", 
    controller: 'showData',
    filter:"startPagination", 
    
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
  })
  .when("/admin", {
    templateUrl : "../views/register.html", 
    controller: 'adminData'
  })
  .when("/add-school", {
    templateUrl : "../views/add-school.html", 
    controller: 'addSchool'
  })
  .when("/admin-create", {
    templateUrl : "../views/admin-create.html", 
    controller: 'adminData'
  })
  .when("/showcase", {
    templateUrl : "../views/showcase.html", 
    controller: 'adminData'
  });

});
