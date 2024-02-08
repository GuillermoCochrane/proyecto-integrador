function toggleElement(buttonNumber) {
    var products = document.getElementById("dashboard-details");
    var table = document.getElementById("dashboard-table");
    if (buttonNumber === 1) {
        products.style.display = "block";
        table.style.display = "none"
    } else if (buttonNumber === 2) {
        products.style.display = "none";
        table.style.display = "block"
    }
    }