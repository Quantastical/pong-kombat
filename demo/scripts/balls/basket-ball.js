function Basketball( ) {
	Ball.call( this, 'Ball-Basketball' );
	
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	
	this.patternCanvas.width = 256;
	this.patternCanvas.height = 256;
	
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.width );
	this.patternContext.fill( );
	
	this.size.x = viewport.width * 0.045;
	this.size.y = this.size.x;
	this.addGlare( );
}

Basketball.prototype = new Ball;
Basketball.prototype.constructor = Basketball;