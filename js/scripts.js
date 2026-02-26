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
const numParticles = 50;
const particles = [];

// simple ease-out function: cubic
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function createParticles() {
    particleContainer.innerHTML = '';
    const headerHeight = header.offsetHeight;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 6 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = '-20px';

        // glow
        particle.style.background = 'yellow';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 6px rgba(255,255,255,0.8), 0 0 12px rgba(200,200,255,0.6)';
        particle.style.position = 'absolute';
        particle.style.pointerEvents = 'none';

        particleContainer.appendChild(particle);

        // store data
        particles.push({
            el: particle,
            startY: -20,
            maxY: headerHeight, // disappear halfway
            progress: Math.random(), // random initial progress 0–1
            speed: (Math.random() * 0.005 + 0.002) // base speed multiplier
        });
    }
}

function animateParticles() {
    const headerHeight = header.offsetHeight;
    for (const p of particles) {
        p.progress += p.speed / 15;

        if (p.progress > 1) {
            p.progress = 0; // reset
        }

        // apply ease-out to vertical position
        const easedProgress = easeOutCubic(p.progress);
        const y = p.startY + easedProgress * p.maxY;

        // opacity fades out halfway
        const opacity = 1 - easedProgress;

        p.el.style.transform = `translateY(-${y}px) scale(${1 - easedProgress * 0.5})`;
        p.el.style.opacity = opacity;
    }

    requestAnimationFrame(animateParticles);
}

// Initialize
createParticles();
animateParticles();

// Update on resize
window.addEventListener('resize', () => {
    particles.forEach(p => {
        p.maxY = header.offsetHeight / 2;
    });
});