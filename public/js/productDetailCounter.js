window.addEventListener("load", ()=>{
    let $increase = document.querySelector("#increase");
    let $decrease = document.querySelector("#decrease");
    let $counter = document.querySelector("#counter");
    let counterValue = parseInt($counter.value);

    $increase.addEventListener("click", (e)=>{
        e.preventDefault()
        counterValue += 1;
        $counter.value = counterValue
    });

    $decrease.addEventListener("click", (e)=>{
        e.preventDefault();
        counterValue > 1 ? counterValue -= 1 : null;
        $counter.value = counterValue
    });
})