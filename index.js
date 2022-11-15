const express= require('express');
const bodyParser=require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');

const db=require('./config/mongoose');
const user=require('./models/user');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true}));
//extract style and script from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//use express router
app.use('/',require('./routes'));

//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        // console.log('Error: ',err);
        // interpolation
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);

});