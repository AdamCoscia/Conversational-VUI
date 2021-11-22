/**
 * CS 6456 Group Project
 * Georgia Tech, Fall 2021
 * Adam Coscia
 *
 * TODO:
 *   - Separate alarms/events into AlarmManager.js and EventManager.js
 *
 * References:
 *   - Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
 *   - SpeechSynthesis: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
 *   - HTMLAudioElement: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
 *   - annyang: https://github.com/TalAter/annyang
 *   - compromise: https://github.com/spencermountain/compromise/
 *   - compendium-js: https://github.com/Ulflander/compendium-js
 *   - alarm-clock-sound: https://www.soundjay.com/clock-sounds-1.html
 *
 * Definitions:
 *   commands = {
 *     // annyang will capture anything after a splat (*) and pass it to the function.
 *     // e.g. saying "Show me Batman and Robin" is the same as calling showFlickr('Batman and Robin');
 *     "show me *tag": showFlickr,
 *     // A named variable is a one word variable, that can fit anywhere in your command.
 *     // e.g. saying "calculate October stats" will call calculateStats('October');
 *     "calculate :month stats": calculateStats,
 *     // By defining a part of the following command as optional, annyang will respond to both:
 *     // "say hello to my little friend" as well as "say hello friend"
 *     "say hello (to my little) friend": greeting,
 *     // This example will only accept months which are at the start of a quarter
 *     'calculate :quarter stats': {'regexp': /^calculate (January|April|July|October) stats$/, 'callback': calculateFunction}
 *   };
 */

// create basic keyword commands
const KEYWORD_COMMANDS = {
  "play alarm clock": () => {
    alarmClockAudio.play();
  },
};

// get document elements
var timestampSpan = document.querySelector("#timestamp-span");
var testBtn = document.querySelector("#test-btn");
var startBtn = document.querySelector("#start-btn");
var showhideBtn = document.querySelector("#showhide-btn");
var outputText = document.querySelector("#output-text");
var voiceSelect = document.querySelector("#voice-select");
var pitchSlider = document.querySelector("#pitch-slider");
var pitchValue = document.querySelector("#pitch-value");
var rateSlider = document.querySelector("#rate-slider");
var rateValue = document.querySelector("#rate-value");

// set update function for current date/time output
function updateTimestampSpan() {
  const d = new Date();
  timestampSpan.innerHTML = d.toLocaleString();
}
updateTimestampSpan();
var timestampSpanIntervalID = window.setInterval(updateTimestampSpan, 1000);

// load audio files
var alarmClockAudio = new Audio("./assets/audio/alarm-clock-01.wav");

// initialize data objects
var alarms = {};
var events = {};
var eventID = 1;

// test alarms
const t1 = new Date(2021, 10, 17, 21, 48, 0);
const label1 = "my alarm 1";
setAlarm(t1, label1, true);
const t2 = new Date(2021, 10, 17, 23, 48, 0);
const label2 = "";
setAlarm(t2, label2, true);
setTimeout(() => editAlarmEnabled(t2, "", false), 5000);
setTimeout(() => editAlarmLabel(t2, "my alarm 1", "my alarm 2"), 10000);
const t3 = new Date(2021, 10, 17, 23, 48, 30);
setTimeout(() => editAlarmTime(t1, "my alarm 2", t3), 15000);
setTimeout(() => deleteAlarm(null, "my alarm 2"), 20000);
setTimeout(() => console.log("done!"), 25000);

// test events
// const t1 = new Date(2021, 10, 17, 21, 48, 0);
// const label1 = "my event 1";
// const d1 = 120; // minutes
// setEvent(t1, label1, d1, true);
// const t2 = new Date(2021, 10, 17, 23, 48, 0);
// const label2 = "";
// const d2 = 240; // minutes
// setEvent(t2, label2, d2, true);
// setTimeout(() => editEventLabel(t2, "my event 1", "my event 2"), 5000);
// const t3 = new Date(2021, 10, 17, 23, 48, 30);
// const d3 = 180; // minutes
// setTimeout(() => editEventTime(t1, "my event 2", t3), 10000);
// setTimeout(() => deleteEvent(null, "my event 2"), 15000);
// setTimeout(() => editEventDuration(null, "my event 1", d3), 20000);
// setTimeout(() => console.log("done!"), 25000);

/** ========================== INITIALIZATION ============================== */

