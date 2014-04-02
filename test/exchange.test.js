'use strict';

var assert = require('assert');
var should = require('should');
var mocha = require('mocha');

var exchangeData = {}; // empty order state object

describe('exchange', function() {
	it('buy should add a BUY nockmarket order', function(done) {
		// submit buy request at $40 for 100 units and update exchangeData so
		exchangeData = exchange.buy(40, 100, exchangeData);
		// Tell exchangeData that buying for $40 must equal to 100 units 
		exchangeData.buys.volumes[40].should.eql(100);
		done();
	});
    
        it('sell should add a SELL nockmarket order', function(done) {
		// Submit sales request at $41 for 200 units
		exchangeData = exchange.sell(41, 200, exchangeData);
		// Tell exchangeData that selling for $41 must equal to 200
		exchangeData.sells.volumes[41].should.eql(200);
		done();
	});
    	// To match buying and selling is to trade
	it('sell should produce trades', function(done) {
		// Submit sales request at $40 for 75 units
		exchangeData = exchange.sell(40, 75, exchangeData);
		// First trade's price (hence [0]) should equals to $40
		exchangeData.trades[0].price.should.eql(40);
		// First trads' volume (hence [0]) should equals to 75 units
		exchangeData.trades[0].volume.should.eql(75);
		// Now, buying this at $40 will left with 25 units
		exchangeData.buys.volumes[40].should.eql(25);
		// Now, the sales at $41 is still left with 200 units unsold
		exchangeData.sells.volumes[41].should.eql(200);
		done();
        });
});
