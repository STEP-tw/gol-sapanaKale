const assert = require ("assert");
const { createWorld,
  extractParameters,
  extractBounds,
  extractGeneration,
  addRows,
  updateWorld,
  createBoard,
  declareDead,
  declareAlive,
  allPossibleNeighbours,
  extractNeighbours,
  isAlive,
  calculateWidth,
  isBoundsInvalid,
  createGrid,
  createBorder } = require ("../src/lib.js");

describe( "updateWorld" , function() {
  it( "should update state of provided live cells in given world" , function() {
    let world = [ ['0,0', '0,1'],
                  ['1,0', '1,1'] ];
    let liveCells = ['0,0', '1,1'];
    let updatedWorld = [['@', ' '], [' ', '@']];
    assert.deepEqual(updateWorld( world, liveCells ), updatedWorld );
  });
})

describe( "createBoard" , function() {
  it( "should return matrix according to the given bound " , function() {
    let board = [['0,0','0,1'],['1,0','1,1']];
    assert.deepEqual(createBoard({topLeft: [0,0], bottomRight: [1,1]}), board);

    board = [['1,1','1,2'],['2,1','2,2']];
    assert.deepEqual(createBoard({topLeft: [1,1], bottomRight: [2,2]}), board);
  });

  it("should return empty array when invalid bounds are provided" , function() {
    assert.deepEqual(createBoard({topLeft: [1,1], bottomRight: [-3,5]}),[]);
  });
})

describe('addRows', function() {
  it('should add rows to the given matrix with the given co-ordinates.', function() {
    let matrix = [];
    let expected = [['1,0', '1,1', '1,2', '1,3']];
    assert.deepEqual(addRows(0, 3, matrix, 1), expected );
    matrix = [ [ '0,0', '0,1', '0,2', '0,3' ] ];
    expected = [ [ '0,0', '0,1', '0,2', '0,3' ], 
                 [ '1,0', '1,1', '1,2', '1,3' ] ];
    assert.deepEqual(addRows(0, 3, matrix, 1), expected );
  })
})

describe('declareAlive', function() {
  it('should updated cells as live as per provided live cells list ', function() {
    assert.deepEqual(declareAlive([['0,0','0,1'],['1,0','1,1']],'0,1'),[['0,0','@'],['1,0','1,1']]);
  })
})

describe('declareDead', function() {
  it('should not update alive cell as dead',function() {
    assert.deepEqual(declareDead('@'),'@');
  })

  it('should update as dead if cell is not alive',function() {
    assert.deepEqual(declareDead('1'),' ');
  })
})

describe('allPossibleNeighbours', function() {
  it('should not update alive cell as dead',function() {
    let product = [ '0,1', '0,2', '0,3', '1,1', '1,3', '2,1', '2,2', '2,3' ]; 
    assert.deepEqual(allPossibleNeighbours('1,2'),product);
  })
})

describe('extractNeighbours', function() {
  it('should return all valid neighbours for provided world and cell position', function() {
    assert.deepEqual(extractNeighbours({topLeft:[0,0],bottomRight:[2,2]},'0,1'),['0,0','0,2','1,0','1,1','1,2']);
  })
})

describe('isAlive', function() {
  it('should return true if cell will alive in the provided world state.', function() {
    assert.deepEqual(isAlive([[0,0], [0,1], [1,2]], {topLeft: [0,0], bottomRight: [3,3]}, '1,1'), true);
  })
  it('should return false if cell will died in the provided world state.', function() {
    assert.deepEqual(isAlive([[0,0], [0,1]], {topLeft: [0,0], bottomRight: [3,3]}, '1,3'), false);
  })
})

describe('extractParameters', function() {
  it('should return a object of parameters from user input', function() {
    let userInput = [,,"LT=0,0", "RB=3,3", "LIVE=0,0 1,1 3,3", "N=1"];
    let parameters = { bounds: {topLeft: [0,0], bottomRight: [3,3]}, 
                       currGeneration:[ [0,0], [1,1], [3,3] ],
                       N:1 };
    assert.deepEqual(extractParameters(userInput),parameters);
  });
})

describe('extractBounds', function() {
  it('should return object of topLeft, bottomRight co-ordinates', function() {
    assert.deepEqual(extractBounds("LT=0,0", "RB=3,3"), {topLeft: [0,0], bottomRight: [3,3]});
  });
})

describe('extractGeneration', function() {
  it('should return array of aliveCells', function() {
    assert.deepEqual(extractGeneration("LIVE=0,0 1,1 3,3"), [ [0,0], [1,1], [3,3] ]);
  });
})

describe('calculateWidth', function() {
  it('should return the width of row and column', function() {
    let world = [['0,0', '0,1', '0,2'],
                 ['1,0', '1,1', '1,2'],
                 ['2,0', '2,1', '2,2']];
    assert.deepEqual(calculateWidth(world), {row : 3, column : 5});
    world = [['0,0', '0,1'],
             ['1,0', '1,1'],
             ['2,0', '2,1']];
    assert.deepEqual(calculateWidth(world), {row : 2, column : 5});
  });
})

describe('createGrid', function() {
  it('should return grid of given list and border', function() {
    let expectedOutput = '+-+\n';
    expectedOutput  +=   '|1|\n';
    expectedOutput  +=   '+-+\n';
    expectedOutput  +=   '|2|\n';
    expectedOutput  +=   '+-+';
    assert.deepEqual(createGrid(['|1|','|2|'],'+-+'),expectedOutput);
  });
})

describe('createBorder', function() {
  it('should create border for row according to the row and column width', function() {
    assert.deepEqual(createBorder(2,3), '+---+---+' );
    assert.deepEqual(createBorder(3,5), '+-----+-----+-----+' );
  });
})

describe('createWorld', function() {
  it('should return the grid form of provided world ', function() {
    let expectedOutput = '+---+---+\n';
    expectedOutput  +=   '|   |   |\n';
    expectedOutput  +=   '+---+---+\n';
    expectedOutput  +=   '| @ |   |\n';
    expectedOutput  +=   '+---+---+';
    assert.deepEqual(createWorld([[' ', ' '], ['@', ' ']]),expectedOutput);

    expectedOutput =  '+---+---+---+\n';
    expectedOutput += '|   |   | @ |\n';
    expectedOutput += '+---+---+---+\n';
    expectedOutput += '| @ |   |   |\n';
    expectedOutput += '+---+---+---+';
    assert.deepEqual(createWorld([[' ', ' ', '@'], ['@', ' ', ' ']]),expectedOutput);
  });
})

describe('isBoundsInvalid', function() {
  it('should return true if the given bounds are invalid', function() {
    let bounds = {topLeft: [0,0], bottomRight: [-3,3]};     
    assert.deepEqual(isBoundsInvalid( bounds ), true );
  });

  it('should return false if the given bounds are valid', function() {
    let bounds = {topLeft: [0,0], bottomRight: [3,3]};     
    assert.deepEqual(isBoundsInvalid( bounds ), false );
  });
})
