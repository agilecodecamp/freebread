var app = angular.module('freebread', ['ionic', 'ngCordova']);
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  // initial parse
  Parse.initialize(
    "7z7UGCkHeURMNFoOU3LrlGf4U8whKwLV7VYvM5me",
    "3Lxx553CcuSYNzTUYx4dwQcuGsRB5qD0ccfeE8fU"
  );
});

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html"
    })
    .state('app.list', {
      url: '/list',
      views: {
        'menuContent': {
          templateUrl: 'templates/bread-list.html',
          controller: 'breadListCtrl'
        }
      }
    })
    .state('app.add', {
      url: '/add',
      views: {
        'menuContent': {
          templateUrl: 'templates/bread-add.html',
          controller: 'addBreadCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/app/add');
}]);