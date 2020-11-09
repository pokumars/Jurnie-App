package com.moprimapp;

import android.app.IntentService;
import android.content.Intent;
import android.util.Log;

import fi.moprim.tmd.sdk.model.Result;
import fi.moprim.tmd.sdk.model.TmdUploadMetadata;

public class TmdUploadIntentService extends IntentService {

    private static final String TAG = TmdUploadIntentService.class.getSimpleName();

    public TmdUploadIntentService() {
        super(TAG);
    }

    @Override
    protected void onHandleIntent(Intent intent) {
        if (TmdUploadMetadata.hasResult(intent)) {
            handleTmdUploadMetadataResult(TmdUploadMetadata.extractResult(intent));
        }
    }

    /**
     * Handle the upload metadata result
     * @param result the TmdUploadMetadata result for the periodic data upload service
     **/
    private void handleTmdUploadMetadataResult(final Result<TmdUploadMetadata> result) {
        Log.i(TAG, result.toString());
    }

}