window.addEventListener("load", ()=>{
    const $email = document.querySelector("#email");
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
            let errormsg = `El ${input.id} debe tener entre ${min} y ${max} caracteres`;
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
                let data = await fetch(`https://multihogar.onrender.com/api/users/email/${$email.value}`).then(response => response.json());
                if(data.inUse == false){
                    let error = document.querySelector(`#error-${$email.id}`);
                    let errormsg = `No se encontró el email: ${$email.value} `;
                    errors.username = errormsg;
                    error.innerText = errormsg;
                    inputError($email);
                }
            }
    };

    $email.addEventListener("input", () => emailValidation());
    $email.addEventListener("blur", () => emailValidation());

    console.log(errors);

    $btn.addEventListener("click", (e)=>{
        e.preventDefault();

        emailValidation();

        if (Object.keys(errors).length == 0) {
            console.log("entro");
            $form.submit();
        }
    });
    
})

//git update-index --assume-unchanged public/js/registerValidations.js