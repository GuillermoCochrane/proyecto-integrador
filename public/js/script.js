window.addEventListener("load", function(){
    let burgermenu = this.document.querySelector(".burger-menu");
    let burgermenu1 = this.document.querySelector(".burger-menu1");
    let closemenu = this.document.querySelector(".close-menu");
    let closemenu1 = this.document.querySelector(".close-menu1");
    let nav = this.document.querySelector("#main-navbar");
    let userLogged = this.document.querySelector(".userLogged-detail-box");
    let searchbar1 = this.document.querySelector(".search-bar1");

    burgermenu.addEventListener("click",function(){
        burgermenu.classList.toggle("hidden");
        closemenu.classList.toggle("hidden");
        nav.classList.toggle("hidden");
        userLogged.classList.toggle("flex-hidden");
        searchbar1.classList.toggle("hidden");
    })
    closemenu.addEventListener("click",function(){
        burgermenu.classList.toggle("hidden");
        closemenu.classList.toggle("hidden");
        nav.classList.toggle("hidden");
        userLogged.classList.toggle("flex-hidden");
        searchbar1.classList.toggle("hidden");
    })
    burgermenu1.addEventListener("click",function(){
        burgermenu1.classList.toggle("hidden");
        closemenu1.classList.toggle("hidden");
        nav.classList.toggle("hidden");
    })
    closemenu1.addEventListener("click",function(){
        burgermenu1.classList.toggle("hidden");
        closemenu1.classList.toggle("hidden");
        nav.classList.toggle("hidden");
    })

})