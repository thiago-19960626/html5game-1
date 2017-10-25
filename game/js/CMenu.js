function CMenu(){
    var _pStartPosAudio;
	var _pStartPosPlay;
	var _pStartPosLogo;
	var _oBg;
    var _oButPlay;
    var _oAudioToggle;
    var _oFade;
	var _oLogo;
    
    this._init = function(){
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);
		
		_pStartPosLogo = {x:CANVAS_WIDTH/2,y:40};
		var oSpriteLogo = s_oSpriteLibrary.getSprite('logo');
		_oLogo = createBitmap(oSpriteLogo);
		_oLogo.regX = oSpriteLogo.width/2;
		_oLogo. x = _pStartPosLogo.x;
		_oLogo.y = _pStartPosLogo.y;
        s_oStage.addChild(_oLogo);
		
		_pStartPosPlay = {x:(CANVAS_WIDTH/2),y:CANVAS_HEIGHT - 100};
        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        _oButPlay = new CTextButton(_pStartPosPlay.x,_pStartPosPlay.y,oSprite,TEXT_PLAY,"Arial","#9d6e14",44);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);

        //if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
			var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
			_pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};   
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        //}

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 1000).call(function(){_oFade.visible = false;});  
		
		var oVerText = new createjs.Text("v2","bold 20px Arial", "#000000");
        oVerText.x = (CANVAS_WIDTH - 20);
        oVerText.y = CANVAS_HEIGHT - 25;
        oVerText.textAlign = "center";
        s_oStage.addChild(oVerText);
		
		this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){
        _oButPlay.unload(); 
        _oButPlay = null;
        
        //if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        //}
        
        s_oStage.removeChild(_oBg);
        _oBg = null;
		s_oMenu = null;
    };
    
	this.refreshButtonPos = function(iNewX,iNewY){
		_oLogo.x = _pStartPosLogo.x + iNewX;
		_oLogo.y = _pStartPosLogo.y + iNewY;

		_oButPlay.setPosition(_pStartPosPlay.x + iNewX, _pStartPosPlay.y - iNewY);
		
        //if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        //}   
    };
	
    this._onButPlayRelease = function(){
        this.unload();
        s_oMain.gotoGame();
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
		s_bAudioActive  = !s_bAudioActive;
    };
	
	s_oMenu = this;
    
    this._init();
}

var s_oMenu = null;