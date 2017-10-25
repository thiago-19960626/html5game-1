function CInterface(iLevel,iLives){
    var _oButExit;
    var _oAudioToggle;
    var _oScoreTextBack;
    var _oScoreText;
    var _oEndPanel;
    var _oLifeSprite;
    var _oLifeTextBack;
    var _oLifeText;
    var _oLevelTextBack;
    var _oLevelText;
    
    this._init = function(iLevel,iLives){
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2)- 20, y: (oSprite.height/2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        oExitX = CANVAS_WIDTH - (oSprite.width/2) - 130;
        _pStartPosAudio = {x: oExitX, y: (oSprite.height/2) + 10};
        
        //if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
        //}
        
        _oScoreTextBack = new createjs.Text(TEXT_SCORE+": 0","bold 40px Arial", "#000000");
        _oScoreTextBack.x = (CANVAS_WIDTH - 22);
        _oScoreTextBack.y = BOARD_OFFSET_Y + (BOARD_ROWS*ELEM_SIZE) + 22;
        _oScoreTextBack.textAlign = "right";
        s_oStage.addChild(_oScoreTextBack);
        
        _oScoreText = new createjs.Text(TEXT_SCORE+": 0","bold 40px Arial", "#ffffff");
        _oScoreText.x = (CANVAS_WIDTH - 20);
        _oScoreText.y = BOARD_OFFSET_Y + (BOARD_ROWS*ELEM_SIZE) + 20;
        _oScoreText.textAlign = "right";
        s_oStage.addChild(_oScoreText);
        
        var oSpriteLife = s_oSpriteLibrary.getSprite("life");
        _oLifeSprite = createBitmap(oSpriteLife);
        _oLifeSprite.x = BOARD_OFFSET_X;
        _oLifeSprite.y = BOARD_OFFSET_Y + (BOARD_ROWS*ELEM_SIZE) + 20;
        s_oStage.addChild(_oLifeSprite);
        
        _oLifeTextBack = new createjs.Text("X"+iLives,"bold 40px Arial", "#000000");
        _oLifeTextBack.x = _oLifeSprite.x + oSpriteLife.width + 7;
        _oLifeTextBack.y = _oLifeSprite.y + 12;
        s_oStage.addChild(_oLifeTextBack);
        
        _oLifeText = new createjs.Text("X"+iLives,"bold 40px Arial", "#ffffff");
        _oLifeText.x = _oLifeSprite.x + oSpriteLife.width + 5;
        _oLifeText.y = _oLifeSprite.y + 10;
        s_oStage.addChild(_oLifeText);
        
        _oLevelTextBack = new createjs.Text(TEXT_LEVEL+" "+iLevel,"bold 40px Arial", "#000000");
        _oLevelTextBack.x = 122;
        _oLevelTextBack.y = BOARD_OFFSET_Y - 40;
        _oLevelTextBack.textAlign = "center";
        s_oStage.addChild(_oLevelTextBack);
        
        _oLevelText = new createjs.Text(TEXT_LEVEL+" "+iLevel,"bold 40px Arial", "#ffffff");
        _oLevelText.x = 120;
        _oLevelText.y = BOARD_OFFSET_Y - 42;
        _oLevelText.textAlign = "center";
        s_oStage.addChild(_oLevelText);
        
        _oEndPanel = new CEndPanel(s_oSpriteLibrary.getSprite('msg_box'));
		
		this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){
        _oButExit.unload();
        _oButExit = null;
        
        //if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        //}
        
        s_oStage.removeChild(_oLevelText);   
        s_oStage.removeChild(_oLifeTextBack);
        s_oStage.removeChild(_oLifeText);
        s_oStage.removeChild(_oLifeSprite);
        s_oStage.removeChild(_oScoreText);
        s_oStage.removeChild(_oScoreTextBack);
		s_oInterface = null;
    };
	
	this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        //if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        //}    
    };
    
    this.refreshScore = function(iScore){
      _oScoreText.text = TEXT_SCORE +": "+ iScore;
      _oScoreTextBack.text = TEXT_SCORE +": "+ iScore;
    };
    
    this.refreshLives = function(iLives){
        _oLifeText.text = "X"+iLives;
        _oLifeTextBack.text = "X"+iLives;
    };
    
    this.refreshLevel = function(iLevel){
        _oLevelText.text = TEXT_LEVEL+" "+iLevel;
        _oLevelTextBack.text = TEXT_LEVEL+" "+iLevel;
    };
    
    this.gameOver = function(iScore){
        _oEndPanel.show(iScore);
    };
    
    this._onExit = function(){
      s_oGame.onExit();  
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
		s_bAudioActive = !s_bAudioActive;
    };
    
	s_oInterface = this;
	
    this._init(iLevel,iLives);
    
    return this;
}

var s_oInterface = null;