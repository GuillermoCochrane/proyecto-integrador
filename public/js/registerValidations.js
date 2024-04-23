window.addEventListener("load", ()=>{
    const $username = document.querySelector("#username");
    const $email = document.querySelector("#email");

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
        if(!validator.isLength(input.value, {min,max})){
            let errormsg = `El ${input.id} debe tener entre ${min} y ${max} caracteres`;
            error.innerText = errormsg;
            errors.input = errormsg;
        }else{
            error.innerText = '';
            delete errors.input;
        }
    };

    const usernameValidation = () => {
        return () => {
            requiredValidation($username);
            lengthValidation($username, 3,5);
        }
    };

    $username.addEventListener('input', usernameValidation());
    $username.addEventListener('blur', usernameValidation());

    console.log(errors);
})