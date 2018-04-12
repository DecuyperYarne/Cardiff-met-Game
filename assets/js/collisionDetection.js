/*
 * Checks if the bullet hits an enemy
 */
function collisionHandler(bullet, enemy) {
    console.log("Hit!");
    death.play();
    bullet.kill();
    enemy.kill();
    //Add score
    score += 1;
    scoreText.setText('Mexicans\ndeported: ' + score);
}

/*
 * Checks if the enemy hits the wall
 */
function wallHit(enemy, wall) {
    if (game.time.now > timeDelay) {
        if (lives.countLiving() === 1) {
            endGame();
        } else {
            game.tweens.removeAll();
            enemys.callAll('kill');
            gameStart = false;
            var currlife = lives.getFirstAlive();
            currlife.kill();
            walldestroy.play();
            startGame();
        }
        timeDelay = game.time.now + 1000
    }
}

/*
 * Checks if the player hits the boss
 */
function bossHit(bullet, currboss) {
    bullet.kill();
    bossHealth -= 1;
    if (bossHealth <= 0) {
        currboss.kill();
        tacos.callAll('kill');
        gameStart = true;
        bossAlive = false;
        //Add score
        score += 5;
        bossdeath.play();
        scoreText.setText('Mexicans\ndeported: ' + score);
        bossHealth = 2 + timesSpawned;
    }
}