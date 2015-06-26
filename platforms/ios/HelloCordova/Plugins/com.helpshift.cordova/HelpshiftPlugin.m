/*
 * HelpshiftPlugin.m
 * Helpshift PhoneGap Plugin
 *
 * Get the documentation at http://www.helpshift.com/docs
 *
*/

#import "HelpshiftPlugin.h"

@implementation HelpshiftPlugin

#pragma mark - Private Methods

- (NSData *)bytesFromHexString:(NSString *)aString;
{
    NSString *theString = [[aString componentsSeparatedByCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]] componentsJoinedByString:nil];
    NSMutableData *data = [NSMutableData data];
    int idx;
    for (idx = 0; idx+2 <= theString.length; idx+=2) {
        NSRange range = NSMakeRange(idx, 2);
        NSString *hexStr = [theString substringWithRange:range];
        NSScanner *scanner = [NSScanner scannerWithString:hexStr];
        unsigned int intValue;
        if ([scanner scanHexInt:&intValue]) {
            [data appendBytes:&intValue length:1];
        }
    }
    return data;
}


#pragma mark - Cordova API

- (void)init:(CDVInvokedUrlCommand *)command
{
    NSString *apiKey = [command.arguments objectAtIndex:0];
    NSString *domainName = [command.arguments objectAtIndex:1];
    NSString *appId = [command.arguments objectAtIndex:2];
    NSMutableDictionary *optionsDict = nil;
    if ([command.arguments count] > 3) {
        optionsDict = [[command argumentAtIndex:3] mutableCopy];
    }
    if (!optionsDict) {
        optionsDict = [[NSMutableDictionary alloc] init];
    }
    [optionsDict setObject:@"phonegap" forKey:@"sdkType"];
    [Helpshift installForApiKey:apiKey domainName:domainName appID:appId withOptions:optionsDict];
    // NSLog(@" Helpshift: %@, %@, %@, %@", apiKey, domainName, appId, optionsDict);
    [[Helpshift sharedInstance] setDelegate:self];
}

- (void)showFAQs:(CDVInvokedUrlCommand *)command
{
    NSDictionary *optionsDict = nil;
    if ([command.arguments count] > 0) {
        optionsDict = [command argumentAtIndex:0];
    }
    if (optionsDict) {
        [[Helpshift sharedInstance] showFAQs:self.viewController withOptions:optionsDict];
    } else {
        [[Helpshift sharedInstance] showFAQs:self.viewController withOptions:nil];
    }
}

- (void)showConversation:(CDVInvokedUrlCommand *)command
{
    NSDictionary *optionsDict = nil;
    if ([command.arguments count] > 0) {
        optionsDict = [command argumentAtIndex:0];
    }
    if (optionsDict) {
        [[Helpshift sharedInstance] showConversation:self.viewController withOptions:optionsDict];
    } else {
        [[Helpshift sharedInstance] showConversation:self.viewController withOptions:nil];
    }
}

- (void)showSingleFAQ:(CDVInvokedUrlCommand *)command
{
    NSDictionary *optionsDict = nil;
    NSString *faqPublishId = [command.arguments objectAtIndex:0];
    if ([command.arguments count] > 1) {
        optionsDict = [command argumentAtIndex:1];
    }
    if (optionsDict) {
        [[Helpshift sharedInstance] showSingleFAQ:faqPublishId withController:self.viewController withOptions:optionsDict];
    } else {
        [[Helpshift sharedInstance] showSingleFAQ:faqPublishId withController:self.viewController withOptions:nil];
    }
}

- (void)showFAQSection:(CDVInvokedUrlCommand *)command
{
    NSString *faqSectionPublishId = [command.arguments objectAtIndex:0];
    NSDictionary *optionsDict = nil;
    if ([command.arguments count] > 1) {
        optionsDict = [command argumentAtIndex:1];
    }
    if (optionsDict) {
        [[Helpshift sharedInstance] showFAQSection:faqSectionPublishId withController:self.viewController withOptions:optionsDict];
    } else {
        [[Helpshift sharedInstance] showFAQSection:faqSectionPublishId withController:self.viewController withOptions:nil];
    }
}

- (void)setUserIdentifier:(CDVInvokedUrlCommand *)command
{
    NSString *userIdentifier = [command.arguments objectAtIndex:0];
    [Helpshift setUserIdentifier:userIdentifier];
}

