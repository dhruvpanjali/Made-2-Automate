function adjustLayout(){
    let formDiv = document.querySelector(".user-form-container");

    if(window.innerWidth <= 768){
        formDiv.classList.add("col-10", "offset-1");
        formDiv.classList.remove("col-8", "offset-2");
    }else{
        formDiv.classList.remove("col-10", "offset-1");
        formDiv.classList.add("col-8", "offset-2");
    }
}
adjustLayout();
window.addEventListener('resize', adjustLayout);