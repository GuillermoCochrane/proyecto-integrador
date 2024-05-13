window.addEventListener("load", ()=>{
    const $username = document.querySelector("#username");
    const $email = document.querySelector("#email");
    const $pass = document.querySelector("#password");
    const $confirm = document.querySelector("#confirm");
    const $btn = document.querySelector("#register-btn");
    const $form = document.querySelector("#register-form");

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

    const usernameValidation = () => {
        return () => {
            requiredValidation($username);
            errors.username ? null : lengthValidation($username, 3,10);
        }
    };

    let emailValidation = () => {
        let error = document.querySelector(`#error-${$email.id}`);
        return () => {

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
            }
        }
    }

    let passwordValidation = () => {
        let error = document.querySelector(`#error-${$pass.id}`);
        return () => {
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
    }

    let confirmValidation = () => {
        let error = document.querySelector(`#error-${$confirm.id}`);
        return () => {
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
        }
    };

    $username.addEventListener('input', usernameValidation());
    $username.addEventListener('blur', usernameValidation());
    $email.addEventListener("input", emailValidation());
    $email.addEventListener("blur",emailValidation());
    $pass.addEventListener('input', passwordValidation());
    $pass.addEventListener('blur', passwordValidation());
    $confirm.addEventListener('input', confirmValidation());
    $confirm.addEventListener('blur', confirmValidation());

    $btn.addEventListener("click", (e)=>{
        e.preventDefault();
        
        confirmValidation()();
        usernameValidation()();
        emailValidation()();
        passwordValidation()();

        if(!errors.username){
            fetch(`https://multihogar.onrender.com/api/users/username/${$username.value}`)
            .then(response => response.json())
            .then(data => {
                if(data.inUse == true){
                    let error = document.querySelector(`#error-${$username.id}`);
                    let errormsg = `El usuario ${$username.value} ya se encuentra registrado`;
                    errors.username = errormsg;
                    error.innerText = errormsg;
                    inputError($username);
                }
            })
        };

        if(!errors.email){
            fetch(`https://multihogar.onrender.com/api/users/email/${$email.value}`)
            .then(response => response.json())
            .then(data => {
                if(data.inUse == true){
                    let error = document.querySelector(`#error-${$email.id}`);
                    let errormsg = `El usuario ${$email.value} ya se encuentra registrado`;
                    errors.username = errormsg;
                    error.innerText = errormsg;
                    inputError($email);
                }
            })
        }

        if (Object.keys(errors).length == 0) {
            $form.submit();
        }
    });
    
})