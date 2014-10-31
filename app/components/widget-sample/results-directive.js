'use strict';

angular.module('visualEx.widgetSample.resultsDirective', [ 'visualEx.widgetSample.cacheService', 'visualEx.widgetSample.dataService' ])

/**
 * A simple directive that will show the results as raw numbers. Designed to be small, and unobtrusive.
 */
.directive('resultsTable', [ 'cacheService', '$log',

function(cacheService, $log) {

    return {
        restrict : 'E',
        transclude : true,
        replace : true,
        // We do this to isolate the scope. We don't want our widgets messing with the other stuff on the page.
        scope : {},
        controller : function($scope, cacheService, $log) {

            $scope.filter = "";
            // This is a reference to the data, so we're actually getting the updates for free.
            $scope.data = cacheService.get();

            $scope.capitalize = function(str) {
                var pieces = str.split(" ");
                for (var i = 0; i < pieces.length; i++) {
                    var j = pieces[i].charAt(0).toUpperCase();
                    pieces[i] = j + pieces[i].substr(1);
                }
                return pieces.join(" ");
            };
        },
        templateUrl : 'components/widget-sample/results-table.html'
    };
} ])

/**
 * Another widget example that listens to the same cache and creates some bar charts.
 */
.directive('resultsGraph', [ 'dataService', '$log',

function(dataService, $log) {

    return {
        restrict : 'E',
        transclude : true,
        replace : true,
        // We do this to isolate the scope. We don't want our widgets messing with the other stuff on the page.
        scope : {},
        controller : function($scope, dataService, $log) {

            $scope.xFunction = function() {
                return function(d) {
                    return d.x;
                }
            }

            $scope.yFunction = function() {
                return function(d) {
                    return d.y;
                }
            }

            $scope.raw = false;
            $scope.data = [];
            $scope.owners = {};

            $scope.incoming = function(data) {
                $log.debug("Got: " + angular.toJson(data));
                // You would not have the types hard-coded in here like this, but we need to do this to manipulate the data.
                // You would normally just have a service that would already talk in the pre-formated way.

                if ($scope.owners[data.owner] == null) {
                    $scope.owners[data.owner] = {
                        values : [ {
                            y : 0,
                            x : "APT1"
                        }, {
                            y : 0,
                            x : "Spam"
                        }, {
                            y : 0,
                            x : "Botnet"
                        }, {
                            y : 0,
                            x : "StealCreds"
                        } ],
                        key : data.owner
                    };
                    $scope.data.push($scope.owners[data.owner]);
                }
                var row = $scope.owners[data.owner];

                if (data.virus.indexOf("APT1") > 0) {
                    row.values[0].y++;
                }
                if (data.virus.indexOf("Spam") > 0) {
                    row.values[1].y++;
                }
                if (data.virus.indexOf("Botnet") > 0) {
                    row.values[2].y++;
                }
                if (data.virus.indexOf("StealCreds") > 0) {
                    row.values[3].y++;
                }

            };
            dataService.addListener($scope.incoming);

            $scope.toolTipContentFunction = function() {
                return function(key, x, y, e, graph) {
                    return '<b class="text-center">' + key + '</b>' + '<p class="text-muted">' + Math.round(y) + ' instances infected by ' + x + '</p>'
                }
            };
        },
        templateUrl : 'components/widget-sample/results-graph.html'
    };
} ])