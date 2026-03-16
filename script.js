document.addEventListener('DOMContentLoaded', () => {

    // --- Gallery Lightbox ---
    const galleryImages = {
        himeshaza: [
            './photos/hero-resz.png',
            './photos/himeshazaovoda-2.png',
            './photos/himeshazaovoda-3.png',
            './photos/himeshazaovoda-4.png',
            './photos/himeshazaovoda-5.png',
        ]
    };

    const lightbox = document.getElementById('galleryLightbox');
    const galleryImg = document.getElementById('galleryImg');
    const galleryCounter = document.getElementById('galleryCounter');
    let currentGallery = [];
    let currentIndex = 0;

    function showGalleryImage() {
        galleryImg.src = currentGallery[currentIndex];
        galleryCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
    }

    function openGallery(gallery, index = 0) {
        currentGallery = galleryImages[gallery] || [];
        currentIndex = index;
        showGalleryImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.reference-card--gallery').forEach(card => {
        card.addEventListener('click', () => openGallery(card.dataset.gallery));
    });

    document.getElementById('galleryClose').addEventListener('click', closeGallery);

    document.getElementById('galleryPrev').addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        showGalleryImage();
    });

    document.getElementById('galleryNext').addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % currentGallery.length;
        showGalleryImage();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeGallery();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
            showGalleryImage();
        }
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % currentGallery.length;
            showGalleryImage();
        }
    });

    // --- Fő Navigációs Spotlight Effekt ---
    const navMenu = document.getElementById('navMenu');
    const navSpotlight = document.getElementById('navSpotlight');
    const navLinks = navMenu ? navMenu.querySelectorAll('.nav-link') : [];

    function updateSpotlight(element) {
        if (!navSpotlight || !navMenu) return;
        const rect = element.getBoundingClientRect();
        const menuRect = navMenu.getBoundingClientRect();
        navSpotlight.style.width = `${rect.width}px`;
        navSpotlight.style.left = `${rect.left - menuRect.left}px`;
        navSpotlight.style.top = `${rect.top - menuRect.top}px`;
    }

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => updateSpotlight(link));
    });

    if (navMenu) {
        navMenu.addEventListener('mouseleave', () => { navSpotlight.style.opacity = '0'; });
        navMenu.addEventListener('mouseenter', () => { navSpotlight.style.opacity = '1'; });
    }

    // --- Mobil Menü ---
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (navToggle && mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Cursor Glow ---
    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

    if (cursorGlow && !('ontouchstart' in window)) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursorGlow() {
            const speed = 0.1;
            glowX += (mouseX - glowX) * speed;
            glowY += (mouseY - glowY) * speed;
            cursorGlow.style.left = `${glowX}px`;
            cursorGlow.style.top = `${glowY}px`;
            requestAnimationFrame(animateCursorGlow);
        }
        animateCursorGlow();
    } else if (cursorGlow) {
        cursorGlow.style.display = 'none';
    }

    // --- Portfólió Szűrő ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const referenceCards = document.querySelectorAll('.reference-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            referenceCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // --- Scroll Reveal ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // Képernyőn lévők azonnali betöltése
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('revealed');
        }
    });

    // --- Sima Görgetés (Smooth Scroll) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Navigáció háttere + aktív menüpont görgetésnél ---
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const allNavLinks = document.querySelectorAll('.nav-link, .mobile-link');

    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.style.background = window.scrollY > 100 ? 'rgba(10, 10, 11, 0.95)' : 'rgba(10, 10, 11, 0.8)';
        }

        const scrollPosition = window.scrollY + 200;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                allNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // --- Parallax Effekt a Hero szekcióra ---
        const heroSlideshow = document.getElementById('heroSlideshow');
        if (heroSlideshow) {
            heroSlideshow.style.transform = `translateY(${window.scrollY * 0.4}px)`;
        }
    });

});