(function () {
    'use strict';

    var homePageController = function homePageController() {
        var vm = this;

        vm.buhta = "Бухтичка";
    };

    angular
        .module('petStore.controllers')
        .controller('HomePageController', homePageController);
}());