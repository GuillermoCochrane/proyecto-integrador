window.addEventListener("load", () =>{
    let products = document.getElementById("dashboard-details");
    let table = document.getElementById("dashboard-table");
    let button1 = document.getElementById("button1");
    let button2 = document.getElementById("button2");

    button1.addEventListener("click", () => toggleElement(1));
    button2.addEventListener("click", () => toggleElement(2));

    function toggleElement(buttonNumber) {
        if (buttonNumber === 1) {
            products.style.display = "block";
            table.style.display = "none"
        } else if (buttonNumber === 2) {
            products.style.display = "none";
            table.style.display = "block"
        }
    }
})