// attempt to start the system
if (annyang) {
  // speech recognition available!
  var commands = {}; // commands object
  annyang.addCommands(KEYWORD_COMMANDS); // add commands to recognition service
  setCallbacks(); // set callbacks for speech recognition service

  // set speech synthesis parameters
  var synth = window.speechSynthesis; // snyth API
  var voices = []; // list of voice options from the speech API
  var systemOutput = ""; // what the system will say
  var userOutput = ""; // what the user said
  populateVoiceList(); // add available voices to voice dropdown
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
  pitchSlider.oninput = function () {
    pitchValue.textContent = pitchSlider.value;
  };
  rateSlider.oninput = function () {
    rateValue.textContent = rateSlider.value;
  };

  // add event listeners
  testBtn.addEventListener("click", () => speak("Hello! I'm going to be your partner for today.", "Test"));
  startBtn.addEventListener("click", listen);
  showhideBtn.addEventListener(
    "click",
    () => (outputText.style.display = outputText.style.display == "none" ? "block" : "none")
  );
} else {
  // speech recognition not available
  testBtn.disabled = true;
  startBtn.disabled = true;
  showhideBtn.disabled = true;
  voiceSelect.disabled = true;
  pitchSlider.disabled = true;
  rateSlider.disabled = true;
  const d = new Date();
  const elem = `
    <div class="flex-row" style="color: red">
      <div class="flex-col col1">
        <span>${d.toLocaleTimeString()}</span>
      </div>
      <div class="flex-col col2">
        <span>System</span>
      </div>
      <div class="flex-col col3">
        <span>Error</span>
      </div>
      <div class="flex-col col4">
        <span>Speech Recognition not available in this browser. Supported browsers: Chrome, Edge, Safari</span>
      </div>
    </div>
  `;
  outputText.insertAdjacentHTML("beforeend", elem);
}

/**
 * Add all available synth voices in the current browser to the voice dropdown.
 */
