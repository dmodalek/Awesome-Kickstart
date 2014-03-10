
<? include 'includes/terrific.php'; ?>

<!doctype html>
<html class="no-js">
<head>
	<meta charset="utf-8">
	<title>Awesome Frontend Boilerplate</title>

	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width,initial-scale=1">

	<link href="//www.google-analytics.com" rel="dns-prefetch">
	<link href="//ajax.googleapis.com" rel="dns-prefetch">
	<link href="cache/styles.min.css" rel="stylesheet">

	<script src="js/vendor/modernizr-2.6.2.min.js"></script>

	<!--[if lt IE 9]>
	<script src="/js/vendor/html5shiv-printshiv-3.7.1.js" type="text/javascript"></script>
	<![endif]-->

	<!-- Live Reload !-->
	<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>

</head>

<body class="mod-layout">

	<header class="header" role="banner">

		<?php echo module('logo') ?>

	</header>

	<main class="main" role="main"></main>

	<aside class="sidebar" role="complementary"></aside>

	<footer class="footer" role="contentinfo"></footer>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.0.min.js"><\/script>');</script>
	<script src="cache/scripts.min.js"></script>

	<script>
		(function (f, i, r, e, s, h, l) {®
			i['GoogleAnalyticsObject'] = s;
			f[s] = f[s] || function () {
				(f[s].q = f[s].q || []).push(arguments)
			}, f[s].l = 1 * new Date();
			h = i.createElement(r),
					l = i.getElementsByTagName(r)[0];
			h.async = 1;
			h.src = e;
			l.parentNode.insertBefore(h, l)
		})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
		ga('create', 'UA-XXXXXXXX-XX');
		ga('send', 'pageview');
	</script>

</body>
</html>