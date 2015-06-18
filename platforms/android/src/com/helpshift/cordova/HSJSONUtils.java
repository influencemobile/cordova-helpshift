package com.helpshift.cordova;

import android.util.Log;
import java.util.Iterator;
import java.util.ArrayList;
import java.util.Map;
import java.util.List;
import java.util.HashMap;

import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

public class HSJSONUtils {

    private static final String TAG = "HelpshiftPlugin";

    public static String[] getJSONObjectKeys(JSONObject inputObject) {
        Iterator keys = inputObject.keys();
        ArrayList<String> objectKeys = new ArrayList<String>();

        while (keys != null && keys.hasNext()) {
            objectKeys.add((String)keys.next());
        }
        String[] returnArray = new String[objectKeys.size()];
        return objectKeys.toArray(returnArray);
    }

    public static HashMap<String, String> toStringHashMap (JSONObject object) {
        HashMap<String, String> map = new HashMap<String, String>();
        Iterator keys = object.keys();
        while (keys.hasNext()) {
            String key = (String) keys.next();
            try {
                if (object.get(key) instanceof String) {
                    map.put(key, object.getString(key));
                }
            } catch (JSONException e) {
                Log.d(TAG, "JSONException ", e);
            }
        }
        return map;
    }

    // Taken from gist here : https://gist.github.com/codebutler/2339666
    public static Map<String, Object> toMap(JSONObject object) throws JSONException {
        Map<String, Object> map = new HashMap();
        Iterator keys = object.keys();
        while (keys.hasNext()) {
            String key = (String) keys.next();
            map.put(key, fromJson(object.get(key)));
        }
        return map;
    }

    public static List toList(JSONArray array) throws JSONException {
        List list = new ArrayList();
        for (int i = 0; i < array.length(); i++) {
            list.add(fromJson(array.get(i)));
        }
        return list;
    }

    private static Object fromJson(Object json) throws JSONException {
        if (json == JSONObject.NULL) {
            return null;
        } else if (json instanceof JSONObject) {
            return toMap((JSONObject) json);
        } else if (json instanceof JSONArray) {
            return toList((JSONArray) json);
        } else {
            return json;
        }
    }
}
