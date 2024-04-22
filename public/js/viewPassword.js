window.addEventListener("load", ()=>{
    const iconpass = document.querySelector("#iconP");
    const pass = document.querySelector("#password");

    let togglePassword = (input, icon) => {
        if (input.type == "password"){
            input.type = "text"
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        } else {
            input.type = "password"
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    }

    iconpass.addEventListener("click", () => {
        togglePassword(pass, iconpass);
    });

})