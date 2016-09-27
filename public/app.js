angular
  .module('MyApp',['ngMaterial', 'ngRoute' ])
  .config(function($routeProvider) {
    $routeProvider
    // .when("/", {
    //     templateUrl : "index.html"
    // })
    .when("/q", {
        templateUrl : "questions.html"
    });
  })

  .controller('DemoCtrl', function($scope, $mdDialog, $http) {
    $scope.user = {
      title: 'Enter your questions',
    };
    $scope.status = '  ';
    $scope.customFullscreen = false;

    $scope.topic = '';
    $scope.text = '';
    $scope.answer = '';

    $scope.showPrompt = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.prompt()
        .title('Please Login')
        .placeholder('Username')
        .ariaLabel('Username')
        .targetEvent(ev)
        .ok('Okay!')
        .cancel('Anonymous');

      $mdDialog.show(confirm).then(function(result) {
        $scope.status = 'You are logged in as ' + result + '.';
        $scope.fooObject.uid = result
        console.log(name)
      }, function() {
        $scope.status = 'You are not logged in';
        $scope.fooObject.uid = "Anonymous"
      });
    };

    $scope.fooObject1 = {"uid":23, "name":name};
    $scope.fooObject2 = {"uid":23, "name":name};
    $scope.fooObject3 = {"uid":23, "name":name};
    $scope.fooObject4 = {"uid":23, "name":name};
    $scope.fooObject5 = {"uid":23, "name":name};

    $scope.fooObject = {}

    $scope.onSubmit = function(){
      $scope.fooObject.question = $scope.text;
      $scope.fooObject.topic = $scope.topic;
      $scope.fooObject.answer = $scope.answer;


       $http.post("http://www.robotutor.me/questions", $scope.fooObject)
          .success(function() {
            $scope.text = '';
            $scope.answer = '';
            $scope.topic = '';
            console.log($scope.fooObject)});
       console.log($scope.fooObject);
    }

    $scope.Done = function() {

      $http.get('http://www.robotutor.me/questions',{
        params: {uid: $scope.fooObject.uid}
      })
        .success(function(response) {
          console.log("CONSOLE.LOG!!!!!")
          console.log(response.results[0])
          Display(response.results)
        })
    }

    var Display = function(questions) {
        for (var i = 0; i < questions.length; i++) {
          //display question
          console.log(questions[i])
          //hang until they answer question
          //tell them if they got it right or wrong
          //put request
        }
        // tell them all questions done. ask if they want to try again or add more questions
    }

  })
  .config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  })

  .directive('question', function() {
    return {
      scope: true,
      template: '<div layout-gt-sm="row"><md-input-container class="md-block" flex-gt-sm=""><label>Question</label><input ng-model="fooObject.question1"></md-input-container><md-input-container class="md-block" flex-gt-sm=""><label>Answer</label><input ng-model="fooObject.answer1"></md-input-container></div>'
    };
  });
