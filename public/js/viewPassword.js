window.addEventListener("load", ()=>{
    const icon = document.querySelector("#icon");
    const pass = document.querySelector("#password");

    icon.addEventListener("click", (e)=>{
        console.log("hizo click");
        if (pass.type == "password"){
            pass.type = "text"
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        } else {
            pass.type = "password"
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    })
})