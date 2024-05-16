window.addEventListener("load", function(){
    let nav = this.document.querySelector("#main-navbar");
    let userLogged = this.document.querySelector(".userLogged-detail-box");
    let searchbar = this.document.querySelector("#search-bar");
    let $searchInput = this.document.querySelector("#search-input");
    let $list = this.document.querySelector("#result-list");
    let $icon = this.document.querySelector("#icon");
    let burgermenu = this.document.querySelector(".burger-menu");

    // hidden navbar
    burgermenu.addEventListener("click",function(){
        if ($icon.classList.contains("fa-bars")) {
            $icon.classList.remove("fa-bars");
            $icon.classList.add("fa-xmark");
        } else if ($icon.classList.contains("fa-xmark")) {
            $icon.classList.remove("fa-xmark");
            $icon.classList.add("fa-bars");
        }
        nav.classList.toggle("hidden");
        if (window.innerWidth < 768) {
            searchbar.classList.toggle("flex-hidden");
            userLogged ? userLogged.classList.toggle("flex-hidden") : null;
            
        }
    });

    //predictive searchbar
    $searchInput.addEventListener("input", () => {
        $list.innerHTML = null;
        if ($searchInput.value.lenght != 0) {
            $list.classList.remove("hidden");
            fetch(`https://multihogar.onrender.com/api/search?search=${$searchInput.value}`)
            //http://localhost:3003 dev https://multihogar.onrender.com production
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

//Ignore changes on this file for new commits
//git update-index --assume-unchanged public/js/script.js
//not ignore changes on this file for new
//git update-index --no-assume-unchanged public/js/script.js
//list o ignored files for new commits
//git ls-files -v | grep "^[[:lower:]]"