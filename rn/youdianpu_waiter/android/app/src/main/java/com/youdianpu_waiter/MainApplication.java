package com.youdianpu_waiter;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.microsoft.codepush.react.CodePush;
import com.oblador.vectoricons.VectorIconsPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.youdianpu_waiter.rnmodule.YidpuPackage;

import org.xutils.x;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new CodePush("TY9N69pDp1fgJD2gif2zc1NQO4hS7af62b32-1bc3-4054-97e0-1f0e7eae229b", getApplicationContext(), BuildConfig.DEBUG),
            new VectorIconsPackage(),
            new RCTCameraPackage(),
             new YidpuPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    x.Ext.init(this);
    x.Ext.setDebug(BuildConfig.DEBUG);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
