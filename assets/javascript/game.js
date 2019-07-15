var gods, greset
function Start () {
  gods = resetgods();
  greset = resetgame();
  godrender();
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
  return {
    selectedCharacter: null,
    selectedEnemy: null,
    enemycound: 0,
    attackcound: 0
  }
}

 
 
function godsdiv (character, key) {
  var charDiv = $("<div class='character' data-name='" + key + "'>")
  var charName = $("<div class='character-name'>").text(character.name)
  var charImage = $("<img alt='image' class='character-image'>").attr('src', character.imageUrl)
  var charHealth = $("<div class='character-health'>").text(character.health)
  charDiv.append(charName).append(charImage).append(charHealth)
  return charDiv
}

 
function godrender () {
  console.log('rendering gods')

  var keys = Object.keys(gods)
  for (var i = 0; i < keys.length; i++) {
     
    var characterKey = keys[i]
    var character = gods[characterKey]
     
    var charDiv = godsdiv(character, characterKey)
    $('#gods').append(charDiv)
  }
}

function renderenemy (selectedCharacterKey) {}