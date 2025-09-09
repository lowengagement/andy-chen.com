(function() {
    function init() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = '<img>';
        document.body.appendChild(lightbox);
        
        const img = lightbox.querySelector('img');
        
        document.querySelectorAll('.gallery').forEach(gallery => {
            gallery.addEventListener('click', e => {
                if (e.target.tagName === 'IMG') {
                    img.src = e.target.src;
                    img.alt = e.target.alt;
                    lightbox.style.display = 'block';
                }
            });
        });
        
        lightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
        
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') lightbox.style.display = 'none';
        });
    }
    
    document.readyState === 'loading' 
        ? document.addEventListener('DOMContentLoaded', init)
        : init();
})();