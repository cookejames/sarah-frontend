(function() {
  class SensorsController {
    constructor($filter, SensorsService) {
      this.$filter = $filter;
      this.SensorsService = SensorsService;
      this.chartData = [];
      this.getSensors();

      this.chartOptions = {
        chart: {
          type: 'lineChart',
          height: 400,
          xAxis: {
            tickFormat: x => d3.time.format('%d/%m/%y %H:%M')(new Date(x))
          }
        }
      };
    }

    getSensors() {
      var weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      this.SensorsService.getSensorsWithReadingsSince(weekAgo).then((data) => {
        this.sensors = this.$filter('orderBy')(data, 'name');
        this.chartData = [];
        this.sensors.forEach(sensor => {
          if (sensor.readings.length === 0) {
            return;
          }
          this.chartData.push({
            key: sensor.name,
            values: sensor.readings.map(function(reading){
              switch (sensor.type) {
                case 'boolean':
                  var value = reading.booleanValue ? 1 : 0;
                  break;
                case 'float':
                  var value = reading.numberValue.toFixed(1);
                  break;
                default:
                  var value = reading.stringValue;
              }
              return {x: reading.time, y: value};
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

  angular.module('sarahApp.sensors', ['ui.router', 'lbServices', 'nvd3']).config(routerConfig);
  register('sarahApp.sensors').
  controller('SensorsController', SensorsController);
})();
