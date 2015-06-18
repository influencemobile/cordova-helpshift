cordova.define("com.helpshift.cordova.HelpshiftPlugin", function(require, exports, module) {

    /*
     * cordova-helpshift.js
     * Helpshift PhoneGap Plugin for:
     * Helpshift iOS SDK 4.7.0
     * Helpshift Android SDK 3.5.0
     *
     * Get the documentation at http://www.helpshift.com/docs
     */

    /**
       @namespace HelpshiftPlugin

       @description
       This document describes the API's exposed by the Helpshift PhoneGap Plugin
       which the developers can use to integrate Helpshift support into their
       iOS PhoneGap applications. If you want documentation regarding how to use
       the various features provided by the Helpshift SDK, please visit
       <a href="http://developers.helpshift.com/Integration+guide+for+iOS+SDK">helpshift how-to page</a>

    */

    var HelpshiftPlugin = {

        HS_CUSTOM_METADATA_KEY: "hs-custom-metadata",
        HS_TAGS_KEY: "hs-tags",

        HS_RATE_ALERT_CLOSE: "HS_RATE_ALERT_CLOSE",
        HS_RATE_ALERT_FEEDBACK: "HS_RATE_ALERT_FEEDBACK",
        HS_RATE_ALERT_SUCCESS: "HS_RATE_ALERT_SUCCESS",
        HS_RATE_ALERT_FAIL: "HS_RATE_ALERT_FAIL",

        notificationCB: null,
        inAppNotificationCB: null,
        sessionEndedCB: null,
        alertToRateAppCB: null,

        /**
         * Initialize Helpshift support. When initializing Helpshift you must pass these three params.
         * You initialize Helpshift by adding HelpshiftPlugin.init method in onDeviceReady method.
         *
         * @param {string} apiKey This is your developer API Key
         * @param {string} domainName This is your domain name without any http:// or forward slashes
         * @param {string} appId This is the unique ID assigned to your app
         * @param {object} [options] To initialise the helpshift SDK with additional configuration options
         *
         * @example HelpshiftPlugin.init("&lt;API_KEY&gt;", "&lt;DOMAIN_NAME&gt;", "&lt;APP_ID&gt;");
         */
        init: function (apiKey, domainName, appId, options) {
            if (options && typeof options === "object") {
                cordova.exec (null, null, "HelpshiftPlugin", "init", [apiKey, domainName, appId, options]);
            } else {
                cordova.exec (null, null, "HelpshiftPlugin", "init", [apiKey, domainName, appId]);
            }
        },

        /**
         * Show the helpshift conversation screen
         *
         * @param {object} [options] To show helpshift conversation screen with additional configuration options
         *
         * @example HelpshiftPlugin.showConversation ();
         *  HelpshiftPlugin.showConversation ({"gotoConversationAfterContactUs": "NO"});
         */
        showConversation: function (options) {
            if (options && typeof options === "object") {
                cordova.exec (null, null, "HelpshiftPlugin", "showConversation", [this._processMetadata (options)]);
            } else {
                cordova.exec (null, null, "HelpshiftPlugin", "showConversation", []);
            }
        },

        /**
         * Show the support screen with only the faqs
         *
         * @param {object} [options] To show the Helpshift screen with only the faq sections with search and additional configuration options
         *
         * @example HelpshiftPlugin.showFAQs ();
         *  HelpshiftPlugin.showFAQs ({
         *    "gotoConversationAfterContactUs": "NO",
         *    "enableContactUs": "ALWAYS",
         *    "presentFullScreenOniPad" : "YES"
         *  });
         */
        showFAQs: function (options) {
            if (options && typeof options === "object") {
                cordova.exec (null, null, "HelpshiftPlugin", "showFAQs", [this._processMetadata (options)]);
            } else {
                cordova.exec (null, null, "HelpshiftPlugin", "showFAQs", []);
            }
        },

        /**
         * Show the helpshift screen with faqs from a particular section.
         * To show the Helpshift screen for showing a particular faq section
         * you need to pass the publish-id of the faq section.
         *
         * @param {string} faqSectionPublishId The publish id associated with the faq section which is shown
         *        in the FAQ page on the admin side (__yourcompanyname__.helpshift.com/admin/faq/).
         * @param {object} [options] To show FAQ Section with additional configuration options
         *
         * @example HelpshiftPlugin.showFAQSection ("&lt;PUBLISH_ID&gt;");
         *  HelpshiftPlugin.showFAQSection ("&lt;PUBLISH_ID&gt;", {
         *    "gotoConversationAfterContactUs": "NO",
         *    "enableContactUs": "ALWAYS",
         *    "presentFullScreenOniPad" : "YES"
         *  });
         */
        showFAQSection: function (faqSectionPublishId, options) {
            if (faqSectionPublishId && typeof faqSectionPublishId === "string") {
                if (options && typeof options === "object") {
                    cordova.exec (null, null, "HelpshiftPlugin", "showFAQSection", [faqSectionPublishId, this._processMetadata (options)]);
                } else {
                    cordova.exec (null, null, "HelpshiftPlugin", "showFAQSection", [faqSectionPublishId]);
                }
            }
        },

        /**
         * Show the helpshift screen with a particular faq.
         * To show the Helpshift screen for showing a particular faq you need to pass the publish-id of the faq.
         *
         * @param {string} faqPublishId The publish id associated with the faq which is shown when you expand
         *        a single FAQ (__yourcompanyname__.helpshift.com/admin/faq/)
         * @param {object} [options] To show Single FAQ with additional configuration options
         *
         * @example HelpshiftPlugin.showSingleFAQ ("&lt;PUBLISH_ID&gt;");
         *  HelpshiftPlugin.showSingleFAQ ("&lt;PUBLISH_ID&gt;", {
         *    "gotoConversationAfterContactUs": "NO",
         *    "enableContactUs": "ALWAYS",
         *    "presentFullScreenOniPad" : "YES"
         *  });
         */
        showSingleFAQ: function (faqPublishId, options) {
            if (faqPublishId && typeof faqPublishId === "string") {
                if (options && typeof options === "object") {
                    cordova.exec (null, null, "HelpshiftPlugin", "showSingleFAQ", [faqPublishId, this._processMetadata (options)]);
                } else {
                    cordova.exec (null, null, "HelpshiftPlugin", "showSingleFAQ", [faqPublishId]);
                }
            }
        },

        /**
         * Set the unique identifier for your users.
         * This is part of additional user configuration. You can setup the unique identifier
         * that this user will have with this api.
         *
         * @param {string} userIdentifier A unique string to identify your users.
         *
         * @example HelpshiftPlugin.setUserIdentifier ("user-id-100");
         */
        setUserIdentifier: function (userIdentifier) {
            if (userIdentifier && typeof userIdentifier === "string") {
                cordova.exec (null, null, "HelpshiftPlugin", "setUserIdentifier", [userIdentifier]);
            }
        },

        /**
         * Set the name and email of the application user.
         * This is part of additional user configuration. If this is provided through the api,
         * user will not be prompted to re-enter this information again.
         * If you wish to reset these values, please provide null for both params
         *
         * @param {string} name The name of the user.
         * @param {string} email The email of the user.
         *
         * @example HelpshiftPlugin.setNameAndEmail ("John", "john@example.com");
         */
        setNameAndEmail: function (name, email) {
            var lName = null, lEmail = null;
            if (name && typeof name === "string") {
                lName = name;
            }
            if (email && typeof email === "string") {
                lEmail = email;
            }
            cordova.exec (null, null, "HelpshiftPlugin", "setNameAndEmail", [lName, lEmail]);
        },

        /**
         * Add extra debug information regarding user-actions.
         * You can add additional debugging statements to your code, and see exactly what the user
         * was doing right before they reported the issue.
         *
         * @param {string} breadCrumb The string containing any relevant debugging information.
         *
         * @example HelpshiftPlugin.leaveBreadCrumb ("settings button");
         */
        leaveBreadCrumb: function (breadCrumb) {
            if (breadCrumb && typeof breadCrumb === "string") {
                cordova.exec (null, null, "HelpshiftPlugin", "leaveBreadCrumb", [breadCrumb]);
            }
        },

        /**
         * Clears Breadcrumbs list.
         * Breadcrumbs list stores upto 100 latest actions. You'll receive those in every Issue.
         * If for some reason you want to clear previous messages, you can use this method.
         *
         * @example HelshiftPG.clearBreadCrumbs ();
         */

        clearBreadCrumbs: function () {
            cordova.exec (null, null, "HelpshiftPlugin", "clearBreadCrumbs", []);
        },


        /**
         * Show an alert to allow the user's to rate the app or give feedback
         *
         * @param {string} url The app store URL of your app
         *
         * @example HelpshiftPlugin.showAlertToRateAppWithURL ("itms-apps://itunes.apple.com/app/id460171653");
         */
        showAlertToRateAppWithURL: function (url) {
            var notifyCb = this.alertToRateAppCB;
            if (url && typeof url === "string") {
                cordova.exec (function (count) {
                    if (notifyCb) {
                        notifyCb.apply (this, [count]);
                    }
                }, null, "HelpshiftPlugin", "showAlertToRateAppWithURL", [url]);
            }
        },


        /** To pause and restart the display of inapp notification
         *  When this method is called with boolean value true, inapp notifications are paused and not displayed.
         *  To restart displaying inapp notifications pass the boolean value false.
         *
         * @param pauseInApp the boolean value to pause/restart inapp nofitications
         * @example HelpshiftPlugin.pauseDisplayOfInAppNotification (true);
         */
        pauseDisplayOfInAppNotification: function (pauseInApp) {
            if (typeof pauseInApp === "boolean") {
                cordova.exec (null, null, "HelpshiftPlugin", "pauseDisplayOfInAppNotification", [pauseInApp]);
            }
        },


        /**
         * Provide function callback for notification count.
         * You need to pass a callback funtion to receive the notification count when replies posted to the issue.
         *
         * @param {function} callBack The function to receive the notification count
         *
         * @example function notificationCallback(count) {
         *    alert(count);
         *  }
         *  HelpshiftPlugin.registerNotificationCallback(notificationCallback);
         */
        registerNotificationCallback: function (callBack) {
            if (typeof callBack === "function") {
                this.notificationCB = callBack;
            }
        },

        /**
         * Provide function callback for in-app notification count.
         * You need to pass a callback funtion to receive the notification count when replies posted to the issue.
         *
         * @param {function} callBack The function to receive the notification count
         *
         * @example function inAppNotificationCallback(count) {
         *    alert(count);
         *  }
         *  HelpshiftPlugin.registerInAppNotificationCallback(inAppNotificationCallback);
         */
        registerInAppNotificationCallback: function (callBack) {
            if (typeof callBack === "function") {
                this.inAppNotificationCB = callBack;
            }
        },

        /**
         * Provide a function callback for HS Session ended event.
         * You need to pass a callback function to recieve the session-ended event when user comes out of the support section
         *
         * @param {function} callback The function to receive the session-ended event.
         *
         * @example function sessionEndedCallback () {
         *    alert("HS Session ended");
         *  }
         *  HelpshiftPlugin.registerSessionEndedCallback(sessionEndedCallback);
         */

        registerSessionEndedCallback: function (callback) {
            if (typeof callback === "function") {
                this.sessionEndedCB = callback;
            }
        },

        /**
         * Provide a function callback for getting user's response to App rating alert
         * You need to pass a callback function to receive the status of user's response
         *
         * @param {function} callback The function to receive the response
         *
         * @example function alertToRateAppCallback (response) {
         *    if (response === HelpshiftPlugin.HS_RATE_ALERT_SUCCESS) {
         *      alert("App rated");
         *    }
         *  }
         *  HelpshiftPlugin.registerAlertToRateAppCallback(alertToRateAppCallback);
         */

        registerAlertToRateAppCallback: function (callback) {
            if (typeof callback === "function") {
                this.alertToRateAppCB = callback;
            }
        },

        /**
         * Get the notification count for replies to reported issues.
         * If you want to show your user notifications for replies on the issues posted,
         * you can get the notification count asynchronously by providing callback function
         * in registerNotificationCallback
         *
         * @param {boolean} isAsync Whether the notification count is to be returned asynchronously via callback provided in registerNotificationCallback
         *
         * @example function notificationCallback(count) {
         *    alert(count);
         *  }
         *  HelpshiftPlugin.registerNotificationCallback(notificationCallback);
         *  HelpshiftPlugin.getNotificationCountFromRemote(false);
         */
        getNotificationCountFromRemote: function (isAsync) {
            var notifyCb = this.notificationCB;
            cordova.exec (function (count) {
                 if (notifyCb) {
                    notifyCb.apply (this, [count]);
                }
            }, null, "HelpshiftPlugin","getNotificationCountFromRemote", [isAsync === true ? true : false]);
        },

        /**
         * Register the deviceToken to enable push notifications
         * To enable push notifications in the Helpshift iOS SDK, set the Push Notifications deviceToken using this method.
         * Please contact us at support[at]helpshift.com for implementing Apple Push Notification.
         *
         * @param {string} deviceToken The deviceToken received from the push notification servers.
         *
         * @example HelpshiftPlugin.registerDeviceToken("&lt;DEVICE_TOKEN&gt;");
         */
        registerDeviceToken: function (deviceToken) {
            if (deviceToken && typeof deviceToken === "string") {
                cordova.exec (null, null, "HelpshiftPlugin", "registerDeviceToken", [deviceToken]);
            }
        },

        /**
         * Forward the push notification for the HelpshiftSDK to handle
         * To show support on Notification opened, call handleRemoteNotification.
         * If the value of the ?origin? field is ?helpshift? call the handleRemoteNotification api.
         * Please contact us at support[at]helpshift.com for implementing Apple Push Notification.
         *
         * @param {object} notificationInfo The object containing the notification information
         *
         * @example HelpshiftPlugin.handleRemoteNotification(userInfo);
         */
        handleRemoteNotification: function (notificationInfo) {
            if (notificationInfo && typeof notificationInfo === "object") {
                cordova.exec (null, null, "HelpshiftPlugin", "handleRemoteNotification", [notificationInfo]);
            }
        },

        /**
         * Forward the local notification for the HelpshiftSDK to handle
         * To show support on Notification opened, call handleLocalNotification.
         * If the value of the ?origin? field is ?helpshift? call the handleLocalNotification api.
         *
         * @param {string} issueID The issueID received in the notification dictionary
         *
         * @example HelpshiftPlugin.handleLocalNotification(userInfo["issue_id"]);
         */
        handleLocalNotification: function (issueID) {
            if (issueID && typeof issueID === "string") {
                cordova.exec (null, null, "HelpshiftPlugin", "handleLocalNotification", [issueID]);
            }
        },

        _nativeNotificationCall: function (count) {
            if (this.notificationCB) {
                this.notificationCB.apply (null, [count]);
            }
        },

        _nativeInAppNotificationCall: function (count) {
            if (this.inAppNotificationCB) {
                this.inAppNotificationCB.apply (null, [count]);
            }
        },

        _nativeSessionEndedCall: function () {
            if (this.sessionEndedCB) {
                this.sessionEndedCB.apply (null);
            }
        },

        _processMetadata: function (options) {
            if (options && typeof options === "object") {
                if ("hsCustomMetadata" in options && options["hsCustomMetadata"] instanceof Object) {
                    var customMetadata = options["hsCustomMetadata"];
                    if ("hsTags" in customMetadata && customMetadata["hsTags"] instanceof Array) {
                        customMetadata[HelpshiftPlugin.HS_TAGS_KEY] = customMetadata["hsTags"];
                    }
                    delete customMetadata ["hsTags"];
                    options[HelpshiftPlugin.HS_CUSTOM_METADATA_KEY] = customMetadata;
                }
                delete options ["hsCustomMetadata"];
            }
            return options;
        },

        _nativeAppRateResponseCall: function (message) {
            if (this.alertToRateAppCB) {
                this.alertToRateAppCB.apply (null, [message]);
            }
        }

    };

    module.exports = HelpshiftPlugin;

});
