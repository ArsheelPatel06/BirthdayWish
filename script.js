document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const mainCard = document.getElementById('main-card');
    const backgroundMusic = document.getElementById('background-music');

    // --- Animation Functions for Memory Boxes ---

    // Function to shoot yellow hearts 💛 (MODIFIED FOR BIGGER SIZE)
    const shootYellowHearts = () => {
        const defaults = {
            spread: 360,
            ticks: 120,
            gravity: 0,
            decay: 0.92,
            startVelocity: 45,
        };
        confetti({
            ...defaults,
            particleCount: 80,
            scalar: 4, // Increased from 2.5 to 4 for much bigger hearts
            shapes: ['heart'],
            colors: ['#FFD700', '#FFC300', '#FFBF00']
        });
    };

    // Function to shoot stars ✨
    const shootStars = () => {
        const defaults = {
            spread: 360,
            ticks: 150,
            gravity: 0,
            decay: 0.92,
            startVelocity: 45,
        };
        confetti({
            ...defaults,
            particleCount: 70,
            scalar: 1.8,
            shapes: ['star'],
        });
        confetti({
            ...defaults,
            particleCount: 30,
            scalar: 1.2,
            shapes: ['circle'],
        });
    };


    const celebrationConfetti = () => {
        const duration = 2 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
        const randomInRange = (min, max) => Math.random() * (max - min) + min;
        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) { return clearInterval(interval); }
            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    // --- Event Listeners ---

    envelope.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.volume = 0.4;
            backgroundMusic.play();
        }
        celebrationConfetti();
        envelope.classList.add('open');
        setTimeout(() => {
            envelope.parentElement.style.display = 'none';
            mainCard.classList.remove('hidden');
        }, 1500);
    });
    
    // --- Memory Box Interaction ---
    const memoryBoxes = document.querySelectorAll('.memory-box');
    memoryBoxes.forEach(box => {
        box.addEventListener('click', () => {
            if (!box.classList.contains('flipped')) {
                const effect = box.dataset.effect;
                if (effect === 'hearts') {
                    shootYellowHearts();
                } else if (effect === 'stars') {
                    shootStars();
                }
            }
            box.classList.toggle('flipped');
        });
    });

    // --- General Confetti (for clicking anywhere else on the body) ---
    document.body.addEventListener('click', (event) => {
        if (event.target.closest('.memory-box') || event.target.closest('.prev-btn') || event.target.closest('.next-btn') || event.target.closest('.envelope')) {
            return;
        }
        const x = event.clientX / window.innerWidth;
        const y = event.clientY / window.innerHeight;
        confetti({ origin: { x, y }, particleCount: 100, spread: 100, gravity: 1, startVelocity: 30, colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'] });
    });

    // --- Photo Carousel Logic ---
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let counter = 0;
    if (carouselImages.length > 0) {
        const size = carouselImages[0].clientWidth;
        const moveSlide = () => {
            carouselSlide.style.transition = 'transform 0.5s ease-in-out';
            carouselSlide.style.transform = `translateX(${-size * counter}px)`;
        };
        nextBtn.addEventListener('click', () => {
            if (counter >= carouselImages.length - 1) counter = -1;
            counter++;
            moveSlide();
        });
        prevBtn.addEventListener('click', () => {
            if (counter <= 0) counter = carouselImages.length;
            counter--;
            moveSlide();
        });
        setInterval(() => { nextBtn.click(); }, 5000);
    }
});