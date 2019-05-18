package com.youdianpu_waiter.rnmodule;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.youdianpu_waiter.services.DownLoadApkService;

public class YidpuModule extends ReactContextBaseJavaModule {

    private Context mContext;

    public YidpuModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNYidpuModule";
    }

    public int getVersionCode() {
        if (mContext != null) {
            try {
                return mContext.getPackageManager().getPackageInfo(mContext.getPackageName(), 0).versionCode;
            } catch (PackageManager.NameNotFoundException ignored) {
            }
        }
        return 0;
    }

    public String getVersionName() {
        if (mContext != null) {
            try {
                return mContext.getPackageManager().getPackageInfo(mContext.getPackageName(), 0).versionName;
            } catch (PackageManager.NameNotFoundException ignored) {
            }
        }
        return "";
    }

    @ReactMethod
    public void downLoadAPK(String url, Promise promise) {
        try {
            Uri uri = Uri.parse(url);
            String fileName = uri.getPath().substring(uri.getPath().lastIndexOf("/"));
            Intent intent = new Intent(getReactApplicationContext(), DownLoadApkService.class);
            intent.putExtra("url", url);
            intent.putExtra("fileName", fileName);
            getReactApplicationContext().startService(intent);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void getVersionInfo(Promise promise) {
        WritableMap params = Arguments.createMap();
        params.putInt("versionCode", getVersionCode());
        params.putString("versionName", getVersionName());
        promise.resolve(params);
    }

}
