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

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function createParticles() {
    particleContainer.innerHTML = '';
    const headerHeight = header.offsetHeight;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 6 + 3; // 3–9px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = '-20px';

        // glow
        particle.style.background = '#FFD32C';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 6px rgba(255,255,255,0.8), 0 0 12px rgba(200,200,255,0.6)';
        particle.style.position = 'absolute';
        particle.style.pointerEvents = 'none';

        particleContainer.appendChild(particle);

        // horizontal sway properties
        const swayAmplitude = Math.random() * 10 + 5; // 5–15px sway left/right
        const swaySpeed = Math.random() * 0.02 + 0.01; // speed of sway

        // store data
        const baseSpeed = 0.00015;
        const heightFactor = headerHeight / 500;
        const randomFactor = Math.random() * 0.5 + 0.75;

        particles.push({
            el: particle,
            startY: -20,
            maxY: headerHeight,
            progress: Math.random(),
            speed: baseSpeed * heightFactor * randomFactor,
            swayAmplitude,
            swaySpeed,
            swayOffset: Math.random() * Math.PI * 2 // random start angle
        });
    }
}

function animateParticles() {
    const headerHeight = header.offsetHeight;
    for (const p of particles) {
        p.progress += p.speed;
        p.swayOffset += p.swaySpeed;

        if (p.progress > 1) p.progress = 0;

        const easedProgress = easeOutCubic(p.progress);
        const y = p.startY + easedProgress * p.maxY;
        const opacity = 1 - easedProgress;

        // horizontal sway using sine wave
        const xOffset = Math.sin(p.swayOffset) * p.swayAmplitude;

        p.el.style.transform = `translate(${xOffset}px, -${y}px) scale(${1 - easedProgress * 0.5})`;
        p.el.style.opacity = opacity;
    }

    requestAnimationFrame(animateParticles);
}

// Initialize
createParticles();
animateParticles();

// Update on resize
window.addEventListener('resize', () => {
    const headerHeight = header.offsetHeight;
    particles.forEach(p => {
        p.maxY = headerHeight;
        const baseSpeed = 0.0008;
        const heightFactor = headerHeight / 500;
        const randomFactor = Math.random() * 0.5 + 0.75;
        p.speed = baseSpeed * heightFactor * randomFactor;
    });
});