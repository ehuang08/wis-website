
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

document.querySelectorAll('.event-sub').forEach(eventItem => {
    eventItem.addEventListener('click', () => {
        document.getElementById('modal-overlay').style.display = 'flex';
    });
});

document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('modal-overlay').style.display = 'none';
});

/*keep?*/
function openModal() {
    modalOverlay.style.display = 'flex';
    modalOverlay.setAttribute('aria-hidden', 'false');
}

/* adding aria label for screen readers*/
function closeModal() {
    modalOverlay.style.display = 'none';
    modalOverlay.setAttribute('aria-hidden', 'true');
}

/*Escape button implementation*/ 
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

