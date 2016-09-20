angular
  .module('MyApp',['ngMaterial' ])
  .controller('DemoCtrl', function($scope, $mdDialog) {
    $scope.user = {
      title: 'Enter your questions',
    };
    $scope.status = '  ';
    $scope.customFullscreen = false;

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
      }, function() {
        $scope.status = 'You are not logged in';
      });
    };
  })
  .config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  })

  .controller('AppCtrl', function($scope, $mdDialog) {

  });