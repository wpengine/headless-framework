<?php
add_action( 'plugins_loaded', 'wpe_register_theme_directory' );
function wpe_register_theme_directory() {
	register_theme_directory( __DIR__ );
}
