(function() {
  'use strict';

  angular.module('sarahApp', [
    'sarahApp.heating',
    'sarahApp.heating.group',
    'sarahApp.sensors',
    'sarahApp.switches',
    'sarahApp.login',
    'sarahApp.filters',
    'sarahApp.config',
    'ui.router',
    'ngAnimate',
    'ngMaterial'
  ]).controller('SarahAppController', SarahAppController)
    .config(routerConfig)
    .config(loopBackConfig)
    .config(configureTheme)
    .directive('ngConfirmClick', [confirmClickDirective]);

  function SarahAppController($scope, $mdSidenav){
    $scope.toggleSidenav = () => $mdSidenav('sidenav').toggle();
    $scope.$on('$stateChangeSuccess', () => $mdSidenav('sidenav').close());
  }

  function configureTheme($mdThemingProvider, $mdIconProvider){
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('orange');
  }

  function routerConfig($locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/heating");
    $locationProvider.html5Mode(true);
  }

  function loopBackConfig(LoopBackResourceProvider, apiUrl) {
    // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase(apiUrl);
  }

  function confirmClickDirective() {
    return {
      priority: -1,
      restrict: 'A',
      link: function(scope, element, attrs){
        element.bind('click', function(e){
          var message = attrs.ngConfirmClick;
          if(message && !confirm(message)){
            e.stopImmediatePropagation();
            e.preventDefault();
          }
        });
      }
    };
  }
})();