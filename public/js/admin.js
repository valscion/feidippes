(function ($) {

$(document).ready(function () {
	$('#resetter a').click(doAjax);
});

var canDoAgain = true;
function doAjax() {
	if (!canDoAgain) { return; }
	canDoAgain = false;
	console.log('doing ajax');
	$.ajax({
		url: '/control/reset/',
		cache: false,
		dataType: 'json',
		success: function (data) {
			console.log('succee');
			if (data && data.status === 'ok') {
				var $e = $('header h1');
				var oldText = $e.text();
				$e.fadeOut(200, function () {
					$e.text('Timer reset!');
					$e.fadeIn(200, function () {
						setTimeout(function () {
							$e.fadeOut(200, function () {
								$e.text(oldText);
								$e.fadeIn(400, function () {
									canDoAgain = true;
								});
							});
						}, 1000);
					});
				});
			}
		},
		error: function () {
			canDoAgain = false;
		}
	});
}

})(jQuery.noConflict());