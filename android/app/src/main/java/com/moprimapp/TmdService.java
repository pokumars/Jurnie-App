package com.moprimapp;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.WritableNativeArray;

import android.os.IBinder;
import android.os.Handler;
import androidx.annotation.Nullable;
import android.app.Service;
import android.app.DatePickerDialog;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.util.Log;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.lang.Thread;
import android.os.Looper;
import java.lang.Exception;
import java.util.Arrays;

import fi.moprim.tmd.sdk.TMD;
import fi.moprim.tmd.sdk.TmdCloudApi;
import fi.moprim.tmd.sdk.TmdUtils;
import fi.moprim.tmd.sdk.model.Result;
import fi.moprim.tmd.sdk.model.TmdActivity;
import fi.moprim.tmd.sdk.model.TmdUploadMetadata;


public class TmdService extends Service {
    private static final String NOTIFICATION_CHANNEL_ID = "com.moprimapp.channel";
    private static final int NOTIFICATION_ID = 0101;
    private static final SimpleDateFormat SIMPLE_DATE_FORMAT = new SimpleDateFormat("HH:mm", Locale.ENGLISH);

    private Calendar myCalendar;
    private WritableMap params;
    private Handler handler = new Handler(Looper.getMainLooper());
    private Runnable runnableCode = new Runnable() {
            @Override
            public void run() {
                Boolean tmdIsRunning = TMD.isTmdRunning();
                params = Arguments.createMap();
                params.putBoolean("isTmdRunning", tmdIsRunning);
                ReactContext reactContext = ((MainApplication)getApplication()).getReactNativeHost().getReactInstanceManager().getCurrentReactContext();
                dispatchEvent(reactContext, "TmdStatus", params);
//                ((MainApplication)getApplication()).getReactNativeHost().getReactInstanceManager().getCurrentReactContext()
//                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("isTmdRunning", tmdIsRunning);

                handler.postDelayed(this, 2000);
            }
    };

    private class FetchData implements Runnable {
        @Override
        public  void run() {
            try {
                Looper.prepare();
                Date date = Calendar.getInstance().getTime();
                // fetching data for a specific date
                Result<List<TmdActivity>> downloadResult = TmdCloudApi.fetchData(getApplicationContext(), date);
                handler.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        params = Arguments.createMap();
                        ReactContext reactContext = ((MainApplication)getApplication()).getReactNativeHost().getReactInstanceManager().getCurrentReactContext();

                        if (!downloadResult.hasResult()) {
                            params.putString("NoResultError", "TMD could not retrieve any results: (" + downloadResult.getError().name() + ", " + downloadResult.getMessage() + ")");
                            dispatchEvent(reactContext, "DownloadResult", params);

                        }
                        if (downloadResult.hasError()) {
                            params.putString("HasResultError", downloadResult.getError().name());
                            dispatchEvent(reactContext, "DownloadResult", params);
                        }
                        if (downloadResult.hasMessage()) {
                            params.putString("HasResultMessage", downloadResult.getMessage());
                            dispatchEvent(reactContext, "DownloadResult", params);
                        }

                        if (!downloadResult.getResult().isEmpty()) {
                            WritableNativeArray array = new WritableNativeArray();
                            WritableMap activityMap = Arguments.createMap();
                            for (TmdActivity tmdActivity : downloadResult.getResult()) {
                                long timeStart = tmdActivity.getTimestampStart();
                                long timeEnd = tmdActivity.getTimestampEnd();
                                String activity = tmdActivity.getActivity();

                                activityMap.putString("timeStart", String.format(Locale.ENGLISH, "%s",
                                        SIMPLE_DATE_FORMAT.format(new Date(timeStart))));
                                activityMap.putString("timeEnd", String.format(Locale.ENGLISH, "%s",
                                        SIMPLE_DATE_FORMAT.format(new Date(timeEnd))));
                                activityMap.putString("duration", String.format(Locale.ENGLISH, "%s",
                                        SIMPLE_DATE_FORMAT.format(TmdUtils.getDuration((timeEnd - timeStart) / 1000.))));
                                activityMap.putString("Activity type", activity);
                                activityMap.putDouble("Co2", tmdActivity.getCo2());
                                activityMap.putDouble("distance_m", tmdActivity.getDistance());
                                activityMap.putString("destination", tmdActivity.getDestination());
                                activityMap.putDouble("speed_km/h", tmdActivity.getSpeed());
                                array.pushMap(activityMap);

                            }
                            params.putArray("TmdActivity", array );
                            dispatchEvent(reactContext, "DownloadResult", params);
                        }
                    }
                },3000);
                Looper.loop();
            } catch (Exception e) {

            }
        }
    };

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        myCalendar = Calendar.getInstance();
        // Turning into a foreground service
        createNotificationChannel(); // Creating channel for API 26+
        Notification notification = buildNotification(getString(R.string.service_is_running));
        Context context = getApplicationContext();
        TMD.startForeground(context, NOTIFICATION_ID, notification);

        this.handler.post(runnableCode);
        new Thread(new FetchData()).start();

        return START_STICKY;
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    private Notification buildNotification(String notificationText) {
        // Create notification builder.
        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this, NOTIFICATION_CHANNEL_ID);

        notificationBuilder.setWhen(System.currentTimeMillis());
        notificationBuilder.setSmallIcon(R.mipmap.ic_launcher);
        notificationBuilder.setContentTitle("Jurnie M");
        notificationBuilder.setContentText(notificationText);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            notificationBuilder.setPriority(NotificationManager.IMPORTANCE_HIGH);
        }

        // Make the notification open the MainActivity
        PendingIntent contentIntent = PendingIntent.getActivity(this, 0,
                new Intent(this, MainActivity.class), PendingIntent.FLAG_UPDATE_CURRENT);
        notificationBuilder.setContentIntent(contentIntent);

        // Build the notification.
        return notificationBuilder.build();
    }

    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = getString(R.string.channel_name);
            String description = getString(R.string.channel_description);
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(NOTIFICATION_CHANNEL_ID, name, importance);
            channel.setSound(null, null);
            channel.setVibrationPattern(null);
            channel.setDescription(description);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            if (notificationManager != null) {
                notificationManager.deleteNotificationChannel(NOTIFICATION_CHANNEL_ID);
                notificationManager.createNotificationChannel(channel);
            }
        }
    }

    private void dispatchEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}