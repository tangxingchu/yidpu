package com.weichu.youdianpu.storage;

import android.content.Context;
import android.content.SharedPreferences;

import com.weichu.youdianpu.R;

public class YdpSharedPreferences {

    private static final String TAG = YdpSharedPreferences.class.getSimpleName();

    private SharedPreferences mSharedPreferences;
    private Context mContext;
    private YdpSharedPreferences mYdpSharedPreferences;

    private YdpSharedPreferences(Context context) {
        mSharedPreferences = context.getSharedPreferences(context.getString(R.string.preference_file_key), Context.MODE_PRIVATE);
        mContext = context;
    }

    public YdpSharedPreferences getInstance(Context context) {
        if(mYdpSharedPreferences == null) {
            mYdpSharedPreferences = new YdpSharedPreferences(context);
        }
        return mYdpSharedPreferences;
    }

    public boolean getBoolean(String key, boolean defaultValue) {
        return mSharedPreferences.getBoolean(key, defaultValue);
    }

    public void setBoolean(String key, boolean value) {
        mSharedPreferences.edit().putBoolean(key, value).apply();
    }

    public String getString(String key) {
        return getString(key, null);
    }

    public String getString(String key, String defaultValue) {
        return mSharedPreferences.getString(key, defaultValue);
    }

    public void setString(String key, String value) {
        mSharedPreferences.edit().putString(key, value).apply();
    }

    public void delete(String key) {
        mSharedPreferences.edit().remove(key).apply();
    }

}
