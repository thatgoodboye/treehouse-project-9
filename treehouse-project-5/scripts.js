function search() {
	var $search = $(".search") // search string
		.val()
		.trim()
		.toLowerCase();

	// iterate slides and read captions
	$(".slide").each(function() {
		var i = $(this).data("i"); // index
		var $thumb = $(".thumb[data-i='" + i + "']"); // thumb with matching index
		var $cap = $(this) // caption string
			.find(".slide-caption")
			.text()
			.trim()
			.toLowerCase();

		if ($search.length > 0 && $cap.indexOf($search) < 0) {
			$thumb.hide();
		} else {
			$thumb.show();
		}
	});
}

function slide($t) {
	// return negative percentage equal to
	// $t (target slide) - 1
	return -1 * ($t - 1) * 100 + "%";
}

function slideTo(i) {
	var $slider = $(".slider"); // slides window
	var $slides = $(".slides"); // strip of slides
	var l = $(".slide").length; // total number of slides

	if (i > l) {
		// first slide
		$slider.data("i", 1); // set active slide index
		$slides.css("left", slide(1)); // slide to first
	} else if (i - 1 < 0) {
		// last slide
		$slider.data("i", l); // set active slide index
		$slides.css("left", slide(l)); // slide to last
	} else {
		// target slide
		$slider.data("i", i); // set active slide index
		$slides.css("left", slide(i)); // slide to target
	}
}

function main() {
	$(".shadow").click(function() {
		$(".lightbox").hide();
	});

	$(".thumb-anchor").click(function(e) {
		e.preventDefault();
	});

	$(".thumb").click(function(e) {
		var i = $(this).data("i"); // slide index

		slideTo(i); // slide to index
		$(".lightbox").css("display", "flex"); // show the lightbox
	});

	$(".slider-nav").click(function() {
		var i = $(".slider").data("i"); // active slide index

		if ($(this).data("slide") === "prev") {
			slideTo(i - 1); // slide to index - 1
		} else if ($(this).data("slide") === "next") {
			slideTo(i + 1); // slide to index + 1
		}
	});

	$(".search").keyup(search);
}

main();
