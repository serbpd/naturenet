var Tower = function(worldX, worldY, tileX, tileY, tile) {
    var index = String(eval(tileX + "" + tileY));

    if ($.inArray(index, tileForbiden) == -1) {
        this.tower = game.add.sprite(worldX, worldY, tile);
        this.tower.rangeCirc = game.add.image(worldX-(32*3.5), worldY-(32*3.5), 'rangecircle');
        this.tower.rangeCirc.alpha = .3;
        this.tower.range = 256/2;
        //game.physics.enable(this.tower.rangeCirc, Phaser.Physics.ARCADE);
        //rangeCirc.scale.setTo();
        //this.tower.scale.setTo(2, 2);
        this.tower.worldX = worldX;
        this.tower.worldY = worldY;
        this.tower.tileX = tileX;
        this.tower.tileY = tileY;
        this.tower.tile = tile;
        this.tower.damage = 1;
        this.tower.fireTime = 2000; //rate of fire
        this.tower.fireLastTime = game.time.now + this.tower.fireTime;
        this.tower.closestEnemy = getNearestEnemy(this.tower.worldX, this.tower.worldY, this.tower.range);
        towers.add(this.tower);
        tileForbiden.push(index);
    }
}

Tower.prototype.add = function(pointer) {
    game.input.onDown.add(Tower.prototype.posit);
    var canvas = document.getElementById("imgCanvas");
    var context = canvas.getContext("2d");
    var rect = canvas.getBoundingClientRect();
    var posx = pointer.clientX - rect.left;
    var posy = pointer.clientY - rect.top;
}

Tower.prototype.posit = function(pointer) {
    var tileworldX = pointer.worldX - (pointer.worldX % tileSquare);
    var tileworldY = pointer.worldY - (pointer.worldY % tileSquare);
    var tileX = Math.floor(pointer.worldX / tileSquare);
    var tileY = Math.floor(pointer.worldY / tileSquare);
    new Tower(tileworldX, tileworldY, tileX, tileY, 'tower');
}
    
Tower.prototype.fire = function(tower) {
    tower.closestEnemy = getNearestEnemy(tower.x, tower.y, tower.range);
    bullets.createMultiple(1, 'bullet', 0, false);
    
    if (game.time.now > tower.fireLastTime) {
        tower.closestEnemy = getNearestEnemy(tower.x, tower.y, tower.range);
        var bullet = bullets.getFirstExists(false);
        
        if (bullet && tower.closestEnemy != undefined) {
            bullet.reset(tower.x+16, tower.y+16);
            bullet.body.collideWorldBounds = false;
            bullet.rotation = parseFloat(game.physics.arcade.angleToXY(bullet, tower.closestEnemy.x, tower.closestEnemy.y)) * 180 / Math.PI;
            game.physics.arcade.moveToObject(bullet, tower.closestEnemy, 450); //targeting and bullet speed
        }
        tower.fireLastTime = game.time.now + tower.fireTime;
    }
}

function getNearestEnemy(x, y, range){
    var len = enemys.children.length;
    var distance = range;
    
    for (var i=0;i<len;i++){
        var iEnemy = enemys.children[i];
        
        var a = x - iEnemy.x;
        var b = y - iEnemy.y;
        var c = Math.sqrt(a*a + b*b);
        
        if (c < distance) {
            distance = c;
            var nearestEnemy = iEnemy;
        }
    }
    return (distance < range) ? nearestEnemy : undefined;
}