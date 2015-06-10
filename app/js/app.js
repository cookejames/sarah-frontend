(function() {
    'use strict';

    angular.module('sarahApp', [
        'sarahApp.heating',
        'sarahApp.heating.group',
        'sarahApp.sensors',
        'sarahApp.sensors.node',
        'sarahApp.filters',
        'sarahApp.config',
        'ui.router'
    ]).controller('SarahAppController', SarahAppController).
    config(routerConfig).
    config(loopBackConfig).
    directive('ngConfirmClick', [confirmClickDirective]);

    function SarahAppController() {
    }

    function routerConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/heating");
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