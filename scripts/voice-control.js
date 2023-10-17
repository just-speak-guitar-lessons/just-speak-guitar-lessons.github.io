document.addEventListener('DOMContentLoaded', () => {
  console.log('External script loaded');

  // Check if Annyang is available and initialized
  if (typeof annyang !== 'undefined' && annyang.isListening()) {
    var commands = {
      'open modal': function () {
        const vcModal = document.getElementById('modal');
        if (vcModal) {
          vcModal.style.display = 'flex';
          alert("Success");
        }
      },
    };

    // Add voice commands
    annyang.addCommands(commands);

    // Handle error events
    annyang.addCallback('error', function (error) {
      console.error('Annyang error:', error);
    });

    // Start Annyang with continuous listening
    annyang.start({ autoRestart: true, continuous: true });

    // Log a message when Annyang is listening
    annyang.addCallback('start', function () {
      console.log('Annyang is listening...');
    });
  } else {
    console.log('Annyang is not defined or not ready. Check if the library is properly loaded.');
  }
});
