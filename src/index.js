const usersUrl = 'http://localhost:3000/users'

function main() {
  createUser();
  handleUsernameFormSubmit();
}

function handleUsernameFormSubmit() {
  const form = document.querySelector('#login')
  const loginView = document.querySelector('#login-view')
  const gameView = document.querySelector('#game-view')
  form.addEventListener('submit', event => {
    loginView.style.display = 'none';
    gameView.style.display = 'block'
  })
}

function createUser(){
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
    .then(data => console.log(data))
  })
}

main()