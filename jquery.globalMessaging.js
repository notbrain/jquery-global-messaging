(function($){
	
	var methods = {
		init: function(options) {
			
			log(this.length);
			
			var $this = this;
			var opts = $.extend({}, $.fn.globalMessage.defaults, options);
			var data = $this.data('globalMessage');
			
			// init global data
			if ( ! data ) {
				$this.data('globalMessage', {
					settings : opts
				});
				
				$this.bind('click.globalMessage', function() {
					methods._hide(this);
				});
				
			}
			
			return $this;
			
		},
		show: function(options) {
			var $this = this;
			
			var data = $this.data('globalMessage');
			var opts = $.extend({}, data.settings, options);
			
			log("show - adding class " + opts.style);
			
			$this.removeClass("error").removeClass("success").removeClass("info").removeClass("sticky"); // todo: move to de-style function that works from list
			$this.addClass(opts.style);
			
			log("show: class = " + $this.attr("class"));
			
			$this.find("span.message").html(opts.message);
			
			log("show: msg = " + opts.message);
			
			if(opts.sticky) {
				$this.fadeIn(opts.inSpeed).addClass("sticky");
				
			} else {
				$this.fadeIn(opts.inSpeed)
					.delay(opts.duration)
					.fadeOut(opts.outSpeed, function() {
						
						// reset classes for next use
						methods._hide(this, opts);
						
					});
				
			}
			
			return $this;
			
		},
		_hide: function(target) { // internal - worth it? why not just ().hide()? same deal almost (until we queue these)
			$target = $(target);
			var data = $target.data("globalMessage");
			
			// $target.hide().removeClass(data.settings.style); // deprecated, prob obsolte
			$target
				.hide()
				.removeClass("error")
				.removeClass("success")
				.removeClass("info")
				.removeClass("sticky"); // todo: move to de-style function that works from list
			
			return $target;
			
		},
		destroy: function() { // called externally $(".selector").globalMessage("destroy");
			var $this = this;
			$(window).unbind("scroll.globalMessage");
			$this.unbind("click.globalMessage");
		}
		
	};
	
	$.fn.globalMessage = function(method) {
		
		// Method calling logic
		if ( methods[method] ) {
			// existing method found
			log("invoked: existing method found - " + method);
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
			
		} else if ( typeof method === 'object' || ! method ) {
			// no method passed/found, run init
			log("invoked: no method found/passed - running init...");
			return methods.init.apply( this, arguments );
			
		} else {
			// method not found 
			log("invoked: no method found");
			$.error( 'Method ' +  method + ' does not exist on jQuery.globalMessage');
			
		}
		
	};
	
	function log(msg) {
		
		if($.fn.globalMessage.defaults.debug) {
			if (window.console && window.console.log)
			window.console.log("globalMessage::" + msg);
		}
		
	};
	
	$.fn.globalMessage.defaults = {
		style: "info",
		message: "A message in a top-of-browser-clinging memo box.",
		inSpeed: 200,
		outSpeed: 500,
		duration: 5000,
		sticky: true,
		debug: true
	};
	
	// ideas for future: 
	// waiting for other msgs, multiple/stacked msgs
	// tiny pulsation at beginning to grab attention
	
})(jQuery);

$(document).ready(function() {
	
	// USAGE
	
	// // init
	// $(".globalMessageWrap").globalMessage();
	// //
	// // show with default settings
	// $(".globalMessageWrap").globalMessage("show");
	// //
	// // show
	// $(".globalMessageWrap").globalMessage("show", {
	// 	message: "This will show for 10 seconds, then disappear.", 
	// 	style: "info", 
	// 	sticky: false,
	// 	inSpeed: 1000,
	// 	outSpeed: 1000,
	// 	duration: 10000
	// });
	
});