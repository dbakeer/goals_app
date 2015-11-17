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

    $http.post('/goals', {
      authenticity_token: authenticity_token,
      goal: {
        goal_type: this.newGoalType,
        description: this.newGoalDescription
      }
    }).success(function(data){
      controller.current_user_goals.pop();
      controller.current_user_goals.push(data.goal);
    });
    controller.getGoals();
  };
}]);


///////////////////////////////////////
////////// STEPS CONTROLLER ///////////
///////////////////////////////////////
app.controller('StepController', ['$http', '$scope', function($http, $scope){

    var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    $scope.$parent.goal.steps = [];

    this.createStep = function(){
      $http.post('/goals/' +$scope.$parent.goal.id+ '/steps', {
        authenticity_token: authenticity_token,
        step: {
          step: this.newStep
        }
      }).success(function(stepData){
        console.log(stepData.step);
        console.log($scope.$parent.goal);
        console.log($scope.$parent.goal.steps);
      });
      $scope.$parent.goal.steps.push({
        step: this.newStep
      });
    };
}]);

///////////////////////////////////////
////////// ROUTE CONTROLLER ///////////
///////////////////////////////////////
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  $locationProvider.html5Mode({ enabled: true });

  $routeProvider
    .when('/form', {
      templateUrl: '/templates/form.html',
      controller: 'GoalController',
      controllerAs: 'goal'
    }).when('/show', {
      templateUrl: '/templates/show.html',
      controller: 'GoalController',
      controllerAs: 'goal'
    }).otherwise({
      redirectTo: '/'
    });
}]);
