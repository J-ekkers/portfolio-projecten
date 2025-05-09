const config = {
    // Type van de game engine (in dit geval Phaser)
    type: Phaser.AUTO,
    // Breedte en hoogte van het spel
    width: 1600,
    height: 950,
    // Fysieke eigenschappen van het spel
    physics: {
        default: 'arcade',
        arcade: {
            // Zwaartekracht in het spel
            gravity: { y: 800 },
            // Debugmodus voor fysieke eigenschappen
            debug: false
        }
    },
    // Scene-instellingen
    scene: {
        // Functie voor het laden van assets
        preload: preload,
        // Functie voor het creëren van het spel
        create: create,
        // Functie voor het updaten van het spel
        update: update
    }
};

// Variabelen voor het spel
let player;
let cursors;
let map;
let groundLayer;
let skyLayer;
let stars;

// Creëer een nieuwe Phaser-game
const game = new Phaser.Game(config);

// Functie voor het laden van assets
function preload() {
    // Laad een afbeelding voor de sterren
    this.load.image('star', 'assets/banana.png');

    // Laad een tilemap voor het level
    this.load.tilemapTiledJSON('map', 'tiled/level1.json');

    // Laad een spritesheet voor de tegels
    this.load.spritesheet('spritesheet', 'tiled/spritesheet.png', { frameWidth: 16, frameHeight: 16 });

    // Laad een spritesheet voor de speler
    this.load.spritesheet('dude', 'assets/monkey.png', { frameWidth: 32, frameHeight: 48 });
}

// Functie voor het creëren van het spel
function create() {
    // Creëer een nieuwe tilemap
    map = this.make.tilemap({key: 'map'});

    // Creëer een nieuwe laag voor de grond
    const tiles = map.addTilesetImage('spritesheet');
    groundLayer = map.createLayer('Ground', tiles, 0, 0);

    // Stel de collision voor de grond in
    groundLayer.setCollisionByExclusion([-1]);

    // Creëer een nieuwe laag voor de lucht
    skyLayer = map.createLayer('Sky', tiles, -1, -1);

    // Stel de grenzen van de fysieke wereld in
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    // Creëer een nieuwe speler
    player = this.physics.add.sprite(100, 1250, 'dude');

    // Stel de bounce en collideWorldBounds voor de speler in
    player.setBounce(0.1);
    player.setCollideWorldBounds(true);

    // Stel de collision tussen de grond en de speler in
    this.physics.add.collider(groundLayer, player);

    // Creëer animaties voor de speler
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    // Creëer een nieuwe cursor voor het toetsenbord
    cursors = this.input.keyboard.createCursorKeys();

    // Creëer een nieuwe groep voor de sterren
    stars = this.physics.add.group({
        key: 'star',
        setXY: { x: 750, y: -40, stepX: 0 }
    });

    // Stel de collision tussen de sterren en de grond in
    this.physics.add.collider(stars, groundLayer);

    // Stel de overlap tussen de speler en de sterren in
    this.physics.add.overlap(player, stars, collectStar, null, this);

    // Stel de camera in om de speler te volgen
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(player);
}

// Functie voor het updaten van het spel
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

    window.location.replace("level2.html");

}