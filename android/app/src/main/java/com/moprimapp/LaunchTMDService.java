package com.moprimapp;

import android.os.IBinder;
import android.os.Handler;
import android.widget.Toast;
import androidx.annotation.Nullable;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import com.moprimapp.MainActivity;

public class LaunchTMDService extends Service {
    private Handler handler = new Handler();

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Intent broadcastIntent = new Intent();
        broadcastIntent.putExtra("Start TMD", "true");
        broadcastIntent.setAction(MainActivity.ACTION_START_TMD_FOREGROUND_SERVICE);
        sendBroadcast(intent);
        Toast.makeText(getApplicationContext(), "TMD is running", Toast.LENGTH_SHORT).show();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                stopSelf();
            }
        }, 20000);

        return START_NOT_STICKY;
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}