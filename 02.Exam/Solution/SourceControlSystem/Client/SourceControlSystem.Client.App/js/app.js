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
                templateUrl: 'templates/partials/home-page-view.html',
                controller: 'HomePageController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/identity/login', {
                templateUrl: 'templates/partials/login-page-view.html',
                controller: 'LoginPageController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/identity/register', {
                templateUrl: 'templates/partials/register-page-view.html',
                controller: 'RegisterPageController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/commits', {
                templateUrl: 'templates/partials/commits-page-view.html',
                controller: 'CommitsPageController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/commits/:id', {
                templateUrl: 'templates/partials/commit-details-page-view.html',
                controller: 'CommitDetailsPageController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/projects', {
                templateUrl: 'templates/partials/projects-page-view.html',
                controller: 'ProjectsPageController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/projects/add', {
                templateUrl: 'templates/partials/add-project-page-view.html',
                controller: 'AddProjectPageController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/projects/:id', {
                templateUrl: 'templates/partials/project-details-page-view.html',
                controller: 'ProjectDetailsPageController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/projects/:id/addcommits', {
                templateUrl: 'templates/partials/add-commit-page-view.html',
                controller: 'AddCommitPageController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/unauthorized', {
                templateUrl: 'templates/partials/access-denied-page-view.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    };


    angular.module('sourceControlSystem.filters', []);
    angular.module('sourceControlSystem.directives', []);
    angular.module('sourceControlSystem.services', []);
    angular.module('sourceControlSystem.controllers', ['sourceControlSystem.services']);
    angular.module('sourceControlSystem', ['ngCookies', 'ngResource', 'ngRoute', 'ngNotify', 'sourceControlSystem.controllers', 'sourceControlSystem.filters', 'sourceControlSystem.directives', 'kendo.directives'])
        .config(['$routeProvider', config])
        .run(['$cookies', '$http', 'ngNotify', run])
        .constant('BASE_ADDRESS', 'http://spa.bgcoder.com');
}());