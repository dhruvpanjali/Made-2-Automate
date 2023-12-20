function adjustLayout(){
    let alertMsg = document.querySelector(".alert");

    if(window.innerWidth <= 998){
        alertMsg.classList.remove("col-6", "offset-3");
        alertMsg.classList.add("w-100");
        
    }else{
        alertMsg.classList.add("col-6", "offset-3");
        alertMsg.classList.remove("w-100");
    }
}

// Calls the function when the page loads
adjustLayout();

// Calls the function on window resize
window.addEventListener('resize', adjustLayout);