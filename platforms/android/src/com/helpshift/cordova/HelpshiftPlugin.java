package com.helpshift.cordova;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;

import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.os.Message;
import android.os.Bundle;
import android.util.Log;
import java.util.Map;
import java.util.List;
import java.util.HashMap;
import java.util.Iterator;

import com.helpshift.*;
import com.helpshift.HSAlertToRateAppListener;

public class HelpshiftPlugin extends CordovaPlugin {

    private static final String TAG = "HelpshiftPlugin";
    // Helpshift methods
    private static final String INSTALL = "init";

    private static final String SHOW_CONVERSATION = "showConversation";
    private static final String SHOW_FAQS = "showFAQs";
    private static final String SHOW_SINGLE_FAQ = "showSingleFAQ";
    private static final String SHOW_FAQ_SECTION = "showFAQSection";
    private static final String SHOW_ALERT_TO_RATE_APP = "showAlertToRateAppWithURL";

    private static final String SET_USER_IDENTIFIER = "setUserIdentifier";
    private static final String SET_NAME_AND_EMAIL = "setNameAndEmail";
    private static final String LEAVE_BREAD_CRUMB = "leaveBreadCrumb";
    private static final String CLEAR_BREAD_CRUMBS = "clearBreadCrumbs";

    private static final String GET_NOTIFICATION_COUNT = "getNotificationCountFromRemote";
    private static final String REGISTER_DEVICE_TOKEN = "registerDeviceToken";
    private static final String HANDLE_PUSH = "handlePush";

    private CallbackContext notificationCallback;

