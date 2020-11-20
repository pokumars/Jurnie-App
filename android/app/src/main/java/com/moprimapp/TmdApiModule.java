package com.moprimapp;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.GuardedAsyncTask;

import android.widget.Toast;
import android.content.Context;
import android.content.Intent;
import java.lang.Thread;
import android.os.Looper;
import android.os.Handler;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.List;
import java.lang.Exception;
import com.moprimapp.MainActivity;

import fi.moprim.tmd.sdk.TMD;
import fi.moprim.tmd.sdk.TmdCloudApi;
import fi.moprim.tmd.sdk.TmdUtils;
import fi.moprim.tmd.sdk.model.Result;
import fi.moprim.tmd.sdk.model.TmdActivity;
import fi.moprim.tmd.sdk.model.TmdUploadMetadata;

public class TmdApiModule extends ReactContextBaseJavaModule {
    public static final String CLASS_NAME = "TmdApi";
    private static final SimpleDateFormat SIMPLE_DATE_FORMAT = new SimpleDateFormat("HH:mm", Locale.ENGLISH);
    private static  String activityToString;
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
        this.reactContext.startService(new Intent(this.reactContext, LaunchTMDService.class));
    }

    @ReactMethod
    public void stopTmdService() {
        // stops TMD sdk and terminates TmdService component
        TMD.stop(this.reactContext);
    }
    
    @ReactMethod
    public void fetchTmdData(final Callback successCallback, Callback errorCallback) {
        new GuardedAsyncTask<Void, Void>(getReactApplicationContext()) {
            @Override
            protected void doInBackgroundGuarded(Void ...params) {
                Date date = Calendar.getInstance().getTime();
                // array collection of TmdActivities --> JS Array
                WritableNativeArray activitiesArray = new WritableNativeArray();
                try {
                    // fetch TMD data in a background thread
                    Result<List<TmdActivity>> downloadResult = TmdCloudApi.fetchData(getReactApplicationContext(), date);
                    activityToString = downloadResult.toString();

                    if (!downloadResult.getResult().isEmpty()) {
                        for (TmdActivity tmdActivity : downloadResult.getResult()) {
                            long timeStart = tmdActivity.getTimestampStart();
                            long timeEnd = tmdActivity.getTimestampEnd();
                            long id = tmdActivity.getId();
                            String activity = tmdActivity.getActivity();
                            // map collection of an activity information --> JS object
                            WritableMap activityMap = Arguments.createMap();

                            activityMap.putString("id", String.format(Locale.ENGLISH, "%s",
                                    id));
                            activityMap.putString("timeStart", String.format(Locale.ENGLISH, "%s",
                                    SIMPLE_DATE_FORMAT.format(new Date(timeStart))));
                            activityMap.putString("timeEnd", String.format(Locale.ENGLISH, "%s",
                                    SIMPLE_DATE_FORMAT.format(new Date(timeEnd))));
                            activityMap.putString("duration", String.format(Locale.ENGLISH, "%s",
                                    TmdUtils.getDuration((timeEnd - timeStart) / 1000.)));
                            activityMap.putString("activityType", activity);
                            activityMap.putDouble("co2", tmdActivity.getCo2());
                            activityMap.putDouble("distance", tmdActivity.getDistance());
                            activityMap.putString("destination", tmdActivity.getDestination());
                            activityMap.putDouble("speed", tmdActivity.getSpeed());
                            activityMap.putString("origin", tmdActivity.getOrigin());
                            activityMap.putString("polyline", tmdActivity.getPolyline());
                            activityMap.putString("metadata", tmdActivity.getMetadata());

                            activitiesArray.pushMap(activityMap);
                        }
                    }

                    if (downloadResult.hasError()) {
                        errorCallback.invoke(String.format(Locale.ENGLISH, "%s:  %s", downloadResult.getError().name(), "no data"));
                    }

                } catch(Exception e) {
                    errorCallback.invoke( e.getMessage());
                }

                successCallback.invoke(activitiesArray, activityToString);
            }
        }.execute();
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
 
* Usage Example: fetchTmdDAta()
     useEffect(() => {
    try {
      TmdApi.fetchTmdData(
        (activities, str) => {
          console.log('Tmd success', activities);
          setActivity(str);
        },
        (err) => {
          console.log('Tmd error', err);
        },
      );
    } catch (e) {
      console.log('error', e.message);
    }
  }, []);
*/