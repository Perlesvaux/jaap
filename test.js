import assert from 'assert';
import { expect } from 'chai'
import { BACKEND, ultimos, usuarios, de_7_40, de_41_50, de_51_100, de_101_150, de_151_200, menos_de_6, mas_de_201, generar_recibo, recientes, nuevo_recibo } from './test_constants.js'
import { mockUp_setup, tarifas,  testEndpointGET, testEndpointPOST, q } from './lib.js'
//import {helloWorld} from '../src/functions.js';


describe("Suite testing the following endpoints", ()=>{
//beforeEach(mockUp_setup)
before(mockUp_setup)

  it("/ultimo responds with correct JSON", async ()=>{
    for (const usuario of ultimos) {
      const {endpoint, body, expected} = usuario;
      const actual = await testEndpointPOST(endpoint, body);

      const [ { medidor:actual_medidor,
        nombre:actual_nombre,
        caserio:actual_caserio,
        zona:actual_zona,
        lectura_actual:actual_lectura_actual,
        lectura_anterior:actual_lectura_anterior,
        consumo:actual_consumo,
        desde:actual_desde,
        hasta:actual_hasta,
        numero:actual_numero,
        total:actual_total,
        dias } ] = actual;

      const [ { medidor:expected_medidor,
        nombre:expected_nombre,
        caserio:expected_caserio,
        zona:expected_zona,
        lectura_actual:expected_lectura_actual,
        lectura_anterior:expected_lectura_anterior,
        consumo:expected_consumo,
        desde:expected_desde,
        numero:expected_numero,
        total:expected_total } ] = expected;

        assert.deepEqual(actual_medidor, expected_medidor);
        assert.deepEqual(actual_nombre, expected_nombre);
        assert.deepEqual(actual_caserio, expected_caserio);
        assert.deepEqual(actual_zona, expected_zona);
        assert.deepEqual(actual_lectura_actual, expected_lectura_actual);
        assert.deepEqual(actual_lectura_anterior, expected_lectura_anterior);
        assert.deepEqual(actual_consumo, expected_consumo);
        assert.deepEqual(actual_desde, expected_desde);
        assert.deepEqual(actual_total, expected_total);

    }
    assert.deepEqual((()=>'Hello World! xD')(), "Hello World! xD")
  });

  it("/usuarios responds with correct JSON", async ()=>{
    for (const usuario of usuarios) { 
      //const {actual, expected} = usuario
      const {endpoint, body, expected} = usuario;
      const actual = await testEndpointGET(endpoint);
      //const {medidor:actual_medidor, nombre:actual_nombre, caserio:actual_caserio, zona:actual_zona} = actual
      //const {medidor:expected_medidor, nombre:expected_nombre, caserio:expected_caserio, zona:expected_zona} = expected
      //assert.deepEqual(actual_medidor, expected_medidor)
      assert.deepEqual(actual, expected)
    };
  });

  it("/recientes responds with correct JSON", async ()=>{

    for (const usuario of recientes)
    {
      //const {actual, expected} = usuario;
      const {endpoint, body, expected} = usuario;
      const actual = await testEndpointGET(endpoint);
      const [ { medidor:actual_medidor,
        nombre:actual_nombre,
        caserio:actual_caserio,
        zona:actual_zona,
        lectura_actual:actual_lectura_actual,
        lectura_anterior:actual_lectura_anterior,
        consumo:actual_consumo,
        desde:actual_desde,
        hasta:actual_hasta,
        numero:actual_numero,
        total:actual_total,
        dias: actual_dias } ] = actual;

      const [ { medidor:expected_medidor,
        nombre:expected_nombre,
        caserio:expected_caserio,
        zona:expected_zona,
        lectura_actual:expected_lectura_actual,
        lectura_anterior:expected_lectura_anterior,
        consumo:expected_consumo,
        desde:expected_desde,
        hasta:expected_hasta,
        numero:expected_numero,
        total:expected_total,
        dias: expected_dias } ] = expected;

        assert.deepEqual(actual_medidor, expected_medidor);
        assert.deepEqual(actual_nombre,  expected_nombre);
        assert.deepEqual(actual_caserio, expected_caserio);
        assert.deepEqual(actual_zona, expected_zona);
        assert.deepEqual(actual_lectura_actual, expected_lectura_actual);
        assert.deepEqual(actual_lectura_anterior, expected_lectura_anterior);
        assert.deepEqual(actual_consumo, expected_consumo);
        assert.deepEqual(actual_desde, expected_desde);
        assert.deepEqual(actual_total, expected_total);

    }


  })

  //expect((()=>3.01).to.be.closeTo((()=>3.02),10));

  it("/generar-recibo responds with correct JSON", async ()=>{
    for (const usuario of generar_recibo) {
      //const {actual, expected} = usuario;
      const {endpoint, body, expected} = usuario;
      const actual = await testEndpointPOST(endpoint, body);
      const [ { medidor:actual_medidor,
        nombre:actual_nombre,
        caserio:actual_caserio,
        zona:actual_zona,
        lectura_actual:actual_lectura_actual,
        lectura_anterior:actual_lectura_anterior,
        consumo:actual_consumo,
        desde:actual_desde,
        hasta:actual_hasta,
        numero:actual_numero,
        total:actual_total,
        dias } ] = actual;

      const [ { medidor:expected_medidor,
        nombre:expected_nombre,
        caserio:expected_caserio,
        zona:expected_zona,
        lectura_actual:expected_lectura_actual,
        lectura_anterior:expected_lectura_anterior,
        consumo:expected_consumo,
        desde:expected_desde,
        numero:expected_numero,
        total:expected_total } ] = expected;

        assert.deepEqual(actual_medidor, expected_medidor);
        assert.deepEqual(actual_nombre, expected_nombre);
        assert.deepEqual(actual_caserio, expected_caserio);
        assert.deepEqual(actual_zona, expected_zona);
        assert.deepEqual(actual_lectura_actual, expected_lectura_actual);
        assert.deepEqual(actual_lectura_anterior, expected_lectura_anterior);
        assert.deepEqual(actual_consumo, expected_consumo);
        assert.deepEqual(actual_desde, expected_desde);
        //assert.deepEqual(actual_numero, expected_numero);
        assert.deepEqual(actual_total, expected_total);
        expect(new Date(actual_hasta).getTime()).to.be.closeTo(Date.now(),1000);
        const daysComputedAtRuntime = Math.ceil( (Date.now() - new Date(actual_desde)) / (1000 * 60 * 60 * 24));
        assert.deepEqual(dias, daysComputedAtRuntime);
    }
  })

  //it("/nuevo-recibo",  ()=>{
  //  setTimeout( async () => {
  //
  //  for (const usuario of nuevo_recibo){
  //    const {actual, expected} = usuario;
  //    const data = await testEndpointPOST(`${BACKEND}nuevo-recibo`, actual)
  //    console.log(data, expected)
  //  }
  //
  //  }, 3000);
  //
  //})




})


