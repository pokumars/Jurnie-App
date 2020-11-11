package com.moprimapp;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.Manifest;
import android.app.DatePickerDialog;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;
import androidx.loader.content.AsyncTaskLoader;

import fi.moprim.tmd.sdk.TMD;
import fi.moprim.tmd.sdk.TmdCloudApi;
import fi.moprim.tmd.sdk.TmdUtils;
import fi.moprim.tmd.sdk.model.Result;
import fi.moprim.tmd.sdk.model.TmdActivity;
import fi.moprim.tmd.sdk.model.TmdUploadMetadata;

public class TmdApiModule extends ReactContextBaseJavaModule {
    public static final String CLASS_NAME = "TmdApi";
    private static ReactApplicationContext reactContext;

    public TmdApiModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Nonnull
    @Override
    public String getName() {
        return CLASS_NAME;
    }

    @ReactMethod
    public void startTmdService() {
        // Starting the TMD as a foreground service
        this.reactContext.startService(new Intent(this.reactContext, TmdService.class));
    }

    @ReactMethod
    public void stopTmdService() {
        // stops TMD sdk and terminates TmdService component
        TMD.stop;
        this.reactContext.stopService(new Intent(this.reactContext, TmdService.class));
    }

}