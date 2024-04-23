window.addEventListener("load", ()=>{
    //profile Sections 
    const $infoSection = document.getElementById("user-info");
    const $passwordSection = document.getElementById("password-change-form");
    const $avatarSection = document.getElementById("avatar-change-form");
    const $editSection = document.getElementById("profile-edit-form");
    const $infoBtn = document.querySelector("#info-btn");
    const editBtn = document.querySelector("#edit-btn");
    const passBtn = document.querySelector("#pass-btn");
    const avatarBtn = document.querySelector("#avatar-btn")

    $infoBtn.addEventListener("click", ()=>{
        toggleElement(1);
    });
    editBtn.addEventListener("click",()=>{
        toggleElement(4);
    });
    passBtn.addEventListener("click",()=>{
        toggleElement(2);
    });
    avatarBtn.addEventListener("click",()=>{
        toggleElement(3);
    });

    //Profile and purchase history 
    const $profileButton = document.querySelector("#profile-data-button");
    const $historyButton = document.querySelector("#profile-history-button");
    const $profileData = document.querySelector("#profile-user-data");
    const $purchaseHistory = document.querySelector("#purchase-history");

    $profileButton.addEventListener("click",function(){
        $profileButton.classList.toggle("hidden");
        $historyButton.classList.toggle("hidden");
        $profileData.classList.toggle("hidden");
        $purchaseHistory.classList.toggle("hidden");
    });
    
    $historyButton.addEventListener("click",function(){
        $profileButton.classList.toggle("hidden");
        $historyButton.classList.toggle("hidden");
        $profileData.classList.toggle("hidden");
        $purchaseHistory.classList.toggle("hidden");
    });

    function toggleElement(buttonNumber) {
        if (buttonNumber === 1) {
            $infoSection.style.display = "flex";
            $passwordSection.style.display = "none";
            $avatarSection.style.display = "none";
            $editSection.style.display = "none";
        } else if (buttonNumber === 2) {
            $infoSection.style.display = "none";
            $passwordSection.style.display = "flex";
            $avatarSection.style.display = "none";
            $editSection.style.display = "none";
        } else if (buttonNumber === 3) {
            $infoSection.style.display = "none";
            $passwordSection.style.display = "none";
            $avatarSection.style.display = "flex";
            $editSection.style.display = "none";
        } else if (buttonNumber === 4) {
            $infoSection.style.display = "none";
            $passwordSection.style.display = "none";
            $avatarSection.style.display = "none";
            $editSection.style.display = "flex";
        }
    }
})
