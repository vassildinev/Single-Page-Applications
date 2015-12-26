(function () {
    'use strict';

    var commitsService = function commitsService(data) {
        var getLatest = function getLatest() {
            return data.get('api/commits');
        };

        var getByProjectId = function getByProjectId(id, queryParameters) {
            queryParameters = queryParameters || {};
            return data.get('api/commits/ByProject/' + id + '?' + $.param(queryParameters));
        };

        var getById = function getById(id) {
            return data.get('api/commits/' + id);
        };

        var addCommit = function addCommit(commit) {
            return data.post('api/commits', commit);
        };

        return {
            getLatest: getLatest,
            getByProjectId: getByProjectId,
            getById: getById,
            addCommit: addCommit
        }
    }

    angular
        .module('sourceControlSystem.services')
        .factory('commits', ['data', commitsService]);
}());