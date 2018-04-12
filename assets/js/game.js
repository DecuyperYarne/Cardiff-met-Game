function update() {

    if (playing) {
        //Player movement
        if (cursors.up.isDown) {
            player.y -= 8;
        }
        else if (cursors.down.isDown) {
            player.y += 8;
        }

        //Fire controls
        if (fireButton.isDown) {
            fireBullet();
        }
    }

    //Check for collision
    game.physics.arcade.overlap(bullets, enemys, collisionHandler, null, this);
    game.physics.arcade.overlap(enemys, walls, wallHit, null, this);
    game.physics.arcade.overlap(enemys, walls, wallHit, null, this);
    game.physics.arcade.overlap(tacos, player, endGame, null, this);
    game.physics.arcade.overlap(bullets, boss, bossHit, null, this);


    if (bossAlive) {
        fireTaco();
    }
    if (enemys.countLiving() === 0 && gameStart) {
        console.log("Checked in here");
        if ((currlevel % 3) === 0) {
            levelText.setText('Bosswave');
            game.tweens.removeAll();
            game.time.events.add(Phaser.Timer.SECOND * 2, startBossGame, this);
            gameStart = false;
            playing = false;
            bullets.callAll('kill');
        } else {
            gameStart = false;
            playing = false;
            bullets.callAll('kill');
            lvlMulti += 1;
            lvlSpeed += 1;
            currlevel += 1;
            game.tweens.removeAll();
            levelText.setText('Level ' + currlevel);
            game.time.events.add(Phaser.Timer.SECOND * 2, startGame, this);
        }
    }
}

function startGame() {
    createEnemys(lvlSpeed, lvlMulti);
    levelText.setText('');
    gameStart = true;
    playing = true;
}

function startBossGame() {
    createBoss();
    levelText.setText('');
    currlevel += 1;
    playing = true;
}

function endGame() {
    //Play sound
    background.stop();
    endsound.play();

    //Remove all objects
    enemys.callAll('kill');
    bullets.kill();
    player.kill();
    walls.kill();
    lives.callAll('kill');
    boss.kill();
    tacos.kill();

    //Remove animations
    game.tweens.removeAll();
    gameStart = false;

    //Show text
    levelText = game.add.text(0, 0, 'The american dream is dead !!', {
        font: '48px OptimusPrincepsSemiBold',
        fill: '#FFF',
        boundsAlignH: 'center',
        boundsAlignV: "middle"
    });
    levelText.setTextBounds(0, 0, 1200, 600);
    scoreText.setText('');
    scoreText = game.add.text(0, 0, 'You lost, you deported ' + score + ' mexicans', {
        font: '48px OptimusPrincepsSemiBold',
        fill: '#ff000b',
        boundsAlignH: 'center',
        boundsAlignV: "middle"
    });
    scoreText.setTextBounds(0, 0, 1200, 800);

    game.add.sprite(430, 60, 'angry');

    game.time.events.add(Phaser.Timer.SECOND * 8, nextScreen, this);
}

function nextScreen() {
    var scores = JSON.parse(localStorage.getItem('scores'));
    scores[scores.length - 1].score = score;
    console.log(scores);
    localStorage.setItem('scores', JSON.stringify(scores));
    window.location = 'index3.html';
}