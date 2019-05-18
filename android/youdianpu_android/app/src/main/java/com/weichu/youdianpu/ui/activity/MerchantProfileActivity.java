package com.weichu.youdianpu.ui.activity;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.ViewGroup;

import com.kogitune.activity_transition.ExitActivityTransition;
import com.weichu.youdianpu.R;


public class MerchantProfileActivity extends AppCompatActivity {

    private static final String TAG = MerchantProfileActivity.class.getSimpleName();

    private ExitActivityTransition exitTransition;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_merchant_profile);
        final Toolbar toolbar = (Toolbar) findViewById(R.id.merchant_toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        ViewGroup decor = (ViewGroup) this.getWindow().getDecorView();
        //exitTransition = ActivityTransition.with(getIntent()).to(findViewById(R.id.main_backdrop)).start(savedInstanceState);
//        ViewDragHelper viewDragHelper = ViewDragHelper.create(decor, 1.0f, new ViewDragHelper.Callback() {
//            @Override
//            public boolean tryCaptureView(View child, int pointerId) {
//                Log.i(TAG, "fffffffffffffffffffffaa");
//                return false;
//            }
//
//            //表示上下拖动范围
//            @Override
//            public int clampViewPositionVertical(View child, int top, int dy) {
//                return super.clampViewPositionVertical(child, top, dy);
//            }
//
//            //方法在用户拖拽完成、放手的时候会被调用
//            @Override
//            public void onViewReleased(View releasedChild, float xvel, float yvel) {
//                super.onViewReleased(releasedChild, xvel, yvel);
//            }
//        });
    }

    @Override
    public void onBackPressed() {
        //exitTransition.exit(this);
//        super.onBackPressed();
        finishAfterTransition();
    }
}
