window.addEventListener("load", ()=>{
    let $month = document.querySelector("#month");
    let $day = document.querySelector("#dayNumber")
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
        $day.innerHTML = null;
        for (let i = 0; i <= days; i++) {
            let message = i;
            message == 0 ? message = "Todos los días" : null;
            $day.innerHTML += `<option value="${i}"> ${message} </option>`
        }
    })
})
