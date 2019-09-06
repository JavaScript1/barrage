/**
 * @title [弹幕行管理器]
 */
class lineController {
    constructor( lineData  ){
        /**
         * @this {Array}   lineData    [每行的数据：只保存最后一个]
         * @this {Array}   throughData [行入口管理]
         */
        this.lineData = lineData;
        this.throughData = null;
    }
   
    createLine(){
        this.throughData = [];
        for( let i=1; i<this.lineData.length; i++ ){
            let item = this.lineData[i];
            // 记录当前弹幕入口是否开放
            if( item == undefined || item.through ){
                this.throughData.push(i);
            }
        }
        return this.createNumber();
    }
  
    output(){
        let data = this.createLine();
        return data;
    }
    createNumber(){
        let maxLine = this.throughData.length;
        let line = this.throughData[parseInt( Math.random() * maxLine + 0)];
        return line;
    }
}