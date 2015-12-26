(function () {
    'use strict';

    var projectsService = function projectsService(data) {
        var getLatest = function getLatest() {
            return data.get('api/projects');
        };

        var getAll = function getAll(filters) {
            return data.get('api/projects/all?' + $.param(filters));
        };

        var getById = function getById(id) {
            return data.get('api/projects/' + id);
        };

        var getCollaborators = function getCollaborators(id) {
            return data.get('api/projects/collaborators/' + id);
        };

        var addCollaborator = function addCollaborator(id, username) {
            return data.put('api/projects/' + id, username);
        };

        var create = function create(project) {
            return data.post('api/projects', project);
        };

        return {
            getLatest: getLatest,
            getAll: getAll,
            getById: getById,
            getCollaborators: getCollaborators,
            addCollaborator: addCollaborator,
            create: create
        }
    }

    angular
        .module('sourceControlSystem.services')
        .factory('projects', ['data', projectsService]);
}());