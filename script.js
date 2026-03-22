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
    
    // التحقق من الإعدادات السابقة
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

    // 3. القائمة الجانبية للموبايل
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 4. الرسوم المتحركة عند التمرير (Scroll Reveal) وتعبئة شريط التقدم
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

        // تشغيل الرسوم المتحركة لشريط التقدم عند الوصول لقسم النتائج
        const resultsSection = document.getElementById('results');
        if(resultsSection.getBoundingClientRect().top < windowHeight - revealPoint) {
            progressFills.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
        }
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // تشغيل أولي

    // 5. الأكورديون (الإطار النظري)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            const isActive = header.classList.contains('active');
            
            // إغلاق كل الأقسام الأخرى
            document.querySelectorAll('.accordion-body').forEach(el => el.style.maxHeight = null);
            document.querySelectorAll('.accordion-header').forEach(el => el.classList.remove('active'));

            if (!isActive) {
                header.classList.add('active');
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });

    // 6. التحكم في الفيديو الصامت التفاعلي
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

    // 7. تقييم النجوم
    const stars = document.querySelectorAll('.stars i');
    const ratingInput = document.getElementById('ratingValue');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = star.getAttribute('data-value');
            ratingInput.value = value;
            
            stars.forEach(s => s.classList.remove('active'));
            for(let i = 0; i < value; i++) {
                stars[i].classList.add('active');
            }
        });
    });

    // تحديد 5 نجوم كقيمة افتراضية
    for(let i=0; i<5; i++) {
        stars[i].classList.add('active');
    }

    // 8. التحقق من صحة الاستبيان (Form Validation)
    const form = document.getElementById('evaluationForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        
        // التحقق من الاسم
        if (name === '') {
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('nameError').style.display = 'none';
        }

        // التحقق من الإيميل
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.match(emailPattern)) {
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('emailError').style.display = 'none';
        }

        if (isValid) {
            document.getElementById('formSuccess').style.display = 'block';
            form.reset();
            // إعادة تعيين النجوم
            stars.forEach(s => s.classList.add('active'));
            ratingInput.value = 5;
            
            setTimeout(() => {
                document.getElementById('formSuccess').style.display = 'none';
            }, 5000);
        }
    });
});
