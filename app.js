const express = require("express");
const mongoose = require("mongoose");
const db_url = 'mongodb://localhost:27017/Lib'
// const db_url = 'mongodb+srv://userone:userone@ictak-db-files.drcez.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority'


const app = new express();

const port = process.env.PORT || 3000;


mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error)=>{
    if(!error)
    {
        console.log('Success - Database Connected.');
    }
    else{
        console.log('Error - Unable to connect Database.')
    }
});



app.set('view engine','ejs');

app.set('views','./src/views');


app.use(express.static('./public'));


app.use(express.json());
app.use(express.urlencoded({ extended:true }));

//login route
const login_nav =[
                  {link:'/signup',name:'Sign In'}
                 ];
const loginRouter = require('./src/routes/loginRoutes')(login_nav);

//signup route
const signup_nav =[
                    {link:'/login',name:'Login'}
                  ];
const signupRouter = require('./src/routes/signupRoutes')(signup_nav);

//admin and loggedinuser route
const admin_nav =[
    {link:'/admin'        ,name:'Home'},
    {link:'/admin/books'  ,name:'Books'},
    {link:'/admin/authors',name:'Authors'}
];
const adminRouter = require('./src/routes/adminRoutes')(admin_nav);

const loggedinuser_nav =[
    {link:'/loggedin'        ,name:'Home'},
    {link:'/loggedin/books'  ,name:'Books'},
    {link:'/loggedin/authors',name:'Authors'}
];
const loggedinuserRouter = require('./src/routes/loggedinuserRoutes')(loggedinuser_nav);


app.use('/login'    ,loginRouter);
app.use('/signup'   ,signupRouter);
app.use('/admin'    ,adminRouter);
app.use('/loggedin' ,loggedinuserRouter);



const nav =[
    {link:'/login'  ,name:'Login | SignUp'}
      
];



app.get('/',function(req,res){
    res.render("index",  
    {
        nav,
        title: 'BOOK STORE',
        
    }); 
});


app.listen(port,(error)=>{
    if(!error)
    {
        console.log("Server Ready at "+ port);
    }
    else{
        console.log('Error Occurred');
    }
    
});