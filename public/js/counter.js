window.addEventListener("load", ()=>{
    let $increase = document.querySelector("#increase");
    let $decrease = document.querySelector("#decrease");
    let $counter = document.querySelector("#counter");
    let $display = document.querySelector("#display")
    let counterValue = $counter? parseInt($counter.value) : 1;
    $display ? $display.innerHTML = counterValue : null ;

    $increase ?
    $increase.addEventListener("click", (e)=>{
        e.preventDefault()
        counterValue += 1;
        $counter.value = counterValue;
        $display.innerHTML = counterValue;
    }) : null;

    $decrease ? 
    $decrease.addEventListener("click", (e)=>{
        e.preventDefault();
        counterValue > 1 ? counterValue -= 1 : null;
        $counter.value = counterValue;
        $display.innerHTML = counterValue;
    }) : null;
})