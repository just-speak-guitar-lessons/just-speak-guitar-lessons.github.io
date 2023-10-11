document.addEventListener('DOMContentLoaded', () => {
  console.log('External script loaded')

  // Constants
  const SMALL_SCREEN = 743
  const MEDIUM_SCREEN = 990

  // Elements
  const playButtons = document.querySelectorAll('.playPauseButton')
  const videos = document.querySelectorAll('.poster-image')
  const modal = document.getElementById('modal')
  const modalOverlay = document.querySelector('.modal-overlay')
  const openModalBtn = document.getElementById('openModal')
  const closeModalBtn = document.getElementById('closeModal')
  const videoContainers = document.querySelectorAll('.video-container')
  const openVideoModalBtn = document.getElementById('openVideoModal')
  const videoModal = document.getElementById('tabsVideoModal')
  const closeVideoModal = document.querySelector('.closeVideoModal')
  const accordionHeaders = document.querySelectorAll('.accordion-header')
  const accordionContents = document.querySelectorAll(
    '.accordion .grid-container'
  )

  // Event Listeners
  function addPlayButtonListeners () {
    playButtons.forEach((playButton, index) => {
      playButton.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          const video = videos[index]
          if (video && video.paused) {
            toggleVideoPlay(video)
            video.focus()
          }
          event.preventDefault()
        }
      })

      playButton.addEventListener('click', () => {
        const video = videos[index]
        if (video && video.paused) {
          toggleVideoPlay(video)
          video.focus()
        }
        playButton.classList.add('pointer-cursor')
      })
    })
  }

  // Get all tab buttons and tab content
  const tabButtons = document.querySelectorAll('.tab-button')
  const tabContents = document.querySelectorAll('.tab-content')

  // Set the default tab to be open (tab1)
  tabContents[0].style.display = 'block'

  // Add click event listeners to tab buttons
  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Hide all tab content
      tabContents.forEach(content => (content.style.display = 'none'))

      // Show the selected tab content based on data-tab attribute
      const selectedTab = button.getAttribute('data-tab')
      const correspondingContent = document.getElementById(selectedTab)
      correspondingContent.style.display = 'block'

      // Remove 'active' class from all tab buttons
      tabButtons.forEach(tabButton => tabButton.classList.remove('active'))

      // Add 'active' class to the clicked tab button
      button.classList.add('active')
    })
  })

  function addModalListeners () {
    if (openModalBtn && closeModalBtn) {
      openModalBtn.addEventListener('click', () => toggleModal(true, modal))
      openModalBtn.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          toggleModal(true, modal)
        }
      })
      closeModalBtn.addEventListener('click', () => toggleModal(false, modal))
      closeModalBtn.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          toggleModal(false, modal)
        }
      })

      // Add other modal-related event listeners
    }
  }

  function addVideoListeners () {
    videoContainers.forEach(container => {
      const videoInContainer = container.querySelector('video')
      if (videoInContainer) {
        videoInContainer.removeAttribute('controls')
        container.addEventListener('click', () =>
          toggleVideoPlay(videoInContainer)
        )
      }
    })

    if (videoModal && openVideoModalBtn && closeVideoModal) {
      openVideoModalBtn.addEventListener('click', () => {
        toggleModal(true, videoModal)
      })

      openVideoModalBtn.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          toggleModal(true, videoModal)
        }
      })

      closeVideoModal.addEventListener('click', () => {
        toggleModal(false, videoModal)
        const videoInModal = videoModal.querySelector('video')
        if (videoInModal) {
          videoInModal.pause()
        }
      })

      closeVideoModal.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          toggleModal(false, videoModal)
          const videoInModal = videoModal.querySelector('video')
          if (videoInModal) {
            videoInModal.pause()
          }
        }
      })

      window.addEventListener('click', event => {
        if (event.target === videoModal) {
          toggleModal(false, videoModal)
          const videoInModal = videoModal.querySelector('video')
          if (videoInModal) {
            videoInModal.pause()
          }
        }
      })
    }
  }

  // Add click event listeners to video containers to toggle active state
  videoContainers.forEach(container => {
    container.addEventListener('click', function () {
      // Remove the 'active' class from all video containers
      videoContainers.forEach(vc => vc.classList.remove('active'))
      // Add the 'active' class to the clicked video container
      container.classList.add('active')
    })
  })

  function addAccordionListeners () {
    if (accordionHeaders.length > 0) {
      accordionHeaders.forEach((header, index) => {
        header.addEventListener('click', () => {
          const accordion = header.parentNode

          if (accordion.classList.contains('active')) {
            accordion.classList.remove('active')
            accordionContents[index].style.display = 'none'
          } else {
            accordionHeaders.forEach((h, i) => {
              if (i !== index) {
                h.parentNode.classList.remove('active')
                accordionContents[i].style.display = 'none'
                toggleChevronRotation(h)
              }
            })

            accordion.classList.add('active')
            toggleChevronRotation(header)
            accordionContents[index].style.display = 'grid'
            updateGridColumns()
          }
        })

        header.addEventListener('keydown', function (event) {
          if (event.key === 'Enter' || event.keyCode === 13) {
            this.click()
          }
        })
      })

      // Initializations
      accordionHeaders[0].parentNode.classList.add('active')
      toggleChevronRotation(accordionHeaders[0])
      accordionContents[0].style.display = 'grid'
      updateGridColumns()
    }
  }

  // Function to toggle video play/pause
  function toggleVideoPlay (video) {
    if (video && video.paused) {
      video.play()
      video.volume = 0.5
      video.controls = true
      const button = video.previousElementSibling
      if (button) {
        button.style.display = 'none'
      }
    } else if (video) {
      video.pause()
    }
  }

  // Function to toggle modal open/close
  function toggleModal (open, modal) {
    if (open) {
      modal.style.display = 'flex'
      if (window.innerWidth >= 768) {
        modal.style.top = '60px'
        modal.style.left = '50%'
        modal.style.height = 'webkit-fill-available'
        modal.style.transform = 'translate(-50%, 1%)'
        modal.style.transition = 'none'
        modal.style.zIndex = '1'
      }
    } else {
      modal.style.top = '100%'
      modal.style.left = '0'
      modal.style.transform = 'none'
      modal.style.transition = 'top 0.3s ease-in-out'
      modal.style.display = 'none'
      modalOverlay.removeEventListener('click', closeModal)
    }
  }

  // Other functions for handling tab clicks, updating grid columns, toggling chevron rotation, etc.

  // Initializations
  addPlayButtonListeners()
  addModalListeners()
  addVideoListeners()
  addAccordionListeners()

  // Additional setup and initialization code
})

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
