///////////////////////////////////////
////////////// GOALS APP //////////////
///////////////////////////////////////
var app = angular.module('goalsApp', ['ngRoute', 'ngResource']);

///////////////////////////////////////
///////// HEADER CONTROLLER ///////////
///////////////////////////////////////

// controls the session header
app.controller('HeaderController', ['$http', function($http){
  var controller = this;

  $http.get('/session').success(function(data){
    controller.current_user = data.current_user;
  });
}]);

///////////////////////////////////////
////////// GOALS CONTROLLER ///////////
///////////////////////////////////////

// controls the main goals which are akin to "posts" or "articles"
app.controller('GoalController', ['$http', function($http){

  // confirm the authenticity token
  var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  var controller = this;

  // the goal categories for selection in HTML
  this.goal_types = [
    'General',
    'Health',
    'Fitness',
    'Personal',
    'Professional'
  ];

  this.newGoalType = 'General';

  this.getGoals = function(){
    $http.get('/goals').success(function(data){
      controller.current_user_goals = data.goals;
    });
  };

  this.getGoals();

  this.createGoal = function(){
    controller.current_user_goals.push({
      goal_type: this.newGoalType,
      description: this.newGoalDescription
    });

    console.log(controller.current_user_goals);

    $http.post('/goals', {
      authenticity_token: authenticity_token,
      goal: {
        goal_type: this.newGoalType,
        description: this.newGoalDescription
      }
    }).success(function(data){
      controller.current_user_goals.pop();
      controller.current_user_goals.push(data.goal);
      controller.getGoals();
    }).error(function(data, err){
      console.log("ERROR: ", data);
      console.log("ERROR: ", err);
    });
  };
}]);

///////////////////////////////////////
////////// ROUTE CONTROLLER ///////////
///////////////////////////////////////
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
