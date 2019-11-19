GamePlayManager = {
    init: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

    },
    preload: function () {
        game.load.image('backgame', 'assets/images/backgame.png');
        game.load.image('tablecame', 'assets/images/tablecame.png');
        game.load.image('valorgb', 'assets/images/valorgb.png');
        game.load.image('valorm', 'assets/images/valorm.png');
        game.load.image('valorsb', 'assets/images/valorsb.png');
        game.load.image('valort', 'assets/images/valort.png');

        game.load.spritesheet('spritegb2', 'assets/images/spritegb2.png', 200, 200, 3);
        game.load.spritesheet('spritegbn', 'assets/images/spritegbn.png', 200, 200, 3);
        game.load.spritesheet('spritegbv', 'assets/images/spritegbv.png', 200, 200, 3);
        game.load.spritesheet('spritegbp', 'assets/images/spritegbp.png', 200, 200, 3);

        game.load.spritesheet('smashgb', 'assets/images/smashgb.png', 200, 200, 6);
        game.load.spritesheet('smashgb2', 'assets/images/smashgb2.png', 200, 200, 6);
        game.load.spritesheet('smashga', 'assets/images/smashga.png', 200, 200, 6);

        game.load.spritesheet('spriteab', 'assets/images/spriteab.png', 200, 200, 3);
        game.load.spritesheet('buttonPlay', 'assets/images/botonplay.png', 540, 261, 2);
        game.load.spritesheet('buttonClose', 'assets/images/botonclose.png', 275, 275, 2);
        game.load.spritesheet('cleo', 'assets/images/cleo.png', 1169, 692.5, 4);
        game.load.image('cleo0', 'assets/images/cleo0.png');
        game.load.image('cover', 'assets/images/coverini.png');
        game.load.image('backGameOver', 'assets/images/back-game-over.png');
        game.load.audio('introsound', 'assets/sounds/introsound.wav');
        game.load.audio('backsound', 'assets/sounds/backsound.mp3');
        game.load.audio('smashsound', 'assets/sounds/smashsound.mp3');
        game.load.audio('coin', 'assets/sounds/coins.mp3');
        game.load.audio('collected', 'assets/sounds/collected.wav');
        game.load.audio('final', 'assets/sounds/final.mp3');
        game.load.spritesheet('moneda', 'assets/images/moneda.png');
        game.load.image('glass', 'assets/images/moneda.png');
        game.load.image('corona', 'assets/images/blue.png');
        game.load.image('luces', 'assets/images/luces.png');
        game.load.spritesheet('wintext', 'assets/images/win.png', 966, 263, 2);
        game.load.spritesheet('watch', 'assets/images/sandWatch.png', 150, 150, 6);
    },

    create: function () {
        
        //Back Game

        game.add.sprite(0, 0, 'backgame');

        var emitter = game.add.emitter(game.world.centerX, game.world.centerY, 500);

        emitter.makeParticles('corona');
        emitter.setAlpha(0.3,0.3);
        emitter.minParticleSpeed.setTo(-300, -300);
        emitter.maxParticleSpeed.setTo(300, 300);

        //  By setting the min and max rotation to zero, you disable rotation on the particles fully

        emitter.minRotation = 0;
        emitter.maxRotation = 0;
        emitter.setAlpha = 0.5;
        emitter.start(false, 4000, 20);


        var tablecame = game.add.sprite(0, 1080, 'tablecame');
        this.tween = game.add.tween(tablecame);
        this.tween.to({
            y: 0
        }, 1000, Phaser.Easing.Quadratic.In, );

        


        this.gbGroup = game.add.group();
        this.gb2Group = game.add.group();
        this.gaGroup = game.add.group();
        this.smashGroup = game.add.group();
        this.smashGroup2 = game.add.group();
        this.smashgaGroup = game.add.group();

        //SCORE

        this.currentScore = 0;

        var style = {
            font: 'bold 40pt Arial',
            fill: '#fecf1a',
            aling: 'center'

        }
        this.textfield = game.add.text(1725, 95, this.currentScore.toString(), style);
        this.textfield.anchor.setTo(0.5);

        //TIMER
        
        this.txtTimeLeft = game.add.text(1800, 450, '', style);
        this.txtTimeLeft.anchor.setTo(0.5);

        //Cover inicio

        this.coverini = game.add.image(0, 0, 'cover');

        emitter4 = game.add.emitter(game.world.centerX, 1080, 600);
        emitter4.makeParticles('corona');

        emitter4.setRotation(0, 0);
        emitter4.setAlpha(0.3, 0.8);
        emitter4.setScale(0.5, 1);
        emitter4.gravity = -100;

        emitter4.start(false, 5000, 500);
        this.particulas = emitter4;

        //Button Play

        this.buttonPlay = game.add.button(game.width / 2, game.height * 0.86, 'buttonPlay', this.startGame, this, 1, 0, 1, 0);
        this.buttonPlay.anchor.setTo(0.5);

        //Cleo anim

        var animcleo = game.add.sprite(game.world.centerX, 400, 'cleo');
        animcleo.anchor.setTo(0.5);
        animcleo.animations.add('logoini', [0, 1, 2, 3])
        animcleo.animations.play('logoini', 3, true);
        this.cleo = animcleo;

        this.cleo0 = game.add.image(game.world.centerX, 400, 'cleo0');
        this.cleo0.anchor.setTo(0.5);

        //SOUNDS

        this.introsound = game.add.audio('introsound');
        this.introsound.loop = true;
        this.introsound.play();
        this.backsound = game.add.audio('backsound');
        this.smashsound = game.add.audio('smashsound');
        this.coinsound = game.add.audio('coin');
        this.collectedsound = game.add.audio('collected');
        this.finalsound = game.add.audio('final');

    },
    startGame: function () {

        this.preparelevel();
        
        this.currentScore = 0;

        this.textfield.txt = this.currentScore.toString();

        this.timeLeft = 20;
        this.txtTimeLeft.text = this.timeLeft;

        this.timerCountDown = game.time.events.loop(Phaser.Timer.SECOND * 1, this.callbackTimeDown, this);
    },
    preparelevel: function () {

        this.introsound.stop();

        this.backsound.loop = true;
        this.backsound.play();

        this.buttonPlay.visible = false;
        this.coverini.visible = false;
        this.cleo.visible = false;
        this.cleo0.visible = false;
        this.particulas.visible = false;

        

        this.tween.start();

        var animWatch = game.add.sprite(1930, 350, 'watch');
        this.tween = game.add.tween(animWatch);
       
        this.tween.to({
            x: 1800
        }, 500, Phaser.Easing.Quadratic.In, );
        this.tween.start();

        animWatch.anchor.setTo(0.5);
        animWatch.animations.add('sandW', [0, 1, 2, 3, 4, 5])
        animWatch.animations.play('sandW', 0.25, true);

        var valorgb = game.add.sprite(-100, 885, 'valorgb');
        this.tween = game.add.tween(valorgb);
       
        this.tween.to({
            x: 15
        }, 500, Phaser.Easing.Quadratic.In, );
        this.tween.start();

        var valort = game.add.sprite(-100, 685, 'valort');
        this.tween = game.add.tween(valort);
       
        this.tween.to({
            x: 15
        }, 600, Phaser.Easing.Quadratic.In, );
        this.tween.start();

        var valorm = game.add.sprite(-100, 485, 'valorm');
        this.tween = game.add.tween(valorm);
       
        this.tween.to({
            x: 15
        }, 800, Phaser.Easing.Quadratic.In, );
        this.tween.start();

        var valorsb = game.add.sprite(-100, 285, 'valorsb');
        this.tween = game.add.tween(valorsb);
       
        this.tween.to({
            x: 15
        }, 1000, Phaser.Easing.Quadratic.In, );
        this.tween.start();

        var spritegb21 = new gb2(0, 'spritegb2', 260, 250, 1650, 1080, 1, 45, 1000, 20000);
        this.gb2Group.add(spritegb21);

        var spritegb22 = new gb2(1, 'spritegb2', 1650, 250, 260, 1080, 1, 140, 1000, 4000);
        this.gb2Group.add(spritegb22);

        var spritegb23 = new gb2(2, 'spritegb2', 1650, 800, 260, 1000, 1, 180, 1000, 30000);
        this.gb2Group.add(spritegb23);

        var spritegb24 = new gb2(3, 'spritegb2', 260, 900, 1650, 1000, 1, 10, 1000, 20000);
        this.gb2Group.add(spritegb24);


        var spritegb1 = new gb(0, 'spritegbn', 260, 250, 1650, 1000, 1, 45, 1000, 30000);
        this.gbGroup.add(spritegb1);

        var spritegb2 = new gb(1, 'spritegbv', 1650, 260, 260, 1080, 1, 140, 1200, 6000);
        this.gbGroup.add(spritegb2);

        var spritegb3 = new gb(2, 'spritegbp', 1650, 900, 260, 1000, 1, 180, 1200, 4000);
        this.gbGroup.add(spritegb3);

        var spritegb4 = new gb(3, 'spritegbn', 260, 800, 1650, 1000, 1, 10, 1200, 3000);
        this.gbGroup.add(spritegb4);

        var spritegb5 = new gb(4, 'spritegbv', 1650, 1000, 260, 250, 1, -140, 1200, 4000);
        this.gbGroup.add(spritegb5);

        var spritegb6 = new gb(5, 'spritegbp', 1650, 260, 260, 1000, 1, 140, 1200, 8000);
        this.gbGroup.add(spritegb6);

        

        var spriteab1 = new ga(0, 'spriteab', 1650, 800, 260, 750, 1, 180, 2500, 0);
        this.gaGroup.add(spriteab1);

        var spriteab2 = new ga(1, 'spriteab', 1650, 600, 260, 600, 1, 180, 1500, 0);
        this.gaGroup.add(spriteab2);

        var spriteab3 = new ga(2, 'spriteab', 1650, 500, 500, 300, 1, 180, 1500, 0);
        this.gaGroup.add(spriteab3);

        var spriteab4 = new ga(3, 'spriteab', 260, 700, 1650, 800, 1, 0, 2000, 0);
        this.gaGroup.add(spriteab4);

        var spriteab5 = new ga(4, 'spriteab', 260, 1080, 1650, 300, 1, -45, 1500, 0);
        this.gaGroup.add(spriteab5);

        var spriteab6 = new ga(5, 'spriteab', 1500, 500, 500, 300, 1, 180, 1500, 0);
        this.gaGroup.add(spriteab6);

        var spriteab7 = new ga(6, 'spriteab', 1650, 1080, 269, 250,  1, 210, 1500, 0);
        this.gaGroup.add(spriteab7);

        var spriteab8 = new ga(7, 'spriteab', 1650, 800, 260, 700, 1, 180, 2500, 0);
        this.gaGroup.add(spriteab8);

        var spriteab9 = new ga(8, 'spriteab', 1650, 600, 260, 400, 1, 180, 1500, 0);
        this.gaGroup.add(spriteab9);

        var spriteab10 = new ga(9, 'spriteab', 1650, 800, 260, 300, 1, 180, 1500, 0);
        this.gaGroup.add(spriteab10);

        var spriteab11 = new ga(10, 'spriteab', 260, 700, 1650, 800, 1, 0, 2000, 0);
        this.gaGroup.add(spriteab11);

        var spriteab12 = new ga(11, 'spriteab', 260, 1080, 1650, 300, 1, -45, 1500, 0);
        this.gaGroup.add(spriteab12);

        var spriteab13 = new ga(12, 'spriteab', 1500, 500, 500, 300, 1, 180, 1500, 0);
        this.gaGroup.add(spriteab13);

        var spriteab14 = new ga(13, 'spriteab', 1650, 1080, 269, 250,  1, 210, 1500, 0);
        this.gaGroup.add(spriteab14);



        game.time.events.add(4000, this.callBackShowGb, this);
        game.time.events.add(6000, this.callBackShowGb2, this);
        game.time.events.add(2000, this.callBackShowGa, this); 

    },
    callBackShowGb: function () {
        game.time.events.add(8000, this.callBackShowGb, this); 
        this.showGb();

    },

    callBackShowGb2: function () {
        game.time.events.add(25000, this.callBackShowGb2, this); 
        this.showGb2();

    },

    callBackShowGa: function () {
        game.time.events.add(250, this.callBackShowGa, this); 
        this.showGa();

    },
    showGb: function () {
        var newGb = this.getRandomGb();
        console.log("showGb:" + newGb);
        if (newGb != null) {
            newGb.Appear();
        }

    },

    showGb2: function () {
        var newGb2 = this.getRandomGb2();
        console.log("showGb2:" + newGb2);
        if (newGb2 != null) {
            newGb2.Appear();
        }

    },

    showGa: function () {
        var newGa = this.getRandomGa();
        console.log("showGa:" + newGa);
        if (newGa != null) {
            newGa.Appear();
        }

    },
    getRandomGb: function () {
        var gbAvailable = false;

        //Verificación
        var amountGb = this.gbGroup.length;
        for (var i = 0; i < amountGb; i++) {
            if (!this.gbGroup.children[i].alive) {
                gbAvailable = true;
            }
        }
        if (!gbAvailable) {
            return null;
        }

        var index = game.rnd.integerInRange(0, amountGb - 1);
        var randomGb = this.gbGroup.children[index];
        while (randomGb.alive) {
            index = game.rnd.integerInRange(0, amountGb - 1);
            randomGb = this.gbGroup.children[index];
        }
        console.log("INDEX:" + index);
        return randomGb;

    },

    getRandomGb2: function () {
        var gb2Available = false;

        //Verificación
        var amountGb2 = this.gb2Group.length;
        for (var i = 0; i < amountGb2; i++) {
            if (!this.gb2Group.children[i].alive) {
                gb2Available = true;
            }
        }
        if (!gb2Available) {
            return null;
        }

        var index = game.rnd.integerInRange(0, amountGb2 - 1);
        var randomGb2 = this.gb2Group.children[index];
        while (randomGb2.alive) {
            index = game.rnd.integerInRange(0, amountGb2 - 1);
            randomGb2 = this.gb2Group.children[index];
        }
        console.log("INDEX:" + index);
        return randomGb2;

    },

    getRandomGa: function () {
        var gaAvailable = false;

        //Verificación
        var amountGa = this.gaGroup.length;
        for (var i = 0; i < amountGa; i++) {
            if (!this.gaGroup.children[i].alive) {
                gaAvailable = true;
            }
        }
        if (!gaAvailable) {
            return null;
        }

        var index = game.rnd.integerInRange(0, amountGa - 1);
        var randomGa = this.gaGroup.children[index];
        while (randomGa.alive) {
            index = game.rnd.integerInRange(0, amountGa - 1);
            randomGa = this.gaGroup.children[index];
        }
        
        return randomGa;
    },

    hitGb: function (id, x, y, ) {
        this.increaseScore();


        var currentSmash = this.smashGroup.getFirstDead();
        if (currentSmash == null) {
            currentSmash = this.smashGroup.create(x, y, 'smashgb2');
            currentSmash.animations.add('explode', [0, 1, 2, 3, 4, 5]);
            currentSmash.anchor.setTo(0.5, 0.5);
        }

        currentSmash.reset(x, y);


        currentSmash.animExplode = currentSmash.animations.play('explode', 6);
        currentSmash.animExplode.onComplete.add(function (sprite, animation) {
            sprite.kill();
        }, this);
    },

    hitGb2: function (id, x, y, ) {
        this.increaseScore2();


        var currentSmash2 = this.smashGroup2.getFirstDead();
        if (currentSmash2 == null) {
            currentSmash2 = this.smashGroup2.create(x, y, 'smashgb');
            currentSmash2.animations.add('explode', [0, 1, 2, 3, 4, 5]);
            currentSmash2.anchor.setTo(0.5, 0.5);
        }

        currentSmash2.reset(x, y);


        currentSmash2.animExplode = currentSmash2.animations.play('explode', 6);
        currentSmash2.animExplode.onComplete.add(function (sprite, animation) {
            sprite.kill();
        }, this);
    },

    hitGa: function (id, x, y, ) {
        this.smashsound.play();


        var currentSmashga = this.smashgaGroup.getFirstDead();
        if (currentSmashga == null) {
            currentSmashga = this.smashgaGroup.create(x, y, 'smashga');
            currentSmashga.animations.add('explode', [0, 1, 2, 3, 4, 5]);
            currentSmashga.anchor.setTo(0.5, 0.5);
        }

        currentSmashga.reset(x, y);

        currentSmashga.animExplode = currentSmashga.animations.play('explode', 6);
        currentSmashga.animExplode.onComplete.add(function (sprite, animation) {
            sprite.kill();
        }, this);
    },

    increaseScore: function () {
        this.currentScore += 25;
        this.textfield.text = this.currentScore.toString();
        this.smashsound.play();

    },
    increaseScore2: function () {
        this.currentScore += 75;
        this.textfield.text = this.currentScore.toString();
        this.smashsound.play();

    },

    callbackTimeDown: function () {
        this.timeLeft--;
        if (this.timeLeft <= 0) {
            this.timeLeft = 0;
            this.youWin();
            game.time.events.remove(this.timerCountDown);

        }
        this.txtTimeLeft.text = this.timeLeft;


    },

    youWin: function () {

        this.coinsound.loop = true;
        this.coinsound.play();
        this.finalsound.play();
        this.collectedsound.play();
        this.backsound.stop();

        var backGameOver = game.add.sprite(0, 1080, 'backGameOver');
        this.tween = game.add.tween(backGameOver);
        this.tween.to({
            y: 0
        }, 500, Phaser.Easing.Quadratic.In, );

        
        var wintext = game.add.sprite(game.world.centerX, 200, 'wintext');
        wintext.anchor.setTo(0.5);
        wintext.animations.add('winanim', [0, 1,])
        wintext.animations.play('winanim', 6, true);
        

        this.tween.start();

        var style = {
            font: 'bold 70pt Arial',
            fill: '#fecf1a',
            aling: 'center'
        }

        this.textfield = game.add.text(955, 380, this.currentScore.toString(), style);
        this.textfield.anchor.setTo(0.5);
        this.gameOver();

        emitter = game.add.emitter(960, 540, 200);
        emitter.makeParticles('moneda', 200, 100, true, true);
        emitter.setXSpeed(-64, 64);
        emitter.setYSpeed(-10, 10);
        emitter.setScale(-2, 2, 2, 2, 1000, Phaser.Easing.Sinusoidal.InOut, true);
        emitter.gravity = 2000;
        emitter.bounce.setTo(1, 0.7);
        emitter.start(false, 8000, 50);

        game.physics.arcade.collide(emitter);

        emitter2 = game.add.emitter(game.world.X = 400, 1080, 600);
        emitter2.makeParticles('corona');

        emitter2.setRotation(0, 0);
        emitter2.setAlpha(0.3, 0.8);
        emitter2.setScale(0.5, 1);
        emitter2.gravity = -200;

        emitter2.start(false, 5000, 500);

        emitter3 = game.add.emitter(game.world.X = 1600, 1080, 600);
        emitter3.makeParticles('corona');

        emitter3.setRotation(0, 0);
        emitter3.setAlpha(0.3, 0.8);
        emitter3.setScale(0.5, 1);
        emitter3.gravity = -200;

        emitter3.start(false, 5000, 500);


        this.buttonPlay = game.add.button(1785, 950, 'buttonClose', this.starGame, this, 1, 0, 1, 0);
        this.buttonPlay.anchor.setTo(0.5);
    },

    gameOver: function () {
        this.destroyGaGroup();
        this.destroyGbGroup();
        this.destroyGb2Group();
    },
    destroyGaGroup: function () {
        this.gaGroup.forEach(function (ga) {
            ga.kill();
        }, this);

        this.gaGroup.removeAll(true);

    },

    destroyGbGroup: function () {
        this.gbGroup.forEach(function (gb) {
            gb.kill();
        }, this);
        this.gbGroup.removeAll(true);

    },

    destroyGb2Group: function () {
        this.gb2Group.forEach(function (gb2) {
            gb2.kill();
        }, this);
        this.gb2Group.removeAll(true);

    },

    update: function () {


    }
}

var game = new Phaser.Game(1920, 1080, Phaser.CANVAS);

game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");