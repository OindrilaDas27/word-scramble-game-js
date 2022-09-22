const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
let inputField = document.querySelector(".input-text");

let correctWord, timer;

const initTimer = maxTime => {
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--; // decrement maxTime by -1
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`Time Up! ${correctWord.toUpperCase()} was the correct word`);
        initGame(); // calling initGame function to start a new game
    }, 1000);
}

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split(""); // splitting each letter of random word
    for (let i = wordArray.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * (wordArray.length)); // geting random number
        let temp = wordArray[i];
        wordArray[i] = wordArray[j];
        wordArray[j] = temp;
    
    }
    wordText.innerText = wordArray.join(""); // passing shuffled word as word text
    hintText.innerText = randomObj.hint; //passing shuffled word as word text
    correctWord = randomObj.word.toLowerCase(); // passing random word to correctWord 
    inputField.value = ""; // making input field empty
    inputField.setAttribute("maxlength", correctWord.length); // setting input maxlength attr value to word length
    console.log(correctWord);
} // getting random object from words
// math.floor returns nearest integer to the number, rounding DOWN.
// math.random returns a random number between 0 (inclusive),  and 1 (exclusive)
initGame();

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase(); // getting user value; 
    if(!userWord) return alert("Please enter a word check");
    if(userWord !== correctWord) return alert(`Oops! ${userWord} is not a correct word`);
    alert(`Congrats! ${userWord.toUpperCase()} is a correct word`);
    initGame();
}

refreshBtn.addEventListener("click", initGame); 
checkBtn.addEventListener("click", checkWord); 