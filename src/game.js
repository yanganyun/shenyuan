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

        this.init();

    };

    var _proto = game.prototype;
    _proto.init = function(){
        var self = this;

        //添加背景层
        this.bgBox = new Sprite();
        Laya.stage.addChild(this.bgBox);

        //添加角色层
        this.roleBox = new Sprite();
        Laya.stage.addChild(this.roleBox);

        //添加操作层
        this.optBox = new Sprite();
        Laya.stage.addChild(this.optBox);

        //添加菜单层
        this.menuBox = new Sprite();
        Laya.stage.addChild(this.menuBox);
        

        //创建游戏格斗场景
        this.createBg();

        //创建角色
        self.Role = new CreateRole({
            type : 'player',
            name : 'cike',
            player : '安云大神',
            x : 800,
            y : 300,
            gongsu : 100,
            runSpeed : 10
        });
        this.roleBox.addChild(self.Role);
        

    };


    //创建格斗场景
    _proto.createBg = function(){
        var self = this;
        var bg = new Laya.Image()
        bg.skin = "img/bg.jpg";
        bg.pos(0, 0); 
        this.bgBox.addChild(bg);
        

        //初始化操纵杆
        this.rockerV =  new RockerView();
        this.optBox.addChild(this.rockerV);

        //初始化攻击界面
        this.attackV =  new attackView();
        this.optBox.addChild(this.attackV);

        //格斗场景定时器
        Laya.timer.frameLoop(1,this,this.shenyuanLoop);

        

    }

    //游戏帧数渲染
    _proto.shenyuanLoop = function(){
        
        //摇杆运动
        this.rockerRun();

        
    }


    //摇杆控制行走
    _proto.rockerRun = function(){

        var rockerV = this.rockerV;
        var Role = this.Role;
        var RoleVectors = {x:0,y:0};

        //摇杆误操作范围
        if(rockerV.angle2<10*10){
            return;
        }

        //角色朝向
        var rockerA = rockerV.angle;
        if(rockerA==-1){
            if(Role.playActionName!='cike'){
                Role.playAction('cike');
            }
            return;
        }else if(rockerA>180){
            Role.run('left');
        }else if(rockerA<180){
            Role.run('right');
        }


        //行走方向
        RoleVectors =  {x:Math.sin(rockerV.radians),y:Math.cos(rockerV.radians)};

        var layaW = Laya.stage.width;
        var layaH = Laya.stage.height;
        var runX = parseInt(RoleVectors.x*Role.runSpeed);
        var runY = parseInt(RoleVectors.y*Role.runSpeed*0.6); //上下行走减速20%
        var minY = parseInt(layaH*0.34);
        //向量运动
        Role.x += runX;
        Role.y += runY;

        //边界检测
        if(Role.x<0){
            Role.x = 0;
        }else if(Role.x>layaW){
            Role.x = layaW;
        };
        if(Role.y < minY){
            Role.y = minY;
        }else if(Role.y > layaH-50){
            Role.y = layaH-50;
        }

        // if(rockerA>=23 && rockerA<=67){
        //     //console.log('向右下移动');
        //     return {x:0.7,y:0.6};
        // }else if(rockerA>=68 && rockerA<=113){
        //     return {x:1,y:0};
        //     //console.log('向右移动');
        // }else if(rockerA>=114 && rockerA<=157){
        //     return {x:0.7,y:-0.6};
        //     //console.log('向右上移动');
        // }else if(rockerA>=158 && rockerA<=203){
        //     return {x:0,y:-0.8};
        //     //console.log('向上移动');
        // }else if(rockerA>=204 && rockerA<=247){
        //     return {x:-0.7,y:-0.6};
        //     //console.log('向左上移动');
        // }else if(rockerA>=248 && rockerA<=293){
        //     return {x:-1,y:0};
        //     //console.log('向左移动');
        // }else if(rockerA>=294 && rockerA<=336){
        //     return {x:-0.7,y:0.6};
        //     //console.log('向左下移动');
        // }else if(rockerA>=0 && rockerA<=22 || rockerA>=337){
        //     return {x:0,y:0.8};
        //     //console.log('向下移动');
        // }else{
        //     return {x:0,y:0};
        // }
    }


    // _proto.loading = function(imgPath,callback){
    //     //加载图集英雄
    //     Laya.loader.load(imgPath,Handler.create(this,function(){
    //         if(typeof callback === 'function'){
    //             callback();
    //         };
    //     }),null,Laya.Loader.ATLAS); //加载结束
    // }


    

    return game;
})();





