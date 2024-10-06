window.onload = function() {
    const starField = document.getElementById('star-field'); // Get the star-field container
    const numberOfStars = 800; // Define how many stars you want

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
            // Assign a random color from pale red, blue, or yellow
            const colors = ['#ffcccb', '#add8e6', '#ffffcc']; // Pale red, light blue, pale yellow
            originalColor = colors[Math.floor(Math.random() * colors.length)];
            star.style.backgroundColor = originalColor;
        }

        // Append the star to the star-field container
        starField.appendChild(star);

        // Make each star blink with less frequent chance to change color or sparkle
        setInterval(() => {
            const chance = Math.random(); // Generates a random number between 0 and 1

            if (chance < 0.05) { // Less frequent chance to blink or sparkle (5%)
                // 50% chance for fade out, color change, or sparkle
                const eventChance = Math.random(); // Generate another random number
                if (eventChance < 0.5) {
                    // Fade out (normal blink)
                    star.style.animation = `blink 1s ease-in-out 1`;
                } else if (eventChance < 0.75) {
                    // Change to a pale color (red, yellow, or blue) for 1 second, then revert
                    const paleBlinkColors = ['#ffd1d1', '#ffffe0', '#d1e7ff']; // Pale red, pale yellow, pale blue
                    const randomBlinkColor = paleBlinkColors[Math.floor(Math.random() * paleBlinkColors.length)];

                    // Change the star's color to the random blink color
                    star.style.backgroundColor = randomBlinkColor;
                    star.style.animation = 'none'; // Disable the blink animation

                    // After 1 second (same duration as blink), revert to the original color
                    setTimeout(() => {
                        star.style.backgroundColor = originalColor; // Revert back to the original color
                    }, 1000); // 1 second = 1000 milliseconds
                } else {
                    // Sparkle effect (lines through the star)
                    star.classList.add('sparkle'); // Add sparkle class to trigger the sparkle

                    // Remove the sparkle effect after 1 second
                    setTimeout(() => {
                        star.classList.remove('sparkle');
                    }, 1000); // 1 second = 1000 milliseconds
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
