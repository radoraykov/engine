'use strict';

global.self = {};

var test = require('tape');
var Clock = require('../src/Clock');

test('Clock', function(t) {
    t.test('constructor', function(t) {
        t.plan(1);
        t.doesNotThrow(function() {
            new Clock();
        }, 'Clock constructor should not be a function');
    });

    t.test('step method', function(t) {
        t.plan(2);
        var clock = new Clock();
        t.equal(typeof clock.step, 'function', 'clock.step should be a function');

        t.equal(clock.step(123), clock, 'clock.step should be chainable');
    });

    t.test('update method', function(t) {
        t.plan(5);
        var clock = new Clock();
        t.equal(typeof clock.update, 'function', 'clock.update should be a function');

        t.equal(clock.update({
            update: function(time) {
                t.pass('clock.update should register object to be updated on the next step');
                t.equal(time, 12, 'clock.update should pass the current clock time into the update function of the passed in object');
            }
        }), clock, 'clock.update should be chainable');
        
        clock.update({
            update: function() {
                t.pass('clock.update should register object to be updated on the next step');
            }
        });

        clock.step(12);
    });

    t.test('noLongerUpdate method', function(t) {
        t.plan(4);
        var clock = new Clock();
        t.equal(typeof clock.noLongerUpdate, 'function', 'clock.noLongerUpdate should be a function');

        var updateable = {
            update: function() {
                t.pass();
            }
        };

        t.equal(clock.update(updateable), clock, 'clock.update should be chainable');
        clock.step(123);
        clock.step(124);
        clock.noLongerUpdate(updateable);
        clock.step(125);
        clock.step(126);
        clock.step(127);
    });

    t.test('getTime method', function(t) {
        t.plan(4);
        var clock = new Clock();
        t.equal(typeof clock.getTime, 'function', 'clock.getTime should be a function');

        clock.step(4);
        t.equal(clock.getTime(), 4);

        clock.step(5);
        t.equal(clock.getTime(), 5);
        
        clock.step(1996);
        t.equal(clock.getTime(), 1996);
    });
});
