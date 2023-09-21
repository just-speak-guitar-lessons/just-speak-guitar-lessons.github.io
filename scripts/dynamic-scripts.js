// Advanced Tuner page 
document.addEventListener('DOMContentLoaded', () => {
    console.log("External script loaded");

    // Function to play audio
    function play(audioSrc) {
        const audio = new Audio(audioSrc);
        audio.play();
    }

    // Get all the guitar selection buttons
    const guitarButtons = document.querySelectorAll('.guitar-select-button');

    // Get all the interactive placeholders
    const placeholders = document.querySelectorAll('.interactive-placeholder');

    // Get all the grid items
    const gridItems = document.querySelectorAll('.grid-item');

    // Hide all placeholders except the "Acoustic Guitar" placeholder initially
    placeholders.forEach((placeholder) => {
        if (!placeholder.classList.contains('acoustic')) {
            placeholder.style.display = 'none';
        }
    });

    // Add the outline to the default "Acoustic Guitar" grid item
    gridItems[0].classList.add('active-grid-item');

    // Add a click event listener to each guitar selection button
    guitarButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Hide all placeholders
            placeholders.forEach((placeholder) => {
                placeholder.style.display = 'none';
            });

            // Remove the outline from all grid items
            gridItems.forEach((gridItem) => {
                gridItem.classList.remove('active-grid-item');
            });

            // Show the selected placeholder
            placeholders[index].style = 'display:flex';

            // Add the outline to the selected grid item
            gridItems[index].classList.add('active-grid-item');
        });
    });

});