let scores,roundScore,gamePlaying,currentScore1,currentScore2,diceSelect,aiPlayer,panel1,panel2,multiPlayer,pcPlayer,
pcPlayerValue,multiPlayerValue,gameScreen,selectMenu,playerName,activePlayer;
currentScore1 = document.getElementById("current-0");
currentScore2 = document.getElementById("current-1");
panel1=document.querySelector(".player-0-panel");
panel2 = document.querySelector(".player-1-panel");
diceSelect = document.querySelector(".dice");
selectMenu = document.querySelector(".select-container").style;
gameScreen = document.querySelector(".wrapper").style;
pcPlayerValue = document.getElementById("pc").value;
multiPlayerValue = document.getElementById("multi").value;
//Play button
document.querySelector(".btn-play").addEventListener('click',()=>{
    multiPlayer = document.getElementById("multi").checked;
    pcPlayer = document.getElementById("pc").checked;
    selectMenu.width = "0";
    selectMenu.transition = "width .2s";
    gameScreen.height = "95vh";
    gameScreen.transition = "height 1s";
    multiPlayer===true?playerName=multiPlayerValue:playerName=pcPlayerValue;   
    init(playerName);
});
//Hide gamescreen
function hideGameScreen(){
    selectMenu.width = "1000px";
    gameScreen.height = "0";
    selectMenu.transition = "width .5s";
    gameScreen.transition = "height .3s";
    gamePlaying=false;
    }

//Start Game

function init(playerTwoName){
    activePlayer = 0;
    aiPlayer = false;
    scores = [0,0]
    roundScore = 0;
    gamePlaying = true;
    diceSelect.style.display = "none";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    currentScore1.textContent = "0";
    currentScore2.textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = playerTwoName;
    panel1.classList.remove("winner");
    panel2.classList.remove("winner");
    panel1.classList.remove("active");
    panel2.classList.remove("active");
    panel1.classList.add("active");
    document.getElementById("name-0").style.animation = "";
    document.getElementById("name-1").style.animation = "";
}
//Roll Dice
document.querySelector(".btn-roll").addEventListener('click',rollDiceBtn);
function rollDiceBtn(){
    
    if(gamePlaying && !aiPlayer){
        
        diceRoll(activePlayer);
    }

}
//Dice
function diceRoll(player){
    document.querySelector(".btn-roll").disabled = true;
    document.querySelector(".btn-new").disabled =true;
    document.querySelector(".btn-hold").disabled=true;
    const dice = Math.floor((Math.random()*6)+1);
    diceSelect.style.display = "block";
    diceSelect.style.animation = "anim .4s infinite";
    let i = 1;
    function animation_dice(){
      setTimeout(()=>{
        diceSelect.src = "dice-"+i+".png";
        i++;
        if(i<=6){
            animation_dice();
            
        }
        else{
            if(dice===1){
                document.getElementById("current-"+player).style.animation= "currentText .4s 3";
                setTimeout(()=>{
                    document.getElementById("current-"+player).style.animation= "";
                    toggle();
                    document.querySelector(".btn-roll").removeAttribute("disabled");
            document.querySelector(".btn-new").removeAttribute("disabled");                  
                },1200);
                diceSelect.src = "dice-"+dice+".png";
                diceSelect.style.animation = "";
                
                
                }
            else{
                roundScore+=dice;
                document.getElementById("current-"+player).style.animation= "currentText .4s 3";
                setTimeout(()=>document.getElementById("current-"+player).style.animation= "",800)
                document.getElementById("current-"+player).textContent = roundScore;
                diceSelect.style.animation = "";
                diceSelect.src = "dice-"+dice+".png";
                setTimeout(()=>diceSelect.style.display = "none",1000);
                setTimeout(()=>document.querySelector(".btn-roll").removeAttribute("disabled"),1200);
            }  
            document.querySelector(".btn-hold").removeAttribute("disabled");
            if(!aiPlayer)document.querySelector(".btn-new").removeAttribute("disabled");
        }
        
    },300)
    }
    animation_dice();       
 return dice;   
}

//Hold
document.querySelector(".btn-hold").addEventListener('click',hold);
function hold(){
    if(gamePlaying && !aiPlayer){
        checkWin(activePlayer);
    }
    
}
//toggling Player
function toggle(){
    if(pcPlayer)aiPlayer==true?aiPlayer=false:aiPlayer=true;
    else activePlayer===0?activePlayer=1:activePlayer=0;
    roundScore=0;
    currentScore1.textContent = "0";
    currentScore2.textContent = "0";
    panel1.classList.toggle("active");
    panel2.classList.toggle("active");
    

    //Ai Player's turn
    aiTurn();
}
//New Game
document.querySelector(".btn-new").addEventListener("click",()=>{
    init();
    hideGameScreen();    
});

//Win Condition
function checkWin(player){

   if(!aiPlayer)checkingWin();
   else setTimeout(()=>{checkingWin();document.querySelector(".btn-new").removeAttribute("disabled");},3000);

    function checkingWin(){
        document.getElementById("score-"+player).style.animation = "totalScore .4s 3";
        setTimeout(()=>{document.getElementById("score-"+player).style.animation = ""},800)
        scores[player]+=roundScore;
        document.getElementById("score-"+player).textContent = scores[player];
            if(scores[player]>=100){
                document.getElementById("name-"+player).textContent = "Winner!";
                document.querySelector(".player-"+player+"-panel").classList.add("winner");
                document.querySelector("#name-"+player).style.animation = "totalScore .4s infinite";
                document.querySelector(".player-"+player+"-panel").classList.remove("active");
                diceSelect.style.display = "none";
                gamePlaying=false;
            }else{
             toggle();
            }
        }
}

//Ai player
function aiTurn(){
if(gamePlaying && aiPlayer) {ai();}
    function ai(){
    document.querySelector(".btn-new").disabled=true;
    const num = Math.floor((Math.random()*8)+1);
    let i = 1;
        function call(){
           const roll = diceRoll(1);
           i++;
            if(i<=num&&roll!==1 ){
                    if(gamePlaying&&aiPlayer)
                    setTimeout(call,3000);
            }
            else {
                if(gamePlaying && aiPlayer && roll!==1)
                  checkWin(1);                       
            }
        }
    setTimeout(call,1000);
    }
}
