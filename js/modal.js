$(document).ready(function() {
    var $modal = $(".modal"),
        $overlay = $(".modal-overlay"),
        blocked = false,
        unblockTimeout=null
    ;

    TweenMax.set($modal,{
    	autoAlpha:0
    })

    var isOpen = false;

    function openModal() {
        if (!blocked) {
        	block(400);

            TweenMax.to($overlay, 0.3, {
                autoAlpha: 1
            });

            TweenMax.fromTo($modal, 0.5, {
                x: (-$(window).width() - $modal.width()) / 2 - 50,
                scale:0.9,
                autoAlpha:1
            }, {
                delay: 0.1,
            	rotationY:0,
            	scale:1,
            	opacity:1,
                x: 0,
                z:0,
                ease: Elastic.easeOut,
                easeParams: [0.4, 0.3],
                force3D: false
            });
        	$.startUpdatingBlur(800);
        }
    }

    function closeModal() {
    	if(!blocked){
    		block(400);
	        TweenMax.to($overlay, 0.3, {
	            delay: 0.3,
	            autoAlpha: 0
	        });
	        TweenMax.to($modal, 0.3,{
	            x: ($(window).width() + $modal.width()) / 2 + 100,
	            scale:0.9,
	            ease: Quad.easeInOut,
	            force3D: false,
	            onComplete:function(){
	            	TweenMax.set($modal,{
	            		autoAlpha:0
	            	});
	            }
	        });
	    	$.startUpdatingBlur(400);
	    }
    }
    function block(t){
    	blocked=true;
    	if(unblockTimeout!=null){
    		clearTimeout(unblockTimeout);
    		unblockTimeout=null;
    	}
    	unblockTimeout=setTimeout(unblock,t);
    }
    function unblock(){
    	blocked=false;
    }
    $(".open-modal").click(function() {
        openModal();
    })
    $(".close-modal,.modal-overlay,.input-submit").click(function() {
        closeModal();
    })

    $modal.initBlur(0.5);

})