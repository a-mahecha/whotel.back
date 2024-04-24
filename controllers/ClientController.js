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

exports.get_all = (req, res, next) => {
  
  let connection = mysql.createConnection(configconnection); 
  let sql = `CALL SP_Client_G()`;  
  try {
    connection.query(sql, (err, results, fields) => {
      if (err) {
        console.error('err from callback: ' + err.stack);
        res.status(500).send(err);
      }else{
        if (results[0]) {
          return res.status(200).json({
            result:results[0]
          });     
        }else{
          return res.status(500).json({
            message: "Error"
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

exports.client_i = (req, res, next) => {
  let pCLNombre = req.body.pCLNombre;
  let pCLTel = req.body.pCLTel;
  let pCLDireccion = req.body.pCLDireccion;
  let pCLCiudad = req.body.pCLCiudad;
  let pCLUsuCrea = req.body.pCLUsuCrea;
  let data = [pCLNombre, pCLTel, pCLDireccion, pCLCiudad, pCLUsuCrea];

  let connection = mysql.createConnection(configconnection); 
  let sql = `CALL SP_Client_I(?,?,?,?,?)`;  
  try {
    connection.query(sql,data, (err, results, fields) => {
      if (err) {
        console.error('err from callback: ' + err.stack);
        res.status(500).send(err);
      }else{
        if (results[0]) {
          return res.status(200).json({
            result:results[0]
          });     
        }else{
          return res.status(500).json({
            message: "Error"
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

