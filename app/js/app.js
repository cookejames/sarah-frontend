(function() {
    'use strict';

    angular.module('sarahApp', [
        'sarahApp.heating',
        'sarahApp.heating.group',
        'sarahApp.login',
        'sarahApp.filters',
        'sarahApp.config',
        'ui.router',
        'ui.bootstrap'
    ]).controller('SarahAppController', SarahAppController).
    config(routerConfig).
    config(loopBackConfig).
    directive('ngConfirmClick', [confirmClickDirective]);

    function SarahAppController() {
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