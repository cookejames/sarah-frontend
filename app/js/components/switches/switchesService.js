class SwitchesService {
    /*@ngInject*/
    constructor($q, Switch) {
        this.$q = $q;
        this.switchModel = Switch;
    }

    getSwitches() {
        return this.switchModel.find().$promise;
    }

    getSwitchById(id) {
        return this.switchModel.findById({id: id}).$promise;
    }
}
register('sarahApp.switches').
    service('SwitchesService', SwitchesService);
