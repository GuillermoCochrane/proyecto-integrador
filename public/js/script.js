window.addEventListener("load", function(){
    let burgermenu = this.document.querySelector(".burger-menu");
    let closemenu = this.document.querySelector(".close-menu");
    let nav = this.document.querySelector("#main-navbar");

    burgermenu.addEventListener("click",function(){
        burgermenu.classList.toggle("hidden");
        closemenu.classList.toggle("hidden");
        nav.classList.toggle("hidden");
    })
    closemenu.addEventListener("click",function(){
        burgermenu.classList.toggle("hidden");
        closemenu.classList.toggle("hidden");
        nav.classList.toggle("hidden");
    })
})