window.onload = function() {
    const starField = document.getElementById('star-field');
    const numberOfStars = 400;

    // Generate stars and position them randomly
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div'); // Create a new div for each star
        star.classList.add('star');

        // Randomize size between 1px and 3px
        const size = Math.random() * 2 + 1; // Generates a number between 1 and 3
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Random horizontal and vertical position
        star.style.left = Math.random() * window.innerWidth + 'px';
        star.style.top = Math.random() * window.innerHeight + 'px';

        // Store the original color of the star
        let originalColor = '#ffffff'; // Default is white

        // Make every 10th star a special color
        if (i % 10 === 0) {
            const colors = ['#ffcccb', '#add8e6', '#ffffcc']; // Pale red, light blue, pale yellow
            originalColor = colors[Math.floor(Math.random() * colors.length)];
            star.style.backgroundColor = originalColor;
        }

        // Append the star to the star-field container
        starField.appendChild(star);

        // Make each star blink or sparkle at random intervals
        setInterval(() => {
            const chance = Math.random(); // Generates a random number

            if (chance < 0.05) { // Less frequent chance to blink or sparkle
                const eventChance = Math.random();
                if (eventChance < 0.5) {
                    star.style.animation = `blink 1s ease-in-out 1`;
                } else if (eventChance < 0.75) {
                    const paleBlinkColors = ['#ffd1d1', '#ffffe0', '#d1e7ff'];
                    const randomBlinkColor = paleBlinkColors[Math.floor(Math.random() * paleBlinkColors.length)];
                    star.style.backgroundColor = randomBlinkColor;
                    setTimeout(() => {
                        star.style.backgroundColor = originalColor;
                    }, 1000);
                } else {
                    star.classList.add('sparkle');
                    setTimeout(() => {
                        star.classList.remove('sparkle');
                    }, 1000);
                }
            }
        }, Math.random() * 3000 + 5000);
    }

    // Mouse and touch events
    document.addEventListener('mousemove', (e) => updateStarPositions(e.clientX, e.clientY));
    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        updateStarPositions(touch.clientX, touch.clientY);
    });

    // Update stars based on the position
    function updateStarPositions(x, y) {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            const starX = star.offsetLeft + star.clientWidth / 2;
            const starY = star.offsetTop + star.clientHeight / 2;
            const deltaX = x - starX;
            const deltaY = y - starY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            if (distance < 100) {
                star.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            } else {
                star.style.transform = ''; // Reset position
            }
        });
    }
};
