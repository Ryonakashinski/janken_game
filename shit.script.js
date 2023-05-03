const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
// Every time you mention id from html, you need a declaration statement to acquire the
const typeDisplay = document.getElementById("typeDisplay");
const typeInput = document.getElementById("typeInput");
const timer = document.getElementById("timer");
const typeSound = new Audio("./");
const wrongSound = new Audio("./");
// const image = document.getElementById("image");

// 1. // Define the canvas and context =>
// const c = document.createElement("canvas");
// const ctx = c.getContext("2d");
// c.width = 800;
// c.height = 500;
// // Set the position of the canvas to absolute =>
// c.style.position = "absolute";
// c.style.position = "center";
// // Calculate the top and left CSS properties to center the canvas
// const topPos = window.innerHeight / 2 - c.height / 2;
// const leftPos = window.innerWidth / 2 - c.width / 2;
// c.style.top = topPos + "px";
// c.style.left = leftPos + "px";
// // Append the canvas to the document body
// document.body.appendChild(c);
// // <= 1. // Define the canvas and context

// function loop() {
//   // o. change the background-colour
//   ctx.fillStyle = "#26B605";
//   ctx.fillRect(0, 0, c.width, c.height);
//   requestAnimationFrame(loop);
// }

// The judgement for the charactars you typed is correct or not.
// Reads the second argument"()=> {}" every time you input.=>
typeInput.addEventListener("input", () => {
  // Render typing sound =>
  typeSound.play();
  // <= It works, but the sound delays.
  typeSound.currentTime = 0;
  // need a preparation: querySelectorAll("span"); acquires the all span tag in typeDisplay .
  const sentenceArray = typeDisplay.querySelectorAll("span");
  // conpares between typeDisplay and typeInput =>
  // acquires the all charactars in the text box. =>
  // typeInput.value.split("") gets the entered value<The charactars you typed>
  const arrayValue = typeInput.value.split("");
  //  If you type properly, you go to the next sentence.=>
  let correct = true;
  //  compare between sentenceArray and arrayValue
  sentenceArray.forEach((characterSpan, index) => {
    // Conditional Branching =>
    // If typeInput is null, remove the class from characterSpan.=>
    if (arrayValue[index] == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      // The situation which still has some remain sentences =>
      correct = false;
    }
    // If the each charactar of the random sentences == (The input text)The charactars you typed.=>
    else if (characterSpan.innerText == arrayValue[index]) {
      // classList provides access to the class list of that element
      // which may modify the appearance or behavior of the element based on the CSS rules defined for that class.=>
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
      //   if it's not correct =>
    } else {
      characterSpan.classList.add("incorrect");
      characterSpan.classList.remove("correct");

      //   adjust volume =>
      // wrongSound.volume = 0.3;
      // wrongSound.play();
      // wrongSound.currentTime = 0;
      correct = false;
    }
  });
  if (correct == true) {
    // correctSound.play();
    // correctSound.currentTime = 0;
    // if it's correct, The image comes out
    var image = document.createElement("img");

    // Set the source of the image
    image.src = "/..img/poop.png";

    // Add the image to the DOM
    document.body.appendChild(image);
    RenderNextSentence();
  }
  // when the Enter key is pressed and then
  // trigger a function to move to the next sentence.=>
  // (Try=>)
  document.getElementById("myButton").addEventListener("click", function () {
    console.log("Button clicked!");
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // Move to the next slide
      nextSlide();
    }
  });

  // function nextSlide() {
  //   // Logic to move to the next slide
  //   // For example, update the CSS class on the current slide and the next slide
  // }
});

// Asynchronous Access
function GetRandomSentence() {
  return fetch(RANDOM_SENTENCE_URL_API)
    .then((response) => response.json())
    .then((data) => data.content);
  // while you put an onigiri in a microwave, you cant take it out.
  // the warm onigiri is called "json"
  // and you will see the ingredient inside of onigiri
}

// Acquire and display the randome sentences
async function RenderNextSentence() {
  const sentence = await GetRandomSentence();
  // you have to wait for the asynchronous
  // At first,typeDisplay.innerText = "sentence", but after
  // characterSpan.classList.add("correct");, becomes "".;
  typeDisplay.innerText = "";
  // split("") separates the sentences one by one and add span tags
  let oneText = sentence.split("");
  //   forEach() checks the array one by one
  oneText.forEach((character) => {
    // If there are 10 words, create 10 spans.=>
    const characterSpan = document.createElement("span");
    // Put a character in an each span.
    characterSpan.innerText = character;
    console.log(characterSpan);
    // append the characterSpan to typeDisplay
    typeDisplay.appendChild(characterSpan);
    // put some colors on each characters
    // characterSpan.classList.add("correct");
  });
  //  make texts disappear when you go to the next question.
  //   typeInput.innerText = ""; => It doesn't work as innerText is just a text in a tag.
  typeInput.value = "";
  //  if RenderNextSentence is loaded, count will start.
  StartTimer();
}

// wanna set a timer
// let startTime countdown =>
let startTime;
// avoide fixing the time.=>
let originTime = 30;
function StartTimer() {
  timer.innerText = originTime;
  // The current time =>
  startTime = new Date();
  //  The arrow function =>
  setInterval(() => {
    timer.innerText = originTime - getTimerTime();
    // if the countdown reached to 0, should be timeover.
    if (timer.innerText <= 0) TimeUp();
  }, 1000);
  //  <= 1000 means 1 second.
  //  By the above function, the countdown works, but it goes down from 30sec to minus.
  // Then you need to prepare "timeup function".
}

// What is "getTimerTime()"?
// Math.floor deletes the number of decimals
function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
  // <= "new Date()"" delays 1 second by "startTime"
  // <= "/ 1000" fixes from milli-second to second.
}
// if the times up, goes to the next sentence.
function TimeUp() {
  RenderNextSentence();
}

RenderNextSentence();
//RenderNextSentence(); now that you can make sure
//  wheather if the content works on console
