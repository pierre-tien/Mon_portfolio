/* ================================================= */
/* ANIMATION VISUELLE IMMERSIVE - MATHÉMATIQUE & SPATIALE */
/* ================================================= */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('space-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    // Redimensionner le canvas dynamiquement à la taille de l'écran
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Liste des symboles mathématiques et spatiaux
    const symbols = ['π', 'λ', 'Σ', '∫', 'Δ', 'α', 'θ', 'μ', 'E=mc²', 'f(x)', '∇', 'lim', '√2', '∞'];

    // Création d'un tableau de particules mathématiques
    const particleCount = 45;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.6, // Vitesse horizontale lente
            vy: (Math.random() - 0.5) * 0.6, // Vitesse verticale lente
            size: Math.random() * 16 + 12,   // Taille de la police
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            opacity: Math.random() * 0.5 + 0.2
        });
    }

    // Boucle d'animation fluide (moteur graphique)
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            // Mouvement
            p.x += p.vx;
            p.y += p.vy;

            // Rebondir sur les bords de l'écran
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            // Dessiner le symbole mathématique lumineux
            ctx.font = `${p.size}px 'Courier New', monospace`;
            ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity})`; // Couleur cyan technique
            ctx.fillText(p.symbol, p.x, p.y);
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Suivi des coordonnées de la souris (Espace 3D interactif)
    document.addEventListener('mousemove', (e) => {
        const coordsBadge = document.getElementById('spatial-coords');
        if (coordsBadge) {
            const x = e.clientX;
            const y = e.clientY;
            const z = Math.round(Math.sqrt(x * x + y * y) / 10);
            coordsBadge.innerText = `Espace 3D : X: ${x} | Y: ${y} | Z: ${z}`;
        }
    });
});

/* ================================================= */
/* GÉNÉRATEUR DE PARTICULES MATHÉMATIQUES SPATIALES  */
/* ================================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // Liste des symboles et formules mathématiques/spatiales à faire flotter
    const mathSymbols = [
        'π', 'λ', 'Σ', '∫', 'Δ', 'α', 'beta;', 'θ', 'μ', 'σ', 
        'E=mc²', 'f(x)', '∇', 'lim', '∮', '√2', '∂x', 'A = πr²', 
        'vec{V}', 'n!', 'γ', 'ω', '∞', 'φ', 'dψ'
    ];

    // Fonction pour créer une particule mathématique flottante
    function createMathParticle() {
        const particle = document.createElement('div');
        particle.className = 'math-particle';
        
        // Choisir un symbole au hasard
        const randomSymbol = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
        particle.innerText = randomSymbol;

        // Position horizontale aléatoire sur l'écran
        particle.style.left = Math.random() * window.innerWidth + 'px';
        
        // Taille de police aléatoire (effet de profondeur 3D)
        const size = Math.random() * 1.5 + 0.8; // entre 0.8rem et 2.3rem
        particle.style.fontSize = size + 'rem';

        // Vitesse d'animation aléatoire (entre 6 et 14 secondes)
        const duration = Math.random() * 8 + 6;
        particle.style.animationDuration = duration + 's';

        // Opacité et couleur variable selon la "profondeur"
        if (Math.random() > 0.6) {
            particle.style.color = 'rgba(168, 85, 247, 0.3)'; // Teinte violette/magenta pour varier
        }

        document.body.appendChild(particle);

        // Supprimer la particule une fois l'animation terminée pour ne pas surcharger la mémoire
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    // Créer une nouvelle formule mathématique spatiale toutes les 600 millisecondes
    setInterval(createMathParticle, 600);

});

/* ================================================= */
/* ANIMATION SPATIALE & COORDONNÉES DE LA SOURIS      */
/* ================================================= */
document.addEventListener('mousemove', (e) => {
    const coordsBadge = document.getElementById('spatial-coords');
    if (coordsBadge) {
        // Calcul mathématique simulant un repère spatial 3D basé sur la position x et y de l'écran
        const x = e.clientX;
        const y = e.clientY;
        const z = Math.round(Math.sqrt(x * x + y * y) / 10); // Calcul de distance radiale
        
        coordsBadge.innerText = `Espace 3D : X: ${x} | Y: ${y} | Z: ${z}`;
    }
});

/* ================================================= */
/* SCRIPT PRINCIPAL DU PORTFOLIO - TCHALLA Kpatcha Pierre */
/* ================================================= */

// Attendre que le contenu de la page soit entièrement chargé
document.addEventListener('DOMContentLoaded', () => {

    console.log("Portfolio chargé avec succès ! Prêt à coder.");

    // 1. Animation simple au défilement (Fade-in des sections)
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Déclenche l'animation quand 15% de la section est visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Optionnel : on arrête d'observer une fois l'effet appliqué
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Appliquer un style initial de départ pour l'animation sur chaque section
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // 2. Gestion de l'envoi du formulaire de contact (Simulation)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Empêche la page de se recharger brutalement
            
            // Récupération basique des valeurs
            const name = document.getElementById('name').value;
            
            // Message de confirmation personnalisé
            alert(`Merci ${name} ! Votre message a bien été pris en compte. (Fonctionnalité d'envoi à lier à un backend ou à un service de type Formspree prochainement).`);
            
            // Réinitialisation du formulaire
            contactForm.reset();
        });
    }

});

