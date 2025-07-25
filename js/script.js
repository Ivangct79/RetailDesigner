document.addEventListener('DOMContentLoaded', function() {

    // --- Lógica del Carrusel con FADE y AUTOPLAY ---
    const carousels = document.querySelectorAll('.carousel-container');
    const autoPlayDelay = 5000; // 5 segundos

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevButton = carousel.querySelector('.carousel-button.prev');
        const nextButton = carousel.querySelector('.carousel-button.next');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        
        // CAMBIO CLAVE: Comprobamos si este carrusel debe tener autoplay
        const shouldAutoplay = !carousel.classList.contains('no-autoplay');

        let currentIndex = 0;
        let autoPlayInterval = null; // Variable para almacenar el intervalo del autoplay
        const totalSlides = slides.length;

        if (totalSlides === 0) return;
        
        // 1. Crear los puntos indicadores
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Ir a la diapositiva ${i + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(i);
                // Reseteamos el autoplay al hacer clic en un punto (si está activado)
                resetAutoPlay(); 
            });
            dotsContainer.appendChild(dot);
        }

        const dots = dotsContainer.querySelectorAll('.dot');

        // 2. Función para actualizar la vista del carrusel (ahora con FADE)
        function updateCarousel() {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            if (slides[currentIndex]) {
                slides[currentIndex].classList.add('active');
            }
            if (dots[currentIndex]) {
                dots[currentIndex].classList.add('active');
            }
        }

        // 3. Función para ir a una diapositiva específica
        function goToSlide(slideIndex) {
            currentIndex = slideIndex;
            updateCarousel();
        }
        
        // 4. Funciones para controlar el Autoplay
        function startAutoPlay() {
            // CAMBIO CLAVE: Solo iniciamos el intervalo si shouldAutoplay es true
            if (!shouldAutoplay) return;

            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarousel();
            }, autoPlayDelay);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay(); // La lógica interna de startAutoPlay ya comprueba si debe iniciarse
        }

        // 5. Event Listeners para los botones y hover
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
            resetAutoPlay();
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
            resetAutoPlay();
        });
        
        // CAMBIO CLAVE: Solo añadimos los listeners de hover si el autoplay está activado
        if (shouldAutoplay) {
            carousel.addEventListener('mouseenter', stopAutoPlay);
            carousel.addEventListener('mouseleave', startAutoPlay);
        }

        // 6. Iniciar el carrusel
        updateCarousel(); // Muestra la primera slide siempre
        startAutoPlay();  // Inicia el autoplay solo si corresponde
    });

    // --- Actualizar año del copyright ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

});