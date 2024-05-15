window.addEventListener("load", ()=>{
    const $email = document.querySelector("#email");
    const $token = document.querySelector("#token");
    const $btn = document.querySelector("#recovery-btn");
    const $form = document.querySelector("#recovery-form");
    
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
            let errormsg = `${input.id} es obligatorio`;
            error.innerText =  errormsg;
            errors[label] = errormsg;
            inputError(input);
        }else{
            error.innerText = '';
            delete errors[label];
            inputOK(input);
        }
    };

    const lengthValidation = (input,min,max) => {
        let error = document.querySelector( `#error-${input.id}`);
        let label = input.id;
        if(!validator.isLength(input.value, {min,max})){
            let errormsg = ""
            min == max ? 
            errormsg = `El ${input.id} debe tener ${min} caracteres` : 
            errormsg = `El ${input.id} debe tener entre ${min} y ${max} caracteres`;
            error.innerText = errormsg;
            errors[label] = errormsg;
            inputError(input);
        }else{
            error.innerText = '';
            inputOK(input);
            delete errors.input;
        }
    };

    let emailValidation = async () => {
        let error = document.querySelector(`#error-${$email.id}`);
            requiredValidation($email);
            errors.email ? null : lengthValidation($email,8,40);
            if (!errors.email){
                if(!validator.isEmail($email.value)){
                    let errormsg = "El email no es válido";;
                    error.innerText = errormsg;
                    errors.email = errormsg;
                    inputError($email);
                }else{
                    error.innerText = '';
                    delete errors.email;
                    inputOK($email);
                }
            };
            if(!errors.email){
                let data = await fetch(`https://multihogar.onrender.com/api/users/email/${$email.value}`).then(response => response.json()); // http://localhost:3003
                //http://localhost:3003 dev https://multihogar.onrender.com production
                if(data.inUse == false){
                    let error = document.querySelector(`#error-${$email.id}`);
                    let errormsg = `No se encontró el email: ${$email.value} `;
                    errors.username = errormsg;
                    error.innerText = errormsg;
                    inputError($email);
                }
            }
    };

    let tokenValidation = () => {
        requiredValidation($token);
        errors.token ? null : lengthValidation($token,10,10);
    };

    $email.addEventListener("input", () => emailValidation());
    $email.addEventListener("blur", () => emailValidation());
    $token ? $token.addEventListener("input", () => tokenValidation()) : null;
    $token ? $token.addEventListener("input", () => tokenValidation()) : null;

    $btn.addEventListener("click", (e)=>{
        e.preventDefault();

        emailValidation();
        $token ? tokenValidation() : null;

        if (Object.keys(errors).length == 0) {
            $form.submit();
        }
    });
    
})