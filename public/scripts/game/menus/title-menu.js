GameModes = {
	TOURNAMENT : 0,
	FREEPLAY : 1,
	SUPERPK : 2
};

function TitleMenu( scene ) {
	Menu.call( this, scene );
	
	//this.addItem( 'Free Play', this.selectFreePlay );
	//this.addItem( 'Tournament', this.selectTournament );
	//this.addItem( 'Super PK', null );
	this.addItem( 'Dip Switches', this.selectSettings );
	this.addItem( 'Get Outta Here!', this.selectQuit );
}

TitleMenu.prototype = new Menu;
TitleMenu.prototype.constructor = TitleMenu;

TitleMenu.prototype.selectFreePlay = function( ) {
	app.gameMode = GameModes.FREEPLAY;
	SceneManager.changeScene( new ChoosePaddleScene( ), Transitions.NONE );
};

TitleMenu.prototype.selectSettings = function( ) {
	this.closeMenu( );
	SceneManager.changeScene( new SettingsScene( ), Transitions.FADE );
};

TitleMenu.prototype.selectTournament = function( ) {
	app.gameMode = GameModes.TOURNAMENT;
	SceneManager.changeScene( new ChoosePaddleScene( ), Transitions.NONE );
};

TitleMenu.prototype.selectQuit = function( ) {
	window.location = '/terminal';
};