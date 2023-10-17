document.addEventListener('DOMContentLoaded', () => {
  console.log('External script loaded')

  // mobile nav logic
  const hamburgerButton = document.getElementById('hamburger-menu')
  const iconBar = document.getElementById('icon-bar')
  const bar1 = document.getElementById('bar1')
  const bar2 = document.getElementById('bar2')
  const bar3 = document.getElementById('bar3')
  let isMenuOpen = false

  hamburgerButton.addEventListener('click', function () {
    const navMenu = document.getElementById('nav-menu')
    isMenuOpen = !isMenuOpen
    navMenu.classList.toggle('show')

    if (isMenuOpen) {
      // Set cross icon state
      bar1.style.transform = 'rotate(-45deg) translate(-7px, 4px)'
      bar2.style.opacity = '0'
      bar3.style.transform = 'rotate(45deg) translate(-5px, -7px)'
    } else {
      // Set hamburger icon state
      bar1.style.transform = 'none'
      bar2.style.opacity = '1'
      bar3.style.transform = 'none'
    }
  })

  const backBtns = document.querySelectorAll('#backBtn')
  const customAlert = document.getElementById('custom-alert')
  const closeAlertButton = document.getElementById('close-alert')

  // Check if customAlert and closeAlertButton exist before adding event listeners
  if (customAlert && closeAlertButton) {
    backBtns.forEach(backBtn => {
      backBtn.addEventListener('click', () => {
        goBack()
      })

      backBtn.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.keyCode === 13) {
          event.preventDefault()
          goBack()
        }
      })
    })

    closeAlertButton.addEventListener('click', () => {
      customAlert.style.display = 'none'
    })
  }

  function goBack () {
    if (window.history.length > 1) {
      const previousUrl = document.referrer

      if (
        customAlert &&
        !previousUrl.startsWith('https://just-speak-guitar-lessons.github.io/')
      ) {
        customAlert.style.display = 'flex'
      } else {
        window.history.back(1)
      }
    } else if (customAlert) {
      customAlert.style.display = 'flex'
    }
  }

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
  const accordionContents = document.querySelectorAll('.accordion .grid-container')

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

  // Add the "active" class to the first tab button and its content when the page loads
  tabButtons[0].classList.add('active')
  tabContents[0].classList.add('active')

  // Add click event listeners to tab buttons
  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Get the data-tab attribute of the clicked tab button
      const selectedTab = button.getAttribute('data-tab')

      // Toggle the 'active' class on all tab buttons with the same data-tab attribute
      tabButtons.forEach(tabButton => {
        if (tabButton.getAttribute('data-tab') === selectedTab) {
          tabButton.classList.add('active')
        } else {
          tabButton.classList.remove('active')
        }
      })

      // Toggle the 'active' class on all tab contents with the same data-tab attribute
      tabContents.forEach(content => {
        if (content.id === selectedTab) {
          content.classList.add('active')
        } else {
          content.classList.remove('active')
        }
      })
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
            toggleChevronRotation(header) // Toggle the chevron rotation
          } else {
            accordionHeaders.forEach((h, i) => {
              if (i !== index) {
                h.parentNode.classList.remove('active')
                accordionContents[i].style.display = 'none'
                toggleChevronRotation(h) // Toggle the chevron rotation for other headers
              }
            })

            accordion.classList.add('active')
            toggleChevronRotation(header) // Toggle the chevron rotation
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
  function updateGridColumns() {
    const gridContainer = document.querySelector('.accordion.active .grid-container');
  
    if (window.innerWidth < SMALL_SCREEN) {
      // For small screens
      gridContainer.style.gridTemplateColumns = '1fr';
    } else if (window.innerWidth < MEDIUM_SCREEN) {
      // For medium screens
      gridContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else {
      // For larger screens
      gridContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
    }
  }
  // Function to toggle chevron rotation
  function toggleChevronRotation (header) {
    const chevron = header.querySelector('.chevron')
    if (chevron) {
      if (
        chevron.style.transform === 'none' ||
        chevron.style.transform === ''
      ) {
        chevron.style.transform = 'rotate(180deg)'
      } else {
        chevron.style.transform = 'none'
      }
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
