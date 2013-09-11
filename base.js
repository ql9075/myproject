;(function( $, win ) {
	
var G = {
	
	/**
	 * 监听器
	 * 
	 */
	listen: {
	
		resize: function( callback ) {
			var timer = null;
			
			clearTimeout( timer );
					
			timer = setTimeout(function() {
				$( window ).resize(function() {
					callback();
				});
			}, 79 );
		}
	},
	
	/**
	 * window 高宽
	 * 
	 */
	screen: {
	
		width: function() {
			return $( window ).width() + $( window ).scrollLeft();
		},
		
		height: function() {
			return $( window ).height() + $( window ).scrollTop();
		}
	},
	
	/**
	 * 字符串处理包
	 * 
	 */
	str: {
		
		// 格式化为 json 格式
		toJson: function( str ) {
			var json = {}, arr = str.split( ';' );
			
			for( var i = 0; i < arr.length; i ++ ) {
				
				var item = arr[i].split( ':' );
				
				json[ item[0] ] = item[1];
			}
			
			return json;
		}
	},
	
	/**
	 * 数学函数包
	 * 
	 */
	math: {
		
		// 随机函数
		// 随机数   最大值 为   end + start， 最小值为 start
		rand: function( end, start ) {
			var num = Math.floor( Math.random() * end );
			
			return ( start || 0 ) + num;
		}
	},
	
	/**
	 * 加载器
	 * 
	 */
	loader: {
		
		// 等待图片加载
		// @params: { url: 原始对象集合: Array }
		// @params: Function
		// @Callback 1.image target, 2.是否为缓存
		img: function( json, callback ) {
			var data = $.isPlainObject( json ) ? json : {};
				
			if( !$.isPlainObject( json ) ) {
				data[ json ] = [];
			}
			
			for( var key in data ) {
				
				var url = key, img = new Image();
					
					img.src = url;
					
					img._callback = callback;
					img._orgi = data[ key ];
					
				// 如果图片已经存在于浏览器缓存，直接调用回调函数
				if( img.complete ) {
					// 如果为 true 则表示在缓存中
					img._callback.call( img, true );
					return;
				}
				
				// 图片下载完毕时异步调用callback函数
				img.onload = function () {
					this._callback.call( this, false );
				};
			}
		}
	}
};

window.G = G;


})( jQuery, window );
