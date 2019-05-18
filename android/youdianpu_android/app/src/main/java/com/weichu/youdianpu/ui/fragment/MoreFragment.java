package com.weichu.youdianpu.ui.fragment;

import android.util.Log;
import android.view.View;

import com.weichu.youdianpu.R;

/**
 * Created by tangxingchu on 2018/4/12.
 */

public class MoreFragment extends BaseFragment {

    private static final String TAG = MoreFragment.class.getSimpleName();

    @Override
    protected void loadData() {
        Log.i(TAG, "懒加载数据");
    }

    @Override
    protected void onRealViewLoaded(View view) {
        Log.i(TAG, "onRealViewLoaded");
    }

    @Override
    protected int getResId() {
        return R.layout.item_vp;
    }

}
