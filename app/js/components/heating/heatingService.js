class HeatingService {
    /*@ngInject*/
    constructor(HeatingGroup) {
        this.heatingGroupModel = HeatingGroup;
    }

    getGroups() {
        return this.heatingGroupModel.find().$promise;
    }

    getGroupById(id) {
        return this.heatingGroupModel.findById({id: id}).$promise;
    }

    getSchedulesForGroup(groupId) {
        return this.heatingGroupModel.prototype$__get__schedules({
            id: groupId
        }).$promise;
    }

    saveGroup(group) {
        return this.heatingGroupModel.updateOrCreate(group).$promise;
    }

    deleteGroup(id) {
        return this.heatingGroupModel.deleteById({id: id}).$promise;
    }

    deleteSchedulesForGroup(id) {
        return this.heatingGroupModel.prototype$__delete__schedules({ id: id }).$promise;
    }

    saveSchedule(groupId, schedule) {
        if (schedule.id !== undefined) {
            return this.heatingGroupModel.prototype$__updateById__schedules({id: groupId, fk: schedule.id}, schedule).$promise;
        } else {
            schedule.id = new Date().getTime();
            return this.heatingGroupModel.prototype$__create__schedules({id: groupId}, schedule).$promise;
        }
    }

    deleteSchedule(groupId, id) {
        return this.heatingGroupModel.prototype$__destroyById__schedules({id: groupId, fk: id}).$promise;
    }
}
register('sarahApp.heating').
    service('HeatingService', HeatingService);