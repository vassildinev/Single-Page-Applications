(function () {
    'use strict';

    var loginPageController = function loginPageController($location, ngNotify, auth) {
        var vm = this;
        vm.login = function (user) {
            auth
                .login(user)
                .then(function (response) {
                    for (var prop in user) {
                        delete user[prop];
                    }

                    $location.path('/');
                    ngNotify.set('You have successfully logged in!', 'success');
                }, function (error) {
                    ngNotify.set('Incorrect data! Please check your login details.', 'error');
                });
        };

        vm.logout = function () {
            auth
                .logout()
                .then(function () {
                    ngNotify.set('You have successfully logged out! See you soon!', 'success');
                }, function () {
                    ngNotify.set('You are already logged out!', 'error');
                });
        }
    };

    angular
        .module('petStore.controllers')
        .controller('LoginPageController', ['$location', 'ngNotify', 'auth', loginPageController]);
}());