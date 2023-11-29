window.addEventListener("load", function(){
    let burgermenu = this.document.querySelector(".burger-menu");
    let closemenu = this.document.querySelector(".close-menu");
    let nav = this.document.querySelector("#main-navbar");
    let userLogged = this.document.querySelector(".userLogged-detail");
    let searchbar = this.document.querySelector(".search-bar1");

    burgermenu.addEventListener("click",function(){
        burgermenu.classList.toggle("hidden");
        closemenu.classList.toggle("hidden");
        nav.classList.toggle("hidden");
        userLogged.classList.toggle("hidden");
        searchbar.classList.toggle("hidden");
    })
    closemenu.addEventListener("click",function(){
        burgermenu.classList.toggle("hidden");
        closemenu.classList.toggle("hidden");
        nav.classList.toggle("hidden");
        userLogged.classList.toggle("hidden");
        searchbar.classList.toggle("hidden");
    })

})