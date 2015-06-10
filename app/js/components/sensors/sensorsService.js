class SensorsService {
    /*@ngInject*/
    constructor() {
        //this.restangular = Restangular;
    }

    getNodes() {
        //return this.restangular.all('sensors/node').getList();
    }

    getSensorsForNode(nodeId) {
        //return this.restangular.all('sensors/sensor').getList({nodes: JSON.stringify([nodeId])});
    }

    getValuesForSensors(sensors) {
        if (!Array.isArray(sensors)) {
            throw 'sensors is not an array';
        }
        //return this.restangular.all('sensors/sensor-value').getList({sensors: JSON.stringify(sensors)});
    }
}
register('sarahApp.sensors').
    service('SensorsService', SensorsService);