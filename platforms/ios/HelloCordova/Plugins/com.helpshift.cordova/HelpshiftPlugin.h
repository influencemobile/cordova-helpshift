/*
 * HelpshiftPlugin.h
 * Helpshift PhoneGap Plugin
 *
 * Get the documentation at http://www.helpshift.com/docs
 *
*/

#import <Cordova/CDV.h>
#import "Helpshift.h"

@interface HelpshiftPlugin : CDVPlugin <HelpshiftDelegate>

- (void) init:(CDVInvokedUrlCommand *)command;
- (void) showFAQs:(CDVInvokedUrlCommand *)command;
- (void) showConversation:(CDVInvokedUrlCommand *)command;
- (void) showFAQSection:(CDVInvokedUrlCommand *)command;
- (void) showSingleFAQ:(CDVInvokedUrlCommand *)command;
- (void) setUserIdentifier:(CDVInvokedUrlCommand *)command;
- (void) setNameAndEmail:(CDVInvokedUrlCommand *)command;
- (void) leaveBreadCrumb:(CDVInvokedUrlCommand *)command;
- (void) clearBreadCrumbs:(CDVInvokedUrlCommand *)command;
- (void) getNotificationCountFromRemote:(CDVInvokedUrlCommand *)command;
- (void) registerDeviceToken:(CDVInvokedUrlCommand *)command;
- (void) handleRemoteNotification:(CDVInvokedUrlCommand *)command;
- (void) handleLocalNotification:(CDVInvokedUrlCommand *)command;
- (void) pauseDisplayOfInAppNotification:(CDVInvokedUrlCommand *)command;
- (void) showAlertToRateAppWithURL:(CDVInvokedUrlCommand *)command;

@end
