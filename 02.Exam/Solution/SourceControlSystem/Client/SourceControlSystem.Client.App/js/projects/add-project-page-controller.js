(function () {
    'use strict';

    var addProjectPageController = function addProjectPageController($location, ngNotify, identity, licenses, projects) {
        var vm = this;
        vm.isAuthorized = identity.isAuthenticated();

        if (!vm.isAuthorized) {
            $location.path('/unauthorized');
        } else {
            licenses
                .getAll()
                .then(function (licenses) {
                    vm.licenses = licenses;
                }, function (error) {
                    ngNotify.set('An error occurred while trying to process your request', 'error');
                });

            vm.createProject = function createProject(project) {
                projects
                    .create(project)
                    .then(function (id) {
                        ngNotify.set('Project successfully created', 'success');
                        $location.path('/projects/' + id);
                    });
            };
        }
    };

    angular
        .module('sourceControlSystem.controllers')
        .controller('AddProjectPageController', ['$location', 'ngNotify', 'identity', 'licenses', 'projects', addProjectPageController]);
}());