document.addEventListener('DOMContentLoaded', function() {

    /* When the page scrolls */
    const header = document.querySelector('.header');
    const headerTexts = document.querySelectorAll('.primary-color');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const triggerHeight = 70; // Adjust this value based on when you want the background to change
    
        if (scrollPosition > triggerHeight) {
            // Change header styles when scrolled
            header.style.background = 'white';
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'; // Add box-shadow on scroll
            headerTexts.forEach(text => {
                text.style.color = '#333';
            }); // Adjust text color as needed
        } else {
            // Reset header styles when not scrolled
            header.style.background = 'transparent';
            header.style.boxShadow = 'none'; // Remove box-shadow when not scrolled
            headerTexts.forEach(text => {
                text.style.color = '#fff';
            });
        }
    });
    
    /* Open the menu bar */
    const navbar = document.querySelector(".navigation");
    const menuIcon = document.querySelector("#menu-icon");
    menuIcon.onclick = () => {
        navbar.classList.toggle('active');
        cart.classList.remove('active');
        searchBar.classList.remove('active');
    };

    /* Show the cart */
    const cartIcon = document.querySelector('#cart-icon');
    const cart = document.querySelector('.cart');
    cartIcon.onclick = () => {
        cart.classList.toggle('active');
        navbar.classList.remove('active');
        searchBar.classList.remove('active');
    };
    
    /* Open the search bar */
    const searchBar = document.querySelector('.search-bar');
    document.querySelector('#search-icon').onclick = () => {
        searchBar.classList.toggle('active');
        cart.classList.remove('active');
        navbar.classList.remove('active');
    };

    // Go to the sign-up page
    document.querySelector('#sign-in-icon').addEventListener('click', function(){
        window.location.href = 'signIn.html';
    });
    
    window.onscroll = () => {
        // Close all active elements on scroll
        navbar.classList.remove('active');
        searchBar.classList.remove('active');
        cart.classList.remove('active');
    };

});
