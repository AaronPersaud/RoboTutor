angular
  .module('MyApp',['ngMaterial' ])
  .controller('DemoCtrl', function($scope) {
    $scope.user = {
      title: 'Enter your questions',
    };
  })
  .config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  });
