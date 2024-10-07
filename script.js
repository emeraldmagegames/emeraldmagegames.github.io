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

        // Apply independent behavior with random timers for each star
        setRandomBehavior(star, originalColor);
    }

    // Function to update star's behavior with a random chance to blink, change color, or sparkle
    function setRandomBehavior(star, originalColor) {
        setInterval(() => {
            // Random chance for the star to perform an action
            const randomAction = Math.floor(Math.random() * 4); // 0 = do nothing, 1 = blink, 2 = change color, 3 = sparkle

            switch(randomAction) {
                case 1:
                    blinkStar(star);
                    break;
                case 2:
                    changeColor(star, originalColor);
                    break;
                case 3:
                    sparkleStar(star);
                    break;
                default:
                    // Do nothing
                    break;
            }
        }, Math.random() * 3000 + 1000); // Random timer between 1 and 4 seconds
    }

    // Function to make the star blink
    function blinkStar(star) {
        star.style.animation = 'blink 1s infinite ease-in-out';
        setTimeout(() => {
            star.style.animation = ''; // Reset to stop blinking
        }, 1000); // Blink for 1 second
    }

    // Function to change the star's color temporarily
    function changeColor(star, originalColor) {
        const colors = ['#ffcccb', '#add8e6', '#ffffcc']; // Pale red, light blue, pale yellow
        const newColor = colors[Math.floor(Math.random() * colors.length)];
        star.style.backgroundColor = newColor;

        // Reset to the original color after 1 second
        setTimeout(() => {
            star.style.backgroundColor = originalColor;
        }, 1000);
    }

    // Function to make the star sparkle
    function sparkleStar(star) {
        star.style.transform = 'scale(1.5)'; // Increase size to simulate sparkling
        star.style.opacity = '1'; // Brighten up the star

        // Reset the star after sparkling
        setTimeout(() => {
            star.style.transform = '';
            star.style.opacity = '0.8'; // Return to normal opacity
        }, 500); // Sparkle for 0.5 seconds
    }

    // Track mouse movement for gravity
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        updateStarPositions(mouseX, mouseY); // Update stars based on mouse movement
    });

    // Function to update the star positions based on cursor or touch position
    function updateStarPositions(mouseX, mouseY) {
        const stars = document.querySelectorAll('.star'); // Get all the stars
        stars.forEach(star => {
            const starX = star.offsetLeft + star.clientWidth / 2;
            const starY = star.offsetTop + star.clientHeight / 2;

            const deltaX = mouseX - starX;
            const deltaY = mouseY - starY;

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // When the stars are within 75px, pull them directly to the cursor/touch
            if (distance < 75) {
                // Move the star directly to the cursor's position
                star.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            } else {
                // Allow the stars to drift back smoothly thanks to the CSS transition
                star.style.transform = ''; // Reset to original position with smooth transition
            }
        });
    }
}
