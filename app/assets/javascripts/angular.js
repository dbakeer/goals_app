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
    this.newGoalDescription = '';
    this.newGoalType = 'General';
  };

  // edit a goal
  // this.editGoal = function(goal) {
  //   console.log("goal is: ", goal);
  //
  // };

  // delete a goal because it embarrasses you or something
  this.deleteGoal = function(goal){
    var index = controller.current_user_goals.indexOf(goal);
    controller.current_user_goals.splice(index, 1);
    console.log(goal.id);

    $http.delete('/goals/' + goal.id, {
      authenticity_token: authenticity_token
    }).success(function(data){
      console.log("SUCCESS: ", data);
    }).error(function(data, err){
      console.log("ERROR: ", err);
    });
    controller.getGoals();
  };
}]);


///////////////////////////////////////
////////// STEPS CONTROLLER ///////////
///////////////////////////////////////
app.controller('StepController', ['$http', '$scope', function($http, $scope){

    var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

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
}]);

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
    }).when('/goals/:id', {
      templateUrl: '/templates/all.html',
      controller: 'GoalController',
      controllerAs: 'goal'
    }).otherwise({
      redirectTo: '/'
    });
}]);
