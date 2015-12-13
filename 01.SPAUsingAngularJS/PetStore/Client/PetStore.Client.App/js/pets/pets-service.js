(function () {
    'use strict';

    var petsService = function petsService(BASE_ADDRESS, $q, $http) {

        var getAll = function getAll() {
            var deferred = $q.defer();

            $http.get(BASE_ADDRESS + '/api/pets', { headers: { 'Content-Type': 'application/json' } })
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        var getById = function getById(id) {
            var deferred = $q.defer();

            $http
                .get(BASE_ADDRESS + '/api/pets/' + id, { headers: { 'Content-Type': 'application/json' } })
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        var addPet = function addPet(pet) {
            var deferred = $q.defer();

            $http
                .post(BASE_ADDRESS + '/api/pets', pet, { headers: { 'Content-Type': 'application/json' } })
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.resolve(error);
                });

            return deferred.promise;
        };

        return {
            getAll: getAll,
            getById: getById,
            addPet: addPet
        }
    };

    angular
        .module('petStore.services')
        .factory('pets', ['BASE_ADDRESS', '$q', '$http', petsService]);
}());