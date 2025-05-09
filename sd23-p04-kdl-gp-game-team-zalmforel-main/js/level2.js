const config = {
      // Game engine
  type: Phaser.AUTO,
      // Breedte en hoogte 
  width: 1600,
  height: 950,
  // eigenschappen
  physics: {
      default: 'arcade',
      arcade: {
        // zwaartekracht
          gravity: { y: 800 },
          // debugmodus voor eigenschappen
          debug: false
      }
  },
  // Scene-instellingen
  scene: {
    // laden assets
      preload: preload,
      // Functie creëre spel
      create: create,
      // functie updaten spel
      update: update
  }
};

// Vaiabelen voor het spel
let player;
let cursors;
let map;
let groundLayer;
let skyLayer;
let stars;

// Creëren nieuwe Phaser-game
const game = new Phaser.Game(config);


function preload() {
// Tilemap
this.load.tilemapTiledJSON('map', 'tiled/level2.json');

// afbeelding
this.load.image('star', 'assets/banana.png');

// spritesheet voor tegels
this.load.spritesheet('spritesheet', 'tiled/spritesheet.png', { frameWidth: 16, frameHeight: 16 });

// spritesheet speler
  this.load.spritesheet('dude', 'assets/monkey.png', { frameWidth: 32, frameHeight: 48 });
}
// functie creëren spel
function create() {

  map = this.make.tilemap({key: 'map'});

  // Nieuwe grond laag
  const tiles = map.addTilesetImage('spritesheet');

  groundLayer = map.createLayer('ground', tiles, 0, 0);

  // collision grond
  groundLayer.setCollisionByExclusion([-1]);

  // nieuwe lucht laag
  skyLayer = map.createLayer('sky', tiles, -1, -1);


  this.physics.world.bounds.width = groundLayer.width;
  this.physics.world.bounds.height = groundLayer.height;

  // nieuwe speler
  player = this.physics.add.sprite(100, 1250, 'dude');

// bounce collideworldbounds
  player.setBounce(0.1);
  player.setCollideWorldBounds(true);

  //collision speler en grond
  this.physics.add.collider(groundLayer, player);

  // animatie speler
  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
  });

  // cursor
  cursors = this.input.keyboard.createCursorKeys();

  // n.v.t. nieuwe groep sterren
  stars = this.physics.add.group({
    key: 'star',
    setXY: { x: 1580, y: 0, stepX: 0 }
});

// collision sterren en overlap
this.physics.add.collider(stars, groundLayer);
this.physics.add.overlap(player, stars, collectStar, null, this);

// camera volgt
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  this.cameras.main.startFollow(player);

}

//functie updaten spel
function update() {
  if (cursors.left.isDown) {
      player.setVelocityX(-200);

      player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
      player.setVelocityX(200);

      player.anims.play('right', true);
  }
  else {
      player.setVelocityX(0);
      player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.onFloor()) {
      player.setVelocityY(-470);
  }
}

function collectStar (player, star)
{
 
    window.location.replace("level3.html");
   
}