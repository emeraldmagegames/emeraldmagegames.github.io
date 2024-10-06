window.onload = function() {
    const starField = document.getElementById('star-field'); // Get the star-field container
    const numberOfStars = 100; // Define how many stars you want

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

        // Append the star to the star-field container
        starField.appendChild(star);

        // Make each star blink randomly every 3 seconds
        setInterval(() => {
            const chance = Math.random(); // Generates a random number between 0 and 1
            if (chance < 0.1) { // 1 in 10 chance to blink
                star.style.animation = `blink 1s ease-in-out 1`; // Blink animation lasts 1 second
            } else {
                star.style.animation = `none`; // Reset to no animation
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

            // Stronger gravity: Stars move faster towards the mouse if close (within 100px)
            if (distance < 100) {
                const angle = Math.atan2(deltaY, deltaX);
                const moveX = Math.cos(angle) * 10; // Increase the speed of movement
                const moveY = Math.sin(angle) * 10;

                // Apply gravity with increased speed when the mouse is near
                star.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                // Allow the stars to drift back smoothly thanks to the CSS transition
                star.style.transform = ''; // Reset to original position with smooth transition
            }
        });
    });
}
