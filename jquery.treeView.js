(function ($){
	// doesn't work without jquery
	if (!$) return;
	// treeView
	function treeView($me) {
		// collapsable elements i.e. the li with a ul in it
		var $collapse = $me.find('li>ul').parent();
		// generate tree from data
		function generateTree(data, $root) {
			// create a node from a node object
			function createNode(nObj) {
				var li = $('<li>').text(nObj.label);
				if (nObj.children != undefined && nObj.children.length > 0) {
					innerList = $('<ul>');
					for (var i = 0; i < nObj.children.length; i++) {
						var child = nObj.children[i];
						innerList.append(createNode(child));
					};
					li.append(innerList);
				}
				return li;
			}
			for (var i = 0; i < data.length; i++) {
				$root.append(createNode(data[i]));
			}
		}

		return {
			//initialize control
			init: function (data) {
				if (typeof data == "object"){
					generateTree(data, $me);
					$collapse = $me.find('li>ul').parent();
				}
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
				instance.init(options);
			}
		});
	}

})(window.jQuery);