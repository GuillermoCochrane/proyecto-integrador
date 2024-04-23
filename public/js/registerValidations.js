window.addEventListener("load", ()=>{
    const $username = document.querySelector("#username");
    const $email = document.querySelector("#email");
    const $pass = document.querySelector("#password")
    const $btn = document.querySelector("#register-btn")

    let errors = { };

    const requiredValidation = (input) => {
        let error = document.querySelector(`#error-${input.id}`);
        let label = input.id;
        if(validator.isEmpty(input.value)){
            let errormsg = `${input.id} es obligatorio`;
            error.innerText =  errormsg;
            errors[label] = errormsg;
        }else{
            error.innerText = '';
            delete errors[label];
        }
    };

    const lengthValidation = (input,min,max) => {
        let error = document.querySelector( `#error-${input.id}`);
        let label = input.id;
        if(!validator.isLength(input.value, {min,max})){
            let errormsg = `El ${input.id} debe tener entre ${min} y ${max} caracteres`;
            error.innerText = errormsg;
            errors[label] = errormsg;
        }else{
            error.innerText = '';
            delete errors.input;
        }
    };

    const usernameValidation = () => {
        return () => {
            requiredValidation($username);
            lengthValidation($username, 3,10);
        }
    };

    let emailValidation = () => {
        let error = document.querySelector(`#error-${$email.id}`);
        return () => {

            requiredValidation($email);
            lengthValidation($email,8,40);

            if(!validator.isEmail($email.value)){
                let errormsg = "El email no es válido";;
                error.innerText = errormsg;
                errors.email = errormsg;
            }else{
                error.innerText = '';
                delete errors.email;
            }

        }
    }

    let passwordValidation = () => {
        let error = document.querySelector(`#error-${$pass.id}`);
        return () => {
            requiredValidation(password);
            lengthValidation($pass,8,16);
            if(!validator.isStrongPassword($pass.value)){
                let errormsg = 'La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo';
                error.innerText = errormsg;
                errors.password = errormsg;
            }else{
                error.innerText = '';
                delete errors.password;
            }
        }
    }

    $username.addEventListener('input', usernameValidation());
    $username.addEventListener('blur', usernameValidation());
    $email.addEventListener("input", emailValidation());
    $email.addEventListener("blur",emailValidation());
    $pass.addEventListener('input', passwordValidation());
    $pass.addEventListener('blur', passwordValidation());

    $btn.addEventListener("click", (e)=>{
        e.preventDefault();
        console.log(errors);
    })

})