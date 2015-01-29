(function(){
  'use strict';
  var recipinoy = angular.module('recipinoy', ['onsen']);
  var localStorage = window.localStorage;
  var isLogin = false;

  recipinoy.config(function($httpProvider){
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }); //to allow cross origin request


  /*=========================================================
  *               SEARCH CONTROLLER
  *==========================================================*/
  recipinoy.controller('searchCtrlr',function($scope,$http){
     $scope.isLogin = isLogin;
     $http.get('json/provinces.json').
      success(function(data) {
        $scope.provinces = data;
        $scope.location = $scope.provinces[0];
      }); //get province list
      $http.get('json/categories.json').
      success(function(categories) {
        $scope.categories = categories;
        $scope.category = $scope.categories[0];
      }); //get categories list
  
    $scope.search = function(name,location,category){ 
      $scope.isLoading = true;
      $http({
        method: "GET",
        url: "http://recipinoy-sdgnosis.rhcloud.com/search.php",
        // url: "php/search.php",
        params: {name: name, location: location, category: category}
      }).success(function(response){
        if(response == "No results") {
          $scope.isResults = false;
          $scope.recipes = response;
          $scope.isLoading = false;
        } else {
          $scope.isResults = true;
          $scope.recipes = response; 
          $scope.isLoading = false; 
        } 
      }); //get recipes
    };  //search function
    $scope.getRecipeInfo = function(rcpno){
      console.log("recipe no " + rcpno);
      $http({
        method: "GET",
        url: "http://recipinoy-sdgnosis.rhcloud.com/recipes.php",
        // url: "php/recipes.php",
        params: {rcpno: rcpno}
      }).success(function(recipe){
          $scope.recipe = recipe; 
          $http({
            method: "GET",
            url: "http://recipinoy-sdgnosis.rhcloud.com/ingredients.php",
            // url: "php/ingredients.php",
            params: {rcpno: rcpno }
          }).success(function(ingredient){
              $scope.ingredients = ingredient;
              nav.pushPage('recipes.html');
          }); // get ingredients request
      }); //get recipes request
    } //get recipe info function
  }); //search controller

    
  /*=========================================================
  *               LOGIN CONTROLLER
  *==========================================================*/
   recipinoy.controller('loginCtrlr',function($scope,$http){
    $scope.accessDenied = false;
    $scope.login = function(username,password){
      $scope.granted = false;
      $http({
        method: "GET",
        url: "http://recipinoy-sdgnosis.rhcloud.com/login.php",
        // url: "php/login.php",
        params: {username: username, password: password}
      }).success(function(response){
        if(response == "1") {
          localStorage.setItem('user',username);
          $scope.granted = true;
            $http({
              method: "GET",
              url: "http://recipinoy-sdgnosis.rhcloud.com/profile.php",
              // url: "php/profile.php",
              params: {username: username}
            }).success(function(data){
              $scope.user = data;
              nav.pushPage('myhome.html');
              menu.setMenuPage('templates/account/loggedmenu.html', {closeMenu: true});
            }); //get profile
        } else {
          $scope.accessDenied = true;
          localStorage.removeItem('user');
          $scope.granted = false;
        }
      }); //login request
    }; //login function
    $scope.logout = function(){
      localStorage.removeItem('user');

      menu.setMainPage('templates/general/home.html');
      menu.setMenuPage('templates/general/menu.html',{closeMenu: true});
      
      

    }; //logout 
  }); //login controller

  


  

  /*=========================================================
  *               REGISTER CONTROLLER
  *==========================================================*/
  recipinoy.controller('registerCtrlr',function($scope,$http){
    $scope.register = function(isValid) {
      if(isValid) {
        $http({
          method: "POST",
          url: "http://recipinoy-sdgnosis.rhcloud.com/register.php",
          // url: "php/register.php",
          data: {
            fname:      $scope.fname,
            lname:      $scope.lname,
            mi:         $scope.mi,
            dob:        $scope.dob,
            gender:     $scope.gender,
            address:    $scope.address, 
            contactno:  $scope.contactno,
            email:      $scope.email,
            username:   $scope.username,
            password:   $scope.password
          }
          
        }).success(function(response){
          alert(response);
          nav.pushPage('profile.html');
        }); // post register
      } else {
        alert("Not valid");
        $scope.valid = false;
        $scope.submitted = true;
      }
    } //register function
  }); //register controller

 

  
  
})();

