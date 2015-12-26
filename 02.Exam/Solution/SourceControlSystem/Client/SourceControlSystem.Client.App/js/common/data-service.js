(function () {
    'use strict';

    var dataService = function dataService($http, $q, BASE_ADDRESS) {
        var HEADERS = { 'Content-Type': 'application/json' };

        var get = function get(url, queryParameters) {
            queryParameters = queryParameters || {};

            var deferred = $q.defer();

            $http
                .get(BASE_ADDRESS + '/' + url, { params: queryParameters, headers: HEADERS })
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        var put = function put(url, dataToSend) {
            var deferred = $q.defer();
            dataToSend = dataToSend || {};
            $http
                .put(BASE_ADDRESS + '/' + url, dataToSend, { headers: HEADERS })
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        var post = function post(url, dataToSend, customHeaders) {
            var deferred = $q.defer();
            dataToSend = dataToSend || {};
            customHeaders = customHeaders || HEADERS;

            $http
                .post(BASE_ADDRESS + '/' + url, dataToSend, { headers: customHeaders })
                .then(function (response) {
                    if (!response.data) {
                        deferred.resolve(response);
                    } else {
                        deferred.resolve(response.data);
                    }
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };


        return {
            get: get,
            put: put,
            post: post
        }
    };

    angular
        .module('sourceControlSystem.services')
        .factory('data', ['$http', '$q', 'BASE_ADDRESS', dataService]);
}());