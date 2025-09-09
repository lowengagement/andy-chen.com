const l = document.createElement('div');
l.className = 'lightbox';
l.innerHTML = '<img>';
document.body.appendChild(l);

const i = l.firstElementChild;

document.onclick = e => {
    if (e.target.matches('.gallery img')) {
        i.src = e.target.src;
        i.alt = e.target.alt;
        l.style.display = 'block';
    } else if (e.target === l) {
        l.style.display = 'none';
    }
};

document.onkeydown = e => e.key === 'Escape' && (l.style.display = 'none');