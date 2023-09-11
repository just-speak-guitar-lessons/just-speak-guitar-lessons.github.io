document.addEventListener('DOMContentLoaded', () => {

  const navToggle = document.querySelector(".hamburger-menu");
  const links = document.querySelector(".nav-menu");

  navToggle.addEventListener('click', function () {
    links.classList.toggle("show");
  })

  function goBack() {
    window.history.back();
  }

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


  // modal tab section 
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');

      tabButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      tabContents.forEach(content => {
        content.style.display = 'none';
      });

      button.classList.add('active');
      document.getElementById(tabId).style.display = 'flex';
    });
  });

  // Initialize the first tab as active
  tabButtons[0].click();


function play(sound) {
  var audio = document.getElementById("audio");

  if (audio) {
    audio.setAttribute('src', sound);
    audio.play();
  }
}
// end of code for navigation and modal interactions

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


