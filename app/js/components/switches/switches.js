(function() {
    class SwitchesController {
        constructor(SwitchesService, MqttService, toastr) {
            this.SwitchesService = SwitchesService;
            this.MqttService = MqttService;
            this.toastr = toastr;

            this.MqttService.connect();
            this.getSwitches();
        }

        getSwitches() {
            this.SwitchesService.getSwitches().then((switches) => {
                this.switches = switches;
            });
        }

        sendCommand(command) {
            this.MqttService.publish('switches', '' + command);
            this.toastr.success('Command sent');
        }
    }

    function routerConfig($stateProvider) {
        $stateProvider
            .state('switches', {
                url: "/switches",
                templateUrl: "/js/components/switches/switches.html",
                controller: 'SwitchesController as vm'
            });
    }

    angular.module('sarahApp.switches', ['ui.router', 'lbServices']).config(routerConfig);
    register('sarahApp.switches').
        controller('SwitchesController', SwitchesController);
})();
