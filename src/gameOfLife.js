const { convertToLinear, splitNumbers } = require('./util.js'); 
const { isAlive, createBoard } = require('./lib.js'); 

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

module.exports = { nextGeneration,
                   nthGeneration };
