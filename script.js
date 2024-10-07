window.onload = function() {
    const starField = document.getElementById('star-field'); // Get the star-field container
    const numberOfStars = 400;  // Number of stars to generate

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
    }

    // Add gravity-like interaction with stars
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

            // When the stars are within 100px of the cursor, pull them towards it
            if (distance < 100) {
                star.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            } else {
                // Allow the stars to drift back smoothly to their original position
                star.style.transform = ''; // Reset the transform to none
            }
        });
    });

    // Track touch movement for gravity-like interaction
    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0]; // Get the first touch point
        const touchX = touch.clientX;
        const touchY = touch.clientY;

        const stars = document.querySelectorAll('.star'); // Get all the stars
        stars.forEach(star => {
            const starX = star.offsetLeft + star.clientWidth / 2;
            const starY = star.offsetTop + star.clientHeight / 2;

            const deltaX = touchX - starX;
            const deltaY = touchY - starY;

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // When the stars are within 100px of the touch point, pull them towards it
            if (distance < 100) {
                star.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            } else {
                star.style.transform = ''; // Reset to original position
            }
        });
    });
};