function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const an = a.name.toUpperCase();
    const bn = b.name.toUpperCase();
    if (an < bn) {
      return -1;
    } else if (an == bn) {
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

/**
 * Set callbacks for speech recognition.
 */
function setCallbacks() {
  // when the recognition matches one or more of the commands
  annyang.addCallback("resultMatch", function (userSaid, commandText, phrases) {
    annyang.pause();
    testBtn.disabled = false;
    startBtn.disabled = false;
    startBtn.textContent = "Start recording";
    userOutput = userSaid;
    const d = new Date();
    const elem = `
      <div class="flex-row">
        <div class="flex-col col1">
          <span>${d.toLocaleTimeString()}</span>
        </div>
        <div class="flex-col col2">
          <span>User</span>
        </div>
        <div class="flex-col col3">
          <span>Keyword</span>
        </div>
        <div class="flex-col col4">
          <span>${userOutput}</span>
        </div>
      </div>
    `;
    outputText.insertAdjacentHTML("beforeend", elem);
  });

  // when the recognition does not matche any of the commands
  annyang.addCallback("resultNoMatch", function (phrases) {
    annyang.pause();
    testBtn.disabled = false;
    startBtn.disabled = false;
    startBtn.textContent = "Start recording";
    userOutput = phrases[0];
    const d = new Date();
    const elem = `
      <div class="flex-row">
        <div class="flex-col col1">
          <span>${d.toLocaleTimeString()}</span>
        </div>
        <div class="flex-col col2">
          <span>User</span>
        </div>
        <div class="flex-col col3">
          <span>Guess</span>
        </div>
        <div class="flex-col col4">
          <span>${userOutput}</span>
        </div>
      </div>
    `;
    outputText.insertAdjacentHTML("beforeend", elem);
  });

  // when an error occurs
  annyang.addCallback("error", function (event) {
    annyang.pause();
    console.log(event);
    testBtn.disabled = false;
    startBtn.disabled = false;
    startBtn.textContent = "Start recording";
    speak("Error occurred in recognition. See console for details.", "Error");
  });
}

/** ============================== ALARMS ================================== */

/**
 * Set an alarm for the time given with the given label and with the enabled
 * flag set to the given value.
 * @param {Date} time Time to set the alarm for.
 * @param {String} label (optional) A label for the alarm.
 * @param {Boolean} enabled A bool for whether alarm should be enabled.
 */
function setAlarm(time, label, enabled) {
  if (time && !Object.hasOwn(alarms, time.getTime())) {
    const ts = Math.floor(time.getTime() / 1000); // seconds
    function testAlarm() {
      const d = new Date();
      const ds = Math.floor(d.getTime() / 1000); // seconds
      if (ts == ds) {
        if (alarms[time.getTime()].enabled) alarmClockAudio.play(); // play the alarm!
        window.clearInterval(alarms[time.getTime()].id); // stop testing this alarm
      }
    }
    var testAlarmIntervalID = window.setInterval(testAlarm, 1000); // test alarm every second
    alarms[time.getTime()] = { id: testAlarmIntervalID, time: time, label: label, enabled: enabled }; // save alarm by time
    if (label && !Object.hasOwn(alarms, label)) {
      alarms[label] = { id: testAlarmIntervalID, time: time, label: label, enabled: enabled }; // save alarm by label
    }
  }
  console.log(alarms);
}

/**
 * Deletes the alarm with the given time, or if time is not given, label.
 * @param {Date} time Time of the alarm to delete.
 * @param {String} label Label of the alarm to delete.
 */
function deleteAlarm(time, label) {
  if (time && Object.hasOwn(alarms, time.getTime())) {
    window.clearInterval(alarms[time.getTime()].id); // stop testing this alarm
    const oldLabel = alarms[time.getTime()].label;
    if (oldLabel && Object.hasOwn(alarms, oldLabel)) {
      delete alarms[oldLabel]; // remove alarm by label
    }
    delete alarms[time.getTime()]; // remove alarm by time
  } else if (label && Object.hasOwn(alarms, label)) {
    window.clearInterval(alarms[label].id); // stop testing this alarm
    const oldTime = alarms[label].time;
    if (oldTime && Object.hasOwn(alarms, oldTime.getTime())) {
      delete alarms[oldTime.getTime()]; // remove alarm by time
    }
    delete alarms[label]; // remove alarm by label
  }
  console.log(alarms);
}

/**
 * Sets the `time` prop of an alarm with the given time, or if the time is not
 * give, label, to the given value.
 * @param {Date} time Time of the alarm to edit.
 * @param {String} label Label of the alarm to edit.
 * @param {Date} newTime New time to give to the alarm.
 */
function editAlarmTime(time, label, newTime) {
  if (time && Object.hasOwn(alarms, time.getTime())) {
    const oldLabel = alarms[time.getTime()].label;
    const oldEnabled = alarms[time.getTime()].enabled;
    deleteAlarm(time, oldLabel);
    setAlarm(newTime, oldLabel, oldEnabled);
  } else if (label && Object.hasOwn(alarms, label)) {
    const oldTime = alarms[label].time;
    const oldEnabled = alarms[label].enabled;
    deleteAlarm(oldTime, label);
    setAlarm(newTime, label, oldEnabled);
  }
  console.log(alarms);
}

/**
 * Sets the `label` prop of an alarm with the given time, or if the time is not
 * give, label, to the given value.
 * @param {Date} time Time of the alarm to edit.
 * @param {String} label Label of the alarm to edit.
 * @param {String} newLabel New label to give to the alarm.
 */
function editAlarmLabel(time, label, newLabel) {
  if (time && Object.hasOwn(alarms, time.getTime())) {
    const oldLabel = alarms[time.getTime()].label;
    const oldEnabled = alarms[time.getTime()].enabled;
    deleteAlarm(time, oldLabel);
    setAlarm(time, newLabel, oldEnabled);
  } else if (label && Object.hasOwn(alarms, label)) {
    const oldTime = alarms[label].time;
    const oldEnabled = alarms[label].enabled;
    deleteAlarm(oldTime, label);
    setAlarm(oldTime, newLabel, oldEnabled);
  }
  console.log(alarms);
}

/**
 * Sets the `label` prop of an alarm with the given time, or if the time is not
 * give, label, to the given value.
 * @param {Date} time Time of the alarm to edit.
 * @param {String} label Label of the alarm to edit.
 * @param {String} newEnabled Whether to enable alarm or not.
 */
function editAlarmEnabled(time, label, newEnabled) {
  if (time && Object.hasOwn(alarms, time.getTime())) {
    const oldLabel = alarms[time.getTime()].label;
    deleteAlarm(time, oldLabel);
    setAlarm(time, oldLabel, newEnabled);
  } else if (label && Object.hasOwn(alarms, label)) {
    const oldTime = alarms[label].time;
    deleteAlarm(oldTime, label);
    setAlarm(oldTime, label, newEnabled);
  }
  console.log(alarms);
}

/** ============================== EVENTS ================================== */

/**
 * Set an event for the time given with the given label.
 * @param {Date} time Time to set the event for.
 * @param {String} label (optional) A label for the event.
 * @param {*} duration How long the event runs, in minutes.
 */
function setEvent(time, label, duration) {
  if (time && !Object.hasOwn(events, time.getTime())) {
    eventID++; // get new event ID
    events[time.getTime()] = { id: eventID, time: time, label: label, duration: duration }; // save event by time
    if (label && !Object.hasOwn(events, label)) {
      events[label] = { id: eventID, time: time, label: label, duration: duration }; // save event by label
    }
  }
  console.log(events);
}

/**
 * Deletes the event with the given time, or if time is not given, label.
 * @param {Date} time Time of the event to delete.
 * @param {String} label Label of the event to delete.
 */
function deleteEvent(time, label) {
  if (time && Object.hasOwn(events, time.getTime())) {
    const oldLabel = events[time.getTime()].label;
    if (oldLabel && Object.hasOwn(events, oldLabel)) {
      delete events[oldLabel]; // remove event by label
    }
    delete events[time.getTime()]; // remove event by time
  } else if (label && Object.hasOwn(events, label)) {
    const oldTime = events[label].time;
    if (oldTime && Object.hasOwn(events, oldTime.getTime())) {
      delete events[oldTime.getTime()]; // remove event by time
    }
    delete events[label]; // remove event by label
  }
  console.log(events);
}

/**
 * Sets the `time` prop of an event with the given time, or if the time is not
 * give, label, to the given value.
 * @param {Date} time Time of the event to edit.
 * @param {String} label Label of the event to edit.
 * @param {Date} newTime New time to give to the event.
 */
function editEventTime(time, label, newTime) {
  if (time && Object.hasOwn(events, time.getTime())) {
    const oldLabel = events[time.getTime()].label;
    const oldDuration = events[time.getTime()].duration;
    deleteEvent(time, oldLabel);
    setEvent(newTime, oldLabel, oldDuration);
  } else if (label && Object.hasOwn(events, label)) {
    const oldTime = events[label].time;
    const oldDuration = events[label].duration;
    deleteEvent(oldTime, label);
    setEvent(newTime, label, oldDuration);
  }
  console.log(events);
}

/**
 * Sets the `label` prop of an event with the given time, or if the time is not
 * give, label, to the given value.
 * @param {Date} time Time of the event to edit.
 * @param {String} label Label of the event to edit.
 * @param {String} newLabel New label to give to the event.
 */
function editEventLabel(time, label, newLabel) {
  if (time && Object.hasOwn(events, time.getTime())) {
    const oldLabel = events[time.getTime()].label;
    const oldDuration = events[time.getTime()].duration;
    deleteEvent(time, oldLabel);
    setEvent(time, newLabel, oldDuration);
  } else if (label && Object.hasOwn(events, label)) {
    const oldTime = events[label].time;
    const oldDuration = events[label].duration;
    deleteEvent(oldTime, label);
    setEvent(oldTime, newLabel, oldDuration);
  }
  console.log(events);
}

/**
 * Sets the `time` prop of an event with the given time, or if the time is not
 * give, label, to the given value.
 * @param {Date} time Time of the event to edit.
 * @param {String} label Label of the event to edit.
 * @param {Date} newDuration New duration to give the event.
 */
function editEventDuration(time, label, newDuration) {
  if (time && Object.hasOwn(events, time.getTime())) {
    const oldLabel = events[time.getTime()].label;
    deleteEvent(time, oldLabel);
    setEvent(time, oldLabel, newDuration);
  } else if (label && Object.hasOwn(events, label)) {
    const oldTime = events[label].time;
    const oldLabel = events[label].label;
    deleteEvent(oldTime, label);
    setEvent(oldTime, oldLabel, newDuration);
  }
  console.log(events);
}

/** ================================ I/O =================================== */

/**
 * Listen to the user's voice using the speech recognition API.
 */
function listen() {
  // don't let user press input buttons
  startBtn.disabled = true;
  startBtn.textContent = "Recording in progress ...";
  testBtn.disabled = true;
  // listen to the user
  annyang.resume();
}

/**
 * Speak a message aloud for the user using the speech synthesis API.
 * @param {String} msg The message to speak.
 * @param {String} result The result of how that message came to be spoken.
 */
function speak(msg, result) {
  // don't have the synth speak over itself
  if (synth.speaking) return;
  // only speak if the message is not empty
  if (msg !== "") {
    // don't let the user press input buttons
    testBtn.disabled = true;
    testBtn.textContent = "Speaking ...";
    startBtn.disabled = true;
    // append message to the GUI
    let color = "";
    switch (result) {
      case "Test": {
        color = "#1976d2";
        break;
      }
      case "Error": {
        color = "red";
        break;
      }
    }
    const d = new Date();
    const elem = `
      <div class="flex-row" style="color: ${color}">
        <div class="flex-col col1">
          <span>${d.toLocaleTimeString()}</span>
        </div>
        <div class="flex-col col2">
          <span>System</span>
        </div>
        <div class="flex-col col3">
          <span>${result}</span>
        </div>
        <div class="flex-col col4">
          <span>${msg}</span>
        </div>
      </div>
    `;
    outputText.insertAdjacentHTML("beforeend", elem);
    // speak the message
    const utterThis = new SpeechSynthesisUtterance(msg);
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
    for (i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = pitchSlider.value;
    utterThis.rate = rateSlider.value;
    utterThis.onend = function () {
      testBtn.disabled = false;
      testBtn.textContent = "Test voice";
      startBtn.disabled = false;
    };
    synth.speak(utterThis);
  }
}
