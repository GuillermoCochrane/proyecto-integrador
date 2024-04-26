window.addEventListener("load", ()=>{
    const $username = document.querySelector("#username");
    const $name = document.querySelector("#name");
    const $phone = document.querySelector("#phone");
    const $address = document.querySelector("#address");
    const $email = document.querySelector("#email");
    const $btn = document.querySelector("#register-btn");
    const $form = document.querySelector("#edit-profile-form");

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
                errormsg = `El ${input.id} debe tener ${max} caracteres`
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
        requiredValidation($username);
        errors.username ? null : lengthValidation($username, 3,10);
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

    let namevalidation = () => {
        requiredValidation($name);
        errors.name ? null : lengthValidation($name, 3,30)
    };

    let phoenValidation = () => {
        let error = document.querySelector(`#error-${$phone.id}`);
        requiredValidation($phone);
        errors.phone ? null : lengthValidation($phone,10,10);
        if (!errors.phone){
            if(!validator.isNumeric($phone.value)){
                let errormsg = "El dato ingresado debe ser un número";
                error.innerText = errormsg;
                errors.email = errormsg;
                inputError($phone);
            }else{
                error.innerText = '';
                delete errors.phone;
                inputOK($phone);
            }
        }
    }

    $username.addEventListener('input',() => { usernameValidation()});
    $username.addEventListener('blur',() => { usernameValidation()});
    $email.addEventListener("input",() => { emailValidation()});
    $email.addEventListener("blur",() => { emailValidation()});
    $name.addEventListener("input",() => { namevalidation()});
    $name.addEventListener("blur",() => { namevalidation()});
    $phone.addEventListener("input",() => { phoenValidation()});
    $phone.addEventListener("blur",() => { phoenValidation()});

    $btn.addEventListener("click", (e)=>{
        e.preventDefault();
        
        usernameValidation();
        emailValidation();
        namevalidation();

        if(!errors.username){
            fetch(`http://localhost:3003/api/users/username/${$username.value}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
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
            fetch(`http://localhost:3003/api/users/email/${$email.value}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
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