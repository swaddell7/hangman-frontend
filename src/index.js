const usersUrl = 'http://localhost:3000/users'
const gamesUrl = 'http://localhost:3000/games'

function main() {
  createUser();
  handleUsernameFormSubmit();
  handleStartGameClick();
}

function handleUsernameFormSubmit() {
  const form = document.querySelector('#login')
  const loginView = document.querySelector('#login-view')
  const startGameView = document.querySelector('#start-game-view')
  const gameView = document.querySelector('#game-view')
  form.addEventListener('submit', event => {
    loginView.style.display = 'none';
    startGameView.style.display = 'block';
    gameView.style.display = 'none'
  })
}


function createUser(){
  const startGame = document.querySelector('#start-game-view');
  const form = document.querySelector('#login')
  form.addEventListener('submit', function(event){
    event.preventDefault();
    const formData = { 'username': event.target[0].value };
    const reqObj = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify(formData)
    };
    fetch(usersUrl, reqObj)
    .then(resp => resp.json())
    .then(newUser => {
      startGame.dataset.id = newUser.id
    })
    
  })
}

function handleStartGameClick() {
  const startGame = document.querySelector('#start-game-view');
  startGame.addEventListener('click', function(event){
    if (event.target.tagName === 'BUTTON') {
      const loginView = document.querySelector('#login-view')
      const startGameView = document.querySelector('#start-game-view')
      const gameView = document.querySelector('#game-view')

      loginView.style.display = 'none';
      startGameView.style.display = 'none';
      gameView.style.display = 'block';
      
      const formData = { 'user_id': parseInt(event.target.parentNode.dataset.id) };
      const reqObj = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify(formData)
      };

      fetch(gamesUrl, reqObj)
      .then(resp => resp.json())
    }
  })
}

main()