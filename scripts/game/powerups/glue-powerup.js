function GluePowerup( ) {
	Powerup.call( this, 'Powerup-Glue' );
	
	this.size.x = viewport.height * 0.06;
	this.size.y = this.size.x * 2.1;
	
	this.position.x = viewport.width * 0.5;
	this.position.y = Math.random( ) * viewport.height * 0.6 + viewport.height * 0.2;

	this.scale = 0;

	this.effect = new ParticleSystem( );
	this.effect.particleImages = [Resources['Particle-Glint']];
	this.effect.count = 3;
	this.effect.minVelocity.x = 0;
	this.effect.minVelocity.y = 0;
	this.effect.maxVelocity.x = 0;
	this.effect.maxVelocity.y = 0;
	this.effect.minParticleSize = this.size.x * 0.6;
	this.effect.maxParticleSize = this.size.x * 0.7;
	this.effect.minLife = 50;
	this.effect.maxLife = 100;
	this.effect.maxOpacity = 1.5;
	this.effect.rotationSpeed = 5;
	this.effect.scaleSpeed = 2;
	this.effect.attachTo( this );

	for( var x = 0; x < 100; x++ ) {
		this.effect.update( 1 / 60 );
	}

	this.timeoutTime *= 1000 + app.gameTime;

	this.squirtSound = new Sound( 'Squirt' );
	this.squirtSound.setMaxVolume(1 * app.settings.SOUND_FX / 11);
}

GluePowerup.prototype = new Powerup;
GluePowerup.prototype.constructor = GluePowerup;

GluePowerup.prototype.collect = function( kombatant ) {
	Powerup.prototype.collect.call( this, kombatant );
	kombatant.paddle.glue = new Sprite( 'Paddle-Glue' );
	kombatant.paddle.glue.size.y = 0;
	/*
	kombatant.paddle.glue.opacity = 0.5;
	kombatant.paddle.glue.scale = 0;
	*/
	kombatant.paddle.gluePowerup = app.gameTime + 10 * 1000;

	if( app.settings.SOUND_FX > 0 ) {
		this.squirtSound.play();
	}
};

GluePowerup.prototype.draw = function( context ) {
	Powerup.prototype.draw.call( this, context );
	this.effect.draw( context );
}

GluePowerup.prototype.update = function( deltaTime ) {
	Powerup.prototype.update.call( this, deltaTime );
	this.effect.update( deltaTime );
}