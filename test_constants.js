const BACKEND = 'http://localhost:3000/'

export const ultimos = [
  {
    actual: await testEndpointPOST(`${BACKEND}ultimo`, {medidor:503}),
    expected: [{
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
        "numero": 99893 }]
    },
    {
    actual:await testEndpointPOST(`${BACKEND}ultimo`, {medidor:502}),
    expected:[{
        "medidor": 502,
        "nombre": "Pedro",
        "caserio": "El Progreso",
        "zona": 13,
        "lectura_actual": 265,
        "lectura_anterior": 260,
        "consumo": 5,
        "desde": "2023-09-15T06:00:00.000Z",
        "hasta": "2023-10-15T06:00:00.000Z",
        "dias": 31,
        "numero": 99896}]
  },
  {
    actual: await testEndpointPOST(`${BACKEND}ultimo`, {medidor:511}),
    expected:[{
      "medidor": 511,
      "nombre": "Jaime",
      "caserio": "La Pradera",
      "zona": 9,
      "lectura_actual": 270,
      "lectura_anterior": 261,
      "consumo": 9,
      "desde": "2023-09-15T06:00:00.000Z",
      "hasta": "2023-10-15T06:00:00.000Z",
      "dias": 31,
      "numero": 99897 }]
  }
  ]

export const usuarios = [
  {
    actual:await testEndpointGET(`${BACKEND}usuarios`),
    expected:[
    {
        "medidor": 503,
        "nombre": "Manuel",
        "caserio": "La Pradera",
        "zona": 9
    },
    {
        "medidor": 520,
        "nombre": "Josh",
        "caserio": "La Providencia",
        "zona": 11
    },
    {
        "medidor": 502,
        "nombre": "Pedro",
        "caserio": "El Progreso",
        "zona": 13
    },
    {
        "medidor": 511,
        "nombre": "Jaime",
        "caserio": "La Pradera",
        "zona": 9
    }
]
  }
]



export async function testEndpointPOST(endpoint, body){
  try {

    // Create FormData
    const formData = new URLSearchParams(body)

    // Perform request.
    const req = await fetch(endpoint, 
      { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: formData }
    );
    const res = await req.json();
    return res

  } catch (err) { return `Operation failed: ${err}` }
}



export async function testEndpointGET(endpoint, body){
  try {
    const req = await fetch(endpoint);
    const res = await req.json();
    return res
  } catch (err) { return `Operation failed: ${err}` }
}







