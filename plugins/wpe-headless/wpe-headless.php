<?php
/**
 * Plugin Name: WPEngine Headless
 * Plugin URI: https://wpengine.com/
 * Description: Plugin for working with headless WordPress.
 * Author: WPEngine
 * Author URI: https://wpengine.com/
 * Text Domain: wpe-headless
 * Domain Path: /languages
 * Version: 0.1.1-dev
 *
 * @package WPE_Headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'WPE_HEADLESS_FILE', __FILE__ );
define( 'WPE_HEADLESS_DIR', dirname( __FILE__ ) );

require WPE_HEADLESS_DIR . '/includes/auth/functions.php';
require WPE_HEADLESS_DIR . '/includes/replacement/functions.php';
require WPE_HEADLESS_DIR . '/includes/settings/functions.php';
require WPE_HEADLESS_DIR . '/includes/updates/functions.php';
require WPE_HEADLESS_DIR . '/includes/utilities/functions.php';

require WPE_HEADLESS_DIR . '/includes/rest/class-wpe-headless-api.php';
require WPE_HEADLESS_DIR . '/includes/settings/class-wpe-headless-constants.php';
require WPE_HEADLESS_DIR . '/includes/settings/class-wpe-headless-crypto.php';

require WPE_HEADLESS_DIR . '/includes/menus/callbacks.php';
require WPE_HEADLESS_DIR . '/includes/auth/callbacks.php';
require WPE_HEADLESS_DIR . '/includes/deny-public-access/callbacks.php';
require WPE_HEADLESS_DIR . '/includes/replacement/callbacks.php';
require WPE_HEADLESS_DIR . '/includes/replacement/graphql-callbacks.php';
require WPE_HEADLESS_DIR . '/includes/settings/callbacks.php';
require WPE_HEADLESS_DIR . '/includes/updates/callbacks.php';
require WPE_HEADLESS_DIR . '/includes/utilities/callbacks.php';

require_once WPE_HEADLESS_DIR . '/themes/index.php';

if ( wpe_headless_is_events_enabled() ) {
	require WPE_HEADLESS_DIR . '/includes/events/callbacks.php';
}

WPE_Headless_Api::init();
