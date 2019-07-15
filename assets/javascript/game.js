var gods, greset
function Start () {
  gods = resetgods();
  greset = resetgame();
}

function resetgods () {
   
  return {
    "Zeus": {
      health: 180,
      attack: 8,
      imageUrl: "assets/images/zeus.png",
      enemyattack: 15
    },
    "Poseidon": {
      health: 100,
      attack: 8,
      imageUrl: "assets/images/poseidon.png",
      enemyattack: 5
    },
    "Hades": {
      health: 150,
      attack: 8,
      imageUrl: "assets/images/hades.png",
      enemyattack: 20
    },
    "Ares": {
      health: 120,
      attack: 7,
      imageUrl: "assets/images/ares.png",
      enemyattack: 25
    }
  }
}

function resetgame () {
}
  


 
 
function godsdiv (character, key) {
  var charDiv = $("<div class='character' data-name='" + key + "'>")
  var charName = $("<div class='character-name'>").text(character.name)
  var charImage = $("<img alt='image' class='character-image'>").attr('src', character.imageUrl)
  var charHealth = $("<div class='character-health'>").text(character.health)
}