(function () {
    'use strict';

    var dateFilter = function dateFilter() {
        return function (input) {
            var monthNames = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"
            ];

            var date = new Date(input);
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();
            var hours = date.getHours();
            var minutes = date.getMinutes().toString().length > 1 ? date.getMinutes() : '0' + date.getMinutes().toString();
            var seconds = date.getSeconds().toString().length > 1 ? date.getSeconds() : '0' + date.getSeconds().toString();

            return day + ' ' + monthNames[monthIndex] + ' ' + year + ', ' + hours + ':' + minutes + ':' + seconds;
        }
    }

    angular
        .module('sourceControlSystem.filters')
        .filter('fancyDate', [dateFilter])
}());