const title = "Mercado liebre";
const mainController ={
    index: function(req,res){
        res.render('home',{
            title: title,
        })
    },
    redirect: function(req,res){
        res.redirect('/');
    }

}
module.exports = mainController
