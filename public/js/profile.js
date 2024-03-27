function toggleElement(buttonNumber) {
    const info = document.getElementById("user-info");
    const password = document.getElementById("password-change-form");
    const avatar = document.getElementById("avatar-change-form");
    const edit = document.getElementById("profile-edit-form");

    if (buttonNumber === 1) {
        info.style.display = "flex";
        password.style.display = "none";
        avatar.style.display = "none";
        edit.style.display = "none";
    } else if (buttonNumber === 2) {
        info.style.display = "none";
        password.style.display = "flex";
        avatar.style.display = "none";
        edit.style.display = "none";
    } else if (buttonNumber === 3) {
        info.style.display = "none";
        password.style.display = "none";
        avatar.style.display = "flex";
        edit.style.display = "none";
    } else if (buttonNumber === 4) {
        info.style.display = "none";
        password.style.display = "none";
        avatar.style.display = "none";
        edit.style.display = "flex";
    }
}

// profile 

let profileButton = this.document.querySelector("#profile-data-button");
let historyButton = this.document.querySelector("#profile-history-button");
let profileData = this.document.querySelector("#profile-user-data");
let purchaseHistory = this.document.querySelector("#purchase-history");

profileButton.addEventListener("click",function(){
    profileButton.classList.toggle("hidden");
    historyButton.classList.toggle("hidden");
    profileData.classList.toggle("hidden");
    purchaseHistory.classList.toggle("hidden");
});

historyButton.addEventListener("click",function(){
    profileButton.classList.toggle("hidden");
    historyButton.classList.toggle("hidden");
    profileData.classList.toggle("hidden");
    purchaseHistory.classList.toggle("hidden");
});