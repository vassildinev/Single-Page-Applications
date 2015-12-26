(function () {
    'use strict';

    var projectsDirective = function projectsDirective() {
        return {
            restrict: 'A',
            templateUrl: 'templates/directives/projects-directive.html'
        }
    }

    angular
        .module('sourceControlSystem.directives')
        .directive('projects', [projectsDirective]);
}());