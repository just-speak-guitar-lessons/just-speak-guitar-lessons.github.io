document.addEventListener('DOMContentLoaded', () => {
  console.log("External script loaded");

  const navToggle = document.querySelector(".hamburger-menu");
  const links = document.querySelector(".nav-menu");

  navToggle.addEventListener('click', function () {
    links.classList.toggle("show");
  })

  // modal functionality 
  const openModalBtn = document.getElementById('openModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modal = document.getElementById('modal');
  const modalOverlay = document.querySelector('.modal-overlay'); // Add this line

  function openModal() {
    modal.style.display = 'flex';

    if (window.innerWidth >= 768) {
      modal.style.top = '60px';
      modal.style.left = '50%';
      modal.style.height = 'webkit-fill-available'; // Center horizontally
      modal.style.transform = 'translate(-50%, 1%)'; /* Center the modal */

      // Remove the sliding animation by setting transition to none
      modal.style.transition = 'none';
    } else {
      const desiredTop = calculateModalTop();
      modal.style.top = `${desiredTop}px`;
    }
  }

  function closeModal() {
    modal.style.top = '100%';
    modal.style.left = '0'; // Reset left position
    modal.style.transform = 'none'; /* Reset transform when closing modal */
    modal.style.transition = 'top 0.3s ease-in-out'; // Restore transition
    modal.style.display = 'none'; 
    // Remove the event listener after closing the modal
    modalOverlay.removeEventListener('click', closeModal);
  }

  function calculateModalTop() {
    const viewportHeight = window.innerHeight;
    const desiredPercentage = 4; /* Adjust this percentage as needed */
    return (viewportHeight * desiredPercentage) / 100;
  }

  openModalBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);


// Function to handle modal tab clicks
function handleModalTabClick(event) {
  const tabName = event.currentTarget.getAttribute('data-tab');
  const modalContainer = event.currentTarget.closest('.modal');
  const tabContents = modalContainer.querySelectorAll('.tab-content');

  // Hide all modal tab contents
  tabContents.forEach(content => {
    content.style.display = 'none';
  });

  // Deactivate all modal tab buttons
  const tabLinks = modalContainer.querySelectorAll('.tab-button');
  tabLinks.forEach(link => {
    link.classList.remove('active');
  });

  // Display the selected modal tab content and activate the button
  const selectedTabContent = modalContainer.querySelector(`#${tabName}`);
  selectedTabContent.style.display = 'block';
  event.currentTarget.classList.add('active');
}

// Add click event listeners to modal tab buttons
const modalTabButtons = document.querySelectorAll('.modal .tab-button');
modalTabButtons.forEach(button => {
  button.addEventListener('click', handleModalTabClick);
});

// Initialize the first modal tab as active for the modal
const firstModalTabButton = document.querySelector('.modal .tab-button');
if (firstModalTabButton) {
  firstModalTabButton.click();
}

/// Function to handle tab clicks for the new tabs
function handleNewTabClick(event) {
  const tabName = event.currentTarget.getAttribute('data-tab');
  const tabsContainer = event.currentTarget.closest('.flex-col');
  const tabContents = tabsContainer.querySelectorAll('.tab-content');
  const tabContentsMain = tabsContainer.querySelectorAll('.tab-content_main');

  // Hide all new tab contents
  tabContents&&tabContentsMain.forEach(content => {
    content.style.display = 'none';
  });

  // Deactivate all new tab links
  const tabLinks = tabsContainer.querySelectorAll('.tab-link');
  tabLinks.forEach(link => {
    link.classList.remove('active');
  });

  // Display the selected new tab content and activate the link
  const selectedTabContent = tabsContainer.querySelector(`#${tabName}`);
  selectedTabContent.style.display = 'block';
  event.currentTarget.classList.add('active');
}

// Add click event listeners to new tab links
const newTabLinks = document.querySelectorAll('.flex-col .tab-link');
newTabLinks.forEach(link => {
  link.addEventListener('click', handleNewTabClick);
});

// Initialize the first new tab as active for the new tabs
const firstNewTabLink = document.querySelector('.flex-col .tab-link');
if (firstNewTabLink) {
  firstNewTabLink.click();
}


// Advanced Tuner page 

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

  // carousel functionality 
  // const testimonials = document.querySelector('.open-chord-carousel');
  // const scroller = testimonials.querySelector('.scroller');
  // const nextBtn = testimonials.querySelector('.btn.next');
  // const prevBtn = testimonials.querySelector('.btn.prev');
  // const itemWidth = testimonials.querySelector('.scroller-item').clientWidth;

  // nextBtn.addEventListener('click', scrollToNextItem);
  // prevBtn.addEventListener('click', scrollToPrevItem);

  // function scrollToNextItem() {
  //     if (scroller.scrollLeft < (scroller.scrollWidth - itemWidth))
  //         // The scroll position is not at the beginning of last item
  //         scroller.scrollBy({
  //             left: itemWidth,
  //             top: 0,
  //             behavior: 'smooth'
  //         });
  //     else
  //         // Last item reached. Go back to first item by setting scroll position to 0
  //         scroller.scrollTo({
  //             left: 0,
  //             top: 0,
  //             behavior: 'smooth'
  //         });
  // }

  // function scrollToPrevItem() {
  //     if (scroller.scrollLeft != 0)
  //         // The scroll position is not at the beginning of first item
  //         scroller.scrollBy({
  //             left: -itemWidth,
  //             top: 0,
  //             behavior: 'smooth'
  //         });
  //     else
  //         // This is the first item. Go to last item by setting scroll position to scroller width
  //         scroller.scrollTo({
  //             left: scroller.scrollWidth,
  //             top: 0,
  //             behavior: 'smooth'
  //         });
  // }

  // Voice command 

  //     if (annyang) {

  //         var commands = {
  //             //Opens the voice command phrase menu
  //             'open help center': function () {
  //                 $("#help-modal").toggleClass('help-center')
  //             },
  //             'close': function () {
  //                 $("#help-modal").toggleClass('help-center')
  //             },
  //             //commands to open pages
  //             'go back': function () {
  //                 window.history.back(1)
  //             },
  //             'go forward': function () {
  //                 window.history.go(1);
  //             },
  //             'home': function () {
  //                 window.location.assign("/index.html")
  //             },
  //             'open basics': function () {
  //                 window.location.assign("/basics.html")
  //             },
  //             'open frets': function () {
  //                 window.location.assign("/frets.html")
  //             },
  //             'open chords': function () {
  //                 window.location.assign("/chords.html")
  //             },
  //             'open rhythm': function () {
  //                 window.location.assign("/rhythm.html")
  //             },
  //             'open lead': function () {
  //                 window.location.assign("/lead.html")
  //             },
  //             'open second basics lesson': function () {
  //                 window.location.assign("/basics2.html")
  //             },
  //             'finger positioning': function () {
  //                 window.location.assign("/frets2.html")
  //             },
  //             'the power chord': function () {
  //                 window.location.assign("/chords2.html")
  //             },
  //             'first music lesson': function () {
  //                 window.location.assign("/rhythm2.html")
  //             },
  //             'reading music': function () {
  //                 window.location.assign("/lead2.html")
  //             },

  //             'go to the top': function () {
  //                 $('html, body').animate({
  //                     scrollTop: 0
  //                 }, 0);
  //             },
  //             'go to the bottom': function () {
  //                 $('html, body').animate({
  //                     scrollTop: 9999
  //                 }, 0);
  //             },
  //             //opens the mobile menu
  //             'open menu': function () {
  //                 $("#mobile-menu").toggleClass('mobile-navigation')
  //             },
  //             'scroll up': function () {
  //                 $('html, body').animate({
  //                     scrollTop: $("html").scrollTop() - 540
  //                 }, 'easeInOutBack');
  //             },
  //             'scroll down': function () {
  //                 $('html, body').animate({
  //                     scrollTop: $("html").scrollTop() + 540
  //                 }, 'easeInOutBack');

  //             },
  //             'E': function () {
  //                 $('tuner-E').click('')
  //             }
  //         };
  //         annyang.addCommands(commands);
  //         annyang.start();
  //         //       // Tell KITT to use annyang
  //         SpeechKITT.annyang();
  //         //   // Define a stylesheet for KITT to use
  //         // SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/1.0.0/themes/flat.css');
  //         //   // Render KITT's interface
  //         SpeechKITT.vroom();
  //     }
  //     $("#skitt-listening-text__instructions").text("say \"open help center\"");


