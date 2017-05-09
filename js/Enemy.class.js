var Enemy = function(x, y, anim, animLength, hp) {
    this.enemy = game.add.sprite(path[0].x * tileSquare, path[0].y * tileSquare, anim);
    // enemy walk animations, walk speed, health 
    this.enemy.animations.add('walk');
    this.enemy.animations.play('walk', animLength, true);
    this.enemy.anchor.setTo(0.5, 0.5);
    this.enemy.speed = 1.5;
    this.enemy.speedX = 0;
    this.enemy.speedY = 0;
    this.enemy.curTile = 0;
    this.enemy.health = hp;
    enemys.add(this.enemy);
    Enemy.prototype.nextTile(this.enemy);
    Enemy.prototype.moveElmt(this.enemy);

}
Enemy.prototype.moveElmt = function(enemy) {
    enemy.x += enemy.speedX;
    enemy.y += enemy.speedY;

    if (enemy.speedX > 0 && enemy.x >= enemy.next_positX) {
        enemy.x = enemy.next_positX;
        Enemy.prototype.nextTile(enemy);
    }
    else if (enemy.speedX < 0 && enemy.x <= enemy.next_positX) {
        enemy.x = enemy.next_positX;
        Enemy.prototype.nextTile(enemy);
    }
    else if (enemy.speedY > 0 && enemy.y >= enemy.next_positY) {
        enemy.y = enemy.next_positY;
        Enemy.prototype.nextTile(enemy);
    }
    else if (enemy.speedY < 0 && enemy.y <= enemy.next_positY) {
        enemy.y = enemy.next_positY;
        Enemy.prototype.nextTile(enemy);
    }

}
Enemy.prototype.nextTile = function(enemy) {
    enemy.curTile++;
    enemy.next_positX = parseInt(path[enemy.curTile].x * tileSquare);
    enemy.next_positY = parseInt(path[enemy.curTile].y * tileSquare);
    
    if(enemy.curTile >= path.length){
        enemy.destroy();
    }
    
    // enemy X position check, allows enemys to keep a distance from each other
    if (enemy.next_positX > enemy.x) {
        enemy.speedX = enemy.speed;
        game.add.tween(enemy).to( { angle: 0 }, 400, Phaser.Easing.Linear.None, true); //rotation
    } else if (enemy.next_positX < enemy.x) {
        enemy.speedX = -enemy.speed;
        game.add.tween(enemy).to( { angle: 180 }, 400, Phaser.Easing.Linear.None, true);
    } else {
        enemy.speedX = 0;
    }
    // enemy Y position check, allows enemys to keep a distance from each other
    if (enemy.next_positY > enemy.y) {
        enemy.speedY = enemy.speed;
        game.add.tween(enemy).to( { angle: 90 }, 400, Phaser.Easing.Linear.None, true);
    } else if (enemy.next_positY < enemy.y) {
        enemy.speedY = -enemy.speed;
        game.add.tween(enemy).to( { angle: -90 }, 400, Phaser.Easing.Linear.None, true);
    } else {
        enemy.speedY = 0;
    }
}

function damageEnemy(dmg){
    this.enemy.health -= dmg;
}