package com.moprimapp;

import com.facebook.react.ReactActivity;

import androidx.annotation.Nullable;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import androidx.appcompat.app.AppCompatActivity;
import android.Manifest;
import android.os.Build;
import android.os.Bundle;
import androidx.appcompat.app.AlertDialog;
import androidx.core.app.ActivityCompat;

public class MainActivity extends ReactActivity {
  private static final int TMD_PERMISSIONS_REQUEST_LOCATION = 0202;
  private static final int TMD_PERMISSION_REQUEST_ACTIVITY = 0303;


  @Override
  protected void onCreate(Bundle savedInstanceState) {
    requestLocationPermission();
    requestPhysicalActivityPermission();

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

  public void requestPhysicalActivityPermission() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
      if (ActivityCompat.shouldShowRequestPermissionRationale(this, Manifest.permission.ACTIVITY_RECOGNITION)) {
        // Show an explanation to the user *asynchronously* -- don't block
        // this thread waiting for the user's response! After the user
        // sees the explanation, try again to request the permission.
        new AlertDialog.Builder(this)
                .setTitle(R.string.title_physical_activity_needed)
                .setMessage(R.string.physical_activity_permission_required)
                .setPositiveButton(R.string.ok, (dialogInterface, i) -> {
                  //Prompt the user once explanation has been shown
                  ActivityCompat.requestPermissions(this,
                          new String[]{ Manifest.permission.ACTIVITY_RECOGNITION },
                          TMD_PERMISSION_REQUEST_ACTIVITY);
                })
                .create()
                .show();
      }
      else {
        ActivityCompat.requestPermissions(this,
                new String[]{ Manifest.permission.ACTIVITY_RECOGNITION },
                TMD_PERMISSION_REQUEST_ACTIVITY);
      }
    }
  }

  private void requestLocationPermission() {
    // Should we show an explanation?
    if (ActivityCompat.shouldShowRequestPermissionRationale(this,
            Manifest.permission.ACCESS_FINE_LOCATION)) {

      // Show an explanation to the user *asynchronously* -- don't block
      // this thread waiting for the user's response! After the user
      // sees the explanation, try again to request the permission.
      new AlertDialog.Builder(this)
              .setTitle(R.string.title_location_permission)
              .setMessage(R.string.text_location_permission)
              .setPositiveButton(R.string.ok, (dialogInterface, i) -> {
                //Prompt the user once explanation has been shown
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                  ActivityCompat.requestPermissions(this,
                          new String[]{
                                  Manifest.permission.ACCESS_FINE_LOCATION,
                                  Manifest.permission.ACCESS_BACKGROUND_LOCATION
                          },
                          TMD_PERMISSIONS_REQUEST_LOCATION);
                }
                else {
                  ActivityCompat.requestPermissions(this,
                          new String[]{
                                  Manifest.permission.ACCESS_FINE_LOCATION
                          },
                          TMD_PERMISSIONS_REQUEST_LOCATION);
                }
              })
              .create()
              .show();
    } else {
      // No explanation needed, we can request the permission.
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
        ActivityCompat.requestPermissions(this,
                new String[]{
                        Manifest.permission.ACCESS_FINE_LOCATION,
                        Manifest.permission.ACCESS_BACKGROUND_LOCATION
                },
                TMD_PERMISSIONS_REQUEST_LOCATION);
      }
      else {
        ActivityCompat.requestPermissions(this,
                new String[]{
                        Manifest.permission.ACCESS_FINE_LOCATION
                },
                TMD_PERMISSIONS_REQUEST_LOCATION);
      }
    }
  }
}
