GameModes = {
	TOURNAMENT : 0,
	FREEPLAY : 1,
	SUPERPK : 2,
	TRAINING : 3
};

function TitleMenu( scene ) {
	Menu.call( this, scene );
	
	this.addItem( 'Free Play', this.selectFreePlay );
	this.addItem( 'P9X Training', this.selectTraining );
	this.addItem( 'Tournament Edition', this.selectTournament );
	//this.addItem( 'Super PK', null );
	this.addItem( 'Dip Switches', this.selectSettings );
	this.addItem( 'Get Outta Here!', this.selectQuit );
}

TitleMenu.prototype = new Menu;
TitleMenu.prototype.constructor = TitleMenu;

TitleMenu.prototype.selectFreePlay = function( ) {
	if( typeof track === 'function' ) {
		track( 'free-play' );
	}

	app.gameMode = GameModes.FREEPLAY;
	app.tournament = null;
	SceneManager.changeScene( new PickPaddleScene( ), Transitions.FADE, 0.5 );
};

TitleMenu.prototype.selectSettings = function( ) {
	if( typeof track === 'function' ) {
		track( 'dip-switches' );
	}

	this.closeMenu( );
	SceneManager.changeScene( new SettingsScene( ), Transitions.FADE );
};

TitleMenu.prototype.selectTournament = function( ) {
	if( typeof track === 'function' ) {
		track( 'tournament' );
	}

	app.gameMode = GameModes.TOURNAMENT;
	app.tournament = null;
	SceneManager.changeScene( new PickPaddleScene( ), Transitions.FADE, 0.5 );
};

TitleMenu.prototype.selectTraining = function( ) {
	if( typeof track === 'function' ) {
		track( 'training' );
	}

	app.gameMode = GameModes.TRAINING;
	SceneManager.changeScene( new PickPaddleScene( ), Transitions.FADE, 0.5 );
};

TitleMenu.prototype.selectQuit = function( ) {
	if( typeof track === 'function' ) {
		track( 'quit' );
	}

	window.location = '/';
};