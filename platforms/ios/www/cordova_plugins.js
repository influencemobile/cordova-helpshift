cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.helpshift.cordova/www/cordova-helpshift.js",
        "id": "com.helpshift.cordova.HelpshiftPlugin",
        "clobbers": [
            "window.HelpshiftPlugin"
        ]
    }
];
module.exports.metadata =
// TOP OF METADATA
{
    "com.helpshift.cordova": "0.1.0"
}
// BOTTOM OF METADATA
});
