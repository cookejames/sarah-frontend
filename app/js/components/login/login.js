(function() {
    class LoginController {
        constructor(Users, $state) {
            this.UsersModel = Users;
            this.$state = $state;
        }

        login() {
            this.isLoggingIn = true;
            this.UsersModel.login(
                {rememberMe: true},
                {email: this.email, password: this.password}
            ).$promise.then(() => {
                this.$state.go('heating');
            }).catch((err) => {
                if (err.status === 401) {
                    this.errorMessage = 'Sorry Sarah says she doesn\'t know you. Who did you say you were?';
                } else {
                    this.errorMessage = 'Sorry Sarah is having a few issues, come back later';
                }
                this.isLoggingIn = false;
            });
        }
    }

    function routerConfig($stateProvider) {
        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: "/js/components/login/login.html",
                controller: 'LoginController as login'
            }).state('logout', {
                url: "/logout",
                controller: function(LoopBackAuth, $state) {
                    LoopBackAuth.clearUser();
                    LoopBackAuth.clearStorage();
                    $state.go("login");
                }
            });
    }

    angular.module('sarahApp.login', ['ui.router', 'lbServices']).config(routerConfig);
    register('sarahApp.login').
        controller('LoginController', LoginController);
})();
