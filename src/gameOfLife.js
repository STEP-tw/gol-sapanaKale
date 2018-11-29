const { convertToLinear, splitNumbers } = require('./util.js'); 
const { isAlive, createBoard } = require('./lib.js'); 

const nextGeneration = function( currGeneration, bounds ) {
  let world = convertToLinear( createBoard( bounds ) );
  let isCellAlive = isAlive.bind( null, currGeneration, bounds );
  return world.filter( isCellAlive ).map( splitNumbers );
}

module.exports = { nextGeneration };
