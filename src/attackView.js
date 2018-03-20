var attackView = (function(_super){
    function attackView(game){
        attackView.super(this);

        //设置技能按钮
        this.btn_attack.size(140,140);
        this.btn_attack.pos(Laya.stage.width-170,Laya.stage.height-170);
        game.optBox.addChild(this.btn_attack);
        /*是否按下攻击按钮*/
        attackView.isAttack = false;
        //按钮按下与抬起事件监听
        this.btn_attack.on(Laya.Event.MOUSE_DOWN,this,onAttack);
        this.btn_attack.on(Laya.Event.MOUSE_UP,this,onUp);

        
    }
    Laya.class(attackView,"attackView",_super);
    /*抬起攻击按钮事件回调*/
    function onUp(e){
        //如果抬起时的ID与按下时的相同 则为不攻击
        if(e.touchId == this.touchId) this.isAttack = false;
    }
    /*按下攻击按钮事件回调*/
    function onAttack(e){
        //获取按下时的id
        this.touchId = e.touchId;
        //获取事件传参值
        this.isAttack = true;
        //攻击
        shenyuan.Role.playAttack(0);
    }
    return attackView;
})(ui.AttackUI);