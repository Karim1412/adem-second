document.addEventListener('DOMContentLoaded', () => {

    // 1. إخفاء شاشة التحميل
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 1000);

    // 2. الوضع الليلي (Dark Mode)
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkModeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // 3. القائمة الجانبية
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 4. Scroll Reveal
    const reveals = document.querySelectorAll('.reveal');
    const progressFills = document.querySelectorAll('.progress-fill');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });

        const resultsSection = document.getElementById('results');
        if (resultsSection && resultsSection.getBoundingClientRect().top < windowHeight - revealPoint) {
            progressFills.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
        }
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // 5. Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            const isActive = header.classList.contains('active');
            
            document.querySelectorAll('.accordion-body').forEach(el => el.style.maxHeight = null);
            document.querySelectorAll('.accordion-header').forEach(el => el.classList.remove('active'));

            if (!isActive) {
                header.classList.add('active');
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });

    // 6. Video controls
    const video = document.getElementById('silentVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const expressBtn = document.getElementById('express-btn');
    const expressMessage = document.getElementById('express-message');

    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> إيقاف مؤقت';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i> استئناف';
        }
    });

    expressBtn.addEventListener('click', () => {
        video.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i> استئناف';
        expressMessage.style.display = 'block';
        setTimeout(() => {
            expressMessage.style.display = 'none';
        }, 5000);
    });

    // 7. ⭐ Star rating
    const stars = document.querySelectorAll('.stars i');
    const ratingInput = document.getElementById('ratingValue');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = star.getAttribute('data-value');
            ratingInput.value = value;
            
            stars.forEach(s => s.classList.remove('active'));
            for (let i = 0; i < value; i++) {
                stars[i].classList.add('active');
            }
        });
    });

    // default 5 stars
    for (let i = 0; i < 5; i++) {
        stars[i].classList.add('active');
    }

    // 8. ✅ FIXED Form Validation + Submission
    const form = document.getElementById('evaluationForm');
    
    form.addEventListener('submit', (e) => {
        let isValid = true;

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();

        // name validation
        if (name === '') {
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('nameError').style.display = 'none';
        }

        // email validation
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.match(emailPattern)) {
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('emailError').style.display = 'none';
        }

        // ❌ block only if invalid
        if (!isValid) {
            e.preventDefault();
            return;
        }

        // ✅ allow submission to Google Forms
        setTimeout(() => {
            document.getElementById('formSuccess').style.display = 'block';
            form.reset();

            // reset stars
            stars.forEach(s => s.classList.add('active'));
            ratingInput.value = 5;

            setTimeout(() => {
                document.getElementById('formSuccess').style.display = 'none';
            }, 5000);
        }, 500);
    });

});
