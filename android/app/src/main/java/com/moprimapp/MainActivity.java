package com.moprimapp;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
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

public class MainActivity extends ReactActivity {
  private static final String NOTIFICATION_CHANNEL_ID = "com.moprimapp.channel";
  private static final int NOTIFICATION_ID = 0101;
  private static final SimpleDateFormat SIMPLE_DATE_FORMAT = new SimpleDateFormat("HH:mm", Locale.ENGLISH);

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    createNotificationChannel(); // Creating channel for API 26+
    Notification notification = buildNotification(getString(R.string.service_is_running));
    Context context = getApplicationContext();
    TMD.startForeground(context, NOTIFICATION_ID, notification);

    super.onCreate(savedInstanceState);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "moprimApp";
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
}
