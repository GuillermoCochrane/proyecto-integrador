window.addEventListener("load", ()=>{
    const $editImageForm = document.querySelector("#editImageForm");
    const $imageProductBtn = document.querySelector("#imageProductBtn");
    const $img = document.querySelector("#img");

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
            let errormsg = "Debe ingresar el " + input.id;
            error.innerText =  errormsg;
            errors[label] = errormsg;
            inputError(input);
        }else{
            error.innerText = '';
            delete errors[label];
            inputOK(input);
        }
    };


    let imgValidation = () => {
        let error = document.querySelector(`#error-${$img.id}`);
        requiredValidation($img);
        let fileExtention = $img.value.split('.').pop();
        if(!errors.img){
            if(fileExtention != "jpg" && fileExtention != "png"  && fileExtention != "gif"  && fileExtention != "bmp" ){
                let errormsg = 'El formato del archivo es incompatible';
                error.innerText = errormsg;
                errors.confirm = errormsg;
                inputError($img);
            }else{
                error.innerText = '';
                delete errors.confirm;
                inputOK($img);
            }
        }
    };

    $img.addEventListener('input', () => imgValidation());
    $img.addEventListener('blur', () => imgValidation());

    $imageProductBtn.addEventListener("click", async(e)=>{
        e.preventDefault();

        imgValidation();

        if (Object.keys(errors).length == 0) {
            $editImageForm.submit();
        } 
    });
})
//git update-index --assume-unchanged public/js/loginValidations.js