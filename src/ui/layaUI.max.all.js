var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var AttackUI=(function(_super){
		function AttackUI(){
			
		    this.btn_attack=null;

			AttackUI.__super.call(this);
		}

		CLASS$(AttackUI,'ui.AttackUI',_super);
		var __proto__=AttackUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(AttackUI.uiView);

		}

		AttackUI.uiView={"type":"View","props":{"width":667,"height":375},"child":[{"type":"Image","props":{"var":"btn_attack","skin":"role/attack.png","right":20,"layoutEnabled":true,"bottom":20}}]};
		return AttackUI;
	})(View);
var RockerUI=(function(_super){
		function RockerUI(){
			
		    this.knob=null;

			RockerUI.__super.call(this);
		}

		CLASS$(RockerUI,'ui.RockerUI',_super);
		var __proto__=RockerUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(RockerUI.uiView);

		}

		RockerUI.uiView={"type":"View","props":{"width":667,"height":375},"child":[{"type":"Image","props":{"y":0,"x":0,"width":140,"skin":"role/rocker_bg.png","height":140},"child":[{"type":"Image","props":{"y":0,"x":0,"width":80,"var":"knob","skin":"role/rocker_btn.png","layoutEnabled":true,"height":80}}]}]};
		return RockerUI;
	})(View);