// slider for chords page 
let slideIndex = 1;

// Function to show slides
function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('active');
}

// Function to handle clicking on "Previous" button
document.getElementById('prevButton').addEventListener('click', () => {
    plusSlides(-1);
});

// Function to handle clicking on "Next" button
document.getElementById('nextButton').addEventListener('click', () => {
    plusSlides(1);
});

// Function to handle clicking on pagination dots
const dots = document.querySelectorAll('.dot');
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide(index + 1);
    });
});

// Function to change slides forward or backward
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Function to jump to a specific slide
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Initialize the slideshow
showSlides(slideIndex);