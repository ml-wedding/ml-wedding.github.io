/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

const particleContainer = document.querySelector('.particles');
const header = document.querySelector('.masthead');
const numParticles = 50; // how many particles

function createParticles() {
    particleContainer.innerHTML = ''; // clear existing particles
    const headerHeight = header.offsetHeight; // dynamic header height

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random size
        const size = Math.random() * 6 + 3; // 3px to 9px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random horizontal position
        particle.style.left = `${Math.random() * 100}%`;

        // Spawn slightly below header
        particle.style.bottom = '-20px';

        // Speed scales with header height
        const minDuration = 2; // fastest
        const maxDuration = 6; // slowest
        const duration = ((headerHeight / 500) * (maxDuration - minDuration) + minDuration) * (Math.random() * 0.5 + 0.75);

        const delay = Math.random() * 5; // 0–5s delay
        particle.style.animation = `rise ${duration}s ease-out ${delay}s infinite`;

        // Optional glow effect
        // particle.style.background = '#fff';
        // particle.style.borderRadius = '50%';
        // particle.style.boxShadow = '0 0 6px rgba(255,255,255,0.8), 0 0 12px rgba(200,200,255,0.6)';
        // particle.style.pointerEvents = 'none';

        particleContainer.appendChild(particle);
    }

    // Keyframes using dynamic header height
    const style = document.createElement('style');
    style.id = 'particle-keyframes';
    style.innerHTML = `
    @keyframes rise {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
        100% {
            transform: translateY(-${headerHeight / 2}px) scale(0.5);
            opacity: 0;
        }
    }
    `;
    // Replace old keyframes if they exist
    const oldStyle = document.getElementById('particle-keyframes');
    if (oldStyle) oldStyle.remove();
    document.head.appendChild(style);
}

// Initial creation
createParticles();

// Recreate particles on resize so speed & height scale correctly
window.addEventListener('resize', () => {
    createParticles();
});