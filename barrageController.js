class controller{
    constructor(){
        /**
         * @this {Object}  ctx           [获取画笔]
         * @this {Number}  width         [画布宽度]
         * @this {Number}  height        [画布高度]
         * @this {Array}   barrageData   [弹幕数据集合]
         * @this {Number}  barrageindex  [当前弹幕总个数]
         * @this {Object}  barrage       [弹幕构造函数]
         * @this {Array}   lineData      [弹幕行管理]
         */
        this._ctx = null;
        this.width = 0;
        this.height = 0;
        this.barrageData = [];
        this.index = 0,
        this.barrageIndex = 0;
        this.barrage = null;
        this.lineData = [];
    }
    init(){
        let canvas = document.getElementById('barrage');
        this.width = canvas.width;
        this.height = canvas.height;
        this._ctx = canvas.getContext("2d");
        this.barrage = barrage;
        this.lineData = new Array( this.height / 20 );
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
                barrageData: this.barrageData,
            });
        this.lineData[line] = barrage;
        this.barrageData.push( barrage );
    }
    createBarrageConfig( text ){
        /**
         * @title [创建弹幕配置项]
         * @let   {Number} line     [初始化行-规则：画布高度/文字高度，取随机数]
         * @let   {Number} interval [初始化弹幕速度]
         */
        
        // 用于计算 line 是否有效
        let whileBool = true;
        let line = 0;
        do{
            line = parseInt( Math.random()*this.height / 20 + 1 );
            if( this.lineData[line] == undefined || this.lineData[line].through ){
                whileBool = false;
            }else{
                console.log( 'line冲突' );
            }

        }while( whileBool );

        let interval = parseInt( Math.random()*20 + 5) ;

        let config = {
            text,
            line,  
            interval,
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
                let config = this.createBarrageConfig( input.value );
                this.createBarrage( config );
                this.barrageIndex++;
            })
    }
    move(){
        setInterval( () => {
            this.barrageData.map( (item , index , self ) => {
                if( item == null ){
                    // 删除无效弹幕
                    self.splice( index , 1 );
                    return 
                }
                item.clear();
                item.x -= 1;
                item.draw();
                if( item.x < -item.fontWidth ){
                    item.delete( index , self );
                }
            })
        } , 10)
    }
}