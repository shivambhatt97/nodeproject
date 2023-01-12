const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.post = function(req,res){
  return res.end('<h1>Post Controller</h1>');
}

module.exports.create = async function(req,res){

  try{
  await Post.create({
      content: req.body.content,
      user: req.user._id
     });
     return res.redirect('back');
  }catch(err){
    console.log('Error',err);
    return;
  }
}

module.exports.destroy = async function(req,res){
  try{
    let post = await Post.findById(req.params.id);
    // .id means converting the object id into strings
      // console.log(req.params.id+ 'req.params.id' + post.user+ 'post.user' + req.user.id + 'req.user.id');
      if(post.user == req.user.id){
        post.remove();
        await Comment.deleteMany({post: req.params.id});
        return res.redirect('back');
  
      }else {
        return res.redirect('back');
      }
  }catch(err){
    console.log('Error',err);
    return;
  }
  
}