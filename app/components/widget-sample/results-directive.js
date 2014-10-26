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
.directive(
        'resultsGraph',
        [
                'cacheService',
                '$log',

                function(cacheService, $log) {

                    return {
                        restrict : 'E',
                        transclude : true,
                        replace : true,
                        // We do this to isolate the scope. We don't want our widgets messing with the other stuff on the page.
                        scope : {
                            graphWidth : '=',
                            graphHeight : '='
                        },
                        controller : function($scope, cacheService, $log) {

                            $scope.exampleData = [
                                    {
                                        "key" : "Series 1",
                                        "values" : [ [ 1025409600000, 0 ], [ 1028088000000, -6.3382185140371 ], [ 1030766400000, -5.9507873460847 ], [ 1033358400000, -11.569146943813 ], [ 1036040400000, -5.4767332317425 ], [ 1038632400000, 0.50794682203014 ], [ 1041310800000, -5.5310285460542 ],
                                                [ 1043989200000, -5.7838296963382 ], [ 1046408400000, -7.3249341615649 ], [ 1049086800000, -6.7078630712489 ], [ 1051675200000, 0.44227126150934 ], [ 1054353600000, 7.2481659343222 ], [ 1056945600000, 9.2512381306992 ] ]
                                    },
                                    {
                                        "key" : "Series 2",
                                        "values" : [ [ 1025409600000, 0 ], [ 1028088000000, 0 ], [ 1030766400000, 0 ], [ 1033358400000, 0 ], [ 1036040400000, 0 ], [ 1038632400000, 0 ], [ 1041310800000, 0 ], [ 1043989200000, 0 ], [ 1046408400000, 0 ], [ 1049086800000, 0 ], [ 1051675200000, 0 ],
                                                [ 1054353600000, 0 ], [ 1056945600000, 0 ] ]
                                    },
                                    {
                                        "key" : "Series 3",
                                        "values" : [ [ 1025409600000, 0 ], [ 1028088000000, -6.3382185140371 ], [ 1030766400000, -5.9507873460847 ], [ 1033358400000, -11.569146943813 ], [ 1036040400000, -5.4767332317425 ], [ 1038632400000, 0.50794682203014 ], [ 1041310800000, -5.5310285460542 ],
                                                [ 1043989200000, -5.7838296963382 ], [ 1046408400000, -7.3249341615649 ], [ 1049086800000, -6.7078630712489 ], [ 1051675200000, 0.44227126150934 ], [ 1054353600000, 7.2481659343222 ], [ 1056945600000, 9.2512381306992 ] ]
                                    },
                                    {
                                        "key" : "Series 4",
                                        "values" : [ [ 1025409600000, -7.0674410638835 ], [ 1028088000000, -14.663359292964 ], [ 1030766400000, -14.104393060540 ], [ 1033358400000, -23.114477037218 ], [ 1036040400000, -16.774256687841 ], [ 1038632400000, -11.902028464000 ],
                                                [ 1041310800000, -16.883038668422 ], [ 1043989200000, -19.104223676831 ], [ 1046408400000, -20.420523282736 ], [ 1049086800000, -19.660555051587 ], [ 1051675200000, -13.106911231646 ], [ 1054353600000, -8.2448460302143 ],
                                                [ 1056945600000, -7.0313058730976 ] ]
                                    } ];

                            // This is a reference to the data, so we're actually getting the updates for free.
                            $scope.rawData = cacheService.get();

                            $scope.capitalize = function(str) {
                                var pieces = str.split(" ");
                                for (var i = 0; i < pieces.length; i++) {
                                    var j = pieces[i].charAt(0).toUpperCase();
                                    pieces[i] = j + pieces[i].substr(1);
                                }
                                return pieces.join(" ");
                            };

                            $scope.toolTipContentFunction = function() {
                                return function(key, x, y, e, graph) {
                                    return '<b class="text-center">' + key + '</b>' + '<p class="text-muted">' + y + ' at ' + x + '</p>'
                                }
                            };
                        },
                        templateUrl : 'components/widget-sample/results-graph.html'
                    };
                } ])