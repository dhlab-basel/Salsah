/* ===========================================================================
 *
 * @frame: jQuery plugin for lakto — flat one page and responsive webdesign template
 *
 * @author André Kilchenmann code@milchkannen.ch
 *
 * @copyright 2014 by André Kilchenmann (milchkannen.ch)
 *
 * @requires
 *  jQuery - min-version 1.10.2
 *
 * ===========================================================================
 * ======================================================================== */

(function( $ ){
	// -----------------------------------------------------------------------
	// define some functions
	// -----------------------------------------------------------------------
	//
	// -------------------------------------------------------------------------
	// define the methods
	// -------------------------------------------------------------------------

	var methods = {
		/*========================================================================*/
		init: function() {
			return this.each(function() {
				var $this = $(this),
					localdata = {};

				localdata.center = {};
				// initialize a local data object which is attached to the DOM object
				$this.data('localdata', localdata);
				$this.css("position","absolute");
				$this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 3) +
					$(window).scrollTop()) + "px");
				$this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
					$(window).scrollLeft()) + "px");
				return $this;
			});											// end "return this.each"
		},												// end "init"

		horizontal: function() {
			return this.each(function(){
				var $this = $(this);
				var localdata = $this.data('localdata');
				$this.css("position","absolute");
				$this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
					$(window).scrollLeft()) + "px");
				return $this;
			});
		},

		vertical: function() {
			return this.each(function(){
				var $this = $(this);
				var localdata = $this.data('localdata');
				$this.css("position","absolute");
				$this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
					$(window).scrollTop()) + "px");
				return $this;
			});
		},

		bound2object: function(obj) {
			return this.each(function(){
				var $this = $(this);
				var localdata = $this.data('localdata');
				$this.css("position","absolute");
				$this.css("left", obj.position().left - $this.width() + 'px');
			});
		},

		anotherMethod: function() {
			return this.each(function(){
				var $this = $(this);
				var localdata = $this.data('localdata');
			});
		}
		/*========================================================================*/
	};



	$.fn.center = function(method) {
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			throw 'Method ' + method + ' does not exist on jQuery.tooltip';
		}
	};
})( jQuery );
