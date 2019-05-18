package com.weichu.youdianpu.ui.fragment;

import android.app.Activity;
import android.app.ActivityOptions;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Pair;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.Toast;

import com.kogitune.activity_transition.ActivityTransitionLauncher;
import com.weichu.youdianpu.R;
import com.weichu.youdianpu.ui.activity.MerchantProfileActivity;
import com.weichu.youdianpu.ui.adapter.HomeRecommendAdapter;
import com.weichu.youdianpu.ui.listener.OnRecylerViewItemClickListener;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static android.content.Context.SENSOR_SERVICE;

/**
 * Created by Administrator on 2018/4/21.
 */

public class HomeFragment extends Fragment implements SwipeRefreshLayout.OnRefreshListener, HomeRecommendAdapter.OnItemClickListener {

    private static final int REQUEST_CODE_VIEW_SHOT = 101;
    private RecyclerView mRecyclerView;
    private List<String> goodsList;

    private Context mContext;
    private SwipeRefreshLayout mSwipeRefreshLayout;
    private HomeRecommendAdapter mHomeRecommendAdapter;

    private Handler mHandler;

    private static final int RERESH_LAYOUT = 1;

    private int mLastVisibleItem;
    private LinearLayoutManager mLinearLayoutManager;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        initGoodsList();
        mContext = this.getContext();
        View view = inflater.inflate(R.layout.fragment_home, null);

        mRecyclerView = view.findViewById(R.id.rectclerView);
        mSwipeRefreshLayout = view.findViewById(R.id.swipeRefreshLayout);
        mSwipeRefreshLayout.setOnRefreshListener(this);
        mLinearLayoutManager = new LinearLayoutManager(mContext);
        mLinearLayoutManager.setOrientation(LinearLayoutManager.VERTICAL);
//        GridLayoutManager gridLayoutManager = new GridLayoutManager(mContext, 2);
//        mRecyclerView.setLayoutManager(gridLayoutManager);
        mRecyclerView.setLayoutManager(mLinearLayoutManager);
        mHomeRecommendAdapter = new HomeRecommendAdapter(mContext, goodsList, null);
        mRecyclerView.setAdapter(mHomeRecommendAdapter);
        mHandler = new Handler() {
            @Override
            public void handleMessage(Message msg) {
                int what = msg.what;
                switch (what) {
                    case RERESH_LAYOUT:
                        mSwipeRefreshLayout.setRefreshing(false);
                        addGoods();
                        mHomeRecommendAdapter.notifyDataSetChanged();
                        break;
                    default:
                        break;
                }
            }
        };
        mRecyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
            @Override
            public void onScrollStateChanged(RecyclerView recyclerView, int newState) {
                super.onScrollStateChanged(recyclerView, newState);
                //判断是否滚动到最后一条记录
                if (newState == RecyclerView.SCROLL_STATE_IDLE && mLastVisibleItem + 1 == mHomeRecommendAdapter.getItemCount()) {
                    if (mHomeRecommendAdapter.getLoadMoreStatus() == mHomeRecommendAdapter.LOADING_MORE) {
                        return;
                    }
                    mHomeRecommendAdapter.changeMoreStatus(mHomeRecommendAdapter.LOADING_MORE);
                    new Handler().postDelayed(new Runnable() {
                        @Override
                        public void run() {
                            addMoreItem(Arrays.asList("more Item1", "more Item2", "more Item3", "more Item4", "more Item5"));
                            mHomeRecommendAdapter.changeMoreStatus(HomeRecommendAdapter.PULLUP_LOAD_MORE);
                        }
                    }, 1000);
                }
            }

            @Override
            public void onScrolled(RecyclerView recyclerView, int dx, int dy) {
                super.onScrolled(recyclerView, dx, dy);
                mLastVisibleItem = mLinearLayoutManager.findLastVisibleItemPosition();
            }
        });

        //为什么设置ViewHolder的item的OnClickListener没有作用?
        mRecyclerView.addOnItemTouchListener(new OnRecylerViewItemClickListener(mRecyclerView) {
            @Override
            public void onItemClick(RecyclerView.ViewHolder vh) {
                Activity host = HomeFragment.this.getActivity();
                //Toast.makeText(mContext,vh.getAdapterPosition()+"", Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(HomeFragment.this.getActivity(), MerchantProfileActivity.class);
//                intent.putE
//                mContext.startActivity(intent);
                View view = vh.itemView;
                ActivityOptions options =
                        ActivityOptions.makeSceneTransitionAnimation(host,
                                Pair.create(view, host.getString(R.string.transition_shot)),
                                Pair.create(view, host.getString(R.string
                                        .transition_shot_background)));
//                ImageView imageView = vh.itemView.findViewById(R.id.goods_image);
//                ActivityTransitionLauncher.with(HomeFragment.this.getActivity()).from(imageView).launch(intent);
                host.startActivityForResult(intent, REQUEST_CODE_VIEW_SHOT, options.toBundle());
            }

            @Override
            public void onItemLongClick(RecyclerView.ViewHolder vh) {
                if (vh.getLayoutPosition() != goodsList.size() - 1) {
//                    helper.startDrag(vh);
                }
                //Toast.makeText(mContext,vh.getAdapterPosition()+"buke",Toast.LENGTH_SHORT).show();
            }
        });

//        mRecyclerView.setOnTouchListener(new View.OnTouchListener() {
//            @Override
//            public boolean onTouch(View v, MotionEvent event) {
//                return false;
//            }
//        });
        return view;
    }

    private void initGoodsList() {
        goodsList = new ArrayList<String>();
        for (int i = 0; i < 30; i++) {
            goodsList.add("商品" + i);
        }
    }

    private void addGoods() {
        goodsList.add(0, "我是新商品");
    }

    private void addMoreItem(List<String> newDatas) {
        goodsList.addAll(newDatas);
        mHomeRecommendAdapter.notifyDataSetChanged();
    }

    @Override
    public void onItemClick(int position) {
        Toast.makeText(this.mContext, "aaaa", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onRefresh() {
        new Thread() {
            @Override
            public void run() {
                super.run();
                try {
                    sleep(3000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                Message msg = Message.obtain();
                msg.what = RERESH_LAYOUT;
                mHandler.sendMessage(msg);
            }
        }.start();
    }

    @Override
    public void onResume() {
        super.onResume();
    }

    @Override
    public void onHiddenChanged(boolean hidden) {
        super.onHiddenChanged(hidden);
        if (hidden) {
//            this.getActivity().findViewById(R.id.main_toolbar).setVisibility(View.GONE);
            this.getActivity().findViewById(R.id.main_fab).setVisibility(View.GONE);
        } else {
//            this.getActivity().findViewById(R.id.main_toolbar).setVisibility(View.VISIBLE);
            this.getActivity().findViewById(R.id.main_fab).setVisibility(View.VISIBLE);
        }
    }
}
