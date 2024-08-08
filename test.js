import assert from 'assert';
//import {helloWorld} from '../src/functions.js';

describe("A simple string comparison", ()=>{
  it("String matches", ()=>{
    
    assert.deepEqual(
      //await testEndpoint('todos-los-recibos-de', {medidor:503}),
      ultimo_1 ,
      [
          {
              "medidor": 503,
              "nombre": "Manuel",
              "caserio": "La Pradera",
              "zona": 9,
              "lectura_actual": 270,
              "lectura_anterior": 261,
              "consumo": 9,
              "desde": "2023-11-15T06:00:00.000Z",
              "hasta": "2023-12-15T06:00:00.000Z",
              "dias": 31,
              "numero": 99893
          }
      ]


    )





    assert.deepEqual((()=>'Hello World! xD')(), "Hello World! xD")
  }) 
})



const BACKEND = 'http://localhost:3000/'



async function testEndpoint(endpoint, body){
  try {
    // Creating Formdata. 
    //const formData = new FormData();
    //for (const k in body) {
    //  console.log(`${k}`,`${body[k]}`);
    //  formData.append(`${k}`,`${body[k]}`);
    //}

    const formData = new URLSearchParams(body)

    // Perform request.
    const result = await fetch(endpoint, 
      { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: formData }
    );

    const res = await result.json();

    console.log(res)

    return res

  } catch (err) { return `Operation failed: ${err}` }
}

const ultimo_1 = await testEndpoint(`${BACKEND}ultimo`, {medidor:503});



