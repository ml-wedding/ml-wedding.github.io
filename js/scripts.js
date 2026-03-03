/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/

window.addEventListener('DOMContentLoaded', () => {

    // Navbar shrink on scroll
    const navbarShrink = () => {
        const mainNav = document.querySelector('#mainNav');
        if (!mainNav) return;
        mainNav.classList.toggle('navbar-scrolled', window.scrollY > 0);
    };

    navbarShrink();
    document.addEventListener('scroll', navbarShrink);

    // Bootstrap ScrollSpy
    const mainNav = document.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse navbar on mobile when a nav link is clicked
    const navbarToggler = document.querySelector('.navbar-toggler');
    Array.from(document.querySelectorAll('#navbarResponsive .nav-link')).forEach(link => {
        link.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Particles
    const particleContainer = document.querySelector('.particles');
    const header = document.querySelector('.masthead');
    const NUM_PARTICLES = 50;
    const BASE_SPEED = 0.00015;
    const particles = [];

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function createParticles() {
        particleContainer.innerHTML = '';
        const headerHeight = header.offsetHeight;

        for (let i = 0; i < NUM_PARTICLES; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const size = Math.random() * 6 + 3;
            particle.style.cssText = [
                'width:' + size + 'px',
                'height:' + size + 'px',
                'left:' + (Math.random() * 100) + '%',
                'bottom:-20px',
                'background:#FFD32C',
                'border-radius:50%',
                'box-shadow:0 0 6px rgba(255,255,255,0.8),0 0 12px rgba(200,200,255,0.6)',
                'position:absolute',
                'pointer-events:none'
            ].join(';');

            particleContainer.appendChild(particle);

            const swayAmplitude = Math.random() * 10 + 5;
            const swaySpeed = Math.random() * 0.02 + 0.01;
            const heightFactor = headerHeight / 500;
            const randomFactor = Math.random() * 0.5 + 0.75;

            particles.push({
                el: particle,
                startY: -20,
                maxY: headerHeight,
                progress: Math.random(),
                speed: BASE_SPEED * heightFactor * randomFactor,
                swayAmplitude,
                swaySpeed,
                swayOffset: Math.random() * Math.PI * 2
            });
        }
    }

    function animateParticles() {
        for (const p of particles) {
            p.progress += p.speed;
            p.swayOffset += p.swaySpeed;

            if (p.progress > 1) p.progress = 0;

            const easedProgress = easeOutCubic(p.progress);
            const y = p.startY + easedProgress * p.maxY;
            const xOffset = Math.sin(p.swayOffset) * p.swayAmplitude;

            p.el.style.transform = 'translate(' + xOffset + 'px, -' + y + 'px) scale(' + (1 - easedProgress * 0.5) + ')';
            p.el.style.opacity = 1 - easedProgress;
        }

        requestAnimationFrame(animateParticles);
    }

    createParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        const headerHeight = header.offsetHeight;
        particles.forEach(p => {
            p.maxY = headerHeight;
            p.speed = BASE_SPEED * (headerHeight / 500) * (Math.random() * 0.5 + 0.75);
        });
    });

    // ── Countdown Timer ───────────────────────────────────────────
    // UPDATE this to the real wedding date/time once confirmed!
    const WEDDING_DATE = new Date('2027-06-19T16:00:00');

    function updateCountdown() {
        const now = new Date();
        const diff = WEDDING_DATE - now;
        const cdEl = document.getElementById('countdown');
        if (!cdEl) return;

        if (diff <= 0) {
            cdEl.innerHTML = '<p style="font-family:Tangerine,cursive;font-size:3rem;color:#ffc800;">Today is the day! 🎉</p>';
            return;
        }

        const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins  = Math.floor((diff / (1000 * 60)) % 60);
        const secs  = Math.floor((diff / 1000) % 60);
        const pad = n => String(n).padStart(2, '0');

        document.getElementById('cd-days').textContent  = pad(days);
        document.getElementById('cd-hours').textContent = pad(hours);
        document.getElementById('cd-mins').textContent  = pad(mins);
        document.getElementById('cd-secs').textContent  = pad(secs);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ── Scroll Reveal ─────────────────────────────────────────────
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ── Contact Form Validation ───────────────────────────────────
    const submitBtn = document.getElementById('submitButton');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const name    = document.getElementById('name').value.trim();
            const email   = document.getElementById('email').value.trim();
            const phone   = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            if (!name || !email || !phone || !message) {
                submitBtn.textContent = 'Please fill all fields!';
                submitBtn.classList.add('btn-danger');
                setTimeout(() => {
                    submitBtn.textContent = 'Send Message';
                    submitBtn.classList.remove('btn-danger');
                }, 2500);
                return;
            }
            if (!emailOk) {
                submitBtn.textContent = 'Invalid email address';
                submitBtn.classList.add('btn-danger');
                setTimeout(() => {
                    submitBtn.textContent = 'Send Message';
                    submitBtn.classList.remove('btn-danger');
                }, 2500);
                return;
            }

            // Success — hide form, show confirmation
            // (wire up to a real backend/email service when ready)
            submitBtn.style.display = 'none';
            const successMsg = document.getElementById('formSuccess');
            if (successMsg) successMsg.style.display = 'block';
        });
    }

});