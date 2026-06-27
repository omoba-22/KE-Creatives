/* ---- NAV TOGGLE ---- */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

/* ---- PORTFOLIO FILTER ---- */
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

/* ---- AUTO-PLAY VIDEOS ON SCROLL ---- */
const videos = document.querySelectorAll('.video-wrapper video');

if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play();
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.4 });

    videos.forEach(video => {
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        videoObserver.observe(video);
    });
}
/* ---- LIGHTBOX ---- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxVideo = document.getElementById('lightboxVideo');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');

function openLightbox(type, src, title) {
    lightboxCaption.textContent = title || '';

    if (type === 'image') {
        lightboxImg.src = src;
        lightboxImg.style.display = 'block';
        lightboxVideo.style.display = 'none';
        lightboxVideo.pause();
        lightboxVideo.src = '';
    } else {
        lightboxVideo.src = src;
        lightboxVideo.style.display = 'block';
        lightboxImg.style.display = 'none';
        lightboxImg.src = '';
        lightboxVideo.play();
    }

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxVideo.pause();
    lightboxVideo.src = '';
    lightboxImg.src = '';
}

document.querySelectorAll('.lightbox-trigger').forEach(img => {
    img.addEventListener('click', () => {
        openLightbox('image', img.src, img.getAttribute('data-title'));
    });
});

document.querySelectorAll('.lightbox-video-trigger').forEach(wrapper => {
    wrapper.addEventListener('click', () => {
        openLightbox('video', wrapper.getAttribute('data-src'), wrapper.getAttribute('data-title'));
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});