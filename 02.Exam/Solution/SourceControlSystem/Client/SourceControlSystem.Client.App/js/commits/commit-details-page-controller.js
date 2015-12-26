(function () {
    'use strict';

    var commitDetailsPageController = function commitDetailsPageController($routeParams, $location, ngNotify, identity, commits) {
        var vm = this;
        if (!identity.isAuthenticated()) {
            $location.path('/unauthorized');
        } else {
            var commitId = $routeParams.id;
            commits
                .getById(commitId)
                .then(function (commit) {
                    vm.commit = commit;
                }, function () {
                    ngNotify.set('An error occurred while trying to process your request', 'error');
                });
        }
    };

    angular
        .module('sourceControlSystem.controllers')
        .controller('CommitDetailsPageController', ['$routeParams', '$location', 'ngNotify', 'identity', 'commits', commitDetailsPageController]);
}());