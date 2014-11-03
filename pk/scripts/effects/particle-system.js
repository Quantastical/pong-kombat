function ParticleSystem( particleCount ) {
	this.particles = [ ];
	/*
	this.particleCanvas = document.createElement( 'canvas' );
	this.particleCanvas.width = 128;
	this.particleCanvas.height = 128;
	this.particleContext = this.particleCanvas.getContext( '2d' );
	*/
	
	this.particleImages = [Resources['Black']];
	this.count = 0;
	this.scale = 1;
	
	this.minVelocity = new Vector( );
	this.minVelocity.x = -viewport.width;
	this.minVelocity.y = -viewport.height;
	
	this.maxVelocity = new Vector( );
	this.maxVelocity.x = viewport.width;
	this.maxVelocity.y = viewport.height;
	
	this.position = new Vector( );
	this.position.x = viewport.width * 0.50;
	this.position.y = viewport.height * 0.50;
	
	this.rotation = 0;
	
	this.size = new Vector( );
	this.size.x = viewport.width * 0.25;
	this.size.y = viewport.height * 0.25;
	
	this.minParticleSize = 0;
	this.maxParticleSize = viewport.height * 0.10;
	
	this.minLife = 20;
	this.maxLife = 30;
	
	this.maxOpacity = 1;
	this.rotationSpeed = 1; // particle rotation speed
	this.scaleSpeed = 1;
	this.fadeSpeed = 0.5; // btwn 0 and 1
}

ParticleSystem.prototype.constructor = ParticleSystem;

ParticleSystem.prototype.start = function( ) {
	for( var i = 0; i < this.count; i++ )
	{
		this.particles.push( new Particle( this ) );
	}
};

ParticleSystem.prototype.draw = function( context ) {
	context.save( );
	context.globalCompositeOperation = "lighter";
	
	for(var i = 0; i < this.particles.length; i++)
	{
		var p = this.particles[i];
		
		context.save();
		context.globalAlpha = p.opacity;
		context.translate( p.position.x, p.position.y );
		context.rotate( p.rotation );
		context.drawImage( p.image, -p.radius * p.scale, -p.radius * p.scale, p.radius * 2 * p.scale, p.radius * 2 * p.scale );
		context.restore();
	}
	context.restore( );
};

ParticleSystem.prototype.update = function( deltaTime ) {
	for(var i = 0; i < this.particles.length; i++)
	{
		var p = this.particles[i];
		p.remainingLife--;
		
		var normalizedLife = Math.round( p.remainingLife / p.life * 100 ) / 100;
		if( normalizedLife < this.fadeSpeed ) {
			p.opacity = normalizedLife * this.maxOpacity;
		} else {
			p.opacity = (1 - normalizedLife) * this.maxOpacity;
		}
		
		p.position.x += p.velocity.x * deltaTime;
		p.position.y += p.velocity.y * deltaTime;
		
		p.rotation += Math.random( ) * this.rotationSpeed * deltaTime * p.rotationDirection;
		p.scale += Math.random( ) * this.scaleSpeed * deltaTime * p.scaleDirection;
		
		// Regenerate particles
		if( p.remainingLife < 0 )
		{
			this.particles[i] = new Particle( this );
		}
	}
};

function Particle( emitter ) {
	this.image = emitter.particleImages[ Math.floor( Math.random( ) * emitter.particleImages.length ) ];
	
	this.velocity = new Vector( );
	this.velocity.x = emitter.minVelocity.x + Math.random( ) * ( emitter.maxVelocity.x - emitter.minVelocity.x );
	this.velocity.y = emitter.minVelocity.y + Math.random( ) * ( emitter.maxVelocity.y - emitter.minVelocity.y );
	
	this.position = new Vector( );
	//this.position.x = emitter.position.x + Math.random( ) * emitter.size.x - emitter.size.x * 0.50;
	//this.position.y = emitter.position.y + Math.random( ) * emitter.size.y - emitter.size.y * 0.50;
	var x = Math.random( ) * emitter.size.x - emitter.size.x * 0.50;
	var y = Math.random( ) * emitter.size.y - emitter.size.y * 0.50;
	this.position.x = emitter.position.x + x * Math.cos( emitter.rotation * Math.TO_RADIANS ) - y * Math.sin( emitter.rotation * Math.TO_RADIANS );
	this.position.y = emitter.position.y + x * Math.sin( emitter.rotation * Math.TO_RADIANS ) + y * Math.cos( emitter.rotation * Math.TO_RADIANS );
	
	this.radius = emitter.minParticleSize + Math.random( ) * ( emitter.maxParticleSize - emitter.minParticleSize );
	
	this.life = emitter.minLife + Math.random( ) * ( emitter.maxLife - emitter.minLife );
	this.remainingLife = this.life;
	
	this.opacity = 0;
	this.rotation = 0;
	this.scale = emitter.scale;
	
	this.rotationDirection = ( Math.random( ) > 0.5 ) ? 1 : -1;
	this.scaleDirection = ( Math.random( ) > 0.5 ) ? 1 : -1;
}