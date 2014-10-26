'use strict';

angular.module('visualEx.widgetSample.dataService', [])

/**
 * The Data Service is actually responsible for the HTTP and Web Socket requests to the server.
 * 
 * For the purposes of this example, there isn't actually any back-end interaction with queries or messages.
 * 
 * You should assume that there would be an initial "bulk" query for historical data, and then a future subscription for real-time messages.
 * 
 * Real-time messages could easily be a RESTful polling requests, or a message queue.
 */
.service('dataService', [ '$log', '$interval', '$q', '$http', function($log, $interval, $q, $http) {

    /**
     * These are listeners to the actual connection. Does not preserve any historical data.
     */
    var listeners = [];

    /*
     * Connection to the server.
     */
    var connection;

    /**
     * Returns a random integer between min (inclusive) and max (inclusive) Using Math.round() will give you a non-uniform distribution!
     */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function makeIPList() {
        var ips = [];
        for (var i = 0; i < 100; i++) {
            var ip = getRandomInt(0, 255) + ".";
            ip = ip + getRandomInt(0, 255) + ".";
            ip = ip + getRandomInt(0, 255) + ".";
            ip = ip + getRandomInt(0, 255);
            ips.push(ip);
        }
        return ips;
    }

    function makeOwnerList() {
        return [ "Wal-Mart Stores", "Royal Dutch Shell", "Sinopec Group", "China National Petroleum", "Exxon Mobil", "BP", "State Grid", "Volkswagen", "Toyota Motor", "Glencore" ];
    }

    function makeFunctionList() {
        return [ "web server", "mail server", "ftp server" ];
    }

    function makeVirusList() {
        return [ "APT1", "Spam", "Botnet", "StealCreds" ];
    }

    /*
     * Make an array of 10 random IPs so we can have some duplicates at some point.
     */
    var ips = makeIPList();

    var owners = makeOwnerList();

    var functions = makeFunctionList();

    var viri = makeVirusList();

    function getRandomIp(int) {
        return ips[int];
    }

    function getRandomFunction(int) {
        return functions[int];

    }

    function getRandomOwner(int) {
        return owners[int];
    }

    function getRandomVirus() {
        return viri[getRandomInt(0, 3)];
    }

    function getRandomVirusGroup() {
        return [ getRandomVirus(), getRandomVirus(), getRandomVirus() ];
    }

    /*
     * Dummy function to generate data.
     */
    function generateEntry() {

        var deferred = $q.defer();

        var int = getRandomInt(0, 9);
        var func = getRandomInt(0, 2)
        deferred.resolve({
            "ip" : getRandomIp(getRandomInt(0, 99)),
            "virus" : getRandomVirusGroup(),
            "owner" : getRandomOwner(int),
            "function" : getRandomFunction(func)
        });

        return deferred.promise;
    }

    /*
     * Dummy function to generate an actual response from the server.
     */
    function generateData() {
        $log.debug("Generate Data!");

        generateEntry().then(function(data) {
            for (var i = 0; i < listeners.length; i++) {
                listeners[i](data);

            }
        });
        generateEntry().then(function(data) {
            for (var i = 0; i < listeners.length; i++) {
                listeners[i](data);

            }
        });
    }

    /**
     * "Connect" to the server. Ideally this would be automatic.
     */
    function connect() {

        // Don't connect if we're already connected.
        if (angular.isDefined(connection) && connection != null) {
            $log.debug("Cannot connect, already connected");
            return connection;
        }

        connection = $interval(generateData, 5000);

        return connection;
    }

    /*
     * Disconnect from the server.
     */
    function disconnect() {
        if (angular.isDefined(connection)) {
            $interval.cancel(connection);
            connection = null;
        } else {
            $log.debug("Cannot disconnect, not connected");
        }
    }

    function addListener(listener) {
        listeners.push(listener);
    }

    function removeListener(listener) {
        listeners.splice(listeners.indexOf(listener), 1);
    }

    function isConnected() {
        return connection != null;
    }

    return {
        isConnected : isConnected,
        connect : connect,
        disconnect : disconnect,
        addListener : addListener,
        removeListener : removeListener
    };
} ]);