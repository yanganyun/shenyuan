var Browser = Laya.Browser;
var WebGL = Laya.WebGL;
var Event = Laya.Event;
var Stage = Laya.Stage;
var Sprite = Laya.Sprite;
var Stat =  Laya.Stat;
var Handler = Laya.Handler;
var Loader = laya.net.Loader;
var Handler = laya.utils.Handler;

(function(){
    //初始化游戏
    Laya.init(Browser.width, 634, WebGL);
    Laya.stage.frameRate = Laya.Stage.FRAME_SLOW;  //设置帧频
    Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;  //按宽度缩放
    Laya.stage.alignH = Laya.Stage.ALIGN_CENTER ;   //设置水平对齐
    Laya.stage.alignV = Laya.Stage.ALIGN_BOTTOM ;   //设置垂直对齐
    Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;  //横屏
    //显示帧频
    Laya.Stat.show(100, 0);

    //监听切后台 没什么卵用
    Laya.stage.on(Laya.Event.VISIBILITY_CHANGE, this, function(){ 
        if(document.hidden){ //页面不可见状态 
            Laya.stage.renderingEnabled = false;
            Laya.stage.frameRate = Laya.Stage.FRAME_SLEEP;
        }else{ //页面可见状态 
            Laya.stage.renderingEnabled = true;
            Laya.stage.frameRate = Laya.Stage.FRAME_SLOW;
        }
    }); 


    //激活资源版本控制
    Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad), Laya.ResourceVersion.FILENAME_VERSION);

    //加载资源
    function beginLoad(){   
        var arr = [
                //加载UI资源
            { url : "img/bg.jpg", type : Laya.Loader.IMAGE },
            { url : "img/attack.png", type : Laya.Loader.IMAGE },
            { url : "img/rocker_bg.png", type : Laya.Loader.IMAGE },
            { url : "img/rocker_btn.png", type : Laya.Loader.IMAGE },
            { url : "res/atlas/role.atlas", type : Laya.Loader.ATLAS }
            
        ]

        Laya.loader.load(arr, Handler.create(this, onLoaded));
    }


    function onLoaded(){
        //游戏配置
        new game();
    }

})();



