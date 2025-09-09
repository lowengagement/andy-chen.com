const l = document.createElement('div');
l.className = 'lightbox';
l.innerHTML = '<img>';
document.body.appendChild(l);

document.querySelectorAll('.gallery img').forEach(img => {
    const t = new Image();
    t.onload = () => {
        const c = document.createElement('canvas');
        c.width = img.offsetWidth || 300;
        c.height = (t.height * c.width) / t.width;
        c.getContext('2d').drawImage(t, 0, 0, c.width, c.height);
        img.dataset.full = img.src;
        img.src = c.toDataURL('image/jpeg', 0.7);
    };
    t.src = img.src;
});

document.onclick = e => {
    if (e.target.matches('.gallery img')) {
        l.firstElementChild.src = e.target.dataset.full;
        l.style.display = 'block';
    } else if (e.target === l) {
        l.style.display = 'none';
    }
};

document.onkeydown = e => e.key === 'Escape' && (l.style.display = 'none');