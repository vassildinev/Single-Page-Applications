(function () {
    'use strict';

    var registerPageController = function registerPageController($location, ngNotify, auth) {
        var vm = this;
        vm.register = function ($event, user) {

            $($event.currentTarget).button('loading');

            auth
                .register(user)
                .then(function (response) {
                    $location.path('/');
                    ngNotify.set('Registration successful! You can now login.', 'success');
                }, function (error) {
                    ngNotify.set('Incorrect registration data!', 'error');
                    $($event.currentTarget).button('reset');
                });
        };
    };

    angular
        .module('sourceControlSystem.controllers')
        .controller('RegisterPageController', ['$location', 'ngNotify', 'auth', registerPageController]);
}());