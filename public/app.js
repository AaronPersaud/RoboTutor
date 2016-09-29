angular
  .module('MyApp',['ngMaterial', 'ngRoute' ])
  // .config(function($routeProvider) {
  //   $routeProvider
  //   // .when("/", {
  //   //     templateUrl : "index.html"
  //   // })
  //   .when("/q", {
  //       templateUrl : "questions.html"
  //   });
  // })

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
        //console.log(name)
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
            //console.log($scope.fooObject)});
       //console.log($scope.fooObject);
    })
  }

    $scope.card  = null;

    $scope.set = null;

    $scope.Done = function() {

      $http.get('http://www.robotutor.me/questions',{
        params: {uid: $scope.fooObject.uid}
      })
        .success(function(response) {
          //console.log("CONSOLE.LOG!!!!!")
          //console.log(response.results[0])
          Display(response.results)
          $scope.set = response.results
          $scope.card = true;

        })
    }

    $scope.quest = null;
    $scope.counter = 0

    $scope.next = function() {
        $scope.counter += 1;
        Display($scope.set)
    }

    var Display = function(questions) {
          $scope.attempt = '';
          //display question
          $scope.cardanswer = '';
          //console.log(questions[$scope.counter])
          $scope.quest = questions[$scope.counter]
          //hang until they answer question
          //tell them if they got it right or wrong
          //put request
        // tell them all questions done. ask if they want to try again or add more questions
    }


    $scope.cardanswer = '';

    $scope.qanswer = function() {
      //console.log("QUESTION")
      var test = $scope.cardanswer;
      //console.log($scope.quest.answer)
      //console.log($scope.cardanswer)
      if ($scope.cardanswer === "") {
        //alert("ANSWER THE QUESTION");
      }
      else if ($scope.cardanswer !== $scope.quest.answer) {
        //alert("WRONG ANSWER")
        $scope.attempt = "Incorrect. Correct Answer: " + $scope.quest.answer
      }
      else {
        //alert("CORRECT ANSWER")
        $scope.attempt = "Correct!!!"
      }
      // $scope.cardanswer = '';
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
