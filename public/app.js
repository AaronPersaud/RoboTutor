angular
  .module('MyApp',['ngMaterial' ])
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
        //.textContent('Bowser is a common name.')
        .placeholder('Username')
        .ariaLabel('Dog name')
        //.initialValue('Buddy')
        .targetEvent(ev)
        .ok('Okay!')
        .cancel('Anonymous');

      $mdDialog.show(confirm).then(function(result) {
        $scope.status = 'You are logged in as ' + result + '.';
        $scope.fooObject.uid = result
        console.log(name)
      }, function() {
        $scope.status = 'You are not logged in';
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
