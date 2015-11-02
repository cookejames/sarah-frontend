class SensorsService {
    /*@ngInject*/
    constructor($q, Sensor) {
        this.$q = $q;
        this.sensorModel = Sensor;
    }

    getSensors() {
        return this.sensorModel.find().$promise;
    }

    getSensorById(id) {
        return this.sensorModel.findById({id: id}).$promise;
    }

    getSensorsWithReadingsSince(date) {
        if (!(date instanceof Date)) {
            return this.$q.reject(new Error('Parameter is not an instance of date'));
        }
        return this.sensorModel.find({
            filter: {
                include: {
                    relation: "readings",
                    scope: {
                        where: {
                            time: {
                                gt: date.getTime()
                            }
                        }
                    }
                }
            }
        }).$promise;
    }
}
register('sarahApp.sensors').
    service('SensorsService', SensorsService);
