export function tarifas(consumo) {
  //consumo <= 6
  //if ( 7 >= consumo <= 40 ) return "it works"

  const TARIFA_MINIMA = 2.61
  if ( consumo <= 6 ) return TARIFA_MINIMA
  else if (  7  <= consumo && consumo <= 40  )  return Number( 0.25*(consumo-0)+0+1.60         ).toFixed(2);
  else if ( 41  <= consumo && consumo <= 50  )  return Number( 0.40*(consumo-40)+10+1.60       ).toFixed(2);
  else if ( 51  <= consumo && consumo <= 100 )  return Number( 0.75*(consumo-0)+0+1.60         ).toFixed(2);
  else if ( 101 <= consumo && consumo <= 150 )  return Number( 1.00*(consumo-0)+0+1.60         ).toFixed(2);
  else if ( 151 <= consumo && consumo <= 200 )  return Number( 1.25*(consumo-0)+0+1.60         ).toFixed(2);
  else if ( consumo >= 201)                     return Number( 1.50*(consumo-0)+0+1.60         ).toFixed(2);
  return 2.61
}

//****Tabla de tarifas****`
//6 o Menos:       $2.61 (Tarifa minima)
//Entre 7 - 40:    0.25*(consumo-7)+1.75+1.60
//Entre 41 - 50:   0.40*(consumo-40)+11.60
//Entre 51 - 100:  (0.75*consumo)+1.60
//Entre 101 - 150: (1.00*consumo)+1.60
//Entre 151 - 200: (1.25*consumo)+1.60
//201 o Mas:       (1.50*consumo)+1.60

export async function testEndpointPOST(endpoint, body){
  try {
    const formData = new URLSearchParams(body);
    const req = await fetch(endpoint, 
      { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: formData }
    );
    const res = await req.json();
    return res;
  } catch (err) { return `Operation failed: ${err}` }
}



export async function testEndpointGET(endpoint, body){
  try {
    const req = await fetch(endpoint);
    const res = await req.json();
    return res
  } catch (err) { return `Operation failed: ${err}` }
}

// Configure connection to psql database
import Pool from 'pg-pool';
const connection = new Pool({
  user:"chico",
  host:"localhost",
  database:"jaap",
  password:"elpepe",
  port: 5432
});

// Wrapper that handles PSQL queries
export async function q (query, params){
  try {
    const result = await connection.query(query, params);
    return result.rows;
    
  } catch (err) {
    console.error(err);
    return "";

  }
}


// Logger
export function logger (req, res, next){
  console.log(req.method, req.path, req.ip);
  next();
}


