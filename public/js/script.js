window.addEventListener("load", function(){
    //header
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
    });
    closemenu.addEventListener("click",function(){
        burgermenu.classList.toggle("hidden");
        closemenu.classList.toggle("hidden");
        nav.classList.toggle("hidden");
        userLogged.classList.toggle("flex-hidden");
        searchbar1.classList.toggle("hidden");
    });
    burgermenu1.addEventListener("click",function(){
        burgermenu1.classList.toggle("hidden");
        closemenu1.classList.toggle("hidden");
        nav.classList.toggle("hidden");
    });
    closemenu1.addEventListener("click",function(){
        burgermenu1.classList.toggle("hidden");
        closemenu1.classList.toggle("hidden");
        nav.classList.toggle("hidden");
    });

// profile 

    let profileButton = this.document.querySelector("#profile-data-button");
    let historyButton = this.document.querySelector("#profile-history-button");
    let profileData = this.document.querySelector("#profile-user-data");
    let purchaseHistory = this.document.querySelector("#purchase-history");

    profileButton.addEventListener("click",function(){
        profileButton.classList.toggle("hidden");
        historyButton.classList.toggle("hidden");
        profileData.classList.toggle("hidden");
        purchaseHistory.classList.toggle("hidden");
    });

    historyButton.addEventListener("click",function(){
        profileButton.classList.toggle("hidden");
        historyButton.classList.toggle("hidden");
        profileData.classList.toggle("hidden");
        purchaseHistory.classList.toggle("hidden");
    });

})