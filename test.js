import assert from 'assert';
import { ultimos, usuarios } from './test_constants.js'
import { tarifas } from './lib.js'
//import {helloWorld} from '../src/functions.js';

describe("Suite testing the following endpoints", ()=>{

  it("/ultimo responds with correct JSON", ()=>{
    for (const ultimo of ultimos) assert.deepEqual(ultimo.actual, ultimo.expected);
    assert.deepEqual((()=>'Hello World! xD')(), "Hello World! xD")
  });

  it("/usuarios /recientes respond with correct JSON", ()=>{
    for (const usuario of usuarios) assert.deepEqual(usuario.actual, usuario.expected);
  });



})

describe("Suite testing functions", ()=>{

  it("Tarifas correctas", ()=>{
    assert.equal(tarifas(4), 2.61)
    assert.equal(tarifas(33), 9.85)
    assert.equal(tarifas(50), 15.60)
    assert.equal(tarifas(51), 39.85)

    //assert.equal(tarifas(50), 15.60)

  })


});



//const BACKEND = 'http://localhost:3000/'



//async function testEndpoint(endpoint, body){
//  try {
//    // Creating Formdata. 
//    //const formData = new FormData();
//    //for (const k in body) {
//    //  console.log(`${k}`,`${body[k]}`);
//    //  formData.append(`${k}`,`${body[k]}`);
//    //}
//
//    const formData = new URLSearchParams(body)
//
//    // Perform request.
//    const result = await fetch(endpoint, 
//      { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: formData }
//    );
//
//    const res = await result.json();
//
//    //console.log(res)
//
//    return res
//
//  } catch (err) { return `Operation failed: ${err}` }
//}

//const ultimo_1 = await testEndpoint(`${BACKEND}ultimo`, {medidor:503});
//const ultimo_2 = await testEndpoint(`${BACKEND}ultimo`, {medidor:502});




