gb = function(id, assetName, x0, y0, x1, y1, scale, angle, timeAnimation, timeDelay){
    Phaser.Sprite.call(this, game, 300, 300, assetName);
    this.animations.add('walk', [0,1]);
    this.animations.play('walk', 8, true);
    this.inputEnabled = true;
    this.events.onInputDown.add(function(){
                this.scale.setTo(1);
                this.kill();
                GamePlayManager.hitGb(this.id, this.x, this.y);
        if(this.tweenIn!=null){
            this.tweenIn.stop();
        }
        // if(this.tweenOut!=null){
        //     this.tweenOut.stop();
        // }
}, this);

    this.id = id;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.defaultScale = scale;
    this.angle = angle;
    this.timeAnimation = timeAnimation;
    this.timeDelay = timeDelay;
    
    this.scale.setTo(scale);
    this.anchor.setTo(0.5, 0.5);
    this.kill();
    
    

}
gb.prototype = Object.create(Phaser.Sprite.prototype);
gb.prototype.constructor = gb;

gb.prototype.Appear = function(){
    this.reset(this.x0, this.y0);
    
    this.tweenIn = game.add.tween(this);
    // this.tweenOut = game.add.tween(this);
    
    this.tweenIn.to( { x:this.x1, y:this.y1 }, this.timeAnimation, Phaser.Easing.Quadratic.In );
    // this.tweenOut.to( { x:this.x0, y:this.y0,}, this.timeAnimation, Phaser.Easing.Quadratic.Out, false, this.timeDelay );
    
    this.tweenIn.onComplete.add( function () {
        
       this.kill(); 
    }, this);
    
    
    this.tweenIn.start();

}