/**
 * @title [弹幕数据管理器]
 */
class barrageDataController {
    constructor(){
        /**
         * @this {Array}  barrageData [保存弹幕]
         * @this {Number} count       [弹幕存储个数]
         */
        this.barrageData = [];
        this.count = 0;
    }
    input( barrage ){
        /**
         * @title [保存弹幕对象-保存规则：每200条数据为一组(Array),barrageData保存多组数据]
         * @param {String} barrage [弹幕文字]
         */
        
        this.barrageData.push( barrage );
        this.count = this.barrageData.length;
        span1.innerHTML = `弹幕储存器中 ${this.count}`;
    }
    output(){
        // 将第一组数据抛出(30条)
        // @return {Array} barrageData [返回n条数据]
        let n = 30;
        let barrageData = this.barrageData.splice( 0 , n );
        return barrageData
    }
}