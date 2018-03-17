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
        var self = this;
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
            self.Role = new CreateRole({
                type : 'player',
                name : 'cike',
                player : '安云大神',
                x : 800,
                y : 300,
                gongsu : 100,
                yisu : 100,
                runSpeed : 4
            });
            Laya.stage.addChild(self.Role);
            
            
            

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
            this.rockerV =  new RockerView();
            Laya.stage.addChild(this.rockerV);

            //格斗场景定时器
            Laya.timer.frameLoop(1,this,this.shenyuanLoop);



            //初始化攻击界面
            this.attackV =  new attackView();
            Laya.stage.addChild(this.attackV);
            
		}));
    }


    _proto.shenyuanLoop = function(){
        var rockerA = this.rockerV.angle;
        if(rockerA!=-1){
            
        }

        


        // var xr = Math.cos(rockerA);
        // var yr = Math.sin(rockerA);
        // console.log(xr,yr);
        var RoleVectors = this.getVectors(rockerA);
        
        var Role = this.Role;
        Role.x += parseInt(RoleVectors.x*Role.runSpeed);
        Role.y += parseInt(RoleVectors.y*Role.runSpeed);
    }


    _proto.getVectors = function(rockerA){

        if(this.rockerV.angle2<30*30){
            return {x:0,y:0};
        }

        if(rockerA>=23 && rockerA<=67){
            //console.log('向右下移动');
            return {x:0.7,y:0.6};
        }else if(rockerA>=68 && rockerA<=113){
            return {x:1,y:0};
            //console.log('向右移动');
        }else if(rockerA>=114 && rockerA<=157){
            return {x:0.7,y:-0.6};
            //console.log('向右上移动');
        }else if(rockerA>=158 && rockerA<=203){
            return {x:0,y:-0.8};
            //console.log('向上移动');
        }else if(rockerA>=204 && rockerA<=247){
            return {x:-0.7,y:-0.6};
            //console.log('向左上移动');
        }else if(rockerA>=248 && rockerA<=293){
            return {x:-1,y:0};
            //console.log('向左移动');
        }else if(rockerA>=294 && rockerA<=336){
            return {x:-0.7,y:0.6};
            //console.log('向左下移动');
        }else if(rockerA>=0 && rockerA<=22 || rockerA>=337){
            return {x:0,y:0.8};
            //console.log('向下移动');
        }else{
            return {x:0,y:0};
        }
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





