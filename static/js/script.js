// alert('I was devoloped by @rakeeb_abd');

 // challenge 1
 function calculateAge() {
     var birthYear = prompt("What's your birth year???");
     age = 2020 - birthYear;
     ageInDays = age * 365;
     var h1 = document.createElement('h1');
     var textAnswer = document.createTextNode('You are ' + ageInDays + ' days old' + ' (' + age + ' Years old)');
     h1.setAttribute('id', 'ageInDays');
     h1.append(textAnswer);
     document.getElementById('flex-box-result').appendChild(h1);
 }

 function reset() {
     document.getElementById('ageInDays').remove();
 }

 // --------------------------------------------------challenge 2---------------------------------------------------------
function genCat() {
    var image = document.createElement('img');
    image.setAttribute('id', 'catimg')
    var div = document.getElementById('cat-box')
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

function resetbox() {
    document.getElementById('catimg').remove();
}

//-------------------------------------------------- challenge 3:RPS------------------------------------------------------
function rpsGame(yourChoice) {
    console.log(yourChoice);
    
    var humanChoice, botChoice;
    var humanChoice = yourChoice.id;
    botChoice = numberToChoice(randomRpsInt());
    
    console.log('bot chose',botChoice);
    
    results = dicideWinner(humanChoice,botChoice);
    console.log(results);

    message = finalMessage(results);
    console.log(message);

    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randomRpsInt() {
    return Math.floor(Math.random() * 3);
} 

function numberToChoice(number) {
    return ['rock', 'paper', 'scissor'][number];
}

function dicideWinner(yourChoice,computerChoice) {
    var rpsDatabse = {
        'rock': {'scissor':1 , 'rock':0.5, 'paper':0},
        'paper': {'scissor':0 , 'rock':1, 'paper':0.5},
        'scissor': {'scissor':0.5 , 'rock':0, 'paper':1},
    };

    var yourScore = rpsDatabse[yourChoice][computerChoice];
    var computerScore = rpsDatabse[computerChoice][yourChoice];

    return [yourScore,computerScore];
}

function finalMessage([yourScore,computerScore]) {
    if (yourScore === 0) {
        return {'message':'You Lost!', 'color':'red'};
    } else if (yourScore === 0.5) {
        return {'message':'You tied!', 'color':'yellow'};
    } else {
        return {'message':'You won!', 'color':'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice ,finalMessage) {
    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src,
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.7)'>" 
    messageDiv.innerHTML= "<h1 style='color: " + finalMessage['color'] + "; font-size:60px; padding:30px '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(255, 0, 0, 1)'>" 
   
    document.getElementById('flex-box-container-rps-div').appendChild(humanDiv); 
    document.getElementById('flex-box-container-rps-div').appendChild(messageDiv); 
    document.getElementById('flex-box-container-rps-div').appendChild(botDiv); 

   
}


//--------------------------------------------------challenge 4-----------------------------------------------------------

var all_buttons = document.getElementsByTagName('button');
console.log(all_buttons);

var copyAllButtons = [];

for (let i=  0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}
console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
    console.log(buttonThingy.value)

    if (buttonThingy.value === 'red') {
        buttonsColor('btn-danger');
    } else if (buttonThingy.value === 'green') {
        buttonsColor('btn-success');
    } else if (buttonThingy.value === 'yellow') {
        buttonsColor('btn-warning');
    } else if (buttonThingy.value === 'blue') {
        buttonsColor('btn-primary');
    }else if (buttonThingy.value === 'reset') {
        buttonColorReset();
    } else if(buttonThingy.value === 'random') {
        randomColors();
    }
}

function buttonsColor(color) {
    for (i=0; i<all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(color);
    }
}

function buttonColorReset() {
    for (i=0; i<all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors() {
    let choices = ['btn-danger', 'btn-success', 'btn-primary', 'btn-warning']

    for (i=0; i<all_buttons.length; i++) {
        var randInt = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randInt]);
    }
}

//----------------------------------------- Challenge 5 black--------------------------------------------------------------
let blackjackGame = {
    'you':{'scoreSpan': '#your-blackjack-result', 'div':'#your-box','score': 0} ,
    'dealer':{'scoreSpan': '#dealer-blackjack-result', 'div':'#dealer-box','score': 0} ,
    'cards': ['2','3','4','5','6','7','8','9','10','A','K','Q','J'] ,
    'cardsMap': {'2': 2,'3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9,'10': 10,'A':[1,11],'K': 10,'Q': 10,'J':10} ,
    'wins' : 0 ,
    'losses' : 0,
    'draws' : 0,
    'isStand' : false,
    'turnsOver' : false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);

document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);

function blackjackHit(){
    if (blackjackGame['isStand'] === false){
        let card = randomCard();
        console.log(card);    
        showCard(card, YOU);
        updateScore(card,YOU)
        showScore(YOU);
        console.log(YOU['score']);
    }
}

function showCard(card,activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement("img");
        cardImage.src = `static/images/bj/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true){
        blackjackGame['isStand'] = false;
        
        yourImages = document.querySelector('#your-box').querySelectorAll('img');
        dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (i=0;i<yourImages.length;i++) {
            yourImages[i].remove();
        }

        for (i=0;i<dealerImages.length;i++) {
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;    
        document.querySelector('#dealer-blackjack-result').textContent = 0; 
        
        document.querySelector('#your-blackjack-result').style.color = 'white';    
        document.querySelector('#dealer-blackjack-result').style.color = 'white'; 
        
        document.querySelector('#blackjack-result').textContent = "Let's play"

        document.querySelector('#blackjack-result').style.color = 'white'
        blackjackGame['turnsOver'] = true;
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function updateScore(card,activePlayer) {
    if (card==='A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {  
    activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!!!'
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'; 
    } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic (){
    blackjackGame['isStand'] = true;
    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000); 
    }
//if (DEALER['score'] > 15) 
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);

}

function computeWinner() {
    let winner;
    if (YOU['score'] <= 21) {

        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            blackjackGame['wins']++;
            winner = YOU
        }else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER
        }else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }
    } else if (YOU['score']>21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }
    console.log('Winner is ', winner)
    console.log(blackjackGame);
    return winner;
}

function showResult(winner) {
    let message,messageColor;

    if (blackjackGame['turnsOver'] === true){

        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!!!';
            messageColor = 'green';
            winSound.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!!!';
            messageColor = 'red';
            lossSound.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You tied';
            messageColor = 'yellow';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}