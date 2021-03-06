/**
 * Created by Ivy on 2014/8/13.
 */
function Rect(n,color){
    createjs.Shape.call(this);
    this.setRectType = function(type){
        this._RectType = type;
        switch(type){
            case 1:
                this.setColor(color);
                break;
            case 2:
                this.setColor("#FF0000");
                break;
        }
    };
    this.setColor = function(colorStr){
        this.graphics.beginFill(colorStr);
        this.graphics.drawRect(0,0,400/n-5,400/n-5);
        this.graphics.endFill();
    };
    this.getRectType = function(){
        return this._RectType;
    };
    this.setRectType(1);
}
Rect.prototype = new createjs.Shape();