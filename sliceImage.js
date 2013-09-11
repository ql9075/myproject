/*
	SliceImage

*/

;(function( $ ) {

	$.fn.SliceImage = function( opt ) 
	
	{
		
		this.each(function(){

			var sliceImage = new $.SliceImage( this , opt);
				sliceImage.init();

		});

		return this;

	};


	$.SliceImage = function ( obj , opt )
	
	{	

		var obj = obj ,opt = opt ;
		if (typeof(obj) !== 'object') obj = $(obj)[0];
		if (typeof(opt) !== 'object') opt = { };

		this.obj = obj;

		this.opt = {

		  bkopacity:'.6',
		  baseClass: 'slice',
		  bgColor : 'black',
		  iW : 600 ,
		  iH : 800

		};


		$.extend( this.opt , opt );

	};

	$.SliceImage.prototype = 
	
	{
		init:function()


		{	
			var $this = this , newH , newW , _top = 0 , _left = 0  ;
			var $defimg = $(this.obj) ;
			var $newimg = $defimg.clone().removeAttr('id').css({ position:'absolute' });
			var $isrc = $newimg.attr('src');

			$newimg.width($defimg.width());
			$newimg.height($defimg.height());
			$defimg.after($newimg).hide();

			
			var boundw = $newimg.outerWidth() , 
				boundh = $newimg.outerHeight()
			;

			var $new2img  = $('<img />')
						.attr('src',$isrc)
						.css('position','absolute')
			;
			var $drg_btn  = $('<div />')
						.css({
							position:'absolute'
						})
						.addClass(cclass('dragBtn'))
			;

			 var $holderbox  = $('<div />')
				   .addClass(cclass('holder'))
				   .css({
				   		position:"relative",
				   		backgroundColor: $this.opt.bgColor
				   	})
				   .insertBefore($defimg)
				   .append($drg_btn)
			;
			var $img_holder = $('<div />')
					.width('100%').height('100%')
					.css({
						zIndex: 400,
						position: 'absolute',
						overflow: 'hidden',
						cursor:'move'
					})
					.addClass(cclass('imgbox'))
			;
			var  $sel = $('<div />')
					  .css({
							position:'absolute',
							cursor: 'move',
							zIndex:404
						})
						.addClass(cclass('dragImg'))
						.append($img_holder)
			;
			var $showdiv = $('<div />') ;

			var $showimg = $new2img.clone();

			G.loader.img( $isrc , function() {
				
				var imgw = boundw,
					imgh = boundh
				;
					newW = imgw > $this.opt.iW ? $this.opt.iW  : imgw ;
					newH = imgh > $this.opt.iH ? $this.opt.iH  : imgh ;
				

				$new2img.width(newW*3/4).height(newH*3/4);
				
				$holderbox.width(newW*3/4).height(newH*3/4).append($newimg);

			    $img_holder.append($new2img);
			
				$sel.insertBefore($newimg);

				$newimg.css({"width":newW*3/4,"height":newH*3/4,"opacity":$this.opt.bkopacity});

				$sel.css({"width":(newW/2),"height":(newW/2)});

				var btn_left =  $sel.outerWidth() - $drg_btn.outerWidth(), 
					btn_top = $sel.outerHeight() -$drg_btn.outerHeight();

				$drg_btn.css({ top:btn_top,left:btn_left });

				$showdiv 
					.css({
						position:"absolute",
						top:'0',
						left: $holderbox.outerWidth()+50,
						overflow:"hidden",
						width:newW/2,
						height:newW/2
					})
					.appendTo($holderbox)
				;

				 $showimg.width($new2img.width()).height($new2img.height()).appendTo( $showdiv);

			});
		

			function cclass(name){ return $this.opt.baseClass + '-' + name; };

			
			$newimg.bind('mousedown',function(e){

				var e = e || window.event;
				if (e.preventDefault) {
                    e.preventDefault();
                    e.stopPropagation();
                        
                }else {  
			        // fot ie  
			        e.returnValue = false;  
			   
			     }
			});

		
			var dragImg = function()
			{	
			
				$sel.bind('mousedown',function(e){
					if (e.preventDefault) {
                        e.preventDefault();
                        e.stopPropagation();
                    }else {  
			        // fot ie  
			        e.returnValue = false;  
			   
			 	    }
					mousedownImg(e);

				
				});
				
				function mousedownImg(e)

				{	
					 var _this = $(this);
					 var e = e || window.event;
					 $this.currposX = e.clientX;
					 $this.currposY = e.clientY;
					 $this.dragbtnW = $drg_btn.width();
					 $this.dragbtnH = $drg_btn.height();
					 $this.dragboxW = $sel.width();
					 $this.dragboxH = $sel.height();
					 $this.holdboxW = $holderbox.width();
					 $this.holdboxH = $holderbox.height();
					 $this.dragboxleft = $sel.position().left;
					 $this.dragboxtop = $sel.position().top;
					 $this.holdboxleft = $holderbox.offset().left;
					 $this.holdboxtop = $holderbox.offset().top;
					
				 
					$(document).bind('mousemove',function(e){
						if (e.preventDefault) {
                        e.preventDefault();
                        e.stopPropagation();
	                    }else {  
				        // fot ie  
				        e.returnValue = false;  
				   
			 	  		  }
						var e = e || window.event;
						$this.McurrposX = e.clientX ;
						$this.McurrposY = e.clientY ;
						var changeposX = $this.McurrposX - $this.currposX ,
						 	changeposY = $this.McurrposY - $this.currposY ,
						    Mdragboxleft = $this.dragboxleft + changeposX ,
						    Mdragboxtop = $this.dragboxtop + changeposY ,
						    Mdragbtnleft = $this.dragboxleft + $this.dragboxW  - $this.dragbtnW + changeposX ,
						    Mdragbtntop = $this.dragboxtop + $this.dragboxH  - $this.dragbtnH + changeposY 
						;
						console.log(changeposX);
						if( Mdragboxleft < 0 ) {
							Mdragboxleft = 0;
							Mdragbtnleft = $this.dragboxW - $this.dragbtnW ;
						}
						if(Mdragboxtop < 0 ) {
							Mdragboxtop = 0;
							Mdragbtntop = $this.dragboxH - $this.dragbtnH ;
						

						}
						if(Mdragboxleft >= ( $this.holdboxW - $this.dragboxW) ) {
							Mdragboxleft = $this.holdboxW - $this.dragboxW;
							Mdragbtnleft = $this.holdboxW - $this.dragbtnW;
						}
						if(Mdragboxtop >= ( $this.holdboxH - $this.dragboxH) ) {
							Mdragboxtop = $this.holdboxH - $this.dragboxH;
							Mdragbtntop = $this.holdboxH - $this.dragbtnW;
						} 

	
						$sel.css({ top:Mdragboxtop,left:Mdragboxleft });
						$new2img.css({ top:-Mdragboxtop, left:-Mdragboxleft});
						$drg_btn.css({ top:Mdragbtntop,left:Mdragbtnleft });
						$showimg.css({ top:-Mdragboxtop, left:-Mdragboxleft});

					})
					$(document).bind('mouseup',function(){
						
						$(document).unbind('mousemove');
				
					});

				}

		
			};
			var dragBtn = function()
			{

				$drg_btn.bind('mousedown',function(e){
					if (e.preventDefault) {
                        e.preventDefault();
                        e.stopPropagation();
                    }else {  
			        // fot ie  
			        e.returnValue = false;  
			   
			 	    }
					mousedownBtn(e);
				});
				function mousedownBtn(e)
				{
					var e = e || window.event;
					 $this.currposX = e.clientX;
					 $this.currposY = e.clientY;
					 $this.dragboxW = $sel.width();
					 $this.dragboxH = $sel.height();
					 $this.dragbtnW = $drg_btn.width();
					 $this.dragbtnH = $drg_btn.height();
					 $this.holdboxW = $holderbox.width();
					 $this.holdboxH = $holderbox.height();
					 $this.dragbtnleft = $drg_btn.position().left;
					 $this.dragbtntop = $drg_btn.position().top;
					 $this.holdboxleft = $holderbox.offset().left;
					 $this.holdboxtop = $holderbox.offset().top;
					
					$(document).bind('mousemove',function(e){
						if (e.preventDefault) {
                        e.preventDefault();
                        e.stopPropagation();
	                    }else {  
				        // fot ie  
				        e.returnValue = false;  
				   
				 	    }
						var e = e || window.event;
						$this.McurrposX = e.clientX ;
						$this.McurrposY = e.clientY ;
						var changeposX = $this.McurrposX - $this.currposX ,
						 	changeposY = $this.McurrposY - $this.currposY ,
						    changemin = changeposX > changeposY ? changeposY : changeposX ,
						    _left = $this.dragbtnleft + changemin ,
						    _top = $this.dragbtntop + changemin ,
						    _width = $this.dragboxW + changemin,
						    _height = $this.dragboxH + changemin,
						    dragboxleft = $sel.position().left,
						    dragboxtop = $sel.position().top,
						    changeleft = $this.holdboxW - $this.dragbtnW ,
						    changeW = $this.holdboxW -  dragboxleft ,
						    changetop = $this.holdboxH - $this.dragbtnH ,
						    changeH = $this.holdboxH - dragboxtop 
						;
						if(_left <=(dragboxleft + $this.dragbtnW) ) {
							_left = dragboxleft + $this.dragbtnW ;
							_width = 2*$this.dragbtnW;
						}
						if(_top <= (dragboxtop + $this.dragbtnW) ) {
							_top  =  dragboxtop + $this.dragbtnW ;
							_height = 2*$this.dragbtnW;
						}
						if(_left > changeleft ) {
							_left = changeleft;
							_top = changeW + dragboxtop - $this.dragbtnW ;
							_width = changeW ;
							_height = changeW ;
						}
						if(_top > changetop ){
							_top = changetop;
							_left = changeH + dragboxleft - $this.dragbtnW ;
							_width = changeH ;
							_height = changeH ;
						}

 						$sel.css({ width:_width,height:_height });
						$drg_btn.css({ top:_top,left:_left });
						$showdiv.css({ width:_width,height:_height });


					})
					$(document).bind('mouseup',function(){

						$this.dragboxW = $sel.width();
						$this.dragbtnleft =  $drg_btn.position().left;
						$this.dragbtntop =  $drg_btn.position().top;
						$(document).unbind('mousemove');
				
					});

				}

			}


			dragImg();
			dragBtn();


		
		}
	

	};


})(jQuery);
