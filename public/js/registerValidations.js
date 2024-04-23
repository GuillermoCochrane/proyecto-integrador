window.addEventListener("load", ()=>{
    const $username = document.querySelector("#username");
    const $email = document.querySelector("#email");
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
                error.innerText = 'El email no es válido' ;
                errors.email = 'El email no es válido';
            }else{
                error.innerText = '';
                delete errors.email;
            }

        }
    }

    $username.addEventListener('input', usernameValidation());
    $username.addEventListener('blur', usernameValidation());
    $email.addEventListener("input", emailValidation());
    $email.addEventListener("blur",emailValidation());

    $btn.addEventListener("click", (e)=>{
        e.preventDefault();
        console.log(errors);
    })

})