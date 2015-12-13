(function () {
    'use strict';

    var petDetailsPageController = function petDetailsController($routeParams, ngNotify, pets) {
        var vm = this;

        var petId = $routeParams.id;
        pets
            .getById(petId)
            .then(function (response) {
                vm.pet = response.data;
                vm.canBuy = response.data.Price !== -1;
            }, function (error) {
                ngNotify('An error occurred while processing your request. Please try again later.', 'error');
            });
    };

    angular
        .module('petStore.controllers')
        .controller('PetDetailsPageController', ['$routeParams', 'ngNotify', 'pets', petDetailsPageController])
}());