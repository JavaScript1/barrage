/**
 * @title [弹幕管理器]
 */
class controller{
    constructor( fontSize=20 ){
        /**
         * @this {Object}  ctx           [获取画笔]
         * @this {Number}  width         [画布宽度]
         * @this {Number}  height        [画布高度]
         * @this {Array}   barrageData   [弹幕数据集合]
         * @this {Number}  barrageindex  [当前弹幕总个数]
         * @this {Object}  barrage       [弹幕构造函数]
         * @this {Array}   lineData      [弹幕行管理]
         * @this {Number}  fontSize      [弹幕文字大小]
         */
        this._ctx = null;
        this.width = 0;
        this.height = 0;
        this.barrageData = [];
        this.index = 0,
        this.barrageIndex = 0;
        this.barrage = null;
        this.lineData = null;
        this.fontSize = fontSize;
        this.barrageDataController = null;
    }
    init( config ){
        let canvas = document.getElementById('barrage');
        this.width = canvas.width;
        this.height = canvas.height;
        this._ctx = canvas.getContext("2d");
        this.barrage = config.barrage;
        this.barrageDataController = new config.barrageDataController();
        this.lineData = new Array( this.height / this.fontSize );
        this.bindInput();
        this.move();
    }
    get ctx(){
        return this._ctx;
    }
    createBarrage( config ){
        /**
         * @param {String} text        [绘制文字]
         * @param {Number} line        [弹幕初始化第几行]
         * @param {String} ctx         [画笔]
         * @param {Number} interval    [弹幕速度]
         * @param {Number} index       [弹幕在集合中的索引]
         * @param {Array}  barrageData [弹幕集合]
         */
        let { text , line , interval , index } = config;
        let barrage = new this.barrage();
            barrage.init({
                text,
                line,
                ctx: this.ctx,
                interval,
                index,
                step:3,
                barrageData: this.barrageData,
            });
        this.lineData[line] = barrage;
        // this.barrageData.push( barrage );
        // 创建的弹幕对象交给弹幕数据控制器-barrageDataController
        return barrage;
    }
    createBarrageConfig( text ){
        
        /**
         * @title [创建弹幕配置项]
         * @let   {Number} line     [初始化行-规则：画布高度/文字高度，取随机数]
         * @let   {Number} interval [初始化弹幕速度]
         */

        // 用于计算 line 是否有效
        let through = [];
       
        for( let i=0; i<this.lineData.length; i++ ){
            let item = this.lineData[i];
            if( item ){
                through[i] = item.through;
            }else{
                through[i] = true;
            }
        }
        if( !through.includes( true ) ){
            // 当前所有行的入口都关闭了
            return false;
        }
        let whileBool = true;
        let line = 0;
        do{
            line = parseInt( Math.random()*(this.height / this.fontSize + 1) + 0 );
            if( this.lineData[line] == undefined || this.lineData[line].through ){
                whileBool = false;
            }else{
                // console.log( 'line冲突' );
            }

        }while( whileBool );

        let interval = parseInt( Math.random()*20 + 5) ;

        let config = {
            text,
            interval,
            line,
            index: this.barrageIndex,
        }
        return config;
    }
    bindInput(){
        let input = document.getElementById('input');
        let send = document.getElementById('send');
            send.addEventListener( 'click' , () => {
                if( input.value == '' ){
                    return 
                }
                this.barrageDataController.input( input.value );
            })
    }
    move(){
        this.timer = setInterval( () => {
            span2.innerHTML = `弹幕剩余个数 ${this.barrageData.length}`;
            
            if( this.barrageData.length < 750 ){
                let textData = this.barrageDataController.output();
                if( textData ){
                    for( let text of textData ){
                        let config = this.createBarrageConfig( text );
                        if( !config ){
                            continue;
                        }
                        let barrage = this.createBarrage( config );
                        this.barrageIndex++;
                        this.barrageData = this.barrageData.concat(barrage);   
                    }
                }
            }

            this.barrageData.map( (item , index , self ) => {
                if( item == null || item == undefined ){
                    // 删除无效弹幕
                    self.splice( index , 1 );
                    return 
                }

                item.clear();
                item.x -= item.step;
                item.draw();
                if( item.x < -item.fontWidth ){
                    item.delete( index , self );
                }
            })
        } , 10)
    }
}