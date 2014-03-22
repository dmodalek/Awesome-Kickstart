<? include 'php/terrific.php'; ?>
<? include 'php/helper.php'; ?>

<!doctype html>
<html class="no-js">
<head>
	<meta charset="utf-8">
	<title>Awesome Kickstart</title>

	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width,initial-scale=1">

	<link href="//www.google-analytics.com" rel="dns-prefetch">
	<link href="//ajax.googleapis.com" rel="dns-prefetch">
	<link href="cache/styles.css" rel="stylesheet">

	<script src="js/dyn/modernizr-2.6.2.min.js"></script>

	<!--[if lt IE 9]>
	<script src="/js/dyn/html5shiv-printshiv-3.7.1.js" type="text/javascript"></script>
	<![endif]-->

	<!-- Live Reload !-->
	<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>

</head>

<body class="mod mod-layout <?= ($_SERVER['SERVER_NAME'] == 'localhost' ? 'skin-layout-dev ' : '') ?>">

	<div class="container">

		<header class="header" role="banner">

			<?php echo module('logo') ?>

		</header>

		<main class="main richtext" role="main">

			<h1>Awesome Kickstart</h1>
			<h2>Heading H2</h2>
			<h3>Heading H3</h3>
			<h4>Heading H4</h4>

			<p>A paragraph with a <a href="#">Link</a> and some more text.</p>


			<ul>
				<li>List Item</li>
				<li>List Item</li>
				<li>
					<ul>
						<li>Nested List Item</li>
						<li>Nested List Item</li>
					</ul>
				</li>
			</ul>

			<div class="row">
				<div class="col-6">
					<div class="row">
						<div class="col-3"></div>
						<div class="col-3"></div>
						<div class="col-3"></div>
						<div class="col-3"></div>
					</div>
				</div>
				<div class="col-6">
					<div class="row">
						<div class="col-4"></div>
						<div class="col-4"></div>
						<div class="col-4"></div>
					</div>
				</div>
			</div>

		</main>

		<aside class="sidebar" role="complementary"></aside>

		<footer class="footer" role="contentinfo"></footer>

	</div>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="js/dyn/jquery-1.11.0.min.js"><\/script>');</script>
	<script src="cache/scripts.js"></script>

	<script>
		(function (f, i, r, e, s, h, l) {
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
