const title = "Mercado liebre";
const products = [
    {
        id:                 1,
        productName:        "Cafetera Moulinex",
        productPrice:       6770,
        productDiscount:    40,
        productImage:       "img-cafetera-moulinex.jpg",
        productDescription: "Cafetera Moulinex"
    },
    {
        id:                 2,
        productName:        "MacBook Pro 2019",
        productPrice:       230000,
        productDiscount:    20,
        productImage:       "img-macbook-pro-2019.jpg",
        productDescription: "MacBook Pro 2019"
    },
    {
        id:                 3,
        productName:        "Samsung Galaxy S10",
        productPrice:       70500,
        productDiscount:    10,
        productImage:       "img-samsung-galaxy-s10.jpg",
        productDescription: "Samsung Galaxy S10"
    },
    {
        id:                 4,
        productName:        "SmartTv Samsung 43",
        productPrice:       23200,
        productDiscount:    5,
        productImage:       "img-tv-samsung-smart.jpg",
        productDescription: "SmartTv Samsung 43"
    },
    
]
const mainController ={
    index: function(req,res){
        res.render('home',{
            title: title,
            products: products,
        })
    },
    redirect: function(req,res){
        res.redirect('/');
    }

}
module.exports = mainController
