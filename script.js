window.onload = function() {
    const starField = document.getElementById('star-field'); // Get the star-field container
    const numberOfStars = 400; // Define how many stars you want

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

        // Randomize animation duration (between 4 and 10 seconds for variation)
        const duration = Math.random() * 6 + 4; // Generates a number between 4s and 10s
        star.style.animationDuration = `${duration}s`;

        starField.appendChild(star); // Append the star to the star-field container
    }

    // Track mouse movement
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

            if (distance < 100) {
                const angle = Math.atan2(deltaY, deltaX);
                const moveX = Math.cos(angle) * 5;
                const moveY = Math.sin(angle) * 5;

                // Combine the gravity transform with the existing bobbing animation
                star.style.transform = `translate(var(--translateX), var(--translateY)) translate(${moveX}px, ${moveY}px)`;
            } else {
                // Only apply the bobbing effect when the cursor is far away
                star.style.transform = `translate(var(--translateX), var(--translateY))`;
            }
        });
    });
}
