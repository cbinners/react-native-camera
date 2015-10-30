package com.lwansbrough.ReactCamera;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.hardware.Camera;
import android.util.Base64;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.ByteArrayOutputStream;

/**
 * Created by marcell on 10/9/15.
 */
public class ReactCameraModule extends ReactContextBaseJavaModule {
    ReactApplicationContext reactContext;

    private static Boolean locked = false;

    public ReactCameraModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.locked = false;
    }

    @Override
    public String getName() {
        return "ReactCameraModule";
    }

    @ReactMethod
    public void capture(final Callback successCallback) {
        final Callback cb = successCallback;
        Camera camera = Helper.getCamera();
        if (camera != null && !locked) {
          Helper.getCamera().takePicture(null, null, new MyPictureCallback(cb));
          locked = true;
        }
    }

    private class MyPictureCallback implements Camera.PictureCallback {
        Callback callback;

        MyPictureCallback(Callback callback) {
            this.callback = callback;
        }

        @Override
        public void onPictureTaken(byte[] data, Camera camera) {
            camera.startPreview();
            String encoded = Base64.encodeToString(data, Base64.DEFAULT);
            callback.invoke(encoded);
            locked = false;
        }
    }
}
