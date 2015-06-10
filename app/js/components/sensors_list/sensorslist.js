class SensorsListController {
    /*@ngInject*/
    constructor(SensorsService) {
        this.SensorsService = SensorsService;
        this.nodes = this.SensorsService.getNodes().$object;
    }
}
angular.module('sarahApp.sensors.list', []);
register('sarahApp.sensors.list').
    controller('SensorsListController', SensorsListController);