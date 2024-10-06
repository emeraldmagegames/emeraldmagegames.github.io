window.onload = function() {
    const starField = document.getElementById('star-field'); // Get the star-field container
    const numberOfStars = 500; // Define how many stars you want

    // Generate stars and position them randomly
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div'); // Create a new div for each star
        star.classList.add('star'); // Add the 'star' class to each new div

        // Randomize size between 1px and 3px
        const size = Math.random() * 2 + 1; // Generates a number between 1 and 3
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Random horizontal and vertical position
        star.style.left = Math.random() * window.innerWidth + 'px';
        star.style.top = Math.random() * window.innerHeight + 'px';

        // Make every 10th star a special color
        if (i % 10 === 0) {
            // Assign a random color from pale red, blue, or yellow
            const colors = ['#ffcccb', '#add8e6', '#ffffcc']; // Pale red, light blue, pale yellow
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            star.style.backgroundColor = randomColor;
        }

        // Append the star to the star-field container
        starField.appendChild(star);

        // Make each star blink with 50% chance to change color instead of fading out
        setInterval(() => {
            const chance = Math.random(); // Generates a random number between 0 and 1

            if (chance < 0.1) { // 1 in 10 chance to blink
                // 50% chance for fade out or color change
                const blinkChance = Math.random(); // Generate another random number
                if (blinkChance < 0.5) {
                    // Fade out (normal blink)
                    star.style.animation = `blink 1s ease-in-out 1`;
                } else {
                    // Change to a random color (red, yellow, or blue)
                    const blinkColors = ['#ff0000', '#ffff00', '#0000ff']; // Red, yellow, blue
                    const randomBlinkColor = blinkColors[Math.floor(Math.random() * blinkColors.length)];
                    star.style.backgroundColor = randomBlinkColor;
                    star.style.animation = 'none'; // No fade, just color change
                }
            } else {
                star.style.animation = 'none'; // Reset to no animation
            }
        }, Math.random() * 3000 + 3000); // Random interval between 3-6 seconds
    }

    // Track mouse movement for gravity
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const stars = document.querySelectorAll('.star'); // Get all the stars
        stars.forEach(star => {
            const starX = star.offsetLeft + star.clientWidth / 2;
            const starY = star.offsetTop + star.clientHeight / 2;

            const deltaX = mouseX - starX;
            const deltaY = mouseY - starY;

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // When the stars are within 100px, pull them directly to the cursor
            if (distance < 100) {
                // Move the star directly to the cursor's position
                star.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            } else {
                // Allow the stars to drift back smoothly thanks to the CSS transition
                star.style.transform = ''; // Reset to original position with smooth transition
            }
        });
    });
}
