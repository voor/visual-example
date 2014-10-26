'use strict';

angular.module('visualEx.widgetSample.cacheService', [ 'visualEx.widgetSample.dataService' ])

/**
 * The cache service resides closer to the user than the data service. The data service is slightly abstracted due to the implementation decisions arbitrarily made.
 * 
 * This service wouldn't just be called a generic cache service in a real application. It's just called this for simplicity sake.
 * 
 * This allows the view to store up data at its leisure.
 */
.service('cacheService', [ '$log', 'dataService', '$q', function($log, dataService, $q) {

    var data = {
        "Anderson Services" : {
            "10.209.130.213" : {
                "ip" : "10.209.130.213",
                "virus" : [ "Botnet", "SPAM", "StealCreds" ],
                "function" : "ftp server",
                "owner" : "Anderson Services"
            }
        },
        "Unknown" : {}
    };

    // Very ugly doing this much process on the client side, but wanted to preserve the current API.
    var onMessage = function(entry) {
        $log.debug("on Message called with " + angular.toJson(entry));

        var dataEntry = data["Unknown"];
        if (entry.owner != null) {
            if (data[entry.owner] == null) {
                data[entry.owner] = {};
            }
            dataEntry = data[entry.owner];

        }

        if (dataEntry[entry.ip] == null) {
            dataEntry[entry.ip] = {};
        }
        var ipEntry = dataEntry[entry.ip];

        if (entry["function"]) {
            ipEntry["function"] = entry["function"];
        }

        // Don't add duplicate viri.
        if (entry.virus) {
            for (var i = 0; i < entry.virus.length; i++) {
                if (ipEntry.virus == null) {
                    ipEntry.virus = [];
                }
                if (ipEntry.virus.indexOf(entry.virus[i]) < 0) {
                    ipEntry.virus.push(entry.virus[i]);
                }
            }
        }
    };

    function fetch() {
        var deferred = $q.defer();

        deferred.resolve(data);

        return deferred.promise;
    }

    function get() {
        return data;
    }

    var service = {
        fetch : fetch,
        get : get
    };

    dataService.addListener(onMessage);
    return service;
} ]);