- (void)setNameAndEmail:(CDVInvokedUrlCommand *)command
{
    NSString *userName = [command.arguments objectAtIndex:0];
    userName = [userName isKindOfClass:[NSNull class]] ? nil : userName;
    NSString *userEmail = [command.arguments objectAtIndex:1];
    userEmail = [userEmail isKindOfClass:[NSNull class]] ? nil : userEmail;
    [Helpshift setName:userName andEmail:userEmail];
}

- (void)leaveBreadCrumb:(CDVInvokedUrlCommand *)command
{
    NSString *breadCrumb = [command.arguments objectAtIndex:0];
    [Helpshift leaveBreadCrumb:breadCrumb];
}

- (void) clearBreadCrumbs:(CDVInvokedUrlCommand *)command
{
    [[Helpshift sharedInstance] clearBreadCrumbs];
}

- (void)getNotificationCountFromRemote:(CDVInvokedUrlCommand *)command
{
    BOOL isAsync = [[command argumentAtIndex:0] boolValue];
    if (isAsync) {
        [[Helpshift sharedInstance] getNotificationCountFromRemote:YES];
    } else {
        NSInteger notifyCount = [[Helpshift sharedInstance] getNotificationCountFromRemote:NO];
        int count = (int)notifyCount;
        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:count];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
}

- (void)registerDeviceToken:(CDVInvokedUrlCommand *)command
{
    NSString *tokenStr = [command argumentAtIndex:0];
    if (tokenStr) {
        NSData *deviceToken = [self bytesFromHexString:tokenStr];
        [[Helpshift sharedInstance] registerDeviceToken:deviceToken];
    }
}

- (void)handleRemoteNotification:(CDVInvokedUrlCommand *)command
{
    NSDictionary *notification = [command argumentAtIndex:0];
    if (notification) {
        [[Helpshift sharedInstance] handleRemoteNotification:notification withController:self.viewController];
    }
}

- (void)handleLocalNotification:(CDVInvokedUrlCommand *)command
{
    NSString *issueID = [command argumentAtIndex:0];
    if (issueID) {
        UILocalNotification *notif = [[UILocalNotification alloc] init];
        notif.userInfo = @{@"issue_id" : issueID};
        [[Helpshift sharedInstance] handleLocalNotification:notif withController:self.viewController];
    }
}


#pragma mark - HelpshiftDelegate

- (void)didReceiveNotificationCount:(NSInteger)count
{
    NSString *jsString = [NSString stringWithFormat:@"HelpshiftPlugin._nativeNotificationCall(\"%d\");", (int)count];
    [self.commandDelegate evalJs:jsString];
}

- (void)didReceiveInAppNotificationWithMessageCount:(NSInteger)count
{
    NSString *jsString = [NSString stringWithFormat:@"HelpshiftPlugin._nativeInAppNotificationCall(\"%d\");", (int)count];
    [self.commandDelegate evalJs:jsString];
}

- (void)helpshiftSessionHasEnded
{
    NSString *jsString = [NSString stringWithFormat:@"HelpshiftPlugin._nativeSessionEndedCall();"];
    [self.commandDelegate evalJs:jsString];
}

- (void)showAlertToRateAppWithURL:(CDVInvokedUrlCommand *)command
{
    NSString *urlString = [command argumentAtIndex:0];
    [Helpshift showAlertToRateAppWithURL:urlString withCompletionBlock:^(HSAlertToRateAppAction action) {
        NSString *rateAppAction = @"";
        switch(action) {
        case HS_RATE_ALERT_CLOSE:
            rateAppAction = @"HS_RATE_ALERT_CLOSE";
            break;
        case HS_RATE_ALERT_FEEDBACK:
            rateAppAction = @"HS_RATE_ALERT_FEEDBACK";
            break;
        case HS_RATE_ALERT_SUCCESS:
            rateAppAction = @"HS_RATE_ALERT_SUCCESS";
            break;
        case HS_RATE_ALERT_FAIL:
            rateAppAction = @"HS_RATE_ALERT_FAIL";
        default:
            break;
        }
        NSString *jsString = [NSString stringWithFormat:@"HelpshiftPlugin._nativeAppRateResponseCall(\"%s\");", [rateAppAction UTF8String]];
        [self.commandDelegate evalJs:jsString];
    }];
}

- (void)pauseDisplayOfInAppNotification:(CDVInvokedUrlCommand *)command
{
    BOOL flag = [[command argumentAtIndex:0] boolValue];
    [Helpshift pauseDisplayOfInAppNotification:flag];
}

@end
