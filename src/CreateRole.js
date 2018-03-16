
var CreateRole = (function(_Sprite){
    function CreateRole(info){
        CreateRole.super(this);

        //默认属性
        this.gongsu = 100;
        this.yisu = 100;

        //初始化设置的属性
        for(var key in info){
            this[key] = info[key];
        };

        //初始化方法
        this.init();
    };
    Laya.class(CreateRole,'CreateRole',_Sprite);

    var _proto = CreateRole.prototype;
    var isCache = false;

    
    _proto.init = function(){

        //缓存所有动画
        if(!isCache){
            

            
            var animation = Laya.Animation;

            animation.createFrames(['role/cike_stand_1.png','role/cike_stand_2.png','role/cike_stand_3.png','role/cike_stand_4.png'],'cike');

            animation.createFrames(['role/cike_jn1_1.png','role/cike_jn1_2.png','role/cike_jn1_3.png','role/cike_jn1_4.png','role/cike_jn1_5.png','role/cike_jn1_6.png','role/cike_jn1_7.png','role/cike_jn1_8.png'],'cike_jn1');

            isCache = true;
            
        }
        
        //添加建筑动画
        var roleW = 500,
            roleH = 400;
        this.body = new Laya.Animation();
        this.body.size(roleW,roleH);
        this.body.interval = 100;
        this.addChild(this.body);
        this.playAction(this.name);
        this.size(roleW,roleH);

        this.pivotX = roleW/2;
        this.pivotY = roleH/2+30;
        this.scaleX = -1;
        
        //刺客
        if(this.name=='cike'){

        }

        console.log(this);

    };

    //播放动画
    _proto.playAction = function(action){
        this.body.play(0,true,action);
    };

    //角色移动
    _proto.run = function(direction){
        var dirLower = direction.toLowerCase();
        if(dirLower=='right'){
            this.x += 1;
            this.x += 1;
        }else if(dirLower=='left'){
            this.x -= 1;
            this.x -= 1;
        }else if(dirLower=='up' || dirLower=='top'){
            this.y -= 1;
            this.y -= 1;
        }else if(dirLower=='down' || dirLower=='bottom'){
            this.y += 1;
            this.y += 1;
        };
    };



    return CreateRole;

})(Laya.Sprite);