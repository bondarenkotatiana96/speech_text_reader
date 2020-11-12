const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textArea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "img/drink.jpg",
    text: "I'm Thirsty"
  },
  {
    image: "img/angry.jpg",
    text: "I'm Angry"
  },
  {
    image: "img/food.jpg",
    text: "I'm Hungry"
  },
  {
    image: "img/grandma.jpg",
    text: "I want to go to Grandmas"
  },
  {
    image: "img/happy.jpg",
    text: "I'm Happy"
  },
  {
    image: "img/home.jpg",
    text: "I want to go home"
  },
  {
    image: "img/hurt.jpg",
    text: "I'm Hurt"
  },
  {
    image: "img/outside.jpg",
    text: "I want to go outside"
  },
  {
    image: "img/sad.jpg",
    text: "I'm Sad"
  },
  {
    image: "img/scared.jpg",
    text: "I'm Scared"
  },
  {
    image: "img/school.jpg",
    text: "I'm at school"
  },
  {
    image: "img/tired.jpg",
    text: "I'm Tired"
  }
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  
  const box = document.createElement("div");
  
  const { image, text } = item;

  box.classList.add("box");
  box.innerHTML = `
  <img src="${image}" alt="${text}" />
  <p class="info">${text}</p>
  `;

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    // Add active effect

    box.classList.add("active"); 
    setTimeout(() => box.classList.remove("active"), 800);
  });

  main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices () {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
};

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set new voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

// Toggle text box
toggleBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.toggle("show");
  textArea.value = "";}
  );

// Close button
closeBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.remove("show");
  textArea.value = "";}
  );

// Change voice
voicesSelect.addEventListener("change", setVoice);

// Read text button
readBtn.addEventListener("click", () => {
  setTextMessage(textArea.value);
  speakText();
});

getVoices();