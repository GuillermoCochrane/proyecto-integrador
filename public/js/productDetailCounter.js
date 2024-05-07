window.addEventListener("load", ()=>{
    let $increase = document.querySelector("#increase");
    let $decrease = document.querySelector("#decrease");
    let $counter = document.querySelector("#counter");
    let $display = document.querySelector("#display")
    let counterValue = $counter? parseInt($counter.value) : 1;
    $display.innerHTML = counterValue

    $increase.addEventListener("click", (e)=>{
        e.preventDefault()
        counterValue += 1;
        $counter.value = counterValue;
        $display.innerHTML = counterValue;
    });

    $decrease.addEventListener("click", (e)=>{
        e.preventDefault();
        counterValue > 1 ? counterValue -= 1 : null;
        $counter.value = counterValue;
        $display.innerHTML = counterValue;
    });
})