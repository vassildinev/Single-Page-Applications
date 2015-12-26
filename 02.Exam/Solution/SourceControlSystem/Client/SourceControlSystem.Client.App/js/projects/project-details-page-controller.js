(function () {
    'use strict';

    var projectDetailsPageController = function projectDetailsPageController($location, $routeParams, ngNotify, identity, projects, commits) {
        var vm = this;

        if (!identity.isAuthenticated()) {
            $location.path('/unauthorized');
        } else {
            var id = $routeParams.id;
            projects
                .getById(id)
                .then(function (project) {
                    vm.project = project;
                }, function (error) {
                    ngNotify.set('An error occurred while trying to process your request', 'error');
                })
                .then(function () {
                    commits
                        .getByProjectId(vm.project.Id, vm.filters)
                        .then(function (commits) {
                            vm.commits = commits;
                        }, function (error) {
                            ngNotify.set('An error occurred while trying to process your request', 'error');
                        });
                }, function (error) {
                    ngNotify.set('An error occurred while trying to process your request', 'error');
                });

            projects
                .getCollaborators(id)
                .then(function (collaborators) {
                    vm.collaborators = collaborators;
                    var currentUser = identity.getCurrentUserId();
                    vm.isCollaborator = Enumerable
                        .From(vm.collaborators)
                        .Any(function (name) { return name === currentUser; });
                }, function (error) {
                    ngNotify.set('An error occurred while trying to process your request', 'error');
                });

            vm.toggleCommits = function toggleCommits(shouldShow) {
                if (shouldShow) {
                    var currentUser = identity.getCurrentUserId();
                    commits
                        .getByProjectId(vm.project.Id, vm.filters)
                        .then(function (commits) {
                            if (vm.showDatePicker) {
                                vm.commits = Enumerable
                                    .From(commits)
                                    .Where(function (c) {
                                        return new Date(c.CreatedOn) >= vm.startDateTime &&
                                               new Date(c.CreatedOn) <= vm.endDateTime &&
                                               c.UserName === currentUser;
                                    })
                                    .Skip(vm.filters.Page * 10 - 10)
                                    .Take(10)
                                    .ToArray();
                            } else {
                                vm.commits = Enumerable
                                .From(commits)
                                .Where(function (c) {
                                    return c.UserName === currentUser;
                                })
                                .Skip(vm.filters.Page * 10 - 10)
                                .Take(10)
                                .ToArray();
                            }
                        }, function (error) {
                            ngNotify.set('An error occurred while trying to process your request', 'error');
                        });
                } else {
                    commits
                        .getByProjectId(vm.project.Id, vm.filters)
                        .then(function (commits) {
                            if (vm.showDatePicker) {
                                vm.commits = Enumerable
                                        .From(commits)
                                        .Where(function (c) {
                                            console.log(new Date(c.CreatedOn));
                                            return new Date(c.CreatedOn) >= vm.startDateTime &&
                                                   new Date(c.CreatedOn) <= vm.endDateTime;
                                        })
                                        .Skip(vm.filters.Page * 10 - 10)
                                        .Take(10)
                                        .ToArray();
                            } else {
                                vm.commits = commits;
                            }
                        }, function (error) {
                            ngNotify.set('An error occurred while trying to process your request', 'error');
                        });
                }
            };

            vm.addCollaborator = function (toAdd) {
                projects
                    .addCollaborator(id, '"' + toAdd + '"')
                    .then(function () {
                        projects
                            .getCollaborators(id)
                            .then(function (collaborators) {
                                vm.collaborators = collaborators;
                                var currentUser = identity.getCurrentUserId();
                                vm.isCollaborator = Enumerable
                                    .From(vm.collaborators)
                                    .Any(function (name) { return name === currentUser; });
                            }, function (error) {
                                ngNotify.set('An error occurred while trying to process your request', 'error');
                            });
                    }, function () {
                        ngNotify.set('An error occurred while trying to process your request', 'error');
                    });
            };

            vm.getNextPage = function getNextPage() {
                if (vm.commits.length < 1) {
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
                vm.toggleCommits(vm.showMyCommitsOnly);
            }
        }
    };

    angular
        .module('sourceControlSystem.controllers')
        .controller('ProjectDetailsPageController', ['$location', '$routeParams', 'ngNotify', 'identity', 'projects', 'commits', projectDetailsPageController]);
}());