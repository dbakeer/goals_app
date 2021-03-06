///////////////////////////////////////
////////////// GOALS APP //////////////
///////////////////////////////////////
var app = angular.module('goalsApp', ['ngRoute', 'ngResource']);


///////////////////////////////////////
////////// ROUTE CONTROLLER ///////////
///////////////////////////////////////
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  $locationProvider.html5Mode({ enabled: true });

  $routeProvider
    .when('/application/angular', {
      templateUrl: '/templates/all.html',
      controller: 'GoalController',
      controllerAs: 'goal'
    }).when('/goals/:goal_id', {
      templateUrl: '/templates/all.html',
      controller: 'GoalController',
      controllerAs: 'goal'
    }).when('/steps/:id', {
      templateUrl: '/templates/all.html',
      controller: 'GoalController',
      controllerAs: 'goal'
    }).when('/goals', {
      templateUrl: '/templates/all.html',
      controller: 'GoalController',
      controllerAs: 'goal'
    }).otherwise({
      redirectTo: '/'
    });
}]);

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
app.controller('GoalController', ['$http', '$location', '$routeParams', '$route', function($http, $location, $routeParams, $route, $scope){

  // confirm the authenticity token
  var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  var controller = this;

  // the goal categories for selection in HTML
  this.newGoalType = 'General';

  this.goal_types = ['General', 'Health', 'Fitness', 'Personal', 'Professional'];

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
    this.newGoalDescription = '';
    this.newGoalType = 'General';
  };

  this.getGoals();


  // edit a goal
  this.editGoal = function(goal){
    $http.patch('/goals/' + goal.id, {
      authenticity_token: authenticity_token,
      goal: {
        description: goal.description
      }
    }).success(function(data){
      console.log(data);
    }).error(function(err){
      console.log("ERROR: ", err);
    });
  };


  // delete a goal because it embarrasses you or something
  this.deleteGoal = function(goal){
    $http.delete('/goals/' + goal.id, {
      authenticity_token: authenticity_token
    }).success(function(data){
      console.log(data);
    });
    $route.reload();
  };
}]);


///////////////////////////////////////
////////// STEPS CONTROLLER ///////////
///////////////////////////////////////
app.controller('StepController', ['$http', '$scope', '$route', function($http, $scope, $route){

    var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    // create a step
    this.createStep = function(){

      $scope.$parent.goal.steps.push({
        step: this.newStep
      });

      $http.post('/goals/' +$scope.$parent.goal.id+ '/steps', {
        authenticity_token: authenticity_token,
        step: {
          step: this.newStep
        }
      }).success(function(stepData){
      });
    };

    // edit a step
    this.editStep = function(step){
      $http.patch('/steps/' + step.id, {
        authenticity_token: authenticity_token,
        step: {
          step: step.step
        }
      }).success(function(data){
        console.log(data);
      }).error(function(err){
        console.log("ERROR: ", err);
      });
    };

    // delete a step
    this.deleteStep = function(step){
      $http.delete('/steps/' + step.id, {
        authenticity_token: authenticity_token
      }).success(function(data){
        console.log(data);
      }).error(function(err){
        console.log("ERROR");
      });
      $route.reload();
    };
}]);
