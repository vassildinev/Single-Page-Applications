(function () {
    'use strict';

    var commitsDirective = function commitsDirective() {
        return {
            restrict: 'A',
            templateUrl: 'templates/directives/commits-directive.html'
        }
    }

    angular
        .module('sourceControlSystem.directives')
        .directive('commits', [commitsDirective]);
}());