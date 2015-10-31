(function() {
    class HeatingGroupController {
        constructor(HeatingService, $stateParams, $filter, toastr) {
            this.id = $stateParams.id;
            this.HeatingService = HeatingService;
            this.$filter = $filter;
            this.toastr = toastr;
            this.HeatingService.getGroupById(this.id).then((data) => {
                this.group = data;
            });
            this.getSchedules();
            this.scheduleEditting = null;
        }

        /**
         * Get schedules and assign them to the local groups variable
         */
        getSchedules() {
            this.HeatingService.getSchedulesForGroup(this.id).then((data) => {
                this.schedules = this.$filter('orderBy')(data, 'start');
            });
        }

        /**
         * Check if a schedule is being editted
         * @param index
         * @returns {boolean}
         */
        isEditting(index = undefined) {
            return (index === undefined) ? (this.scheduleEditting !== null) : (this.scheduleEditting === index);
        }

        /**
         * Mark a schedule as being editted
         * @param index
         * @param value
         */
        editSchedule(index, value) {
            if (this.scheduleEditting !== index && this.scheduleEditting !== null) {
                this.saveSchedule(index, false);
            }

            this.scheduleEditting = (value) ? index : null;
        }

        /**
         * Delete a schedule
         * @param index
         * @returns {boolean}
         */
        deleteSchedule(index) {
            if (this.schedules === undefined || this.schedules[index] === undefined || this.schedules[index].id === undefined) {
                return false;
            }

            var id = this.schedules[index].id;

            this.HeatingService.deleteSchedule(this.id, id)
                .then(() => {
                    this.schedules.splice(index, 1);
                }).catch(function(){
                    console.log('delete failed');
                });
            this.scheduleEditting = null;
        }

        /**
         * Save a schedule
         * @param index
         * @param markNotEditting
         * @returns {boolean}
         */
        saveSchedule(index, markNotEditting = true) {
            if (this.schedules === undefined || this.schedules[index] === undefined) {
                return false;
            }

            var schedule = this.schedules[index];
            if (schedule.start >= schedule.end) {
                this.toastr.error('The start time must be after the end time', 'Error');
                return false;
            }
            //save the group then update the groups list to get the new group id
            this.HeatingService.saveSchedule(this.id, schedule)
                .then(() => {
                    this.getSchedules();
                    if (markNotEditting) this.editSchedule(index, false);
                })
                .catch(function(){
                    console.log('save failed');
                });
        }

        /**
         * Add a new schedule to the list
         */
        addNewSchedule() {
            var length = this.schedules.length;
            this.schedules.push({
                groupId: this.id,
                start: 0,
                end: 0,
                heatingOn: false,
                waterOn: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false
            });
            this.editSchedule(length, true);
        }

        /**
         * Save a group
         * @param index
         * @param markNotEditting
         * @returns {boolean}
         */
        saveGroup() {
            //save the group then update the groups list to get the new group id
            this.HeatingService.saveGroup(this.group)
                .catch(function(){
                    console.log('save failed');
                });
        }
    }

    function routerConfig($stateProvider) {
        $stateProvider.state('heating.group', {
                url: "/group/{id:[a-z0-9]+}",
                templateUrl: "/js/components/heating/group/group.html",
                controller: 'HeatingGroupController as heatingGroup'
            });
    }

    angular.module('sarahApp.heating.group', ['ui.router', 'lbServices', 'toastr', 'sarahApp.heating']).config(routerConfig);
    register('sarahApp.heating.group').
        controller('HeatingGroupController', HeatingGroupController);
})();