describe("Suite testing creation of new entries", ()=>{

before(mockUp_setup);

  it("/nuevo-recibo", async ()=>{

    for (const usuario of nuevo_recibo){
      const {endpoint, body, expected} = usuario;
      const actual = await testEndpointPOST(endpoint, body)
      //console.log(actual, expected);
      //assert.deepEqual();
      const [ { medidor:actual_medidor,
        nombre:actual_nombre,
        caserio:actual_caserio,
        zona:actual_zona,
        lectura_actual:actual_lectura_actual,
        lectura_anterior:actual_lectura_anterior,
        consumo:actual_consumo,
        //desde:actual_desde,
        //hasta:actual_hasta,
        numero:actual_numero,
        total:actual_total,
        //dias
      } ] = actual;

      const [ { medidor:expected_medidor,
        nombre:expected_nombre,
        caserio:expected_caserio,
        zona:expected_zona,
        lectura_actual:expected_lectura_actual,
        lectura_anterior:expected_lectura_anterior,
        consumo:expected_consumo,
        //desde:expected_desde,
        numero:expected_numero,
        total:expected_total
      } ] = expected;

        assert.deepEqual(actual_medidor, expected_medidor);
        assert.deepEqual(actual_nombre, expected_nombre);
        assert.deepEqual(actual_caserio, expected_caserio);
        assert.deepEqual(actual_zona, expected_zona);
        assert.deepEqual(actual_lectura_actual, expected_lectura_actual);
        assert.deepEqual(actual_lectura_anterior, expected_lectura_anterior);
        assert.deepEqual(actual_consumo, expected_consumo);
        //assert.deepEqual(actual_desde, expected_desde);
        assert.deepEqual(actual_numero, expected_numero);
        assert.deepEqual(actual_total, expected_total);
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

