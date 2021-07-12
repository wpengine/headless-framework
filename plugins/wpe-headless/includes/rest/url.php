<?php

/**
 * Fixes rest_url when configuring front-end URL.
 *
 * @package WPE_Headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function fix_rest_url($url) {
    return str_replace(home_url(), site_url(), $url);
}

add_filter( 'rest_url', 'fix_rest_url');

?>