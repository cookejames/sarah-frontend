(function() {
    function fourOhOneInterceptor($httpProvider) {
        $httpProvider.interceptors.push(function($q, $injector, LoopBackAuth) {
            return {
                responseError: function(rejection) {
                    if (rejection.status == 401) {
                        //Now clearing the loopback values from client browser for safe logout...
                        LoopBackAuth.clearUser();
                        LoopBackAuth.clearStorage();
                        $injector.get('$state').transitionTo('login');
                    }
                    return $q.reject(rejection);
                }
            };
        });
    }

    function loginInterceptor($rootScope, $state, Users) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
            if (!Users.isAuthenticated() && toState.name !== 'login') {
                $state.transitionTo("login");
                event.preventDefault();
            }
        });
    }

    angular.module('sarahApp.login').run(loginInterceptor).config(fourOhOneInterceptor);
})();
