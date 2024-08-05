
import express from 'express';
const app = express();

// Configure body-parser
import bodyParser from 'body-parser';
app.use(bodyParser.text({type:"text/plain"}))
app.use(bodyParser.urlencoded({extended:false}))

// sql --username=chico --dbname=jaap --tuples-only --no-align
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
async function q (query, params){
  try {
    const result = await connection.query(query, params);
    return result.rows;
    
  } catch (err) {
    console.error(err);
    return "";
  }

}

// Logger
function logger (req, res, next){
  console.log(req.method, req.path, req.ip);
  next();
}

// Configure CORS
import cors from 'cors';
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', logger, async function (req, res) {
  const usuarios = await q("select * from usuarios")
  res.json({msg: "Hello World!", dbquery: usuarios})
});

app.get('/encontrar', logger, async function(req, res) {
  let response = {dbquery:"Sorry, that user doesn't exist"}
  let strQuery = "SELECT * FROM usuarios FULL JOIN recibos USING(medidor) WHERE medidor=$1 ORDER BY desde DESC LIMIT 1"

  
  // const usuario = await q('select * from usuarios where medidor=$1', [req.body.medidor])
  const usuario = await q(strQuery, [req.body.medidor])
  // if (usuario) response={...response, dbquery:`Welcome back ${usuario[0].nombre}, your last consumption was ${usuario[0].lectura_actual}`}
  if (usuario) response={...response, dbquery:usuario, msg:`La ultima lectura de ${usuario[0].nombre} fue ${usuario[0].lectura_actual} (${usuario[0].hasta})` }
  
  // res.json({dbquery: `Welcome back ${usuario[0].nombre}!`})
  res.json(response)
})

app.get('/todos-los-recibos-de', logger, async function(req, res){
  let response = {dbquery:"Sorry, no receipts were found"}
  let strQuery = "SELECT * FROM usuarios FULL JOIN recibos USING(medidor) WHERE medidor=$1"
  const recibos = await q(strQuery, [req.body.medidor])
  if (recibos) response={...response, dbquery:recibos}
  res.json(response)

   // insert into recibos values(503,270,261,9,'2023-11-15','2023-12-15',31,99891)

})

app.get('/generar-recibo', logger, async function(req, res){
  let response = {dbquery: "Sorry, something went wrong"}
  let strQuery =  "SELECT * FROM usuarios FULL JOIN recibos USING(medidor) WHERE medidor=$1 ORDER BY desde DESC LIMIT 1"
  const usuario = await q(strQuery, [req.body.medidor])

  const consumption = parseInt(req.body.lectura_nueva) - parseInt(usuario[0].lectura_actual) 
  //const consumption = parseInt(req.body.lectura_nueva) - parseInt(usuario[0].lectura_actual) 
  const until = new Date(usuario[0].hasta)
  const today = new Date(Date.now())

  const numberOfDays = Math.ceil((today-until) / (1000 * 60 * 60 * 24))
  //until.setDate(until.getDate()+30);
  let new_data = {...usuario[0],
    desde:usuario[0].hasta,
    hasta:today,
    lectura_anterior:parseInt(usuario[0].lectura_actual),
    lectura_actual:parseInt(req.body.lectura_nueva),
    consumo:consumption,
    dias:numberOfDays
  }

  console.log(until)
  console.log(today)
  console.log(consumption)
  console.log(numberOfDays)
  res.json(new_data)


})






// your first API endpoint...
// app.get('/api/whoami', function (req, res) {
//   res.json({ ipaddress: req.ip, language:req.headers['accept-language'], software: req.headers['user-agent'] });
// });

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
