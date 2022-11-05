module.exports.home = function(req,res){
    return res.render('home.ejs',{
        title:"Home"
    });
}

// module.exports.actionName = function(req,res){
//     return res.end('<h1>Action name</h1>');
// }