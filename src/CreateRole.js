
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
            
            animation.createFrames(['role/cike_run_1.png','role/cike_run_2.png','role/cike_run_3.png','role/cike_run_4.png','role/cike_run_5.png','role/cike_run_6.png','role/cike_run_7.png','role/cike_run_8.png'],'cike_run');

            isCache = true;
            
        }
        
        //添加建筑动画
        var roleW = 500,
            roleH = 400;
        this.body = new Laya.Animation();
        this.body.size(roleW,roleH);
        this.addChild(this.body);
        this.playAction(this.name);
        this.size(roleW,roleH);

        this.pivotX = roleW/2;
        this.pivotY = roleH/2+30;
        this.scaleX = -1;
        
        //刺客
        if(this.name=='cike'){

        }


    };

    //播放动画
    _proto.playAction = function(action,loop){
        if(action=='cike'){
            this.body.interval = 200; 
        }else if(/_jn1/.test(action)){
            var jn1Speed = 100*(1-(this.gongsu-100)/100);
            this.body.interval = jn1Speed<50 ? 50 : jn1Speed; 
        }else{
            this.body.interval = 100;
        };
        this.body.play(0,!loop?loop:true,action);
        this.playActionName = action;
    };

    //角色移动
    _proto.run = function(direction){
        var dirLower = direction.toLowerCase();
        if(dirLower=='right' || !dirLower){
            this.scaleX = -1;
        }else if(dirLower=='left'){
            this.scaleX = 1;
        };
        if(this.playActionName!='cike_run'){
            this.playAction('cike_run');
        }
    };

    _proto.playAttack = function(num){
        if(num == 0 && this.playActionName!='cike_jn1'){
            this.playAction('cike_jn1',false);

            this.body.on(Event.COMPLETE,this,onComplete);

            function onComplete(){
                this.playAction('cike');
            }
        }
    }



    return CreateRole;

})(Laya.Sprite);