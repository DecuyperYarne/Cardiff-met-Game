var game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    this.load.image('trump', 'assets/media/trump.png');
    this.load.image('back', 'assets/bg/desert.png');
    this.load.image('bullet', 'assets/projectiles/Fire_Brick.png');
    this.load.image('enemy', 'assets/enemy/mexican-type3.gif');
    this.load.image('wall', 'assets/media/BrickWall.png');
    this.load.image('life', 'assets/media/lives.png');
    this.load.image('angry', 'assets/media/angry.png');
    this.load.image('boss', 'assets/enemy/boss.png');
    this.load.image('taco', 'assets/projectiles/taco.png');

    //Audio
    this.load.audio('death', 'assets/sounds/death.mp3');
    this.load.audio('throw', 'assets/sounds/throw.mp3');
    this.load.audio('walldestroy', 'assets/sounds/walldestroy.mp3');
    this.load.audio('background', 'assets/sounds/background.mp3');
    this.load.audio('end', 'assets/sounds/end.mp3');
    this.load.audio('taco', 'assets/sounds/taco.mp3');
    this.load.audio('deathboss', 'assets/sounds/deathboss.mp3')
}

function create() {
    game.world.setBounds(0, 0, 1200, 600);
    //Create the background image
    var backimg = game.add.sprite(0, 0, 'back');
    backimg.scale.setTo(0.4, 0.3);

    //Create bullets
    createBulletGroup();

    //Spawn player
    createPlayer();

    //Create the enemy group
    createEnemyGroup();

    //Create the boss group
    createBossGroup();

    //Create the taco group
    createTacoGroup();

    //Create the wall group
    createWallGroup();
    createWall();

    //Sounds
    initSound();

    //Create the lives group
    createLives();

    //Spawn level text
    levelText = game.add.text(0, 0, 'Level 1', {
        font: '64px Gugi',
        fill: '#FFF',
        boundsAlignH: 'center',
        boundsAlignV: "middle"
    });
    levelText.setTextBounds(0, 0, 1200, 600);

    //Create score
    scoreText = game.add.text(16, 520, 'Mexicans\ndeported: 0', {font: '32px Gugi', fill: '#FFF'});

    //Enable controls
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    game.time.events.add(Phaser.Timer.SECOND * 2, startGame, this);
}

/*
 * Loads in all the sounds
 */
function initSound() {
    death = game.add.audio('death');
    throwing = game.add.audio('throw');
    walldestroy = game.add.audio('walldestroy');
    background = game.add.audio('background');
    endsound = game.add.audio('end');
    tacosound = game.add.audio('taco');
    bossdeath = game.add.audio('deathboss');

    background.loopFull('1');
}

/*
 * Creates the lives group and spawns the lives
 */
function createLives() {
    lives = game.add.group();
    for (var i = 0; i < 3; i++) {
        lives.create(140 - (70 * i), 0, 'life');
    }
}

/*
 * Creates the wall group
 */
function createWallGroup() {
    walls = game.add.group();
    walls.enableBody = true;
    walls.physicsBodyType = Phaser.Physics.ARCADE;
}


/*
 * Spawns the wall
 */
function createWall() {
    for (var i = 0; i < 19; i++) {
        var wall = game.add.sprite(250, 32 * i, 'wall');
        this.walls.add(wall);
        wall.body.immovable = true;
    }
}

/*
 * Creates and spawns the player
 */
function createPlayer() {
    //Create the player group
    players = game.add.group();
    players.enableBody = true;
    players.physicsBodyType = Phaser.Physics.ARCADE;

    //Create the player icon and make it collide with the sides
    player = players.create(30, 450, 'trump');
    player.anchor.setTo(0.5, 0.5);
    player.body.collideWorldBounds = true;
}

/*
 * Creates the boss group
 */
function createBossGroup() {
    boss = game.add.group();
    boss.enableBody = true;
    boss.physicsBodyType = Phaser.Physics.ARCADE;
}

/*
 * Spawns the boss and lets him move
 */
function createBoss() {
    var bossentity = boss.create(0, 0, 'boss');
    bossentity.anchor.setTo(0.5, 0.5);
    bossentity.body.moves = false;

    boss.y = 150;
    boss.x = 1200 - 190;

    //Lets the enemy move
    game.add.tween(boss).to({y: 450}, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);
    bossAlive = true;
    timesSpawned += 2;
}

/*
 * Creates the bullets group
 */
function createBulletGroup() {
    //Create bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(20, 'bullet');
    bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetBullet);
    bullets.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
    bullets.setAll('checkWorldBounds', true);
}

/*
 * Creates the taco bullets group
 */
function createTacoGroup() {
    //Create bullet group
    tacos = game.add.group();
    tacos.enableBody = true;
    tacos.physicsBodyType = Phaser.Physics.ARCADE;
    tacos.createMultiple(20, 'taco');
    tacos.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetBullet);
    tacos.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
    tacos.setAll('checkWorldBounds', true);
}

/*
 * Creates the enemy group
 */
function createEnemyGroup() {
    enemys = game.add.group();
    enemys.enableBody = true;
    enemys.physicsBodyType = Phaser.Physics.ARCADE;
}

/*
 * Spawns the enemys
 */
function createEnemys(speedMulti, levelMulti) {
    for (var y = 0; y < 3; y++) {
        for (var x = 0; x < (3 + levelMulti); x++) {
            var enemy = enemys.create(x * 190, y * 200, 'enemy');
            enemy.anchor.setTo(0.5, 0.5);
            enemy.body.moves = false;
        }
    }

    enemys.y = 85;
    enemys.x = 1200 - (190 * 2);

    //Lets the enemy move
    var tween = game.add.tween(enemys).to({y: 125}, (1000 / speedMulti), Phaser.Easing.Linear.None, true, 0, 1000, true);

    //When the tween loops it calls descend
    tween.onRepeat.add(moveEnemy, this);
}

/*
 * Moves the enemys
 */
function moveEnemy() {
    enemys.x -= 20;
}