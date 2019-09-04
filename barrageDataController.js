/**
 * @title [弹幕数据管理器]
 */
class barrageDataController {
    constructor( controller ){
        /**
         * @this {Array}  barrageData [保存弹幕]
         * @this {Object} controller  [弹幕控制器]
         * @this {Number} count       [弹幕存储个数]
         */
        this.barrageData = [];
        this.controller = controller;
        this.count = 0;
    }
    input( barrage ){
        /**
         * @title [保存弹幕对象-保存规则：每200条数据为一组(Array),barrageData保存多组数据]
         * @param {String} barrage [弹幕文字]
         */
        
        let data = this.barrageData;
        let lastArr = [ barrage ];
        
        if( data.length == 0 ){
            data.push( lastArr );
        }
        
        if( data[ data.length-1 ].length == 30 ){
            data.push( lastArr );
        }else{
            if( data[ data.length-1 ] !== lastArr ){
                data[ data.length-1 ] = data[ data.length-1 ].concat( lastArr );
            } 
        }
        
        let count = 0;
        for( let item of this.barrageData ){
            count += item.length - 1;
        }
        this.count += count;
        span1.innerHTML = `弹幕储存器中 ${this.count}`;
    }
    output(){
        // 将第一组数据抛出(30条)
        // @return {Array} barrageData [返回30条数据]
        let barrageData = this.barrageData.pop();
        if( barrageData ){
            this.count -= barrageData.length - 1;
        }
        return barrageData
    }
}