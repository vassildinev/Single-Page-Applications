(function () {
    'use strict';

    var allPetsPageController = function allPetsPageController($cookies, $location, ngNotify, pets) {
        var vm = this;

        if (!$cookies.get('email')) {
            $location.path('denied');
            return;
        }

        pets
            .getAll()
            .then(function (response) {
                if (response.data.length < 1) {
                    ngNotify.set('There are currently no pets available :(', 'info');
                } else {
                    vm.pets = response.data;
                }
            }, function () {
                ngNotify.set('An error occurred while processing your request. Please try again later.', 'error');
            })
    };

    angular
        .module('petStore.controllers')
        .controller('AllPetsPageController', ['$cookies', '$location', 'ngNotify', 'pets', allPetsPageController]);
}());