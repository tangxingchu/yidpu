package com.weichu.youdianpu.ui.activity;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Vibrator;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.weichu.youdianpu.R;

import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;
import cn.bingoogolapple.qrcode.core.QRCodeView;

public class QrCodeScannerActivity extends AppCompatActivity implements QRCodeView.Delegate {

    private static final String TAG = QrCodeScannerActivity.class.getSimpleName();
    private static final int REQUEST_CODE_QRCODE_PERMISSIONS = 1;

    @BindView(R.id.zxingview) QRCodeView mQRCodeView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_qr_code_scanner);
        ButterKnife.bind(this);
        mQRCodeView.setDelegate(this);
    }

    @Override
    public void onScanQRCodeSuccess(String result) {
        Log.i(TAG, "result:" + result);
        Toast.makeText(this, result, Toast.LENGTH_SHORT).show();
        vibrate();
        mQRCodeView.startSpot();
    }

    private void vibrate() {
        Vibrator vibrator = (Vibrator) getSystemService(VIBRATOR_SERVICE);
        vibrator.vibrate(200);
    }

    @Override
    public void onScanQRCodeOpenCameraError() {
        Log.e(TAG, "打开相机出错");
    }

    @Override
    protected void onStart() {
        super.onStart();
        requestCodeQRCodePermissions();
//        if(ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED
//                && ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED) {
        if(ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
            mQRCodeView.startCamera();
            mQRCodeView.showScanRect();
        }
    }

    private void requestCodeQRCodePermissions() {
        String[] perms = {Manifest.permission.CAMERA, Manifest.permission.READ_EXTERNAL_STORAGE};
        List<String> permissonList = new ArrayList<String>();
        if(ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            permissonList.add(Manifest.permission.CAMERA);
        }
//        if(ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
//            permissonList.add(Manifest.permission.READ_EXTERNAL_STORAGE);
//        }
        if (!permissonList.isEmpty()) {
            String[] permissons = permissonList.toArray(new String[permissonList.size()]);
//            EasyPermissions.requestPermissions(this, "扫描二维码需要打开相机和散光灯的权限", REQUEST_CODE_QRCODE_PERMISSIONS, perms);
            ActivityCompat.requestPermissions(this, perms, REQUEST_CODE_QRCODE_PERMISSIONS);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode) {
            case REQUEST_CODE_QRCODE_PERMISSIONS:
                if (grantResults.length > 0) {
                    for (int result : grantResults) {
                        if (result != PackageManager.PERMISSION_GRANTED) {
                            Toast.makeText(this, "扫描二维码需要打开相机权限", Toast.LENGTH_LONG).show();
                            finish();
                            return;
                        }
                    }
                } else {
                    Toast.makeText(this, "申请权限出现了错误!", Toast.LENGTH_LONG).show();
                    finish();
                }
                mQRCodeView.startCamera();
                mQRCodeView.showScanRect();
                break;
            default:
                break;
        }
    }

    @Override
    protected void onStop() {
        mQRCodeView.stopCamera();
        super.onStop();
    }

    @Override
    protected void onDestroy() {
        mQRCodeView.onDestroy();
        super.onDestroy();
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
//        finishAfterTransition();
        //参数1， 下一个onResume的activity的进入动画
        //参数2, onStop的activity的退出动画
        overridePendingTransition(0, R.anim.activity_top_out);
    }

    @Override
    public void finish() {
        super.finish();
    }
}
