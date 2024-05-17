window.addEventListener("load", ()=>{
    const $avatar = document.querySelector("#avatar");
    const $btn = document.querySelector("#avatar-change-btn");
    const $form = document.querySelector("#avatar-form");

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
            let errormsg = "Debe seleccionar una imagen";
            error.innerText =  errormsg;
            errors[label] = errormsg;
            inputError(input);
        }else{
            error.innerText = '';
            delete errors[label];
            inputOK(input);
        }
    };

    let avatarValidation = () => {
        let error = document.querySelector(`#error-${$avatar.id}`);
        requiredValidation($avatar);
        let fileExtention = $avatar.value.split('.').pop();
        if(!errors.avatar){
            if(fileExtention != "jpg" && fileExtention != "png"  && fileExtention != "gif"  && fileExtention != "bmp" ){
                let errormsg = 'El formato del archivo es incompatible';
                error.innerText = errormsg;
                errors.confirm = errormsg;
                inputError($avatar);
            }else{
                error.innerText = '';
                delete errors.confirm;
                inputOK($avatar);
            }
        }
    };

    $avatar.addEventListener('input', () => avatarValidation());
    $avatar.addEventListener('blur', () => avatarValidation());

    $btn.addEventListener("click", (e)=>{
        e.preventDefault();

        avatarValidation();

        console.log($form);
        if (Object.keys(errors).length == 0) {
            $form.submit();
        }
    });
})