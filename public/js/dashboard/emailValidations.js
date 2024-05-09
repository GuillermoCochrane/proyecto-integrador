window.addEventListener("load", ()=>{
    const $email = document.querySelector("#email");
    const $pass = document.querySelector("#pass");
    const $btn = document.querySelector("#editEmailBtn");
    const $form = document.querySelector("#editEmailForm");
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
            let errormsg = " ";
            min != max ?
                errormsg = `El ${input.id} debe tener entre ${min} y ${max} caracteres` :
                errormsg = `El ${input.id} debe tener ${max} caracteres`;
            error.innerText = errormsg;
            errors[label] = errormsg;
            inputError(input);
        }else{
            error.innerText = '';
            inputOK(input);
            delete errors.input;
        }
    };

    let emailValidation = () => {
        let error = document.querySelector(`#error-${$email.id}`);
        requiredValidation($email);
        errors.email ? null : lengthValidation($email,8,40);
        if (!errors.email){
            if(!validator.isEmail($email.value)){
                let errormsg = "El email no es válido";
                error.innerText = errormsg;
                errors.email = errormsg;
                inputError($email);
            }else{
                error.innerText = '';
                delete errors.email;
                inputOK($email);
            }
        }
    };

    let passValidation = () => {
        requiredValidation($pass);
        errors.pass ? null : lengthValidation($pass,19,19);
    };

    $email.addEventListener("input",() => emailValidation());
    $email.addEventListener("blur", () => emailValidation());
    $pass.addEventListener("input",() => passValidation());
    $pass.addEventListener("blur", () => passValidation());

    $btn.addEventListener("click", (e)=>{
        e.preventDefault();
        emailValidation();
        passValidation();

        if (Object.keys(errors).length == 0) {
            $form.submit();
        }
    });
    
})