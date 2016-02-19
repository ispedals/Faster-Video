const parseNumbers = require('../numberParser').parseNumbers;

exports['test parseNumber'] = function(assert){
    assert.deepEqual(parseNumbers("1, 3, 5"), [1, 3, 5], 'parseNumbers works with integers');
    assert.deepEqual(parseNumbers("0.25, 1"), [0.25, 1], 'parseNumbers works with floats');
    assert.deepEqual(parseNumbers("0.25x, 1x"), [0.25, 1], 'parseNumbers works with trailing crud');
    assert.deepEqual(parseNumbers("0.25,1"), [0.25, 1], 'parseNumbers works with no space');
    assert.deepEqual(parseNumbers("x0.25,x1", "0.25, 1"), [0.25, 1], 'parseNumbers defaults correctly');
    assert.deepEqual(parseNumbers("x0.25,2", "0.25, 1"), [0.25, 1], 'parseNumbers defaults if a single value is bad');
}

require("sdk/test").run(exports);