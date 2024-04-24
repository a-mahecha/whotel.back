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

exports.order_i = (req, res, next) => {
  let pODClient = req.body.pODClient;
  let pSTId = req.body.pSTId;
  let data = [pODClient, pSTId];

  let connection = mysql.createConnection(configconnection); 
  let sql = `CALL SP_Order_I(?,?)`;  
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

exports.order_item_i = (req, res, next) => {
    let pIOImageBase64 = req.body.pIOImageBase64;
    let pIOProvider = req.body.pIOProvider;
    let pIOCant = req.body.pIOCant;
    let pIOValSale = req.body.pIOValSale;
    let pIOValCost = req.body.pIOValCost;
    let pODId = req.body.pODId;
    let data = [pIOImageBase64, pIOProvider, pIOCant, pIOValSale, pIOValCost, pODId];
    let connection = mysql.createConnection(configconnection); 
    let sql = `CALL SP_ItemOrder_I(?,?,?,?,?,?)`;  
    try {
      connection.query(sql, data, (err, results, fields) => {
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

  exports.order_g = (req, res, next) => {  
    let connection = mysql.createConnection(configconnection); 
    let sql = `CALL SP_OrderClient_G()`;  
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
  
  exports.order_item_by_orderid_g = (req, res, next) => {  
      
    let idOrder = req.params.id;
    let connection = mysql.createConnection(configconnection); 
    let sql = `CALL SP_ItemOrderByOrderId_G(?)`;  
    try {
      connection.query(sql,idOrder,(err, results, fields) => {
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
  