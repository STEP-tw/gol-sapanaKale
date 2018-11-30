const { convertToLinear, splitNumbers } = require('./util.js'); 
const { isAlive, createBoard, updateWorld, createWorldGrid, isBoundsInvalid } = require('./lib.js'); 

const nextGeneration = function( currGeneration, bounds ) {
  let world = convertToLinear( createBoard( bounds ) );
  let isCellAlive = isAlive.bind( null, currGeneration, bounds );
  return world.filter( isCellAlive ).map( splitNumbers );
}

const nthGeneration = function(bounds, currGeneration, iteration) {
  if(iteration == 0) {
    return currGeneration;
  }
  return nthGeneration(bounds, nextGeneration(currGeneration, bounds), --iteration);
}

const generateNthGeneration = function(parameters) {
  let { bounds, currGeneration, N } = parameters;
  if(isBoundsInvalid( bounds )) {
    return "Invalid bounds.";
  }
  let aliveCells = nthGeneration(bounds, currGeneration, N);
  let world = createBoard( bounds );
  return createWorldGrid( updateWorld(world, aliveCells) );
}

module.exports = { nextGeneration,
                   nthGeneration,
                   generateNthGeneration };
