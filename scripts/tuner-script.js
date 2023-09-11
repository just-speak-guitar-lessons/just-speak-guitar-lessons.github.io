document.addEventListener("DOMContentLoaded", function () {
    var toggleButton = document.getElementById("toggle-tuner");
    var correlation_worker = null;
    var audio_context = null;
    var isTunerRunning = false;
    var noiseGateThreshold = 0.01; // Adjust the threshold as needed

    var tuningStatusText = document.getElementById("tuning-status-text");
    var noteNameText = document.getElementById("note-name"); // Use "note-name" instead of "play-string-text"
    var tunerContainer = document.querySelector(".guitar-tuner"); // Get the tuner container element

    function updateTuningStatusText() {
        if (isTunerRunning) {
            tuningStatusText.style.display = "none";
            noteNameText.style.display = "block"; // Show the detected note text
        } else {
            if (audio_context) {
                tuningStatusText.style.display = "block";
                noteNameText.style.display = "none"; // Hide the detected note text
                // Clear the detected note when switching off the tuner
                noteNameText.innerHTML = "";
                // Reset the background color to the original color when switching off
                tunerContainer.style.backgroundColor = ""; // Set to the original color
            } else {
                tuningStatusText.style.display = "none";
                noteNameText.style.display = "block";
            }
        }
    }

    toggleButton.addEventListener("click", function () {
        if (isTunerRunning) {
            if (correlation_worker) {
                correlation_worker.terminate();
                correlation_worker = null;
            }
            if (audio_context) {
                audio_context.close().then(function () {
                    audio_context = null;
                });
            }
            toggleButton.textContent = "Start Tuner";
            isTunerRunning = false;

            // Reset the background color to the original color when the tuner is switched off
            tunerContainer.style.backgroundColor = ""; // Set to the original color
        } else {
            initialize();
            toggleButton.textContent = "Stop Tuner";
            isTunerRunning = true;
        }

        updateTuningStatusText(); // Update the text visibility
    });

    function initialize() {
        var get_user_media = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        get_user_media.call(navigator, { "audio": true }, use_stream, function () { });
    }

    function use_stream(stream) {
        audio_context = new AudioContext();
        var microphone = audio_context.createMediaStreamSource(stream);
        window.source = microphone;
        var script_processor = audio_context.createScriptProcessor(1024, 1, 1);

        script_processor.connect(audio_context.destination);
        microphone.connect(script_processor);

        var buffer = [];
        var sample_length_milliseconds = 100;
        var recording = true;

        window.capture_audio = function (event) {
            if (!recording)
                return;

            var inputBuffer = event.inputBuffer.getChannelData(0);

            // Check if the maximum amplitude in the buffer is below the noise gate threshold
            if (Math.max.apply(null, inputBuffer) < noiseGateThreshold) {
                return; // Ignore low-amplitude audio
            }

            buffer = buffer.concat(Array.prototype.slice.call(inputBuffer));

            if (buffer.length > sample_length_milliseconds * audio_context.sampleRate / 1000) {
                recording = false;

                correlation_worker = new Worker("scripts/correlation_worker.js");
                correlation_worker.addEventListener("message", interpret_correlation_result);

                correlation_worker.postMessage({
                    "timeseries": buffer,
                    "test_frequencies": test_frequencies,
                    "sample_rate": audio_context.sampleRate
                });

                buffer = [];
                setTimeout(function () { recording = true; }, 250);
            }
        };

        script_processor.onaudioprocess = window.capture_audio;
    }

    function interpret_correlation_result(event) {
        if (event.data) { // Check if there's valid data in the event
            var timeseries = event.data.timeseries;
            var frequency_amplitudes = event.data.frequency_amplitudes;
    
            // Remove or comment out the code related to drawing bars here.
            var maximum_index = -1;
            var maximum_magnitude = 0;
            for (var i = 0; i < frequency_amplitudes.length; i++) {
                var magnitude = frequency_amplitudes[i][0] * frequency_amplitudes[i][0] +
                                frequency_amplitudes[i][1] * frequency_amplitudes[i][1];
    
                if (magnitude > maximum_magnitude) {
                    maximum_magnitude = magnitude;
                    maximum_index = i;
                }
            }
    
            var average = maximum_magnitude / frequency_amplitudes.length;
            var confidence = maximum_magnitude / average;
            var confidence_threshold = 10;
    
            if (confidence > confidence_threshold) {
                var dominant_frequency = test_frequencies[maximum_index];
    
                // Check if the note name contains "(a bit sharp)" or "(a bit flat)"
                if (dominant_frequency.name.includes("(a bit sharp)") || dominant_frequency.name.includes("(a bit flat)")) {
                    // Set the background color to "#990000" for sharp or flat notes
                    tunerContainer.style.backgroundColor = "#990000";
                    // Set the identified note text color to white for sharp or flat notes
                    noteNameText.style.color = "white";
                    // Increase the font size of the identified note text
                    noteNameText.style.fontSize = "110%"; // 10% bigger
                } else {
                    // Set the background color to "#C1E1C1" for natural notes
                    tunerContainer.style.backgroundColor = "#C1E1C1";
                    // Reset the identified note text color to its default
                    noteNameText.style.color = "";
                    // Reset the font size of the identified note text
                    noteNameText.style.fontSize = ""; // Default size
                }
    
                noteNameText.innerHTML = dominant_frequency.name;
            } else {
                noteNameText.innerHTML = "";
                // Reset the background color when no note is detected
                tunerContainer.style.backgroundColor = "";
                // Reset the identified note text color to its default
                noteNameText.style.color = "";
                // Reset the font size of the identified note text
                noteNameText.style.fontSize = ""; // Default size
            }
        }
    }
    
    var C2 = 65.41;
    var notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    var test_frequencies = [];
    for (var i = 0; i < 120; i++) { // Increased the loop count for more notes
        var note_frequency = C2 * Math.pow(2, i / 12);
        var note_name = notes[i % 12];
        var note = { "frequency": note_frequency, "name": note_name };
        var just_above = { "frequency": note_frequency * Math.pow(2, 1 / 48), "name": note_name + "<br>(a bit sharp)" };
        var just_below = { "frequency": note_frequency * Math.pow(2, -1 / 48), "name": note_name + "<br>(a bit flat)" };
        test_frequencies = test_frequencies.concat([just_below, note, just_above]);
    }
});