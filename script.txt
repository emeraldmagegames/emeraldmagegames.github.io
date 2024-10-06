const starField = document.getElementById('star-field'); // Get the star-field container
const numberOfStars = 400; // Define how many stars you want

// Generate stars and position them randomly
for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = Math.random() * window.innerHeight + 'px';
    starField.appendChild(star);
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

        // Apply "gravity" effect if the star is within a certain distance of the cursor
        if (distance < 150) {
            const angle = Math.atan2(deltaY, deltaX);
            const moveX = Math.cos(angle) * 5; // Speed of movement
            const moveY = Math.sin(angle) * 5;

            star.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
            star.style.transform = ''; // Reset position when far away from the cursor
        }
    });
});
