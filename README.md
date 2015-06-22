
# Helpshift Plugin for Cordova 3.5+

Though not the official Helpshift Cordova plugin, this version uses the full and proper
Cordova plugin API for fully automated installation.

## Installation

	cordova plugin add https://github.com/affinityis/cordova-helpshift.git

## Usage

Run the init method when starting up your app:

	HelpshiftPlugin.init("<APP_ID>", "<DOMAIN_NAME>", "<API_KEY>");

More documentation here:<br>
https://developers.helpshift.com/phonegap/getting-started-ios/#metadata<br>
https://developers.helpshift.com/ios/getting-started/<br>
https://developers.helpshift.com/android/getting-started/

## TODO

* Should Android activities use singleTop mode?
* Test config flags (https://developers.helpshift.com/android/sdk-configuration/#config-summary)
* Help users setup notifications

## FAQ

If encounter problem when using the plugin, please read the [FAQ](https://github.com/affinityis/cordova-helpshift/wiki/FAQ) first.
