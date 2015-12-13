(function () {
    'use strict';

    var authService = function authService(BASE_ADDRESS, $http, $q, $cookies, $location, identity) {
        var TOKEN_KEY = 'authentication';
        var USER_KEY = 'email';

        var updateMainView = function updateMainView(username) {
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
        }

        var login = function login(user) {
            var deferred = $q.defer();

            var data = "grant_type=password&username=" + (user.email || '') + '&password=' + (user.password || '');

            $http
                .post(BASE_ADDRESS + '/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .then(
                    function (response) {
                        var responseData = response.data;
                        var tokenValue = responseData.access_token;
                        var userValue = responseData.userName;

                        var theBigDay = new Date();
                        theBigDay.setHours(theBigDay.getHours() + 72);
                        $cookies.put(TOKEN_KEY, tokenValue, { expires: theBigDay });
                        $cookies.put(USER_KEY, userValue, { expires: theBigDay });

                        $http.defaults.headers.common.Authorization = 'Bearer ' + tokenValue;

                        updateMainView(userValue);

                        getIdentity().then(function () {
                            deferred.resolve(response);
                        });
                    },

                    function (error) {
                        deferred.reject(error);
                    });

            return deferred.promise;
        };

        var register = function register(user) {
            if (user.password !== user.confirmPassword) {
                return $q.reject(user);
            }

            var deferred = $q.defer();

            var data = "Email=" + (user.email || '') +
                       '&Password=' + (user.password || '') +
                       '&ConfirmPassword=' + (user.confirmPassword || '');

            $http
                .post(BASE_ADDRESS + '/api/account/register', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        var logout = function logout() {
            if (isAuthenticated()) {
                $cookies.remove(TOKEN_KEY);
                $cookies.remove(USER_KEY);
                $http.defaults.headers.common.Authorization = null;
                identity.removeUser();

                updateMainView();
                return $q.resolve();
            }

            return $q.reject();
        }

        var getIdentity = function getIdentity() {
            var deferred = $q.defer();

            $http.get(BASE_ADDRESS + '/api/account/identity')
                .success(function (identityResponse) {
                    identity.setUser(identityResponse);
                    deferred.resolve(identityResponse);
                });

            return deferred.promise;
        };

        var isAuthenticated = function isAuthenticated() {
            return !!$cookies.get(TOKEN_KEY);
        }

        return {
            login: login,
            register: register,
            getIdentity: getIdentity,
            isAuthenticated: isAuthenticated,
            logout: logout
        };
    };

    angular
        .module('petStore.services')
        .factory('auth', ['BASE_ADDRESS', '$http', '$q', '$cookies', '$location', 'identity', authService]);
}());