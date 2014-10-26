'use strict';

describe('visualEx.widgetSample.cacheService module', function() {
    beforeEach(module('visualEx.widgetSample'));

    describe('cache service', function() {
        it('should return current data stored', inject(function(cacheService) {
            expect(cacheService.get()).toEqual({
                "Anderson Services" : {
                    "10.209.130.213" : {
                        "ip" : "10.209.130.213",
                        "virus" : [ "Botnet", "SPAM", "StealCreds" ],
                        "function" : "ftp server",
                        "owner" : "Anderson Services"
                    }
                },
                "Unknown" : {}
            });
        }));
    });
});
