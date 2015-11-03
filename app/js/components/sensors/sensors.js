(function() {
    class SensorsController {
        constructor($filter, SensorsService) {
            this.$filter = $filter;
            this.SensorsService = SensorsService;
            this.getSensors();

            this.xFormat = function(){
                return function(x){
                    return d3.time.format('%d/%m/%y %H:%M')(new Date(x));
                };
            };
            this.yFormat = function() {
                return function(y) {
                    if (typeof y === 'boolean') {
                        return y ? 1 : 0;
                    } else {
                        return y;
                    }
                };
            };
        }

        getSensors() {
            var weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            this.SensorsService.getSensorsWithReadingsSince(weekAgo).then((data) => {
                this.sensors = this.$filter('orderBy')(data, 'name');
                this.chartData = [];
                this.sensors.forEach((sensor) => {
                    this.chartData.push({
                        key: sensor.name,
                        values: sensor.readings.map(function(reading){
                            return [reading.time, reading.numberValue || reading.booleanValue || reading.stringValue];
                        })
                    });
                });
            });
        }
    }

    function routerConfig($stateProvider) {
        $stateProvider
            .state('sensors', {
                url: "/sensors",
                templateUrl: "/js/components/sensors/sensors.html",
                controller: 'SensorsController as sensors'
            });
    }

    angular.module('sarahApp.sensors', ['ui.router', 'lbServices', 'nvd3ChartDirectives']).config(routerConfig);
    register('sarahApp.sensors').
        controller('SensorsController', SensorsController);
})();
