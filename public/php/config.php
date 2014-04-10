<?

/**
 * Define APP_ENV
 */

if ($_SERVER['SERVER_NAME'] == 'localhost' || strpos($_SERVER['SERVER_NAME'], '.loc')) {
	define('APP_ENV', 'dev');
} else {
	define('APP_ENV', 'prod');
}

?>