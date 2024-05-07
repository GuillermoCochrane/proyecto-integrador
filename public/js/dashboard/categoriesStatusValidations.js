window.addEventListener("load", ()=>{
    const $newStatus = document.querySelector("#newStatus");
    const $newStatusBtn = document.querySelector("#newStatusBtn");
    const $newStatusForm = document.querySelector("#newStatusForm");
    console.log($newStatus);

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

    const newStatusValidation = () => {
            requiredValidation($newStatus);
            errors.newStatus ? null : lengthValidation($newStatus, 3,30);
    };

    $newStatus.addEventListener('input',() => {newStatusValidation()} );
    $newStatus.addEventListener('blur',() => {newStatusValidation()});

    $newStatusBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        
        newStatusValidation();

        if (Object.keys(errors).length == 0) {
            $newStatusForm.submit();
        }
    });
    
})

//git update-index --assume-unchanged public/js/registerValidations.js