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
                    star.style.backgroundColor = randomBlinkC
