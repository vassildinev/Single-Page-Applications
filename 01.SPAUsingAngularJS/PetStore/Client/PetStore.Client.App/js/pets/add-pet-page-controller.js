(function () {
    'use strict';

    var addPetPageController = function addPetPageController($cookies, $location, ngNotify, pets) {
        var vm = this;
        if (!$cookies.get('email')) {
            $location.path('denied');
            return;
        }

        vm.addPet = function (pet) {
            pet.Price = vm.isNotForSale ? -1 : pet.Price;

            pets
                .addPet(pet)
                .then(function (response) {
                    $location.path('/');
                    ngNotify.set('You have successfully added a pet!', 'success');
                }, function (error) {
                    ngNotify.set('An error occurred while trying to process you request. Please try again later.', 'error');
                });
        }
    };

    angular
        .module('petStore.controllers')
        .controller('AddPetPageController', ['$cookies', '$location', 'ngNotify', 'pets', addPetPageController]);
}());