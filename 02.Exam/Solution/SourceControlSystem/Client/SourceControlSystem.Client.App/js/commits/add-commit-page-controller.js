(function () {
    'use strict';

    var addCommitPageController = function addCommitPageController($routeParams, $location, ngNotify, identity, commits) {
        var vm = this;
        if (!identity.isAuthenticated()) {
            $location.path('/unauthorized');
        }

        vm.addCommit = function (commit) {
            var projectId = $routeParams.id;
            vm.commit.ProjectId = projectId;

            commits
                .addCommit(commit)
                .then(function () {
                    ngNotify.set('Commit successful', 'success');
                    $location.path('/projects/' + projectId)
                }, function () {
                    ngNotify.set('An error occurred while trying to process your request', 'error');
                });
        };
    };

    angular
        .module('sourceControlSystem.controllers')
        .controller('AddCommitPageController', ['$routeParams', '$location', 'ngNotify', 'identity', 'commits', addCommitPageController]);
}());