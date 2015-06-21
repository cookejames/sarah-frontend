(function() {
    class HeatingController {
        constructor(HeatingService, $state, $filter, toastr, MqttService, $scope) {
            this.HeatingService = HeatingService;
            this.$state = $state;
            this.$filter = $filter;
            this.toastr = toastr;
            this.MqttService = MqttService;
            this.$scope = $scope;
            this.setupMqtt();
            this.getGroups();
            this.groupEditting = null;
            this.waterStatus = null;
            this.heatingStatus = null;
        }

        setupMqtt() {
            this.MqttService.connect().then(() => {
                this.MqttService.addSubscriber((message) => {
                    this.$scope.$apply(() => {
                        this.mqttReceived(message)
                    });
                });
                this.MqttService.subscribe('water/status');
                this.MqttService.subscribe('heating/status');
                this.MqttService.publish('water/status/request', '');
                this.MqttService.publish('heating/status/request', '');
            });
        }

        mqttReceived(message) {
            switch (message.destinationName) {
                case 'water/status':
                    this.waterStatus = (message.payloadString === 'on') ? true : false;
                    break;
                case 'heating/status':
                    this.heatingStatus = (message.payloadString === 'on') ? true : false;
                    break;
            }
        }

        /**
         * Get groups and assign them to the local groups variable
         */
        getGroups() {
            this.HeatingService.getGroups().then((data) => {
                this.groups = this.$filter('orderBy')(data, 'name');
            });
        }

        /**
         * Save a group
         * @param index
         * @param markNotEditting
         * @returns {boolean}
         */
        saveGroup(index, markNotEditting = true) {
            if (this.groups === undefined || this.groups[index] === undefined) {
                return false;
            }

            var group = this.groups[index];
            if (group.name.length < 1) {
                this.toastr.error('A name is required', 'Error');
                return false;
            }

            //save the group then update the groups list to get the new group id
            this.HeatingService.saveGroup(group)
                .then(() => {
                    this.getGroups();
                    if (markNotEditting) this.editGroup(index, false);
                })
                .catch(function(){
                    console.log('save failed');
            });
        }

        /**
         * Mark a group as being editted
         * @param index
         * @param value
         */
        editGroup(index, value) {
            if (this.groupEditting !== index && this.groupEditting !== null) {
                this.saveGroup(index, false);
            }

            this.groupEditting = (value) ? index : null;
        }

        /**
         * Check if a group is being editted
         * @param index
         * @returns {boolean}
         */
        isEditting(index) {
            return (index === undefined) ? (this.groupEditting !== null) : (this.groupEditting === index);
        }

        /**
         * Add a new group to the list
         */
        addNewGroup() {
            var length = this.groups.length;
            this.groups.push({
                name: '',
                isEnabled: true
            });
            this.editGroup(length, true);
        }

        /**
         * Delete a group
         * @param index
         * @returns {boolean}
         */
        deleteGroup(index) {
            if (this.groups === undefined || this.groups[index] === undefined || this.groups[index].id === undefined) {
                return false;
            }

            var id = this.groups[index].id;
            this.HeatingService.deleteSchedulesForGroup(id)
                .then(() => {return this.HeatingService.deleteGroup(id)})
                .then(() => {
                    this.groups.splice(index, 1);

                    //redirect if the current state points to this group
                    if (this.$state.is('heating.group', {id: id})) {
                        this.$state.go('heating');
                    }
                }).catch(function(){
                    console.log('delete failed');
            });

            this.groupEditting = null;
        }
    }

    function routerConfig($stateProvider) {
        $stateProvider
            .state('heating', {
                url: "/heating",
                templateUrl: "/js/components/heating/heating.html",
                controller: 'HeatingController as heating'
            });
    }

    angular.module('sarahApp.heating', ['ui.router', 'lbServices', 'sarahApp.mqtt']).config(routerConfig);
    register('sarahApp.heating').
        controller('HeatingController', HeatingController);
})();