class SensorsNodeController {
    /*@ngInject*/
    constructor($routeParams, SensorsService) {
        this.id = $routeParams.id;
        this.sensorsService = SensorsService;
        var sensors = this.sensorsService.getSensorsForNode(this.id);
        this.sensors = sensors.$object;
        sensors.then((sensors) => {
            var ids = [];
            sensors.forEach((sensor) => {
                ids.push(sensor.id);
            });
            return this.sensorsService.getValuesForSensors(ids);
        }).then((values) => {
            this.sensorValues = [];
            values.forEach((value) => {
                var sensorId = value._embedded.sensor.id;
                if (this.sensorValues[sensorId] === undefined) {
                    this.sensorValues[sensorId] = [];
                }
                this.sensorValues[sensorId].push(value);
            });
        });
    }
}
angular.module('sarahApp.sensors.node', []);
register('sarahApp.sensors.node').
    controller('SensorsNodeController', SensorsNodeController);