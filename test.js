var test = require('ava');
var trimNewlines = require('./index.js');

test('main', function(t) {
    t.is(trimNewlines(''), '');
    t.is(trimNewlines('  '), '  ');
    t.is(trimNewlines('\n\n\r'), '');
    t.is(trimNewlines('\nx\n'), 'x');
    t.is(trimNewlines('\n\n\nx\n\n\n'), 'x');
    t.is(trimNewlines('\r\nx\r\n'), 'x');
    t.is(trimNewlines('\n\r\n\nx\n\r\n\n'), 'x');
});

test('start', function(t) {
    t.is(trimNewlines.start(''), '');
    t.is(trimNewlines.start('  '), '  ');
    t.is(trimNewlines.start('\n\n\r'), '');
    t.is(trimNewlines.start('\nx'), 'x');
    t.is(trimNewlines.start('\r\nx'), 'x');
    t.is(trimNewlines.start('\n\n\n\nx'), 'x');
    t.is(trimNewlines.start('\n\n\r\n\nx'), 'x');
    t.is(trimNewlines.start('x\n\n\r\n\n'), 'x\n\n\r\n\n');
});

test('end', function(t) {
    t.is(trimNewlines.end(''), '');
    t.is(trimNewlines.end('  '), '  ');
    t.is(trimNewlines.end('\n\n\r'), '');
    t.is(trimNewlines.end('x\n'), 'x');
    t.is(trimNewlines.end('x\r\n'), 'x');
    t.is(trimNewlines.end('x\n\n\n\n'), 'x');
    t.is(trimNewlines.end('x\n\n\r\n\n'), 'x');
    t.is(trimNewlines.end('\n\n\r\n\nx'), '\n\n\r\n\nx');
});

// Replace Array.from() and let/const with older approaches
test('main - does not have exponential performance', function(t) {
    for (var index = 0; index < 45000; index += 1000) {
        var newlines = Array(index + 1).join('\n');
        var string = newlines + 'a' + newlines;
        var start = Date.now();
        trimNewlines(string);
        var difference = Date.now() - start;
        t.true(difference < 10, 'Execution time: ' + difference);
    }
});

test('start - does not have exponential performance', function(t) {
    for (var index = 0; index < 45000; index += 1000) {
        var newlines = Array(index + 1).join('\n');
        var string = newlines + 'a';
        var start = Date.now();
        trimNewlines.start(string);
        var difference = Date.now() - start;
        t.true(difference < 10, 'Execution time: ' + difference);
    }
});

test('end - does not have exponential performance', function(t) {
    for (var index = 0; index < 45000; index += 1000) {
        var newlines = Array(index + 1).join('\n');
        var string = 'a' + newlines;
        var start = Date.now();
        trimNewlines.end(string);
        var difference = Date.now() - start;
        t.true(difference < 10, 'Execution time: ' + difference);
    }
});