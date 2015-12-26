(function () {
    'use strict';

    var identityService = function identityService($http, $cookies) {
        var TOKEN_KEY = 'authentication';
        var USER_KEY = 'email';

        var isAuthenticated = function isAuthenticated() {
            var tokenValue = $cookies.get(TOKEN_KEY);
            if (!tokenValue) {
                return false;
            }

            return true;
        };

        var getCurrentUserId = function getCurrentUserId() {
            if (isAuthenticated()) {
                return $cookies.get(USER_KEY);
            }
        };

        var toggleView = function toggleView(username) {
            var usernameInHtml = angular.element('#username').text();

            angular.element('#logout').toggleClass('ng-hide');
            angular.element('#username').toggleClass('ng-hide');
            angular.element('#login').toggleClass('ng-hide');
            angular.element('#register').toggleClass('ng-hide');

            if (usernameInHtml === '') {
                angular.element('#username').text(username);
            } else {
                angular.element('#username').text('');
            }
        };

        var setAuthorizationHeader = function setAuthorizationHeader(accessToken) {
            if (!accessToken) {
                $http.defaults.headers.common.Authorization = null;
                return;
            }

            $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
        };

        return {
            isAuthenticated: isAuthenticated,
            getCurrentUserId: getCurrentUserId,
            toggleView: toggleView,
            setAuthorizationHeader: setAuthorizationHeader
        }
    };

    angular
        .module('sourceControlSystem.services')
        .factory('identity', ['$http', '$cookies', identityService]);
}());