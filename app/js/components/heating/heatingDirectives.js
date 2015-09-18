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

    function boostTimeDisplay($interval) {
        return {
            template:
                '<span ng-if="remaining > 0">{{remaining}} mins</span>' +
                '<span ng-if="remaining <= 0">off</span>', 
            scope: {
                time: '='
            },
            link: function($scope) {
                var interval;
                var setRemaining = function() {
                    $scope.remaining = $scope.time - new Date().getTime();
                    $scope.remaining = parseInt($scope.remaining / 1000 / 60); //convert ms to mins
                };
                setRemaining();

                $scope.$watch('time', function(){
                    //Update the time display every second
                    interval = $interval(setRemaining, 1000);
                });
                $scope.$on('$destroy',function() {
                    $interval.cancel(interval);
                });
            }
        };
    }

    angular.module('sarahApp.heating').
        directive('srCheckBox', checkBox)
        .directive('srBoostTimeDisplay', boostTimeDisplay);
})();
