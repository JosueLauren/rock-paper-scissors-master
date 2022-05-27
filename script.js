let numberScore = document.querySelector('p.number')
let containerPlayer = document.querySelector('div.player')
let containerInGame = document.querySelector('div.in-game')
let containerYou = document.querySelector('div.div-you')
let containerResult = document.querySelector('div.div-result')
let containerHouse = document.querySelector('div.div-house')

numberScore.innerHTML = window.localStorage.getItem('result-game') || '0'

function showModal(){
    document.querySelector('.modal-rules').style.display = 'block'
    document.querySelector('.back-modal').style.display = 'block'
}

function closeModal(){
    document.querySelector('.modal-rules').style.display = 'none'
    document.querySelector('.back-modal').style.display = 'none'
}

function play(event){
    let youType =  event.target.getAttribute("data-identify")
    switchHouse(youType)
}

function switchHouse(youType){
    let numeroGerado = Math.floor(Math.random() * 5 ) + 1

    switch(numeroGerado){
        case 1: 
            switchWinner(youType, 'spock')
            break;
        case 2: 
            switchWinner(youType, 'scissors')
            break;
        case 3:
            switchWinner(youType, 'paper')
            break;
        case 4:
            switchWinner(youType, 'lizard')
            break;
        default :
            switchWinner(youType, 'rock')
            break;
    }
}

function switchWinner(you, house){

    let youWinner = (you == 'scissors' && house == 'paper') || (you == 'paper' && house == 'rock') || (you == 'rock' && house == 'lizard') || (you == 'lizard' && house == 'spock') || (you == 'spock' && house == 'scissors') || (you == 'scissors' && house == 'lizard') || (you == 'lizard' && house == 'paper') || (you == 'paper' && house == 'spock') || (you == 'spock' && house == 'rock') || (you == 'rock' && house == 'scissors')
    let houseWinner = (you == 'paper' && house == 'scissors') || (you == 'rock' && house == 'paper') || (you == 'lizard' && house == 'rock') || (you == 'spock' && house == 'lizard') || (you == 'scissors' && house == 'spock') || (you == 'lizard' && house == 'scissors') || (you == 'paper' && house == 'lizard') || (you == 'spock' && house == 'paper') || (you == 'rock' && house == 'spock') || (you == 'scissors' && house == 'rock')

    if(youWinner) {
        renderYou(you)
        renderHouse(house)
        renderResultAndBack('win')
    } else if(houseWinner){
        renderYou(you)
        renderHouse(house)
        renderResultAndBack('lose')
    } else {
        renderYou(you)
        renderHouse(house)
        renderResultAndBack('empate')
    }
 }

 function renderYou(you){
     containerPlayer.style.display = 'none'
     containerInGame.style.display = 'flex'

    let stringContainerYou = ` <P class="title-you">YOU PICKED</P>
        <div class=' back-you' style="position: absolute; z-index: -1;">
        <div class="btn-container you ${you} reset-position width-in-game">
        <div class="btn-interna">
            <img src="./images/icon-${you}.svg" alt="${you}">
        </div>
        </div>
    </div>
    
    `
    containerYou.innerHTML = stringContainerYou
 }

 function renderHouse(house){
     setTimeout(() => {

        let stringContainerHouse = ` <p class="title-house">THE HOUSE PICKED</p>
        <div class="back-house" style="position: absolute; z-index: -1;">
        <div class="btn-container house ${house} reset-position width-in-game">
          <div class="btn-interna">
            <img src="./images/icon-${house}.svg" alt="${house}">
          </div>
        </div>
      </div>
        
      `
     containerHouse.innerHTML += stringContainerHouse

     },1000)
 }

 function renderResultAndBack(result){
     setTimeout(() => {
        if(result == 'lose'){
            document.querySelector('div.back-house').classList.add('back-winner')
            containerResult.innerHTML = `<h3>YOU LOSE</h3> <button onclick='PlainAgain()'>PLAY AGAIN</button>`
            if(Number(numberScore.innerHTML) == 0) {
                numberScore.innerHTML = '0'
            } else {
                numberScore.innerHTML = (Number(numberScore.innerHTML) - 1).toString()
            }
            

        } else if(result == 'win') {
            document.querySelector('div.back-you').classList.add('back-winner')
            containerResult.innerHTML = `<h3>YOU WINNER</h3> <button onclick='PlainAgain()' >PLAY AGAIN</button>`
            numberScore.innerHTML = (Number(numberScore.innerHTML) + 1).toString()
        } else {
            
            document.querySelector('div.back-you').classList.remove('back-winner')
            document.querySelector('div.back-house').classList.remove('back-winner')
            containerResult.innerHTML = `<h3>A TIE</h3> <button onclick='PlainAgain()' >PLAY AGAIN</button>`
        }


     },2000)
 }

 function PlainAgain(){
   document.querySelector('div.back-you').classList.remove('back-winner')
   document.querySelector('div.back-house').classList.remove('back-winner')

   window.localStorage.setItem('result-game', numberScore.textContent)

   containerYou.innerHTML = ''
   containerHouse.innerHTML = '<div class="shadown"></div>'
   containerResult.innerHTML = ''

   containerPlayer.style.display = 'grid'
   containerInGame.style.display = 'none'

   
 }

 
