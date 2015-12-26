(function () {
    'use strict';

    var commitsPageController = function commitsPageController(ngNotify, identity, commits) {
        var vm = this;
        commits
            .getLatest()
            .then(function (commits) {
                vm.commits = commits;
            });
    };

    angular
        .module('sourceControlSystem.controllers')
        .controller('CommitsPageController', ['ngNotify', 'identity', 'commits', commitsPageController]);
}());