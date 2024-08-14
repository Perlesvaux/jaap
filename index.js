import express from 'express';
const app = express();

// Configure body-parser
import bodyParser from 'body-parser';
app.use(bodyParser.text({type:"text/plain"}))
app.use(bodyParser.urlencoded({extended:false}))

// psql --username=chico --dbname=jaap --tuples-only --no-align
// pg_dump -cC --inserts -U chico jaap > jaap.sql
// psql -U postgres < jaap.sql
import { q, logger, tarifas } from './lib.js'

// Configure CORS
import cors from 'cors';
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
// http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));
// http://expressjs.com/en/starter/basic-routing.html




let RESPONSE = []
let QUERY = ''

app.get('/', logger, async function (req, res) {
  try {
    RESPONSE = [{msg: "Bienvenido al JAAP"}];

  } catch (err) {
    console.error(`Hubo un error al intentar acceder a la tabla jaap.usuarios: ${err}`);

  }
    res.send(RESPONSE);
});


app.get('/usuarios', logger, async function (req, res) {
  try {
    RESPONSE = await q("select * from usuarios");

  } catch (err) {
    console.error(`Hubo un error al intentar acceder a la tabla jaap.usuarios: ${err}`);

  }
    res.send(RESPONSE);
});


app.post('/ultimo', logger, async function(req, res) {
  try {
    QUERY = "SELECT * FROM usuarios FULL JOIN recibos USING(medidor) WHERE medidor=$1 ORDER BY desde DESC LIMIT 1"
    RESPONSE = await q(QUERY, [req.body.medidor])

  } catch (err) {
    console.error(`Hubo un error al intentar acceder a la tabla jaap.usuarios FULL JOIN jaap.recibos: ${err}`);

  }
    res.send(RESPONSE)
})


app.get('/recientes', logger, async function (req, res) {
  try {
    QUERY = "select DISTINCT ON (medidor) * from usuarios full join recibos USING(medidor) order by medidor, desde DESC"
    RESPONSE = await q(QUERY);

  } catch(err) {
    console.error(`Hubo un error al intentar acceder a la tabla jaap.usuarios FULL JOIN jaap.recibos: ${err}`);

  }
    res.send(RESPONSE)
})

app.post('/todos-los-recibos-de', logger, async function(req, res){
  try {
    QUERY = "SELECT * FROM usuarios FULL JOIN recibos USING(medidor) WHERE medidor=$1"
    RESPONSE = await q(QUERY, [req.body.medidor])

  } catch (err) {
    console.error(`Hubo un error al intentar acceder a la tabla jaap.usuarios FULL JOIN jaap.recibos: ${err}`);

  }
    res.send(RESPONSE);
})


app.post('/generar-recibo', logger, async function(req, res){
  try {
    QUERY =  "SELECT * FROM usuarios FULL JOIN recibos USING(medidor) WHERE medidor=$1 ORDER BY desde DESC LIMIT 1";
    const _usuario = await q(QUERY, [req.body.medidor]);
    const _consumo = parseInt(req.body.lectura_nueva) - parseInt(_usuario[0].lectura_actual); 
    const _desde = new Date(_usuario[0].hasta);
    const _hasta = new Date(Date.now());
    const _dias = Math.ceil((_hasta - _desde) / (1000 * 60 * 60 * 24));
    const _total = tarifas(_consumo);

    RESPONSE = [{..._usuario[0],
      desde:_usuario[0].hasta,
      hasta:_hasta,
      lectura_anterior:parseInt(_usuario[0].lectura_actual),
      lectura_actual:parseInt(req.body.lectura_nueva),
      consumo:_consumo,
      dias:_dias,
      total:_total,
      numero:"TBD" }];

    res.send(RESPONSE)

  } catch (err) {
    console.error(err);
    res.send(RESPONSE);
  }
})


app.post('/nuevo-recibo', logger, async function(req, res){
  try {
  QUERY =  "SELECT * FROM usuarios FULL JOIN recibos USING(medidor) WHERE medidor=$1 ORDER BY desde DESC LIMIT 1";
  const _usuario = await q(QUERY, [req.body.medidor]);
  const _consumo = parseInt(req.body.lectura_nueva) - parseInt(_usuario[0].lectura_actual); 
  const _desde = new Date(_usuario[0].hasta);
  const _hasta = new Date(Date.now());
  const _dias = Math.ceil((_hasta - _desde) / (1000 * 60 * 60 * 24));
  const _total = tarifas(_consumo);

  RESPONSE = [{..._usuario[0],
    desde:_usuario[0].hasta,
    hasta:_hasta,
    lectura_anterior:parseInt(_usuario[0].lectura_actual),
    lectura_actual:parseInt(req.body.lectura_nueva),
    consumo:_consumo,
    dias:_dias,
    total:_total,
    numero:"TBD" }];

  QUERY =  `INSERT INTO recibos (medidor,lectura_actual,lectura_anterior,consumo,desde,hasta,dias,total) VALUES  ($1, $2, $3, $4, $5, $6, $7, $8)`;
  const {medidor, lectura_actual, lectura_anterior, consumo, desde, hasta, dias, total} = RESPONSE[0];
  await q(QUERY, [medidor, lectura_actual, lectura_anterior, consumo, desde, hasta, dias, total]);

  res.send(RESPONSE)

  } catch (err) {
    console.error(err);
    res.send(RESPONSE);
  }

})



const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


//****Tabla de tarifas****`
//6 o Menos:       $2.61 (Tarifa minima)
//Entre 7 - 40:    0.25*(MEDICION-7)+1.75+1.60
//Entre 41 - 50:   0.40*(MEDICION-7)+11.60
//Entre 51 - 100:  (0.75*MEDICION)+1.60
//Entre 101 - 150: (1.00*MEDICION)+1.60
//Entre 151 - 200: (1.25*MEDICION)+1.60
//201 o Mas:       (1.50*MEDICION)+1.60




