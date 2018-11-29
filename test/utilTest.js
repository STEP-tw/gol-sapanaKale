const assert = require ("assert");
const { increamentList, 
        intersection,
        cartesionProduct,    
        concat,    
        convertToLinear,    
        convertToMatrix,    
        createUniqueList,    
        joinWithComa,
        isIncludes,
        splitNumbers } = require ("../src/util.js");

describe( "createUniqueList" , function() {
  it( "should return empty list with size is zero", function() {
    assert.deepEqual(createUniqueList(0, 0), []);
  });

  it( "should return unique list of provided size and element" , function() {
    assert.deepEqual(createUniqueList(2, 2), [2, 2]);
    assert.deepEqual(createUniqueList(3, 4), [4, 4, 4]);
  });
})

describe( "joinWithComa" , function() {
  it( "should return coma separated string of provided elements", function() {
    assert.deepEqual(joinWithComa('a', 'b'), 'a,b');
    assert.deepEqual(joinWithComa(0, 1), '0,1');
  });
})

describe('concat', function() {
  it('should concat provided lists', function() {
    assert.deepEqual(concat([1, 2], [1, 2]), [1, 2, 1, 2]);
  });
})

describe('convertToLinear', function() {
  it('should return linear array for given matrix', function() {
    assert.deepEqual(convertToLinear([ [1, 2], [1, 2], [3, 4] ]), [1, 2, 1, 2, 3, 4]);
  });
})

describe('convertToMatrix', function() {
  it('should return matrix array for given linearArray', function() {
    assert.deepEqual(convertToMatrix(3, [1, 2, 1, 2, 3, 4]), [ [1, 2, 1], [2, 3, 4] ]);
  });
})

describe('cartesionProduct', function() {
  it('should return all cartesionProduct of provided sets ', function() {
    assert.deepEqual(cartesionProduct([1, 2], [3, 4]), [ [1, 3], [1, 4], [2, 3], [2, 4] ]);
  });
})

describe('increamentList', function() {
  it('should return list of numbers in increamental order provided from start value to end value', function() {
    assert.deepEqual(increamentList(0, 3), [0, 1, 2, 3]);
    assert.deepEqual(increamentList(1, 5), [1, 2, 3, 4, 5]);
  });
})

describe('isIncludes', function() {
  it('should return true when given element is includes in given list', function() {
    assert.deepEqual(isIncludes([1, 2, 3], 2), true);
  });
  it('should return false when given element is not present in given list', function() {
    assert.deepEqual(isIncludes([1, 2, 3],4), false);
  });
})

describe('intersection', function() {
 it('should return intersection of the given sets.', function() {
   assert.deepEqual(intersection([1, 2, 3, 4], [2, 3]), [2, 3] );
   assert.deepEqual(intersection(['1,2', '2,3', '4,5'], ['1,3']), [] );
   assert.deepEqual(intersection(['1,2', '2,3', '4,5'], ['1,2', '1,4']), ['1,2'] );
 });
})

describe('splitNumbers', function() {
 it('should return splitNumbers of the given sets.', function() {
   assert.deepEqual(splitNumbers('1,2'), [1, 2] );
   assert.deepEqual(splitNumbers('0,0'), [0, 0]);
 });
})

