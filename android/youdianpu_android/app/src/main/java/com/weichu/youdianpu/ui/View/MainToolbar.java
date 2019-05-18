package com.weichu.youdianpu.ui.View;

import android.content.Context;
import android.support.annotation.Nullable;
import android.support.v7.widget.Toolbar;
import android.util.AttributeSet;
import android.widget.TextView;

/**
 * Created by Administrator on 2018/5/16.
 */

public class MainToolbar extends Toolbar {

    /**
     * 左侧Title
     */
    private TextView mTxtLeftTitle;
    /**
     * 中间Title
     */
    private TextView mTxtMiddleTitle;
    /**
     * 右侧Title
     */
    private TextView mTxtRightTitle;

    public MainToolbar(Context context) {
        super(context);
    }

    public MainToolbar(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public MainToolbar(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }



}
