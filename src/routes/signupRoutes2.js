const express = require("express");

//access Userdata
const Userdata = require('../models/Userdata');

//create seperate route handler for SignUp
const signupRouter = express.Router();

function router(nav){

    signupRouter.get('/',function(req,res){
        res.render('signup',
        {
            nav,
            title:'SIGNUP'
        });
    });

    signupRouter.post('/',  (req,res)=>{
        const { fname, lname, email, username, password, confirmpassword } = req.body;
        // let email =req.body.email;
        console.log(req.body);

      

        if(req.body.email){
            return new Promise((resolve,reject)=>{
                Userdata.findOne({user_email : req.body.email})
                    .exec((err,doc)=>{
                        if(err) return reject(err);
                        if(doc) //return reject(new Error('Email Exists !!'));
                        {
                            err ="Email Already Exists";
                            res.render('signup',
                            {
                                nav,
                                title:'SIGNUP',
                                'err' : err, 'fname' : fname, 'lname' : lname, 'email' : email, 'username' : username
                            });                            
                        }
                       
                    })
            })
        }    
            
            

       

    })

    return signupRouter;
}

module.exports = router;