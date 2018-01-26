var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


var userModel = require('../models/user');
var authService = require('../services/authService');


router.post('/login', jsonParser, function(req, res) {
    // console.log(req.body.email, req.body.password);
  authService.login(req.body.email, req.body.password, function(json) {
      if (json.status !== 200) {
          res.status(json.status).send({message: json.message});
      } else {
          res.send({token: json.token, user: json.user});
      }
  });
});

router.post('/reg', jsonParser, function(req, res) {
authService.reg(req.body.email, req.body.password, req.body.fullname,
    function(json) {
        if (json.status === 409) {
            res.status(409).send({message: json.message});
        } else {
            res.status(200).send({token: json.token});
        }
    });
});

router.get('/isLoggedIn', function(req, res) { 
  authService.isAuthenticated(req, res, (req, res) => {
    if(req.user){
        // console.log('check');
      res.status(200).send(req.user);
    }   
  });
});

router.get("/cartList",function(req,res){
      let fullname = req.query.fullname;
      console.log(fullname+' new');
      var User = require('../models/user');

      User.findOne({fullname:fullname},function(err,userDoc) {
          if(err){
              console.log("f");
              res.json({
                  status:"1",
                  msg:err.message
              })
          }else{
              console.log(("userDoc"+userDoc));
              if(userDoc) {
                  res.json({
                      status:0,
                      msg: "",
                      result: {
                          count: userDoc.length,
                          list: userDoc.cartList,
                      }
                  })
              }
          }
      })
  ;
});


router.get("/sellList",function(req,res){
    let fullname = req.query.fullname;
    console.log(fullname+' new');
    var Item = require('../models/item');

    Item.find({soldBy:fullname},function(err,userDoc) {
        if(err){
            console.log("f");
            res.json({
                status:"1",
                msg:err.message
            })
        }else{
            console.log(("userDoc"+userDoc));
            if(userDoc) {
                res.json({
                    status:0,
                    msg: "",
                    result: {
                        count: userDoc.length,
                        list: userDoc,
                    }
                })
            }
        }
    })
    ;
})
module.exports = router;
