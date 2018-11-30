const { nextGeneration, generateNthGeneration } = require('./src/gameOfLife.js'); 
const { extractParameters } = require('./src/lib.js'); 

const main = function() {
  let parameters = extractParameters( process.argv );
  console.log( generateNthGeneration( parameters ) ); 
}

main()
