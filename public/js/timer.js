(function ($) {

var lastReset = 0,
  timerInterval = 0;

function p(i) {
  return (i < 10 ? '0' : '') + i;
}

function resetTimers() {
	if (timerInterval) {
		clearInterval(timerInterval);
		timerInterval = 0;
	}
	var d = new Date(lastReset);
	$('#lastreset').text(
		d.getHours()
		+ ':' + p(d.getMinutes())
	);

	var $timer = $('#timer');
	timerInterval = setInterval(function () {
		var diff = Date.now() - lastReset;
		var secs = Math.floor(diff / 1000) % 60;
		var mins = Math.floor(diff / 1000 / 60);

		$timer.text(mins + ' min ' + secs + ' sec');
	}, 1000);
}

function tick(cb) {
	var time = $.ajax({
		url: '/time/',
		success: function (data) {
			if (data && data.resetTime) {
				if (lastReset !== data.resetTime) {
					lastReset = data.resetTime;
					resetTimers();
				}
				if (data && data.resetCount) {
					$('#counter').text(data.resetCount);
				}
			}
		},
		complete: function () {
			cb();
		}
	});
}

$(document).ready(function () {

$.ajaxSetup({
	cache: false,
	dataType: 'json'
});

var timer;

function setTimer() {
	tick(function () {
		timer = setTimeout(setTimer, 1000);
	});
}
timer = setTimeout(setTimer, 1000);


});

})(jQuery.noConflict());