const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'taller'
});


app.post("/Form", (req, res) => {
    const referencia = req.body.referencia
    const color = req.body.color
    const talla = req.body.talla
    const precio = req.body.precio
    db.query('INSERT INTO producto (referencia, color, talla, precio) VALUES (?,?,?,?)',[referencia, color, talla, precio],
    (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("Product Created")
        }
    }
    
    );
});

app.get("/products", ( req, res) => {
  db.query("select * from producto", function(err, result, fields){
    if(err) throw err;
    console.log("result" +result);
    res.send(result);
  })

    
        

//   db.query("SELECT * FROM producto", function ( result, fields) {
//     ( result)=>{
       
//             console.log(result)
//             res.json(result)
        
//     }
//   });
});

app.get("/usuarios", ( req, res) => {
  db.query("select * from usuarios", function(err, result, fields){
    if(err) throw err;
    console.log("result" +result);
    res.send(result);
  })
});
app.post("/registrar", (req, res) => {
  const correo = req.body.correo
  const pass = req.body.pass
  db.query('INSERT INTO usuarios (correo, pass) VALUES (?,?)',[correo, pass],
  (err, result)=>{
      if(err){
          console.log(err)
      }else{
          res.send("Usuario creado")
      }
  }
  
  );
});


//   app.get("/image", ( req, res, next) => {
//     let params = req.query.imagen
//   db.query("select * from images where referencia = ?",[params], function(err, result, fields){
//     if(err) throw err;
//     console.log("result" +result);
//     res.send(result);
//   })
// })

app.listen(3002,()=> {
    console.log("Corriendo en el puerto 3002")
});
