function BluePaddle( ) {
	Paddle.call( this );
	
	this.size.x = viewport.height * 0.02;
	this.size.y = viewport.height * 0.15;
	this.tint = new Color( 0, 0, 255 );
	
	this.name = "Blue Paddle";
}

BluePaddle.prototype = new Paddle;
BluePaddle.prototype.constructor = BluePaddle;

BluePaddle.prototype.moveDown = function( ) {
	Paddle.prototype.moveDown.call( this );
	
	this.velocity.y = viewport.height * 0.25;
};

BluePaddle.prototype.moveUp = function( ) {
	Paddle.prototype.moveUp.call( this );
	
	this.velocity.y = -viewport.height * 0.25;
};

BluePaddle.prototype.shootProjectile = function( ) {
	Paddle.prototype.shootProjectile.call( this );
	this.projectile.tint = new Color( 0, 0, 255 );
};

BluePaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	this.velocity = this.velocity.multiply( 0.9 );
};