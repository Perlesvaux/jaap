import assert from 'assert';
import { expect } from 'chai'
import { ultimos, usuarios, de_7_40, de_41_50, de_51_100, de_101_150, de_151_200, menos_de_6, mas_de_201, generar_recibo } from './test_constants.js'
import { tarifas,  testEndpointPOST } from './lib.js'
//import {helloWorld} from '../src/functions.js';

describe("Suite testing the following endpoints", ()=>{

  it("/ultimo responds with correct JSON", ()=>{
    for (const ultimo of ultimos) assert.deepEqual(ultimo.actual, ultimo.expected);
    assert.deepEqual((()=>'Hello World! xD')(), "Hello World! xD")
  });

  it("/usuarios /recientes respond with correct JSON", ()=>{
    for (const usuario of usuarios) assert.deepEqual(usuario.actual, usuario.expected);
  });

  //expect((()=>3.01).to.be.closeTo((()=>3.02),10));

  it("/generar-recibo responds with correct JSON", ()=>{
    //expect(()=>3.01).to.be.closeTo((()=>3.02),10);
    for (const usuario of generar_recibo) {
      assert.deepEqual(usuario.actual[0].nombre           , usuario.expected[0].nombre);
      assert.deepEqual(usuario.actual[0].caserio          , usuario.expected[0].caserio);
      assert.deepEqual(usuario.actual[0].zona             , usuario.expected[0].zona);
      assert.deepEqual(usuario.actual[0].lectura_actual   , usuario.expected[0].lectura_actual);
      assert.deepEqual(usuario.actual[0].lectura_anterior , usuario.expected[0].lectura_anterior);
      assert.deepEqual(usuario.actual[0].consumo          , usuario.expected[0].consumo);
      assert.deepEqual(usuario.actual[0].desde            , usuario.expected[0].desde);
      assert.deepEqual(usuario.actual[0].numero           , usuario.expected[0].numero);
      assert.deepEqual(usuario.actual[0].total            , usuario.expected[0].total);
      expect(new Date(usuario.actual[0].hasta).getTime()).to.be.closeTo(Date.now(),11);
      const daysComputedAtRuntime = Math.ceil( (Date.now() - new Date(usuario.actual[0].desde)) / (1000 * 60 * 60 * 24));
      assert.deepEqual(usuario.actual[0].dias             , daysComputedAtRuntime);
    }

  })


})





describe("Suite testing fees", ()=>{

  it("Correct fees below or equal to 6", ()=>{
    for (const medida of menos_de_6) assert.equal(tarifas(medida.actual), medida.expected)
  })

  it("Correct fees 7-40", ()=>{
    for (const medida of de_7_40) assert.equal(tarifas(medida.actual), medida.expected)
  })

  it("Correct fees 41-50", ()=>{
    for (const medida of de_41_50) assert.equal(tarifas(medida.actual), medida.expected)
  })

  it("Correct fees 50-100", ()=>{
    for (const medida of de_51_100) assert.equal(tarifas(medida.actual), medida.expected)
  })

  it("Correct fees 101-150", ()=>{
    for (const medida of de_101_150) assert.equal(tarifas(medida.actual), medida.expected)
  })

  it("Correct fees 151-200", ()=>{
    for (const medida of de_151_200) assert.equal(tarifas(medida.actual), medida.expected)
  })

  it("Correct fees 151-200", ()=>{
    for (const medida of de_151_200) assert.equal(tarifas(medida.actual), medida.expected)
  })

  it("Correct fees above or equal to 201", ()=>{
    for (const medida of mas_de_201) assert.equal(tarifas(medida.actual), medida.expected)
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




