const User = require("../models/user");

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile.ejs',{
            title: 'User Profile',
            profile_user:user
        });
    });
}

//render the sign up page
module.exports.signUp = function(req,res){
if(req.isAuthenticated()){
    return res.redirect('/');
}
    return res.render('user_sign_up.ejs',{
        title: 'Codeial | Sign up'
    });
}

// render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_sign_in.ejs',{
        title: 'Codeial | Sign in'
    });
}

//get the sign up date
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err,user){
        if(err){
            console.log('Error in finding user in signing up');
            return;  
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }



    });
}

//sign in and create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}  

module.exports.destroySession = function(req,res,next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
    });

    return res.redirect('/');
}

module.exports.update = function(req,res){
    console.log('req.user.id',req.user.id);
    if(req.user.id == req.params.id){
        
        User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
            return res.redirect('back');
        })
    }else{
        return res.status(401).send('Unauthorized');
    }
}