/* ================================================= */
/* SCRIPT PRINCIPAL DU PORTFOLIO - TCHALLA Kpatcha Pierre */
/* ================================================= */

document.addEventListener('DOMContentLoaded', () => {

    console.log("Portfolio chargé avec succès ! Prêt à coder.");

    // 1. Animation simple au défilement (Fade-in des sections)
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // 2. Effet d'écriture automatique (Typing Effect) sur la bannière
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const textToType = "Bonjour, je suis TCHALLA Kpatcha Pierre";
        let index = 0;
        heroTitle.innerHTML = 'Bonjour, je suis <span class="highlight"></span>';
        const spanHighlight = heroTitle.querySelector('.highlight');

        function typeWriter() {
            if (index < textToType.length) {
                // On extrait la partie correspondant au nom
                if (index >= 16) {
                    spanHighlight.textContent += textToType.charAt(index);
                }
                index++;
                setTimeout(typeWriter, 70); // Vitesse d'écriture en millisecondes
            }
        }
        // Lancement de l'effet après un court délai
        setTimeout(typeWriter, 500);
    }

    // 3. Ajout dynamique d'un bouton "Mode Sombre / Mode Clair"
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const themeToggleBtn = document.createElement('button');
        themeToggleBtn.innerText = '🌓 Thème';
        themeToggleBtn.className = 'btn secondary';
        themeToggleBtn.style.padding = '0.4rem 0.8rem';
        themeToggleBtn.style.fontSize = '0.85rem';
        themeToggleBtn.style.marginLeft = '1rem';
        
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
        });

        navbar.appendChild(themeToggleBtn);
    }

    // 4. Gestion de l'envoi du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            alert(`Merci ${name} ! Votre message a bien été pris en compte.`);
            contactForm.reset();
        });
    }

});

/* ================================================= */
/* GÉNÉRATEUR DE PARTICULES MATHÉMATIQUES SPATIALES  */
/* ================================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // Liste des symboles et formules mathématiques/spatiales à faire flotter
    const mathSymbols = [
        'π', 'λ', 'Σ', '∫', 'Δ', 'α', 'beta;', 'θ', 'μ', 'σ', 
        'E=mc²', 'f(x)', '∇', 'lim', '∮', '√2', '∂x', 'A = πr²', 
        'vec{V}', 'n!', 'γ', 'ω', '∞', 'φ', 'dψ'
    ];

    // Fonction pour créer une particule mathématique flottante
    function createMathParticle() {
        const particle = document.createElement('div');
        particle.className = 'math-particle';
        
        // Choisir un symbole au hasard
        const randomSymbol = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
        particle.innerText = randomSymbol;

        // Position horizontale aléatoire sur l'écran
        particle.style.left = Math.random() * window.innerWidth + 'px';
        
        // Taille de police aléatoire (effet de profondeur 3D)
        const size = Math.random() * 1.5 + 0.8; // entre 0.8rem et 2.3rem
        particle.style.fontSize = size + 'rem';

        // Vitesse d'animation aléatoire (entre 6 et 14 secondes)
        const duration = Math.random() * 8 + 6;
        particle.style.animationDuration = duration + 's';

        // Opacité et couleur variable selon la "profondeur"
        if (Math.random() > 0.6) {
            particle.style.color = 'rgba(168, 85, 247, 0.3)'; // Teinte violette/magenta pour varier
        }

        document.body.appendChild(particle);

        // Supprimer la particule une fois l'animation terminée pour ne pas surcharger la mémoire
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    // Créer une nouvelle formule mathématique spatiale toutes les 600 millisecondes
    setInterval(createMathParticle, 600);

});