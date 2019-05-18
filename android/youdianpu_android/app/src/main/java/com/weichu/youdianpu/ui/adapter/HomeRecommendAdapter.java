package com.weichu.youdianpu.ui.adapter;

import android.content.Context;
import android.graphics.Color;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.RecyclerView.Adapter;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.weichu.youdianpu.R;
import com.weichu.youdianpu.model.Goods;

import java.util.List;

public class HomeRecommendAdapter extends Adapter<RecyclerView.ViewHolder> implements View.OnClickListener {


    private static final int TYPE_ITEM = 0; //普通的itemVIew
    private static final int TYPE_FOOTER = 1;//底部footerView

    //上拉加载更多
    public static final int PULLUP_LOAD_MORE = 0;
    //正在加载中
    public static final int LOADING_MORE = 1;
    //没有加载更多 隐藏
    public static final int NO_LOAD_MORE = 2;

    //上拉加载更多状态-默认为0
    private int mLoadMoreStatus = 0;
    private List<String> mGoodsList;
    private OnItemClickListener mItemClickListener;
    private Context mContext;

    public interface OnItemClickListener {
        void onItemClick(int position);
    }

    public HomeRecommendAdapter(Context context, List<String> goodsList, OnItemClickListener listener) {
        this.mContext = context;
        this.mGoodsList = goodsList;
        this.mItemClickListener = listener;
    }

    @Override
    public int getItemViewType(int position) {
        if (position == this.getItemCount() - 1) {
            return TYPE_FOOTER;
        } else {
            return TYPE_ITEM;
        }
    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        if (viewType == TYPE_ITEM) {
            View view = LayoutInflater.from(mContext).inflate(R.layout.item_goods, parent, false);
            HomeRecommendAdapter.ViewHolder viewHolder = new HomeRecommendAdapter.ViewHolder(view);
            viewHolder.itemView.setOnClickListener(this);
            return viewHolder;
        } else {
            View view = LayoutInflater.from(mContext).inflate(R.layout.item_footer, parent, false);
            view.setBackgroundColor(Color.RED);
            HomeRecommendAdapter.FooterHolder footerHolder = new HomeRecommendAdapter.FooterHolder(view);
            return footerHolder;
        }
//            View view = LayoutInflater.from(mContext).inflate(R.layout.item_goods, parent, false);
//            ViewHolder viewHolder = new ViewHolder(view);
//            return viewHolder;
    }

    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        if (holder instanceof HomeRecommendAdapter.ViewHolder) {
            String item = mGoodsList.get(position);
            ((HomeRecommendAdapter.ViewHolder) holder).mTextView.setText(item);
            holder.itemView.setTag(position);
        } else if (holder instanceof HomeRecommendAdapter.FooterHolder) {
            switch (mLoadMoreStatus) {
                case PULLUP_LOAD_MORE:
                    ((HomeRecommendAdapter.FooterHolder) holder).mTextView.setText("上拉加载更多...");
                    break;
                case LOADING_MORE:
                    ((HomeRecommendAdapter.FooterHolder) holder).mTextView.setText("正在加载...");
                    break;
                case NO_LOAD_MORE:
                    //隐藏加载更多
                    ((HomeRecommendAdapter.FooterHolder) holder).mTextView.setVisibility(View.GONE);
                    break;
            }
        }
//            String item = goodsList.get(position);
//            ((ViewHolder) holder).mTextView.setText(item);
    }

    @Override
    public int getItemCount() {
        //+1 做为footerView
        return mGoodsList.size() + 1;
    }

    public void changeMoreStatus(int status) {
        this.mLoadMoreStatus = status;
        this.notifyDataSetChanged();
    }

    public int getLoadMoreStatus() {
        return mLoadMoreStatus;
    }

//    public void setLoadMoreStatus(int loadMoreStatus) {
//        mLoadMoreStatus = loadMoreStatus;
//    }

    public void setItemClickListener(OnItemClickListener itemClickListener) {
        mItemClickListener = itemClickListener;
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        private TextView mTextView;

        public ViewHolder(View itemView) {
            super(itemView);
            mTextView = itemView.findViewById(R.id.goodsName);
        }
    }

    public class FooterHolder extends RecyclerView.ViewHolder {

        private TextView mTextView;

        public FooterHolder(View itemView) {
            super(itemView);
            mTextView = itemView.findViewById(R.id.footerTextView);
        }
    }

    @Override
    public void onClick(View v) {
        Log.i("HomeRecommendAdapter", "点击了");
        if (mItemClickListener != null) {
            mItemClickListener.onItemClick(Integer.parseInt(v.getTag().toString()));
        }
    }
}
