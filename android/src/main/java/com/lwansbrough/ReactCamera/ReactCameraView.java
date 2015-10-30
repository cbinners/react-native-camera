package com.lwansbrough.ReactCamera;

import android.content.Context;
import android.view.View;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIProp;

import android.view.SurfaceView;
import android.view.SurfaceHolder;
import android.hardware.Camera;
import java.io.IOException;
import android.app.Activity;

class ReactCameraView extends SurfaceView implements SurfaceHolder.Callback {
    SurfaceHolder surfaceHolder;
    Camera camera;
    ThemedReactContext context;

    public ReactCameraView(ThemedReactContext context, Camera camera) {
        super(context);
        Helper.setCamera(camera);
        this.camera = camera;
        this.surfaceHolder = getHolder();
        this.surfaceHolder.addCallback(this);
    }

    public void maybeUpdateView() {
        return;
    }

    public void surfaceCreated(SurfaceHolder holder) {
        try {
            this.camera.setPreviewDisplay(this.surfaceHolder);
            this.camera.setDisplayOrientation(90);
            this.camera.startPreview();
        } catch(IOException e) {
            e.printStackTrace();
        }
    }

    public void surfaceDestroyed(SurfaceHolder holder) {
        this.camera.stopPreview();
        this.camera.release();
    }

    public void surfaceChanged(SurfaceHolder holder, int format, int w, int h) {
        //TODO handle rotation etc
    }
}
