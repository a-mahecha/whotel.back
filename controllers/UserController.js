const jwt = require("jsonwebtoken");
let mysql = require('mysql');
let { configconnection, security } = require('../config.js');

function valida(plist){

var res = true;
  for (let index = 0; index < plist.length; index++) {
    const element = plist[index];
    if(element == null || element == undefined) {res = false; break;} 
  }
  return res;
}

exports.user_login = (req, res, next) => {
  
  var wusuario = req.body.Usuario;
  var wcontrasena = req.body.Contrasena;

  if(!valida([wusuario, wcontrasena])) {
    return res.status(500).json({
      message: "invalid data"
    });     
  }

  let connection = mysql.createConnection(configconnection);
 
  let sql = `CALL SP_Login(?,?)`;
  let data = [wusuario, wcontrasena];

  try {
    connection.query(sql, data, (err, results, fields) => {
      if (err) {
        console.error('err from callback: ' + err.stack);
        res.status(500).send(err);
      }else{
        if (results[0].length > 0) {
          let wuser = results[0][0];
          const token = jwt.sign(
            {
              identificacion: wuser.USId
            },
            security.secretkey,
            {
              expiresIn: "12h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            iduser: wuser.USId
          });     
        }else{
          return res.status(500).json({
            message: "Auth fail"
          });     
        }
      }      
    });
  } catch (e) {
    console.error('err thrown: ' + e.stack);
    res.status(500).json({message: e.stack});
  }
  
  connection.end();

};

