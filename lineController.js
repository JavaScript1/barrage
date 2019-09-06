/**
 * @title [弹幕行管理器]
 */
class lineController {
    constructor( lineData  ){
        /**
         * @this {Array}   barrageData [弹幕数据集合]
         * @this {Array}   lineData    [每行的数据：只保存最后一个]
         * @this {Array}   throughData [行入口管理]
         * @this {Object}  readyData   [结果数据]
         * @this {Boolean} isData      [是否还有待处理的数据]
         */
        this.barrageData = [];
        this.lineData = lineData;
        this.throughData = null;
    }
    get isData(){
        return this.barrageData.length > 0;
    }
    createLine(){
        this.throughData = [];
        for( let i=0; i<this.lineData.length; i++ ){
            let item = this.lineData[i];
            // 记录当前弹幕入口是否开放
            if( item == undefined || item.through ){
                this.throughData.push(i);
            }
        }
        
        return {
            line: this.createNumber(),
            text: this.barrageData.shift(),
        }
    }
    input( barrageData ){
        this.barrageData = this.barrageData.concat( barrageData );
    }
    output(){
        let data = this.createLine();
        return data;
    }
    createNumber(){
        let maxLine = this.throughData.length;
        let line = this.throughData[parseInt( Math.random() * maxLine + 1)];
        return line;
    }
}