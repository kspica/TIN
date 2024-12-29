let currentIndex = 0;

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const images = document.querySelectorAll('.image-link');

function openLightbox(index) {
    currentIndex = index;
    const fullImageUrl = images[currentIndex].getAttribute('data-full');
    lightboxImg.src = fullImageUrl;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    lightbox.style.display = 'none';
}

function changeImage(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    const fullImageUrl = images[currentIndex].getAttribute('data-full');
    lightboxImg.src = fullImageUrl;
}

images.forEach((image, index) => {
    image.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(index);
    });
});

closeBtn.addEventListener('click', closeLightbox);

prevBtn.addEventListener('click', () => {
    changeImage(-1);
});

nextBtn.addEventListener('click', () => {
    changeImage(1);
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});
