(function() {
    /**
     * Creates a glyphicon tick box or cross depending on the value
     * @returns {{scope: {value: string}, template: string}}
     */
    function checkBox() {
        return {
            scope: {
                value: '=value'
            },
            template: '<span ng-class="{\'glyphicon-check text-success\': value, \'glyphicon-unchecked text-danger\': !value}" class="glyphicon" aria-hidden="true"></span>'
        };
    }

    function onOff() {
        return {
            scope: {
                value: '=value',
                label: '=label'
            },
            templateUrl: '/js/components/heating/heatingOnOffDirective.html'

        };
    }

    function boostTimeDisplay($interval) {
        return {
            template:
                '<span ng-if="remaining > 0">{{remaining}} minutes</span>' +
                '<span ng-if="remaining <= 0">off</span>', 
            scope: {
                time: '='
            },
            link: function($scope) {
                var interval;
                $scope.$watch('time', function(){
                    interval = $interval(function(){
                        $scope.remaining = $scope.time - new Date().getTime();
                        $scope.remaining = parseInt($scope.remaining / 1000 / 60); //convert ms to mins
                    }, 1000);
                });
                $scope.$on('$destroy',function() {
                    $interval.cancel(interval);
                });
            }
        };
    }

    angular.module('sarahApp.heating').
        directive('srCheckBox', checkBox).
        directive('srOnOff', onOff)
        .directive('srBoostTimeDisplay', boostTimeDisplay);
})();
