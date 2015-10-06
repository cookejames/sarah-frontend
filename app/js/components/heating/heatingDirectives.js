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

    function heatingStatus(HeatingService) {
        var boostStatus = {
            heating: 0,
            water: 0
        };
        var boostTime = {
            heating: 0,
            water: 0
        };

        /**
         * Get the boost status and assign it to the local
         */
        var getBoostStatus = function() {
            HeatingService.getBoostStatus().then((data) => {
                boostStatus = angular.extend(boostStatus, data);
                //Add the current time to heating/water to get the end time
                boostStatus.heating += new Date().getTime();
                boostStatus.water += new Date().getTime();
            });
        };

        /**
         * Boost the heating
         */
        var boostHeating = function(time) {
            if (boostTime.heating === 0) {
                return;
            }
            HeatingService.boostHeating(boostTime.heating).then((times) => {
                getBoostStatus();
                boostTime.heating = 0;
            });
        };

        /**
         * Boost the water
         */
        var boostWater = function() {
            if (boostTime.water === 0) {
                return;
            }
            HeatingService.boostWater(boostTime.water).then((times) => {
                getBoostStatus();
                boostTime.water = 0;
            });
        };

        getBoostStatus();

        return {
            templateUrl: '/js/components/heating/heatingStatusDirective.html',
            scope: {
                status: '=',
                type: '=',
                maxBoostTime: '='
            },
            link: function($scope) {
                switch ($scope.type) {
                    case 'heating':
                        $scope.label = 'Heating';
                        $scope.boostFunction = boostHeating;
                        break;
                    case 'water':
                        $scope.label = 'Water';
                        $scope.boostFunction = boostWater;
                        break;
                }

                $scope.boostStatus = boostStatus;
                $scope.boostTime = boostTime;
                if (typeof $scope.maxBoostTime === 'string' && parseInt($scope.maxBoostTime)) {
                    $scope.maxBoostMinutes = Array.from(Array(parseInt($scope.maxBoostTime)).keys());
                }
            }
        };
    }

    angular.module('sarahApp.heating')
        .directive('srCheckBox', checkBox)
        .directive('srHeatingStatus', ['HeatingService', heatingStatus])
        .directive('srBoostTimeDisplay', boostTimeDisplay);
})();
