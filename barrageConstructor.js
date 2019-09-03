class barrage{
    constructor( width , height , fontSize ){
        /**
         * @this {Number}  width     [画布宽度]
         * @this {Number}  height    [画布高度]
         * @this {Number}  fontSize  [文字大小]
         * @this {Number}  fontWidth [文字宽度]
         * @this {Object}  _ctx      [画笔]
         * @this {String}  text      [绘制文字]
         * @this {Number}  line      [绘制行数]
         * @this {Number}  x         [当前X轴位置]
         * @this {Number}  y         [当前y轴位置]
         * @this {Boolean} die       [当前弹幕是否完成移动(是否存活)]
         */
        this.width = width || 800;
        this.height = height || 600;
        this.fontSize = fontSize || 20;
        this.fontWidth = 0;
        this._ctx = null;
        this.text = '';
        this.line = 0;
        this.x = 0;
        this.y = 0;
        this._die = false;
    }
    init( config={} ){
        // 数据类型检查
        let isObj = Object.prototype.toString.call( config ).slice( 8 , -1 ) == 'Object';
        if( !isObj ){
            console.error( 'barrage.init 方法参数必须为对象' );
            return;
        }
        /**
         * @param {Object} config [配置项]
         */

        let { fillStyle , text , line , ctx , interval , index , barrageData} = config;
        this.text = text;
        this.line = line;
        this._ctx = ctx;
        //初始化画笔 绘制等方法
        this.ctxInit( fillStyle );
        this.fontWidth = this.ctx.measureText(text).width; 
        this.x = this.width - this.fontWidth;
        this.y = this.line * this.fontSize;
        this.draw();
        this.move( interval , index , barrageData );
    }
    ctxInit( fillStyle ){
        /**
         * @title [初始化画笔]
         * @param {String} fillStyle [画笔配置项]
         */
        this._ctx.fillStyle = fillStyle || '#2155CF'; 
        this._ctx.font = `${this.fontSize - 4}px Times New Roman`; 
        this._ctx.textBaseline = "bottom"; 
    }
    get ctx(){
        return this._ctx;
    }
    get die(){
        return this._die;
    }
    set die( val ){
        if( typeof val == 'boolean' ){
            this._die = val;
        }
    }
    draw(){
        // 行数 * 文字高度 = 具体Y轴位置
        this.ctx.fillText( this.text , this.x , this.y );
    }
    clear(){
        // 清空当前绘制的文字
       this.ctx.clearRect( this.x , this.y - this.fontSize , this.fontWidth + 2 , this.fontSize + 2 ); 
    }
    move( interval , index , barrageData ){
        this.timer = setInterval( () => {
            this.clear();
            this.x -= 1;
            this.draw();
            if( this.x < -this.fontWidth ){
                this.delete( index , barrageData );
            }
        } , interval)
    }
    delete( index , barrageData ){
        clearInterval( this.timer );
        barrageData[ index ] = null;
        // barrageData.splice( index , 1 );
        this.die = true;
        console.log(`销毁弹幕-${index}   当前弹幕总个数${barrageData.length}`);
    }
};

    
