<?php

/**
 *
 * Terrific PHP Implementation
 *
 * Examples
 *
 *	Simple: 	echo module('article');
 * 	Advanced: 	echo module('article')->template('wide')->skin('wide')->data('my-article-obj')->tag('article')->attrib('role', 'aside')->indent(2);
 *  Full: 		echo module('article')->template('wide')->skins(array('wide', 'single'))->data(array('data' => my-article-obj'))->tag('article')->attribs(array('role' => 'aside', 'data-id' => '1'))->indent(2);
 *
 * Inspired by http://terrifically.org/ and https://github.com/rogerdudler/terrific-micro
 * Based on the PHP Implementation by https://github.com/lemats
 *
 */


/**
 * Global function to include terrific modules in templates
 *
 * @param $name
 * @return Terrific
 */
function module($name) {
	return new Terrific($name);
}


/**
 * Class Terrific
 */

class Terrific {

	public static $INDENT_CHAR = "\t";

	protected $name;
	protected $template;
	protected $data;
	protected $indent;
	protected $skins = array();
	protected $attribs = array();
	protected $configs = array('tag' => 'div', 'fileext' => '.php');

	/**
	 * Constructor
	 *
	 * @param $name module name
	 */
	public function __construct($name) {
		$this->name = strtolower($name);
	}

	/**
	 * Render module when using echo (magic method)
	 *
	 * @return string Module
	 */
	public function __toString() {
		return $this->render();
	}

	/**
	 * Set template
	 *
	 * @param $template
	 * @return $this
	 */
	public function template($template) {
		$this->template = strtolower($template);
		return $this;
	}

	/**
	 * Set skin
	 *
	 * @param $skin
	 * @return $this
	 */
	public function skin($skin) {
		$this->skins[] = $skin;
		return $this;
	}

	/**
	 * Set skins
	 *
	 * @param array $skins
	 * @return $this
	 */
	public function skins(array $skins = array()) {
		$this->skins = array_unique(array_merge($this->skins, $skins));
		return $this;
	}

	/**
	 * Set Data
	 *
	 * @param $skin
	 * @return $this
	 */
	public function data($data) {
		$this->data = $data;

		return $this;
	}

	/**
	 * Set html tag
	 *
	 * @param $tag
	 * @return $this
	 */
	public function tag($tag) {
		$this->configs['tag'] = $tag;

		return $this;
	}

	/**
	 * Add attribute
	 *
	 * @param $name
	 * @param $value
	 * @return $this
	 */
	public function attrib($name, $value) {
		$this->attribs[$name] = $value;

		return $this;
	}

	/**
	 * Add attributes
	 *
	 * @param $name
	 * @param $value
	 */
	public function attribs(array $attribs = array()) {
		$this->attribs = array_unique(array_merge($this->attribs, $attribs));

		return $this;
	}

	/**
	 * Set indent
	 *
	 * @param $count
	 * @return $this
	 */
	public function indent($count) {
		$this->indent = $count;

		return $this;
	}

	/**
	 * Render a module
	 *
	 * @return string
	 */
	public function render() {

		$data = $this->data;

		// Classes
		$classes = array('mod', "mod-{$this->name}");

		// Skin Classes
		foreach ($this->skins as $skin) {
			$classes[] = sprintf("skin-%s-%s", $this->name, strtolower($skin));
		}

		// Attribs
		$attribs = array();
		foreach ($this->attribs as $name => $value) {

			switch ($name) {

				case 'class':
					if (!empty($value)) {
						$classes[] = $value;
					}
					break;

				default:
					if (empty($value)) {
						$attribs[] = "{$name}";
					} else {
						$attribs[] = "{$name}=\"{$value}\"";
					}
					break;
			}
		}

		// Add Prefix/Suffix
		$markup = sprintf('<%1$s class="%2$s"%3$s>' . PHP_EOL . '%4$s' .PHP_EOL . '</%1$s>' . '<!-- /mod-%5$s -->',
			strtolower($this->configs['tag']),
			implode(' ', $classes),
			(count($attribs) ? ' ' . implode(' ', $attribs) : ''),
			self::$INDENT_CHAR  . trim(self::indentLines(self::includeTemplate(), 1)) . self::$INDENT_CHAR,
			$this->name
		);

		return self::indentLines($markup) .  PHP_EOL;
	}

	/**
	 * Indent every line
	 *
	 * @param $markup
	 * @return mixed
	 */
	protected function indentLines($markup, $count = null) {

		if($count === null) {
			$count = $this->indent;
		}
		$markup = str_replace(
			PHP_EOL,
			PHP_EOL . str_repeat(self::$INDENT_CHAR, $count),
			$markup);

		return $markup;
	}

	/**
	 * Include template markup and data
	 *
	 * @return string
	 */
	protected function includeTemplate() {

		if (file_exists($this->templateFile())) {

			ob_start();

			// Provide data for the module
			if($this->data !== null) {
				$data = $this->data;
			}

			include $this->templateFile();

			return ob_get_clean();

		} else {
			return sprintf("<!-- Template does not exists: %s/%s -->", basename(dirname($this->name)), basename($this->template));
		}
	}

	/**
	 * Get template file
	 *
	 * @return string
	 */
	protected function templateFile() {

		$template = '';

		if($this->template) {
			$template = '-'.$this->template;
		}

		return 'modules/' . $this->name . '/' . $this->name . $template . $this->configs['fileext'];
	}
}