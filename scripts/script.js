document.addEventListener('DOMContentLoaded', () => {
  console.log("External script loaded");

  // Find all play buttons and videos
  const playButtons = document.querySelectorAll('.playPauseButton');
  const videos = document.querySelectorAll('.poster-image');

  // Add event listeners to handle "Enter" key press and click for all play buttons
  playButtons.forEach((button, index) => {
    // Add event listener to handle "Enter" key press
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const video = videos[index]; // Get the associated video element
        toggleVideoPlay(video);
        video.focus(); // Focus on the video to enable browser video controls
      }
    });

    // Add event listener to handle button click
    button.addEventListener('click', () => {
      const video = videos[index]; // Get the associated video element
      toggleVideoPlay(video);
      video.focus(); // Focus on the video to enable browser video controls

        // Add the pointer-cursor class to the button
    button.classList.add('pointer-cursor');
    });
  });

  // Function to toggle video play/pause
  function toggleVideoPlay(video) {
    if (video.paused) {
      video.play();
      video.volume = 0.5; // Set the volume to 50% (adjust as needed)
      video.controls = true; // Enable browser video controls
      const button = video.previousElementSibling; // Get the play button
      button.style.display = 'none'; // Hide the play button when video is playing
    } else {
      video.pause();
    }
  }

  // Function to toggle modal open/close
  function toggleModal(open, modal) {
    if (open) {
      modal.style.display = 'flex';
      if (window.innerWidth >= 768) {
        modal.style.top = '60px';
        modal.style.left = '50%';
        modal.style.height = 'webkit-fill-available';
        modal.style.transform = 'translate(-50%, 1%)';
        modal.style.transition = 'none';
      } else {
        modal.style.top = `${calculateModalTop()}px`;
      }
    } else {
      modal.style.top = '100%';
      modal.style.left = '0';
      modal.style.transform = 'none';
      modal.style.transition = 'top 0.3s ease-in-out';
      modal.style.display = 'none';
      modalOverlay.removeEventListener('click', closeModal);
    }
  }

  // Function to handle tab clicks
  function handleTabClick(event) {
    const tabName = event.currentTarget.getAttribute('data-tab');
    const modalContainer = event.currentTarget.closest('.modal');
    const tabContents = modalContainer.querySelectorAll('.tab-content');
    const tabLinks = modalContainer.querySelectorAll('.tab-button');

    tabContents.forEach(content => content.style.display = 'none');
    tabLinks.forEach(link => link.classList.remove('active'));

    const selectedTabContent = modalContainer.querySelector(`#${tabName}`);
    selectedTabContent.style.display = 'block';
    event.currentTarget.classList.add('active');
  }

  // Function to update grid styles based on screen width
  function updateGridColumns() {
    const screenWidth = window.innerWidth;

    accordionContents.forEach((content, index) => {
      if (screenWidth <= SMALL_SCREEN) {
        content.style.gridTemplateColumns = "repeat(1, 1fr)";
        content.style.width = "-webkit-fill-available";
      } else if (screenWidth <= MEDIUM_SCREEN) {
        content.style.gridTemplateColumns = "repeat(2, 1fr)";
      } else {
        content.style.gridTemplateColumns = "repeat(3, 1fr)";
      }
    });
  }

  // Function to toggle chevron rotation
  function toggleChevronRotation(header) {
    const chevron = header.querySelector(".header-trigger");
    if (chevron) {
      chevron.style.transform = header.parentNode.classList.contains("active") ? "rotate(0deg)" : "rotate(180deg)";
    }
  }

  // Constants
  const SMALL_SCREEN = 768;
  const MEDIUM_SCREEN = 1090;

  const navToggle = document.querySelector(".hamburger-menu");
  const links = document.querySelector(".nav-menu");

  const video = document.querySelector('.poster-image');
  const modal = document.getElementById('modal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const openModalBtn = document.getElementById('openModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalTabButtons = document.querySelectorAll('.modal .tab-button');
  const firstModalTabButton = document.querySelector('.modal .tab-button');
  const videoContainers = document.querySelectorAll('.video-container');
  const openVideoModalBtn = document.getElementById('openVideoModal');
  const videoModal = document.getElementById('tabsVideoModal');
  const closeVideoModal = document.querySelector('.closeVideoModal');
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  const accordionContents = document.querySelectorAll(".accordion .grid-container");

  // Add event listeners
  navToggle.addEventListener('click', () => links.classList.toggle("show"));
  video.addEventListener('keydown', (event) => event.key === 'Enter' && toggleVideoPlay(video));

  openModalBtn.addEventListener('click', () => toggleModal(true, modal));
  closeModalBtn.addEventListener('click', () => toggleModal(false, modal));
  openModalBtn.addEventListener('keydown', (event) => event.key === 'Enter' && toggleModal(true, modal));
  closeModalBtn.addEventListener('keydown', (event) => event.key === 'Enter' && toggleModal(false, modal));

  modalTabButtons.forEach(button => button.addEventListener('click', handleTabClick));
  if (firstModalTabButton) {
    firstModalTabButton.click();
  }

  videoContainers.forEach(container => {
    const videoInContainer = container.querySelector('video');
    if (videoInContainer) {
      videoInContainer.removeAttribute('controls');
      container.addEventListener('click', () => toggleVideoPlay(videoInContainer));
    }
  });

  openVideoModalBtn.addEventListener('click', () => {
    toggleModal(true, videoModal);
  });

  openVideoModalBtn.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      toggleModal(true, videoModal);
    }
  });

  closeVideoModal.addEventListener('click', () => {
    toggleModal(false, videoModal);
    const videoInModal = videoModal.querySelector('video');
    videoInModal.pause();
  });

  closeVideoModal.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      toggleModal(false, videoModal);
      const videoInModal = videoModal.querySelector('video');
      videoInModal.pause();
    }
  });

  window.addEventListener('click', (event) => {
    if (event.target === videoModal) {
      toggleModal(false, videoModal);
      const videoInModal = videoModal.querySelector('video');
      videoInModal.pause();
    }
  });

  accordionHeaders.forEach((header, index) => {
    header.addEventListener("click", () => {
      const accordion = header.parentNode;

      if (accordion.classList.contains("active")) {
        accordion.classList.remove("active");
        accordionContents[index].style.display = "none";
      } else {
        accordionHeaders.forEach((h, i) => {
          if (i !== index) {
            h.parentNode.classList.remove("active");
            accordionContents[i].style.display = "none";
            toggleChevronRotation(h);
          }
        });

        accordion.classList.add("active");
        toggleChevronRotation(header);
        accordionContents[index].style.display = "grid";
        updateGridColumns();
      }
    });
  });

  // Initializations
  accordionHeaders[0].parentNode.classList.add("active");
  toggleChevronRotation(accordionHeaders[0]);
  accordionContents[0].style.display = "grid";
  updateGridColumns();
});

// Function to calculate modal top position
function calculateModalTop() {
  const viewportHeight = window.innerHeight;
  const desiredPercentage = 4; /* Adjust this percentage as needed */
  return (viewportHeight * desiredPercentage) / 100;
}





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


