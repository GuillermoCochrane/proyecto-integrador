window.addEventListener("load", function(){
    //header
    let burgermenu = this.document.querySelector(".burger-menu");
    let closemenu = this.document.querySelector(".close-menu");
    let nav = this.document.querySelector("#main-navbar");
    let userLogged = this.document.querySelector(".userLogged-detail-box");
    let searchbar = this.document.querySelector("#search-bar");

    burgermenu.addEventListener("click",function(){
        burgermenu.classList.toggle("hidden");
        closemenu.classList.toggle("hidden");
        nav.classList.toggle("hidden");
        if (window.innerWidth < 768) {
            userLogged.classList.toggle("flex-hidden");
            searchbar.classList.toggle("flex-hidden");
        }
        
    });
    closemenu.addEventListener("click",function(){
        burgermenu.classList.toggle("hidden");
        closemenu.classList.toggle("hidden");
        nav.classList.toggle("hidden");
        if (window.innerWidth < 768) {
            userLogged.classList.toggle("flex-hidden");
            searchbar.classList.toggle("flex-hidden");
        }
    });
})