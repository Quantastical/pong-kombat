function Menu( scene ) {
	Layer.call( this, scene );
	this.items = new Array( );
	this.currentIndex = -1;
	this.timeElapsed = 0;
	this.blurRadius = 0;
	this.maxBlurRadius = viewport.width * 0.15;
	
	// Rounded rectangle
	var overlay = new Component( 'Menu-Overlay' );
	overlay.opacity = 0;
	overlay.size.x = 0;
	overlay.size.y = viewport.height * 0.05;
	overlay.draw = function( context ) {
		var x = -this.size.x * this.registration.x * this.scale + this.position.x;
		var y = -this.size.y * this.registration.y * this.scale + this.position.y;
		var radius = 10;
		var width = this.size.x * this.scale;
		var height = this.size.y * this.scale;
		context.save();
		context.beginPath();
		context.moveTo(x + radius, y);
		context.lineTo(x + width - radius, y);
		context.quadraticCurveTo(x + width, y, x + width, y + radius);
		context.lineTo(x + width, y + height - radius);
		context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		context.lineTo(x + radius, y + height);
		context.quadraticCurveTo(x, y + height, x, y + height - radius);
		context.lineTo(x, y + radius);
		context.quadraticCurveTo(x, y, x + radius, y);
		context.closePath();
		context.clip();
		context.fillStyle = "rgba(0,0,0,0.5)";
		context.fillRect(x,y,width,height);
		context.restore();
	};
	this.overlay = this.addComponent( 'Overlay', overlay );
	
	this.captured = false;
}

Menu.prototype = new Layer;
Menu.prototype.constructor = Menu;

Menu.prototype.draw = function( context ) {
	if( this.blurRadius > 0 ) {
		if( !this.captured ) {
			backBufferContext.drawImage( viewport, 0, 0, viewport.width, viewport.height );
			this.captured = true;
		}
		if( this.timeElapsed < 0.50 ) {
			stackBlurCanvasRGB( backBuffer, 0, 0, viewport.width, viewport.height, this.blurRadius);
		}
		context.drawImage( backBuffer, 0, 0, viewport.width, viewport.height );
	}
	Layer.prototype.draw.call( this, context );
};

Menu.prototype.addItem = function( title, action ) {
	var lineSpacing = viewport.height * 0.01;
	var fontSize = viewport.height * 0.05;
	var item = new Text( title );
	item.color = 'white';
	item.fontFamily = 'Apple Garamond';
	item.fontStyle = 200;
	item.fontSize = fontSize;
	item.textAlign = 'center';
	item.textBaseline = 'top';
	item.opacity = 0;
	item.position.x = viewport.width * 0.50;
	item.position.y = viewport.height * 0.50 + ( item.fontSize + lineSpacing ) * this.items.length;
	item.calculateSize( backBufferContext );
	this.addComponent( 'Item' + this.items.length, item  );
	
	this.items.push( {
		'action' : action,
		'component' : this.components['Item' + this.items.length],
		'enabled' : true,
		'title' : title
	} );
	
	for( var i in this.items ) {
		this.items[i].component.position.y = viewport.height * 0.50 + ( fontSize + lineSpacing ) * i - this.items.length * ( fontSize + lineSpacing ) / 2;
	}
	
	if( item.size.x > this.overlay.size.x - viewport.height * 0.10 ) {
		this.overlay.size.x = item.size.x + viewport.height * 0.10;
	}
	this.overlay.size.y += fontSize + lineSpacing;
	
	if( this.currentIndex === -1 ) {
		this.selectNextItem( );
	}
};

Menu.prototype.selectCurrentItem = function( ) {
	this.items[this.currentIndex].action.call( this );
};

Menu.prototype.selectNextItem = function( ) {
	if( this.items[this.currentIndex] ) {
		this.items[this.currentIndex].component.fontWeight = 200;
		this.items[this.currentIndex].component.color = 'white';
	}
	this.currentIndex += 1;
	if( this.currentIndex >= this.items.length ) {
		this.currentIndex = 0;
	}
	this.items[this.currentIndex].component.fontWeight = 600;
	this.items[this.currentIndex].component.color = 'yellow';
};

Menu.prototype.selectPreviousItem = function( ) {
	this.items[this.currentIndex].component.fontWeight = 200;
	this.items[this.currentIndex].component.color = 'white';
	this.currentIndex -= 1;
	if( this.currentIndex < 0 ) {
		this.currentIndex = this.items.length - 1;
	}
	this.items[this.currentIndex].component.fontWeight = 600;
	this.items[this.currentIndex].component.color = 'yellow';
};

Menu.prototype.fadeIn = function( fadeTime ) {
	if( this.timeElapsed <= fadeTime ) {
		for( var i in this.components ) {
			if( i === 'Overlay' ) {
				this.components[i].opacity = this.timeElapsed / fadeTime * 0.50;
			} else {
				this.components[i].opacity = this.timeElapsed / fadeTime;
			}	
		}
		this.blurRadius = this.timeElapsed / fadeTime * this.maxBlurRadius;
	} else if( this.timeElapsed > fadeTime && this.blurRadius != this.maxBlurRadius ) {
		this.blurRadius = this.maxBlurRadius;
		for( var i in this.components ) {
			if( i === 'Overlay' ) {
				this.components[i].opacity = 0.50;
			} else {
				this.components[i].opacity = 1;
			}	
		}
	}
};

Menu.prototype.closeMenu = function( ) {
	this.scene.removeLayer( 'Menu' );
};

Menu.prototype.update = function( deltaTime ) {
	this.fadeIn( 0.33 );
	this.timeElapsed += deltaTime;
	
	if( InputManager.checkButtonPress( Buttons.DOWN ) ) {
		this.selectNextItem( );
	}
	if( InputManager.checkButtonPress( Buttons.UP ) ) {
		this.selectPreviousItem( );
	}
	
	if( InputManager.checkButtonPress( Buttons.ACTION ) ) {
		this.selectCurrentItem( );
	}
	
	if( InputManager.checkButtonPress( Buttons.BACK ) ) {
		this.closeMenu();
	}
};