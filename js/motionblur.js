(function(){
	var minBlur=2,
        maxBlur=200,
        isUpdatingBlur=false,
        updateBlurStopTimeout=null,
        multiplier=0.25
    ;
        
	$.fn.toggleBlur=function(v){
		var blurId=$(this).data("blur-id");
		var value=v?"url(#"+blurId+")":"none";
		$(this).css({
			webkitFilter:value,
			filter:value
		});
	}
	$.fn.setBlur=function(v){
		var blur=$(this).data("blur");
		v=Math.round(v);
		if($(this).data("blur-value")!=v){
			if(v==0){
				$(this).toggleBlur(false);
			}else{
				$(this).toggleBlur(true);

				blur.firstElementChild.setAttribute("stdDeviation",v+",0");
				$(this).data("blur-value",v);
			}
		}
	}
	$.fn.initBlur=function(_multiplier){
		if(typeof _multiplier=="undefined") _multiplier=0.25;
		multiplier=_multiplier;
		var defs=$(".filters defs").get(0);
		var blur=$("#blur").get(0);
		$(this).each(function(i){
			var blurClone=blur.cloneNode(true);
			var blurId="blur"+i;
			blurClone.setAttribute("id",blurId);
			defs.appendChild(blurClone);
			$(this)
				.data("blur",blurClone)
				.data("blur-id",blurId)
				.data("blur-value",0)
				.data("last-pos",$(this).offset())
			;
		});
	}

	$.updateBlur=function(){
		$(".js-blur").each(function(){
			var pos=$(this).offset();
			var lastPos=$(this).data("last-pos");
			var v=Math.abs(pos.left-lastPos.left)*multiplier;
			$(this).data("last-pos",pos);
			$(this).setBlur(v);
		})
		if(isUpdatingBlur){
			requestAnimationFrame($.updateBlur);
		}
	}
	$.startUpdatingBlur=function(stopDelay){
		if(typeof stopDelay=="undefined"){
			stopDelay=-1;
		}
		if(updateBlurStopTimeout!=null){
			clearTimeout(updateBlurStopTimeout);
			updateBlurStopTimeout=null;
		}
		if(!isUpdatingBlur){
			isUpdatingBlur=true;
			$.updateBlur();
		}
		if(stopDelay>-1){
			updateBlurStopTimeout=setTimeout($.stopUpdatingBlur,stopDelay);
		}
	}
	$.stopUpdatingBlur=function(){
		isUpdatingBlur=false;
	}
})();