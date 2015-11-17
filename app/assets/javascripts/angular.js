///////////////////////////////////////
////////////// GOALS APP //////////////
///////////////////////////////////////
var app = angular.module('goalsApp', ['ngRoute', 'ngResource']);

///////////////////////////////////////
///////// HEADER CONTROLLER ///////////
///////////////////////////////////////
app.controller('HeaderController', ['$http', function($http){
  var controller = this;

  $http.get('/session').success(function(data){
    controller.current_user = data.current_user;
  });
}]);

/////////////////////////////////
//// GOALS CONTROLLER ///////////
/////////////////////////////////
app.controller('GoalController', ['$http', function($http){

  var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  var controller = this;

  this.type = ['General', 'Health', 'Fitness', 'Personal', 'Professional'];

  this.getGoal = function(){
    $http.get('/goals').success(function(data){
      controller.current_user_goals = data.goals;
    });
  };

  this.getGoal();

  this.createGoal = function(){
    controller.current_user_goals.push({
      description: this.description,
      type: this.type
    });

    $http.post('/goals', {
      authenticity_token: authenticity_token,
      goal: {
        description: this.description,
        type: this.type
      }
    }).success(function(data){
      controller.current_user_goals.pop();
      controller.current_user_goals.push(data.goal);
      controller.getGoal();
    });
  };
}]);

//////////////////////////////////
///// ROUTE CONTROLLER ///////////
//////////////////////////////////
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  $locationProvider.html5Mode({ enabled: true });

  $routeProvider.
    when('/form', {
      templateUrl: '/templates/form.html',
      controller: 'GoalController',
      controllerAs: 'goal'
    }).otherwise({
      redirectTo: '/'
    });
}]);
