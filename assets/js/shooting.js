/*
 * Player shooting mechanics
 */
function fireBullet() {
    if (game.time.now > bulletTime) {
        var bullet = bullets.getFirstExists(false);
        if (bullet) {
            bullet.reset(player.x + 5, player.y + 10);
            bullet.body.velocity.x = 500;
            throwing.play();
        }
        bulletTime = game.time.now + 400;
    }
}

/*
 * Boss shooting mechanics
 */
function fireTaco() {
    if (game.time.now > tacoTime) {
        var taco = tacos.getFirstExists(false);
        if (taco) {
            for (var i = 0; i < 1; i++) {
                var randomY = game.rnd.integerInRange(0, 200);
                taco.reset(boss.x + 10, boss.y + randomY);
                var random = game.rnd.integerInRange(500, 1000);
                taco.body.velocity.x -= random;
                tacosound.play();
            }
        }
        random = game.rnd.integerInRange(0, 1000);
        tacoTime = game.time.now + random;
    }
}

/*
 * Resets the bullet if it goes out of bounds
 */
function resetBullet(bullet) {
    // Destroy the laser
    bullet.kill();
}