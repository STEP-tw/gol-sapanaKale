const { repeat,
        splitNumbers,
        intersection,
        increamentList,
        joinWithComa,
        convertToLinear,
        convertToMatrix,
        createUniqueList,
        justifier,
        joinByPipe,
        concat,
        cartesionProduct,
        isIncludes } = require("./util.js");

const isBoundsInvalid = function( bounds ) {
  let isXInvalid = bounds.topLeft[0] > bounds.bottomRight[0];
  let isYInvalid = bounds.topLeft[1] > bounds.bottomRight[1];
  return isXInvalid || isYInvalid;
}

const createBoard = function( bound ) {
  let x = bound.topLeft[0], xPrime = bound.bottomRight[0];
  let y = bound.topLeft[1], yPrime = bound.bottomRight[1];
  let rows = increamentList(x, xPrime);
  return rows.reduce( addRows.bind(null, y, yPrime), [] );
}

const addRows = function(y, yPrime, matrix, rowNumber) {
  let joinIndexes = joinWithComa.bind(null, rowNumber);
  let row = increamentList(y, yPrime).map( joinIndexes );
  matrix.push( row );
  return matrix;
}

const updateWorld = function (world, liveCells) {
  let width = world[0].length;
  let validLiveCells = liveCells.map(x => x.toString());
  validLiveCells = intersection( convertToLinear( world ), validLiveCells);
  world = validLiveCells.reduce( declareAlive, world );
  world = convertToLinear( world ).map( declareDead );
  return convertToMatrix( width, world );
}

const declareAlive = function (world, liveCells) {
  let row = liveCells.split(',')[0];
  let column = liveCells.split(',')[1];
  world[ row ][ column ] = '@';
  return world;
}

const declareDead  = function (element) {
  return (element == '@') ? element : ' ';
}

const allPossibleNeighbours = function (cell) {
  let x = +cell.split(',')[ 0 ];
  let y = +cell.split(',')[ 1 ];
  let neighbours = cartesionProduct( [x-1, x, x+1] , [y-1, y, y+1] );
  neighbours = neighbours.map( x => x.toString() );
  let index = neighbours.indexOf( cell );
  neighbours.splice( index, 1 );
  return neighbours;
}

const extractNeighbours = function(bound, cell) {
  let validCells = convertToLinear( createBoard( bound ) );
  let neighbourCells = allPossibleNeighbours( cell );
  let isValid = isIncludes.bind( null, validCells );
  return neighbourCells.filter( isValid );
}

const isAlive = function ( liveCells, bound, cell ) {
  let neighbours = extractNeighbours( bound, cell );
  let liveCellsString = liveCells.map( x => x.toString() );
  let aliveNeighbours = intersection( neighbours, liveCellsString );
  let willRemainAlive = aliveNeighbours.length == 2 && liveCellsString.includes(cell);
  let willComeAlive = aliveNeighbours.length == 3;
  return willRemainAlive || willComeAlive;
}

const extractParameters = function(details) {
  let bounds = extractBounds(details[2], details[3]);
  let currGeneration = extractGeneration( details[4] );
  let N = +details[5].split('=')[1];
  return { bounds : bounds, currGeneration : currGeneration, N : N };
}

const extractBounds = function(topLeft, bottomRight) {
  topLeft = splitNumbers( topLeft.split('=')[1] );
  bottomRight = splitNumbers( bottomRight.split('=')[1] );
  return { topLeft : topLeft, bottomRight : bottomRight };
}

const extractGeneration = function(aliveCells) {
  aliveCells = aliveCells.split('=')[1].split(' ');
  return aliveCells.map( splitNumbers );
}

const calculateWidth = function(world) {
  let lastRow = world[ world.length - 1 ];
  let row = lastRow.length;
  let column = lastRow[ row - 1 ].length + 2;
  return {row : +row, column : +column};
}

const createGrid = function(list, border) {
  let grid = [];
  for(let item of list) {
    grid.push(border);
    grid.push(item);
  }
  grid.push(border);
  return grid.join('\n');
}

const createBorder = function(rowWidth, columnWidth) {
  let border = new Array(rowWidth).fill(columnWidth);
  const repeatDash = repeat.bind(null, '-');
  border = border.map(repeatDash).join('+');
  border = '+' + border + '+';
  return border;
}

const createWorldGrid = function (world) {
  let width = calculateWidth(world);
  let border = createBorder(width.row, width.column);
  let justify = justifier.bind(null, width.column);
  let board = world.map( list => joinByPipe( list.map(justify) ) );
 return createGrid(board, border);
}

module.exports = {createBoard, 
                  addRows,
                  declareAlive, 
                  declareDead, 
                  updateWorld, 
                  allPossibleNeighbours,
                  extractNeighbours,
                  isAlive,
                  extractParameters,
                  extractGeneration,
                  extractBounds,
                  calculateWidth,
                  createGrid,
                  createWorldGrid,
                  isBoundsInvalid, 
                  createBorder };
