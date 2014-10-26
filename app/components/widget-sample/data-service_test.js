'use strict';

describe('visualEx.widgetSample.dataService module', function() {
    beforeEach(module('visualEx.widgetSample'));

    describe('data service', function() {
        it('should fetch new data from the server', inject(function(dataService) {
            expect(dataService.isConnected()).toEqual(false);
        }));
    });
});
