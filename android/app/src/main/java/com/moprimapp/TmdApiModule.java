package com.moprimapp;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.GuardedAsyncTask;

import android.content.BroadcastReceiver;
import android.content.IntentFilter;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;
import android.app.PendingIntent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.util.Log;
import android.widget.Toast;
import android.content.Context;
import android.content.Intent;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.List;
import java.lang.Exception;

import fi.moprim.tmd.sdk.TMD;
import fi.moprim.tmd.sdk.TmdCloudApi;
import fi.moprim.tmd.sdk.TmdUtils;
import fi.moprim.tmd.sdk.model.Result;
import fi.moprim.tmd.sdk.model.TmdActivity;
import fi.moprim.tmd.sdk.model.TmdUploadMetadata;

public class TmdApiModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    public static final String CLASS_NAME = "TmdApi";
    private static final SimpleDateFormat SIMPLE_DATE_FORMAT = new SimpleDateFormat("HH:mm", Locale.ENGLISH);
    private static final String NOTIFICATION_CHANNEL_ID = "com.moprimapp.channel";
    private static final int NOTIFICATION_ID = 0101;
    private static final int TMD_PERMISSIONS_REQUEST_LOCATION = 0202;
    private static final int TMD_PERMISSION_REQUEST_ACTIVITY = 0303;
    public static final String ACTION_START_TMD_FOREGROUND_SERVICE
            = "com.moprimapp.ACTION_START_TMD_FOREGROUND_SERVICE";

    private static  String activityToString;
    private Notification notification;

    private static ReactApplicationContext reactContext;

    // process intent to restart TMD service
    private BroadcastReceiver startTmdReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            TMD.startForeground(reactContext, NOTIFICATION_ID, notification);
            Toast.makeText(reactContext, reactContext.getString(R.string.service_is_running),
                    Toast.LENGTH_SHORT).show();
        }
    };

    public TmdApiModule(ReactApplicationContext reactContext) {
        super(reactContext);
        // access activity lifecycle events
        reactContext.addLifecycleEventListener(this);
        this.reactContext = reactContext;
        createNotificationChannel();
        notification = buildNotification(reactContext.getString(R.string.service_is_running));
        TMD.startForeground(reactContext, NOTIFICATION_ID, notification);

        registerTmdReceiver();
    }

    @Override
    public String getName() {
        return CLASS_NAME;
    }

    @ReactMethod
    public void startTmdService() {
        //sends the broadcast intent to restart TMD
        if(!TMD.isTmdRunning()) {
            Intent intent = new Intent();
            intent.setAction(ACTION_START_TMD_FOREGROUND_SERVICE);
            reactContext.sendBroadcast(intent);
        }
    }

    @ReactMethod
    public void stopTmdService() {
        // stops TMD sdk and terminates TmdService component
        TMD.stop(this.reactContext);
    }

    @ReactMethod
    private void isTmdRunning(Callback callback) {
        Boolean tmdIsRunning = TMD.isTmdRunning();
        callback.invoke(tmdIsRunning);
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

    private void registerTmdReceiver() {
        IntentFilter filter = new IntentFilter();
        filter.addAction(ACTION_START_TMD_FOREGROUND_SERVICE);
        reactContext.registerReceiver(startTmdReceiver, filter);
    }

    public void createNotificationChannel() {
        // Create the NotificationChannel, for API 26+
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = reactContext.getString(R.string.channel_name);
            String description = reactContext.getString(R.string.channel_description);
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(NOTIFICATION_CHANNEL_ID, name, importance);
            channel.setSound(null, null);
            channel.setVibrationPattern(null);
            channel.setDescription(description);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            NotificationManager notificationManager = reactContext.getSystemService(NotificationManager.class);
            if (notificationManager != null) {
                notificationManager.deleteNotificationChannel(NOTIFICATION_CHANNEL_ID);
                notificationManager.createNotificationChannel(channel);
            }
        }
    }

    public Notification buildNotification(String notificationText) {
        // Create notification builder.
        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(reactContext, NOTIFICATION_CHANNEL_ID);

        notificationBuilder.setWhen(System.currentTimeMillis());
        notificationBuilder.setSmallIcon(R.mipmap.ic_launcher);
        notificationBuilder.setContentTitle("Jurnie M");
        notificationBuilder.setContentText(notificationText);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            notificationBuilder.setPriority(NotificationManager.IMPORTANCE_HIGH);
        }

        // Make the notification open the MainActivity
        PendingIntent contentIntent = PendingIntent.getActivity(reactContext, 0,
                new Intent(reactContext, MainActivity.class), PendingIntent.FLAG_UPDATE_CURRENT);
        notificationBuilder.setContentIntent(contentIntent);

        // Build the notification.
        return notificationBuilder.build();
    }

    @Override
    public void onHostResume() {

    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {

    }

}

 /*
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
  }, []);*/
