$('#samplesTree li li').on('click', function () {
	var className = $(this).html();
	$('.content').children().css('display', 'none');
	$('.'+className).css('display', 'block');
});

// intialise all the treeView(s)
$('.treeview').treeView();
// handle expand and collapse buttons
$('.btn-expand').click(function () {
	$('.treeview').treeView('expandAll');
});
$('.btn-collapse').click(function () {
	$('.treeview').treeView('collapseAll');
})
// load the data tree
var $dataTree = $('#dataTree');
var $iconTree = $('#icon-tree');
var model = JSON.parse($('#treeModel').html());
var iModel = $.extend({}, model);
var imgs = ['css/icons/samples/folder.png', 'css/icons/samples/file.png'];

var iconModel = [
    {
        "label": "item1",
        "children": [],
        "imageIndex": 0
    },
    {
        "label": "item2",
        "children": [
            {
                "label": "subItem",
                "imageIndex": 1
            },
            {
                "label": "another subItem",
                "imageIndex": 1
            },
            {
                "label": "last subItem",
                "imageIndex": 1
            }
        ],
        "imageIndex": 0
    },
    {
        "label": "item3",
        "children": [
            {
                "label": "Hello",
                "imageIndex": 1
            },
            {
                "label": "Inner List",
                "children": [
                    {
                        "label": "innerItem1",
                        "imageIndex": 1
                    },
                    {
                        "label": "innerItem2",
                        "imageIndex": 1
                    }
                ]
            },
            {
                "label": "Bye",
                "imageIndex": 1
            }
        ],
        "imageIndex": 0
    }
];
// create icon tree
$iconTree.treeView({ 
	model: iconModel,
	imageList: imgs
});
$dataTree.treeView(model);