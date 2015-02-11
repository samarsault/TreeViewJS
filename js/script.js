$('#samplesTree li li').on('click', function () {
	var className = $(this).html();
	$('.content').children().css('display', 'none');
	$('.'+className).css('display', 'block');
});