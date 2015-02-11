(function ($){
	// doesn't work without jquery
	if (!$) return;

	// treeView
	function treeView($me) {
		// collapsable elements i.e. the li with a ul in it
		var $collapse = $me.find('li>ul').parent();

		return {
			//initialize control
			init: function () {
				// all the collapsable items which have something
				$collapse.addClass('contains-items');
				// user config
				if ($me.hasClass('expanded-items')){
					$collapse.addClass('items-expanded')
				} else {
					$me.find('ul').css('display', 'none');
				}
				// expand items which have something
				$me.find('.contains-items').on('click', function (event) {
					if ($(event.target).hasClass('contains-items')){
						// expand icon
						$(this).toggleClass('items-expanded');
						// the inner list
						var $a = $(this).find('>ul');
						// slide effect
						$a.slideToggle();
						// stop propagation of inner elements
						event.stopPropagation();
					}
				});
			},
			// expand all items
			expandAll: function() {
				var items = $me.find('.contains-items');
				items.find('ul').slideDown();
				items.addClass('items-expanded');
			},
			// collapse all items
			collapseAll: function() {
				var items = $me.find('.contains-items');
				items.find('ul').slideUp();
				items.removeClass('items-expanded');
			}
		}
	}
	// treeView jQuery plugin
	$.fn.treeView = function(options) {
		// if it's a function arguments
		var args = (arguments.length > 1) ? Array.prototype.slice.call(arguments, 1) : undefined;
		// all the elements by selector
		return this.each(function () {
			var instance = new treeView($(this));
			if ( instance[options] ) {
				// has requested method
				return instance[options](args);
			} else {
				// no method requested, so initialize
				instance.init();
			}
		});
	}

})(window.jQuery);