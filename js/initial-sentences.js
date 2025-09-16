// Show random sentences for the title
const sentences = [
"Search with greatest speed!",
"The path is not in the sky. The path is in the heart.",
"The best way to predict the future is to create it.",
"The man who moves a mountain begins by carrying away small stones.",
"A disciplined mind brings happiness.",
"To be prepared is half the victory.",
"Effort is the key.",
"The greater the difficulty, the more glory in surmounting it.",
"The struggle itself toward the heights is enough to fill a man's heart."
];

function displayRandomSentence() {
const randomIndex = Math.floor(Math.random() * sentences.length);
const sentence = sentences[randomIndex];
document.getElementById("randomSentence").innerText = sentence;
}

// Call the function to display a random sentence when the page loads
displayRandomSentence();