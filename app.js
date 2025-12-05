
/*
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})
*/

const mobileMenu = document.getElementById('mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    menuLinks.classList.toggle('active');
});

/*const filters = document.querySelectorAll(".checkbox-wrapper-13 input")
const filteredEvents = document.querySelectorAll(".filterable_cards .block")

const filterCards = e => {
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");

    filteredEvents.forEach(block => {
        block.classList.add("hide");
        if(block.dataset.name == e.target.dataset.name || e.target.dataset.name == "all") {
            block.classList.remove("hide");
        }
    });
    
};

filters.forEach(input => input.addEventListener("click", filterCards)); */

fetch('https://api.sheetbest.com/sheets/96fd77ef-7967-42e7-994f-dfbae7a94e47')
.then(response => response.json())
.then(data => {
    console.log(data);
    if(data.length > 0) {
        var disp = "";
        data.forEach((u) =>{
            disp += "<div class = 'filterable_cards'>"
            disp += "<h1>" + u.name + "</h1>"
            disp += "<h2>" + u.location + "</h2>"
            disp += "<h2>" + u.date + "</h2>"
            disp += "</div>"
        })

        document.getElementById("output").innerHTML = disp;
    }
});