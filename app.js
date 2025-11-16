
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

const filters = document.querySelectorAll(".checkbox-wrapper-13 input")
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

filters.forEach(input => input.addEventListener("click", filterCards));