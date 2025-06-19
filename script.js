document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA RASTRO DE ESTRELA CADENTE ---
    const starContainer = document.getElementById('star-trail-container');
    let lastMove = 0;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        // Limita a criação de estrelas para não sobrecarregar o navegador
        if (now - lastMove < 30) return;
        lastMove = now;

        createStar(e.clientX, e.clientY);
    });

    function createStar(x, y) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        
        starContainer.appendChild(star);

        // Remove a estrela do DOM após a animação terminar
        setTimeout(() => {
            star.remove();
        }, 1000); // 1000ms = 1s, correspondendo à duração da animação 'fadeOut'
    }

    // --- LÓGICA PARA ANIMAÇÃO AO ROLAR (SCROLL REVEAL) ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Opcional: para de observar o elemento depois que ele já foi animado
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15 // O elemento é revelado quando 15% dele está visível
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- BÔNUS: Animação de entrada da primeira seção (Hero) ---
    // A animação inicial do topo da página é feita com CSS, mas vamos adicionar 
    // uma classe ao body depois do primeiro scroll para que a animação não se repita.
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    }, { passive: true });

});