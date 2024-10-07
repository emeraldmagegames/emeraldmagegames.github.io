window.onload = function() {
    const starField = document.getElementById('star-field'); // Get the star-field container
    const numberOfStars = 400; // Define how many stars you want (400)

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

        // Store the original color of the star (white or a special color if every 10th star)
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
            const chance = Math.random(); // Generates a random number between 0 and 1

            if (chance < 0.05) { // Less frequent chance to blink or sparkle (5%)
                const eventChance = Math.random(); // Another random number for event choice
                if (eventChance < 0.5) {
                    // Fade out (normal blink)
                    star.style.animation = `blink 1s ease-in-out 1`;
                } else if (eventChance < 0.75) {
                    // Change to a random pale color for 1 second, then revert
                    const paleBlinkColors = ['#ffd1d1', '#ffffe0', '#d1e7ff']; // Pale red, pale yellow, pale blue
                    const randomBlinkColor = paleBlinkColors[Math.floor(Math.random() * paleBlinkColors.length)];
                    star.style.backgroundColor = randomBlinkColor;
                    star.style.animation = 'none'; // Disable blink animation

                    // Revert back to the original color after 1 second
                    setTimeout(() => {
                        star.style.backgroundColor = originalColor;
                    }, 1000);
                } else {
                    // Sparkle effect (lines through the star)
                    star.classList.add('sparkle'); // Add sparkle class

                    // Remove the sparkle effect after 1 second
                    setTimeout(() => {
                        star.classList.remove('sparkle');
                    }, 1000);
                }
            } else {
                star.style.animation = 'none'; // Reset to no animation
            }
        }, Math.random() * 3000 + 5000); // Random interval between 5-8 seconds
    }

    // Track mouse movement for gravity
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        updateStarPositions(mouseX, mouseY); // Update stars based on mouse movement
    });

    // Track touch movement for gravity (simulating mouse movement)
    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0]; // Get the first touch point
        const touchX = touch.clientX; // Get the touch X position
        const touchY = touch.clientY; // Get the touch Y position
        updateStarPositions(touchX, touchY); // Update stars based on touch movement
    });

    // Function to update star positions based on cursor or touch position
    function updateStarPositions(x, y) {
        const stars = document.querySelectorAll('.star'); // Get all the stars
        stars.forEach(star => {
            const starX = star.offsetLeft + star.clientWidth / 2;
            const starY = star.offsetTop + star.clientHeight / 2;

            const deltaX = x - starX;
            const deltaY = y - starY;

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // When the stars are within 100px, pull them directly to the cursor/touch
            if (distance < 100) {
                star.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            } else {
                star.style.transform = ''; // Reset to original position
            }
        });
    }
}
