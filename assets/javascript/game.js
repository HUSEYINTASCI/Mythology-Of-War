// ----------------------------------------------------------------------------------------------------
//           Index Html Pegasus
// ----------------------------------------------------------------------------------------------------

$(document).on("click mouseon", "body", function(e) {
  var x = e.clientX;
  var y = e.clientY;
  var newposX = x - 60;
  var newposY = y - 60;
  $("#pegasus").css(
    "transform",
    "translate3d(" + newposX + "px," + newposY + "px,0px)"
  );
});

// ----------------------------------------------------------------------------------------------------
//           War Html
// ----------------------------------------------------------------------------------------------------

// Varibles

var gods, greset;

// Game Start
function Start() {
  gods = resetgods();
  greset = resetgame();
  godrender();
}
$("#new-game").hide();
// Gods Varibles
function resetgods() {
  return {
    Zeus: {
      name: "ZEUS",
      health: 180,
      fight: 10,
      imageUrl: "assets/images/zeus.png",
      enemyfight: 20
    },
    Poseidon: {
      name: "POSEIDON",
      health: 150,
      fight: 9,
      imageUrl: "assets/images/poseidon.png",
      enemyfight: 5
    },
    Hades: {
      name: "HADES",
      health: 140,
      fight: 8,
      imageUrl: "assets/images/hades.png",
      enemyfight: 4
    },
    Ares: {
      name: "ARES",
      health: 13,
      fight: 11,
      imageUrl: "assets/images/ares.png",
      enemyfight: 3
    }
  };
}
// Reset game
function resetgame() {
  return {
    selectedCharacter: null,
    selectedEnemy: null,
    enemycound: 0,
    fightcound: 0
  };
}

// Create Gods

function godsdiv(character, key) {
  var charDiv = $("<div class='character' data-name='" + key + "'>");
  var charName = $("<div class='character-name'>").text(character.name);
  var charImage = $("<img alt='image' class='character-image'>").attr(
    "src",
    character.imageUrl
  );
  var charHealth = $("<div class='character-health'>").text(character.health);
  charDiv
    .append(charName)
    .append(charImage)
    .append(charHealth);
  return charDiv;
}
// Render God

function godrender() {
  var keys = Object.keys(gods);
  for (var i = 0; i < keys.length; i++) {
    var characterKey = keys[i];
    var character = gods[characterKey];

    var charDiv = godsdiv(character, characterKey);
    $("#gods").append(charDiv);
  }
}

// Render Enemy
function renderenemy(selectedCharacterKey) {
  var characterKeys = Object.keys(gods);
  for (var i = 0; i < characterKeys.length; i++) {
    if (characterKeys[i] !== selectedCharacterKey) {
      var enemyKey = characterKeys[i];
      var enemy = gods[enemyKey];

      var enemyDiv = godsdiv(enemy, enemyKey);
      $(enemyDiv).addClass("enemy");
      $("#enemy_fight").append(enemyDiv);
      $("#sel2").css("display", "block");
      $("#enemy_fight").css("display", "block");
      $("#sel4").css("display", "block");
    }
  }
}

// Select God
$(document).ready(function() {
  $("#gods").on("click", ".character", function() {
    var selectedKey = $(this).attr("data-name");
    greset.selectedCharacter = gods[selectedKey];

    $("#selected-god").append(this);

    renderenemy(selectedKey);

    $("#select-area").hide();

    greset.enemycound = Object.keys(gods).length - 1;
    enemyselect();
  });

  // Enemy Select
  function enemyselect() {
    $(".enemy").on("click.enemySelect", function() {
      var enemyKey = $(this).attr("data-name");
      greset.selectedEnemy = gods[enemyKey];

      $("#Enemy").append(this);
      $("#fightbtn").show();
      $(".enemy").off("click.enemySelect");
    });
  }

  // Fight Values
  function fight(fightcound) {
    greset.selectedEnemy.health -= greset.selectedCharacter.fight * fightcound;
  }

  function defend() {
    greset.selectedCharacter.health -= greset.selectedEnemy.enemyfight;
  }

  // Check Win
  function win() {
    return greset.enemycound === 0;
  }

  // Check Charakter dead
  function dead(character) {
    return character.health <= 0;
  }

  function fightdone() {
    if (dead(greset.selectedCharacter)) {
      alert("Your Character Dead. You Lose.");

      $("#fightbtn").css("display", "none");
      $("#selected-god").empty();
      $("#Enemy").empty();
      $("#new-game").text("You Lose New Game");
      $("#new-game").show();
    } else if (dead(greset.selectedEnemy)) {
      greset.enemycound--;
      $("#Enemy").empty();

      if (win()) {
        $("#new-game").text("You Win New Game");
        $("#new-game").show();
      } else {
        alert("Great !Select another enemy");

        enemyselect();
      }
      return true;
    }

    return false;
  }

  // Fight Button
  $("#fightbtn").on("click.fight", function() {
    greset.fightcound++;

    fight(greset.fightcound);
    defend();

    $("#selected-god .character-health").text(greset.selectedCharacter.health);
    $("#Enemy .character-health").text(greset.selectedEnemy.health);

    if (fightdone()) {
      $(this).hide();
    }
  });

  // Empty divs
  function emptyDivs() {
    $("#selected-god").empty();
    $("#Enemy").empty();
    $("#enemy_fight .enemy").empty();
    $("#gods").empty();
    $("#select-area").show();
  }

  // New Game Button
  $("#new-game").on("click.reset", function() {
    emptyDivs();

    $(this).hide();
    $("#sel2").css("display", "none");
    $("#enemy_fight").css("display", "none");
    $("#sel4").css("display", "none");
    Start();
  });
  // Stert Game
  Start();
});
