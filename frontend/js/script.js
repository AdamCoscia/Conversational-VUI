/**
 * CS 6456 Group Project
 * Georgia Tech, Fall 2021
 * Adam Coscia
 *
 * References:
 *   - Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
 *   - Using the Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
 *   - Demos: https://github.com/mdn/web-speech-api
 */

// Input
var startBtn = document.querySelector("#start-btn");
var testBtn = document.querySelector("#test-btn");

// Speech Synthesis
var synth = window.speechSynthesis;
var voiceSelect = document.querySelector("#voice-select");
var pitch = document.querySelector("#pitch");
var pitchValue = document.querySelector("#pitch-value");
var rate = document.querySelector("#rate");
var rateValue = document.querySelector("#rate-value");
var voices = [];

// Speech Recognition
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

// Output
var output = document.querySelector("#output");
var systemText = "hello";

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase();
    const bname = b.name.toUpperCase();
    if (aname < bname) {
      return -1;
    } else if (aname == bname) {
      return 0;
    } else {
      return +1;
    }
  });
  const selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = "";
  for (i = 0; i < voices.length; i++) {
    var option = document.createElement("option");
    option.textContent = voices[i].name + " (" + voices[i].lang + ")";

    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

function testSpeech() {
  startBtn.disabled = true;
  startBtn.textContent = "Recording in progress";

  const phrase = "hello";
  var grammar = "#JSGF V1.0; grammar phrase; public <phrase> = " + phrase + ";";
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function (event) {
    const speechResult = event.results[0][0].transcript.toLowerCase();
    const confidence = event.results[0][0].confidence;
    const text = `
      <div class="flex-row">
        <div class="flex-col col1">
          <span>User</span>
        </div>
        <div class="flex-col col2">
          <span>${(confidence * 100).toFixed(2) + "%"}</span>
        </div>
        <div class="flex-col col3">
          <span>${speechResult}</span>
        </div>
      </div>
    `;
    output.insertAdjacentHTML("beforeend", text);
  };

  recognition.onspeechend = function () {
    recognition.stop();
    startBtn.disabled = false;
    startBtn.textContent = "Start recording";
  };

  recognition.onerror = function (event) {
    startBtn.disabled = false;
    startBtn.textContent = "Start recording";
    const text = `
      <div class="flex-row" style="color: red">
        <div class="flex-col col1">
          <span>System</span>
        </div>
        <div class="flex-col col2">
          <span>Error</span>
        </div>
        <div class="flex-col col3">
          <span>Error occurred in recognition: ${event.error}</span>
        </div>
      </div>
    `;
    output.insertAdjacentHTML("beforeend", text);
  };
}

function speak(msg, confidence, test) {
  if (synth.speaking) {
    return;
  }
  testBtn.disabled = true;
  testBtn.textContent = "Speaking ...";
  if (msg !== "") {
    let text;
    if (test) {
      text = `
        <div class="flex-row" style="color: #1976d2">
          <div class="flex-col col1">
            <span>System</span>
          </div>
          <div class="flex-col col2">
            <span>Test</span>
          </div>
          <div class="flex-col col3">
            <span>${msg}</span>
          </div>
        </div>
      `;
    } else {
      text = `
        <div class="flex-row">
          <div class="flex-col col1">
            <span>System</span>
          </div>
          <div class="flex-col col2">
            <span>${(confidence * 100).toFixed(2) + "%"}</span>
          </div>
          <div class="flex-col col3">
            <span>${msg}</span>
          </div>
        </div>
      `;
    }
    output.insertAdjacentHTML("beforeend", text);
    const utterThis = new SpeechSynthesisUtterance(msg);
    utterThis.onend = function () {
      testBtn.disabled = false;
      testBtn.textContent = "Test voice";
    };
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
    for (i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}

function main() {
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
  pitch.oninput = function () {
    pitchValue.textContent = pitch.value;
  };
  rate.oninput = function () {
    rateValue.textContent = rate.value;
  };
  startBtn.addEventListener("click", testSpeech);
  testBtn.addEventListener("click", () => speak("Hello! I'm going to be your partner for today.", 1.0, true));
}

main();
