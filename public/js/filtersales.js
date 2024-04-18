window.addEventListener("load", ()=>{
    let $month = document.querySelector("#month");
    $month.addEventListener("change", ()=>{
        let monthID = $month.value;
        console.log(monthID);
        let days = 0
        if (monthID == 2){
            days = 28
        } else if (monthID == 4 || monthID == 6 || monthID == 9 || monthID == 11){
            days = 30
        } else if (monthID == 0){
            days = 0
        } else {
            days = 31
        }
        console.log(days);
    })
})