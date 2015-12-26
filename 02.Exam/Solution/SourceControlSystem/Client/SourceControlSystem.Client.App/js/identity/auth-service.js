(function () {
    'use strict';

    var authService = function authService($q, $cookies, $location, identity, data) {
        var TOKEN_KEY = 'authentication';
        var USER_KEY = 'email';

        var login = function login(user) {
            var dataToSend = {
                grant_type: 'password',
                username: user.email || '',
                password: user.password || ''
            };

            var headers = {
                ContentType: 'application/x-www-form-urlencoded'
            }

            return data
                .post('token', $.param(dataToSend), headers)
                .then(function (loginDetails) {
                    var tokenValue = loginDetails.access_token;
                    var userValue = loginDetails.userName;
                    var theBigDay = new Date();

                    theBigDay.setHours(theBigDay.getHours() + 72);
                    $cookies.put(TOKEN_KEY, tokenValue, { expires: theBigDay });
                    $cookies.put(USER_KEY, userValue, { expires: theBigDay });
                    identity.setAuthorizationHeader(tokenValue);
                    identity.toggleView(userValue);
                });
        };

        var register = function register(user) {
            if (user.password !== user.confirmPassword) {
                return $q.reject(user);
            }

            var dataToSend = {
                Email: user.email || '',
                Password: user.password || '',
                ConfirmPassword: user.confirmPassword || ''
            };

            var headers = {
                ContentType: 'application/x-www-form-urlencoded'
            }

            return data.post('api/account/register', dataToSend, headers);
        };

        var logout = function logout() {
            if (identity.isAuthenticated()) {
                data.post('api/account/logout').then(function () {
                    $cookies.remove(TOKEN_KEY);
                    $cookies.remove(USER_KEY);
                    identity.setAuthorizationHeader();
                    identity.toggleView();
                });

                return $q.resolve();
            }

            return $q.reject();
        }

        return {
            login: login,
            register: register,
            logout: logout
        };
    };

    angular
        .module('sourceControlSystem.services')
        .factory('auth', ['$q', '$cookies', '$location', 'identity', 'data', authService]);
}());