(function () {
    'use strict';

    var statisticsService = function statisticsService($q, data) {
        var statistics;

        var getStats = function getStats() {
            var deferred = $q.defer();

            if (statistics) {
                deferred.resolve(statistics);
            } else {
                data
                    .get('api/statistics')
                    .then(function (stats) {
                        statistics = stats;
                        deferred.resolve(stats);
                    }, function (error) {
                        deferred.reject(error);
                    });
            }

            return deferred.promise;
        }

        return {
            getStats: getStats
        }
    }

    angular
        .module('sourceControlSystem.services')
        .factory('statistics', ['$q', 'data', statisticsService]);
}());