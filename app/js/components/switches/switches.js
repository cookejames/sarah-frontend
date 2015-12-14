(function() {
    class SwitchesController {
        constructor(SwitchesService, toastr) {
            this.SwitchesService = SwitchesService;
            this.toastr = toastr;

            this.getSwitches();
        }

        getSwitches() {
            this.SwitchesService.getSwitches().then((switches) => {
                this.switches = switches;
            });
        }

        sendOn(id) {
            this.SwitchesService.sendOn(id).then(() => {
                this.toastr.success('Command sent');
            }).catch(() => {
                this.toastr.error('Whoops something went wrong');
            });
        }

        sendOff(id) {
            this.SwitchesService.sendOff(id).then(() => {
                this.toastr.success('Command sent');
            }).catch(() => {
                this.toastr.error('Whoops something went wrong');
            });
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
