window.addEventListener("load", ()=>{
    const $pass = document.querySelector("#password");
    const $confirm = document.querySelector("#confirm");
    const $btn = document.querySelector("#edit-password-btn");
    const $form = document.querySelector("#edit-password-form");

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

    let passwordValidation = () => {
        let error = document.querySelector(`#error-${$pass.id}`);
        requiredValidation(password);
        errors.password ? null : lengthValidation($pass,8,16);
        if(!errors.password){
            if(!validator.isStrongPassword($pass.value)){
                let errormsg = 'La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo';
                error.innerText = errormsg;
                errors.password = errormsg;
                inputError($pass);
            }else{
                error.innerText = '';
                delete errors.password;
                inputOK($pass);
            }
        }
    }

    let confirmValidation = () => {
        let error = document.querySelector(`#error-${$confirm.id}`);
        requiredValidation($confirm);
        errors.confirm ? null : lengthValidation($confirm,8,16);
        if(!errors.confirm){
            if($confirm.value !== $pass.value){
                let errormsg = 'Las contraseñas no coinciden';
                error.innerText = errormsg;
                errors.confirm = errormsg;
                inputError($pass);
            }else{
                error.innerText = '';
                delete errors.confirm;
                inputOK($pass);
            }
        }
    };

    $pass.addEventListener('input', () => passwordValidation());
    $pass.addEventListener('blur', () => passwordValidation());
    $confirm.addEventListener('input', () => confirmValidation());
    $confirm.addEventListener('blur', () => confirmValidation());

    $btn.addEventListener("click", (e)=>{
        e.preventDefault();

        passwordValidation();
        confirmValidation();
        console.log(errors);

        if (Object.keys(errors).length == 0) {
            $form.submit();
        }
    });
    
})