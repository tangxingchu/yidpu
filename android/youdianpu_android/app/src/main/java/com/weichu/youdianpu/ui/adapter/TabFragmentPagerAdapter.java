package com.weichu.youdianpu.ui.adapter;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.view.ViewGroup;

import com.weichu.youdianpu.ui.fragment.HomeFragment;
import com.weichu.youdianpu.ui.fragment.MoreFragment;
import com.weichu.youdianpu.ui.fragment.MineFragment;
import com.weichu.youdianpu.ui.fragment.NearbyFragment;
import com.weichu.youdianpu.ui.fragment.OrderFragment;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by tangxingchu on 2018/4/12.
 */

public class TabFragmentPagerAdapter extends FragmentPagerAdapter {

    private List<Fragment> mList;

    public TabFragmentPagerAdapter(FragmentManager fragmentManager) {
        super(fragmentManager);
        HomeFragment homeFragment = new HomeFragment();
        NearbyFragment nearbyFragment = new NearbyFragment();
        OrderFragment orderFragment = new OrderFragment();
        MineFragment myFragment = new MineFragment();
        MoreFragment moreFragment = new MoreFragment();
        this.mList = new ArrayList<Fragment>();
        this.mList.add(homeFragment);
        this.mList.add(nearbyFragment);
        this.mList.add(orderFragment);
        this.mList.add(myFragment);
        //this.mList.add(moreFragment);

    }

    @Override
    public void destroyItem(ViewGroup container, int position, Object object) {

    }

    //显示第几页
    @Override
    public Fragment getItem(int position) {
        return mList.get(position);
    }

    //总共多少页
    @Override
    public int getCount() {
        return 4;
    }

}
