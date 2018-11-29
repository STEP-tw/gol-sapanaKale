const assert = require('assert');
const { nextGeneration,
        generateNthGeneration,
        nthGeneration } = require('../src/gameOfLife.js');

const contains = (list,element) => list.some(e=>e[0]===element[0] && e[1]===element[1]);
const isSame = (actualList,expectedList) => actualList.every(contains.bind(null,expectedList));
const isSameArity = (actualList,expectedList) => actualList.length == expectedList.length;

describe('nextGeneration',() => {
  it('should generate an empty generation for a current generation that contains only one live cell',() => {
    let currentGeneration = [[0,1]];
    let bounds = {topLeft: [0,0], bottomRight: [3,3]};
    let actualNextGen = nextGeneration(currentGeneration,bounds);
    assert.deepEqual(actualNextGen,[]);
  });

  it('should generate a vertical blinker as the next step of a horizontal blinker',() => {
    let currentGeneration = [[0,1],[1,1],[2,1]];
    let expectedNextGen = [[1,0],[1,1],[1,2]]
    let bounds = {topLeft: [0,0], bottomRight: [3,3]};
    let actualNextGen = nextGeneration(currentGeneration,bounds);
    assert.ok(isSame(actualNextGen,expectedNextGen));
    assert.ok(isSameArity(actualNextGen,expectedNextGen));
  });

  it('should kill cells not within bounds',() => {
    let currentGeneration = [[0,1],[0,2],[0,3]];
    let expectedNextGen = []
    let bounds = {topLeft: [1,1], bottomRight: [3,3]};
    let actualNextGen = nextGeneration(currentGeneration,bounds);
    assert.ok(isSame(actualNextGen,expectedNextGen));
    assert.ok(isSameArity(actualNextGen,expectedNextGen));
  });
});

describe('nthGeneration', function() {
  it('should return the world state at provided generation', function() {
    let currGeneration = [[0, 0], [1, 0], [1, 1]];
    let bounds = {topLeft : [0,0], bottomRight : [1,1]};
    assert.deepEqual(nthGeneration(bounds, currGeneration, 1), [[0,0], [0,1], [1,0], [1,1]]);
   
    currGeneration = [[1,1], [1,2], [2,1], [2,2], [2,3]];
    bounds = {topLeft : [1,1], bottomRight : [3,3]}
    assert.deepEqual(nthGeneration(bounds, currGeneration, 3), [[2,2], [3,2]]);
    assert.deepEqual(nthGeneration(bounds, currGeneration, 4), []);
  });
})

describe('generateNthGeneration', function() {
  it('should return the grid form of provided world ', function() {
    let parameters = {bounds: {topLeft: [0,0], bottomRight: [1,1]}, currGeneration:[ [1,0] ],N:0};
    assert.deepEqual(generateNthGeneration(parameters),'+---+---+\n|   |   |\n+---+---+\n| L |   |\n+---+---+');
    parameters = {bounds: {topLeft: [0,0], bottomRight: [1,2]}, currGeneration:[ [0,2], [1,0] ],N:3};
    assert.deepEqual(generateNthGeneration(parameters),'+---+---+---+\n|   |   |   |\n+---+---+---+\n|   |   |   |\n+---+---+---+');
  });
})

