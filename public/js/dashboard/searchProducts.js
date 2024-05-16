window.addEventListener("load", function(){
    let searchbar = this.document.querySelector("#search-bar");
    let $searchInput = this.document.querySelector("#search-input");
    let $list = this.document.querySelector("#result-list");

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
                        $list.innerHTML += `<li><a href="/dashboard/products/${product.id}"> ${product.name} </a></li>`
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
//git update-index --assume-unchanged public/js/dashboard/searchProducts.js
//not ignore changes on this file for new
//git update-index --no-assume-unchanged public/js/dashboard/searchProducts.js
//list o ignored files for new commits
//git ls-files -v | grep "^[[:lower:]]"