package com.weichu.youdianpu.ui.fragment;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.baidu.location.BDLocation;
import com.baidu.location.BDLocationListener;
import com.baidu.location.LocationClient;
import com.baidu.location.LocationClientOption;
import com.baidu.mapapi.map.BaiduMap;
import com.baidu.mapapi.map.MapStatus;
import com.baidu.mapapi.map.MapStatusUpdateFactory;
import com.baidu.mapapi.map.MapView;
import com.baidu.mapapi.map.MyLocationConfiguration;
import com.baidu.mapapi.map.MyLocationData;
import com.baidu.mapapi.model.LatLng;
import com.weichu.youdianpu.R;

import static android.content.Context.SENSOR_SERVICE;

/**
 * Created by tangxingchu on 2018/4/12.
 */

public class NearbyFragment extends Fragment implements SensorEventListener {

    private static final String TAG = NearbyFragment.class.getSimpleName();
    private MapView mMapView;
    private BaiduMap mBaiduMap;

    //定位相关
    private LocationClient mLocClient;
    public MyLocationListenner myListener = new MyLocationListenner();
    private MyLocationConfiguration.LocationMode mCurrentMode;
    private SensorManager mSensorManager;
    private Double lastX = 0.0;
    private int mCurrentDirection = 0;
    private double mCurrentLat = 0.0;
    private double mCurrentLon = 0.0;
    private float mCurrentAccracy;

    //UI相关
    boolean isFirstLoc = true; // 是否首次定位
    private MyLocationData locData;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater mInflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        Log.i(TAG, "onCreateView");
        View view = mInflater.inflate(R.layout.fragment_nearby, container, false);
        mSensorManager = (SensorManager) this.getActivity().getSystemService(SENSOR_SERVICE);//获取传感器管理服务
        // 地图初始化
        mMapView = view.findViewById(R.id.bmapView);
        mBaiduMap = mMapView.getMap();
        // 开启定位图层
        mBaiduMap.setMyLocationEnabled(true);
        // 定位初始化
        mLocClient = new LocationClient(this.getContext());
        mLocClient.registerLocationListener(myListener);
        LocationClientOption option = new LocationClientOption();
        option.setOpenGps(true); // 打开gps
        option.setCoorType("bd09ll"); // 设置坐标类型
        option.setScanSpan(1000);
        mLocClient.setLocOption(option);
        mLocClient.start();
        return view;
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
//        this.getActivity().findViewById(R.id.main_toolbar).setVisibility(View.GONE);
        if(this.getActivity().findViewById(R.id.main_fab) != null)
            this.getActivity().findViewById(R.id.main_fab).setVisibility(View.GONE);
    }

    @Override
    public void onHiddenChanged(boolean hidden) {
        super.onHiddenChanged(hidden);
        if(hidden) {
//            this.getActivity().findViewById(R.id.main_toolbar).setVisibility(View.VISIBLE);
            this.getActivity().findViewById(R.id.main_fab).setVisibility(View.VISIBLE);
        } else {
//            this.getActivity().findViewById(R.id.main_toolbar).setVisibility(View.GONE);
            this.getActivity().findViewById(R.id.main_fab).setVisibility(View.GONE);
        }
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        double x = event.values[SensorManager.DATA_X];
        if (Math.abs(x - lastX) > 1.0) {
            mCurrentDirection = (int) x;
            locData = new MyLocationData.Builder()
                    .accuracy(mCurrentAccracy)
                    // 此处设置开发者获取到的方向信息，顺时针0-360
                    .direction(mCurrentDirection).latitude(mCurrentLat)
                    .longitude(mCurrentLon).build();
            mBaiduMap.setMyLocationData(locData);
        }
        lastX = x;
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {

    }

    /**
     * 定位SDK监听函数
     */
    public class MyLocationListenner implements BDLocationListener {

        @Override
        public void onReceiveLocation(BDLocation location) {
            // map view 销毁后不在处理新接收的位置
            if (location == null || mMapView == null) {
                return;
            }
            if (isFirstLoc) {
                isFirstLoc = false;
                mCurrentLat = location.getLatitude();
                mCurrentLon = location.getLongitude();
                mCurrentAccracy = location.getRadius();
                locData = new MyLocationData.Builder()
                        .accuracy(location.getRadius())
                        // 此处设置开发者获取到的方向信息，顺时针0-360
                        .direction(mCurrentDirection).latitude(location.getLatitude())
                        .longitude(location.getLongitude()).build();
                mBaiduMap.setMyLocationData(locData);
                LatLng ll = new LatLng(location.getLatitude(),
                        location.getLongitude());
                mBaiduMap.setMyLocationConfiguration(new MyLocationConfiguration(
                        MyLocationConfiguration.LocationMode.FOLLOWING, true, null));
                MapStatus.Builder builder = new MapStatus.Builder();
                builder.overlook(0);
                builder.target(ll).zoom(18.0f);
                mBaiduMap.animateMapStatus(MapStatusUpdateFactory.newMapStatus(builder.build()));
            }
        }

        public void onReceivePoi(BDLocation poiLocation) {
        }
    }

    @Override
    public void onResume() {
        mMapView.onResume();
        super.onResume();
        //为系统的方向传感器注册监听器
        mSensorManager.registerListener(this, mSensorManager.getDefaultSensor(Sensor.TYPE_ORIENTATION),
                SensorManager.SENSOR_DELAY_UI);
    }

    @Override
    public void onPause() {
        mMapView.onPause();
        super.onPause();
    }

    @Override
    public void onStop() {
        //取消注册传感器监听
        mSensorManager.unregisterListener(this);
        super.onStop();
    }

    @Override
    public void onDestroy() {
        // 退出时销毁定位
        mLocClient.stop();
        // 关闭定位图层
        mBaiduMap.setMyLocationEnabled(false);
        mMapView.onDestroy();
        mMapView = null;
        super.onDestroy();
    }
}
