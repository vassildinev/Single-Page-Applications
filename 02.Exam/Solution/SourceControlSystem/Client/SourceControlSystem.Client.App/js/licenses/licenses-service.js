(function () {
    'use strict';

    var licensesService = function licensesService(data) {
        var getAll = function getAll() {
            return data.get('api/licenses');
        };

        return {
            getAll: getAll
        }
    }

    angular
        .module('sourceControlSystem.services')
        .factory('licenses', ['data', licensesService]);
}());