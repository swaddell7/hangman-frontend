function mackMain() {
    displayWord()
    letterButtons()
}
function newRound() {
}
// Alphabet array for letter select
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
// Words sample array
let words = ['noodle', 'cat', 'spaceship', 'fire', 'code', 'house', 'tree', 'cowboy', 'farm', 'raza', 'jess', 'duke', 'mack', 'stefani', 'store', 'computer', 'google', 'desk', 'table', 'chair', 'television', 'auz', 'party', 'birthday', 'cake', 'pie', 'apple', 'buttercup', 'chocolate', 'hangman', 'game', 'park', 'headphones', 'sound', 'money', 'dollar', 'wedge', 'fight', 'brawl', 'pillar', 'tower', 'monument', 'arch', 'door', 'floor', 'ceiling', 'wall', 'brick', 'gravel', 'concrete', 'grass', 'leaf', 'pear', 'grapefruit', 'vanilla', 'pudding', 'wafer', 'cookie', 'icecream', 'flavor', 'color', 'taste', 'vision', 'matrix', 'watermelon', 'sandwich', 'burger', 'pizza', 'yogurt', 'keyboard', 'paper', 'shades', 'sunglasses', 'cactus', 'plant', 'salad', 'glass', 'cup', 'hydroflask', 'whale', 'dolphin', 'fish', 'shark', 'dog', 'puppy', 'pupper', 'goldfish', 'husky', 'coyote', 'dachshund', 'terrier', 'bird', 'chirp', 'twitter', 'instagram', 'social', 'website', 'html', 'css', 'javascript', 'java', 'c', 'sql', 'ruby', 'mouse', 'rat', 'card', 'poker', 'circle', 'rectangle', 'triangle', 'trapezoid', 'zoo', 'word', 'guess', 'jeans', 'blue', 'red', 'green', 'yellow', 'racecar', 'lion', 'powwow', 'pzazz', 'tiger', 'xerox', 'microsoft', 'peewee', 'football', 'basketball', 'baseball', 'diamond', 'silver', 'gold', 'metal', 'steel', 'iron', 'magenta', 'magnificent', 'caveman', 'club', 'yoke', 'oogabooga']
// Iterate over alphabet array and create a button for each letter
function letterButtons() {
    const lettersContainer = document.querySelector('#letters-container')
    lettersContainer.innerHTML = ``
    for (let i = 0; i < alphabet.length; i++) {
        lettersContainer.innerHTML +=
        `<button type="button" id="letter-button">${alphabet[i]}</button>`
    }
    lettersContainer.addEventListener('click', event => letterGuess(event))
}
let wordToGuess = words[Math.floor(Math.random() * words.length)]
let wordDisplay = document.querySelector('.word')
let hiddenWord = wordToGuess.replace(/[a-z]/gi, '_')
let hiddenWordSpaced = hiddenWord.split('')
function displayWord() {
    wordDisplay.innerHTML = `${hiddenWordSpaced.join(' ')}`
}
let letter
let buttonLetter
let splitWord = wordToGuess.split('')
function letterGuess(event) {
    buttonLetter = document.querySelector('#letter-button').innerHTML
    if (event.target.id === 'letter-button') {
        for (let i = 0; i < splitWord.length; i++) {
            if (event.target.innerHTML === splitWord[i]) {
                let changedWord = wordDisplay.innerText
                changedWord = changedWord.replace(/ /g,'').split('')
                changedWord[i] = event.target.innerHTML
                let updatedWord = changedWord.join(' ')
                wordDisplay.innerText = updatedWord
                if(changedWord.join('') === wordToGuess) {
                    getUser(event);
                    nextRound();
                    setTimeout(function(){
                    }, 1000)
                }
            }
        }
    }
}
function nextRound(){
  const nextRoundView = document.querySelector('#next-round-view');
  nextRoundView.style.display = 'block'
}
function getUser(event) {
    const userId = parseInt(event.target.parentNode.dataset.id)
    fetch(`${usersUrl}/${userId}`)
    .then(resp => resp.json())
    .then(user => addPoint(user))
}
function addPoint(user) {
    const newPoints = user.points + 1
    const reqObj = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({ 'points': newPoints })
    }
    fetch(`${usersUrl}/${user.id}`, reqObj)
    .then(resp => resp.json())
    .then(data => console.log(data))
}
mackMain()

const nextRoundButton = document.querySelector('#next-round-button');
nextRoundButton.addEventListener('click', function(){
  nextRoundButton.style.display = 'none'
  wordToGuess = words[Math.floor(Math.random() * words.length)]
  wordDisplay = document.querySelector('.word')
  hiddenWord = wordToGuess.replace(/[a-z]/gi, '_')
  hiddenWordSpaced = hiddenWord.split('')
  displayWord()
})
