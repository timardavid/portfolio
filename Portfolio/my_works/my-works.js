// Lightbox megnyitása
document.querySelectorAll('.edit-video img').forEach(img => {
    img.addEventListener('click', function () {
        document.getElementById('lightbox-img').src = this.src;
        document.getElementById('lightbox').classList.add('active');
    });
});

// Lightbox bezárása
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}
