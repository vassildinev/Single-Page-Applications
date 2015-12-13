(function () {
    'use strict';

    var registerPageController = function registerPageController($location, ngNotify, auth) {
        var vm = this;
        vm.register = function (user) {
            auth
                .register(user)
                .then(function (response) {
                    $location.path('/');
                    ngNotify.set('Registration successful! You can now login.', 'success');
                }, function (error) {
                    ngNotify.set('Incorrect registration data!', 'error');
                });
        };
    };

    angular
        .module('petStore.controllers')
        .controller('RegisterPageController', ['$location', 'ngNotify', 'auth', registerPageController]);
}());