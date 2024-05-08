window.addEventListener("load", ()=>{
    const $createProductForm = document.querySelector("#createProductForm");
    const $createProductBtn = document.querySelector("#createProductBtn");  
    const $name = document.querySelector("#name");
    const $img = document.querySelector("#img");
    const $category = document.querySelector("#category");
    const $status = document.querySelector("#status");
    const $price = document.querySelector("#price");
    const $discount = document.querySelector("#discount");
    const $description = document.querySelector("#description");

    console.log($name);
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

    let isNumericValidation = (input) => {
        let error = document.querySelector(`#error-${input.id}`);
        let label = input.id;
        if(!validator.isNumeric(input.value)){
            let errormsg = `La entrada de ${input.id} debe ser un número`;
            error.innerText = errormsg;
            errors[label] = errormsg;
            inputError(input);
        }else{
            error.innerText = '';
            inputOK(input);
            delete errors.input;
        }
    };

    let nameValidation = () => {
        requiredValidation($name);
        errors.name ? null : lengthValidation($name,3,50);
    };

    let categoryValidation = () => {
        requiredValidation($category);
    };

    let statusValidation = () => {
        requiredValidation($status);
    };

    let priceValidation = () => {
        requiredValidation($price);
        errors.price ? null : isNumericValidation($price);
    };

    let discountValidation = () => {
        requiredValidation($discount);
        errors.discount ? null : isNumericValidation($discount);
    };

    let descriptionValidation = () => {
        requiredValidation($description);
        errors.description ? null : lengthValidation($description,3,250);
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

    $name.addEventListener('input', () => nameValidation());
    $name.addEventListener('blur', () => nameValidation());
    $category.addEventListener('input', () => categoryValidation());
    $category.addEventListener('blur', () => categoryValidation());
    $status.addEventListener('input', () => statusValidation());
    $status.addEventListener('blur', () => statusValidation());
    $price.addEventListener('input', () => priceValidation());
    $price.addEventListener('blur', () => priceValidation());
    $discount.addEventListener('input', () => discountValidation());
    $discount.addEventListener('blur', () => discountValidation());
    $description.addEventListener('input', () => descriptionValidation());
    $description.addEventListener('blur', () => descriptionValidation());
    $img.addEventListener('input', () => imgValidation());
    $img.addEventListener('blur', () => imgValidation());

    $createProductBtn.addEventListener("click", async(e)=>{
        e.preventDefault();

        nameValidation();
        categoryValidation();
        statusValidation();
        priceValidation();
        discountValidation();
        descriptionValidation();
        imgValidation();

        if (Object.keys(errors).length == 0) {
            $createProductForm.submit();
        } 
    });
})
//git update-index --assume-unchanged public/js/loginValidations.js