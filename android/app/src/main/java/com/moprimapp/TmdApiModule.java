package com.moprimapp;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;

import android.widget.Toast;
import android.content.Context;
import android.content.Intent;
import java.lang.Thread;
import android.os.Looper;

import fi.moprim.tmd.sdk.TMD;
import fi.moprim.tmd.sdk.TmdCloudApi;
import fi.moprim.tmd.sdk.TmdUtils;
import fi.moprim.tmd.sdk.model.Result;
import fi.moprim.tmd.sdk.model.TmdActivity;
import fi.moprim.tmd.sdk.model.TmdUploadMetadata;

public class TmdApiModule extends ReactContextBaseJavaModule {
    public static final String CLASS_NAME = "TmdApi";
    private static ReactApplicationContext reactContext;

    public TmdApiModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return CLASS_NAME;
    }

    @ReactMethod
    public void startTmdService() {
        // Starting the TMD as a foreground service
        Toast.makeText(getReactApplicationContext(), "starting service", Toast.LENGTH_SHORT).show();
        this.reactContext.startService(new Intent(this.reactContext, TmdService.class));
    }

    @ReactMethod
    public void stopTmdService() {
        // stops TMD sdk and terminates TmdService component
        TMD.stop(this.reactContext);
        this.reactContext.stopService(new Intent(this.reactContext, TmdService.class));
    }
    

}

// DeviceEventEmitters: List of eventNames 
/* 
*  DownloadResult - use this to get Tmd Acitivity results from moprim cloud
** DownloadResult.NoResultError - returns error message if the result has errror
**               .HasResultError
                 .HasResultMessage
                 .TmdActivity
* TmdStatus - checks whether TMD is running or not
**       . isTmdRunning
 
* Usage Example: 
         
         useEffect(() => {
    DeviceEventEmitter.addListener('DownloadResult', (event) => {
      console.log(
        'TmdData:',
        event.NoResultError,
        event.HasResultError,
        event.HasResultMessage,
      );
    });
  });
*/