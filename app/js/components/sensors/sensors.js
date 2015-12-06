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
        }

        getSensors() {
            var weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            this.SensorsService.getSensorsWithReadingsSince(weekAgo).then((data) => {
                this.sensors = this.$filter('orderBy')(data, 'name');
                this.chartData = [];
                this.sensors.forEach((sensor) => {
                    //Used to smooth out the graph by averaging the last 5 readings
                    var avg = [undefined, undefined, undefined, undefined, undefined];
                    this.chartData.push({
                        key: sensor.name,
                        values: sensor.readings.map(function(reading){
                            switch (sensor.type) {
                                case 'boolean':
                                    var value = reading.booleanValue ? 1 : 0;
                                    break;
                                case 'float':
                                    //Remove the last element from the avg array
                                    avg.pop();
                                    //Add this reading to the array
                                    avg.unshift(reading.numberValue);
                                    //Calculate the average of the array
                                    var count = 0, sum = 0;
                                    avg.forEach(function(val){
                                        if (val !== undefined) {
                                            sum += val;
                                            count++;
                                        }
                                    });
                                    var value = (sum/count).toFixed(1);
                                    break;
                                default:
                                    var value = reading.stringValue;
                            }
                            return [reading.time, value];
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
