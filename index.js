const express = require("express");
const req = require("express/lib/request");
const path = require("path");
const exphbs = require('express-handlebars')
const Logger = require('./middleware/logger')
const mongoose = require('mongoose')
const members = require('./Members')




const app = express();


//express bhandle bar middlebar

app.engine('handlebars', exphbs.engine({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


//body parser for the post method

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//render the index page from view

app.get('/',(req,res)=>{
  res.render('index',{
    title:"Members List",
    members
  })
})


//to get the complete url

// app.use(Logger);



//cREATING MIDDLEWARE TO SEND REQUST
//the first parameter is our route name and the second function is middlewware

// app.get('/',(req,res,next) => {
//     // res.send("<h1>Hellow world</h1>")
//     res.sendFile(path.join(__dirname,'public','index.html'))

// })

//set static folder to call the files

//calling from routes API FOLDER

app.use('/api/members',require('./routers/api/members'))

app.use(express.static(path.join(__dirname, "public")));

mongoose
.connect('mongodb+srv://usman385:11235116@cluster0.dkeb7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(()=>{
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => console.log("Server running on port", PORT, "...."));
})
.catch((err)=>{
  console.log(err)

})

