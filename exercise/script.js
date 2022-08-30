
//🌟 APP: Fighting Game

let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')
let victorySound = document.getElementById("victory")


const updateGame = (p1,p2) => {

  p1NameDiv.innerText = p1.name
  p2NameDiv.innerText = p2.name
  p1HealthDiv.innerText = p1.health
  p2HealthDiv.innerText = p2.health

  if( p1.health <=0 || p2.health <= 0){
    game.isOver = true
    resultDiv.innerHTML = game.declareWinner(game.isOver,p1,p2)
  }

}


class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }

  strike (player, enemy, attackDmg) {    
    // Get random number between 1 - 10 and that is damageAmount
    const damageAmount = Math.ceil(Math.random() * attackDmg)
    // Subtract the enemy health with the damageAmount
    enemy.health -= damageAmount
    //  Update the game and DOM with updateGame()
    updateGame(p1, p2)
    //  Return a message of 'player name attacks enemy name for damageAmount'
    return `${player.name} attacks ${enemy.name} for ${damageAmount}`
  }
  // ** Heal the player for random number from  1 to 5 **
  heal (player) {
    
    // Get random number between 1 - 5 and store that in hpAmount
    const hpAmount = Math.ceil(Math.random() * 5)
    // Add hpAmount to players health
    player.health += hpAmount
    //  Update the game and DOM with updateGame()
    updateGame(p1, p2)
    //  Return a message of 'player name heals for hpAmount HP'
    return `${player.name} heals for ${hpAmount}`
  }
}

class Game {
  constructor() {
    this.isOver = false;
  }

  // ** If the game is over and a player has 0 health declare the winner! **
  declareWinner(isOver,p1, p2) {
    
    // Create a message variable that will hold a message based on the condition
    let message = ""
    // If isOver is true AND p1 health is <= 0 then update message variable  to 'p1 WINS!'
    if(isOver && p1.health <= 0 ){
      message = "p2 WINS!"
      victorySound.play()
    }
    // Else if isOver is true AND p2 health is <= 0 then update message variable  to 'p2 WINS!'
    else if(isOver && p2.health <= 0){
      message = "p1 WINS!"
      victorySound.play()
    }
    // Return message variable 
    return message
  }

  // ** Reset the players health back to it's original state and isOver to FALSE **
  reset(p1,p2) {
    // set p1 health and p2 health back to 100 and isOver back to false and clear resultDiv.innerText and don't forget to updateGame()
    p1.health  = 100
    p2.health = 100
    this.isOver = false
    resultDiv.innerText = ""
    updateGame(p1,p2)
  }
  
  // ** Simulates the whole match untill one player runs out of health **
  play(p1, p2) {
    // Reset to make sure player health is back to full before starting
    this.reset(p1,p2)
    // Make sure the players take turns untill isOver is TRUE
    while (!this.isOver) {
      //Make sure both players get strike() and heal() once each loop
      resultDiv.innerText = p1.heal(p1)
      resultDiv.innerText = resultDiv.innerText = p2.heal(p2)
      resultDiv.innerText = resultDiv.innerText = p1.strike(p1,p2,20)
      resultDiv.innerText = resultDiv.innerText = p2.strike(p2,p1,20)
     
    }
    // Once isOver is TRUE run the declareWinner() method 
    resultDiv.innerHTML = this.declareWinner(this.isOver, p1, p2)
  }

}



// ** Save original Player Data into a variable in order to reset **
let p1 = new Player("Famosa", 100, 20);
let p2 = new Player("Muyiwa", 80, 40);

// ** Create the game object from the Game class **
let game = new Game();
// ** Intialize the game by calling updateGame() **
updateGame(p1, p2, game.isOver)

// ** Save intial isOver from the game object inside this variable **
let gameState = game.isOver;


// ** Add a click listener to the simulate button that runs the play() method on click and pass in the players **
playButton.addEventListener("click", function(e){
  game.play(p1,p2)
})


// ** Player 1 Controls **
document.addEventListener('keydown', function(e) {
  // if you press Q AND the enemy health is greater than 0 AND isOver is still false then strike()
    if(e.key == "q" && p2.health > 0 && !gameState){
      resultDiv.innerText = p1.strike(p1,p2,20)
      document.getElementById("p1attack").play()
    }
});

document.addEventListener('keydown', function(e) {
  
  // if you press a AND the player health is greater than 0 AND isOver is still false then strike()
  if(e.key == "a" && p1.health > 0 && !gameState){
      resultDiv.innerText = p1.heal(p1)
      document.getElementById("p1heal").play()
    }

});

// ** Player 2 Controls **
document.addEventListener('keydown', function(e) {
  
  // if you press p AND enemy health is greater than 0 AND isOver is still false then stike()
  if(e.key == "p" && p1.health > 0 && !gameState){
      resultDiv.innerText = p2.strike(p2,p1,40)
      document.getElementById("p2attack").play()
    }

});

document.addEventListener('keydown', function(e) {
  // if you press l AND the player health is greater than 0 AND isOver is still false then heal()
  if(e.key == "l" && p2.health > 0 && !gameState){
    resultDiv.innerText = p2.heal(p2)
      document.getElementById("p2heal").play()

    }
});


