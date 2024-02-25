/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		$main_articles = $main.children('article');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Fix: Flexbox min-height bug on IE.
		if (browser.name == 'ie') {

			var flexboxFixTimeoutId;

			$window.on('resize.flexbox-fix', function() {

				clearTimeout(flexboxFixTimeoutId);

				flexboxFixTimeoutId = setTimeout(function() {

					if ($wrapper.prop('scrollHeight') > $window.height())
						$wrapper.css('height', 'auto');
					else
						$wrapper.css('height', '100vh');

				}, 250);

			}).triggerHandler('resize.flexbox-fix');

		}

// Articles.
	$main_articles.each(function() {

		var $this = $(this);

		// Close.
			$('<div class="close">Close</div>')
				.appendTo($this)
				.on('click', function() {
					location.hash = '';
				});

		// Prevent clicks from inside article from bubbling.
			$this.on('click', function(event) {
				event.stopPropagation();
			});

	});

// Events.
	$body.on('click', function(event) {

		// Article visible? Hide.
			if ($body.hasClass('is-article-visible'))
				$main._hide(true);

	});

	$window.on('keyup', function(event) {

		switch (event.keyCode) {

			case 27:

				// Article visible? Hide.
					if ($body.hasClass('is-article-visible'))
						$main._hide(true);

				break;

			default:
				break;

		}

	});

	$window.on('hashchange', function(event) {

		// Empty hash?
			if (location.hash == ''
			||	location.hash == '#') {

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Hide.
					$main._hide();

			}

		// Otherwise, check for a matching article.
			else if ($main_articles.filter(location.hash).length > 0) {

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Show article.
					$main._show(location.hash.substr(1));

			}

	});

// Scroll restoration.
// This prevents the page from scrolling back to the top on a hashchange.
	if ('scrollRestoration' in history)
		history.scrollRestoration = 'manual';
	else {

		var	oldScrollPos = 0,
			scrollPos = 0,
			$htmlbody = $('html,body');

		$window
			.on('scroll', function() {

				oldScrollPos = scrollPos;
				scrollPos = $htmlbody.scrollTop();

			})
			.on('hashchange', function() {
				$window.scrollTop(oldScrollPos);
			});

	}

// Initialize.

	// Hide main, articles.
		$main.hide();
		$main_articles.hide();

	// Initial article.
		if (location.hash != ''
		&&	location.hash != '#')
			$window.on('load', function() {
				$main._show(location.hash.substr(1), true);
			});

})(jQuery);