// Configuratie voor het Phaser spel
const config = {
    type: Phaser.AUTO, // Kies automatisch tussen WebGL of Canvas rendering
    width: 1605, // Breedte van het spel canvas
    height: 1000, // Hoogte van het spel canvas
    physics: {
        default: 'arcade', // Gebruik de arcade fysica engine
        arcade: {
            gravity: { y: 300 }, // Stel de zwaartekracht in voor de spelwereld
            debug: false // Schakel debug-modus uit
        }
    },
    scene: {
        preload: preload, // Functie om assets vooraf te laden
        create: create, // Functie om spelobjecten te maken
        update: update // Functie om spelobjecten elke frame bij te werken
    }
};

let player; // Variabele om de speler sprite op te slaan
let cursors; // Variabele om de toetsenbordinvoer op te slaan
let map; // Variabele om de tilemap op te slaan
let groundLayer; // Variabele om de grondlaag van de tilemap op te slaan
let skyLayer; // Variabele om de luchtlaag van de tilemap op te slaan
let stars; // Variabele om de groep sterobjecten op te slaan

// Maak een nieuw Phaser spel met de gespecificeerde configuratie
const game = new Phaser.Game(config);

// Functie om assets vooraf te laden
function preload() {
    this.load.tilemapTiledJSON('map', 'tiled/level3.json'); // Laad de tilemap JSON-bestand
    this.load.spritesheet('spritesheet', 'tiled/spritesheet.png', { frameWidth: 16, frameHeight: 16 }); // Laad de spritesheet
    this.load.image('star', 'assets/banana.png'); // Laad de ster afbeelding
    this.load.spritesheet('dude', 'assets/monkey.png', { frameWidth: 32, frameHeight: 48 }); // Laad de speler sprite
}

// Functie om spelobjecten te maken
function create() {
    map = this.make.tilemap({ key: 'map' }); // Maak de tilemap van de JSON-bestand
    const tiles = map.addTilesetImage('spritesheet'); // Voeg de tileset afbeelding toe aan de map

    groundLayer = map.createLayer('ground', tiles, 0, 0); // Maak de grondlaag
    groundLayer.setCollisionByExclusion([-1]); // Stel de botsing in voor de grondlaag

    skyLayer = map.createLayer('sky', tiles, 0, 0); // Maak de luchtlaag

    // Stel de grenzen van de fysica wereld in om overeen te komen met de grondlaag
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    player = this.physics.add.sprite(100, 1250, 'dude'); // Maak de speler sprite
    player.setBounce(0.2); // Stel de stuitering van de speler in
    player.setCollideWorldBounds(true); // Voorkom dat de speler de wereldgrenzen verlaat

    this.physics.add.collider(groundLayer, player); // Voeg botsing toe tussen speler en grondlaag

    // Maak animaties voor de speler
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

    cursors = this.input.keyboard.createCursorKeys(); // Maak toetsenbordinvoer aan

    stars = this.physics.add.group({
        key: 'star',
        setXY: { x: 1550, y: 400, stepX: 0 } // Maak een groep sterren
    });

    this.physics.add.collider(stars, groundLayer); // Voeg botsing toe tussen sterren en grondlaag
    this.physics.add.overlap(player, stars, collectStar, null, this); // Voeg overlapcontrole toe tussen speler en sterren

    // Stel de camera in om de speler te volgen
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(player);
}

// Functie om spelobjecten elke frame bij te werken
function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-100); // Beweeg de speler naar links
        player.anims.play('left', true); // Speel de animatie voor links bewegen
    } else if (cursors.right.isDown) {
        player.setVelocityX(200); // Beweeg de speler naar rechts
        player.anims.play('right', true); // Speel de animatie voor rechts bewegen
    } else {
        player.setVelocityX(0); // Stop de beweging van de speler
        player.anims.play('turn'); // Speel de draai-animatie
    }

    if (cursors.up.isDown && player.body.onFloor()) {
        player.setVelocityY(-250); // Laat de speler springen
    }
}

// Functie om een ster te verzamelen
function collectStar(player, star) {
    window.alert("Gefeliciteerd! Je hebt ons spel gehaald!!!"); // Toon een bericht wanneer de speler een ster verzamelt
}
