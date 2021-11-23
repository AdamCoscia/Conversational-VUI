/**
 * CS 6456 Group Project
 * Georgia Tech, Fall 2021
 * Adam Coscia
 *
 *
 * References:
 *
 *   Web Speech API
 *     - Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
 *     - SpeechSynthesis: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
 *     - SpeechRecognition: https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
 *
 *   SpeechRecognition wrapper
 *     - annyang: https://github.com/TalAter/annyang
 *
 *   Audio I/O
 *     - HTMLAudioElement: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
 *
 *   Topic Modeling,
 *   Date Extraction
 *     - compromise: https://github.com/spencermountain/compromise/
 *     - compromise-numbers: https://github.com/spencermountain/compromise/tree/master/plugins/numbers
 *     - compromise-dates: https://github.com/spencermountain/compromise/tree/master/plugins/dates
 *
 *   Sentiment Analysis
 *     - compendium-js: https://github.com/Ulflander/compendium-js
 *
 *   Assets
 *     - alarm-clock-01.wav: https://www.soundjay.com/clock-sounds-1.html
 *
 */

// initialize data objects
var eventID = 1;
var alarms = {};
var events = {};

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
var timestampSpanIntervalID = window.setInterval(() => (timestampSpan.innerHTML = new Date().toLocaleString()), 1000);
timestampSpan.innerHTML = new Date().toLocaleString();

// load audio files
var alarmClockAudio = new Audio("./assets/audio/alarm-clock-01.wav");

// create basic keyword command recogntion
const keywordCommand = {
  ":action :subject *details": {
    regexp:
      /^(.*set|.*make|.*create|.*start|.*put|.*enable|.*disable|.*edit|.*change|.*alter|.*adjust|.*modify|.*revise|.*delete|.*remove|.*cancel)(.* alarms?|.* events?)(.*)?$/,
    callback: (action, subject, details) => {
      const userInput = action + subject + details; // concat input
      const alarmFlag = subject.includes("alarm");
      const eventFlag = subject.includes("event");
      if (alarmFlag && !eventFlag) {
        // ALARM
        if (
          action.includes("set") ||
          action.includes("make") ||
          action.includes("create") ||
          action.includes("start") ||
          action.includes("put")
        ) {
          // SET
          parseSetAlarmInput(userInput, null, null);
        } else if (action.includes("enable")) {
          // ENABLE
          parseEnableAlarmInput(userInput, null, null);
        } else if (action.includes("disable")) {
          // DISABLE
          parseDisableAlarmInput(userInput, null, null);
        } else if (
          action.includes("edit") ||
          action.includes("change") ||
          action.includes("alter") ||
          action.includes("adjust") ||
          action.includes("modify") ||
          action.includes("revise")
        ) {
          // EDIT
          parseEditAlarmInput(userInput, null, null);
        } else if (action.includes("delete") || action.includes("remove") || action.includes("cancel")) {
          // DELETE
          parseDeleteAlarmInput(userInput, null, null);
        }
      } else if (eventFlag && !alarmFlag) {
        // EVENT
        if (
          action.includes("set") ||
          action.includes("make") ||
          action.includes("create") ||
          action.includes("start") ||
          action.includes("put")
        ) {
          // SET
          parseSetEventInput(userInput, null, null);
        } else if (
          action.includes("edit") ||
          action.includes("change") ||
          action.includes("alter") ||
          action.includes("adjust") ||
          action.includes("modify") ||
          action.includes("revise")
        ) {
          // EDIT
          parseEditEventInput(userInput, null, null);
        } else if (action.includes("delete") || action.includes("remove") || action.includes("cancel")) {
          // DELETE
          parseDeleteEventInput(userInput, null, null);
        }
      } else {
        // AMBIGUOUS => clarify if alarm or event
        speak(
          "I'm sorry, I heard both alarm and event. Try your request again, but only saying one or the other this time.",
          "Clarify"
        );
      }
    },
  },
};

// create keyword cancel command
const cancelCommand = {
  "*command": {
    regexp: /^(\bstop\b|\bcancel\b|\bend\b|\breset\b)$/,
    callback: (command) => {
      speak("Gotcha. Let me know if you need anything!", "Success");
      // reset commands
      annyang.removeCommands();
      annyang.addCommands(keywordCommand);
      annyang.addCommands(cancelCommand);
    },
  },
};

