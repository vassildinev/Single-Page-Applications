(function () {
    'use strict';

    // for refresh
    var run = function ($cookies, $http, ngNotify) {
        var email = $cookies.get('email');
        var tokenValue = $cookies.get('authentication');
        if (!!email) {
            angular.element('#logout').toggleClass('ng-hide');
            angular.element('#username').toggleClass('ng-hide').text(email);
            angular.element('#login').toggleClass('ng-hide');
            angular.element('#register').toggleClass('ng-hide');

            $http.defaults.headers.common.Authorization = 'Bearer ' + tokenValue;

            ngNotify.set('Welcome back, ' + email, 'success');
        }
    };

    var config = function config($routeProvider) {
        var CONTROLLER_VIEW_MODEL_NAME = 'vm';

        $routeProvider
            .when('/', {
                templateUrl: 'templates/home-page-view.html',
                controller: 'HomePageController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/identity/login', {
                templateUrl: 'templates/login-page-view.html',
                controller: 'LoginPageController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/identity/register', {
                templateUrl: 'templates/register-page-view.html',
                controller: 'RegisterPageController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/pets/all', {
                templateUrl: 'templates/all-pets-page-view.html',
                controller: 'AllPetsPageController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/pets/:id/:name', {
                templateUrl: 'templates/pet-details-page-view.html',
                controller: 'PetDetailsPageController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/pets/add', {
                templateUrl: 'templates/add-pet-page-view.html',
                controller: 'AddPetPageController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/denied', {
                templateUrl: 'templates/access-denied-page-view.html'
            })
            .when('/notfound', {
                templateUrl: 'templates/not-found-page-view.html'
            })
            .otherwise({
                redirectTo: '/notfound'
            });
    };

    angular.module('petStore.services', []);
    angular.module('petStore.controllers', ['petStore.services']);
    angular.module('petStore', ['ngCookies', 'ngResource', 'ngRoute', 'ngNotify', 'petStore.controllers'])
        .config(['$routeProvider', config])
        .run(['$cookies', '$http','ngNotify', run])
        .constant('BASE_ADDRESS', 'http://localhost:13607');
}());