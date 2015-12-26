(function () {
    'use strict';

    var projectsPageController = function projectsPageController(ngNotify, identity, projects) {
        var vm = this;
        vm.isAuthorized = identity.isAuthenticated();

        if (!vm.isAuthorized) {
            projects
                .getLatest()
                .then(function (projects) {
                    vm.projects = projects;
                });
        } else {
            vm.getNextPage = function getNextPage() {
                if (vm.projects.length < 1) {
                    return;
                }

                vm.filters.Page = 1 + parseInt(vm.filters.Page);
                vm.filter(vm.filters);
            }

            vm.getPreviousPage = function getNextPage() {
                if (vm.filters.Page > 1) {
                    vm.filters.Page = -1 + vm.filters.Page;
                    vm.filter(vm.filters);
                }
            }

            vm.filter = function filter(filters) {
                projects
                    .getAll(filters)
                    .then(function (projects) {
                        vm.projects = projects;
                    }, function () {
                        ngNotify.set('An error occurred while trying to process your request', 'error');
                    });
            }

            vm.filter({});
        }
    };

    angular
        .module('sourceControlSystem.controllers')
        .controller('ProjectsPageController', ['ngNotify', 'identity', 'projects', projectsPageController]);
}());