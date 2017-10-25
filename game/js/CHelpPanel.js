function CHelpPanel(oSprite){
    var _oText;
    var _oTextBack;
    var _oHelpBg;
    var _oGroup;

    this._init = function(oSprite){
        _oHelpBg = createBitmap(oSprite); 

        _oTextBack = new createjs.Text(TEXT_HELP,"bold 46px Arial", "#000000");
        _oTextBack.textAlign = "center";
		_oTextBack.lineWidth = 500;
        _oTextBack.x = CANVAS_WIDTH/2 + 2;
        _oTextBack.y = 560;
		
	_oText = new createjs.Text(TEXT_HELP,"bold 46px Arial", "#9d6e14");
        _oText.textAlign = "center";
		_oText.lineWidth = 500;
        _oText.x = CANVAS_WIDTH/2;
        _oText.y = 560;

        _oGroup = new createjs.Container();
        _oGroup.addChild(_oHelpBg,_oTextBack,_oText);
        s_oStage.addChild(_oGroup);
        
        var oParent = this;
        _oGroup.on("pressup",function(){oParent._onExitHelp()});
    };

    this.unload = function(){
        s_oStage.removeChild(_oGroup);

        var oParent = this;
        _oGroup.off("pressup",function(){oParent._onExitHelp()});
    };

    this._onExitHelp = function(){
        this.unload();
    };

    this._init(oSprite);

}