var Browser = Laya.Browser;
var WebGL = Laya.WebGL;
var Event = Laya.Event;
var Stage = Laya.Stage;
var Sprite = Laya.Sprite;
var Stat =  Laya.Stat;
var Handler = Laya.Handler;

var game = (function(){

    function game(options){
        //game.super(this);
        this.options = options;
        this.init();

    };

    var _proto = game.prototype;
    _proto.init = function(){
        this.width = this.options.width;
        this.height = this.options.height;

        //初始化游戏
        Laya.init(this.width, this.height, WebGL);

        //设置游戏缩放和对齐方式
        this.setScale();

        //创建游戏格斗场景
        this.createBg();

        //资源加载
        this.loading(["../bin/res/atlas/role.atlas?s="+Math.random()],function(){
            //,"../bin/role/rocker_bg.png","../bin/role/rocker_btn.png","../bin/role/attack.png"
            //创建角色
            var Role = new CreateRole({
                type : 'player',
                name : 'cike',
                player : '安云大神',
                x : 800,
                y : 300,
                gongsu : 100,
                yisu : 100
            });
            Laya.stage.addChild(Role);
            
            
            

        });
        

    };

    _proto.setScale = function(){
        //设置水平对齐
        Laya.stage.alignH = "top";
        //设置垂直对齐
        Laya.stage.alignV = "left";
        //按宽度缩放
        Laya.stage.scaleMode = this.options.scaleMode;
        //横屏
        Laya.stage.screenMode = this.options.screenMode;
    }

    //创建格斗场景
    _proto.createBg = function(){
        var self = this;
        Laya.loader.load("../bin/img/bg.jpg", Handler.create(this, function(){
			var bgImg = Laya.loader.getRes("../bin/img/bg.jpg");
			self.bgSprite = new Sprite();
			self.bgSprite.graphics.drawTexture(bgImg, 0, 0);
			Laya.stage.addChild(self.bgSprite);
            self.bgSprite.size(bgImg.width,bgImg.height);
			self.bgSprite.pos(0, 0);

            //初始化操纵杆
            var rockerV =  new RockerView();
            Laya.stage.addChild(rockerV);
            //初始化攻击界面
            var attackV =  new attackView();
            Laya.stage.addChild(attackV);
            
		}));
    }


    _proto.loading = function(imgPath,callback){
        //加载图集英雄
        Laya.loader.load(imgPath,Handler.create(this,function(){
            if(typeof callback === 'function'){
                callback();
            };
        }),null,Laya.Loader.ATLAS); //加载结束
    }


    

    return game;
})();





