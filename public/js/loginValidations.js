window.addEventListener("load", ()=>{
    const $username = document.querySelector("#username");
    const $password = document.querySelector("#password");
    const $btn = document.querySelector("#login-btn");
    const $form = document.querySelector("#login-form");

    let errors = { };

    const inputError = (input)=>{
        input.classList.remove("input-ok");
        input.classList.add("input-error");
    };

    const inputOK = (input)=>{
        input.classList.remove("input-error");
        input.classList.add("input-ok");
    };

    const requiredValidation = (input) => {
        let error = document.querySelector(`#error-${input.id}`);
        let label = input.id;
        if(validator.isEmpty(input.value)){
            let errormsg = "Debe ingresar el " + input.id;
            error.innerText =  errormsg;
            errors[label] = errormsg;
            inputError(input);
        }else{
            error.innerText = '';
            delete errors[label];
            inputOK(input);
        }
    };

    let usernameValidation = async () => {
        requiredValidation($username);
        if(!errors.username){
            let data = await fetch(`https://multihogar.onrender.com/api/users/username/${$username.value}`).then(response => response.json())
            if(data.inUse == false){
                let error = document.querySelector(`#error-${$username.id}`);
                let errormsg = `El usuario ${$username.value} no se encontró`;
                errors.username = errormsg;
                error.innerText = errormsg;
                inputError($username);
            }
        };
    };

    let passwordValidation = async () => {
        requiredValidation($password);
    };

    $username.addEventListener('input', () => usernameValidation());
    $username.addEventListener('blur', () => usernameValidation());
    $password.addEventListener("input", ()=> passwordValidation());
    $password.addEventListener("blur", ()=> passwordValidation());

    $btn.addEventListener("click", async(e)=>{
        e.preventDefault();

        usernameValidation();
        passwordValidation();

        if (Object.keys(errors).length == 0) {
            $form.submit();
        } 
    });
})