window.addEventListener("load", function(){
    let burgermenu = this.document.querySelector(".burger-menu");
    let closemenu = this.document.querySelector(".close-menu");
    let nav = this.document.querySelector("#main-navbar");
    let userLogged = this.document.querySelector(".userLogged-detail-box");
    let searchbar = this.document.querySelector("#search-bar");
    let $searchInput = this.document.querySelector("#search-input");
    let $list = this.document.querySelector("#result-list");

    // hidden navbar
    burgermenu.addEventListener("click",function(){
        burgermenu.classList.toggle("hidden");
        closemenu.classList.toggle("hidden");
        nav.classList.toggle("hidden");
        if (window.innerWidth < 768) {
            searchbar.classList.toggle("flex-hidden");
            userLogged ? userLogged.classList.toggle("flex-hidden") : null;
            
        }
        
    });
    closemenu.addEventListener("click",function(){
        burgermenu.classList.toggle("hidden");
        closemenu.classList.toggle("hidden");
        nav.classList.toggle("hidden");
        if (window.innerWidth < 768) {
            searchbar.classList.toggle("flex-hidden");
            userLogged ? userLogged.classList.toggle("flex-hidden") : null ;
        }
    });

    //predictive searchbar
    $searchInput.addEventListener("input", () => {
        $list.innerHTML = null;
        if ($searchInput.value.lenght != 0) {
            $list.classList.remove("hidden");
            fetch(`https://multihogar.onrender.com/api/search?search=${$searchInput.value}`)
            //http://localhost:3003 local
            .then(res => res.json())
            .then(info =>{
                if(info.data.lenght != 0){
                    for (const product of info.data) {
                        $list.innerHTML += `<li><a href="/products/${product.id}"> ${product.name} </a></li>`
                    }
                } else {
                    $list.innerHTML += "<li>No se encontraron productos...</li>"
                }
            })
        } else {
            $list.innerHTML = null;
        }
    });

    searchbar.addEventListener("mouseleave", () => {
        $list.classList.add("hidden");
    });

    searchbar.addEventListener("touchstart", (e) => {
        if(!searchbar.contains(e.target)){
            $list.classList.add("hidden");
        }
    })
})