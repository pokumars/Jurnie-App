package com.moprimapp;

import androidx.multidex.MultiDexApplication;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import android.app.PendingIntent;
import android.util.Log;
import android.app.IntentService;
import android.content.Intent;

import fi.moprim.tmd.sdk.TMD;
import fi.moprim.tmd.sdk.TmdCloudApi;
import fi.moprim.tmd.sdk.TmdUtils;
import fi.moprim.tmd.sdk.model.Result;
import fi.moprim.tmd.sdk.model.TmdActivity;
import fi.moprim.tmd.sdk.model.TmdUploadMetadata;
import fi.moprim.tmd.sdk.TmdCoreConfigurationBuilder;
import fi.moprim.tmd.sdk.model.TmdError;
import fi.moprim.tmd.sdk.model.TmdInitListener;


public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
            packages.add(new TmdApiPackage());

          return packages;
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
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());

    TmdCoreConfigurationBuilder builder = new TmdCoreConfigurationBuilder(this)
              .setSdkConfigEndPoint(getString(R.string.tmd_sdk_config_endpoint))
              .setSdkConfigKey(getString(R.string.tmd_sdk_config_key));
      // TMD sdk initialization
      TMD.init(this, builder.build(), new TmdInitListener() {
          @Override
          public void onTmdInitFailed(TmdError tmdError) {
              Log.e(MainApplication.class.getSimpleName(), "Initialisation failed: " + tmdError.name());
          }

          @Override
          public void onTmdInitSuccessful(String s) {
              // s is the current installation ID, we'll put the UUID as the same just to demonstrate how to use the method
              // replace with your own user id in production
              // TMD.setUUID(s);
              Log.i(MainApplication.class.getSimpleName(), "Initialization successful with id: " + s);
              Intent intent = new Intent(MainApplication.this, TmdUploadIntentService.class);
              PendingIntent callbackIntent = PendingIntent.getService(MainApplication.this, 0, intent,
                      PendingIntent.FLAG_UPDATE_CURRENT);
              TmdCloudApi.setUploadCallbackIntent(callbackIntent);
          }
      });
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.moprimapp.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