// test alarms
// const t1 = new Date(2021, 10, 17, 21, 48, 0);
// const label1 = "my alarm 1";
// setAlarm(t1, label1, true);
// const t2 = new Date(2021, 10, 17, 23, 48, 0);
// const label2 = "";
// setAlarm(t2, label2, true);
// setTimeout(() => editAlarmEnabled(t2, "", false), 5000);
// setTimeout(() => editAlarmLabel(t2, "my alarm 1", "my alarm 2"), 10000);
// const t3 = new Date(2021, 10, 17, 23, 48, 30);
// setTimeout(() => editAlarmTime(t1, "my alarm 2", t3), 15000);
// setTimeout(() => deleteAlarm(null, "my alarm 2"), 20000);
// setTimeout(() => console.log("done!"), 25000);

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
if (annyang && nlp && compromiseNumbers && compromiseDates && compendium) {
  // all libraries available!
  // add various plugin to base compromise object
  nlp.extend(compromiseNumbers);
  nlp.extend(compromiseDates);

  // set up basic keyword command recognition for annyang
  var commands = {}; // commands object
  annyang.addCommands(keywordCommand); // add commands to recognition service
  annyang.addCommands(cancelCommand); // add commands to recognition service
  setCallbacks(); // set callbacks for speech recognition service

  // set speech synthesis parameters for Web Speech API
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
  // not all libraries could be loaded
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

  // when the recognition does not match any of the commands
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
    speak(
      `I'm sorry. I heard ${userOutput}. I'm not currently programmed to respond to that. Try asking me to set a new alarm or event!`,
      "Failure"
    );
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

function parseSetAlarmInput(userInput, d, t) {
  const userInputDoc = nlp(userInput); // parse input using compromise
  let dates, times;
  let nd = 0;
  let nt = 0;

  if (!d) {
    // only look for a date if one isn't provided
    dates = userInputDoc.dates().json();
    nd = dates.length; // number of dates found
  }
  if (d) nd += 1; // date is given

  if (!t) {
    // only look for a time if one isn't provided
    times = userInputDoc.times().json();
    nt = times.length; // number of times found
  }
  if (t) nt += 1; // time is given

  if (nd == 1 && nt == 1) {
    // one date, one time => try to set an alarm with the provided inputs
    if (!d) d = new Date(dates[0].start);
    if (!t) t = toTime(times[0].time);
    const target = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.hours, t.minutes, 0);
    setAlarm(target, null, true, false);
    // reset commands
    annyang.removeCommands();
    annyang.addCommands(keywordCommand);
    annyang.addCommands(cancelCommand);
  } else if (nd == 1 && nt > 1) {
    // one date, multiple times
    if (!d) d = new Date(dates[0].start);
    speak(
      "I heard multiple times to set that alarm for. Could you clarify which time you want to set your alarm for?",
      "Clarify"
    );
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseSetAlarmInput(response, d, null) });
  } else if (nd == 1 && nt == 0) {
    // one date, no time
    if (!d) d = new Date(dates[0].start);
    speak("Certainly! And what time would you like to set the alarm for?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseSetAlarmInput(response, d, null) });
  } else if (nd > 1 && nt == 1) {
    // multiple dates, one time
    if (!t) t = toTime(times[0].time);
    speak(
      "I heard multiple days to set that alarm for. Could you clarify which day you want to set your alarm for?",
      "Clarify"
    );
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseSetAlarmInput(response, null, t) });
  } else if (nd > 1 && nt > 1) {
    // multiple dates, multiple times
    speak(
      "I heard multiple days and times to set that alarm for. Could you clarify a single date and time, please?",
      "Clarify"
    );
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseSetAlarmInput(response, null, null) });
  } else if (nd > 1 && nt == 0) {
    // multiple dates, no time
    speak(
      "I heard multiple days and no time to set that alarm for. Could you clarify a single date and time, please?",
      "Clarify"
    );
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseSetAlarmInput(response, null, null) });
  } else if (nd == 0 && nt == 1) {
    // no date, one time
    if (!t) t = toTime(times[0].time);
    speak("Absolutely! And what day would you like to set that alarm for?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseSetAlarmInput(response, null, t) });
  } else if (nd == 0 && nt > 1) {
    // no date, multiple times
    speak(
      "I heard multiple times and no date to set that alarm for. Could you clarify a single date and time, please?",
      "Clarify"
    );
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseSetAlarmInput(response, null, null) });
  } else if (nd == 0 && nt == 0) {
    // no date, no time
    speak("Of course. And when would you like that alarm scheduled for?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseSetAlarmInput(response, null, null) });
  } else {
    // no idea
    speak("Sounds like you wanted to set an alarm. Could you give me a date and a time?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseSetAlarmInput(response, null, null) });
  }
}

/**
 * Set an alarm for the time given with the given label and with the enabled
 * flag set to the given value.
 * @param {Date} time Time to set the alarm for.
 * @param {String} label (optional) A label for the alarm.
 * @param {Boolean} enabled A bool for whether alarm should be enabled.
 * @param {Boolean} mute Whether to mute the system responses.
 */
function setAlarm(time, label, enabled, mute) {
  if (time) {
    if (!Object.hasOwn(alarms, time.getTime())) {
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
      if (!mute) speak("Great! Your alarm is set.", "Success");
    } else {
      if (!mute) speak("I'm sorry, but there's already an alarm set for that date and time.", "Failure");
    }
  } else {
    console.log(`date and time given to setAlarm: ${time}`);
    if (!mute)
      speak(
        "I'm sorry, but something seems to be wrong with the provided date and time. Please check the console for details.",
        "Error"
      );
  }
  console.log(alarms);
}

function parseDeleteAlarmInput(userInput, d, t) {
  const userInputDoc = nlp(userInput); // parse input using compromise
  let dates, times;
  let nd = 0;
  let nt = 0;

  if (!d) {
    // only look for a date if one isn't provided
    dates = userInputDoc.dates().json();
    nd = dates.length; // number of dates found
  }
  if (d) nd += 1; // date is given

  if (!t) {
    // only look for a time if one isn't provided
    times = userInputDoc.times().json();
    nt = times.length; // number of times found
  }
  if (t) nt += 1; // time is given

  if (nd == 1 && nt == 1) {
    // one date, one time => try to delete an alarm with the provided inputs
    if (!d) d = new Date(dates[0].start);
    if (!t) t = toTime(times[0].time);
    const target = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.hours, t.minutes, 0);
    deleteAlarm(target, null, false);
    // reset commands
    annyang.removeCommands();
    annyang.addCommands(keywordCommand);
    annyang.addCommands(cancelCommand);
  } else if (nd == 1 && nt > 1) {
    // one date, multiple times
    if (!d) d = new Date(dates[0].start);
    speak(
      "I heard multiple times just now. Could you clarify at which time the alarm you want to delete is?",
      "Clarify"
    );
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDeleteAlarmInput(response, d, null) });
  } else if (nd == 1 && nt == 0) {
    // one date, no time
    if (!d) d = new Date(dates[0].start);
    speak("Certainly! And at what time is the alarm you would like to delete?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDeleteAlarmInput(response, d, null) });
  } else if (nd > 1 && nt == 1) {
    // multiple dates, one time
    if (!t) t = toTime(times[0].time);
    speak("I heard multiple days just now. Could you clarify on which day the alarm you want to delete is?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDeleteAlarmInput(response, null, t) });
  } else if (nd > 1 && nt > 1) {
    // multiple dates, multiple times
    speak("I heard multiple days and times just now. Could you clarify a single date and time, please?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDeleteAlarmInput(response, null, null) });
  } else if (nd > 1 && nt == 0) {
    // multiple dates, no time
    speak("I heard multiple days and no time just now. Could you clarify a single date and time, please?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDeleteAlarmInput(response, null, null) });
  } else if (nd == 0 && nt == 1) {
    // no date, one time
    if (!t) t = toTime(times[0].time);
    speak("Absolutely! And on what day is the alarm you would like to delete?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDeleteAlarmInput(response, null, t) });
  } else if (nd == 0 && nt > 1) {
    // no date, multiple times
    speak("I heard multiple times and no date just now. Could you clarify a single date and time, please?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDeleteAlarmInput(response, null, null) });
  } else if (nd == 0 && nt == 0) {
    // no date, no time
    speak("Of course. And when is the alarm that you would like to delete set currently?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDeleteAlarmInput(response, null, null) });
  } else {
    // no idea
    speak("Sounds like you wanted to delete an existing alarm. Could you tell me when it's set currently?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDeleteAlarmInput(response, null, null) });
  }
}

/**
 * Deletes the alarm with the given time, or if time is not given, label.
 * @param {Date} time Time of the alarm to delete.
 * @param {String} label Label of the alarm to delete.
 * @param {Boolean} mute Whether to mute the system responses.
 */
function deleteAlarm(time, label, mute) {
  if (time) {
    // time is defined
    if (Object.hasOwn(alarms, time.getTime())) {
      // alarm exists
      window.clearInterval(alarms[time.getTime()].id); // stop testing this alarm
      const oldLabel = alarms[time.getTime()].label;
      if (oldLabel && Object.hasOwn(alarms, oldLabel)) {
        delete alarms[oldLabel]; // remove alarm by label
      }
      delete alarms[time.getTime()]; // remove alarm by time
      if (!mute) speak("Success! Your alarm was deleted.", "Success");
    } else {
      // alarm does not exist
      if (!mute) speak("I'm sorry, but there's no alarm set then currently to delete.", "Failure");
    }
  } else {
    // time is undefined
    if (label) {
      // label is defined
      if (Object.hasOwn(alarms, label)) {
        // alarm exists
        window.clearInterval(alarms[label].id); // stop testing this alarm
        const oldTime = alarms[label].time;
        if (oldTime && Object.hasOwn(alarms, oldTime.getTime())) {
          delete alarms[oldTime.getTime()]; // remove alarm by time
        }
        delete alarms[label]; // remove alarm by label
        if (!mute) speak("Success! Your alarm was deleted.", "Success");
      } else {
        // alarm does not exist
        if (!mute) speak("I'm sorry, but there's no alarm with that label currently to delete.", "Failure");
      }
    } else {
      // both time and label are undefined
      console.log(`date and time given to deleteAlarm: ${time}`);
      console.log(`label given to deleteAlarm: ${label}`);
      if (!mute)
        speak(
          "I'm sorry, but something seems to be wrong with either the provided date and time or label. Please check the console for details.",
          "Error"
        );
    }
  }
  console.log(alarms);
}

function parseEditAlarmInput(userInput, d, t, newD, newT) {
  const parts = userInput.split(" to "); // use to determine what to edit
  if (parts.length == 1) {
    // no 'to' used as separator => look for subject date/time
    if (!d || !t) {
      // still looking for 'from' subject
      const userInputFromDoc = nlp(parts[0]); // parse input using compromise
      let dates, times;
      let nd = 0;
      let nt = 0;

      if (!d) {
        // only look for a date if one isn't provided
        dates = userInputFromDoc.dates().json();
        nd = dates.length; // number of dates found
      }
      if (d) nd += 1; // date is given

      if (!t) {
        // only look for a time if one isn't provided
        times = userInputFromDoc.times().json();
        nt = times.length; // number of times found
      }
      if (t) nt += 1; // time is given

      if (nd == 1 && nt == 1) {
        // one date, one time => 'from' subject found.
        if (!d) d = new Date(dates[0].start);
        if (!t) t = toTime(times[0].time);
        const target = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.hours, t.minutes, 0);
        if (Object.hasOwn(alarms, target.getTime())) {
          // found alarm to edit => ask for new date/time for that alarm
          speak("I found the alarm you want to edit! And to when do you want the alarm changed?", "Clarify");
          annyang.removeCommands();
          annyang.addCommands(cancelCommand);
          annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, t, null, null) });
        } else {
          // couldn't find alarm to edit => inform user
          speak("I'm sorry, I couldn't find the alarm you wanted to edit at time you gave me.", "Failure");
          // reset commands
          annyang.removeCommands();
          annyang.addCommands(keywordCommand);
          annyang.addCommands(cancelCommand);
        }
      } else if (nd == 1 && nt > 1) {
        // one date, multiple times
        if (!d) d = new Date(dates[0].start);
        speak(
          "I heard multiple times just now. Could you clarify at which time the alarm you want to edit is?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, null, null, null) });
      } else if (nd == 1 && nt == 0) {
        // one date, no time
        if (!d) d = new Date(dates[0].start);
        speak("For sure. And at what time is the alarm you would like to edit?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, null, null, null) });
      } else if (nd > 1 && nt == 1) {
        // multiple dates, one time
        if (!t) t = toTime(times[0].time);
        speak(
          "I heard multiple days just now. Could you clarify on which day the alarm you want to edit is?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, null, t, null, null) });
      } else if (nd > 1 && nt > 1) {
        // multiple dates, multiple times
        speak("I heard multiple days and times just now. Could you clarify a single date and time, please?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, null, null, null, null) });
      } else if (nd > 1 && nt == 0) {
        // multiple dates, no time
        speak(
          "I heard multiple days and no time just now. Could you clarify a single date and time, please?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, null, null, null, null) });
      } else if (nd == 0 && nt == 1) {
        // no date, one time
        if (!t) t = toTime(times[0].time);
        speak("Without a doubt. And on what day is the alarm you would like to edit?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, null, t, null, null) });
      } else if (nd == 0 && nt > 1) {
        // no date, multiple times
        speak(
          "I heard multiple times and no date just now. Could you clarify a single date and time, please?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, null, null, null, null) });
      } else if (nd == 0 && nt == 0) {
        // no date, no time
        speak("Ok. And when is the alarm that you would like to edit set currently?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, null, null, null, null) });
      } else {
        // no idea
        speak(
          "Sounds like you wanted to edit an existing alarm. Could you tell me when it's set currently?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, null, null, null, null) });
      }
    } else {
      // now looking for 'to' subject
      const userInputToDoc = nlp(parts[0]); // parse input using compromise
      let dates, times;
      let nd = 0;
      let nt = 0;

      if (!newD) {
        // only look for a date if one isn't provided
        dates = userInputToDoc.dates().json();
        nd = dates.length; // number of dates found
      }
      if (newD) nd += 1; // date is given

      if (!newT) {
        // only look for a time if one isn't provided
        times = userInputToDoc.times().json();
        nt = times.length; // number of times found
      }
      if (newT) nt += 1; // time is given

      if (nd == 1 && nt == 1) {
        // one date, one time => 'to' subject found.
        if (!newD) newD = new Date(dates[0].start);
        if (!newT) newT = toTime(times[0].time);
        const target = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.hours, t.minutes, 0);
        const newTarget = new Date(newD.getFullYear(), newD.getMonth(), newD.getDate(), newT.hours, newT.minutes, 0);
        editAlarmTime(target, null, newTarget);
        // reset commands
        annyang.removeCommands();
        annyang.addCommands(keywordCommand);
        annyang.addCommands(cancelCommand);
      } else if (nd == 1 && nt > 1) {
        // one date, multiple times
        if (!newD) newD = new Date(dates[0].start);
        speak(
          "I heard multiple times just now. Could you clarify what time you want to change the alarm to?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, t, newD, null) });
      } else if (nd == 1 && nt == 0) {
        // one date, no time
        if (!newD) newD = new Date(dates[0].start);
        speak("Of course. And what time do you want the alarm to be changed to?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, t, newD, null) });
      } else if (nd > 1 && nt == 1) {
        // multiple dates, one time
        if (!newT) newT = toTime(times[0].time);
        speak(
          "I heard multiple days just now. Could you clarify which day you want the alarm to be changed to?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, t, null, newT) });
      } else if (nd > 1 && nt > 1) {
        // multiple dates, multiple times
        speak("I heard multiple days and times just now. Could you clarify a single date and time, please?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, t, null, null) });
      } else if (nd > 1 && nt == 0) {
        // multiple dates, no time
        speak(
          "I heard multiple days and no time just now. Could you clarify a single date and time, please?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, t, null, null) });
      } else if (nd == 0 && nt == 1) {
        // no date, one time
        if (!newT) newT = toTime(times[0].time);
        speak("You got it. And what day do you want to change the alarm to?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, t, null, newT) });
      } else if (nd == 0 && nt > 1) {
        // no date, multiple times
        speak(
          "I heard multiple times and no date just now. Could you clarify a single date and time, please?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, t, null, null) });
      } else if (nd == 0 && nt == 0) {
        // no date, no time
        speak("On it. And to when do you want the alarm changed?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, t, null, null) });
      } else {
        // no idea
        speak("I'm sorry, could you repeat to when you want the alarm changed?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, t, null, null) });
      }
    }
  } else if (parts.length == 2) {
    // assume 'from' and 'to' are in order => get subject for each
    const userInputFromDoc = nlp(parts[0]); // parse input using compromise
    const userInputToDoc = nlp(parts[1]); // parse input using compromise
    let dates, times;
    let nfd = 0; // number 'from' dates
    let ntd = 0; // number 'to' dates
    let nft = 0; // number 'from' times
    let ntt = 0; // number 'to' times

    if (!d) {
      // only look for a date if one isn't provided
      dates = userInputFromDoc.dates().json();
      nfd = dates.length; // number of dates found
    }
    if (d) nfd += 1; // date is given

    if (!t) {
      // only look for a time if one isn't provided
      times = userInputFromDoc.times().json();
      nft = times.length; // number of times found
    }
    if (t) nft += 1; // time is given

    if (!newD) {
      // only look for a date if one isn't provided
      dates = userInputToDoc.dates().json();
      ntd = dates.length; // number of dates found
    }
    if (newD) ntd += 1; // date is given

    if (!newT) {
      // only look for a time if one isn't provided
      times = userInputToDoc.times().json();
      ntt = times.length; // number of times found
    }
    if (newT) ntt += 1; // time is given

    if (nfd == 1 && ntd == 1 && nft == 1 && ntt == 1) {
      // one of each => 'from' and 'to' subject found.
      if (!d) d = new Date(dates[0].start);
      if (!t) t = toTime(times[0].time);
      if (!newD) newD = new Date(dates[0].start);
      if (!newT) newT = toTime(times[0].time);
      const target = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.hours, t.minutes, 0);
      const newTarget = new Date(newD.getFullYear(), newD.getMonth(), newD.getDate(), newT.hours, newT.minutes, 0);
      editAlarmTime(target, null, newTarget);
      // reset commands
      annyang.removeCommands();
      annyang.addCommands(keywordCommand);
      annyang.addCommands(cancelCommand);
    } else {
      // look for 'from' subject
      if (nfd == 1 && nft == 1) {
        // one date, one time => 'from' subject found.
        if (!d) d = new Date(dates[0].start);
        if (!t) t = toTime(times[0].time);
        const target = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.hours, t.minutes, 0);
        if (!Object.hasOwn(alarms, target.getTime())) {
          // couldn't find alarm to edit => inform user
          speak("I'm sorry, I couldn't find the alarm you wanted to edit at time you gave me.", "Failure");
          // reset commands
          annyang.removeCommands();
          annyang.addCommands(keywordCommand);
          annyang.addCommands(cancelCommand);
        } else {
          // look for 'to' subject
          if (ntd == 1 && ntt > 1) {
            // one date, multiple times
            if (!newD) newD = new Date(dates[0].start);
            speak(
              "I heard multiple times just now. Could you clarify what time you want to change the alarm to?",
              "Clarify"
            );
            annyang.removeCommands();
            annyang.addCommands(cancelCommand);
            annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, t, newD, null) });
          } else if (ntd == 1 && ntt == 0) {
            // one date, no time
            if (!newD) newD = new Date(dates[0].start);
            speak("Of course. And what time do you want the alarm to be changed to?", "Clarify");
            annyang.removeCommands();
            annyang.addCommands(cancelCommand);
            annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, t, newD, null) });
          } else if (ntd > 1 && ntt == 1) {
            // multiple dates, one time
            if (!newT) newT = toTime(times[0].time);
            speak(
              "I heard multiple days just now. Could you clarify which day you want the alarm to be changed to?",
              "Clarify"
            );
            annyang.removeCommands();
            annyang.addCommands(cancelCommand);
            annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, t, null, newT) });
          } else if (ntd > 1 && ntt > 1) {
            // multiple dates, multiple times
            speak(
              "I heard multiple days and times just now. Could you clarify a single date and time, please?",
              "Clarify"
            );
            annyang.removeCommands();
            annyang.addCommands(cancelCommand);
            annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, t, null, null) });
          } else if (ntd > 1 && ntt == 0) {
            // multiple dates, no time
            speak(
              "I heard multiple days and no time just now. Could you clarify a single date and time, please?",
              "Clarify"
            );
            annyang.removeCommands();
            annyang.addCommands(cancelCommand);
            annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, t, null, null) });
          } else if (ntd == 0 && ntt == 1) {
            // no date, one time
            if (!newT) newT = toTime(times[0].time);
            speak("You got it. And what day do you want to change the alarm to?", "Clarify");
            annyang.removeCommands();
            annyang.addCommands(cancelCommand);
            annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, t, null, newT) });
          } else if (ntd == 0 && ntt > 1) {
            // no date, multiple times
            speak(
              "I heard multiple times and no date just now. Could you clarify a single date and time, please?",
              "Clarify"
            );
            annyang.removeCommands();
            annyang.addCommands(cancelCommand);
            annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, t, null, null) });
          } else if (ntd == 0 && ntt == 0) {
            // no date, no time
            speak("On it. And to when do you want the alarm changed?", "Clarify");
            annyang.removeCommands();
            annyang.addCommands(cancelCommand);
            annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, t, null, null) });
          } else {
            // no idea
            speak("I'm sorry, could you repeat to when you want the alarm changed?", "Clarify");
            annyang.removeCommands();
            annyang.addCommands(cancelCommand);
            annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, t, null, null) });
          }
        }
      } else if (nfd == 1 && nft > 1) {
        // one date, multiple times
        if (!d) d = new Date(dates[0].start);
        speak(
          "I heard multiple times just now. Could you clarify at which time the alarm you want to edit is?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, null, null, null) });
      } else if (nfd == 1 && nft == 0) {
        // one date, no time
        if (!d) d = new Date(dates[0].start);
        speak("For sure. And at what time is the alarm you would like to edit?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, d, null, null, null) });
      } else if (nfd > 1 && nft == 1) {
        // multiple dates, one time
        if (!t) t = toTime(times[0].time);
        speak(
          "I heard multiple days just now. Could you clarify on which day the alarm you want to edit is?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, null, t, null, null) });
      } else if (nfd > 1 && nft > 1) {
        // multiple dates, multiple times
        speak("I heard multiple days and times just now. Could you clarify a single date and time, please?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, null, null, null, null) });
      } else if (nfd > 1 && nft == 0) {
        // multiple dates, no time
        speak(
          "I heard multiple days and no time just now. Could you clarify a single date and time, please?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, null, null, null, null) });
      } else if (nfd == 0 && nft == 1) {
        // no date, one time
        if (!t) t = toTime(times[0].time);
        speak("Without a doubt. And on what day is the alarm you would like to edit?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, null, t, null, null) });
      } else if (nfd == 0 && nft > 1) {
        // no date, multiple times
        speak(
          "I heard multiple times and no date just now. Could you clarify a single date and time, please?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, null, null, null, null) });
      } else if (nfd == 0 && nft == 0) {
        // no date, no time
        speak("Ok. And when is the alarm that you would like to edit set currently?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, null, null, null, null) });
      } else {
        // no idea
        speak(
          "Sounds like you wanted to edit an existing alarm. Could you tell me when it's set currently?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditAlarmInput(response, null, null, null, null) });
      }
    }
  } else {
    // no idea
    speak(
      "Sounds like you wanted to edit an existing alarm. Could you tell me which alarm you want to change and how you want to change it?",
      "Clarify"
    );
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDeleteAlarmInput(response, null, null) });
  }
}

/**
 * Sets the `time` prop of an alarm with the given time, or if the time is not
 * give, label, to the given value.
 * @param {Date} time Time of the alarm to edit.
 * @param {String} label Label of the alarm to edit.
 * @param {Date} newTime New time to give to the alarm.
 */
function editAlarmTime(time, label, newTime) {
  if (time) {
    // time is defined
    if (Object.hasOwn(alarms, time.getTime())) {
      // alarm exists
      const oldLabel = alarms[time.getTime()].label;
      const oldEnabled = alarms[time.getTime()].enabled;
      deleteAlarm(time, oldLabel, true); // mute system
      setAlarm(newTime, oldLabel, oldEnabled, true); // mute system
      speak("Success! Your alarm was changed.", "Success");
    } else {
      // alarm does not exist
      speak("I'm sorry, but there's no alarm set then currently to edit.", "Failure");
    }
  } else {
    // time is undefined
    if (label) {
      // label is defined
      if (Object.hasOwn(alarms, label)) {
        // alarm exists
        const oldTime = alarms[label].time;
        const oldEnabled = alarms[label].enabled;
        deleteAlarm(oldTime, label, true); // mute system
        setAlarm(newTime, label, oldEnabled, true); // mute system
        speak("Success! Your alarm was changed.", "Success");
      } else {
        // alarm does not exist
        speak("I'm sorry, but there's no alarm with that label currently to edit.", "Failure");
      }
    } else {
      // both time and label are undefined
      console.log(`date and time given to editAlarmTime: ${time}`);
      console.log(`label given to editAlarmTime: ${label}`);
      if (!mute)
        speak(
          "I'm sorry, but something seems to be wrong with either the provided date and time or label. Please check the console for details.",
          "Error"
        );
    }
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
    deleteAlarm(time, oldLabel, true); // mute system
    setAlarm(time, newLabel, oldEnabled, true); // mute system
  } else if (label && Object.hasOwn(alarms, label)) {
    const oldTime = alarms[label].time;
    const oldEnabled = alarms[label].enabled;
    deleteAlarm(oldTime, label, true); // mute system
    setAlarm(oldTime, newLabel, oldEnabled, true); // mute system
  }
  console.log(alarms);
}

function parseEnableAlarmInput(userInput, d, t) {
  const userInputDoc = nlp(userInput); // parse input using compromise
  let dates, times;
  let nd = 0;
  let nt = 0;

  if (!d) {
    // only look for a date if one isn't provided
    dates = userInputDoc.dates().json();
    nd = dates.length; // number of dates found
  }
  if (d) nd += 1; // date is given

  if (!t) {
    // only look for a time if one isn't provided
    times = userInputDoc.times().json();
    nt = times.length; // number of times found
  }
  if (t) nt += 1; // time is given

  if (nd == 1 && nt == 1) {
    // one date, one time => try to enable an alarm with the provided inputs
    if (!d) d = new Date(dates[0].start);
    if (!t) t = toTime(times[0].time);
    const target = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.hours, t.minutes, 0);
    editAlarmEnabled(target, null, true);
    // reset commands
    annyang.removeCommands();
    annyang.addCommands(keywordCommand);
    annyang.addCommands(cancelCommand);
  } else if (nd == 1 && nt > 1) {
    // one date, multiple times
    if (!d) d = new Date(dates[0].start);
    speak(
      "I heard multiple times just now. Could you clarify at which time the alarm you want to enable is?",
      "Clarify"
    );
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseEnableAlarmInput(response, d, null) });
  } else if (nd == 1 && nt == 0) {
    // one date, no time
    if (!d) d = new Date(dates[0].start);
    speak("For sure. And at what time is the alarm you would like to enable?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseEnableAlarmInput(response, d, null) });
  } else if (nd > 1 && nt == 1) {
    // multiple dates, one time
    if (!t) t = toTime(times[0].time);
    speak("I heard multiple days just now. Could you clarify on which day the alarm you want to enable is?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseEnableAlarmInput(response, null, t) });
  } else if (nd > 1 && nt > 1) {
    // multiple dates, multiple times
    speak("I heard multiple days and times just now. Could you clarify a single date and time, please?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseEnableAlarmInput(response, null, null) });
  } else if (nd > 1 && nt == 0) {
    // multiple dates, no time
    speak("I heard multiple days and no time just now. Could you clarify a single date and time, please?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseEnableAlarmInput(response, null, null) });
  } else if (nd == 0 && nt == 1) {
    // no date, one time
    if (!t) t = toTime(times[0].time);
    speak("Without a doubt. And on what day is the alarm you would like to enable?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseEnableAlarmInput(response, null, t) });
  } else if (nd == 0 && nt > 1) {
    // no date, multiple times
    speak("I heard multiple times and no date just now. Could you clarify a single date and time, please?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseEnableAlarmInput(response, null, null) });
  } else if (nd == 0 && nt == 0) {
    // no date, no time
    speak("Yes. And when is the alarm that you would like to enable set currently?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseEnableAlarmInput(response, null, null) });
  } else {
    // no idea
    speak("Sounds like you wanted to enable an existing alarm. Could you tell me when it's set currently?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseEnableAlarmInput(response, null, null) });
  }
}

function parseDisableAlarmInput(userInput, d, t) {
  const userInputDoc = nlp(userInput); // parse input using compromise
  let dates, times;
  let nd = 0;
  let nt = 0;

  if (!d) {
    // only look for a date if one isn't provided
    dates = userInputDoc.dates().json();
    nd = dates.length; // number of dates found
  }
  if (d) nd += 1; // date is given

  if (!t) {
    // only look for a time if one isn't provided
    times = userInputDoc.times().json();
    nt = times.length; // number of times found
  }
  if (t) nt += 1; // time is given

  if (nd == 1 && nt == 1) {
    // one date, one time => try to disable an alarm with the provided inputs
    if (!d) d = new Date(dates[0].start);
    if (!t) t = toTime(times[0].time);
    const target = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.hours, t.minutes, 0);
    editAlarmEnabled(target, null, false);
    // reset commands
    annyang.removeCommands();
    annyang.addCommands(keywordCommand);
    annyang.addCommands(cancelCommand);
  } else if (nd == 1 && nt > 1) {
    // one date, multiple times
    if (!d) d = new Date(dates[0].start);
    speak(
      "I heard multiple times just now. Could you clarify at which time the alarm you want to disable is?",
      "Clarify"
    );
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDisableAlarmInput(response, d, null) });
  } else if (nd == 1 && nt == 0) {
    // one date, no time
    if (!d) d = new Date(dates[0].start);
    speak("At what time is the alarm you would like to disable?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDisableAlarmInput(response, d, null) });
  } else if (nd > 1 && nt == 1) {
    // multiple dates, one time
    if (!t) t = toTime(times[0].time);
    speak(
      "I heard multiple days just now. Could you clarify on which day the alarm you want to disable is?",
      "Clarify"
    );
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDisableAlarmInput(response, null, t) });
  } else if (nd > 1 && nt > 1) {
    // multiple dates, multiple times
    speak("I heard multiple days and times just now. Could you clarify a single date and time, please?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDisableAlarmInput(response, null, null) });
  } else if (nd > 1 && nt == 0) {
    // multiple dates, no time
    speak("I heard multiple days and no time just now. Could you clarify a single date and time, please?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDisableAlarmInput(response, null, null) });
  } else if (nd == 0 && nt == 1) {
    // no date, one time
    if (!t) t = toTime(times[0].time);
    speak("Sure. And on what day is the alarm you would like to disable?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDisableAlarmInput(response, null, t) });
  } else if (nd == 0 && nt > 1) {
    // no date, multiple times
    speak("I heard multiple times and no date just now. Could you clarify a single date and time, please?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDisableAlarmInput(response, null, null) });
  } else if (nd == 0 && nt == 0) {
    // no date, no time
    speak("And when is the alarm that you would like to disable set currently?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDisableAlarmInput(response, null, null) });
  } else {
    // no idea
    speak("Sounds like you wanted to disable an existing alarm. Could you tell me when it's set currently?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDisableAlarmInput(response, null, null) });
  }
}

/**
 * Sets the `label` prop of an alarm with the given time, or if the time is not
 * give, label, to the given value.
 * @param {Date} time Time of the alarm to edit.
 * @param {String} label Label of the alarm to edit.
 * @param {String} newEnabled Whether to enable alarm or not.
 */
function editAlarmEnabled(time, label, newEnabled) {
  if (time) {
    // time is defined
    if (Object.hasOwn(alarms, time.getTime())) {
      // alarm exists
      const oldLabel = alarms[time.getTime()].label;
      deleteAlarm(time, oldLabel, true); // mute system
      setAlarm(time, oldLabel, newEnabled, true); // mute system
      speak(`Awesome! Your alarm was ${newEnabled ? "enabled" : "disabled"}.`, `Success`);
    } else {
      // alarm does not exist
      speak(`I'm sorry, but there's no alarm set then currently to ${newEnabled ? "enable" : "disable"}.`, `Failure`);
    }
  } else {
    // time is undefined
    if (label) {
      // label is defined
      if (Object.hasOwn(alarms, label)) {
        // alarm exists
        const oldTime = alarms[label].time;
        deleteAlarm(oldTime, label, true); // mute system
        setAlarm(oldTime, label, newEnabled, true); // mute system
        speak(`Awesome! Your alarm was ${newEnabled ? "enabled" : "disabled"}.`, `Success`);
      } else {
        // alarm does not exist
        speak(
          `I'm sorry, but there's no alarm with that label currently to ${newEnabled ? "enable" : "disable"}.`,
          `Failure`
        );
      }
    } else {
      // both time and label are undefined
      console.log(`date and time given to editAlarmEnabled: ${time}`);
      console.log(`label given to editAlarmEnabled: ${label}`);
      speak(
        "I'm sorry, but something seems to be wrong with either the provided date and time or label. Please check the console for details.",
        "Error"
      );
    }
  }
  console.log(alarms);
}

/** ============================== EVENTS ================================== */

function parseSetEventInput(userInput, d, t, x) {
  const userInputDoc = nlp(userInput); // parse input using compromise
  let dates, times, durations;
  let nd = 0; // number of dates found in the text
  let nt = 0; // number of times found in the text
  let nx = 0; // number of durations found in the text

  if (d) nd += 1; // date is given
  if (!d) {
    // only look for a date if one isn't provided
    dates = userInputDoc.dates().json();
    nd = dates.length; // number of dates found
  }

  if (t) nt += 1; // time is given
  if (!t) {
    // only look for a time if one isn't provided
    times = userInputDoc.times().json();
    nt = times.length; // number of times found
  }

  if (x) nx += 1; // time is given
  if (!x) {
    // only look for a duration if one isn't provided
    durations = userInput.match(/[0-9]+ (\bminutes?\b|\bhours?\b)/g);
    if (durations == null) {
      // no match
      nx = 0;
    } else {
      // match
      x = 0;
      for (let i = 0; i < durations.length; i++) {
        const num = parseInt(durations[i].split(" ")[0]);
        const unit = durations[i].split(" ")[1];
        if (unit == "minute" || unit == "minutes") {
          x += num;
        } else if (unit == "hour" || unit == "hours") {
          x += num * 60;
        }
      }
      nx = 1;
    }
  }

  if (nd == 1 && nt == 1 && nx == 1) {
    // one date, one time => try to set an event with the provided inputs
    if (!d) d = new Date(dates[0].start);
    if (!t) t = toTime(times[0].time);
    const target = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.hours, t.minutes, 0);
    setEvent(target, null, x, false);
    // reset commands
    annyang.removeCommands();
    annyang.addCommands(keywordCommand);
    annyang.addCommands(cancelCommand);
  } else if (nd == 1 && nt == 1 && nx == 0) {
    // one date, one time, no duration
    if (!d) d = new Date(dates[0].start);
    if (!t) t = toTime(times[0].time);
    speak("And how long is your event for?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseSetEventInput(response, d, t, null) });
  } else if (nd == 1 && nt > 1) {
    // one date, multiple times
    if (!d) d = new Date(dates[0].start);
    speak(
      "I heard multiple times to set that event for. Could you clarify which time you want to set your event for?",
      "Clarify"
    );
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseSetEventInput(response, d, null, x) });
  } else if (nd == 1 && nt == 0) {
    // one date, no time
    if (!d) d = new Date(dates[0].start);
    speak("Certainly! And what time would you like to set the event for?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseSetEventInput(response, d, null, x) });
  } else if (nd > 1 && nt == 1) {
    // multiple dates, one time
    if (!t) t = toTime(times[0].time);
    speak(
      "I heard multiple days to set that event for. Could you clarify which day you want to set your event for?",
      "Clarify"
    );
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseSetEventInput(response, null, t, x) });
  } else if (nd > 1 && nt > 1) {
    // multiple dates, multiple times
    speak(
      "I heard multiple days and times to set that event for. Could you clarify a single date and time, please?",
      "Clarify"
    );
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseSetEventInput(response, null, null, x) });
  } else if (nd > 1 && nt == 0) {
    // multiple dates, no time
    speak(
      "I heard multiple days and no time to set that event for. Could you clarify a single date and time, please?",
      "Clarify"
    );
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseSetEventInput(response, null, null, x) });
  } else if (nd == 0 && nt == 1) {
    // no date, one time
    if (!t) t = toTime(times[0].time);
    speak("Absolutely! And what day would you like to set that event for?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseSetEventInput(response, null, t, x) });
  } else if (nd == 0 && nt > 1) {
    // no date, multiple times
    speak(
      "I heard multiple times and no date to set that event for. Could you clarify a single date and time, please?",
      "Clarify"
    );
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseSetEventInput(response, null, null, x) });
  } else if (nd == 0 && nt == 0) {
    // no date, no time
    speak("Of course. And when would you like that event scheduled for?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseSetEventInput(response, null, null, x) });
  } else {
    // no idea
    speak("Sounds like you wanted to set an event. Could you give me a date and a time?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseSetEventInput(response, null, null, x) });
  }
}

/**
 * Set an event for the time given with the given label.
 * @param {Date} time Time to set the event for.
 * @param {String} label (optional) A label for the event.
 * @param {Number} duration How long the event runs, in minutes.
 * @param {Boolean} mute Whether to mute the system responses.
 */
function setEvent(time, label, duration, mute) {
  if (time) {
    if (!Object.hasOwn(events, time.getTime())) {
      eventID++; // get new event ID
      events[time.getTime()] = { id: eventID, time: time, label: label, duration: duration }; // save event by time
      if (label && !Object.hasOwn(events, label)) {
        events[label] = { id: eventID, time: time, label: label, duration: duration }; // save event by label
      }
      if (!mute) speak("Great! Your event is set.", "Success");
    } else {
      if (!mute) speak("I'm sorry, but there's already an event set for that date and time.", "Failure");
    }
  } else {
    console.log(`date and time given to setEvent: ${time}`);
    if (!mute)
      speak(
        "I'm sorry, but something seems to be wrong with the provided date and time. Please check the console for details.",
        "Error"
      );
  }
  console.log(events);
}

function parseDeleteEventInput(userInput, d, t) {
  const userInputDoc = nlp(userInput); // parse input using compromise
  let dates, times;
  let nd = 0;
  let nt = 0;

  if (!d) {
    // only look for a date if one isn't provided
    dates = userInputDoc.dates().json();
    nd = dates.length; // number of dates found
  }
  if (d) nd += 1; // date is given

  if (!t) {
    // only look for a time if one isn't provided
    times = userInputDoc.times().json();
    nt = times.length; // number of times found
  }
  if (t) nt += 1; // time is given

  if (nd == 1 && nt == 1) {
    // one date, one time => try to delete an event with the provided inputs
    if (!d) d = new Date(dates[0].start);
    if (!t) t = toTime(times[0].time);
    const target = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.hours, t.minutes, 0);
    deleteEvent(target, null, false);
    // reset commands
    annyang.removeCommands();
    annyang.addCommands(keywordCommand);
    annyang.addCommands(cancelCommand);
  } else if (nd == 1 && nt > 1) {
    // one date, multiple times
    if (!d) d = new Date(dates[0].start);
    speak(
      "I heard multiple times just now. Could you clarify at which time the event you want to delete is?",
      "Clarify"
    );
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDeleteEventInput(response, d, null) });
  } else if (nd == 1 && nt == 0) {
    // one date, no time
    if (!d) d = new Date(dates[0].start);
    speak("Certainly! And at what time is the event you would like to delete?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDeleteEventInput(response, d, null) });
  } else if (nd > 1 && nt == 1) {
    // multiple dates, one time
    if (!t) t = toTime(times[0].time);
    speak("I heard multiple days just now. Could you clarify on which day the event you want to delete is?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDeleteEventInput(response, null, t) });
  } else if (nd > 1 && nt > 1) {
    // multiple dates, multiple times
    speak("I heard multiple days and times just now. Could you clarify a single date and time, please?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDeleteEventInput(response, null, null) });
  } else if (nd > 1 && nt == 0) {
    // multiple dates, no time
    speak("I heard multiple days and no time just now. Could you clarify a single date and time, please?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDeleteEventInput(response, null, null) });
  } else if (nd == 0 && nt == 1) {
    // no date, one time
    if (!t) t = toTime(times[0].time);
    speak("Absolutely! And on what day is the event you would like to delete?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDeleteEventInput(response, null, t) });
  } else if (nd == 0 && nt > 1) {
    // no date, multiple times
    speak("I heard multiple times and no date just now. Could you clarify a single date and time, please?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDeleteEventInput(response, null, null) });
  } else if (nd == 0 && nt == 0) {
    // no date, no time
    speak("Of course. And when is the event that you would like to delete set currently?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDeleteEventInput(response, null, null) });
  } else {
    // no idea
    speak("Sounds like you wanted to delete an existing event. Could you tell me when it's set currently?", "Clarify");
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDeleteEventInput(response, null, null) });
  }
}

/**
 * Deletes the event with the given time, or if time is not given, label.
 * @param {Date} time Time of the event to delete.
 * @param {String} label Label of the event to delete.
 * @param {Boolean} mute Whether to mute the system responses.
 */
function deleteEvent(time, label, mute) {
  if (time) {
    // time is defined
    if (Object.hasOwn(events, time.getTime())) {
      // event exists
      const oldLabel = events[time.getTime()].label;
      if (oldLabel && Object.hasOwn(events, oldLabel)) {
        delete events[oldLabel]; // remove event by label
      }
      delete events[time.getTime()]; // remove event by time
      if (!mute) speak("Success! Your event was deleted.", "Success");
    } else {
      // event does not exist
      if (!mute) speak("I'm sorry, but there's no event set then currently to delete.", "Failure");
    }
  } else {
    // time is undefined
    if (label) {
      // label is defined
      if (Object.hasOwn(events, label)) {
        // event exists
        const oldTime = events[label].time;
        if (oldTime && Object.hasOwn(events, oldTime.getTime())) {
          delete events[oldTime.getTime()]; // remove event by time
        }
        delete events[label]; // remove event by label
        if (!mute) speak("Success! Your event was deleted.", "Success");
      } else {
        // event does not exist
        if (!mute) speak("I'm sorry, but there's no event with that label currently to delete.", "Failure");
      }
    } else {
      // both time and label are undefined
      console.log(`date and time given to deleteEvent: ${time}`);
      console.log(`label given to deleteEvent: ${label}`);
      if (!mute)
        speak(
          "I'm sorry, but something seems to be wrong with either the provided date and time or label. Please check the console for details.",
          "Error"
        );
    }
  }
  console.log(events);
}

function parseEditEventInput(userInput, d, t, newD, newT) {
  const parts = userInput.split(" to "); // use to determine what to edit
  if (parts.length == 1) {
    // no 'to' used as separator => look for subject date/time
    if (!d || !t) {
      // still looking for 'from' subject
      const userInputFromDoc = nlp(parts[0]); // parse input using compromise
      let dates, times;
      let nd = 0;
      let nt = 0;

      if (!d) {
        // only look for a date if one isn't provided
        dates = userInputFromDoc.dates().json();
        nd = dates.length; // number of dates found
      }
      if (d) nd += 1; // date is given

      if (!t) {
        // only look for a time if one isn't provided
        times = userInputFromDoc.times().json();
        nt = times.length; // number of times found
      }
      if (t) nt += 1; // time is given

      if (nd == 1 && nt == 1) {
        // one date, one time => 'from' subject found.
        if (!d) d = new Date(dates[0].start);
        if (!t) t = toTime(times[0].time);
        const target = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.hours, t.minutes, 0);
        if (Object.hasOwn(events, target.getTime())) {
          // found event to edit => ask for new date/time for that event
          speak("I found the event you want to edit! And to when do you want the event changed?", "Clarify");
          annyang.removeCommands();
          annyang.addCommands(cancelCommand);
          annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, t, null, null) });
        } else {
          // couldn't find event to edit => inform user
          speak("I'm sorry, I couldn't find the event you wanted to edit at time you gave me.", "Failure");
          // reset commands
          annyang.removeCommands();
          annyang.addCommands(keywordCommand);
          annyang.addCommands(cancelCommand);
        }
      } else if (nd == 1 && nt > 1) {
        // one date, multiple times
        if (!d) d = new Date(dates[0].start);
        speak(
          "I heard multiple times just now. Could you clarify at which time the event you want to edit is?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, null, null, null) });
      } else if (nd == 1 && nt == 0) {
        // one date, no time
        if (!d) d = new Date(dates[0].start);
        speak("For sure. And at what time is the event you would like to edit?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, null, null, null) });
      } else if (nd > 1 && nt == 1) {
        // multiple dates, one time
        if (!t) t = toTime(times[0].time);
        speak(
          "I heard multiple days just now. Could you clarify on which day the event you want to edit is?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, null, t, null, null) });
      } else if (nd > 1 && nt > 1) {
        // multiple dates, multiple times
        speak("I heard multiple days and times just now. Could you clarify a single date and time, please?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, null, null, null, null) });
      } else if (nd > 1 && nt == 0) {
        // multiple dates, no time
        speak(
          "I heard multiple days and no time just now. Could you clarify a single date and time, please?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, null, null, null, null) });
      } else if (nd == 0 && nt == 1) {
        // no date, one time
        if (!t) t = toTime(times[0].time);
        speak("Without a doubt. And on what day is the event you would like to edit?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, null, t, null, null) });
      } else if (nd == 0 && nt > 1) {
        // no date, multiple times
        speak(
          "I heard multiple times and no date just now. Could you clarify a single date and time, please?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, null, null, null, null) });
      } else if (nd == 0 && nt == 0) {
        // no date, no time
        speak("Ok. And when is the event that you would like to edit set currently?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, null, null, null, null) });
      } else {
        // no idea
        speak(
          "Sounds like you wanted to edit an existing event. Could you tell me when it's set currently?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, null, null, null, null) });
      }
    } else {
      // now looking for 'to' subject
      const userInputToDoc = nlp(parts[0]); // parse input using compromise
      let dates, times;
      let nd = 0;
      let nt = 0;

      if (!newD) {
        // only look for a date if one isn't provided
        dates = userInputToDoc.dates().json();
        nd = dates.length; // number of dates found
      }
      if (newD) nd += 1; // date is given

      if (!newT) {
        // only look for a time if one isn't provided
        times = userInputToDoc.times().json();
        nt = times.length; // number of times found
      }
      if (newT) nt += 1; // time is given

      if (nd == 1 && nt == 1) {
        // one date, one time => 'to' subject found.
        if (!newD) newD = new Date(dates[0].start);
        if (!newT) newT = toTime(times[0].time);
        const target = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.hours, t.minutes, 0);
        const newTarget = new Date(newD.getFullYear(), newD.getMonth(), newD.getDate(), newT.hours, newT.minutes, 0);
        editEventTime(target, null, newTarget);
        // reset commands
        annyang.removeCommands();
        annyang.addCommands(keywordCommand);
        annyang.addCommands(cancelCommand);
      } else if (nd == 1 && nt > 1) {
        // one date, multiple times
        if (!newD) newD = new Date(dates[0].start);
        speak(
          "I heard multiple times just now. Could you clarify what time you want to change the event to?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, t, newD, null) });
      } else if (nd == 1 && nt == 0) {
        // one date, no time
        if (!newD) newD = new Date(dates[0].start);
        speak("Of course. And what time do you want the event to be changed to?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, t, newD, null) });
      } else if (nd > 1 && nt == 1) {
        // multiple dates, one time
        if (!newT) newT = toTime(times[0].time);
        speak(
          "I heard multiple days just now. Could you clarify which day you want the event to be changed to?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, t, null, newT) });
      } else if (nd > 1 && nt > 1) {
        // multiple dates, multiple times
        speak("I heard multiple days and times just now. Could you clarify a single date and time, please?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, t, null, null) });
      } else if (nd > 1 && nt == 0) {
        // multiple dates, no time
        speak(
          "I heard multiple days and no time just now. Could you clarify a single date and time, please?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, t, null, null) });
      } else if (nd == 0 && nt == 1) {
        // no date, one time
        if (!newT) newT = toTime(times[0].time);
        speak("You got it. And what day do you want to change the event to?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, t, null, newT) });
      } else if (nd == 0 && nt > 1) {
        // no date, multiple times
        speak(
          "I heard multiple times and no date just now. Could you clarify a single date and time, please?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, t, null, null) });
      } else if (nd == 0 && nt == 0) {
        // no date, no time
        speak("On it. And to when do you want the event changed?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, t, null, null) });
      } else {
        // no idea
        speak("I'm sorry, could you repeat to when you want the event changed?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, t, null, null) });
      }
    }
  } else if (parts.length == 2) {
    // assume 'from' and 'to' are in order => get subject for each
    const userInputFromDoc = nlp(parts[0]); // parse input using compromise
    const userInputToDoc = nlp(parts[1]); // parse input using compromise
    let dates, times;
    let nfd = 0; // number 'from' dates
    let ntd = 0; // number 'to' dates
    let nft = 0; // number 'from' times
    let ntt = 0; // number 'to' times

    if (!d) {
      // only look for a date if one isn't provided
      dates = userInputFromDoc.dates().json();
      nfd = dates.length; // number of dates found
    }
    if (d) nfd += 1; // date is given

    if (!t) {
      // only look for a time if one isn't provided
      times = userInputFromDoc.times().json();
      nft = times.length; // number of times found
    }
    if (t) nft += 1; // time is given

    if (!newD) {
      // only look for a date if one isn't provided
      dates = userInputToDoc.dates().json();
      ntd = dates.length; // number of dates found
    }
    if (newD) ntd += 1; // date is given

    if (!newT) {
      // only look for a time if one isn't provided
      times = userInputToDoc.times().json();
      ntt = times.length; // number of times found
    }
    if (newT) ntt += 1; // time is given

    if (nfd == 1 && ntd == 1 && nft == 1 && ntt == 1) {
      // one of each => 'from' and 'to' subject found.
      if (!d) d = new Date(dates[0].start);
      if (!t) t = toTime(times[0].time);
      if (!newD) newD = new Date(dates[0].start);
      if (!newT) newT = toTime(times[0].time);
      const target = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.hours, t.minutes, 0);
      const newTarget = new Date(newD.getFullYear(), newD.getMonth(), newD.getDate(), newT.hours, newT.minutes, 0);
      editEventTime(target, null, newTarget);
      // reset commands
      annyang.removeCommands();
      annyang.addCommands(keywordCommand);
      annyang.addCommands(cancelCommand);
    } else {
      // look for 'from' subject
      if (nfd == 1 && nft == 1) {
        // one date, one time => 'from' subject found.
        if (!d) d = new Date(dates[0].start);
        if (!t) t = toTime(times[0].time);
        const target = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.hours, t.minutes, 0);
        if (!Object.hasOwn(events, target.getTime())) {
          // couldn't find event to edit => inform user
          speak("I'm sorry, I couldn't find the event you wanted to edit at time you gave me.", "Failure");
          // reset commands
          annyang.removeCommands();
          annyang.addCommands(keywordCommand);
          annyang.addCommands(cancelCommand);
        } else {
          // look for 'to' subject
          if (ntd == 1 && ntt > 1) {
            // one date, multiple times
            if (!newD) newD = new Date(dates[0].start);
            speak(
              "I heard multiple times just now. Could you clarify what time you want to change the event to?",
              "Clarify"
            );
            annyang.removeCommands();
            annyang.addCommands(cancelCommand);
            annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, t, newD, null) });
          } else if (ntd == 1 && ntt == 0) {
            // one date, no time
            if (!newD) newD = new Date(dates[0].start);
            speak("Of course. And what time do you want the event to be changed to?", "Clarify");
            annyang.removeCommands();
            annyang.addCommands(cancelCommand);
            annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, t, newD, null) });
          } else if (ntd > 1 && ntt == 1) {
            // multiple dates, one time
            if (!newT) newT = toTime(times[0].time);
            speak(
              "I heard multiple days just now. Could you clarify which day you want the event to be changed to?",
              "Clarify"
            );
            annyang.removeCommands();
            annyang.addCommands(cancelCommand);
            annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, t, null, newT) });
          } else if (ntd > 1 && ntt > 1) {
            // multiple dates, multiple times
            speak(
              "I heard multiple days and times just now. Could you clarify a single date and time, please?",
              "Clarify"
            );
            annyang.removeCommands();
            annyang.addCommands(cancelCommand);
            annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, t, null, null) });
          } else if (ntd > 1 && ntt == 0) {
            // multiple dates, no time
            speak(
              "I heard multiple days and no time just now. Could you clarify a single date and time, please?",
              "Clarify"
            );
            annyang.removeCommands();
            annyang.addCommands(cancelCommand);
            annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, t, null, null) });
          } else if (ntd == 0 && ntt == 1) {
            // no date, one time
            if (!newT) newT = toTime(times[0].time);
            speak("You got it. And what day do you want to change the event to?", "Clarify");
            annyang.removeCommands();
            annyang.addCommands(cancelCommand);
            annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, t, null, newT) });
          } else if (ntd == 0 && ntt > 1) {
            // no date, multiple times
            speak(
              "I heard multiple times and no date just now. Could you clarify a single date and time, please?",
              "Clarify"
            );
            annyang.removeCommands();
            annyang.addCommands(cancelCommand);
            annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, t, null, null) });
          } else if (ntd == 0 && ntt == 0) {
            // no date, no time
            speak("On it. And to when do you want the event changed?", "Clarify");
            annyang.removeCommands();
            annyang.addCommands(cancelCommand);
            annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, t, null, null) });
          } else {
            // no idea
            speak("I'm sorry, could you repeat to when you want the event changed?", "Clarify");
            annyang.removeCommands();
            annyang.addCommands(cancelCommand);
            annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, t, null, null) });
          }
        }
      } else if (nfd == 1 && nft > 1) {
        // one date, multiple times
        if (!d) d = new Date(dates[0].start);
        speak(
          "I heard multiple times just now. Could you clarify at which time the event you want to edit is?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, null, null, null) });
      } else if (nfd == 1 && nft == 0) {
        // one date, no time
        if (!d) d = new Date(dates[0].start);
        speak("For sure. And at what time is the event you would like to edit?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, d, null, null, null) });
      } else if (nfd > 1 && nft == 1) {
        // multiple dates, one time
        if (!t) t = toTime(times[0].time);
        speak(
          "I heard multiple days just now. Could you clarify on which day the event you want to edit is?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, null, t, null, null) });
      } else if (nfd > 1 && nft > 1) {
        // multiple dates, multiple times
        speak("I heard multiple days and times just now. Could you clarify a single date and time, please?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, null, null, null, null) });
      } else if (nfd > 1 && nft == 0) {
        // multiple dates, no time
        speak(
          "I heard multiple days and no time just now. Could you clarify a single date and time, please?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, null, null, null, null) });
      } else if (nfd == 0 && nft == 1) {
        // no date, one time
        if (!t) t = toTime(times[0].time);
        speak("Without a doubt. And on what day is the event you would like to edit?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, null, t, null, null) });
      } else if (nfd == 0 && nft > 1) {
        // no date, multiple times
        speak(
          "I heard multiple times and no date just now. Could you clarify a single date and time, please?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, null, null, null, null) });
      } else if (nfd == 0 && nft == 0) {
        // no date, no time
        speak("Ok. And when is the event that you would like to edit set currently?", "Clarify");
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, null, null, null, null) });
      } else {
        // no idea
        speak(
          "Sounds like you wanted to edit an existing event. Could you tell me when it's set currently?",
          "Clarify"
        );
        annyang.removeCommands();
        annyang.addCommands(cancelCommand);
        annyang.addCommands({ "*response": (response) => parseEditEventInput(response, null, null, null, null) });
      }
    }
  } else {
    // no idea
    speak(
      "Sounds like you wanted to edit an existing event. Could you tell me which event you want to change and how you want to change it?",
      "Clarify"
    );
    annyang.removeCommands();
    annyang.addCommands(cancelCommand);
    annyang.addCommands({ "*response": (response) => parseDeleteEventInput(response, null, null) });
  }
}

/**
 * Sets the `time` prop of an event with the given time, or if the time is not
 * give, label, to the given value.
 * @param {Date} time Time of the event to edit.
 * @param {String} label Label of the event to edit.
 * @param {Date} newTime New time to give to the event.
 */
function editEventTime(time, label, newTime) {
  if (time) {
    // time is defined
    if (Object.hasOwn(events, time.getTime())) {
      // event exists
      const oldLabel = events[time.getTime()].label;
      const oldDuration = events[time.getTime()].duration;
      deleteEvent(time, oldLabel, true);
      setEvent(newTime, oldLabel, oldDuration, true);
      speak("Success! Your event was changed.", "Success");
    } else {
      // event does not exist
      speak("I'm sorry, but there's no event set then currently to edit.", "Failure");
    }
  } else {
    // time is undefined
    if (label) {
      // label is defined
      if (Object.hasOwn(events, label)) {
        // event exists
        const oldTime = events[label].time;
        const oldDuration = events[label].duration;
        deleteEvent(oldTime, label, true);
        setEvent(newTime, label, oldDuration, true);
        speak("Success! Your event was changed.", "Success");
      } else {
        // event does not exist
        speak("I'm sorry, but there's no event with that label currently to edit.", "Failure");
      }
    } else {
      // both time and label are undefined
      console.log(`date and time given to editEventTime: ${time}`);
      console.log(`label given to editEventTime: ${label}`);
      if (!mute)
        speak(
          "I'm sorry, but something seems to be wrong with either the provided date and time or label. Please check the console for details.",
          "Error"
        );
    }
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
    deleteEvent(time, oldLabel, true);
    setEvent(time, newLabel, oldDuration, true);
  } else if (label && Object.hasOwn(events, label)) {
    const oldTime = events[label].time;
    const oldDuration = events[label].duration;
    deleteEvent(oldTime, label, true);
    setEvent(oldTime, newLabel, oldDuration, true);
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
    deleteEvent(time, oldLabel, true);
    setEvent(time, oldLabel, newDuration, true);
  } else if (label && Object.hasOwn(events, label)) {
    const oldTime = events[label].time;
    const oldLabel = events[label].label;
    deleteEvent(oldTime, label, true);
    setEvent(oldTime, oldLabel, newDuration, true);
  }
  console.log(events);
}

/** ============================== SPEECH ================================== */

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
    setTimeout(() => {
      testBtn.disabled = true;
      testBtn.textContent = "Speaking ...";
      startBtn.disabled = true;
      // append message to the GUI
      let color = "";
      switch (result) {
        case "Success": {
          color = "#4caf50";
          break;
        }
        case "Test": {
          color = "#1976d2";
          break;
        }
        case "Clarify": {
          color = "#fb8c00";
          break;
        }
        case "Failure":
        case "Error": {
          color = "#ff5252";
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
    }, 500); // set a short delay
  }
}

/** ============================== HELPERS ================================= */

/**
 * Attempts to get the hours and minutes from the given string representation of time.
 *
 * See: https://stackoverflow.com/a/49185071
 *
 * @param {String} str String representation of a given time; e.g., "1:00pm"
 * @returns {Object} { hours: [0-23], minutes: [0-59] }
 */
function toTime(str) {
  let post_meridiem = false;
  let ante_meridiem = false;
  let hours = 0;
  let minutes = 0;
  let time;
  if (str != null) {
    post_meridiem = str.match(/p/i) !== null;
    ante_meridiem = str.match(/a/i) !== null;
    // Preserve 2400h str by changing leading zeros to 24.
    str = str.replace(/^00/, "24");
    // Strip the string down to digits and convert to a number.
    time = parseInt(str.replace(/\D/g, ""));
  } else {
    time = 0;
  }
  if (time > 0 && time < 24) {
    // 1 through 23 become hours, no minutes.
    hours = time;
  } else if (time >= 100 && time <= 2359) {
    // 100 through 2359 become hours and two-digit minutes.
    hours = ~~(time / 100);
    minutes = time % 100;
  } else if (time >= 2400) {
    // After 2400, it's midnight again.
    minutes = time % 100;
    post_meridiem = false;
  }
  if (hours == 12 && ante_meridiem === false) {
    post_meridiem = true;
  }
  if (hours < 12 && post_meridiem == true) {
    hours += 12;
  }
  if (minutes > 59) {
    minutes = 59;
  }
  return {
    hours: hours,
    minutes: minutes,
  };
}
