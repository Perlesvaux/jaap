import assert from 'assert';
import { ultimos, usuarios } from './test_constants.js'
//import {helloWorld} from '../src/functions.js';

describe("A simple string comparison", ()=>{
  it("endpoint /ultimo responds with correct JSON", ()=>{
    for (const ultimo of ultimos) assert.deepEqual(ultimo.actual, ultimo.expected);
    assert.deepEqual((()=>'Hello World! xD')(), "Hello World! xD")
  });

  it("endpoint /usuarios responds with correct JSON", ()=>{
    for (const usuario of usuarios) assert.deepEqual(usuario.actual, usuario.expected);



  });


})



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




