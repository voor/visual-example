'use strict';

// Declare app level module which depends on views, and components
angular.module('visualEx', [ 'visualEx.widgetSample', 'nvd3ChartDirectives', "leaflet-directive" ])

/**
 * Index controller. You would never normally define a controller here, but here it is!
 */
.controller('indexCtrl', [ '$scope', 'dataService', '$log', 'cacheService',

function($scope, dataService, $log, cacheService) {

    $scope.data = cacheService.get();

    $scope.isConnected = function() {
        return dataService.isConnected();
    };

    $scope.connect = function() {
        dataService.connect();

        $log.debug(dataService.isConnected());
    };

    $scope.disconnect = function() {
        dataService.disconnect();

        $log.debug(dataService.isConnected());

    };

} ])

.run(function($templateCache, $http) {
    $http.get('components/widget-sample/results-table.html', {
        cache : $templateCache
    });
    $http.get('components/widget-sample/results-graph.html', {
        cache : $templateCache
    });
});
