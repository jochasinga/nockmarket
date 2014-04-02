'use strict';

var $ = require('jquery');
var BinaryHeap = require('./BinaryHeap');

var BUY = "buys", SELL = "sells";

function createBinaryHeap(orderType) {
    return new BinaryHeap(function(x) {
	    return x;
    }, orderType);
}

function createExchange(exchangeData) {
    // jQuery.extend([deep], target, object1[, obejctN])
    // deep
    // Type: Boolean
    // If true, the merge becomes recursive (aka. deep copy).
    // target
    // Type: Object
    // The object to extend. It will receive the new properties.
    // object1
    // Type: Object
    // An object containing additional properties to merge in.
    var cloned = $.extend(true, {}, exchangeData);
    // cloned = a copy of  exchangeData object 
    cloned.trades = [];  // empty trades array
    init(cloned, BUY);   // initiate a buying
    init(cloned, SELL);  // initiate a selling
    return cloned;       // return the copy of exchangeData

    function init(exchange, orderType) {
	// if exchange object is empty,
	if (!exchange[orderType]) {
	    // crreate a blank ordertype 
	    exchange[orderType] = {};
	    // create a blank volume
	    exchange[orderType].volumes = {};
	    // blank options
	    var options = {};
	    if (BUY == orderType) options.max = true;
	    exchange[orderType].prices = createBinaryHeap(options);
	}
    }
}

function order(orderType, price, volume, exchangeData) {
    // Init
    var cloned = createExchange(exchangeData);
    var orderBook = cloned[orderType];
    var oldVolume = orderBook.volumes[price];
}

function getOpposite() {
    // Ternary operator...reads like
    // if (BUY == orderType) { return SELL('sells'); }
    // else { return BUY('buys'); }
    return (BUY == orderType) ? SELL: BUY;
}
// Inspect if we have a 'match' or not
function isTrade() {
    var opp = cloned[getOpposite()].prices.peek();
    // if (BUY == orderType) {
    //   return price >= opp;
    // } else {
    //   return price <= opp;
    // }
    return (BUY == orderType) ? price >= opp : price <= opp;

// A Node's way of exposing functions to other modules
module.exports = {
    BUY: BUY,
    SELL: SELL,
    // buy and sell are thin wrappers around the order function
    buy: function(price, volume, exchangeData) {
	return order(BUY, price, volume, exchangeData);
    },
    sell: function(price, volume, exchangeData) {
	return order(SELL, price, volume, exchangeData);
    },
    order: order
}