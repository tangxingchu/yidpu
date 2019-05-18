package com.weichu.youdianpu.ui.adapter;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;

import com.weichu.youdianpu.ui.fragment.HomeFragment;

public class HomePagerAdapter extends FragmentPagerAdapter {
    private final String[] TITLES = {"我关注的", "推荐", "最近浏览"};

    public HomePagerAdapter(FragmentManager fm) {
        super(fm);
    }

    @Override
    public CharSequence getPageTitle(int position) {
        return TITLES[position];
    }

    @Override
    public int getCount() {
        return TITLES.length;
    }

    @Override
    public Fragment getItem(int position) {
        return new HomeFragment();
    }
}
