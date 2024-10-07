window.onload = function() {
    const starField = document.getElementById('star-field'); // Get the star-field container
    const numberOfStars = 600; // Define how many stars you want

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
    }

    // Function to update the star positions based on cursor or touch position
    function updateStarPositions(mouseX, mouseY) {
        const stars = document.querySelectorAll('.star'); // Get all the stars
        stars.forEach(star => {
            const starX = star.offsetLeft + star.clientWidth / 2;
            const starY = star.offsetTop + star.clientHeight / 2;

            const deltaX = mouseX - starX;
            const deltaY = mouseY - starY;

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // When the stars are within 100px, pull them directly to the cursor/touch
            if (distance < 100) {
                // Move the star directly to the cursor's position
                star.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            } else {
                // Allow the stars to drift back smoothly thanks to the CSS transition
                star.style.transform = ''; // Reset to original position with smooth transition
            }
        });
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
}