    @Override
    public boolean execute (String function, JSONArray arguments, final CallbackContext callbackContext) {

        try {
            if (INSTALL.equals(function)) {

                String apiKey = arguments.getString(0);
                String domainName = arguments.getString(1);
                String appID = arguments.getString(2);

                HashMap<String,Object> map = new HashMap<String,Object>();
                map.put("sdkType", "phonegap");
                if (arguments.length() >= 4) {
                    JSONObject object = arguments.getJSONObject(3);
                    Iterator iter = object.keys();
                    while (iter.hasNext()) {
                        String key = (String)iter.next();
                        Boolean value = object.getString(key).equals("yes") ? true : false;
                        map.put(key,value);
                    }
                }
                Log.d(TAG, "Helpshift.install for "+ domainName);
                Helpshift.install(cordova.getActivity().getApplication(), apiKey, domainName, appID, map);
                callbackContext.sendPluginResult( new PluginResult(PluginResult.Status.OK, ""));
                return true;
            }
            else if (SHOW_CONVERSATION.equals(function)) {
                HashMap map = new HashMap();
                if (arguments.length() >= 1) {
                    JSONObject object = arguments.getJSONObject(0);
                    Iterator iter = object.keys();
                    while (iter.hasNext()) {
                        String key = (String)iter.next();
                        if (key.equals("hs-custom-metadata")) {
                            JSONObject metaData = object.getJSONObject(key);
                            HashMap metaMap = (HashMap) HSJSONUtils.toMap(metaData);
                            if (metaData.has("hs-tags")) {
                                List tags = HSJSONUtils.toList(metaData.getJSONArray("hs-tags"));
                                String[] tagsArray = new String[tags.size()];
                                metaMap.put("hs-tags", (String[])tags.toArray(tagsArray));
                            }
                            map.put(key, metaMap);
                        } else {
                            String value = object.getString(key);
                            if (key.equals("enableContactUs")) {
                                if (value.equals("yes") || value.equals("HS_ENABLE_CONTACT_US_ALWAYS")) {
                                    map.put("enableContactUs", Helpshift.ENABLE_CONTACT_US.ALWAYS);
                                } else if (value.equals("no") || value.equals("HS_ENABLE_CONTACT_US_NEVER")){
                                    map.put("enableContactUs", Helpshift.ENABLE_CONTACT_US.NEVER);
                                } else if (value.equals("HS_ENABLE_CONTACT_US_AFTER_VIEWING_FAQS")) {
                                    map.put("enableContactUs", Helpshift.ENABLE_CONTACT_US.AFTER_VIEWING_FAQS);
                                }
                            } else {
                                Boolean flag = value.equals("yes") ? true : false;
                                map.put(key,flag);
                            }
                        }
                    }
                }

                Helpshift.showConversation(cordova.getActivity(), map);
                callbackContext.sendPluginResult( new PluginResult(PluginResult.Status.OK, ""));
                return true;
            }
            else if (SHOW_FAQ_SECTION.equals(function)) {
                HashMap map = new HashMap();
                if (arguments.length() >= 2) {
                    JSONObject object = arguments.getJSONObject(0);
                    Iterator iter = object.keys();
                    while (iter.hasNext()) {
                        String key = (String)iter.next();
                        if (key.equals("hs-custom-metadata")) {
                            JSONObject metaData = object.getJSONObject(key);
                            HashMap metaMap = (HashMap) HSJSONUtils.toMap(metaData);
                            if (metaData.has("hs-tags")) {
                                List tags = HSJSONUtils.toList(metaData.getJSONArray("hs-tags"));
                                String[] tagsArray = new String[tags.size()];
                                metaMap.put("hs-tags", (String[])tags.toArray(tagsArray));
                            }
                            map.put(key, metaMap);
                        } else {
                            String value = object.getString(key);
                            if (key.equals("enableContactUs")) {
                                if (value.equals("yes") || value.equals("HS_ENABLE_CONTACT_US_ALWAYS")) {
                                    map.put("enableContactUs", Helpshift.ENABLE_CONTACT_US.ALWAYS);
                                } else if (value.equals("no") || value.equals("HS_ENABLE_CONTACT_US_NEVER")){
                                    map.put("enableContactUs", Helpshift.ENABLE_CONTACT_US.NEVER);
                                } else if (value.equals("HS_ENABLE_CONTACT_US_AFTER_VIEWING_FAQS")) {
                                    map.put("enableContactUs", Helpshift.ENABLE_CONTACT_US.AFTER_VIEWING_FAQS);
                                }
                            } else {
                                Boolean flag = value.equals("yes") ? true : false;
                                map.put(key, flag);
                            }
                        }
                    }
                }
                Helpshift.showFAQSection(cordova.getActivity(), arguments.getString(0), map);
                callbackContext.sendPluginResult( new PluginResult(PluginResult.Status.OK, ""));
                return true;
            }
            else if (SHOW_SINGLE_FAQ.equals(function)) {
                HashMap map = new HashMap();
                if (arguments.length() >= 2) {
                    JSONObject object = arguments.getJSONObject(0);
                    Iterator iter = object.keys();
                    while (iter.hasNext()) {
                        String key = (String)iter.next();
                        if (key.equals("hs-custom-metadata")) {
                            JSONObject metaData = object.getJSONObject(key);
                            HashMap metaMap = (HashMap) HSJSONUtils.toMap(metaData);
                            if (metaData.has("hs-tags")) {
                                List tags = HSJSONUtils.toList(metaData.getJSONArray("hs-tags"));
                                String[] tagsArray = new String[tags.size()];
                                metaMap.put("hs-tags", (String[])tags.toArray(tagsArray));
                            }
                            map.put(key, metaMap);
                        } else {
                            String value = object.getString(key);
                            if (key.equals("enableContactUs")) {
                                if (value.equals("yes") || value.equals("HS_ENABLE_CONTACT_US_ALWAYS")) {
                                    map.put("enableContactUs", Helpshift.ENABLE_CONTACT_US.ALWAYS);
                                } else if (value.equals("no") || value.equals("HS_ENABLE_CONTACT_US_NEVER")){
                                    map.put("enableContactUs", Helpshift.ENABLE_CONTACT_US.NEVER);
                                } else if (value.equals("HS_ENABLE_CONTACT_US_AFTER_VIEWING_FAQS")) {
                                    map.put("enableContactUs", Helpshift.ENABLE_CONTACT_US.AFTER_VIEWING_FAQS);
                                }
                            } else {
                                Boolean flag = value.equals("yes") ? true : false;
                                map.put(key,flag);
                            }
                        }
                    }
                }

                Helpshift.showSingleFAQ(cordova.getActivity(), arguments.getString(0), map);
                callbackContext.sendPluginResult( new PluginResult(PluginResult.Status.OK, ""));
                return true;
            }
            else if (SHOW_FAQS.equals(function)) {
                HashMap map = new HashMap();
                if (arguments.length() >= 1) {
                    JSONObject object = arguments.getJSONObject(0);
                    Iterator iter = object.keys();
                    while (iter.hasNext()) {
                        String key = (String)iter.next();
                        if (key.equals("hs-custom-metadata")) {
                            JSONObject metaData = object.getJSONObject(key);
                            HashMap metaMap = (HashMap) HSJSONUtils.toMap(metaData);
                            if (metaData.has("hs-tags")) {
                                List tags = HSJSONUtils.toList(metaData.getJSONArray("hs-tags"));
                                String[] tagsArray = new String[tags.size()];
                                metaMap.put("hs-tags", (String[])tags.toArray(tagsArray));
                            }
                            map.put(key, metaMap);
                        } else {
                            String value = object.getString(key);
                            if (key.equals("enableContactUs")) {
                                if (value.equals("yes") || value.equals("HS_ENABLE_CONTACT_US_ALWAYS")) {
                                    map.put("enableContactUs", Helpshift.ENABLE_CONTACT_US.ALWAYS);
                                } else if (value.equals("no") || value.equals("HS_ENABLE_CONTACT_US_NEVER")){
                                    map.put("enableContactUs", Helpshift.ENABLE_CONTACT_US.NEVER);
                                } else if (value.equals("HS_ENABLE_CONTACT_US_AFTER_VIEWING_FAQS")) {
                                    map.put("enableContactUs", Helpshift.ENABLE_CONTACT_US.AFTER_VIEWING_FAQS);
                                }
                            } else {
                                Boolean flag = value.equals("yes") ? true : false;
                                map.put(key,flag);
                            }
                        }
                    }
                }
                Helpshift.showFAQs(cordova.getActivity(), map);
                callbackContext.sendPluginResult( new PluginResult(PluginResult.Status.OK, ""));
                return true;
            }
            else if (SET_NAME_AND_EMAIL.equals(function)) {
                String name = null;
                String email = null;

                if (arguments.length() >= 1) {
                    name = arguments.getString(0);
                }
                if (arguments.length() >= 1) {
                    email = arguments.getString(1);
                }
                Helpshift.setNameAndEmail(name, email);
                callbackContext.sendPluginResult( new PluginResult(PluginResult.Status.OK, ""));
                return true;
            }
            else if (SET_USER_IDENTIFIER.equals(function)) {
                Helpshift.setUserIdentifier(arguments.getString(0));
                callbackContext.sendPluginResult( new PluginResult(PluginResult.Status.OK, ""));
                return true;
            }
            else if (REGISTER_DEVICE_TOKEN.equals(function)) {
                Helpshift.registerDeviceToken(cordova.getActivity(), arguments.getString(0));
                callbackContext.sendPluginResult( new PluginResult(PluginResult.Status.OK, ""));
                return true;
            }
            else if (LEAVE_BREAD_CRUMB.equals(function)) {
                Helpshift.leaveBreadCrumb(arguments.getString(0));
                callbackContext.sendPluginResult( new PluginResult(PluginResult.Status.OK, ""));
                return true;
            }
            else if (CLEAR_BREAD_CRUMBS.equals(function)) {
                Helpshift.clearBreadCrumbs();
                callbackContext.sendPluginResult( new PluginResult(PluginResult.Status.OK, ""));
                return true;
            }
            else if (GET_NOTIFICATION_COUNT.equals(function)) {
                boolean isAsync = arguments.getBoolean(0);
                if (isAsync == false) {
                    Integer count = Helpshift.getNotificationCount();
                    callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, count));
                    return true;
                } else {
                    PluginResult result = new PluginResult(PluginResult.Status.NO_RESULT, "");
                    result.setKeepCallback(true);
                    this.notificationCallback = callbackContext;

                    Helpshift.getNotificationCount(new Handler() {
                            public void handleMessage(Message msg) {
                                super.handleMessage(msg);
                                Bundle countData = (Bundle) msg.obj;
                                Integer count = countData.getInt("value");
                                callbackContext.success(count);
                            }
                        }, new Handler() {});
                    return true;
                }
            }
            else if (HANDLE_PUSH.equals(function)) {
                Intent i = new Intent();
                i.putExtra("issue_id", arguments.getString(0));
                Helpshift.handlePush(cordova.getActivity(), i);
            }
            else if (SHOW_ALERT_TO_RATE_APP.equals(function)) {
                PluginResult result = new PluginResult(PluginResult.Status.NO_RESULT, "");
                result.setKeepCallback(true);
                this.notificationCallback = callbackContext;
                HSAlertToRateAppListener actionListener =  new HSAlertToRateAppListener() {
                        public void onAction(Helpshift.HS_RATE_ALERT action) {
                            String msg = "";
                            switch (action) {
                            case CLOSE:
                                msg = "HS_RATE_ALERT_CLOSE";
                                break;
                            case FEEDBACK:
                                msg = "HS_RATE_ALERT_FEEDBACK";
                                break;
                            case SUCCESS:
                                msg = "HS_RATE_ALERT_SUCCESS";
                                break;
                            case FAIL:
                                msg = "HS_RATE_ALERT_FAIL";
                                break;
                            }
                            notificationCallback.success(msg);
                        }
                    };
                Helpshift.showAlertToRateApp(arguments.getString(0), actionListener);
                return true;
            } else {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.INVALID_ACTION));
                return false;
            }
        } catch (JSONException e) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.JSON_EXCEPTION));
            return false;
        }
        return false;
    }
}
