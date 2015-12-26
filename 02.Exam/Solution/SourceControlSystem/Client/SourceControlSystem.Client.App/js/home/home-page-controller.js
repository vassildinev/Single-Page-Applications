(function () {
    'use strict';

    var homePageController = function homePageController(ngNotify, statistics, projects, commits) {
        var vm = this;

        statistics
            .getStats()
            .then(function(statistics){
                vm.stats = statistics;
            }, function (error) {
                ngNotify.set('The following error occurred while processing your request: ' + error.data.Message, 'error');
            });

        projects
            .getLatest()
            .then(function (projects) {
                vm.projects = projects;
            }, function (error) {
                ngNotify.set('The following error occurred while processing your request: ' + error.data.Message, 'error');
            });

        commits
            .getLatest()
            .then(function (commits) {
                vm.commits = commits;
            }, function (error) {
                ngNotify.set('The following error occurred while processing your request: ' + error.data.Message, 'error');
            });
    };

    angular
        .module('sourceControlSystem.controllers')
        .controller('HomePageController', ['ngNotify', 'statistics', 'projects', 'commits', homePageController]);
}());