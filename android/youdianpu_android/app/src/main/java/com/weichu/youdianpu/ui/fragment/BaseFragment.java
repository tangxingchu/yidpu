package com.weichu.youdianpu.ui.fragment;

import android.content.Context;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.ViewStubCompat;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import java.lang.reflect.Field;

/**
 * Created by tangxingchu on 2018/4/12.
 */

public abstract class BaseFragment extends Fragment {

    private static final String TAG = BaseFragment.class.getSimpleName();

    // Fragment的根View
    private View mRootView;

    // 检测声明周期中，是否已经构建视图
    private boolean mViewCreated = false;

    // 占位图
    private ViewStubCompat mViewStub;

    @Nullable
    @Override
    public final View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        if (mRootView != null) {
            mViewCreated = true;
            return mRootView;
        }

        final Context context = inflater.getContext();
        FrameLayout root = new FrameLayout(context);
        mViewStub = new ViewStubCompat(context, null);
        mViewStub.setLayoutResource(getResId());
        root.addView(mViewStub, new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT));
        root.setLayoutParams(new ViewGroup.MarginLayoutParams(ViewGroup.MarginLayoutParams.MATCH_PARENT, ViewGroup.MarginLayoutParams.MATCH_PARENT));

        mRootView = root;

        mViewCreated = true;
        realLoad();
        return mRootView;
    }

    private boolean mUserVisible = false;

    private boolean isLoadedData = false;

    @Override
    public final void setUserVisibleHint(boolean isVisibleToUser) {
        super.setUserVisibleHint(isVisibleToUser);
        mUserVisible = isVisibleToUser;
        Log.i(TAG, (mViewCreated) + "");
        if (mUserVisible && mViewCreated && !isLoadedData) {
            loadData();
            isLoadedData = true;
        }
    }

    @Override
    public void onDetach() {
        Log.i(TAG, "onDetach");
        super.onDetach();
    }

    @Override
    public void onDestroy() {
        Log.i(TAG, "destroy");
        super.onDestroy();
    }

    // 判断是否已经加载
    private boolean mLoaded = false;

    /**
     * 控制只允许加载一次
     */
    private void realLoad() {
        if (mLoaded) {
            return;
        }
        mLoaded = true;
        onRealViewLoaded(mViewStub.inflate());
    }



    @Override
    public void onDestroyView() {
        //mViewCreated = false;
        //mRootView = null;
        //mLoaded = false;
        super.onDestroyView();

    }

    /**
     * 获取真正的数据视图
     *
     * @return
     */
    protected abstract int getResId();

    /**
     * 当视图真正加载时调用
     */
    protected abstract void onRealViewLoaded(View view);

    protected abstract void loadData();

}
